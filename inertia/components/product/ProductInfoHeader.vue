<script setup lang="ts">
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import type { ProductDetail, CategoryBreadcrumb } from '~/types/product_detail'

const props = defineProps<{
  product: ProductDetail
  categoryBreadcrumb: CategoryBreadcrumb | null
  formattedPrice: string
  formattedOriginalPrice: string | null
}>()

const rating = computed(() => Number(props.product.rating) || 0)
</script>

<template>
  <div class="space-y-6">
    <!-- Header -->
    <div class="space-y-3">
      <!-- Brand & Category -->
      <div class="flex items-center gap-3 flex-wrap">
        <span
          v-if="product.brand"
          class="px-3 py-1 bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400 text-xs font-semibold rounded-full"
        >
          {{ product.brand }}
        </span>
        <Link
          v-if="categoryBreadcrumb"
          :href="categoryBreadcrumb.href"
          class="text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
        >
          {{ categoryBreadcrumb.name }}
        </Link>
      </div>

      <!-- Product Name -->
      <h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
        {{ product.name }}
      </h1>

      <!-- Ratings & Stats -->
      <div class="flex items-center gap-4 flex-wrap">
        <div class="flex items-center gap-1">
          <div class="flex">
            <UIcon
              v-for="i in 5"
              :key="i"
              name="i-lucide-star"
              class="w-4 h-4"
              :class="
                i <= Math.round(rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              "
            />
          </div>
          <span class="text-sm font-medium text-gray-900 dark:text-white ml-1">
            {{ rating.toFixed(1) }}
          </span>
          <span class="text-sm text-gray-500 dark:text-gray-400">
            ({{ product.totalReviews }} ulasan)
          </span>
        </div>
        <span class="text-gray-300 dark:text-gray-700">|</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">
          {{ product.totalSold.toLocaleString('id-ID') }} terjual
        </span>
      </div>
    </div>

    <!-- Price -->
    <div class="space-y-2">
      <div class="flex items-end gap-3">
        <span class="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400">
          {{ formattedPrice }}
        </span>
        <span v-if="formattedOriginalPrice" class="text-lg text-gray-400 line-through mb-1">
          {{ formattedOriginalPrice }}
        </span>
      </div>
      <p v-if="product.discount > 0" class="text-sm text-green-600 dark:text-green-400">
        Kamu hemat {{ product.discount }}%!
      </p>
    </div>
  </div>
</template>
