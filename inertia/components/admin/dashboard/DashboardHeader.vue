<script setup lang="ts">
import type { AdminData } from '../types'

withDefaults(defineProps<{
  admin?: AdminData
}>(), {
  admin: () => ({ id: 0, name: '', email: '', avatar: null, role: 'admin' as const }),
})
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-1">
        Selamat datang kembali,
        <span class="text-violet-600 dark:text-violet-400 font-medium">
          {{ admin.storeName || 'Admin' }}
        </span>! 🔥
      </p>
    </div>
    <div class="flex items-center gap-3">
      <UButton
        color="neutral"
        variant="outline"
        size="md"
        class="rounded-xl"
        to="/admin/analytics"
      >
        <UIcon name="i-heroicons-chart-bar-square" class="w-5 h-5 mr-2" />
        Lihat Statistik
      </UButton>
      <UButton
        color="primary"
        size="md"
        class="rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700"
        to="/admin/products/create"
      >
        <UIcon name="i-heroicons-plus" class="w-5 h-5 mr-2" />
        Tambah Produk
      </UButton>
    </div>
  </div>
</template>
