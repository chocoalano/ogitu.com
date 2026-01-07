import { Job } from 'bullmq'
import mail from '@adonisjs/mail/services/main'
import logger from '@adonisjs/core/services/logger'
import queueService, { EmailJobData } from './queue_service.js'

export const EMAIL_QUEUE = 'email'

export const EMAIL_JOBS = {
  SEND_OTP: 'send-otp',
  SEND_ORDER_CONFIRMATION: 'send-order-confirmation',
  SEND_ORDER_STATUS_UPDATE: 'send-order-status-update',
  SEND_WELCOME: 'send-welcome',
  SEND_PASSWORD_RESET: 'send-password-reset',
  SEND_NEWSLETTER: 'send-newsletter',
  SEND_GENERIC: 'send-generic',
} as const

class EmailQueueService {
  private isWorkerRegistered: boolean = false

  /**
   * Initialize the email queue worker
   */
  initialize() {
    if (this.isWorkerRegistered) return

    queueService.registerWorker(EMAIL_QUEUE, this.processEmail.bind(this), 5)
    queueService.registerQueueEvents(EMAIL_QUEUE)
    this.isWorkerRegistered = true

    logger.info('Email queue worker initialized')
  }

  /**
   * Process email job
   */
  private async processEmail(job: Job<EmailJobData>): Promise<void> {
    const { to, subject, html, text, attachments } = job.data

    logger.info({ jobId: job.id, to, subject }, 'Processing email job')

    try {
      await mail.send((message) => {
        // Set recipients
        if (Array.isArray(to)) {
          for (const recipient of to) {
            message.to(recipient)
          }
        } else {
          message.to(to)
        }

        message.subject(subject).html(html)

        if (text) {
          message.text(text)
        }

        // Add attachments if any
        if (attachments && attachments.length > 0) {
          for (const attachment of attachments) {
            if (attachment.path) {
              message.attach(attachment.path, { filename: attachment.filename })
            } else if (attachment.content) {
              message.attachData(Buffer.from(attachment.content), { filename: attachment.filename })
            }
          }
        }
      })

      logger.info({ jobId: job.id, to, subject }, 'Email sent successfully')
    } catch (error) {
      logger.error({ jobId: job.id, to, subject, error }, 'Failed to send email')
      throw error // Re-throw to trigger retry
    }
  }

  /**
   * Queue an OTP email
   */
  async queueOtpEmail(
    email: string,
    code: string,
    type: 'login' | 'register' | 'forgot_password'
  ): Promise<string> {
    const { subject, html } = this.getOtpEmailTemplate(code, type)

    const job = await queueService.addJob<EmailJobData>(EMAIL_QUEUE, EMAIL_JOBS.SEND_OTP, {
      to: email,
      subject,
      html,
      priority: 'high', // OTP emails should be sent immediately
      metadata: { type, email },
    })

    return job.id!
  }

  /**
   * Queue a welcome email
   */
  async queueWelcomeEmail(email: string, name: string): Promise<string> {
    const { subject, html } = this.getWelcomeEmailTemplate(name)

    const job = await queueService.addJob<EmailJobData>(EMAIL_QUEUE, EMAIL_JOBS.SEND_WELCOME, {
      to: email,
      subject,
      html,
      priority: 'normal',
      metadata: { name },
    })

    return job.id!
  }

  /**
   * Queue order confirmation email
   */
  async queueOrderConfirmationEmail(
    email: string,
    orderId: string,
    orderDetails: {
      items: Array<{ name: string; quantity: number; price: number }>
      total: number
      shippingAddress: string
    }
  ): Promise<string> {
    const { subject, html } = this.getOrderConfirmationTemplate(orderId, orderDetails)

    const job = await queueService.addJob<EmailJobData>(
      EMAIL_QUEUE,
      EMAIL_JOBS.SEND_ORDER_CONFIRMATION,
      {
        to: email,
        subject,
        html,
        priority: 'high',
        metadata: { orderId },
      }
    )

    return job.id!
  }

  /**
   * Queue order status update email
   */
  async queueOrderStatusEmail(
    email: string,
    orderId: string,
    status: string,
    trackingNumber?: string
  ): Promise<string> {
    const { subject, html } = this.getOrderStatusTemplate(orderId, status, trackingNumber)

    const job = await queueService.addJob<EmailJobData>(
      EMAIL_QUEUE,
      EMAIL_JOBS.SEND_ORDER_STATUS_UPDATE,
      {
        to: email,
        subject,
        html,
        priority: 'normal',
        metadata: { orderId, status },
      }
    )

    return job.id!
  }

  /**
   * Queue generic email
   */
  async queueEmail(data: EmailJobData): Promise<string> {
    const job = await queueService.addJob<EmailJobData>(EMAIL_QUEUE, EMAIL_JOBS.SEND_GENERIC, data)
    return job.id!
  }

  /**
   * Queue bulk emails (for newsletters, etc.)
   */
  async queueBulkEmails(
    recipients: string[],
    subject: string,
    html: string,
    options?: { delay?: number }
  ): Promise<string[]> {
    const jobIds: string[] = []
    let index = 0

    for (const recipient of recipients) {
      const job = await queueService.addJob<EmailJobData>(
        EMAIL_QUEUE,
        EMAIL_JOBS.SEND_NEWSLETTER,
        {
          to: recipient,
          subject,
          html,
          priority: 'low',
        },
        {
          delay: options?.delay ? options.delay * index : index * 100, // Stagger emails to avoid rate limits
        }
      )
      jobIds.push(job.id!)
      index++
    }

    return jobIds
  }

  /**
   * Get queue statistics
   */
  async getStats() {
    return queueService.getQueueStats(EMAIL_QUEUE)
  }

  /**
   * Get failed emails
   */
  async getFailedEmails(start = 0, end = 10) {
    return queueService.getFailedJobs(EMAIL_QUEUE, start, end)
  }

  /**
   * Retry failed email
   */
  async retryEmail(jobId: string) {
    return queueService.retryJob(EMAIL_QUEUE, jobId)
  }

  // ==========================================
  // Email Templates
  // ==========================================

  private getOtpEmailTemplate(
    code: string,
    type: 'login' | 'register' | 'forgot_password'
  ): { subject: string; html: string } {
    const templates = {
      login: {
        subject: 'Kode OTP Login - OGITU Vape',
        title: 'Verifikasi Login',
        description: 'Gunakan kode berikut untuk masuk ke akun OGITU Anda:',
      },
      register: {
        subject: 'Kode OTP Registrasi - OGITU Vape',
        title: 'Verifikasi Registrasi',
        description: 'Gunakan kode berikut untuk menyelesaikan pendaftaran akun OGITU Anda:',
      },
      forgot_password: {
        subject: 'Kode OTP Reset Password - OGITU Vape',
        title: 'Reset Password',
        description: 'Gunakan kode berikut untuk mereset password akun OGITU Anda:',
      },
    }

    const template = templates[type]

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); border-radius: 16px 16px 0 0;">
              <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.2); border-radius: 12px; margin: 0 auto 16px; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 28px;">⚡</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">OGITU Vape</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Premium Vape Marketplace</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #1f2937; font-size: 20px; font-weight: 600;">${template.title}</h2>
              <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px; line-height: 1.6;">${template.description}</p>

              <!-- OTP Code -->
              <div style="background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%); border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
                <div style="font-size: 36px; font-weight: bold; color: #8b5cf6; letter-spacing: 8px; font-family: 'Courier New', monospace;">${code}</div>
              </div>

              <p style="margin: 0 0 8px; color: #ef4444; font-size: 13px;">
                ⏱️ Kode ini akan kadaluarsa dalam <strong>5 menit</strong>
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 13px; line-height: 1.5;">
                Jika Anda tidak meminta kode ini, abaikan email ini. Jangan bagikan kode OTP kepada siapapun.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 12px;">
                Email ini dikirim oleh OGITU Vape Marketplace
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">
                © ${new Date().getFullYear()} OGITU. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    return { subject: template.subject, html }
  }

  private getWelcomeEmailTemplate(name: string): { subject: string; html: string } {
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">🎉 Selamat Datang di OGITU!</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 16px; color: #1f2937; font-size: 20px;">Hai ${name}!</h2>
              <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Terima kasih telah bergabung dengan OGITU Vape Marketplace. Kami senang Anda menjadi bagian dari komunitas kami!
              </p>
              <p style="margin: 0 0 24px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                Jelajahi koleksi produk vape premium kami dan nikmati pengalaman berbelanja yang menyenangkan.
              </p>
              <a href="https://ogitu.com" style="display: inline-block; background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600;">
                Mulai Belanja
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">© ${new Date().getFullYear()} OGITU. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    return { subject: 'Selamat Datang di OGITU Vape! 🎉', html }
  }

  private getOrderConfirmationTemplate(
    orderId: string,
    orderDetails: {
      items: Array<{ name: string; quantity: number; price: number }>
      total: number
      shippingAddress: string
    }
  ): { subject: string; html: string } {
    const itemsHtml = orderDetails.items
      .map(
        (item) => `
      <tr>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb;">${item.name}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px; border-bottom: 1px solid #e5e7eb; text-align: right;">Rp ${item.price.toLocaleString('id-ID')}</td>
      </tr>
    `
      )
      .join('')

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #10b981 0%, #059669 100%); border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">✅ Pesanan Dikonfirmasi</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Order #${orderId}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <h3 style="margin: 0 0 16px; color: #1f2937;">Detail Pesanan:</h3>
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e5e7eb;">Produk</th>
                    <th style="padding: 12px; text-align: center; border-bottom: 2px solid #e5e7eb;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-bottom: 2px solid #e5e7eb;">Harga</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                  <tr style="font-weight: bold;">
                    <td colspan="2" style="padding: 12px; text-align: right;">Total:</td>
                    <td style="padding: 12px; text-align: right; color: #8b5cf6;">Rp ${orderDetails.total.toLocaleString('id-ID')}</td>
                  </tr>
                </tbody>
              </table>
              <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px;">
                <h4 style="margin: 0 0 8px; color: #1f2937; font-size: 14px;">Alamat Pengiriman:</h4>
                <p style="margin: 0; color: #6b7280; font-size: 13px;">${orderDetails.shippingAddress}</p>
              </div>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">© ${new Date().getFullYear()} OGITU. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    return { subject: `Konfirmasi Pesanan #${orderId} - OGITU Vape`, html }
  }

  private getOrderStatusTemplate(
    orderId: string,
    status: string,
    trackingNumber?: string
  ): { subject: string; html: string } {
    const statusColors: Record<string, string> = {
      processing: '#f59e0b',
      shipped: '#3b82f6',
      delivered: '#10b981',
      cancelled: '#ef4444',
    }

    const statusLabels: Record<string, string> = {
      processing: 'Sedang Diproses',
      shipped: 'Dalam Pengiriman',
      delivered: 'Telah Diterima',
      cancelled: 'Dibatalkan',
    }

    const color = statusColors[status] || '#8b5cf6'
    const label = statusLabels[status] || status

    const trackingHtml = trackingNumber
      ? `
      <div style="background-color: #f9fafb; padding: 16px; border-radius: 8px; margin-top: 24px;">
        <h4 style="margin: 0 0 8px; color: #1f2937; font-size: 14px;">📦 Nomor Resi:</h4>
        <p style="margin: 0; color: #8b5cf6; font-size: 16px; font-weight: bold; font-family: 'Courier New', monospace;">${trackingNumber}</p>
      </div>
    `
      : ''

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: ${color}; border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">📋 Update Status Pesanan</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.9); font-size: 14px;">Order #${orderId}</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px; text-align: center;">
              <div style="display: inline-block; background-color: ${color}20; color: ${color}; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 18px;">
                ${label}
              </div>
              ${trackingHtml}
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 40px; background-color: #f9fafb; border-radius: 0 0 16px 16px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 11px;">© ${new Date().getFullYear()} OGITU. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `

    return { subject: `Update Pesanan #${orderId}: ${label} - OGITU Vape`, html }
  }
}

// Export singleton instance
const emailQueueService = new EmailQueueService()
export default emailQueueService
