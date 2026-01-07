<script setup lang="ts">
import { computed } from 'vue'

interface Stats {
  total: number
  active: number
  verified: number
}

const props = defineProps<{
  stats: Stats
}>()

// Computed percentage for progress indicators
const activePercentage = computed(() => {
  if (props.stats.total === 0) return 0
  return Math.round((props.stats.active / props.stats.total) * 100)
})

const verifiedPercentage = computed(() => {
  if (props.stats.total === 0) return 0
  return Math.round((props.stats.verified / props.stats.total) * 100)
})

// Format number with locale
const formatNumber = (num: number) => {
  return new Intl.NumberFormat('id-ID').format(num)
}
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <!-- Total Customers Card -->
    <div class="group relative overflow-hidden bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl p-5 shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid1" width="10" height="10" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#grid1)" />
        </svg>
      </div>

      <!-- Floating Icon -->
      <div class="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

      <div class="relative flex items-start justify-between">
        <div class="space-y-3">
          <div class="inline-flex items-center gap-2 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full">
            <span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            <span class="text-xs font-medium text-white/90">Total</span>
          </div>
          <div>
            <p class="text-3xl font-bold text-white tracking-tight">{{ formatNumber(stats.total) }}</p>
            <p class="text-sm text-white/70 mt-1">Pelanggan Terdaftar</p>
          </div>
        </div>
        <div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <UIcon name="i-heroicons-users" class="w-6 h-6 text-white" />
        </div>
      </div>
    </div>

    <!-- Active Customers Card -->
    <div class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5 shadow-sm hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300">
      <!-- Accent Line -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-400 to-teal-500 rounded-t-2xl" />

      <div class="flex items-start justify-between mb-4">
        <div class="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-white" />
        </div>
        <div class="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-full">
          <UIcon name="i-heroicons-arrow-trending-up" class="w-3.5 h-3.5 text-emerald-500" />
          <span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">{{ activePercentage }}%</span>
        </div>
      </div>

      <div class="space-y-3">
        <div>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ formatNumber(stats.active) }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">Pelanggan Aktif</p>
        </div>

        <!-- Progress Bar -->
        <div class="relative h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            class="absolute inset-y-0 left-0 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500"
            :style="{ width: `${activePercentage}%` }"
          />
        </div>
      </div>
    </div>

    <!-- Verified Customers Card -->
    <div class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300">
      <!-- Accent Line -->
      <div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-400 to-indigo-500 rounded-t-2xl" />

      <div class="flex items-start justify-between mb-4">
        <div class="w-11 h-11 rounded-xl bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">
          <UIcon name="i-heroicons-shield-check" class="w-5 h-5 text-white" />
        </div>
        <div class="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 rounded-full">
          <UIcon name="i-heroicons-check-badge" class="w-3.5 h-3.5 text-blue-500" />
          <span class="text-xs font-semibold text-blue-600 dark:text-blue-400">{{ verifiedPercentage }}%</span>
        </div>
      </div>

      <div class="space-y-3">
        <div>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ formatNumber(stats.verified) }}</p>
          <p class="text-sm text-slate-500 dark:text-slate-400">Terverifikasi</p>
        </div>

        <!-- Progress Bar -->
        <div class="relative h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            class="absolute inset-y-0 left-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-500"
            :style="{ width: `${verifiedPercentage}%` }"
          />
        </div>
      </div>
    </div>
  </div>
</template>
