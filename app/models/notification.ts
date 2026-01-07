import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type NotificationType =
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

export default class Notification extends BaseModel {
  static table = 'notifications'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number | null

  @column()
  declare customerId: number | null

  @column()
  declare type: NotificationType

  @column()
  declare title: string

  @column()
  declare message: string

  @column({
    prepare: (value: Record<string, unknown> | null) => (value ? JSON.stringify(value) : null),
    consume: (value: string | null) => (value ? JSON.parse(value) : null),
  })
  declare data: Record<string, unknown> | null

  @column()
  declare isRead: boolean

  @column.dateTime()
  declare readAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Helper to get icon based on type
  get icon(): string {
    const icons: Record<NotificationType, string> = {
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
    return icons[this.type] || 'i-heroicons-bell'
  }

  // Helper to get color based on type
  get color(): string {
    const colors: Record<NotificationType, string> = {
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
    return colors[this.type] || 'neutral'
  }

  /**
   * Create a notification for admin (user_id)
   */
  static async notifyAdmin(
    userId: number,
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>
  ): Promise<Notification> {
    return await Notification.create({
      userId,
      customerId: null,
      type,
      title,
      message,
      data,
      isRead: false,
    })
  }

  /**
   * Create a notification for customer (customer_id)
   */
  static async notifyCustomer(
    customerId: number,
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>
  ): Promise<Notification> {
    return await Notification.create({
      userId: null,
      customerId,
      type,
      title,
      message,
      data,
      isRead: false,
    })
  }

  /**
   * Broadcast notification to all admins
   */
  static async notifyAllAdmins(
    type: NotificationType,
    title: string,
    message: string,
    data?: Record<string, unknown>
  ): Promise<Notification[]> {
    // Import User model to get all admin users
    const User = (await import('#models/user')).default
    const admins = await User.query().where('role', 'admin')

    const notifications = await Promise.all(
      admins.map((admin) => this.notifyAdmin(admin.id, type, title, message, data))
    )

    return notifications
  }
}
