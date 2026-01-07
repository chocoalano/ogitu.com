<script setup lang="ts">
defineProps<{
  rating: number
  size?: 'xs' | 'sm' | 'md' | 'lg'
}>()

const getSizeClass = (size: string) => {
  switch (size) {
    case 'xs':
      return 'w-3 h-3'
    case 'sm':
      return 'w-4 h-4'
    case 'lg':
      return 'w-6 h-6'
    default:
      return 'w-5 h-5'
  }
}
</script>

<template>
  <div class="flex items-center gap-0.5">
    <UIcon
      v-for="i in 5"
      :key="i"
      :name="i <= rating ? 'i-heroicons-star-solid' : 'i-heroicons-star'"
      :class="[
        getSizeClass(size || 'md'),
        i <= rating ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600',
      ]"
    />
  </div>
</template>
