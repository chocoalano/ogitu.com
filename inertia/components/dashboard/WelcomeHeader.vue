<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { Customer, OrderStats, Rank } from './types'
import { getRankColor } from './types'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  customer: Customer
  stats: OrderStats
  currentRank: Rank | null
}>()

const emit = defineEmits<{
  openRankDialog: []
}>()

const { formatPrice } = useOrderFormatters()
</script>

<template>
  <div class="relative mb-8 p-6 sm:p-8 bg-white dark:bg-gray-800/80 rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Decorative Background -->
    <div class="absolute inset-0 bg-linear-to-br from-primary-500/5 via-transparent to-secondary-500/5" />
    <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

    <div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-6">
      <!-- Avatar -->
      <div class="relative">
        <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-linear-to-br from-primary-500 to-secondary-600 flex items-center justify-center shadow-xl shadow-primary-500/30">
          <span v-if="!customer.avatar" class="text-3xl sm:text-4xl font-bold text-white">
            {{ customer.fullName.charAt(0).toUpperCase() }}
          </span>
          <img v-else :src="customer.avatar" :alt="customer.fullName" class="w-full h-full object-cover rounded-2xl" />
        </div>
        <!-- Verified Badge -->
        <div v-if="customer.isVerified" class="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800">
          <UIcon name="i-heroicons-check" class="w-4 h-4 text-white" />
        </div>
      </div>

      <!-- Info -->
      <div class="flex-1">
        <div class="flex flex-wrap items-center gap-3 mb-2">
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
            Selamat Datang, {{ customer.fullName.split(' ')[0] }}! 👋
          </h1>
          <!-- Rank Badge -->
          <button
            v-if="currentRank"
            @click="emit('openRankDialog')"
            :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105', getRankColor(currentRank.slug).bg, getRankColor(currentRank.slug).text]"
          >
            <UIcon :name="getRankColor(currentRank.slug).icon" class="w-4 h-4" />
            {{ currentRank.name }}
          </button>
        </div>
        <p class="text-gray-500 dark:text-gray-400 mb-3">
          {{ customer.email }}
          <span v-if="customer.phone" class="hidden sm:inline"> • {{ customer.phone }}</span>
        </p>
        <div class="flex flex-wrap items-center gap-3">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">
            <UIcon name="i-heroicons-shopping-bag" class="w-3.5 h-3.5" />
            {{ stats.totalOrders }} Pesanan
          </span>
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
            <UIcon name="i-heroicons-banknotes" class="w-3.5 h-3.5" />
            {{ formatPrice(stats.totalSpent) }} Total Belanja
          </span>
        </div>
      </div>

      <!-- Edit Profile Button -->
      <Link href="/profile" class="hidden sm:flex">
        <UButton variant="outline" color="primary">
          <UIcon name="i-heroicons-pencil-square" class="w-4 h-4 mr-2" />
          Edit Profil
        </UButton>
      </Link>
    </div>
  </div>
</template>
