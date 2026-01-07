<script setup lang="ts">
interface Props {
  open: boolean
  title: string
  description: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: 'danger' | 'warning'
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}

withDefaults(defineProps<Props>(), {
  confirmLabel: 'Konfirmasi',
  cancelLabel: 'Batal',
  variant: 'danger',
})

const emit = defineEmits<Emits>()

const handleConfirm = () => {
  emit('confirm')
}

const handleCancel = () => {
  emit('update:open', false)
  emit('cancel')
}
</script>

<template>
  <UModal :open="open" @update:open="$emit('update:open', $event)" :ui="{ overlay: 'z-[100]', content: 'z-[100]' }">
    <template #content>
      <div class="p-6 max-h-[85vh] overflow-y-auto">
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center"
            :class="
              variant === 'danger'
                ? 'bg-red-100 dark:bg-red-900/30'
                : 'bg-amber-100 dark:bg-amber-900/30'
            "
          >
            <UIcon
              :name="
                variant === 'danger'
                  ? 'i-heroicons-trash'
                  : 'i-heroicons-exclamation-triangle'
              "
              class="w-6 h-6"
              :class="variant === 'danger' ? 'text-red-500' : 'text-amber-500'"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ title }}
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              {{ description }}
            </p>
          </div>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
          {{ message }}
        </p>
        <div class="flex justify-end gap-3">
          <UButton color="neutral" variant="outline" @click="handleCancel">
            {{ cancelLabel }}
          </UButton>
          <UButton color="error" @click="handleConfirm">
            {{ confirmLabel }}
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
