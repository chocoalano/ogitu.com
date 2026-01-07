import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, computed } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'

export default class FlashSale extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column.dateTime()
  declare startDate: DateTime

  @column.dateTime()
  declare endDate: DateTime

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @manyToMany(() => Product, {
    pivotTable: 'flash_sale_products',
    pivotColumns: ['original_price', 'flash_price', 'stock_limit', 'sold_count'],
    pivotTimestamps: true,
  })
  declare products: ManyToMany<typeof Product>

  // Computed properties
  @computed()
  get isExpired(): boolean {
    return DateTime.now() > this.endDate
  }

  @computed()
  get isUpcoming(): boolean {
    return DateTime.now() < this.startDate
  }

  @computed()
  get isOngoing(): boolean {
    return this.isActive && !this.isExpired && !this.isUpcoming
  }

  @computed()
  get status(): 'active' | 'upcoming' | 'expired' | 'inactive' {
    if (!this.isActive) return 'inactive'
    if (this.isExpired) return 'expired'
    if (this.isUpcoming) return 'upcoming'
    return 'active'
  }

  @computed()
  get timeRemaining(): string | null {
    if (!this.isOngoing) return null
    const diff = this.endDate.diff(DateTime.now(), ['days', 'hours', 'minutes'])
    if (diff.days > 0) return `${Math.floor(diff.days)} hari lagi`
    if (diff.hours > 0) return `${Math.floor(diff.hours)} jam lagi`
    return `${Math.floor(diff.minutes)} menit lagi`
  }

  @computed()
  get progress(): number {
    if (!this.startDate || !this.endDate) return 0
    const now = DateTime.now()
    const total = this.endDate.diff(this.startDate, 'milliseconds').milliseconds
    const elapsed = now.diff(this.startDate, 'milliseconds').milliseconds
    return Math.min(100, Math.max(0, (elapsed / total) * 100))
  }
}
