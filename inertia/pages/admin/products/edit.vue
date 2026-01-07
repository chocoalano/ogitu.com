<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import AdminLayout from '~/layouts/admin.vue'
import ProductForm from '~/components/admin/products/ProductForm.vue'
import type { ProductCategory, ProductDetail } from '~/components/admin/products/types'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  product: ProductDetail
  categories?: ProductCategory[]
  admin?: {
    id: number
    storeName: string
    slug: string
    status: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  admin: () => ({ id: 0, storeName: '', slug: '', status: '' }),
})

const toast = useToast()

// Form state initialized with product data
const formData = ref({
  name: props.product.name,
  slug: props.product.slug,
  sku: props.product.sku,
  categoryId: props.product.categoryId,
  description: props.product.description || '',
  specifications: parseSpecifications(props.product.specifications),
  price: Number(props.product.price) || 0,
  discountPrice: props.product.discountPrice ? Number(props.product.discountPrice) : null,
  stock: props.product.stock,
  minOrder: props.product.minOrder,
  maxOrder: props.product.maxOrder,
  weight: Number(props.product.weight) || 0,
  brand: props.product.brand || '',
  condition: props.product.condition,
  status: props.product.status as 'draft' | 'active' | 'inactive',
  isFeatured: props.product.isFeatured,
  images: (props.product.images || []).map((img: any, index: number) => ({
    ...img,
    _uid: `existing-${img.id}`,
    isPrimary: img.isPrimary ?? false,
    sortOrder: img.sortOrder ?? index,
  })),
  variants: props.product.variants || [],
})

// Parse specifications from string/object to array
function parseSpecifications(specs: any): { key: string; value: string }[] {
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
  if (typeof specs === 'object' && !Array.isArray(specs)) {
    return Object.entries(specs).map(([key, value]) => ({
      key,
      value: String(value),
    }))
  }
  return []
}

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
    form.append('slug', formData.value.slug)
    form.append('sku', formData.value.sku)
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

    // Process images - separate new files and existing images
    const existingImages: any[] = []
    const deletedImageIds: number[] = []
    const newImagesMeta: { isPrimary: boolean; sortOrder: number }[] = []

    console.info('Processing images:', formData.value.images)

    for (const image of formData.value.images as any[]) {
      if (image.isDeleted && image.id) {
        // Existing image to be deleted
        deletedImageIds.push(image.id)
      } else if (image.file && !image.isDeleted) {
        // New image with file to upload - track metadata separately
        form.append('newImages', image.file)
        newImagesMeta.push({
          isPrimary: image.isPrimary ?? false,
          sortOrder: image.sortOrder ?? 0,
        })
      } else if (image.id && !image.isDeleted) {
        // Existing image to keep
        existingImages.push({
          id: image.id,
          url: image.url,
          isPrimary: image.isPrimary,
          sortOrder: image.sortOrder,
        })
      }
    }

    console.info('existingImages:', existingImages)
    console.info('newImagesMeta:', newImagesMeta)
    console.info('deletedImageIds:', deletedImageIds)

    form.append('existingImages', JSON.stringify(existingImages))
    form.append('newImagesMeta', JSON.stringify(newImagesMeta))
    if (deletedImageIds.length > 0) {
      form.append('deletedImages', JSON.stringify(deletedImageIds))
    }

    // Process variants - separate active and deleted
    const activeVariants: any[] = []
    const deletedVariantIds: number[] = []

    for (const variant of formData.value.variants) {
      if (variant.isActive === false && variant.id) {
        deletedVariantIds.push(variant.id)
      } else {
        activeVariants.push({
          id: variant.id,
          name: variant.name,
          value: variant.value,
          sku: variant.sku,
          priceAdjustment: variant.priceAdjustment,
          stock: variant.stock,
          isActive: variant.isActive,
        })
      }
    }

    form.append('variants', JSON.stringify(activeVariants))
    if (deletedVariantIds.length > 0) {
      form.append('deletedVariantIds', JSON.stringify(deletedVariantIds))
    }

    const response = await fetch(`/admin/products/${props.product.id}`, {
      method: 'PUT',
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
    toast.error('Error', 'Terjadi kesalahan saat memperbarui produk')
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
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Edit Produk</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {{ product.name }}
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
