<script setup lang="ts">
interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  icon: string
  href: string
  color: string
}

interface Props {
  categories: Category[]
}

defineProps<Props>()
</script>

<template>
  <section class="py-16 lg:py-24 relative overflow-hidden">
    <UContainer class="relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-12 lg:mb-16 scroll-reveal">
        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-4 py-2 bg-primary-100/80 dark:bg-white/10 backdrop-blur-md border border-primary-200/50 dark:border-white/20 rounded-full mb-6 shadow-sm">
          <div class="w-2 h-2 bg-primary-500 dark:bg-primary-400 rounded-full animate-pulse"></div>
          <span class="text-sm font-medium text-primary-700 dark:text-white/80">Explore Categories</span>
        </div>

        <h2 class="text-3xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4">
          Kategori
          <span class="bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 dark:from-primary-400 dark:via-secondary-400 dark:to-pink-400 text-transparent bg-clip-text">Populer</span>
        </h2>
        <p class="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
          Temukan produk vape & rokok elektrik terbaik sesuai kebutuhan Anda
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-6">
        <a
          v-for="(category, index) in categories"
          :key="category.name"
          :href="category.href"
          :class="[
            'scroll-reveal',
            `scroll-reveal-delay-${(index % 6) + 1}`,
            'group relative rounded-2xl sm:rounded-3xl p-4 sm:p-6 overflow-hidden',
            'bg-white/80 dark:bg-white/5 backdrop-blur-xl',
            'border border-gray-200/80 dark:border-white/10',
            'hover:bg-white dark:hover:bg-white/10 hover:border-primary-300 dark:hover:border-primary-500/50',
            'transition-all duration-500 ease-out',
            'hover:shadow-xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/20',
            'active:scale-95 sm:hover:-translate-y-2 cursor-pointer'
          ]"
        >
          <!-- Card Glow Effect -->
          <div class="absolute inset-0 bg-linear-to-br from-primary-500/0 via-secondary-500/0 to-pink-500/0 group-hover:from-primary-500/5 dark:group-hover:from-primary-500/20 group-hover:via-secondary-500/5 dark:group-hover:via-secondary-500/10 group-hover:to-pink-500/5 dark:group-hover:to-pink-500/20 rounded-2xl sm:rounded-3xl transition-all duration-500 pointer-events-none"></div>

          <!-- Animated Border Glow -->
          <div class="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div class="absolute -inset-px bg-linear-to-r from-primary-500 via-secondary-500 to-pink-500 rounded-2xl sm:rounded-3xl blur-sm animate-border-glow opacity-30 dark:opacity-100"></div>
          </div>

          <div class="relative text-center z-10">
            <!-- Icon Container -->
            <div class="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4">
              <!-- Icon Background Glow -->
              <div class="absolute inset-0 bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl blur-lg opacity-30 dark:opacity-50 group-hover:opacity-60 dark:group-hover:opacity-80 transition-opacity"></div>

              <!-- Icon Box -->
              <div class="relative w-full h-full bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl sm:rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary-500/20">
                <UIcon :name="category.icon" class="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-lg" />
              </div>

              <!-- Particle Effects on Hover -->
              <div class="absolute -top-1 -right-1 w-3 h-3 bg-primary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity"></div>
              <div class="absolute -bottom-1 -left-1 w-2 h-2 bg-secondary-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" style="animation-delay: 0.2s"></div>
            </div>

            <!-- Category Name -->
            <h3 class="font-bold text-gray-900 dark:text-white mb-1 text-xs sm:text-sm lg:text-base group-hover:text-primary-600 dark:group-hover:text-primary-300 transition-colors">
              {{ category.name }}
            </h3>

            <!-- Category Description -->
            <p v-if="category.description" class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 group-hover:text-primary-500 dark:group-hover:text-white/80 transition-colors line-clamp-1">
              {{ category.description }}
            </p>
          </div>

          <!-- Bottom Shine Effect -->
          <div class="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary-400/30 dark:via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </a>
      </div>

      <!-- Bottom CTA -->
      <div class="text-center mt-10 lg:mt-12 scroll-reveal">
        <UButton to="/collections" size="lg" variant="outline" class="group font-semibold text-primary-600 dark:text-white border-primary-300 dark:border-white/50 hover:bg-primary-50 dark:hover:bg-white/10 hover:border-primary-400 dark:hover:border-white transition-all shadow-sm">
          <span>Lihat Semua Koleksi</span>
          <UIcon name="i-lucide-arrow-right" class="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </UButton>
      </div>
    </UContainer>
  </section>
</template>


