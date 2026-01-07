<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import AdminLayout from '~/layouts/admin.vue'
import { useAdminNotifications } from '~/composables/use_transmit'
import { useNotifications } from '~/composables/use_notifications'
import NotificationHeader from '~/components/admin/notifications/NotificationHeader.vue'
import NotificationStats from '~/components/admin/notifications/NotificationStats.vue'
import NotificationFilterBar from '~/components/admin/notifications/NotificationFilterBar.vue'
import NotificationList from '~/components/admin/notifications/NotificationList.vue'
import NotificationPagination from '~/components/admin/notifications/NotificationPagination.vue'
import ConfirmModal from '~/components/admin/notifications/ConfirmModal.vue'
import type {
  AdminNotification,
  NotificationMeta,
  NotificationFilters as NotificationFiltersType,
  NotificationTypeStats,
} from '~/types/admin_notification'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  admin: {
    id: number
    name: string
  }
  notifications: AdminNotification[]
  meta: NotificationMeta
  unreadCount: number
  typeStats: NotificationTypeStats
  filters: NotificationFiltersType
}

const props = withDefaults(defineProps<Props>(), {
  admin: () => ({ id: 0, name: 'Admin' }),
  notifications: () => [],
  meta: () => ({
    total: 0,
    perPage: 20,
    currentPage: 1,
    lastPage: 1,
    firstPage: 1,
  }),
  unreadCount: 0,
  typeStats: () => ({}),
  filters: () => ({
    type: 'all',
    isRead: 'all',
  }),
})

// Use notifications composable
const {
  notifications: localNotifications,
  unreadCount: localUnreadCount,
  isLoading,
  currentPage,
  selectedType,
  selectedReadStatus,
  hasActiveFilters,
  hasReadNotifications,
  syncWithProps,
  applyFilters,
  resetFilters,
  handlePageChange,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearReadNotifications,
} = useNotifications({
  initialNotifications: props.notifications,
  initialMeta: props.meta,
  initialUnreadCount: props.unreadCount,
  initialFilters: props.filters,
})

// Modal state
const deleteModalOpen = ref(false)
const deleteTargetId = ref<number | null>(null)
const clearReadModalOpen = ref(false)

// Watch for props changes from server
watch(
  () => props.notifications,
  () => syncWithProps({ notifications: props.notifications }),
  { deep: true }
)

watch(
  () => props.unreadCount,
  () => syncWithProps({ unreadCount: props.unreadCount })
)

watch(
  () => props.meta?.currentPage,
  () => syncWithProps({ meta: props.meta })
)

// Setup realtime with transmit
const {
  isConnected,
  setNotifications,
  setUnreadCount,
  markAsRead: transmitMarkAsRead,
  markAllAsRead: transmitMarkAllAsRead,
} = useAdminNotifications()

// Set initial data for transmit
onMounted(() => {
  setNotifications(localNotifications.value)
  setUnreadCount(localUnreadCount.value)
})

// Computed stats
const readNotificationsCount = computed(() => {
  return (props.meta?.total ?? 0) - localUnreadCount.value
})

// Event handlers
const handleMarkAsRead = async (id: number) => {
  const success = await markAsRead(id)
  if (success) {
    transmitMarkAsRead(id)
  }
}

const handleMarkAllAsRead = async () => {
  const success = await markAllAsRead()
  if (success) {
    transmitMarkAllAsRead()
  }
}

const openDeleteModal = (id: number) => {
  deleteTargetId.value = id
  deleteModalOpen.value = true
}

const handleDelete = async () => {
  if (!deleteTargetId.value) return

  await deleteNotification(deleteTargetId.value)
  deleteModalOpen.value = false
  deleteTargetId.value = null
}

const handleClearRead = async () => {
  await clearReadNotifications()
  clearReadModalOpen.value = false
}

const handleFilterChange = () => {
  applyFilters()
}

const handleResetFilters = () => {
  resetFilters()
}

const handlePageUpdate = (page: number) => {
  handlePageChange(page)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <NotificationHeader
      :is-connected="isConnected"
      :unread-count="localUnreadCount"
      :has-read-notifications="hasReadNotifications"
      @mark-all-as-read="handleMarkAllAsRead"
      @clear-read="clearReadModalOpen = true"
    />

    <!-- Stats Cards -->
    <NotificationStats
      :total="props.meta?.total ?? 0"
      :unread-count="localUnreadCount"
      :read-count="readNotificationsCount"
    />

    <!-- Filters -->
    <NotificationFilterBar
      v-model:selected-type="selectedType"
      v-model:selected-read-status="selectedReadStatus"
      :type-stats="props.typeStats"
      @filter="handleFilterChange"
      @reset="handleResetFilters"
    />

    <!-- Notifications List -->
    <NotificationList
      :notifications="localNotifications"
      :is-loading="isLoading"
      :has-filters="hasActiveFilters"
      @read="handleMarkAsRead"
      @delete="openDeleteModal"
      @reset-filters="handleResetFilters"
    >
      <template #pagination>
        <NotificationPagination
          :current-page="currentPage"
          :total="props.meta?.total ?? 0"
          :per-page="props.meta?.perPage ?? 20"
          :last-page="props.meta?.lastPage ?? 1"
          @update:current-page="handlePageUpdate"
        />
      </template>
    </NotificationList>

    <!-- Delete Confirmation Modal -->
    <ConfirmModal
      v-model:open="deleteModalOpen"
      title="Hapus Notifikasi"
      description="Apakah Anda yakin ingin menghapus notifikasi ini?"
      message="Tindakan ini tidak dapat dibatalkan."
      confirm-label="Hapus"
      variant="danger"
      @confirm="handleDelete"
    />

    <!-- Clear Read Modal -->
    <ConfirmModal
      v-model:open="clearReadModalOpen"
      title="Hapus Notifikasi Dibaca"
      description="Hapus semua notifikasi yang sudah dibaca?"
      message="Semua notifikasi yang sudah ditandai sebagai dibaca akan dihapus secara permanen."
      confirm-label="Hapus Semua"
      variant="warning"
      @confirm="handleClearRead"
    />
  </div>
</template>
