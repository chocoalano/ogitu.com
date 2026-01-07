<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { Transaction } from '~/types/finance'
import { formatCurrency, formatDate } from '~/types/finance'

interface Props {
  transactions: Transaction[]
  isLoading?: boolean
}

defineProps<Props>()

// Avatar placeholder
const getAvatarUrl = (avatar: string | null): string => {
  if (!avatar) {
    return 'https://placehold.co/40x40/1a1a2e/ffffff?text=U'
  }
  return avatar
}

// Determine if amount is positive (income) or negative (expense)
const isIncome = (type: string): boolean => {
  return ['topup', 'commission', 'refund', 'cashback'].includes(type)
}
</script>

<template>
  <UCard>
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-gray-400" />
    </div>

    <div v-else-if="transactions.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-inbox" class="w-12 h-12 mx-auto text-gray-400 mb-3" />
      <p class="text-gray-500 dark:text-gray-400">Tidak ada transaksi</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Customer
            </th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Tipe
            </th>
            <th class="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Jumlah
            </th>
            <th class="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Saldo
            </th>
            <th class="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Status
            </th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Tanggal
            </th>
            <th class="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="transaction in transactions"
            :key="transaction.id"
            class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <!-- Customer -->
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <img
                  :src="getAvatarUrl(transaction.customerAvatar)"
                  :alt="transaction.customerName"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ transaction.customerName }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ transaction.customerEmail }}
                  </p>
                </div>
              </div>
            </td>

            <!-- Type -->
            <td class="py-3 px-4">
              <div class="flex items-center gap-2">
                <div
                  :class="[
                    'p-1.5 rounded-lg',
                    `bg-${transaction.typeColor}-100 dark:bg-${transaction.typeColor}-900/30`,
                  ]"
                >
                  <UIcon
                    :name="transaction.typeIcon"
                    :class="[
                      'w-4 h-4',
                      `text-${transaction.typeColor}-600 dark:text-${transaction.typeColor}-400`,
                    ]"
                  />
                </div>
                <span class="font-medium text-gray-900 dark:text-white">
                  {{ transaction.typeLabel }}
                </span>
              </div>
            </td>

            <!-- Amount -->
            <td class="py-3 px-4 text-right">
              <p
                :class="[
                  'font-bold',
                  isIncome(transaction.transactionType)
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-error-600 dark:text-error-400',
                ]"
              >
                {{ isIncome(transaction.transactionType) ? '+' : '-' }}
                {{ formatCurrency(transaction.amount) }}
              </p>
            </td>

            <!-- Balance -->
            <td class="py-3 px-4 text-right">
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ formatCurrency(transaction.balanceBefore) }}
              </p>
              <p class="font-medium text-gray-900 dark:text-white">
                → {{ formatCurrency(transaction.balanceAfter) }}
              </p>
            </td>

            <!-- Status -->
            <td class="py-3 px-4 text-center">
              <UBadge :color="transaction.statusColor as any" variant="soft">
                {{ transaction.statusLabel }}
              </UBadge>
            </td>

            <!-- Date -->
            <td class="py-3 px-4">
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ formatDate(transaction.createdAt) }}
              </p>
            </td>

            <!-- Actions -->
            <td class="py-3 px-4 text-center">
              <Link :href="`/admin/finance/transactions/${transaction.id}`">
                <UButton icon="i-heroicons-eye" color="neutral" variant="ghost" size="sm" />
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UCard>
</template>
