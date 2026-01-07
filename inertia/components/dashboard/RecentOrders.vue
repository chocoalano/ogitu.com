<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { RecentOrder } from './types'
import { getOrderStatusConfig } from './types'
import { useOrderFormatters } from '~/composables/use_orders'

defineProps<{
  orders: RecentOrder[]
}>()

const { formatPrice, formatRelativeTime } = useOrderFormatters()
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-blue-500" />
        </div>
        <h2 class="font-semibold text-gray-900 dark:text-white">Pesanan Terbaru</h2>
      </div>
      <Link href="/orders">
        <UButton variant="ghost" color="primary" size="sm">
          Lihat Semua
        </UButton>
      </Link>
    </div>

    <div v-if="orders.length > 0" class="divide-y divide-gray-100 dark:divide-gray-700/50">
      <Link
        v-for="order in orders"
        :key="order.id"
        :href="`/orders/${order.id}`"
        class="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
      >
        <!-- Product Image -->
        <div class="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0">
          <img
            v-if="order.firstItem?.image"
            :src="order.firstItem.image"
            :alt="order.firstItem.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <UIcon name="i-heroicons-photo" class="w-6 h-6 text-gray-400" />
          </div>
        </div>

        <!-- Order Info -->
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <span class="font-semibold text-gray-900 dark:text-white text-sm truncate">
              {{ order.orderNumber }}
            </span>
            <span :class="['inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium', getOrderStatusConfig(order.status).color]">
              <UIcon :name="getOrderStatusConfig(order.status).icon" class="w-3 h-3" />
              {{ getOrderStatusConfig(order.status).label }}
            </span>
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
            {{ order.firstItem?.name || 'Produk' }}
            <span v-if="order.itemCount > 1" class="text-gray-400"> +{{ order.itemCount - 1 }} lainnya</span>
          </p>
          <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">
            {{ formatRelativeTime(order.createdAt) }}
          </p>
        </div>

        <!-- Price -->
        <div class="text-right shrink-0">
          <p class="font-bold text-gray-900 dark:text-white">
            {{ formatPrice(order.total) }}
          </p>
          <UIcon name="i-heroicons-chevron-right" class="w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors mt-1" />
        </div>
      </Link>
    </div>

    <!-- Empty State -->
    <div v-else class="p-8 text-center">
      <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <UIcon name="i-heroicons-shopping-bag" class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Pesanan</h3>
      <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
        Mulai belanja dan temukan produk vape favoritmu!
      </p>
      <Link href="/collections">
        <UButton color="primary">
          <UIcon name="i-heroicons-shopping-cart" class="w-4 h-4 mr-2" />
          Mulai Belanja
        </UButton>
      </Link>
    </div>
  </div>
</template>
