<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { ref } from 'vue'
import AppLayout from '~/layouts/default.vue'

interface Question {
  question: string
  answer: string
}

interface FaqCategory {
  category: string
  icon: string
  questions: Question[]
}

interface ContactInfo {
  whatsapp: string
  email: string
  instagram: string
  workingHours: string
}

const props = defineProps<{
  faqs: FaqCategory[]
  contactInfo: ContactInfo
}>()

// Accordion state
const openItems = ref<Record<string, number | null>>({})

// Toggle accordion item
const toggleItem = (category: string, index: number) => {
  if (openItems.value[category] === index) {
    openItems.value[category] = null
  } else {
    openItems.value[category] = index
  }
}

// Quick links data
const quickLinks = [
  { title: 'Cara Order', icon: 'i-heroicons-shopping-cart', href: '#order' },
  { title: 'Pembayaran', icon: 'i-heroicons-credit-card', href: '#pembayaran' },
  { title: 'Pengiriman', icon: 'i-heroicons-truck', href: '#pengiriman' },
  { title: 'Lacak Pesanan', icon: 'i-heroicons-map-pin', href: '/track' },
]

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Pusat Bantuan - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-125 h-125 bg-emerald-500/10 rounded-full blur-3xl" />
      <div class="absolute top-1/3 right-1/4 w-100 h-100 bg-teal-500/10 rounded-full blur-3xl" />
    </div>

    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="help-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="4" fill="white" />
              <circle cx="0" cy="0" r="2" fill="white" />
              <circle cx="60" cy="60" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#help-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm mb-6 text-white/80">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white font-medium">Pusat Bantuan</span>
        </nav>

        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <UIcon name="i-heroicons-question-mark-circle" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Pusat Bantuan</h1>
          <p class="text-white/80 max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan seputar produk vape, cara order, pembayaran, dan pengiriman
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          v-for="link in quickLinks"
          :key="link.title"
          :href="link.href"
          class="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-4 text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-500/10 group-hover:bg-primary-500/20 flex items-center justify-center transition-colors">
            <UIcon :name="link.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <p class="font-medium text-gray-900 dark:text-white text-sm">{{ link.title }}</p>
        </Link>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- FAQ Section -->
        <div class="lg:col-span-2 space-y-8">
          <div
            v-for="category in faqs"
            :key="category.category"
            :id="category.category.toLowerCase().replace(/\s+/g, '-')"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"
          >
            <!-- Category Header -->
            <div class="bg-linear-to-r from-primary-500/10 to-transparent p-6 border-b border-gray-200/50 dark:border-gray-700/50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-primary-500/20 flex items-center justify-center">
                  <UIcon :name="category.icon" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
                <h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ category.category }}</h2>
              </div>
            </div>

            <!-- Questions Accordion -->
            <div class="divide-y divide-gray-100 dark:divide-gray-700/50">
              <div
                v-for="(item, index) in category.questions"
                :key="index"
                class="group"
              >
                <button
                  @click="toggleItem(category.category, index)"
                  class="w-full px-6 py-4 text-left flex items-center justify-between gap-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <span class="font-medium text-gray-900 dark:text-white">{{ item.question }}</span>
                  <UIcon
                    name="i-heroicons-chevron-down"
                    :class="[
                      'w-5 h-5 text-gray-400 transition-transform duration-200 shrink-0',
                      openItems[category.category] === index ? 'rotate-180' : ''
                    ]"
                  />
                </button>

                <Transition
                  enter-active-class="transition-all duration-200 ease-out"
                  leave-active-class="transition-all duration-200 ease-in"
                  enter-from-class="opacity-0 max-h-0"
                  enter-to-class="opacity-100 max-h-96"
                  leave-from-class="opacity-100 max-h-96"
                  leave-to-class="opacity-0 max-h-0"
                >
                  <div
                    v-if="openItems[category.category] === index"
                    class="px-6 pb-4 overflow-hidden"
                  >
                    <div class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed prose prose-sm dark:prose-invert max-w-none" v-html="item.answer" />
                  </div>
                </Transition>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <!-- Contact Us -->
          <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 sticky top-24">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Hubungi Kami</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Tidak menemukan jawaban? Hubungi tim support kami.
            </p>

            <div class="space-y-4">
              <!-- WhatsApp -->
              <a
                :href="`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`"
                target="_blank"
                class="flex items-center gap-3 p-3 rounded-xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
              >
                <div class="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center">
                  <UIcon name="i-simple-icons-whatsapp" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">WhatsApp</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ contactInfo.whatsapp }}</p>
                </div>
              </a>

              <!-- Email -->
              <a
                :href="`mailto:${contactInfo.email}`"
                class="flex items-center gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
              >
                <div class="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                  <UIcon name="i-heroicons-envelope" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">Email</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ contactInfo.email }}</p>
                </div>
              </a>

              <!-- Instagram -->
              <a
                :href="`https://instagram.com/${contactInfo.instagram.replace('@', '')}`"
                target="_blank"
                class="flex items-center gap-3 p-3 rounded-xl bg-pink-50 dark:bg-pink-900/20 hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors"
              >
                <div class="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <UIcon name="i-simple-icons-instagram" class="w-5 h-5 text-white" />
                </div>
                <div>
                  <p class="font-medium text-gray-900 dark:text-white text-sm">Instagram</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ contactInfo.instagram }}</p>
                </div>
              </a>
            </div>

            <!-- Working Hours -->
            <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-xl">
              <div class="flex items-center gap-2 mb-2">
                <UIcon name="i-heroicons-clock" class="w-4 h-4 text-primary-500" />
                <p class="font-medium text-gray-900 dark:text-white text-sm">Jam Operasional</p>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ contactInfo.workingHours }}</p>
            </div>
          </div>

          <!-- Track Order CTA -->
          <div class="bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white">
            <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
              <UIcon name="i-heroicons-truck" class="w-6 h-6" />
            </div>
            <h3 class="font-semibold mb-2">Lacak Pesanan</h3>
            <p class="text-sm text-white/80 mb-4">
              Cek status pengiriman pesanan Anda secara real-time
            </p>
            <Link href="/track">
              <UButton color="white" block>
                Lacak Sekarang
              </UButton>
            </Link>
          </div>

          <!-- Age Verification Notice -->
          <div class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-amber-500 shrink-0" />
              <div>
                <h4 class="font-semibold text-gray-900 dark:text-white mb-2">Peringatan</h4>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Produk vape hanya untuk pengguna berusia 21 tahun ke atas.
                  Dengan melakukan pembelian, Anda menyatakan bahwa usia Anda sudah memenuhi syarat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Still Need Help Section -->
    <div class="bg-linear-to-r from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-900">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="text-center">
          <h2 class="text-2xl font-bold text-white mb-3">Masih Butuh Bantuan?</h2>
          <p class="text-gray-400 max-w-xl mx-auto mb-8">
            Tim customer service kami siap membantu Anda 24/7.
            Jangan ragu untuk menghubungi kami melalui WhatsApp.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <a :href="`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`" target="_blank">
              <UButton color="primary" size="lg">
                <UIcon name="i-simple-icons-whatsapp" class="w-5 h-5 mr-2" />
                Chat via WhatsApp
              </UButton>
            </a>
            <Link href="/">
              <UButton color="white" variant="outline" size="lg">
                <UIcon name="i-heroicons-home" class="w-5 h-5 mr-2" />
                Kembali ke Beranda
              </UButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
