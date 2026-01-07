<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Affiliate, Commission, BonusItem, BonusSubTabId } from '../types'
import { commissionStatusConfig } from '../types'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  affiliate: Affiliate
  commissions: Commission[]
}>()

const emit = defineEmits<{
  withdraw: []
}>()

const { formatPrice } = useOrderFormatters()

// Sub-tab state
const bonusSubTab = ref<BonusSubTabId>('summary')

// Bonus types with calculated amounts
const bonusTypes = computed<BonusItem[]>(() => [
  {
    id: 'referral_incentive',
    name: 'Bonus Referral Incentive',
    icon: 'i-lucide-gift',
    amount: props.affiliate.totalEarnings * 0.15,
    color: 'text-pink-400',
    linear: 'from-pink-500 to-rose-500',
  },
  {
    id: 'team_affiliate',
    name: 'Team Affiliate Commission',
    icon: 'i-lucide-users',
    amount: props.affiliate.totalEarnings * 0.25,
    color: 'text-violet-400',
    linear: 'from-violet-500 to-purple-500',
  },
  {
    id: 'partner_team',
    name: 'Partner Team Commission',
    icon: 'i-lucide-handshake',
    amount: props.affiliate.totalEarnings * 0.2,
    color: 'text-cyan-400',
    linear: 'from-cyan-500 to-blue-500',
  },
  {
    id: 'cashback',
    name: 'Cashback Commission',
    icon: 'i-lucide-wallet',
    amount: props.affiliate.totalEarnings * 0.1,
    color: 'text-emerald-400',
    linear: 'from-emerald-500 to-green-500',
  },
  {
    id: 'promotions',
    name: 'Promotions Rewards',
    icon: 'i-lucide-megaphone',
    amount: props.affiliate.totalEarnings * 0.08,
    color: 'text-amber-400',
    linear: 'from-amber-500 to-orange-500',
  },
  {
    id: 'retail',
    name: 'Retail Commission',
    icon: 'i-lucide-store',
    amount: props.affiliate.totalEarnings * 0.12,
    color: 'text-blue-400',
    linear: 'from-blue-500 to-indigo-500',
  },
  {
    id: 'lifetime',
    name: 'Lifetime Cash Rewards',
    icon: 'i-lucide-infinity',
    amount: props.affiliate.totalEarnings * 0.1,
    color: 'text-purple-400',
    linear: 'from-purple-500 to-fuchsia-500',
  },
])

const totalBonus = computed(() => bonusTypes.value.reduce((sum, b) => sum + b.amount, 0))

// Commission status helper
const getStatusConfig = (status: string) => {
  return commissionStatusConfig[status] || commissionStatusConfig.pending
}
</script>

<template>
  <div class="space-y-3">
    <!-- Sub-Tab Navigation -->
    <div class="flex items-center gap-1 p-1 bg-gray-800/40 border border-gray-700/30 rounded-xl">
      <button
        @click="bonusSubTab = 'summary'"
        :class="[
          'flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200',
          bonusSubTab === 'summary'
            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            : 'text-gray-500 hover:text-gray-300',
        ]"
      >
        <UIcon name="i-lucide-layout-grid" class="w-3 h-3" />
        <span>Ringkasan Bonus</span>
      </button>
      <button
        @click="bonusSubTab = 'history'"
        :class="[
          'flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200',
          bonusSubTab === 'history'
            ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
            : 'text-gray-500 hover:text-gray-300',
        ]"
      >
        <UIcon name="i-lucide-history" class="w-3 h-3" />
        <span>Riwayat</span>
      </button>
    </div>

    <!-- Summary Sub-Tab -->
    <div v-if="bonusSubTab === 'summary'" class="space-y-3">
      <!-- Total Bonus Card -->
      <div
        class="relative p-4 bg-linear-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/20 border border-emerald-500/30 rounded-2xl overflow-hidden"
      >
        <!-- Shine Effect -->
        <div
          class="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer"
        ></div>

        <div class="relative">
          <div class="flex items-center gap-2 mb-2">
            <div
              class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30"
            >
              <UIcon name="i-lucide-trophy" class="w-5 h-5 text-white" />
            </div>
            <div>
              <p class="text-[10px] text-gray-400 uppercase tracking-wider">Total Bonus</p>
              <p class="text-xl font-black text-emerald-400">{{ formatPrice(totalBonus) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Bonus Types Grid -->
      <div class="grid grid-cols-2 gap-2">
        <div
          v-for="bonus in bonusTypes"
          :key="bonus.id"
          class="p-3 bg-gray-800/40 border border-gray-700/30 rounded-xl hover:bg-gray-800/60 transition-all group"
        >
          <div class="flex items-start gap-2 mb-2">
            <div
              :class="[
                'w-8 h-8 rounded-lg bg-linear-to-br flex items-center justify-center shrink-0',
                bonus.linear,
              ]"
            >
              <UIcon :name="bonus.icon" class="w-4 h-4 text-white" />
            </div>
          </div>
          <p class="text-[10px] text-gray-500 mb-0.5 line-clamp-1">{{ bonus.name }}</p>
          <p :class="['text-sm font-black', bonus.color]">{{ formatPrice(bonus.amount) }}</p>
        </div>
      </div>

      <!-- Earnings Summary -->
      <div class="grid grid-cols-2 gap-2">
        <div class="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Available</p>
          <p class="text-lg font-black text-emerald-400">
            {{ formatPrice(affiliate.totalEarnings) }}
          </p>
        </div>
        <div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
          <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Pending</p>
          <p class="text-lg font-black text-amber-400">
            {{ formatPrice(affiliate.pendingEarnings) }}
          </p>
        </div>
      </div>
    </div>

    <!-- History Sub-Tab -->
    <div v-else-if="bonusSubTab === 'history'" class="space-y-3">
      <!-- Commission List -->
      <div v-if="commissions.length > 0" class="space-y-2">
        <div
          v-for="commission in commissions.slice(0, 5)"
          :key="commission.id"
          class="flex items-center gap-3 p-3 bg-gray-800/40 border border-gray-700/30 rounded-xl"
        >
          <!-- Icon -->
          <div
            class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center"
          >
            <UIcon name="i-lucide-coins" class="w-5 h-5 text-emerald-400" />
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <p class="text-sm font-bold text-white">#{{ commission.orderNumber }}</p>
            <div class="flex items-center gap-2 text-[10px]">
              <span class="text-gray-500">{{ formatPrice(commission.orderTotal) }}</span>
              <span class="text-gray-600">×</span>
              <span class="text-cyan-400">{{ commission.commissionRate }}%</span>
            </div>
          </div>

          <!-- Amount & Status -->
          <div class="text-right">
            <p class="text-sm font-black text-emerald-400">
              +{{ formatPrice(commission.commissionAmount) }}
            </p>
            <span
              :class="[
                'text-[9px] px-1.5 py-0.5 rounded-full',
                getStatusConfig(commission.status).color,
              ]"
            >
              {{ getStatusConfig(commission.status).label }}
            </span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-8 text-center">
        <div
          class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center"
        >
          <UIcon name="i-lucide-coins" class="w-8 h-8 text-gray-600" />
        </div>
        <p class="text-sm text-gray-500 mb-1">Belum ada riwayat bonus</p>
        <p class="text-xs text-gray-600">Ajak mitra untuk belanja dan dapatkan bonus!</p>
      </div>
    </div>

    <!-- Withdraw Button -->
    <button
      v-if="affiliate.totalEarnings > 0"
      @click="emit('withdraw')"
      class="w-full py-3 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
    >
      <UIcon name="i-lucide-wallet" class="w-4 h-4" />
      Withdraw {{ formatPrice(affiliate.totalEarnings) }}
    </button>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-shimmer {
  animation: shimmer 3s infinite;
}
</style>
