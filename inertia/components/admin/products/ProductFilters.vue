<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ProductCategory, ProductFilters } from './types'

const props = defineProps<{
  filters: ProductFilters
  categories: ProductCategory[]
}>()

const emit = defineEmits<{
  'update:filters': [filters: ProductFilters]
  search: []
  reset: []
}>()

const searchQuery = ref(props.filters.search || '')
const selectedStatus = ref(props.filters.status || 'all')
const selectedCategory = ref(props.filters.categoryId?.toString() || 'all')

const statusOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Aktif', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Nonaktif', value: 'inactive' },
  { label: 'Stok Habis', value: 'out_of_stock' },
]

const categoryOptions = computed(() => [
  { label: 'Semua Kategori', value: 'all' },
  ...props.categories.map((c) => ({ label: c.name, value: c.id.toString() })),
])

const handleSearch = () => {
  emit('update:filters', {
    search: searchQuery.value || undefined,
    status: selectedStatus.value !== 'all' ? selectedStatus.value : undefined,
    categoryId: selectedCategory.value !== 'all' ? Number(selectedCategory.value) : undefined,
  })
  emit('search')
}

const handleReset = () => {
  searchQuery.value = ''
  selectedStatus.value = 'all'
  selectedCategory.value = 'all'
  emit('update:filters', {})
  emit('reset')
}

// Debounced search on input change
let debounceTimer: ReturnType<typeof setTimeout>
const handleSearchInput = () => {
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    handleSearch()
  }, 500)
}

// Watch for filter changes
watch([selectedStatus, selectedCategory], () => {
  handleSearch()
})
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Search Input -->
      <div class="flex-1">
        <UInput
          v-model="searchQuery"
          placeholder="Cari produk berdasarkan nama, SKU, atau brand..."
          icon="i-heroicons-magnifying-glass"
          size="md"
          class="w-full"
          @input="handleSearchInput"
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- Status Filter -->
      <div class="w-full lg:w-48">
        <USelectMenu
          v-model="selectedStatus"
          :items="statusOptions"
          value-key="value"
          placeholder="Status"
          size="md"
        />
      </div>

      <!-- Category Filter -->
      <div class="w-full lg:w-48">
        <USelectMenu
          v-model="selectedCategory"
          :items="categoryOptions"
          value-key="value"
          placeholder="Kategori"
          size="md"
        />
      </div>

      <!-- Actions -->
      <div class="flex gap-2">
        <UButton
          icon="i-heroicons-magnifying-glass"
          color="primary"
          size="md"
          @click="handleSearch"
        >
          Cari
        </UButton>
        <UButton
          icon="i-heroicons-x-mark"
          color="neutral"
          variant="outline"
          size="md"
          @click="handleReset"
        >
          Reset
        </UButton>
      </div>
    </div>
  </div>
</template>
