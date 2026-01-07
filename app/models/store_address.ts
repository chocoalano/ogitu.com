import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class StoreAddress extends BaseModel {
  static table = 'store_addresses'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare contactName: string

  @column()
  declare phone: string

  @column()
  declare addressLine1: string

  @column()
  declare addressLine2: string | null

  @column()
  declare districtId: string

  @column()
  declare districtName: string

  @column()
  declare cityId: string

  @column()
  declare cityName: string

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

  @column()
  declare isActive: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Get full address string
   */
  get fullAddress(): string {
    const parts = [
      this.addressLine1,
      this.addressLine2,
      this.districtName,
      this.cityName,
      this.provinceName,
      this.postalCode,
    ].filter(Boolean)
    return parts.join(', ')
  }
}
