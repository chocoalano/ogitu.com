<script setup lang="ts">
import type { AdminOrderAddress } from '~/types/admin_order'

defineProps<{
  address: AdminOrderAddress
}>()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Alamat Pengiriman
      </h3>
    </template>

    <div class="space-y-2">
      <p class="font-medium text-gray-900 dark:text-white">
        {{ address.recipientName }}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ address.phone }}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ address.fullAddress }}
      </p>
    </div>
  </UCard>
</template>
