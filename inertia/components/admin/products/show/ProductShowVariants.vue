<script setup lang="ts">
import type { ProductVariant } from '../types'
import { formatPrice } from '../types'

defineProps<{
  variants: ProductVariant[]
}>()

// Format variant price safely
const formatVariantPrice = (price: number | string | null | undefined) => {
  const numPrice = Number(price)
  if (isNaN(numPrice)) return 'Rp0'
  return formatPrice(numPrice)
}
</script>

<template>
  <div
    v-if="variants && variants.length > 0"
    class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6"
  >
    <h3 class="font-semibold text-slate-900 dark:text-white mb-4">
      Varian ({{ variants.length }})
    </h3>
    <div class="space-y-3">
      <div
        v-for="variant in variants"
        :key="variant.id"
        class="p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50"
      >
        <div class="flex items-center justify-between">
          <div>
            <p class="font-medium text-slate-900 dark:text-white text-sm">
              {{ variant.name || 'Varian' }}: {{ variant.value }}
            </p>
            <span v-if="variant.sku" class="text-xs text-slate-400">SKU: {{ variant.sku }}</span>
          </div>
          <UBadge
            :color="variant.isActive ? 'success' : 'neutral'"
            variant="subtle"
            size="xs"
          >
            {{ variant.isActive ? 'Aktif' : 'Nonaktif' }}
          </UBadge>
        </div>
        <div class="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span class="font-semibold text-violet-600 dark:text-violet-400">
            {{ variant.priceAdjustment > 0 ? '+' : '' }}{{ formatVariantPrice(variant.priceAdjustment) }}
          </span>
          <span>Stok: {{ variant.stock ?? 0 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
