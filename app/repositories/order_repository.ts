import Order from '#models/order'
import Helper from '#services/helper'
import { DateTime } from 'luxon'
import type {
  OrderRepositoryContract,
  OrderFilters,
  OrderListItem,
  OrderDetail,
  OrderTimelineItem,
  PaginatedOrders,
  OrderOperationResult,
  OrderStatus,
  StatusOption,
} from './contracts/order_repository_contract.js'

export default class OrderRepository implements OrderRepositoryContract {
  // =====================================
  // Private Query Builders
  // =====================================

  /**
   * Base query with items preload (for list)
   */
  private baseListQuery() {
    return Order.query()
      .preload('items', (itemsQuery) => {
        itemsQuery.preload('product', (productQuery) => {
          productQuery.preload('images', (imgQuery) => {
            imgQuery.where('is_primary', true).limit(1)
          })
        })
      })
      .preload('payment')
      .preload('shipping')
  }

  /**
   * Full query with all relations (for detail)
   */
  private baseDetailQuery() {
    return Order.query()
      .preload('address')
      .preload('items', (itemsQuery) => {
        itemsQuery.preload('product', (productQuery) => {
          productQuery.preload('images', (imgQuery) => {
            imgQuery.where('is_primary', true).limit(1)
          })
        })
      })
      .preload('payment')
      .preload('shipping')
  }

  // =====================================
  // Public Methods
  // =====================================

  /**
   * Get paginated orders for a customer
   */
  async getPaginatedOrders(filters: OrderFilters): Promise<PaginatedOrders> {
    const { customerId, status, page = 1, perPage = 10 } = filters

    const query = this.baseListQuery().where('customerId', customerId).orderBy('createdAt', 'desc')

    if (status && status !== 'all') {
      query.where('status', status)
    }

    const orders = await query.paginate(page, perPage)

    return {
      data: orders.all().map((order) => this.transformToListItem(order)),
      pagination: {
        currentPage: orders.currentPage,
        lastPage: orders.lastPage,
        total: orders.total,
        perPage: orders.perPage,
      },
    }
  }

  /**
   * Find order by ID and customer
   */
  async findByIdAndCustomer(orderId: number, customerId: number): Promise<Order | null> {
    return Order.query()
      .where('id', orderId)
      .where('customerId', customerId)
      .preload('shipping')
      .first()
  }

  /**
   * Get order detail with all relations
   */
  async getOrderDetail(orderId: number, customerId: number): Promise<OrderDetail | null> {
    const order = await this.baseDetailQuery()
      .where('id', orderId)
      .where('customerId', customerId)
      .first()

    if (!order) {
      return null
    }

    return this.transformToDetail(order)
  }

  /**
   * Cancel an order
   */
  async cancelOrder(orderId: number, customerId: number): Promise<OrderOperationResult> {
    const order = await Order.query().where('id', orderId).where('customerId', customerId).first()

    if (!order) {
      return {
        success: false,
        message: 'Order tidak ditemukan',
      }
    }

    // Only allow cancellation for pending_payment orders
    if (order.status !== 'pending_payment') {
      return {
        success: false,
        message:
          'Order tidak dapat dibatalkan. Hanya pesanan dengan status "Menunggu Pembayaran" yang dapat dibatalkan.',
      }
    }

    order.status = 'cancelled'
    order.cancelledAt = DateTime.now()
    await order.save()

    // TODO: Restore product stock if needed
    // TODO: Send cancellation notification

    return {
      success: true,
      message: 'Order berhasil dibatalkan',
      order,
    }
  }

  /**
   * Confirm order received
   */
  async confirmReceived(orderId: number, customerId: number): Promise<OrderOperationResult> {
    const order = await Order.query()
      .where('id', orderId)
      .where('customerId', customerId)
      .preload('shipping')
      .first()

    if (!order) {
      return {
        success: false,
        message: 'Order tidak ditemukan',
      }
    }

    if (order.status !== 'shipped') {
      return {
        success: false,
        message: 'Order belum dalam status dikirim',
      }
    }

    order.status = 'delivered'
    order.deliveredAt = DateTime.now()
    await order.save()

    // Update shipping record
    if (order.shipping) {
      order.shipping.deliveredAt = DateTime.now()
      await order.shipping.save()
    }

    // TODO: Send completion notification

    return {
      success: true,
      message: 'Pesanan berhasil dikonfirmasi diterima',
      order,
    }
  }

  /**
   * Update order status
   */
  async updateStatus(order: Order, status: OrderStatus): Promise<Order> {
    order.status = status

    // Set corresponding timestamp
    switch (status) {
      case 'paid':
        order.paidAt = DateTime.now()
        break
      case 'processing':
        order.processedAt = DateTime.now()
        break
      case 'shipped':
        order.shippedAt = DateTime.now()
        break
      case 'delivered':
        order.deliveredAt = DateTime.now()
        break
      case 'cancelled':
        order.cancelledAt = DateTime.now()
        break
    }

    await order.save()
    return order
  }

  // =====================================
  // Status Helpers
  // =====================================

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      pending_payment: 'Menunggu Pembayaran',
      paid: 'Dibayar',
      processing: 'Diproses',
      shipped: 'Dikirim',
      delivered: 'Selesai',
      cancelled: 'Dibatalkan',
      refunded: 'Dikembalikan',
    }
    return labels[status] || status
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      pending_payment: 'warning',
      paid: 'info',
      processing: 'info',
      shipped: 'primary',
      delivered: 'success',
      cancelled: 'error',
      refunded: 'neutral',
    }
    return colors[status] || 'neutral'
  }

  getStatusOptions(): StatusOption[] {
    return [
      { label: 'Semua', value: 'all' },
      { label: 'Menunggu Pembayaran', value: 'pending_payment' },
      { label: 'Dibayar', value: 'paid' },
      { label: 'Diproses', value: 'processing' },
      { label: 'Dikirim', value: 'shipped' },
      { label: 'Selesai', value: 'delivered' },
      { label: 'Dibatalkan', value: 'cancelled' },
    ]
  }

  // =====================================
  // Timeline Builder
  // =====================================

  buildTimeline(order: Order): OrderTimelineItem[] {
    const timeline: OrderTimelineItem[] = []

    // Order created is always first
    timeline.push({
      status: 'created',
      label: 'Pesanan Dibuat',
      date: order.createdAt.toISO(),
      completed: true,
    })

    // If cancelled, show cancelled status and return early
    if (order.status === 'cancelled') {
      timeline.push({
        status: 'cancelled',
        label: 'Dibatalkan',
        date: order.cancelledAt?.toISO() || null,
        completed: true,
      })
      return timeline
    }

    // Normal flow: payment -> processing -> shipped -> delivered
    timeline.push({
      status: 'paid',
      label: 'Pembayaran',
      date: order.paidAt?.toISO() || null,
      completed: !!order.paidAt,
    })

    timeline.push({
      status: 'processing',
      label: 'Diproses',
      date: order.processedAt?.toISO() || null,
      completed: !!order.processedAt,
    })

    timeline.push({
      status: 'shipped',
      label: 'Dikirim',
      date: order.shippedAt?.toISO() || null,
      completed: !!order.shippedAt,
    })

    timeline.push({
      status: 'delivered',
      label: 'Selesai',
      date: order.deliveredAt?.toISO() || null,
      completed: !!order.deliveredAt,
    })

    return timeline
  }

  // =====================================
  // Transformers
  // =====================================

  /**
   * Transform order to list item format
   */
  transformToListItem(order: Order): OrderListItem {
    return {
      id: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
      statusLabel: this.getStatusLabel(order.status),
      statusColor: this.getStatusColor(order.status),
      subtotal: Number(order.subtotal),
      shippingCost: Number(order.shippingCost),
      discount: Number(order.discount),
      total: Number(order.total),
      customerNotes: order.customerNotes,
      createdAt: order.createdAt.toISO()!,
      paidAt: order.paidAt?.toISO() || null,
      shippedAt: order.shippedAt?.toISO() || null,
      deliveredAt: order.deliveredAt?.toISO() || null,
      items: order.items.map((item) => this.transformOrderItem(item)),
      payment: order.payment
        ? {
            method: order.payment.paymentType,
            status: order.payment.transactionStatus,
            snapToken: order.payment.snapToken,
            snapRedirectUrl: order.payment.snapRedirectUrl,
          }
        : null,
      shipping: order.shipping
        ? {
            courier: order.shipping.courierName,
            service: order.shipping.courierService,
            trackingNumber: order.shipping.waybill,
            status: order.status,
          }
        : null,
    }
  }

  /**
   * Transform order to detail format
   */
  transformToDetail(order: Order): OrderDetail {
    const listItem = this.transformToListItem(order)

    return {
      ...listItem,
      tax: Number(order.tax),
      adminFee: Number(order.adminFee),
      adminNotes: order.adminNotes,
      processedAt: order.processedAt?.toISO() || null,
      cancelledAt: order.cancelledAt?.toISO() || null,
      address: order.address
        ? {
            recipientName: order.address.recipientName,
            phone: order.address.phone,
            addressLine1: order.address.addressLine1,
            addressLine2: order.address.addressLine2,
            cityName: order.address.cityName,
            provinceName: order.address.provinceName,
            postalCode: order.address.postalCode,
          }
        : null,
      items: order.items.map((item) => this.transformOrderItemDetail(item)),
      payment: order.payment
        ? {
            method: order.payment.paymentType,
            status: order.payment.transactionStatus,
            transactionId: order.payment.transactionId,
            paidAt: order.payment.settlementTime?.toISO() || null,
          }
        : null,
      shipping: order.shipping
        ? {
            courier: order.shipping.courierName,
            service: order.shipping.courierService,
            trackingNumber: order.shipping.waybill,
            status: order.status,
            shippedAt: order.shipping.shippedAt?.toISO() || null,
            deliveredAt: order.shipping.deliveredAt?.toISO() || null,
          }
        : null,
      timeline: this.buildTimeline(order),
    }
  }

  /**
   * Transform order item for list
   */
  private transformOrderItem(item: any) {
    return {
      id: item.id,
      productName: item.productName,
      variantName: item.variantName,
      price: Number(item.price),
      quantity: item.quantity,
      subtotal: Number(item.subtotal),
      image: item.product?.images?.[0]
        ? Helper.getFullImageUrl(item.product.images[0].url)
        : 'https://placehold.co/80x80/1a1a2e/ffffff?text=No+Image',
    }
  }

  /**
   * Transform order item for detail (includes more fields)
   */
  private transformOrderItemDetail(item: any) {
    return {
      ...this.transformOrderItem(item),
      productId: item.productId,
      productSku: item.productSku,
    }
  }
}
