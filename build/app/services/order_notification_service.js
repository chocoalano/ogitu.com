import transmit from '@adonisjs/transmit/services/main';
import Notification from '#models/notification';
const ADMIN_ICONS = {
    order_new: 'i-heroicons-shopping-bag',
    order_paid: 'i-heroicons-banknotes',
    order_cancelled: 'i-heroicons-x-circle',
    order_shipped: 'i-heroicons-truck',
    order_completed: 'i-heroicons-check-circle',
    review_new: 'i-heroicons-star',
    product_low_stock: 'i-heroicons-exclamation-triangle',
    product_out_of_stock: 'i-heroicons-archive-box-x-mark',
    withdrawal_approved: 'i-heroicons-arrow-down-tray',
    withdrawal_rejected: 'i-heroicons-x-mark',
    system: 'i-heroicons-bell',
};
const ADMIN_COLORS = {
    order_new: 'primary',
    order_paid: 'success',
    order_cancelled: 'error',
    order_shipped: 'info',
    order_completed: 'success',
    review_new: 'warning',
    product_low_stock: 'warning',
    product_out_of_stock: 'error',
    withdrawal_approved: 'success',
    withdrawal_rejected: 'error',
    system: 'neutral',
};
const CUSTOMER_ICONS = {
    order_confirmed: 'i-heroicons-check-badge',
    order_processing: 'i-heroicons-cog-6-tooth',
    order_shipped: 'i-heroicons-truck',
    order_delivered: 'i-heroicons-gift',
    order_cancelled: 'i-heroicons-x-circle',
    payment_success: 'i-heroicons-credit-card',
    payment_failed: 'i-heroicons-exclamation-circle',
    promo: 'i-heroicons-tag',
    system: 'i-heroicons-bell',
};
const CUSTOMER_COLORS = {
    order_confirmed: 'success',
    order_processing: 'info',
    order_shipped: 'primary',
    order_delivered: 'success',
    order_cancelled: 'error',
    payment_success: 'success',
    payment_failed: 'error',
    promo: 'warning',
    system: 'neutral',
};
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(amount);
};
export default class OrderNotificationService {
    static async notifyAdmin(type, title, message, data) {
        const notification = await Notification.create({
            userId: null,
            customerId: null,
            type,
            title,
            message,
            data: data || null,
            isRead: false,
        });
        const broadcastData = {
            event: 'new_notification',
            id: notification.id,
            type: notification.type,
            title: notification.title,
            message: notification.message,
            isRead: notification.isRead,
            createdAt: notification.createdAt.toISO(),
            icon: ADMIN_ICONS[type] || 'i-heroicons-bell',
            color: ADMIN_COLORS[type] || 'neutral',
        };
        transmit.broadcast('admin/notifications', broadcastData);
        return notification;
    }
    static async notifyCustomer(customerId, type, title, message, data) {
        const broadcastData = {
            event: 'new_notification',
            id: Date.now(),
            type,
            title,
            message,
            isRead: false,
            createdAt: new Date().toISOString(),
            icon: CUSTOMER_ICONS[type] || 'i-heroicons-bell',
            color: CUSTOMER_COLORS[type] || 'neutral',
        };
        if (data) {
            Object.entries(data).forEach(([key, value]) => {
                if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                    broadcastData[key] = value;
                }
            });
        }
        transmit.broadcast(`customer/${customerId}/notifications`, broadcastData);
        return broadcastData;
    }
    static async onOrderCreated(order) {
        await order.load('customer');
        const customer = order.$preloaded.customer;
        const customerName = customer?.fullName || 'Pelanggan';
        await this.notifyAdmin('order_new', 'Pesanan Baru!', `Pesanan baru dari ${customerName} senilai ${formatCurrency(order.total)}`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
            customerName,
            amount: order.total,
        });
        await this.notifyCustomer(order.customerId, 'order_confirmed', 'Pesanan Dikonfirmasi', `Pesanan #${order.orderNumber} telah diterima dan sedang menunggu pembayaran`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
        });
    }
    static async onOrderPaid(order) {
        await this.notifyAdmin('order_paid', 'Pembayaran Diterima', `Pesanan #${order.orderNumber} telah dibayar. Segera proses pesanan.`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
            amount: order.total,
        });
        await this.notifyCustomer(order.customerId, 'payment_success', 'Pembayaran Berhasil', `Pembayaran untuk pesanan #${order.orderNumber} telah dikonfirmasi`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
        });
    }
    static async onOrderProcessing(order) {
        await this.notifyCustomer(order.customerId, 'order_processing', 'Pesanan Diproses', `Pesanan #${order.orderNumber} sedang diproses`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
        });
    }
    static async onOrderShipped(order) {
        await order.load('shipping');
        const shipping = order.$preloaded.shipping;
        const trackingNumber = shipping?.waybill || '-';
        await this.notifyAdmin('order_shipped', 'Pesanan Dikirim', `Pesanan #${order.orderNumber} telah dikirim dengan nomor resi ${trackingNumber}`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
            trackingNumber,
        });
        await this.notifyCustomer(order.customerId, 'order_shipped', 'Pesanan Dikirim', `Pesanan #${order.orderNumber} sedang dalam perjalanan. Resi: ${trackingNumber}`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
            trackingNumber,
        });
    }
    static async onOrderDelivered(order) {
        await this.notifyAdmin('order_completed', 'Pesanan Selesai', `Pesanan #${order.orderNumber} telah diterima pembeli.`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
            amount: order.total,
        });
        await this.notifyCustomer(order.customerId, 'order_delivered', 'Pesanan Diterima', `Pesanan #${order.orderNumber} telah sampai. Terima kasih telah berbelanja!`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
        });
    }
    static async onOrderCancelled(order, reason) {
        const cancelReason = reason || 'Dibatalkan oleh sistem';
        await this.notifyAdmin('order_cancelled', 'Pesanan Dibatalkan', `Pesanan #${order.orderNumber} dibatalkan. Alasan: ${cancelReason}`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
            reason: cancelReason,
        });
        await this.notifyCustomer(order.customerId, 'order_cancelled', 'Pesanan Dibatalkan', `Pesanan #${order.orderNumber} telah dibatalkan. ${cancelReason}`, {
            orderId: order.id,
            orderNumber: order.orderNumber,
            reason: cancelReason,
        });
    }
    static async onOrderStatusChanged(order, previousStatus) {
        const currentStatus = order.status;
        if (previousStatus === currentStatus)
            return;
        switch (currentStatus) {
            case 'paid':
                await this.onOrderPaid(order);
                break;
            case 'processing':
                await this.onOrderProcessing(order);
                break;
            case 'shipped':
                await this.onOrderShipped(order);
                break;
            case 'delivered':
                await this.onOrderDelivered(order);
                break;
            case 'cancelled':
                await this.onOrderCancelled(order);
                break;
        }
    }
    static async sendWithdrawalApproved(customerId, amount) {
        await this.notifyCustomer(customerId, 'payment_success', 'Penarikan Disetujui', `Permintaan penarikan ${formatCurrency(amount)} telah disetujui dan sedang diproses.`, {
            amount,
            type: 'withdrawal_approved',
        });
    }
    static async sendWithdrawalRejected(customerId, amount, reason) {
        await this.notifyCustomer(customerId, 'payment_failed', 'Penarikan Ditolak', `Permintaan penarikan ${formatCurrency(amount)} ditolak. Alasan: ${reason}. Saldo telah dikembalikan.`, {
            amount,
            reason,
            type: 'withdrawal_rejected',
        });
    }
}
//# sourceMappingURL=order_notification_service.js.map