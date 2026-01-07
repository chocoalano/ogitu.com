<script setup lang="ts">
import { ref } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import FinanceStatsCards from '~/components/admin/analytics/FinanceStatsCards.vue'
import WalletSummaryCard from '~/components/admin/analytics/WalletSummaryCard.vue'
import MonthlyRevenueChart from '~/components/admin/analytics/MonthlyRevenueChart.vue'
import PaymentMethodsChart from '~/components/admin/analytics/PaymentMethodsChart.vue'
import SalesChart from '~/components/admin/analytics/SalesChart.vue'
import PeriodSelector from '~/components/admin/analytics/PeriodSelector.vue'
import AdminLayout from '~/layouts/admin.vue'
import type {
  FinanceSummary,
  WalletSummary,
  DailySale,
  MonthlyRevenue,
  PaymentMethod,
} from '~/types/analytics'

interface Props {
  summary: FinanceSummary
  walletSummary: WalletSummary
  dailyRevenue: DailySale[]
  monthlyData: MonthlyRevenue[]
  paymentMethods: PaymentMethod[]
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

  router.get('/admin/analytics/finance', params, {
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

  window.open(`/admin/analytics/finance?${params.toString()}`, '_blank')
}
</script>

<template>
  <Head title="Laporan Keuangan" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Laporan Keuangan</h1>
        <p class="text-gray-500">Ringkasan keuangan dan pembayaran</p>
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

    <!-- Finance Stats -->
    <FinanceStatsCards :summary="summary" />

    <!-- Wallet Summary -->
    <WalletSummaryCard :summary="walletSummary" />

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MonthlyRevenueChart :data="monthlyData" />
      <PaymentMethodsChart :data="paymentMethods" />
    </div>

    <!-- Daily Revenue Chart using Sales Chart -->
    <SalesChart :data="dailyRevenue" />
  </div>
</template>
