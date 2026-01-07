import { DateTime } from 'luxon'
import Otp from '#models/otp'
import emailQueueService from '#services/email_queue_service'
import logger from '@adonisjs/core/services/logger'

export default class OtpService {
  /**
   * Generate a random 6-digit OTP code
   */
  private generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  /**
   * Create and send OTP via email using queue
   */
  async sendOtp(
    email: string,
    type: 'login' | 'register' | 'forgot_password'
  ): Promise<{ success: boolean; message: string; jobId?: string }> {
    try {
      // Invalidate any existing OTPs for this email and type
      await Otp.query()
        .where('email', email)
        .where('type', type)
        .where('is_used', false)
        .update({ is_used: true })

      // Generate new OTP
      const code = this.generateCode()
      const expiresAt = DateTime.now().plus({ minutes: 5 }) // OTP valid for 5 minutes

      logger.debug({ email, code, type, expiresAt: expiresAt.toISO() }, 'Creating OTP')

      // Save OTP to database
      const newOtp = await Otp.create({
        email,
        code,
        type,
        isUsed: false,
        expiresAt,
      })

      logger.debug({ id: newOtp.id, code: newOtp.code, type: newOtp.type }, 'OTP created')

      // Queue the email for sending (non-blocking)
      const jobId = await emailQueueService.queueOtpEmail(email, code, type)

      logger.info({ email, type, jobId }, 'OTP email queued successfully')

      return {
        success: true,
        message: `Kode OTP telah dikirim ke ${email}`,
        jobId,
      }
    } catch (error) {
      logger.error({ email, type, error }, 'OTP send error')
      return {
        success: false,
        message: 'Gagal mengirim kode OTP. Silakan coba lagi.',
      }
    }
  }

  /**
   * Verify OTP code
   */
  async verifyOtp(
    email: string,
    code: string,
    type: 'login' | 'register' | 'forgot_password'
  ): Promise<{ success: boolean; message: string }> {
    try {
      logger.debug({ email, code, type }, 'OTP verification attempt')

      const otp = await Otp.query()
        .where('email', email)
        .where('code', code)
        .where('type', type)
        .where('is_used', false)
        .orderBy('created_at', 'desc')
        .first()

      logger.debug(
        otp
          ? {
              id: otp.id,
              code: otp.code,
              type: otp.type,
              isUsed: otp.isUsed,
              expiresAt: otp.expiresAt,
            }
          : null,
        'OTP found'
      )

      if (!otp) {
        // Debug: Check all OTPs for this email
        const allOtps = await Otp.query()
          .where('email', email)
          .orderBy('created_at', 'desc')
          .limit(5)
        logger.debug(
          allOtps.map((o) => ({ id: o.id, code: o.code, type: o.type, isUsed: o.isUsed })),
          'All recent OTPs for email'
        )

        return {
          success: false,
          message: 'Kode OTP tidak valid',
        }
      }

      if (otp.isExpired) {
        return {
          success: false,
          message: 'Kode OTP sudah kadaluarsa',
        }
      }

      // Mark OTP as used
      otp.isUsed = true
      await otp.save()

      return {
        success: true,
        message: 'Verifikasi OTP berhasil',
      }
    } catch (error) {
      logger.error({ email, type, error }, 'OTP verify error')
      return {
        success: false,
        message: 'Gagal memverifikasi OTP',
      }
    }
  }

  /**
   * Cleanup expired OTPs (can be called via a cron job)
   */
  async cleanupExpiredOtps(): Promise<number> {
    const result = await Otp.query()
      .where('expires_at', '<', DateTime.now().toSQL())
      .orWhere('is_used', true)
      .delete()

    return result[0] || 0
  }
}
