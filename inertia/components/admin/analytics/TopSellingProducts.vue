<script setup lang="ts">
import type { TopSellingProduct } from '~/types/analytics'
import { formatCurrency, formatNumber } from '~/types/analytics'

interface Props {
  products: TopSellingProduct[]
}

defineProps<Props>()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold">Produk Terlaris</h3>
    </template>
    <div class="space-y-4">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        <div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-bold">
          {{ index + 1 }}
        </div>
        <div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <UIcon name="i-heroicons-photo" class="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="font-medium truncate">{{ product.name }}</p>
          <p class="text-sm text-gray-500">
            {{ formatNumber(product.totalQuantity) }} terjual
          </p>
        </div>
        <div class="text-right">
          <p class="font-semibold text-green-600">{{ formatCurrency(product.totalRevenue) }}</p>
        </div>
      </div>
      <div v-if="products.length === 0" class="text-center text-gray-500 py-8">
        Belum ada data penjualan
      </div>
    </div>
  </UCard>
</template>
