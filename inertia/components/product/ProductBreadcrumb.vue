<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { BreadcrumbItem } from '~/types/product_detail'

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <nav class="flex items-center gap-2 text-sm overflow-x-auto">
        <template v-for="(item, index) in items" :key="index">
          <Link
            v-if="item.href !== '#'"
            :href="item.href"
            class="text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors whitespace-nowrap"
          >
            {{ item.label }}
          </Link>
          <span v-else class="text-gray-900 dark:text-white font-medium line-clamp-1">
            {{ item.label }}
          </span>
          <UIcon
            v-if="index < items.length - 1"
            name="i-lucide-chevron-right"
            class="w-4 h-4 text-gray-400 shrink-0"
          />
        </template>
      </nav>
    </div>
  </div>
</template>
