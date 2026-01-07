<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { OrderStats } from './types'

const props = defineProps<{
  stats: OrderStats
  cartCount: number
  wishlistCount: number
  addressCount: number
}>()

const quickActions = [
  { label: 'Pesanan Saya', href: '/orders', icon: 'i-heroicons-shopping-bag', count: props.stats.totalOrders },
  { label: 'Keranjang', href: '/cart', icon: 'i-heroicons-shopping-cart', count: props.cartCount },
  { label: 'Wishlist', href: '/wishlist', icon: 'i-heroicons-heart', count: props.wishlistCount },
  { label: 'Alamat', href: '/addresses', icon: 'i-heroicons-map-pin', count: props.addressCount },
]
</script>

<template>
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
    <Link
      v-for="action in quickActions"
      :key="action.href"
      :href="action.href"
      class="group relative p-5 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
    >
      <div class="flex items-center justify-between mb-3">
        <div class="w-12 h-12 rounded-xl bg-linear-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300">
          <UIcon :name="action.icon" class="w-6 h-6 text-primary-500" />
        </div>
        <span v-if="action.count > 0" class="px-2.5 py-1 rounded-full text-xs font-bold bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
          {{ action.count }}
        </span>
      </div>
      <p class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
        {{ action.label }}
      </p>
      <UIcon name="i-heroicons-arrow-right" class="absolute bottom-5 right-5 w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300" />
    </Link>
  </div>
</template>
