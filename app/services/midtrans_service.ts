import env from '#start/env'
import axios from 'axios'

/**
 * Midtrans Payment Service
 * Docs: https://docs.midtrans.com
 */
export default class MidtransService {
  private serverKey: string
  private snapUrl: string
  private apiUrl: string

  constructor() {
    this.serverKey = env.get('MIDTRANS_SERVER_KEY')
    this.snapUrl = env.get('MIDTRANS_SNAP_URL')
    this.apiUrl = env.get('MIDTRANS_API_URL')
  }

  /**
   * Get authorization header for Midtrans API
   */
  private getAuthHeader() {
    const auth = Buffer.from(this.serverKey + ':').toString('base64')
    return `Basic ${auth}`
  }

  /**
   * Create Snap Payment Token
   * @param order - Order details
   */
  async createSnapToken(order: {
    orderId: string
    grossAmount: number
    customerDetails: {
      firstName: string
      lastName?: string
      email: string
      phone: string
    }
    itemDetails: Array<{
      id: string
      name: string
      price: number
      quantity: number
    }>
  }) {
    try {
      // Ensure phone number is valid (at least 10 digits)
      let phone = order.customerDetails.phone?.replace(/\D/g, '') || ''
      if (phone.length < 10) {
        phone = '08000000000' // Default phone if not provided
      }
      // Format phone to Indonesian format
      if (phone.startsWith('0')) {
        phone = '62' + phone.substring(1)
      } else if (!phone.startsWith('62')) {
        phone = '62' + phone
      }

      const payload = {
        transaction_details: {
          order_id: order.orderId,
          gross_amount: order.grossAmount,
        },
        customer_details: {
          first_name: order.customerDetails.firstName || 'Customer',
          last_name: order.customerDetails.lastName || '',
          email: order.customerDetails.email || 'customer@example.com',
          phone: phone,
        },
        item_details: order.itemDetails,
        credit_card: {
          secure: true, // Enable 3DS
        },
        enabled_payments: [
          'credit_card',
          'bca_va',
          'bni_va',
          'bri_va',
          'permata_va',
          'echannel', // Mandiri Bill
          'other_va',
          'gopay',
          'shopeepay',
          'qris',
        ],
      }

      const response = await axios.post(this.snapUrl, payload, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.getAuthHeader(),
        },
      })

      return {
        token: response.data.token,
        redirect_url: response.data.redirect_url,
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          `Midtrans Error: ${error.response?.data?.error_messages?.join(', ') || error.message}`
        )
      }
      throw error
    }
  }

  /**
   * Get transaction status
   * @param orderId - Order ID
   */
  async getTransactionStatus(orderId: string) {
    try {
      const response = await axios.get(`${this.apiUrl}/${orderId}/status`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.getAuthHeader(),
        },
      })

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Midtrans Error: ${error.response?.data?.status_message || error.message}`)
      }
      throw error
    }
  }

  /**
   * Cancel transaction
   * @param orderId - Order ID
   */
  async cancelTransaction(orderId: string) {
    try {
      const response = await axios.post(
        `${this.apiUrl}/${orderId}/cancel`,
        {},
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': this.getAuthHeader(),
          },
        }
      )

      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Midtrans Error: ${error.response?.data?.status_message || error.message}`)
      }
      throw error
    }
  }

  /**
   * Verify notification signature from Midtrans webhook
   * @param orderId - Order ID from notification
   * @param statusCode - Status code from notification
   * @param grossAmount - Gross amount from notification
   * @param signatureKey - Signature key from notification
   */
  verifySignature(
    orderId: string,
    statusCode: string,
    grossAmount: string,
    signatureKey: string
  ): boolean {
    const crypto = require('node:crypto')
    const hash = crypto
      .createHash('sha512')
      .update(orderId + statusCode + grossAmount + this.serverKey)
      .digest('hex')

    return hash === signatureKey
  }

  /**
   * Process Midtrans notification/webhook
   * Call this from your webhook endpoint
   */
  async processNotification(notificationData: any) {
    const orderId = notificationData.order_id
    const transactionStatus = notificationData.transaction_status
    const fraudStatus = notificationData.fraud_status
    const signatureKey = notificationData.signature_key
    const statusCode = notificationData.status_code
    const grossAmount = notificationData.gross_amount

    // Verify signature
    const isValid = this.verifySignature(orderId, statusCode, grossAmount, signatureKey)
    if (!isValid) {
      throw new Error('Invalid signature')
    }

    // Determine payment status
    let paymentStatus: string

    if (transactionStatus === 'capture') {
      paymentStatus = fraudStatus === 'accept' ? 'settlement' : 'capture'
    } else if (transactionStatus === 'settlement') {
      paymentStatus = 'settlement'
    } else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
      paymentStatus = transactionStatus
    } else if (transactionStatus === 'pending') {
      paymentStatus = 'pending'
    } else if (transactionStatus === 'refund') {
      paymentStatus = 'refund'
    } else {
      paymentStatus = transactionStatus
    }

    return {
      orderId,
      transactionStatus: paymentStatus,
      transactionId: notificationData.transaction_id,
      paymentType: notificationData.payment_type,
      transactionTime: notificationData.transaction_time,
      settlementTime: notificationData.settlement_time,
      fraudStatus,
      statusCode,
      grossAmount,
      fullData: notificationData,
    }
  }
}
