<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import type { WithdrawalRequest } from '~/types/finance'
import { formatCurrency } from '~/types/finance'

interface Props {
  withdrawal: WithdrawalRequest | null
  type: 'approve' | 'reject'
}

const props = defineProps<Props>()

const isOpen = defineModel<boolean>('modelValue', { default: false })
const isProcessing = ref(false)
const notes = ref('')
const reason = ref('')

const handleConfirm = () => {
  if (!props.withdrawal) return

  isProcessing.value = true

  if (props.type === 'approve') {
    router.post(
      `/admin/finance/withdraw/${props.withdrawal.id}/approve`,
      { notes: notes.value },
      {
        onFinish: () => {
          isProcessing.value = false
          isOpen.value = false
          notes.value = ''
        },
      }
    )
  } else {
    router.post(
      `/admin/finance/withdraw/${props.withdrawal.id}/reject`,
      { reason: reason.value || 'Ditolak oleh admin' },
      {
        onFinish: () => {
          isProcessing.value = false
          isOpen.value = false
          reason.value = ''
        },
      }
    )
  }
}

const handleClose = () => {
  isOpen.value = false
  notes.value = ''
  reason.value = ''
}
</script>

<template>
  <UModal v-model:open="isOpen" :ui="{ overlay: 'z-[100]', content: 'z-[100]' }">
    <template #content>
      <UCard class="max-h-[85vh] overflow-y-auto">
        <template #header>
          <div class="flex items-center gap-3">
            <div
              :class="[
                'p-2 rounded-lg',
                type === 'approve'
                  ? 'bg-success-100 dark:bg-success-900/30'
                  : 'bg-error-100 dark:bg-error-900/30',
              ]"
            >
              <UIcon
                :name="type === 'approve' ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                :class="[
                  'w-5 h-5',
                  type === 'approve'
                    ? 'text-success-600 dark:text-success-400'
                    : 'text-error-600 dark:text-error-400',
                ]"
              />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ type === 'approve' ? 'Setujui Permintaan Withdraw' : 'Tolak Permintaan Withdraw' }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ withdrawal?.customerName }}
              </p>
            </div>
          </div>
        </template>

        <div v-if="withdrawal" class="space-y-4">
          <!-- Withdrawal Info -->
          <div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div class="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p class="text-gray-500 dark:text-gray-400">Jumlah</p>
                <p class="font-bold text-lg text-gray-900 dark:text-white">
                  {{ formatCurrency(withdrawal.amount) }}
                </p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400">Bank</p>
                <p class="font-medium text-gray-900 dark:text-white">{{ withdrawal.bankName }}</p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400">Nomor Rekening</p>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ withdrawal.accountNumber }}
                </p>
              </div>
              <div>
                <p class="text-gray-500 dark:text-gray-400">Atas Nama</p>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ withdrawal.accountName }}
                </p>
              </div>
            </div>
          </div>

          <!-- Notes/Reason Input -->
          <UFormField
            :label="type === 'approve' ? 'Catatan (Opsional)' : 'Alasan Penolakan'"
            :required="type === 'reject'"
          >
            <UTextarea
              v-if="type === 'approve'"
              v-model="notes"
              placeholder="Tambahkan catatan jika diperlukan..."
              :rows="3"
            />
            <UTextarea
              v-else
              v-model="reason"
              placeholder="Masukkan alasan penolakan..."
              :rows="3"
            />
          </UFormField>

          <!-- Warning for reject -->
          <div
            v-if="type === 'reject'"
            class="p-3 rounded-lg bg-warning-50 dark:bg-warning-900/20 text-warning-700 dark:text-warning-300 text-sm"
          >
            <div class="flex items-start gap-2">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 shrink-0 mt-0.5" />
              <p>
                Saldo sebesar {{ formatCurrency(withdrawal.amount) }} akan dikembalikan ke wallet
                customer.
              </p>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="ghost" :disabled="isProcessing" @click="handleClose">
              Batal
            </UButton>
            <UButton
              :color="type === 'approve' ? 'success' : 'error'"
              :loading="isProcessing"
              @click="handleConfirm"
            >
              {{ type === 'approve' ? 'Setujui' : 'Tolak' }}
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
