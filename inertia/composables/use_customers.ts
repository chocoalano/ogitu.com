import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from './use_toast.js'
import type { Customer, CustomersData, CustomerFilters } from '../components/admin/customers/types.js'

export interface UseCustomersOptions {
  initialData: CustomersData
  initialFilters: CustomerFilters
}

export function useCustomers(options: UseCustomersOptions) {
  const toast = useToast()

  // State
  const isLoading = ref(false)
  const globalFilter = ref(options.initialFilters.search || '')
  const selectedStatus = ref(options.initialFilters.status || 'all')
  const deleteModalOpen = ref(false)
  const deleteTargetId = ref<number | null>(null)
  const deleteTargetName = ref('')

  // Pagination state for TanStack
  const pagination = ref({
    pageIndex: options.initialData.meta.currentPage - 1,
    pageSize: options.initialData.meta.perPage,
  })

  // Status options
  const statusOptions = [
    { label: 'Semua Status', value: 'all' },
    { label: 'Aktif', value: 'active' },
    { label: 'Tidak Aktif', value: 'inactive' },
    { label: 'Terverifikasi', value: 'verified' },
    { label: 'Belum Verifikasi', value: 'unverified' },
  ]

  // Computed stats
  const stats = computed(() => ({
    total: options.initialData.meta.total,
    active: options.initialData.data.filter((c: Customer) => c.isActive).length,
    verified: options.initialData.data.filter((c: Customer) => c.isVerified).length,
  }))

  // Fetch data from server
  const fetchData = () => {
    isLoading.value = true

    const params: Record<string, string | number> = {
      page: pagination.value.pageIndex + 1,
      perPage: pagination.value.pageSize,
    }

    if (globalFilter.value) {
      params.search = globalFilter.value
    }

    if (selectedStatus.value && selectedStatus.value !== 'all') {
      params.status = selectedStatus.value
    }

    router.get('/admin/customers', params, {
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

  // Handle page change
  const handlePageChange = (page: number) => {
    pagination.value.pageIndex = page - 1
    fetchData()
  }

  // Clear filters
  const clearFilters = () => {
    globalFilter.value = ''
    selectedStatus.value = 'all'
    pagination.value.pageIndex = 0
    fetchData()
  }

  // Delete customer
  const openDeleteModal = (customer: Customer) => {
    deleteTargetId.value = customer.id
    deleteTargetName.value = customer.fullName
    deleteModalOpen.value = true
  }

  const confirmDelete = () => {
    if (!deleteTargetId.value) return

    router.delete(`/admin/customers/${deleteTargetId.value}`, {
      onSuccess: () => {
        toast.success('Pelanggan berhasil dihapus')
        deleteModalOpen.value = false
        deleteTargetId.value = null
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

  // Watch for external pagination changes
  const syncPagination = (currentPage: number) => {
    pagination.value.pageIndex = currentPage - 1
  }

  return {
    // State
    isLoading,
    globalFilter,
    selectedStatus,
    pagination,
    deleteModalOpen,
    deleteTargetName,
    statusOptions,
    stats,

    // Methods
    fetchData,
    handleSearch,
    handleStatusChange,
    handlePageChange,
    clearFilters,
    openDeleteModal,
    confirmDelete,
    toggleActive,
    toggleVerified,
    syncPagination,
  }
}
