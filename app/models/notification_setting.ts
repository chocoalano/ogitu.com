import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export type NotificationEventGroup = 'orders' | 'payments' | 'promotions' | 'system'

export default class NotificationSetting extends BaseModel {
  static table = 'notification_settings'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare eventKey: string

  @column()
  declare eventName: string

  @column()
  declare eventGroup: NotificationEventGroup

  @column()
  declare description: string | null

  @column()
  declare emailEnabled: boolean

  @column()
  declare pushEnabled: boolean

  @column()
  declare whatsappEnabled: boolean

  @column()
  declare emailTemplate: string | null

  @column()
  declare whatsappTemplate: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
