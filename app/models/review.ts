import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import Customer from './customer.js'
import Order from './order.js'

export default class Review extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare customerId: number

  @column()
  declare orderId: number

  @column()
  declare rating: number

  @column()
  declare comment: string | null

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare images: string[] | null

  @column()
  declare isVerifiedPurchase: boolean

  @column()
  declare isApproved: boolean

  @column()
  declare helpfulCount: number

  @column()
  declare adminReply: string | null

  @column.dateTime()
  declare adminRepliedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
}
