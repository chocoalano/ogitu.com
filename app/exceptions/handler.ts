import app from '@adonisjs/core/services/app'
import { HttpContext, ExceptionHandler } from '@adonisjs/core/http'
import type { StatusPageRange, StatusPageRenderer } from '@adonisjs/core/types/http'

export default class HttpExceptionHandler extends ExceptionHandler {
  /**
   * In debug mode, the exception handler will display verbose errors
   * with pretty printed stack traces.
   */
  protected debug = !app.inProduction

  /**
   * Status pages are used to display a custom HTML pages for certain error
   * codes. You might want to enable them in production only, but feel
   * free to enable them in development as well.
   */
  protected renderStatusPages = true

  /**
   * Status pages is a collection of error code range and a callback
   * to return the HTML contents to send as a response.
   */
  protected statusPages: Record<StatusPageRange, StatusPageRenderer> = {
    '404': async (error, { inertia, auth }) => {
      let isAdminAuth = false
      try {
        const webAuth = auth.use('web')
        await webAuth.check()
        isAdminAuth = webAuth.isAuthenticated
      } catch {
        isAdminAuth = false
      }
      return inertia.render('errors/not_found', { error, isAdminAuth })
    },
    '500..599': async (error, { inertia, auth }) => {
      let isAdminAuth = false
      try {
        const webAuth = auth.use('web')
        await webAuth.check()
        isAdminAuth = webAuth.isAuthenticated
      } catch {
        isAdminAuth = false
      }
      return inertia.render('errors/server_error', { error, isAdminAuth })
    },
  }

  /**
   * Check if request expects JSON response
   */
  private isJsonRequest(ctx: HttpContext): boolean {
    const acceptHeader = ctx.request.header('accept') || ''
    const contentType = ctx.request.header('content-type') || ''
    const xRequestedWith = ctx.request.header('x-requested-with') || ''

    return (
      acceptHeader.includes('application/json') ||
      contentType.includes('application/json') ||
      xRequestedWith.toLowerCase() === 'xmlhttprequest'
    )
  }

  /**
   * The method is used for handling errors and returning
   * response to the client
   */
  async handle(error: unknown, ctx: HttpContext) {
    // For JSON/API requests, always return JSON response
    if (this.isJsonRequest(ctx)) {
      const err = error as Error & { status?: number; code?: string }
      const status = err.status || 500
      const message = err.message || 'Terjadi kesalahan pada server'

      // Handle specific error codes
      if (err.code === 'E_INVALID_CSRF_TOKEN') {
        return ctx.response.status(403).json({
          success: false,
          message: 'Session telah berakhir. Silakan refresh halaman dan coba lagi.',
          code: 'CSRF_ERROR',
        })
      }

      if (err.code === 'E_UNAUTHORIZED_ACCESS') {
        return ctx.response.status(401).json({
          success: false,
          message: 'Anda harus login terlebih dahulu',
          code: 'UNAUTHORIZED',
        })
      }

      if (err.code === 'E_VALIDATION_ERROR') {
        return ctx.response.status(422).json({
          success: false,
          message: message,
          code: 'VALIDATION_ERROR',
        })
      }

      if (err.code === 'E_TOO_MANY_REQUESTS') {
        return ctx.response.status(429).json({
          success: false,
          message: 'Terlalu banyak permintaan. Silakan tunggu beberapa saat.',
          code: 'RATE_LIMITED',
        })
      }

      return ctx.response.status(status).json({
        success: false,
        message: app.inProduction ? 'Terjadi kesalahan pada server' : message,
        code: err.code || 'SERVER_ERROR',
      })
    }

    return super.handle(error, ctx)
  }

  /**
   * The method is used to report error to the logging service or
   * the a third party error monitoring service.
   *
   * @note You should not attempt to send a response from this method.
   */
  async report(error: unknown, ctx: HttpContext) {
    return super.report(error, ctx)
  }
}
