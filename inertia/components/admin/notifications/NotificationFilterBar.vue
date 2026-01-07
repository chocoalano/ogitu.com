<script setup lang="ts">
import { computed } from 'vue'
import type { NotificationTypeStats } from '~/types/admin_notification'
import {
  typeFilterOptions,
  readStatusOptions,
  getNotificationColor,
  getNotificationIcon,
} from './types'

interface Props {
  selectedType: string
  selectedReadStatus: string
  typeStats?: NotificationTypeStats
}

interface Emits {
  (e: 'update:selectedType', value: string): void
  (e: 'update:selectedReadStatus', value: string): void
  (e: 'filter'): void
  (e: 'reset'): void
}

const props = withDefaults(defineProps<Props>(), {
  typeStats: () => ({}),
})

const emit = defineEmits<Emits>()

const hasActiveFilters = computed(() => {
  return props.selectedType !== 'all' || props.selectedReadStatus !== 'all'
})

const handleTypeChange = (value: string) => {
  emit('update:selectedType', value)
  emit('filter')
}

const handleReadStatusChange = (value: string) => {
  emit('update:selectedReadStatus', value)
  emit('filter')
}

const handleStatClick = (type: string) => {
  emit('update:selectedType', type)
  emit('filter')
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <div class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        <UIcon name="i-heroicons-funnel" class="w-4 h-4" />
        <span class="font-medium">Filter:</span>
      </div>

      <div class="flex flex-wrap items-center gap-3 flex-1">
        <USelect
          :model-value="selectedType"
          :items="typeFilterOptions"
          placeholder="Tipe Notifikasi"
          size="sm"
          class="w-44"
          @update:model-value="handleTypeChange"
        />

        <USelect
          :model-value="selectedReadStatus"
          :items="readStatusOptions"
          placeholder="Status"
          size="sm"
          class="w-36"
          @update:model-value="handleReadStatusChange"
        />

        <UButton
          v-if="hasActiveFilters"
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-heroicons-x-mark"
          @click="$emit('reset')"
        >
          Reset
        </UButton>
      </div>

      <!-- Type Stats Pills -->
      <div class="hidden lg:flex items-center gap-2">
        <template v-for="(count, type) in typeStats" :key="type">
          <UBadge
            v-if="count > 0"
            :color="getNotificationColor(String(type))"
            variant="subtle"
            size="xs"
            class="cursor-pointer hover:opacity-80 transition-opacity"
            @click="handleStatClick(String(type))"
          >
            <UIcon :name="getNotificationIcon(String(type))" class="w-3 h-3 mr-1" />
            {{ count }}
          </UBadge>
        </template>
      </div>
    </div>
  </div>
</template>
