<script setup lang="ts">
import { computed } from 'vue'
import type { ProfileStats, ProfileWallet } from './types'

const props = defineProps<{
  stats: ProfileStats
  wallet: ProfileWallet
  formatPrice: (price: number) => string
}>()

const statsCards = computed(() => [
  {
    icon: 'i-heroicons-shopping-bag',
    value: props.stats.totalOrders.toString(),
    label: 'Total Pesanan',
    color: 'blue',
    bgClass: 'bg-blue-500/10',
    iconClass: 'text-blue-500',
  },
  {
    icon: 'i-heroicons-banknotes',
    value: props.formatPrice(props.stats.totalSpent),
    label: 'Total Belanja',
    color: 'emerald',
    bgClass: 'bg-emerald-500/10',
    iconClass: 'text-emerald-500',
  },
  {
    icon: 'i-heroicons-wallet',
    value: props.formatPrice(props.wallet.balance),
    label: 'Saldo Wallet',
    color: 'purple',
    bgClass: 'bg-purple-500/10',
    iconClass: 'text-purple-500',
  },
  {
    icon: 'i-heroicons-clock',
    value: props.formatPrice(props.wallet.pendingBalance),
    label: 'Pending Balance',
    color: 'orange',
    bgClass: 'bg-orange-500/10',
    iconClass: 'text-orange-500',
  },
])
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
    <div
      v-for="card in statsCards"
      :key="card.label"
      class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-5 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300 group"
    >
      <div :class="['w-10 h-10 rounded-xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110', card.bgClass]">
        <UIcon :name="card.icon" :class="['w-5 h-5', card.iconClass]" />
      </div>
      <p class="text-2xl font-bold text-gray-900 dark:text-white truncate">{{ card.value }}</p>
      <p class="text-sm text-gray-500 dark:text-gray-400">{{ card.label }}</p>
    </div>
  </div>
</template>
