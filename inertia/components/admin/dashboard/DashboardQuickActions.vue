<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

// Quick actions for admin dashboard
const quickActions = [
  {
    label: 'Tambah Produk Baru',
    description: 'Device, liquid, atau aksesoris',
    icon: 'i-heroicons-plus-circle',
    to: '/admin/products/create',
    gradient: 'from-violet-600 to-fuchsia-600',
  },
  {
    label: 'Proses Pesanan',
    description: 'Lihat pesanan masuk',
    icon: 'i-heroicons-inbox-stack',
    to: '/admin/orders?status=paid',
    gradient: 'from-blue-600 to-cyan-600',
  },
  {
    label: 'Buat Promo',
    description: 'Diskon & voucher toko',
    icon: 'i-heroicons-tag',
    to: '/admin/promotions',
    gradient: 'from-pink-600 to-rose-600',
  },
  {
    label: 'Tarik Saldo',
    description: 'Cairkan pendapatan',
    icon: 'i-heroicons-banknotes',
    to: '/admin/finance/withdraw',
    gradient: 'from-emerald-600 to-teal-600',
  },
]
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <Link
      v-for="action in quickActions"
      :key="action.label"
      :href="action.to"
      class="group relative p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-transparent hover:shadow-xl transition-all overflow-hidden"
    >
      <!-- Hover gradient border effect -->
      <div
        :class="[
          'absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity -z-10',
          action.gradient,
        ]"
        style="margin: -1px; border-radius: inherit"
      />
      <div
        class="absolute inset-px bg-white dark:bg-slate-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
      />

      <div class="relative flex flex-col items-center text-center">
        <div
          :class="[
            'w-14 h-14 rounded-2xl flex items-center justify-center mb-3 bg-linear-to-br transition-transform group-hover:scale-110',
            action.gradient,
          ]"
        >
          <UIcon :name="action.icon" class="w-7 h-7 text-white" />
        </div>
        <span class="font-semibold text-slate-900 dark:text-white">{{ action.label }}</span>
        <span class="text-xs text-slate-500 dark:text-slate-400 mt-1">{{ action.description }}</span>
      </div>
    </Link>
  </div>
</template>
