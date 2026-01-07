<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

defineProps<{
  sidebarOpen: boolean
}>()

defineEmits<{
  toggleSidebar: []
}>()
</script>

<template>
  <!-- Logo Header -->
  <div
    class="flex items-center justify-between p-4 border-b border-slate-700/50"
    :class="sidebarOpen ? 'px-4' : 'px-2'"
  >
    <Transition name="fade" mode="out-in">
      <Link v-if="sidebarOpen" href="/admin/dashboard" class="flex items-center gap-2 group">
        <div
          class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow duration-300"
        >
          <span class="text-white font-bold text-lg">O</span>
        </div>
        <div class="flex flex-col">
          <span
            class="font-bold text-lg bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
          >
            Ogitu
          </span>
          <span class="text-slate-400 text-[10px] -mt-1">Admin Center</span>
        </div>
      </Link>
      <Link v-else href="/admin/dashboard" class="flex justify-center w-full">
        <div
          class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30"
        >
          <span class="text-white font-bold text-lg">O</span>
        </div>
      </Link>
    </Transition>

    <!-- Desktop Toggle Button -->
    <button
      v-if="sidebarOpen"
      class="hidden lg:flex p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all duration-200"
      @click="$emit('toggleSidebar')"
    >
      <UIcon name="i-heroicons-chevron-left" class="w-5 h-5" />
    </button>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
