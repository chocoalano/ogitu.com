<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'

interface PaymentMethod {
  name: string
  logo: string
  fee: string
  processing: string
  type?: string
  description?: string
}

interface SecurityFeature {
  title: string
  description: string
  icon: string
}

const props = defineProps<{
  paymentMethods: {
    banks: PaymentMethod[]
    ewallets: PaymentMethod[]
    others: PaymentMethod[]
    securityFeatures: SecurityFeature[]
  }
}>()

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Metode Pembayaran - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-green-500 via-emerald-500 to-teal-500 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="payment-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="20" height="14" rx="2" fill="none" stroke="white" stroke-width="1" />
              <line x1="10" y1="17" x2="30" y2="17" stroke="white" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#payment-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <nav class="flex items-center gap-2 text-sm mb-6 text-white/80">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white font-medium">Metode Pembayaran</span>
        </nav>

        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <UIcon name="i-heroicons-credit-card" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Metode Pembayaran</h1>
          <p class="text-white/80 max-w-2xl mx-auto">
            Berbagai pilihan pembayaran aman dan mudah untuk kenyamanan berbelanja Anda
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Bank Transfer / VA -->
      <div class="mb-12">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-building-library" class="w-6 h-6 text-blue-500" />
          Virtual Account (Transfer Bank)
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-for="bank in paymentMethods.banks"
            :key="bank.name"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center gap-4 mb-4">
              <div class="w-16 h-10 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span class="font-bold text-gray-600 dark:text-gray-300">{{ bank.name }}</span>
              </div>
              <div>
                <h3 class="font-semibold text-gray-900 dark:text-white">{{ bank.name }}</h3>
                <p class="text-xs text-gray-500 dark:text-gray-400">{{ bank.type }}</p>
              </div>
            </div>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">Biaya Admin</span>
                <span class="font-medium text-green-600 dark:text-green-400">{{ bank.fee }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-500 dark:text-gray-400">Proses</span>
                <span class="text-gray-900 dark:text-white">{{ bank.processing }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- E-Wallet -->
      <div class="mb-12">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-device-phone-mobile" class="w-6 h-6 text-purple-500" />
          E-Wallet
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="ewallet in paymentMethods.ewallets"
            :key="ewallet.name"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div class="w-16 h-16 mx-auto mb-3 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
              <span class="font-bold text-gray-600 dark:text-gray-300">{{ ewallet.name.slice(0, 2) }}</span>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ ewallet.name }}</h3>
            <p class="text-xs text-green-600 dark:text-green-400">{{ ewallet.fee }}</p>
          </div>
        </div>
      </div>

      <!-- Other Methods -->
      <div class="mb-12">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <UIcon name="i-heroicons-qr-code" class="w-6 h-6 text-orange-500" />
          Metode Lainnya
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            v-for="method in paymentMethods.others"
            :key="method.name"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start gap-4">
              <div class="w-14 h-14 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center shrink-0">
                <span class="font-bold text-xs text-gray-600 dark:text-gray-300">{{ method.name }}</span>
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ method.name }}</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">{{ method.description }}</p>
                <div class="flex flex-wrap gap-2 text-xs">
                  <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    Biaya: {{ method.fee }}
                  </span>
                  <span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {{ method.processing }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Security Features -->
      <div class="mb-12">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">Keamanan Transaksi</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            v-for="feature in paymentMethods.securityFeatures"
            :key="feature.title"
            class="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-800/50 rounded-2xl p-6 text-center"
          >
            <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <UIcon :name="feature.icon" class="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
          </div>
        </div>
      </div>

      <!-- Payment Tips -->
      <div class="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-200 dark:border-amber-800 p-6 sm:p-8">
        <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-amber-500" />
          Tips Pembayaran
        </h3>
        <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <span>Selesaikan pembayaran dalam <strong class="text-gray-900 dark:text-white">24 jam</strong> sebelum pesanan otomatis dibatalkan</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <span>Gunakan <strong class="text-gray-900 dark:text-white">Virtual Account</strong> untuk konfirmasi pembayaran otomatis dan instan</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <span>Simpan bukti pembayaran sampai pesanan diterima</span>
          </li>
          <li class="flex items-start gap-2">
            <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
            <span>Hubungi <Link href="/contact" class="text-primary-500 hover:underline">customer service</Link> jika ada kendala pembayaran</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
