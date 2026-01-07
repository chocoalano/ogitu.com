<script setup lang="ts">
import type { NotificationStatsProps } from './types'

defineProps<NotificationStatsProps>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
    <!-- Total Notifications -->
    <div
      class="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"
    >
      <div
        class="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-linear-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"
      />
      <div class="relative flex items-center gap-4">
        <div
          class="p-3 bg-linear-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg shadow-blue-500/25"
        >
          <UIcon name="i-heroicons-bell" class="w-6 h-6 text-white" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Total</p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ total }}</p>
        </div>
      </div>
    </div>

    <!-- Unread -->
    <div
      class="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"
    >
      <div
        class="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-linear-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-2xl"
      />
      <div class="relative flex items-center gap-4">
        <div
          class="p-3 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/25"
        >
          <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-white" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Belum Dibaca</p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ unreadCount }}</p>
        </div>
      </div>
    </div>

    <!-- Read -->
    <div
      class="relative overflow-hidden bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5"
    >
      <div
        class="absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 bg-linear-to-br from-emerald-500/10 to-green-500/10 rounded-full blur-2xl"
      />
      <div class="relative flex items-center gap-4">
        <div
          class="p-3 bg-linear-to-br from-emerald-500 to-green-500 rounded-xl shadow-lg shadow-emerald-500/25"
        >
          <UIcon name="i-heroicons-envelope-open" class="w-6 h-6 text-white" />
        </div>
        <div>
          <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Sudah Dibaca</p>
          <p class="text-2xl font-bold text-slate-900 dark:text-white">{{ readCount }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
