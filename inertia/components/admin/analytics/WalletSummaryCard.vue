<script setup lang="ts">
import { computed } from 'vue'
import type { WalletSummary } from '~/types/analytics'
import { formatCurrency } from '~/types/analytics'

interface Props {
  summary: WalletSummary
}

const props = defineProps<Props>()

const stats = computed(() => [
  {
    title: 'Top Up',
    value: formatCurrency(props.summary.topupTotal),
    icon: 'i-heroicons-arrow-down-circle',
    color: 'text-green-500',
    bgColor: 'bg-green-100 dark:bg-green-900',
  },
  {
    title: 'Penarikan',
    value: formatCurrency(props.summary.withdrawalTotal),
    icon: 'i-heroicons-arrow-up-circle',
    color: 'text-red-500',
    bgColor: 'bg-red-100 dark:bg-red-900',
  },
  {
    title: 'Komisi Affiliate',
    value: formatCurrency(props.summary.commissionTotal),
    icon: 'i-heroicons-users',
    color: 'text-purple-500',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
  },
  {
    title: 'Refund',
    value: formatCurrency(props.summary.refundTotal),
    icon: 'i-heroicons-arrow-uturn-left',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100 dark:bg-orange-900',
  },
])

const netFlowClass = computed(() => {
  if (props.summary.netWalletFlow > 0) return 'text-green-500'
  if (props.summary.netWalletFlow < 0) return 'text-red-500'
  return 'text-gray-500'
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Ringkasan Wallet</h3>
        <div class="text-right">
          <p class="text-sm text-gray-500">Net Flow</p>
          <p class="text-xl font-bold" :class="netFlowClass">
            {{ formatCurrency(summary.netWalletFlow) }}
          </p>
        </div>
      </div>
    </template>

    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.title"
        class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
      >
        <div class="flex items-center gap-2 mb-2">
          <div class="p-2 rounded-lg" :class="stat.bgColor">
            <UIcon :name="stat.icon" class="w-5 h-5" :class="stat.color" />
          </div>
          <span class="text-sm text-gray-500">{{ stat.title }}</span>
        </div>
        <p class="text-lg font-semibold">{{ stat.value }}</p>
      </div>
    </div>
  </UCard>
</template>
