import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Bug extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare module: string

  @column()
  declare action: string

  @column()
  declare errorType: string | null

  @column()
  declare errorMessage: string

  @column()
  declare errorStack: string | null

  @column()
  declare requestData: Record<string, unknown> | null

  @column()
  declare context: Record<string, unknown> | null

  @column()
  declare userType: 'admin' | 'customer' | 'guest' | null

  @column()
  declare userId: number | null

  @column()
  declare ipAddress: string | null

  @column()
  declare userAgent: string | null

  @column()
  declare url: string | null

  @column()
  declare method: string | null

  @column()
  declare severity: 'low' | 'medium' | 'high' | 'critical'

  @column()
  declare status: 'new' | 'investigating' | 'resolved' | 'ignored'

  @column()
  declare resolutionNotes: string | null

  @column()
  declare resolvedBy: number | null

  @column.dateTime()
  declare resolvedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Static helper to log a bug from any controller
   */
  static async logError(params: {
    module: string
    action: string
    error: Error | unknown
    request?: {
      url?: string
      method?: string
      ip?: string
      userAgent?: string
      body?: Record<string, unknown>
    }
    context?: Record<string, unknown>
    userType?: 'admin' | 'customer' | 'guest'
    userId?: number
    severity?: 'low' | 'medium' | 'high' | 'critical'
  }) {
    try {
      const errorObj =
        params.error instanceof Error ? params.error : new Error(String(params.error))

      await Bug.create({
        module: params.module,
        action: params.action,
        errorType: errorObj.name || 'UnknownError',
        errorMessage: errorObj.message || String(params.error),
        errorStack: errorObj.stack || null,
        requestData: params.request?.body || null,
        context: params.context || null,
        userType: params.userType || null,
        userId: params.userId || null,
        ipAddress: params.request?.ip || null,
        userAgent: params.request?.userAgent || null,
        url: params.request?.url || null,
        method: params.request?.method || null,
        severity: params.severity || 'medium',
        status: 'new',
      })
    } catch (logError) {
      // If logging fails, just console.error to avoid infinite loop
      console.error('Failed to log bug to database:', logError)
      console.error('Original error:', params.error)
    }
  }
}
