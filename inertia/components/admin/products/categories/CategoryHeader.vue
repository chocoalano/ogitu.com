<script setup lang="ts">
interface Props {
  storeName: string
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'add'): void
}>()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Kategori Produk</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Kelola kategori produk untuk toko {{ storeName }}
      </p>
    </div>
    <UButton icon="i-heroicons-plus" color="primary" @click="emit('add')">
      Tambah Kategori
    </UButton>
  </div>
</template>
