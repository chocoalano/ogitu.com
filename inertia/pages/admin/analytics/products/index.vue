<script setup lang="ts">
import { ref } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import ProductStatsCards from '~/components/admin/analytics/ProductStatsCards.vue'
import ProductFilters from '~/components/admin/analytics/ProductFilters.vue'
import ProductPerformanceTable from '~/components/admin/analytics/ProductPerformanceTable.vue'
import TopProductsCards from '~/components/admin/analytics/TopProductsCards.vue'
import AnalyticsPaginationComponent from '~/components/admin/analytics/AnalyticsPagination.vue'
import AdminLayout from '~/layouts/admin.vue'
import type {
  ProductSummary,
  ProductPerformance,
  TopProduct,
  AnalyticsPagination as PaginationType,
} from '~/types/analytics'

interface Props {
  summary: ProductSummary
  products: ProductPerformance[]
  pagination: PaginationType
  topByViews: TopProduct[]
  topByRating: TopProduct[]
  filters: {
    period: string
    sortBy: string
    search: string
  }
}

const props = defineProps<Props>()

defineOptions({
  layout: AdminLayout,
})

// Filter state
const period = ref(props.filters.period || '30days')
const sortBy = ref(props.filters.sortBy || 'totalSold')
const search = ref(props.filters.search || '')

const applyFilters = () => {
  router.get(
    '/admin/analytics/products',
    {
      period: period.value,
      sortBy: sortBy.value,
      search: search.value || undefined,
    },
    {
      preserveState: true,
      preserveScroll: true,
    }
  )
}

const handlePageChange = (page: number) => {
  router.get(
    '/admin/analytics/products',
    {
      period: period.value,
      sortBy: sortBy.value,
      search: search.value || undefined,
      page,
    },
    {
      preserveState: true,
      preserveScroll: true,
    }
  )
}

// Export to CSV
const exportCSV = () => {
  const params = new URLSearchParams({
    period: period.value,
    sortBy: sortBy.value,
    export: 'csv',
  })

  if (search.value) params.append('search', search.value)

  window.open(`/admin/analytics/products?${params.toString()}`, '_blank')
}
</script>

<template>
  <Head title="Performa Produk" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Performa Produk</h1>
        <p class="text-gray-500">Analisis performa dan penjualan produk</p>
      </div>
      <UButton color="gray" @click="exportCSV">
        <UIcon name="i-heroicons-arrow-down-tray" class="mr-2" />
        Export CSV
      </UButton>
    </div>

    <!-- Stats Cards -->
    <ProductStatsCards :summary="summary" />

    <!-- Top Products -->
    <TopProductsCards :by-views="topByViews" :by-rating="topByRating" />

    <!-- Filters -->
    <UCard>
      <ProductFilters
        v-model:period="period"
        v-model:sort-by="sortBy"
        v-model:search="search"
        @apply="applyFilters"
      />
    </UCard>

    <!-- Products Table -->
    <ProductPerformanceTable :products="products" />

    <!-- Pagination -->
    <AnalyticsPaginationComponent
      v-if="pagination.lastPage > 1"
      :pagination="pagination"
      @change-page="handlePageChange"
    />
  </div>
</template>
