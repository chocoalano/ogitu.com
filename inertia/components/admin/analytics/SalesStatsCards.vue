<script setup lang="ts">
import { computed } from 'vue'
import type { SalesSummary } from '~/types/analytics'
import { formatCurrency, formatNumber, formatPercent } from '~/types/analytics'

interface Props {
  summary: SalesSummary
}

const props = defineProps<Props>()

const stats = computed(() => [
  {
    title: 'Total Pesanan',
    value: formatNumber(props.summary.totalOrders),
    growth: props.summary.ordersGrowth,
    icon: 'i-heroicons-shopping-cart',
    color: 'primary',
  },
  {
    title: 'Total Pendapatan',
    value: formatCurrency(props.summary.totalRevenue),
    growth: props.summary.revenueGrowth,
    icon: 'i-heroicons-banknotes',
    color: 'success',
  },
  {
    title: 'Rata-rata Pesanan',
    value: formatCurrency(props.summary.averageOrderValue),
    icon: 'i-heroicons-calculator',
    color: 'info',
  },
  {
    title: 'Total Item Terjual',
    value: formatNumber(props.summary.totalItems),
    icon: 'i-heroicons-cube',
    color: 'warning',
  },
])

const getGrowthClass = (growth: number) => {
  if (growth > 0) return 'text-green-500'
  if (growth < 0) return 'text-red-500'
  return 'text-gray-500'
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard v-for="stat in stats" :key="stat.title">
      <div class="flex items-start justify-between">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.title }}</p>
          <p class="mt-1 text-2xl font-bold">{{ stat.value }}</p>
          <p
            v-if="stat.growth !== undefined"
            class="mt-1 text-sm"
            :class="getGrowthClass(stat.growth)"
          >
            {{ formatPercent(stat.growth) }} dari periode sebelumnya
          </p>
        </div>
        <div
          class="p-3 rounded-lg"
          :class="{
            'bg-primary-100 dark:bg-primary-900': stat.color === 'primary',
            'bg-green-100 dark:bg-green-900': stat.color === 'success',
            'bg-blue-100 dark:bg-blue-900': stat.color === 'info',
            'bg-yellow-100 dark:bg-yellow-900': stat.color === 'warning',
          }"
        >
          <UIcon
            :name="stat.icon"
            class="w-6 h-6"
            :class="{
              'text-primary-500': stat.color === 'primary',
              'text-green-500': stat.color === 'success',
              'text-blue-500': stat.color === 'info',
              'text-yellow-500': stat.color === 'warning',
            }"
          />
        </div>
      </div>
    </UCard>
  </div>
</template>
