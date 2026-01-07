<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import { useCart } from '~/composables/use_cart'
import { useToast } from '~/composables/use_toast'

const props = defineProps<{
  isLoggedIn: boolean
}>()

const { cartItems, cartCount, isLoading, fetchCartItems, updateCartItem, removeFromCart, updateCartItemChecked } = useCart()
const toast = useToast()

const isOpen = ref(false)

// Fetch initial cart data
onMounted(async () => {
  if (props.isLoggedIn) {
    await fetchCartItems()
  }
})

// Fetch cart items when dropdown opens
watch(isOpen, async (open) => {
  if (open && props.isLoggedIn) {
    await fetchCartItems()
  }
})

const toggleSelectItem = async (id: number) => {
  const item = cartItems.value.find(i => i.id === id)
  if (!item) return

  const newChecked = !item.checked
  // Optimistic update
  item.checked = newChecked

  // Update backend
  const result = await updateCartItemChecked(id, newChecked)
  if (!result.success) {
    // Revert on failure
    item.checked = !newChecked
  }
}

const toggleSelectAll = async () => {
  const allChecked = isAllSelected.value
  const newChecked = !allChecked

  // Optimistic update
  cartItems.value.forEach(item => {
    item.checked = newChecked
  })

  // Update backend for all items
  for (const item of cartItems.value) {
    await updateCartItemChecked(item.id, newChecked)
  }
}

const isAllSelected = computed(() => {
  return cartItems.value.length > 0 && cartItems.value.every(item => item.checked)
})

const selectedCartItems = computed(() => {
  return cartItems.value.filter(item => item.checked)
})

const subtotal = computed(() => {
  return selectedCartItems.value.reduce((sum, item) => {
    const price = item.variant?.price || item.product.discountPrice || item.product.price
    return sum + (price * item.quantity)
  }, 0)
})

const checkedCount = computed(() => {
  return cartItems.value.filter(item => item.checked).length
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

const getItemPrice = (item: typeof cartItems.value[0]) => {
  return item.variant?.price || item.product.discountPrice || item.product.price
}

const handleUpdateQuantity = async (id: number, quantity: number) => {
  if (quantity < 1) return
  const result = await updateCartItem(id, quantity)
  if (!result.success) {
    toast.error(result.message || 'Gagal mengupdate quantity')
  }
}

const handleRemoveItem = async (id: number) => {
  const result = await removeFromCart(id)
  if (result.success) {
    toast.success('Item dihapus dari keranjang')
  } else {
    toast.error(result.message || 'Gagal menghapus item')
  }
}
</script>

<template>
  <UPopover v-model:open="isOpen" :ui="{ content: 'w-96 max-h-[80vh] z-[200]' }">
    <UButton color="neutral" variant="ghost" class="relative">
      <UIcon name="i-heroicons-shopping-cart" class="w-5 h-5" />
      <UBadge
        v-if="cartCount > 0"
        :label="cartCount.toString()"
        color="primary"
        class="absolute -top-1 -right-1 min-w-4.5 h-4.5 text-[10px]"
      />
    </UButton>

    <template #content>
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">Keranjang Belanja</h3>
          <span class="text-sm text-gray-500">{{ cartCount }} item</span>
        </div>

        <!-- Not logged in -->
        <div v-if="!isLoggedIn" class="text-center py-8">
          <UIcon name="i-heroicons-shopping-cart" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p class="text-gray-500 mb-4">Silakan login untuk melihat keranjang</p>
          <UButton to="/login" color="primary" size="sm">Masuk</UButton>
        </div>

        <!-- Empty cart -->
        <div v-else-if="cartItems.length === 0" class="text-center py-8">
          <UIcon name="i-heroicons-shopping-cart" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p class="text-gray-500">Keranjang kosong</p>
        </div>

        <!-- Cart items -->
        <div v-else>
          <!-- Select all -->
          <div class="flex items-center gap-2 pb-3 border-b border-gray-200 dark:border-gray-700">
            <UCheckbox
              :model-value="isAllSelected"
              @update:model-value="toggleSelectAll"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">Pilih Semua</span>
          </div>

          <!-- Items list -->
          <div class="max-h-64 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="item in cartItems"
              :key="item.id"
              class="py-3 flex gap-3"
            >
              <UCheckbox
                :model-value="item.checked"
                @update:model-value="toggleSelectItem(item.id)"
                class="mt-2"
              />
              <img
                :src="item.product.images[0]?.url || '/placeholder.png'"
                :alt="item.product.name"
                class="w-16 h-16 object-cover rounded-lg shrink-0"
              />
              <div class="flex-1 min-w-0">
                <a
                  :href="`/products/${item.product.slug}`"
                  class="text-sm font-medium text-gray-900 dark:text-white hover:text-primary-600 line-clamp-2"
                >
                  {{ item.product.name }}
                </a>
                <p v-if="item.variant" class="text-xs text-gray-500 mt-0.5">
                  {{ item.variant.name }}
                </p>
                <p class="text-sm font-semibold text-primary-600 mt-1">
                  {{ formatPrice(getItemPrice(item)) }}
                </p>
                <div class="flex items-center gap-2 mt-2">
                  <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded">
                    <button
                      type="button"
                      class="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      :disabled="isLoading || item.quantity <= 1"
                      @click="handleUpdateQuantity(item.id, item.quantity - 1)"
                    >
                      <UIcon name="i-heroicons-minus" class="w-3 h-3" />
                    </button>
                    <span class="px-2 text-sm min-w-8 text-center">{{ item.quantity }}</span>
                    <button
                      type="button"
                      class="px-2 py-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      :disabled="isLoading"
                      @click="handleUpdateQuantity(item.id, item.quantity + 1)"
                    >
                      <UIcon name="i-heroicons-plus" class="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    type="button"
                    class="text-red-500 hover:text-red-600 p-1"
                    :disabled="isLoading"
                    @click="handleRemoveItem(item.id)"
                  >
                    <UIcon name="i-heroicons-trash" class="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div class="pt-4 border-t border-gray-200 dark:border-gray-700 mt-2">
            <div class="flex items-center justify-between mb-3">
              <span class="text-sm text-gray-600 dark:text-gray-400">
                Subtotal ({{ checkedCount }} item)
              </span>
              <span class="font-semibold text-gray-900 dark:text-white">
                {{ formatPrice(subtotal) }}
              </span>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <UButton
                to="/cart"
                color="neutral"
                variant="outline"
                block
                @click="isOpen = false"
              >
                Lihat Keranjang
              </UButton>
              <UButton
                to="/checkout"
                color="primary"
                block
                :disabled="checkedCount === 0"
                @click="isOpen = false"
              >
                Checkout
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
