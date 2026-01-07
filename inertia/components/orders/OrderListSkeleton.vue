<script setup lang="ts">
/**
 * OrderListSkeleton - Loading skeleton for orders list
 */
defineProps<{
  count?: number
}>()
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="i in (count || 3)"
      :key="i"
      class="bg-white dark:bg-gray-800/80 rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden animate-pulse"
    >
      <!-- Header Skeleton -->
      <div class="flex items-center justify-between gap-4 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700/50">
        <div class="flex items-center gap-4">
          <div class="hidden sm:block w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700" />
          <div class="space-y-2">
            <div class="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div class="h-4 w-24 bg-gray-100 dark:bg-gray-700/50 rounded" />
          </div>
        </div>
        <div class="h-7 w-28 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>

      <!-- Seller Skeleton -->
      <div class="flex items-center gap-3 px-4 sm:px-5 py-3 bg-gray-50/50 dark:bg-gray-900/30">
        <div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div class="space-y-1.5">
          <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          <div class="h-3 w-16 bg-gray-100 dark:bg-gray-700/50 rounded" />
        </div>
      </div>

      <!-- Items Skeleton -->
      <div class="p-4 sm:p-5 space-y-3">
        <div v-for="j in 2" :key="j" class="flex gap-4">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0" />
          <div class="flex-1 space-y-2 py-1">
            <div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div class="h-3 w-1/2 bg-gray-100 dark:bg-gray-700/50 rounded" />
            <div class="flex justify-between">
              <div class="h-4 w-20 bg-gray-100 dark:bg-gray-700/50 rounded" />
              <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Skeleton -->
      <div class="flex items-center justify-between gap-4 p-4 sm:p-5 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700/50">
        <div class="space-y-1.5">
          <div class="h-3 w-20 bg-gray-100 dark:bg-gray-700/50 rounded" />
          <div class="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
        <div class="flex gap-2">
          <div class="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg" />
          <div class="h-9 w-20 bg-gray-100 dark:bg-gray-700/50 rounded-lg" />
        </div>
      </div>
    </div>
  </div>
</template>
