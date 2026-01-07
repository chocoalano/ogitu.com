import { HttpContext } from '@adonisjs/core/http'
import MidtransService from '#services/midtrans_service'
import BugReportService from '#services/bug_report_service'
import Order from '#models/order'
import Payment from '#models/payment'
import Wallet from '#models/wallet'
import WalletTransaction from '#models/wallet_transaction'
import { DateTime } from 'luxon'
import logger from '@adonisjs/core/services/logger'

export default class MidtransWebhookController {
  /**
   * Handle Midtrans payment notification/webhook
   * POST /webhooks/midtrans
   */
  async handle({ request, response }: HttpContext) {
    try {
      const notificationData = request.body()
      const midtransService = new MidtransService()

      // Process notification
      const result = await midtransService.processNotification(notificationData)

      // Check if this is a wallet topup transaction
      if (result.orderId.startsWith('TOPUP-')) {
        return this.handleWalletTopup(result, response)
      }

      // Find payment by Midtrans order ID (which may include timestamp suffix)
      const payment = await Payment.query()
        .where('orderIdMidtrans', result.orderId)
        .preload('order')
        .first()

      if (!payment) {
        // Try to find by order number (for backward compatibility)
        // Extract order number from Midtrans order ID (remove timestamp suffix)
        const orderNumber = result.orderId.split('-').slice(0, -1).join('-') || result.orderId
        const order = await Order.query()
          .where('orderNumber', orderNumber)
          .preload('payment')
          .first()

        if (!order?.payment) {
          return response.notFound({ message: 'Payment record not found' })
        }

        // Update payment record
        order.payment.transactionId = result.transactionId
        order.payment.transactionStatus = result.transactionStatus as
          | 'pending'
          | 'capture'
          | 'settlement'
          | 'deny'
          | 'cancel'
          | 'expire'
          | 'refund'
        order.payment.paymentType = result.paymentType
        order.payment.statusCode = result.statusCode
        order.payment.fraudStatus = result.fraudStatus || null
        order.payment.paymentDetails = result.fullData
        order.payment.orderIdMidtrans = result.orderId
        order.payment.transactionTime = result.transactionTime
          ? DateTime.fromISO(result.transactionTime)
          : null
        order.payment.settlementTime = result.settlementTime
          ? DateTime.fromISO(result.settlementTime)
          : null

        await order.payment.save()

        // Update order status
        if (result.transactionStatus === 'settlement') {
          order.status = 'paid'
          order.paidAt = DateTime.now()
        } else if (['cancel', 'deny', 'expire'].includes(result.transactionStatus)) {
          order.status = 'cancelled'
          order.cancelledAt = DateTime.now()
        } else if (result.transactionStatus === 'refund') {
          order.status = 'refunded'
        }

        await order.save()

        return response.ok({
          message: 'Notification processed successfully',
          status: result.transactionStatus,
        })
      }

      const order = payment.order

      // Update payment record
      payment.transactionId = result.transactionId
      payment.transactionStatus = result.transactionStatus as
        | 'pending'
        | 'capture'
        | 'settlement'
        | 'deny'
        | 'cancel'
        | 'expire'
        | 'refund'
      payment.paymentType = result.paymentType
      payment.statusCode = result.statusCode
      payment.fraudStatus = result.fraudStatus || null
      payment.paymentDetails = result.fullData
      payment.transactionTime = result.transactionTime
        ? DateTime.fromISO(result.transactionTime)
        : null
      payment.settlementTime = result.settlementTime
        ? DateTime.fromISO(result.settlementTime)
        : null

      await payment.save()

      // Update order status based on payment status
      if (result.transactionStatus === 'settlement') {
        order.status = 'paid'
        order.paidAt = DateTime.now()
      } else if (['cancel', 'deny', 'expire'].includes(result.transactionStatus)) {
        order.status = 'cancelled'
        order.cancelledAt = DateTime.now()
      } else if (result.transactionStatus === 'refund') {
        order.status = 'refunded'
      }

      await order.save()

      return response.ok({
        message: 'Notification processed successfully',
        status: result.transactionStatus,
      })
    } catch (error) {
      await BugReportService.log({
        module: 'MidtransWebhookController',
        action: 'handle',
        error,
        request: {
          url: request.url(),
          method: request.method(),
          ip: request.ip(),
          body: request.body(),
        },
        userType: 'guest',
        severity: 'critical',
      })
      return response.internalServerError({
        message: 'Failed to process notification',
        error: (error as Error).message,
      })
    }
  }

  /**
   * Handle wallet topup webhook from Midtrans
   */
  private async handleWalletTopup(result: any, response: any) {
    // Extract customer ID from topup ID: TOPUP-{customerId}-{timestamp}
    const topupIdParts = result.orderId.split('-')
    const customerId = Number.parseInt(topupIdParts[1])

    if (!customerId) {
      return response.badRequest({ message: 'Invalid topup ID format' })
    }

    // Find pending transaction by metadata topupId (MySQL JSON syntax)
    const transaction = await WalletTransaction.query()
      .where('customerId', customerId)
      .where('transactionType', 'topup')
      .where('status', 'pending')
      .whereRaw("JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.topupId')) = ?", [result.orderId])
      .first()

    if (!transaction) {
      logger.error(
        { err: `Topup transaction not found for: ${result.orderId}` },
        'Something went wrong'
      )
      return response.notFound({ message: 'Topup transaction not found' })
    }

    // Get wallet
    const wallet = await Wallet.query().where('customerId', customerId).first()
    if (!wallet) {
      logger.error(
        { err: `Wallet not found for customerId: ${customerId}` },
        'Something went wrong'
      )
      return response.notFound({ message: 'Wallet not found' })
    }

    // Update based on transaction status
    if (result.transactionStatus === 'settlement') {
      // Payment successful - add balance to wallet
      // Convert to numbers to avoid string concatenation
      const currentBalance = Number(wallet.balance) || 0
      const topupAmount = Number(transaction.amount) || 0

      transaction.status = 'completed'
      transaction.balanceBefore = currentBalance
      transaction.balanceAfter = currentBalance + topupAmount
      transaction.metadata = {
        ...transaction.metadata,
        midtransTransactionId: result.transactionId,
        paymentType: result.paymentType,
        settlementTime: result.settlementTime,
      }
      await transaction.save()

      // Update wallet balance
      wallet.balance = currentBalance + topupAmount
      await wallet.save()

      logger.info(`Topup completed: ${result.orderId}, Amount: ${topupAmount}`)
    } else if (['cancel', 'deny', 'expire'].includes(result.transactionStatus)) {
      // Payment failed - delete the pending transaction
      await transaction.delete()

      logger.info(
        `Topup failed and deleted: ${result.orderId}, Status: ${result.transactionStatus}`
      )
    }

    return response.ok({
      message: 'Wallet topup notification processed',
      status: result.transactionStatus,
    })
  }
}
