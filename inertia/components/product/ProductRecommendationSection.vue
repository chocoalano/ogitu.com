<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import ProductCard from '~/components/ProductCard.vue'
import type { Product } from '~/types/product'

defineProps<{
  title: string
  subtitle?: string
  products: Product[]
  viewAllLink?: string
  viewAllLabel?: string
  useGrid?: boolean
}>()
</script>

<template>
  <section v-if="products.length > 0" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          {{ title }}
        </h2>
        <p v-if="subtitle" class="text-gray-500 dark:text-gray-400 text-sm mt-1">
          {{ subtitle }}
        </p>
      </div>
      <Link
        v-if="viewAllLink"
        :href="viewAllLink"
        class="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center gap-1"
      >
        {{ viewAllLabel || 'Lihat Semua' }}
        <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
      </Link>
    </div>

    <!-- Grid Layout -->
    <div v-if="useGrid" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      <ProductCard v-for="product in products" :key="product.id" :product="product" />
    </div>

    <!-- Carousel Layout -->
    <UCarousel
      v-else
      :items="products"
      :ui="{
        container: 'gap-4',
        item: 'basis-[380px] sm:basis-[300px]',
      }"
      arrows
    >
      <template #default="{ item }">
        <ProductCard :product="item" class="h-full" />
      </template>
    </UCarousel>
  </section>
</template>
