<script setup lang="ts">
import type { Affiliate, ReferredCustomersData } from './types'

interface Props {
  affiliate: Affiliate | null
  referredCustomers: ReferredCustomersData | null
  isLoading: boolean
  isPlacing: boolean
  selectedCustomers: number[]
}

interface Emits {
  (e: 'placeCustomer', customerId: number, level: number): void
  (e: 'removeFromTree', referralId: number): void
  (e: 'toggleSelection', customerId: number): void
  (e: 'selectAll'): void
  (e: 'openPlacementModal'): void
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

// Format date
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

const isAllSelected = () => {
  if (!props.referredCustomers) return false
  return props.selectedCustomers.length === props.referredCustomers.unplacedCustomers.length
}
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
  >
    <div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-semibold text-slate-900 dark:text-white">
            {{ affiliate ? `Referral ${affiliate.customerName}` : 'Pilih Affiliate' }}
          </h2>
          <p class="text-sm text-slate-500 dark:text-slate-400">
            {{
              affiliate
                ? `Customers yang menggunakan kode ${affiliate.referralCode}`
                : 'Klik affiliate untuk melihat referral'
            }}
          </p>
        </div>
        <div v-if="selectedCustomers.length > 0" class="flex items-center gap-2">
          <UBadge color="primary">
            {{ selectedCustomers.length }} dipilih
          </UBadge>
          <UButton
            icon="i-heroicons-check-circle"
            color="primary"
            size="sm"
            @click="emit('openPlacementModal')"
          >
            Tempatkan
          </UButton>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="p-8 flex items-center justify-center">
      <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-violet-500 animate-spin" />
    </div>

    <!-- No affiliate selected -->
    <div v-else-if="!affiliate" class="p-8 text-center">
      <UIcon
        name="i-heroicons-cursor-arrow-rays"
        class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
      />
      <p class="text-slate-500 dark:text-slate-400">Pilih affiliate dari daftar di samping</p>
    </div>

    <!-- Customer list -->
    <div v-else-if="referredCustomers" class="divide-y divide-slate-200 dark:divide-slate-800">
      <!-- Unplaced section -->
      <div v-if="referredCustomers.unplacedCustomers.length > 0" class="p-4">
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-2">
            <UBadge color="warning" variant="subtle">
              {{ referredCustomers.totalUnplaced }} Belum Ditempatkan
            </UBadge>
          </div>
          <UButton variant="ghost" size="xs" @click="emit('selectAll')">
            {{ isAllSelected() ? 'Batal Pilih Semua' : 'Pilih Semua' }}
          </UButton>
        </div>

        <div class="space-y-2 max-h-62 overflow-y-auto">
          <div
            v-for="customer in referredCustomers.unplacedCustomers"
            :key="customer.id"
            class="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <UCheckbox
                :model-value="selectedCustomers.includes(customer.id)"
                @update:model-value="emit('toggleSelection', customer.id)"
              />
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
            <div class="flex items-center gap-2">
              <p class="text-xs text-slate-500">{{ formatDate(customer.createdAt) }}</p>
              <UButton
                icon="i-heroicons-plus"
                color="primary"
                size="xs"
                :loading="isPlacing"
                @click="emit('placeCustomer', customer.id, 1)"
              >
                Level 1
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Placed section -->
      <div v-if="referredCustomers.placedCustomers.length > 0" class="p-4">
        <div class="mb-3">
          <UBadge color="success" variant="subtle">
            {{ referredCustomers.totalPlaced }} Sudah Ditempatkan
          </UBadge>
        </div>

        <div class="space-y-2 max-h-50 overflow-y-auto">
          <div
            v-for="customer in referredCustomers.placedCustomers"
            :key="customer.id"
            class="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-8 h-8 rounded-full bg-emerald-200 dark:bg-emerald-700 flex items-center justify-center overflow-hidden"
              >
                <img
                  v-if="customer.avatar"
                  :src="customer.avatar"
                  :alt="customer.fullName"
                  class="w-full h-full object-cover"
                />
                <UIcon
                  v-else
                  name="i-heroicons-user"
                  class="w-4 h-4 text-emerald-700 dark:text-emerald-300"
                />
              </div>
              <div>
                <p class="font-medium text-slate-900 dark:text-white text-sm">
                  {{ customer.fullName }}
                </p>
                <div class="flex items-center gap-2">
                  <UBadge color="primary" variant="subtle" size="xs"
                    >Level {{ customer.level }}</UBadge
                  >
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    {{ customer.totalOrdersCount }} order
                  </p>
                  <p class="text-xs text-emerald-600 dark:text-emerald-400">
                    {{ formatCurrency(customer.totalSpent) }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-emerald-500" />
              <UButton
                v-if="customer.referralId"
                icon="i-heroicons-trash"
                color="error"
                variant="ghost"
                size="xs"
                @click="emit('removeFromTree', customer.referralId)"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="referredCustomers.totalReferred === 0" class="p-8 text-center">
        <UIcon
          name="i-heroicons-user-plus"
          class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
        />
        <p class="text-slate-500 dark:text-slate-400">
          Belum ada customer yang menggunakan kode referral ini
        </p>
      </div>
    </div>
  </div>
</template>
