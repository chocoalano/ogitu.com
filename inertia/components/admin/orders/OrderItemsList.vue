<script setup lang="ts">
import type { AdminOrderItem } from '~/types/admin_order'
import { useOrderFormatters } from '~/composables/use_order_formatters'

defineProps<{
  items: AdminOrderItem[]
}>()

const { formatCurrency } = useOrderFormatters()

const handleImageError = (event: Event) => {
  ;(event.target as HTMLImageElement).src = 'https://placehold.co/80x80/1a1a2e/ffffff?text=No+Image'
}
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Produk Pesanan
      </h3>
    </template>

    <div class="divide-y divide-gray-200 dark:divide-gray-800">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex gap-4 py-4 first:pt-0 last:pb-0"
      >
        <img
          :src="item.image"
          :alt="item.productName"
          class="w-20 h-20 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
          @error="handleImageError"
        />
        <div class="flex-1 min-w-0">
          <p class="font-medium text-gray-900 dark:text-white">
            {{ item.productName }}
          </p>
          <p v-if="item.variantName" class="text-sm text-gray-500 dark:text-gray-400">
            Varian: {{ item.variantName }}
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            SKU: {{ item.productSku }}
          </p>
          <div class="mt-2 flex items-center justify-between">
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ item.quantity }}x {{ formatCurrency(item.price) }}
            </p>
            <p class="font-semibold text-gray-900 dark:text-white">
              {{ formatCurrency(item.subtotal) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <slot name="footer" />
  </UCard>
</template>
