<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'
import { ref, computed, onMounted, watch } from 'vue'
import { usePage, router } from '@inertiajs/vue3'
import Topbar from './Topbar.vue'
import BannerInfo from './BannerInfo.vue'
import HeaderMobileBody from '~/components/HeaderMobileBody.vue'
import SecondaryNav from '~/components/SecondaryNav.vue'
import HeaderActions from '~/components/HeaderActions.vue'
import SearchBar from '~/components/SearchBar.vue'
import ImpersonationBanner from '~/components/ImpersonationBanner.vue'
import { useCart } from '~/composables/use_cart'
import { useWishlist } from '~/composables/use_wishlist'

const page = usePage()
const searchQuery = ref('')
const isMobileMenuOpen = ref(false)
const { fetchCartItems } = useCart()
const { fetchWishlistItems } = useWishlist()

// Close mobile menu
const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Auth state from shared props
const auth = computed(() => (page.props as any).auth || { isLoggedIn: false, user: null })
const isLoggedIn = computed(() => auth.value.isLoggedIn)
const currentUser = computed(() => auth.value.user)

// Fetch cart and wishlist counts when logged in
onMounted(() => {
  if (isLoggedIn.value) {
    fetchCartItems()
    fetchWishlistItems()
  }
})

// Watch for auth changes
watch(isLoggedIn, (loggedIn) => {
  if (loggedIn) {
    fetchCartItems()
    fetchWishlistItems()
  }
})

// Main categories from shared data
const categories = computed<NavigationMenuItem[]>(() => {
  const navCategories = page.props.navCategories as Array<{ label: string; to: string; icon: string }> | undefined
  return navCategories || []
})

// Quick links
const quickLinks = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Artikel',
    to: '/artikel',
    icon: 'i-heroicons-fire',
    badge: { label: 'Hot', color: 'error' as const }
  },
  {
    label: 'Best Seller',
    to: '/best-seller',
    icon: 'i-heroicons-trophy'
  },
  {
    label: 'New Arrival',
    to: '/new-arrival',
    icon: 'i-heroicons-sparkles',
    badge: { label: 'New', color: 'success' as const }
  }
])

// User menu items
const userMenuItems = computed(() => [
  [
    { label: 'Dashboard', icon: 'i-heroicons-squares-2x2', to: '/dashboard' },
    { label: 'Pesanan Saya', icon: 'i-heroicons-shopping-bag', to: '/orders' },
    { label: 'Wishlist', icon: 'i-heroicons-heart', to: '/wishlist' }
  ],
  [
    { label: 'Profil Saya', icon: 'i-heroicons-user-circle', to: '/profile' },
    { label: 'Alamat', icon: 'i-heroicons-map-pin', to: '/dashboard' }
  ],
  [
    { label: 'Logout', icon: 'i-heroicons-arrow-right-on-rectangle', onSelect: logout }
  ]
])

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    window.location.href = `/products?search=${encodeURIComponent(searchQuery.value)}`
  }
}

const logout = () => {
  router.post('/logout', {}, {
    onSuccess: () => {
      // Page will reload with updated auth state
    }
  })
}
</script>

<template>
  <div class="relative z-50">
    <!-- Impersonation Banner -->
    <ImpersonationBanner />

    <!-- Top Bar -->
    <Topbar />

    <!-- Main Header with glassmorphism matching global background -->
    <UHeader v-model:open="isMobileMenuOpen" title="OGITU Vape Marketplace" class="sticky top-0 z-50 bg-linear-to-r from-gray-50/90 via-primary-50/80 to-gray-50/90 dark:from-gray-950/90 dark:via-black/80 dark:to-gray-950/90 backdrop-blur-xl border-b border-primary-200/30 dark:border-white/10 shadow-lg shadow-primary-500/5 dark:shadow-primary-500/10">
      <!-- Logo -->
      <template #title>
        <div class="flex items-center gap-2">
          <div
            class="w-10 h-10 bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/30">
            <UIcon name="i-heroicons-bolt" class="w-6 h-6 text-white" />
          </div>
          <div class="hidden sm:block">
            <div class="text-lg font-bold text-gray-900 dark:text-white">ogitu.com</div>
            <div class="text-xs text-gray-600 dark:text-gray-400">Vape Marketplace</div>
          </div>
        </div>
      </template>

      <!-- Center Content - Search Bar -->
      <div class="w-full">
        <SearchBar :model-value="searchQuery" @update:model-value="(v: string) => (searchQuery = v)"
          placeholder="Cari produk, brand, atau kategori..." size="lg" :show-submit="false" @submit="handleSearch" />
      </div>

      <!-- Right Actions -->
      <template #right>
        <HeaderActions :is-logged-in="isLoggedIn" :user="currentUser" :user-menu-items="userMenuItems"
          @logout="logout" />
      </template>

      <!-- Mobile Menu Body -->
      <template #body>
        <HeaderMobileBody :is-logged-in="isLoggedIn" :user="currentUser" :quick-links="quickLinks" :categories="categories"
          :search-query="searchQuery" @update:search-query="(v: string) => (searchQuery = v)" @logout="logout" @close="closeMobileMenu" />
      </template>
    </UHeader>

    <!-- Secondary Navigation - Categories & Quick Links -->
    <SecondaryNav :categories="categories" :quick-links="quickLinks" />
    <BannerInfo />
  </div>
</template>
