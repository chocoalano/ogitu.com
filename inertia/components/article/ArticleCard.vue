<script setup lang="ts">
import type { ArticleListItem } from '~/types/article'
import { formatDate, formatCount, CATEGORY_COLORS } from '~/types/article'

defineProps<{
  article: ArticleListItem
}>()
</script>

<template>
  <a
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

      <!-- Category Badge -->
      <UBadge
        :color="CATEGORY_COLORS[article.category] || 'neutral'"
        class="absolute top-3 left-3"
      >
        {{ article.categoryLabel }}
      </UBadge>
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
          <UAvatar
            :src="article.author.avatar"
            :alt="article.author.fullName"
            size="xs"
          />
          <span class="text-xs text-gray-600 dark:text-gray-400">
            {{ article.author.fullName }}
          </span>
        </div>
        <div v-else />

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
</template>
