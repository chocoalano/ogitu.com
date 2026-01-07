import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import Order from '#models/order'
import Customer from '#models/customer'
import Review from '#models/review'
import Category from '#models/category'
import User from '#models/user'
import { DateTime } from 'luxon'

export default class DashboardController {
  async index({ inertia, auth }: HttpContext) {
    const user = auth.use('web').user as User

    // Get stats
    const [
      totalProducts,
      totalOrders,
      totalCustomers,
      totalCategories,
      pendingReviews,
      recentOrders,
    ] = await Promise.all([
      Product.query().count('* as total').first(),
      Order.query().count('* as total').first(),
      Customer.query().count('* as total').first(),
      Category.query().count('* as total').first(),
      Review.query().where('isApproved', false).count('* as total').first(),
      Order.query().preload('customer').orderBy('createdAt', 'desc').limit(5),
    ])

    // Get monthly revenue
    const startOfMonth = DateTime.now().startOf('month')
    const monthlyRevenue = await Order.query()
      .whereIn('status', ['paid', 'processing', 'shipped', 'delivered'])
      .where('createdAt', '>=', startOfMonth.toSQL())
      .sum('total as total')
      .first()

    // Get order stats by status
    const ordersByStatus = await Order.query()
      .select('status')
      .count('* as count')
      .groupBy('status')

    const stats = {
      totalProducts: Number(totalProducts?.$extras.total || 0),
      totalOrders: Number(totalOrders?.$extras.total || 0),
      totalCustomers: Number(totalCustomers?.$extras.total || 0),
      totalCategories: Number(totalCategories?.$extras.total || 0),
      pendingReviews: Number(pendingReviews?.$extras.total || 0),
      monthlyRevenue: Number(monthlyRevenue?.$extras.total || 0),
      ordersByStatus: ordersByStatus.reduce(
        (acc, item) => {
          acc[item.status] = Number(item.$extras.count)
          return acc
        },
        {} as Record<string, number>
      ),
    }

    return inertia.render('admin/dashboard', {
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
      stats,
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customer?.fullName || 'N/A',
        total: order.total,
        status: order.status,
        createdAt: order.createdAt.toISO(),
      })),
    })
  }

  /**
   * Get current admin user data (API endpoint)
   */
  async me({ auth, response }: HttpContext) {
    const user = auth.use('web').user as User

    return response.json({
      success: true,
      admin: {
        id: user.id,
        name: user.fullName,
        email: user.email,
        avatar: null, // User model doesn't have avatar field
        role: user.role,
        storeName: 'Admin Panel',
        status: 'active',
        rating: 5,
        totalSales: 0,
      },
    })
  }
}
