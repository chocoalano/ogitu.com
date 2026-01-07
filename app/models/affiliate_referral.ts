import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Affiliate from './affiliate.js'
import Customer from './customer.js'

export default class AffiliateReferral extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare affiliateId: number

  @column()
  declare parentAffiliateId: number | null

  @column()
  declare referredCustomerId: number

  @column()
  declare level: number

  @column()
  declare status: 'active' | 'inactive' | 'prospect'

  @column()
  declare totalSpent: number

  @column()
  declare totalOrders: number

  @column.dateTime()
  declare registeredAt: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Affiliate)
  declare affiliate: BelongsTo<typeof Affiliate>

  @belongsTo(() => Affiliate, { foreignKey: 'parentAffiliateId' })
  declare parentAffiliate: BelongsTo<typeof Affiliate>

  @belongsTo(() => Customer, { foreignKey: 'referredCustomerId' })
  declare referredCustomer: BelongsTo<typeof Customer>
}
