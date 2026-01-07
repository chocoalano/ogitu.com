<script setup lang="ts">
import type { TOCItem } from '~/types/article'

defineProps<{
  items: TOCItem[]
  activeId: string
}>()

const emit = defineEmits<{
  scrollTo: [id: string]
}>()

const getHeadingClass = (heading: TOCItem, activeId: string) => {
  const baseClass = heading.level === 3 ? 'pl-4' : ''
  const activeClass =
    activeId === heading.id
      ? 'text-primary-500 font-medium'
      : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'

  return `${baseClass} ${activeClass}`.trim()
}
</script>

<template>
  <UCard class="sticky top-24">
    <template #header>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-list" class="w-5 h-5 text-primary-500" />
        <h3 class="font-semibold">Daftar Isi</h3>
      </div>
    </template>

    <nav class="space-y-2">
      <button
        v-for="heading in items"
        :key="heading.id"
        class="block w-full text-left text-sm transition-colors"
        :class="getHeadingClass(heading, activeId)"
        @click="emit('scrollTo', heading.id)"
      >
        {{ heading.text }}
      </button>
    </nav>
  </UCard>
</template>
