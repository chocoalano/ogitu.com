import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    // For API routes or XHR requests, return 401 JSON instead of redirecting
    const isApiRoute = ctx.request.url().startsWith('/api')
    const isXhrRequest = ctx.request.header('X-Requested-With') === 'XMLHttpRequest'

    if (isApiRoute || isXhrRequest) {
      for (const guard of options.guards || [ctx.auth.defaultGuard]) {
        if (await ctx.auth.use(guard).check()) {
          return next()
        }
      }

      return ctx.response.status(401).json({
        success: false,
        message: 'Silakan login terlebih dahulu',
      })
    }

    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })
    return next()
  }
}
