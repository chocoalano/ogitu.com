<script setup lang="ts">
import type { DashboardPerformanceData, AdminData } from '../types'
import { formatNumber } from '../utils'

withDefaults(defineProps<{
  admin?: AdminData
  performance?: DashboardPerformanceData
}>(), {
  admin: () => ({ id: 0, name: '', email: '', avatar: null, role: 'admin' as const }),
  performance: () => ({ rating: 0, totalReviews: 0, totalSales: 0, orderCompletionRate: 0, responseRate: 0, averageResponseTime: 0 }),
})
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
    <!-- Header -->
    <div class="p-5 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center">
          <UIcon name="i-heroicons-trophy" class="w-5 h-5 text-white" />
        </div>
        <h2 class="font-semibold text-slate-900 dark:text-white">Performa Toko</h2>
      </div>
    </div>

    <!-- Performance Metrics -->
    <div class="p-5 space-y-5">
      <!-- Rating -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-slate-500 dark:text-slate-400">Rating Toko</span>
          <div class="flex items-center gap-1">
            <UIcon name="i-heroicons-star-solid" class="w-5 h-5 text-amber-400" />
            <span class="font-bold text-slate-900 dark:text-white">
              {{ Number(admin.rating || 0).toFixed(1) }}
            </span>
            <span class="text-slate-400 text-sm">/5</span>
          </div>
        </div>
        <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all"
            :style="{ width: `${(Number(admin.rating || 0) / 5) * 100}%` }"
          />
        </div>
        <p class="text-xs text-slate-400 mt-1">
          {{ formatNumber(performance.totalReviews) }} ulasan
        </p>
      </div>

      <!-- Total Sales -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-slate-500 dark:text-slate-400">Total Penjualan</span>
          <span class="font-bold text-slate-900 dark:text-white">
            {{ formatNumber(performance.totalSales) }}
          </span>
        </div>
        <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full"
            :style="{ width: `${Math.min((performance.totalSales / 1000) * 100, 100)}%` }"
          />
        </div>
        <p class="text-xs text-slate-400 mt-1">Target: 1.000 penjualan</p>
      </div>

      <!-- Response Rate -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-slate-500 dark:text-slate-400">Tingkat Respons</span>
          <span class="font-bold text-emerald-500">{{ performance.responseRate }}%</span>
        </div>
        <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full"
            :style="{ width: `${performance.responseRate}%` }"
          />
        </div>
        <p class="text-xs text-slate-400 mt-1">
          Rata-rata respons: {{ performance.averageResponseTime }} menit
        </p>
      </div>

      <!-- Order Completion Rate -->
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm text-slate-500 dark:text-slate-400">Tingkat Penyelesaian</span>
          <span class="font-bold text-blue-500">{{ performance.orderCompletionRate }}%</span>
        </div>
        <div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full"
            :style="{ width: `${performance.orderCompletionRate}%` }"
          />
        </div>
        <p class="text-xs text-slate-400 mt-1">Pesanan berhasil dikirim</p>
      </div>
    </div>
  </div>
</template>
