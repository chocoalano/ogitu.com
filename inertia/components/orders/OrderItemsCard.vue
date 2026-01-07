<script setup lang="ts">
import type { OrderItem } from '~/types/order'
import { useOrderFormatters } from '~/composables/use_orders'

/**
 * OrderItemsCard - Full list of order items
 */
defineProps<{
  items: OrderItem[]
}>()

const { formatPrice } = useOrderFormatters()

const placeholderImage = 'https://placehold.co/100x100/1a1a2e/ffffff?text=Vape'
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">
            <UIcon name="i-heroicons-shopping-bag" class="w-5 h-5 text-blue-500" />
          </div>
          <h2 class="font-semibold text-gray-900 dark:text-white">Produk Pesanan</h2>
        </div>
      </div>
    </div>

    <!-- Items -->
    <div class="divide-y divide-gray-100 dark:divide-gray-700/50">
      <div
        v-for="item in items"
        :key="item.id"
        class="group p-4 sm:p-5 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors duration-200"
      >
        <div class="flex gap-4">
          <!-- Image -->
          <div class="relative shrink-0">
            <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/50 dark:ring-gray-700/50">
              <img
                :src="item.image || placeholderImage"
                :alt="item.productName"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>

            <!-- Quantity Badge -->
            <span
              v-if="item.quantity > 1"
              class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30"
            >
              {{ item.quantity }}
            </span>
          </div>

          <!-- Info -->
          <div class="flex-1 min-w-0">
            <h4 class="font-semibold text-gray-900 dark:text-white line-clamp-2">
              {{ item.productName }}
            </h4>

            <div class="mt-1 space-y-0.5">
              <p
                v-if="item.variantName"
                class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5"
              >
                <UIcon name="i-heroicons-swatch" class="w-3.5 h-3.5" />
                {{ item.variantName }}
              </p>

              <p
                v-if="item.productSku"
                class="text-xs text-gray-400 dark:text-gray-500"
              >
                SKU: {{ item.productSku }}
              </p>
            </div>

            <div class="flex items-center justify-between mt-3">
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ item.quantity }} × {{ formatPrice(item.price) }}
              </span>
              <span class="font-bold text-gray-900 dark:text-white">
                {{ formatPrice(item.subtotal) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
