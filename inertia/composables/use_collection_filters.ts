import { ref, computed, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import type { CollectionFilters, SortOption } from '../types/product.js'

export const SORT_OPTIONS: SortOption[] = [
  { label: 'Terbaru', value: 'newest' },
  { label: 'Terlama', value: 'oldest' },
  { label: 'Harga Terendah', value: 'price-low' },
  { label: 'Harga Tertinggi', value: 'price-high' },
  { label: 'Terpopuler', value: 'popular' },
  { label: 'Rating Tertinggi', value: 'rating' },
]

const DEFAULT_FILTERS: CollectionFilters = {
  search: '',
  category: '',
  brand: '',
  minPrice: '',
  maxPrice: '',
  sortBy: 'newest',
}

export function useCollectionFilters(initialFilters: CollectionFilters) {
  const localFilters = ref<CollectionFilters>({ ...initialFilters })
  const isMobileFilterOpen = ref(false)

  const hasActiveFilters = computed((): boolean => {
    return Boolean(
      localFilters.value.search ||
      localFilters.value.category ||
      localFilters.value.brand ||
      localFilters.value.minPrice ||
      localFilters.value.maxPrice
    )
  })

  const activeFilterCount = computed((): number => {
    let count = 0
    if (localFilters.value.category) count++
    if (localFilters.value.brand) count++
    if (localFilters.value.minPrice || localFilters.value.maxPrice) count++
    return count
  })

  const buildQuery = (additionalParams: Record<string, string | number> = {}) => {
    const query: Record<string, string | number> = { ...additionalParams }

    if (localFilters.value.search) query.search = localFilters.value.search
    if (localFilters.value.category) query.category = localFilters.value.category
    if (localFilters.value.brand) query.brand = localFilters.value.brand
    if (localFilters.value.minPrice) query.minPrice = localFilters.value.minPrice
    if (localFilters.value.maxPrice) query.maxPrice = localFilters.value.maxPrice
    if (localFilters.value.sortBy && localFilters.value.sortBy !== 'newest') {
      query.sortBy = localFilters.value.sortBy
    }

    return query
  }

  const applyFilters = () => {
    router.get('/collections', buildQuery(), {
      preserveState: true,
      preserveScroll: true,
    })
    isMobileFilterOpen.value = false
  }

  const clearFilters = () => {
    localFilters.value = { ...DEFAULT_FILTERS }
    router.get('/collections', {}, { preserveState: true })
  }

  const clearSingleFilter = (key: keyof CollectionFilters) => {
    localFilters.value[key] = ''
    applyFilters()
  }

  const goToPage = (page: number) => {
    router.get('/collections', buildQuery({ page }), {
      preserveState: true,
      preserveScroll: true,
    })
  }

  // Watch sort changes and auto-apply
  watch(
    () => localFilters.value.sortBy,
    () => {
      applyFilters()
    }
  )

  return {
    localFilters,
    isMobileFilterOpen,
    hasActiveFilters,
    activeFilterCount,
    applyFilters,
    clearFilters,
    clearSingleFilter,
    goToPage,
    sortOptions: SORT_OPTIONS,
  }
}
