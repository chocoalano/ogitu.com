<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Affiliate } from '../types'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  affiliate: Affiliate
}>()

const emit = defineEmits<{
  copied: []
}>()

const { formatPrice } = useOrderFormatters()

// Copy referral link state
const copiedReferral = ref(false)
const affiliateLink = computed(() => `https://ogitu.com/r/${props.affiliate.referralCode}`)

// Total earnings calculation
const totalEarnings = computed(() => props.affiliate.totalEarnings + props.affiliate.pendingEarnings)

const copyReferralCode = async () => {
  try {
    await navigator.clipboard.writeText(affiliateLink.value)
    copiedReferral.value = true
    emit('copied')
    setTimeout(() => (copiedReferral.value = false), 2000)
  } catch (error) {
    console.error('Failed to copy:', error)
  }
}
</script>

<template>
  <div class="p-5 pb-4">
    <!-- Header Title -->
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <div class="h-px w-6 bg-linear-to-r from-transparent to-violet-500"></div>
        <h2 class="text-sm font-black text-white flex items-center gap-2">
          <UIcon name="i-lucide-network" class="w-4 h-4 text-violet-400" />
          <span
            class="bg-linear-to-r from-violet-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"
          >
            AFFILIATE CENTER
          </span>
        </h2>
      </div>
      <div
        class="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full"
      >
        <div class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div>
        <span class="text-[10px] font-bold text-emerald-400">ACTIVE</span>
      </div>
    </div>

    <!-- Quick Stats Bar -->
    <div class="grid grid-cols-3 gap-2 mb-4">
      <div class="p-2 bg-gray-800/60 border border-gray-700/50 rounded-xl text-center">
        <p class="text-lg font-black text-white">{{ affiliate.totalReferrals }}</p>
        <p class="text-[9px] text-gray-500 uppercase tracking-wider">Mitra</p>
      </div>
      <div class="p-2 bg-gray-800/60 border border-gray-700/50 rounded-xl text-center">
        <p class="text-lg font-black text-cyan-400">{{ affiliate.commissionRate }}%</p>
        <p class="text-[9px] text-gray-500 uppercase tracking-wider">Komisi</p>
      </div>
      <div class="p-2 bg-gray-800/60 border border-gray-700/50 rounded-xl text-center">
        <p class="text-sm font-black text-emerald-400">{{ formatPrice(totalEarnings) }}</p>
        <p class="text-[9px] text-gray-500 uppercase tracking-wider">Earnings</p>
      </div>
    </div>

    <!-- Referral Code -->
    <div
      class="flex items-center gap-2 p-2 bg-linear-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl"
    >
      <div class="flex-1">
        <p class="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Your Referral Code</p>
        <p class="font-mono font-black text-violet-400 tracking-widest">
          {{ affiliate.referralCode }}
        </p>
      </div>
      <button
        @click="copyReferralCode"
        class="p-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 rounded-lg transition-colors"
      >
        <UIcon
          :name="copiedReferral ? 'i-lucide-check' : 'i-lucide-copy'"
          class="w-4 h-4 text-violet-400"
        />
      </button>
    </div>
    <p v-if="copiedReferral" class="text-[10px] text-emerald-400 text-center mt-1">
      ✓ Link copied!
    </p>
  </div>
</template>
