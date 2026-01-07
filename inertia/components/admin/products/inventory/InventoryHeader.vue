<script setup lang="ts">
interface Props {
  storeName: string
  editMode: boolean
  isSaving: boolean
  hasChanges: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-edit'): void
  (e: 'save'): void
  (e: 'cancel'): void
}>()
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Manajemen Stok</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Kelola stok produk dan varian toko {{ storeName }}
      </p>
    </div>
    <div class="flex items-center gap-3">
      <template v-if="editMode">
        <UButton color="neutral" variant="outline" @click="emit('cancel')" :disabled="isSaving">
          Batal
        </UButton>
        <UButton color="primary" @click="emit('save')" :loading="isSaving" :disabled="!hasChanges">
          <UIcon name="i-heroicons-check" class="w-4 h-4 mr-1" />
          Simpan Perubahan
        </UButton>
      </template>
      <template v-else>
        <UButton color="primary" @click="emit('toggle-edit')">
          <UIcon name="i-heroicons-pencil-square" class="w-4 h-4 mr-1" />
          Edit Stok
        </UButton>
      </template>
    </div>
  </div>
</template>
