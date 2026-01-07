<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import WithdrawalStatsCards from '~/components/admin/finance/WithdrawalStatsCards.vue'
import WithdrawalFilters from '~/components/admin/finance/WithdrawalFilters.vue'
import WithdrawalTable from '~/components/admin/finance/WithdrawalTable.vue'
import WithdrawalActionModal from '~/components/admin/finance/WithdrawalActionModal.vue'
import FinancePagination from '~/components/admin/finance/FinancePagination.vue'
import type {
  WithdrawalRequest,
  WithdrawalStats,
  FinancePagination as PaginationType,
  WithdrawalFilters as FiltersType,
} from '~/types/finance'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  withdrawals: WithdrawalRequest[]
  pagination: PaginationType
  stats: WithdrawalStats
  filters: FiltersType
}

const props = defineProps<Props>()

// Filter state
const status = ref(props.filters.status || 'all')
const search = ref(props.filters.search)
const dateFrom = ref(props.filters.dateFrom)
const dateTo = ref(props.filters.dateTo)
const isLoading = ref(false)

// Modal state
const showApproveModal = ref(false)
const showRejectModal = ref(false)
const selectedWithdrawal = ref<WithdrawalRequest | null>(null)

// Apply filters
const applyFilters = () => {
  isLoading.value = true
  router.get(
    '/admin/finance/withdraw',
    {
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
    '/admin/finance/withdraw',
    {
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

// Handle approve
const handleApprove = (withdrawal: WithdrawalRequest) => {
  selectedWithdrawal.value = withdrawal
  showApproveModal.value = true
}

// Handle reject
const handleReject = (withdrawal: WithdrawalRequest) => {
  selectedWithdrawal.value = withdrawal
  showRejectModal.value = true
}
</script>

<template>
  <div class="p-6 space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Permintaan Withdraw</h1>
      <p class="text-gray-500 dark:text-gray-400">
        Kelola permintaan penarikan saldo dari customer
      </p>
    </div>

    <!-- Stats -->
    <WithdrawalStatsCards :stats="stats" />

    <!-- Filters -->
    <WithdrawalFilters
      v-model:status="status"
      v-model:search="search"
      v-model:date-from="dateFrom"
      v-model:date-to="dateTo"
      @filter="applyFilters"
      @reset="resetFilters"
    />

    <!-- Table -->
    <WithdrawalTable
      :withdrawals="withdrawals"
      :is-loading="isLoading"
      @approve="handleApprove"
      @reject="handleReject"
    />

    <!-- Pagination -->
    <FinancePagination :pagination="pagination" @page-change="goToPage" />

    <!-- Modals -->
    <WithdrawalActionModal
      v-model="showApproveModal"
      :withdrawal="selectedWithdrawal"
      type="approve"
    />
    <WithdrawalActionModal
      v-model="showRejectModal"
      :withdrawal="selectedWithdrawal"
      type="reject"
    />
  </div>
</template>
