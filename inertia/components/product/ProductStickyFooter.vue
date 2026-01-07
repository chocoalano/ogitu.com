<script setup lang="ts">
defineProps<{
  formattedPrice: string
  isOutOfStock: boolean
  isAddingToCart?: boolean
  isBuyingNow?: boolean
}>()

const emit = defineEmits<{
  addToCart: []
  buyNow: []
}>()
</script>

<template>
  <div
    class="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 lg:hidden z-50"
  >
    <div class="flex items-center gap-3">
      <div class="flex-1">
        <p class="text-xs text-gray-500 dark:text-gray-400">Harga</p>
        <p class="text-lg font-bold text-primary-600 dark:text-primary-400">
          {{ formattedPrice }}
        </p>
      </div>
      <UButton
        size="lg"
        variant="outline"
        class="shrink-0"
        :disabled="isOutOfStock || isAddingToCart"
        :loading="isAddingToCart"
        @click="emit('addToCart')"
      >
        <template v-if="!isAddingToCart">
          <UIcon name="i-lucide-shopping-cart" class="w-5 h-5" />
        </template>
      </UButton>
      <UButton
        size="lg"
        color="primary"
        class="shrink-0"
        :disabled="isOutOfStock || isBuyingNow"
        :loading="isBuyingNow"
        @click="emit('buyNow')"
      >
        {{ isBuyingNow ? 'Memproses...' : 'Beli Sekarang' }}
      </UButton>
    </div>
  </div>
</template>
