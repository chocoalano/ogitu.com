<script setup lang="ts">
import { computed } from 'vue'
import { periodOptions, sortByOptions } from '~/types/analytics'

interface Props {
  period: string
  sortBy: string
  search?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:period': [value: string]
  'update:sortBy': [value: string]
  'update:search': [value: string]
  'apply': []
}>()

const selectedPeriod = computed({
  get: () => props.period,
  set: (value) => emit('update:period', value),
})

const selectedSortBy = computed({
  get: () => props.sortBy,
  set: (value) => emit('update:sortBy', value),
})

const searchQuery = computed({
  get: () => props.search || '',
  set: (value) => emit('update:search', value),
})

const handleApply = () => {
  emit('apply')
}
</script>

<template>
  <div class="flex flex-wrap items-end gap-3">
    <UFormField label="Cari Produk" class="flex-1 min-w-64">
      <UInput
        v-model="searchQuery"
        placeholder="Nama produk atau SKU..."
        icon="i-heroicons-magnifying-glass"
      />
    </UFormField>

    <UFormField label="Periode">
      <USelectMenu
        v-model="selectedPeriod"
        :items="periodOptions"
        value-key="value"
        class="w-44"
      />
    </UFormField>

    <UFormField label="Urutkan">
      <USelectMenu
        v-model="selectedSortBy"
        :items="sortByOptions"
        value-key="value"
        class="w-44"
      />
    </UFormField>

    <UButton
      color="primary"
      @click="handleApply"
    >
      <UIcon name="i-heroicons-funnel" class="mr-1" />
      Filter
    </UButton>
  </div>
</template>
