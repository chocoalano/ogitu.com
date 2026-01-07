<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ProductImage } from '~/types/product_detail'

const props = defineProps<{
  images: ProductImage[]
  productName: string
  badge?: string | null
  discount?: number
}>()

const selectedIndex = ref(0)
const isZoomed = ref(false)
const zoomPosition = ref({ x: 0, y: 0 })

// Get full image URL
const getImageUrl = (url: string): string => {
  if (!url) return 'https://placehold.co/600x600/1a1a2e/ffffff?text=No+Image'
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  // Relative path - construct full URL
  return url
}

const currentImage = computed(() => {
  const image = props.images[selectedIndex.value]
  return {
    ...image,
    url: getImageUrl(image?.url),
  }
})

const thumbnails = computed(() =>
  props.images.map((img) => ({
    ...img,
    url: getImageUrl(img.url),
  }))
)

const handleZoom = (event: MouseEvent) => {
  const target = event.currentTarget as HTMLElement
  const rect = target.getBoundingClientRect()
  zoomPosition.value = {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100,
  }
}

const selectImage = (index: number) => {
  selectedIndex.value = index
}

const prevImage = () => {
  if (selectedIndex.value > 0) {
    selectedIndex.value--
  }
}

const nextImage = () => {
  if (selectedIndex.value < props.images.length - 1) {
    selectedIndex.value++
  }
}
</script>

<template>
  <div class="space-y-4">
    <!-- Main Image -->
    <div
      class="relative aspect-square bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 cursor-zoom-in group"
      @mouseenter="isZoomed = true"
      @mouseleave="isZoomed = false"
      @mousemove="handleZoom"
    >
      <img
        :src="currentImage.url"
        :alt="currentImage.altText || productName"
        class="w-full h-full object-contain transition-transform duration-300"
        :class="{ 'scale-150': isZoomed }"
        :style="isZoomed ? { transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%` } : {}"
        @error="($event.target as HTMLImageElement).src = 'https://placehold.co/600x600/1a1a2e/ffffff?text=No+Image'"
      />

      <!-- Badges -->
      <div class="absolute top-4 left-4 flex flex-col gap-2">
        <span
          v-if="badge"
          class="px-3 py-1.5 bg-linear-to-r from-primary-500 to-secondary-500 text-white text-xs font-bold rounded-full shadow-lg"
        >
          {{ badge }}
        </span>
        <span
          v-if="discount && discount > 0"
          class="px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg"
        >
          -{{ discount }}%
        </span>
      </div>

      <!-- Navigation Arrows -->
      <button
        v-if="images.length > 1 && selectedIndex > 0"
        class="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
        @click.stop="prevImage"
      >
        <UIcon name="i-lucide-chevron-left" class="w-5 h-5" />
      </button>
      <button
        v-if="images.length > 1 && selectedIndex < images.length - 1"
        class="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
        @click.stop="nextImage"
      >
        <UIcon name="i-lucide-chevron-right" class="w-5 h-5" />
      </button>

      <!-- Image Counter -->
      <div
        v-if="images.length > 1"
        class="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 text-white text-xs font-medium rounded-full"
      >
        {{ selectedIndex + 1 }} / {{ images.length }}
      </div>
    </div>

    <!-- Thumbnail Images -->
    <div v-if="images.length > 1" class="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      <button
        v-for="(image, index) in thumbnails"
        :key="image.id"
        class="w-20 h-20 shrink-0 rounded-xl overflow-hidden border-2 transition-all duration-200"
        :class="
          selectedIndex === index
            ? 'border-primary-500 ring-2 ring-primary-500/30'
            : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
        "
        @click="selectImage(index)"
      >
        <img
          :src="image.url"
          :alt="image.altText || `${productName} - ${index + 1}`"
          class="w-full h-full object-cover"
          @error="($event.target as HTMLImageElement).src = 'https://placehold.co/100x100/1a1a2e/ffffff?text=No+Image'"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
