<script setup lang="ts">
import { computed } from 'vue'
import type { AnalyticsPagination as PaginationType } from '~/types/analytics'

interface Props {
  pagination: PaginationType
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'changePage': [page: number]
}>()

const pages = computed(() => {
  const range = []
  const start = Math.max(1, props.pagination.currentPage - 2)
  const end = Math.min(props.pagination.lastPage, props.pagination.currentPage + 2)

  for (let i = start; i <= end; i++) {
    range.push(i)
  }
  return range
})

const showStartEllipsis = computed(() => pages.value[0] > 1)
const showEndEllipsis = computed(() => pages.value[pages.value.length - 1] < props.pagination.lastPage)

const handlePageChange = (page: number) => {
  if (page >= 1 && page <= props.pagination.lastPage) {
    emit('changePage', page)
  }
}
</script>

<template>
  <div class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
    <div class="text-sm text-gray-500">
      Menampilkan {{ (pagination.currentPage - 1) * pagination.perPage + 1 }} -
      {{ Math.min(pagination.currentPage * pagination.perPage, pagination.total) }}
      dari {{ pagination.total }} data
    </div>

    <div class="flex items-center gap-1" v-if="pagination.lastPage > 1">
      <UButton
        variant="ghost"
        size="sm"
        :disabled="pagination.currentPage === 1"
        @click="handlePageChange(pagination.currentPage - 1)"
      >
        <UIcon name="i-heroicons-chevron-left" />
      </UButton>

      <UButton
        v-if="showStartEllipsis"
        variant="ghost"
        size="sm"
        @click="handlePageChange(1)"
      >
        1
      </UButton>

      <span v-if="showStartEllipsis" class="px-2 text-gray-500">...</span>

      <UButton
        v-for="page in pages"
        :key="page"
        :variant="page === pagination.currentPage ? 'solid' : 'ghost'"
        :color="page === pagination.currentPage ? 'primary' : 'gray'"
        size="sm"
        @click="handlePageChange(page)"
      >
        {{ page }}
      </UButton>

      <span v-if="showEndEllipsis" class="px-2 text-gray-500">...</span>

      <UButton
        v-if="showEndEllipsis"
        variant="ghost"
        size="sm"
        @click="handlePageChange(pagination.lastPage)"
      >
        {{ pagination.lastPage }}
      </UButton>

      <UButton
        variant="ghost"
        size="sm"
        :disabled="pagination.currentPage === pagination.lastPage"
        @click="handlePageChange(pagination.currentPage + 1)"
      >
        <UIcon name="i-heroicons-chevron-right" />
      </UButton>
    </div>
  </div>
</template>
