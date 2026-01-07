<script setup lang="ts">
import type { NewAffiliateCustomer } from './types'

interface Props {
  open: boolean
  searchQuery: string
  customers: NewAffiliateCustomer[]
  selectedCustomerId: number | null
  isSearching: boolean
  isCreating: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedCustomerId', value: number | null): void
  (e: 'confirm'): void
  (e: 'close'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

// Handle modal close with proper focus management
const handleClose = () => {
  setTimeout(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur()
    }
  }, 0)
  emit('close')
}

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
    title="Buat Akun Affiliate"
    description="Cari dan pilih customer untuk membuat akun affiliate baru"
    @update:open="handleOpenChange"
  >
    <template #content>
      <div class="p-6">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Buat Akun Affiliate Baru
        </h3>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Cari Customer
            </label>
            <UInput
              :model-value="searchQuery"
              placeholder="Ketik nama atau email customer..."
              icon="i-heroicons-magnifying-glass"
              class="w-full"
              @update:model-value="emit('update:searchQuery', $event)"
            />
          </div>

          <div v-if="isSearching" class="flex justify-center py-4">
            <UIcon name="i-heroicons-arrow-path" class="w-6 h-6 text-violet-500 animate-spin" />
          </div>

          <div v-else-if="customers.length > 0" class="space-y-2 max-h-50 overflow-y-auto">
            <div
              v-for="customer in customers"
              :key="customer.id"
              class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
              :class="
                selectedCustomerId === customer.id
                  ? 'bg-violet-100 dark:bg-violet-500/20'
                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700'
              "
              @click="emit('update:selectedCustomerId', customer.id)"
            >
              <div class="flex items-center gap-3">
                <div
                  class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden"
                >
                  <img
                    v-if="customer.avatar"
                    :src="customer.avatar"
                    :alt="customer.fullName"
                    class="w-full h-full object-cover"
                  />
                  <UIcon v-else name="i-heroicons-user" class="w-4 h-4 text-slate-500" />
                </div>
                <div>
                  <p class="font-medium text-slate-900 dark:text-white text-sm">
                    {{ customer.fullName }}
                  </p>
                  <p class="text-xs text-slate-500 dark:text-slate-400">{{ customer.email }}</p>
                </div>
              </div>
              <UIcon
                v-if="selectedCustomerId === customer.id"
                name="i-heroicons-check-circle"
                class="w-5 h-5 text-violet-500"
              />
            </div>
          </div>

          <div
            v-else-if="searchQuery.length >= 2"
            class="py-4 text-center text-slate-500 dark:text-slate-400"
          >
            Tidak ada customer ditemukan
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-6">
          <UButton color="neutral" variant="outline" @click="handleClose"> Batal </UButton>
          <UButton
            color="primary"
            :loading="isCreating"
            :disabled="!selectedCustomerId"
            @click="emit('confirm')"
          >
            Buat Affiliate
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
