import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class Discount extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number | null

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare type: 'percentage' | 'fixed'

  @column()
  declare value: number

  @column()
  declare minPurchase: number

  @column()
  declare maxDiscount: number | null

  @column()
  declare usageLimit: number | null

  @column()
  declare usedCount: number

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column()
  declare isActive: boolean

  @column()
  declare appliesToAll: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  @manyToMany(() => Product, {
    pivotTable: 'discount_products',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  })
  declare products: ManyToMany<typeof Product>

  // Computed properties
  get isExpired(): boolean {
    return DateTime.now() > this.endDate
  }

  get isUpcoming(): boolean {
    return DateTime.now() < this.startDate
  }

  get isOngoing(): boolean {
    return DateTime.now() >= this.startDate && DateTime.now() <= this.endDate && this.isActive
  }

  get status(): 'active' | 'expired' | 'upcoming' | 'inactive' {
    if (!this.isActive) return 'inactive'
    if (this.isExpired) return 'expired'
    if (this.isUpcoming) return 'upcoming'
    return 'active'
  }

  get remainingUsage(): number | null {
    if (this.usageLimit === null) return null
    return this.usageLimit - this.usedCount
  }
}
