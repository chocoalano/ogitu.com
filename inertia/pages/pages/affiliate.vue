<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { ref } from 'vue'
import AppLayout from '~/layouts/default.vue'

interface Commission {
  tier: string
  minSales: string
  maxSales: string
  commission: string
}

interface Step {
  step: number
  title: string
  description: string
  icon: string
}

interface FaqItem {
  question: string
  answer: string
}

interface Testimonial {
  name: string
  role: string
  image: string
  quote: string
  earnings: string
}

const props = defineProps<{
  affiliateData: {
    hero: {
      title: string
      subtitle: string
    }
    commissions: Commission[]
    howItWorks: Step[]
    benefits: string[]
    faq: FaqItem[]
    testimonials: Testimonial[]
  }
}>()

const openFaq = ref<number | null>(null)

const toggleFaq = (index: number) => {
  openFaq.value = openFaq.value === index ? null : index
}

// Get tier color
const getTierColor = (tier: string) => {
  const colors: Record<string, string> = {
    Bronze: 'from-amber-600 to-amber-700',
    Silver: 'from-gray-400 to-gray-500',
    Gold: 'from-yellow-400 to-yellow-500',
    Platinum: 'from-cyan-400 to-blue-500',
  }
  return colors[tier] || 'from-gray-400 to-gray-500'
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Program Afiliasi - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-emerald-500 via-green-500 to-teal-500 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="affiliate-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="20" fill="none" stroke="white" stroke-width="1" />
              <circle cx="30" cy="30" r="10" fill="none" stroke="white" stroke-width="1" />
              <circle cx="30" cy="30" r="3" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#affiliate-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <nav class="flex items-center gap-2 text-sm mb-8 text-white/80">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white font-medium">Afiliasi</span>
        </nav>

        <div class="text-center max-w-3xl mx-auto">
          <div class="w-20 h-20 mx-auto mb-6 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <UIcon name="i-heroicons-currency-dollar" class="w-10 h-10 text-white" />
          </div>
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">
            {{ affiliateData.hero.title }}
          </h1>
          <p class="text-xl text-white/80 mb-8">
            {{ affiliateData.hero.subtitle }}
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <UButton color="white" size="xl">
                <UIcon name="i-heroicons-user-plus" class="w-5 h-5 mr-2" />
                Daftar Sekarang
              </UButton>
            </Link>
            <Link href="/login">
              <UButton color="white" variant="outline" size="xl">
                <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 mr-2" />
                Login ke Dashboard
              </UButton>
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Commission Tiers -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Tingkat Komisi</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="tier in affiliateData.commissions"
            :key="tier.tier"
            class="relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow overflow-hidden"
          >
            <!-- Tier badge -->
            <div :class="['absolute top-0 right-0 w-20 h-20 bg-linear-to-br rounded-bl-full', getTierColor(tier.tier)]" />
            <div class="absolute top-2 right-2 text-white text-xs font-bold">
              {{ tier.commission }}
            </div>

            <div class="relative">
              <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4">{{ tier.tier }}</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-gray-400">Min. Penjualan</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ tier.minSales }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-500 dark:text-gray-400">Max. Penjualan</span>
                  <span class="text-gray-900 dark:text-white font-medium">{{ tier.maxSales }}</span>
                </div>
                <div class="pt-2 border-t border-gray-100 dark:border-gray-700">
                  <div class="flex justify-between">
                    <span class="text-gray-500 dark:text-gray-400">Komisi</span>
                    <span class="text-green-600 dark:text-green-400 font-bold text-lg">{{ tier.commission }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- How It Works -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Cara Kerja</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="step in affiliateData.howItWorks"
            :key="step.step"
            class="relative"
          >
            <!-- Connector -->
            <div
              v-if="step.step < affiliateData.howItWorks.length"
              class="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700"
            />

            <div class="relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow">
              <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center relative">
                <UIcon :name="step.icon" class="w-7 h-7 text-green-600 dark:text-green-400" />
                <span class="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {{ step.step }}
                </span>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ step.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Benefits -->
      <div class="mb-16">
        <div class="bg-green-50 dark:bg-green-900/20 rounded-3xl p-8 sm:p-12">
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Keuntungan Affiliate</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="(benefit, index) in affiliateData.benefits"
              :key="index"
              class="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-xl"
            >
              <div class="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-check" class="w-5 h-5 text-white" />
              </div>
              <span class="text-gray-700 dark:text-gray-300">{{ benefit }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Testimonials -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Kata Mereka</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="testimonial in affiliateData.testimonials"
            :key="testimonial.name"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6"
          >
            <div class="flex items-start gap-4 mb-4">
              <div class="w-14 h-14 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-user" class="w-7 h-7 text-gray-400" />
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ testimonial.name }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ testimonial.role }}</p>
                <span class="inline-block mt-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                  {{ testimonial.earnings }}
                </span>
              </div>
            </div>
            <p class="text-gray-600 dark:text-gray-400 italic">
              "{{ testimonial.quote }}"
            </p>
          </div>
        </div>
      </div>

      <!-- FAQ -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">FAQ</h2>

        <div class="max-w-3xl mx-auto space-y-4">
          <div
            v-for="(item, index) in affiliateData.faq"
            :key="index"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
            >
              <span class="font-medium text-gray-900 dark:text-white">{{ item.question }}</span>
              <UIcon
                name="i-heroicons-chevron-down"
                :class="[
                  'w-5 h-5 text-gray-400 transition-transform duration-200',
                  openFaq === index ? 'rotate-180' : ''
                ]"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              leave-active-class="transition-all duration-200 ease-in"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-40"
              leave-from-class="opacity-100 max-h-40"
              leave-to-class="opacity-0 max-h-0"
            >
              <div v-if="openFaq === index" class="px-6 pb-4 overflow-hidden">
                <p class="text-gray-600 dark:text-gray-400">{{ item.answer }}</p>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-linear-to-r from-emerald-500 to-green-600 rounded-3xl p-8 sm:p-12 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">Mulai Hasilkan Uang Sekarang!</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8">
          Bergabung dengan ribuan affiliate sukses di Ogitu. Daftar gratis dan dapatkan kode referral unik Anda.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Link href="/register">
            <UButton color="white" size="lg">
              <UIcon name="i-heroicons-rocket-launch" class="w-5 h-5 mr-2" />
              Daftar Gratis
            </UButton>
          </Link>
          <Link href="/help">
            <UButton color="white" variant="outline" size="lg">
              <UIcon name="i-heroicons-question-mark-circle" class="w-5 h-5 mr-2" />
              Pelajari Lebih Lanjut
            </UButton>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
