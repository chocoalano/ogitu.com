import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Order from './order.js'

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number

  @column()
  declare paymentType: string

  @column()
  declare transactionId: string | null

  @column()
  declare orderIdMidtrans: string | null

  @column()
  declare grossAmount: number

  @column()
  declare transactionStatus:
    | 'pending'
    | 'capture'
    | 'settlement'
    | 'deny'
    | 'cancel'
    | 'expire'
    | 'refund'

  @column()
  declare statusCode: string | null

  @column()
  declare fraudStatus: string | null

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare paymentDetails: Record<string, any> | null

  @column()
  declare snapToken: string | null

  @column()
  declare snapRedirectUrl: string | null

  @column.dateTime()
  declare transactionTime: DateTime | null

  @column.dateTime()
  declare settlementTime: DateTime | null

  @column.dateTime()
  declare expiryTime: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
}
