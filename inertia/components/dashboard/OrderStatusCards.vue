<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { OrderStats } from './types'

defineProps<{
  stats: OrderStats
}>()

const orderStatusCards = [
  { key: 'pendingPayment', label: 'Belum Bayar', icon: 'i-heroicons-clock', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-500/10' },
  { key: 'processing', label: 'Diproses', icon: 'i-heroicons-cog-6-tooth', color: 'from-indigo-500 to-purple-500', bgColor: 'bg-indigo-500/10' },
  { key: 'shipped', label: 'Dikirim', icon: 'i-heroicons-truck', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-500/10' },
  { key: 'delivered', label: 'Selesai', icon: 'i-heroicons-check-badge', color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-500/10' },
]
</script>

<template>
  <div class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <h2 class="text-lg font-bold text-gray-900 dark:text-white">Status Pesanan</h2>
      <Link href="/orders" class="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1">
        Lihat Semua
        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
      </Link>
    </div>
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Link
        v-for="card in orderStatusCards"
        :key="card.key"
        :href="`/orders?status=${card.key === 'pendingPayment' ? 'pending_payment' : card.key}`"
        class="group relative p-5 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
      >
        <!-- Background Glow -->
        <div :class="['absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300', card.bgColor]" />

        <div class="relative">
          <div :class="['w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center mb-3', card.color]">
            <UIcon :name="card.icon" class="w-5 h-5 text-white" />
          </div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white mb-1">
            {{ stats[card.key as keyof OrderStats] }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ card.label }}</p>
        </div>
      </Link>
    </div>
  </div>
</template>
