<script setup lang="ts">
const props = defineProps<{
  show: boolean
  title: string
  message: string
  loading?: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'confirm'): void
}>()
</script>

<template>
  <UModal :open="show" @close="emit('close')" :ui="{ overlay: 'z-[100]', content: 'z-[100]' }">
    <template #content>
      <UCard class="max-h-[85vh] overflow-y-auto">
        <template #header>
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-full bg-red-100 dark:bg-red-900/30">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ title }}
            </h3>
          </div>
        </template>

        <p class="text-gray-600 dark:text-gray-300">
          {{ message }}
        </p>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="ghost" :disabled="loading" @click="emit('close')">
              Batal
            </UButton>
            <UButton color="error" :loading="loading" @click="emit('confirm')">
              Hapus
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
