<script setup lang="ts">
import { h, ref, computed, resolveComponent, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import AdminLayout from '~/layouts/admin.vue'
import type { TableColumn } from '@nuxt/ui'
import {
  ProductStatsCards,
  ProductFilters,
  type Product,
  type ProductStats,
  type ProductCategory,
  type PaginationMeta,
} from '~/components/admin/products'
import type { ProductFilters as ProductFiltersType } from '~/components/admin/products/types'
import { getStatusConfig, getConditionConfig, formatPrice, formatNumber } from '~/components/admin/products/types'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  products?: Product[]
  meta?: PaginationMeta
  stats?: ProductStats
  categories?: ProductCategory[]
  filters?: ProductFiltersType
  admin?: {
    id: number
    storeName: string
    slug: string
    status: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  products: () => [],
  meta: () => ({
    total: 0,
    perPage: 10,
    currentPage: 1,
    lastPage: 1,
    firstPage: 1,
    firstPageUrl: '',
    lastPageUrl: '',
    nextPageUrl: null,
    previousPageUrl: null,
    hasNext: false,
    hasPrev: false,
  }),
  stats: () => ({
    total: 0,
    active: 0,
    inactive: 0,
    draft: 0,
    outOfStock: 0,
    lowStock: 0,
  }),
  categories: () => [],
  filters: () => ({
    search: '',
    category: null,
    status: 'all',
    condition: 'all',
    minPrice: null,
    maxPrice: null,
    sortBy: 'createdAt',
    sortDirection: 'desc' as const,
  }),
  admin: () => ({
    id: 0,
    storeName: 'Admin',
    slug: '',
    status: 'active',
  }),
})

// Table ref
const table = ref<any>(null)

// Local state
const sortBy = ref('createdAt')
const sortDirection = ref<'asc' | 'desc'>('desc')
const currentFilters = ref<ProductFiltersType>({ ...props.filters })
const currentPage = ref(props.meta.currentPage)
const isLoading = ref(false)
const deleteModalOpen = ref(false)
const deleteTargetId = ref<number | null>(null)
const bulkDeleteModalOpen = ref(false)

// Global filter for search
const globalFilter = ref(props.filters.search || '')

// Watch for filter changes and update local state
watch(() => props.filters, (newFilters) => {
  currentFilters.value = { ...newFilters }
  globalFilter.value = newFilters.search || ''
}, { deep: true })

// Watch for meta changes and update currentPage
watch(() => props.meta.currentPage, (newPage) => {
  currentPage.value = newPage
})

// Watch for currentPage changes and fetch new data
watch(currentPage, (newPage, oldPage) => {
  // Only fetch if the page actually changed and it's not from props update
  if (newPage !== oldPage && newPage !== props.meta.currentPage) {
    table.value?.tableApi?.resetRowSelection()
    window.scrollTo({ top: 0, behavior: 'smooth' })

    isLoading.value = true

    const params: Record<string, any> = {
      page: newPage,
      perPage: props.meta.perPage,
      sortBy: sortBy.value,
      sortDirection: sortDirection.value,
    }

    // Add filters
    if (currentFilters.value.search) {
      params.search = currentFilters.value.search
    }
    if (currentFilters.value.status && currentFilters.value.status !== 'all') {
      params.status = currentFilters.value.status
    }
    if (currentFilters.value.condition && currentFilters.value.condition !== 'all') {
      params.condition = currentFilters.value.condition
    }
    if (currentFilters.value.category) {
      params.category = currentFilters.value.category
    }
    if (currentFilters.value.minPrice) {
      params.minPrice = currentFilters.value.minPrice
    }
    if (currentFilters.value.maxPrice) {
      params.maxPrice = currentFilters.value.maxPrice
    }

    router.get('/admin/products', params, {
      preserveState: true,
      preserveScroll: false,
      onFinish: () => {
        isLoading.value = false
      },
    })
  }
})

// Toast notification
const toast = useToast()

// Table columns definition
const columns: TableColumn<Product>[] = [
  {
    id: 'select',
    header: ({ table: tbl }) =>
      h(resolveComponent('UCheckbox'), {
        modelValue: tbl.getIsAllPageRowsSelected(),
        indeterminate: tbl.getIsSomePageRowsSelected(),
        'onUpdate:modelValue': (value: boolean) => tbl.toggleAllPageRowsSelected(!!value),
      }),
    cell: ({ row }) =>
      h(resolveComponent('UCheckbox'), {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean) => row.toggleSelected(!!value),
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Produk',
    cell: ({ row }) => {
      const product = row.original
      return h('div', { class: 'flex items-center gap-3' }, [
        h(
          'div',
          { class: 'w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0' },
          product.primaryImage
            ? h('img', {
                src: product.primaryImage.url,
                alt: product.name,
                class: 'w-full h-full object-cover',
              })
            : h('div', { class: 'w-full h-full flex items-center justify-center' }, [
                h(resolveComponent('UIcon'), { name: 'i-heroicons-photo', class: 'w-6 h-6 text-slate-400' }),
              ])
        ),
        h('div', { class: 'min-w-0' }, [
          h(
            Link,
            {
              href: `/admin/products/${product.id}`,
              class:
                'font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 truncate block max-w-xs',
            },
            () => product.name
          ),
          h('p', { class: 'text-xs text-slate-500 dark:text-slate-400' }, [
            `SKU: ${product.sku}`,
            product.category ? h('span', { class: 'ml-2' }, `• ${product.category.name}`) : null,
          ]),
          h('div', { class: 'flex items-center gap-2 mt-1' }, [
            h(
              resolveComponent('UBadge'),
              { color: getConditionConfig(product.condition).color, variant: 'subtle', size: 'xs' },
              () => getConditionConfig(product.condition).label
            ),
            product.isFeatured
              ? h(resolveComponent('UBadge'), { color: 'warning', variant: 'subtle', size: 'xs' }, () => [
                  h(resolveComponent('UIcon'), { name: 'i-heroicons-star', class: 'w-3 h-3 mr-0.5' }),
                  'Featured',
                ])
              : null,
          ]),
        ]),
      ])
    },
  },
  {
    accessorKey: 'price',
    header: 'Harga',
    cell: ({ row }) => {
      const product = row.original
      return h('div', {}, [
        h('p', { class: 'font-medium text-slate-900 dark:text-white' }, formatPrice(product.discountPrice || product.price)),
        product.discountPrice
          ? h('p', { class: 'text-xs text-slate-500 line-through' }, formatPrice(product.price))
          : null,
      ])
    },
  },
  {
    accessorKey: 'stock',
    header: 'Stok',
    cell: ({ row }) => {
      const stock = row.getValue('stock') as number
      const colorClass =
        stock === 0 ? 'text-red-500' : stock <= 10 ? 'text-amber-500' : 'text-slate-900 dark:text-white'
      return h('div', { class: 'flex items-center gap-2' }, [
        h('span', { class: `font-medium ${colorClass}` }, formatNumber(stock)),
        stock <= 10 && stock > 0
          ? h(resolveComponent('UIcon'), { name: 'i-heroicons-exclamation-triangle', class: 'w-4 h-4 text-amber-500' })
          : null,
      ])
    },
  },
  {
    accessorKey: 'totalSold',
    header: 'Terjual',
    cell: ({ row }) =>
      h('span', { class: 'text-slate-900 dark:text-white' }, formatNumber(row.getValue('totalSold') as number)),
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.getValue('status') as string
      const config = getStatusConfig(status)
      return h(resolveComponent('UBadge'), { color: config.color, variant: 'subtle' }, () => config.label)
    },
  },
  {
    id: 'actions',
    header: () => h('div', { class: 'text-right' }, 'Aksi'),
    cell: ({ row }) => {
      const product = row.original
      return h('div', { class: 'flex items-center justify-end gap-1' }, [
        h(resolveComponent('UButton'), {
          to: `/admin/products/${product.id}`,
          icon: 'i-heroicons-eye',
          color: 'neutral',
          variant: 'ghost',
          size: 'xs',
        }),
        h(resolveComponent('UButton'), {
          to: `/admin/products/${product.id}/edit`,
          icon: 'i-heroicons-pencil',
          color: 'neutral',
          variant: 'ghost',
          size: 'xs',
        }),
        h(resolveComponent('UButton'), {
          icon: 'i-heroicons-trash',
          color: 'error',
          variant: 'ghost',
          size: 'xs',
          onClick: () => handleDelete(product.id),
        }),
      ])
    },
    enableSorting: false,
  },
]

// Computed: Selected row IDs from table
const tableSelectedIds = computed((): number[] => {
  const selectedRows = table.value?.tableApi?.getSelectedRowModel().rows || []
  return selectedRows.map((row: any) => row.original.id)
})

// Fetch products with current filters and pagination
const fetchProducts = (options: Record<string, any> = {}) => {
  isLoading.value = true

  const params: Record<string, any> = {
    page: options.page || props.meta.currentPage,
    perPage: options.perPage || props.meta.perPage,
    sortBy: sortBy.value,
    sortDirection: sortDirection.value,
  }

  // Add filters only if they have values
  if (currentFilters.value.search) {
    params.search = currentFilters.value.search
  }
  if (currentFilters.value.status && currentFilters.value.status !== 'all') {
    params.status = currentFilters.value.status
  }
  if (currentFilters.value.condition && currentFilters.value.condition !== 'all') {
    params.condition = currentFilters.value.condition
  }
  if (currentFilters.value.category) {
    params.category = currentFilters.value.category
  }
  if (currentFilters.value.minPrice) {
    params.minPrice = currentFilters.value.minPrice
  }
  if (currentFilters.value.maxPrice) {
    params.maxPrice = currentFilters.value.maxPrice
  }

  router.get('/admin/products', params, {
    preserveState: true,
    preserveScroll: true,
    onFinish: () => {
      isLoading.value = false
    },
  })
}

// Handle filter change
const handleFiltersUpdate = (filters: ProductFiltersType) => {
  currentFilters.value = filters
}

// Handle search
const handleSearch = () => {
  table.value?.tableApi?.resetRowSelection()
  fetchProducts({ page: 1 })
}

// Handle reset
const handleReset = () => {
  table.value?.tableApi?.resetRowSelection()
  sortBy.value = 'createdAt'
  sortDirection.value = 'desc'
  globalFilter.value = ''
  fetchProducts({ page: 1 })
}

// Handle per page change
const handlePerPageChange = (perPage: number) => {
  table.value?.tableApi?.resetRowSelection()
  window.scrollTo({ top: 0, behavior: 'smooth' })

  isLoading.value = true

  const params: Record<string, any> = {
    page: 1,
    perPage,
    sortBy: sortBy.value,
    sortDirection: sortDirection.value,
  }

  // Add filters
  if (currentFilters.value.search) {
    params.search = currentFilters.value.search
  }
  if (currentFilters.value.status && currentFilters.value.status !== 'all') {
    params.status = currentFilters.value.status
  }
  if (currentFilters.value.condition && currentFilters.value.condition !== 'all') {
    params.condition = currentFilters.value.condition
  }
  if (currentFilters.value.category) {
    params.category = currentFilters.value.category
  }
  if (currentFilters.value.minPrice) {
    params.minPrice = currentFilters.value.minPrice
  }
  if (currentFilters.value.maxPrice) {
    params.maxPrice = currentFilters.value.maxPrice
  }

  router.get('/admin/products', params, {
    preserveState: true,
    preserveScroll: false,
    onFinish: () => {
      isLoading.value = false
    },
  })
}

// Handle single delete
const handleDelete = (id: number) => {
  deleteTargetId.value = id
  deleteModalOpen.value = true
}

const confirmDelete = async () => {
  if (!deleteTargetId.value) return

  try {
    const response = await fetch(`/admin/products/${deleteTargetId.value}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Berhasil', data.message)
      router.reload({ only: ['products', 'meta', 'stats'] })
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    toast.error('Error', 'Terjadi kesalahan saat menghapus produk')
  } finally {
    deleteModalOpen.value = false
    deleteTargetId.value = null
  }
}

// Handle bulk action
const handleBulkAction = async (action: string) => {
  const ids = tableSelectedIds.value
  if (ids.length === 0) return

  if (action === 'delete') {
    bulkDeleteModalOpen.value = true
    return
  }

  // Bulk status update
  try {
    const response = await fetch('/admin/products/bulk-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        productIds: ids,
        status: action,
      }),
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Berhasil', data.message)
      table.value?.tableApi?.resetRowSelection()
      router.reload({ only: ['products', 'meta', 'stats'] })
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    toast.error('Error', 'Terjadi kesalahan')
  }
}

const confirmBulkDelete = async () => {
  const ids = tableSelectedIds.value
  try {
    const response = await fetch('/admin/products/bulk-delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      body: JSON.stringify({
        productIds: ids,
      }),
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Berhasil', data.message)
      table.value?.tableApi?.resetRowSelection()
      router.reload({ only: ['products', 'meta', 'stats'] })
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    toast.error('Error', 'Terjadi kesalahan saat menghapus produk')
  } finally {
    bulkDeleteModalOpen.value = false
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Produk</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Kelola semua produk toko {{ admin.storeName }}
        </p>
      </div>
      <Link href="/admin/products/create">
        <UButton icon="i-heroicons-plus" color="primary" size="md"> Tambah Produk </UButton>
      </Link>
    </div>

    <!-- Stats Cards -->
    <ProductStatsCards :stats="stats" />

    <!-- Filters -->
    <ProductFilters
      :filters="currentFilters"
      :categories="categories"
      @update:filters="handleFiltersUpdate"
      @search="handleSearch"
      @reset="handleReset"
    />

    <!-- Products Table Card -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <!-- Bulk Actions Bar -->
      <div
        v-if="tableSelectedIds.length > 0"
        class="flex items-center justify-between px-4 py-3 bg-violet-50 dark:bg-violet-900/20 border-b border-violet-200 dark:border-violet-800"
      >
        <span class="text-sm text-violet-700 dark:text-violet-300">
          {{ tableSelectedIds.length }} produk dipilih
        </span>
        <div class="flex items-center gap-2">
          <UButton
            size="sm"
            color="success"
            variant="soft"
            icon="i-heroicons-check-circle"
            @click="handleBulkAction('active')"
          >
            Aktifkan
          </UButton>
          <UButton
            size="sm"
            color="warning"
            variant="soft"
            icon="i-heroicons-pause-circle"
            @click="handleBulkAction('inactive')"
          >
            Nonaktifkan
          </UButton>
          <UButton size="sm" color="error" variant="soft" icon="i-heroicons-trash" @click="handleBulkAction('delete')">
            Hapus
          </UButton>
        </div>
      </div>

      <!-- Loading Overlay -->
      <div v-if="isLoading" class="p-8 flex items-center justify-center">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-violet-500 animate-spin" />
      </div>

      <!-- Table -->
      <UTable
        v-else
        ref="table"
        :data="products"
        :columns="columns"
        class="w-full"
      >
        <template #empty>
          <div class="px-4 py-12 text-center">
            <div class="flex flex-col items-center">
              <UIcon name="i-heroicons-cube" class="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
              <p class="text-slate-500 dark:text-slate-400 mb-4">Belum ada produk</p>
              <Link href="/admin/products/create">
                <UButton icon="i-heroicons-plus" color="primary"> Tambah Produk </UButton>
              </Link>
            </div>
          </div>
        </template>
      </UTable>

      <!-- Server-Side Pagination -->
      <div
        v-if="meta.total > 0"
        class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-700 px-4 py-3"
      >
        <div class="text-sm text-slate-500 dark:text-slate-400">
          Menampilkan {{ (meta.currentPage - 1) * meta.perPage + 1 }} -
          {{ Math.min(meta.currentPage * meta.perPage, meta.total) }} dari {{ meta.total }} produk
        </div>
        <div class="flex items-center gap-4">
          <USelect
            :model-value="meta.perPage"
            :items="[
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
              { label: '100', value: 100 },
            ]"
            value-key="value"
            @update:model-value="(val: any) => handlePerPageChange(Number(val))"
            size="sm"
            class="w-20"
          />
          <UPagination
            v-model:page="currentPage"
            :total="meta.total"
            :items-per-page="meta.perPage"
            :sibling-count="1"
            show-edges
            size="sm"
          />
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <UModal
      v-model:open="deleteModalOpen"
      title="Hapus Produk"
      description="Apakah Anda yakin ingin menghapus produk ini?"
      :ui="{ overlay: 'z-[100]', content: 'z-[100]' }"
    >
      <template #content>
        <div class="p-6 max-h-[85vh] overflow-y-auto">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <UIcon name="i-heroicons-trash" class="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Hapus Produk</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">Apakah Anda yakin ingin menghapus produk ini?</p>
            </div>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Tindakan ini tidak dapat dibatalkan. Produk akan dihapus secara permanen.
          </p>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="outline" @click="deleteModalOpen = false"> Batal </UButton>
            <UButton color="error" @click="confirmDelete"> Hapus </UButton>
          </div>
        </div>
      </template>
    </UModal>

    <!-- Bulk Delete Confirmation Modal -->
    <UModal
      v-model:open="bulkDeleteModalOpen"
      title="Hapus Produk Terpilih"
      description="Apakah Anda yakin ingin menghapus produk-produk terpilih?"
      :ui="{ overlay: 'z-[100]', content: 'z-[100]' }"
    >
      <template #content>
        <div class="p-6 max-h-[85vh] overflow-y-auto">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <UIcon name="i-heroicons-trash" class="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
                Hapus {{ tableSelectedIds.length }} Produk
              </h3>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Apakah Anda yakin ingin menghapus produk-produk ini?
              </p>
            </div>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
            Tindakan ini tidak dapat dibatalkan. Semua produk yang dipilih akan dihapus secara permanen.
          </p>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="outline" @click="bulkDeleteModalOpen = false"> Batal </UButton>
            <UButton color="error" @click="confirmBulkDelete"> Hapus {{ tableSelectedIds.length }} Produk </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
