// Notification category mapping based on actual NotificationType
export type NotificationCategory = 'order' | 'payment' | 'stock' | 'system' | 'review' | 'other'

// Color types for Nuxt UI
export type NotificationColorType = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'

// Map actual notification types to display categories
export const getNotificationCategory = (type: string): NotificationCategory => {
  if (type.startsWith('order_')) return 'order'
  if (type.startsWith('product_')) return 'stock'
  if (type.startsWith('withdrawal_')) return 'payment'
  if (type === 'review_new') return 'review'
  if (type === 'system') return 'system'
  return 'other'
}

// Icon mapping based on category
export const categoryIcons: Record<NotificationCategory, string> = {
  order: 'i-heroicons-shopping-bag',
  payment: 'i-heroicons-credit-card',
  stock: 'i-heroicons-cube',
  system: 'i-heroicons-cog-6-tooth',
  review: 'i-heroicons-star',
  other: 'i-heroicons-bell',
}

// Color mapping based on category
export const categoryColors: Record<NotificationCategory, NotificationColorType> = {
  order: 'primary',
  payment: 'success',
  stock: 'warning',
  system: 'info',
  review: 'warning',
  other: 'neutral',
}

// Background class mapping for notification icons
export const categoryBgClasses: Record<NotificationCategory, string> = {
  order: 'bg-violet-100 dark:bg-violet-900/30',
  payment: 'bg-emerald-100 dark:bg-emerald-900/30',
  stock: 'bg-amber-100 dark:bg-amber-900/30',
  system: 'bg-blue-100 dark:bg-blue-900/30',
  review: 'bg-orange-100 dark:bg-orange-900/30',
  other: 'bg-slate-100 dark:bg-slate-700',
}

// Text color class mapping for notification icons
export const categoryTextClasses: Record<NotificationCategory, string> = {
  order: 'text-violet-600 dark:text-violet-400',
  payment: 'text-emerald-600 dark:text-emerald-400',
  stock: 'text-amber-600 dark:text-amber-400',
  system: 'text-blue-600 dark:text-blue-400',
  review: 'text-orange-600 dark:text-orange-400',
  other: 'text-slate-600 dark:text-slate-400',
}

// Helper functions
export const getNotificationIcon = (type: string): string => {
  const category = getNotificationCategory(type)
  return categoryIcons[category]
}

export const getNotificationColor = (type: string): NotificationColorType => {
  const category = getNotificationCategory(type)
  return categoryColors[category]
}

export const getNotificationBgClass = (type: string): string => {
  const category = getNotificationCategory(type)
  return categoryBgClasses[category]
}

export const getNotificationTextClass = (type: string): string => {
  const category = getNotificationCategory(type)
  return categoryTextClasses[category]
}

// Format relative time
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffSecs = Math.floor(diffMs / 1000)
  const diffMins = Math.floor(diffSecs / 60)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffSecs < 60) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

// Get display label for notification type
export const getNotificationTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    order_new: 'Pesanan Baru',
    order_paid: 'Pembayaran',
    order_cancelled: 'Dibatalkan',
    order_shipped: 'Dikirim',
    order_completed: 'Selesai',
    review_new: 'Ulasan Baru',
    product_low_stock: 'Stok Rendah',
    product_out_of_stock: 'Stok Habis',
    withdrawal_approved: 'Penarikan Disetujui',
    withdrawal_rejected: 'Penarikan Ditolak',
    system: 'Sistem',
  }
  return labels[type] || type
}

// Type options for filters
export const typeFilterOptions = [
  { label: 'Semua Tipe', value: 'all', icon: 'i-heroicons-squares-2x2' },
  { label: 'Pesanan', value: 'order', icon: 'i-heroicons-shopping-bag' },
  { label: 'Pembayaran', value: 'payment', icon: 'i-heroicons-credit-card' },
  { label: 'Stok', value: 'stock', icon: 'i-heroicons-cube' },
  { label: 'Sistem', value: 'system', icon: 'i-heroicons-cog-6-tooth' },
  { label: 'Ulasan', value: 'review', icon: 'i-heroicons-star' },
]

export const readStatusOptions = [
  { label: 'Semua', value: 'all' },
  { label: 'Belum Dibaca', value: 'unread' },
  { label: 'Sudah Dibaca', value: 'read' },
]

// Stats interface
export interface NotificationStatsProps {
  total: number
  unreadCount: number
  readCount: number
}

// Filter state interface
export interface NotificationFilterState {
  type: string
  isRead: string
}

// Emits interface
export interface NotificationItemEmits {
  (e: 'read', id: number): void
  (e: 'delete', id: number): void
}
