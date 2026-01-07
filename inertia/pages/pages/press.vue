<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'

interface Release {
  id: number
  title: string
  date: string
  excerpt: string
  image: string
}

interface Coverage {
  outlet: string
  title: string
  logo: string
}

const props = defineProps<{
  pressData: {
    intro: {
      title: string
      description: string
      contact: {
        email: string
        phone: string
      }
    }
    releases: Release[]
    mediaKit: {
      description: string
      files: Array<{ name: string; size: string; format: string }>
    }
    coverage: Coverage[]
  }
}>()

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Press & Media - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-gray-800 via-gray-900 to-black overflow-hidden">
      <div class="absolute inset-0 opacity-20">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="press-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="40" x2="80" y2="40" stroke="white" stroke-width="0.5" />
              <line x1="40" y1="0" x2="40" y2="80" stroke="white" stroke-width="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#press-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <nav class="flex items-center gap-2 text-sm mb-8 text-white/60">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white/80 font-medium">Press</span>
        </nav>

        <div class="max-w-3xl">
          <h1 class="text-4xl sm:text-5xl font-bold text-white mb-6">
            {{ pressData.intro.title }}
          </h1>
          <p class="text-xl text-gray-300 mb-8">
            {{ pressData.intro.description }}
          </p>
          <div class="flex flex-wrap gap-4">
            <a :href="`mailto:${pressData.intro.contact.email}`">
              <UButton color="white" size="lg">
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 mr-2" />
                {{ pressData.intro.contact.email }}
              </UButton>
            </a>
            <a :href="`tel:${pressData.intro.contact.phone}`">
              <UButton color="white" variant="outline" size="lg">
                <UIcon name="i-heroicons-phone" class="w-5 h-5 mr-2" />
                {{ pressData.intro.contact.phone }}
              </UButton>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <!-- Press Releases -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Press Release</h2>

        <div class="space-y-6">
          <div
            v-for="release in pressData.releases"
            :key="release.id"
            class="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all"
          >
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-0">
              <div class="aspect-video sm:aspect-square bg-gray-200 dark:bg-gray-700">
                <div class="w-full h-full flex items-center justify-center text-gray-400">
                  <UIcon name="i-heroicons-photo" class="w-12 h-12" />
                </div>
              </div>
              <div class="sm:col-span-3 p-6 flex flex-col justify-center">
                <span class="text-sm text-gray-500 dark:text-gray-400 mb-2">{{ release.date }}</span>
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-primary-500 transition-colors">
                  {{ release.title }}
                </h3>
                <p class="text-gray-600 dark:text-gray-400 mb-4">
                  {{ release.excerpt }}
                </p>
                <div>
                  <UButton color="primary" variant="soft" size="sm">
                    Baca Selengkapnya
                    <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1" />
                  </UButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Media Coverage -->
      <div class="mb-16">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-8">Media Coverage</h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div
            v-for="item in pressData.coverage"
            :key="item.outlet"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 hover:shadow-lg transition-shadow"
          >
            <div class="w-full h-12 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <span class="font-bold text-gray-500 dark:text-gray-400">{{ item.outlet }}</span>
            </div>
            <p class="text-gray-900 dark:text-white font-medium">
              "{{ item.title }}"
            </p>
          </div>
        </div>
      </div>

      <!-- Media Kit -->
      <div class="bg-gray-100 dark:bg-gray-800 rounded-3xl p-8 sm:p-12">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Media Kit</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              {{ pressData.mediaKit.description }}
            </p>
            <div class="space-y-3">
              <div
                v-for="file in pressData.mediaKit.files"
                :key="file.name"
                class="flex items-center justify-between p-4 bg-white dark:bg-gray-700 rounded-xl"
              >
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                    <UIcon
                      :name="file.format === 'PDF' ? 'i-heroicons-document-text' : 'i-heroicons-folder'"
                      class="w-5 h-5 text-primary-600 dark:text-primary-400"
                    />
                  </div>
                  <div>
                    <p class="font-medium text-gray-900 dark:text-white">{{ file.name }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ file.format }} • {{ file.size }}</p>
                  </div>
                </div>
                <UButton color="primary" variant="ghost" size="sm">
                  <UIcon name="i-heroicons-arrow-down-tray" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
          <div class="text-center lg:text-left">
            <div class="inline-block p-8 bg-white dark:bg-gray-700 rounded-3xl">
              <div class="text-6xl font-bold text-primary-500 mb-4">O</div>
              <p class="text-gray-600 dark:text-gray-400 text-sm">
                Download logo dan asset brand Ogitu dalam berbagai format
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Contact CTA -->
      <div class="mt-16 text-center">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">Pertanyaan Media?</h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-xl mx-auto mb-8">
          Tim PR kami siap membantu untuk interview, kolaborasi, atau kebutuhan media lainnya.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a :href="`mailto:${pressData.intro.contact.email}`">
            <UButton color="primary" size="lg">
              <UIcon name="i-heroicons-envelope" class="w-5 h-5 mr-2" />
              Hubungi PR Team
            </UButton>
          </a>
          <Link href="/contact">
            <UButton color="gray" variant="outline" size="lg">
              <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5 mr-2" />
              Kontak Lainnya
            </UButton>
          </Link>
        </div>
      </div>
    </div>
  </div>
</template>
