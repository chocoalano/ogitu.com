<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'

interface Opening {
  id: number
  title: string
  department: string
  location: string
  type: string
  description: string
}

interface Benefit {
  title: string
  icon: string
}

const props = defineProps<{
  careersData: {
    intro: {
      title: string
      description: string
    }
    benefits: Benefit[]
    openings: Opening[]
  }
}>()

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Karir - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-pink-500 via-rose-500 to-red-500 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="careers-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="15" fill="none" stroke="white" stroke-width="1" />
              <circle cx="20" cy="20" r="5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#careers-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <nav class="flex items-center gap-2 text-sm mb-8 text-white/80">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white font-medium">Karir</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">
            {{ careersData.intro.title }}
          </h1>
          <p class="text-xl text-white/80">
            {{ careersData.intro.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Benefits -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Benefit Karyawan</h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div
            v-for="benefit in careersData.benefits"
            :key="benefit.title"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-4 text-center hover:shadow-lg transition-shadow"
          >
            <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-pink-500/10 flex items-center justify-center">
              <UIcon :name="benefit.icon" class="w-6 h-6 text-pink-600 dark:text-pink-400" />
            </div>
            <p class="text-sm font-medium text-gray-900 dark:text-white">{{ benefit.title }}</p>
          </div>
        </div>
      </div>

      <!-- Open Positions -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Lowongan Tersedia</h2>

        <div v-if="careersData.openings.length === 0" class="text-center py-12">
          <div class="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <UIcon name="i-heroicons-briefcase" class="w-10 h-10 text-gray-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Lowongan</h3>
          <p class="text-gray-600 dark:text-gray-400">
            Saat ini belum ada lowongan tersedia. Cek kembali nanti atau kirim CV Anda untuk database kami.
          </p>
        </div>

        <div v-else class="space-y-4">
          <div
            v-for="job in careersData.openings"
            :key="job.id"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"
          >
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ job.title }}
                </h3>
                <div class="flex flex-wrap gap-3 text-sm">
                  <span class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <UIcon name="i-heroicons-building-office-2" class="w-4 h-4" />
                    {{ job.department }}
                  </span>
                  <span class="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
                    {{ job.location }}
                  </span>
                  <span class="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full text-xs">
                    {{ job.type }}
                  </span>
                </div>
                <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {{ job.description }}
                </p>
              </div>
              <div class="shrink-0">
                <UButton color="primary">
                  Lamar
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Why Join Us -->
      <div class="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 sm:p-12 mb-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Kenapa Bergabung dengan Ogitu?</h2>
            <div class="space-y-4 text-gray-600 dark:text-gray-400">
              <p>
                Di Ogitu, kami percaya bahwa karyawan adalah aset terpenting. Kami menciptakan lingkungan kerja yang suportif, kolaboratif, dan penuh kesempatan untuk berkembang.
              </p>
              <ul class="space-y-2">
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Budaya kerja yang terbuka dan inklusif</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Kesempatan untuk belajar dan berkembang</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Work-life balance yang sehat</span>
                </li>
                <li class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Menjadi bagian dari industri yang berkembang</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center">
            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-pink-500/10 flex items-center justify-center">
              <UIcon name="i-heroicons-heart" class="w-12 h-12 text-pink-500" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Kirim CV Anda</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              Tidak menemukan posisi yang cocok? Kirim CV Anda dan kami akan menghubungi jika ada lowongan yang sesuai.
            </p>
            <UButton color="primary" size="lg">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 mr-2" />
              careers@ogitu.com
            </UButton>
          </div>
        </div>
      </div>

      <!-- Life at Ogitu -->
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Life at Ogitu</h2>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            v-for="i in 4"
            :key="i"
            class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center"
          >
            <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-400" />
          </div>
        </div>
        <p class="text-gray-600 dark:text-gray-400 mt-4">
          Ikuti <a href="https://instagram.com/ogitu.id" target="_blank" class="text-primary-500 hover:underline">@ogitu.id</a> untuk melihat keseruan tim kami!
        </p>
      </div>
    </div>
  </div>
</template>
