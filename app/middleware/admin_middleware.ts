import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

/**
 * Middleware to ensure the authenticated user is an admin or superadmin
 */
export default class AdminMiddleware {
  /**
   * Allowed roles that can access admin panel
   */
  private allowedRoles = ['admin', 'superadmin']

  async handle({ auth, response, session }: HttpContext, next: NextFn) {
    // Check if user is authenticated with web guard
    await auth.use('web').check()
    const user = auth.use('web').user as User | null

    if (!user) {
      session.flash('error', 'Silakan login terlebih dahulu')
      return response.redirect('/admin/login')
    }

    // Check if user has admin or superadmin role
    if (!this.allowedRoles.includes(user.role)) {
      session.flash('error', 'Anda tidak memiliki akses ke halaman ini')
      return response.redirect('/admin/login')
    }

    await next()
  }
}
