<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

defineProps<{
  sidebarOpen: boolean
}>()

defineEmits<{
  logout: []
}>()
</script>

<template>
  <!-- Sidebar Bottom Actions -->
  <div class="border-t border-slate-700/50 p-3" :class="sidebarOpen ? '' : 'flex flex-col items-center gap-2'">
    <!-- Back to Store -->
    <Link
      href="/"
      class="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200"
      :class="sidebarOpen ? '' : 'justify-center p-2.5'"
    >
      <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-slate-400" />
      <span v-if="sidebarOpen">Kembali ke Toko</span>
    </Link>

    <!-- Logout -->
    <button
      class="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"
      :class="sidebarOpen ? '' : 'justify-center p-2.5'"
      @click="$emit('logout')"
    >
      <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5" />
      <span v-if="sidebarOpen">Logout</span>
    </button>
  </div>
</template>
