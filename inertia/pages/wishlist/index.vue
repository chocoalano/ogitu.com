<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import AppLayout from '~/layouts/default.vue'

interface Product {
  id: number
  name: string
  slug: string
  price: number
  discountPrice: number | null
  stock: number
  status: string
  image: string
}

interface WishlistItem {
  id: number
  productId: number
  product: Product
  createdAt: string
}

const props = defineProps<{
  items: WishlistItem[]
  totalItems: number
}>()

// Local state
const wishlistItems = ref<WishlistItem[]>([...props.items])
const selectedItems = ref<number[]>([])
const isDeleting = ref<number | null>(null)
const isMovingToCart = ref<number | null>(null)
const isBulkMoving = ref(false)

// Format currency
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// Calculate discount percentage
const getDiscountPercentage = (price: number, discountPrice: number) => {
  return Math.round(((price - discountPrice) / price) * 100)
}

// Get XSRF token
const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// Check if all items selected
const isAllSelected = computed(() => {
  return wishlistItems.value.length > 0 && selectedItems.value.length === wishlistItems.value.length
})

// Toggle select all
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = []
  } else {
    selectedItems.value = wishlistItems.value.map((item) => item.productId)
  }
}

// Toggle single item selection
const toggleSelect = (productId: number) => {
  const index = selectedItems.value.indexOf(productId)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(productId)
  }
}

// Delete single item
const deleteItem = async (productId: number) => {
  if (isDeleting.value) return

  isDeleting.value = productId
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/api/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
    })
    const data = await response.json()
    if (data.success) {
      wishlistItems.value = wishlistItems.value.filter((item) => item.productId !== productId)
      selectedItems.value = selectedItems.value.filter((id) => id !== productId)
    } else {
      alert(data.message || 'Gagal menghapus dari wishlist')
    }
  } catch (error) {
    console.error('Failed to delete from wishlist:', error)
    alert('Terjadi kesalahan saat menghapus dari wishlist')
  } finally {
    isDeleting.value = null
  }
}

// Move single item to cart
const moveToCart = async (productId: number) => {
  if (isMovingToCart.value) return

  isMovingToCart.value = productId
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/api/wishlist/${productId}/move-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      body: JSON.stringify({ quantity: 1 }),
    })
    const data = await response.json()
    if (data.success) {
      wishlistItems.value = wishlistItems.value.filter((item) => item.productId !== productId)
      selectedItems.value = selectedItems.value.filter((id) => id !== productId)
      // Show success toast or notification
      alert('Produk berhasil dipindahkan ke keranjang')
    } else {
      alert(data.message || 'Gagal memindahkan ke keranjang')
    }
  } catch (error) {
    console.error('Failed to move to cart:', error)
    alert('Terjadi kesalahan saat memindahkan ke keranjang')
  } finally {
    isMovingToCart.value = null
  }
}

// Move selected items to cart
const moveSelectedToCart = async () => {
  if (isBulkMoving.value || selectedItems.value.length === 0) return

  isBulkMoving.value = true
  const xsrfToken = getXsrfToken()
  const errors: string[] = []

  for (const productId of selectedItems.value) {
    try {
      const response = await fetch(`/api/wishlist/${productId}/move-to-cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        body: JSON.stringify({ quantity: 1 }),
      })
      const data = await response.json()
      if (data.success) {
        wishlistItems.value = wishlistItems.value.filter((item) => item.productId !== productId)
      } else {
        const item = wishlistItems.value.find((i) => i.productId === productId)
        errors.push(`${item?.product.name}: ${data.message}`)
      }
    } catch (error) {
      console.error('Failed to move to cart:', error)
    }
  }

  selectedItems.value = []
  isBulkMoving.value = false

  if (errors.length > 0) {
    alert(`Beberapa produk gagal dipindahkan:\n${errors.join('\n')}`)
  } else {
    alert('Semua produk terpilih berhasil dipindahkan ke keranjang')
  }
}

// Delete selected items
const deleteSelected = async () => {
  if (selectedItems.value.length === 0) return

  if (!confirm(`Hapus ${selectedItems.value.length} item dari wishlist?`)) return

  const xsrfToken = getXsrfToken()
  for (const productId of selectedItems.value) {
    try {
      await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
      })
      wishlistItems.value = wishlistItems.value.filter((item) => item.productId !== productId)
    } catch (error) {
      console.error('Failed to delete from wishlist:', error)
    }
  }
  selectedItems.value = []
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Wishlist - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-125 h-125 bg-pink-500/10 rounded-full blur-3xl" />
      <div class="absolute top-1/3 right-1/4 w-100 h-100 bg-purple-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 left-1/2 w-150 h-75 bg-primary-500/5 rounded-full blur-3xl" />
    </div>

    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Breadcrumb -->
      <nav class="flex items-center gap-2 text-sm mb-6">
        <Link href="/" class="text-gray-500 hover:text-primary-500 transition-colors">
          <UIcon name="i-heroicons-home" class="w-4 h-4" />
        </Link>
        <UIcon name="i-heroicons-chevron-right" class="w-4 h-4 text-gray-400" />
        <span class="text-gray-900 dark:text-white font-medium">Wishlist</span>
      </nav>

      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 flex items-center justify-center">
              <UIcon name="i-heroicons-heart-solid" class="w-6 h-6 text-white" />
            </div>
            Wishlist Saya
          </h1>
          <p class="text-gray-500 dark:text-gray-400 mt-2">
            {{ wishlistItems.length }} produk favorit tersimpan
          </p>
        </div>

        <!-- Bulk Actions -->
        <div v-if="wishlistItems.length > 0" class="flex items-center gap-3">
          <UButton
            v-if="selectedItems.length > 0"
            color="primary"
            variant="soft"
            :loading="isBulkMoving"
            @click="moveSelectedToCart"
          >
            <UIcon name="i-heroicons-shopping-cart" class="w-4 h-4 mr-2" />
            Pindahkan ke Keranjang ({{ selectedItems.length }})
          </UButton>
          <UButton
            v-if="selectedItems.length > 0"
            color="red"
            variant="soft"
            @click="deleteSelected"
          >
            <UIcon name="i-heroicons-trash" class="w-4 h-4 mr-2" />
            Hapus ({{ selectedItems.length }})
          </UButton>
        </div>
      </div>

      <!-- Wishlist Content -->
      <div v-if="wishlistItems.length > 0">
        <!-- Select All -->
        <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-4 mb-4">
          <label class="flex items-center gap-3 cursor-pointer">
            <UCheckbox :model-value="isAllSelected" @update:model-value="toggleSelectAll" />
            <span class="font-medium text-gray-700 dark:text-gray-300">
              Pilih Semua ({{ wishlistItems.length }} produk)
            </span>
          </label>
        </div>

        <!-- Wishlist Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <div
            v-for="item in wishlistItems"
            :key="item.id"
            class="group bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden hover:shadow-xl transition-all duration-300"
            :class="{ 'ring-2 ring-primary-500': selectedItems.includes(item.productId) }"
          >
            <!-- Product Image -->
            <div class="relative aspect-square bg-gray-100 dark:bg-gray-700 overflow-hidden">
              <Link :href="`/products/${item.product.slug}`">
                <img
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>

              <!-- Select Checkbox -->
              <div class="absolute top-3 left-3">
                <div
                  class="w-8 h-8 rounded-lg bg-white/90 dark:bg-gray-800/90 flex items-center justify-center cursor-pointer backdrop-blur-sm"
                  @click="toggleSelect(item.productId)"
                >
                  <UCheckbox :model-value="selectedItems.includes(item.productId)" />
                </div>
              </div>

              <!-- Discount Badge -->
              <div
                v-if="item.product.discountPrice"
                class="absolute top-3 right-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg"
              >
                -{{ getDiscountPercentage(item.product.price, item.product.discountPrice) }}%
              </div>

              <!-- Out of Stock Overlay -->
              <div
                v-if="item.product.stock <= 0 || item.product.status !== 'active'"
                class="absolute inset-0 bg-black/50 flex items-center justify-center"
              >
                <span class="px-4 py-2 bg-gray-900/80 text-white text-sm font-medium rounded-lg">
                  Stok Habis
                </span>
              </div>

              <!-- Quick Actions -->
              <div class="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <UButton
                  color="primary"
                  size="sm"
                  class="flex-1"
                  :loading="isMovingToCart === item.productId"
                  :disabled="item.product.stock <= 0 || item.product.status !== 'active'"
                  @click="moveToCart(item.productId)"
                >
                  <UIcon name="i-heroicons-shopping-cart" class="w-4 h-4 mr-1" />
                  Keranjang
                </UButton>
                <UButton
                  color="red"
                  variant="soft"
                  size="sm"
                  square
                  :loading="isDeleting === item.productId"
                  @click="deleteItem(item.productId)"
                >
                  <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                </UButton>
              </div>
            </div>

            <!-- Product Info -->
            <div class="p-4">
              <!-- Product Name -->
              <Link :href="`/products/${item.product.slug}`">
                <h3 class="font-medium text-gray-900 dark:text-white line-clamp-2 hover:text-primary-500 transition-colors mb-2">
                  {{ item.product.name }}
                </h3>
              </Link>

              <!-- Price -->
              <div class="flex items-center gap-2">
                <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
                  {{ formatPrice(item.product.discountPrice || item.product.price) }}
                </span>
                <span v-if="item.product.discountPrice" class="text-sm text-gray-400 line-through">
                  {{ formatPrice(item.product.price) }}
                </span>
              </div>

              <!-- Stock Info -->
              <p
                class="text-xs mt-2"
                :class="item.product.stock > 0 ? 'text-emerald-500' : 'text-red-500'"
              >
                {{ item.product.stock > 0 ? `Stok: ${item.product.stock}` : 'Stok Habis' }}
              </p>

              <!-- Mobile Actions -->
              <div class="flex gap-2 mt-4 sm:hidden">
                <UButton
                  color="primary"
                  size="sm"
                  class="flex-1"
                  :loading="isMovingToCart === item.productId"
                  :disabled="item.product.stock <= 0 || item.product.status !== 'active'"
                  @click="moveToCart(item.productId)"
                >
                  <UIcon name="i-heroicons-shopping-cart" class="w-4 h-4 mr-1" />
                  Keranjang
                </UButton>
                <UButton
                  color="red"
                  variant="soft"
                  size="sm"
                  square
                  :loading="isDeleting === item.productId"
                  @click="deleteItem(item.productId)"
                >
                  <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="relative inline-block mb-6">
          <div class="w-32 h-32 rounded-3xl bg-linear-to-br from-pink-500/20 to-rose-500/20 flex items-center justify-center">
            <UIcon name="i-heroicons-heart" class="w-16 h-16 text-pink-500" />
          </div>
          <!-- Floating hearts animation -->
          <div class="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-pink-500/20 flex items-center justify-center animate-bounce">
            <UIcon name="i-heroicons-heart-solid" class="w-4 h-4 text-pink-500" />
          </div>
          <div class="absolute -bottom-1 -left-3 w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center animate-bounce delay-150">
            <UIcon name="i-heroicons-heart-solid" class="w-3 h-3 text-rose-500" />
          </div>
        </div>

        <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Wishlist Masih Kosong
        </h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-md mx-auto mb-8">
          Simpan produk vape favoritmu di sini untuk memudahkan kamu menemukan dan membeli nanti.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/collections">
            <UButton color="primary" size="lg">
              <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 mr-2" />
              Mulai Belanja
            </UButton>
          </Link>
          <Link href="/dashboard">
            <UButton variant="ghost" color="neutral" size="lg">
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
              Kembali ke Dashboard
            </UButton>
          </Link>
        </div>

        <!-- Vape Tips -->
        <div class="mt-16 max-w-2xl mx-auto">
          <div class="bg-linear-to-r from-pink-500/10 via-purple-500/10 to-primary-500/10 rounded-2xl p-6 border border-pink-500/20">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 rounded-xl bg-linear-to-br from-pink-500 to-purple-500 flex items-center justify-center shrink-0">
                <UIcon name="i-heroicons-light-bulb" class="w-6 h-6 text-white" />
              </div>
              <div class="text-left">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Tips Belanja Vape</h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  Gunakan wishlist untuk membandingkan produk sebelum membeli. Kamu juga bisa mendapat notifikasi ketika ada diskon pada produk di wishlist-mu!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.delay-150 {
  animation-delay: 150ms;
}
</style>
