<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { PropType } from 'vue'

const props = defineProps({
  categories: { type: Array as PropType<NavigationMenuItem[]>, required: true },
  quickLinks: { type: Array as PropType<NavigationMenuItem[]>, required: true }
})
</script>

<template>
  <div class="hidden lg:block bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <UContainer>
      <div class="flex items-center justify-between h-12">
        <!-- Categories -->
        <div class="flex items-center gap-1">
          <UButton v-for="category in categories.slice(0, 6)" :key="category.label" :to="category.to" color="neutral" variant="ghost" size="sm" :icon="category.icon">
            {{ category.label }}
          </UButton>
        </div>
        <!-- Quick Links -->
        <div class="flex items-center gap-1">
          <UButton v-for="link in quickLinks" :key="link.label" :to="link.to" color="neutral" variant="ghost" size="sm" :icon="link.icon">
            <template v-if="link.badge">
              <span>{{ link.label }}</span>
              <UBadge v-if="typeof link.badge === 'object'" v-bind="link.badge" size="xs" />
            </template>
            <template v-else>
              {{ link.label }}
            </template>
          </UButton>
        </div>
      </div>
    </UContainer>
  </div>
</template>
