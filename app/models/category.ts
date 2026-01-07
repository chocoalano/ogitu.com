import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo, afterSave, afterDelete } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import Product from './product.js'
import cache, { CacheTags } from '#services/cache_service'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare image: string | null

  @column()
  declare parentId: number | null

  @column()
  declare isActive: boolean

  @column()
  declare sortOrder: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Category, {
    foreignKey: 'parentId',
  })
  declare parent: BelongsTo<typeof Category>

  @hasMany(() => Category, {
    foreignKey: 'parentId',
  })
  declare children: HasMany<typeof Category>

  @hasMany(() => Product)
  declare products: HasMany<typeof Product>

  /**
   * Invalidate cache after save (create/update)
   */
  @afterSave()
  static async invalidateCacheOnSave() {
    await cache.invalidateTag(CacheTags.CATEGORIES)
  }

  /**
   * Invalidate cache after delete
   */
  @afterDelete()
  static async invalidateCacheOnDelete() {
    await cache.invalidateTag(CacheTags.CATEGORIES)
  }
}
