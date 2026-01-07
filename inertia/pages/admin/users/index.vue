<script setup lang="ts">
import { watch } from 'vue'
import { Link } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import { useUsers } from '~/composables/use_users'
import {
  UserStatsCard,
  UserFiltersBar,
  UserTable,
  UserDeleteModal,
} from '~/components/admin/users'
import type { User, UsersData, UserFilters } from '~/components/admin/users/types'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  users?: UsersData
  filters?: UserFilters
}

const props = withDefaults(defineProps<Props>(), {
  users: () => ({
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
    role: '',
  }),
})

// Initialize composable with props
const {
  isLoading,
  globalFilter,
  selectedRole,
  pagination,
  deleteModalOpen,
  deleteTargetName,
  roleOptions,
  handleSearch,
  handleRoleChange,
  handlePageChange,
  clearFilters,
  openDeleteModal,
  confirmDelete,
  syncPagination,
} = useUsers({
  initialData: props.users,
  initialFilters: props.filters,
})

// Watch for props changes
watch(
  () => props.users.meta.currentPage,
  (newPage) => {
    syncPagination(newPage)
  }
)

// Handle user delete
const handleDelete = (user: User) => {
  openDeleteModal(user)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Kelola Pengguna</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Kelola pengguna admin dan super admin
        </p>
      </div>
      <Link href="/admin/users/create">
        <UButton icon="i-heroicons-plus" color="primary">
          Tambah Pengguna
        </UButton>
      </Link>
    </div>

    <!-- Stats -->
    <UserStatsCard :total="props.users.meta.total" />

    <!-- Table Card -->
    <UserTable
      v-model:pagination="pagination"
      v-model:global-filter="globalFilter"
      :users="props.users.data"
      :meta="props.users.meta"
      :is-loading="isLoading"
      @delete="handleDelete"
      @page-change="handlePageChange"
    >
      <template #filters>
        <UserFiltersBar
          v-model:global-filter="globalFilter"
          v-model:selected-role="selectedRole"
          :role-options="roleOptions"
          @search="handleSearch"
          @role-change="handleRoleChange"
          @clear="clearFilters"
        />
      </template>
    </UserTable>

    <!-- Delete Modal -->
    <UserDeleteModal
      v-model:open="deleteModalOpen"
      :user-name="deleteTargetName"
      @confirm="confirmDelete"
    />
  </div>
</template>
