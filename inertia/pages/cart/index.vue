<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head, router, Link } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'
import { useCart } from '~/composables/use_cart'
import { useToast } from '~/composables/use_toast'

interface CartItemProduct {
  id: number
  name: string
  slug: string
  price: number
  discountPrice: number | null
  stock: number
  image: string
}

interface CartItemVariant {
  id: number
  name: string
  value: string
  price: number
  stock: number
}

interface CartItem {
  id: number
  productId: number
  variantId: number | null
  quantity: number
  checked: boolean
  product: CartItemProduct
  variant: CartItemVariant | null
  itemPrice: number
}

interface CartSummary {
  totalItems: number
  checkedItems: number
  subtotal: number
  totalQuantity: number
}

const props = defineProps<{
  cartItems: CartItem[]
  summary: CartSummary
}>()

const { updateCartItem, removeFromCart, fetchCartItems } = useCart()
const toast = useToast()

// Local state
const items = ref<CartItem[]>([...props.cartItems])
const isUpdating = ref<number | null>(null)
const isDeleting = ref<number | null>(null)
const selectedIds = ref<Set<number>>(new Set(props.cartItems.filter(i => i.checked).map(i => i.id)))

// Computed
const isAllSelected = computed(() => {
  return items.value.length > 0 && selectedIds.value.size === items.value.length
})

const selectedItems = computed(() => {
  return items.value.filter(item => selectedIds.value.has(item.id))
})

const localSummary = computed(() => {
  const checked = selectedItems.value
  return {
    totalItems: items.value.length,
    checkedItems: checked.length,
    subtotal: checked.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0),
    totalQuantity: checked.reduce((sum, item) => sum + item.quantity, 0),
  }
})

// Helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// Actions
const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedIds.value = new Set()
  } else {
    selectedIds.value = new Set(items.value.map(i => i.id))
  }
  // Update checked status in backend
  updateAllCheckedStatus()
}

const toggleSelectItem = async (id: number) => {
  const newSet = new Set(selectedIds.value)
  if (newSet.has(id)) {
    newSet.delete(id)
  } else {
    newSet.add(id)
  }
  selectedIds.value = newSet

  // Update checked status in backend
  try {
    const xsrfToken = getXsrfToken()
    await fetch(`/api/cart/${id}/checked`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      credentials: 'include',
      body: JSON.stringify({ checked: newSet.has(id) }),
    })
  } catch {
    // Silently fail
  }
}

const updateAllCheckedStatus = async () => {
  try {
    const xsrfToken = getXsrfToken()
    for (const item of items.value) {
      await fetch(`/api/cart/${item.id}/checked`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ checked: selectedIds.value.has(item.id) }),
      })
    }
  } catch {
    // Silently fail
  }
}

const handleUpdateQuantity = async (item: CartItem, newQuantity: number) => {
  if (newQuantity < 1) return

  const maxStock = item.variant?.stock ?? item.product.stock
  if (newQuantity > maxStock) {
    toast.error(`Stok tidak mencukupi. Tersedia: ${maxStock}`)
    return
  }

  isUpdating.value = item.id
  const result = await updateCartItem(item.id, newQuantity)

  if (result.success) {
    // Update local state
    const idx = items.value.findIndex(i => i.id === item.id)
    if (idx !== -1) {
      items.value[idx].quantity = newQuantity
    }
  } else {
    toast.error(result.message || 'Gagal mengupdate quantity')
  }
  isUpdating.value = null
}

const handleRemoveItem = async (id: number) => {
  isDeleting.value = id
  const result = await removeFromCart(id)

  if (result.success) {
    items.value = items.value.filter(i => i.id !== id)
    selectedIds.value.delete(id)
    toast.success('Item dihapus dari keranjang')
  } else {
    toast.error(result.message || 'Gagal menghapus item')
  }
  isDeleting.value = null
}

const handleBulkDelete = async () => {
  if (selectedIds.value.size === 0) {
    toast.warning('Pilih item yang ingin dihapus')
    return
  }

  const ids = Array.from(selectedIds.value)
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch('/api/cart/bulk-delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      credentials: 'include',
      body: JSON.stringify({ ids }),
    })

    const data = await response.json()
    if (data.success) {
      items.value = items.value.filter(i => !ids.includes(i.id))
      selectedIds.value = new Set()
      toast.success(`${data.data.deletedCount} item dihapus`)
      await fetchCartItems()
    } else {
      toast.error(data.message || 'Gagal menghapus item')
    }
  } catch {
    toast.error('Terjadi kesalahan')
  }
}

const handleCheckout = () => {
  if (selectedIds.value.size === 0) {
    toast.warning('Pilih item untuk checkout')
    return
  }
  router.visit('/checkout')
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Keranjang Belanja" />

  <div class="container mx-auto px-4 py-8">
    <!-- Breadcrumb -->
    <nav class="mb-6">
      <ol class="flex items-center gap-2 text-sm">
        <li>
          <Link href="/" class="text-gray-500 hover:text-primary-600">Beranda</Link>
        </li>
        <li class="text-gray-400">/</li>
        <li class="text-gray-900 dark:text-white font-medium">Keranjang</li>
      </ol>
    </nav>

    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Keranjang Belanja</h1>

    <div v-if="items.length === 0" class="text-center py-16">
      <UIcon name="i-heroicons-shopping-cart" class="w-20 h-20 text-gray-300 mx-auto mb-4" />
      <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">Keranjang Kosong</h2>
      <p class="text-gray-500 mb-6">Belum ada produk di keranjang Anda</p>
      <UButton to="/" color="primary">Mulai Belanja</UButton>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Select All Header -->
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <UCheckbox :model-value="isAllSelected" @update:model-value="toggleSelectAll" />
              <span class="font-medium text-gray-900 dark:text-white">
                Pilih Semua ({{ items.length }} produk)
              </span>
            </div>
            <UButton
              v-if="selectedIds.size > 0"
              color="red"
              variant="ghost"
              size="sm"
              @click="handleBulkDelete"
            >
              Hapus ({{ selectedIds.size }})
            </UButton>
          </div>
        </div>

        <!-- Cart Items List -->
        <div
          v-for="item in items"
          :key="item.id"
          class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
        >
          <div class="flex gap-4">
            <!-- Checkbox -->
            <div class="flex items-start pt-2">
              <UCheckbox
                :model-value="selectedIds.has(item.id)"
                @update:model-value="toggleSelectItem(item.id)"
              />
            </div>

            <!-- Product Image -->
            <Link :href="`/products/${item.product.slug}`" class="shrink-0">
              <img
                :src="item.product.image"
                :alt="item.product.name"
                class="w-24 h-24 object-cover rounded-lg"
              />
            </Link>

            <!-- Product Info -->
            <div class="flex-1 min-w-0">
              <!-- Product Name -->
              <Link
                :href="`/products/${item.product.slug}`"
                class="font-medium text-gray-900 dark:text-white hover:text-primary-600 line-clamp-2"
              >
                {{ item.product.name }}
              </Link>

              <!-- Variant -->
              <p v-if="item.variant" class="text-sm text-gray-500 mt-1">
                {{ item.variant.name }}: {{ item.variant.value }}
              </p>

              <!-- Price -->
              <div class="mt-2">
                <span class="font-semibold text-primary-600">
                  {{ formatPrice(item.itemPrice) }}
                </span>
                <span
                  v-if="item.product.discountPrice"
                  class="text-sm text-gray-400 line-through ml-2"
                >
                  {{ formatPrice(item.product.price) }}
                </span>
              </div>

              <!-- Quantity & Delete -->
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center gap-3">
                  <!-- Quantity Controls -->
                  <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      type="button"
                      class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-lg disabled:opacity-50"
                      :disabled="isUpdating === item.id || item.quantity <= 1"
                      @click="handleUpdateQuantity(item, item.quantity - 1)"
                    >
                      <UIcon name="i-heroicons-minus" class="w-4 h-4" />
                    </button>
                    <span class="px-4 py-2 min-w-12 text-center font-medium">
                      {{ item.quantity }}
                    </span>
                    <button
                      type="button"
                      class="px-3 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg disabled:opacity-50"
                      :disabled="isUpdating === item.id"
                      @click="handleUpdateQuantity(item, item.quantity + 1)"
                    >
                      <UIcon name="i-heroicons-plus" class="w-4 h-4" />
                    </button>
                  </div>

                  <!-- Stock info -->
                  <span class="text-xs text-gray-500">
                    Stok: {{ item.variant?.stock ?? item.product.stock }}
                  </span>
                </div>

                <!-- Delete Button -->
                <UButton
                  color="red"
                  variant="ghost"
                  size="sm"
                  :loading="isDeleting === item.id"
                  @click="handleRemoveItem(item.id)"
                >
                  <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Summary Sidebar -->
      <div class="lg:col-span-1">
        <div class="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24">
          <h2 class="font-semibold text-lg text-gray-900 dark:text-white mb-4">Ringkasan Belanja</h2>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Total Produk</span>
              <span>{{ localSummary.checkedItems }} item</span>
            </div>
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Total Quantity</span>
              <span>{{ localSummary.totalQuantity }}</span>
            </div>
            <USeparator />
            <div class="flex justify-between text-lg font-semibold text-gray-900 dark:text-white">
              <span>Subtotal</span>
              <span class="text-primary-600">{{ formatPrice(localSummary.subtotal) }}</span>
            </div>
          </div>

          <UButton
            color="primary"
            block
            size="lg"
            class="mt-6"
            :disabled="selectedIds.size === 0"
            @click="handleCheckout"
          >
            Checkout ({{ selectedIds.size }})
          </UButton>

          <p class="text-xs text-gray-500 text-center mt-3">
            Ongkos kirim dihitung saat checkout
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
