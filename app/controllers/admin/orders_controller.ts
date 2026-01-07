import type { HttpContext } from '@adonisjs/core/http'
import Order from '#models/order'
import { DateTime } from 'luxon'
import BugReportService from '#services/bug_report_service'
import Helper from '#services/helper'

// Order status labels and colors
const ORDER_STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending_payment: { label: 'Menunggu Pembayaran', color: 'warning' },
  paid: { label: 'Dibayar', color: 'info' },
  processing: { label: 'Diproses', color: 'primary' },
  shipped: { label: 'Dikirim', color: 'secondary' },
  delivered: { label: 'Selesai', color: 'success' },
  cancelled: { label: 'Dibatalkan', color: 'error' },
  refunded: { label: 'Refund', color: 'neutral' },
}

export default class OrdersController {
  private moduleName = 'OrdersController'

  private async reportAdmin(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    action: string,
    error: unknown,
    context?: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity)
  }

  /**
   * Transform order to admin-friendly format
   */
  private transformOrder(order: Order) {
    const statusInfo = ORDER_STATUS_MAP[order.status] || { label: order.status, color: 'neutral' }

    // Get first item image from product
    const firstItem = order.items?.[0]
    const primaryImage = firstItem?.product?.images?.find((img: any) => img.isPrimary)
    const firstImage = primaryImage || firstItem?.product?.images?.[0]
    const firstItemImage = Helper.getFullImageUrl(firstImage?.url)

    return {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      statusLabel: statusInfo.label,
      statusColor: statusInfo.color,
      customer: order.customer
        ? {
            id: order.customer.id,
            name: order.customer.fullName,
            email: order.customer.email,
            phone: order.customer.phone,
          }
        : null,
      subtotal: Number(order.subtotal) || 0,
      shippingCost: Number(order.shippingCost) || 0,
      discount: Number(order.discount) || 0,
      tax: Number(order.tax) || 0,
      adminFee: Number(order.adminFee) || 0,
      total: Number(order.total) || 0,
      customerNotes: order.customerNotes,
      adminNotes: order.adminNotes,
      itemCount: order.items?.length || 0,
      firstItemImage,
      items: (order.items || []).map((item) => {
        const itemPrimaryImage = item.product?.images?.find((img: any) => img.isPrimary)
        const itemFirstImage = itemPrimaryImage || item.product?.images?.[0]
        return {
          id: item.id,
          productId: item.productId,
          productName: item.productName,
          productSku: item.productSku,
          variantName: item.variantName,
          price: Number(item.price) || 0,
          quantity: item.quantity,
          subtotal: Number(item.subtotal) || 0,
          image: Helper.getFullImageUrl(itemFirstImage?.url),
        }
      }),
      payment: order.payment
        ? {
            method: order.payment.paymentType,
            status: order.payment.transactionStatus,
            paidAt: order.payment.settlementTime?.toISO() || null,
          }
        : null,
      shipping: order.shipping
        ? {
            id: order.shipping.id,
            courierCode: order.shipping.courierCode,
            courierName: order.shipping.courierName,
            courierService: order.shipping.courierService,
            waybill: order.shipping.waybill,
            weight: Number(order.shipping.weight) || 0,
            shippedAt: order.shipping.shippedAt?.toISO() || null,
            deliveredAt: order.shipping.deliveredAt?.toISO() || null,
          }
        : null,
      createdAt: order.createdAt?.toISO() || '',
      paidAt: order.paidAt?.toISO() || null,
      processedAt: order.processedAt?.toISO() || null,
      shippedAt: order.shippedAt?.toISO() || null,
      deliveredAt: order.deliveredAt?.toISO() || null,
      cancelledAt: order.cancelledAt?.toISO() || null,
    }
  }

  async index({ inertia, request, auth, session }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const status = request.input('status', '')
    const search = request.input('search', '')

    try {
      let query = Order.query()
        .preload('customer')
        .preload('items', (itemQuery) => {
          itemQuery.preload('product', (productQuery) => {
            productQuery.preload('images')
          })
        })
        .preload('payment')
        .preload('shipping')
        .orderBy('createdAt', 'desc')

      if (status) {
        query = query.where('status', status)
      }

      if (search) {
        query = query.where((q) => {
          q.where('orderNumber', 'LIKE', `%${search}%`).orWhereHas('customer', (cq) => {
            cq.where('fullName', 'LIKE', `%${search}%`)
          })
        })
      }

      const orders = await query.paginate(page, perPage)

      // Transform orders with proper image URLs
      const transformedOrders = orders.all().map((order) => this.transformOrder(order))

      return inertia.render('admin/orders/index', {
        orders: {
          data: transformedOrders,
          meta: orders.getMeta(),
        },
        filters: { status, search },
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'index',
        error,
        { page, perPage, status, search },
        'medium'
      )

      session.flash('error', 'Gagal memuat data order')

      // fallback render supaya halaman tetap kebuka
      return inertia.render('admin/orders/index', {
        orders: { data: [], meta: {} },
        filters: { status, search },
      })
    }
  }

  async show({ params, inertia, request, auth, response, session }: HttpContext) {
    const orderId = params.id

    try {
      const order = await Order.query()
        .where('id', orderId)
        .preload('customer')
        .preload('address')
        .preload('items', (query) => {
          query.preload('product', (productQuery) => {
            productQuery.preload('images')
          })
        })
        .preload('payment')
        .preload('shipping')
        .firstOrFail()

      return inertia.render('admin/orders/show', {
        order: this.transformOrder(order),
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'show', error, { orderId }, 'high')

      session.flash('error', 'Gagal memuat detail order')
      return response.redirect().back()
    }
  }

  async updateStatus({ params, request, auth, response, session }: HttpContext) {
    const orderId = params.id
    const { status } = request.only(['status'])

    try {
      const order = await Order.findOrFail(orderId)

      order.status = status

      // Set timestamps based on status
      if (status === 'processing' && !order.processedAt) {
        order.processedAt = DateTime.now()
      } else if (status === 'shipped' && !order.shippedAt) {
        order.shippedAt = DateTime.now()
      } else if (status === 'delivered' && !order.deliveredAt) {
        order.deliveredAt = DateTime.now()
      } else if (status === 'cancelled' && !order.cancelledAt) {
        order.cancelledAt = DateTime.now()
      }

      await order.save()

      session.flash('success', 'Status order berhasil diupdate')
      return response.redirect().back()
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'updateStatus', error, { orderId, status }, 'high')

      session.flash('error', 'Gagal mengupdate status order')
      return response.redirect().back()
    }
  }
}
