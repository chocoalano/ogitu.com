<script setup lang="ts">
import { Link } from '@inertiajs/vue3'

defineProps<{
  productName: string
  productId: number
}>()

defineEmits<{
  delete: []
}>()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div class="flex items-center gap-4">
      <Link href="/admin/products">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" size="sm" />
      </Link>
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Detail Produk</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {{ productName }}
        </p>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <Link :href="`/admin/products/${productId}/edit`">
        <UButton icon="i-heroicons-pencil" color="primary" variant="outline">
          Edit
        </UButton>
      </Link>
      <UButton
        icon="i-heroicons-trash"
        color="error"
        variant="outline"
        @click="$emit('delete')"
      >
        Hapus
      </UButton>
    </div>
  </div>
</template>
