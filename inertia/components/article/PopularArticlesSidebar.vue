<script setup lang="ts">
import type { ArticleListItem } from '~/types/article'
import { formatCount } from '~/types/article'

defineProps<{
  articles: ArticleListItem[]
}>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-trending-up" class="w-5 h-5 text-primary-500" />
        <h3 class="font-semibold">Artikel Populer</h3>
      </div>
    </template>

    <div class="space-y-4">
      <a
        v-for="(article, index) in articles.slice(0, 5)"
        :key="article.id"
        :href="`/artikel/${article.slug}`"
        class="group flex gap-3 p-2 -mx-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span
          class="shrink-0 w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center font-bold text-sm"
        >
          {{ index + 1 }}
        </span>
        <div class="flex-1 min-w-0">
          <h4 class="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors">
            {{ article.title }}
          </h4>
          <p class="text-xs text-gray-500 mt-1">
            {{ formatCount(article.viewCount) }} views
          </p>
        </div>
      </a>
    </div>
  </UCard>
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
