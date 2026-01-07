<script setup lang="ts">
import { computed } from 'vue'
import type { ReviewStats } from '~/types/review'

const props = defineProps<{
  stats: ReviewStats
}>()

// Calculate approval rate
const approvalRate = computed(() => {
  if (props.stats.total === 0) return 0
  return ((props.stats.approved / props.stats.total) * 100).toFixed(1)
})

// Calculate pending percentage
const pendingPercentage = computed(() => {
  if (props.stats.total === 0) return 0
  return ((props.stats.pending / props.stats.total) * 100).toFixed(0)
})
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
    <!-- Total Reviews with gradient -->
    <div class="group relative bg-linear-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300" />
      <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300" />

      <div class="relative z-10">
        <div class="flex items-start justify-between mb-3">
          <div class="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
            <UIcon name="i-heroicons-chat-bubble-left-right" class="w-6 h-6 text-white" />
          </div>
          <UBadge color="white" variant="solid" size="xs" class="text-blue-600">
            Total
          </UBadge>
        </div>
        <div>
          <p class="text-3xl font-bold text-white mb-1">{{ stats.total.toLocaleString() }}</p>
          <p class="text-sm text-blue-100">Total Review</p>
        </div>
      </div>
    </div>

    <!-- Average Rating with stars -->
    <div class="group relative bg-linear-to-br from-yellow-400 to-orange-500 dark:from-yellow-500 dark:to-orange-600 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <!-- Background decoration -->
      <div class="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-110 transition-transform duration-300" />
      <div class="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full group-hover:scale-110 transition-transform duration-300" />

      <div class="relative z-10">
        <div class="flex items-start justify-between mb-3">
          <div class="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
            <UIcon name="i-heroicons-star-solid" class="w-6 h-6 text-white" />
          </div>
          <div class="flex gap-0.5">
            <UIcon
              v-for="i in 5"
              :key="i"
              name="i-heroicons-star-solid"
              class="w-3 h-3"
              :class="i <= Math.round(stats.averageRating) ? 'text-white' : 'text-white/30'"
            />
          </div>
        </div>
        <div>
          <p class="text-3xl font-bold text-white mb-1">{{ stats.averageRating.toFixed(1) }}</p>
          <p class="text-sm text-orange-100">Rating Rata-rata</p>
        </div>
      </div>
    </div>

    <!-- Pending Reviews with progress -->
    <div class="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div class="relative z-10">
        <div class="flex items-start justify-between mb-3">
          <div class="p-3 rounded-lg bg-orange-100 dark:bg-orange-900/30 group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-clock" class="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <UBadge color="orange" variant="soft" size="xs">
            {{ pendingPercentage }}%
          </UBadge>
        </div>
        <div>
          <p class="text-3xl font-bold text-gray-900 dark:text-white mb-1">{{ stats.pending }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">Menunggu Persetujuan</p>

          <!-- Progress bar -->
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              class="h-full bg-linear-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500"
              :style="{ width: `${pendingPercentage}%` }"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Approved Reviews with success indicator -->
    <div class="group relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div class="relative z-10">
        <div class="flex items-start justify-between mb-3">
          <div class="p-3 rounded-lg bg-green-100 dark:bg-green-900/30 group-hover:scale-110 transition-transform duration-300">
            <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <UBadge color="green" variant="soft" size="xs">
            {{ approvalRate }}%
          </UBadge>
        </div>
        <div>
          <p class="text-3xl font-bold text-gray-900 dark:text-white mb-1">{{ stats.approved }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">Telah Disetujui</p>

          <!-- Progress bar -->
          <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <div
              class="h-full bg-linear-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
              :style="{ width: `${approvalRate}%` }"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
