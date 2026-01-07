<script setup lang="ts">
import type { PromotionStats } from '~/types/promotion'

defineProps<{
  stats: PromotionStats
  type: 'discount' | 'voucher' | 'flash-sale'
}>()

const labels = {
  discount: {
    active: 'Aktif',
    upcoming: 'Akan Datang',
    expired: 'Kadaluarsa',
    inactive: 'Nonaktif',
  },
  voucher: {
    active: 'Aktif',
    upcoming: 'Akan Datang',
    expired: 'Kadaluarsa',
    inactive: 'Nonaktif',
  },
  'flash-sale': {
    active: 'Sedang Berlangsung',
    upcoming: 'Akan Datang',
    expired: 'Berakhir',
    inactive: 'Nonaktif',
  },
}
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-5 gap-4">
    <UCard class="relative overflow-hidden">
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
          <UIcon name="i-heroicons-tag" class="w-6 h-6 text-gray-600 dark:text-gray-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
        </div>
      </div>
    </UCard>

    <UCard class="relative overflow-hidden">
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
          <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-600 dark:text-green-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.active }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ labels[type].active }}</p>
        </div>
      </div>
    </UCard>

    <UCard class="relative overflow-hidden">
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-blue-100 dark:bg-blue-900/30">
          <UIcon name="i-heroicons-clock" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.upcoming }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ labels[type].upcoming }}</p>
        </div>
      </div>
    </UCard>

    <UCard class="relative overflow-hidden">
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-gray-100 dark:bg-gray-800">
          <UIcon name="i-heroicons-x-circle" class="w-6 h-6 text-gray-500 dark:text-gray-500" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.expired }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ labels[type].expired }}</p>
        </div>
      </div>
    </UCard>

    <UCard class="relative overflow-hidden">
      <div class="flex items-center gap-4">
        <div class="p-3 rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
          <UIcon name="i-heroicons-pause-circle" class="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stats.inactive }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ labels[type].inactive }}</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
