import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  hasMany,
  hasOne,
  afterCreate,
  afterSave,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'
import Address from './address.js'
import OrderItem from './order_item.js'
import Payment from './payment.js'
import Shipping from './shipping.js'
import OrderNotificationService from '#services/order_notification_service'

export default class Order extends BaseModel {
  // Track previous status for change detection
  private previousStatus: string | null = null

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderNumber: string

  @column()
  declare customerId: number

  @column()
  declare addressId: number | null

  @column()
  declare status:
    | 'pending_payment'
    | 'paid'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded'

  @column()
  declare subtotal: number

  @column()
  declare tax: number

  @column()
  declare shippingCost: number

  @column()
  declare discount: number

  @column()
  declare adminFee: number

  @column()
  declare total: number

  @column()
  declare customerNotes: string | null

  @column()
  declare adminNotes: string | null

  @column.dateTime()
  declare paidAt: DateTime | null

  @column.dateTime()
  declare processedAt: DateTime | null

  @column.dateTime()
  declare shippedAt: DateTime | null

  @column.dateTime()
  declare deliveredAt: DateTime | null

  @column.dateTime()
  declare cancelledAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Address)
  declare address: BelongsTo<typeof Address>

  @hasMany(() => OrderItem)
  declare items: HasMany<typeof OrderItem>

  @hasOne(() => Payment)
  declare payment: HasOne<typeof Payment>

  @hasOne(() => Shipping)
  declare shipping: HasOne<typeof Shipping>

  /**
   * Hook: After order is created - notify admin of new order
   */
  @afterCreate()
  static async notifyNewOrder(order: Order) {
    try {
      await OrderNotificationService.onOrderCreated(order)
    } catch (error) {
      console.error('Failed to send new order notification:', error)
    }
  }

  /**
   * Hook: After order is saved - check for status changes and notify
   */
  @afterSave()
  static async notifyStatusChange(order: Order) {
    try {
      // Only process if this is an update (not create) and status changed
      if (order.$dirty.status && order.previousStatus !== null) {
        await OrderNotificationService.onOrderStatusChanged(order, order.previousStatus)
      }

      // Update previous status for next comparison
      order.previousStatus = order.status
    } catch (error) {
      console.error('Failed to send order status notification:', error)
    }
  }

  /**
   * Override $setRelated to track status changes
   */
  $consumeAdapterResult(adapterResult: any, sideloaded?: any) {
    // Store current status before update
    if (this.$isPersisted) {
      this.previousStatus = this.status
    }
    return super.$consumeAdapterResult(adapterResult, sideloaded)
  }
}
