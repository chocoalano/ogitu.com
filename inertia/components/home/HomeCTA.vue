<script setup lang="ts">
import { computed } from 'vue'

interface CustomerRank {
  id: number
  name: string
  slug: string
  level: number
  icon: string
  color: string | null
  cashbackRate: number
  affiliateBonusRate: number
  minOrders: number
  minSpent: number
  benefits: string[] | null
}

const props = defineProps<{
  ranks: CustomerRank[]
}>()

const stats = [
  { value: '0%', label: 'Biaya Pendaftaran', linear: 'from-green-400 to-emerald-400', icon: 'i-lucide-badge-check' },
  { value: '10%', label: 'Komisi Affiliate', linear: 'from-primary-400 to-secondary-400', icon: 'i-lucide-percent' },
  { value: '∞', label: 'Passive Income', linear: 'from-pink-400 to-rose-400', icon: 'i-lucide-wallet' }
]

const features = [
  { icon: 'i-lucide-link', text: 'Link Referral Unik' },
  { icon: 'i-lucide-coins', text: 'Komisi Setiap Transaksi' },
  { icon: 'i-lucide-bar-chart-3', text: 'Dashboard Affiliate' },
  { icon: 'i-lucide-crown', text: 'Sistem Ranking VIP' }
]

// Visual configuration for each rank level
const rankVisuals: Record<number, {
  icon: string
  linear: string
  glowColor: string
  borderColor: string
  bgColor: string
  desc: string
}> = {
  1: {
    icon: 'i-lucide-flame',
    linear: 'from-slate-400 via-slate-500 to-slate-600',
    glowColor: 'shadow-slate-500/50',
    borderColor: 'border-slate-400/50',
    bgColor: 'from-slate-500/20 to-slate-600/10',
    desc: 'Mulai petualangan vape-mu!'
  },
  2: {
    icon: 'i-lucide-zap',
    linear: 'from-blue-400 via-cyan-500 to-teal-500',
    glowColor: 'shadow-cyan-500/50',
    borderColor: 'border-cyan-400/50',
    bgColor: 'from-cyan-500/20 to-teal-500/10',
    desc: 'Vaper sejati yang aktif!'
  },
  3: {
    icon: 'i-lucide-crown',
    linear: 'from-amber-400 via-orange-500 to-red-500',
    glowColor: 'shadow-orange-500/60',
    borderColor: 'border-orange-400/50',
    bgColor: 'from-orange-500/20 to-red-500/10',
    desc: 'Legend of Vapers! 🏆'
  }
}

// Default visual for ranks beyond level 3
const defaultVisual = {
  icon: 'i-lucide-star',
  linear: 'from-purple-400 via-pink-500 to-rose-500',
  glowColor: 'shadow-purple-500/50',
  borderColor: 'border-purple-400/50',
  bgColor: 'from-purple-500/20 to-rose-500/10',
  desc: 'Elite Vaper!'
}

// Transform database ranks to display format
const displayRanks = computed(() => {
  return props.ranks.map((rank) => {
    const visual = rankVisuals[rank.level] || defaultVisual
    return {
      ...rank,
      ...visual,
      benefit: `Cashback ${rank.cashbackRate}%`,
      xp: formatXpRange(rank)
    }
  })
})

// Get max cashback rate from ranks
const maxCashback = computed(() => {
  if (!props.ranks.length) return 10
  return Math.max(...props.ranks.map((r) => r.cashbackRate))
})

// Format XP range based on minSpent
function formatXpRange(rank: CustomerRank): string {
  const currentIndex = props.ranks.findIndex((r) => r.id === rank.id)
  const nextRank = props.ranks[currentIndex + 1]

  const minXp = formatNumber(rank.minSpent)
  if (nextRank) {
    const maxXp = formatNumber(nextRank.minSpent - 1)
    return `${minXp} - ${maxXp} XP`
  }
  return `${minXp}+ XP`
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(0).replace(/\.0$/, '') + 'K'
  }
  return num.toString()
}
</script>

<template>
  <section class="py-16 lg:py-24 relative overflow-hidden">
    <UContainer class="relative z-10">
      <div class="max-w-4xl mx-auto text-center scroll-reveal">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-linear-to-r from-primary-100 to-secondary-100 dark:from-primary-500/20 dark:to-secondary-500/20 backdrop-blur-md border border-primary-200 dark:border-primary-500/30 rounded-full mb-6 hover:scale-105 transition-all cursor-default">
          <div class="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
          <span class="text-sm font-bold text-primary-700 dark:text-primary-300">🔥 Program Affiliate Dibuka!</span>
          <UIcon name="i-lucide-sparkles" class="w-4 h-4 text-yellow-500 dark:text-yellow-400 animate-bounce" />
        </div>

        <!-- Icon -->
        <div class="relative w-24 h-24 mx-auto mb-8">
          <!-- Glow Effect -->
          <div class="absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 rounded-3xl blur-xl opacity-40 dark:opacity-60 animate-pulse-glow"></div>

          <!-- Icon Box -->
          <div class="relative w-full h-full bg-linear-to-br from-primary-500 to-secondary-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary-500/30 dark:shadow-primary-500/50 floating-animation">
            <UIcon name="i-lucide-hand-coins" class="w-12 h-12 text-white drop-shadow-lg" />
          </div>

          <!-- Particles -->
          <div class="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
          <div class="absolute -bottom-1 -left-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping opacity-75" style="animation-delay: 0.5s"></div>
        </div>

        <!-- Title -->
        <h2 class="text-3xl sm:text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
          Raih
          <span class="bg-linear-to-r from-primary-600 via-secondary-600 to-pink-600 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text"> Passive Income</span>
        </h2>
        <h3 class="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-300 mb-6">
          Jadi Affiliator
          <span class="bg-linear-to-r from-yellow-500 to-orange-500 text-transparent bg-clip-text">ogitu.com</span>
          Sekarang! 🚀
        </h3>

        <!-- Description -->
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
          <span class="font-semibold text-primary-600 dark:text-primary-400">Bagikan link, dapat komisi!</span> Setiap teman yang belanja pakai link kamu, kamu dapat <span class="font-bold text-green-600 dark:text-green-400">komisi hingga 10%</span>. Plus, naik level dari <span class="font-bold text-slate-500">{{ displayRanks[0]?.name || 'Vapor Newbie' }}</span> ke <span class="font-bold bg-linear-to-r from-amber-500 to-orange-500 text-transparent bg-clip-text">{{ displayRanks[displayRanks.length - 1]?.name || 'Vapor Pro' }}</span> untuk cashback hingga {{ maxCashback }}%!
        </p>

        <!-- Features Pills -->
        <div class="flex flex-wrap justify-center gap-3 mb-10">
          <div
            v-for="feature in features"
            :key="feature.text"
            class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 rounded-full shadow-sm hover:shadow-md dark:shadow-none hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-white/20 transition-all cursor-default group"
          >
            <UIcon :name="feature.icon" class="w-4 h-4 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
            <span class="text-sm text-gray-700 dark:text-white/80 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{{ feature.text }}</span>
          </div>
        </div>

        <!-- Rank Preview - Game Style -->
        <div class="mb-10 p-6 sm:p-8 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-black dark:via-gray-900 dark:to-black backdrop-blur-md border border-gray-700/50 rounded-3xl relative overflow-hidden">
          <!-- Background Effects -->
          <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>

          <!-- Floating Particles -->
          <div class="absolute top-4 left-8 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60"></div>
          <div class="absolute top-12 right-12 w-1.5 h-1.5 bg-orange-400 rounded-full animate-ping opacity-50"></div>
          <div class="absolute bottom-8 left-16 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-40"></div>

          <div class="relative z-10">
            <!-- Header -->
            <div class="flex items-center justify-center gap-3 mb-6">
              <div class="h-px w-12 bg-linear-to-r from-transparent to-cyan-500"></div>
              <h4 class="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                <UIcon name="i-lucide-gamepad-2" class="w-6 h-6 text-cyan-400" />
                <span class="bg-linear-to-r from-cyan-400 via-purple-400 to-orange-400 text-transparent bg-clip-text">LEVEL UP SYSTEM</span>
              </h4>
              <div class="h-px w-12 bg-linear-to-l from-transparent to-orange-500"></div>
            </div>

            <p class="text-gray-400 text-sm mb-8">Belanja & referral untuk naik level dan unlock benefit eksklusif!</p>

            <!-- Rank Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div
                v-for="(rank, index) in displayRanks"
                :key="rank.id"
                :class="[
                  'relative group cursor-default',
                  'transform hover:scale-105 hover:-translate-y-2 transition-all duration-300'
                ]"
              >
                <!-- Card Glow -->
                <div :class="['absolute -inset-1 bg-linear-to-r rounded-2xl opacity-0 group-hover:opacity-75 blur-lg transition-all duration-300', rank.linear]"></div>

                <!-- Card -->
                <div :class="['relative p-5 rounded-2xl border-2 bg-linear-to-br backdrop-blur-sm', rank.borderColor, rank.bgColor]">
                  <!-- Level Badge -->
                  <div class="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 border-2 border-gray-600 rounded-xl flex items-center justify-center shadow-lg">
                    <span class="text-sm font-black text-white">{{ rank.level }}</span>
                  </div>

                  <!-- Rank Icon -->
                  <div class="relative w-16 h-16 mx-auto mb-4">
                    <!-- Icon Glow -->
                    <div :class="['absolute inset-0 bg-linear-to-r rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity', rank.linear]"></div>
                    <!-- Icon Container -->
                    <div :class="['relative w-full h-full bg-linear-to-br rounded-2xl flex items-center justify-center shadow-xl', rank.linear, rank.glowColor]">
                      <UIcon :name="rank.icon" class="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                  </div>

                  <!-- Rank Name -->
                  <h5 :class="['text-lg font-black mb-1 bg-linear-to-r text-transparent bg-clip-text', rank.linear]">
                    {{ rank.name }}
                  </h5>

                  <!-- Description -->
                  <p class="text-xs text-gray-400 mb-3">{{ rank.desc }}</p>

                  <!-- XP Range -->
                  <div class="flex items-center justify-center gap-1.5 mb-3">
                    <UIcon name="i-lucide-star" class="w-3.5 h-3.5 text-yellow-400" />
                    <span class="text-xs font-medium text-gray-300">{{ rank.xp }}</span>
                  </div>

                  <!-- Benefit Badge -->
                  <div :class="['inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-linear-to-r text-white text-xs font-bold shadow-lg', rank.linear]">
                    <UIcon name="i-lucide-gift" class="w-3.5 h-3.5" />
                    {{ rank.benefit }}
                  </div>
                </div>

                <!-- Connector Line (between cards) -->
                <div v-if="index < displayRanks.length - 1" class="hidden sm:block absolute top-1/2 -right-3 sm:-right-4 w-6 sm:w-8 h-0.5 bg-linear-to-r from-gray-600 to-gray-700">
                  <UIcon name="i-lucide-chevron-right" class="absolute -right-1 -top-1.5 w-4 h-4 text-gray-500" />
                </div>
              </div>
            </div>

            <!-- Progress Hint -->
            <div class="mt-8 flex items-center justify-center gap-2 text-sm">
              <div class="flex items-center gap-1 px-3 py-1.5 bg-gray-800/80 rounded-full border border-gray-700">
                <UIcon name="i-lucide-info" class="w-4 h-4 text-cyan-400" />
                <span class="text-gray-300">XP didapat dari <span class="text-cyan-400 font-semibold">belanja</span> & <span class="text-orange-400 font-semibold">referral</span></span>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <UButton to="/register" size="xl" class="font-bold shadow-xl shadow-primary-500/20 hover:shadow-2xl hover:shadow-primary-500/30 hover:scale-105 transition-all group">
            <UIcon name="i-lucide-rocket" class="w-5 h-5 group-hover:rotate-12 group-hover:-translate-y-0.5 transition-transform" />
            Daftar & Jadi Affiliator
          </UButton>
          <UButton to="/affiliate" size="xl" variant="outline" class="font-bold text-gray-700 dark:text-white border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/50 hover:scale-105 transition-all group">
            <UIcon name="i-lucide-info" class="w-5 h-5 group-hover:scale-110 transition-transform" />
            Cara Kerja Affiliate
          </UButton>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-10 border-t border-gray-200 dark:border-white/10">
          <div
            v-for="(stat, index) in stats"
            :key="stat.label"
            :class="[
              'scroll-reveal',
              `scroll-reveal-delay-${index + 1}`,
              'group relative p-6 rounded-2xl',
              'bg-white dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10',
              'shadow-lg shadow-gray-200/50 dark:shadow-none',
              'hover:bg-gray-50 dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-primary-500/50 transition-all cursor-default'
            ]"
          >
            <!-- Stat Glow -->
            <div class="absolute inset-0 bg-linear-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/5 dark:group-hover:from-primary-500/10 group-hover:to-secondary-500/5 dark:group-hover:to-secondary-500/10 rounded-2xl transition-all"></div>

            <div class="relative z-10">
              <!-- Icon -->
              <div class="w-10 h-10 mx-auto mb-3 bg-linear-to-br from-primary-100 to-secondary-100 dark:from-white/10 dark:to-white/5 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <UIcon :name="stat.icon" class="w-5 h-5 text-primary-600 dark:text-white/70" />
              </div>

              <div :class="['text-3xl sm:text-4xl font-black bg-linear-to-r text-transparent bg-clip-text mb-2 group-hover:scale-105 transition-transform', stat.linear]">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Trust Badge -->
        <div class="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
          <div class="flex items-center gap-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
            <UIcon name="i-lucide-users" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span>1000+ Affiliator Aktif</span>
          </div>
          <div class="flex items-center gap-2 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors">
            <UIcon name="i-lucide-wallet" class="w-4 h-4 text-green-500 dark:text-green-400" />
            <span>Rp 50jt+ Komisi Dibayar</span>
          </div>
          <div class="flex items-center gap-2 hover:text-green-600 dark:hover:text-green-400 transition-colors">
            <UIcon name="i-lucide-clock" class="w-4 h-4 text-blue-500 dark:text-blue-400" />
            <span>Withdraw Cepat 1x24 Jam</span>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
