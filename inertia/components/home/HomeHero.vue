<script setup lang="ts">
import type { PromoItem, Stat } from '~/types/home'

const promos: PromoItem[] = [
  { icon: 'i-lucide-zap', emoji: '⚡', title: 'Diskon 40%', subtitle: 'Pod System', gradient: 'from-primary-500 to-secondary-500' },
  { icon: 'i-lucide-gift', emoji: '🎁', title: 'Gratis Ongkir', subtitle: 'Min. Belanja 100K', gradient: 'from-pink-500 to-purple-500' },
  { icon: 'i-lucide-diamond', emoji: '💎', title: 'Cashback 20%', subtitle: 'Pakai E-Wallet', gradient: 'from-blue-500 to-cyan-500' }
]

const stats: Stat[] = [
  { value: '15K+', label: 'Produk', gradient: 'from-primary-400 to-secondary-400' },
  { value: '50K+', label: 'Customer', gradient: 'from-pink-400 to-primary-400' }
]
</script>

<template>
  <section class="relative overflow-hidden">
    <UContainer class="relative z-10">
      <div class="grid lg:grid-cols-2 gap-12 items-center py-20 lg:py-28">
        <!-- Hero Content -->
        <div class="text-center lg:text-left scroll-reveal">
          <!-- Title -->
          <h1 class="text-4xl lg:text-6xl xl:text-7xl font-black mb-6 leading-tight">
            Marketplace Vape
            <span class="block bg-linear-to-r from-primary-400 via-secondary-400 to-pink-400 dark:from-primary-300 dark:via-secondary-300 dark:to-pink-300 text-transparent bg-clip-text">
              Terpercaya
            </span>
            Indonesia
          </h1>

          <!-- Description -->
          <p class="text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Ribuan produk vape & rokok elektrik original dari ratusan brand terpercaya.
            Gratis ongkir, garansi resmi, dan harga terbaik!
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
            <UButton to="/collections" size="xl" class="shadow-2xl shadow-primary-500/50 dark:shadow-primary-500/30 font-bold hover:shadow-primary-500/70 dark:hover:shadow-primary-500/50 hover:scale-105 transition-all group">
              <UIcon name="i-lucide-shopping-bag" class="w-5 h-5 group-hover:rotate-12 transition-transform" />
              Belanja Sekarang
            </UButton>
            <UButton to="/register" size="xl" variant="outline" color="white" class="font-bold hover:bg-white/10 dark:hover:bg-white/5 hover:scale-105 transition-all group border-white/30 dark:border-white/20">
              <UIcon name="i-lucide-store" class="w-5 h-5 group-hover:scale-110 transition-transform" />
              Jadi Pengguna
            </UButton>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 dark:border-white/5">
            <div
              v-for="(stat, index) in stats"
              :key="stat.label"
              :class="[
                'scroll-reveal',
                `scroll-reveal-delay-${index + 1}`,
                'hover:scale-110 transition-transform cursor-default'
              ]"
            >
              <div :class="['text-2xl lg:text-3xl font-black bg-linear-to-r text-transparent bg-clip-text mb-1', stat.gradient]">
                {{ stat.value }}
              </div>
              <div class="text-sm text-gray-700 dark:text-gray-500">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Hero Card - Vape Device Illustration -->
        <div class="relative scroll-reveal scroll-reveal-delay-2 floating-animation">
          <!-- Glow Background -->
          <div class="absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 dark:from-primary-600 dark:to-secondary-600 rounded-3xl blur-2xl opacity-30 dark:opacity-20 animate-pulse"></div>

          <div class="relative bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-8 shadow-2xl hover:shadow-primary-500/20 dark:hover:shadow-primary-500/10 transition-all hover:scale-[1.02] group">
            <!-- SVG Vape Device Illustration -->
            <div class="flex justify-center mb-6">
              <svg class="w-48 h-48 drop-shadow-2xl" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <!-- Vapor Clouds -->
                <g class="animate-vapor opacity-60">
                  <ellipse cx="100" cy="25" rx="20" ry="10" class="fill-white/40 dark:fill-white/20"/>
                  <ellipse cx="85" cy="35" rx="15" ry="8" class="fill-white/30 dark:fill-white/15"/>
                  <ellipse cx="115" cy="30" rx="18" ry="9" class="fill-white/35 dark:fill-white/18"/>
                  <ellipse cx="95" cy="15" rx="12" ry="6" class="fill-white/25 dark:fill-white/12"/>
                </g>

                <!-- Main Device Body -->
                <defs>
                  <linearGradient id="deviceGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" class="[stop-color:var(--color-primary-400)]"/>
                    <stop offset="50%" class="[stop-color:var(--color-secondary-500)]"/>
                    <stop offset="100%" class="[stop-color:var(--color-primary-600)]"/>
                  </linearGradient>
                  <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#1a1a2e"/>
                    <stop offset="100%" stop-color="#0f0f1a"/>
                  </linearGradient>
                  <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="rgba(255,255,255,0.3)"/>
                    <stop offset="50%" stop-color="rgba(255,255,255,0.1)"/>
                    <stop offset="100%" stop-color="rgba(255,255,255,0.2)"/>
                  </linearGradient>
                </defs>

                <!-- Device Shadow -->
                <ellipse cx="100" cy="185" rx="35" ry="8" class="fill-black/20 dark:fill-black/40 blur-sm"/>

                <!-- Main Body -->
                <rect x="70" y="50" width="60" height="130" rx="12" fill="url(#deviceGradient)" class="drop-shadow-lg"/>

                <!-- Body Highlight -->
                <rect x="72" y="52" width="20" height="126" rx="10" class="fill-white/20"/>

                <!-- Drip Tip (Mouthpiece) -->
                <rect x="85" y="40" width="30" height="15" rx="4" class="fill-gray-800 dark:fill-gray-900"/>
                <rect x="90" y="35" width="20" height="10" rx="3" class="fill-gray-700 dark:fill-gray-800"/>

                <!-- Tank/Pod Section -->
                <rect x="78" y="55" width="44" height="50" rx="6" fill="url(#glassGradient)" class="stroke-white/30" stroke-width="1"/>

                <!-- E-liquid Level -->
                <rect x="80" y="75" width="40" height="28" rx="4" class="fill-primary-400/60 dark:fill-primary-500/40"/>
                <rect x="80" y="70" width="40" height="10" rx="2" class="fill-primary-300/40 dark:fill-primary-400/30"/>

                <!-- Coil visible through tank -->
                <rect x="95" y="80" width="10" height="20" rx="2" class="fill-gray-600/50"/>

                <!-- Screen Area -->
                <rect x="78" y="115" width="44" height="35" rx="4" fill="url(#screenGradient)"/>

                <!-- Screen Content -->
                <text x="100" y="130" text-anchor="middle" class="fill-primary-400 text-[8px] font-bold">50W</text>
                <text x="100" y="142" text-anchor="middle" class="fill-gray-400 text-[6px]">0.5Ω</text>

                <!-- Battery Indicator -->
                <rect x="83" y="147" width="34" height="4" rx="1" class="fill-gray-700"/>
                <rect x="84" y="148" width="25" height="2" rx="0.5" class="fill-primary-500 animate-pulse"/>

                <!-- Fire Button -->
                <circle cx="100" cy="165" r="8" class="fill-gray-800 dark:fill-gray-900 stroke-gray-600" stroke-width="1"/>
                <circle cx="100" cy="165" r="5" class="fill-primary-500/80 animate-pulse"/>

                <!-- Side Buttons -->
                <rect x="130" y="120" width="4" height="12" rx="2" class="fill-gray-600"/>
                <rect x="130" y="135" width="4" height="12" rx="2" class="fill-gray-600"/>

                <!-- USB Port -->
                <rect x="92" y="178" width="16" height="4" rx="1" class="fill-gray-700"/>
              </svg>
            </div>

            <!-- Card Title -->
            <h3 class="text-2xl font-bold text-gray-600 dark:text-gray-100 mb-2 text-center">Premium Vape Devices</h3>
            <p class="text-gray-600 dark:text-gray-400 text-center text-sm mb-6">Koleksi terbaik dengan garansi resmi</p>

            <!-- Promo Items -->
            <div class="space-y-3">
              <div
                v-for="promo in promos"
                :key="promo.title"
                class="flex items-center justify-between p-4 bg-linear-to-r from-white/10 to-white/5 dark:from-white/5 dark:to-transparent hover:from-white/15 hover:to-white/10 dark:hover:from-white/10 dark:hover:to-white/5 rounded-xl border border-white/15 dark:border-white/10 transition-all hover:scale-[1.02] hover:shadow-lg cursor-pointer group/item"
              >
                <div class="flex items-center gap-3">
                  <div :class="['w-11 h-11 bg-linear-to-br rounded-xl flex items-center justify-center shadow-lg group-hover/item:rotate-12 group-hover/item:scale-110 transition-all', promo.gradient]">
                    <UIcon :name="promo.icon" class="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div class="text-gray-800 font-semibold text-sm">{{ promo.title }}</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">{{ promo.subtitle }}</div>
                  </div>
                </div>
                <UIcon name="i-lucide-chevron-right" class="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover/item:translate-x-1 transition-all" />
              </div>
            </div>

            <!-- CTA Button -->
            <UButton to="/collections" block size="lg" class="mt-6 font-semibold group/btn">
              <span>Lihat Semua Produk</span>
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
