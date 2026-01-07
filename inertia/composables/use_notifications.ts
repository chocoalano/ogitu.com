import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import type {
  AdminNotification,
  NotificationMeta,
  NotificationFilters,
} from '../types/admin_notification.js'

export interface UseNotificationsOptions {
  initialNotifications?: AdminNotification[]
  initialMeta?: NotificationMeta
  initialUnreadCount?: number
  initialFilters?: NotificationFilters
}

export function useNotifications(options: UseNotificationsOptions = {}) {
  // State
  const notifications = ref<AdminNotification[]>(
    Array.isArray(options.initialNotifications) ? [...options.initialNotifications] : []
  )
  const unreadCount = ref(options.initialUnreadCount || 0)
  const isLoading = ref(false)
  const currentPage = ref(options.initialMeta?.currentPage || 1)
  const selectedType = ref(options.initialFilters?.type || 'all')
  const selectedReadStatus = ref(options.initialFilters?.isRead || 'all')

  // Computed
  const hasActiveFilters = computed(() => {
    return selectedType.value !== 'all' || selectedReadStatus.value !== 'all'
  })

  const hasReadNotifications = computed(() => {
    return notifications.value.some((n: AdminNotification) => n.isRead)
  })

  // Sync with props
  const syncWithProps = (props: {
    notifications?: AdminNotification[]
    unreadCount?: number
    meta?: NotificationMeta
    filters?: NotificationFilters
  }) => {
    if (props.notifications) {
      notifications.value = Array.isArray(props.notifications) ? [...props.notifications] : []
    }
    if (props.unreadCount !== undefined) {
      unreadCount.value = props.unreadCount
    }
    if (props.meta?.currentPage) {
      currentPage.value = props.meta.currentPage
    }
    if (props.filters) {
      selectedType.value = props.filters.type || 'all'
      selectedReadStatus.value = props.filters.isRead || 'all'
    }
  }

  // Fetch notifications
  const fetchNotifications = (fetchOptions: { page?: number; preserveScroll?: boolean } = {}) => {
    isLoading.value = true

    const params: Record<string, any> = {
      page: fetchOptions.page || currentPage.value,
      type: selectedType.value,
      isRead: selectedReadStatus.value,
    }

    // Remove 'all' values
    if (params.type === 'all') delete params.type
    if (params.isRead === 'all') delete params.isRead

    router.get('/admin/notifications', params, {
      preserveState: true,
      preserveScroll: fetchOptions.preserveScroll ?? true,
      onFinish: () => {
        isLoading.value = false
      },
    })
  }

  // Apply filters
  const applyFilters = () => {
    currentPage.value = 1
    fetchNotifications({ page: 1 })
  }

  // Reset filters
  const resetFilters = () => {
    selectedType.value = 'all'
    selectedReadStatus.value = 'all'
    currentPage.value = 1
    fetchNotifications({ page: 1 })
  }

  // Handle page change
  const handlePageChange = (page: number) => {
    currentPage.value = page
    fetchNotifications({ page, preserveScroll: false })
  }

  // Mark notification as read
  const markAsRead = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`/admin/notifications/${id}/read`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      if (response.ok) {
        const notification = notifications.value.find((n: AdminNotification) => n.id === id)
        if (notification && !notification.isRead) {
          notification.isRead = true
          notification.readAt = new Date().toISOString()
          unreadCount.value = Math.max(0, unreadCount.value - 1)
        }
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to mark notification as read:', error)
      return false
    }
  }

  // Mark all as read
  const markAllAsRead = async (): Promise<boolean> => {
    try {
      const response = await fetch('/admin/notifications/read-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      if (response.ok) {
        notifications.value.forEach((n: AdminNotification) => {
          if (!n.isRead) {
            n.isRead = true
            n.readAt = new Date().toISOString()
          }
        })
        unreadCount.value = 0
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error)
      return false
    }
  }

  // Delete notification
  const deleteNotification = async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`/admin/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      if (response.ok) {
        const index = notifications.value.findIndex((n: AdminNotification) => n.id === id)
        if (index !== -1) {
          const notification = notifications.value[index]
          if (!notification.isRead) {
            unreadCount.value = Math.max(0, unreadCount.value - 1)
          }
          notifications.value.splice(index, 1)
        }
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to delete notification:', error)
      return false
    }
  }

  // Clear all read notifications
  const clearReadNotifications = async (): Promise<boolean> => {
    try {
      const response = await fetch('/admin/notifications/clear-read', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      })

      if (response.ok) {
        notifications.value = notifications.value.filter((n: AdminNotification) => !n.isRead)
        return true
      }
      return false
    } catch (error) {
      console.error('Failed to clear read notifications:', error)
      return false
    }
  }

  return {
    // State
    notifications,
    unreadCount,
    isLoading,
    currentPage,
    selectedType,
    selectedReadStatus,

    // Computed
    hasActiveFilters,
    hasReadNotifications,

    // Methods
    syncWithProps,
    fetchNotifications,
    applyFilters,
    resetFilters,
    handlePageChange,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearReadNotifications,
  }
}
