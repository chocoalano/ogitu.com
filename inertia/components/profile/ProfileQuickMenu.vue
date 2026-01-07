<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { ProfileMenuItem } from './types'

defineProps<{
  menuItems: ProfileMenuItem[]
}>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <UIcon name="i-heroicons-squares-2x2" class="w-5 h-5 text-primary-500" />
        Menu Cepat
      </h2>
    </div>

    <div class="p-2">
      <Link
        v-for="item in menuItems"
        :key="item.label"
        :href="item.href"
        class="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
      >
        <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', item.color.replace('text-', 'bg-').replace('500', '500/10')]">
          <UIcon :name="item.icon" :class="['w-5 h-5', item.color]" />
        </div>
        <span class="font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
          {{ item.label }}
        </span>
        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400 ml-auto" />
      </Link>
    </div>
  </div>
</template>
