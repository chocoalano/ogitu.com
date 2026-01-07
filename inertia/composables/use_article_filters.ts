import { ref, computed, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import { useDebounceFn } from '@vueuse/core'
import type { CategoryInfo } from '~/types/article'

export interface ArticleFilters {
  category: string | null
  tag: string | null
  search: string
}

export interface UseArticleFiltersOptions {
  initialFilters: ArticleFilters
  categories: CategoryInfo[]
}

/**
 * Composable for managing article list filters
 * Handles search, category, tag filtering with debounce and URL sync
 */
export function useArticleFilters(options: UseArticleFiltersOptions) {
  const { initialFilters, categories } = options

  // Local state
  const searchQuery = ref(initialFilters.search || '')
  const selectedCategory = ref(initialFilters.category || '')
  const selectedTag = ref(initialFilters.tag || '')
  const isLoading = ref(false)

  // Build query params from current state
  const buildQueryParams = (page = 1): Record<string, string | number> => {
    const params: Record<string, string | number> = {}

    if (searchQuery.value) params.search = searchQuery.value
    if (selectedCategory.value) params.category = selectedCategory.value
    if (selectedTag.value) params.tag = selectedTag.value
    params.page = page

    return params
  }

  // Navigate with filters
  const navigateWithFilters = (params: Record<string, string | number>) => {
    isLoading.value = true
    router.get('/artikel', params, {
      preserveState: true,
      preserveScroll: false,
      onFinish: () => {
        isLoading.value = false
      },
    })
  }

  // Apply filters
  const applyFilters = () => {
    navigateWithFilters(buildQueryParams(1))
  }

  // Debounced search
  const debouncedSearch = useDebounceFn(applyFilters, 500)

  // Watch search input for auto-search
  watch(searchQuery, () => {
    debouncedSearch()
  })

  // Clear all filters
  const clearFilters = () => {
    searchQuery.value = ''
    selectedCategory.value = ''
    selectedTag.value = ''
    router.get('/artikel', {}, { preserveState: true })
  }

  // Toggle category selection
  const toggleCategory = (slug: string) => {
    selectedCategory.value = slug === selectedCategory.value ? '' : slug
    applyFilters()
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    selectedTag.value = tag === selectedTag.value ? '' : tag
    applyFilters()
  }

  // Clear search
  const clearSearch = () => {
    searchQuery.value = ''
    applyFilters()
  }

  // Go to specific page
  const goToPage = (page: number, meta: { lastPage: number }) => {
    if (page < 1 || page > meta.lastPage) return
    navigateWithFilters(buildQueryParams(page))
  }

  // Check if any filters are active
  const hasActiveFilters = computed(() => {
    return !!(searchQuery.value || selectedCategory.value || selectedTag.value)
  })

  // Get current category label
  const selectedCategoryLabel = computed(() => {
    if (!selectedCategory.value) return null
    return categories.find((c) => c.slug === selectedCategory.value)?.label || null
  })

  return {
    // State
    searchQuery,
    selectedCategory,
    selectedTag,
    isLoading,

    // Computed
    hasActiveFilters,
    selectedCategoryLabel,

    // Actions
    applyFilters,
    clearFilters,
    toggleCategory,
    toggleTag,
    clearSearch,
    goToPage,
  }
}
