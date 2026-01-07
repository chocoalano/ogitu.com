<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
}>()

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.lastPage) {
    emit('page-change', page)
  }
}

const pages = computed(() => {
  const range: number[] = []
  const delta = 2

  for (
    let i = Math.max(2, props.currentPage - delta);
    i <= Math.min(props.lastPage - 1, props.currentPage + delta);
    i++
  ) {
    range.push(i)
  }

  if (props.currentPage - delta > 2) {
    range.unshift(-1) // -1 represents ellipsis
  }
  if (props.currentPage + delta < props.lastPage - 1) {
    range.push(-1)
  }

  range.unshift(1)
  if (props.lastPage > 1) {
    range.push(props.lastPage)
  }

  return range
})
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
    <p class="text-sm text-gray-500 dark:text-gray-400">
      Menampilkan {{ (currentPage - 1) * perPage + 1 }} - {{ Math.min(currentPage * perPage, total) }} dari {{ total }} data
    </p>

    <div v-if="lastPage > 1" class="flex items-center gap-1">
      <UButton
        icon="i-heroicons-chevron-left"
        size="sm"
        color="neutral"
        variant="ghost"
        :disabled="currentPage === 1"
        @click="goToPage(currentPage - 1)"
      />

      <template v-for="(page, index) in pages" :key="index">
        <span v-if="page === -1" class="px-2 text-gray-400">...</span>
        <UButton
          v-else
          size="sm"
          :color="page === currentPage ? 'primary' : 'neutral'"
          :variant="page === currentPage ? 'solid' : 'ghost'"
          @click="goToPage(page)"
        >
          {{ page }}
        </UButton>
      </template>

      <UButton
        icon="i-heroicons-chevron-right"
        size="sm"
        color="neutral"
        variant="ghost"
        :disabled="currentPage === lastPage"
        @click="goToPage(currentPage + 1)"
      />
    </div>
  </div>
</template>
