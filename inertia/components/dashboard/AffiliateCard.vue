<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Affiliate, Commission } from './types'
import { commissionStatusConfig } from './types'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  affiliate: Affiliate
  commissions: Commission[]
}>()

const { formatPrice, formatRelativeTime } = useOrderFormatters()

const copiedReferral = ref(false)

const affiliateLink = computed(() => {
  return `https://ogitu.com/r/${props.affiliate.referralCode}`
})

const totalEarnings = computed(() => {
  return props.affiliate.totalEarnings + props.affiliate.pendingEarnings
})

const copyReferralCode = async () => {
  try {
    await navigator.clipboard.writeText(affiliateLink.value)
    copiedReferral.value = true
    setTimeout(() => {
      copiedReferral.value = false
    }, 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}

const shareReferral = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Daftar di Ogitu dan dapatkan bonus!',
        text: `Gunakan kode referral ${props.affiliate.referralCode} untuk mendapat bonus di Ogitu - Toko Vape Terpercaya!`,
        url: affiliateLink.value,
      })
    } catch (error) {
      console.error('Failed to share:', error)
    }
  } else {
    copyReferralCode()
  }
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header -->
    <div class="p-5 bg-linear-to-br from-violet-500 to-purple-600 text-white">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
          <UIcon name="i-heroicons-user-group" class="w-5 h-5" />
        </div>
        <div>
          <span class="font-semibold">Program Afiliasi</span>
          <p class="text-white/70 text-xs">Komisi {{ affiliate.commissionRate }}% per order</p>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-3 gap-3">
        <div class="text-center p-2 bg-white/10 rounded-xl">
          <p class="text-xl font-bold">{{ affiliate.totalReferrals }}</p>
          <p class="text-xs text-white/70">Referral</p>
        </div>
        <div class="text-center p-2 bg-white/10 rounded-xl">
          <p class="text-xl font-bold">{{ affiliate.totalOrders }}</p>
          <p class="text-xs text-white/70">Order</p>
        </div>
        <div class="text-center p-2 bg-white/10 rounded-xl">
          <p class="text-sm font-bold">{{ formatPrice(totalEarnings) }}</p>
          <p class="text-xs text-white/70">Total</p>
        </div>
      </div>
    </div>

    <!-- Referral Code & Link -->
    <div class="p-4 border-b border-gray-100 dark:border-gray-700/50">
      <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Kode Referral Anda</p>
      <div class="flex items-center gap-2">
        <div class="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl font-mono font-bold text-primary-600 dark:text-primary-400 text-center tracking-wider">
          {{ affiliate.referralCode }}
        </div>
        <UButton
          variant="outline"
          color="primary"
          size="sm"
          square
          @click="copyReferralCode"
        >
          <UIcon :name="copiedReferral ? 'i-heroicons-check' : 'i-heroicons-clipboard'" class="w-4 h-4" />
        </UButton>
        <UButton
          variant="solid"
          color="primary"
          size="sm"
          square
          @click="shareReferral"
        >
          <UIcon name="i-heroicons-share" class="w-4 h-4" />
        </UButton>
      </div>
      <p v-if="copiedReferral" class="text-xs text-emerald-500 mt-2 text-center">
        ✓ Link berhasil disalin!
      </p>
    </div>

    <!-- Earnings Breakdown -->
    <div class="p-4 border-b border-gray-100 dark:border-gray-700/50">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Tersedia</p>
          <p class="font-bold text-emerald-600 dark:text-emerald-400">{{ formatPrice(affiliate.totalEarnings) }}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Pending</p>
          <p class="font-bold text-amber-600 dark:text-amber-400">{{ formatPrice(affiliate.pendingEarnings) }}</p>
        </div>
      </div>
    </div>

    <!-- Recent Commissions -->
    <div class="p-4">
      <h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Komisi Terbaru</h3>

      <div v-if="commissions.length > 0" class="space-y-3">
        <div
          v-for="comm in commissions"
          :key="comm.id"
          class="flex items-center justify-between"
        >
          <div class="flex-1 min-w-0">
            <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
              {{ comm.orderNumber }}
            </p>
            <p class="text-xs text-gray-400">{{ formatRelativeTime(comm.createdAt) }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm font-semibold text-emerald-500">+{{ formatPrice(comm.commissionAmount) }}</p>
            <span :class="['inline-flex px-1.5 py-0.5 rounded text-xs font-medium', commissionStatusConfig[comm.status]?.color || 'bg-gray-100 text-gray-600']">
              {{ commissionStatusConfig[comm.status]?.label || comm.status }}
            </span>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-4">
        <p class="text-sm text-gray-400">Belum ada komisi</p>
      </div>
    </div>

    <!-- CTA Banner -->
    <div class="p-4 bg-linear-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20">
      <div class="flex items-start gap-3">
        <div class="text-2xl">💰</div>
        <div>
          <p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Ajak Teman, Dapat Komisi!</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            Bagikan link referral dan dapatkan {{ affiliate.commissionRate }}% komisi dari setiap pembelian teman Anda!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
