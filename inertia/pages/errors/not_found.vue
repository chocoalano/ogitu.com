<script setup lang="ts">
import { computed } from 'vue'
import { router } from '@inertiajs/vue3'

const props = withDefaults(defineProps<{
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
      <p class="text-9xl font-bold text-primary-500">404</p>
      <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        Halaman tidak ditemukan
      </h1>
      <p class="mt-6 text-base leading-7 text-gray-600 dark:text-gray-400">
        Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
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
