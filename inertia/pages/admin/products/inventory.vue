<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import AdminLayout from '~/layouts/admin.vue'
import type { PaginationMeta, ProductCategory } from '~/components/admin/products'
import {
  InventoryHeader,
  InventoryStats,
  InventoryFilters,
  InventoryTable,
  InventoryPagination,
  InventoryUnsavedWarning,
} from '~/components/admin/products/inventory'

// Import types from the types file directly
import type {
  InventoryProduct,
  InventoryStats as InventoryStatsData,
  InventoryFilters as InventoryFiltersData,
  EditedStock,
  StockUpdate,
} from '~/components/admin/products/inventory/types'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  products?: InventoryProduct[]
  meta?: PaginationMeta
  stats?: InventoryStatsData
  categories?: ProductCategory[]
  filters?: InventoryFiltersData
  admin?: {
    id: number
    storeName: string
    slug: string
    status: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  meta: () => ({ currentPage: 1, lastPage: 1, perPage: 20, total: 0, firstPage: 1, hasNext: false, hasPrev: false }),
  stats: () => ({ totalProducts: 0, inStock: 0, lowStock: 0, outOfStock: 0, totalVariants: 0 }),
  categories: () => [],
  filters: () => ({ search: '', category: '', status: '', page: 1 }),
  admin: () => ({ id: 0, storeName: '', slug: '', status: '' }),
})

// Local state
const currentFilters = ref<InventoryFiltersData>({ ...props.filters })
const isLoading = ref(false)
const expandedRows = ref<Set<number>>(new Set())
const globalFilter = ref(props.filters.search || '')

// Edit mode state
const editMode = ref(false)
const editedStocks = ref<Map<number, EditedStock>>(new Map())
const isSaving = ref(false)

// Toast notification
const toast = useToast()

// Computed: Check if there are unsaved changes
const hasChanges = computed(() => editedStocks.value.size > 0)

// CSRF Token helper
const getXsrfToken = (): string => {
  const token = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1]
  return token ? decodeURIComponent(token) : ''
}

// Toggle row expansion
const toggleRow = (productId: number) => {
  if (expandedRows.value.has(productId)) {
    expandedRows.value.delete(productId)
  } else {
    expandedRows.value.add(productId)
  }
}

// Find product by ID
const findProduct = (productId: number): InventoryProduct | undefined => {
  return props.products.find((p) => p.id === productId)
}

// Update product stock value
const updateProductStock = (productId: number, newStock: number) => {
  const product = findProduct(productId)
  if (!product) return

  if (!editedStocks.value.has(productId)) {
    editedStocks.value.set(productId, {
      stock: product.stock,
      variantStocks: new Map(),
    })
  }
  const edited = editedStocks.value.get(productId)!
  edited.stock = newStock

  // If stock reverts to original and no variant changes, remove from edited
  if (edited.stock === product.stock && edited.variantStocks.size === 0) {
    editedStocks.value.delete(productId)
  }
}

// Update variant stock value
const updateVariantStock = (productId: number, variantId: number, newStock: number) => {
  const product = findProduct(productId)
  if (!product) return

  const variant = product.variants.find((v) => v.id === variantId)
  if (!variant) return

  if (!editedStocks.value.has(productId)) {
    editedStocks.value.set(productId, {
      stock: product.stock,
      variantStocks: new Map(),
    })
  }
  const edited = editedStocks.value.get(productId)!

  if (newStock === variant.stock) {
    edited.variantStocks.delete(variantId)
  } else {
    edited.variantStocks.set(variantId, newStock)
  }

  // If no changes, remove from edited
  if (edited.stock === product.stock && edited.variantStocks.size === 0) {
    editedStocks.value.delete(productId)
  }
}

// Save all changes
const saveChanges = async () => {
  if (!hasChanges.value) return

  isSaving.value = true

  try {
    const updates: StockUpdate[] = Array.from(editedStocks.value.entries()).map(([productId, data]) => ({
      productId,
      stock: data.stock,
      variantStocks: Array.from(data.variantStocks.entries()).map(([variantId, stock]) => ({
        variantId,
        stock,
      })),
    }))

    const response = await fetch('/admin/products/inventory/bulk-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({ updates }),
    })

    const result = await response.json()

    if (result.success) {
      toast.success('Berhasil', result.message)
      editedStocks.value.clear()
      editMode.value = false
      router.reload({ only: ['products', 'stats'] })
    } else {
      toast.error('Gagal', result.message)
    }
  } catch (error) {
    toast.error('Error', 'Terjadi kesalahan saat menyimpan')
  } finally {
    isSaving.value = false
  }
}

// Cancel edit mode
const cancelEdit = () => {
  editedStocks.value.clear()
  editMode.value = false
}

// Toggle edit mode
const toggleEditMode = () => {
  editMode.value = true
}

// Fetch products with current filters
const fetchProducts = (options: Record<string, any> = {}) => {
  isLoading.value = true

  const params: Record<string, any> = {
    page: options.page || props.meta.currentPage,
    perPage: options.perPage || props.meta.perPage,
    ...currentFilters.value,
  }

  if (globalFilter.value) {
    params.search = globalFilter.value
  }

  // Remove undefined/null values
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined || params[key] === null || params[key] === '') {
      delete params[key]
    }
  })

  router.get('/admin/products/inventory', params, {
    preserveState: true,
    onFinish: () => {
      isLoading.value = false
    },
  })
}

// Handle filter changes
const handleSearch = () => {
  currentFilters.value.search = globalFilter.value
  fetchProducts({ page: 1 })
}

const handleReset = () => {
  currentFilters.value = {}
  globalFilter.value = ''
  fetchProducts({ page: 1 })
}

// Handle page change
const handlePageChange = (page: number) => {
  fetchProducts({ page })
}

// Handle per page change
const handlePerPageChange = (perPage: number) => {
  fetchProducts({ page: 1, perPage })
}

// Watch for filter changes in edit mode
watch(editMode, (newVal) => {
  if (!newVal) {
    editedStocks.value.clear()
  }
})
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <InventoryHeader
      :store-name="admin.storeName"
      :edit-mode="editMode"
      :is-saving="isSaving"
      :has-changes="hasChanges"
      @toggle-edit="toggleEditMode"
      @save="saveChanges"
      @cancel="cancelEdit"
    />

    <!-- Stats Cards -->
    <InventoryStats :stats="stats" />

    <!-- Inventory Table Card -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <!-- Filters -->
      <InventoryFilters
        :filters="currentFilters"
        :categories="categories"
        :search="globalFilter"
        @update:filters="currentFilters = $event"
        @update:search="globalFilter = $event"
        @search="handleSearch"
        @reset="handleReset"
      />

      <!-- Table -->
      <InventoryTable
        :products="products"
        :edit-mode="editMode"
        :expanded-rows="expandedRows"
        :edited-stocks="editedStocks"
        :is-loading="isLoading"
        @toggle-expand="toggleRow"
        @update-product-stock="updateProductStock"
        @update-variant-stock="updateVariantStock"
      />

      <!-- Pagination -->
      <InventoryPagination
        :meta="meta"
        @page-change="handlePageChange"
        @per-page-change="handlePerPageChange"
      />
    </div>

    <!-- Unsaved Changes Warning -->
    <InventoryUnsavedWarning
      :show="hasChanges && editMode"
      :changes-count="editedStocks.size"
      :is-saving="isSaving"
      @save="saveChanges"
    />
  </div>
</template>
