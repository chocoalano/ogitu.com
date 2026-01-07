/*
|--------------------------------------------------------------------------
| Define HTTP limiters
|--------------------------------------------------------------------------
|
| The "limiter.define" method creates an HTTP middleware to apply rate
| limits on a route or a group of routes. Feel free to define as many
| throttle middleware as needed.
|
*/

import limiter from '@adonisjs/limiter/services/main'

/**
 * Global throttle - 60 requests per minute
 * Used for general page requests
 */
export const throttle = limiter.define('global', () => {
  return limiter.allowRequests(60).every('1 minute')
})

/**
 * Auth throttle - 5 requests per minute
 * Used for login/authentication endpoints
 */
export const authThrottle = limiter.define('auth', (ctx) => {
  return limiter
    .allowRequests(5)
    .every('1 minute')
    .usingKey(`auth_${ctx.request.ip()}`)
    .blockFor('15 mins')
    .limitExceeded((error) => {
      error.setMessage('Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.')
    })
})

/**
 * OTP throttle - 3 requests per 5 minutes
 * Used for OTP send/resend endpoints
 */
export const otpThrottle = limiter.define('otp', (ctx) => {
  const email = ctx.request.input('email', '')
  return limiter
    .allowRequests(3)
    .every('5 minutes')
    .usingKey(`otp_${ctx.request.ip()}_${email}`)
    .blockFor('30 mins')
    .limitExceeded((error) => {
      error.setMessage('Terlalu banyak permintaan OTP. Silakan coba lagi dalam 30 menit.')
    })
})

/**
 * API throttle - Dynamic rate limiting based on auth status
 * Logged in users: 100 requests/minute
 * Guest users: 30 requests/minute
 */
export const apiThrottle = limiter.define('api', (ctx) => {
  if (ctx.auth.user) {
    return limiter
      .allowRequests(100)
      .every('1 minute')
      .usingKey(`api_user_${ctx.auth.user.id}`)
  }

  return limiter
    .allowRequests(30)
    .every('1 minute')
    .usingKey(`api_ip_${ctx.request.ip()}`)
})

/**
 * Admin throttle - 120 requests per minute
 * Used for admin dashboard routes
 */
export const adminThrottle = limiter.define('admin', (ctx) => {
  const userId = ctx.auth.user?.id || 'anonymous'
  return limiter
    .allowRequests(120)
    .every('1 minute')
    .usingKey(`admin_${userId}_${ctx.request.ip()}`)
})

/**
 * Write throttle - 30 requests per minute
 * Used for POST, PUT, DELETE operations
 */
export const writeThrottle = limiter.define('write', (ctx) => {
  const userId = ctx.auth.user?.id || 'anonymous'
  return limiter
    .allowRequests(30)
    .every('1 minute')
    .usingKey(`write_${userId}_${ctx.request.ip()}`)
    .limitExceeded((error) => {
      error.setMessage('Terlalu banyak operasi. Silakan tunggu sebentar.')
    })
})

/**
 * Upload throttle - 10 requests per minute
 * Used for file upload endpoints
 */
export const uploadThrottle = limiter.define('upload', (ctx) => {
  const userId = ctx.auth.user?.id || 'anonymous'
  return limiter
    .allowRequests(10)
    .every('1 minute')
    .usingKey(`upload_${userId}`)
    .limitExceeded((error) => {
      error.setMessage('Terlalu banyak upload. Silakan tunggu sebentar.')
    })
})

/**
 * Bulk throttle - 5 requests per minute
 * Used for bulk operations (mass update, etc)
 */
export const bulkThrottle = limiter.define('bulk', (ctx) => {
  const userId = ctx.auth.user?.id || 'anonymous'
  return limiter
    .allowRequests(5)
    .every('1 minute')
    .usingKey(`bulk_${userId}`)
    .blockFor('5 mins')
    .limitExceeded((error) => {
      error.setMessage('Terlalu banyak operasi bulk. Silakan tunggu 5 menit.')
    })
})

/**
 * Customer API throttle - 60 requests per minute
 * Used for customer API routes (cart, wishlist, orders)
 */
export const customerApiThrottle = limiter.define('customerApi', (ctx) => {
  const customerId = ctx.auth.user?.id || 'anonymous'
  return limiter
    .allowRequests(60)
    .every('1 minute')
    .usingKey(`customer_api_${customerId}_${ctx.request.ip()}`)
})

/**
 * Checkout throttle - 10 requests per minute
 * Used for checkout process to prevent abuse
 */
export const checkoutThrottle = limiter.define('checkout', (ctx) => {
  const customerId = ctx.auth.user?.id || 'anonymous'
  return limiter
    .allowRequests(10)
    .every('1 minute')
    .usingKey(`checkout_${customerId}`)
    .blockFor('5 mins')
    .limitExceeded((error) => {
      error.setMessage('Terlalu banyak permintaan checkout. Silakan tunggu sebentar.')
    })
})

/**
 * Public page throttle - 120 requests per minute
 * Used for public pages (homepage, collections, products)
 */
export const publicThrottle = limiter.define('public', (ctx) => {
  return limiter
    .allowRequests(120)
    .every('1 minute')
    .usingKey(`public_${ctx.request.ip()}`)
})

/**
 * Webhook throttle - 100 requests per minute
 * Used for external webhook endpoints (Midtrans, etc)
 */
export const webhookThrottle = limiter.define('webhook', (ctx) => {
  return limiter
    .allowRequests(100)
    .every('1 minute')
    .usingKey(`webhook_${ctx.request.ip()}`)
})
