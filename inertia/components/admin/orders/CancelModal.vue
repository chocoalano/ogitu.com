<script setup lang="ts">
import { ref, watch } from 'vue'
import type { AdminOrder } from '~/types/admin_order'
import { useOrderFormatters } from '~/composables/use_order_formatters'

const open = defineModel<boolean>('open', { required: true })

const props = defineProps<{
  order: AdminOrder | null
  loading?: boolean
}>()

const emit = defineEmits<{
  confirm: [reason: string]
}>()

const { formatCurrency } = useOrderFormatters()

const reason = ref('')

// Reset reason when modal closes
watch(open, (isOpen) => {
  if (!isOpen) {
    reason.value = ''
  }
})

const handleConfirm = () => {
  emit('confirm', reason.value)
}

const handleClose = () => {
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Batalkan Pesanan"
    description="Konfirmasi pembatalan pesanan"
    :ui="{ overlay: 'z-[100]', content: 'z-[100]' }"
  >
    <template #content>
      <UCard class="max-h-[85vh] overflow-y-auto">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Batalkan Pesanan
            </h3>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" @click="handleClose" />
          </div>
        </template>

        <div class="space-y-4">
          <UAlert
            color="warning"
            variant="soft"
            icon="i-heroicons-exclamation-triangle"
            title="Perhatian"
            description="Pembatalan pesanan tidak dapat dibatalkan. Pastikan Anda sudah berkomunikasi dengan pembeli."
          />

          <!-- Order Info -->
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p class="font-medium text-gray-900 dark:text-white">{{ order?.orderNumber }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ order?.customer?.name }} • {{ formatCurrency(order?.total || 0) }}
            </p>
          </div>

          <!-- Reason Input -->
          <UFormField label="Alasan Pembatalan">
            <UTextarea
              v-model="reason"
              placeholder="Masukkan alasan pembatalan (opsional)"
              :rows="3"
              class="w-full"
            />
          </UFormField>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="ghost" @click="handleClose">
              Kembali
            </UButton>
            <UButton color="error" :loading="loading" @click="handleConfirm">
              Ya, Batalkan Pesanan
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
