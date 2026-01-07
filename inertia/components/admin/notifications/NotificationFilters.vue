<script setup lang="ts">
import { ref, watch } from 'vue'
import type { NotificationFilters, NotificationTypeStats } from '~/types/admin_notification'

interface Props {
  filters: NotificationFilters
  typeStats: NotificationTypeStats
  unreadCount: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  filter: [filters: NotificationFilters]
}>()

// Local filter state
const selectedType = ref(props.filters.type)
const selectedReadStatus = ref(props.filters.isRead)

// Watch for external filter changes
watch(
  () => props.filters,
  (newFilters) => {
    selectedType.value = newFilters.type
    selectedReadStatus.value = newFilters.isRead
  }
)

// Apply filters
const applyFilters = () => {
  emit('filter', {
    type: selectedType.value,
    isRead: selectedReadStatus.value,
  })
}

// Type options
const typeOptions = [
  { value: 'all', label: 'Semua Notifikasi', icon: 'i-heroicons-bell' },
  { value: 'order_new', label: 'Pesanan Baru', icon: 'i-heroicons-shopping-bag' },
  { value: 'order_paid', label: 'Pesanan Dibayar', icon: 'i-heroicons-banknotes' },
  { value: 'order_shipped', label: 'Pesanan Dikirim', icon: 'i-heroicons-truck' },
  { value: 'order_completed', label: 'Pesanan Selesai', icon: 'i-heroicons-check-circle' },
  { value: 'order_cancelled', label: 'Pesanan Dibatalkan', icon: 'i-heroicons-x-circle' },
  { value: 'review_new', label: 'Review Baru', icon: 'i-heroicons-star' },
  { value: 'product_low_stock', label: 'Stok Rendah', icon: 'i-heroicons-exclamation-triangle' },
  {
    value: 'product_out_of_stock',
    label: 'Stok Habis',
    icon: 'i-heroicons-archive-box-x-mark',
  },
  { value: 'system', label: 'Sistem', icon: 'i-heroicons-cog' },
]

// Read status options
const readStatusOptions = [
  { value: 'all', label: 'Semua' },
  { value: 'unread', label: 'Belum Dibaca' },
  { value: 'read', label: 'Sudah Dibaca' },
]
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Type Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Tipe Notifikasi
        </label>
        <USelectMenu
          v-model="selectedType"
          :options="typeOptions"
          value-attribute="value"
          option-attribute="label"
          placeholder="Pilih tipe"
          @update:model-value="applyFilters"
        >
          <template #label>
            <div class="flex items-center gap-2">
              <UIcon
                :name="typeOptions.find((t) => t.value === selectedType)?.icon || 'i-heroicons-bell'"
                class="w-4 h-4"
              />
              <span>{{
                typeOptions.find((t) => t.value === selectedType)?.label || 'Semua Notifikasi'
              }}</span>
              <UBadge
                v-if="selectedType !== 'all' && typeStats[selectedType]"
                color="primary"
                variant="soft"
                size="xs"
              >
                {{ typeStats[selectedType] }}
              </UBadge>
            </div>
          </template>
          <template #option="{ option }">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <UIcon :name="option.icon" class="w-4 h-4" />
                <span>{{ option.label }}</span>
              </div>
              <UBadge
                v-if="option.value !== 'all' && typeStats[option.value]"
                color="gray"
                variant="soft"
                size="xs"
              >
                {{ typeStats[option.value] }}
              </UBadge>
            </div>
          </template>
        </USelectMenu>
      </div>

      <!-- Read Status Filter -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status Baca
        </label>
        <USelectMenu
          v-model="selectedReadStatus"
          :options="readStatusOptions"
          value-attribute="value"
          option-attribute="label"
          placeholder="Pilih status"
          @update:model-value="applyFilters"
        >
          <template #label>
            <div class="flex items-center gap-2">
              <UIcon
                :name="
                  selectedReadStatus === 'unread'
                    ? 'i-heroicons-envelope'
                    : selectedReadStatus === 'read'
                      ? 'i-heroicons-envelope-open'
                      : 'i-heroicons-inbox'
                "
                class="w-4 h-4"
              />
              <span>{{
                readStatusOptions.find((s) => s.value === selectedReadStatus)?.label || 'Semua'
              }}</span>
              <UBadge
                v-if="selectedReadStatus === 'unread' && unreadCount > 0"
                color="primary"
                variant="soft"
                size="xs"
              >
                {{ unreadCount }}
              </UBadge>
            </div>
          </template>
          <template #option="{ option }">
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center gap-2">
                <UIcon
                  :name="
                    option.value === 'unread'
                      ? 'i-heroicons-envelope'
                      : option.value === 'read'
                        ? 'i-heroicons-envelope-open'
                        : 'i-heroicons-inbox'
                  "
                  class="w-4 h-4"
                />
                <span>{{ option.label }}</span>
              </div>
              <UBadge
                v-if="option.value === 'unread' && unreadCount > 0"
                color="gray"
                variant="soft"
                size="xs"
              >
                {{ unreadCount }}
              </UBadge>
            </div>
          </template>
        </USelectMenu>
      </div>

      <!-- Quick Stats -->
      <div class="flex items-end">
        <div class="w-full grid grid-cols-2 gap-2">
          <div class="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-3 text-center">
            <p class="text-xs text-primary-600 dark:text-primary-400 mb-1">Belum Dibaca</p>
            <p class="text-lg font-bold text-primary-700 dark:text-primary-300">
              {{ unreadCount }}
            </p>
          </div>
          <div class="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 text-center">
            <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Total</p>
            <p class="text-lg font-bold text-gray-700 dark:text-gray-300">
              {{ Object.values(typeStats).reduce((a, b) => a + b, 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
