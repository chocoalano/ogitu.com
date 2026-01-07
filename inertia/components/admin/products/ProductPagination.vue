<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { PaginationMeta } from './types'

const props = defineProps<{
  meta: PaginationMeta
}>()

const emit = defineEmits<{
  'page-change': [page: number]
  'per-page-change': [perPage: number]
}>()

const perPageOptions = [
  { label: '10 per halaman', value: 10 },
  { label: '25 per halaman', value: 25 },
  { label: '50 per halaman', value: 50 },
  { label: '100 per halaman', value: 100 },
]

const selectedPerPage = ref(props.meta.perPage.toString())

watch(selectedPerPage, (value) => {
  emit('per-page-change', Number(value))
})

// Generate page numbers to show
const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const current = props.meta.currentPage
  const last = props.meta.lastPage

  if (last <= 7) {
    // Show all pages if 7 or less
    for (let i = 1; i <= last; i++) {
      pages.push(i)
    }
  } else {
    // Always show first page
    pages.push(1)

    if (current > 3) {
      pages.push('...')
    }

    // Show pages around current
    for (let i = Math.max(2, current - 1); i <= Math.min(last - 1, current + 1); i++) {
      pages.push(i)
    }

    if (current < last - 2) {
      pages.push('...')
    }

    // Always show last page
    pages.push(last)
  }

  return pages
})

// Calculate showing range
const showingFrom = computed(() => {
  if (props.meta.total === 0) return 0
  return (props.meta.currentPage - 1) * props.meta.perPage + 1
})

const showingTo = computed(() => {
  return Math.min(props.meta.currentPage * props.meta.perPage, props.meta.total)
})
</script>

<template>
  <div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
    <!-- Showing info -->
    <div class="text-sm text-slate-500 dark:text-slate-400">
      Menampilkan
      <span class="font-medium text-slate-700 dark:text-slate-300">{{ showingFrom }}</span>
      -
      <span class="font-medium text-slate-700 dark:text-slate-300">{{ showingTo }}</span>
      dari
      <span class="font-medium text-slate-700 dark:text-slate-300">{{ meta.total }}</span>
      produk
    </div>

    <!-- Per page selector and pagination -->
    <div class="flex items-center gap-4">
      <!-- Per page selector -->
      <USelectMenu
        v-model="selectedPerPage"
        :items="perPageOptions"
        value-key="value"
        size="sm"
        class="w-40"
      />

      <!-- Pagination -->
      <nav class="flex items-center gap-1">
        <!-- Previous button -->
        <UButton
          icon="i-heroicons-chevron-left"
          color="neutral"
          variant="ghost"
          size="sm"
          :disabled="!meta.hasPrev"
          @click="$emit('page-change', meta.currentPage - 1)"
        />

        <!-- Page numbers -->
        <template v-for="(page, index) in visiblePages" :key="index">
          <span
            v-if="page === '...'"
            class="px-2 text-slate-400"
          >
            ...
          </span>
          <UButton
            v-else
            :color="page === meta.currentPage ? 'primary' : 'neutral'"
            :variant="page === meta.currentPage ? 'solid' : 'ghost'"
            class="min-w-8"
            @click="$emit('page-change', page as number)"
          >
            {{ page }}
          </UButton>
        </template>

        <!-- Next button -->
        <UButton
          icon="i-heroicons-chevron-right"
          color="neutral"
          variant="ghost"
          size="sm"
          :disabled="!meta.hasNext"
          @click="$emit('page-change', meta.currentPage + 1)"
        />
      </nav>
    </div>
  </div>
</template>
