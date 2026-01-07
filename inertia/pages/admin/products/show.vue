<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminLayout from '~/layouts/admin.vue'
import type { ProductDetail, ProductImage } from '~/components/admin/products/types'
import {
  ProductShowHeader,
  ProductShowInfo,
  ProductShowDescription,
  ProductShowSpecifications,
  ProductShowGallery,
  ProductShowDetails,
  ProductShowActions,
  ProductShowVariants,
  ProductDeleteModal,
} from '~/components/admin/products/show'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  product: ProductDetail
  admin?: {
    id: number
    storeName: string
    slug: string
    status: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  admin: () => ({ id: 0, storeName: '', slug: '', status: '' }),
})

const deleteModalOpen = ref(false)

// Compute primary image from product data
const primaryImage = computed<ProductImage | null>(() => {
  if (!props.product.images || props.product.images.length === 0) {
    return null
  }
  // Find primary image or fall back to first image
  return props.product.images.find((img) => img.isPrimary) || props.product.images[0] || null
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <ProductShowHeader
      :product-name="product.name"
      :product-id="product.id"
      @delete="deleteModalOpen = true"
    />

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Product Info -->
        <ProductShowInfo :product="product" :primary-image="primaryImage" />

        <!-- Description -->
        <ProductShowDescription :description="product.description" />

        <!-- Specifications -->
        <ProductShowSpecifications :specifications="product.specifications" />

        <!-- Images Gallery -->
        <ProductShowGallery :images="product.images" :product-name="product.name" />
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Details Card -->
        <ProductShowDetails :product="product" />

        <!-- Quick Actions -->
        <ProductShowActions
          :product-id="product.id"
          :product-name="product.name"
          :status="product.status"
          @delete="deleteModalOpen = true"
        />

        <!-- Variants -->
        <ProductShowVariants :variants="product.variants" />
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <ProductDeleteModal
      v-model:open="deleteModalOpen"
      :product-id="product.id"
      :product-name="product.name"
    />
  </div>
</template>
