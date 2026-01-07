// Order Types for Ogitu E-commerce

export type OrderStatusType =
  | 'pending_payment'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface OrderAddress {
  recipientName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  cityName: string
  provinceName: string
  postalCode: string
}

export interface OrderItem {
  id: number
  productId?: number
  productName: string
  productSku?: string
  variantName: string | null
  price: number
  quantity: number
  subtotal: number
  image: string
}

export interface OrderPayment {
  method: string
  status: string
  transactionId?: string | null
  paidAt?: string | null
  snapToken?: string | null
  snapRedirectUrl?: string | null
}

export interface OrderShipping {
  courier: string
  service: string
  trackingNumber: string | null
  status: string
  shippedAt?: string | null
  deliveredAt?: string | null
}

export interface OrderTimeline {
  status: string
  label: string
  date: string | null
  completed: boolean
}

export interface Order {
  id: number
  orderNumber: string
  status: OrderStatusType
  statusLabel: string
  statusColor: string
  subtotal: number
  tax?: number
  shippingCost: number
  discount: number
  adminFee?: number
  total: number
  customerNotes: string | null
  adminNotes?: string | null
  createdAt: string
  paidAt: string | null
  processedAt?: string | null
  shippedAt: string | null
  deliveredAt: string | null
  cancelledAt?: string | null
  address?: OrderAddress | null
  items: OrderItem[]
  payment: OrderPayment | null
  shipping: OrderShipping | null
  timeline?: OrderTimeline[]
}

export interface StatusOption {
  label: string
  value: string
  icon?: string
  count?: number
}

export interface OrderPagination {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}

export interface OrderFilters {
  status: string
}

// Status configuration for styling
export interface StatusConfig {
  label: string
  color: string
  bgClass: string
  textClass: string
  borderClass: string
  icon: string
  glowClass: string
}

export const ORDER_STATUS_CONFIG: Record<string, StatusConfig> = {
  pending_payment: {
    label: 'Menunggu Pembayaran',
    color: 'warning',
    bgClass: 'bg-amber-500/10 dark:bg-amber-500/20',
    textClass: 'text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-500/30',
    icon: 'i-heroicons-clock',
    glowClass: 'shadow-amber-500/20',
  },
  paid: {
    label: 'Dibayar',
    color: 'info',
    bgClass: 'bg-blue-500/10 dark:bg-blue-500/20',
    textClass: 'text-blue-600 dark:text-blue-400',
    borderClass: 'border-blue-500/30',
    icon: 'i-heroicons-check-circle',
    glowClass: 'shadow-blue-500/20',
  },
  processing: {
    label: 'Diproses',
    color: 'info',
    bgClass: 'bg-indigo-500/10 dark:bg-indigo-500/20',
    textClass: 'text-indigo-600 dark:text-indigo-400',
    borderClass: 'border-indigo-500/30',
    icon: 'i-heroicons-cog-6-tooth',
    glowClass: 'shadow-indigo-500/20',
  },
  shipped: {
    label: 'Dikirim',
    color: 'primary',
    bgClass: 'bg-primary-500/10 dark:bg-primary-500/20',
    textClass: 'text-primary-600 dark:text-primary-400',
    borderClass: 'border-primary-500/30',
    icon: 'i-heroicons-truck',
    glowClass: 'shadow-primary-500/20',
  },
  delivered: {
    label: 'Selesai',
    color: 'success',
    bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-500/30',
    icon: 'i-heroicons-check-badge',
    glowClass: 'shadow-emerald-500/20',
  },
  cancelled: {
    label: 'Dibatalkan',
    color: 'error',
    bgClass: 'bg-red-500/10 dark:bg-red-500/20',
    textClass: 'text-red-600 dark:text-red-400',
    borderClass: 'border-red-500/30',
    icon: 'i-heroicons-x-circle',
    glowClass: 'shadow-red-500/20',
  },
  refunded: {
    label: 'Dikembalikan',
    color: 'neutral',
    bgClass: 'bg-gray-500/10 dark:bg-gray-500/20',
    textClass: 'text-gray-600 dark:text-gray-400',
    borderClass: 'border-gray-500/30',
    icon: 'i-heroicons-arrow-uturn-left',
    glowClass: 'shadow-gray-500/20',
  },
}
