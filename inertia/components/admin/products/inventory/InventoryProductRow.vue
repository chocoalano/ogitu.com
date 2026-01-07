<script setup lang="ts">
import { computed } from 'vue'
import type { InventoryProduct, EditedStock } from './types'
import { getStockBadge, getStatusBadge } from './types'

interface Props {
  product: InventoryProduct
  editMode: boolean
  isExpanded: boolean
  editedStock?: EditedStock
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-expand', productId: number): void
  (e: 'update-stock', productId: number, stock: number): void
}>()

// Get current stock value (edited or original)
const currentStock = computed(() => {
  return props.editedStock?.stock ?? props.product.stock
})

// Check if stock has been modified
const isStockModified = computed(() => {
  if (!props.editedStock) return false
  return props.editedStock.stock !== props.product.stock
})

// Handle stock update
const handleStockUpdate = (value: any) => {
  emit('update-stock', props.product.id, Number(value) || 0)
}
</script>

<template>
  <tr class="hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors">
    <!-- Expand Button -->
    <td class="px-4 py-3">
      <button
        v-if="product.hasVariants"
        @click="emit('toggle-expand', product.id)"
        class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700"
      >
        <UIcon
          :name="isExpanded ? 'i-heroicons-chevron-down' : 'i-heroicons-chevron-right'"
          class="w-4 h-4 text-slate-500"
        />
      </button>
    </td>

    <!-- Product Info -->
    <td class="px-4 py-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">
          <img
            v-if="product.primaryImage"
            :src="product.primaryImage.url"
            :alt="product.name"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full flex items-center justify-center">
            <UIcon name="i-heroicons-photo" class="w-5 h-5 text-slate-400" />
          </div>
        </div>
        <div class="min-w-0">
          <p class="text-sm font-medium text-slate-900 dark:text-white truncate">
            {{ product.name }}
          </p>
          <p v-if="product.hasVariants" class="text-xs text-blue-500">
            {{ product.variants.length }} varian
          </p>
        </div>
      </div>
    </td>

    <!-- SKU -->
    <td class="px-4 py-3">
      <span class="text-sm font-mono text-slate-600 dark:text-slate-300">
        {{ product.sku || '-' }}
      </span>
    </td>

    <!-- Category -->
    <td class="px-4 py-3">
      <span class="text-sm text-slate-600 dark:text-slate-300">
        {{ product.category?.name || '-' }}
      </span>
    </td>

    <!-- Stock -->
    <td class="px-4 py-3 text-center">
      <template v-if="editMode">
        <UInput
          type="number"
          :model-value="currentStock"
          @update:model-value="handleStockUpdate"
          min="0"
          class="w-24 mx-auto"
          :class="{ 'ring-2 ring-violet-500': isStockModified }"
          size="sm"
        />
      </template>
      <template v-else>
        <span class="text-sm font-medium text-slate-900 dark:text-white">
          {{ product.stock }}
        </span>
        <span v-if="product.hasVariants" class="text-xs text-slate-500 block">
          (+{{ product.totalVariantStock }} varian)
        </span>
      </template>
    </td>

    <!-- Variants Count -->
    <td class="px-4 py-3 text-center">
      <template v-if="product.hasVariants">
        <span class="text-sm text-blue-500">{{ product.variants.length }} varian</span>
      </template>
      <template v-else>
        <span class="text-slate-400">-</span>
      </template>
    </td>

    <!-- Stock Status -->
    <td class="px-4 py-3 text-center">
      <UBadge :color="getStockBadge(currentStock).color" variant="subtle" size="sm">
        {{ getStockBadge(currentStock).label }}
      </UBadge>
    </td>

    <!-- Product Status -->
    <td class="px-4 py-3 text-center">
      <UBadge :color="getStatusBadge(product.status).color" variant="subtle" size="sm">
        {{ getStatusBadge(product.status).label }}
      </UBadge>
    </td>
  </tr>
</template>
