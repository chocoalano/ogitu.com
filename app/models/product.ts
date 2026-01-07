import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany, afterSave, afterDelete } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import CartItem from './cart_item.js'
import Category from './category.js'
import OrderItem from './order_item.js'
import ProductImage from './product_image.js'
import ProductVariant from './product_variant.js'
import Review from './review.js'
import cache, { CacheTags } from '#services/cache_service'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare categoryId: number | null

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare sku: string

  @column()
  declare description: string | null

  @column()
  declare specifications: string | null

  @column()
  declare price: number

  @column()
  declare discountPrice: number | null

  @column()
  declare stock: number

  @column()
  declare minOrder: number

  @column()
  declare maxOrder: number | null

  @column()
  declare weight: number

  @column()
  declare brand: string | null

  @column()
  declare condition: 'new' | 'used'

  @column()
  declare status: 'draft' | 'active' | 'inactive' | 'out_of_stock'

  @column()
  declare isFeatured: boolean

  @column()
  declare rating: number

  @column()
  declare totalReviews: number

  @column()
  declare totalSold: number

  @column()
  declare viewCount: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => ProductVariant)
  declare variants: HasMany<typeof ProductVariant>

  @hasMany(() => ProductImage)
  declare images: HasMany<typeof ProductImage>

  @hasMany(() => Review)
  declare reviews: HasMany<typeof Review>

  @hasMany(() => OrderItem)
  declare orderItems: HasMany<typeof OrderItem>

  @hasMany(() => CartItem)
  declare cartItems: HasMany<typeof CartItem>

  /**
   * Invalidate cache after save (create/update)
   */
  @afterSave()
  static async invalidateCacheOnSave() {
    await cache.invalidateTag(CacheTags.PRODUCTS)
  }

  /**
   * Invalidate cache after delete
   */
  @afterDelete()
  static async invalidateCacheOnDelete() {
    await cache.invalidateTag(CacheTags.PRODUCTS)
  }
}
