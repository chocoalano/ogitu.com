<script setup lang="ts">
import { computed } from 'vue'
import type { FinanceSummary } from '~/types/analytics'
import { formatCurrency, formatNumber } from '~/types/analytics'

interface Props {
  summary: FinanceSummary
}

const props = defineProps<Props>()

const stats = computed(() => [
  {
    title: 'Total Pendapatan',
    value: formatCurrency(props.summary.totalRevenue),
    icon: 'i-heroicons-banknotes',
    color: 'success',
  },
  {
    title: 'Pendapatan Bersih',
    value: formatCurrency(props.summary.netRevenue),
    icon: 'i-heroicons-currency-dollar',
    color: 'primary',
  },
  {
    title: 'Total Diskon',
    value: formatCurrency(props.summary.totalDiscount),
    icon: 'i-heroicons-tag',
    color: 'warning',
    negative: true,
  },
  {
    title: 'Total Ongkir',
    value: formatCurrency(props.summary.totalShippingCost),
    icon: 'i-heroicons-truck',
    color: 'info',
  },
])

const secondaryStats = computed(() => [
  {
    title: 'Total Pesanan',
    value: formatNumber(props.summary.totalOrders),
    icon: 'i-heroicons-shopping-cart',
  },
  {
    title: 'Rata-rata Pesanan',
    value: formatCurrency(props.summary.averageOrderValue),
    icon: 'i-heroicons-calculator',
  },
  {
    title: 'Total Admin Fee',
    value: formatCurrency(props.summary.totalAdminFee),
    icon: 'i-heroicons-receipt-percent',
  },
])
</script>

<template>
  <div class="space-y-4">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard v-for="stat in stats" :key="stat.title">
        <div class="flex items-start justify-between">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.title }}</p>
            <p class="mt-1 text-2xl font-bold" :class="{ 'text-red-500': stat.negative }">
              {{ stat.negative ? '-' : '' }}{{ stat.value }}
            </p>
          </div>
          <div
            class="p-3 rounded-lg"
            :class="{
              'bg-green-100 dark:bg-green-900': stat.color === 'success',
              'bg-primary-100 dark:bg-primary-900': stat.color === 'primary',
              'bg-yellow-100 dark:bg-yellow-900': stat.color === 'warning',
              'bg-blue-100 dark:bg-blue-900': stat.color === 'info',
            }"
          >
            <UIcon
              :name="stat.icon"
              class="w-6 h-6"
              :class="{
                'text-green-500': stat.color === 'success',
                'text-primary-500': stat.color === 'primary',
                'text-yellow-500': stat.color === 'warning',
                'text-blue-500': stat.color === 'info',
              }"
            />
          </div>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard v-for="stat in secondaryStats" :key="stat.title" class="bg-gray-50 dark:bg-gray-800">
        <div class="flex items-center gap-3">
          <UIcon :name="stat.icon" class="w-5 h-5 text-gray-500" />
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.title }}</p>
            <p class="font-semibold">{{ stat.value }}</p>
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>
