import { DateTime } from 'luxon'
import Order from '#models/order'
import Product from '#models/product'
import WalletTransaction from '#models/wallet_transaction'
import OrderItem from '#models/order_item'
import Helper from '#services/helper'
import db from '@adonisjs/lucid/services/db'
import type {
  AnalyticsRepositoryContract,
  DateRangeFilter,
  ProductAnalyticsFilter,
  DateRange,
  SalesAnalyticsResult,
  SalesSummary,
  DailySalesData,
  SalesByStatus,
  TopProductItem,
  RecentOrderItem,
  ProductAnalyticsResult,
  ProductSummary,
  ProductPerformanceItem,
  TopProductByViews,
  TopProductByRating,
  FinanceAnalyticsResult,
  FinanceSummary,
  WalletSummary,
  PaymentMethodData,
  MonthlyRevenueData,
} from './contracts/analytics_repository_contract.js'

export default class AnalyticsRepository implements AnalyticsRepositoryContract {
  // =====================================
  // Constants
  // =====================================

  private readonly VALID_ORDER_STATUSES = ['paid', 'processing', 'shipped', 'delivered']

  // =====================================
  // Date Helpers
  // =====================================

  /**
   * Calculate date range based on period or custom dates
   */
  getDateRange(period: string, dateFrom?: string, dateTo?: string): DateRange {
    const now = DateTime.now()
    let startDate: DateTime
    let endDate: DateTime = now.endOf('day')

    if (dateFrom && dateTo) {
      startDate = DateTime.fromISO(dateFrom).startOf('day')
      endDate = DateTime.fromISO(dateTo).endOf('day')
    } else {
      switch (period) {
        case '7days':
          startDate = now.minus({ days: 7 }).startOf('day')
          break
        case '30days':
          startDate = now.minus({ days: 30 }).startOf('day')
          break
        case '90days':
          startDate = now.minus({ days: 90 }).startOf('day')
          break
        case 'year':
          startDate = now.minus({ years: 1 }).startOf('day')
          break
        default:
          startDate = now.minus({ days: 30 }).startOf('day')
      }
    }

    return { startDate, endDate }
  }

  /**
   * Group orders by date for chart data
   */
  groupOrdersByDate(orders: Order[], startDate: DateTime, endDate: DateTime): DailySalesData[] {
    const dailyData: Map<string, { orders: number; revenue: number }> = new Map()

    // Initialize all dates in range
    let current = startDate
    while (current <= endDate) {
      dailyData.set(current.toISODate()!, { orders: 0, revenue: 0 })
      current = current.plus({ days: 1 })
    }

    // Fill in order data
    for (const order of orders) {
      const date = order.createdAt.toISODate()!
      const existing = dailyData.get(date) || { orders: 0, revenue: 0 }
      dailyData.set(date, {
        orders: existing.orders + 1,
        revenue: existing.revenue + Number(order.total),
      })
    }

    return Array.from(dailyData.entries()).map(([date, data]) => ({
      date,
      orders: data.orders,
      revenue: data.revenue,
    }))
  }

  // =====================================
  // Sales Analytics Methods
  // =====================================

  /**
   * Get complete sales analytics data
   */
  async getSalesAnalytics(filter: DateRangeFilter): Promise<SalesAnalyticsResult> {
    const { startDate, endDate } = this.getDateRange(filter.period, filter.dateFrom, filter.dateTo)

    // Get orders in date range
    const orders = await this.getOrdersInDateRange(startDate, endDate, this.VALID_ORDER_STATUSES)

    // Calculate summary
    const summary = await this.calculateSalesSummary(orders, startDate, endDate)

    // Get daily sales data
    const dailySales = this.groupOrdersByDate(orders, startDate, endDate)

    // Get sales by status
    const salesByStatus = await this.getSalesByStatus(startDate, endDate)

    // Get top products
    const topProducts = await this.getTopSellingProducts(startDate, endDate, 10)

    // Get recent orders
    const recentOrders = await this.getRecentOrders(10)

    return {
      summary,
      dailySales,
      salesByStatus,
      topProducts,
      recentOrders,
    }
  }

  /**
   * Get orders within date range
   */
  async getOrdersInDateRange(
    startDate: DateTime,
    endDate: DateTime,
    statusFilter?: string[]
  ): Promise<Order[]> {
    const query = Order.query()
      .where('createdAt', '>=', startDate.toSQL()!)
      .where('createdAt', '<=', endDate.toSQL()!)
      .orderBy('createdAt', 'asc')

    if (statusFilter && statusFilter.length > 0) {
      query.whereIn('status', statusFilter)
    }

    return query
  }

  /**
   * Get orders from the previous period for comparison
   */
  async getPreviousPeriodOrders(
    startDate: DateTime,
    endDate: DateTime,
    statusFilter?: string[]
  ): Promise<Order[]> {
    const daysDiff = endDate.diff(startDate, 'days').days
    const prevStartDate = startDate.minus({ days: daysDiff })
    const prevEndDate = startDate.minus({ days: 1 })

    return this.getOrdersInDateRange(prevStartDate, prevEndDate, statusFilter)
  }

  /**
   * Calculate sales summary with growth comparison
   */
  private async calculateSalesSummary(
    orders: Order[],
    startDate: DateTime,
    endDate: DateTime
  ): Promise<SalesSummary> {
    const totalOrders = orders.length
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0)
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Get previous period for comparison
    const prevOrders = await this.getPreviousPeriodOrders(
      startDate,
      endDate,
      this.VALID_ORDER_STATUSES
    )
    const prevTotalRevenue = prevOrders.reduce((sum, o) => sum + Number(o.total), 0)
    const prevTotalOrders = prevOrders.length

    // Calculate growth percentages
    const revenueGrowth =
      prevTotalRevenue > 0 ? ((totalRevenue - prevTotalRevenue) / prevTotalRevenue) * 100 : 0
    const ordersGrowth =
      prevTotalOrders > 0 ? ((totalOrders - prevTotalOrders) / prevTotalOrders) * 100 : 0

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      totalItems: totalOrders,
      revenueGrowth: Math.round(revenueGrowth * 10) / 10,
      ordersGrowth: Math.round(ordersGrowth * 10) / 10,
    }
  }

  /**
   * Get sales by status for pie chart
   */
  private async getSalesByStatus(startDate: DateTime, endDate: DateTime): Promise<SalesByStatus> {
    const allOrders = await Order.query()
      .where('createdAt', '>=', startDate.toSQL()!)
      .where('createdAt', '<=', endDate.toSQL()!)

    return {
      pending_payment: allOrders.filter((o) => o.status === 'pending_payment').length,
      paid: allOrders.filter((o) => o.status === 'paid').length,
      processing: allOrders.filter((o) => o.status === 'processing').length,
      shipped: allOrders.filter((o) => o.status === 'shipped').length,
      delivered: allOrders.filter((o) => o.status === 'delivered').length,
      cancelled: allOrders.filter((o) => o.status === 'cancelled').length,
    }
  }

  /**
   * Get top selling products in period
   */
  async getTopSellingProducts(
    startDate: DateTime,
    endDate: DateTime,
    limit: number = 10
  ): Promise<TopProductItem[]> {
    const topProducts = await OrderItem.query()
      .select('productId', 'productName')
      .sum('quantity as totalQuantity')
      .sum('subtotal as totalRevenue')
      .whereHas('order', (query) => {
        query
          .where('createdAt', '>=', startDate.toSQL()!)
          .where('createdAt', '<=', endDate.toSQL()!)
          .whereIn('status', this.VALID_ORDER_STATUSES)
      })
      .groupBy('productId', 'productName')
      .orderBy('totalQuantity', 'desc')
      .limit(limit)
      .preload('product', (productQuery) => {
        productQuery.preload('images')
      })

    return topProducts.map((p) => {
      const primaryImage = p.product?.images?.find((img) => img.isPrimary) || p.product?.images?.[0]
      return {
        id: p.productId,
        name: p.productName,
        image: Helper.getFullImageUrl(primaryImage?.url),
        totalQuantity: Number(p.$extras.totalQuantity || 0),
        totalRevenue: Number(p.$extras.totalRevenue || 0),
      }
    })
  }

  /**
   * Get recent orders
   */
  async getRecentOrders(limit: number = 10): Promise<RecentOrderItem[]> {
    const recentOrders = await Order.query()
      .whereIn('status', this.VALID_ORDER_STATUSES)
      .preload('customer')
      .orderBy('createdAt', 'desc')
      .limit(limit)

    return recentOrders.map((o) => ({
      id: o.id,
      orderNumber: o.orderNumber,
      customerName: o.customer?.fullName || 'Unknown',
      total: Number(o.total),
      status: o.status,
      createdAt: o.createdAt.toISO() || new Date().toISOString(),
    }))
  }

  // =====================================
  // Product Analytics Methods
  // =====================================

  /**
   * Get complete product analytics data
   */
  async getProductAnalytics(filter: ProductAnalyticsFilter): Promise<ProductAnalyticsResult> {
    const { startDate, endDate } = this.getDateRange(filter.period, filter.dateFrom, filter.dateTo)
    const { sortBy = 'totalSold', search = '', page = 1, perPage = 20 } = filter

    // Get products with performance metrics
    const productsQuery = Product.query().preload('images').preload('category')

    // Apply search filter
    if (search) {
      productsQuery.where((query) => {
        query.whereILike('name', `%${search}%`).orWhereILike('sku', `%${search}%`)
      })
    }

    productsQuery.orderBy(sortBy === 'revenue' ? 'totalSold' : sortBy, 'desc')

    const products = await productsQuery.paginate(page, perPage)

    // Get sales data for products in period
    const productIds = products.all().map((p) => p.id)
    const salesData = await this.getProductSalesInPeriod(productIds, startDate, endDate)

    // Get summary
    const summary = await this.getProductSummary()

    // Get top performers
    const topByViews = await this.getTopProductsByViews(5)
    const topByRating = await this.getTopProductsByRating(5)

    // Transform products
    const transformedProducts = products
      .all()
      .map((p) => this.transformProductPerformance(p, salesData))

    return {
      summary,
      products: transformedProducts,
      pagination: {
        currentPage: products.currentPage,
        lastPage: products.lastPage,
        total: products.total,
        perPage: products.perPage,
      },
      topByViews,
      topByRating,
    }
  }

  /**
   * Get product summary stats
   */
  async getProductSummary(): Promise<ProductSummary> {
    const [totalProducts, activeProducts, outOfStockProducts, lowStockProducts] = await Promise.all(
      [
        Product.query().count('* as total'),
        Product.query().where('status', 'active').count('* as total'),
        Product.query().where('stock', '<=', 0).count('* as total'),
        Product.query().where('stock', '>', 0).where('stock', '<=', 10).count('* as total'),
      ]
    )

    return {
      totalProducts: Number(totalProducts[0].$extras.total),
      activeProducts: Number(activeProducts[0].$extras.total),
      outOfStockProducts: Number(outOfStockProducts[0].$extras.total),
      lowStockProducts: Number(lowStockProducts[0].$extras.total),
    }
  }

  /**
   * Get product sales data for a period
   */
  private async getProductSalesInPeriod(
    productIds: number[],
    startDate: DateTime,
    endDate: DateTime
  ): Promise<Map<number, { periodSold: number; periodRevenue: number }>> {
    if (productIds.length === 0) {
      return new Map()
    }

    const salesData = await OrderItem.query()
      .select('productId')
      .sum('quantity as periodSold')
      .sum('subtotal as periodRevenue')
      .whereIn('productId', productIds)
      .whereHas('order', (query) => {
        query
          .where('createdAt', '>=', startDate.toSQL()!)
          .where('createdAt', '<=', endDate.toSQL()!)
          .whereIn('status', this.VALID_ORDER_STATUSES)
      })
      .groupBy('productId')

    return new Map(
      salesData.map((s) => [
        s.productId,
        {
          periodSold: Number(s.$extras.periodSold || 0),
          periodRevenue: Number(s.$extras.periodRevenue || 0),
        },
      ])
    )
  }

  /**
   * Transform product to performance item
   */
  private transformProductPerformance(
    product: Product,
    salesMap: Map<number, { periodSold: number; periodRevenue: number }>
  ): ProductPerformanceItem {
    const sales = salesMap.get(product.id) || { periodSold: 0, periodRevenue: 0 }
    const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0]

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      sku: product.sku,
      image: Helper.getFullImageUrl(primaryImage?.url),
      category: product.category?.name || '-',
      price: product.price,
      stock: product.stock,
      status: product.status,
      totalSold: product.totalSold,
      viewCount: product.viewCount,
      rating: product.rating,
      totalReviews: product.totalReviews,
      periodSold: sales.periodSold,
      periodRevenue: sales.periodRevenue,
    }
  }

  /**
   * Get top products by views
   */
  async getTopProductsByViews(limit: number = 5): Promise<TopProductByViews[]> {
    const products = await Product.query()
      .preload('images')
      .orderBy('viewCount', 'desc')
      .limit(limit)

    return products.map((p) => {
      const primaryImage = p.images?.find((img) => img.isPrimary) || p.images?.[0]
      return {
        id: p.id,
        name: p.name,
        image: Helper.getFullImageUrl(primaryImage?.url),
        viewCount: p.viewCount,
      }
    })
  }

  /**
   * Get top products by rating
   */
  async getTopProductsByRating(limit: number = 5): Promise<TopProductByRating[]> {
    const products = await Product.query()
      .preload('images')
      .where('totalReviews', '>', 0)
      .orderBy('rating', 'desc')
      .limit(limit)

    return products.map((p) => {
      const primaryImage = p.images?.find((img) => img.isPrimary) || p.images?.[0]
      return {
        id: p.id,
        name: p.name,
        image: Helper.getFullImageUrl(primaryImage?.url),
        rating: p.rating,
        totalReviews: p.totalReviews,
      }
    })
  }

  // =====================================
  // Finance Analytics Methods
  // =====================================

  /**
   * Get complete finance analytics data
   */
  async getFinanceAnalytics(filter: DateRangeFilter): Promise<FinanceAnalyticsResult> {
    const { startDate, endDate } = this.getDateRange(filter.period, filter.dateFrom, filter.dateTo)

    // Get all data in parallel
    const [summary, walletSummary, paymentMethods, monthlyData, orders] = await Promise.all([
      this.getFinanceSummary(startDate, endDate),
      this.getWalletSummary(startDate, endDate),
      this.getPaymentMethodsData(startDate, endDate),
      this.getMonthlyRevenue(6),
      this.getOrdersInDateRange(startDate, endDate, this.VALID_ORDER_STATUSES),
    ])

    // Daily revenue chart
    const dailyRevenue = this.groupOrdersByDate(orders, startDate, endDate)

    return {
      summary,
      walletSummary,
      dailyRevenue,
      monthlyData,
      paymentMethods,
    }
  }

  /**
   * Get finance summary
   */
  async getFinanceSummary(startDate: DateTime, endDate: DateTime): Promise<FinanceSummary> {
    const orders = await Order.query()
      .where('createdAt', '>=', startDate.toSQL()!)
      .where('createdAt', '<=', endDate.toSQL()!)
      .whereIn('status', this.VALID_ORDER_STATUSES)

    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total), 0)
    const totalShippingCost = orders.reduce((sum, o) => sum + Number(o.shippingCost), 0)
    const totalDiscount = orders.reduce((sum, o) => sum + Number(o.discount), 0)
    const totalAdminFee = orders.reduce((sum, o) => sum + Number(o.adminFee || 0), 0)
    const grossRevenue = orders.reduce((sum, o) => sum + Number(o.subtotal), 0)
    const netRevenue = grossRevenue - totalDiscount

    return {
      grossRevenue,
      netRevenue,
      totalRevenue,
      totalDiscount,
      totalShippingCost,
      totalAdminFee,
      totalOrders: orders.length,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    }
  }

  /**
   * Get wallet transactions summary
   */
  async getWalletSummary(startDate: DateTime, endDate: DateTime): Promise<WalletSummary> {
    const walletTransactions = await WalletTransaction.query()
      .where('createdAt', '>=', startDate.toSQL()!)
      .where('createdAt', '<=', endDate.toSQL()!)
      .where('status', 'completed')

    const topupTotal = walletTransactions
      .filter((t) => t.transactionType === 'topup')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const withdrawalTotal = walletTransactions
      .filter((t) => t.transactionType === 'withdrawal')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const commissionTotal = walletTransactions
      .filter((t) => t.transactionType === 'commission')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    const refundTotal = walletTransactions
      .filter((t) => t.transactionType === 'refund')
      .reduce((sum, t) => sum + Number(t.amount), 0)

    return {
      topupTotal,
      withdrawalTotal,
      commissionTotal,
      refundTotal,
      netWalletFlow: topupTotal - withdrawalTotal,
    }
  }

  /**
   * Get payment methods distribution
   */
  async getPaymentMethodsData(
    startDate: DateTime,
    endDate: DateTime
  ): Promise<PaymentMethodData[]> {
    const paymentMethods = await db
      .from('payments')
      .select('payment_type')
      .count('* as count')
      .sum('gross_amount as total')
      .where('transaction_status', 'settlement')
      .whereBetween('created_at', [startDate.toSQL()!, endDate.toSQL()!])
      .groupBy('payment_type')

    return paymentMethods.map((p) => ({
      method: p.payment_type || 'Unknown',
      count: Number(p.count),
      total: Number(p.total || 0),
    }))
  }

  /**
   * Get monthly revenue for last N months
   */
  async getMonthlyRevenue(months: number = 6): Promise<MonthlyRevenueData[]> {
    const result: MonthlyRevenueData[] = []
    const now = DateTime.now()

    for (let i = months - 1; i >= 0; i--) {
      const monthStart = now.minus({ months: i }).startOf('month')
      const monthEnd = now.minus({ months: i }).endOf('month')

      const orders = await Order.query()
        .where('createdAt', '>=', monthStart.toSQL()!)
        .where('createdAt', '<=', monthEnd.toSQL()!)
        .whereIn('status', this.VALID_ORDER_STATUSES)

      const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0)

      result.push({
        month: monthStart.toFormat('MMM yyyy'),
        revenue,
      })
    }

    return result
  }
}
