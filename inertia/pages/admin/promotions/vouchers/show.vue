<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import PromotionStatusBadge from '~/components/admin/promotions/PromotionStatusBadge.vue'
import type { Voucher } from '~/types/promotion'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  voucher: Voucher
}

const props = defineProps<Props>()

// Copy voucher code
const copyCode = () => {
  navigator.clipboard.writeText(props.voucher.code)
}

// Format helpers
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

// Image URL helper
const getImageUrl = (url: string | undefined | null): string => {
  if (!url || url === '/images/placeholder.png') {
    return 'https://placehold.co/100x100/1a1a2e/ffffff?text=No+Image'
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return url
}
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Link href="/admin/promotions/vouchers">
          <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" size="sm" />
        </Link>
        <div>
          <div class="flex items-center gap-2">
            <code class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-lg font-mono text-primary-600 dark:text-primary-400">
              {{ voucher.code }}
            </code>
            <UButton
              icon="i-heroicons-clipboard-document"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="copyCode"
            />
          </div>
          <div class="flex items-center gap-2 mt-2">
            <PromotionStatusBadge :status="voucher.status" />
            <UBadge
              :color="voucher.type === 'free_shipping' ? 'success' : voucher.type === 'percentage' ? 'primary' : 'info'"
              variant="soft"
              size="sm"
            >
              {{ voucher.typeLabel }}
            </UBadge>
            <UBadge v-if="voucher.isPublic" color="info" variant="soft" size="sm">
              Publik
            </UBadge>
          </div>
        </div>
      </div>
      <Link :href="`/admin/promotions/vouchers/${voucher.id}/edit`">
        <UButton icon="i-heroicons-pencil" color="primary">
          Edit Voucher
        </UButton>
      </Link>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Voucher Info -->
        <UCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Voucher</h3>
          </template>

          <div class="space-y-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Nama</p>
              <p class="text-lg font-medium text-gray-900 dark:text-white">{{ voucher.name }}</p>
            </div>

            <div v-if="voucher.description">
              <p class="text-sm text-gray-500 dark:text-gray-400">Deskripsi</p>
              <p class="text-gray-900 dark:text-white">{{ voucher.description }}</p>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Nilai Voucher</p>
                <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {{ voucher.valueDisplay }}
                </p>
              </div>
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Minimal Pembelian</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ formatPrice(voucher.minPurchase) }}
                </p>
              </div>
            </div>

            <div v-if="voucher.maxDiscount" class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm text-gray-500 dark:text-gray-400">Maksimal Diskon</p>
                <p class="text-lg font-semibold text-gray-900 dark:text-white">
                  {{ formatPrice(voucher.maxDiscount) }}
                </p>
              </div>
            </div>
          </div>
        </UCard>

        <!-- Period -->
        <UCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-white">Periode</h3>
          </template>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Mulai</p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ formatDate(voucher.startDate) }}
              </p>
            </div>
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400">Tanggal Selesai</p>
              <p class="font-medium text-gray-900 dark:text-white">
                {{ formatDate(voucher.endDate) }}
              </p>
            </div>
          </div>
        </UCard>

        <!-- Products -->
        <UCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-white">
              Produk yang Berlaku
            </h3>
          </template>

          <div v-if="voucher.appliesToAll" class="text-center py-8">
            <UIcon name="i-heroicons-squares-2x2" class="w-12 h-12 text-primary-500 mx-auto mb-2" />
            <p class="text-gray-900 dark:text-white font-medium">Semua Produk</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Voucher ini berlaku untuk semua produk di toko Anda
            </p>
          </div>

          <div v-else-if="voucher.products.length > 0" class="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              v-for="product in voucher.products"
              :key="product.id"
              class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <img
                :src="getImageUrl(product.image)"
                :alt="product.name"
                class="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
              />
              <div class="flex-1 min-w-0">
                <p class="font-medium text-gray-900 dark:text-white truncate">
                  {{ product.name }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ formatPrice(product.price) }}
                </p>
              </div>
            </div>
          </div>

          <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
            <UIcon name="i-heroicons-inbox" class="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p>Tidak ada produk yang dipilih</p>
          </div>
        </UCard>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Stats -->
        <UCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-white">Statistik</h3>
          </template>

          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">Total Penggunaan</span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ voucher.usageCount }} kali
              </span>
            </div>

            <div v-if="voucher.usageLimit" class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">Batas Total</span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ voucher.usageLimit }} kali
              </span>
            </div>

            <div v-if="voucher.usageLimit" class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">Sisa Kuota</span>
              <span class="font-semibold" :class="voucher.remainingUsage && voucher.remainingUsage > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
                {{ voucher.remainingUsage }} kali
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">Batas per Customer</span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ voucher.usageLimitPerCustomer }} kali
              </span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-gray-500 dark:text-gray-400">Jumlah Produk</span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ voucher.appliesToAll ? 'Semua' : voucher.productCount }}
              </span>
            </div>
          </div>
        </UCard>

        <!-- Quick Actions -->
        <UCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-white">Aksi Cepat</h3>
          </template>

          <div class="space-y-2">
            <UButton icon="i-heroicons-clipboard-document" color="neutral" variant="soft" block @click="copyCode">
              Salin Kode
            </UButton>
            <Link :href="`/admin/promotions/vouchers/${voucher.id}/edit`" class="block">
              <UButton icon="i-heroicons-pencil" color="neutral" variant="soft" block>
                Edit Voucher
              </UButton>
            </Link>
          </div>
        </UCard>

        <!-- Timeline -->
        <UCard>
          <template #header>
            <h3 class="font-semibold text-gray-900 dark:text-white">Riwayat</h3>
          </template>

          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800">
                <UIcon name="i-heroicons-plus" class="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900 dark:text-white">Voucher dibuat</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  {{ formatDate(voucher.createdAt) }}
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>
  </div>
</template>
