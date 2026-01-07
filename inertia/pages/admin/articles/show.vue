<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import BlockRenderer from '~/components/article/BlockRenderer.vue'
import type { ArticleShowProps } from '@/types/admin_article'
import { getStatusLabel, getStatusColor, getCategoryColor } from '@/types/admin_article'

defineOptions({ layout: AdminLayout })

const props = defineProps<ArticleShowProps>()

// Format date
function formatDate(date: string | null): string {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Actions
function handleEdit() {
  router.visit(`/admin/articles/${props.article.id}/edit`)
}

function handleDelete() {
  if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${props.article.title}"?`)) return
  router.delete(`/admin/articles/${props.article.id}`)
}

function handleToggleStatus() {
  router.patch(`/admin/articles/${props.article.id}/status`)
}

function openPublicView() {
  window.open(`/artikel/${props.article.slug}`, '_blank')
}
</script>

<template>
  <Head :title="article.title" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div class="flex items-start gap-4">
        <UButton
          icon="i-heroicons-arrow-left"
          color="neutral"
          variant="ghost"
          to="/admin/articles"
        />
        <div>
          <div class="flex flex-wrap items-center gap-2">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ article.title }}
            </h1>
            <UBadge :color="getStatusColor(article.status)" variant="soft">
              {{ getStatusLabel(article.status) }}
            </UBadge>
            <UBadge v-if="article.isFeatured" color="warning" variant="soft">
              Unggulan
            </UBadge>
            <UBadge v-if="article.isPinned" color="info" variant="soft">
              Disematkan
            </UBadge>
          </div>
          <p class="mt-1 text-sm text-gray-500">
            {{ article.slug }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          color="neutral"
          variant="soft"
          icon="i-heroicons-eye"
          @click="openPublicView"
        >
          Lihat Publik
        </UButton>
        <UButton
          :color="article.status === 'published' ? 'warning' : 'success'"
          variant="soft"
          :icon="article.status === 'published' ? 'i-heroicons-archive-box' : 'i-heroicons-paper-airplane'"
          @click="handleToggleStatus"
        >
          {{ article.status === 'published' ? 'Jadikan Draft' : 'Publikasikan' }}
        </UButton>
        <UButton
          color="primary"
          icon="i-heroicons-pencil"
          @click="handleEdit"
        >
          Edit
        </UButton>
        <UButton
          color="error"
          variant="ghost"
          icon="i-heroicons-trash"
          @click="handleDelete"
        />
      </div>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Banner -->
        <UCard v-if="article.banner" class="overflow-hidden p-0">
          <img
            :src="article.banner"
            :alt="article.title"
            class="w-full aspect-video object-cover"
          />
        </UCard>

        <!-- Article Content -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Konten Artikel</h3>
          </template>

          <!-- Excerpt -->
          <div v-if="article.excerpt" class="mb-6 text-lg text-gray-600 dark:text-gray-400 italic border-l-4 border-primary-500 pl-4">
            {{ article.excerpt }}
          </div>

          <!-- Table of Contents -->
          <div v-if="article.tableOfContents?.length > 0" class="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 class="font-semibold mb-3">Daftar Isi</h4>
            <nav>
              <ul class="space-y-1">
                <li
                  v-for="item in article.tableOfContents"
                  :key="item.id"
                  :class="{ 'ml-4': item.level > 2, 'ml-8': item.level > 3 }"
                >
                  <a
                    :href="`#${item.id}`"
                    class="text-sm text-primary-600 hover:underline"
                  >
                    {{ item.text }}
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <!-- Blocks -->
          <div class="prose prose-gray dark:prose-invert max-w-none">
            <BlockRenderer :blocks="article.blocks" />
          </div>
        </UCard>
      </div>

      <!-- Sidebar -->
      <div class="space-y-6">
        <!-- Info Card -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Informasi Artikel</h3>
          </template>
          <div class="space-y-4">
            <!-- Author -->
            <div>
              <p class="text-xs text-gray-500 mb-1">Penulis</p>
              <div v-if="article.author" class="flex items-center gap-2">
                <UAvatar
                  :src="article.author.avatar || undefined"
                  :alt="article.author.fullName"
                  size="sm"
                />
                <div>
                  <p class="font-medium text-sm">{{ article.author.fullName }}</p>
                  <p class="text-xs text-gray-500">{{ article.author.email }}</p>
                </div>
              </div>
              <p v-else class="text-gray-500">-</p>
            </div>

            <!-- Category -->
            <div>
              <p class="text-xs text-gray-500 mb-1">Kategori</p>
              <UBadge :color="getCategoryColor(article.category)" variant="soft">
                {{ article.category }}
              </UBadge>
            </div>

            <!-- Tags -->
            <div>
              <p class="text-xs text-gray-500 mb-1">Tags</p>
              <div v-if="article.tags?.length > 0" class="flex flex-wrap gap-1">
                <UBadge
                  v-for="tag in article.tags"
                  :key="tag"
                  color="neutral"
                  variant="soft"
                  size="xs"
                >
                  {{ tag }}
                </UBadge>
              </div>
              <p v-else class="text-gray-500">-</p>
            </div>

            <!-- Dates -->
            <div>
              <p class="text-xs text-gray-500 mb-1">Dibuat</p>
              <p class="text-sm">{{ formatDate(article.createdAt) }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Terakhir diubah</p>
              <p class="text-sm">{{ formatDate(article.updatedAt) }}</p>
            </div>
            <div v-if="article.publishedAt">
              <p class="text-xs text-gray-500 mb-1">Dipublikasikan</p>
              <p class="text-sm">{{ formatDate(article.publishedAt) }}</p>
            </div>
          </div>
        </UCard>

        <!-- Stats Card -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">Statistik</h3>
          </template>
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <UIcon name="i-heroicons-eye" class="h-5 w-5 mx-auto text-gray-400 mb-1" />
              <p class="text-xl font-bold">{{ article.viewCount.toLocaleString('id-ID') }}</p>
              <p class="text-xs text-gray-500">Views</p>
            </div>
            <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <UIcon name="i-heroicons-heart" class="h-5 w-5 mx-auto text-gray-400 mb-1" />
              <p class="text-xl font-bold">{{ article.likeCount.toLocaleString('id-ID') }}</p>
              <p class="text-xs text-gray-500">Likes</p>
            </div>
            <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <UIcon name="i-heroicons-share" class="h-5 w-5 mx-auto text-gray-400 mb-1" />
              <p class="text-xl font-bold">{{ article.shareCount.toLocaleString('id-ID') }}</p>
              <p class="text-xs text-gray-500">Shares</p>
            </div>
            <div class="text-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <UIcon name="i-heroicons-clock" class="h-5 w-5 mx-auto text-gray-400 mb-1" />
              <p class="text-xl font-bold">{{ article.readTime }}</p>
              <p class="text-xs text-gray-500">Menit baca</p>
            </div>
          </div>
        </UCard>

        <!-- SEO Card -->
        <UCard>
          <template #header>
            <h3 class="font-semibold">SEO</h3>
          </template>
          <div class="space-y-3">
            <div>
              <p class="text-xs text-gray-500 mb-1">Meta Title</p>
              <p class="text-sm">{{ article.metaTitle || article.title }}</p>
            </div>
            <div>
              <p class="text-xs text-gray-500 mb-1">Meta Description</p>
              <p class="text-sm">{{ article.metaDescription || article.excerpt || '-' }}</p>
            </div>
            <div v-if="article.metaKeywords">
              <p class="text-xs text-gray-500 mb-1">Meta Keywords</p>
              <p class="text-sm">{{ article.metaKeywords }}</p>
            </div>
          </div>
        </UCard>

        <!-- Thumbnail Card -->
        <UCard v-if="article.thumbnail">
          <template #header>
            <h3 class="font-semibold">Thumbnail</h3>
          </template>
          <img
            :src="article.thumbnail"
            :alt="article.title"
            class="w-full rounded-lg"
          />
        </UCard>
      </div>
    </div>
  </div>
</template>
