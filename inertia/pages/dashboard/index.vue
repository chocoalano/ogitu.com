<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import { useToast } from '~/composables/use_toast'
import AppLayout from '~/layouts/default.vue'
import {
  WelcomeHeader,
  QuickActions,
  OrderStatusCards,
  RecentOrders,
  WalletCard,
  MLMCard,
  RankCard,
  AddressList,
  AddressDialog,
  TopupDialog,
  RankDialog,
  DeleteAddressDialog,
  type Customer,
  type OrderStats,
  type RecentOrder,
  type Address,
  type Wallet,
  type WalletTransaction,
  type Affiliate,
  type Commission,
  type Referral,
  type NetworkStats,
  type Rank,
  type NetworkTree,
} from '~/components/dashboard'

const props = defineProps<{
  customer: Customer
  stats: OrderStats
  cartCount: number
  wishlistCount: number
  addressCount: number
  addresses: Address[]
  defaultAddress: Address | null
  recentOrders: RecentOrder[]
  wallet: Wallet
  recentTransactions: WalletTransaction[]
  affiliate: Affiliate
  recentCommissions: Commission[]
  referrals: Referral[]
  networkStats: NetworkStats
  networkTree?: NetworkTree | null
  currentRank: Rank | null
  nextRank: Rank | null
  rankProgress: number
  ordersToNextRank: number
  spentToNextRank: number
  allRanks: Rank[]
}>()

// Dialog states
const addressDialogOpen = ref(false)
const deleteAddressDialogOpen = ref(false)
const topupDialogOpen = ref(false)
const rankDialogOpen = ref(false)

// Selected items for editing/deleting
const editingAddress = ref<Address | null>(null)
const deletingAddressId = ref<number | null>(null)

// Address handlers
const handleAddAddress = () => {
  editingAddress.value = null
  addressDialogOpen.value = true
}

const handleEditAddress = (address: Address) => {
  editingAddress.value = address
  addressDialogOpen.value = true
}

const handleDeleteAddress = (id: number) => {
  deletingAddressId.value = id
  deleteAddressDialogOpen.value = true
}

const handleSetDefaultAddress = async (id: number) => {
  try {
    // Get XSRF token from cookie
    const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]
    const decodedToken = xsrfToken ? decodeURIComponent(xsrfToken) : null

    const response = await fetch(`/api/dashboard/address/${id}/default`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(decodedToken && { 'X-XSRF-TOKEN': decodedToken }),
      },
    })
    const data = await response.json()
    if (data.success) {
      window.location.reload()
    } else {
      alert(data.message || 'Gagal mengubah alamat utama')
    }
  } catch (error) {
    console.error('Failed to set default address:', error)
    alert('Terjadi kesalahan saat mengubah alamat utama')
  }
}

// MLM handlers
const toast = useToast()

const handleWithdraw = () => {
  // Navigate to withdrawal page or open withdrawal dialog
  router.visit('/dashboard/wallet/withdraw')
}

const handleViewAllMitra = (status: 'active' | 'inactive' | 'prospect') => {
  // Navigate to referrals page with status filter
  router.visit(`/dashboard/referrals?status=${status}`)
}

const handleReferralCopied = () => {
  toast.success('Link Referral Disalin!', 'Bagikan link referral Anda kepada teman untuk mendapatkan bonus.', 3000)
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Dashboard - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-125 h-125 bg-primary-500/10 rounded-full blur-3xl" />
      <div class="absolute top-1/3 right-1/4 w-100 h-100 bg-secondary-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-0 left-1/2 w-150 h-75 bg-primary-500/5 rounded-full blur-3xl" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Welcome Header -->
      <WelcomeHeader
        :customer="customer"
        :stats="stats"
        :current-rank="currentRank"
        @open-rank-dialog="rankDialogOpen = true"
      />

      <!-- Quick Actions -->
      <QuickActions
        :stats="stats"
        :cart-count="cartCount"
        :wishlist-count="wishlistCount"
        :address-count="addressCount"
      />

      <!-- Order Status Cards -->
      <OrderStatusCards :stats="stats" />

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Orders & Addresses -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Recent Orders -->
          <RecentOrders :orders="recentOrders" />

          <!-- Address List -->
          <AddressList
            :addresses="addresses"
            @add="handleAddAddress"
            @edit="handleEditAddress"
            @delete="handleDeleteAddress"
            @set-default="handleSetDefaultAddress"
          />
        </div>

        <!-- Right Column - Sidebar -->
        <div class="space-y-6">
          <!-- Wallet Card -->
          <WalletCard
            :wallet="wallet"
            :transactions="recentTransactions"
            @open-topup="topupDialogOpen = true"
          />

          <!-- Rank Card -->
          <RankCard
            :current-rank="currentRank"
            :next-rank="nextRank"
            :rank-progress="rankProgress"
            :orders-to-next-rank="ordersToNextRank"
            :spent-to-next-rank="spentToNextRank"
            @open-details="rankDialogOpen = true"
          />

          <!-- MLM Card -->
          <MLMCard
            :affiliate="affiliate"
            :commissions="recentCommissions"
            :referrals="referrals"
            :network-stats="networkStats"
            :network-tree="networkTree"
            @withdraw="handleWithdraw"
            @view-all-mitra="handleViewAllMitra"
            @referral-copied="handleReferralCopied"
          />

          <!-- Help Card -->
          <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-5">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center">
                <UIcon name="i-heroicons-question-mark-circle" class="w-5 h-5 text-violet-500" />
              </div>
              <h2 class="font-semibold text-gray-900 dark:text-white">Butuh Bantuan?</h2>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Tim kami siap membantu Anda 24/7 melalui WhatsApp
            </p>
            <a href="https://wa.me/6281234567890" target="_blank">
              <UButton variant="outline" color="success" block size="sm">
                <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4 mr-2" />
                Hubungi Kami
              </UButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dialogs -->
  <AddressDialog
    v-model="addressDialogOpen"
    :address="editingAddress"
    :customer="customer"
    :address-count="addressCount"
  />

  <DeleteAddressDialog
    v-model="deleteAddressDialogOpen"
    :address-id="deletingAddressId"
  />

  <TopupDialog v-model="topupDialogOpen" />

  <RankDialog
    v-model="rankDialogOpen"
    :all-ranks="allRanks"
    :current-rank="currentRank"
  />
</template>
