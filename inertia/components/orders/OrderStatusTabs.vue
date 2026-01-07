<script setup lang="ts">
import type { StatusOption } from '~/types/order'

/**
 * OrderStatusTabs - Horizontal scrollable status filter tabs
 */
const props = defineProps<{
  options: (StatusOption & { icon?: string })[]
  selected: string
  loading?: boolean
}>()

const emit = defineEmits<{
  select: [status: string]
}>()

const handleSelect = (status: string) => {
  if (props.loading) return
  emit('select', status)
}
</script>

<template>
  <div class="relative mb-8">
    <!-- Fade edges for scroll indication -->
    <div
      class="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none sm:hidden"
    />
    <div
      class="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none sm:hidden"
    />

    <!-- Tabs Container -->
    <div
      class="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0"
    >
      <div
        class="flex gap-2 sm:gap-3 min-w-max p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50"
      >
        <button
          v-for="option in options"
          :key="option.value"
          :disabled="loading"
          :class="[
            'relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300',
            'focus:outline-none focus:ring-2 focus:ring-primary-500/50',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            selected === option.value
              ? 'bg-linear-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30 scale-[1.02]'
              : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white',
          ]"
          @click="handleSelect(option.value)"
        >ß
          <!-- Icon -->
          <UIcon
            v-if="option.icon"
            :name="option.icon"
            :class="[
              'w-4 h-4 transition-transform duration-300',
              selected === option.value ? 'scale-110' : '',
            ]"
          />

          <!-- Label -->
          <span>{{ option.label }}</span>

          <!-- Active Indicator Glow -->
          <div
            v-if="selected === option.value"
            class="absolute inset-0 bg-linear-tßo-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-xl -z-10"
          />
        </button>
      </div>
    </div>

    <!-- Loading Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="loading"
        class="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center"
      >
        <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin text-primary-500" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
