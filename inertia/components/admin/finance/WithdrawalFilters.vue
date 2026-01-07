<script setup lang="ts">
import { withdrawalStatusOptions } from '~/types/finance'

const status = defineModel<string>('status', { default: 'all' })
const search = defineModel<string>('search', { default: '' })
const dateFrom = defineModel<string>('dateFrom', { default: '' })
const dateTo = defineModel<string>('dateTo', { default: '' })

const emit = defineEmits<{
  (e: 'filter'): void
  (e: 'reset'): void
}>()

const handleFilter = () => {
  emit('filter')
}

const handleReset = () => {
  status.value = 'all'
  search.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  emit('reset')
}
</script>

<template>
  <UCard>
    <div class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <!-- Search -->
        <UInput
          v-model="search"
          placeholder="Cari nama/email customer..."
          icon="i-heroicons-magnifying-glass"
          @keyup.enter="handleFilter"
        />

        <!-- Status -->
        <USelectMenu
          v-model="status"
          :items="withdrawalStatusOptions"
          value-key="value"
          placeholder="Status"
        />

        <!-- Date From -->
        <UInput v-model="dateFrom" type="date" placeholder="Dari Tanggal" />

        <!-- Date To -->
        <UInput v-model="dateTo" type="date" placeholder="Sampai Tanggal" />

        <!-- Actions -->
        <div class="flex gap-2">
          <UButton color="primary" icon="i-heroicons-funnel" @click="handleFilter">
            Filter
          </UButton>
          <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" @click="handleReset">
            Reset
          </UButton>
        </div>
      </div>
    </div>
  </UCard>
</template>
