<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import TransactionStatsCards from '~/components/admin/finance/TransactionStatsCards.vue'
import TransactionFilters from '~/components/admin/finance/TransactionFilters.vue'
import TransactionTable from '~/components/admin/finance/TransactionTable.vue'
import FinancePagination from '~/components/admin/finance/FinancePagination.vue'
import type {
  Transaction,
  TransactionStats,
  FinancePagination as PaginationType,
  TransactionFilters as FiltersType,
} from '~/types/finance'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  transactions: Transaction[]
  pagination: PaginationType
  stats: TransactionStats
  filters: FiltersType
}

const props = defineProps<Props>()

// Filter state
const type = ref(props.filters.type || 'all')
const status = ref(props.filters.status || 'all')
const search = ref(props.filters.search)
const dateFrom = ref(props.filters.dateFrom)
const dateTo = ref(props.filters.dateTo)
const isLoading = ref(false)

// Apply filters
const applyFilters = () => {
  isLoading.value = true
  router.get(
    '/admin/finance/transactions',
    {
      type: type.value === 'all' ? '' : type.value,
      status: status.value === 'all' ? '' : status.value,
      search: search.value,
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
    },
    {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        isLoading.value = false
      },
    }
  )
}

// Reset filters
const resetFilters = () => {
  type.value = 'all'
  status.value = 'all'
  search.value = ''
  dateFrom.value = ''
  dateTo.value = ''
  applyFilters()
}

// Pagination
const goToPage = (page: number) => {
  isLoading.value = true
  router.get(
    '/admin/finance/transactions',
    {
      type: type.value === 'all' ? '' : type.value,
      status: status.value === 'all' ? '' : status.value,
      search: search.value,
      dateFrom: dateFrom.value,
      dateTo: dateTo.value,
      page,
    },
    {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        isLoading.value = false
      },
    }
  )
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Riwayat Transaksi</h1>
      <p class="text-gray-500 dark:text-gray-400">
        Lihat semua transaksi wallet dari customer
      </p>
    </div>

    <!-- Stats -->
    <TransactionStatsCards :stats="stats" />

    <!-- Filters -->
    <TransactionFilters
      v-model:type="type"
      v-model:status="status"
      v-model:search="search"
      v-model:date-from="dateFrom"
      v-model:date-to="dateTo"
      @filter="applyFilters"
      @reset="resetFilters"
    />

    <!-- Table -->
    <TransactionTable :transactions="transactions" :is-loading="isLoading" />

    <!-- Pagination -->
    <FinancePagination :pagination="pagination" @page-change="goToPage" />
  </div>
</template>
