<script setup lang="ts">
import type { Category } from './types'

interface Props {
  open: boolean
  category: Category | null
  isDeleting: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
}>()

const closeModal = () => {
  emit('update:open', false)
}
</script>

<template>
  <UModal
    :open="open"
    @update:open="closeModal"
    title="Hapus Kategori"
    description="Konfirmasi penghapusan kategori"
  >
    <template #content>
      <div class="p-6">
        <!-- Header -->
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <UIcon name="i-heroicons-trash" class="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Hapus Kategori</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Tindakan ini tidak dapat dibatalkan
            </p>
          </div>
        </div>

        <!-- Content -->
        <div v-if="category" class="mb-6">
          <p class="text-slate-600 dark:text-slate-400">
            Apakah Anda yakin ingin menghapus kategori <strong class="text-slate-900 dark:text-white">"{{ category.name }}"</strong>?
          </p>

          <div v-if="category.children && category.children.length > 0" class="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <div class="flex items-start gap-2">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <p class="text-sm font-medium text-amber-800 dark:text-amber-200">
                  Kategori ini memiliki {{ category.children.length }} sub-kategori
                </p>
                <p class="text-xs text-amber-600 dark:text-amber-400 mt-1">
                  Hapus semua sub-kategori terlebih dahulu sebelum menghapus kategori ini
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3">
          <UButton
            color="neutral"
            variant="outline"
            @click="closeModal"
            :disabled="isDeleting"
          >
            Batal
          </UButton>
          <UButton
            color="error"
            @click="emit('confirm')"
            :loading="isDeleting"
            :disabled="category?.children && category.children.length > 0"
          >
            Hapus Kategori
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
