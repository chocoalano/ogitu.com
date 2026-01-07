<script setup lang="ts">
import { computed } from 'vue'
import type { AdminOrderPayment } from '~/types/admin_order'
import { useOrderFormatters } from '~/composables/use_order_formatters'

const props = defineProps<{
  payment: AdminOrderPayment | null
}>()

const { formatShortDate } = useOrderFormatters()

// Payment status configuration
const paymentStatusConfig = computed(() => {
  const status = props.payment?.status || 'pending'
  const configs: Record<string, { label: string; color: string }> = {
    pending: { label: 'Menunggu Pembayaran', color: 'warning' },
    capture: { label: 'Diproses', color: 'info' },
    settlement: { label: 'Lunas', color: 'success' },
    deny: { label: 'Ditolak', color: 'error' },
    cancel: { label: 'Dibatalkan', color: 'error' },
    expire: { label: 'Kadaluarsa', color: 'neutral' },
    refund: { label: 'Refund', color: 'neutral' },
  }
  return configs[status] || { label: status, color: 'neutral' }
})

// Format payment method
const formattedMethod = computed(() => {
  const method = props.payment?.method || ''
  const methodLabels: Record<string, string> = {
    bank_transfer: 'Transfer Bank',
    credit_card: 'Kartu Kredit',
    gopay: 'GoPay',
    shopeepay: 'ShopeePay',
    qris: 'QRIS',
    cstore: 'Convenience Store',
    echannel: 'Mandiri Bill',
    bca_va: 'BCA Virtual Account',
    bni_va: 'BNI Virtual Account',
    bri_va: 'BRI Virtual Account',
    permata_va: 'Permata Virtual Account',
  }
  return methodLabels[method] || method?.replace(/_/g, ' ') || '-'
})
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Informasi Pembayaran
      </h3>
    </template>

    <div v-if="payment" class="space-y-3">
      <div class="flex justify-between">
        <span class="text-gray-500 dark:text-gray-400">Metode</span>
        <span class="font-medium text-gray-900 dark:text-white capitalize">
          {{ formattedMethod }}
        </span>
      </div>
      <div class="flex justify-between">
        <span class="text-gray-500 dark:text-gray-400">Status</span>
        <UBadge
          :color="paymentStatusConfig.color as any"
          variant="soft"
          size="sm"
        >
          {{ paymentStatusConfig.label }}
        </UBadge>
      </div>
      <div v-if="payment.paidAt" class="flex justify-between">
        <span class="text-gray-500 dark:text-gray-400">Dibayar</span>
        <span class="text-gray-900 dark:text-white">
          {{ formatShortDate(payment.paidAt) }}
        </span>
      </div>
    </div>

    <div v-else class="text-center py-4 text-gray-500 dark:text-gray-400">
      <UIcon name="i-heroicons-credit-card" class="w-8 h-8 mx-auto mb-2 opacity-50" />
      <p>Belum ada informasi pembayaran</p>
    </div>
  </UCard>
</template>
