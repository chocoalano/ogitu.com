/**
 * Customer Management Composable
 * Handles all customer-related business logic, state management, and API calls
 */
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import type {
  Customer,
  CustomerPaginatedResponse,
  CustomerFilters,
  CustomerStats,
  CustomerDeleteState,
  CustomerStatusOption,
} from '~/components/admin/customers'

export interface UseCustomerManagementConfig {
  initialData: CustomerPaginatedResponse
  initialFilters: CustomerFilters
}

export function useCustomerManagement(config: UseCustomerManagementConfig) {
  const toast = useToast()

  // State
  const isLoading = ref(false)
  const searchQuery = ref(config.initialFilters.search || '')
  const selectedStatus = ref(config.initialFilters.status || 'all')
  const deleteState = ref<CustomerDeleteState>({
    isOpen: false,
    targetId: null,
    targetName: '',
  })

  // Pagination state for TanStack Table
  const pagination = ref({
    pageIndex: config.initialData.meta.currentPage - 1,
    pageSize: config.initialData.meta.perPage,
  })

  // Status options for filter dropdown
  const statusOptions: CustomerStatusOption[] = [
    { label: 'Semua Status', value: 'all' },
    { label: 'Aktif', value: 'active' },
    { label: 'Tidak Aktif', value: 'inactive' },
    { label: 'Terverifikasi', value: 'verified' },
    { label: 'Belum Verifikasi', value: 'unverified' },
  ]

  // Computed stats from current page data
  const computeStats = (data: Customer[], meta: { total: number }): CustomerStats => {
    return {
      total: meta.total,
      active: data.filter((c) => c.isActive).length,
      verified: data.filter((c) => c.isVerified).length,
    }
  }

  // Format currency helper
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  // Fetch data from server
  const fetchData = () => {
    isLoading.value = true

    const params: Record<string, unknown> = {
      page: pagination.value.pageIndex + 1,
      perPage: pagination.value.pageSize,
    }

    if (searchQuery.value) {
      params.search = searchQuery.value
    }

    if (selectedStatus.value && selectedStatus.value !== 'all') {
      params.status = selectedStatus.value
    }

    router.get('/admin/customers', params as Record<string, string | number>, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        isLoading.value = false
      },
    })
  }

  // Handle search
  const handleSearch = () => {
    pagination.value.pageIndex = 0
    fetchData()
  }

  // Handle status filter change
  const handleStatusChange = () => {
    pagination.value.pageIndex = 0
    fetchData()
  }

  // Clear all filters
  const clearFilters = () => {
    searchQuery.value = ''
    selectedStatus.value = 'all'
    pagination.value.pageIndex = 0
    fetchData()
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    pagination.value.pageIndex = page - 1
    fetchData()
  }

  // Update pagination when props change
  const syncPagination = (currentPage: number) => {
    pagination.value.pageIndex = currentPage - 1
  }

  // Delete customer handlers
  const openDeleteModal = (customer: Customer) => {
    deleteState.value = {
      isOpen: true,
      targetId: customer.id,
      targetName: customer.fullName,
    }
  }

  const closeDeleteModal = () => {
    deleteState.value = {
      isOpen: false,
      targetId: null,
      targetName: '',
    }
  }

  const confirmDelete = () => {
    if (!deleteState.value.targetId) return

    router.delete(`/admin/customers/${deleteState.value.targetId}`, {
      onSuccess: () => {
        toast.success('Pelanggan berhasil dihapus')
        closeDeleteModal()
      },
      onError: () => {
        toast.error('Gagal menghapus pelanggan')
      },
    })
  }

  // Toggle active status
  const toggleActive = (customer: Customer) => {
    router.patch(
      `/admin/customers/${customer.id}/active`,
      {},
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Pelanggan berhasil di${customer.isActive ? 'nonaktifkan' : 'aktifkan'}`)
        },
        onError: () => {
          toast.error('Gagal mengubah status pelanggan')
        },
      }
    )
  }

  // Toggle verified status
  const toggleVerified = (customer: Customer) => {
    router.patch(
      `/admin/customers/${customer.id}/verified`,
      {},
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success('Status verifikasi berhasil diubah')
        },
        onError: () => {
          toast.error('Gagal mengubah status verifikasi')
        },
      }
    )
  }

  // Impersonate customer (login as customer)
  const impersonateCustomer = (customer: Customer) => {
    if (!customer.isActive) {
      toast.error('Tidak dapat login sebagai customer yang tidak aktif')
      return
    }

    router.post(
      `/admin/customers/${customer.id}/impersonate`,
      {},
      {
        onSuccess: () => {
          toast.success(`Anda sekarang login sebagai ${customer.fullName}`)
        },
        onError: () => {
          toast.error('Gagal login sebagai customer')
        },
      }
    )
  }

  // Navigate to customer detail
  const viewCustomer = (customer: Customer) => {
    router.visit(`/admin/customers/${customer.id}`)
  }

  // Navigate to edit customer
  const editCustomer = (customer: Customer) => {
    router.visit(`/admin/customers/${customer.id}/edit`)
  }

  return {
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
    formatCurrency,
    fetchData,
    handleSearch,
    handleStatusChange,
    clearFilters,
    handlePageChange,
    syncPagination,

    // Delete handlers
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,

    // Customer actions
    toggleActive,
    toggleVerified,
    impersonateCustomer,
    viewCustomer,
    editCustomer,
  }
}
