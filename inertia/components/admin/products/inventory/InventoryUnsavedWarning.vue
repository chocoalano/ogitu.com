<script setup lang="ts">
interface Props {
  show: boolean
  changesCount: number
  isSaving: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  (e: 'save'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div v-if="show" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div class="bg-slate-900 dark:bg-slate-700 text-white rounded-xl px-6 py-3 shadow-lg flex items-center gap-4">
          <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-yellow-400" />
          <span class="text-sm">{{ changesCount }} produk memiliki perubahan yang belum disimpan</span>
          <UButton color="primary" size="sm" @click="emit('save')" :loading="isSaving">
            Simpan Sekarang
          </UButton>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
