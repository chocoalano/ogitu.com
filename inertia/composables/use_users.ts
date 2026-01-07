import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import type { User, UsersData, UserFilters } from '~/components/admin/users/types'

export interface UseUsersOptions {
  initialData: UsersData
  initialFilters: UserFilters
}

export function useUsers(options: UseUsersOptions) {
  const toast = useToast()

  // State
  const isLoading = ref(false)
  const globalFilter = ref(options.initialFilters.search || '')
  const selectedRole = ref(options.initialFilters.role || 'all')
  const deleteModalOpen = ref(false)
  const deleteTargetId = ref<number | null>(null)
  const deleteTargetName = ref('')

  // Pagination state for TanStack
  const pagination = ref({
    pageIndex: options.initialData.meta.currentPage - 1,
    pageSize: options.initialData.meta.perPage,
  })

  // Role options
  const roleOptions = [
    { label: 'Semua Role', value: 'all' },
    { label: 'Admin', value: 'admin' },
    { label: 'Super Admin', value: 'superadmin' },
  ]

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

    if (selectedRole.value && selectedRole.value !== 'all') {
      params.role = selectedRole.value
    }

    router.get('/admin/users', params, {
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

  // Handle role filter change
  const handleRoleChange = () => {
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
    selectedRole.value = 'all'
    pagination.value.pageIndex = 0
    fetchData()
  }

  // Delete user
  const openDeleteModal = (user: User) => {
    deleteTargetId.value = user.id
    deleteTargetName.value = user.fullName || user.email
    deleteModalOpen.value = true
  }

  const confirmDelete = () => {
    if (!deleteTargetId.value) return

    router.delete(`/admin/users/${deleteTargetId.value}`, {
      onSuccess: () => {
        toast.success('Pengguna berhasil dihapus')
        deleteModalOpen.value = false
        deleteTargetId.value = null
      },
      onError: () => {
        toast.error('Gagal menghapus pengguna')
      },
    })
  }

  // Watch for external pagination changes
  const syncPagination = (currentPage: number) => {
    pagination.value.pageIndex = currentPage - 1
  }

  return {
    // State
    isLoading,
    globalFilter,
    selectedRole,
    pagination,
    deleteModalOpen,
    deleteTargetName,
    roleOptions,

    // Methods
    fetchData,
    handleSearch,
    handleRoleChange,
    handlePageChange,
    clearFilters,
    openDeleteModal,
    confirmDelete,
    syncPagination,
  }
}
