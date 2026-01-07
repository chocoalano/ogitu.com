<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { WithdrawalRequest } from '~/types/finance'
import { formatCurrency, formatDate } from '~/types/finance'

interface Props {
  withdrawals: WithdrawalRequest[]
  isLoading?: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'approve', withdrawal: WithdrawalRequest): void
  (e: 'reject', withdrawal: WithdrawalRequest): void
}>()

// Avatar placeholder
const getAvatarUrl = (avatar: string | null): string => {
  if (!avatar) {
    return 'https://placehold.co/40x40/1a1a2e/ffffff?text=U'
  }
  return avatar
}
</script>

<template>
  <UCard>
    <div v-if="isLoading" class="flex items-center justify-center py-12">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-gray-400" />
    </div>

    <div v-else-if="withdrawals.length === 0" class="text-center py-12">
      <UIcon name="i-heroicons-inbox" class="w-12 h-12 mx-auto text-gray-400 mb-3" />
      <p class="text-gray-500 dark:text-gray-400">Tidak ada permintaan withdraw</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Customer
            </th>
            <th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Bank Info
            </th>
            <th class="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400">
              Jumlah
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
            v-for="withdrawal in withdrawals"
            :key="withdrawal.id"
            class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <!-- Customer -->
            <td class="py-3 px-4">
              <div class="flex items-center gap-3">
                <img
                  :src="getAvatarUrl(withdrawal.customerAvatar)"
                  :alt="withdrawal.customerName"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p class="font-medium text-gray-900 dark:text-white">
                    {{ withdrawal.customerName }}
                  </p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ withdrawal.customerEmail }}
                  </p>
                </div>
              </div>
            </td>

            <!-- Bank Info -->
            <td class="py-3 px-4">
              <p class="font-medium text-gray-900 dark:text-white">{{ withdrawal.bankName }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ withdrawal.accountNumber }}
              </p>
              <p class="text-xs text-gray-400">{{ withdrawal.accountName }}</p>
            </td>

            <!-- Amount -->
            <td class="py-3 px-4 text-right">
              <p class="font-bold text-gray-900 dark:text-white">
                {{ formatCurrency(withdrawal.amount) }}
              </p>
            </td>

            <!-- Status -->
            <td class="py-3 px-4 text-center">
              <UBadge :color="withdrawal.statusColor as any" variant="soft">
                {{ withdrawal.statusLabel }}
              </UBadge>
            </td>

            <!-- Date -->
            <td class="py-3 px-4">
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ formatDate(withdrawal.createdAt) }}
              </p>
            </td>

            <!-- Actions -->
            <td class="py-3 px-4">
              <div class="flex items-center justify-center gap-2">
                <Link :href="`/admin/finance/withdraw/${withdrawal.id}`">
                  <UButton icon="i-heroicons-eye" color="neutral" variant="ghost" size="sm" />
                </Link>

                <template v-if="withdrawal.status === 'pending'">
                  <UButton
                    icon="i-heroicons-check"
                    color="success"
                    variant="soft"
                    size="sm"
                    @click="$emit('approve', withdrawal)"
                  />
                  <UButton
                    icon="i-heroicons-x-mark"
                    color="error"
                    variant="soft"
                    size="sm"
                    @click="$emit('reject', withdrawal)"
                  />
                </template>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </UCard>
</template>
