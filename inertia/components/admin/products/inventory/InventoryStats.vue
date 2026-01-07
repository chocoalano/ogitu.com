<script setup lang="ts">
import type { InventoryStats } from './types'

interface Props {
  stats: InventoryStats
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
    <!-- Total Products -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-cube" class="w-5 h-5 text-violet-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Total Produk</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.totalProducts }}</p>
        </div>
      </div>
    </div>

    <!-- In Stock -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Stok Tersedia</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.inStock }}</p>
        </div>
      </div>
    </div>

    <!-- Low Stock -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Stok Rendah</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.lowStock }}</p>
        </div>
      </div>
    </div>

    <!-- Out of Stock -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-x-circle" class="w-5 h-5 text-red-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Stok Habis</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.outOfStock }}</p>
        </div>
      </div>
    </div>

    <!-- Total Variants -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Total Varian</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.totalVariants }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
