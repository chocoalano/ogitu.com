<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
</script>

<template>
  <nav class="flex items-center gap-2 text-sm mb-6">
    <Link href="/" class="text-gray-500 hover:text-primary-500 transition-colors">
      <UIcon name="i-heroicons-home" class="w-4 h-4" />
    </Link>
    <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
    <Link href="/dashboard" class="text-gray-500 hover:text-primary-500 transition-colors">
      Dashboard
    </Link>
    <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
    <span class="text-gray-900 dark:text-white font-medium">Profil</span>
  </nav>
</template>
