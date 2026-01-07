import env from '#start/env';
import Order from '#models/order';
import CartItem from '#models/cart_item';
import Wishlist from '#models/wishlist';
import Address from '#models/address';
import Wallet from '#models/wallet';
import Affiliate from '#models/affiliate';
import CustomerRank from '#models/customer_rank';
import WalletTransaction from '#models/wallet_transaction';
import AffiliateCommission from '#models/affiliate_commission';
import AffiliateReferral from '#models/affiliate_referral';
import AffiliateRepository from '#repositories/affiliate_repository';
import MidtransService from '#services/midtrans_service';
import Helper from '#services/helper';
import BugReportService from '#services/bug_report_service';
import db from '@adonisjs/lucid/services/db';
export default class DashboardController {
    async index({ auth, inertia }) {
        const customer = auth.use('customer').user;
        const orderStats = await Order.query()
            .where('customerId', customer.id)
            .select(db.raw('COUNT(*) as total_orders'), db.raw("SUM(CASE WHEN status = 'pending_payment' THEN 1 ELSE 0 END) as pending_payment"), db.raw("SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid"), db.raw("SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) as processing"), db.raw("SUM(CASE WHEN status = 'shipped' THEN 1 ELSE 0 END) as shipped"), db.raw("SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered"), db.raw("SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled"), db.raw("SUM(CASE WHEN status = 'delivered' THEN total ELSE 0 END) as total_spent"))
            .first();
        const recentOrders = await Order.query()
            .where('customerId', customer.id)
            .preload('items', (query) => {
            query.preload('product', (pq) => {
                pq.preload('images', (imgQuery) => {
                    imgQuery.orderBy('isPrimary', 'desc').orderBy('sortOrder', 'asc');
                });
            });
            query.preload('productVariant');
        })
            .preload('payment')
            .orderBy('createdAt', 'desc')
            .limit(5);
        const cartCount = await CartItem.query()
            .where('customerId', customer.id)
            .count('* as total')
            .first();
        const wishlistCount = await Wishlist.query()
            .where('customerId', customer.id)
            .count('* as total')
            .first();
        const addresses = await Address.query()
            .where('customerId', customer.id)
            .orderBy('isDefault', 'desc')
            .orderBy('createdAt', 'desc');
        const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0] || null;
        let wallet = await Wallet.query().where('customerId', customer.id).first();
        if (!wallet) {
            wallet = await Wallet.create({
                customerId: customer.id,
                balance: 0,
                pendingBalance: 0,
                isActive: true,
            });
        }
        const recentTransactions = await WalletTransaction.query()
            .where('customerId', customer.id)
            .orderBy('createdAt', 'desc')
            .limit(5);
        let affiliate = await Affiliate.query().where('customerId', customer.id).first();
        if (!affiliate) {
            const referralCode = await this.generateReferralCode(customer.fullName, customer.id);
            affiliate = await Affiliate.create({
                customerId: customer.id,
                referralCode,
                commissionRate: 5.0,
                totalEarnings: 0,
                pendingEarnings: 0,
                withdrawnEarnings: 0,
                totalReferrals: 0,
                totalOrders: 0,
                isActive: true,
            });
        }
        const recentCommissions = await AffiliateCommission.query()
            .where('affiliateId', affiliate.id)
            .preload('order')
            .orderBy('createdAt', 'desc')
            .limit(5);
        const referrals = await AffiliateReferral.query()
            .where('affiliateId', affiliate.id)
            .preload('referredCustomer', (query) => {
            query.preload('orders', (orderQuery) => {
                orderQuery.where('status', 'delivered');
            });
        })
            .orderBy('createdAt', 'desc')
            .limit(10);
        const networkStats = await AffiliateRepository.getNetworkStats(affiliate.id);
        const networkTree = await AffiliateRepository.getNetworkTree(affiliate.id);
        const allRanks = await CustomerRank.query()
            .where('isActive', true)
            .orderBy('orderPriority', 'asc');
        const totalOrdersCount = Number(orderStats?.$extras.total_orders || 0);
        const totalSpent = Number(orderStats?.$extras.total_spent || 0);
        let currentRank = allRanks[0];
        let nextRank = allRanks[1] || null;
        for (let i = 0; i < allRanks.length; i++) {
            const rank = allRanks[i];
            if (totalOrdersCount >= rank.minOrders && totalSpent >= rank.minSpent) {
                currentRank = rank;
                nextRank = allRanks[i + 1] || null;
            }
        }
        let rankProgress = 100;
        let ordersToNextRank = 0;
        let spentToNextRank = 0;
        if (nextRank) {
            const ordersProgress = nextRank.minOrders > 0 ? Math.min(100, (totalOrdersCount / nextRank.minOrders) * 100) : 100;
            const spentProgress = nextRank.minSpent > 0 ? Math.min(100, (totalSpent / nextRank.minSpent) * 100) : 100;
            rankProgress = Math.min(ordersProgress, spentProgress);
            ordersToNextRank = Math.max(0, nextRank.minOrders - totalOrdersCount);
            spentToNextRank = Math.max(0, nextRank.minSpent - totalSpent);
        }
        const transformedOrders = recentOrders.map((order) => {
            const firstItem = order.items[0];
            let itemImage = null;
            if (firstItem) {
                const productImages = firstItem.product?.images || [];
                const primaryImage = productImages.find((img) => img.isPrimary);
                const imageUrl = primaryImage?.url || productImages[0]?.url || null;
                itemImage = Helper.getFullImageUrl(imageUrl);
            }
            return {
                id: order.id,
                orderNumber: order.orderNumber,
                status: order.status,
                total: order.total,
                itemCount: order.items.length,
                firstItem: firstItem
                    ? {
                        name: firstItem.variantName
                            ? `${firstItem.productName} - ${firstItem.variantName}`
                            : firstItem.productName,
                        image: itemImage,
                        quantity: firstItem.quantity,
                    }
                    : null,
                createdAt: order.createdAt.toISO(),
                paidAt: order.paidAt?.toISO() || null,
            };
        });
        const transformedAddresses = addresses.map((addr) => ({
            id: addr.id,
            label: addr.label,
            recipientName: addr.recipientName,
            phone: addr.phone,
            addressLine1: addr.addressLine1,
            addressLine2: addr.addressLine2,
            cityId: addr.cityId,
            cityName: addr.cityName,
            districtId: addr.districtId,
            districtName: addr.districtName,
            provinceId: addr.provinceId,
            provinceName: addr.provinceName,
            postalCode: addr.postalCode,
            isDefault: addr.isDefault,
        }));
        const transformedTransactions = recentTransactions.map((tx) => ({
            id: tx.id,
            type: tx.transactionType,
            amount: tx.amount,
            balanceAfter: tx.balanceAfter,
            description: tx.description,
            status: tx.status,
            createdAt: tx.createdAt.toISO(),
        }));
        const transformedCommissions = recentCommissions.map((comm) => ({
            id: comm.id,
            orderNumber: comm.order?.orderNumber || '-',
            orderTotal: comm.orderTotal,
            commissionRate: comm.commissionRate,
            commissionAmount: comm.commissionAmount,
            status: comm.status,
            level: comm.level || 1,
            createdAt: comm.createdAt.toISO(),
        }));
        const transformedReferrals = referrals.map((ref) => {
            const customer = ref.referredCustomer;
            const customerOrders = customer?.orders || [];
            const totalSpentCalc = customerOrders.reduce((sum, order) => sum + Number(order.total || 0), 0);
            return {
                id: ref.id,
                customerName: customer?.fullName || 'Customer',
                customerAvatar: customer?.avatar ? Helper.getFullImageUrl(customer.avatar) : null,
                status: ref.status,
                totalOrders: ref.totalOrders || customerOrders.length,
                totalSpent: ref.totalSpent || totalSpentCalc,
                registeredAt: ref.registeredAt?.toISO() || ref.createdAt.toISO(),
                level: ref.level || 1,
            };
        });
        const transformedRanks = allRanks.map((rank) => ({
            id: rank.id,
            name: rank.name,
            slug: rank.slug,
            icon: rank.icon,
            color: rank.color,
            minOrders: rank.minOrders,
            minSpent: rank.minSpent,
            cashbackRate: rank.cashbackRate,
            affiliateBonusRate: rank.affiliateBonusRate,
            benefits: rank.benefits,
        }));
        return inertia.render('dashboard/index', {
            customer: {
                id: customer.id,
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone,
                avatar: customer.avatar,
                isVerified: customer.isVerified,
                createdAt: customer.createdAt.toISO(),
            },
            stats: {
                totalOrders: totalOrdersCount,
                pendingPayment: Number(orderStats?.$extras.pending_payment || 0),
                paid: Number(orderStats?.$extras.paid || 0),
                processing: Number(orderStats?.$extras.processing || 0),
                shipped: Number(orderStats?.$extras.shipped || 0),
                delivered: Number(orderStats?.$extras.delivered || 0),
                cancelled: Number(orderStats?.$extras.cancelled || 0),
                totalSpent: totalSpent,
            },
            cartCount: Number(cartCount?.$extras.total || 0),
            wishlistCount: Number(wishlistCount?.$extras.total || 0),
            addressCount: addresses.length,
            addresses: transformedAddresses,
            defaultAddress: defaultAddress
                ? {
                    id: defaultAddress.id,
                    label: defaultAddress.label,
                    recipientName: defaultAddress.recipientName,
                    phone: defaultAddress.phone,
                    addressLine1: defaultAddress.addressLine1,
                    cityName: defaultAddress.cityName,
                    provinceName: defaultAddress.provinceName,
                }
                : null,
            recentOrders: transformedOrders,
            wallet: {
                id: wallet.id,
                balance: wallet.balance,
                pendingBalance: wallet.pendingBalance,
                isActive: wallet.isActive,
            },
            recentTransactions: transformedTransactions,
            affiliate: {
                id: affiliate.id,
                referralCode: affiliate.referralCode,
                commissionRate: affiliate.commissionRate,
                totalEarnings: affiliate.totalEarnings,
                pendingEarnings: affiliate.pendingEarnings,
                withdrawnEarnings: affiliate.withdrawnEarnings,
                totalReferrals: affiliate.totalReferrals,
                totalOrders: affiliate.totalOrders,
                isActive: affiliate.isActive,
            },
            recentCommissions: transformedCommissions,
            referrals: transformedReferrals,
            networkStats,
            networkTree,
            currentRank: currentRank
                ? {
                    id: currentRank.id,
                    name: currentRank.name,
                    slug: currentRank.slug,
                    icon: currentRank.icon,
                    color: currentRank.color,
                    cashbackRate: currentRank.cashbackRate,
                    affiliateBonusRate: currentRank.affiliateBonusRate,
                    benefits: currentRank.benefits,
                }
                : null,
            nextRank: nextRank
                ? {
                    id: nextRank.id,
                    name: nextRank.name,
                    slug: nextRank.slug,
                    icon: nextRank.icon,
                    color: nextRank.color,
                    minOrders: nextRank.minOrders,
                    minSpent: nextRank.minSpent,
                }
                : null,
            rankProgress,
            ordersToNextRank,
            spentToNextRank,
            allRanks: transformedRanks,
        });
    }
    async profile({ auth, inertia }) {
        const customer = auth.use('customer').user;
        const orderStats = await Order.query()
            .where('customerId', customer.id)
            .select(db.raw('COUNT(*) as total_orders'), db.raw("SUM(CASE WHEN status = 'delivered' THEN total ELSE 0 END) as total_spent"))
            .first();
        let wallet = await Wallet.query().where('customerId', customer.id).first();
        if (!wallet) {
            wallet = await Wallet.create({
                customerId: customer.id,
                balance: 0,
                pendingBalance: 0,
                isActive: true,
            });
        }
        const allRanks = await CustomerRank.query()
            .where('isActive', true)
            .orderBy('orderPriority', 'asc');
        const totalOrdersCount = Number(orderStats?.$extras.total_orders || 0);
        const totalSpent = Number(orderStats?.$extras.total_spent || 0);
        let currentRank = allRanks[0];
        for (const rank of allRanks) {
            if (totalOrdersCount >= rank.minOrders && totalSpent >= rank.minSpent) {
                currentRank = rank;
            }
        }
        return inertia.render('profile/index', {
            customer: {
                id: customer.id,
                fullName: customer.fullName,
                email: customer.email,
                phone: customer.phone,
                avatar: customer.avatar,
                isVerified: customer.isVerified,
                createdAt: customer.createdAt.toISO(),
            },
            stats: {
                totalOrders: totalOrdersCount,
                totalSpent: totalSpent,
            },
            wallet: {
                balance: wallet.balance,
                pendingBalance: wallet.pendingBalance,
            },
            currentRank: currentRank
                ? {
                    name: currentRank.name,
                    icon: currentRank.icon,
                    color: currentRank.color,
                }
                : null,
        });
    }
    async updateProfile({ auth, request, response }) {
        const customer = auth.use('customer').user;
        const data = request.only(['fullName', 'phone']);
        try {
            customer.fullName = data.fullName || customer.fullName;
            customer.phone = data.phone || customer.phone;
            await customer.save();
            return response.json({
                success: true,
                message: 'Profil berhasil diperbarui',
                customer: {
                    id: customer.id,
                    fullName: customer.fullName,
                    email: customer.email,
                    phone: customer.phone,
                },
            });
        }
        catch (error) {
            return response.status(500).json({
                success: false,
                message: 'Gagal memperbarui profil',
            });
        }
    }
    async saveAddress({ auth, request, response }) {
        const customer = auth.use('customer').user;
        const data = request.only([
            'id',
            'label',
            'recipientName',
            'phone',
            'addressLine1',
            'addressLine2',
            'cityId',
            'cityName',
            'districtId',
            'districtName',
            'provinceId',
            'provinceName',
            'postalCode',
            'isDefault',
        ]);
        if (data.isDefault) {
            await Address.query().where('customerId', customer.id).update({ isDefault: false });
        }
        let address;
        if (data.id) {
            address = await Address.query()
                .where('id', data.id)
                .where('customerId', customer.id)
                .firstOrFail();
            address.merge({
                label: data.label,
                recipientName: data.recipientName,
                phone: data.phone,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2 || null,
                cityId: data.cityId,
                cityName: data.cityName,
                districtId: data.districtId || null,
                districtName: data.districtName || null,
                provinceId: data.provinceId,
                provinceName: data.provinceName,
                postalCode: data.postalCode,
                isDefault: data.isDefault || false,
            });
            await address.save();
        }
        else {
            address = await Address.create({
                customerId: customer.id,
                label: data.label,
                recipientName: data.recipientName,
                phone: data.phone,
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2 || null,
                cityId: data.cityId,
                cityName: data.cityName,
                districtId: data.districtId || null,
                districtName: data.districtName || null,
                provinceId: data.provinceId,
                provinceName: data.provinceName,
                postalCode: data.postalCode,
                country: 'Indonesia',
                isDefault: data.isDefault || false,
            });
        }
        return response.json({
            success: true,
            message: data.id ? 'Alamat berhasil diperbarui' : 'Alamat berhasil ditambahkan',
            address: {
                id: address.id,
                label: address.label,
                recipientName: address.recipientName,
                phone: address.phone,
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                cityId: address.cityId,
                cityName: address.cityName,
                districtId: address.districtId,
                districtName: address.districtName,
                provinceId: address.provinceId,
                provinceName: address.provinceName,
                postalCode: address.postalCode,
                isDefault: address.isDefault,
            },
        });
    }
    async deleteAddress({ auth, params, response }) {
        const customer = auth.use('customer').user;
        const address = await Address.query()
            .where('id', params.id)
            .where('customerId', customer.id)
            .firstOrFail();
        await address.delete();
        return response.json({
            success: true,
            message: 'Alamat berhasil dihapus',
        });
    }
    async setDefaultAddress({ auth, params, response }) {
        const customer = auth.use('customer').user;
        await Address.query().where('customerId', customer.id).update({ isDefault: false });
        await Address.query()
            .where('id', params.id)
            .where('customerId', customer.id)
            .update({ isDefault: true });
        return response.json({
            success: true,
            message: 'Alamat utama berhasil diubah',
        });
    }
    async topupWallet({ auth, request, response }) {
        const customer = auth.use('customer').user;
        const { amount } = request.only(['amount']);
        if (!amount || amount < 10000) {
            return response.badRequest({ message: 'Minimum top up Rp 10.000' });
        }
        const wallet = await Wallet.query().where('customerId', customer.id).firstOrFail();
        const topupId = `TOPUP-${customer.id}-${Date.now()}`;
        const transaction = await WalletTransaction.create({
            walletId: wallet.id,
            customerId: customer.id,
            transactionType: 'topup',
            amount: amount,
            balanceBefore: wallet.balance,
            balanceAfter: wallet.balance + amount,
            description: `Top up saldo Rp ${amount.toLocaleString('id-ID')}`,
            status: 'pending',
            referenceType: 'midtrans_topup',
            referenceId: null,
            metadata: { topupId },
        });
        const midtransService = new MidtransService();
        try {
            const snapResult = await midtransService.createSnapToken({
                orderId: topupId,
                grossAmount: amount,
                customerDetails: {
                    firstName: customer.fullName.split(' ')[0],
                    lastName: customer.fullName.split(' ').slice(1).join(' ') || '',
                    email: customer.email,
                    phone: customer.phone || '',
                },
                itemDetails: [
                    {
                        id: 'wallet-topup',
                        name: 'Top Up Saldo E-Wallet',
                        price: amount,
                        quantity: 1,
                    },
                ],
            });
            transaction.metadata = {
                ...transaction.metadata,
                snapToken: snapResult.token,
                redirectUrl: snapResult.redirect_url,
            };
            await transaction.save();
            return response.json({
                success: true,
                message: 'Silakan lanjutkan pembayaran',
                snapToken: snapResult.token,
                redirectUrl: snapResult.redirect_url,
                transactionId: transaction.id,
                topupId,
                midtransConfig: {
                    clientKey: env.get('MIDTRANS_CLIENT_KEY'),
                    snapUrl: env.get('MIDTRANS_IS_PRODUCTION')
                        ? 'https://app.midtrans.com/snap/snap.js'
                        : 'https://app.sandbox.midtrans.com/snap/snap.js',
                },
            });
        }
        catch (error) {
            await transaction.delete();
            return response.internalServerError({
                success: false,
                message: 'Gagal membuat pembayaran',
                error: error.message,
            });
        }
    }
    async getTopupStatus({ auth, params, response }) {
        const customer = auth.use('customer').user;
        const transaction = await WalletTransaction.query()
            .where('customerId', customer.id)
            .where('id', params.id)
            .first();
        if (!transaction) {
            return response.notFound({ message: 'Transaksi tidak ditemukan' });
        }
        return response.json({
            success: true,
            transaction: {
                id: transaction.id,
                status: transaction.status,
                amount: transaction.amount,
                createdAt: transaction.createdAt.toISO(),
            },
        });
    }
    async confirmTopup({ auth, params, response }) {
        const customer = auth.use('customer').user;
        const transaction = await WalletTransaction.query()
            .where('customerId', customer.id)
            .where('id', params.id)
            .where('transactionType', 'topup')
            .first();
        if (!transaction) {
            return response.notFound({ message: 'Transaksi tidak ditemukan' });
        }
        if (transaction.status === 'completed') {
            return response.json({
                success: true,
                message: 'Top up sudah berhasil',
                status: 'completed',
            });
        }
        const topupId = transaction.metadata?.topupId;
        if (!topupId) {
            return response.badRequest({ message: 'Invalid transaction data' });
        }
        const midtransService = new MidtransService();
        try {
            const midtransStatus = await midtransService.getTransactionStatus(topupId);
            if (midtransStatus.transaction_status === 'settlement' ||
                midtransStatus.transaction_status === 'capture') {
                const wallet = await Wallet.query().where('customerId', customer.id).firstOrFail();
                const currentBalance = Number(wallet.balance) || 0;
                const topupAmount = Number(transaction.amount) || 0;
                transaction.status = 'completed';
                transaction.balanceBefore = currentBalance;
                transaction.balanceAfter = currentBalance + topupAmount;
                transaction.metadata = {
                    ...transaction.metadata,
                    midtransTransactionId: midtransStatus.transaction_id,
                    paymentType: midtransStatus.payment_type,
                    settlementTime: midtransStatus.settlement_time,
                    confirmedAt: new Date().toISOString(),
                };
                await transaction.save();
                wallet.balance = currentBalance + topupAmount;
                await wallet.save();
                return response.json({
                    success: true,
                    message: 'Top up berhasil dikonfirmasi',
                    status: 'completed',
                    newBalance: wallet.balance,
                });
            }
            else if (['cancel', 'deny', 'expire'].includes(midtransStatus.transaction_status)) {
                await transaction.delete();
                return response.json({
                    success: false,
                    message: 'Pembayaran gagal atau dibatalkan',
                    status: midtransStatus.transaction_status,
                });
            }
            else {
                return response.json({
                    success: true,
                    message: 'Menunggu pembayaran',
                    status: midtransStatus.transaction_status,
                });
            }
        }
        catch (error) {
            await BugReportService.logCustomerError({ request: { url: () => `/api/topup/${params.id}/check`, method: () => 'POST', ip: () => '', header: () => '' }, auth }, 'DashboardController', 'checkTopup', error, { topupId: params.id }, 'high');
            return response.internalServerError({
                success: false,
                message: 'Gagal mengecek status pembayaran',
                error: error.message,
            });
        }
    }
    async cancelTopup({ auth, params, response }) {
        const customer = auth.use('customer').user;
        const transaction = await WalletTransaction.query()
            .where('customerId', customer.id)
            .where('id', params.id)
            .where('transactionType', 'topup')
            .where('status', 'pending')
            .first();
        if (!transaction) {
            return response.notFound({ message: 'Transaksi tidak ditemukan atau sudah diproses' });
        }
        await transaction.delete();
        return response.json({
            success: true,
            message: 'Top up dibatalkan',
        });
    }
    async generateReferralCode(name, id) {
        const prefix = name
            .replace(/[^a-zA-Z]/g, '')
            .substring(0, 3)
            .toUpperCase();
        const suffix = id.toString().padStart(4, '0');
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `${prefix}${suffix}${random}`;
    }
}
//# sourceMappingURL=dashboard_controller.js.map