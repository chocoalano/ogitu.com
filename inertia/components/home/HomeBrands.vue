<script setup lang="ts">
interface Props {
  brands: string[]
}

defineProps<Props>()
</script>

<template>
  <section class="py-16 lg:py-24 relative overflow-hidden">

    <UContainer class="relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16 scroll-reveal">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-white/10 backdrop-blur-md border border-primary-200 dark:border-white/20 rounded-full mb-6">
          <UIcon name="i-lucide-award" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
          <span class="text-sm font-medium text-primary-700 dark:text-white/80">Official Partners</span>
        </div>

        <h2 class="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
          Brand
          <span class="bg-linear-to-r from-primary-600 via-secondary-600 to-pink-600 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text">Ternama</span>
          yang Tersedia
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Produk original dari brand vape terpercaya dunia dengan garansi resmi
        </p>
      </div>

      <!-- Brands Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        <div
          v-for="(brand, index) in brands"
          :key="brand"
          :class="[
            'scroll-reveal',
            `scroll-reveal-delay-${(index % 8) + 1}`,
            'group relative aspect-square rounded-2xl overflow-hidden cursor-pointer',
            'bg-white dark:bg-white/5 backdrop-blur-xl',
            'border border-gray-200 dark:border-white/10',
            'hover:border-primary-400 dark:hover:border-primary-500/50',
            'shadow-md shadow-gray-200/50 dark:shadow-none',
            'hover:shadow-xl hover:shadow-primary-500/20',
            'transition-all duration-500 ease-out',
            'active:scale-95 sm:hover:-translate-y-2 sm:hover:scale-105'
          ]"
        >
          <!-- Card Glow Effect -->
          <div class="absolute inset-0 bg-linear-to-br from-primary-500/0 to-secondary-500/0 group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-500"></div>

          <!-- Animated Border on Hover -->
          <div class="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="absolute -inset-px bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 rounded-2xl blur-sm animate-border-glow"></div>
          </div>

          <!-- Content -->
          <div class="relative z-10 w-full h-full flex flex-col items-center justify-center p-3">
            <!-- Brand Icon/Logo Placeholder -->
            <div class="w-10 h-10 sm:w-12 sm:h-12 mb-2 bg-linear-to-br from-primary-100 to-secondary-100 dark:from-primary-900/50 dark:to-secondary-900/50 rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
              <UIcon name="i-lucide-box" class="w-5 h-5 sm:w-6 sm:h-6 text-primary-600 dark:text-primary-400" />
            </div>

            <!-- Brand Name -->
            <span class="font-bold text-gray-800 dark:text-white text-xs sm:text-sm text-center group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
              {{ brand }}
            </span>
          </div>

          <!-- Particle on Hover -->
          <div class="absolute top-2 right-2 w-2 h-2 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-10 lg:mt-12 scroll-reveal">
        <div class="inline-flex flex-col sm:flex-row items-center gap-4">
          <UButton to="/brands" size="lg" class="group font-semibold shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all">
            <span>Lihat Semua Brand</span>
            <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </UButton>

          <span class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
            <UIcon name="i-lucide-shield-check" class="w-4 h-4 text-green-500" />
            100% Produk Original
          </span>
        </div>
      </div>
    </UContainer>
  </section>
</template>
