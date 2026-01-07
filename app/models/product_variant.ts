import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import CartItem from './cart_item.js'
import OrderItem from './order_item.js'
import Product from './product.js'

export default class ProductVariant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare name: string

  @column()
  declare value: string

  @column()
  declare sku: string

  @column()
  declare priceAdjustment: number

  @column()
  declare stock: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>

  @hasMany(() => CartItem)
  declare cartItems: HasMany<typeof CartItem>
}
