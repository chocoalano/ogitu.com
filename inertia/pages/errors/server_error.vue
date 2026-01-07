<script setup lang="ts">
import { computed } from 'vue'
import { router } from '@inertiajs/vue3'

const props = withDefaults(defineProps<{
  error: any
  isAdminAuth?: boolean
}>(), {
  isAdminAuth: false
})

const redirectUrl = computed(() => props.isAdminAuth ? '/admin/dashboard' : '/')

const goHome = () => {
  router.visit(redirectUrl.value)
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
    <div class="text-center">
      <p class="text-9xl font-bold text-red-500">500</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Terjadi Kesalahan
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
        {{ error?.message || 'Terjadi kesalahan pada server. Silakan coba lagi nanti.' }}
      </p>
      <div class="mt-10">
        <UButton
          size="lg"
          icon="i-heroicons-home"
          @click="goHome"
        >
          Kembali ke Beranda
        </UButton>
      </div>
    </div>
  </div>
</template>
