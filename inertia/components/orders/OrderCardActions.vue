<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { Order } from '~/types/order'

/**
 * OrderCardActions - Action buttons for order card
 */
const props = defineProps<{
  order: Order
}>()

const emit = defineEmits<{
  pay: []
  confirmReceived: []
}>()
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <!-- Pay Now Button -->
    <UButton
      v-if="order.status === 'pending_payment'"
      color="primary"
      size="sm"
      class="shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300"
      @click="emit('pay')"
    >
      <UIcon name="i-heroicons-credit-card" class="w-4 h-4 mr-1.5" />
      Bayar Sekarang
    </UButton>

    <!-- Confirm Received Button -->
    <UButton
      v-if="order.status === 'shipped'"
      color="success"
      size="sm"
      class="shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300"
      @click="emit('confirmReceived')"
    >
      <UIcon name="i-heroicons-check-circle" class="w-4 h-4 mr-1.5" />
      Konfirmasi Diterima
    </UButton>

    <!-- Track Shipment -->
    <UButton
      v-if="order.status === 'shipped' && order.shipping?.trackingNumber"
      variant="outline"
      color="primary"
      size="sm"
    >
      <UIcon name="i-heroicons-truck" class="w-4 h-4 mr-1.5" />
      Lacak
    </UButton>

    <!-- View Detail Button -->
    <Link :href="`/orders/${order.id}`">
      <UButton
        variant="ghost"
        color="neutral"
        size="sm"
        class="group/btn"
      >
        <span>Lihat Detail</span>
        <UIcon
          name="i-heroicons-arrow-right"
          class="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200"
        />
      </UButton>
    </Link>
  </div>
</template>
