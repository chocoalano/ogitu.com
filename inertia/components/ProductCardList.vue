<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { Product } from '~/types/product'

const props = defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  addToCart: [product: Product]
  addToWishlist: [product: Product]
}>()

// Product detail URL
const productUrl = `/products/${props.product.slug}`
</script>

<template>
  <Link
    :href="productUrl"
    class="group bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 block"
  >
    <div class="flex flex-col sm:flex-row">
      <!-- Product Image -->
      <div
        class="relative w-full sm:w-48 lg:w-64 aspect-square sm:aspect-auto sm:h-48 lg:h-56 bg-gray-100 dark:bg-gray-800 overflow-hidden shrink-0"
      >
        <img
          v-if="product.image"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <UIcon name="i-heroicons-photo" class="w-12 h-12 text-gray-300 dark:text-gray-600" />
        </div>

        <!-- Badge -->
        <div v-if="product.badge" class="absolute top-3 left-3">
          <UBadge :label="product.badge" color="primary" />
        </div>

        <!-- Discount Badge -->
        <div v-if="product.discount > 0" class="absolute top-3 right-3">
          <UBadge :label="`-${product.discount}%`" color="error" />
        </div>
      </div>

      <!-- Product Info -->
      <div class="flex-1 p-4 lg:p-6 flex flex-col justify-between">
        <div>
          <!-- Name -->
          <h3
            class="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors"
          >
            {{ product.name }}
          </h3>

          <!-- Rating & Stats -->
          <div class="flex flex-wrap items-center gap-4 mb-3">
            <div class="flex items-center gap-1">
              <UIcon name="i-heroicons-star-solid" class="w-4 h-4 text-yellow-400" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ Number(product.rating || 0).toFixed(1) }}
              </span>
              <span class="text-sm text-gray-400">({{ product.totalReviews }} ulasan)</span>
            </div>
            <span class="text-sm text-gray-500 dark:text-gray-400">
              {{ product.totalSold }} terjual
            </span>
            <UBadge
              v-if="product.stock < 10 && product.stock > 0"
              label="Stok Terbatas"
              color="warning"
              variant="soft"
              size="xs"
            />
          </div>

          <!-- Brand -->
          <div v-if="product.brand" class="mb-3">
            <UBadge :label="product.brand" color="neutral" variant="soft" />
          </div>
        </div>

        <!-- Price & Actions -->
        <div
          class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800"
        >
          <div>
            <div class="flex items-baseline gap-2">
              <span class="text-xl font-bold text-primary-500">{{ product.formattedPrice }}</span>
              <span
                v-if="product.formattedOriginalPrice"
                class="text-sm text-gray-400 line-through"
              >
                {{ product.formattedOriginalPrice }}
              </span>
            </div>
          </div>
          <div class="flex gap-2">
            <UButton color="primary" variant="soft" @click="emit('addToWishlist', product)">
              <UIcon name="i-heroicons-heart" class="w-4 h-4" />
              Wishlist
            </UButton>
            <UButton color="primary" @click="emit('addToCart', product)">
              <UIcon name="i-heroicons-shopping-cart" class="w-4 h-4" />
              Tambah ke Keranjang
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </Link>
</template>
