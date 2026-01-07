<script setup lang="ts">
import { computed } from 'vue'
import type { AdminOrder } from '~/types/admin_order'
import { getStatusBadgeColor } from '~/types/admin_order'
import { useOrderFormatters } from '~/composables/use_order_formatters'

const props = defineProps<{
  order: AdminOrder
}>()

const emit = defineEmits<{
  view: [order: AdminOrder]
  process: [order: AdminOrder]
  ship: [order: AdminOrder]
  track: [order: AdminOrder]
  cancel: [order: AdminOrder]
}>()

const { formatCurrency, formatRelativeTime } = useOrderFormatters()

// Computed for first item safely
const firstItem = computed(() => props.order.items?.[0] || null)

// Computed states for action buttons
const canProcess = computed(() => props.order.status === 'paid')
const canShip = computed(() => ['paid', 'processing'].includes(props.order.status))
const canTrack = computed(() => props.order.status === 'shipped' && props.order.shipping?.waybill)
const canCancel = computed(() => ['pending_payment', 'paid'].includes(props.order.status))

const handleImageError = (event: Event) => {
  ;(event.target as HTMLImageElement).src = 'https://placehold.co/80x80/1a1a2e/ffffff?text=No+Image'
}
</script>

<template>
  <div class="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
    <!-- Header: Status & Order Info -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
      <div class="flex items-center gap-4">
        <UBadge :color="getStatusBadgeColor(order.statusColor)" variant="soft" size="lg">
          {{ order.statusLabel }}
        </UBadge>
        <div>
          <p class="font-semibold text-gray-900 dark:text-white">{{ order.orderNumber }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400">{{ formatRelativeTime(order.createdAt) }}</p>
        </div>
      </div>
      <div class="text-right">
        <p class="text-lg font-bold text-gray-900 dark:text-white">{{ formatCurrency(order.total) }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ order.itemCount }} item</p>
      </div>
    </div>

    <!-- Product Preview -->
    <div v-if="firstItem" class="flex items-center gap-4 mb-4">
      <img
        :src="order.firstItemImage || 'https://placehold.co/80x80/1a1a2e/ffffff?text=No+Image'"
        :alt="firstItem.productName || 'Product'"
        class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
        @error="handleImageError"
      />
      <div class="flex-1 min-w-0">
        <p class="font-medium text-gray-900 dark:text-white truncate">
          {{ firstItem.productName }}
          <span v-if="firstItem.variantName" class="text-gray-500">- {{ firstItem.variantName }}</span>
        </p>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          {{ firstItem.quantity }}x {{ formatCurrency(firstItem.price || 0) }}
        </p>
        <p v-if="order.itemCount > 1" class="text-sm text-gray-400 dark:text-gray-500">
          +{{ order.itemCount - 1 }} produk lainnya
        </p>
      </div>
    </div>

    <!-- Customer Info -->
    <div v-if="order.customer" class="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
      <UIcon name="i-heroicons-user" class="w-4 h-4" />
      <span>{{ order.customer.name }}</span>
      <span class="text-gray-400">•</span>
      <span>{{ order.customer.phone }}</span>
    </div>

    <!-- Shipping Info -->
    <div
      v-if="order.shipping?.waybill"
      class="flex items-center gap-2 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm"
    >
      <UIcon name="i-heroicons-truck" class="w-5 h-5 text-blue-600 dark:text-blue-400" />
      <span class="font-medium text-blue-900 dark:text-blue-100">{{ order.shipping.courierName }}</span>
      <span class="text-blue-600 dark:text-blue-400">•</span>
      <span class="font-mono text-blue-800 dark:text-blue-200">{{ order.shipping.waybill }}</span>
    </div>

    <!-- Customer Notes -->
    <div
      v-if="order.customerNotes"
      class="flex items-start gap-2 mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm"
    >
      <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
      <p class="text-yellow-800 dark:text-yellow-200">{{ order.customerNotes }}</p>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
      <UButton color="neutral" variant="ghost" size="sm" icon="i-heroicons-eye" @click="emit('view', order)">
        Detail
      </UButton>
      <UButton v-if="canProcess" color="primary" variant="soft" size="sm" icon="i-heroicons-play" @click="emit('process', order)">
        Proses Pesanan
      </UButton>
      <UButton v-if="canShip" color="primary" size="sm" icon="i-heroicons-truck" @click="emit('ship', order)">
        {{ order.shipping?.waybill ? 'Update Resi' : 'Input Resi' }}
      </UButton>
      <UButton v-if="canTrack" color="neutral" variant="soft" size="sm" icon="i-heroicons-map-pin" @click="emit('track', order)">
        Lacak
      </UButton>
      <UButton v-if="canCancel" color="error" variant="ghost" size="sm" icon="i-heroicons-x-mark" @click="emit('cancel', order)">
        Batalkan
      </UButton>
    </div>
  </div>
</template>
