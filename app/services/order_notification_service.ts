import transmit from '@adonisjs/transmit/services/main'
import Notification from '#models/notification'
import type Order from '#models/order'

// Notification types for admin
type AdminNotificationType =
  | 'order_new'
  | 'order_paid'
  | 'order_cancelled'
  | 'order_shipped'
  | 'order_completed'
  | 'review_new'
  | 'product_low_stock'
  | 'product_out_of_stock'
  | 'withdrawal_approved'
  | 'withdrawal_rejected'
  | 'system'

// Notification types for customer
type CustomerNotificationType =
  | 'order_confirmed'
  | 'order_processing'
  | 'order_shipped'
  | 'order_delivered'
  | 'order_cancelled'
  | 'payment_success'
  | 'payment_failed'
  | 'promo'
  | 'system'

// Icon mapping for notifications
const ADMIN_ICONS: Record<AdminNotificationType, string> = {
  order_new: 'i-heroicons-shopping-bag',
  order_paid: 'i-heroicons-banknotes',
  order_cancelled: 'i-heroicons-x-circle',
  order_shipped: 'i-heroicons-truck',
  order_completed: 'i-heroicons-check-circle',
  review_new: 'i-heroicons-star',
  product_low_stock: 'i-heroicons-exclamation-triangle',
  product_out_of_stock: 'i-heroicons-archive-box-x-mark',
  withdrawal_approved: 'i-heroicons-arrow-down-tray',
  withdrawal_rejected: 'i-heroicons-x-mark',
  system: 'i-heroicons-bell',
}

const ADMIN_COLORS: Record<AdminNotificationType, string> = {
  order_new: 'primary',
  order_paid: 'success',
  order_cancelled: 'error',
  order_shipped: 'info',
  order_completed: 'success',
  review_new: 'warning',
  product_low_stock: 'warning',
  product_out_of_stock: 'error',
  withdrawal_approved: 'success',
  withdrawal_rejected: 'error',
  system: 'neutral',
}

const CUSTOMER_ICONS: Record<CustomerNotificationType, string> = {
  order_confirmed: 'i-heroicons-check-badge',
  order_processing: 'i-heroicons-cog-6-tooth',
  order_shipped: 'i-heroicons-truck',
  order_delivered: 'i-heroicons-gift',
  order_cancelled: 'i-heroicons-x-circle',
  payment_success: 'i-heroicons-credit-card',
  payment_failed: 'i-heroicons-exclamation-circle',
  promo: 'i-heroicons-tag',
  system: 'i-heroicons-bell',
}

const CUSTOMER_COLORS: Record<CustomerNotificationType, string> = {
  order_confirmed: 'success',
  order_processing: 'info',
  order_shipped: 'primary',
  order_delivered: 'success',
  order_cancelled: 'error',
  payment_success: 'success',
  payment_failed: 'error',
  promo: 'warning',
  system: 'neutral',
}

// Format currency helper
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export default class OrderNotificationService {
  /**
   * Send notification to admin and save to database
   */
  static async notifyAdmin(
    type: AdminNotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>
  ) {
    // Save to database (notification for all admins - userId null)
    const notification = await Notification.create({
      userId: null,
      customerId: null,
      type,
      title,
      message,
      data: data || null,
      isRead: false,
    })

    // Broadcast via SSE to admin channel
    const broadcastData = {
      event: 'new_notification',
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      isRead: notification.isRead,
      createdAt: notification.createdAt.toISO(),
      icon: ADMIN_ICONS[type] || 'i-heroicons-bell',
      color: ADMIN_COLORS[type] || 'neutral',
    }

    transmit.broadcast('admin/notifications', broadcastData)

    return notification
  }

  /**
   * Send notification to customer via SSE only (no database storage for now)
   */
  static async notifyCustomer(
    customerId: number,
    type: CustomerNotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>
  ) {
    // Flatten data for broadcast (avoid nested objects that cause type issues)
    const broadcastData: Record<string, string | number | boolean> = {
      event: 'new_notification',
      id: Date.now(),
      type,
      title,
      message,
      isRead: false,
      createdAt: new Date().toISOString(),
      icon: CUSTOMER_ICONS[type] || 'i-heroicons-bell',
      color: CUSTOMER_COLORS[type] || 'neutral',
    }

    // Add data fields to broadcast
    if (data) {
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          broadcastData[key] = value
        }
      })
    }

    transmit.broadcast(`customer/${customerId}/notifications`, broadcastData)

    return broadcastData
  }

  /**
   * Handle new order created - notify admin
   */
  static async onOrderCreated(order: Order) {
    await order.load('customer')

    // Access the loaded relation
    const customer = order.$preloaded.customer as any
    const customerName = customer?.fullName || 'Pelanggan'

    await this.notifyAdmin(
      'order_new',
      'Pesanan Baru!',
      `Pesanan baru dari ${customerName} senilai ${formatCurrency(order.total)}`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        customerName,
        amount: order.total,
      }
    )

    // Notify customer that order is confirmed
    await this.notifyCustomer(
      order.customerId,
      'order_confirmed',
      'Pesanan Dikonfirmasi',
      `Pesanan #${order.orderNumber} telah diterima dan sedang menunggu pembayaran`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
      }
    )
  }

  /**
   * Handle order paid - notify admin and customer
   */
  static async onOrderPaid(order: Order) {
    // Notify admin
    await this.notifyAdmin(
      'order_paid',
      'Pembayaran Diterima',
      `Pesanan #${order.orderNumber} telah dibayar. Segera proses pesanan.`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        amount: order.total,
      }
    )

    // Notify customer
    await this.notifyCustomer(
      order.customerId,
      'payment_success',
      'Pembayaran Berhasil',
      `Pembayaran untuk pesanan #${order.orderNumber} telah dikonfirmasi`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
      }
    )
  }

  /**
   * Handle order processing - notify customer
   */
  static async onOrderProcessing(order: Order) {
    await this.notifyCustomer(
      order.customerId,
      'order_processing',
      'Pesanan Diproses',
      `Pesanan #${order.orderNumber} sedang diproses`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
      }
    )
  }

  /**
   * Handle order shipped - notify admin and customer
   */
  static async onOrderShipped(order: Order) {
    await order.load('shipping')

    // Access the loaded relation
    const shipping = order.$preloaded.shipping as any
    const trackingNumber = shipping?.waybill || '-'

    // Notify admin
    await this.notifyAdmin(
      'order_shipped',
      'Pesanan Dikirim',
      `Pesanan #${order.orderNumber} telah dikirim dengan nomor resi ${trackingNumber}`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        trackingNumber,
      }
    )

    // Notify customer
    await this.notifyCustomer(
      order.customerId,
      'order_shipped',
      'Pesanan Dikirim',
      `Pesanan #${order.orderNumber} sedang dalam perjalanan. Resi: ${trackingNumber}`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        trackingNumber,
      }
    )
  }

  /**
   * Handle order delivered - notify admin and customer
   */
  static async onOrderDelivered(order: Order) {
    // Notify admin
    await this.notifyAdmin(
      'order_completed',
      'Pesanan Selesai',
      `Pesanan #${order.orderNumber} telah diterima pembeli.`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        amount: order.total,
      }
    )

    // Notify customer
    await this.notifyCustomer(
      order.customerId,
      'order_delivered',
      'Pesanan Diterima',
      `Pesanan #${order.orderNumber} telah sampai. Terima kasih telah berbelanja!`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
      }
    )
  }

  /**
   * Handle order cancelled - notify admin and customer
   */
  static async onOrderCancelled(order: Order, reason?: string) {
    const cancelReason = reason || 'Dibatalkan oleh sistem'

    // Notify admin
    await this.notifyAdmin(
      'order_cancelled',
      'Pesanan Dibatalkan',
      `Pesanan #${order.orderNumber} dibatalkan. Alasan: ${cancelReason}`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        reason: cancelReason,
      }
    )

    // Notify customer
    await this.notifyCustomer(
      order.customerId,
      'order_cancelled',
      'Pesanan Dibatalkan',
      `Pesanan #${order.orderNumber} telah dibatalkan. ${cancelReason}`,
      {
        orderId: order.id,
        orderNumber: order.orderNumber,
        reason: cancelReason,
      }
    )
  }

  /**
   * Handle order status change - main method called from model hook
   */
  static async onOrderStatusChanged(order: Order, previousStatus: string | null) {
    const currentStatus = order.status

    // Skip if status hasn't changed
    if (previousStatus === currentStatus) return

    switch (currentStatus) {
      case 'paid':
        await this.onOrderPaid(order)
        break
      case 'processing':
        await this.onOrderProcessing(order)
        break
      case 'shipped':
        await this.onOrderShipped(order)
        break
      case 'delivered':
        await this.onOrderDelivered(order)
        break
      case 'cancelled':
        await this.onOrderCancelled(order)
        break
    }
  }

  /**
   * Send withdrawal approved notification to customer
   */
  static async sendWithdrawalApproved(customerId: number, amount: number) {
    await this.notifyCustomer(
      customerId,
      'payment_success',
      'Penarikan Disetujui',
      `Permintaan penarikan ${formatCurrency(amount)} telah disetujui dan sedang diproses.`,
      {
        amount,
        type: 'withdrawal_approved',
      }
    )
  }

  /**
   * Send withdrawal rejected notification to customer
   */
  static async sendWithdrawalRejected(customerId: number, amount: number, reason: string) {
    await this.notifyCustomer(
      customerId,
      'payment_failed',
      'Penarikan Ditolak',
      `Permintaan penarikan ${formatCurrency(amount)} ditolak. Alasan: ${reason}. Saldo telah dikembalikan.`,
      {
        amount,
        reason,
        type: 'withdrawal_rejected',
      }
    )
  }
}
