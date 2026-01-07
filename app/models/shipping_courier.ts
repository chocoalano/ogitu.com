import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export interface CourierService {
  code: string
  name: string
  enabled: boolean
}

export default class ShippingCourier extends BaseModel {
  static table = 'shipping_couriers'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: string

  @column()
  declare name: string

  @column()
  declare logo: string | null

  @column()
  declare description: string | null

  @column({
    prepare: (value: CourierService[] | null) => (value ? JSON.stringify(value) : null),
    consume: (value: string | null) => {
      if (!value) return []
      try {
        return JSON.parse(value)
      } catch {
        return []
      }
    },
  })
  declare services: CourierService[]

  @column()
  declare isActive: boolean

  @column()
  declare sortOrder: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
