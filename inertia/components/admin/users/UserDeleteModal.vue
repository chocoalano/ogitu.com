<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false })

defineProps<{
  userName: string
}>()

const emit = defineEmits<{
  confirm: []
}>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" :ui="{ overlay: 'z-[100]', content: 'z-[100]' }">
    <template #content>
      <div class="p-6 max-h-[85vh] overflow-y-auto">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Hapus Pengguna</h3>
            <p class="text-slate-500 dark:text-slate-400">
              Apakah Anda yakin ingin menghapus <strong>{{ userName }}</strong>?
            </p>
          </div>
        </div>
        <div class="flex justify-end gap-3">
          <UButton color="neutral" variant="outline" @click="handleCancel">
            Batal
          </UButton>
          <UButton color="error" @click="handleConfirm">
            Hapus
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
