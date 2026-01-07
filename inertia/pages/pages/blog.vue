<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import AppLayout from '~/layouts/default.vue'

interface Post {
  id: number
  title: string
  excerpt: string
  image: string
  category: string
  author: string
  date: string
  readTime: string
  slug: string
}

const props = defineProps<{
  blogData: {
    featured: Post
    posts: Post[]
    categories: string[]
  }
}>()

const selectedCategory = ref('All')

const filteredPosts = computed(() => {
  if (selectedCategory.value === 'All') {
    return props.blogData.posts
  }
  return props.blogData.posts.filter(post => post.category === selectedCategory.value)
})

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Blog & Artikel - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-violet-500 via-purple-500 to-fuchsia-500 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blog-pattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect x="10" y="10" width="40" height="40" rx="4" fill="none" stroke="white" stroke-width="1" />
              <line x1="15" y1="25" x2="45" y2="25" stroke="white" stroke-width="1" />
              <line x1="15" y1="35" x2="35" y2="35" stroke="white" stroke-width="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blog-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <nav class="flex items-center gap-2 text-sm mb-6 text-white/80">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white font-medium">Blog</span>
        </nav>

        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <UIcon name="i-heroicons-newspaper" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Blog & Artikel</h1>
          <p class="text-white/80 max-w-2xl mx-auto">
            Tips, tutorial, review, dan berita terbaru seputar dunia vaping
          </p>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Featured Post -->
      <div class="mb-12">
        <Link
          :href="`/blog/${blogData.featured.slug}`"
          class="block group bg-white dark:bg-gray-800/80 rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all"
        >
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div class="aspect-video lg:aspect-auto bg-gray-200 dark:bg-gray-700">
              <div class="w-full h-full flex items-center justify-center text-gray-400">
                <UIcon name="i-heroicons-photo" class="w-16 h-16" />
              </div>
            </div>
            <div class="p-6 sm:p-8 flex flex-col justify-center">
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-sm font-medium rounded-full">
                  {{ blogData.featured.category }}
                </span>
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ blogData.featured.readTime }} read
                </span>
              </div>
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary-500 transition-colors">
                {{ blogData.featured.title }}
              </h2>
              <p class="text-gray-600 dark:text-gray-400 mb-6">
                {{ blogData.featured.excerpt }}
              </p>
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                    <UIcon name="i-heroicons-user" class="w-5 h-5 text-gray-400" />
                  </div>
                  <div>
                    <p class="text-sm font-medium text-gray-900 dark:text-white">{{ blogData.featured.author }}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">{{ blogData.featured.date }}</p>
                  </div>
                </div>
                <span class="text-primary-500 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Baca
                  <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      <!-- Category Filter -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="category in blogData.categories"
          :key="category"
          @click="selectedCategory = category"
          :class="[
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            selectedCategory === category
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
          ]"
        >
          {{ category }}
        </button>
      </div>

      <!-- Posts Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <Link
          v-for="post in filteredPosts"
          :key="post.id"
          :href="`/blog/${post.slug}`"
          class="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden hover:shadow-lg transition-all"
        >
          <div class="aspect-video bg-gray-200 dark:bg-gray-700">
            <div class="w-full h-full flex items-center justify-center text-gray-400">
              <UIcon name="i-heroicons-photo" class="w-10 h-10" />
            </div>
          </div>
          <div class="p-5">
            <div class="flex items-center gap-3 mb-3">
              <span class="px-2 py-0.5 bg-primary-500/10 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
                {{ post.category }}
              </span>
              <span class="text-xs text-gray-500 dark:text-gray-400">
                {{ post.readTime }}
              </span>
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors line-clamp-2">
              {{ post.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
              {{ post.excerpt }}
            </p>
            <div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <span>{{ post.author }}</span>
              <span>•</span>
              <span>{{ post.date }}</span>
            </div>
          </div>
        </Link>
      </div>

      <!-- Newsletter CTA -->
      <div class="bg-linear-to-r from-violet-500 to-purple-600 rounded-3xl p-8 sm:p-12 text-center text-white">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4">Dapatkan Update Terbaru</h2>
        <p class="text-white/80 max-w-xl mx-auto mb-8">
          Subscribe newsletter untuk mendapatkan tips vaping, promo eksklusif, dan artikel terbaru langsung ke inbox Anda.
        </p>
        <form class="max-w-md mx-auto flex gap-3">
          <UInput
            type="email"
            placeholder="Email Anda"
            size="lg"
            class="flex-1"
            :ui="{ base: 'bg-white/90' }"
          />
          <UButton color="white" size="lg">
            Subscribe
          </UButton>
        </form>
      </div>
    </div>
  </div>
</template>
