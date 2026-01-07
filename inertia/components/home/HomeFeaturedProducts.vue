<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'
import type { Product } from '~/types/product'

interface Props {
  products: Product[]
  title?: string
  subtitle?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Produk Pilihan',
  subtitle: 'Produk terlaris dan terpopuler minggu ini',
})

const emit = defineEmits<{
  addToCart: [product: Product]
  addToWishlist: [product: Product]
}>()
</script>

<template>
  <section class="py-16 lg:py-24 relative overflow-hidden">
    <UContainer class="relative z-10">
      <!-- Section Header -->
      <div
        class="flex flex-col md:flex-row items-center justify-between mb-12 lg:mb-16 scroll-reveal"
      >
        <div class="text-center md:text-left mb-6 md:mb-0">
          <!-- Section Badge -->
          <div
            class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-4"
          >
            <div class="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
            <span class="text-sm font-semibold text-primary-700 dark:text-primary-300">
              Trending Now
            </span>
          </div>

          <h2 class="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-3">
            {{ title.split(' ')[0] }}
            <span
              class="bg-linear-to-r from-primary-600 via-secondary-500 to-pink-500 text-transparent bg-clip-text"
            >
              {{ title.split(' ').slice(1).join(' ') }}
            </span>
          </h2>
          <p class="text-gray-600 dark:text-gray-400 text-lg max-w-md">{{ subtitle }}</p>
        </div>

        <UButton
          to="/collections"
          variant="soft"
          size="lg"
          class="hidden md:flex group hover:scale-105 transition-all shadow-lg hover:shadow-xl"
        >
          <span>Lihat Semua</span>
          <UIcon
            name="i-lucide-arrow-right"
            class="w-4 h-4 group-hover:translate-x-1 transition-transform"
          />
        </UButton>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        <ProductCard
          v-for="(product, index) in products"
          :key="product.id"
          :product="product"
          :class="['scroll-reveal', `scroll-reveal-delay-${(index % 4) + 1}`]"
          @add-to-cart="emit('addToCart', product)"
          @add-to-wishlist="emit('addToWishlist', product)"
        />
      </div>

      <!-- Mobile View All Button -->
      <div class="text-center mt-10 md:hidden scroll-reveal">
        <UButton
          to="/collections"
          block
          size="lg"
          class="shadow-xl shadow-primary-500/20 font-bold"
        >
          <span>Lihat Semua Produk</span>
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
        </UButton>
      </div>

      <!-- Trust Indicators -->
      <div
        class="mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-gray-200 dark:border-gray-800 scroll-reveal"
      >
        <div class="grid grid-cols-4 gap-2 sm:gap-6 lg:gap-8">
          <div class="flex flex-col items-center text-center group">
            <div
              class="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-primary-100 to-primary-50 dark:from-primary-900/50 dark:to-primary-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-primary-500/10"
            >
              <UIcon
                name="i-lucide-shield-check"
                class="w-5 h-5 sm:w-7 sm:h-7 text-primary-600 dark:text-primary-400"
              />
            </div>
            <span class="font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm">
              Original
            </span>
            <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Garansi Resmi
            </span>
          </div>
          <div class="flex flex-col items-center text-center group">
            <div
              class="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-secondary-100 to-secondary-50 dark:from-secondary-900/50 dark:to-secondary-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-secondary-500/10"
            >
              <UIcon
                name="i-lucide-truck"
                class="w-5 h-5 sm:w-7 sm:h-7 text-secondary-600 dark:text-secondary-400"
              />
            </div>
            <span class="font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm">
              Free Ongkir
            </span>
            <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              Min. 100K
            </span>
          </div>
          <div class="flex flex-col items-center text-center group">
            <div
              class="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-pink-100 to-pink-50 dark:from-pink-900/50 dark:to-pink-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-pink-500/10"
            >
              <UIcon
                name="i-lucide-refresh-cw"
                class="w-5 h-5 sm:w-7 sm:h-7 text-pink-600 dark:text-pink-400"
              />
            </div>
            <span class="font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm">
              Return
            </span>
            <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              7 Hari
            </span>
          </div>
          <div class="flex flex-col items-center text-center group">
            <div
              class="w-10 h-10 sm:w-14 sm:h-14 bg-linear-to-br from-blue-100 to-blue-50 dark:from-blue-900/50 dark:to-blue-900/30 rounded-xl sm:rounded-2xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform shadow-md sm:shadow-lg shadow-blue-500/10"
            >
              <UIcon
                name="i-lucide-headphones"
                class="w-5 h-5 sm:w-7 sm:h-7 text-blue-600 dark:text-blue-400"
              />
            </div>
            <span class="font-bold text-gray-900 dark:text-white text-[10px] sm:text-sm">
              Support
            </span>
            <span class="text-[9px] sm:text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
              24/7
            </span>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
