import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import User from '#models/user'

/**
 * Middleware to ensure only superadmin can access certain routes
 */
export default class SuperAdminMiddleware {
  async handle({ auth, response, session }: HttpContext, next: NextFn) {
    // Check if user is authenticated with web guard
    await auth.use('web').check()
    const user = auth.use('web').user as User | null

    if (!user) {
      session.flash('error', 'Silakan login terlebih dahulu')
      return response.redirect('/admin/login')
    }

    // Check if user is superadmin
    if (user.role !== 'superadmin') {
      session.flash('error', 'Hanya superadmin yang dapat mengakses halaman ini')
      return response.redirect('/admin/dashboard')
    }

    await next()
  }
}
