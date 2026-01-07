import type { HttpContext } from '@adonisjs/core/http'
import Bug from '#models/bug'
import logger from '@adonisjs/core/services/logger'

export type Severity = 'low' | 'medium' | 'high' | 'critical'
export type UserType = 'admin' | 'customer' | 'guest'

export interface BugReportOptions {
  module: string
  action: string
  error: Error | unknown
  context?: Record<string, unknown>
  severity?: Severity
}

/**
 * Service untuk menangani pelaporan bug/error secara terpusat
 * Menyediakan interface yang lebih clean untuk logging error ke database
 */
export default class BugReportService {
  /**
   * Log error dari HttpContext (request-based)
   * Secara otomatis mengekstrak request info dan user info dari context
   */
  static async logFromContext(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    options: BugReportOptions
  ): Promise<void> {
    const { request, auth } = ctx

    await this.log({
      ...options,
      request: {
        url: request.url(),
        method: request.method(),
        ip: request.ip(),
        userAgent: request.header('User-Agent') || undefined,
        body: options.context,
      },
      userType: 'admin',
      userId: auth.user?.id,
    })
  }

  /**
   * Log error dengan parameter lengkap (untuk kasus yang membutuhkan kontrol penuh)
   */
  static async log(params: {
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
    userType?: UserType
    userId?: number
    severity?: Severity
  }): Promise<void> {
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

      // Log to file/console for monitoring
      logger.error(
        { module: params.module, action: params.action, error: params.error },
        'Bug reported'
      )
    } catch (logError) {
      // If logging fails, just console.error to avoid infinite loop
      logger.error('Failed to log bug to database:', logError)
      logger.error('Original error:', params.error)
    }
  }

  /**
   * Helper untuk log error dari controller admin
   */
  static async logAdminError(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    module: string,
    action: string,
    error: Error | unknown,
    context?: Record<string, unknown>,
    severity: Severity = 'medium'
  ): Promise<void> {
    await this.logFromContext(ctx, {
      module,
      action,
      error,
      context,
      severity,
    })
  }

  /**
   * Helper untuk log error dari controller customer/ecommerce
   */
  static async logCustomerError(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    module: string,
    action: string,
    error: Error | unknown,
    context?: Record<string, unknown>,
    severity: Severity = 'medium'
  ): Promise<void> {
    const { request, auth } = ctx

    await this.log({
      module,
      action,
      error,
      request: {
        url: request.url(),
        method: request.method(),
        ip: request.ip(),
        userAgent: request.header('User-Agent') || undefined,
        body: context,
      },
      context,
      userType: 'customer',
      userId: auth.user?.id,
      severity,
    })
  }

  /**
   * Helper untuk log error dari guest (unauthenticated)
   */
  static async logGuestError(
    ctx: Pick<HttpContext, 'request'>,
    module: string,
    action: string,
    error: Error | unknown,
    context?: Record<string, unknown>,
    severity: Severity = 'medium'
  ): Promise<void> {
    const { request } = ctx

    await this.log({
      module,
      action,
      error,
      request: {
        url: request.url(),
        method: request.method(),
        ip: request.ip(),
        userAgent: request.header('User-Agent') || undefined,
        body: context,
      },
      context,
      userType: 'guest',
      severity,
    })
  }
}
