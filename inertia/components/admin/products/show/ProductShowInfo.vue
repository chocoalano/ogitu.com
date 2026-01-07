<script setup lang="ts">
import type { ProductDetail, ProductImage } from '../types'
import { getStatusConfig, getConditionConfig, formatPrice, formatNumber } from '../types'

defineProps<{
  product: ProductDetail
  primaryImage: ProductImage | null
}>()
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
    <div class="flex flex-col sm:flex-row gap-6">
      <!-- Image -->
      <div class="w-full sm:w-48 h-48 rounded-xl bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">
        <img
          v-if="primaryImage?.url"
          :src="primaryImage.url"
          :alt="product.name"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <UIcon name="i-heroicons-photo" class="w-16 h-16 text-slate-400" />
        </div>
      </div>

      <!-- Info -->
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-2 flex-wrap">
          <UBadge :color="getStatusConfig(product.status).color" variant="subtle">
            {{ getStatusConfig(product.status).label }}
          </UBadge>
          <UBadge :color="getConditionConfig(product.condition).color" variant="subtle">
            {{ getConditionConfig(product.condition).label }}
          </UBadge>
          <UBadge v-if="product.isFeatured" color="warning" variant="subtle">
            <UIcon name="i-heroicons-star" class="w-3 h-3 mr-0.5" />
            Featured
          </UBadge>
        </div>

        <h2 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {{ product.name }}
        </h2>

        <div class="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4 flex-wrap">
          <span>SKU: {{ product.sku }}</span>
          <span v-if="product.category">• {{ product.category.name }}</span>
          <span v-if="product.brand">• {{ product.brand }}</span>
        </div>

        <div class="flex items-baseline gap-3 mb-4 flex-wrap">
          <span class="text-2xl font-bold text-violet-600 dark:text-violet-400">
            {{ formatPrice(product.discountPrice || product.price) }}
          </span>
          <span
            v-if="product.discountPrice"
            class="text-lg text-slate-400 line-through"
          >
            {{ formatPrice(product.price) }}
          </span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Stok</p>
            <p
              class="font-semibold"
              :class="
                product.stock === 0
                  ? 'text-red-500'
                  : product.stock <= 10
                    ? 'text-amber-500'
                    : 'text-slate-900 dark:text-white'
              "
            >
              {{ formatNumber(product.stock) }}
            </p>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Terjual</p>
            <p class="font-semibold text-slate-900 dark:text-white">
              {{ formatNumber(product.totalSold) }}
            </p>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Rating</p>
            <div class="flex items-center gap-1">
              <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-amber-400" />
              <span class="font-semibold text-slate-900 dark:text-white">
                {{ Number(product.rating || 0).toFixed(1) }}
              </span>
              <span class="text-xs text-slate-500">({{ product.totalReviews }})</span>
            </div>
          </div>
          <div>
            <p class="text-xs text-slate-500 dark:text-slate-400">Dilihat</p>
            <p class="font-semibold text-slate-900 dark:text-white">
              {{ formatNumber(product.viewCount) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
