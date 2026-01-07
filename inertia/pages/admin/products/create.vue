<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import AdminLayout from '~/layouts/admin.vue'
import ProductForm from '~/components/admin/products/ProductForm.vue'
import type { ProductCategory } from '~/components/admin/products/types'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  categories?: ProductCategory[]
  admin?: {
    id: number
    storeName: string
    slug: string
    status: string
  }
  isDev?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  admin: () => ({
    id: 0,
    storeName: 'Admin',
    slug: 'admin',
    status: 'active',
  }),
  isDev: false,
})

const toast = useToast()

// Helper functions for fake data
const generateFakeData = () => {
  const productNames = [
    'Kemeja Batik Premium',
    'Celana Jeans Slim Fit',
    'Sepatu Sneakers Original',
    'Tas Ransel Laptop',
    'Jam Tangan Digital',
    'Kaos Polos Cotton Combed',
    'Jaket Hoodie Unisex',
    'Sandal Kulit Asli',
    'Topi Baseball Cap',
    'Dompet Kulit Pria',
  ]

  const brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', 'Uniqlo', 'Local Brand', 'Supreme', 'Gucci', 'Louis Vuitton']

  const descriptions = [
    'Produk berkualitas tinggi dengan bahan premium yang nyaman digunakan sehari-hari. Cocok untuk berbagai acara formal maupun casual.',
    'Dibuat dengan material terbaik, produk ini memberikan kenyamanan maksimal dan tahan lama. Desain modern yang stylish.',
    'Koleksi terbaru dengan desain eksklusif. Sangat cocok untuk Anda yang ingin tampil beda dan percaya diri.',
  ]

  const randomName = productNames[Math.floor(Math.random() * productNames.length)]
  const randomPrice = Math.floor(Math.random() * 900000) + 100000 // 100k - 1M
  const hasDiscount = Math.random() > 0.5
  const discountPercent = Math.floor(Math.random() * 30) + 10 // 10-40%

  return {
    name: randomName,
    slug: randomName.toLowerCase().replace(/\s+/g, '-'),
    sku: `SKU-${Date.now().toString(36).toUpperCase()}`,
    categoryId: props.categories.length > 0 ? props.categories[Math.floor(Math.random() * props.categories.length)].id : null,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    specifications: [
      { key: 'Material', value: 'Cotton 100%' },
      { key: 'Ukuran', value: 'S, M, L, XL' },
      { key: 'Warna', value: 'Hitam, Putih, Navy' },
    ],
    price: randomPrice,
    discountPrice: hasDiscount ? Math.floor(randomPrice * (1 - discountPercent / 100)) : null,
    stock: Math.floor(Math.random() * 100) + 10,
    minOrder: 1,
    maxOrder: 10,
    weight: Math.floor(Math.random() * 1000) + 100, // 100-1100 gram
    brand: brands[Math.floor(Math.random() * brands.length)],
    condition: 'new' as const,
    status: 'draft' as const,
    isFeatured: Math.random() > 0.7,
    images: [] as any[],
    variants: [] as any[],
  }
}

// Form state
const formData = ref({
  name: '',
  slug: '',
  sku: '',
  categoryId: null as number | null,
  description: '',
  specifications: [] as { key: string; value: string }[],
  price: 0,
  discountPrice: null as number | null,
  stock: 0,
  minOrder: 1,
  maxOrder: null as number | null,
  weight: 0,
  brand: '',
  condition: 'new' as 'new' | 'used',
  status: 'draft' as 'draft' | 'active' | 'inactive',
  isFeatured: false,
  images: [] as any[],
  variants: [] as any[],
})

// Pre-fill with fake data in development
onMounted(() => {
  if (props.isDev) {
    const fakeData = generateFakeData()
    formData.value = fakeData
  }
})

const errors = ref<Record<string, string[]>>({})
const isSubmitting = ref(false)

// Get XSRF token for forms
const getToken = () => {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

// Handle form submission with FormData for file upload
const handleSubmit = async () => {
  isSubmitting.value = true
  errors.value = {}

  try {
    const form = new FormData()

    // Add basic fields
    form.append('name', formData.value.name)
    if (formData.value.slug) form.append('slug', formData.value.slug)
    if (formData.value.sku) form.append('sku', formData.value.sku)
    if (formData.value.categoryId) {
      form.append('categoryId', String(formData.value.categoryId))
    }
    form.append('description', formData.value.description || '')
    form.append('specifications', JSON.stringify(formData.value.specifications))
    form.append('price', String(formData.value.price))
    if (formData.value.discountPrice) {
      form.append('discountPrice', String(formData.value.discountPrice))
    }
    form.append('stock', String(formData.value.stock))
    form.append('minOrder', String(formData.value.minOrder || 1))
    if (formData.value.maxOrder) {
      form.append('maxOrder', String(formData.value.maxOrder))
    }
    form.append('weight', String(formData.value.weight))
    form.append('brand', formData.value.brand || '')
    form.append('condition', formData.value.condition)
    form.append('status', formData.value.status)
    form.append('isFeatured', String(formData.value.isFeatured))

    // Add new image files with metadata
    const newImagesMeta: { isPrimary: boolean; sortOrder: number }[] = []
    for (const image of formData.value.images) {
      if (image.file && !image.isDeleted) {
        form.append('newImages', image.file)
        newImagesMeta.push({
          isPrimary: image.isPrimary,
          sortOrder: image.sortOrder,
        })
      }
    }
    form.append('newImagesMeta', JSON.stringify(newImagesMeta))

    // Add variants
    const activeVariants = formData.value.variants
      .filter((v: any) => v.isActive !== false)
      .map((v: any) => ({
        name: v.name,
        value: v.value,
        sku: v.sku,
        priceAdjustment: v.priceAdjustment,
        stock: v.stock,
        isActive: v.isActive,
      }))
    form.append('variants', JSON.stringify(activeVariants))

    const response = await fetch('/admin/products', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getToken(),
      },
      body: form,
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Berhasil', data.message)
      router.visit('/admin/products')
    } else {
      errors.value = data.errors || {}
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    console.error('Submit error:', error)
    toast.error('Error', 'Terjadi kesalahan saat menyimpan produk')
  } finally {
    isSubmitting.value = false
  }
}

// Handle cancel
const handleCancel = () => {
  router.visit('/admin/products')
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center gap-4">
      <Link href="/admin/products">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" size="sm" />
      </Link>
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Tambah Produk</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tambah produk baru ke toko {{ props.admin.storeName }}
        </p>
      </div>
    </div>

    <!-- Form -->
    <ProductForm
      v-model="formData"
      :categories="categories"
      :errors="errors"
      :is-submitting="isSubmitting"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>
