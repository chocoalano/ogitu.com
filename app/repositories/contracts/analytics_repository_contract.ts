import { DateTime } from 'luxon'
import Order from '#models/order'

// =====================================
// Filter Types
// =====================================

export interface DateRangeFilter {
  period: string // '7days', '30days', '90days', 'year', 'custom'
  dateFrom?: string
  dateTo?: string
}

export interface ProductAnalyticsFilter extends DateRangeFilter {
  sortBy?: 'totalSold' | 'revenue' | 'views' | 'rating'
  search?: string
  page?: number
  perPage?: number
}

// =====================================
// Sales Analytics Types
// =====================================

export interface SalesSummary {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  totalItems: number
  revenueGrowth: number
  ordersGrowth: number
}

export interface DailySalesData {
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

export interface TopProductItem {
  id: number
  name: string
  image: string | null
  totalQuantity: number
  totalRevenue: number
}

export interface RecentOrderItem {
  id: number
  orderNumber: string
  customerName: string
  total: number
  status: string
  createdAt: string
}

export interface SalesAnalyticsResult {
  summary: SalesSummary
  dailySales: DailySalesData[]
  salesByStatus: SalesByStatus
  topProducts: TopProductItem[]
  recentOrders: RecentOrderItem[]
}

// =====================================
// Product Analytics Types
// =====================================

export interface ProductSummary {
  totalProducts: number
  activeProducts: number
  outOfStockProducts: number
  lowStockProducts: number
}

export interface ProductPerformanceItem {
  id: number
  name: string
  slug: string
  sku: string | null
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

export interface TopProductByViews {
  id: number
  name: string
  image: string | null
  viewCount: number
}

export interface TopProductByRating {
  id: number
  name: string
  image: string | null
  rating: number
  totalReviews: number
}

export interface ProductAnalyticsResult {
  summary: ProductSummary
  products: ProductPerformanceItem[]
  pagination: {
    currentPage: number
    lastPage: number
    total: number
    perPage: number
  }
  topByViews: TopProductByViews[]
  topByRating: TopProductByRating[]
}

// =====================================
// Finance Analytics Types
// =====================================

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

export interface PaymentMethodData {
  method: string
  count: number
  total: number
}

export interface MonthlyRevenueData {
  month: string
  revenue: number
}

export interface FinanceAnalyticsResult {
  summary: FinanceSummary
  walletSummary: WalletSummary
  dailyRevenue: DailySalesData[]
  monthlyData: MonthlyRevenueData[]
  paymentMethods: PaymentMethodData[]
}

// =====================================
// Helper Types
// =====================================

export interface DateRange {
  startDate: DateTime
  endDate: DateTime
}

// =====================================
// Repository Contract
// =====================================

export interface AnalyticsRepositoryContract {
  // Date helpers
  getDateRange(period: string, dateFrom?: string, dateTo?: string): DateRange

  // Sales Analytics
  getSalesAnalytics(filter: DateRangeFilter): Promise<SalesAnalyticsResult>
  getOrdersInDateRange(
    startDate: DateTime,
    endDate: DateTime,
    statusFilter?: string[]
  ): Promise<Order[]>
  getPreviousPeriodOrders(
    startDate: DateTime,
    endDate: DateTime,
    statusFilter?: string[]
  ): Promise<Order[]>
  getTopSellingProducts(
    startDate: DateTime,
    endDate: DateTime,
    limit?: number
  ): Promise<TopProductItem[]>
  getRecentOrders(limit?: number): Promise<RecentOrderItem[]>

  // Product Analytics
  getProductAnalytics(filter: ProductAnalyticsFilter): Promise<ProductAnalyticsResult>
  getProductSummary(): Promise<ProductSummary>
  getTopProductsByViews(limit?: number): Promise<TopProductByViews[]>
  getTopProductsByRating(limit?: number): Promise<TopProductByRating[]>

  // Finance Analytics
  getFinanceAnalytics(filter: DateRangeFilter): Promise<FinanceAnalyticsResult>
  getFinanceSummary(startDate: DateTime, endDate: DateTime): Promise<FinanceSummary>
  getWalletSummary(startDate: DateTime, endDate: DateTime): Promise<WalletSummary>
  getPaymentMethodsData(startDate: DateTime, endDate: DateTime): Promise<PaymentMethodData[]>
  getMonthlyRevenue(months?: number): Promise<MonthlyRevenueData[]>

  // Utility
  groupOrdersByDate(orders: Order[], startDate: DateTime, endDate: DateTime): DailySalesData[]
}
