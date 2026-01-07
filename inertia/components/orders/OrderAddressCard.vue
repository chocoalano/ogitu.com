<script setup lang="ts">
import type { OrderAddress } from '~/types/order'

/**
 * OrderAddressCard - Display shipping address
 */
defineProps<{
  address: OrderAddress
}>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-emerald-500" />
        </div>
        <h2 class="font-semibold text-gray-900 dark:text-white">Alamat Pengiriman</h2>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 space-y-3">
      <!-- Recipient -->
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 rounded-full bg-linear-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
          {{ address.recipientName.charAt(0).toUpperCase() }}
        </div>
        <div>
          <p class="font-semibold text-gray-900 dark:text-white">
            {{ address.recipientName }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
            <UIcon name="i-heroicons-phone" class="w-3.5 h-3.5" />
            {{ address.phone }}
          </p>
        </div>
      </div>

      <!-- Divider -->
      <div class="border-t border-gray-100 dark:border-gray-700/50" />

      <!-- Address Lines -->
      <div class="text-gray-600 dark:text-gray-400 text-sm space-y-1">
        <p>{{ address.addressLine1 }}</p>
        <p v-if="address.addressLine2">{{ address.addressLine2 }}</p>
        <p class="font-medium text-gray-700 dark:text-gray-300">
          {{ address.cityName }}, {{ address.provinceName }}
        </p>
        <p class="inline-flex items-center gap-1.5 text-gray-500">
          <UIcon name="i-heroicons-envelope" class="w-3.5 h-3.5" />
          {{ address.postalCode }}
        </p>
      </div>
    </div>
  </div>
</template>
