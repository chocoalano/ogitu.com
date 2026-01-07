// Analytics Types

export interface SalesSummary {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  totalItems: number
  revenueGrowth: number
  ordersGrowth: number
}

export interface DailySale {
  date: string
  orders: number
  revenue: number
}

export interface SalesByStatus {
  pending_payment: number
  paid: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
}

export interface TopSellingProduct {
  id: number
  name: string
  image: string | null
  totalQuantity: number
  totalRevenue: number
}

export interface RecentSaleOrder {
  id: number
  orderNumber: string
  customerName: string
  total: number
  status: string
  createdAt: string
}

export interface ProductPerformance {
  id: number
  name: string
  slug: string
  sku: string
  image: string | null
  category: string
  price: number
  stock: number
  status: string
  totalSold: number
  viewCount: number
  rating: number
  totalReviews: number
  periodSold: number
  periodRevenue: number
}

export interface ProductSummary {
  totalProducts: number
  activeProducts: number
  outOfStockProducts: number
  lowStockProducts: number
}

export interface TopProduct {
  id: number
  name: string
  image: string | null
  viewCount?: number
  rating?: number
  totalReviews?: number
}

export interface FinanceSummary {
  grossRevenue: number
  netRevenue: number
  totalRevenue: number
  totalDiscount: number
  totalShippingCost: number
  totalAdminFee: number
  totalOrders: number
  averageOrderValue: number
}

export interface WalletSummary {
  topupTotal: number
  withdrawalTotal: number
  commissionTotal: number
  refundTotal: number
  netWalletFlow: number
}

export interface MonthlyRevenue {
  month: string
  revenue: number
}

export interface PaymentMethod {
  method: string
  count: number
  total: number
}

export interface AnalyticsFilters {
  period: string
  dateFrom: string
  dateTo: string
  sortBy?: string
}

export interface AnalyticsPagination {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}

// Period options
export const periodOptions = [
  { label: '7 Hari Terakhir', value: '7days' },
  { label: '30 Hari Terakhir', value: '30days' },
  { label: '90 Hari Terakhir', value: '90days' },
  { label: '1 Tahun Terakhir', value: 'year' },
  { label: 'Custom', value: 'custom' },
]

export const sortByOptions = [
  { label: 'Terjual Terbanyak', value: 'totalSold' },
  { label: 'Rating Tertinggi', value: 'rating' },
  { label: 'Dilihat Terbanyak', value: 'viewCount' },
  { label: 'Stok Terendah', value: 'stock' },
]

// Helper functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('id-ID').format(num)
}

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export const formatPercent = (num: number): string => {
  const sign = num >= 0 ? '+' : ''
  return `${sign}${num.toFixed(1)}%`
}

// Status labels and colors
export const orderStatusLabels: Record<string, string> = {
  pending_payment: 'Menunggu Pembayaran',
  paid: 'Dibayar',
  processing: 'Diproses',
  shipped: 'Dikirim',
  delivered: 'Selesai',
  cancelled: 'Dibatalkan',
}

export const orderStatusColors: Record<string, string> = {
  pending_payment: 'warning',
  paid: 'success',
  processing: 'info',
  shipped: 'primary',
  delivered: 'success',
  cancelled: 'error',
}
