<script setup lang="ts">
import type { ReviewStats } from '~/types/review'

defineProps<{
  stats: ReviewStats
}>()

const getRatingPercentage = (count: number, total: number) => {
  if (total === 0) return 0
  return Math.round((count / total) * 100)
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 h-full flex flex-col">
    <h3 class="font-semibold text-gray-900 dark:text-white mb-3 text-sm">Distribusi Rating</h3>

    <div class="space-y-1.5 flex-1 flex flex-col justify-center">
      <!-- 5 Stars -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-600 dark:text-gray-400 w-4">5</span>
        <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-yellow-500" />
        <div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-yellow-500 rounded-full transition-all duration-300"
            :style="{ width: `${getRatingPercentage(stats.fiveStars, stats.total)}%` }"
          />
        </div>
        <span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">{{ stats.fiveStars }}</span>
      </div>

      <!-- 4 Stars -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-600 dark:text-gray-400 w-4">4</span>
        <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-yellow-500" />
        <div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-yellow-500 rounded-full transition-all duration-300"
            :style="{ width: `${getRatingPercentage(stats.fourStars, stats.total)}%` }"
          />
        </div>
        <span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">{{ stats.fourStars }}</span>
      </div>

      <!-- 3 Stars -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-600 dark:text-gray-400 w-4">3</span>
        <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-yellow-500" />
        <div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-yellow-500 rounded-full transition-all duration-300"
            :style="{ width: `${getRatingPercentage(stats.threeStars, stats.total)}%` }"
          />
        </div>
        <span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">{{ stats.threeStars }}</span>
      </div>

      <!-- 2 Stars -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-600 dark:text-gray-400 w-4">2</span>
        <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-yellow-500" />
        <div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-yellow-500 rounded-full transition-all duration-300"
            :style="{ width: `${getRatingPercentage(stats.twoStars, stats.total)}%` }"
          />
        </div>
        <span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">{{ stats.twoStars }}</span>
      </div>

      <!-- 1 Star -->
      <div class="flex items-center gap-2">
        <span class="text-xs text-gray-600 dark:text-gray-400 w-4">1</span>
        <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-yellow-500" />
        <div class="flex-1 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            class="h-full bg-yellow-500 rounded-full transition-all duration-300"
            :style="{ width: `${getRatingPercentage(stats.oneStar, stats.total)}%` }"
          />
        </div>
        <span class="text-xs text-gray-600 dark:text-gray-400 w-6 text-right">{{ stats.oneStar }}</span>
      </div>
    </div>
  </div>
</template>
