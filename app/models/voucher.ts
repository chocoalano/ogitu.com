import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, manyToMany, hasMany } from '@adonisjs/lucid/orm'
import type { ManyToMany, HasMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'
import VoucherUsage from '#models/voucher_usage'

export default class Voucher extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare type: 'percentage' | 'fixed' | 'free_shipping'

  @column()
  declare value: number

  @column()
  declare minPurchase: number

  @column()
  declare maxDiscount: number | null

  @column()
  declare usageLimit: number | null

  @column()
  declare usageLimitPerCustomer: number

  @column()
  declare usedCount: number

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column()
  declare isActive: boolean

  @column()
  declare isPublic: boolean

  @column()
  declare appliesToAll: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @manyToMany(() => Product, {
    pivotTable: 'voucher_products',
    pivotTimestamps: {
      createdAt: 'created_at',
      updatedAt: false,
    },
  })
  declare products: ManyToMany<typeof Product>

  @hasMany(() => VoucherUsage)
  declare usages: HasMany<typeof VoucherUsage>

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

  get typeLabel(): string {
    const labels = {
      percentage: 'Persentase',
      fixed: 'Potongan Tetap',
      free_shipping: 'Gratis Ongkir',
    }
    return labels[this.type]
  }
}
