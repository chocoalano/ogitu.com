<script setup lang="ts">
import { ref } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import SalesStatsCards from '~/components/admin/analytics/SalesStatsCards.vue'
import SalesChart from '~/components/admin/analytics/SalesChart.vue'
import SalesByStatusChart from '~/components/admin/analytics/SalesByStatusChart.vue'
import TopSellingProducts from '~/components/admin/analytics/TopSellingProducts.vue'
import RecentOrdersTable from '~/components/admin/analytics/RecentOrdersTable.vue'
import PeriodSelector from '~/components/admin/analytics/PeriodSelector.vue'
import AdminLayout from '~/layouts/admin.vue'
import type {
  SalesSummary,
  DailySale,
  SalesByStatus,
  TopSellingProduct,
  RecentSaleOrder,
} from '~/types/analytics'

interface Props {
  summary: SalesSummary
  dailySales: DailySale[]
  salesByStatus: SalesByStatus
  topProducts: TopSellingProduct[]
  recentOrders: RecentSaleOrder[]
  filters: {
    period: string
    dateFrom: string
    dateTo: string
  }
}

const props = defineProps<Props>()

defineOptions({
  layout: AdminLayout,
})

// Filter state
const period = ref(props.filters.period || '30days')
const dateFrom = ref(props.filters.dateFrom || '')
const dateTo = ref(props.filters.dateTo || '')

const applyFilters = () => {
  const params: Record<string, string> = {
    period: period.value,
  }

  if (period.value === 'custom') {
    if (dateFrom.value) params.dateFrom = dateFrom.value
    if (dateTo.value) params.dateTo = dateTo.value
  }

  router.get('/admin/analytics/sales', params, {
    preserveState: true,
    preserveScroll: true,
  })
}

// Export to CSV
const exportCSV = () => {
  const params = new URLSearchParams({
    period: period.value,
    export: 'csv',
  })

  if (period.value === 'custom') {
    if (dateFrom.value) params.append('dateFrom', dateFrom.value)
    if (dateTo.value) params.append('dateTo', dateTo.value)
  }

  window.open(`/admin/analytics/sales?${params.toString()}`, '_blank')
}
</script>

<template>
  <Head title="Analisis Penjualan" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Analisis Penjualan</h1>
        <p class="text-gray-500">Statistik dan laporan penjualan</p>
      </div>
      <UButton color="gray" @click="exportCSV">
        <UIcon name="i-heroicons-arrow-down-tray" class="mr-2" />
        Export CSV
      </UButton>
    </div>

    <!-- Period Selector -->
    <UCard>
      <PeriodSelector
        v-model:period="period"
        v-model:date-from="dateFrom"
        v-model:date-to="dateTo"
        @apply="applyFilters"
      />
    </UCard>

    <!-- Stats Cards -->
    <SalesStatsCards :summary="summary" />

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2">
        <SalesChart :data="dailySales" />
      </div>
      <SalesByStatusChart :data="salesByStatus" />
    </div>

    <!-- Products and Orders -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TopSellingProducts :products="topProducts" />
      <RecentOrdersTable :orders="recentOrders" />
    </div>
  </div>
</template>
