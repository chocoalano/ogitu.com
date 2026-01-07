<script setup lang="ts">
import { computed } from 'vue'
import type { Rank } from './types'
import { getRankColor } from './types'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  currentRank: Rank | null
  nextRank: Rank | null
  rankProgress: number
  ordersToNextRank: number
  spentToNextRank: number
}>()

const emit = defineEmits<{
  openDetails: []
}>()

const { formatPrice } = useOrderFormatters()

// Get rank visual config
const currentRankConfig = computed(() => {
  if (!props.currentRank) return null
  return getRankColor(props.currentRank.slug)
})

const nextRankConfig = computed(() => {
  if (!props.nextRank) return null
  return getRankColor(props.nextRank.slug)
})

// Rank level for display
const rankLevel = computed(() => {
  if (!props.currentRank) return 1
  const slugMap: Record<string, number> = {
    'vapor-newbie': 1,
    'vapor-active': 2,
    'vapor-pro': 3,
  }
  return slugMap[props.currentRank.slug] || 1
})
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl">
    <!-- Gaming Card Background -->
    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <!-- Animated Grid Pattern -->
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      <!-- Glow Effects -->
      <div v-if="currentRankConfig" :class="['absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 bg-gradient-to-r', currentRankConfig.gradient]"></div>
      <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div>
    </div>

    <!-- Floating Particles -->
    <div class="absolute top-4 right-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
    <div class="absolute top-12 right-16 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-60"></div>
    <div class="absolute bottom-16 left-4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-50"></div>

    <div class="relative z-10 p-5">
      <!-- Header -->
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-2">
          <div class="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500"></div>
          <h2 class="text-sm font-black text-white flex items-center gap-2">
            <UIcon name="i-lucide-gamepad-2" class="w-4 h-4 text-cyan-400" />
            <span class="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text">PLAYER RANK</span>
          </h2>
        </div>
        <button
          @click="emit('openDetails')"
          class="text-xs text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
        >
          <span>Details</span>
          <UIcon name="i-lucide-chevron-right" class="w-3 h-3" />
        </button>
      </div>

      <!-- Current Rank Display -->
      <div v-if="currentRank && currentRankConfig" class="relative">
        <!-- 3D Rank Badge -->
        <div class="flex items-center gap-4 mb-4">
          <!-- Rank Icon with 3D Effect -->
          <div class="relative group">
            <!-- Outer Glow Ring -->
            <div :class="['absolute -inset-2 rounded-2xl bg-gradient-to-r opacity-60 blur-md animate-pulse', currentRankConfig.gradient]"></div>
            <!-- Inner Shadow Layer -->
            <div :class="['absolute inset-0 rounded-xl bg-gradient-to-br opacity-80', currentRankConfig.gradient]" style="transform: translateY(4px);"></div>
            <!-- Main Badge -->
            <div :class="['relative w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-2xl border border-white/20', currentRankConfig.gradient]">
              <!-- Shine Effect -->
              <div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-transparent to-transparent"></div>
              <UIcon :name="currentRankConfig.icon" class="w-8 h-8 text-white drop-shadow-lg relative z-10" />
            </div>
            <!-- Level Badge -->
            <div class="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 border-2 border-cyan-500 rounded-lg flex items-center justify-center shadow-lg">
              <span class="text-[10px] font-black text-cyan-400">{{ rankLevel }}</span>
            </div>
          </div>

          <!-- Rank Info -->
          <div class="flex-1">
            <h3 :class="['text-lg font-black mb-0.5 bg-gradient-to-r text-transparent bg-clip-text', currentRankConfig.gradient]">
              {{ currentRank.name }}
            </h3>
            <div class="flex flex-wrap items-center gap-2">
              <span v-if="currentRank.cashbackRate > 0" class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-md text-[10px] font-bold text-emerald-400">
                <UIcon name="i-lucide-percent" class="w-3 h-3" />
                {{ currentRank.cashbackRate }}% Cashback
              </span>
              <span v-if="currentRank.affiliateBonusRate > 0" class="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-500/20 border border-violet-500/30 rounded-md text-[10px] font-bold text-violet-400">
                <UIcon name="i-lucide-gift" class="w-3 h-3" />
                +{{ currentRank.affiliateBonusRate }}%
              </span>
            </div>
          </div>
        </div>

        <!-- XP Progress Bar (Game Style) -->
        <div v-if="nextRank && nextRankConfig" class="mt-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Progress ke Level {{ rankLevel + 1 }}</span>
            <span class="text-xs font-black text-cyan-400">{{ Math.round(rankProgress) }}%</span>
          </div>
          <!-- XP Bar Container -->
          <div class="relative h-4 bg-gray-800/80 rounded-lg border border-gray-700/50 overflow-hidden">
            <!-- XP Bar Fill -->
            <div
              :class="['absolute inset-y-0 left-0 bg-gradient-to-r rounded-lg transition-all duration-700', currentRankConfig.gradient]"
              :style="{ width: `${rankProgress}%` }"
            >
              <!-- Shine Animation -->
              <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
            <!-- XP Markers -->
            <div class="absolute inset-0 flex">
              <div v-for="i in 4" :key="i" class="flex-1 border-r border-gray-700/30 last:border-r-0"></div>
            </div>
          </div>
          <!-- Progress Details -->
          <div class="flex items-center justify-between mt-2 text-[10px] text-gray-500">
            <div class="flex items-center gap-1">
              <UIcon name="i-lucide-shopping-bag" class="w-3 h-3" />
              <span v-if="ordersToNextRank > 0">{{ ordersToNextRank }} order</span>
              <span v-else>✓</span>
            </div>
            <div class="flex items-center gap-1">
              <UIcon name="i-lucide-coins" class="w-3 h-3" />
              <span v-if="spentToNextRank > 0">{{ formatPrice(spentToNextRank) }}</span>
              <span v-else>✓</span>
            </div>
          </div>
          <!-- Next Rank Preview -->
          <div class="mt-3 flex items-center justify-center gap-2 p-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
            <span class="text-[10px] text-gray-500">Next:</span>
            <div :class="['w-5 h-5 rounded-md bg-gradient-to-br flex items-center justify-center', nextRankConfig.gradient]">
              <UIcon :name="nextRankConfig.icon" class="w-3 h-3 text-white" />
            </div>
            <span :class="['text-xs font-bold bg-gradient-to-r text-transparent bg-clip-text', nextRankConfig.gradient]">{{ nextRank.name }}</span>
          </div>
        </div>

        <!-- Max Rank Badge -->
        <div v-else class="mt-4 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 animate-pulse"></div>
          <div class="relative p-3 border border-amber-500/30 rounded-xl text-center">
            <div class="flex items-center justify-center gap-2 mb-1">
              <UIcon name="i-lucide-crown" class="w-5 h-5 text-amber-400" />
              <span class="text-sm font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-transparent bg-clip-text">MAX RANK!</span>
              <UIcon name="i-lucide-crown" class="w-5 h-5 text-amber-400" />
            </div>
            <p class="text-[10px] text-amber-400/70">Anda adalah Legend of Vapers!</p>
          </div>
        </div>

        <!-- Benefits List (Compact) -->
        <div v-if="currentRank?.benefits && currentRank.benefits.length > 0" class="mt-4 pt-3 border-t border-gray-700/30">
          <div class="flex items-center gap-1.5 mb-2">
            <UIcon name="i-lucide-sparkles" class="w-3 h-3 text-yellow-400" />
            <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Active Perks</span>
          </div>
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="(benefit, idx) in currentRank.benefits.slice(0, 3)"
              :key="idx"
              class="inline-flex items-center gap-1 px-2 py-1 bg-gray-800/80 border border-gray-700/50 rounded-md text-[10px] text-gray-300"
            >
              <UIcon name="i-lucide-check" class="w-3 h-3 text-emerald-400" />
              {{ benefit }}
            </span>
          </div>
        </div>
      </div>

      <!-- No Rank State -->
      <div v-else class="text-center py-6">
        <div class="w-16 h-16 mx-auto mb-3 rounded-xl bg-gray-800/80 border border-gray-700/50 flex items-center justify-center">
          <UIcon name="i-lucide-user" class="w-8 h-8 text-gray-600" />
        </div>
        <p class="text-sm text-gray-500">Belum ada rank</p>
        <p class="text-xs text-gray-600 mt-1">Belanja untuk mendapatkan rank!</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.animate-shimmer {
  animation: shimmer 2s infinite;
}
</style>
