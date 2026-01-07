import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import { OrderRepository } from '#repositories/index'
import type { OrderRepositoryContract } from '#repositories/contracts/order_repository_contract'
import Order from '#models/order'
import Payment from '#models/payment'
import MidtransService from '#services/midtrans_service'
import BugReportService from '#services/bug_report_service'
import logger from '@adonisjs/core/services/logger'

export default class OrdersController {
  private repository: OrderRepositoryContract
  private midtrans: MidtransService

  constructor() {
    this.repository = new OrderRepository()
    this.midtrans = new MidtransService()
  }

  /**
   * List all orders for the current customer (Inertia view)
   */
  public async index({ auth, inertia, request }: HttpContext) {
    const customer = auth.use('customer').user!
    const page = request.input('page', 1)
    const status = request.input('status')

    const { data: orders, pagination } = await this.repository.getPaginatedOrders({
      customerId: customer.id,
      status,
      page,
      perPage: 10,
    })

    return inertia.render('orders/index', {
      orders,
      pagination,
      filters: {
        status: status || 'all',
      },
      statusOptions: this.repository.getStatusOptions(),
    })
  }

  /**
   * View order detail (Inertia view)
   */
  public async show({ auth, inertia, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    const order = await this.repository.getOrderDetail(params.id, customer.id)

    if (!order) {
      return response.redirect('/orders')
    }

    return inertia.render('orders/show', { order })
  }

  /**
   * Get orders list (API)
   */
  public async list({ auth, request, response }: HttpContext) {
    const customer = auth.use('customer').user!
    const page = request.input('page', 1)
    const status = request.input('status')

    const { data, pagination } = await this.repository.getPaginatedOrders({
      customerId: customer.id,
      status,
      page,
      perPage: 10,
    })

    // Transform for API (simpler format)
    const orders = data.map((order) => ({
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      total: order.total,
      itemsCount: order.items.length,
      createdAt: order.createdAt,
    }))

    return response.json({
      success: true,
      data: orders,
      pagination,
    })
  }

  /**
   * Get order detail (API)
   */
  public async detail({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    const order = await this.repository.getOrderDetail(params.id, customer.id)

    if (!order) {
      return response.status(404).json({
        success: false,
        message: 'Order tidak ditemukan',
      })
    }

    return response.json({
      success: true,
      data: order,
    })
  }

  /**
   * Cancel order (API)
   */
  public async cancel({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    const result = await this.repository.cancelOrder(params.id, customer.id)

    if (!result.success) {
      return response.status(400).json({
        success: false,
        message: result.message,
      })
    }

    return response.json({
      success: true,
      message: result.message,
    })
  }

  /**
   * Confirm order received (API)
   */
  public async confirmReceived({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    const result = await this.repository.confirmReceived(params.id, customer.id)

    if (!result.success) {
      return response.status(400).json({
        success: false,
        message: result.message,
      })
    }

    return response.json({
      success: true,
      message: result.message,
    })
  }

  /**
   * Get or create Midtrans Snap token for payment (API)
   */
  public async pay({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    // Get order with relations
    const order = await Order.query()
      .where('id', params.id)
      .where('customerId', customer.id)
      .preload('items')
      .preload('payment')
      .first()

    if (!order) {
      return response.status(404).json({
        success: false,
        message: 'Order tidak ditemukan',
      })
    }

    // Only allow payment for pending_payment orders
    if (order.status !== 'pending_payment') {
      return response.status(400).json({
        success: false,
        message: 'Order tidak dalam status menunggu pembayaran',
      })
    }

    try {
      // Check if existing snap token is still valid by verifying with Midtrans
      if (order.payment?.snapToken && order.payment?.orderIdMidtrans) {
        try {
          // Try to get transaction status to check if token is still valid
          const status = await this.midtrans.getTransactionStatus(order.payment.orderIdMidtrans)

          // If transaction is still pending, we can reuse the token
          if (status.transaction_status === 'pending') {
            return response.json({
              success: true,
              data: {
                snapToken: order.payment.snapToken,
                redirectUrl: order.payment.snapRedirectUrl,
              },
            })
          }

          // If already paid, update order status
          if (
            status.transaction_status === 'settlement' ||
            status.transaction_status === 'capture'
          ) {
            order.status = 'paid'
            order.paidAt = DateTime.now()
            await order.save()

            return response.status(400).json({
              success: false,
              message: 'Order sudah dibayar',
            })
          }
        } catch (error) {
          logger.error({ err: error }, 'Something went wrong')
        }
      }

      // Generate unique order ID for Midtrans (append timestamp to avoid conflict)
      const midtransOrderId = `${order.orderNumber}-${Date.now()}`

      // Create new snap token
      const itemDetails = order.items.map((item) => ({
        id: item.productId.toString(),
        name: item.productName.substring(0, 50), // Midtrans has 50 char limit
        price: Math.round(Number(item.price)),
        quantity: item.quantity,
      }))

      // Add shipping cost as item if > 0
      if (order.shippingCost > 0) {
        itemDetails.push({
          id: 'SHIPPING',
          name: 'Ongkos Kirim',
          price: Math.round(Number(order.shippingCost)),
          quantity: 1,
        })
      }

      // Add admin fee if > 0
      if (order.adminFee > 0) {
        itemDetails.push({
          id: 'ADMIN_FEE',
          name: 'Biaya Layanan',
          price: Math.round(Number(order.adminFee)),
          quantity: 1,
        })
      }

      // Create snap token with unique order ID
      const snapResult = await this.midtrans.createSnapToken({
        orderId: midtransOrderId,
        grossAmount: Math.round(Number(order.total)),
        customerDetails: {
          firstName: customer.fullName,
          email: customer.email,
          phone: customer.phone || '',
        },
        itemDetails,
      })

      // Save or update payment record
      if (order.payment) {
        order.payment.snapToken = snapResult.token
        order.payment.snapRedirectUrl = snapResult.redirect_url
        order.payment.orderIdMidtrans = midtransOrderId
        await order.payment.save()
      } else {
        await Payment.create({
          orderId: order.id,
          paymentType: 'snap',
          orderIdMidtrans: midtransOrderId,
          grossAmount: Math.round(Number(order.total)),
          transactionStatus: 'pending',
          snapToken: snapResult.token,
          snapRedirectUrl: snapResult.redirect_url,
        })
      }

      return response.json({
        success: true,
        data: {
          snapToken: snapResult.token,
          redirectUrl: snapResult.redirect_url,
        },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => `/api/orders/${params.id}/pay`, method: () => 'POST', ip: () => '', header: () => '' } as any, auth },
        'OrdersController',
        'pay',
        error,
        { orderId: params.id },
        'high'
      )
      return response.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Gagal memproses pembayaran',
      })
    }
  }

  /**
   * Verify payment status from Midtrans and update order (API)
   * Called after Snap popup onSuccess/onPending callback
   */
  public async verifyPayment({ auth, params, request, response }: HttpContext) {
    const customer = auth.use('customer').user!
    const { transactionStatus, transactionId } = request.only([
      'transactionStatus',
      'transactionId',
    ])

    // Get order with relations
    const order = await Order.query()
      .where('id', params.id)
      .where('customerId', customer.id)
      .preload('payment')
      .first()

    if (!order) {
      return response.status(404).json({
        success: false,
        message: 'Order tidak ditemukan',
      })
    }

    // Get the Midtrans order ID from payment record
    const midtransOrderId = order.payment?.orderIdMidtrans

    if (!midtransOrderId) {
      return response.status(400).json({
        success: false,
        message: 'Payment record tidak ditemukan',
      })
    }

    try {
      // Verify with Midtrans API using the correct order ID
      const midtransStatus = await this.midtrans.getTransactionStatus(midtransOrderId)

      // Update payment record
      if (order.payment) {
        order.payment.transactionId = midtransStatus.transaction_id || transactionId
        order.payment.transactionStatus = midtransStatus.transaction_status
        order.payment.paymentType = midtransStatus.payment_type
        order.payment.statusCode = midtransStatus.status_code
        order.payment.fraudStatus = midtransStatus.fraud_status || null
        order.payment.paymentDetails = midtransStatus

        if (midtransStatus.transaction_time) {
          order.payment.transactionTime = DateTime.fromFormat(
            midtransStatus.transaction_time,
            'yyyy-MM-dd HH:mm:ss'
          )
        }
        if (midtransStatus.settlement_time) {
          order.payment.settlementTime = DateTime.fromFormat(
            midtransStatus.settlement_time,
            'yyyy-MM-dd HH:mm:ss'
          )
        }

        await order.payment.save()
      }

      // Update order status based on Midtrans status
      const mtStatus = midtransStatus.transaction_status
      if (
        mtStatus === 'settlement' ||
        (mtStatus === 'capture' && midtransStatus.fraud_status === 'accept')
      ) {
        order.status = 'paid'
        order.paidAt = DateTime.now()
        await order.save()
      } else if (['cancel', 'deny', 'expire'].includes(mtStatus)) {
        order.status = 'cancelled'
        order.cancelledAt = DateTime.now()
        await order.save()
      }

      return response.json({
        success: true,
        message: 'Status pembayaran berhasil diverifikasi',
        data: {
          orderStatus: order.status,
          paymentStatus: midtransStatus.transaction_status,
        },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request, auth },
        'OrdersController',
        'verifyPayment',
        error,
        { orderId: params.id, midtransOrderId },
        'high'
      )

      // If Midtrans API fails, use the callback data as fallback
      if (transactionStatus === 'settlement' && order.status === 'pending_payment') {
        order.status = 'paid'
        order.paidAt = DateTime.now()
        await order.save()

        if (order.payment) {
          order.payment.transactionStatus = 'settlement'
          order.payment.transactionId = transactionId
          await order.payment.save()
        }

        return response.json({
          success: true,
          message: 'Status pembayaran berhasil diupdate',
          data: {
            orderStatus: order.status,
            paymentStatus: transactionStatus,
          },
        })
      }

      return response.status(500).json({
        success: false,
        message: 'Gagal memverifikasi pembayaran',
      })
    }
  }

  /**
   * Track order page (public - by order number)
   */
  public async track({ inertia, request }: HttpContext) {
    const orderNumber = request.input('order')
    let order = null

    if (orderNumber) {
      const foundOrder = await Order.query()
        .where('orderNumber', orderNumber)
        .preload('items', (query) => {
          query.preload('product', (pq) => pq.preload('images'))
        })
        .preload('shipping')
        .preload('payment')
        .first()

      if (foundOrder) {
        order = {
          id: foundOrder.id,
          orderNumber: foundOrder.orderNumber,
          status: foundOrder.status,
          total: foundOrder.total,
          subtotal: foundOrder.subtotal,
          shippingCost: foundOrder.shippingCost,
          createdAt: foundOrder.createdAt.toISO(),
          paidAt: foundOrder.paidAt?.toISO() || null,
          shippedAt: foundOrder.shippedAt?.toISO() || null,
          deliveredAt: foundOrder.deliveredAt?.toISO() || null,
          cancelledAt: foundOrder.cancelledAt?.toISO() || null,
          shipping: foundOrder.shipping
            ? {
                courier: foundOrder.shipping.courierName || foundOrder.shipping.courierCode,
                service: foundOrder.shipping.courierService,
                trackingNumber: foundOrder.shipping.waybill,
                estimatedDays: foundOrder.shipping.etd,
              }
            : null,
          items: foundOrder.items.map((item) => ({
            id: item.id,
            productName: item.productName,
            variantName: item.variantName,
            quantity: item.quantity,
            price: item.price,
            subtotal: item.subtotal,
          })),
        }
      }
    }

    return inertia.render('track/index', {
      order,
      searchQuery: orderNumber || '',
    })
  }
}
