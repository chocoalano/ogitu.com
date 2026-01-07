import type { HttpContext } from '@adonisjs/core/http'
import { errors } from '@adonisjs/auth'
import { DateTime } from 'luxon'
import Customer from '#models/customer'
import OtpService from '#services/otp_service'
import BugReportService from '#services/bug_report_service'

export default class AuthController {
  private otpService = new OtpService()

  /**
   * Show login page
   */
  public async showLogin({ inertia, request }: HttpContext) {
    const redirect = request.input('redirect', '/')
    return inertia.render('auth/login', { redirect })
  }

  /**
   * Show register page
   */
  public async showRegister({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  /**
   * Send OTP for login
   */
  public async sendLoginOtp({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      // Verify credentials first
      const customer = await Customer.verifyCredentials(email, password)

      if (!customer.isActive) {
        return response.status(400).json({
          success: false,
          message: 'Akun Anda tidak aktif. Silakan hubungi customer service.',
        })
      }

      // Send OTP
      const result = await this.otpService.sendOtp(email, 'login')

      return response.json({
        success: result.success,
        message: result.message,
        requireOtp: true,
      })
    } catch (error) {
      if (error instanceof errors.E_INVALID_CREDENTIALS) {
        return response.status(400).json({
          success: false,
          message: 'Email atau password salah',
        })
      }
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'sendLoginOtp',
        error,
        { email }
      )
      throw error
    }
  }

  /**
   * Verify OTP and complete login
   */
  public async verifyLoginOtp({ request, auth, response }: HttpContext) {
    const {
      email,
      otp,
      remember,
      redirect: redirectTo,
    } = request.only(['email', 'otp', 'remember', 'redirect'])

    try {
      // Verify OTP
      const otpResult = await this.otpService.verifyOtp(email, otp, 'login')

      if (!otpResult.success) {
        return response.status(400).json({
          success: false,
          message: otpResult.message,
        })
      }

      // Get customer and login
      const customer = await Customer.findByOrFail('email', email)
      await auth.use('customer').login(customer, remember === true || remember === 'on')

      return response.json({
        success: true,
        message: 'Login berhasil!',
        redirect: redirectTo || '/',
      })
    } catch (error) {
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'verifyLoginOtp',
        error,
        { email }
      )
      return response.status(400).json({
        success: false,
        message: 'Gagal memverifikasi OTP',
      })
    }
  }

  /**
   * Handle login (direct without OTP - fallback)
   */
  public async login({ request, auth, response }: HttpContext) {
    const {
      email,
      password,
      remember,
      redirect: redirectTo,
    } = request.only(['email', 'password', 'remember', 'redirect'])

    try {
      const customer = await Customer.verifyCredentials(email, password)

      if (!customer.isActive) {
        return response.status(400).json({
          success: false,
          message: 'Akun Anda tidak aktif. Silakan hubungi customer service.',
        })
      }

      await auth.use('customer').login(customer, remember === true || remember === 'on')

      return response.json({
        success: true,
        message: 'Login berhasil!',
        redirect: redirectTo || '/',
      })
    } catch (error) {
      if (error instanceof errors.E_INVALID_CREDENTIALS) {
        return response.status(400).json({
          success: false,
          message: 'Email atau password salah',
        })
      }
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'login',
        error,
        { email }
      )
      throw error
    }
  }

  /**
   * Send OTP for registration email verification
   */
  public async sendRegisterOtp({ request, response }: HttpContext) {
    const { email, fullName, password, phone, birthDate } = request.only([
      'email',
      'fullName',
      'password',
      'phone',
      'birthDate',
    ])

    try {
      // Validate age (must be 21+)
      if (birthDate) {
        const birth = DateTime.fromISO(birthDate)
        const age = Math.floor(DateTime.now().diff(birth, 'years').years)

        if (age < 21) {
          return response.status(400).json({
            success: false,
            message: 'Anda harus berusia minimal 21 tahun untuk mendaftar.',
          })
        }
      } else {
        return response.status(400).json({
          success: false,
          message: 'Tanggal lahir wajib diisi untuk verifikasi usia.',
        })
      }

      // Check if email already exists
      const existingCustomer = await Customer.findBy('email', email)
      if (existingCustomer) {
        return response.status(400).json({
          success: false,
          message: 'Email sudah terdaftar',
        })
      }

      // Send OTP
      const result = await this.otpService.sendOtp(email, 'register')

      return response.json({
        success: result.success,
        message: result.message,
        data: {
          email,
          fullName,
          password,
          phone,
          birthDate,
        },
      })
    } catch (error) {
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'sendRegisterOtp',
        error,
        { email, fullName }
      )
      return response.status(500).json({
        success: false,
        message: 'Gagal mengirim kode OTP',
      })
    }
  }

  /**
   * Verify OTP and complete registration
   */
  public async verifyRegisterOtp({ request, auth, response }: HttpContext) {
    const { email, otp, fullName, password, phone, birthDate } = request.only([
      'email',
      'otp',
      'fullName',
      'password',
      'phone',
      'birthDate',
    ])

    try {
      // Verify OTP
      const otpResult = await this.otpService.verifyOtp(email, otp, 'register')

      if (!otpResult.success) {
        return response.status(400).json({
          success: false,
          message: otpResult.message,
        })
      }

      // Double check email doesn't exist
      const existingCustomer = await Customer.findBy('email', email)
      if (existingCustomer) {
        return response.status(400).json({
          success: false,
          message: 'Email sudah terdaftar',
        })
      }

      // Create customer
      const customer = await Customer.create({
        fullName,
        email,
        password,
        phone: phone || null,
        birthDate: DateTime.fromISO(birthDate),
        isActive: true,
        isVerified: true,
        emailVerifiedAt: DateTime.now(),
      })

      // Auto login
      await auth.use('customer').login(customer)

      return response.json({
        success: true,
        message: 'Pendaftaran berhasil! Selamat datang di Ogitu.',
        redirect: '/',
      })
    } catch (error) {
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'verifyRegisterOtp',
        error,
        { email, fullName }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memverifikasi OTP',
      })
    }
  }

  /**
   * Handle register with age verification (legacy - direct without OTP)
   */
  public async register({ request, auth, response }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'phone', 'birthDate'])

    try {
      // Validate age (must be 21+)
      if (data.birthDate) {
        const birthDate = DateTime.fromISO(data.birthDate)
        const age = Math.floor(DateTime.now().diff(birthDate, 'years').years)

        if (age < 21) {
          return response.status(400).json({
            success: false,
            message: 'Anda harus berusia minimal 21 tahun untuk mendaftar.',
          })
        }
      } else {
        return response.status(400).json({
          success: false,
          message: 'Tanggal lahir wajib diisi untuk verifikasi usia.',
        })
      }

      // Check if email already exists
      const existingCustomer = await Customer.findBy('email', data.email)
      if (existingCustomer) {
        return response.status(400).json({
          success: false,
          message: 'Email sudah terdaftar',
        })
      }

      // Create customer
      const customer = await Customer.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone || null,
        birthDate: DateTime.fromISO(data.birthDate),
        isActive: true,
        isVerified: false,
      })

      // Auto login
      await auth.use('customer').login(customer)

      return response.json({
        success: true,
        message: 'Pendaftaran berhasil! Selamat datang di Ogitu.',
        redirect: '/',
      })
    } catch (error) {
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'register',
        error,
        { email: data.email, fullName: data.fullName }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mendaftar',
      })
    }
  }

  /**
   * Show forgot password page
   */
  public async showForgotPassword({ inertia }: HttpContext) {
    return inertia.render('auth/forgot-password')
  }

  /**
   * Show reset password page
   */
  public async showResetPassword({ inertia, request }: HttpContext) {
    const email = request.input('email', '')
    const token = request.input('token', '')
    return inertia.render('auth/reset-password', { email, token })
  }

  /**
   * Send OTP for password reset
   */
  public async sendResetOtp({ request, response }: HttpContext) {
    const { email } = request.only(['email'])

    try {
      // Check if email exists
      const customer = await Customer.findBy('email', email)
      if (!customer) {
        // Return success even if email doesn't exist (security)
        return response.json({
          success: true,
          message: 'Jika email terdaftar, kode OTP akan dikirim.',
        })
      }

      if (!customer.isActive) {
        return response.status(400).json({
          success: false,
          message: 'Akun Anda tidak aktif. Silakan hubungi customer service.',
        })
      }

      // Send OTP
      const result = await this.otpService.sendOtp(email, 'forgot_password')

      return response.json({
        success: result.success,
        message: result.message,
      })
    } catch (error) {
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'sendResetOtp',
        error,
        { email }
      )
      return response.status(500).json({
        success: false,
        message: 'Gagal mengirim kode OTP',
      })
    }
  }

  /**
   * Verify reset password OTP
   */
  public async verifyResetOtp({ request, response }: HttpContext) {
    const { email, otp } = request.only(['email', 'otp'])

    try {
      // Check if email exists
      const customer = await Customer.findBy('email', email)
      if (!customer) {
        return response.status(400).json({
          success: false,
          message: 'Email tidak terdaftar',
        })
      }

      // Verify OTP
      const otpResult = await this.otpService.verifyOtp(email, otp, 'forgot_password')

      if (!otpResult.success) {
        return response.status(400).json({
          success: false,
          message: otpResult.message,
        })
      }

      // Generate a temporary reset token
      const crypto = await import('node:crypto')
      const resetToken = crypto.randomBytes(32).toString('hex')

      // Store token in customer (temporary)
      customer.verificationToken = resetToken
      await customer.save()

      return response.json({
        success: true,
        message: 'Verifikasi OTP berhasil',
        token: resetToken,
      })
    } catch (error) {
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'verifyResetOtp',
        error,
        { email }
      )
      return response.status(500).json({
        success: false,
        message: 'Gagal memverifikasi OTP',
      })
    }
  }

  /**
   * Reset password with token
   */
  public async resetPassword({ request, response }: HttpContext) {
    const { email, token, password } = request.only(['email', 'token', 'password'])

    try {
      // Validate password
      if (!password || password.length < 8) {
        return response.status(400).json({
          success: false,
          message: 'Password minimal 8 karakter',
        })
      }

      // Find customer with matching token
      const customer = await Customer.query()
        .where('email', email)
        .where('verification_token', token)
        .first()

      if (!customer) {
        return response.status(400).json({
          success: false,
          message: 'Token tidak valid atau sudah kadaluarsa',
        })
      }

      // Update password and clear token
      customer.password = password
      customer.verificationToken = null
      await customer.save()

      return response.json({
        success: true,
        message: 'Password berhasil direset. Silakan login dengan password baru.',
      })
    } catch (error) {
      await BugReportService.logGuestError(
        { request },
        'EcommerceAuthController',
        'resetPassword',
        error,
        { email }
      )
      return response.status(500).json({
        success: false,
        message: 'Gagal mereset password',
      })
    }
  }

  /**
   * Resend OTP
   */
  public async resendOtp({ request, response }: HttpContext) {
    const { email, type } = request.only(['email', 'type'])

    if (!['login', 'register', 'forgot_password'].includes(type)) {
      return response.status(400).json({
        success: false,
        message: 'Tipe OTP tidak valid',
      })
    }

    const result = await this.otpService.sendOtp(email, type)

    return response.json({
      success: result.success,
      message: result.message,
    })
  }

  /**
   * Handle logout
   */
  public async logout({ auth, inertia }: HttpContext) {
    await auth.use('customer').logout()
    return inertia.location('/')
  }

  /**
   * Get current authenticated customer (API)
   */
  public async me({ auth, response }: HttpContext) {
    try {
      // Check if user is authenticated
      await auth.use('customer').check()

      const customer = auth.use('customer').user
      if (!customer) {
        return response.json({
          success: false,
          message: 'Tidak terautentikasi',
        })
      }

      return response.json({
        success: true,
        data: {
          id: customer.id,
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
          avatar: customer.avatar,
          isVerified: customer.isVerified,
        },
      })
    } catch {
      return response.json({
        success: false,
        message: 'Tidak terautentikasi',
      })
    }
  }
}
