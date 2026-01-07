<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  currentPage: number
  total: number
  perPage: number
  lastPage: number
}

interface Emits {
  (e: 'update:currentPage', value: number): void
}

const props = defineProps<Props>()
defineEmits<Emits>()

const startItem = computed(() => {
  return (props.currentPage - 1) * props.perPage + 1
})

const endItem = computed(() => {
  return Math.min(props.currentPage * props.perPage, props.total)
})
</script>

<template>
  <div
    v-if="lastPage > 1"
    class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-700 px-4 py-3"
  >
    <p class="text-sm text-slate-500 dark:text-slate-400">
      Menampilkan {{ startItem }} - {{ endItem }} dari {{ total }} notifikasi
    </p>
    <UPagination
      :page="currentPage"
      :total="total"
      :items-per-page="perPage"
      :sibling-count="1"
      show-edges
      size="sm"
      @update:page="$emit('update:currentPage', $event)"
    />
  </div>
</template>
