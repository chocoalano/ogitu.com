import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'

export default class ProductImage extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare url: string

  @column()
  declare altText: string | null

  @column()
  declare isPrimary: boolean

  @column()
  declare sortOrder: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}
