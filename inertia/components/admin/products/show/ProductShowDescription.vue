<script setup lang="ts">
defineProps<{
  description: string | null
}>()
</script>

<template>
  <div
    v-if="description"
    class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
  >
    <h3 class="font-semibold text-slate-900 dark:text-white mb-3">Deskripsi</h3>
    <div class="prose prose-slate dark:prose-invert max-w-none text-sm">
      <p class="whitespace-pre-wrap">{{ description }}</p>
    </div>
  </div>
</template>
