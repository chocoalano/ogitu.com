<script setup lang="ts">
import type { FinancePagination } from '~/types/finance'

interface Props {
  pagination: FinancePagination
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()
</script>

<template>
  <div v-if="pagination.lastPage > 1" class="flex items-center justify-between">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      Menampilkan {{ (pagination.currentPage - 1) * pagination.perPage + 1 }} -
      {{ Math.min(pagination.currentPage * pagination.perPage, pagination.total) }} dari
      {{ pagination.total }} data
    </p>

    <div class="flex items-center gap-2">
      <UButton
        icon="i-heroicons-chevron-left"
        color="neutral"
        variant="ghost"
        size="sm"
        :disabled="pagination.currentPage <= 1"
        @click="$emit('page-change', pagination.currentPage - 1)"
      />

      <template v-for="page in pagination.lastPage" :key="page">
        <UButton
          v-if="
            page === 1 ||
            page === pagination.lastPage ||
            (page >= pagination.currentPage - 1 && page <= pagination.currentPage + 1)
          "
          :color="page === pagination.currentPage ? 'primary' : 'neutral'"
          :variant="page === pagination.currentPage ? 'solid' : 'ghost'"
          size="sm"
          @click="$emit('page-change', page)"
        >
          {{ page }}
        </UButton>
        <span
          v-else-if="page === pagination.currentPage - 2 || page === pagination.currentPage + 2"
          class="text-gray-400"
        >
          ...
        </span>
      </template>

      <UButton
        icon="i-heroicons-chevron-right"
        color="neutral"
        variant="ghost"
        size="sm"
        :disabled="pagination.currentPage >= pagination.lastPage"
        @click="$emit('page-change', pagination.currentPage + 1)"
      />
    </div>
  </div>
</template>
