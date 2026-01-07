import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'

export default class CustomerRank extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare icon: string | null

  @column()
  declare color: string | null

  @column()
  declare minOrders: number

  @column()
  declare minSpent: number

  @column()
  declare cashbackRate: number

  @column()
  declare affiliateBonusRate: number

  @column({
    prepare: (value: string[] | null) => (value ? JSON.stringify(value) : null),
    consume: (value: string | null) => {
      if (!value) return null
      // Handle case when value is already an array (shouldn't happen but just in case)
      if (Array.isArray(value)) return value
      // Try to parse as JSON
      try {
        const parsed = JSON.parse(value)
        return Array.isArray(parsed) ? parsed : [value]
      } catch {
        // If not valid JSON, return as single-item array
        return [value]
      }
    },
  })
  declare benefits: string[] | null

  @column()
  declare orderPriority: number

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Customer, { foreignKey: 'rankId' })
  declare customers: HasMany<typeof Customer>
}
