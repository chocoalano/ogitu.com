<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'

interface Stat {
  label: string
  value: string
  icon: string
}

interface Value {
  title: string
  description: string
  icon: string
}

interface Milestone {
  year: string
  event: string
}

interface TeamMember {
  name: string
  role: string
  image: string
}

const props = defineProps<{
  aboutData: {
    company: {
      name: string
      tagline: string
      founded: string
      description: string
    }
    stats: Stat[]
    values: Value[]
    milestones: Milestone[]
    team: TeamMember[]
  }
}>()

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Tentang Kami - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-[url('/images/hero-pattern.svg')] bg-center" />
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <nav class="flex items-center gap-2 text-sm mb-8 text-white/60">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white/80 font-medium">Tentang Kami</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-4">
            {{ aboutData.company.name }}
          </h1>
          <p class="text-xl text-primary-400 font-medium mb-6">{{ aboutData.company.tagline }}</p>
          <p class="text-gray-300 text-lg leading-relaxed">
            {{ aboutData.company.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Stats Section -->
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div
          v-for="stat in aboutData.stats"
          :key="stat.label"
          class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow"
        >
          <div class="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary-500/10 flex items-center justify-center">
            <UIcon :name="stat.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {{ stat.value }}
          </div>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Our Values -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Mengapa Pilih Ogitu?</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="value in aboutData.values"
            :key="value.title"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"
          >
            <div class="w-14 h-14 mb-4 rounded-2xl bg-linear-to-br from-primary-500 to-indigo-600 flex items-center justify-center">
              <UIcon :name="value.icon" class="w-7 h-7 text-white" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">{{ value.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ value.description }}</p>
          </div>
        </div>
      </div>

      <!-- Our Journey -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Perjalanan Kami</h2>

        <div class="relative">
          <!-- Timeline line -->
          <div class="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200 dark:bg-gray-700 hidden sm:block" />

          <div class="space-y-8">
            <div
              v-for="(milestone, index) in aboutData.milestones"
              :key="milestone.year"
              :class="[
                'relative sm:w-1/2',
                index % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12 sm:ml-auto'
              ]"
            >
              <!-- Dot -->
              <div
                :class="[
                  'hidden sm:flex absolute top-2 w-5 h-5 bg-primary-500 rounded-full border-4 border-white dark:border-gray-900',
                  index % 2 === 0 ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'
                ]"
              />

              <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6">
                <span class="inline-block px-3 py-1 bg-primary-500 text-white text-sm font-bold rounded-full mb-2">
                  {{ milestone.year }}
                </span>
                <p class="text-gray-700 dark:text-gray-300">{{ milestone.event }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Team Section -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">Tim Kami</h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div
            v-for="member in aboutData.team"
            :key="member.name"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div class="w-24 h-24 mx-auto mb-4 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UIcon name="i-heroicons-user" class="w-12 h-12 text-gray-400" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white">{{ member.name }}</h3>
            <p class="text-sm text-primary-600 dark:text-primary-400">{{ member.role }}</p>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="bg-linear-to-r from-primary-500 to-indigo-600 rounded-3xl p-8 sm:p-12 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">Bergabung Bersama Kami</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8">
          Jadilah bagian dari komunitas vapers terbesar di Indonesia. Daftar sekarang dan nikmati berbagai benefit eksklusif.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <Link href="/register">
            <UButton color="white" size="lg">
              <UIcon name="i-heroicons-user-plus" class="w-5 h-5 mr-2" />
              Daftar Sekarang
            </UButton>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
