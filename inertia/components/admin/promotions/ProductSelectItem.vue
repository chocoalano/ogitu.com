<script setup lang="ts">
const props = defineProps<{
  product: {
    id: number
    name: string
    image: string
    price: number
  }
  selected?: boolean
  showPrice?: boolean
}>()

const emit = defineEmits<{
  (e: 'select'): void
  (e: 'remove'): void
}>()

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

// Image URL helper
const getImageUrl = (url: string | undefined | null): string => {
  if (!url || url === '/images/placeholder.png') {
    return 'https://placehold.co/100x100/1a1a2e/ffffff?text=No+Image'
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  return url
}
</script>

<template>
  <div
    class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
    :class="{ 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20': selected }"
    @click="selected ? emit('remove') : emit('select')"
  >
    <img
      :src="getImageUrl(product.image)"
      :alt="product.name"
      class="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
    />
    <div class="flex-1 min-w-0">
      <p class="font-medium text-gray-900 dark:text-white truncate">
        {{ product.name }}
      </p>
      <p v-if="showPrice" class="text-sm text-gray-500 dark:text-gray-400">
        {{ formatPrice(product.price) }}
      </p>
    </div>
    <UIcon
      v-if="selected"
      name="i-heroicons-check-circle-solid"
      class="w-5 h-5 text-primary-500"
    />
  </div>
</template>
