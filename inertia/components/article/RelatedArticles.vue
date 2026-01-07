<script setup lang="ts">
import type { ArticleListItem } from '~/types/article'
import { CATEGORY_COLORS } from '~/types/article'

defineProps<{
  articles: ArticleListItem[]
}>()
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <a
      v-for="article in articles"
      :key="article.id"
      :href="`/artikel/${article.slug}`"
      class="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden"
    >
      <div class="aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
        <img
          v-if="article.thumbnail"
          :src="article.thumbnail"
          :alt="article.title"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <UIcon name="i-lucide-image" class="w-10 h-10 text-gray-300" />
        </div>
      </div>
      <div class="p-4">
        <UBadge
          :color="CATEGORY_COLORS[article.category] || 'neutral'"
          size="xs"
          class="mb-2"
        >
          {{ article.categoryLabel }}
        </UBadge>
        <h3 class="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary-500 transition-colors">
          {{ article.title }}
        </h3>
        <p class="text-sm text-gray-500 mt-2">
          {{ article.readTime }} menit baca
        </p>
      </div>
    </a>
  </div>
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
