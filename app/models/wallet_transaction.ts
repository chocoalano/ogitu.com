import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Wallet from './wallet.js'
import Customer from './customer.js'

export type TransactionType =
  | 'topup'
  | 'withdrawal'
  | 'commission'
  | 'payment'
  | 'refund'
  | 'cashback'
export type TransactionStatus = 'pending' | 'completed' | 'failed' | 'cancelled'

export default class WalletTransaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare walletId: number

  @column()
  declare customerId: number

  @column()
  declare transactionType: TransactionType

  @column()
  declare amount: number

  @column()
  declare balanceBefore: number

  @column()
  declare balanceAfter: number

  @column()
  declare referenceType: string | null

  @column()
  declare referenceId: number | null

  @column()
  declare description: string | null

  @column()
  declare status: TransactionStatus

  @column({
    prepare: (value: Record<string, any> | null) => (value ? JSON.stringify(value) : null),
    consume: (value: string | Record<string, any> | null) => {
      if (!value) return null
      if (typeof value === 'object') return value
      try {
        return JSON.parse(value)
      } catch {
        return null // Return null for corrupted data like "[object Object]"
      }
    },
  })
  declare metadata: Record<string, any> | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Wallet)
  declare wallet: BelongsTo<typeof Wallet>

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>
}
