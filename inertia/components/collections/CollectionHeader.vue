<script setup lang="ts">
import type { Category } from '~/types/product'

defineProps<{
  activeCategory: Category | null
}>()
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <UContainer class="py-6 lg:py-8">
      <div class="flex flex-col gap-4">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm">
          <ULink to="/" class="text-gray-500 dark:text-gray-400 hover:text-primary-500">
            Beranda
          </ULink>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
          <span class="text-gray-900 dark:text-white font-medium">
            {{ activeCategory ? activeCategory.name : 'Semua Produk' }}
          </span>
        </nav>

        <!-- Title & Description -->
        <div>
          <h1 class="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
            {{ activeCategory ? activeCategory.name : 'Koleksi Produk' }}
          </h1>
          <p class="mt-1 text-gray-600 dark:text-gray-400">
            {{ activeCategory?.description || 'Temukan berbagai produk vape berkualitas' }}
          </p>
        </div>

        <!-- Mobile Search Slot -->
        <slot name="mobile-search" />
      </div>
    </UContainer>
  </div>
</template>
