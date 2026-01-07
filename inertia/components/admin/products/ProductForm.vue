<script setup lang="ts">
import { reactive, watch, computed, ref } from 'vue'
import type { ProductCategory } from './types'

interface SpecificationItem {
  key: string
  value: string
}

interface VariantItem {
  id?: number
  name: string
  value: string
  sku: string
  priceAdjustment: number
  stock: number
  isActive: boolean
}

interface ImageItem {
  id?: number
  tempId?: string
  _uid: string // Unique identifier for Vue key
  file?: File
  url: string
  preview?: string
  isPrimary: boolean
  sortOrder: number
  isNew?: boolean
  isDeleted?: boolean
}

interface FormData {
  name: string
  slug: string
  sku: string
  categoryId: number | null
  description: string
  specifications: SpecificationItem[]
  price: number
  discountPrice: number | null
  stock: number
  minOrder: number
  maxOrder: number | null
  weight: number
  brand: string
  condition: 'new' | 'used'
  status: 'draft' | 'active' | 'inactive'
  isFeatured: boolean
  images: ImageItem[]
  variants: VariantItem[]
}

const props = defineProps<{
  modelValue: FormData
  categories: ProductCategory[]
  errors?: Record<string, string[]>
  isSubmitting?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [data: FormData]
  submit: []
  cancel: []
}>()

// Parse specifications from string/object to array
const parseSpecifications = (specs: any): SpecificationItem[] => {
  if (!specs) return []
  if (Array.isArray(specs)) return specs
  if (typeof specs === 'string') {
    try {
      const parsed = JSON.parse(specs)
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        return Object.entries(parsed).map(([key, value]) => ({
          key,
          value: String(value),
        }))
      }
    } catch {
      return []
    }
  }
  if (typeof specs === 'object') {
    return Object.entries(specs).map(([key, value]) => ({
      key,
      value: String(value),
    }))
  }
  return []
}

// Parse variants
const parseVariants = (variants: any): VariantItem[] => {
  if (!variants || !Array.isArray(variants)) return []
  return variants.map((v) => ({
    id: v.id,
    name: v.name || '',
    value: v.value || '',
    sku: v.sku || '',
    priceAdjustment: Number(v.priceAdjustment) || 0,
    stock: Number(v.stock) || 0,
    isActive: Boolean(v.isActive ?? true),
  }))
}

// Parse images
const parseImages = (images: any): ImageItem[] => {
  if (!images || !Array.isArray(images)) return []
  return images.map((img, index) => ({
    id: img.id,
    _uid: img.id ? `db-${img.id}` : `init-${Date.now()}-${index}`,
    url: img.url || '',
    isPrimary: Boolean(img.isPrimary),
    sortOrder: img.sortOrder ?? index,
    isNew: false,
    isDeleted: false,
  }))
}

// Create reactive form data with parsed values
const form = reactive<FormData>({
  ...props.modelValue,
  specifications: parseSpecifications(props.modelValue.specifications),
  variants: parseVariants((props.modelValue as any).variants),
  images: parseImages((props.modelValue as any).images),
})

// File input ref
const fileInput = ref<HTMLInputElement | null>(null)

// Flag to prevent recursive updates
let isUpdatingFromProps = false
let isUpdatingFromForm = false

// Watch for external changes - but only update non-image fields to prevent isPrimary reset
watch(
  () => props.modelValue,
  (newVal) => {
    if (isUpdatingFromForm) return
    isUpdatingFromProps = true

    // Update basic fields
    form.name = newVal.name
    form.slug = newVal.slug
    form.sku = newVal.sku
    form.categoryId = newVal.categoryId
    form.description = newVal.description
    form.price = newVal.price
    form.discountPrice = newVal.discountPrice
    form.stock = newVal.stock
    form.minOrder = newVal.minOrder
    form.maxOrder = newVal.maxOrder
    form.weight = newVal.weight
    form.brand = newVal.brand
    form.condition = newVal.condition
    form.status = newVal.status
    form.isFeatured = newVal.isFeatured

    // Only update specifications and variants (not images) to preserve local isPrimary state
    form.specifications = parseSpecifications(newVal.specifications)
    form.variants = parseVariants((newVal as any).variants)

    // Update showVariants if variants exist (important for edit mode)
    if (form.variants.length > 0) {
      showVariants.value = true
    }

    // DON'T update images here to preserve local isPrimary/isDeleted state
    // Images are only initialized once and managed locally

    isUpdatingFromProps = false
  },
  { deep: true }
)

// Emit changes - convert specifications back to object (debounced)
let emitTimeout: ReturnType<typeof setTimeout> | null = null
watch(
  form,
  (newVal) => {
    if (isUpdatingFromProps) return

    // Debounce emit to prevent rapid updates
    if (emitTimeout) clearTimeout(emitTimeout)
    emitTimeout = setTimeout(() => {
      isUpdatingFromForm = true
      const specsObject = newVal.specifications.reduce(
        (acc, item) => {
          if (item.key.trim()) {
            acc[item.key.trim()] = item.value
          }
          return acc
        },
        {} as Record<string, string>
      )

      // Deep clone images to ensure isPrimary changes are captured
      const clonedImages = newVal.images.map((img) => ({
        ...img,
        isPrimary: img.isPrimary,
        isDeleted: img.isDeleted,
      }))

      emit('update:modelValue', {
        ...newVal,
        specifications: specsObject as any,
        images: clonedImages,
      })

      // Reset flag after a short delay
      setTimeout(() => {
        isUpdatingFromForm = false
      }, 50)
    }, 100)
  },
  { deep: true }
)

// Category options
const categoryOptions = computed(() => [
  { label: 'Pilih Kategori', value: 'none' },
  ...props.categories.map((c) => ({ label: c.name, value: c.id.toString() })),
])

// Selected category for USelectMenu
const selectedCategory = computed({
  get: () => form.categoryId?.toString() || 'none',
  set: (val) => {
    form.categoryId = val === 'none' ? null : Number(val)
  },
})

// Condition options
const conditionOptions = [
  { label: 'Baru', value: 'new' },
  { label: 'Bekas', value: 'used' },
]

// Status options
const statusOptions = [
  { label: 'Draft', value: 'draft' },
  { label: 'Aktif', value: 'active' },
  { label: 'Nonaktif', value: 'inactive' },
]

// Generate slug from name
const generateSlug = () => {
  form.slug = form.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// SKU counter for unique generation
let skuCounter = ref(1)

// Generate unique SKU with format PREFIX-yyyymmdd0001
const generateUniqueSku = (): string => {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const counter = String(skuCounter.value).padStart(4, '0')
  skuCounter.value++

  return `${year}${month}${day}${counter}`
}

// Generate product SKU with SKU- prefix
const generateProductSku = () => {
  form.sku = `SKU-${generateUniqueSku()}`
}

// Generate variant SKU with SKUV- prefix
const generateVariantSkuAuto = (index: number) => {
  const variant = form.variants[index]
  variant.sku = `SKUV-${generateUniqueSku()}`
}

// ==========================================
// Currency Formatting
// ==========================================
const formatCurrency = (value: number | null | undefined): string => {
  if (value === null || value === undefined || isNaN(value)) return ''
  return new Intl.NumberFormat('id-ID').format(value)
}

const parseCurrency = (value: string): number => {
  // Remove all non-digit characters except minus sign
  const cleaned = value.replace(/[^\d-]/g, '')
  const parsed = parseInt(cleaned, 10)
  return isNaN(parsed) ? 0 : parsed
}

// Formatted price with getter/setter
const formattedPrice = computed({
  get: () => formatCurrency(form.price),
  set: (val: string) => {
    form.price = parseCurrency(val)
  },
})

const formattedDiscountPrice = computed({
  get: () => formatCurrency(form.discountPrice),
  set: (val: string) => {
    const parsed = parseCurrency(val)
    form.discountPrice = parsed === 0 ? null : parsed
  },
})

// Format variant price adjustment
const getFormattedVariantPrice = (index: number) => {
  return formatCurrency(form.variants[index]?.priceAdjustment)
}

const setVariantPrice = (index: number, val: string) => {
  if (form.variants[index]) {
    form.variants[index].priceAdjustment = parseCurrency(val)
  }
}

// Get error for field
const getError = (field: string) => {
  return props.errors?.[field]?.[0]
}

// ==========================================
// Specifications Management
// ==========================================
const addSpecification = () => {
  form.specifications.push({ key: '', value: '' })
}

const removeSpecification = (index: number) => {
  form.specifications.splice(index, 1)
}

// ==========================================
// Images Management
// ==========================================
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (!files || files.length === 0) return

  // Collect all files first
  const filesToProcess = Array.from(files).filter((file) => file.type.startsWith('image/'))
  if (filesToProcess.length === 0) {
    input.value = ''
    return
  }

  let processedCount = 0
  const newImages: ImageItem[] = []
  const visibleCount = form.images.filter((img) => !img.isDeleted).length
  const maxSortOrder = form.images.reduce((max, img) => Math.max(max, img.sortOrder || 0), 0)
  const timestamp = Date.now()

  filesToProcess.forEach((file, idx) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const uid = `new-${timestamp}-${idx}`
      newImages.push({
        file,
        url: '',
        preview: e.target?.result as string,
        tempId: uid,
        _uid: uid,
        isPrimary: visibleCount === 0 && idx === 0 && newImages.filter((i) => i.isPrimary).length === 0,
        sortOrder: maxSortOrder + idx + 1,
        isNew: true,
        isDeleted: false,
      })
      processedCount++

      // When all files are processed, add them all at once
      if (processedCount === filesToProcess.length) {
        // Sort by idx to maintain order
        newImages.sort((a, b) => a.sortOrder - b.sortOrder)

        // Ensure only one isPrimary
        const hasPrimary = form.images.some((img) => !img.isDeleted && img.isPrimary)
        if (!hasPrimary && newImages.length > 0) {
          newImages.forEach((img, i) => {
            img.isPrimary = i === 0
          })
        } else {
          newImages.forEach((img) => {
            img.isPrimary = false
          })
        }

        // Temporarily disable the watcher
        isUpdatingFromProps = true
        newImages.forEach((img) => form.images.push(img))
        isUpdatingFromProps = false

        // Manually trigger emit after batch update
        isUpdatingFromForm = true
        const specsObject = form.specifications.reduce(
          (acc, item) => {
            if (item.key.trim()) {
              acc[item.key.trim()] = item.value
            }
            return acc
          },
          {} as Record<string, string>
        )
        emit('update:modelValue', {
          ...form,
          specifications: specsObject as any,
        })
        setTimeout(() => {
          isUpdatingFromForm = false
        }, 50)
      }
    }
    reader.readAsDataURL(file)
  })

  // Reset input
  input.value = ''
}

const removeImage = (index: number) => {
  if (index < 0 || index >= form.images.length) return

  const image = form.images[index]

  // Reset isPrimary first if this was primary
  const wasPrimary = image.isPrimary
  if (wasPrimary) {
    image.isPrimary = false
  }

  if (image.id) {
    // Mark existing image as deleted (don't remove from array)
    image.isDeleted = true
  } else {
    // Remove new image entirely from array
    form.images.splice(index, 1)
  }

  // If removed image was primary, set first non-deleted image as primary
  if (wasPrimary) {
    const visible = form.images.filter((img) => !img.isDeleted)
    if (visible.length > 0) {
      // Find the actual index in form.images and set isPrimary
      const firstVisibleIndex = form.images.findIndex((img) => !img.isDeleted)
      if (firstVisibleIndex !== -1) {
        form.images[firstVisibleIndex].isPrimary = true
      }
    }
  }
}

// Remove image by reference (for use with visibleImages)
const removeImageByRef = (image: ImageItem) => {
  // Find by _uid which is always unique
  const index = form.images.findIndex((img) => img._uid === image._uid)

  if (index !== -1) {
    removeImage(index)
  } else {
    console.warn('Could not find image to remove by _uid:', image._uid)
  }
}

// Set primary image by reference (for use with visibleImages)
const setPrimaryImageByRef = (image: ImageItem) => {
  // Reset all images to non-primary first
  form.images.forEach((img) => {
    img.isPrimary = false
  })

  // Find the target image and set it as primary
  const targetImage = form.images.find((img) => img._uid === image._uid)
  if (targetImage && !targetImage.isDeleted) {
    targetImage.isPrimary = true
  }

  console.info('setPrimaryImageByRef - target:', image._uid)
  console.info('setPrimaryImageByRef - updated images:', form.images.map(img => ({ id: img.id, _uid: img._uid, isPrimary: img.isPrimary })))
}

const visibleImages = computed(() => form.images.filter((img) => !img.isDeleted))

// ==========================================
// Variants Management
// ==========================================
const showVariants = ref(form.variants.length > 0)

const toggleVariants = (value: boolean) => {
  // Only clear variants when turning OFF (value is already updated by v-model)
  if (!value) {
    // Mark existing variants as deleted or clear new ones
    form.variants = form.variants.filter((v) => v.id).map((v) => ({ ...v, isActive: false }))
  }
}

const addVariant = () => {
  form.variants.push({
    name: '',
    value: '',
    sku: '',
    priceAdjustment: 0,
    stock: 0,
    isActive: true,
  })
}

const removeVariant = (index: number) => {
  form.variants.splice(index, 1)
}

// Generate variant SKU
const generateVariantSku = (index: number) => {
  const variant = form.variants[index]
  if (form.sku && variant.value) {
    variant.sku = `${form.sku}-${variant.value.toUpperCase().replace(/\s+/g, '-')}`
  }
}

// Handle form submit
const handleSubmit = () => {
  emit('submit')
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Information -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Informasi Dasar</h3>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Name -->
        <div class="lg:col-span-2">
          <UFormField label="Nama Produk" :error="getError('name')" required
            help="Gunakan nama yang jelas dan mudah dicari. Contoh: Kaos Polos Cotton Combed 30s">
            <UInput v-model="form.name" placeholder="Masukkan nama produk" class="w-full"
              @blur="!form.slug && generateSlug()" />
          </UFormField>
        </div>

        <!-- Slug -->
        <div>
          <UFormField label="Slug (URL)" :error="getError('slug')"
            help="URL unik produk. Otomatis dibuat dari nama produk">
            <div class="flex gap-2">
              <UInput v-model="form.slug" placeholder="nama-produk" class="flex-1" />
              <UButton type="button" icon="i-heroicons-arrow-path" color="neutral" variant="outline"
                @click="generateSlug" title="Generate dari nama produk" />
            </div>
          </UFormField>
        </div>

        <!-- SKU -->
        <div>
          <UFormField label="SKU" :error="getError('sku')"
            help="Kode unik produk untuk inventaris">
            <div class="flex gap-2">
              <UInput v-model="form.sku" placeholder="SKU-12345" class="flex-1" />
              <UButton type="button" icon="i-heroicons-sparkles" color="neutral" variant="outline"
                @click="generateProductSku" title="Generate SKU otomatis" />
            </div>
          </UFormField>
        </div>

        <!-- Category -->
        <div>
          <UFormField label="Kategori" :error="getError('categoryId')"
            help="Pilih kategori yang paling sesuai dengan produk">
            <USelectMenu v-model="selectedCategory" :items="categoryOptions" value-key="value"
              placeholder="Pilih kategori" class="w-full" />
          </UFormField>
        </div>

        <!-- Brand -->
        <div>
          <UFormField label="Brand / Merek" :error="getError('brand')"
            help="Opsional. Kosongkan jika tidak ada merek">
            <UInput v-model="form.brand" placeholder="Nama brand" class="w-full" />
          </UFormField>
        </div>

        <!-- Condition -->
        <div>
          <UFormField label="Kondisi" :error="getError('condition')" required
            help="Baru = belum pernah dipakai, Bekas = pernah dipakai">
            <USelectMenu v-model="form.condition" :items="conditionOptions" value-key="value" class="w-full" />
          </UFormField>
        </div>

        <!-- Status -->
        <div>
          <UFormField label="Status" :error="getError('status')"
            help="Draft = belum tampil, Aktif = tampil di toko">
            <USelectMenu v-model="form.status" :items="statusOptions" value-key="value" class="w-full" />
          </UFormField>
        </div>

        <!-- Description -->
        <div class="lg:col-span-2">
          <UFormField label="Deskripsi" :error="getError('description')"
            help="Jelaskan detail produk, bahan, ukuran, cara pemakaian, dll">
            <UTextarea v-model="form.description" placeholder="Tulis deskripsi produk..." :rows="5" class="w-full" />
          </UFormField>
        </div>
      </div>
    </div>

    <!-- Product Images -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Gambar Produk</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Upload maksimal 10 gambar. Gambar pertama akan menjadi gambar utama.
          </p>
        </div>
        <UButton type="button" icon="i-heroicons-plus" color="primary" variant="soft" size="sm"
          :disabled="visibleImages.length >= 10" @click="triggerFileInput">
          Tambah Gambar
        </UButton>
      </div>

      <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="handleFileSelect" />

      <!-- Image Grid -->
      <div v-if="visibleImages.length > 0" class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
        <div v-for="image in visibleImages" :key="image._uid"
          class="relative group aspect-square rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden border-2 transition-all"
          :class="image.isPrimary ? 'border-violet-500' : 'border-transparent'">
          <img :src="image.preview || image.url" :alt="`Gambar produk`" class="w-full h-full object-cover" />

          <!-- Primary Badge -->
          <div v-if="image.isPrimary"
            class="absolute top-2 left-2 px-2 py-0.5 bg-violet-500 text-white text-xs rounded-full">
            Utama
          </div>

          <!-- Actions Overlay -->
          <div
            class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <UButton v-if="!image.isPrimary" type="button" icon="i-heroicons-star" color="warning" variant="solid"
              size="xs" @click="setPrimaryImageByRef(image)" />
            <UButton type="button" icon="i-heroicons-trash" color="error" variant="solid" size="xs"
              @click="removeImageByRef(image)" />
          </div>
        </div>

        <!-- Add More Button -->
        <div v-if="visibleImages.length < 10"
          class="aspect-square rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center cursor-pointer hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
          @click="triggerFileInput">
          <div class="text-center">
            <UIcon name="i-heroicons-plus" class="w-8 h-8 text-slate-400" />
            <p class="text-xs text-slate-500 mt-1">Tambah</p>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else
        class="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-violet-500 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-colors"
        @click="triggerFileInput">
        <UIcon name="i-heroicons-photo" class="w-12 h-12 text-slate-400 mx-auto" />
        <p class="text-sm text-slate-500 mt-2">Klik untuk upload gambar</p>
        <p class="text-xs text-slate-400 mt-1">PNG, JPG, WEBP (Maks. 2MB)</p>
      </div>
    </div>

    <!-- Specifications -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Spesifikasi</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Tambahkan spesifikasi produk dalam format key-value
          </p>
        </div>
        <UButton type="button" icon="i-heroicons-plus" color="primary" variant="soft" size="sm"
          @click="addSpecification">
          Tambah
        </UButton>
      </div>

      <div v-if="form.specifications.length > 0" class="space-y-3">
        <div v-for="(spec, index) in form.specifications" :key="index" class="flex items-start gap-3">
          <UInput v-model="spec.key" placeholder="Nama (contoh: Berat, Warna)" class="w-1/3" />
          <UInput v-model="spec.value" placeholder="Nilai" class="flex-1" />
          <UButton type="button" icon="i-heroicons-trash" color="error" variant="ghost"
            @click="removeSpecification(index)" />
        </div>
      </div>

      <div v-else class="text-center py-8 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-lg">
        <UIcon name="i-heroicons-clipboard-document-list" class="w-10 h-10 text-slate-400 mx-auto" />
        <p class="text-sm text-slate-500 mt-2">Belum ada spesifikasi</p>
        <UButton type="button" color="primary" variant="soft" size="sm" class="mt-3" @click="addSpecification">
          Tambah Spesifikasi
        </UButton>
      </div>
    </div>

    <!-- Pricing & Stock -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Harga & Stok</h3>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Price -->
        <div>
          <UFormField label="Harga (Rp)" :error="getError('price')" required
            help="Harga jual normal produk">
            <UInput v-model="formattedPrice" placeholder="0" class="w-full" inputmode="numeric">
              <template #leading>
                <span class="text-slate-400 text-sm">Rp</span>
              </template>
            </UInput>
          </UFormField>
        </div>

        <!-- Discount Price -->
        <div>
          <UFormField label="Harga Diskon (Rp)" :error="getError('discountPrice')"
            help="Opsional. Harus lebih kecil dari harga normal">
            <UInput v-model="formattedDiscountPrice" placeholder="Kosongkan jika tidak ada" class="w-full"
              inputmode="numeric">
              <template #leading>
                <span class="text-slate-400 text-sm">Rp</span>
              </template>
            </UInput>
          </UFormField>
        </div>

        <!-- Stock -->
        <div>
          <UFormField label="Stok" :error="getError('stock')" required
            help="Jumlah produk tersedia. 0 = habis">
            <UInput v-model.number="form.stock" type="number" placeholder="0" class="w-full" min="0" />
          </UFormField>
        </div>

        <!-- Min Order -->
        <div>
          <UFormField label="Minimal Pembelian" :error="getError('minOrder')"
            help="Jumlah minimal yang harus dibeli">
            <UInput v-model.number="form.minOrder" type="number" placeholder="1" class="w-full" min="1" />
          </UFormField>
        </div>

        <!-- Max Order -->
        <div>
          <UFormField label="Maksimal Pembelian" :error="getError('maxOrder')"
            help="Opsional. Batasi jumlah per transaksi">
            <UInput v-model.number="form.maxOrder" type="number" placeholder="Kosongkan jika tidak ada" class="w-full"
              min="1" />
          </UFormField>
        </div>

        <!-- Weight -->
        <div>
          <UFormField label="Berat (gram)" :error="getError('weight')" required
            help="Digunakan untuk kalkulasi ongkir">
            <UInput v-model.number="form.weight" type="number" placeholder="0" class="w-full" min="0">
              <template #trailing>
                <span class="text-slate-400 text-sm">gram</span>
              </template>
            </UInput>
          </UFormField>
        </div>
      </div>
    </div>

    <!-- Variants -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Varian Produk</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Tambahkan varian jika produk memiliki variasi (warna, ukuran, dll)
            </p>
          </div>
        </div>
        <USwitch v-model="showVariants" @update:model-value="toggleVariants" />
      </div>

      <div v-if="showVariants" class="space-y-4">
        <div v-if="form.variants.length > 0" class="space-y-4">
          <div v-for="(variant, index) in form.variants" :key="index"
            class="p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
                Varian {{ index + 1 }}
              </span>
              <UButton type="button" icon="i-heroicons-trash" color="error" variant="ghost" size="xs"
                @click="removeVariant(index)" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <UFormField label="Nama Varian">
                <UInput v-model="variant.name" placeholder="contoh: Warna" size="sm" class="w-full" />
              </UFormField>

              <UFormField label="Nilai">
                <UInput v-model="variant.value" placeholder="contoh: Merah" size="sm" class="w-full"
                  @blur="generateVariantSku(index)" />
              </UFormField>

              <UFormField label="SKU Varian">
                <div class="flex gap-2">
                  <UInput v-model="variant.sku" placeholder="SKU-VARIAN" size="sm" class="flex-1" />
                  <UButton type="button" icon="i-heroicons-sparkles" color="neutral" variant="outline" size="sm"
                    @click="generateVariantSkuAuto(index)" title="Generate SKU" />
                </div>
              </UFormField>

              <UFormField label="Penyesuaian Harga (Rp)" help="Tambah/kurang dari harga dasar">
                <UInput :model-value="getFormattedVariantPrice(index)"
                  @update:model-value="(val: string) => setVariantPrice(index, val)" placeholder="0" size="sm"
                  class="w-full" inputmode="numeric">
                  <template #leading>
                    <span class="text-slate-400 text-xs">Rp</span>
                  </template>
                </UInput>
              </UFormField>

              <UFormField label="Stok Varian" help="Stok khusus varian ini">
                <UInput v-model.number="variant.stock" type="number" placeholder="0" size="sm" class="w-full" min="0" />
              </UFormField>

              <UFormField label="Status">
                <div class="flex items-center gap-2 h-9">
                  <USwitch v-model="variant.isActive" />
                  <span class="text-sm text-slate-600 dark:text-slate-400">
                    {{ variant.isActive ? 'Aktif' : 'Nonaktif' }}
                  </span>
                </div>
              </UFormField>
            </div>
          </div>
        </div>

        <UButton type="button" icon="i-heroicons-plus" color="primary" variant="soft" size="sm" @click="addVariant">
          Tambah Varian
        </UButton>
      </div>
    </div>

    <!-- Featured -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Produk Unggulan</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            Tampilkan produk ini di bagian unggulan toko
          </p>
        </div>
        <USwitch v-model="form.isFeatured" />
      </div>
    </div>

    <!-- Actions -->
    <div class="flex items-center justify-end gap-3">
      <UButton type="button" color="neutral" variant="outline" size="lg" @click="$emit('cancel')">
        Batal
      </UButton>
      <UButton type="submit" color="primary" size="lg" :loading="isSubmitting">
        <UIcon name="i-heroicons-check" class="w-5 h-5 mr-1" />
        Simpan Produk
      </UButton>
    </div>
  </form>
</template>
