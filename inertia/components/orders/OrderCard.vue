<script setup lang="ts">
import type { Order } from '~/types/order'
import { useOrderFormatters } from '~/composables/use_orders'
import OrderStatusBadge from './OrderStatusBadge.vue'
import OrderItemPreview from './OrderItemPreview.vue'
import OrderCardActions from './OrderCardActions.vue'

/**
 * OrderCard - Main order card component with modern design
 */
const props = defineProps<{
  order: Order
  index?: number
}>()

const emit = defineEmits<{
  pay: [order: Order]
  confirmReceived: [order: Order]
  cancel: [order: Order]
}>()

const { formatPrice, formatShortDate, formatRelativeTime } = useOrderFormatters()

// Animation delay based on index
const animationDelay = `${(props.index || 0) * 100}ms`
</script>

<template>
  <article
    :style="{ animationDelay }"
    class="group relative bg-white dark:bg-gray-800/80 rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5 hover:border-primary-500/30 animate-fade-in-up"
  >
    <!-- Hover Glow Effect -->
    <div
      class="absolute inset-0 bg-linear-to-br from-primary-500/0 via-transparent to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-all duration-500 pointer-events-none"
    />

    <!-- Card Content -->
    <div class="relative">
      <!-- Header -->
      <div
        class="flex flex-wrap items-start sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700/50"
      >
        <div class="flex items-center gap-3 sm:gap-4">
          <!-- Order Icon -->
          <div
            class="hidden sm:flex w-12 h-12 rounded-xl bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 items-center justify-center group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300"
          >
            <UIcon
              name="i-heroicons-document-text"
              class="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors duration-300"
            />
          </div>

          <!-- Order Info -->
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span
                class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
              >
                {{ order.orderNumber }}
              </span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
              <span :title="formatShortDate(order.createdAt)">
                {{ formatRelativeTime(order.createdAt) }}
              </span>
            </div>
          </div>
        </div>

        <!-- Status Badge -->
        <OrderStatusBadge :status="order.status" animated />
      </div>

      <!-- Order Items -->
      <div class="p-4 sm:p-5 space-y-3">
        <OrderItemPreview
          v-for="(item, idx) in order.items.slice(0, 2)"
          :key="item.id"
          :item="item"
          :index="idx"
        />

        <!-- More items indicator -->
        <div
          v-if="order.items.length > 2"
          class="flex items-center gap-2 py-2 px-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg"
        >
          <UIcon name="i-heroicons-plus-circle" class="w-4 h-4 text-gray-400" />
          <span class="text-sm text-gray-500 dark:text-gray-400">
            {{ order.items.length - 2 }} produk lainnya
          </span>
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 bg-linear-to-r from-gray-50/80 via-white to-gray-50/80 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 border-t border-gray-100 dark:border-gray-700/50"
      >
        <!-- Total -->
        <div>
          <p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5">Total Pesanan</p>
          <p
            class="text-xl font-bold bg-linear-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent"
          >
            {{ formatPrice(order.total) }}
          </p>
        </div>

        <!-- Actions -->
        <OrderCardActions
          :order="order"
          @pay="emit('pay', order)"
          @confirm-received="emit('confirmReceived', order)"
        />
      </div>
    </div>
  </article>
</template>

<style scoped>
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fade-in-up 0.5s ease-out forwards;
  opacity: 0;
}
</style>
