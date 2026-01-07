<script setup lang="ts">
import { computed } from 'vue'
import { periodOptions } from '~/types/analytics'

interface Props {
  period: string
  dateFrom?: string
  dateTo?: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:period': [value: string]
  'update:dateFrom': [value: string]
  'update:dateTo': [value: string]
  'apply': []
}>()

const selectedPeriod = computed({
  get: () => props.period,
  set: (value) => emit('update:period', value),
})

const fromDate = computed({
  get: () => props.dateFrom,
  set: (value) => emit('update:dateFrom', value || ''),
})

const toDate = computed({
  get: () => props.dateTo,
  set: (value) => emit('update:dateTo', value || ''),
})

const showCustomDates = computed(() => props.period === 'custom')

const handleApply = () => {
  emit('apply')
}
</script>

<template>
  <div class="flex flex-wrap items-end gap-3">
    <UFormField label="Periode">
      <USelectMenu
        v-model="selectedPeriod"
        :items="periodOptions"
        value-key="value"
        class="w-48"
      />
    </UFormField>

    <template v-if="showCustomDates">
      <UFormField label="Dari Tanggal">
        <UInput
          v-model="fromDate"
          type="date"
          class="w-40"
        />
      </UFormField>

      <UFormField label="Sampai Tanggal">
        <UInput
          v-model="toDate"
          type="date"
          class="w-40"
        />
      </UFormField>
    </template>

    <UButton
      color="primary"
      @click="handleApply"
    >
      <UIcon name="i-heroicons-funnel" class="mr-1" />
      Terapkan
    </UButton>
  </div>
</template>
