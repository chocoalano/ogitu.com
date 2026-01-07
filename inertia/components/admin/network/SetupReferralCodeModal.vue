<script setup lang="ts">
import { ref } from 'vue'
import type { Affiliate, AffiliatedCustomersData } from './types'

interface Props {
  open: boolean
  affiliate: Affiliate | null
  affiliatedCustomersData: AffiliatedCustomersData | null
  selectedCustomers: number[]
  customReferralCode: string
  isLoading: boolean
  isSettingUp: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
  (e: 'update:customReferralCode', value: string): void
  (e: 'setupReferralCode', customerId: number, customCode?: string): void
  (e: 'bulkSetupReferralCodes'): void
  (e: 'toggleSelection', customerId: number): void
  (e: 'selectAll'): void
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

// Check if all without code are selected
const isAllSelected = () => {
  if (!props.affiliatedCustomersData) return false
  return (
    props.selectedCustomers.length === props.affiliatedCustomersData.withoutReferralCode.length &&
    props.selectedCustomers.length > 0
  )
}

// Single customer custom code state (for individual setup)
const singleCustomerCustomCode = ref<Record<number, string>>({})

const handleSingleSetup = (customerId: number) => {
  const customCode = singleCustomerCustomCode.value[customerId]
  emit('setupReferralCode', customerId, customCode || undefined)
  singleCustomerCustomCode.value[customerId] = ''
}

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
    title="Setup Kode Referral"
    description="Buat kode referral untuk customer yang terafiliasi"
    :ui="{ width: 'max-w-4xl' }"
    @update:open="handleOpenChange"
  >
    <template #body>
      <div v-if="isLoading" class="py-12 flex items-center justify-center">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-violet-500 animate-spin" />
      </div>

      <div v-else-if="affiliatedCustomersData" class="space-y-6">
        <!-- Stats -->
        <div class="grid grid-cols-3 gap-4">
          <div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-slate-900 dark:text-white">
              {{ affiliatedCustomersData.stats.total }}
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Total Member</div>
          </div>
          <div class="bg-emerald-100 dark:bg-emerald-500/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {{ affiliatedCustomersData.stats.withCode }}
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Sudah Punya Kode</div>
          </div>
          <div class="bg-amber-100 dark:bg-amber-500/20 rounded-lg p-4 text-center">
            <div class="text-2xl font-bold text-amber-600 dark:text-amber-400">
              {{ affiliatedCustomersData.stats.withoutCode }}
            </div>
            <div class="text-sm text-slate-500 dark:text-slate-400">Belum Punya Kode</div>
          </div>
        </div>

        <!-- Customers without referral code -->
        <div v-if="affiliatedCustomersData.withoutReferralCode.length > 0">
          <div class="flex items-center justify-between mb-3">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              Customer Belum Punya Kode Referral
            </h3>
            <div class="flex items-center gap-2">
              <UButton variant="ghost" size="xs" @click="emit('selectAll')">
                {{ isAllSelected() ? 'Batal Pilih Semua' : 'Pilih Semua' }}
              </UButton>
              <UButton
                v-if="selectedCustomers.length > 0"
                color="primary"
                size="sm"
                :loading="isSettingUp"
                @click="emit('bulkSetupReferralCodes')"
              >
                <UIcon name="i-heroicons-sparkles" class="w-4 h-4 mr-1" />
                Generate {{ selectedCustomers.length }} Kode
              </UButton>
            </div>
          </div>

          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div
              v-for="customer in affiliatedCustomersData.withoutReferralCode"
              :key="customer.id"
              class="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <UCheckbox
                  :model-value="selectedCustomers.includes(customer.id)"
                  @update:model-value="emit('toggleSelection', customer.id)"
                />
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
                  <div class="font-medium text-slate-900 dark:text-white">
                    {{ customer.fullName }}
                  </div>
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    {{ customer.email }}
                  </div>
                  <div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <UBadge color="violet" variant="subtle" size="xs">
                      Level {{ customer.level || '-' }}
                    </UBadge>
                    <span v-if="customer.totalOrdersCount">{{ customer.totalOrdersCount }} orders</span>
                    <span v-if="customer.totalSpent">{{ formatCurrency(customer.totalSpent) }}</span>
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <UInput
                  v-model="singleCustomerCustomCode[customer.id]"
                  placeholder="Kode custom (opsional)"
                  size="sm"
                  class="w-40"
                />
                <UButton
                  icon="i-heroicons-sparkles"
                  color="primary"
                  size="sm"
                  :loading="isSettingUp"
                  @click="handleSingleSetup(customer.id)"
                >
                  Generate
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Customers with referral code -->
        <div v-if="affiliatedCustomersData.withReferralCode.length > 0">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            Customer Sudah Punya Kode Referral
          </h3>

          <div class="space-y-2 max-h-64 overflow-y-auto">
            <div
              v-for="customer in affiliatedCustomersData.withReferralCode"
              :key="customer.id"
              class="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg"
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
                  <div class="font-medium text-slate-900 dark:text-white">
                    {{ customer.fullName }}
                  </div>
                  <div class="text-sm text-slate-500 dark:text-slate-400">
                    {{ customer.email }}
                  </div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <div class="text-right">
                  <div class="flex items-center gap-2">
                    <UBadge color="emerald" variant="soft" size="sm">
                      {{ customer.referralCode }}
                    </UBadge>
                    <UBadge color="violet" variant="subtle" size="xs">
                      Level {{ customer.level }}
                    </UBadge>
                  </div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {{ customer.totalReferrals }} referral • {{ formatCurrency(customer.totalEarnings) }} earnings
                  </div>
                </div>
                <UBadge :color="customer.isActive ? 'emerald' : 'gray'" variant="subtle" size="xs">
                  {{ customer.isActive ? 'Aktif' : 'Nonaktif' }}
                </UBadge>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div
          v-if="affiliatedCustomersData.customers.length === 0"
          class="py-8 text-center text-slate-500 dark:text-slate-400"
        >
          <UIcon
            name="i-heroicons-users"
            class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
          />
          <p>Belum ada member terafiliasi di tree ini</p>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3">
        <UButton color="gray" variant="ghost" @click="handleClose"> Tutup </UButton>
      </div>
    </template>
  </UModal>
</template>
