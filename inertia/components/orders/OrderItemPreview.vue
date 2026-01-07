<script setup lang="ts">
import type { OrderItem } from '~/types/order'
import { useOrderFormatters } from '~/composables/use_orders'

/**
 * OrderItemPreview - Single order item preview with image
 */
const props = defineProps<{
  item: OrderItem
  index?: number
}>()

const { formatPrice } = useOrderFormatters()

// Placeholder image for missing images
const placeholderImage = 'https://placehold.co/100x100/1a1a2e/ffffff?text=Vape'
</script>

<template>
  <div
    class="group/item flex gap-3 sm:gap-4 p-2 -mx-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200"
  >
    <!-- Image -->
    <div class="relative shrink-0">
      <div
        class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/50 dark:ring-gray-700/50 group-hover/item:ring-primary-500/30 transition-all duration-300"
      >
        <img
          :src="item.image || placeholderImage"
          :alt="item.productName"
          class="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <!-- Quantity Badge -->
      <span
        v-if="item.quantity > 1"
        class="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30"
      >
        {{ item.quantity }}
      </span>
    </div>

    <!-- Info -->
    <div class="flex-1 min-w-0 py-0.5">
      <h4 class="font-medium text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors duration-200">
        {{ item.productName }}
      </h4>

      <p
        v-if="item.variantName"
        class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5"
      >
        <span class="inline-flex items-center gap-1">
          <UIcon name="i-heroicons-swatch" class="w-3 h-3" />
          {{ item.variantName }}
        </span>
      </p>

      <div class="flex items-center justify-between mt-2">
        <span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {{ item.quantity }} × {{ formatPrice(item.price) }}
        </span>
        <span class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">
          {{ formatPrice(item.subtotal) }}
        </span>
      </div>
    </div>
  </div>
</template>
