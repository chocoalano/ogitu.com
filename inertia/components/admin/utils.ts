// Dashboard utility functions

/**
 * Format currency to IDR
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

/**
 * Format number with locale
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num)
}

/**
 * Format date relative to now
 */
export const formatRelativeDate = (dateString: string): string => {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Baru saja'
  if (diffMins < 60) return `${diffMins} menit lalu`
  if (diffHours < 24) return `${diffHours} jam lalu`
  if (diffDays < 7) return `${diffDays} hari lalu`

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

/**
 * Format short date
 */
export const formatShortDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
  })
}

/**
 * Get order status color for Nuxt UI Badge
 */
export const getOrderStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    pending: 'warning',
    pending_payment: 'warning',
    paid: 'info',
    processing: 'primary',
    shipped: 'secondary',
    delivered: 'success',
    completed: 'success',
    cancelled: 'error',
    refunded: 'neutral',
    failed: 'error',
  }
  return colors[status] || 'neutral'
}

/**
 * Get order status label
 */
export const getOrderStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pending',
    pending_payment: 'Menunggu Pembayaran',
    paid: 'Dibayar',
    processing: 'Diproses',
    shipped: 'Dikirim',
    delivered: 'Selesai',
    completed: 'Selesai',
    cancelled: 'Dibatalkan',
    refunded: 'Refund',
    failed: 'Gagal',
  }
  return labels[status] || status
}

/**
 * Get product status color
 */
export const getProductStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'emerald',
    draft: 'amber',
    inactive: 'neutral',
    out_of_stock: 'red',
  }
  return colors[status] || 'neutral'
}

/**
 * Get product status label
 */
export const getProductStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Aktif',
    draft: 'Draft',
    inactive: 'Nonaktif',
    out_of_stock: 'Stok Habis',
  }
  return labels[status] || status
}

/**
 * Truncate text with ellipsis
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

/**
 * Calculate discount percentage
 */
export const calculateDiscountPercent = (price: number, discountPrice: number | null): number => {
  if (!discountPrice || discountPrice >= price) return 0
  return Math.round(((price - discountPrice) / price) * 100)
}
