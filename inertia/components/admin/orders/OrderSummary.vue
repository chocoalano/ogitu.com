<script setup lang="ts">
import { useOrderFormatters } from '~/composables/use_order_formatters'

defineProps<{
  subtotal: number
  shippingCost: number
  discount: number
  tax: number
  adminFee: number
  total: number
}>()

const { formatCurrency } = useOrderFormatters()
</script>

<template>
  <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-3">
    <div class="flex justify-between text-sm">
      <span class="text-gray-500 dark:text-gray-400">Subtotal</span>
      <span class="text-gray-900 dark:text-white">{{ formatCurrency(subtotal) }}</span>
    </div>
    <div class="flex justify-between text-sm">
      <span class="text-gray-500 dark:text-gray-400">Ongkos Kirim</span>
      <span class="text-gray-900 dark:text-white">{{ formatCurrency(shippingCost) }}</span>
    </div>
    <div v-if="discount > 0" class="flex justify-between text-sm">
      <span class="text-gray-500 dark:text-gray-400">Diskon</span>
      <span class="text-green-600 dark:text-green-400">-{{ formatCurrency(discount) }}</span>
    </div>
    <div v-if="tax > 0" class="flex justify-between text-sm">
      <span class="text-gray-500 dark:text-gray-400">Pajak</span>
      <span class="text-gray-900 dark:text-white">{{ formatCurrency(tax) }}</span>
    </div>
    <div v-if="adminFee > 0" class="flex justify-between text-sm">
      <span class="text-gray-500 dark:text-gray-400">Biaya Admin</span>
      <span class="text-gray-900 dark:text-white">{{ formatCurrency(adminFee) }}</span>
    </div>
    <div class="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-800">
      <span class="text-gray-900 dark:text-white">Total</span>
      <span class="text-primary-600 dark:text-primary-400">{{ formatCurrency(total) }}</span>
    </div>
  </div>
</template>
