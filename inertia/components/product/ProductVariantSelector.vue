<script setup lang="ts">
import type { ProductVariant } from '~/types/product_detail'

const props = defineProps<{
  variantGroups: Record<string, ProductVariant[]>
  selectedVariant: ProductVariant | null
}>()

const emit = defineEmits<{
  select: [variant: ProductVariant]
}>()

const handleSelect = (variant: ProductVariant) => {
  if (variant.stock > 0) {
    emit('select', variant)
  }
}
</script>

<template>
  <div v-if="Object.keys(variantGroups).length > 0" class="space-y-4">
    <div v-for="(variants, name) in variantGroups" :key="name" class="space-y-2">
      <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
        {{ name }}
      </label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="variant in variants"
          :key="variant.id"
          class="px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all duration-200"
          :class="
            selectedVariant?.id === variant.id
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-950 text-primary-600 dark:text-primary-400'
              : variant.stock > 0
                ? 'border-gray-200 dark:border-gray-700 hover:border-primary-300 text-gray-700 dark:text-gray-300'
                : 'border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 text-gray-400 cursor-not-allowed'
          "
          :disabled="variant.stock <= 0"
          @click="handleSelect(variant)"
        >
          {{ variant.value }}
          <span v-if="variant.stock <= 0" class="text-xs text-red-500 ml-1">(Habis)</span>
        </button>
      </div>
    </div>
  </div>
</template>
