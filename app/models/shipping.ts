import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Order from './order.js'

export default class Shipping extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare orderId: number

  @column()
  declare courierCode: string

  @column()
  declare courierService: string

  @column()
  declare courierName: string

  @column()
  declare serviceDescription: string | null

  @column()
  declare cost: number

  @column()
  declare weight: number

  @column()
  declare etd: string | null

  @column()
  declare waybill: string | null

  @column()
  declare originCityId: string

  @column()
  declare destinationCityId: string

  @column({
    prepare: (value: any) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare rajaongkirResponse: Record<string, any> | null

  @column.dateTime()
  declare shippedAt: DateTime | null

  @column.dateTime()
  declare deliveredAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Order)
  declare order: BelongsTo<typeof Order>
}
