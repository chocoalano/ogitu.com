import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'
import WalletTransaction from './wallet_transaction.js'

export default class Wallet extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare balance: number

  @column()
  declare pendingBalance: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>

  @hasMany(() => WalletTransaction)
  declare transactions: HasMany<typeof WalletTransaction>
}
