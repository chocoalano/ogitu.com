<script setup lang="ts">
import type { TransactionStats } from '~/types/finance'
import { formatCurrency } from '~/types/finance'

interface Props {
  stats: TransactionStats
}

defineProps<Props>()
</script>

<template>
  <div class="space-y-4">
    <!-- Overview Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <UIcon
              name="i-heroicons-document-text"
              class="w-5 h-5 text-primary-600 dark:text-primary-400"
            />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Transaksi</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">
              {{ stats.totalTransactions.toLocaleString() }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-success-100 dark:bg-success-900/30">
            <UIcon
              name="i-heroicons-calendar"
              class="w-5 h-5 text-success-600 dark:text-success-400"
            />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Bulan Ini</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">
              {{ stats.monthTransactions.toLocaleString() }}
            </p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-info-100 dark:bg-info-900/30">
            <UIcon name="i-heroicons-clock" class="w-5 h-5 text-info-600 dark:text-info-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Hari Ini</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">
              {{ stats.todayTransactions.toLocaleString() }}
            </p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Amount Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      <UCard>
        <div class="text-center">
          <UIcon
            name="i-heroicons-arrow-down-circle"
            class="w-6 h-6 mx-auto text-success-500 mb-2"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">Top Up</p>
          <p class="font-bold text-gray-900 dark:text-white text-sm">
            {{ formatCurrency(stats.totalTopup) }}
          </p>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <UIcon name="i-heroicons-arrow-up-circle" class="w-6 h-6 mx-auto text-error-500 mb-2" />
          <p class="text-xs text-gray-500 dark:text-gray-400">Penarikan</p>
          <p class="font-bold text-gray-900 dark:text-white text-sm">
            {{ formatCurrency(stats.totalWithdrawal) }}
          </p>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <UIcon
            name="i-heroicons-currency-dollar"
            class="w-6 h-6 mx-auto text-primary-500 mb-2"
          />
          <p class="text-xs text-gray-500 dark:text-gray-400">Komisi</p>
          <p class="font-bold text-gray-900 dark:text-white text-sm">
            {{ formatCurrency(stats.totalCommission) }}
          </p>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6 mx-auto text-warning-500 mb-2" />
          <p class="text-xs text-gray-500 dark:text-gray-400">Pembayaran</p>
          <p class="font-bold text-gray-900 dark:text-white text-sm">
            {{ formatCurrency(stats.totalPayment) }}
          </p>
        </div>
      </UCard>

      <UCard>
        <div class="text-center">
          <UIcon name="i-heroicons-arrow-uturn-left" class="w-6 h-6 mx-auto text-info-500 mb-2" />
          <p class="text-xs text-gray-500 dark:text-gray-400">Refund</p>
          <p class="font-bold text-gray-900 dark:text-white text-sm">
            {{ formatCurrency(stats.totalRefund) }}
          </p>
        </div>
      </UCard>
    </div>
  </div>
</template>
