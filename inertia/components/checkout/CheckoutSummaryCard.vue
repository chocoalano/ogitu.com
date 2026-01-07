<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  subtotal: number
  totalItems: number
  totalShipping: number
  canCheckout: boolean
  isProcessing: boolean
}>()

const emit = defineEmits<{
  checkout: []
}>()

const grandTotal = computed(() => props.subtotal + props.totalShipping)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}
</script>

<template>
  <div class="sticky top-4">
    <UCard>
      <template #header>
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ringkasan Pesanan</h3>
      </template>

      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Subtotal ({{ totalItems }} item)</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ formatPrice(subtotal) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600 dark:text-gray-400">Total Ongkos Kirim</span>
          <span class="font-medium text-gray-900 dark:text-white">{{ formatPrice(totalShipping) }}</span>
        </div>

        <USeparator />

        <div class="flex justify-between text-lg">
          <span class="font-semibold text-gray-900 dark:text-white">Total</span>
          <span class="font-bold text-primary">{{ formatPrice(grandTotal) }}</span>
        </div>
      </div>

      <template #footer>
        <UButton
          block
          size="lg"
          :disabled="!canCheckout || isProcessing"
          :loading="isProcessing"
          @click="emit('checkout')"
        >
          <UIcon v-if="!isProcessing" name="i-heroicons-credit-card" class="mr-2" />
          {{ isProcessing ? 'Memproses...' : 'Bayar Sekarang' }}
        </UButton>
        <p class="text-xs text-center text-gray-500 dark:text-gray-400 mt-3">
          Dengan melanjutkan, Anda menyetujui syarat dan ketentuan yang berlaku
        </p>
      </template>
    </UCard>
  </div>
</template>
