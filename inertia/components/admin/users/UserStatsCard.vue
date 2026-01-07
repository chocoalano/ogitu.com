<script setup lang="ts">
defineProps<{
  total: number
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-users" class="w-5 h-5 text-violet-500" />
        </div>
        <div>
          <p class="text-sm text-slate-500 dark:text-slate-400">Total Pengguna</p>
          <p class="text-xl font-bold text-slate-900 dark:text-white">{{ total }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
