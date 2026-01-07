<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Benefit {
  icon: string
  title: string
  description: string
}

interface Props {
  benefits: Benefit[]
}

defineProps<Props>()

// Animated counter
const counters = ref({
  products: 0,
  customers: 0,
  rating: 0,
  brands: 0,
})

const targetValues = {
  products: 15000,
  customers: 50000,
  rating: 4.9,
  brands: 200,
}

const animateCounters = () => {
  const duration = 2000
  const steps = 60
  const interval = duration / steps

  let step = 0
  const timer = setInterval(() => {
    step++
    const progress = step / steps

    counters.value.products = Math.floor(targetValues.products * progress)
    counters.value.customers = Math.floor(targetValues.customers * progress)
    counters.value.rating = Math.round(targetValues.rating * progress * 10) / 10
    counters.value.brands = Math.floor(targetValues.brands * progress)

    if (step >= steps) {
      clearInterval(timer)
      counters.value.products = targetValues.products
      counters.value.customers = targetValues.customers
      counters.value.rating = targetValues.rating
      counters.value.brands = targetValues.brands
    }
  }, interval)
}

onMounted(() => {
  // Start counter animation when component is visible
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )

  const statsSection = document.querySelector('.stats-section')
  if (statsSection) observer.observe(statsSection)
})

// Card colors for variety
const cardColors = [
  { from: 'from-violet-500', to: 'to-purple-600', glow: 'violet' },
  { from: 'from-cyan-500', to: 'to-blue-600', glow: 'cyan' },
  { from: 'from-pink-500', to: 'to-rose-600', glow: 'pink' },
  { from: 'from-amber-500', to: 'to-orange-600', glow: 'amber' },
]
</script>

<template>
  <section class="py-20 lg:py-32 relative overflow-hidden">
    <UContainer class="relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-16 lg:mb-20 scroll-reveal">
        <!-- Animated Badge -->
        <div class="inline-flex items-center gap-2 px-5 py-2.5 bg-white/80 dark:bg-white/10 backdrop-blur-xl border border-gray-200/50 dark:border-white/20 rounded-full mb-8 shadow-lg shadow-gray-200/30 dark:shadow-none animate-bounce-subtle">
          <div class="relative">
            <UIcon name="i-lucide-zap" class="w-5 h-5 text-amber-500" />
            <div class="absolute inset-0 animate-ping">
              <UIcon name="i-lucide-zap" class="w-5 h-5 text-amber-500 opacity-50" />
            </div>
          </div>
          <span class="text-sm font-semibold bg-linear-to-r from-violet-600 to-cyan-600 dark:from-violet-400 dark:to-cyan-400 text-transparent bg-clip-text">
            #1 Vape Store Indonesia
          </span>
        </div>

        <h2 class="text-4xl lg:text-6xl font-black text-gray-900 dark:text-white mb-6 leading-tight">
          Kenapa Harus Pilih
          <br class="hidden sm:block" />
          <span class="relative inline-block mt-2">
            <span class="relative z-10 bg-linear-to-r from-violet-600 via-primary-600 to-cyan-600 dark:from-violet-400 dark:via-primary-400 dark:to-cyan-400 text-transparent bg-clip-text animate-gradient-x">
              ogitu.com
            </span>
            <svg class="absolute -bottom-2 left-0 w-full h-3 text-primary-500/30" viewBox="0 0 200 8" preserveAspectRatio="none">
              <path d="M0,5 Q50,0 100,5 T200,5" stroke="currentColor" stroke-width="3" fill="none" class="animate-draw-line" />
            </svg>
          </span>
          ?
        </h2>
        <p class="text-gray-600 dark:text-gray-400 text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
          Pengalaman belanja vape premium dengan
          <span class="text-primary-600 dark:text-primary-400 font-semibold">produk 100% original</span>,
          harga terbaik, dan layanan pelanggan yang siap membantu 24/7
        </p>
      </div>

      <!-- Benefits Grid - Bento Style -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
        <div
          v-for="(benefit, index) in benefits"
          :key="benefit.title"
          :class="[
            'scroll-reveal',
            `scroll-reveal-delay-${(index % 4) + 1}`,
            'group relative rounded-3xl p-6 lg:p-8 overflow-hidden cursor-pointer',
            'bg-white/70 dark:bg-gray-800/50 backdrop-blur-xl',
            'border border-gray-200/50 dark:border-gray-700/50',
            'hover:border-transparent',
            'transition-all duration-700 ease-out',
            'shadow-xl shadow-gray-200/40 dark:shadow-gray-900/20',
            'hover:shadow-2xl',
            'sm:hover:-translate-y-3 sm:hover:scale-[1.02]',
            'active:scale-[0.98]'
          ]"
        >
          <!-- Animated Gradient Border on Hover -->
          <div class="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10">
            <div :class="[
              'absolute -inset-0.5 rounded-3xl bg-linear-to-r',
              cardColors[index % 4].from,
              cardColors[index % 4].to,
              'animate-gradient-xy'
            ]" />
            <div class="absolute inset-px rounded-3xl bg-white dark:bg-gray-900" />
          </div>

          <!-- Glow Effect -->
          <div :class="[
            'absolute -inset-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl -z-20',
            `bg-${cardColors[index % 4].glow}-500/20 dark:bg-${cardColors[index % 4].glow}-500/10`
          ]" />

          <!-- Content -->
          <div class="relative z-10">
            <!-- Icon with 3D Effect -->
            <div class="relative w-16 h-16 lg:w-20 lg:h-20 mb-6 perspective-1000">
              <!-- Shadow -->
              <div :class="[
                'absolute inset-0 rounded-2xl bg-linear-to-br',
                cardColors[index % 4].from,
                cardColors[index % 4].to,
                'blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 translate-y-2'
              ]" />

              <!-- Icon Container -->
              <div :class="[
                'relative w-full h-full rounded-2xl bg-linear-to-br flex items-center justify-center',
                cardColors[index % 4].from,
                cardColors[index % 4].to,
                'shadow-lg group-hover:shadow-2xl transition-all duration-500',
                'group-hover:scale-110 group-hover:-rotate-6',
                'transform-gpu preserve-3d'
              ]">
                <UIcon :name="benefit.icon" class="w-8 h-8 lg:w-10 lg:h-10 text-white drop-shadow-lg" />

                <!-- Shine Effect -->
                <div class="absolute inset-0 rounded-2xl bg-linear-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              <!-- Floating Particles -->
              <div class="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white shadow-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity" />
              <div class="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-white/80 shadow-lg opacity-0 group-hover:opacity-100 group-hover:animate-bounce animation-delay-100 transition-opacity" />
            </div>

            <!-- Title with Gradient on Hover -->
            <h3 :class="[
              'text-xl lg:text-2xl font-bold mb-3 transition-all duration-500',
              'text-gray-900 dark:text-white',
              'group-hover:bg-linear-to-r group-hover:text-transparent group-hover:bg-clip-text',
              `group-hover:${cardColors[index % 4].from} group-hover:${cardColors[index % 4].to}`
            ]">
              {{ benefit.title }}
            </h3>

            <!-- Description -->
            <p class="text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-500">
              {{ benefit.description }}
            </p>

            <!-- Learn More Link -->
            <div class="mt-5 flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
              <span :class="[
                'bg-linear-to-r text-transparent bg-clip-text',
                cardColors[index % 4].from,
                cardColors[index % 4].to
              ]">
                Pelajari lebih lanjut
              </span>
              <UIcon name="i-lucide-arrow-right" :class="[
                'w-4 h-4 group-hover:translate-x-1 transition-transform',
                cardColors[index % 4].from.replace('from-', 'text-')
              ]" />
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Section - Glassmorphism Style -->
      <div class="stats-section mt-20 lg:mt-28 scroll-reveal">
        <div class="relative rounded-3xl overflow-hidden">
          <!-- Background -->
          <div class="absolute inset-0 bg-linear-to-r from-violet-600 via-primary-600 to-cyan-600" />
          <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]" />

          <!-- Content -->
          <div class="relative px-6 py-12 lg:px-12 lg:py-16">
            <!-- Header -->
            <div class="text-center mb-10 lg:mb-12">
              <h3 class="text-2xl lg:text-3xl font-bold text-white mb-2">
                Dipercaya Ribuan Vapers Indonesia
              </h3>
              <p class="text-white/70">
                Bergabunglah dengan komunitas vaping terbesar di Indonesia
              </p>
            </div>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              <!-- Products -->
              <div class="group text-center">
                <div class="relative inline-block">
                  <div class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums">
                    {{ counters.products >= 1000 ? `${(counters.products / 1000).toFixed(counters.products >= targetValues.products ? 0 : 1)}K` : counters.products }}+
                  </div>
                  <div class="absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div class="flex items-center justify-center gap-2 text-white/80">
                  <UIcon name="i-lucide-package" class="w-4 h-4" />
                  <span class="text-sm font-medium">Produk Tersedia</span>
                </div>
              </div>

              <!-- Customers -->
              <div class="group text-center">
                <div class="relative inline-block">
                  <div class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums">
                    {{ counters.customers >= 1000 ? `${(counters.customers / 1000).toFixed(counters.customers >= targetValues.customers ? 0 : 1)}K` : counters.customers }}+
                  </div>
                  <div class="absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div class="flex items-center justify-center gap-2 text-white/80">
                  <UIcon name="i-lucide-users" class="w-4 h-4" />
                  <span class="text-sm font-medium">Happy Customers</span>
                </div>
              </div>

              <!-- Rating -->
              <div class="group text-center">
                <div class="relative inline-block">
                  <div class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums">
                    {{ counters.rating.toFixed(1) }}
                  </div>
                  <div class="absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div class="flex items-center justify-center gap-2 text-white/80">
                  <div class="flex items-center gap-0.5">
                    <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  </div>
                  <span class="text-sm font-medium">Rating</span>
                </div>
              </div>

              <!-- Brands -->
              <div class="group text-center">
                <div class="relative inline-block">
                  <div class="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-2 tabular-nums">
                    {{ counters.brands }}+
                  </div>
                  <div class="absolute -inset-4 bg-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div class="flex items-center justify-center gap-2 text-white/80">
                  <UIcon name="i-lucide-award" class="w-4 h-4" />
                  <span class="text-sm font-medium">Brand Premium</span>
                </div>
              </div>
            </div>

            <!-- CTA -->
            <div class="mt-10 lg:mt-12 text-center">
              <UButton
                to="/collections"
                size="xl"
                class="bg-white text-primary-600 hover:bg-gray-100 shadow-xl shadow-black/20 font-bold px-8"
              >
                <UIcon name="i-lucide-shopping-bag" class="w-5 h-5 mr-2" />
                Mulai Belanja Sekarang
                <UIcon name="i-lucide-arrow-right" class="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Trust Badges -->
      <div class="mt-12 lg:mt-16 scroll-reveal">
        <div class="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <UIcon name="i-lucide-shield-check" class="w-5 h-5 text-emerald-500" />
            <span class="text-sm font-medium">100% Original</span>
          </div>
          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <UIcon name="i-lucide-truck" class="w-5 h-5 text-blue-500" />
            <span class="text-sm font-medium">Free Shipping*</span>
          </div>
          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <UIcon name="i-lucide-refresh-cw" class="w-5 h-5 text-amber-500" />
            <span class="text-sm font-medium">Easy Return</span>
          </div>
          <div class="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <UIcon name="i-lucide-headphones" class="w-5 h-5 text-purple-500" />
            <span class="text-sm font-medium">24/7 Support</span>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<style scoped>
/* Floating animations */
@keyframes float-slow {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-20px) translateX(10px); }
  50% { transform: translateY(-10px) translateX(-10px); }
  75% { transform: translateY(-30px) translateX(5px); }
}

@keyframes float-slower {
  0%, 100% { transform: translateY(0) translateX(0); }
  33% { transform: translateY(-30px) translateX(-15px); }
  66% { transform: translateY(-15px) translateX(20px); }
}

.animate-float-slow {
  animation: float-slow 15s ease-in-out infinite;
}

.animate-float-slower {
  animation: float-slower 20s ease-in-out infinite;
}

/* Gradient animation */
@keyframes gradient-x {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

@keyframes gradient-xy {
  0%, 100% { background-position: 0% 0%; }
  25% { background-position: 100% 0%; }
  50% { background-position: 100% 100%; }
  75% { background-position: 0% 100%; }
}

.animate-gradient-x {
  background-size: 200% 200%;
  animation: gradient-x 3s ease infinite;
}

.animate-gradient-xy {
  background-size: 200% 200%;
  animation: gradient-xy 4s ease infinite;
}

/* Bounce subtle */
@keyframes bounce-subtle {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

.animate-bounce-subtle {
  animation: bounce-subtle 2s ease-in-out infinite;
}

/* Draw line animation */
@keyframes draw-line {
  0% { stroke-dasharray: 0 200; }
  100% { stroke-dasharray: 200 0; }
}

.animate-draw-line {
  animation: draw-line 1.5s ease forwards;
}

/* Animation delays */
.animation-delay-100 {
  animation-delay: 100ms;
}

/* Perspective for 3D effect */
.perspective-1000 {
  perspective: 1000px;
}

.preserve-3d {
  transform-style: preserve-3d;
}
</style>


