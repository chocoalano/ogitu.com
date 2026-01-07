import MidtransService from '#services/midtrans_service';
import BugReportService from '#services/bug_report_service';
import Order from '#models/order';
import Payment from '#models/payment';
import Wallet from '#models/wallet';
import WalletTransaction from '#models/wallet_transaction';
import { DateTime } from 'luxon';
import logger from '@adonisjs/core/services/logger';
export default class MidtransWebhookController {
    async handle({ request, response }) {
        try {
            const notificationData = request.body();
            const midtransService = new MidtransService();
            const result = await midtransService.processNotification(notificationData);
            if (result.orderId.startsWith('TOPUP-')) {
                return this.handleWalletTopup(result, response);
            }
            const payment = await Payment.query()
                .where('orderIdMidtrans', result.orderId)
                .preload('order')
                .first();
            if (!payment) {
                const orderNumber = result.orderId.split('-').slice(0, -1).join('-') || result.orderId;
                const order = await Order.query()
                    .where('orderNumber', orderNumber)
                    .preload('payment')
                    .first();
                if (!order?.payment) {
                    return response.notFound({ message: 'Payment record not found' });
                }
                order.payment.transactionId = result.transactionId;
                order.payment.transactionStatus = result.transactionStatus;
                order.payment.paymentType = result.paymentType;
                order.payment.statusCode = result.statusCode;
                order.payment.fraudStatus = result.fraudStatus || null;
                order.payment.paymentDetails = result.fullData;
                order.payment.orderIdMidtrans = result.orderId;
                order.payment.transactionTime = result.transactionTime
                    ? DateTime.fromISO(result.transactionTime)
                    : null;
                order.payment.settlementTime = result.settlementTime
                    ? DateTime.fromISO(result.settlementTime)
                    : null;
                await order.payment.save();
                if (result.transactionStatus === 'settlement') {
                    order.status = 'paid';
                    order.paidAt = DateTime.now();
                }
                else if (['cancel', 'deny', 'expire'].includes(result.transactionStatus)) {
                    order.status = 'cancelled';
                    order.cancelledAt = DateTime.now();
                }
                else if (result.transactionStatus === 'refund') {
                    order.status = 'refunded';
                }
                await order.save();
                return response.ok({
                    message: 'Notification processed successfully',
                    status: result.transactionStatus,
                });
            }
            const order = payment.order;
            payment.transactionId = result.transactionId;
            payment.transactionStatus = result.transactionStatus;
            payment.paymentType = result.paymentType;
            payment.statusCode = result.statusCode;
            payment.fraudStatus = result.fraudStatus || null;
            payment.paymentDetails = result.fullData;
            payment.transactionTime = result.transactionTime
                ? DateTime.fromISO(result.transactionTime)
                : null;
            payment.settlementTime = result.settlementTime
                ? DateTime.fromISO(result.settlementTime)
                : null;
            await payment.save();
            if (result.transactionStatus === 'settlement') {
                order.status = 'paid';
                order.paidAt = DateTime.now();
            }
            else if (['cancel', 'deny', 'expire'].includes(result.transactionStatus)) {
                order.status = 'cancelled';
                order.cancelledAt = DateTime.now();
            }
            else if (result.transactionStatus === 'refund') {
                order.status = 'refunded';
            }
            await order.save();
            return response.ok({
                message: 'Notification processed successfully',
                status: result.transactionStatus,
            });
        }
        catch (error) {
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
            });
            return response.internalServerError({
                message: 'Failed to process notification',
                error: error.message,
            });
        }
    }
    async handleWalletTopup(result, response) {
        const topupIdParts = result.orderId.split('-');
        const customerId = Number.parseInt(topupIdParts[1]);
        if (!customerId) {
            return response.badRequest({ message: 'Invalid topup ID format' });
        }
        const transaction = await WalletTransaction.query()
            .where('customerId', customerId)
            .where('transactionType', 'topup')
            .where('status', 'pending')
            .whereRaw("JSON_UNQUOTE(JSON_EXTRACT(metadata, '$.topupId')) = ?", [result.orderId])
            .first();
        if (!transaction) {
            logger.error({ err: `Topup transaction not found for: ${result.orderId}` }, 'Something went wrong');
            return response.notFound({ message: 'Topup transaction not found' });
        }
        const wallet = await Wallet.query().where('customerId', customerId).first();
        if (!wallet) {
            logger.error({ err: `Wallet not found for customerId: ${customerId}` }, 'Something went wrong');
            return response.notFound({ message: 'Wallet not found' });
        }
        if (result.transactionStatus === 'settlement') {
            const currentBalance = Number(wallet.balance) || 0;
            const topupAmount = Number(transaction.amount) || 0;
            transaction.status = 'completed';
            transaction.balanceBefore = currentBalance;
            transaction.balanceAfter = currentBalance + topupAmount;
            transaction.metadata = {
                ...transaction.metadata,
                midtransTransactionId: result.transactionId,
                paymentType: result.paymentType,
                settlementTime: result.settlementTime,
            };
            await transaction.save();
            wallet.balance = currentBalance + topupAmount;
            await wallet.save();
            logger.info(`Topup completed: ${result.orderId}, Amount: ${topupAmount}`);
        }
        else if (['cancel', 'deny', 'expire'].includes(result.transactionStatus)) {
            await transaction.delete();
            logger.info(`Topup failed and deleted: ${result.orderId}, Status: ${result.transactionStatus}`);
        }
        return response.ok({
            message: 'Wallet topup notification processed',
            status: result.transactionStatus,
        });
    }
}
//# sourceMappingURL=midtrans_webhook_controller.js.map