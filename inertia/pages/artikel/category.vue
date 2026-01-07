<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import AppLayout from '~/layouts/default.vue'

// Types
interface Author {
  id: number
  fullName: string
  avatar: string | null
}

interface Article {
  id: number
  title: string
  slug: string
  excerpt: string | null
  thumbnail: string | null
  category: string
  categoryLabel: string
  tags: string[]
  readTime: number
  viewCount: number
  likeCount: number
  publishedAt: string | null
  author: Author | null
}

interface ArticleCategory {
  slug: string
  name: string
  count: number
  label: string
}

interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  hasMorePages: boolean
  hasPreviousPages: boolean
}

interface PaginatedArticles {
  data: Article[]
  meta: PaginationMeta
}

interface CategoryInfo {
  slug: string
  name: string
}

// Props
const props = defineProps<{
  articles: PaginatedArticles
  category: CategoryInfo
  categories: ArticleCategory[]
  featuredArticles: Article[]
  popularTags: string[]
}>()

// Local state
const isLoading = ref(false)

// Category colors
const categoryColors: Record<string, string> = {
  tips: 'primary',
  review: 'success',
  news: 'info',
  guide: 'warning',
  promo: 'error',
}

// Category descriptions
const categoryDescriptions: Record<string, string> = {
  tips: 'Tips dan trik untuk pengalaman vaping yang lebih baik. Mulai dari perawatan device hingga cara menghemat liquid.',
  review: 'Review lengkap produk vape terbaru. Pod system, mod box, liquid, dan aksesoris dengan penilaian objektif.',
  news: 'Berita terkini dari dunia vape dan rokok elektrik. Regulasi, tren, dan perkembangan industri.',
  guide: 'Panduan lengkap untuk pemula hingga expert. Mulai dari dasar vaping hingga teknik lanjutan.',
  promo: 'Informasi promo, diskon, dan penawaran menarik. Jangan lewatkan kesempatan hemat belanja!',
}

// Category icons
const categoryIcons: Record<string, string> = {
  tips: 'i-lucide-lightbulb',
  review: 'i-lucide-star',
  news: 'i-lucide-newspaper',
  guide: 'i-lucide-book-open',
  promo: 'i-lucide-percent',
}

// Pagination
const goToPage = (page: number) => {
  if (page < 1 || page > props.articles.meta.lastPage) return

  isLoading.value = true
  router.get(
    `/artikel/kategori/${props.category.slug}`,
    { page },
    {
      preserveState: true,
      preserveScroll: false,
      onFinish: () => {
        isLoading.value = false
      },
    }
  )
}

// Format date
const formatDate = (dateString: string | null): string => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Format count
const formatCount = (count: number): string => {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}

// SEO
const siteUrl = 'https://ogitu.com'
const siteName = 'Ogitu'

const seo = computed(() => ({
  title: `${props.category.name} - Artikel Vape & Rokok Elektrik | ${siteName}`,
  description:
    categoryDescriptions[props.category.slug] ||
    `Baca artikel ${props.category.name} seputar vape dan rokok elektrik di blog Ogitu.`,
  keywords: `${props.category.name.toLowerCase()}, artikel vape, blog vape, ${props.category.slug}, vape indonesia`,
}))

useHead({
  title: seo.value.title,
  meta: [
    { name: 'description', content: seo.value.description },
    { name: 'keywords', content: seo.value.keywords },
    { property: 'og:title', content: seo.value.title },
    { property: 'og:description', content: seo.value.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${siteUrl}/artikel/kategori/${props.category.slug}` },
  ],
})
</script>

<template>
  <Head :title="seo.title" />

  <AppLayout>
    <!-- Hero Section -->
    <section class="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-20">
      <div class="absolute inset-0 overflow-hidden">
        <div
          class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-500/10 to-transparent"
        />
      </div>

      <div class="container mx-auto px-4 relative">
        <div class="max-w-3xl mx-auto text-center">
          <!-- Breadcrumb -->
          <nav class="flex items-center justify-center gap-2 text-sm text-gray-400 mb-6">
            <a href="/" class="hover:text-white transition-colors">Beranda</a>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            <a href="/artikel" class="hover:text-white transition-colors">Artikel</a>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            <span class="text-white">{{ category.name }}</span>
          </nav>

          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary-500/20 flex items-center justify-center">
            <UIcon
              :name="categoryIcons[category.slug] || 'i-lucide-folder'"
              class="w-8 h-8 text-primary-400"
            />
          </div>

          <UBadge :color="categoryColors[category.slug] || 'neutral'" size="lg" class="mb-4">
            {{ articles.meta.total }} Artikel
          </UBadge>

          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {{ category.name }}
          </h1>

          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            {{ categoryDescriptions[category.slug] || `Artikel seputar ${category.name}` }}
          </p>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar -->
          <aside class="lg:w-80 shrink-0 space-y-6 lg:order-2">
            <!-- Categories -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-folder" class="w-5 h-5 text-primary-500" />
                  <h3 class="font-semibold">Kategori Lain</h3>
                </div>
              </template>

              <div class="space-y-2">
                <a
                  v-for="cat in categories.filter((c) => c.slug !== category.slug)"
                  :key="cat.slug"
                  :href="`/artikel/kategori/${cat.slug}`"
                  class="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <span class="flex items-center gap-2">
                    <UBadge :color="categoryColors[cat.slug] || 'neutral'" size="xs" />
                    {{ cat.label }}
                  </span>
                  <UBadge color="neutral" variant="subtle" size="xs">
                    {{ cat.count }}
                  </UBadge>
                </a>
              </div>
            </UCard>

            <!-- Featured Articles -->
            <UCard v-if="featuredArticles.length > 0">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-star" class="w-5 h-5 text-yellow-500" />
                  <h3 class="font-semibold">Artikel Pilihan</h3>
                </div>
              </template>

              <div class="space-y-4">
                <a
                  v-for="article in featuredArticles.slice(0, 4)"
                  :key="article.id"
                  :href="`/artikel/${article.slug}`"
                  class="group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div class="shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      v-if="article.thumbnail"
                      :src="article.thumbnail"
                      :alt="article.title"
                      class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div v-else class="w-full h-full flex items-center justify-center">
                      <UIcon name="i-lucide-image" class="w-6 h-6 text-gray-400" />
                    </div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors">
                      {{ article.title }}
                    </h4>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ article.readTime }} menit baca
                    </p>
                  </div>
                </a>
              </div>
            </UCard>

            <!-- Popular Tags -->
            <UCard v-if="popularTags.length > 0">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-tags" class="w-5 h-5 text-primary-500" />
                  <h3 class="font-semibold">Tag Populer</h3>
                </div>
              </template>

              <div class="flex flex-wrap gap-2">
                <a
                  v-for="tag in popularTags.slice(0, 15)"
                  :key="tag"
                  :href="`/artikel?tag=${encodeURIComponent(tag)}`"
                >
                  <UBadge color="neutral" variant="subtle" class="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    #{{ tag }}
                  </UBadge>
                </a>
              </div>
            </UCard>

            <!-- Back to All -->
            <UButton to="/artikel" color="neutral" variant="soft" block size="lg">
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
              Semua Artikel
            </UButton>
          </aside>

          <!-- Article List -->
          <div class="flex-1 min-w-0 lg:order-1">
            <!-- Loading State -->
            <div v-if="isLoading" class="grid gap-6 md:grid-cols-2">
              <div v-for="i in 6" :key="i" class="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                <div class="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg mb-4" />
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-3" />
                <div class="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
                <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
              </div>
            </div>

            <!-- Article Grid -->
            <div v-else-if="articles.data.length > 0" class="grid gap-6 md:grid-cols-2">
              <a
                v-for="article in articles.data"
                :key="article.id"
                :href="`/artikel/${article.slug}`"
                class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <!-- Thumbnail -->
                <div class="aspect-video relative overflow-hidden bg-gray-100 dark:bg-gray-700">
                  <img
                    v-if="article.thumbnail"
                    :src="article.thumbnail"
                    :alt="article.title"
                    class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <UIcon name="i-lucide-image" class="w-12 h-12 text-gray-300 dark:text-gray-600" />
                  </div>
                </div>

                <!-- Content -->
                <div class="p-5">
                  <!-- Meta -->
                  <div class="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span class="flex items-center gap-1">
                      <UIcon name="i-lucide-calendar" class="w-3.5 h-3.5" />
                      {{ formatDate(article.publishedAt) }}
                    </span>
                    <span class="flex items-center gap-1">
                      <UIcon name="i-lucide-clock" class="w-3.5 h-3.5" />
                      {{ article.readTime }} min
                    </span>
                  </div>

                  <!-- Title -->
                  <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary-500 transition-colors">
                    {{ article.title }}
                  </h2>

                  <!-- Excerpt -->
                  <p
                    v-if="article.excerpt"
                    class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4"
                  >
                    {{ article.excerpt }}
                  </p>

                  <!-- Footer -->
                  <div class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <!-- Author -->
                    <div v-if="article.author" class="flex items-center gap-2">
                      <UAvatar :src="article.author.avatar" :alt="article.author.fullName" size="xs" />
                      <span class="text-xs text-gray-600 dark:text-gray-400">
                        {{ article.author.fullName }}
                      </span>
                    </div>

                    <!-- Stats -->
                    <div class="flex items-center gap-3 text-xs text-gray-500">
                      <span class="flex items-center gap-1">
                        <UIcon name="i-lucide-eye" class="w-3.5 h-3.5" />
                        {{ formatCount(article.viewCount) }}
                      </span>
                      <span class="flex items-center gap-1">
                        <UIcon name="i-lucide-heart" class="w-3.5 h-3.5" />
                        {{ formatCount(article.likeCount) }}
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>

            <!-- Empty State -->
            <div v-else class="text-center py-16 bg-white dark:bg-gray-800 rounded-xl">
              <div class="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <UIcon name="i-lucide-file-search" class="w-12 h-12 text-gray-400" />
              </div>
              <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Belum Ada Artikel
              </h3>
              <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                Belum ada artikel dalam kategori {{ category.name }}. Coba lihat kategori
                lainnya.
              </p>
              <UButton color="primary" to="/artikel">Lihat Semua Artikel</UButton>
            </div>

            <!-- Pagination -->
            <div
              v-if="articles.data.length > 0 && articles.meta.lastPage > 1"
              class="flex justify-center mt-8"
            >
              <UPagination
                :model-value="articles.meta.currentPage"
                :total="articles.meta.total"
                :page-count="articles.meta.perPage"
                @update:model-value="goToPage"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
