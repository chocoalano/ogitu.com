<script setup lang="ts">
import { ref } from 'vue'
import { Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import WithdrawalActionModal from '~/components/admin/finance/WithdrawalActionModal.vue'
import type { WithdrawalRequest } from '~/types/finance'
import { formatCurrency, formatDate } from '~/types/finance'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  withdrawal: WithdrawalRequest & {
    customerPhone: string | null
    walletBalance: number
  }
}

const props = defineProps<Props>()

// Modal state
const showApproveModal = ref(false)
const showRejectModal = ref(false)

// Avatar placeholder
const getAvatarUrl = (avatar: string | null): string => {
  if (!avatar) {
    return 'https://placehold.co/80x80/1a1a2e/ffffff?text=U'
  }
  return avatar
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Link href="/admin/finance/withdraw">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" size="sm" />
      </Link>
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
          Detail Permintaan Withdraw
        </h1>
        <p class="text-gray-500 dark:text-gray-400">ID: #{{ withdrawal.id }}</p>
      </div>
      <UBadge :color="withdrawal.statusColor as any" variant="soft" size="lg">
        {{ withdrawal.statusLabel }}
      </UBadge>
    </div>

    <!-- Customer Info -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Customer</h3>
      </template>

      <div class="flex items-start gap-6">
        <img
          :src="getAvatarUrl(withdrawal.customerAvatar)"
          :alt="withdrawal.customerName"
          class="w-20 h-20 rounded-full object-cover"
        />
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Nama</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ withdrawal.customerName }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Email</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ withdrawal.customerEmail }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Telepon</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ withdrawal.customerPhone || '-' }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Saldo Wallet Saat Ini</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ formatCurrency(withdrawal.walletBalance) }}
            </p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Withdrawal Details -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Detail Penarikan</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Jumlah Penarikan</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ formatCurrency(withdrawal.amount) }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Saldo Sebelum</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ formatCurrency(withdrawal.balanceBefore) }}
            </p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Saldo Sesudah</p>
            <p class="font-medium text-gray-900 dark:text-white">
              {{ formatCurrency(withdrawal.balanceAfter) }}
            </p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Bank</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ withdrawal.bankName }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Nomor Rekening</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ withdrawal.accountNumber }}</p>
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Atas Nama</p>
            <p class="font-medium text-gray-900 dark:text-white">{{ withdrawal.accountName }}</p>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Metadata -->
    <UCard v-if="withdrawal.metadata">
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Tambahan</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div v-if="withdrawal.metadata.approvedAt">
          <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Disetujui</p>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ formatDate(withdrawal.metadata.approvedAt) }}
          </p>
        </div>
        <div v-if="withdrawal.metadata.approvalNotes">
          <p class="text-sm text-gray-500 dark:text-gray-400">Catatan</p>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ withdrawal.metadata.approvalNotes }}
          </p>
        </div>
        <div v-if="withdrawal.metadata.rejectedAt">
          <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Ditolak</p>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ formatDate(withdrawal.metadata.rejectedAt) }}
          </p>
        </div>
        <div v-if="withdrawal.metadata.rejectionReason">
          <p class="text-sm text-gray-500 dark:text-gray-400">Alasan Penolakan</p>
          <p class="font-medium text-error-600 dark:text-error-400">
            {{ withdrawal.metadata.rejectionReason }}
          </p>
        </div>
      </div>
    </UCard>

    <!-- Timestamps -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Waktu</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Permintaan</p>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ formatDate(withdrawal.createdAt) }}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Terakhir Diupdate</p>
          <p class="font-medium text-gray-900 dark:text-white">
            {{ formatDate(withdrawal.updatedAt) }}
          </p>
        </div>
      </div>
    </UCard>

    <!-- Actions -->
    <div v-if="withdrawal.status === 'pending'" class="flex justify-end gap-4">
      <UButton color="error" variant="soft" icon="i-heroicons-x-mark" @click="showRejectModal = true">
        Tolak
      </UButton>
      <UButton color="success" icon="i-heroicons-check" @click="showApproveModal = true">
        Setujui
      </UButton>
    </div>

    <!-- Modals -->
    <WithdrawalActionModal v-model="showApproveModal" :withdrawal="withdrawal" type="approve" />
    <WithdrawalActionModal v-model="showRejectModal" :withdrawal="withdrawal" type="reject" />
  </div>
</template>
