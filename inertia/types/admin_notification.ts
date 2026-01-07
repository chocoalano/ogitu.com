export type NotificationType =
  | 'order_new'
  | 'order_paid'
  | 'order_cancelled'
  | 'order_shipped'
  | 'order_completed'
  | 'review_new'
  | 'product_low_stock'
  | 'product_out_of_stock'
  | 'withdrawal_approved'
  | 'withdrawal_rejected'
  | 'system'

export interface AdminNotification {
  id: number
  type: NotificationType
  title: string
  message: string
  data: Record<string, unknown> | null
  isRead: boolean
  readAt: string | null
  createdAt: string
  icon: string
  color: string
}

export interface NotificationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
}

export interface NotificationFilters {
  type: string
  isRead: string
}

export interface NotificationTypeStats {
  [key: string]: number
}

export interface NotificationStats {
  total: number
  unread: number
  byType: NotificationTypeStats
}
