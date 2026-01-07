import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Affiliate from './affiliate.js'
import Order from './order.js'
import Customer from './customer.js'

export type CommissionStatus = 'pending' | 'approved' | 'paid' | 'cancelled'

export default class AffiliateCommission extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare affiliateId: number

  @column()
  declare orderId: number

  @column()
  declare referredCustomerId: number

  @column()
  declare orderTotal: number

  @column()
  declare commissionRate: number

  @column()
  declare commissionAmount: number

  @column()
  declare status: CommissionStatus

  @column()
  declare level: number

  @column.dateTime()
  declare approvedAt: DateTime | null

  @column.dateTime()
  declare paidAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Affiliate)
  declare affiliate: BelongsTo<typeof Affiliate>

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => Customer, { foreignKey: 'referredCustomerId' })
  declare referredCustomer: BelongsTo<typeof Customer>
}
