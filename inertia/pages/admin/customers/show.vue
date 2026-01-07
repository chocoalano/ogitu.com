<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
import { useToast } from '~/composables/use_toast'
import AdminLayout from '~/layouts/admin.vue'

defineOptions({
  layout: AdminLayout,
})

interface Address {
  id: number
  label: string
  recipientName: string
  phone: string
  province: string
  city: string
  district: string
  postalCode: string
  fullAddress: string
  isDefault: boolean
}

interface Order {
  id: number
  orderNumber: string
  total: number
  status: string
  createdAt: string
}

interface Review {
  id: number
  rating: number
  comment: string | null
  createdAt: string
  product: {
    id: number
    name: string
    slug: string
  }
}

interface Wallet {
  id: number
  balance: number
}

interface Customer {
  id: number
  fullName: string
  email: string
  phone: string | null
  gender: 'male' | 'female' | null
  birthDate: string | null
  avatar: string | null
  isActive: boolean
  isVerified: boolean
  totalOrdersCount: number
  totalSpent: number
  referredByCode: string | null
  createdAt: string
  updatedAt: string
  addresses?: Address[]
  orders?: Order[]
  reviews?: Review[]
  wallet?: Wallet | null
}

interface Props {
  customer: Customer
}

const props = defineProps<Props>()
const toast = useToast()

const deleteModalOpen = ref(false)

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const formatDateTime = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Get status badge color
const getOrderStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    pending: 'warning',
    paid: 'primary',
    processing: 'info',
    shipped: 'info',
    delivered: 'success',
    cancelled: 'error',
    refunded: 'neutral',
  }
  return colors[status] || 'neutral'
}

// Get status label
const getOrderStatusLabel = (status: string) => {
  const labels: Record<string, string> = {
    pending: 'Menunggu Pembayaran',
    paid: 'Sudah Dibayar',
    processing: 'Diproses',
    shipped: 'Dikirim',
    delivered: 'Selesai',
    cancelled: 'Dibatalkan',
    refunded: 'Dikembalikan',
  }
  return labels[status] || status
}

// Toggle active status
const toggleActive = () => {
  router.patch(`/admin/customers/${props.customer.id}/active`, {}, {
    preserveScroll: true,
    onSuccess: () => {
      toast.success(`Pelanggan berhasil di${props.customer.isActive ? 'nonaktifkan' : 'aktifkan'}`)
    },
    onError: () => {
      toast.error('Gagal mengubah status pelanggan')
    },
  })
}

// Toggle verified status
const toggleVerified = () => {
  router.patch(`/admin/customers/${props.customer.id}/verified`, {}, {
    preserveScroll: true,
    onSuccess: () => {
      toast.success(`Status verifikasi berhasil diubah`)
    },
    onError: () => {
      toast.error('Gagal mengubah status verifikasi')
    },
  })
}

// Delete customer
const confirmDelete = () => {
  router.delete(`/admin/customers/${props.customer.id}`, {
    onSuccess: () => {
      toast.success('Pelanggan berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus pelanggan')
    },
  })
}

// Impersonate customer
const impersonateCustomer = () => {
  if (!props.customer.isActive) {
    toast.error('Tidak dapat login sebagai customer yang tidak aktif')
    return
  }

  router.post(`/admin/customers/${props.customer.id}/impersonate`, {}, {
    onSuccess: () => {
      toast.success(`Anda sekarang login sebagai ${props.customer.fullName}`)
    },
    onError: () => {
      toast.error('Gagal login sebagai customer')
    },
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <Link
          href="/admin/customers"
          class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Detail Pelanggan</h1>
          <p class="text-gray-500 dark:text-gray-400">
            Informasi lengkap pelanggan
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <UButton
          icon="i-heroicons-user-circle"
          color="primary"
          :disabled="!props.customer.isActive"
          @click="impersonateCustomer"
        >
          Login sebagai Customer
        </UButton>
        <UButton
          icon="i-heroicons-pencil-square"
          color="primary"
          variant="outline"
          :to="`/admin/customers/${props.customer.id}/edit`"
        >
          Edit
        </UButton>
        <UButton
          icon="i-heroicons-trash"
          color="error"
          variant="outline"
          @click="deleteModalOpen = true"
        >
          Hapus
        </UButton>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Customer Info -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Customer Info Card -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <!-- Header with Avatar -->
          <div class="bg-linear-to-r from-violet-500 to-purple-600 px-6 py-8">
            <div class="flex items-center gap-4">
              <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                <img
                  v-if="props.customer.avatar"
                  :src="props.customer.avatar"
                  :alt="props.customer.fullName"
                  class="w-full h-full object-cover"
                />
                <UIcon v-else name="i-heroicons-user" class="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 class="text-2xl font-bold text-white">
                  {{ props.customer.fullName }}
                </h2>
                <p class="text-white/80">{{ props.customer.email }}</p>
                <div class="flex gap-2 mt-2">
                  <UBadge :color="props.customer.isActive ? 'success' : 'error'">
                    {{ props.customer.isActive ? 'Aktif' : 'Tidak Aktif' }}
                  </UBadge>
                  <UBadge :color="props.customer.isVerified ? 'primary' : 'neutral'">
                    {{ props.customer.isVerified ? 'Terverifikasi' : 'Belum Verifikasi' }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>

          <!-- Details -->
          <div class="p-6">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Informasi Pelanggan
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-slate-500 dark:text-slate-400">ID</label>
                  <p class="text-slate-900 dark:text-white font-medium">#{{ props.customer.id }}</p>
                </div>
                <div>
                  <label class="block text-sm text-slate-500 dark:text-slate-400">Nama Lengkap</label>
                  <p class="text-slate-900 dark:text-white font-medium">{{ props.customer.fullName }}</p>
                </div>
                <div>
                  <label class="block text-sm text-slate-500 dark:text-slate-400">Email</label>
                  <p class="text-slate-900 dark:text-white font-medium">{{ props.customer.email }}</p>
                </div>
                <div>
                  <label class="block text-sm text-slate-500 dark:text-slate-400">Telepon</label>
                  <p class="text-slate-900 dark:text-white font-medium">
                    {{ props.customer.phone || '-' }}
                  </p>
                </div>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm text-slate-500 dark:text-slate-400">Gender</label>
                  <p class="text-slate-900 dark:text-white font-medium">
                    {{ props.customer.gender === 'male' ? 'Laki-laki' : props.customer.gender === 'female' ? 'Perempuan' : '-' }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm text-slate-500 dark:text-slate-400">Tanggal Lahir</label>
                  <p class="text-slate-900 dark:text-white font-medium">
                    {{ props.customer.birthDate ? formatDate(props.customer.birthDate) : '-' }}
                  </p>
                </div>
                <div>
                  <label class="block text-sm text-slate-500 dark:text-slate-400">Tanggal Bergabung</label>
                  <p class="text-slate-900 dark:text-white font-medium">
                    {{ formatDateTime(props.customer.createdAt) }}
                  </p>
                </div>
                <div v-if="props.customer.referredByCode">
                  <label class="block text-sm text-slate-500 dark:text-slate-400">Kode Referral</label>
                  <p class="text-slate-900 dark:text-white font-medium">
                    {{ props.customer.referredByCode }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div class="p-4 border-b border-slate-200 dark:border-slate-800">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Pesanan Terakhir</h3>
          </div>
          <div v-if="props.customer.orders && props.customer.orders.length > 0" class="divide-y divide-slate-200 dark:divide-slate-800">
            <div
              v-for="order in props.customer.orders"
              :key="order.id"
              class="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div class="flex items-center justify-between">
                <div>
                  <Link
                    :href="`/admin/orders/${order.id}`"
                    class="font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400"
                  >
                    {{ order.orderNumber }}
                  </Link>
                  <p class="text-sm text-slate-500 dark:text-slate-400">
                    {{ formatDate(order.createdAt) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="font-medium text-slate-900 dark:text-white">
                    {{ formatCurrency(order.total) }}
                  </p>
                  <UBadge :color="getOrderStatusColor(order.status)" variant="subtle" size="xs">
                    {{ getOrderStatusLabel(order.status) }}
                  </UBadge>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center">
            <UIcon name="i-heroicons-shopping-cart" class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p class="text-slate-500 dark:text-slate-400">Belum ada pesanan</p>
          </div>
        </div>

        <!-- Addresses -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div class="p-4 border-b border-slate-200 dark:border-slate-800">
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Alamat</h3>
          </div>
          <div v-if="props.customer.addresses && props.customer.addresses.length > 0" class="divide-y divide-slate-200 dark:divide-slate-800">
            <div
              v-for="address in props.customer.addresses"
              :key="address.id"
              class="p-4"
            >
              <div class="flex items-start justify-between">
                <div>
                  <div class="flex items-center gap-2 mb-1">
                    <p class="font-medium text-slate-900 dark:text-white">{{ address.label }}</p>
                    <UBadge v-if="address.isDefault" color="primary" variant="subtle" size="xs">
                      Utama
                    </UBadge>
                  </div>
                  <p class="text-sm text-slate-600 dark:text-slate-400">
                    {{ address.recipientName }} - {{ address.phone }}
                  </p>
                  <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
                    {{ address.fullAddress }}, {{ address.district }}, {{ address.city }}, {{ address.province }} {{ address.postalCode }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="p-8 text-center">
            <UIcon name="i-heroicons-map-pin" class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <p class="text-slate-500 dark:text-slate-400">Belum ada alamat tersimpan</p>
          </div>
        </div>
      </div>

      <!-- Right Column - Stats & Actions -->
      <div class="space-y-6">
        <!-- Stats Card -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Statistik</h3>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5 text-violet-500" />
                </div>
                <span class="text-slate-600 dark:text-slate-400">Total Pesanan</span>
              </div>
              <span class="font-bold text-slate-900 dark:text-white">{{ props.customer.totalOrdersCount }}</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-banknotes" class="w-5 h-5 text-emerald-500" />
                </div>
                <span class="text-slate-600 dark:text-slate-400">Total Belanja</span>
              </div>
              <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ formatCurrency(props.customer.totalSpent) }}</span>
            </div>
            <div v-if="props.customer.wallet" class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-wallet" class="w-5 h-5 text-blue-500" />
                </div>
                <span class="text-slate-600 dark:text-slate-400">Saldo Wallet</span>
              </div>
              <span class="font-bold text-blue-600 dark:text-blue-400">{{ formatCurrency(props.customer.wallet.balance) }}</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-star" class="w-5 h-5 text-amber-500" />
                </div>
                <span class="text-slate-600 dark:text-slate-400">Total Review</span>
              </div>
              <span class="font-bold text-slate-900 dark:text-white">{{ props.customer.reviews?.length || 0 }}</span>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Aksi Cepat</h3>
          <div class="space-y-3">
            <UButton
              :icon="props.customer.isActive ? 'i-heroicons-x-circle' : 'i-heroicons-check-circle'"
              :color="props.customer.isActive ? 'warning' : 'success'"
              variant="soft"
              block
              @click="toggleActive"
            >
              {{ props.customer.isActive ? 'Nonaktifkan Akun' : 'Aktifkan Akun' }}
            </UButton>
            <UButton
              :icon="props.customer.isVerified ? 'i-heroicons-shield-exclamation' : 'i-heroicons-shield-check'"
              :color="props.customer.isVerified ? 'neutral' : 'primary'"
              variant="soft"
              block
              @click="toggleVerified"
            >
              {{ props.customer.isVerified ? 'Batalkan Verifikasi' : 'Verifikasi Email' }}
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <UModal v-model:open="deleteModalOpen" :ui="{ overlay: 'z-[100]', content: 'z-[100]' }">
      <template #content>
        <div class="p-6 max-h-[85vh] overflow-y-auto">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Hapus Pelanggan</h3>
              <p class="text-slate-500 dark:text-slate-400">
                Apakah Anda yakin ingin menghapus <strong>{{ props.customer.fullName }}</strong>?
              </p>
            </div>
          </div>
          <p class="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg mb-4">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 inline mr-1" />
            Pelanggan dengan riwayat pesanan tidak dapat dihapus.
          </p>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="outline" @click="deleteModalOpen = false">
              Batal
            </UButton>
            <UButton color="error" @click="confirmDelete">
              Hapus
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
