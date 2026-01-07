<script setup lang="ts">
import type { WithdrawalStats } from '~/types/finance'
import { formatCurrency } from '~/types/finance'

interface Props {
  stats: WithdrawalStats
}

defineProps<Props>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <!-- Pending -->
    <UCard>
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-warning-100 dark:bg-warning-900/30">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-warning-600 dark:text-warning-400" />
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Menunggu</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.pending }}</p>
          <p class="text-xs text-gray-400">{{ formatCurrency(stats.pendingAmount) }}</p>
        </div>
      </div>
    </UCard>

    <!-- Completed -->
    <UCard>
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-success-100 dark:bg-success-900/30">
          <UIcon
            name="i-heroicons-check-circle"
            class="w-5 h-5 text-success-600 dark:text-success-400"
          />
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Selesai</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.completed }}</p>
          <p class="text-xs text-gray-400">{{ formatCurrency(stats.totalAmount) }}</p>
        </div>
      </div>
    </UCard>

    <!-- Failed -->
    <UCard>
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-error-100 dark:bg-error-900/30">
          <UIcon name="i-heroicons-x-circle" class="w-5 h-5 text-error-600 dark:text-error-400" />
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Ditolak</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.failed }}</p>
        </div>
      </div>
    </UCard>

    <!-- Total -->
    <UCard>
      <div class="flex items-center gap-3">
        <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
          <UIcon
            name="i-heroicons-banknotes"
            class="w-5 h-5 text-primary-600 dark:text-primary-400"
          />
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Total Request</p>
          <p class="text-xl font-bold text-gray-900 dark:text-white">{{ stats.total }}</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
