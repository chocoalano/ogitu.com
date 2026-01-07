<script setup lang="ts">
import { computed, watch } from 'vue'
import { Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import { useCustomerManagement } from '~/composables/use_customer_management'
import {
  CustomerStatsCards,
  CustomerFiltersBar,
  CustomerTable,
  CustomerDeleteModal,
  type Customer,
  type CustomersData,
  type CustomerFilters,
} from '~/components/admin/customers'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  customers?: CustomersData
  filters?: CustomerFilters
}

const props = withDefaults(defineProps<Props>(), {
  customers: () => ({
    data: [],
    meta: {
      total: 0,
      perPage: 10,
      currentPage: 1,
      lastPage: 1,
      firstPage: 1,
    },
  }),
  filters: () => ({
    search: '',
    status: '',
  }),
})

// Initialize composable with props data
const {
  // State
  isLoading,
  searchQuery,
  selectedStatus,
  deleteState,
  pagination,

  // Constants
  statusOptions,

  // Methods
  computeStats,
  handleSearch,
  handleStatusChange,
  clearFilters,
  handlePageChange,
  syncPagination,

  // Delete handlers
  openDeleteModal,
  confirmDelete,

  // Customer actions
  toggleActive,
  toggleVerified,
  impersonateCustomer,
} = useCustomerManagement({
  initialData: props.customers,
  initialFilters: props.filters,
})

// Computed stats
const stats = computed(() => computeStats(props.customers.data, props.customers.meta))

// Watch for pagination changes from server
watch(
  () => props.customers.meta.currentPage,
  (newPage) => syncPagination(newPage)
)
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Kelola Pelanggan</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Kelola data pelanggan toko
        </p>
      </div>
      <Link href="/admin/customers/create">
        <UButton icon="i-heroicons-plus" color="primary">
          Tambah Pelanggan
        </UButton>
      </Link>
    </div>

    <!-- Stats Cards -->
    <CustomerStatsCards :stats="stats" />

    <!-- Table with Filters -->
    <CustomerTable
      v-model:pagination="pagination"
      v-model:global-filter="searchQuery"
      :customers="props.customers.data"
      :meta="props.customers.meta"
      :is-loading="isLoading"
      @toggle-active="toggleActive"
      @toggle-verified="toggleVerified"
      @impersonate="impersonateCustomer"
      @delete="openDeleteModal"
      @page-change="handlePageChange"
    >
      <template #filters>
        <CustomerFiltersBar
          v-model:global-filter="searchQuery"
          v-model:selected-status="selectedStatus"
          :status-options="statusOptions"
          @search="handleSearch"
          @status-change="handleStatusChange"
          @clear="clearFilters"
        />
      </template>
    </CustomerTable>

    <!-- Delete Confirmation Modal -->
    <CustomerDeleteModal
      v-model:open="deleteState.isOpen"
      :customer-name="deleteState.targetName"
      @confirm="confirmDelete"
    />
  </div>
</template>
