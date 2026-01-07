<script setup lang="ts">
import type { Order } from '~/types/order'

/**
 * OrderDetailActions - Action buttons for order detail page
 */
defineProps<{
  order: Order
  loading?: boolean
}>()

const emit = defineEmits<{
  pay: []
  confirmReceived: []
  cancel: []
}>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-5 space-y-3">
    <!-- Pay Button -->
    <UButton
      v-if="order.status === 'pending_payment'"
      color="primary"
      block
      size="lg"
      :loading="loading"
      class="shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
      @click="emit('pay')"
    >
      <UIcon name="i-heroicons-credit-card" class="w-5 h-5 mr-2" />
      Bayar Sekarang
    </UButton>

    <!-- Confirm Received Button -->
    <UButton
      v-if="order.status === 'shipped'"
      color="success"
      block
      size="lg"
      :loading="loading"
      class="shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
      @click="emit('confirmReceived')"
    >
      <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mr-2" />
      Konfirmasi Diterima
    </UButton>

    <!-- Cancel Button -->
    <UButton
      v-if="order.status === 'pending_payment'"
      color="error"
      variant="outline"
      block
      :loading="loading"
      @click="emit('cancel')"
    >
      <UIcon name="i-heroicons-x-circle" class="w-5 h-5 mr-2" />
      Batalkan Pesanan
    </UButton>

    <!-- Reorder Button -->
    <UButton
      v-if="order.status === 'delivered' || order.status === 'cancelled'"
      variant="soft"
      color="primary"
      block
    >
      <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
      Pesan Lagi
    </UButton>
  </div>
</template>
