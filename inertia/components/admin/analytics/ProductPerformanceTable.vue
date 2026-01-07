<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { ProductPerformance } from '~/types/analytics'
import { formatCurrency, formatNumber } from '~/types/analytics'

interface Props {
  products: ProductPerformance[]
}

defineProps<Props>()

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'success'
    case 'inactive':
      return 'gray'
    case 'out_of_stock':
      return 'error'
    default:
      return 'gray'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'active':
      return 'Aktif'
    case 'inactive':
      return 'Nonaktif'
    case 'out_of_stock':
      return 'Habis'
    default:
      return status
  }
}

const getStockClass = (stock: number) => {
  if (stock === 0) return 'text-red-500'
  if (stock <= 10) return 'text-yellow-500'
  return 'text-green-500'
}
</script>

<template>
  <UCard>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-3 px-4 font-medium text-gray-500">Produk</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Kategori</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Harga</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Stok</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Terjual (Periode)</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Total Terjual</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Pendapatan (Periode)</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Rating</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Dilihat</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0">
                  <img
                    v-if="product.image"
                    :src="product.image"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <UIcon name="i-heroicons-photo" class="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                <div class="min-w-0">
                  <Link :href="`/admin/products/${product.id}`" class="text-primary-500 hover:text-primary-600 font-medium truncate block max-w-48">
                    {{ product.name }}
                  </Link>
                  <p class="text-xs text-gray-500">{{ product.sku }}</p>
                </div>
              </div>
            </td>
            <td class="py-3 px-4">{{ product.category }}</td>
            <td class="py-3 px-4 font-medium">{{ formatCurrency(product.price) }}</td>
            <td class="py-3 px-4">
              <span :class="getStockClass(product.stock)" class="font-medium">
                {{ formatNumber(product.stock) }}
              </span>
            </td>
            <td class="py-3 px-4 font-medium">{{ formatNumber(product.periodSold) }}</td>
            <td class="py-3 px-4">{{ formatNumber(product.totalSold) }}</td>
            <td class="py-3 px-4 font-medium text-green-600">{{ formatCurrency(product.periodRevenue) }}</td>
            <td class="py-3 px-4">
              <div class="flex items-center gap-1">
                <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
                <span>{{ Number(product.rating || 0).toFixed(1) }}</span>
                <span class="text-gray-500 text-xs">({{ product.totalReviews }})</span>
              </div>
            </td>
            <td class="py-3 px-4">{{ formatNumber(product.viewCount) }}</td>
            <td class="py-3 px-4">
              <UBadge :color="getStatusColor(product.status)" variant="soft">
                {{ getStatusLabel(product.status) }}
              </UBadge>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="products.length === 0" class="text-center text-gray-500 py-8">
      Tidak ada produk ditemukan
    </div>
  </UCard>
</template>
