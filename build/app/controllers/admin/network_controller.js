import Customer from '#models/customer';
import Affiliate from '#models/affiliate';
import AffiliateReferral from '#models/affiliate_referral';
import AffiliateRepository from '#repositories/affiliate_repository';
import BugReportService from '#services/bug_report_service';
export default class NetworkController {
    moduleName = 'NetworkController';
    async reportAdmin(ctx, action, error, context, severity = 'medium') {
        await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity);
    }
    async index({ inertia, request, auth, session }) {
        try {
            const affiliates = await Affiliate.query()
                .preload('customer')
                .where('is_active', true)
                .orderBy('created_at', 'desc');
            const customersWithReferralCode = await Customer.query()
                .whereNotNull('referredByCode')
                .andWhere('referredByCode', '!=', '')
                .orderBy('created_at', 'desc');
            const allAffiliates = affiliates.map((a) => ({
                id: a.id,
                customerId: a.customerId,
                customerName: a.customer?.fullName || 'Unknown',
                customerEmail: a.customer?.email || '',
                customerAvatar: a.customer?.avatar,
                referralCode: a.referralCode,
                totalReferrals: a.totalReferrals,
                totalEarnings: a.totalEarnings,
                isActive: a.isActive,
            }));
            return inertia.render('admin/network/index', {
                affiliates: allAffiliates,
                stats: {
                    totalAffiliates: affiliates.length,
                    totalCustomersWithReferral: customersWithReferralCode.length,
                },
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'index', error, {}, 'medium');
            session.flash('error', 'Gagal memuat data network');
            return inertia.render('admin/network/index', {
                affiliates: [],
                stats: { totalAffiliates: 0, totalCustomersWithReferral: 0 },
            });
        }
    }
    async getReferredCustomers({ params, response, request, auth }) {
        const affiliateId = params.affiliateId;
        try {
            const affiliate = await Affiliate.query()
                .where('id', affiliateId)
                .preload('customer')
                .firstOrFail();
            const referredCustomers = await Customer.query()
                .where('referred_by_code', affiliate.referralCode)
                .orderBy('created_at', 'desc');
            const placedReferrals = await AffiliateReferral.query()
                .where('affiliate_id', affiliateId)
                .preload('referredCustomer');
            const placedReferralMap = new Map(placedReferrals.map((r) => [r.referredCustomerId, { referralId: r.id, level: r.level }]));
            const customers = referredCustomers.map((c) => {
                const referralInfo = placedReferralMap.get(c.id);
                return {
                    id: c.id,
                    fullName: c.fullName,
                    email: c.email,
                    phone: c.phone,
                    avatar: c.avatar,
                    isActive: c.isActive,
                    isVerified: c.isVerified,
                    totalOrdersCount: c.totalOrdersCount,
                    totalSpent: c.totalSpent,
                    createdAt: c.createdAt.toISO(),
                    isPlaced: !!referralInfo,
                    referralId: referralInfo?.referralId || null,
                    level: referralInfo?.level || null,
                };
            });
            const unplacedCustomers = customers.filter((c) => !c.isPlaced);
            const placedCustomers = customers.filter((c) => c.isPlaced);
            return response.json({
                affiliate: {
                    id: affiliate.id,
                    referralCode: affiliate.referralCode,
                    customerName: affiliate.customer?.fullName || 'Unknown',
                },
                unplacedCustomers,
                placedCustomers,
                totalReferred: customers.length,
                totalPlaced: placedCustomers.length,
                totalUnplaced: unplacedCustomers.length,
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'getReferredCustomers', error, { affiliateId }, 'medium');
            return response.status(500).json({ error: 'Gagal memuat data referral' });
        }
    }
    async getNetworkTree({ params, response, request, auth }) {
        const affiliateId = params.affiliateId;
        try {
            const treeData = await AffiliateRepository.getNetworkTree(Number(affiliateId));
            const stats = await AffiliateRepository.getNetworkStats(Number(affiliateId));
            return response.json({
                tree: treeData,
                stats,
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'getNetworkTree', error, { affiliateId }, 'medium');
            return response.status(500).json({ error: 'Gagal memuat tree network' });
        }
    }
    async placeCustomer({ request, response, auth, session }) {
        try {
            const { affiliateId, customerId, parentReferralId, level } = request.only([
                'affiliateId',
                'customerId',
                'parentReferralId',
                'level',
            ]);
            if (!affiliateId || !customerId) {
                return response.status(400).json({ error: 'Affiliate ID dan Customer ID diperlukan' });
            }
            const affiliate = await Affiliate.find(affiliateId);
            if (!affiliate) {
                return response.status(404).json({ error: 'Affiliate tidak ditemukan' });
            }
            const customer = await Customer.find(customerId);
            if (!customer) {
                return response.status(404).json({ error: 'Customer tidak ditemukan' });
            }
            const existingReferral = await AffiliateReferral.query()
                .where('affiliate_id', affiliateId)
                .where('referred_customer_id', customerId)
                .first();
            if (existingReferral) {
                return response.status(400).json({ error: 'Customer sudah ditempatkan di tree ini' });
            }
            let finalLevel = level || 1;
            let parentAffiliateId = null;
            if (parentReferralId) {
                const parentReferral = await AffiliateReferral.find(parentReferralId);
                if (parentReferral) {
                    finalLevel = Math.min(parentReferral.level + 1, 3);
                    const parentCustomerAffiliate = await Affiliate.query()
                        .where('customer_id', parentReferral.referredCustomerId)
                        .first();
                    if (parentCustomerAffiliate) {
                        parentAffiliateId = parentCustomerAffiliate.id;
                    }
                }
            }
            await AffiliateRepository.addReferral(affiliateId, customerId, parentAffiliateId, finalLevel);
            await AffiliateRepository.updateReferralStatus(customerId);
            session.flash('success', `${customer.fullName} berhasil ditempatkan di tree level ${finalLevel}`);
            return response.json({
                success: true,
                message: `${customer.fullName} berhasil ditempatkan di tree level ${finalLevel}`,
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'placeCustomer', error, {}, 'high');
            return response.status(500).json({ error: 'Gagal menempatkan customer di tree' });
        }
    }
    async bulkPlaceCustomers({ request, response, auth, session }) {
        try {
            const { affiliateId, customerIds, level } = request.only([
                'affiliateId',
                'customerIds',
                'level',
            ]);
            if (!affiliateId || !customerIds || !Array.isArray(customerIds) || customerIds.length === 0) {
                return response.status(400).json({ error: 'Data tidak valid' });
            }
            const affiliate = await Affiliate.find(affiliateId);
            if (!affiliate) {
                return response.status(404).json({ error: 'Affiliate tidak ditemukan' });
            }
            let placedCount = 0;
            let skippedCount = 0;
            const errors = [];
            for (const customerId of customerIds) {
                try {
                    const existing = await AffiliateReferral.query()
                        .where('affiliate_id', affiliateId)
                        .where('referred_customer_id', customerId)
                        .first();
                    if (existing) {
                        skippedCount++;
                        continue;
                    }
                    await AffiliateRepository.addReferral(affiliateId, customerId, null, level || 1);
                    await AffiliateRepository.updateReferralStatus(customerId);
                    placedCount++;
                }
                catch (err) {
                    errors.push(`Customer ID ${customerId}: ${err instanceof Error ? err.message : 'Unknown error'}`);
                    skippedCount++;
                }
            }
            const message = `${placedCount} customer berhasil ditempatkan, ${skippedCount} dilewati`;
            session.flash('success', message);
            return response.json({
                success: true,
                message,
                placedCount,
                skippedCount,
                errors,
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'bulkPlaceCustomers', error, {}, 'high');
            return response.status(500).json({ error: 'Gagal menempatkan customers di tree' });
        }
    }
    async removeFromTree({ params, request, response, auth, session }) {
        const referralId = params.referralId;
        try {
            const referral = await AffiliateReferral.query()
                .where('id', referralId)
                .preload('referredCustomer')
                .firstOrFail();
            const customerName = referral.referredCustomer?.fullName || 'Customer';
            const hasChildren = await AffiliateReferral.query()
                .where('parent_affiliate_id', referral.affiliateId)
                .whereExists((q) => {
                q.from('affiliates')
                    .whereColumn('affiliates.id', 'affiliate_referrals.affiliate_id')
                    .where('affiliates.customer_id', referral.referredCustomerId);
            })
                .first();
            if (hasChildren) {
                return response.status(400).json({
                    error: 'Tidak dapat menghapus member yang memiliki downline. Hapus downline terlebih dahulu.',
                });
            }
            await referral.delete();
            await Affiliate.query().where('id', referral.affiliateId).decrement('total_referrals', 1);
            session.flash('success', `${customerName} berhasil dihapus dari tree`);
            return response.json({
                success: true,
                message: `${customerName} berhasil dihapus dari tree`,
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'removeFromTree', error, { referralId }, 'high');
            return response.status(500).json({ error: 'Gagal menghapus member dari tree' });
        }
    }
    async createAffiliate({ request, response, auth, session }) {
        try {
            const { customerId } = request.only(['customerId']);
            if (!customerId) {
                return response.status(400).json({ error: 'Customer ID diperlukan' });
            }
            const customer = await Customer.find(customerId);
            if (!customer) {
                return response.status(404).json({ error: 'Customer tidak ditemukan' });
            }
            const existingAffiliate = await Affiliate.query().where('customer_id', customerId).first();
            if (existingAffiliate) {
                return response.status(400).json({ error: 'Customer sudah memiliki akun affiliate' });
            }
            const referralCode = await AffiliateRepository.generateReferralCode();
            const affiliate = await AffiliateRepository.createAffiliate(customerId, referralCode);
            session.flash('success', `Akun affiliate berhasil dibuat untuk ${customer.fullName}`);
            return response.json({
                success: true,
                message: `Akun affiliate berhasil dibuat untuk ${customer.fullName}`,
                affiliate: {
                    id: affiliate.id,
                    referralCode: affiliate.referralCode,
                    customerId: affiliate.customerId,
                },
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'createAffiliate', error, {}, 'high');
            return response.status(500).json({ error: 'Gagal membuat akun affiliate' });
        }
    }
    async getCustomersWithoutAffiliate({ request, response, auth }) {
        try {
            const search = request.input('search', '');
            let query = Customer.query()
                .whereNotExists((q) => {
                q.from('affiliates').whereColumn('affiliates.customer_id', 'customers.id');
            })
                .where('is_active', true)
                .orderBy('full_name', 'asc')
                .limit(50);
            if (search) {
                query = query.where((q) => {
                    q.where('full_name', 'LIKE', `%${search}%`).orWhere('email', 'LIKE', `%${search}%`);
                });
            }
            const customers = await query;
            return response.json({
                customers: customers.map((c) => ({
                    id: c.id,
                    fullName: c.fullName,
                    email: c.email,
                    avatar: c.avatar,
                })),
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'getCustomersWithoutAffiliate', error, {}, 'medium');
            return response.status(500).json({ error: 'Gagal memuat data customers' });
        }
    }
    async getAffiliatedCustomersWithoutReferralCode({ request, response, auth }) {
        try {
            const affiliateId = request.input('affiliateId');
            const search = request.input('search', '');
            let query = Customer.query()
                .whereExists((q) => {
                q.from('affiliate_referrals').whereColumn('affiliate_referrals.referred_customer_id', 'customers.id');
                if (affiliateId) {
                    q.where('affiliate_referrals.affiliate_id', affiliateId);
                }
            })
                .whereNotExists((q) => {
                q.from('affiliates').whereColumn('affiliates.customer_id', 'customers.id');
            })
                .where('is_active', true)
                .orderBy('full_name', 'asc')
                .limit(100);
            if (search) {
                query = query.where((q) => {
                    q.where('full_name', 'LIKE', `%${search}%`).orWhere('email', 'LIKE', `%${search}%`);
                });
            }
            const customers = await query;
            const customerIds = customers.map((c) => c.id);
            const referrals = await AffiliateReferral.query()
                .whereIn('referred_customer_id', customerIds)
                .preload('affiliate', (q) => q.preload('customer'));
            const referralMap = new Map(referrals.map((r) => [r.referredCustomerId, r]));
            return response.json({
                customers: customers.map((c) => {
                    const referral = referralMap.get(c.id);
                    return {
                        id: c.id,
                        fullName: c.fullName,
                        email: c.email,
                        avatar: c.avatar,
                        phone: c.phone,
                        totalOrdersCount: c.totalOrdersCount,
                        totalSpent: c.totalSpent,
                        level: referral?.level || null,
                        uplineName: referral?.affiliate?.customer?.fullName || null,
                        uplineReferralCode: referral?.affiliate?.referralCode || null,
                    };
                }),
                total: customers.length,
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'getAffiliatedCustomersWithoutReferralCode', error, {}, 'medium');
            return response.status(500).json({ error: 'Gagal memuat data customers terafiliasi' });
        }
    }
    async setupReferralCodeForCustomer({ request, response, auth, session }) {
        try {
            const { customerId, customReferralCode } = request.only(['customerId', 'customReferralCode']);
            if (!customerId) {
                return response.status(400).json({ error: 'Customer ID diperlukan' });
            }
            const customer = await Customer.find(customerId);
            if (!customer) {
                return response.status(404).json({ error: 'Customer tidak ditemukan' });
            }
            const inTree = await AffiliateReferral.query()
                .where('referred_customer_id', customerId)
                .first();
            if (!inTree) {
                return response.status(400).json({
                    error: 'Customer belum ditempatkan di tree network. Tempatkan terlebih dahulu.',
                });
            }
            const existingAffiliate = await Affiliate.query().where('customer_id', customerId).first();
            if (existingAffiliate) {
                return response.status(400).json({
                    error: 'Customer sudah memiliki kode referral',
                    referralCode: existingAffiliate.referralCode,
                });
            }
            let referralCode;
            if (customReferralCode) {
                const codeExists = await Affiliate.findBy('referral_code', customReferralCode.toUpperCase());
                if (codeExists) {
                    return response.status(400).json({ error: 'Kode referral sudah digunakan' });
                }
                referralCode = customReferralCode.toUpperCase();
            }
            else {
                referralCode = await AffiliateRepository.generateReferralCode();
            }
            const affiliate = await AffiliateRepository.createAffiliate(customerId, referralCode);
            session.flash('success', `Kode referral ${referralCode} berhasil dibuat untuk ${customer.fullName}`);
            return response.json({
                success: true,
                message: `Kode referral ${referralCode} berhasil dibuat untuk ${customer.fullName}`,
                affiliate: {
                    id: affiliate.id,
                    referralCode: affiliate.referralCode,
                    customerId: affiliate.customerId,
                },
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'setupReferralCodeForCustomer', error, {}, 'high');
            return response.status(500).json({ error: 'Gagal membuat kode referral' });
        }
    }
    async bulkSetupReferralCodes({ request, response, auth, session }) {
        try {
            const { customerIds } = request.only(['customerIds']);
            if (!customerIds || !Array.isArray(customerIds) || customerIds.length === 0) {
                return response.status(400).json({ error: 'Customer IDs diperlukan' });
            }
            let successCount = 0;
            let skippedCount = 0;
            const results = [];
            for (const customerId of customerIds) {
                try {
                    const customer = await Customer.find(customerId);
                    if (!customer) {
                        results.push({ customerId, error: 'Customer tidak ditemukan' });
                        skippedCount++;
                        continue;
                    }
                    const inTree = await AffiliateReferral.query()
                        .where('referred_customer_id', customerId)
                        .first();
                    if (!inTree) {
                        results.push({ customerId, error: 'Belum ada di tree network' });
                        skippedCount++;
                        continue;
                    }
                    const existingAffiliate = await Affiliate.query().where('customer_id', customerId).first();
                    if (existingAffiliate) {
                        results.push({
                            customerId,
                            referralCode: existingAffiliate.referralCode,
                            error: 'Sudah memiliki kode referral',
                        });
                        skippedCount++;
                        continue;
                    }
                    const referralCode = await AffiliateRepository.generateReferralCode();
                    await AffiliateRepository.createAffiliate(customerId, referralCode);
                    results.push({ customerId, referralCode });
                    successCount++;
                }
                catch (err) {
                    results.push({
                        customerId,
                        error: err instanceof Error ? err.message : 'Unknown error',
                    });
                    skippedCount++;
                }
            }
            const message = `${successCount} kode referral berhasil dibuat, ${skippedCount} dilewati`;
            session.flash('success', message);
            return response.json({
                success: true,
                message,
                successCount,
                skippedCount,
                results,
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'bulkSetupReferralCodes', error, {}, 'high');
            return response.status(500).json({ error: 'Gagal membuat kode referral batch' });
        }
    }
    async getAffiliatedCustomers({ params, request, response, auth }) {
        const affiliateId = params.affiliateId;
        try {
            const affiliate = await Affiliate.query()
                .where('id', affiliateId)
                .preload('customer')
                .firstOrFail();
            const referrals = await AffiliateReferral.query()
                .where('affiliate_id', affiliateId)
                .preload('referredCustomer');
            const customerIds = referrals.map((r) => r.referredCustomerId);
            const affiliateAccounts = await Affiliate.query().whereIn('customer_id', customerIds);
            const affiliateMap = new Map(affiliateAccounts.map((a) => [a.customerId, a]));
            const customers = referrals.map((r) => {
                const affiliateAccount = affiliateMap.get(r.referredCustomerId);
                return {
                    id: r.referredCustomerId,
                    fullName: r.referredCustomer?.fullName || 'Unknown',
                    email: r.referredCustomer?.email || '',
                    avatar: r.referredCustomer?.avatar,
                    phone: r.referredCustomer?.phone,
                    level: r.level,
                    hasReferralCode: !!affiliateAccount,
                    referralCode: affiliateAccount?.referralCode || null,
                    totalReferrals: affiliateAccount?.totalReferrals || 0,
                    totalEarnings: affiliateAccount?.totalEarnings || 0,
                    isActive: affiliateAccount?.isActive ?? true,
                };
            });
            const withReferralCode = customers.filter((c) => c.hasReferralCode);
            const withoutReferralCode = customers.filter((c) => !c.hasReferralCode);
            return response.json({
                affiliate: {
                    id: affiliate.id,
                    referralCode: affiliate.referralCode,
                    customerName: affiliate.customer?.fullName || 'Unknown',
                },
                customers,
                withReferralCode,
                withoutReferralCode,
                stats: {
                    total: customers.length,
                    withCode: withReferralCode.length,
                    withoutCode: withoutReferralCode.length,
                },
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'getAffiliatedCustomers', error, { affiliateId }, 'medium');
            return response.status(500).json({ error: 'Gagal memuat data customers terafiliasi' });
        }
    }
    async searchCustomersForTree({ params, request, response, auth }) {
        const affiliateId = params.affiliateId;
        const search = request.input('search', '');
        try {
            if (!search || search.length < 2) {
                return response.json({ customers: [] });
            }
            const affiliate = await Affiliate.find(affiliateId);
            if (!affiliate) {
                return response.status(404).json({ error: 'Affiliate tidak ditemukan' });
            }
            const customers = await Customer.query()
                .where((q) => {
                q.where('full_name', 'LIKE', `%${search}%`)
                    .orWhere('email', 'LIKE', `%${search}%`)
                    .orWhere('phone', 'LIKE', `%${search}%`);
            })
                .where('is_active', true)
                .orderBy('full_name', 'asc')
                .limit(50);
            const existingReferrals = await AffiliateReferral.query()
                .where('affiliate_id', affiliateId)
                .select('referred_customer_id');
            const inTreeIds = new Set(existingReferrals.map((r) => r.referredCustomerId));
            const customerIds = customers.map((c) => c.id);
            const affiliateAccounts = await Affiliate.query().whereIn('customer_id', customerIds);
            const hasAffiliateIds = new Set(affiliateAccounts.map((a) => a.customerId));
            const affiliateCustomerId = affiliate.customerId;
            return response.json({
                customers: customers
                    .filter((c) => c.id !== affiliateCustomerId)
                    .map((c) => ({
                    id: c.id,
                    fullName: c.fullName,
                    email: c.email,
                    avatar: c.avatar,
                    phone: c.phone,
                    totalOrdersCount: c.totalOrdersCount,
                    totalSpent: c.totalSpent,
                    isInTree: inTreeIds.has(c.id),
                    hasAffiliate: hasAffiliateIds.has(c.id),
                })),
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'searchCustomersForTree', error, { affiliateId, search }, 'medium');
            return response.status(500).json({ error: 'Gagal mencari customers' });
        }
    }
    async addMemberToTree({ request, response, auth, session }) {
        try {
            const { affiliateId, customerId, level } = request.only([
                'affiliateId',
                'customerId',
                'level',
            ]);
            if (!affiliateId || !customerId) {
                return response.status(400).json({ error: 'Affiliate ID dan Customer ID diperlukan' });
            }
            const affiliate = await Affiliate.find(affiliateId);
            if (!affiliate) {
                return response.status(404).json({ error: 'Affiliate tidak ditemukan' });
            }
            const customer = await Customer.find(customerId);
            if (!customer) {
                return response.status(404).json({ error: 'Customer tidak ditemukan' });
            }
            const existingReferral = await AffiliateReferral.query()
                .where('affiliate_id', affiliateId)
                .where('referred_customer_id', customerId)
                .first();
            if (existingReferral) {
                return response.status(400).json({ error: 'Customer sudah ada di tree ini' });
            }
            if (affiliate.customerId === customerId) {
                return response.status(400).json({ error: 'Tidak dapat menambahkan diri sendiri ke tree' });
            }
            const finalLevel = Math.min(Math.max(level || 1, 1), 3);
            await AffiliateRepository.addReferral(affiliateId, customerId, null, finalLevel);
            customer.referredByCode = affiliate.referralCode;
            await customer.save();
            session.flash('success', `${customer.fullName} berhasil ditambahkan ke tree level ${finalLevel}`);
            return response.json({
                success: true,
                message: `${customer.fullName} berhasil ditambahkan ke tree level ${finalLevel}`,
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'addMemberToTree', error, {}, 'high');
            return response.status(500).json({ error: 'Gagal menambahkan member ke tree' });
        }
    }
}
//# sourceMappingURL=network_controller.js.map