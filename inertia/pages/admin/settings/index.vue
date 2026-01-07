<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'

defineOptions({
  layout: AdminLayout,
})

interface Admin {
  id: number
  storeName: string
  slug: string
  logo: string | null
  status: string
  rating: number
  totalReviews: number
  totalSales: number
}

const props = withDefaults(defineProps<{
  admin?: Admin
}>(), {
  admin: () => ({ id: 0, storeName: '', slug: '', logo: null, status: '', rating: 0, totalReviews: 0, totalSales: 0 }),
})

// Settings menu items
const settingsMenu = [
  {
    title: 'Profil Toko',
    description: 'Kelola informasi toko, logo, banner, dan alamat pickup',
    icon: 'i-heroicons-building-storefront',
    href: '/admin/settings/profile',
    color: 'primary',
  },
  {
    title: 'Pengiriman',
    description: 'Atur kurir dan opsi pengiriman yang tersedia',
    icon: 'i-heroicons-truck',
    href: '/admin/settings/shipping',
    color: 'emerald',
    comingSoon: true,
  },
  {
    title: 'Pembayaran',
    description: 'Kelola metode pembayaran dan rekening bank',
    icon: 'i-heroicons-credit-card',
    href: '/admin/settings/payment',
    color: 'amber',
    comingSoon: true,
  },
  {
    title: 'Notifikasi',
    description: 'Atur preferensi notifikasi pesanan dan chat',
    icon: 'i-heroicons-bell',
    href: '/admin/settings/notifications',
    color: 'violet',
    comingSoon: true,
  },
  {
    title: 'Keamanan',
    description: 'Ubah password dan pengaturan keamanan akun',
    icon: 'i-heroicons-shield-check',
    href: '/admin/settings/security',
    color: 'rose',
    comingSoon: true,
  },
  {
    title: 'Kebijakan Toko',
    description: 'Atur kebijakan pengembalian dan garansi produk',
    icon: 'i-heroicons-document-text',
    href: '/admin/settings/policies',
    color: 'cyan',
    comingSoon: true,
  },
]
</script>

<template>
  <Head title="Pengaturan Toko" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Kelola pengaturan toko {{ props.admin.storeName }}
        </p>
      </div>
    </div>

    <!-- Settings Grid -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <template v-for="item in settingsMenu" :key="item.href">
        <!-- Active Menu Item -->
        <ULink
          v-if="!item.comingSoon"
          :to="item.href"
          class="group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"
              :class="{
                'bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400':
                  item.color === 'primary',
                'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400':
                  item.color === 'emerald',
                'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400':
                  item.color === 'amber',
                'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400':
                  item.color === 'violet',
                'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400':
                  item.color === 'rose',
                'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400':
                  item.color === 'cyan',
              }"
            >
              <UIcon :name="item.icon" class="h-6 w-6" />
            </div>
            <div class="flex-1">
              <h3
                class="font-semibold text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"
              >
                {{ item.title }}
              </h3>
              <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {{ item.description }}
              </p>
            </div>
            <UIcon
              name="i-heroicons-chevron-right"
              class="h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-500"
            />
          </div>
        </ULink>

        <!-- Coming Soon Item -->
        <div
          v-else
          class="relative flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6 opacity-60 dark:border-gray-700 dark:bg-gray-800/50"
        >
          <div class="flex items-start gap-4">
            <div
              class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
            >
              <UIcon :name="item.icon" class="h-6 w-6" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2">
                <h3 class="font-semibold text-gray-600 dark:text-gray-400">
                  {{ item.title }}
                </h3>
                <UBadge color="gray" variant="subtle" size="xs"> Segera Hadir </UBadge>
              </div>
              <p class="mt-1 text-sm text-gray-400 dark:text-gray-500">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Store Quick Stats -->
    <UCard>
      <template #header>
        <div class="flex items-center gap-2">
          <UIcon name="i-heroicons-chart-bar" class="h-5 w-5 text-gray-500" />
          <h3 class="font-semibold text-gray-900 dark:text-white">Ringkasan Toko</h3>
        </div>
      </template>

      <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div class="text-center">
          <p class="text-2xl font-bold text-primary-600 dark:text-primary-400">
            {{ Number(props.admin.rating || 0).toFixed(1) }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Rating</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {{ props.admin.totalReviews || 0 }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Ulasan</p>
        </div>
        <div class="text-center">
          <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">
            {{ props.admin.totalSales || 0 }}
          </p>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Penjualan</p>
        </div>
        <div class="text-center">
          <UBadge
            :color="props.admin.status === 'active' ? 'success' : 'warning'"
            variant="subtle"
            size="lg"
          >
            {{ props.admin.status === 'active' ? 'Aktif' : 'Tidak Aktif' }}
          </UBadge>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Status</p>
        </div>
      </div>
    </UCard>
  </div>
</template>
