<script setup lang="ts">
defineProps<{
  isOutOfStock: boolean
  isWishlisted: boolean
  isAddingToCart?: boolean
  isBuyingNow?: boolean
  isTogglingWishlist?: boolean
}>()

const emit = defineEmits<{
  addToCart: []
  buyNow: []
  toggleWishlist: []
  share: []
}>()
</script>

<template>
  <div class="space-y-4">
    <!-- Primary Actions -->
    <div class="flex flex-col sm:flex-row gap-3">
      <UButton
        size="xl"
        color="primary"
        class="flex-1"
        :disabled="isOutOfStock || isAddingToCart"
        :loading="isAddingToCart"
        @click="emit('addToCart')"
      >
        <template v-if="!isAddingToCart">
          <UIcon name="i-lucide-shopping-cart" class="w-5 h-5" />
        </template>
        {{ isOutOfStock ? 'Stok Habis' : isAddingToCart ? 'Menambahkan...' : 'Tambah ke Keranjang' }}
      </UButton>
      <UButton
        size="xl"
        variant="solid"
        color="neutral"
        class="flex-1"
        :disabled="isOutOfStock || isBuyingNow"
        :loading="isBuyingNow"
        @click="emit('buyNow')"
      >
        <template v-if="!isBuyingNow">
          <UIcon name="i-lucide-zap" class="w-5 h-5" />
        </template>
        {{ isBuyingNow ? 'Memproses...' : 'Beli Sekarang' }}
      </UButton>
    </div>

    <!-- Secondary Actions -->
    <div class="flex items-center gap-4 pt-2">
      <button
        class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
        :disabled="isTogglingWishlist"
        @click="emit('toggleWishlist')"
      >
        <UIcon
          v-if="!isTogglingWishlist"
          name="i-lucide-heart"
          class="w-5 h-5"
          :class="isWishlisted ? 'text-red-500 fill-red-500' : ''"
        />
        <UIcon v-else name="i-lucide-loader-2" class="w-5 h-5 animate-spin" />
        {{ isWishlisted ? 'Tersimpan' : 'Simpan' }}
      </button>
      <button
        class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
        @click="emit('share')"
      >
        <UIcon name="i-lucide-share-2" class="w-5 h-5" />
        Bagikan
      </button>
    </div>
  </div>
</template>
