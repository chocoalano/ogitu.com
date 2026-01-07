<script setup lang="ts">
interface Props {
  /** Error message to display */
  message: string
}

defineProps<Props>()
</script>

<template>
  <div
    v-if="message"
    class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
  >
    <div class="flex items-center gap-3">
      <div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
        <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
      </div>
      <span class="text-sm text-red-700 dark:text-red-400">{{ message }}</span>
    </div>
  </div>
</template>
