<script setup lang="ts">
interface StatItem {
  label: string
  value: number
  color: 'warning' | 'primary' | 'success' | 'neutral'
  icon: string
}

defineProps<{
  stats: StatItem[]
}>()

const getIconBgClass = (color: StatItem['color']) => {
  const classes = {
    warning: 'bg-yellow-100 dark:bg-yellow-900/30',
    primary: 'bg-blue-100 dark:bg-blue-900/30',
    success: 'bg-green-100 dark:bg-green-900/30',
    neutral: 'bg-gray-100 dark:bg-gray-800',
  }
  return classes[color]
}

const getIconClass = (color: StatItem['color']) => {
  const classes = {
    warning: 'text-yellow-600 dark:text-yellow-400',
    primary: 'text-blue-600 dark:text-blue-400',
    success: 'text-green-600 dark:text-green-400',
    neutral: 'text-gray-600 dark:text-gray-400',
  }
  return classes[color]
}
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
    <UCard v-for="stat in stats" :key="stat.label" class="relative overflow-hidden">
      <div class="flex items-center gap-4">
        <div :class="['p-3 rounded-xl', getIconBgClass(stat.color)]">
          <UIcon :name="stat.icon" :class="['w-6 h-6', getIconClass(stat.color)]" />
        </div>
        <div>
          <p class="text-2xl font-bold text-gray-900 dark:text-white">{{ stat.value }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ stat.label }}</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
