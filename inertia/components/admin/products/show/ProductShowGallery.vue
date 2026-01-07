<script setup lang="ts">
import type { ProductImage } from '../types'

defineProps<{
  images: ProductImage[]
  productName: string
}>()
</script>

<template>
  <div
    v-if="images && images.length > 0"
    class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
  >
    <h3 class="font-semibold text-slate-900 dark:text-white mb-3">
      Galeri Gambar ({{ images.length }})
    </h3>
    <div class="grid grid-cols-4 sm:grid-cols-6 gap-3">
      <div
        v-for="image in images"
        :key="image.id"
        class="aspect-square rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden relative"
      >
        <img
          :src="image.url"
          :alt="image.alt || productName"
          class="w-full h-full object-cover"
        />
        <div
          v-if="image.isPrimary"
          class="absolute top-1 left-1 px-1.5 py-0.5 bg-violet-500 text-white text-[10px] rounded"
        >
          Utama
        </div>
      </div>
    </div>
  </div>
</template>
