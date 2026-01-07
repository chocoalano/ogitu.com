<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ReviewProduct } from '~/types/review'

const props = defineProps<{
  products: ReviewProduct[]
  status: string
  rating: number | string | null
  search: string
  productId: number | string | null
}>()

// Helper to convert string/number to number or null
const toNumberOrNull = (val: number | string | null | undefined): number | null => {
  if (val === null || val === undefined || val === '') return null
  const num = typeof val === 'string' ? parseInt(val, 10) : val
  return isNaN(num) ? null : num
}

const emit = defineEmits<{
  (e: 'filter', filters: { status: string; rating: number | null; search: string; productId: number | null }): void
}>()

const localStatus = ref(props.status)
const localRating = ref(toNumberOrNull(props.rating))
const localSearch = ref(props.search)
const localProductId = ref(toNumberOrNull(props.productId))

const statusOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Menunggu Persetujuan', value: 'pending' },
  { label: 'Disetujui', value: 'approved' },
  { label: 'Sudah Dibalas', value: 'replied' },
]

const ratingOptions = [
  { label: 'Semua Rating', value: null },
  { label: '5 Bintang', value: 5 },
  { label: '4 Bintang', value: 4 },
  { label: '3 Bintang', value: 3 },
  { label: '2 Bintang', value: 2 },
  { label: '1 Bintang', value: 1 },
]

const productOptions = [
  { label: 'Semua Produk', value: null },
  ...props.products.map((p) => ({
    label: `${p.name} (${p.reviewCount})`,
    value: p.id,
  })),
]

watch([localStatus, localRating, localProductId], () => {
  emit('filter', {
    status: localStatus.value,
    rating: localRating.value,
    search: localSearch.value,
    productId: localProductId.value,
  })
})

const handleSearch = () => {
  emit('filter', {
    status: localStatus.value,
    rating: localRating.value,
    search: localSearch.value,
    productId: localProductId.value,
  })
}

const clearFilters = () => {
  localStatus.value = 'all'
  localRating.value = null
  localSearch.value = ''
  localProductId.value = null
  emit('filter', {
    status: 'all',
    rating: null,
    search: '',
    productId: null,
  })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
    <div class="flex flex-col lg:flex-row gap-4">
      <!-- Search -->
      <div class="flex-1">
        <UInput v-model="localSearch" placeholder="Cari review, produk, atau pelanggan..."
          icon="i-heroicons-magnifying-glass" @keyup.enter="handleSearch" class="w-full" />
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-3">
        <USelectMenu v-model="localStatus" :items="statusOptions" value-key="value" placeholder="Status"
          class="w-full sm:w-44" />

        <USelectMenu v-model="localRating" :items="ratingOptions" value-key="value" placeholder="Rating"
          class="w-full sm:w-36" />

        <USelectMenu v-model="localProductId" :items="productOptions" value-key="value" placeholder="Produk"
          class="w-full sm:w-48" />

        <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" @click="clearFilters">
          Reset
        </UButton>
      </div>
    </div>
  </div>
</template>
