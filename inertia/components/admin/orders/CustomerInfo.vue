<script setup lang="ts">
import type { AdminOrderCustomer } from '~/types/admin_order'

defineProps<{
  customer: AdminOrderCustomer
}>()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Informasi Pembeli
      </h3>
    </template>

    <div class="space-y-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-user" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ customer.name }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ customer.email }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-3 text-sm">
        <UIcon name="i-heroicons-phone" class="w-4 h-4 text-gray-400" />
        <span class="text-gray-600 dark:text-gray-400">{{ customer.phone }}</span>
      </div>
    </div>
  </UCard>
</template>
