<script setup lang="ts">
import type { Affiliate } from './types'

interface CustomerSearchResult {
  id: number
  fullName: string
  email: string
  avatar: string | null
  phone: string | null
  totalOrdersCount: number
  totalSpent: number
  isInTree: boolean
  hasAffiliate: boolean
}

interface Props {
  open: boolean
  affiliate: Affiliate | null
  searchQuery: string
  customers: CustomerSearchResult[]
  selectedCustomerId: number | null
  selectedLevel: number
  isSearching: boolean
  isAdding: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'update:searchQuery', value: string): void
  (e: 'update:selectedCustomerId', value: number | null): void
  (e: 'update:selectedLevel', value: number): void
  (e: 'confirm'): void
  (e: 'close'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

const levelOptions = [
  { label: 'Level 1 (Langsung)', value: 1 },
  { label: 'Level 2', value: 2 },
  { label: 'Level 3', value: 3 },
]

// Handle modal close with proper focus management
const handleClose = () => {
  // Blur any focused element inside the modal before closing
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
  emit('close')
}

// Handle open state change
const handleOpenChange = (value: boolean) => {
  if (!value) {
    // Use nextTick to ensure DOM updates before closing
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
    title="Tambah Member ke Tree"
    :description="affiliate ? `Tambahkan customer ke tree network ${affiliate.customerName}` : 'Pilih affiliate terlebih dahulu'"
    :ui="{ width: 'max-w-2xl' }"
    @update:open="handleOpenChange"
  >
    <template #body>
      <div v-if="!affiliate" class="py-8 text-center">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <p class="text-slate-500 dark:text-slate-400">Pilih affiliate terlebih dahulu dari daftar</p>
      </div>

      <div v-else class="space-y-4">
        <!-- Search Input -->
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Cari Customer
          </label>
          <UInput
            :model-value="searchQuery"
            placeholder="Ketik nama, email, atau nomor telepon..."
            icon="i-heroicons-magnifying-glass"
            class="w-full"
            @update:model-value="emit('update:searchQuery', $event)"
          />
          <p class="text-xs text-slate-500 mt-1">Minimal 2 karakter untuk memulai pencarian</p>
        </div>

        <!-- Level Selection -->
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Pilih Level
          </label>
          <USelect
            :model-value="selectedLevel"
            :items="levelOptions"
            placeholder="Pilih level"
            class="w-full"
            @update:model-value="emit('update:selectedLevel', $event)"
          />
        </div>

        <!-- Loading State -->
        <div v-if="isSearching" class="flex justify-center py-8">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-violet-500 animate-spin" />
        </div>

        <!-- Customer Results -->
        <div v-else-if="customers.length > 0" class="space-y-2 max-h-80 overflow-y-auto">
          <div
            v-for="customer in customers"
            :key="customer.id"
            class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
            :class="[
              selectedCustomerId === customer.id
                ? 'bg-violet-100 dark:bg-violet-500/20 border-2 border-violet-500'
                : customer.isInTree
                  ? 'bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed'
                  : 'bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-transparent'
            ]"
            @click="!customer.isInTree && emit('update:selectedCustomerId', customer.id)"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="customer.avatar"
                  :src="customer.avatar"
                  :alt="customer.fullName"
                  class="w-full h-full object-cover"
                />
                <UIcon v-else name="i-heroicons-user" class="w-5 h-5 text-slate-500" />
              </div>
              <div>
                <p class="font-medium text-slate-900 dark:text-white">
                  {{ customer.fullName }}
                </p>
                <p class="text-sm text-slate-500 dark:text-slate-400">{{ customer.email }}</p>
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-xs text-slate-500">{{ customer.totalOrdersCount }} orders</span>
                  <span class="text-xs text-emerald-600">{{ formatCurrency(customer.totalSpent) }}</span>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UBadge v-if="customer.isInTree" color="gray" variant="subtle" size="xs">
                Sudah di Tree
              </UBadge>
              <UBadge v-else-if="customer.hasAffiliate" color="violet" variant="subtle" size="xs">
                Punya Kode Referral
              </UBadge>
              <UIcon
                v-if="selectedCustomerId === customer.id"
                name="i-heroicons-check-circle-solid"
                class="w-6 h-6 text-violet-500"
              />
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else-if="searchQuery.length >= 2"
          class="py-8 text-center text-slate-500 dark:text-slate-400"
        >
          <UIcon name="i-heroicons-user-group" class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p>Tidak ada customer ditemukan</p>
        </div>

        <!-- Initial State -->
        <div v-else class="py-8 text-center text-slate-500 dark:text-slate-400">
          <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p>Ketik untuk mencari customer</p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton color="neutral" variant="ghost" @click="handleClose">
          Batal
        </UButton>
        <UButton
          color="primary"
          :loading="isAdding"
          :disabled="!selectedCustomerId || !affiliate"
          @click="emit('confirm')"
        >
          <UIcon name="i-heroicons-user-plus" class="w-4 h-4 mr-1" />
          Tambah ke Tree
        </UButton>
      </div>
    </template>
  </UModal>
</template>
