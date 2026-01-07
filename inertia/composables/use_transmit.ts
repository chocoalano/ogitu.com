import { Transmit } from '@adonisjs/transmit-client'
import { ref, onMounted, onUnmounted, watch, type Ref } from 'vue'

// Create a singleton transmit instance
let transmitInstance: Transmit | null = null

export function getTransmitInstance() {
  if (!transmitInstance) {
    transmitInstance = new Transmit({
      baseUrl: window.location.origin,
    })
  }
  return transmitInstance
}

// Generic notification interface
interface Notification {
  id: number
  type: string
  title: string
  message: string
  data: Record<string, unknown> | null
  isRead: boolean
  readAt?: string | null
  createdAt: string
  icon: string
  color: string
}

// Composable for admin notifications
export function useAdminNotifications() {
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)
  const isConnected = ref(false)

  let subscription: any = null

  const connect = async () => {
    if (subscription) return

    const transmit = getTransmitInstance()
    const channel = 'admin/notifications'

    try {
      subscription = transmit.subscription(channel)
      await subscription.create()

      subscription.onMessage((message: any) => {
        if (message.event === 'new_notification') {
          notifications.value.unshift({
            id: message.id,
            type: message.type,
            title: message.title,
            message: message.message,
            data: null,
            isRead: message.isRead,
            createdAt: message.createdAt,
            icon: message.icon,
            color: message.color,
          })
          if (!message.isRead) {
            unreadCount.value++
          }
        }
      })

      isConnected.value = true
    } catch (error) {
      console.error('Failed to connect to admin notifications channel:', error)
      isConnected.value = false
    }
  }

  const disconnect = async () => {
    if (subscription) {
      await subscription.delete()
      subscription = null
      isConnected.value = false
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    notifications,
    unreadCount,
    isConnected,
    connect,
    disconnect,
    setNotifications: (data: Notification[]) => {
      notifications.value = data
    },
    setUnreadCount: (count: number) => {
      unreadCount.value = count
    },
    markAsRead: (id: number) => {
      const notification = notifications.value.find((n) => n.id === id)
      if (notification && !notification.isRead) {
        notification.isRead = true
        notification.readAt = new Date().toISOString()
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
    },
    markAllAsRead: () => {
      notifications.value.forEach((n) => {
        if (!n.isRead) {
          n.isRead = true
          n.readAt = new Date().toISOString()
        }
      })
      unreadCount.value = 0
    },
    removeNotification: (id: number) => {
      const index = notifications.value.findIndex((n) => n.id === id)
      if (index !== -1) {
        const notification = notifications.value[index]
        if (!notification.isRead) {
          unreadCount.value = Math.max(0, unreadCount.value - 1)
        }
        notifications.value.splice(index, 1)
      }
    },
  }
}

// Composable for customer notifications
export function useCustomerNotifications(customerId: Ref<number>) {
  const notifications = ref<Notification[]>([])
  const unreadCount = ref(0)
  const isConnected = ref(false)

  let subscription: any = null

  const connect = async () => {
    if (!customerId.value || subscription) return

    const transmit = getTransmitInstance()
    const channel = `customer/${customerId.value}/notifications`

    try {
      subscription = transmit.subscription(channel)
      await subscription.create()

      subscription.onMessage((message: any) => {
        if (message.event === 'new_notification') {
          notifications.value.unshift({
            id: message.id,
            type: message.type,
            title: message.title,
            message: message.message,
            data: message.data || null,
            isRead: message.isRead,
            createdAt: message.createdAt,
            icon: message.icon,
            color: message.color,
          })
          if (!message.isRead) {
            unreadCount.value++
          }
        }
      })

      isConnected.value = true
    } catch (error) {
      console.error('Failed to connect to customer notifications channel:', error)
      isConnected.value = false
    }
  }

  const disconnect = async () => {
    if (subscription) {
      await subscription.delete()
      subscription = null
      isConnected.value = false
    }
  }

  watch(customerId, async (newId, oldId) => {
    if (newId !== oldId) {
      await disconnect()
      if (newId) {
        await connect()
      }
    }
  })

  onMounted(() => {
    if (customerId.value) {
      connect()
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    notifications,
    unreadCount,
    isConnected,
    connect,
    disconnect,
    setNotifications: (data: Notification[]) => {
      notifications.value = data
    },
    setUnreadCount: (count: number) => {
      unreadCount.value = count
    },
    markAsRead: (id: number) => {
      const notification = notifications.value.find((n) => n.id === id)
      if (notification && !notification.isRead) {
        notification.isRead = true
        notification.readAt = new Date().toISOString()
        unreadCount.value = Math.max(0, unreadCount.value - 1)
      }
    },
    markAllAsRead: () => {
      notifications.value.forEach((n) => {
        if (!n.isRead) {
          n.isRead = true
          n.readAt = new Date().toISOString()
        }
      })
      unreadCount.value = 0
    },
    clearNotifications: () => {
      notifications.value = []
      unreadCount.value = 0
    },
  }
}

// Composable for order updates
export function useOrderUpdates(orderId: Ref<number | null>) {
  const orderStatus = ref<string | null>(null)
  const lastUpdate = ref<any>(null)
  const isConnected = ref(false)

  let subscription: any = null

  const connect = async () => {
    if (!orderId.value || subscription) return

    const transmit = getTransmitInstance()
    const channel = `order/${orderId.value}/updates`

    try {
      subscription = transmit.subscription(channel)
      await subscription.create()

      subscription.onMessage((message: any) => {
        if (message.event === 'status_changed') {
          orderStatus.value = message.status
          lastUpdate.value = message
        }
      })

      isConnected.value = true
    } catch (error) {
      console.error('Failed to connect to order updates channel:', error)
      isConnected.value = false
    }
  }

  const disconnect = async () => {
    if (subscription) {
      await subscription.delete()
      subscription = null
      isConnected.value = false
    }
  }

  watch(orderId, async (newId, oldId) => {
    if (newId !== oldId) {
      await disconnect()
      if (newId) {
        await connect()
      }
    }
  })

  onMounted(() => {
    if (orderId.value) {
      connect()
    }
  })

  onUnmounted(() => {
    disconnect()
  })

  return {
    orderStatus,
    lastUpdate,
    isConnected,
    connect,
    disconnect,
  }
}

// Interface for review reply update
interface ReviewReplyUpdate {
  event: string
  reviewId: number
  adminReply: string
  adminRepliedAt: string
}

// Composable for admin reviews realtime updates
export function useAdminReviews() {
  const isConnected = ref(false)
  const lastReplyUpdate = ref<ReviewReplyUpdate | null>(null)

  let subscription: any = null
  const onReplyCallbacks: ((data: ReviewReplyUpdate) => void)[] = []

  const connect = async () => {
    if (subscription) return

    const transmit = getTransmitInstance()
    const channel = 'admin/reviews'

    try {
      subscription = transmit.subscription(channel)
      await subscription.create()

      subscription.onMessage((message: ReviewReplyUpdate) => {
        if (message.event === 'review_replied') {
          lastReplyUpdate.value = message
          onReplyCallbacks.forEach((cb) => cb(message))
        }
      })

      isConnected.value = true
    } catch (error) {
      console.error('Failed to connect to admin reviews channel:', error)
      isConnected.value = false
    }
  }

  const disconnect = async () => {
    if (subscription) {
      await subscription.delete()
      subscription = null
      isConnected.value = false
    }
  }

  const onReplyReceived = (callback: (data: ReviewReplyUpdate) => void) => {
    onReplyCallbacks.push(callback)
    return () => {
      const index = onReplyCallbacks.indexOf(callback)
      if (index > -1) {
        onReplyCallbacks.splice(index, 1)
      }
    }
  }

  onMounted(() => {
    connect()
  })

  onUnmounted(() => {
    disconnect()
    onReplyCallbacks.length = 0
  })

  return {
    isConnected,
    lastReplyUpdate,
    connect,
    disconnect,
    onReplyReceived,
  }
}
