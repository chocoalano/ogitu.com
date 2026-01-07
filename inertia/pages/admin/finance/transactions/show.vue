<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import type { Transaction } from '~/types/finance'
import { formatCurrency, formatDate } from '~/types/finance'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  transaction: Transaction & {
    customerPhone: string | null
    walletBalance: number
    updatedAt: string
  }
}

const props = defineProps<Props>()

// Avatar placeholder
const getAvatarUrl = (avatar: string | null): string => {
  if (!avatar) {
    return 'https://placehold.co/80x80/1a1a2e/ffffff?text=U'
  }
  return avatar
}

// Determine if amount is positive (income) or negative (expense)
const isIncome = (type: string): boolean => {
  return ['topup', 'commission', 'refund', 'cashback'].includes(type)
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Link href="/admin/finance/transactions">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" size="sm" />
      </Link>
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Detail Transaksi</h1>
        <p class="text-gray-500 dark:text-gray-400">ID: #{{ transaction.id }}</p>
      </div>
      <div class="flex items-center gap-2">
        <UBadge :color="transaction.typeColor as any" variant="soft" size="lg">
          <UIcon :name="transaction.typeIcon" class="w-4 h-4 mr-1" />
          {{ transaction.typeLabel }}
        </UBadge>
        <UBadge :color="transaction.statusColor as any" variant="soft" size="lg">
          {{ transaction.statusLabel }}
        </UBadge>
      </div>
    </div>

    <!-- Customer Info -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Customer</h3>
      </template>

      <div class="flex items-start gap-6">
        <img
          :src="getAvatarUrl(transaction.customerAvatar)"
          :alt="transaction.customerName"
          class="w-20 h-20 rounded-full object-cover"
        />
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Nama</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ transaction.customerName }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ transaction.customerEmail }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Telepon</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ transaction.customerPhone || '-' }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Saldo Wallet Saat Ini</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ formatCurrency(transaction.walletBalance) }}
            </p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Transaction Details -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Detail Transaksi</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Jumlah</p>
            <p
              :class="[
                'text-2xl font-bold',
                isIncome(transaction.transactionType)
                  ? 'text-success-600 dark:text-success-400'
                  : 'text-error-600 dark:text-error-400',
              ]"
            >
              {{ isIncome(transaction.transactionType) ? '+' : '-' }}
              {{ formatCurrency(transaction.amount) }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Tipe Transaksi</p>
            <div class="flex items-center gap-2 mt-1">
              <div :class="[`p-1.5 rounded-lg bg-${transaction.typeColor}-100 dark:bg-${transaction.typeColor}-900/30`]">
                <UIcon :name="transaction.typeIcon" :class="[`w-4 h-4 text-${transaction.typeColor}-600 dark:text-${transaction.typeColor}-400`]" />
              </div>
              <span class="font-medium text-gray-900 dark:text-white">
                {{ transaction.typeLabel }}
              </span>
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Saldo Sebelum</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ formatCurrency(transaction.balanceBefore) }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Saldo Sesudah</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ formatCurrency(transaction.balanceAfter) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div v-if="transaction.description" class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p class="text-sm text-gray-500 dark:text-gray-400">Deskripsi</p>
        <p class="font-medium text-gray-900 dark:text-white">{{ transaction.description }}</p>
      </div>
    </UCard>

    <!-- Reference -->
    <UCard v-if="transaction.referenceType || transaction.referenceId">
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Referensi</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-if="transaction.referenceType">
          <p class="text-sm text-gray-500 dark:text-gray-400">Tipe Referensi</p>
          <p class="font-medium text-gray-900 dark:text-white">{{ transaction.referenceType }}</p>
        </div>
        <div v-if="transaction.referenceId">
          <p class="text-sm text-gray-500 dark:text-gray-400">ID Referensi</p>
          <p class="font-medium text-gray-900 dark:text-white">#{{ transaction.referenceId }}</p>
        </div>
      </div>
    </UCard>

    <!-- Metadata -->
    <UCard v-if="transaction.metadata && Object.keys(transaction.metadata).length > 0">
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Tambahan</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <template v-for="(value, key) in transaction.metadata" :key="key">
          <div v-if="value">
            <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {{ String(key).replace(/_/g, ' ') }}
            </p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ typeof value === 'object' ? JSON.stringify(value) : value }}
            </p>
          </div>
        </template>
      </div>
    </UCard>

    <!-- Timestamps -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Waktu</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Transaksi</p>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ formatDate(transaction.createdAt) }}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Terakhir Diupdate</p>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ formatDate(transaction.updatedAt) }}
          </p>
        </div>
      </div>
    </UCard>
  </div>
</template>
