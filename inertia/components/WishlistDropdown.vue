<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useWishlist } from '~/composables/use_wishlist'
import { useCart } from '~/composables/use_cart'
import { useToast } from '~/composables/use_toast'

const props = defineProps<{
  isLoggedIn: boolean
}>()

const { wishlistItems, wishlistCount, isLoading: wishlistLoading, fetchWishlistItems, removeFromWishlist } = useWishlist()
const { addToCart, isLoading: cartLoading } = useCart()
const toast = useToast()

const isOpen = ref(false)
const addingToCart = ref<number | null>(null)

// Fetch initial wishlist data
onMounted(async () => {
  if (props.isLoggedIn) {
    await fetchWishlistItems()
  }
})

// Fetch wishlist items when dropdown opens
watch(isOpen, async (open) => {
  if (open && props.isLoggedIn) {
    await fetchWishlistItems()
  }
})

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

const getProductPrice = (product: typeof wishlistItems.value[0]['product']) => {
  return product.discountPrice || product.price
}

const handleRemoveFromWishlist = async (productId: number) => {
  const result = await removeFromWishlist(productId)
  if (result.success) {
    toast.success('Item dihapus dari wishlist')
  } else {
    toast.error(result.message || 'Gagal menghapus item')
  }
}

const handleAddToCart = async (item: typeof wishlistItems.value[0]) => {
  addingToCart.value = item.productId
  const result = await addToCart({
    productId: item.productId,
    quantity: 1,
  })

  if (result.success) {
    toast.success('Ditambahkan ke keranjang')
    // Optionally remove from wishlist after adding to cart
    // await removeFromWishlist(item.productId)
  } else {
    toast.error(result.message || 'Gagal menambahkan ke keranjang')
  }
  addingToCart.value = null
}
</script>

<template>
  <UPopover v-model:open="isOpen" :ui="{ content: 'w-80 max-h-[80vh] z-[200]' }">
    <UButton color="neutral" variant="ghost" class="relative">
      <UIcon name="i-heroicons-heart" class="w-5 h-5" />
      <UBadge
        v-if="wishlistCount > 0"
        :label="wishlistCount.toString()"
        color="primary"
        class="absolute -top-1 -right-1 min-w-4.5 h-4.5 text-[10px]"
      />
    </UButton>

    <template #content>
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-900 dark:text-white">Wishlist</h3>
          <span class="text-sm text-gray-500">{{ wishlistCount }} item</span>
        </div>

        <!-- Not logged in -->
        <div v-if="!isLoggedIn" class="text-center py-8">
          <UIcon name="i-heroicons-heart" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p class="text-gray-500 mb-4">Silakan login untuk melihat wishlist</p>
          <UButton to="/login" color="primary" size="sm">Masuk</UButton>
        </div>

        <!-- Empty wishlist -->
        <div v-else-if="wishlistItems.length === 0" class="text-center py-8">
          <UIcon name="i-heroicons-heart" class="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p class="text-gray-500">Wishlist kosong</p>
        </div>

        <!-- Wishlist items -->
        <div v-else>
          <div class="max-h-80 overflow-y-auto divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="item in wishlistItems"
              :key="item.id"
              class="py-3 flex gap-3"
            >
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
                <div class="flex items-center gap-2 mt-1">
                  <span class="text-sm font-semibold text-primary-600">
                    {{ formatPrice(getProductPrice(item.product)) }}
                  </span>
                  <span
                    v-if="item.product.discountPrice"
                    class="text-xs text-gray-400 line-through"
                  >
                    {{ formatPrice(item.product.price) }}
                  </span>
                </div>
                <div class="flex items-center gap-2 mt-2">
                  <UButton
                    size="xs"
                    color="primary"
                    variant="soft"
                    :loading="addingToCart === item.productId"
                    :disabled="cartLoading"
                    @click="handleAddToCart(item)"
                  >
                    <UIcon name="i-heroicons-shopping-cart" class="w-3.5 h-3.5" />
                    Keranjang
                  </UButton>
                  <UButton
                    size="xs"
                    color="error"
                    variant="ghost"
                    :disabled="wishlistLoading"
                    @click="handleRemoveFromWishlist(item.productId)"
                  >
                    <UIcon name="i-heroicons-trash" class="w-3.5 h-3.5" />
                  </UButton>
                </div>
              </div>
            </div>
          </div>

          <!-- View all link -->
          <div class="pt-3 border-t border-gray-200 dark:border-gray-700 mt-2">
            <UButton
              to="/wishlist"
              color="neutral"
              variant="outline"
              block
              @click="isOpen = false"
            >
              Lihat Semua Wishlist
            </UButton>
          </div>
        </div>
      </div>
    </template>
  </UPopover>
</template>
