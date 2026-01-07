<script setup lang="ts">
import type { AdminOrderShipping, TrackingInfo } from '~/types/admin_order'

const props = withDefaults(
  defineProps<{
    shipping: AdminOrderShipping
    tracking?: TrackingInfo | null
    loading?: boolean
  }>(),
  {
    tracking: null,
    loading: false,
  }
)

const emit = defineEmits<{
  refresh: []
  copy: [text: string]
}>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          Lacak Pengiriman
        </h3>
        <UButton
          color="neutral"
          variant="ghost"
          size="sm"
          icon="i-heroicons-arrow-path"
          :loading="loading"
          @click="emit('refresh')"
        >
          Refresh
        </UButton>
      </div>
    </template>

    <!-- Shipping Info -->
    <div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
      <div class="flex items-center justify-between">
        <div>
          <p class="font-semibold text-blue-900 dark:text-blue-100">
            {{ shipping.courierName }} - {{ shipping.courierService }}
          </p>
          <div class="flex items-center gap-2 mt-1">
            <p class="text-blue-800 dark:text-blue-200 font-mono">
              {{ shipping.waybill }}
            </p>
            <UButton
              color="neutral"
              variant="ghost"
              size="xs"
              icon="i-heroicons-clipboard-document"
              @click="emit('copy', shipping.waybill!)"
            />
          </div>
        </div>
        <UIcon name="i-heroicons-truck" class="w-10 h-10 text-blue-600 dark:text-blue-400" />
      </div>
    </div>

    <!-- Tracking Status -->
    <div v-if="tracking" class="space-y-4">
      <div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <UIcon
          :name="tracking.status === 'DELIVERED' ? 'i-heroicons-check-circle' : 'i-heroicons-truck'"
          :class="[
            'w-8 h-8',
            tracking.status === 'DELIVERED' ? 'text-green-600' : 'text-blue-600',
          ]"
        />
        <div>
          <p class="font-semibold text-gray-900 dark:text-white">
            {{ tracking.status }}
          </p>
          <p v-if="tracking.statusDescription" class="text-sm text-gray-500 dark:text-gray-400">
            {{ tracking.statusDescription }}
          </p>
        </div>
      </div>

      <!-- Tracking History -->
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900 dark:text-white">Riwayat Pengiriman</h4>
        <div class="relative">
          <div
            v-for="(history, index) in tracking.history"
            :key="index"
            class="flex gap-4 pb-4 last:pb-0"
          >
            <div class="relative flex flex-col items-center">
              <div
                :class="[
                  'w-3 h-3 rounded-full',
                  index === 0 ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600',
                ]"
              />
              <div
                v-if="index < tracking.history.length - 1"
                class="w-0.5 h-full bg-gray-200 dark:bg-gray-700 absolute top-3"
              />
            </div>
            <div class="flex-1 min-w-0 pb-4">
              <p class="text-sm font-medium text-gray-900 dark:text-white">
                {{ history.description }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {{ history.date }} {{ history.time }}
                <span v-if="history.city">• {{ history.city }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- No Tracking Data -->
    <div v-else class="text-center py-6">
      <UIcon name="i-heroicons-map-pin" class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
      <p class="mt-2 text-gray-500 dark:text-gray-400">
        Data tracking belum tersedia
      </p>
      <UButton
        color="primary"
        variant="soft"
        size="sm"
        class="mt-4"
        @click="emit('refresh')"
      >
        Cek Tracking
      </UButton>
    </div>
  </UCard>
</template>
