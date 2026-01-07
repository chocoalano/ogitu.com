<script setup lang="ts">
import { computed } from 'vue'
import type { InventoryFilters } from './types'
import { stockStatusOptions, productStatusOptions } from './types'

interface ProductCategory {
  id: number
  name: string
}

interface Props {
  filters: InventoryFilters
  categories: ProductCategory[]
  search: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:filters', value: InventoryFilters): void
  (e: 'update:search', value: string): void
  (e: 'search'): void
  (e: 'reset'): void
}>()

const localFilters = computed({
  get: () => props.filters,
  set: (value: InventoryFilters) => emit('update:filters', value),
})

const localSearch = computed({
  get: () => props.search,
  set: (value: string) => emit('update:search', value),
})

const categoryOptions = computed(() => [
  { label: 'Semua Kategori', value: undefined },
  ...props.categories.map((c) => ({ label: c.name, value: c.id })),
])
</script>

<template>
  <div class="p-4 border-b border-slate-200 dark:border-slate-700">
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
      <UInput
        v-model="localSearch"
        placeholder="Cari produk atau SKU..."
        icon="i-heroicons-magnifying-glass"
        @keyup.enter="emit('search')"
      />

      <USelect
        v-model="localFilters.stockStatus"
        :items="stockStatusOptions"
        value-key="value"
        placeholder="Filter Stok"
      />

      <USelect
        v-model="localFilters.status"
        :items="productStatusOptions"
        value-key="value"
        placeholder="Filter Status"
      />

      <USelect
        v-model="localFilters.categoryId"
        :items="categoryOptions"
        value-key="value"
        placeholder="Filter Kategori"
      />

      <div class="flex gap-2">
        <UButton color="primary" @click="emit('search')" class="flex-1">
          <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 mr-1" />
          Cari
        </UButton>
        <UButton color="neutral" variant="outline" @click="emit('reset')">
          <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
        </UButton>
      </div>
    </div>
  </div>
</template>
