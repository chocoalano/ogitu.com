<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'

interface Courier {
  name: string
  logo: string
  services: string[]
  description: string
}

interface Estimation {
  area: string
  regular: string
  express: string
}

interface Step {
  title: string
  description: string
  icon: string
}

const props = defineProps<{
  shippingInfo: {
    couriers: Courier[]
    estimations: Estimation[]
    steps: Step[]
  }
}>()

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Cara Belanja & Pengiriman - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-purple-500 via-indigo-500 to-blue-500 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="shipping-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30 5 L55 20 L55 50 L30 65 L5 50 L5 20 Z" fill="none" stroke="white" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#shipping-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <nav class="flex items-center gap-2 text-sm mb-6 text-white/80">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white font-medium">Cara Belanja</span>
        </nav>

        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <UIcon name="i-heroicons-truck" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Cara Belanja & Pengiriman</h1>
          <p class="text-white/80 max-w-2xl mx-auto">
            Panduan lengkap berbelanja di Ogitu dan informasi pengiriman ke seluruh Indonesia
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- How to Order -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Langkah Berbelanja</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div
            v-for="(step, index) in shippingInfo.steps"
            :key="index"
            class="relative"
          >
            <!-- Connector line -->
            <div
              v-if="index < shippingInfo.steps.length - 1"
              class="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200 dark:bg-gray-700"
            />

            <div class="relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-500/10 flex items-center justify-center relative">
                <UIcon :name="step.icon" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <span class="absolute -top-2 -right-2 w-6 h-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {{ index + 1 }}
                </span>
              </div>
              <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ step.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ step.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Courier Partners -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Partner Ekspedisi</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="courier in shippingInfo.couriers"
            :key="courier.name"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"
          >
            <div class="w-20 h-12 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span class="text-lg font-bold text-gray-600 dark:text-gray-300">{{ courier.name }}</span>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ courier.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">{{ courier.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="service in courier.services"
                :key="service"
                class="px-2 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs rounded-full"
              >
                {{ service }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Delivery Estimation -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Estimasi Pengiriman</h2>

        <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="bg-gray-50 dark:bg-gray-700/50">
                  <th class="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">Wilayah</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Regular</th>
                  <th class="px-6 py-4 text-center text-sm font-semibold text-gray-900 dark:text-white">Express</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                <tr
                  v-for="est in shippingInfo.estimations"
                  :key="est.area"
                  class="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
                >
                  <td class="px-6 py-4 text-sm text-gray-900 dark:text-white">{{ est.area }}</td>
                  <td class="px-6 py-4 text-sm text-center text-gray-600 dark:text-gray-400">{{ est.regular }}</td>
                  <td class="px-6 py-4 text-sm text-center">
                    <span class="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                      {{ est.express }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <p class="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
          * Estimasi dapat berbeda tergantung kondisi dan lokasi spesifik
        </p>
      </div>

      <!-- CTA -->
      <div class="bg-linear-to-r from-primary-500 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">Siap Berbelanja?</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8">
          Temukan berbagai produk vape berkualitas dengan harga terbaik dan pengiriman cepat ke seluruh Indonesia.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Link href="/collections">
            <UButton color="white" size="lg">
              <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 mr-2" />
              Mulai Belanja
            </UButton>
          </Link>
          <Link href="/track">
            <UButton color="white" variant="outline" size="lg">
              <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2" />
              Lacak Pesanan
            </UButton>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
