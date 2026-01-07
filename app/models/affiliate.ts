import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'
import AffiliateReferral from './affiliate_referral.js'
import AffiliateCommission from './affiliate_commission.js'

export default class Affiliate extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare referralCode: string

  @column()
  declare commissionRate: number

  @column()
  declare totalEarnings: number

  @column()
  declare pendingEarnings: number

  @column()
  declare withdrawnEarnings: number

  @column()
  declare totalReferrals: number

  @column()
  declare totalOrders: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @hasMany(() => AffiliateReferral)
  declare referrals: HasMany<typeof AffiliateReferral>

  @hasMany(() => AffiliateCommission)
  declare commissions: HasMany<typeof AffiliateCommission>
}
