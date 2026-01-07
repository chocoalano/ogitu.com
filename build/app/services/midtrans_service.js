import env from '#start/env';
import axios from 'axios';
export default class MidtransService {
    serverKey;
    snapUrl;
    apiUrl;
    constructor() {
        this.serverKey = env.get('MIDTRANS_SERVER_KEY');
        this.snapUrl = env.get('MIDTRANS_SNAP_URL');
        this.apiUrl = env.get('MIDTRANS_API_URL');
    }
    getAuthHeader() {
        const auth = Buffer.from(this.serverKey + ':').toString('base64');
        return `Basic ${auth}`;
    }
    async createSnapToken(order) {
        try {
            let phone = order.customerDetails.phone?.replace(/\D/g, '') || '';
            if (phone.length < 10) {
                phone = '08000000000';
            }
            if (phone.startsWith('0')) {
                phone = '62' + phone.substring(1);
            }
            else if (!phone.startsWith('62')) {
                phone = '62' + phone;
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
                    secure: true,
                },
                enabled_payments: [
                    'credit_card',
                    'bca_va',
                    'bni_va',
                    'bri_va',
                    'permata_va',
                    'echannel',
                    'other_va',
                    'gopay',
                    'shopeepay',
                    'qris',
                ],
            };
            const response = await axios.post(this.snapUrl, payload, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.getAuthHeader(),
                },
            });
            return {
                token: response.data.token,
                redirect_url: response.data.redirect_url,
            };
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Midtrans Error: ${error.response?.data?.error_messages?.join(', ') || error.message}`);
            }
            throw error;
        }
    }
    async getTransactionStatus(orderId) {
        try {
            const response = await axios.get(`${this.apiUrl}/${orderId}/status`, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.getAuthHeader(),
                },
            });
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Midtrans Error: ${error.response?.data?.status_message || error.message}`);
            }
            throw error;
        }
    }
    async cancelTransaction(orderId) {
        try {
            const response = await axios.post(`${this.apiUrl}/${orderId}/cancel`, {}, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': this.getAuthHeader(),
                },
            });
            return response.data;
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Midtrans Error: ${error.response?.data?.status_message || error.message}`);
            }
            throw error;
        }
    }
    verifySignature(orderId, statusCode, grossAmount, signatureKey) {
        const crypto = require('node:crypto');
        const hash = crypto
            .createHash('sha512')
            .update(orderId + statusCode + grossAmount + this.serverKey)
            .digest('hex');
        return hash === signatureKey;
    }
    async processNotification(notificationData) {
        const orderId = notificationData.order_id;
        const transactionStatus = notificationData.transaction_status;
        const fraudStatus = notificationData.fraud_status;
        const signatureKey = notificationData.signature_key;
        const statusCode = notificationData.status_code;
        const grossAmount = notificationData.gross_amount;
        const isValid = this.verifySignature(orderId, statusCode, grossAmount, signatureKey);
        if (!isValid) {
            throw new Error('Invalid signature');
        }
        let paymentStatus;
        if (transactionStatus === 'capture') {
            paymentStatus = fraudStatus === 'accept' ? 'settlement' : 'capture';
        }
        else if (transactionStatus === 'settlement') {
            paymentStatus = 'settlement';
        }
        else if (['cancel', 'deny', 'expire'].includes(transactionStatus)) {
            paymentStatus = transactionStatus;
        }
        else if (transactionStatus === 'pending') {
            paymentStatus = 'pending';
        }
        else if (transactionStatus === 'refund') {
            paymentStatus = 'refund';
        }
        else {
            paymentStatus = transactionStatus;
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
        };
    }
}
//# sourceMappingURL=midtrans_service.js.map