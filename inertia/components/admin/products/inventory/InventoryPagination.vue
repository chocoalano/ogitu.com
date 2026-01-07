<script setup lang="ts">
import { ref, watch } from 'vue'
import type { PaginationMeta } from '~/components/admin/products'

interface Props {
  meta: PaginationMeta
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'page-change', page: number): void
  (e: 'per-page-change', perPage: number): void
}>()

// Local state for pagination
const currentPage = ref(props.meta.currentPage)

// Watch for meta changes and update currentPage
watch(() => props.meta.currentPage, (newPage) => {
  currentPage.value = newPage
})

// Watch for currentPage changes and emit event
watch(currentPage, (newPage, oldPage) => {
  if (newPage !== oldPage && newPage !== props.meta.currentPage) {
    emit('page-change', newPage)
  }
})

const perPageOptions = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
]
</script>

<template>
  <div
    v-if="meta.total > 0"
    class="border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4"
  >
    <div class="text-sm text-slate-500 dark:text-slate-400">
      Menampilkan {{ (meta.currentPage - 1) * meta.perPage + 1 }} -
      {{ Math.min(meta.currentPage * meta.perPage, meta.total) }} dari {{ meta.total }} produk
    </div>
    <div class="flex items-center gap-4">
      <USelect
        :model-value="meta.perPage"
        :items="perPageOptions"
        value-key="value"
        @update:model-value="(val: any) => emit('per-page-change', Number(val))"
        size="sm"
        class="w-20"
      />
      <UPagination
        v-model:page="currentPage"
        :total="meta.total"
        :items-per-page="meta.perPage"
        :sibling-count="1"
        show-edges
        size="sm"
      />
    </div>
  </div>
</template>
