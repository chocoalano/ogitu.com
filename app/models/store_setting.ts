import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type SettingType = 'string' | 'json' | 'boolean' | 'number'
export type SettingGroup = 'general' | 'address' | 'shipping' | 'notification'

export default class StoreSetting extends BaseModel {
  static table = 'store_settings'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare key: string

  @column()
  declare value: string | null

  @column()
  declare type: SettingType

  @column()
  declare group: SettingGroup

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Get typed value based on setting type
   */
  getTypedValue(): any {
    if (this.value === null) return null

    switch (this.type) {
      case 'json':
        try {
          return JSON.parse(this.value)
        } catch {
          return null
        }
      case 'boolean':
        return this.value === 'true' || this.value === '1'
      case 'number':
        return Number(this.value)
      default:
        return this.value
    }
  }

  /**
   * Set value with proper serialization
   */
  setTypedValue(val: any): void {
    if (val === null || val === undefined) {
      this.value = null
      return
    }

    switch (this.type) {
      case 'json':
        this.value = JSON.stringify(val)
        break
      case 'boolean':
        this.value = val ? 'true' : 'false'
        break
      case 'number':
        this.value = String(val)
        break
      default:
        this.value = String(val)
    }
  }
}
