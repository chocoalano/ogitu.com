<script setup lang="ts">
import type { CategoryStats } from './types'

interface Props {
  stats: CategoryStats
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <!-- Total Categories -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-folder" class="w-5 h-5 text-violet-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Total Kategori</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.totalCategories }}</p>
        </div>
      </div>
    </div>

    <!-- Main Categories -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-folder-open" class="w-5 h-5 text-blue-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Kategori Utama</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.mainCategories }}</p>
        </div>
      </div>
    </div>

    <!-- Sub Categories -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-rectangle-stack" class="w-5 h-5 text-amber-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Sub-Kategori</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.subCategories }}</p>
        </div>
      </div>
    </div>

    <!-- Active Categories -->
    <div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
        </div>
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400">Kategori Aktif</p>
          <p class="text-lg font-semibold text-slate-900 dark:text-white">{{ stats.activeCategories }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
