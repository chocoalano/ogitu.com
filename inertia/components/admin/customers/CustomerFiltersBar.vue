<script setup lang="ts">
import type { StatusOption } from './types'

const props = defineProps<{
  statusOptions: StatusOption[]
}>()

const globalFilter = defineModel<string>('globalFilter', { default: '' })
const selectedStatus = defineModel<string>('selectedStatus', { default: 'all' })

const emit = defineEmits<{
  search: []
  statusChange: []
  clear: []
}>()

const handleSearch = () => {
  emit('search')
}

const handleStatusChange = () => {
  emit('statusChange')
}

const handleClear = () => {
  emit('clear')
}
</script>

<template>
  <div class="flex flex-col sm:flex-row gap-4 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
    <!-- Search -->
    <div class="flex-1">
      <UInput
        v-model="globalFilter"
        placeholder="Cari nama, email, atau telepon..."
        icon="i-heroicons-magnifying-glass"
        class="max-w-md w-full"
        @keyup.enter="handleSearch"
      />
    </div>

    <!-- Status Filter -->
    <div class="w-full sm:w-48">
      <USelect
        v-model="selectedStatus"
        :items="statusOptions"
        placeholder="Filter Status"
        class="w-full"
        @change="handleStatusChange"
      />
    </div>

    <!-- Actions -->
    <div class="flex gap-2">
      <UButton
        icon="i-heroicons-magnifying-glass"
        color="primary"
        @click="handleSearch"
      >
        Cari
      </UButton>
      <UButton
        icon="i-heroicons-x-mark"
        color="neutral"
        variant="outline"
        @click="handleClear"
      >
        Reset
      </UButton>
    </div>
  </div>
</template>
