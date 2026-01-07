<script setup lang="ts">
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import type { DashboardStats } from '../types'
import { formatCurrency, formatNumber } from '../utils'

const props = defineProps<{
  stats: DashboardStats
}>()

// Quick stats cards configuration
const statsCards = computed(() => [
  {
    label: 'Total Produk',
    value: formatNumber(props.stats.totalProducts),
    subValue: `${formatNumber(props.stats.activeProducts)} produk aktif`,
    icon: 'i-heroicons-cube',
    gradient: 'from-violet-500 to-purple-600',
    bgGradient: 'from-violet-500/10 to-purple-600/10',
    to: '/admin/products',
  },
  {
    label: 'Total Pesanan',
    value: formatNumber(props.stats.totalOrders),
    subValue: `${formatNumber(props.stats.pendingOrders)} perlu diproses`,
    icon: 'i-heroicons-shopping-cart',
    gradient: 'from-fuchsia-500 to-pink-600',
    bgGradient: 'from-fuchsia-500/10 to-pink-600/10',
    to: '/admin/orders',
  },
  {
    label: 'Total Pendapatan',
    value: formatCurrency(props.stats.totalRevenue),
    subValue: 'Sepanjang waktu',
    icon: 'i-heroicons-wallet',
    gradient: 'from-emerald-500 to-teal-600',
    bgGradient: 'from-emerald-500/10 to-teal-600/10',
    to: '/admin/finance',
  },
  {
    label: 'Bulan Ini',
    value: formatCurrency(props.stats.monthlyRevenue),
    subValue: 'Pendapatan bulan ini',
    icon: 'i-heroicons-chart-bar-square',
    gradient: 'from-amber-500 to-orange-600',
    bgGradient: 'from-amber-500/10 to-orange-600/10',
    to: '/admin/analytics',
  },
])
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <Link
      v-for="stat in statsCards"
      :key="stat.label"
      :href="stat.to"
      class="group relative p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-500/10 transition-all overflow-hidden"
    >
      <!-- Background gradient overlay -->
      <div
        :class="[
          'absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity',
          stat.bgGradient,
        ]"
      />

      <div class="relative">
        <div class="flex items-start justify-between">
          <div
            :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br shadow-lg',
              stat.gradient,
            ]"
          >
            <UIcon :name="stat.icon" class="w-6 h-6 text-white" />
          </div>
          <UIcon
            name="i-heroicons-arrow-up-right"
            class="w-5 h-5 text-slate-400 group-hover:text-violet-500 transition-colors"
          />
        </div>
        <div class="mt-4">
          <p class="text-sm text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">{{ stat.value }}</p>
          <p class="text-xs text-slate-400 mt-1">{{ stat.subValue }}</p>
        </div>
      </div>
    </Link>
  </div>
</template>
