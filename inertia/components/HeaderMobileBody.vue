<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { Link, router } from '@inertiajs/vue3'

interface User {
  id: number
  fullName: string
  email: string
  avatar?: string | null
}

const props = defineProps({
  isLoggedIn: { type: Boolean, default: false },
  user: { type: Object as PropType<User | null>, default: null },
  quickLinks: { type: Array as PropType<NavigationMenuItem[]>, required: true },
  categories: { type: Array as PropType<NavigationMenuItem[]>, required: true },
  searchQuery: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'update:searchQuery', value: string): void
  (e: 'logout'): void
  (e: 'close'): void
}>()

// Close menu helper - wraps navigation with menu close
const closeMenu = () => {
  emit('close')
}

// Active tab for categories/menu
const activeTab = ref<'menu' | 'categories'>('menu')

// Quick action items for logged in users
const quickActions = [
  { label: 'Dashboard', icon: 'i-heroicons-squares-2x2', to: '/dashboard', color: 'bg-primary-500' },
  { label: 'Pesanan', icon: 'i-heroicons-shopping-bag', to: '/orders', color: 'bg-blue-500' },
  { label: 'Wishlist', icon: 'i-heroicons-heart', to: '/wishlist', color: 'bg-pink-500' },
  { label: 'Keranjang', icon: 'i-heroicons-shopping-cart', to: '/cart', color: 'bg-orange-500' },
]

// Menu items for navigation
const menuItems = [
  { label: 'Best Seller', icon: 'i-heroicons-fire', to: '/best-seller', badge: 'Hot', badgeColor: 'bg-red-500' },
  { label: 'New Arrival', icon: 'i-heroicons-sparkles', to: '/new-arrival', badge: 'New', badgeColor: 'bg-green-500' },
  { label: 'Promo', icon: 'i-heroicons-tag', to: '/promo', badge: null, badgeColor: '' },
  { label: 'Blog & Tips', icon: 'i-heroicons-newspaper', to: '/blog', badge: null, badgeColor: '' },
]

// Support & info links
const supportLinks = [
  { label: 'Lacak Pesanan', icon: 'i-heroicons-map-pin', to: '/track' },
  { label: 'Pusat Bantuan', icon: 'i-heroicons-question-mark-circle', to: '/help' },
  { label: 'Hubungi Kami', icon: 'i-heroicons-chat-bubble-left-right', to: '/contact' },
]

// Handle logout
const handleLogout = () => {
  closeMenu()
  router.post('/logout', {}, {
    onSuccess: () => {
      emit('logout')
    }
  })
}
</script>

<template>
  <div class="md:hidden">
    <!-- Close Button -->
    <div class="flex justify-end mb-2">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark"
        @click="closeMenu"
        class="hover:bg-gray-100 dark:hover:bg-gray-800"
      />
    </div>

    <!-- Mobile Search Bar with vape styling -->
    <div class="mb-4 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="relative">
        <UInput
          :model-value="searchQuery"
          @update:model-value="emit('update:searchQuery', $event)"
          placeholder="Cari liquid, pod, mod..."
          icon="i-heroicons-magnifying-glass"
          size="lg"
          class="w-full"
          :ui="{
            base: 'bg-gray-100 dark:bg-gray-800/80 border-0 focus:ring-2 focus:ring-primary-500/50',
            rounded: 'rounded-xl'
          }"
        />
      </div>
    </div>

    <!-- User Section -->
    <div v-if="isLoggedIn" class="mb-4 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <!-- User Profile Card -->
      <div class="bg-linear-to-r from-primary-500/10 via-purple-500/10 to-pink-500/10 dark:from-primary-900/30 dark:via-purple-900/30 dark:to-pink-900/30 rounded-2xl p-4 mb-4">
        <div class="flex items-center gap-3">
          <div class="relative">
            <UAvatar
              :src="user?.avatar || undefined"
              :alt="user?.fullName || 'User'"
              size="lg"
              class="ring-2 ring-primary-500/50"
            />
            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-900" />
          </div>
          <div class="flex-1 min-w-0">
            <div class="font-bold text-gray-900 dark:text-white truncate">{{ user?.fullName || 'User' }}</div>
            <div class="text-xs text-gray-600 dark:text-gray-400 truncate">{{ user?.email || '' }}</div>
            <div class="mt-1 flex items-center gap-1">
              <span class="px-2 py-0.5 bg-primary-500/20 text-primary-600 dark:text-primary-400 text-xs font-medium rounded-full">
                Member
              </span>
            </div>
          </div>
          <Link href="/profile" @click="closeMenu">
            <UButton color="neutral" variant="ghost" size="sm" icon="i-heroicons-pencil-square" />
          </Link>
        </div>
      </div>

      <!-- Quick Actions Grid -->
      <div class="grid grid-cols-4 gap-2">
        <Link
          v-for="action in quickActions"
          :key="action.label"
          :href="action.to"
          @click="closeMenu"
          class="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div :class="['w-10 h-10 rounded-xl flex items-center justify-center', action.color]">
            <UIcon :name="action.icon" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xs font-medium text-gray-700 dark:text-gray-300">{{ action.label }}</span>
        </Link>
      </div>
    </div>

    <!-- Guest Auth Section -->
    <div v-else class="mb-4 pb-4 border-b border-gray-200/50 dark:border-gray-700/50">
      <div class="bg-linear-to-r from-primary-500 to-purple-600 rounded-2xl p-4 text-white">
        <div class="flex items-center gap-3 mb-3">
          <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
            <UIcon name="i-heroicons-user-circle" class="w-7 h-7" />
          </div>
          <div>
            <div class="font-bold">Selamat Datang!</div>
            <div class="text-sm text-white/80">Masuk untuk pengalaman lebih baik</div>
          </div>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <Link href="/login" @click="closeMenu">
            <UButton color="white" variant="solid" block size="sm">
              Masuk
            </UButton>
          </Link>
          <Link href="/register" @click="closeMenu">
            <UButton color="white" variant="outline" block size="sm" class="border-white/50 text-white hover:bg-white/10">
              Daftar
            </UButton>
          </Link>
        </div>
      </div>
    </div>

    <!-- Tab Navigation -->
    <div class="flex gap-2 mb-4 p-1 bg-gray-100 dark:bg-gray-800/80 rounded-xl">
      <button
        @click="activeTab = 'menu'"
        :class="[
          'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
          activeTab === 'menu'
            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400'
        ]"
      >
        <UIcon name="i-heroicons-bars-3" class="w-4 h-4 inline mr-1" />
        Menu
      </button>
      <button
        @click="activeTab = 'categories'"
        :class="[
          'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all',
          activeTab === 'categories'
            ? 'bg-white dark:bg-gray-700 text-primary-600 dark:text-primary-400 shadow-sm'
            : 'text-gray-600 dark:text-gray-400'
        ]"
      >
        <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4 inline mr-1" />
        Kategori
      </button>
    </div>

    <!-- Menu Content -->
    <div v-if="activeTab === 'menu'" class="space-y-2 mb-4">
      <Link
        v-for="item in menuItems"
        :key="item.label"
        :href="item.to"
        @click="closeMenu"
        class="flex items-center justify-between p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
      >
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-primary-500/10 dark:bg-primary-500/20 flex items-center justify-center">
            <UIcon :name="item.icon" class="w-5 h-5 text-primary-600 dark:text-primary-400" />
          </div>
          <span class="font-medium text-gray-900 dark:text-white">{{ item.label }}</span>
        </div>
        <div class="flex items-center gap-2">
          <span
            v-if="item.badge"
            :class="['px-2 py-0.5 text-xs font-bold text-white rounded-full', item.badgeColor]"
          >
            {{ item.badge }}
          </span>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
        </div>
      </Link>
    </div>

    <!-- Categories Content -->
    <div v-else class="mb-4">
      <div class="grid grid-cols-2 gap-2">
        <Link
          v-for="category in categories"
          :key="category.label"
          :href="category.to || '#'"
          @click="closeMenu"
          class="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div class="w-9 h-9 rounded-lg bg-linear-to-br from-primary-500/20 to-purple-500/20 flex items-center justify-center">
            <UIcon :name="category.icon || 'i-heroicons-cube'" class="w-4 h-4 text-primary-600 dark:text-primary-400" />
          </div>
          <span class="text-sm font-medium text-gray-900 dark:text-white truncate">{{ category.label }}</span>
        </Link>
      </div>

      <!-- View All Categories -->
      <Link href="/collections" @click="closeMenu" class="mt-3 block">
        <UButton color="primary" variant="soft" block size="sm">
          <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4 mr-2" />
          Lihat Semua Kategori
        </UButton>
      </Link>
    </div>

    <!-- Support Links -->
    <div class="mb-4 pb-4 border-t border-gray-200/50 dark:border-gray-700/50 pt-4">
      <div class="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
        Bantuan & Dukungan
      </div>
      <div class="space-y-1">
        <Link
          v-for="link in supportLinks"
          :key="link.label"
          :href="link.to"
          @click="closeMenu"
          class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
        >
          <UIcon :name="link.icon" class="w-5 h-5 text-gray-500 dark:text-gray-400" />
          <span class="text-sm text-gray-700 dark:text-gray-300">{{ link.label }}</span>
        </Link>
      </div>
    </div>

    <!-- Bottom Settings & Logout -->
    <div class="pt-4 border-t border-gray-200/50 dark:border-gray-700/50 space-y-3">
      <!-- Theme Toggle -->
      <div class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <UIcon name="i-heroicons-moon" class="w-5 h-5 text-gray-600 dark:text-gray-300" />
          </div>
          <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Mode Gelap</span>
        </div>
        <UColorModeButton color="neutral" variant="ghost" />
      </div>

      <!-- Logout Button -->
      <UButton
        v-if="isLoggedIn"
        @click="handleLogout"
        block
        color="error"
        variant="soft"
        size="lg"
        class="rounded-xl"
      >
        <UIcon name="i-heroicons-arrow-right-on-rectangle" class="w-5 h-5 mr-2" />
        Keluar dari Akun
      </UButton>

      <!-- Age Verification Notice -->
      <div class="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-3 flex items-start gap-3">
        <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
        <div class="text-xs text-amber-700 dark:text-amber-400">
          <span class="font-semibold">Peringatan:</span> Produk ini hanya untuk pengguna berusia 21 tahun ke atas.
        </div>
      </div>
    </div>
  </div>
</template>
