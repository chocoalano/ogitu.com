import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Customer from './customer.js'

export default class Address extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare customerId: number

  @column()
  declare label: string

  @column()
  declare recipientName: string

  @column()
  declare phone: string

  @column({ columnName: 'address_line1' })
  declare addressLine1: string

  @column({ columnName: 'address_line2' })
  declare addressLine2: string | null

  @column()
  declare cityId: string

  @column()
  declare cityName: string

  @column()
  declare districtId: string | null

  @column()
  declare districtName: string | null

  @column()
  declare provinceId: string

  @column()
  declare provinceName: string

  @column()
  declare postalCode: string

  @column()
  declare country: string

  @column()
  declare isDefault: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Customer)
  declare customer: BelongsTo<typeof Customer>
}
