<script setup lang="ts">
/**
 * Article Show Page
 * Displays a single article with content, sidebar, and related articles
 */
import { Head } from '@inertiajs/vue3'
import { computed } from 'vue'
import AppLayout from '~/layouts/default.vue'
import BlockRenderer from '~/components/article/BlockRenderer.vue'
import TableOfContents from '~/components/article/TableOfContents.vue'
import PopularArticlesSidebar from '~/components/article/PopularArticlesSidebar.vue'
import CategoriesSidebar from '~/components/article/CategoriesSidebar.vue'
import RelatedArticles from '~/components/article/RelatedArticles.vue'
import SocialShareButtons from '~/components/article/SocialShareButtons.vue'
import { useArticleActions } from '~/composables/use_article_actions'
import { useTableOfContents } from '~/composables/use_table_of_contents'
import { useArticleSeo } from '~/composables/use_article_seo'
import type { ArticleDetail, ArticleListItem, CategoryInfo } from '~/types/article'
import { CATEGORY_COLORS, formatCount } from '~/types/article'

// =============================================================================
// Props
// =============================================================================

interface Props {
  article: ArticleDetail
  relatedArticles: ArticleListItem[]
  popularArticles: ArticleListItem[]
  categories: CategoryInfo[]
}

const props = defineProps<Props>()

// =============================================================================
// Composables
// =============================================================================

const {
  shareUrls,
  shareArticle,
  copyLink,
  isLiked,
  localLikeCount,
  toggleLike,
} = useArticleActions({
  title: props.article.title,
  excerpt: props.article.excerpt,
  slug: props.article.slug,
  initialLikeCount: props.article.likeCount,
})

const { activeHeadingId, scrollToHeading } = useTableOfContents()

const { seo } = useArticleSeo(props.article)

// =============================================================================
// Computed
// =============================================================================

const tableOfContents = computed(() => props.article.tableOfContents || [])
const hasTableOfContents = computed(() => tableOfContents.value.length > 0)
const hasRelatedArticles = computed(() => props.relatedArticles.length > 0)
const hasPopularArticles = computed(() => props.popularArticles.length > 0)
const hasTags = computed(() => props.article.tags.length > 0)
</script>

<template>
  <Head :title="seo.title" />

  <AppLayout>
    <!-- Hero Banner -->
    <section class="relative bg-gray-900">
      <!-- Banner Image -->
      <div
        v-if="article.banner || article.thumbnail"
        class="absolute inset-0 overflow-hidden"
      >
        <img
          :src="article.banner || article.thumbnail || ''"
          :alt="article.title"
          class="w-full h-full object-cover opacity-30"
        />
        <div class="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/80 to-gray-900/60" />
      </div>

      <div class="container mx-auto px-4 relative py-16 lg:py-24">
        <div class="max-w-7xl mx-auto">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm text-gray-400 mb-6">
            <a href="/" class="hover:text-white transition-colors">Beranda</a>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            <a href="/artikel" class="hover:text-white transition-colors">Artikel</a>
            <UIcon name="i-lucide-chevron-right" class="w-4 h-4" />
            <a
              :href="`/artikel/kategori/${article.category}`"
              class="hover:text-white transition-colors"
            >
              {{ article.categoryLabel }}
            </a>
          </nav>

          <!-- Category Badge -->
          <UBadge
            :color="CATEGORY_COLORS[article.category] || 'neutral'"
            size="lg"
            class="mb-4"
          >
            {{ article.categoryLabel }}
          </UBadge>

          <!-- Title -->
          <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {{ article.title }}
          </h1>

          <!-- Meta Info -->
          <div class="flex flex-wrap items-center gap-4 text-gray-400">
            <!-- Author -->
            <div v-if="article.author" class="flex items-center gap-2">
              <UAvatar :src="article.author.avatar" :alt="article.author.fullName" size="sm" />
              <span>{{ article.author.fullName }}</span>
            </div>

            <span class="hidden sm:block">•</span>

            <!-- Date -->
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-calendar" class="w-4 h-4" />
              {{ article.formattedPublishedAt }}
            </span>

            <span class="hidden sm:block">•</span>

            <!-- Read Time -->
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-clock" class="w-4 h-4" />
              {{ article.readTime }} menit baca
            </span>

            <span class="hidden sm:block">•</span>

            <!-- Views -->
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-eye" class="w-4 h-4" />
              {{ formatCount(article.viewCount) }} views
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="py-12 bg-gray-50 dark:bg-gray-900">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- Article Content -->
          <article class="flex-1 min-w-0">
            <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
              <!-- Featured Image (if no banner) -->
              <div
                v-if="article.thumbnail && !article.banner"
                class="aspect-video overflow-hidden"
              >
                <img
                  :src="article.thumbnail"
                  :alt="article.title"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Content -->
              <div class="p-6 lg:p-10">
                <!-- Excerpt -->
                <p
                  v-if="article.excerpt"
                  class="text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-primary-500 pl-4 mb-8"
                >
                  {{ article.excerpt }}
                </p>

                <!-- Article Body -->
                <div class="article-content prose prose-lg dark:prose-invert max-w-none">
                  <BlockRenderer :blocks="article.blocks" />
                </div>

                <!-- Tags -->
                <div v-if="hasTags" class="mt-10 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 class="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3">
                    Tag Artikel:
                  </h4>
                  <div class="flex flex-wrap gap-2">
                    <a
                      v-for="tag in article.tags"
                      :key="tag"
                      :href="`/artikel?tag=${encodeURIComponent(tag)}`"
                      class="inline-block"
                    >
                      <UBadge
                        color="neutral"
                        variant="subtle"
                        class="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        #{{ tag }}
                      </UBadge>
                    </a>
                  </div>
                </div>

                <!-- Actions -->
                <div class="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <!-- Like & Share Buttons -->
                    <div class="flex items-center gap-4">
                      <UButton
                        :color="isLiked ? 'error' : 'neutral'"
                        :variant="isLiked ? 'soft' : 'ghost'"
                        @click="toggleLike"
                      >
                        <UIcon
                          name="i-lucide-heart"
                          :class="[isLiked ? 'text-red-500 fill-current' : '']"
                          class="w-5 h-5 mr-1"
                        />
                        {{ formatCount(localLikeCount) }} Suka
                      </UButton>

                      <UButton color="neutral" variant="ghost" @click="shareArticle">
                        <UIcon name="i-lucide-share-2" class="w-5 h-5 mr-1" />
                        Bagikan
                      </UButton>

                      <UButton color="neutral" variant="ghost" @click="copyLink">
                        <UIcon name="i-lucide-link" class="w-5 h-5 mr-1" />
                        Salin Link
                      </UButton>
                    </div>

                    <!-- Social Share -->
                    <SocialShareButtons :urls="shareUrls" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Author Box -->
            <div
              v-if="article.author"
              class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 lg:p-8"
            >
              <div class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                <UAvatar :src="article.author.avatar" :alt="article.author.fullName" size="xl" />
                <div class="text-center sm:text-left">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ article.author.fullName }}
                  </h3>
                  <p class="text-gray-500 dark:text-gray-400 mt-1">
                    Penulis di Ogitu.com
                  </p>
                  <p class="text-gray-600 dark:text-gray-300 mt-2">
                    Berbagi pengetahuan dan tips seputar vape, rokok elektrik, dan gaya
                    hidup modern.
                  </p>
                </div>
              </div>
            </div>

            <!-- Related Articles -->
            <div v-if="hasRelatedArticles" class="mt-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Artikel Terkait
              </h2>
              <RelatedArticles :articles="relatedArticles" />
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:w-80 shrink-0 space-y-6">
            <!-- Table of Contents -->
            <TableOfContents
              v-if="hasTableOfContents"
              :items="tableOfContents"
              :active-id="activeHeadingId"
              @scroll-to="scrollToHeading"
            />

            <!-- Popular Articles -->
            <PopularArticlesSidebar v-if="hasPopularArticles" :articles="popularArticles" />

            <!-- Categories -->
            <CategoriesSidebar :categories="categories" />

            <!-- Back to Articles -->
            <UButton to="/artikel" color="neutral" variant="soft" block size="lg">
              <UIcon name="i-lucide-arrow-left" class="w-4 h-4 mr-2" />
              Kembali ke Artikel
            </UButton>
          </aside>
        </div>
      </div>
    </section>
  </AppLayout>
</template>

<style scoped>
@reference "../../css/app.css";

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Article content styling */
:deep(.article-content) {
  @apply text-gray-700 dark:text-gray-300;
}

:deep(.article-content h2) {
  @apply text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4;
}

:deep(.article-content h3) {
  @apply text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3;
}

:deep(.article-content h4) {
  @apply text-lg font-semibold text-gray-900 dark:text-white mt-4 mb-2;
}

:deep(.article-content p) {
  @apply mb-4 leading-relaxed;
}

:deep(.article-content ul),
:deep(.article-content ol) {
  @apply mb-4 pl-6;
}

:deep(.article-content ul) {
  @apply list-disc;
}

:deep(.article-content ol) {
  @apply list-decimal;
}

:deep(.article-content li) {
  @apply mb-2;
}

:deep(.article-content strong) {
  @apply font-semibold text-gray-900 dark:text-white;
}

:deep(.article-content a) {
  @apply text-primary-600 dark:text-primary-400 hover:underline;
}

:deep(.article-content blockquote) {
  @apply border-l-4 border-primary-500 pl-4 italic text-gray-600 dark:text-gray-400 my-6;
}

:deep(.article-content table) {
  @apply w-full border-collapse mb-4;
}

:deep(.article-content th),
:deep(.article-content td) {
  @apply border border-gray-200 dark:border-gray-700 px-4 py-2 text-left;
}

:deep(.article-content th) {
  @apply bg-gray-100 dark:bg-gray-800 font-semibold;
}

:deep(.article-content img) {
  @apply rounded-lg my-6 max-w-full h-auto;
}

:deep(.article-content pre) {
  @apply bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-4;
}

:deep(.article-content code) {
  @apply bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm;
}

:deep(.article-content pre code) {
  @apply bg-transparent p-0;
}
</style>
