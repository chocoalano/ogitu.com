import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'
import Product from './product.js'

export default class Wishlist extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare productId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
