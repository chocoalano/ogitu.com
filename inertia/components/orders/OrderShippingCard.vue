<script setup lang="ts">
import type { OrderShipping } from '~/types/order'

/**
 * OrderShippingCard - Shipping information card
 */
defineProps<{
  shipping: OrderShipping
}>()

const courierLogos: Record<string, string> = {
  jne: 'JNE',
  jnt: 'J&T',
  sicepat: 'SiCepat',
  anteraja: 'AnterAja',
  pos: 'POS',
  tiki: 'TIKI',
}

const copyToClipboard = (text: string) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-truck" class="w-5 h-5 text-orange-500" />
        </div>
        <h2 class="font-semibold text-gray-900 dark:text-white">Informasi Pengiriman</h2>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5">
      <div class="grid grid-cols-2 gap-4">
        <!-- Courier -->
        <div class="space-y-1">
          <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Kurir</p>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <span class="text-xs font-bold text-gray-600 dark:text-gray-300">
                {{ courierLogos[shipping.courier.toLowerCase()] || shipping.courier.substring(0, 3).toUpperCase() }}
              </span>
            </div>
            <div>
              <p class="font-medium text-gray-900 dark:text-white text-sm">
                {{ shipping.courier }}
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                {{ shipping.service }}
              </p>
            </div>
          </div>
        </div>

        <!-- Tracking Number -->
        <div class="space-y-1">
          <p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">No. Resi</p>
          <div v-if="shipping.trackingNumber" class="flex items-center gap-2">
            <code class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-gray-700 dark:text-gray-300">
              {{ shipping.trackingNumber }}
            </code>
            <button
              class="p-1.5 text-gray-400 hover:text-primary-500 transition-colors"
              title="Salin No. Resi"
              @click="copyToClipboard(shipping.trackingNumber!)"
            >
              <UIcon name="i-heroicons-clipboard-document" class="w-4 h-4" />
            </button>
          </div>
          <p v-else class="text-sm text-gray-400 dark:text-gray-500">
            Belum tersedia
          </p>
        </div>
      </div>

      <!-- Track Button -->
      <div v-if="shipping.trackingNumber" class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">
        <UButton
          variant="outline"
          color="primary"
          block
          size="sm"
        >
          <UIcon name="i-heroicons-magnifying-glass" class="w-4 h-4 mr-2" />
          Lacak Pengiriman
        </UButton>
      </div>
    </div>
  </div>
</template>
