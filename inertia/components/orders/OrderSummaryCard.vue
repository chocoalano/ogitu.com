<script setup lang="ts">
import type { Order } from '~/types/order'
import { useOrderFormatters } from '~/composables/use_orders'

/**
 * OrderSummaryCard - Payment summary card
 */
const props = defineProps<{
  order: Order
}>()

const { formatPrice } = useOrderFormatters()
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-calculator" class="w-5 h-5 text-violet-500" />
        </div>
        <h2 class="font-semibold text-gray-900 dark:text-white">Ringkasan Pembayaran</h2>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <!-- Items -->
      <div class="space-y-3">
        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">
            Subtotal ({{ order.items.length }} produk)
          </span>
          <span class="text-gray-700 dark:text-gray-300">{{ formatPrice(order.subtotal) }}</span>
        </div>

        <div class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">Ongkos Kirim</span>
          <span class="text-gray-700 dark:text-gray-300">{{ formatPrice(order.shippingCost) }}</span>
        </div>

        <div v-if="order.discount > 0" class="flex justify-between text-sm">
          <span class="text-emerald-600 dark:text-emerald-400">Diskon</span>
          <span class="text-emerald-600 dark:text-emerald-400">-{{ formatPrice(order.discount) }}</span>
        </div>

        <div v-if="order.adminFee && order.adminFee > 0" class="flex justify-between text-sm">
          <span class="text-gray-500 dark:text-gray-400">Biaya Layanan</span>
          <span class="text-gray-700 dark:text-gray-300">{{ formatPrice(order.adminFee) }}</span>
        </div>
      </div>

      <!-- Divider -->
      <div class="my-4 border-t border-dashed border-gray-200 dark:border-gray-700" />

      <!-- Total -->
      <div class="flex justify-between items-center">
        <span class="font-semibold text-gray-900 dark:text-white">Total</span>
        <span class="text-xl font-bold bg-linear-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">
          {{ formatPrice(order.total) }}
        </span>
      </div>

      <!-- Payment Method -->
      <div v-if="order.payment" class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-credit-card" class="w-4 h-4" />
            <span>Metode Pembayaran</span>
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
            {{ order.payment.method }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
