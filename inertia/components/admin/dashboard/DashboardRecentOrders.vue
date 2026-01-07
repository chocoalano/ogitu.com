<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { RecentOrder } from '../types'
import { formatCurrency, getOrderStatusColor, getOrderStatusLabel, formatRelativeDate } from '../utils'

defineProps<{
  orders: RecentOrder[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">
          <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5 text-white" />
        </div>
        <h2 class="font-semibold text-slate-900 dark:text-white">Pesanan Terbaru</h2>
      </div>
      <Link
        href="/admin/orders"
        class="text-sm text-violet-600 hover:text-violet-500 font-medium flex items-center gap-1"
      >
        Lihat Semua
        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
      </Link>
    </div>

    <!-- Orders List -->
    <div v-if="orders && orders.length > 0" class="divide-y divide-slate-100 dark:divide-slate-800">
      <Link
        v-for="order in orders"
        :key="order.id"
        :href="`/admin/orders/${order.id}`"
        class="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <div class="flex items-center gap-4">
          <!-- Customer Avatar -->
          <div
            class="w-10 h-10 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center overflow-hidden"
          >
            <img
              v-if="order.customerAvatar"
              :src="order.customerAvatar"
              :alt="order.customerName"
              class="w-full h-full object-cover"
            />
            <UIcon v-else name="i-heroicons-user" class="w-5 h-5 text-slate-400" />
          </div>
          <div>
            <p class="font-medium text-slate-900 dark:text-white">{{ order.orderNumber }}</p>
            <div class="flex items-center gap-2 text-sm text-slate-500">
              <span>{{ order.customerName }}</span>
              <span class="w-1 h-1 bg-slate-300 rounded-full"></span>
              <span>{{ order.itemCount }} item</span>
            </div>
          </div>
        </div>
        <div class="text-right">
          <p class="font-semibold text-slate-900 dark:text-white">{{ formatCurrency(order.total) }}</p>
          <div class="flex items-center gap-2 justify-end mt-1">
            <UBadge :color="getOrderStatusColor(order.status)" variant="subtle" size="xs">
              {{ getOrderStatusLabel(order.status) }}
            </UBadge>
          </div>
          <p class="text-xs text-slate-400 mt-1">{{ formatRelativeDate(order.createdAt) }}</p>
        </div>
      </Link>
    </div>

    <!-- Empty State -->
    <div v-else class="p-12 text-center">
      <div
        class="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
      >
        <UIcon name="i-heroicons-inbox" class="w-10 h-10 text-slate-400" />
      </div>
      <p class="text-slate-500 dark:text-slate-400 font-medium">Belum ada pesanan</p>
      <p class="text-sm text-slate-400 mt-1">Pesanan baru akan muncul di sini</p>
    </div>
  </div>
</template>
