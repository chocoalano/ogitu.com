<script setup lang="ts">
import type { Affiliate } from './types'

interface Props {
  open: boolean
  affiliate: Affiliate | null
  selectedCount: number
  placementLevel: number
  isPlacing: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'update:placementLevel', value: number): void
  (e: 'confirm'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

// Handle modal close with proper focus management
const handleOpenChange = (value: boolean) => {
  if (!value) {
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }, 0)
  }
  emit('update:open', value)
}
</script>

<template>
  <UModal
    :open="open"
    title="Tempatkan Customer"
    description="Pilih level untuk menempatkan customer ke tree network"
    @update:open="handleOpenChange"
  >
    <template #content>
      <div class="p-6">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Tempatkan {{ selectedCount }} Customer
        </h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Pilih Level
            </label>
            <div class="flex gap-2">
              <UButton
                v-for="level in [1, 2, 3]"
                :key="level"
                :color="placementLevel === level ? 'primary' : 'neutral'"
                :variant="placementLevel === level ? 'solid' : 'outline'"
                @click="emit('update:placementLevel', level)"
              >
                Level {{ level }}
              </UButton>
            </div>
            <p class="mt-2 text-xs text-slate-500 dark:text-slate-400">
              Level 1: 5% komisi | Level 2: 2% komisi | Level 3: 1% komisi
            </p>
          </div>

          <div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
            <p class="text-sm text-slate-600 dark:text-slate-400">
              <strong>{{ selectedCount }}</strong> customer akan ditempatkan di
              <strong>Level {{ placementLevel }}</strong> pada tree network
              <strong>{{ affiliate?.customerName }}</strong>
            </p>
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <UButton color="neutral" variant="outline" @click="handleOpenChange(false)">
            Batal
          </UButton>
          <UButton color="primary" :loading="isPlacing" @click="emit('confirm')">
            Tempatkan Sekarang
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
