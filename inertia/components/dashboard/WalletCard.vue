<script setup lang="ts">
import type { Wallet, WalletTransaction } from './types'
import { transactionTypeConfig } from './types'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  wallet: Wallet
  transactions: WalletTransaction[]
}>()

const emit = defineEmits<{
  openTopup: []
}>()

const { formatPrice, formatRelativeTime } = useOrderFormatters()
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header with Balance -->
    <div class="p-5 bg-linear-to-br from-emerald-500 to-teal-600 text-white">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
            <UIcon name="i-heroicons-wallet" class="w-5 h-5" />
          </div>
          <span class="font-semibold">E-Wallet</span>
        </div>
        <UButton size="sm" color="white" variant="solid" @click="emit('openTopup')">
          <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
          Top Up
        </UButton>
      </div>
      <div>
        <p class="text-white/70 text-sm mb-1">Saldo Tersedia</p>
        <p class="text-3xl font-bold">{{ formatPrice(wallet.balance) }}</p>
      </div>
      <div v-if="wallet.pendingBalance > 0" class="mt-3 pt-3 border-t border-white/20">
        <div class="flex items-center justify-between text-sm">
          <span class="text-white/70">Saldo Pending</span>
          <span class="font-medium">{{ formatPrice(wallet.pendingBalance) }}</span>
        </div>
      </div>
    </div>

    <!-- Recent Transactions -->
    <div class="p-4">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Transaksi Terakhir</h3>

      <div v-if="transactions.length > 0" class="space-y-3">
        <div
          v-for="tx in transactions"
          :key="tx.id"
          class="flex items-center gap-3"
        >
          <div :class="['w-8 h-8 rounded-lg flex items-center justify-center', transactionTypeConfig[tx.type]?.color || 'text-gray-500', 'bg-gray-100 dark:bg-gray-700']">
            <UIcon :name="transactionTypeConfig[tx.type]?.icon || 'i-heroicons-banknotes'" class="w-4 h-4" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ tx.description || transactionTypeConfig[tx.type]?.label || 'Transaksi' }}
            </p>
            <p class="text-xs text-gray-400">{{ formatRelativeTime(tx.createdAt) }}</p>
          </div>
          <p :class="['text-sm font-semibold', tx.type === 'withdrawal' || tx.type === 'payment' ? 'text-red-500' : 'text-emerald-500']">
            {{ tx.type === 'withdrawal' || tx.type === 'payment' ? '-' : '+' }}{{ formatPrice(tx.amount) }}
          </p>
        </div>
      </div>

      <div v-else class="text-center py-4">
        <p class="text-sm text-gray-400">Belum ada transaksi</p>
      </div>
    </div>
  </div>
</template>
