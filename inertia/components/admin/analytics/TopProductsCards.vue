<script setup lang="ts">
import type { TopProduct } from '~/types/analytics'
import { formatNumber } from '~/types/analytics'

interface Props {
  byViews: TopProduct[]
  byRating: TopProduct[]
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Top by Views -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-eye" class="w-5 h-5 text-blue-500" />
          <h3 class="font-semibold">Paling Banyak Dilihat</h3>
        </div>
      </template>
      <div class="space-y-3">
        <div
          v-for="(product, index) in byViews"
          :key="product.id"
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-bold">
            {{ index + 1 }}
          </span>
          <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <UIcon name="i-heroicons-photo" class="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate">{{ product.name }}</p>
          </div>
          <div class="flex items-center gap-1 text-gray-500">
            <UIcon name="i-heroicons-eye" class="w-4 h-4" />
            <span>{{ formatNumber(product.viewCount || 0) }}</span>
          </div>
        </div>
        <div v-if="byViews.length === 0" class="text-center text-gray-500 py-4">
          Belum ada data
        </div>
      </div>
    </UCard>

    <!-- Top by Rating -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-star" class="w-5 h-5 text-yellow-500" />
          <h3 class="font-semibold">Rating Tertinggi</h3>
        </div>
      </template>
      <div class="space-y-3">
        <div
          v-for="(product, index) in byRating"
          :key="product.id"
          class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          <span class="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-sm font-bold">
            {{ index + 1 }}
          </span>
          <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
            <img
              v-if="product.image"
              :src="product.image"
              :alt="product.name"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <UIcon name="i-heroicons-photo" class="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div class="flex-1 min-w-0">
            <p class="font-medium truncate">{{ product.name }}</p>
          </div>
          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
            <span class="font-medium">{{ Number(product.rating || 0).toFixed(1) }}</span>
            <span class="text-gray-500 text-sm">({{ product.totalReviews || 0 }})</span>
          </div>
        </div>
        <div v-if="byRating.length === 0" class="text-center text-gray-500 py-4">
          Belum ada data
        </div>
      </div>
    </UCard>
  </div>
</template>
