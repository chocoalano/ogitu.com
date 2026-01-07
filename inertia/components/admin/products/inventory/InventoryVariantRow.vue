<script setup lang="ts">
import { computed } from 'vue'
import type { ProductVariant } from './types'
import { getStockBadge, formatCurrency } from './types'

interface Props {
  variant: ProductVariant
  productId: number
  editMode: boolean
  editedStock?: number
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'update-stock', productId: number, variantId: number, stock: number): void
}>()

// Get current stock value (edited or original)
const currentStock = computed(() => {
  return props.editedStock ?? props.variant.stock
})

// Check if stock has been modified
const isStockModified = computed(() => {
  return props.editedStock !== undefined && props.editedStock !== props.variant.stock
})

// Handle stock update
const handleStockUpdate = (value: any) => {
  emit('update-stock', props.productId, props.variant.id, Number(value) || 0)
}

// Format price adjustment
const priceAdjustmentDisplay = computed(() => {
  if (props.variant.priceAdjustment > 0) {
    return `+${formatCurrency(props.variant.priceAdjustment)}`
  } else if (props.variant.priceAdjustment < 0) {
    return formatCurrency(props.variant.priceAdjustment)
  }
  return '-'
})
</script>

<template>
  <tr class="bg-slate-50/50 dark:bg-slate-900/20">
    <!-- Empty cell for alignment -->
    <td class="px-4 py-2"></td>

    <!-- Variant Info -->
    <td class="px-4 py-2 pl-8" colspan="2">
      <div class="flex items-center gap-2">
        <UIcon name="i-heroicons-arrow-turn-down-right" class="w-4 h-4 text-slate-400" />
        <span class="text-sm text-slate-700 dark:text-slate-300">
          {{ variant.name }}: {{ variant.value }}
        </span>
        <UBadge v-if="!variant.isActive" color="neutral" variant="subtle" size="xs">
          Nonaktif
        </UBadge>
        <span class="text-sm text-slate-500 font-mono ml-4">
          {{ variant.sku || '-' }}
        </span>
      </div>
    </td>

    <!-- Empty cell for category column -->
    <td class="px-4 py-2"></td>

    <!-- Variant Stock -->
    <td class="px-4 py-2 text-center">
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
        <span class="text-sm text-slate-600 dark:text-slate-300">{{ variant.stock }}</span>
      </template>
    </td>

    <!-- Empty cell for variants column -->
    <td class="px-4 py-2"></td>

    <!-- Variant Stock Status -->
    <td class="px-4 py-2 text-center">
      <UBadge :color="getStockBadge(currentStock).color" variant="subtle" size="xs">
        {{ getStockBadge(currentStock).label }}
      </UBadge>
    </td>

    <!-- Price Adjustment -->
    <td class="px-4 py-2 text-center">
      <span class="text-xs text-slate-500">
        {{ priceAdjustmentDisplay }}
      </span>
    </td>
  </tr>
</template>
