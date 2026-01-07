<script setup lang="ts">
import { computed } from 'vue'
import { usePage } from '@inertiajs/vue3'
import DefaultLayout from '~/layouts/default.vue'
import ProductBreadcrumb from '~/components/product/ProductBreadcrumb.vue'
import ProductGallery from '~/components/product/ProductGallery.vue'
import ProductInfoHeader from '~/components/product/ProductInfoHeader.vue'
import ProductVariantSelector from '~/components/product/ProductVariantSelector.vue'
import ProductQuantitySelector from '~/components/product/ProductQuantitySelector.vue'
import ProductActions from '~/components/product/ProductActions.vue'
import ProductHighlights from '~/components/product/ProductHighlights.vue'
import ProductDetailTabs from '~/components/product/ProductDetailTabs.vue'
import ProductRecommendationSection from '~/components/product/ProductRecommendationSection.vue'
import ProductStickyFooter from '~/components/product/ProductStickyFooter.vue'
import { useProductDetail } from '~/composables/use_product_detail'
import { useProductSeo } from '~/composables/use_product_seo'
import type { ProductDetail, CategoryBreadcrumb, ProductRecommendations } from '~/types/product_detail'

defineOptions({
  layout: DefaultLayout,
})

const props = defineProps<{
  product: ProductDetail
  categoryBreadcrumb: CategoryBreadcrumb | null
  recommendations: ProductRecommendations
}>()

const page = usePage()
const appUrl = computed(() => (page.props as any).appUrl || 'https://ogitu.com')

// Use composables
const {
  selectedVariant,
  quantity,
  isWishlisted,
  isAddingToCart,
  isBuyingNow,
  isTogglingWishlist,
  formattedCurrentPrice,
  formattedOriginalPrice,
  currentStock,
  isOutOfStock,
  productImages,
  variantGroups,
  breadcrumbItems,
  selectVariant,
  setQuantity,
  toggleWishlist,
  addToCart,
  buyNow,
  shareProduct,
} = useProductDetail(props.product, props.categoryBreadcrumb)

const { canonicalUrl } = useProductSeo({
  product: props.product,
  productImages,
  currentPrice: computed(() => props.product.discountPrice || props.product.price),
  isOutOfStock,
  breadcrumbItems,
  appUrl: appUrl.value,
})

// Event handlers
const handleShare = () => {
  shareProduct(canonicalUrl.value)
}

const handleQuantityChange = (value: number) => {
  setQuantity(value)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Breadcrumb -->
    <ProductBreadcrumb :items="breadcrumbItems" />

    <!-- Main Product Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Product Images -->
        <ProductGallery :images="productImages" :product-name="product.name" :badge="product.badge"
          :discount="product.discount" />

        <!-- Product Info -->
        <div class="space-y-6">
          <!-- Header: Name, Rating, Price -->
          <ProductInfoHeader :product="product" :category-breadcrumb="categoryBreadcrumb"
            :formatted-price="formattedCurrentPrice" :formatted-original-price="formattedOriginalPrice" />

          <!-- Variants -->
          <ProductVariantSelector :variant-groups="variantGroups" :selected-variant="selectedVariant"
            @select="selectVariant" />

          <!-- Quantity -->
          <ProductQuantitySelector :model-value="quantity" :max="currentStock"
            @update:model-value="handleQuantityChange" />

          <!-- Actions -->
          <ProductActions :is-out-of-stock="isOutOfStock" :is-wishlisted="isWishlisted"
            :is-adding-to-cart="isAddingToCart" :is-buying-now="isBuyingNow" :is-toggling-wishlist="isTogglingWishlist"
            @add-to-cart="addToCart" @buy-now="buyNow" @toggle-wishlist="toggleWishlist" @share="handleShare" />

          <!-- Product Highlights -->
          <ProductHighlights />
        </div>
      </div>
    </div>

    <!-- Product Details Tabs -->
    <ProductDetailTabs :product="product" />

    <!-- Recommendations Sections -->
    <div class="space-y-8 lg:space-y-12 py-8 lg:py-12">
      <!-- Products from Same Brand -->
      <ProductRecommendationSection v-if="product.brand" :title="`Produk ${product.brand} Lainnya`"
        subtitle="Lebih banyak pilihan dari brand yang sama" :products="recommendations.brandProducts"
        :view-all-link="`/collections?brand=${product.brand}`" />

      <!-- Products from Same Category -->
      <ProductRecommendationSection title="Produk Terkait" :subtitle="categoryBreadcrumb?.name || 'Kategori yang sama'"
        :products="recommendations.categoryProducts" :view-all-link="categoryBreadcrumb?.href" />

      <!-- Similar Products / You May Also Like -->
        <ProductRecommendationSection v-if="recommendations.similarProducts.length > 0" title="Rekomendasi Untukmu" subtitle="Produk serupa yang mungkin kamu suka"
          :products="recommendations.similarProducts" use-grid />
    </div>

    <!-- Sticky Add to Cart (Mobile) -->
    <ProductStickyFooter :formatted-price="formattedCurrentPrice" :is-out-of-stock="isOutOfStock"
      :is-adding-to-cart="isAddingToCart" :is-buying-now="isBuyingNow" @add-to-cart="addToCart" @buy-now="buyNow" />

    <!-- Spacer for sticky footer -->
    <div class="h-24 lg:hidden"></div>
  </div>
</template>
