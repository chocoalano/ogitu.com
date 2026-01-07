import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Voucher from '#models/voucher'
import Customer from '#models/customer'
import Order from '#models/order'

export default class VoucherUsage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare voucherId: number

  @column()
  declare customerId: number

  @column()
  declare orderId: number | null

  @column()
  declare discountAmount: number

  @column.dateTime()
  declare usedAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  // Relationships
  @belongsTo(() => Voucher)
  declare voucher: BelongsTo<typeof Voucher>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
}
