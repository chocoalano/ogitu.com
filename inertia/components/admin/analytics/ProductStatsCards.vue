<script setup lang="ts">
import { computed } from 'vue'
import type { ProductSummary } from '~/types/analytics'
import { formatNumber } from '~/types/analytics'

interface Props {
  summary: ProductSummary
}

const props = defineProps<Props>()

const stats = computed(() => [
  {
    title: 'Total Produk',
    value: formatNumber(props.summary.totalProducts),
    icon: 'i-heroicons-cube',
    color: 'primary',
  },
  {
    title: 'Produk Aktif',
    value: formatNumber(props.summary.activeProducts),
    icon: 'i-heroicons-check-circle',
    color: 'success',
  },
  {
    title: 'Stok Habis',
    value: formatNumber(props.summary.outOfStockProducts),
    icon: 'i-heroicons-x-circle',
    color: 'error',
  },
  {
    title: 'Stok Rendah',
    value: formatNumber(props.summary.lowStockProducts),
    icon: 'i-heroicons-exclamation-triangle',
    color: 'warning',
  },
])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard v-for="stat in stats" :key="stat.title">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.title }}</p>
          <p class="mt-1 text-2xl font-bold">{{ stat.value }}</p>
        </div>
        <div
          class="p-3 rounded-lg"
          :class="{
            'bg-primary-100 dark:bg-primary-900': stat.color === 'primary',
            'bg-green-100 dark:bg-green-900': stat.color === 'success',
            'bg-red-100 dark:bg-red-900': stat.color === 'error',
            'bg-yellow-100 dark:bg-yellow-900': stat.color === 'warning',
          }"
        >
          <UIcon
            :name="stat.icon"
            class="w-6 h-6"
            :class="{
              'text-primary-500': stat.color === 'primary',
              'text-green-500': stat.color === 'success',
              'text-red-500': stat.color === 'error',
              'text-yellow-500': stat.color === 'warning',
            }"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
