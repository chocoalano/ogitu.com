<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { TopProduct } from '../types'
import { formatCurrency, formatNumber, calculateDiscountPercent } from '../utils'

defineProps<{
  products: TopProduct[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
    <!-- Header -->
    <div class="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
          <UIcon name="i-heroicons-fire" class="w-5 h-5 text-white" />
        </div>
        <h2 class="font-semibold text-slate-900 dark:text-white">Produk Terlaris</h2>
      </div>
      <Link
        href="/admin/analytics/products"
        class="text-sm text-violet-600 hover:text-violet-500 font-medium flex items-center gap-1"
      >
        Lihat Semua
        <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
      </Link>
    </div>

    <!-- Products List -->
    <div v-if="products && products.length > 0" class="divide-y divide-slate-100 dark:divide-slate-800">
      <Link
        v-for="(product, index) in products"
        :key="product.id"
        :href="`/admin/products/${product.id}`"
        class="flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
      >
        <!-- Rank Badge -->
        <div
          :class="[
            'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0',
            index === 0 ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
            index === 1 ? 'bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300' :
            index === 2 ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' :
            'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
          ]"
        >
          {{ index + 1 }}
        </div>

        <!-- Product Image -->
        <div
          class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0"
        >
          <img
            v-if="product.image"
            :src="product.image"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <UIcon name="i-heroicons-cube" class="w-6 h-6 text-slate-400" />
          </div>
        </div>

        <!-- Product Info -->
        <div class="flex-1 min-w-0">
          <p class="font-medium text-slate-900 dark:text-white truncate">{{ product.name }}</p>
          <div class="flex items-center gap-2 text-sm">
            <span v-if="product.discountPrice" class="text-red-500 font-semibold">
              {{ formatCurrency(product.discountPrice) }}
            </span>
            <span
              :class="product.discountPrice ? 'line-through text-slate-400 text-xs' : 'text-slate-600 dark:text-slate-400'"
            >
              {{ formatCurrency(product.price) }}
            </span>
            <UBadge
              v-if="product.discountPrice"
              color="red"
              variant="subtle"
              size="xs"
            >
              -{{ calculateDiscountPercent(product.price, product.discountPrice) }}%
            </UBadge>
          </div>
        </div>

        <!-- Sales & Stock -->
        <div class="text-right shrink-0">
          <p class="font-semibold text-slate-900 dark:text-white">
            {{ formatNumber(product.totalSold) }}
            <span class="text-xs text-slate-400 font-normal">terjual</span>
          </p>
          <p
            :class="[
              'text-xs',
              product.stock < 10 ? 'text-red-500' : 'text-slate-400'
            ]"
          >
            Stok: {{ formatNumber(product.stock) }}
          </p>
        </div>
      </Link>
    </div>

    <!-- Empty State -->
    <div v-else class="p-12 text-center">
      <div
        class="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
      >
        <UIcon name="i-heroicons-cube" class="w-10 h-10 text-slate-400" />
      </div>
      <p class="text-slate-500 dark:text-slate-400 font-medium">Belum ada produk</p>
      <p class="text-sm text-slate-400 mt-1">Tambahkan produk pertama Anda</p>
      <UButton
        to="/admin/products/create"
        color="primary"
        variant="soft"
        size="sm"
        class="mt-4"
      >
        <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
        Tambah Produk
      </UButton>
    </div>
  </div>
</template>
