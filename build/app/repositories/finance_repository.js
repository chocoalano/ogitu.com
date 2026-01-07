import WalletTransaction from '#models/wallet_transaction';
import Wallet from '#models/wallet';
import { DateTime } from 'luxon';
import OrderNotificationService from '#services/order_notification_service';
export default class FinanceRepository {
    STATUS_LABELS = {
        pending: 'Menunggu',
        completed: 'Selesai',
        failed: 'Gagal',
        cancelled: 'Dibatalkan',
    };
    STATUS_COLORS = {
        pending: 'warning',
        completed: 'success',
        failed: 'error',
        cancelled: 'neutral',
    };
    TYPE_LABELS = {
        topup: 'Top Up',
        withdrawal: 'Penarikan',
        commission: 'Komisi',
        payment: 'Pembayaran',
        refund: 'Refund',
        cashback: 'Cashback',
    };
    TYPE_COLORS = {
        topup: 'success',
        withdrawal: 'error',
        commission: 'primary',
        payment: 'warning',
        refund: 'info',
        cashback: 'success',
    };
    TYPE_ICONS = {
        topup: 'i-heroicons-arrow-down-circle',
        withdrawal: 'i-heroicons-arrow-up-circle',
        commission: 'i-heroicons-currency-dollar',
        payment: 'i-heroicons-shopping-cart',
        refund: 'i-heroicons-arrow-uturn-left',
        cashback: 'i-heroicons-gift',
    };
    getStatusLabel(status) {
        return this.STATUS_LABELS[status] || status;
    }
    getStatusColor(status) {
        return this.STATUS_COLORS[status] || 'neutral';
    }
    getTypeLabel(type) {
        return this.TYPE_LABELS[type] || type;
    }
    getTypeColor(type) {
        return this.TYPE_COLORS[type] || 'neutral';
    }
    getTypeIcon(type) {
        return this.TYPE_ICONS[type] || 'i-heroicons-banknotes';
    }
    async getPaginatedWithdrawals(filters) {
        const { page = 1, perPage = 15, status, search, dateFrom, dateTo } = filters;
        const query = WalletTransaction.query()
            .where('transactionType', 'withdrawal')
            .preload('customer')
            .preload('wallet');
        if (status) {
            query.where('status', status);
        }
        if (search) {
            query.whereHas('customer', (customerQuery) => {
                customerQuery
                    .where('fullName', 'like', `%${search}%`)
                    .orWhere('email', 'like', `%${search}%`);
            });
        }
        if (dateFrom) {
            const fromDate = DateTime.fromISO(dateFrom).startOf('day').toSQL();
            if (fromDate)
                query.where('createdAt', '>=', fromDate);
        }
        if (dateTo) {
            const toDate = DateTime.fromISO(dateTo).endOf('day').toSQL();
            if (toDate)
                query.where('createdAt', '<=', toDate);
        }
        query.orderBy('createdAt', 'desc');
        const withdrawals = await query.paginate(page, perPage);
        const stats = await this.getWithdrawalStats();
        return {
            data: withdrawals.all().map((w) => this.transformWithdrawalToListItem(w)),
            pagination: {
                currentPage: withdrawals.currentPage,
                lastPage: withdrawals.lastPage,
                total: withdrawals.total,
                perPage: withdrawals.perPage,
            },
            stats,
        };
    }
    async getWithdrawalStats() {
        const allWithdrawals = await WalletTransaction.query().where('transactionType', 'withdrawal');
        return {
            total: allWithdrawals.length,
            pending: allWithdrawals.filter((w) => w.status === 'pending').length,
            completed: allWithdrawals.filter((w) => w.status === 'completed').length,
            failed: allWithdrawals.filter((w) => w.status === 'failed').length,
            cancelled: allWithdrawals.filter((w) => w.status === 'cancelled').length,
            totalAmount: allWithdrawals
                .filter((w) => w.status === 'completed')
                .reduce((sum, w) => sum + Number(w.amount), 0),
            pendingAmount: allWithdrawals
                .filter((w) => w.status === 'pending')
                .reduce((sum, w) => sum + Number(w.amount), 0),
        };
    }
    async getWithdrawalById(id) {
        const withdrawal = await WalletTransaction.query()
            .where('id', id)
            .where('transactionType', 'withdrawal')
            .preload('customer')
            .preload('wallet')
            .first();
        if (!withdrawal)
            return null;
        return this.transformWithdrawalToDetail(withdrawal);
    }
    async approveWithdrawal(id, notes) {
        const withdrawal = await WalletTransaction.query()
            .where('id', id)
            .where('transactionType', 'withdrawal')
            .where('status', 'pending')
            .preload('wallet')
            .first();
        if (!withdrawal) {
            return {
                success: false,
                message: 'Withdrawal tidak ditemukan atau sudah diproses',
            };
        }
        withdrawal.status = 'completed';
        withdrawal.metadata = {
            ...withdrawal.metadata,
            approvedAt: DateTime.now().toISO(),
            approvalNotes: notes || '',
        };
        await withdrawal.save();
        await OrderNotificationService.sendWithdrawalApproved(withdrawal.customerId, Number(withdrawal.amount));
        await withdrawal.load('customer');
        await withdrawal.load('wallet');
        return {
            success: true,
            message: 'Permintaan withdraw berhasil disetujui',
            withdrawal: this.transformWithdrawalToDetail(withdrawal),
        };
    }
    async rejectWithdrawal(id, reason) {
        const withdrawal = await WalletTransaction.query()
            .where('id', id)
            .where('transactionType', 'withdrawal')
            .where('status', 'pending')
            .preload('wallet')
            .first();
        if (!withdrawal) {
            return {
                success: false,
                message: 'Withdrawal tidak ditemukan atau sudah diproses',
            };
        }
        const wallet = await Wallet.findOrFail(withdrawal.walletId);
        wallet.balance = Number(wallet.balance) + Number(withdrawal.amount);
        wallet.pendingBalance = Number(wallet.pendingBalance) - Number(withdrawal.amount);
        await wallet.save();
        withdrawal.status = 'failed';
        withdrawal.metadata = {
            ...withdrawal.metadata,
            rejectedAt: DateTime.now().toISO(),
            rejectionReason: reason,
        };
        await withdrawal.save();
        await OrderNotificationService.sendWithdrawalRejected(withdrawal.customerId, Number(withdrawal.amount), reason);
        await withdrawal.load('customer');
        await withdrawal.load('wallet');
        return {
            success: true,
            message: 'Permintaan withdraw ditolak dan saldo dikembalikan',
            withdrawal: this.transformWithdrawalToDetail(withdrawal),
        };
    }
    transformWithdrawalToListItem(w) {
        return {
            id: w.id,
            customerId: w.customerId,
            customerName: w.customer?.fullName || 'Unknown',
            customerEmail: w.customer?.email || '',
            customerAvatar: w.customer?.avatar || null,
            amount: Number(w.amount),
            balanceBefore: Number(w.balanceBefore),
            balanceAfter: Number(w.balanceAfter),
            status: w.status,
            statusLabel: this.getStatusLabel(w.status),
            statusColor: this.getStatusColor(w.status),
            description: w.description,
            metadata: w.metadata,
            bankName: w.metadata?.bankName || '-',
            accountNumber: w.metadata?.accountNumber || '-',
            accountName: w.metadata?.accountName || '-',
            createdAt: w.createdAt.toISO(),
            updatedAt: w.updatedAt.toISO(),
        };
    }
    transformWithdrawalToDetail(w) {
        return {
            ...this.transformWithdrawalToListItem(w),
            customerPhone: w.customer?.phone || null,
            walletBalance: Number(w.wallet?.balance || 0),
        };
    }
    async getPaginatedTransactions(filters) {
        const { page = 1, perPage = 20, type, status, search, dateFrom, dateTo } = filters;
        const query = WalletTransaction.query().preload('customer').preload('wallet');
        if (type) {
            query.where('transactionType', type);
        }
        if (status) {
            query.where('status', status);
        }
        if (search) {
            query.whereHas('customer', (customerQuery) => {
                customerQuery
                    .where('fullName', 'like', `%${search}%`)
                    .orWhere('email', 'like', `%${search}%`);
            });
        }
        if (dateFrom) {
            const fromDate = DateTime.fromISO(dateFrom).startOf('day').toSQL();
            if (fromDate)
                query.where('createdAt', '>=', fromDate);
        }
        if (dateTo) {
            const toDate = DateTime.fromISO(dateTo).endOf('day').toSQL();
            if (toDate)
                query.where('createdAt', '<=', toDate);
        }
        query.orderBy('createdAt', 'desc');
        const transactions = await query.paginate(page, perPage);
        const stats = await this.getTransactionStats();
        return {
            data: transactions.all().map((t) => this.transformTransactionToListItem(t)),
            pagination: {
                currentPage: transactions.currentPage,
                lastPage: transactions.lastPage,
                total: transactions.total,
                perPage: transactions.perPage,
            },
            stats,
        };
    }
    async getTransactionStats() {
        const todayStart = DateTime.now().startOf('day');
        const monthStart = DateTime.now().startOf('month');
        const [allTransactions, todayTransactions, monthTransactions] = await Promise.all([
            WalletTransaction.query(),
            WalletTransaction.query().where('createdAt', '>=', todayStart.toSQL()),
            WalletTransaction.query().where('createdAt', '>=', monthStart.toSQL()),
        ]);
        const completedByType = (type) => allTransactions
            .filter((t) => t.transactionType === type && t.status === 'completed')
            .reduce((sum, t) => sum + Number(t.amount), 0);
        return {
            totalTransactions: allTransactions.length,
            todayTransactions: todayTransactions.length,
            monthTransactions: monthTransactions.length,
            totalTopup: completedByType('topup'),
            totalWithdrawal: completedByType('withdrawal'),
            totalCommission: completedByType('commission'),
            totalPayment: completedByType('payment'),
            totalRefund: completedByType('refund'),
        };
    }
    async getTransactionById(id) {
        const transaction = await WalletTransaction.query()
            .where('id', id)
            .preload('customer')
            .preload('wallet')
            .first();
        if (!transaction)
            return null;
        return this.transformTransactionToDetail(transaction);
    }
    transformTransactionToListItem(t) {
        return {
            id: t.id,
            customerId: t.customerId,
            customerName: t.customer?.fullName || 'Unknown',
            customerEmail: t.customer?.email || '',
            customerAvatar: t.customer?.avatar || null,
            transactionType: t.transactionType,
            typeLabel: this.getTypeLabel(t.transactionType),
            typeColor: this.getTypeColor(t.transactionType),
            typeIcon: this.getTypeIcon(t.transactionType),
            amount: Number(t.amount),
            balanceBefore: Number(t.balanceBefore),
            balanceAfter: Number(t.balanceAfter),
            status: t.status,
            statusLabel: this.getStatusLabel(t.status),
            statusColor: this.getStatusColor(t.status),
            referenceType: t.referenceType,
            referenceId: t.referenceId,
            description: t.description,
            metadata: t.metadata,
            createdAt: t.createdAt.toISO(),
        };
    }
    transformTransactionToDetail(t) {
        return {
            ...this.transformTransactionToListItem(t),
            customerPhone: t.customer?.phone || null,
            walletBalance: Number(t.wallet?.balance || 0),
            updatedAt: t.updatedAt.toISO(),
        };
    }
}
//# sourceMappingURL=finance_repository.js.map