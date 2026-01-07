import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Order from './order.js'
import Product from './product.js'
import ProductVariant from './product_variant.js'

export default class OrderItem extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number

  @column()
  declare productId: number

  @column()
  declare productVariantId: number | null

  @column()
  declare productName: string

  @column()
  declare productSku: string

  @column()
  declare variantName: string | null

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column()
  declare subtotal: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @belongsTo(() => ProductVariant)
  declare productVariant: BelongsTo<typeof ProductVariant>
}
