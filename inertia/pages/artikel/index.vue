<script setup lang="ts">
/**
 * Article Index Page
 * Lists all published articles with filtering, search, and pagination
 */
import { Head } from '@inertiajs/vue3'
import { computed } from 'vue'
import { useHead } from '@unhead/vue'
import AppLayout from '~/layouts/default.vue'
import ArticleCard from '~/components/article/ArticleCard.vue'
import ArticleCardSkeleton from '~/components/article/ArticleCardSkeleton.vue'
import ArticleEmptyState from '~/components/article/ArticleEmptyState.vue'
import { useArticleFilters, type ArticleFilters } from '~/composables/use_article_filters'
import type { ArticleListItem, ArticlePagination, CategoryInfo } from '~/types/article'
import { CATEGORY_COLORS } from '~/types/article'

// =============================================================================
// Props & Types
// =============================================================================

interface Props {
  articles: ArticlePagination
  categories: CategoryInfo[]
  featuredArticles: ArticleListItem[]
  popularTags: string[]
  filters: ArticleFilters
}

const props = defineProps<Props>()

// =============================================================================
// Composables
// =============================================================================

const {
  searchQuery,
  selectedCategory,
  selectedTag,
  isLoading,
  hasActiveFilters,
  selectedCategoryLabel,
  clearFilters,
  toggleCategory,
  toggleTag,
  clearSearch,
  goToPage,
} = useArticleFilters({
  initialFilters: props.filters,
  categories: props.categories,
})

// =============================================================================
// Computed
// =============================================================================

const showPagination = computed(() => {
  return props.articles.data.length > 0 && props.articles.meta.lastPage > 1
})

// =============================================================================
// SEO
// =============================================================================

const SITE_URL = 'https://ogitu.com'
const SITE_NAME = 'Ogitu'

const seo = computed(() => ({
  title: selectedCategoryLabel.value
    ? `${selectedCategoryLabel.value} - Blog Vape & Rokok Elektrik | ${SITE_NAME}`
    : `Blog & Artikel Vape - Tips, Review, Panduan | ${SITE_NAME}`,
  description:
    'Baca artikel terbaru seputar dunia vape dan rokok elektrik. Tips perawatan, review produk, panduan pemula, berita industri, dan promo menarik.',
  keywords:
    'artikel vape, blog vape, tips vape, review vape, panduan vaping, berita vape, promo vape, vape indonesia',
}))

useHead({
  title: seo.value.title,
  meta: [
    { name: 'description', content: seo.value.description },
    { name: 'keywords', content: seo.value.keywords },
    { property: 'og:title', content: seo.value.title },
    { property: 'og:description', content: seo.value.description },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: `${SITE_URL}/artikel` },
  ],
})
</script>

<template>
  <Head :title="seo.title" />

  <AppLayout>
    <!-- Hero Section -->
    <section class="relative bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 py-16 lg:py-20">
      <!-- Background Decorations -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-linear-to-l from-primary-500/10 to-transparent" />
        <div class="absolute bottom-0 left-0 w-1/3 h-1/2 bg-linear-to-t from-primary-500/5 to-transparent" />
      </div>

      <div class="container mx-auto px-4 relative">
        <div class="max-w-3xl mx-auto text-center">
          <!-- Badge -->
          <UBadge color="primary" variant="soft" size="lg" class="mb-4">
            <UIcon name="i-lucide-newspaper" class="w-4 h-4 mr-1" />
            Blog & Artikel
          </UBadge>

          <!-- Title -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Artikel Seputar
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary-400 to-primary-600">
              Vape & Rokok Elektrik
            </span>
          </h1>

          <!-- Description -->
          <p class="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Tips, review, panduan, dan berita terbaru dari dunia vaping. Temukan informasi
            yang Anda butuhkan untuk pengalaman vaping terbaik.
          </p>

          <!-- Search Bar -->
          <div class="max-w-xl mx-auto">
            <UInput
              v-model="searchQuery"
              placeholder="Cari artikel..."
              icon="i-lucide-search"
              size="xl"
              :loading="isLoading"
              class="w-full"
              :ui="{
                base: 'bg-white/10 backdrop-blur-sm border-white/20 focus:border-primary-500',
                icon: { trailing: { pointer: '' } },
              }"
            >
              <template #trailing>
                <UButton
                  v-if="searchQuery"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide-x"
                  @click="clearSearch"
                />
              </template>
            </UInput>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Sidebar -->
          <aside class="lg:w-80 shrink-0 space-y-6">
            <!-- Categories Card -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-folder" class="w-5 h-5 text-primary-500" />
                  <h3 class="font-semibold">Kategori</h3>
                </div>
              </template>

              <div class="space-y-2">
                <button
                  v-for="category in categories"
                  :key="category.slug"
                  class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all"
                  :class="[
                    selectedCategory === category.slug
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300',
                  ]"
                  @click="toggleCategory(category.slug)"
                >
                  <span class="flex items-center gap-2">
                    <UBadge :color="CATEGORY_COLORS[category.slug] || 'neutral'" size="xs" />
                    {{ category.label }}
                  </span>
                  <UBadge color="neutral" variant="subtle" size="xs">
                    {{ category.count }}
                  </UBadge>
                </button>
              </div>
            </UCard>

            <!-- Featured Articles Card -->
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

            <!-- Popular Tags Card -->
            <UCard v-if="popularTags.length > 0">
              <template #header>
                <div class="flex items-center gap-2">
                  <UIcon name="i-lucide-tags" class="w-5 h-5 text-primary-500" />
                  <h3 class="font-semibold">Tag Populer</h3>
                </div>
              </template>

              <div class="flex flex-wrap gap-2">
                <UBadge
                  v-for="tag in popularTags.slice(0, 15)"
                  :key="tag"
                  :color="selectedTag === tag ? 'primary' : 'neutral'"
                  :variant="selectedTag === tag ? 'solid' : 'subtle'"
                  class="cursor-pointer hover:scale-105 transition-transform"
                  @click="toggleTag(tag)"
                >
                  #{{ tag }}
                </UBadge>
              </div>
            </UCard>
          </aside>

          <!-- Article List -->
          <div class="flex-1 min-w-0">
            <!-- Active Filters Bar -->
            <div
              v-if="hasActiveFilters"
              class="flex flex-wrap items-center gap-2 mb-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm"
            >
              <span class="text-sm text-gray-500">Filter aktif:</span>

              <UBadge
                v-if="selectedCategory"
                color="primary"
                variant="soft"
                class="cursor-pointer"
                @click="toggleCategory(selectedCategory)"
              >
                {{ selectedCategoryLabel }}
                <UIcon name="i-lucide-x" class="w-3 h-3 ml-1" />
              </UBadge>

              <UBadge
                v-if="selectedTag"
                color="primary"
                variant="soft"
                class="cursor-pointer"
                @click="toggleTag(selectedTag)"
              >
                #{{ selectedTag }}
                <UIcon name="i-lucide-x" class="w-3 h-3 ml-1" />
              </UBadge>

              <UBadge
                v-if="searchQuery"
                color="primary"
                variant="soft"
                class="cursor-pointer"
                @click="clearSearch"
              >
                "{{ searchQuery }}"
                <UIcon name="i-lucide-x" class="w-3 h-3 ml-1" />
              </UBadge>

              <UButton color="neutral" variant="ghost" size="xs" @click="clearFilters">
                Hapus semua
              </UButton>
            </div>

            <!-- Results Count -->
            <div class="flex items-center justify-between mb-6">
              <p class="text-gray-600 dark:text-gray-400">
                Menampilkan
                <span class="font-semibold text-gray-900 dark:text-white">
                  {{ articles.meta.total }}
                </span>
                artikel
              </p>
            </div>

            <!-- Loading State -->
            <div v-if="isLoading" class="grid gap-6 md:grid-cols-2">
              <ArticleCardSkeleton v-for="i in 6" :key="i" />
            </div>

            <!-- Article Grid -->
            <div v-else-if="articles.data.length > 0" class="grid gap-6 md:grid-cols-2">
              <ArticleCard
                v-for="article in articles.data"
                :key="article.id"
                :article="article"
              />
            </div>

            <!-- Empty State -->
            <ArticleEmptyState v-else @clear-filters="clearFilters" />

            <!-- Pagination -->
            <div v-if="showPagination" class="flex justify-center mt-8">
              <UPagination
                :model-value="articles.meta.currentPage"
                :total="articles.meta.total"
                :page-count="articles.meta.perPage"
                :ui="{
                  wrapper: 'flex items-center gap-1',
                  base: 'min-w-[32px] h-8 flex items-center justify-center',
                }"
                @update:model-value="(page: number) => goToPage(page, articles.meta)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter CTA Section -->
    <section class="py-16 bg-linear-to-r from-primary-600 to-primary-700">
      <div class="container mx-auto px-4">
        <div class="max-w-2xl mx-auto text-center">
          <UIcon name="i-lucide-mail" class="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h2 class="text-2xl md:text-3xl font-bold text-white mb-3">
            Dapatkan Update Artikel Terbaru
          </h2>
          <p class="text-white/80 mb-6">
            Berlangganan newsletter kami untuk mendapatkan tips, review, dan promo menarik
            langsung di inbox Anda.
          </p>
          <form class="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" @submit.prevent>
            <UInput
              placeholder="Masukkan email Anda"
              type="email"
              size="lg"
              class="flex-1"
              :ui="{ base: 'bg-white/10 border-white/20 text-white placeholder-white/60' }"
            />
            <UButton color="white" size="lg" type="submit">
              Berlangganan
            </UButton>
          </form>
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
