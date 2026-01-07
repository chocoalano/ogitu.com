<script setup lang="ts">
interface LinkItem { label: string; to: string }

const props = defineProps<{ title: string; links: LinkItem[] }>()
</script>

<template>
  <div>
    <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-4">{{ title }}</h4>
    <ul class="space-y-2.5">
      <li v-for="link in links" :key="link.to">
        <a :href="link.to" class="text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors flex items-center gap-1.5">
          <UIcon name="i-heroicons-chevron-right" class="w-3 h-3" />{{ link.label }}
        </a>
      </li>
    </ul>
  </div>
</template>
