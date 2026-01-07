<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { RecentSaleOrder } from '~/types/analytics'
import { formatCurrency, formatDate, orderStatusLabels, orderStatusColors } from '~/types/analytics'

interface Props {
  orders: RecentSaleOrder[]
}

defineProps<Props>()

const getStatusColor = (status: string) => {
  return orderStatusColors[status] || 'gray'
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Pesanan Terbaru</h3>
        <Link href="/admin/orders">
          <UButton variant="ghost" size="sm">
            Lihat Semua
            <UIcon name="i-heroicons-arrow-right" class="ml-1" />
          </UButton>
        </Link>
      </div>
    </template>

    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-3 px-4 font-medium text-gray-500">No. Pesanan</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Pelanggan</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Total</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Status</th>
            <th class="text-left py-3 px-4 font-medium text-gray-500">Tanggal</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="order in orders"
            :key="order.id"
            class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <td class="py-3 px-4">
              <Link :href="`/admin/orders/${order.id}`" class="text-primary-500 hover:text-primary-600 font-medium">
                {{ order.orderNumber }}
              </Link>
            </td>
            <td class="py-3 px-4">{{ order.customerName }}</td>
            <td class="py-3 px-4 font-medium">{{ formatCurrency(order.total) }}</td>
            <td class="py-3 px-4">
              <UBadge :color="getStatusColor(order.status)" variant="soft">
                {{ orderStatusLabels[order.status] || order.status }}
              </UBadge>
            </td>
            <td class="py-3 px-4 text-gray-500">{{ formatDate(order.createdAt) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="orders.length === 0" class="text-center text-gray-500 py-8">
      Belum ada pesanan
    </div>
  </UCard>
</template>
