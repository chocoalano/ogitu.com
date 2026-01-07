<script setup lang="ts">
import type { ProductStats } from './types'
import { formatNumber } from './types'

defineProps<{
  stats: ProductStats
}>()

const statItems = (stats: ProductStats) => [
  {
    label: 'Total Produk',
    value: stats.total,
    icon: 'i-heroicons-cube',
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Produk Aktif',
    value: stats.active,
    icon: 'i-heroicons-check-circle',
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Draft',
    value: stats.draft,
    icon: 'i-heroicons-document',
    color: 'text-slate-500',
    bgColor: 'bg-slate-500/10',
  },
  {
    label: 'Stok Habis',
    value: stats.outOfStock,
    icon: 'i-heroicons-exclamation-triangle',
    color: 'text-red-500',
    bgColor: 'bg-red-500/10',
  },
]
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <div
      v-for="item in statItems(stats)"
      :key="item.label"
      class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"
    >
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg flex items-center justify-center" :class="item.bgColor">
          <UIcon :name="item.icon" class="w-5 h-5" :class="item.color" />
        </div>
        <div>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ formatNumber(item.value) }}
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-400">{{ item.label }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
