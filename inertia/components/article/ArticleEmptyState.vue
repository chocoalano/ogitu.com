<script setup lang="ts">
/**
 * ArticleEmptyState - Shown when no articles match the current filters
 */
defineEmits<{
  clearFilters: []
}>()
</script>

<template>
  <div class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
    <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
      <UIcon name="i-lucide-file-search" class="w-12 h-12 text-gray-400" />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Artikel Tidak Ditemukan
    </h3>
    <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
      Maaf, tidak ada artikel yang sesuai dengan pencarian Anda. Coba kata kunci
      lain atau hapus filter.
    </p>
    <UButton color="primary" @click="$emit('clearFilters')">
      Hapus Filter
    </UButton>
  </div>
</template>
