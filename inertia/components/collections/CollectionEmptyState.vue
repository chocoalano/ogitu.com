<script setup lang="ts">
const emit = defineEmits<{
  reset: []
}>()
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center"
  >
    <div
      class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
    >
      <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-gray-400" />
    </div>
    <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
      Produk Tidak Ditemukan
    </h3>
    <p class="text-gray-500 dark:text-gray-400 mb-6">
      Tidak ada produk yang sesuai dengan filter Anda. Coba ubah atau hapus beberapa filter.
    </p>
    <UButton color="primary" @click="emit('reset')">
      <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
      Reset Filter
    </UButton>
  </div>
</template>
