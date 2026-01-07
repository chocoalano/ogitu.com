<script setup lang="ts">
import type { ReviewMeta } from '~/types/review'

const props = defineProps<{
  meta: ReviewMeta
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
  (e: 'perPageChange', perPage: number): void
}>()

const perPageOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
]

const handlePerPageChange = (value: any) => {
  emit('perPageChange', Number(value))
}
</script>

<template>
  <div
    v-if="meta.total > 0"
    class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700"
  >
    <div class="text-sm text-gray-500 dark:text-gray-400">
      Menampilkan {{ (meta.currentPage - 1) * meta.perPage + 1 }} -
      {{ Math.min(meta.currentPage * meta.perPage, meta.total) }} dari {{ meta.total }} review
    </div>

    <div class="flex items-center gap-4">
      <USelect
        :model-value="meta.perPage"
        :items="perPageOptions"
        value-key="value"
        size="sm"
        class="w-20"
        @update:model-value="handlePerPageChange"
      />

      <UPagination
        :model-value="meta.currentPage"
        :total="meta.total"
        :items-per-page="meta.perPage"
        size="sm"
        @update:model-value="(page: number) => emit('pageChange', page)"
      />
    </div>
  </div>
</template>
