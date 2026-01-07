<script setup lang="ts">
import type { ProductDetail } from '../types'
import { formatNumber } from '../types'

defineProps<{
  product: ProductDetail
}>()

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
    <h3 class="font-semibold text-slate-900 dark:text-white mb-4">Detail Produk</h3>
    <dl class="space-y-3 text-sm">
      <div class="flex justify-between">
        <dt class="text-slate-500 dark:text-slate-400">Berat</dt>
        <dd class="font-medium text-slate-900 dark:text-white">{{ formatNumber(product.weight) }} gram</dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-slate-500 dark:text-slate-400">Min. Pembelian</dt>
        <dd class="font-medium text-slate-900 dark:text-white">{{ product.minOrder }}</dd>
      </div>
      <div v-if="product.maxOrder" class="flex justify-between">
        <dt class="text-slate-500 dark:text-slate-400">Maks. Pembelian</dt>
        <dd class="font-medium text-slate-900 dark:text-white">{{ product.maxOrder }}</dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-slate-500 dark:text-slate-400">Dibuat</dt>
        <dd class="font-medium text-slate-900 dark:text-white text-right">
          {{ formatDate(product.createdAt) }}
        </dd>
      </div>
      <div class="flex justify-between">
        <dt class="text-slate-500 dark:text-slate-400">Diperbarui</dt>
        <dd class="font-medium text-slate-900 dark:text-white text-right">
          {{ formatDate(product.updatedAt) }}
        </dd>
      </div>
    </dl>
  </div>
</template>
