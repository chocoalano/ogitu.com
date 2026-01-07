<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  addToCart: [product: Product]
  addToWishlist: [product: Product]
}>()

// Product detail URL
const productUrl = `/products/${props.product.slug}`
</script>

<template>
  <Link
    :href="productUrl"
    class="group relative bg-white dark:bg-gray-900/80 rounded-2xl sm:rounded-3xl overflow-hidden border border-gray-200/80 dark:border-gray-800/80 hover:border-primary-400/50 dark:hover:border-primary-500/50 shadow-md sm:shadow-lg shadow-gray-200/50 dark:shadow-black/20 hover:shadow-xl sm:hover:shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 transition-all duration-500 ease-out active:scale-[0.98] sm:hover:-translate-y-2 cursor-pointer block"
  >
    <!-- Glow Effect on Hover -->
    <div
      class="absolute inset-0 bg-linear-to-br from-primary-500/0 via-secondary-500/0 to-pink-500/0 group-hover:from-primary-500/5 group-hover:via-secondary-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none"
    ></div>

    <!-- Product Image -->
    <div
      class="relative aspect-square bg-linear-to-br from-gray-100 via-gray-50 to-white dark:from-gray-800 dark:via-gray-850 dark:to-gray-900 flex items-center justify-center overflow-hidden"
    >
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-30 dark:opacity-20">
        <div
          class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--color-primary-500),0.1)_0%,transparent_50%)] group-hover:scale-150 transition-transform duration-700"
        ></div>
      </div>

      <!-- Product Image -->
      <div class="relative z-10 w-full h-full">
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <UIcon name="i-lucide-package" class="w-16 h-16 text-gray-300 dark:text-gray-600" />
        </div>
      </div>

      <!-- Badge -->
      <div
        v-if="product.badge"
        class="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-linear-to-r from-primary-500 to-secondary-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-primary-500/30"
      >
        {{ product.badge }}
      </div>

      <!-- Discount Badge -->
      <div
        v-if="product.discount > 0 && !product.badge"
        class="absolute top-2 right-2 sm:top-3 sm:right-3 px-2 sm:px-3 py-1 sm:py-1.5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full shadow-lg shadow-red-500/30"
      >
        -{{ product.discount }}%
      </div>

      <!-- Wishlist Button -->
      <button
        class="absolute top-2 left-2 sm:top-3 sm:left-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-full p-1.5 sm:p-2 sm:opacity-0 sm:-translate-x-2 sm:group-hover:opacity-100 sm:group-hover:translate-x-0 transition-all duration-300 hover:scale-110 active:bg-red-500 sm:hover:bg-red-500 active:text-white sm:hover:text-white shadow-md sm:shadow-lg"
        @click.stop="emit('addToWishlist', product)"
      >
        <UIcon name="i-lucide-heart" class="w-4 h-4 sm:w-5 sm:h-5" />
      </button>

      <!-- Quick View Button -->
      <div
        class="hidden sm:block absolute inset-x-4 bottom-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 delay-75"
      >
        <UButton block variant="solid" color="white" size="sm" class="backdrop-blur-md shadow-xl">
          <UIcon name="i-lucide-eye" class="w-4 h-4" />
          Quick View
        </UButton>
      </div>
    </div>

    <!-- Product Info -->
    <div class="p-3 sm:p-4 lg:p-5 space-y-2 sm:space-y-3">
      <!-- Product Name -->
      <h3
        class="font-bold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors text-xs sm:text-sm lg:text-base leading-tight min-h-10 sm:min-h-0"
      >
        {{ product.name }}
      </h3>

      <!-- Rating & Sold -->
      <div class="flex flex-wrap items-center gap-1.5 sm:gap-3">
        <div
          class="flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-yellow-50 dark:bg-yellow-500/10 rounded-full"
        >
          <UIcon name="i-lucide-star" class="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500" />
          <span class="text-xs sm:text-sm font-bold text-yellow-700 dark:text-yellow-400">
            {{ Number(product.rating || 0).toFixed(1) }}
          </span>
        </div>
        <span
          class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 flex items-center gap-0.5 sm:gap-1"
        >
          <UIcon name="i-lucide-shopping-bag" class="w-2.5 h-2.5 sm:w-3 sm:h-3 hidden sm:block" />
          {{ product.totalSold }} Terjual
        </span>
      </div>

      <!-- Price -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-2">
        <span class="text-sm sm:text-lg lg:text-xl font-black text-primary-600 dark:text-primary-400">
          {{ product.formattedPrice }}
        </span>
        <span
          v-if="product.formattedOriginalPrice"
          class="text-[10px] sm:text-xs text-gray-400 line-through"
        >
          {{ product.formattedOriginalPrice }}
        </span>
      </div>

      <!-- Add to Cart Button -->
      <UButton
        block
        size="sm"
        class="mt-1 sm:mt-2 font-semibold group/btn overflow-hidden relative text-xs sm:text-sm"
        @click.stop="emit('addToCart', product)"
      >
        <span class="relative z-10 flex items-center justify-center gap-1 sm:gap-2">
          <UIcon
            name="i-lucide-shopping-cart"
            class="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover/btn:animate-bounce"
          />
          <span class="hidden sm:inline">Tambah Keranjang</span>
          <span class="sm:hidden">+ Keranjang</span>
        </span>
      </UButton>
    </div>

    <!-- Corner Accent -->
    <div
      class="absolute -bottom-2 -right-2 w-20 h-20 bg-linear-to-br from-primary-500/10 to-secondary-500/10 dark:from-primary-500/5 dark:to-secondary-500/5 rounded-full blur-xl group-hover:scale-150 transition-transform duration-500"
    ></div>
  </Link>
</template>
