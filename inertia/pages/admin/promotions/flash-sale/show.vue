<script setup lang="ts">
import { router, Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import PromotionStatusBadge from '~/components/admin/promotions/PromotionStatusBadge.vue'

defineOptions({
  layout: AdminLayout,
})

interface FlashSaleProduct {
  id: number
  productId: number
  name: string
  image: string
  originalPrice: number
  flashPrice: number
  discountPercentage: number
  stockLimit: number
  soldCount: number
  remainingStock: number
}

interface FlashSaleData {
  id: number
  name: string
  description: string | null
  startDate: string
  endDate: string
  isActive: boolean
  status: string
  statusColor: string
  timeRemaining: string | null
  progress: number
  productCount: number
  totalSold: number
  totalRevenue: number
  products: FlashSaleProduct[]
  createdAt: string
  updatedAt: string
}

interface Props {
  flashSale: FlashSaleData
}

const props = defineProps<Props>()

// Format helpers
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Image URL helper
const getImageUrl = (url: string | undefined | null): string => {
  if (!url || url === '/images/placeholder.png') {
    return 'https://placehold.co/100x100/1a1a2e/ffffff?text=No+Image'
  }
  return url
}

// Toggle status
const toggleStatus = () => {
  router.post(`/admin/promotions/flash-sale/${props.flashSale.id}/toggle`, {}, {
    preserveScroll: true,
  })
}

// Delete flash sale
const deleteFlashSale = () => {
  if (confirm('Apakah Anda yakin ingin menghapus flash sale ini?')) {
    router.delete(`/admin/promotions/flash-sale/${props.flashSale.id}`)
  }
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <Link href="/admin/promotions/flash-sale">
          <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" size="sm" />
        </Link>
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
              {{ flashSale.name }}
            </h1>
            <PromotionStatusBadge :status="flashSale.status" />
          </div>
          <p v-if="flashSale.description" class="text-gray-500 dark:text-gray-400 mt-1">
            {{ flashSale.description }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <UButton
          :icon="flashSale.isActive ? 'i-heroicons-pause' : 'i-heroicons-play'"
          :color="flashSale.isActive ? 'warning' : 'success'"
          variant="soft"
          @click="toggleStatus"
        >
          {{ flashSale.isActive ? 'Nonaktifkan' : 'Aktifkan' }}
        </UButton>
        <Link :href="`/admin/promotions/flash-sale/${flashSale.id}/edit`">
          <UButton icon="i-heroicons-pencil-square" color="primary" variant="soft">
            Edit
          </UButton>
        </Link>
        <UButton
          icon="i-heroicons-trash"
          color="error"
          variant="soft"
          @click="deleteFlashSale"
        >
          Hapus
        </UButton>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30">
            <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Produk</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">{{ flashSale.productCount }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-green-100 dark:bg-green-900/30">
            <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Terjual</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">{{ flashSale.totalSold }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30">
            <UIcon name="i-heroicons-currency-dollar" class="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Total Pendapatan</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">{{ formatPrice(flashSale.totalRevenue) }}</p>
          </div>
        </div>
      </UCard>

      <UCard>
        <div class="flex items-center gap-3">
          <div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
            <UIcon name="i-heroicons-chart-bar" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-sm text-gray-500 dark:text-gray-400">Progress Penjualan</p>
            <p class="text-xl font-bold text-gray-900 dark:text-white">{{ flashSale.progress }}%</p>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Period Info -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Periode</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Mulai</p>
          <p class="text-lg font-medium text-gray-900 dark:text-white">
            {{ formatDate(flashSale.startDate) }}
          </p>
        </div>
        <div>
          <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Selesai</p>
          <p class="text-lg font-medium text-gray-900 dark:text-white">
            {{ formatDate(flashSale.endDate) }}
          </p>
        </div>
      </div>

      <div v-if="flashSale.timeRemaining" class="mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20">
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
          <span class="font-medium text-primary-700 dark:text-primary-300">
            Waktu tersisa: {{ flashSale.timeRemaining }}
          </span>
        </div>
      </div>
    </UCard>

    <!-- Products List -->
    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-gray-900 dark:text-white">Produk Flash Sale</h3>
          <UBadge color="primary" variant="soft">
            {{ flashSale.products.length }} produk
          </UBadge>
        </div>
      </template>

      <div v-if="flashSale.products.length > 0" class="space-y-4">
        <div
          v-for="product in flashSale.products"
          :key="product.id"
          class="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <img
            :src="getImageUrl(product.image)"
            :alt="product.name"
            class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
          />

          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 dark:text-white truncate">
              {{ product.name }}
            </p>
            <div class="flex items-center gap-2 mt-1">
              <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
                {{ formatPrice(product.flashPrice) }}
              </span>
              <span class="text-sm text-gray-400 line-through">
                {{ formatPrice(product.originalPrice) }}
              </span>
              <UBadge color="error" variant="soft" size="xs">
                -{{ product.discountPercentage }}%
              </UBadge>
            </div>
          </div>

          <div class="text-right">
            <div class="flex items-center gap-4">
              <div>
                <p class="text-xs text-gray-500 dark:text-gray-400">Terjual</p>
                <p class="font-semibold text-gray-900 dark:text-white">
                  {{ product.soldCount }} / {{ product.stockLimit }}
                </p>
              </div>
              <div class="w-24">
                <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    class="h-full bg-primary-500 rounded-full transition-all"
                    :style="{ width: `${(product.soldCount / product.stockLimit) * 100}%` }"
                  />
                </div>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center">
                  {{ Math.round((product.soldCount / product.stockLimit) * 100) }}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
        <UIcon name="i-heroicons-inbox" class="w-12 h-12 mx-auto mb-2" />
        <p>Tidak ada produk dalam flash sale ini</p>
      </div>
    </UCard>

    <!-- Metadata -->
    <UCard>
      <template #header>
        <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Lainnya</h3>
      </template>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div>
          <p class="text-gray-500 dark:text-gray-400">Dibuat pada</p>
          <p class="text-gray-900 dark:text-white">{{ formatDate(flashSale.createdAt) }}</p>
        </div>
        <div>
          <p class="text-gray-500 dark:text-gray-400">Terakhir diubah</p>
          <p class="text-gray-900 dark:text-white">{{ formatDate(flashSale.updatedAt) }}</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
