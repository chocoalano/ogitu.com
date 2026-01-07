<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import AppLayout from '~/layouts/default.vue'

interface OrderItem {
  id: number
  productName: string
  variantName: string | null
  quantity: number
  price: number
  subtotal: number
}

interface Order {
  id: number
  orderNumber: string
  status: string
  total: number
  subtotal: number
  shippingCost: number
  createdAt: string
  paidAt: string | null
  shippedAt: string | null
  deliveredAt: string | null
  cancelledAt: string | null
  shipping: {
    courier: string
    service: string
    trackingNumber: string | null
    estimatedDays: string | null
  } | null
  items: OrderItem[]
}

const props = defineProps<{
  order: Order | null
  searchQuery: string
}>()

// Local state
const searchInput = ref(props.searchQuery)
const isSearching = ref(false)

// Format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Format date
const formatDate = (dateString: string | null) => {
  if (!dateString) return '-'
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Get status config
const getStatusConfig = (status: string) => {
  const configs: Record<string, { label: string; color: string; icon: string }> = {
    pending_payment: { label: 'Menunggu Pembayaran', color: 'bg-amber-100 text-amber-700', icon: 'i-heroicons-clock' },
    paid: { label: 'Dibayar', color: 'bg-blue-100 text-blue-700', icon: 'i-heroicons-credit-card' },
    processing: { label: 'Diproses', color: 'bg-indigo-100 text-indigo-700', icon: 'i-heroicons-cog-6-tooth' },
    shipped: { label: 'Dikirim', color: 'bg-purple-100 text-purple-700', icon: 'i-heroicons-truck' },
    delivered: { label: 'Selesai', color: 'bg-emerald-100 text-emerald-700', icon: 'i-heroicons-check-circle' },
    cancelled: { label: 'Dibatalkan', color: 'bg-red-100 text-red-700', icon: 'i-heroicons-x-circle' },
  }
  return configs[status] || { label: status, color: 'bg-gray-100 text-gray-700', icon: 'i-heroicons-question-mark-circle' }
}

// Order timeline steps
const timelineSteps = computed(() => {
  if (!props.order) return []

  const steps = [
    { key: 'created', label: 'Pesanan Dibuat', date: props.order.createdAt, icon: 'i-heroicons-shopping-bag' },
    { key: 'paid', label: 'Pembayaran Dikonfirmasi', date: props.order.paidAt, icon: 'i-heroicons-credit-card' },
    { key: 'processing', label: 'Pesanan Diproses', date: props.order.paidAt, icon: 'i-heroicons-cog-6-tooth' },
    { key: 'shipped', label: 'Pesanan Dikirim', date: props.order.shippedAt, icon: 'i-heroicons-truck' },
    { key: 'delivered', label: 'Pesanan Diterima', date: props.order.deliveredAt, icon: 'i-heroicons-check-circle' },
  ]

  if (props.order.status === 'cancelled') {
    return [
      steps[0],
      { key: 'cancelled', label: 'Pesanan Dibatalkan', date: props.order.cancelledAt, icon: 'i-heroicons-x-circle' },
    ]
  }

  return steps
})

// Current step index
const currentStepIndex = computed(() => {
  if (!props.order) return -1

  const statusMap: Record<string, number> = {
    pending_payment: 0,
    paid: 1,
    processing: 2,
    shipped: 3,
    delivered: 4,
    cancelled: 1,
  }

  return statusMap[props.order.status] ?? 0
})

// Handle search
const handleSearch = () => {
  if (!searchInput.value.trim()) return

  isSearching.value = true
  router.get('/track', { order: searchInput.value.trim() }, {
    preserveState: true,
    onFinish: () => {
      isSearching.value = false
    },
  })
}

// Copy to clipboard
const copyToClipboard = (text: string) => {
  if (typeof window !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
  }
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Lacak Pesanan - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-125 h-125 bg-blue-500/10 rounded-full blur-3xl" />
      <div class="absolute top-1/3 right-1/4 w-100 h-100 bg-purple-500/10 rounded-full blur-3xl" />
    </div>

    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-blue-500 via-indigo-500 to-purple-500 overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="track-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#track-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm mb-6 text-white/80">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white font-medium">Lacak Pesanan</span>
        </nav>

        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <UIcon name="i-heroicons-map-pin" class="w-8 h-8 text-white" />
          </div>
          <h1 class="text-3xl sm:text-4xl font-bold text-white mb-3">Lacak Pesanan</h1>
          <p class="text-white/80 max-w-md mx-auto mb-8">
            Masukkan nomor pesanan untuk melacak status pengiriman
          </p>

          <!-- Search Form -->
          <form @submit.prevent="handleSearch" class="max-w-lg mx-auto">
            <div class="flex gap-3">
              <UInput
                v-model="searchInput"
                placeholder="Masukkan nomor pesanan (contoh: ORD-20231213-XXXXX)"
                size="lg"
                class="flex-1"
                :ui="{ base: 'bg-white/90 backdrop-blur-sm' }"
              />
              <UButton type="submit" color="white" size="lg" :loading="isSearching">
                <UIcon name="i-heroicons-magnifying-glass" class="w-5 h-5" />
              </UButton>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Order Found -->
      <div v-if="order">
        <!-- Order Header -->
        <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 mb-6">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Nomor Pesanan</p>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">{{ order.orderNumber }}</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {{ formatDate(order.createdAt) }}
              </p>
            </div>
            <div :class="['inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium', getStatusConfig(order.status).color]">
              <UIcon :name="getStatusConfig(order.status).icon" class="w-4 h-4" />
              {{ getStatusConfig(order.status).label }}
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 mb-6">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-6">Status Pengiriman</h3>

          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

            <!-- Timeline items -->
            <div class="space-y-6">
              <div
                v-for="(step, index) in timelineSteps"
                :key="step.key"
                class="relative flex gap-4"
              >
                <!-- Icon -->
                <div
                  :class="[
                    'relative z-10 w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                    index <= currentStepIndex
                      ? step.key === 'cancelled'
                        ? 'bg-red-500 text-white'
                        : 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                  ]"
                >
                  <UIcon :name="step.icon" class="w-5 h-5" />
                </div>

                <!-- Content -->
                <div class="pt-2 pb-4">
                  <p
                    :class="[
                      'font-medium',
                      index <= currentStepIndex
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-400 dark:text-gray-500'
                    ]"
                  >
                    {{ step.label }}
                  </p>
                  <p
                    v-if="step.date && index <= currentStepIndex"
                    class="text-sm text-gray-500 dark:text-gray-400 mt-1"
                  >
                    {{ formatDate(step.date) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Shipping Info -->
        <div v-if="order.shipping" class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 mb-6">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Informasi Pengiriman</h3>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Kurir</p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ order.shipping.courier.toUpperCase() }} - {{ order.shipping.service }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Estimasi</p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ order.shipping.estimatedDays || '-' }} hari
              </p>
            </div>
            <div class="sm:col-span-2">
              <p class="text-sm text-gray-500 dark:text-gray-400">No. Resi</p>
              <div class="flex items-center gap-2">
                <p class="font-medium text-gray-900 dark:text-white font-mono">
                  {{ order.shipping.trackingNumber || 'Belum tersedia' }}
                </p>
                <UButton
                  v-if="order.shipping.trackingNumber"
                  variant="ghost"
                  size="xs"
                  @click="copyToClipboard(order.shipping.trackingNumber!)"
                >
                  <UIcon name="i-heroicons-clipboard-document" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Items -->
        <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 mb-6">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Detail Pesanan</h3>

          <div class="space-y-4">
            <div
              v-for="item in order.items"
              :key="item.id"
              class="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700/50 last:border-0"
            >
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ item.productName }}</p>
                <p v-if="item.variantName" class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.variantName }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ item.quantity }}x {{ formatPrice(item.price) }}
                </p>
              </div>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ formatPrice(item.subtotal) }}
              </p>
            </div>
          </div>

          <!-- Totals -->
          <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Subtotal</span>
              <span class="text-gray-900 dark:text-white">{{ formatPrice(order.subtotal) }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-gray-500 dark:text-gray-400">Ongkos Kirim</span>
              <span class="text-gray-900 dark:text-white">{{ formatPrice(order.shippingCost) }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg pt-2">
              <span class="text-gray-900 dark:text-white">Total</span>
              <span class="text-primary-600 dark:text-primary-400">{{ formatPrice(order.total) }}</span>
            </div>
          </div>
        </div>

        <!-- Need Help -->
        <div class="bg-blue-50 dark:bg-blue-900/20 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
          <div class="flex items-start gap-4">
            <div class="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0">
              <UIcon name="i-heroicons-question-mark-circle" class="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">Butuh Bantuan?</h4>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Jika ada kendala dengan pesanan, silakan hubungi customer service kami.
              </p>
              <div class="flex flex-wrap gap-2">
                <Link href="/help">
                  <UButton color="primary" variant="soft" size="sm">
                    <UIcon name="i-heroicons-book-open" class="w-4 h-4 mr-1" />
                    Pusat Bantuan
                  </UButton>
                </Link>
                <UButton color="primary" variant="soft" size="sm" as="a" href="https://wa.me/6281234567890" target="_blank">
                  <UIcon name="i-simple-icons-whatsapp" class="w-4 h-4 mr-1" />
                  WhatsApp
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Order Not Found -->
      <div v-else-if="searchQuery" class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-red-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-magnifying-glass" class="w-12 h-12 text-red-500" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Pesanan Tidak Ditemukan</h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-6">
          Tidak ada pesanan dengan nomor "{{ searchQuery }}". Pastikan nomor pesanan sudah benar.
        </p>
        <UButton color="primary" @click="searchInput = ''; router.get('/track')">
          Coba Lagi
        </UButton>
      </div>

      <!-- Initial State -->
      <div v-else class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-blue-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-truck" class="w-12 h-12 text-blue-500" />
        </div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">Lacak Pesanan Anda</h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          Masukkan nomor pesanan di atas untuk melihat status pengiriman secara real-time.
        </p>

        <!-- Tips -->
        <div class="max-w-lg mx-auto bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-6 text-left">
          <h3 class="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-yellow-500" />
            Tips
          </h3>
          <ul class="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-check" class="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
              <span>Nomor pesanan bisa ditemukan di email konfirmasi atau halaman pesanan</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-check" class="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
              <span>Format nomor pesanan: ORD-YYYYMMDD-XXXXX</span>
            </li>
            <li class="flex items-start gap-2">
              <UIcon name="i-heroicons-check" class="w-4 h-4 text-primary-500 mt-0.5 shrink-0" />
              <span>Jika sudah login, cek riwayat pesanan di halaman <Link href="/orders" class="text-primary-500 hover:underline">Pesanan Saya</Link></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
