import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import OtpService from '#services/otp_service'
import BugReportService from '#services/bug_report_service'

const otpService = new OtpService()

export default class AuthController {
  private moduleName = 'AuthController'

  /**
   * Jangan log hal-hal yang sifatnya "expected" (mis. salah password),
   * karena itu bukan bug dan bisa bikin tabel Bug penuh.
   */
  private isInvalidCredentialsError(error: unknown): boolean {
    const code = (error as any)?.code
    const name = (error as any)?.name
    const message = String((error as any)?.message || '')

    const known = new Set([
      'E_INVALID_CREDENTIALS',
      'E_INVALID_AUTH_UID',
      'E_INVALID_AUTH_PASSWORD',
      'E_UNAUTHORIZED_ACCESS',
      'E_AUTHORIZATION_FAILURE',
      'InvalidCredentialsException',
      'AuthenticationException',
    ])

    if (code && known.has(code)) return true
    if (name && known.has(name)) return true

    // fallback defensif (jaga-jaga beda versi error)
    if (message.toLowerCase().includes('invalid credentials')) return true
    if (message.toLowerCase().includes('email') && message.toLowerCase().includes('password'))
      return true

    return false
  }

  private async reportGuest(
    ctx: Pick<HttpContext, 'request'>,
    action: string,
    error: unknown,
    context?: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    await BugReportService.logGuestError(ctx, this.moduleName, action, error, context, severity)
  }

  private async reportAdmin(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    action: string,
    error: unknown,
    context?: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity)
  }

  async showLogin({ inertia, auth }: HttpContext) {
    if (auth.isAuthenticated) {
      return inertia.location('/admin/dashboard')
    }

    return inertia.render('admin/auth/login')
  }

  async sendOtp({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Verify credentials first
      const user = await User.verifyCredentials(email, password)

      // Check if user is admin
      if (!['admin', 'superadmin'].includes(user.role)) {
        return response.json({
          success: false,
          message: 'Anda tidak memiliki akses ke admin panel',
        })
      }

      // Send OTP
      const result = await otpService.sendOtp(email, 'login')
      return response.json(result)
    } catch (error) {
      // Salah password itu bukan bug -> jangan log ke BugReport
      if (!this.isInvalidCredentialsError(error)) {
        await this.reportGuest(
          { request },
          'sendOtp',
          error,
          { email }, // jangan log password
          'medium'
        )
      }

      return response.json({
        success: false,
        message: 'Email atau password salah',
      })
    }
  }

  async verifyOtp({ request, auth, response }: HttpContext) {
    const { email, otp, redirect } = request.only(['email', 'otp', 'redirect'])

    try {
      // Verify OTP
      const result = await otpService.verifyOtp(email, otp, 'login')
      if (!result.success) {
        // OTP salah/expired biasanya sudah dibalikin sebagai result, bukan throw
        return response.json(result)
      }

      // Find user and login
      const user = await User.findByOrFail('email', email)

      // Double check admin role
      if (!['admin', 'superadmin'].includes(user.role)) {
        return response.json({
          success: false,
          message: 'Anda tidak memiliki akses ke admin panel',
        })
      }

      await auth.use('web').login(user)

      return response.json({
        success: true,
        message: 'Login berhasil',
        redirect: redirect || '/admin/dashboard',
      })
    } catch (error) {
      // verifyOtp ini masih guest (belum login) -> logGuestError
      await this.reportGuest(
        { request },
        'verifyOtp',
        error,
        {
          email,
          // jangan log otp
        },
        'high'
      )

      return response.json({
        success: false,
        message: 'Verifikasi OTP gagal',
      })
    }
  }

  async resendOtp({ request, response }: HttpContext) {
    const { email, type } = request.only(['email', 'type'])

    try {
      // Check if user exists and is admin
      const user = await User.findBy('email', email)
      if (!user || !['admin', 'superadmin'].includes(user.role)) {
        return response.json({
          success: false,
          message: 'Email tidak terdaftar sebagai admin',
        })
      }

      const result = await otpService.sendOtp(email, type || 'login')
      return response.json(result)
    } catch (error) {
      await this.reportGuest(
        { request },
        'resendOtp',
        error,
        { email, type: type || 'login' },
        'medium'
      )

      return response.json({
        success: false,
        message: 'Gagal mengirim ulang OTP',
      })
    }
  }

  async login({ request, auth, response, session }: HttpContext) {
    const { email, password, remember } = request.only(['email', 'password', 'remember'])

    try {
      const user = await User.verifyCredentials(email, password)

      if (!['admin', 'superadmin'].includes(user.role)) {
        session.flash('error', 'Anda tidak memiliki akses ke admin panel')
        return response.redirect().back()
      }

      await auth.use('web').login(user, remember)
      return response.redirect('/admin/dashboard')
    } catch (error) {
      // Salah password itu expected -> jangan log sebagai bug
      if (!this.isInvalidCredentialsError(error)) {
        await this.reportGuest(
          { request },
          'login',
          error,
          { email, remember: Boolean(remember) }, // jangan log password
          'medium'
        )
      }

      session.flash('error', 'Email atau password salah')
      return response.redirect().back()
    }
  }

  async logout({ request, auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.redirect('/admin/login')
    } catch (error) {
      // logout terjadi saat user sudah auth -> logAdminError
      await this.reportAdmin(
        { request, auth },
        'logout',
        error,
        { userId: auth.user?.id },
        'medium'
      )
      // fallback redirect
      return response.redirect('/admin/login')
    }
  }
}
