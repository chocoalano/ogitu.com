<script setup lang="ts">
import { computed } from 'vue'
import type { AdminOrder } from '~/types/admin_order'
import OrderCard from '~/components/admin/orders/OrderCard.vue'

const props = defineProps<{
  orders: AdminOrder[]
  total: number
  loading?: boolean
}>()

const emit = defineEmits<{
  view: [order: AdminOrder]
  process: [order: AdminOrder]
  ship: [order: AdminOrder]
  track: [order: AdminOrder]
  cancel: [order: AdminOrder]
}>()

const hasOrders = computed(() => props.orders.length > 0)
</script>

<template>
  <UCard :ui="{ body: { padding: '' } }">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Daftar Pesanan</h3>
        <UBadge color="neutral" variant="soft">{{ total }} pesanan</UBadge>
      </div>
    </template>

    <div v-if="loading" class="p-8 flex justify-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-primary-500 animate-spin" />
    </div>

    <div v-else-if="!hasOrders" class="p-8 text-center">
      <UIcon name="i-heroicons-shopping-bag" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
      <h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white">Belum Ada Pesanan</h3>
      <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Pesanan dari pelanggan akan muncul di sini</p>
    </div>

    <div v-else class="divide-y divide-gray-200 dark:divide-gray-800">
      <OrderCard
        v-for="order in orders"
        :key="order.id"
        :order="order"
        @view="emit('view', order)"
        @process="emit('process', order)"
        @ship="emit('ship', order)"
        @track="emit('track', order)"
        @cancel="emit('cancel', order)"
      />
    </div>

    <template #footer>
      <slot name="pagination" />
    </template>
  </UCard>
</template>
