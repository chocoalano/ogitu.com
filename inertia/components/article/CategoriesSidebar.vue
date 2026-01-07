<script setup lang="ts">
import type { CategoryInfo } from '~/types/article'
import { CATEGORY_COLORS } from '~/types/article'

defineProps<{
  categories: CategoryInfo[]
}>()
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-folder" class="w-5 h-5 text-primary-500" />
        <h3 class="font-semibold">Kategori</h3>
      </div>
    </template>

    <div class="space-y-2">
      <a
        v-for="category in categories"
        :key="category.slug"
        :href="`/artikel/kategori/${category.slug}`"
        class="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <span class="flex items-center gap-2">
          <UBadge :color="CATEGORY_COLORS[category.slug] || 'neutral'" size="xs" />
          {{ category.label }}
        </span>
        <UBadge color="neutral" variant="subtle" size="xs">
          {{ category.count }}
        </UBadge>
      </a>
    </div>
  </UCard>
</template>
