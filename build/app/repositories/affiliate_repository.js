import { DateTime } from 'luxon';
import Affiliate from '#models/affiliate';
import AffiliateReferral from '#models/affiliate_referral';
import AffiliateCommission from '#models/affiliate_commission';
import Customer from '#models/customer';
export default class AffiliateRepository {
    static async getByCustomerId(customerId) {
        return Affiliate.query().where('customer_id', customerId).preload('customer').first();
    }
    static async getByReferralCode(referralCode) {
        return Affiliate.query()
            .where('referral_code', referralCode)
            .where('is_active', true)
            .preload('customer')
            .first();
    }
    static async createAffiliate(customerId, referralCode, commissionRate = 5.0) {
        return Affiliate.create({
            customerId,
            referralCode,
            commissionRate,
            totalEarnings: 0,
            pendingEarnings: 0,
            withdrawnEarnings: 0,
            totalReferrals: 0,
            totalOrders: 0,
            isActive: true,
        });
    }
    static async addReferral(affiliateId, referredCustomerId, parentAffiliateId = null, level = 1) {
        const referral = await AffiliateReferral.create({
            affiliateId,
            parentAffiliateId,
            referredCustomerId,
            level,
            status: 'prospect',
            totalSpent: 0,
            totalOrders: 0,
            registeredAt: DateTime.now(),
        });
        await Affiliate.query().where('id', affiliateId).increment('total_referrals', 1);
        return referral;
    }
    static async getNetworkStats(affiliateId) {
        const levelCounts = await AffiliateReferral.query()
            .where('affiliate_id', affiliateId)
            .select('level')
            .count('* as count')
            .groupBy('level');
        const statusCounts = await AffiliateReferral.query()
            .where('affiliate_id', affiliateId)
            .select('status')
            .count('* as count')
            .groupBy('status');
        const totalValueResult = await AffiliateReferral.query()
            .where('affiliate_id', affiliateId)
            .sum('total_spent as total');
        const level1Count = levelCounts.find((l) => l.level === 1)?.$extras.count || 0;
        const level2Count = levelCounts.find((l) => l.level === 2)?.$extras.count || 0;
        const level3Count = levelCounts.find((l) => l.level === 3)?.$extras.count || 0;
        const activeMembers = statusCounts.find((s) => s.status === 'active')?.$extras.count || 0;
        const inactiveMembers = (statusCounts.find((s) => s.status === 'inactive')?.$extras.count || 0) +
            (statusCounts.find((s) => s.status === 'prospect')?.$extras.count || 0);
        return {
            level1Count: Number(level1Count),
            level2Count: Number(level2Count),
            level3Count: Number(level3Count),
            totalNetworkValue: Number(totalValueResult[0]?.$extras.total || 0),
            activeMembers: Number(activeMembers),
            inactiveMembers: Number(inactiveMembers),
        };
    }
    static async getReferrals(affiliateId, status) {
        const query = AffiliateReferral.query()
            .where('affiliate_id', affiliateId)
            .preload('referredCustomer')
            .orderBy('created_at', 'desc');
        if (status) {
            query.where('status', status);
        }
        const referrals = await query;
        return referrals.map((r) => ({
            id: r.id,
            customerName: r.referredCustomer?.fullName || 'Unknown',
            customerAvatar: r.referredCustomer?.avatar || null,
            status: r.status,
            totalOrders: r.totalOrders,
            totalSpent: r.totalSpent,
            registeredAt: r.registeredAt?.toISO() || r.createdAt.toISO() || '',
            level: r.level,
        }));
    }
    static async getNetworkTree(affiliateId) {
        const affiliate = await Affiliate.query().where('id', affiliateId).preload('customer').first();
        if (!affiliate) {
            return { nodes: [], links: [] };
        }
        const nodes = [];
        const links = [];
        nodes.push({
            key: `affiliate_${affiliate.id}`,
            text: 'YOU',
            level: 0,
            isRoot: true,
            color: 'rgb(139, 92, 246)',
            gradientStart: 'rgb(139, 92, 246)',
            gradientEnd: 'rgb(168, 85, 247)',
            customerId: affiliate.customerId,
            customerName: affiliate.customer?.fullName || 'You',
            customerAvatar: affiliate.customer?.avatar,
        });
        const referrals = await AffiliateReferral.query()
            .where('affiliate_id', affiliateId)
            .preload('referredCustomer')
            .orderBy('level', 'asc')
            .orderBy('created_at', 'asc');
        const levelColors = {
            1: {
                color: 'rgb(34, 211, 238)',
                gradientStart: 'rgb(34, 211, 238)',
                gradientEnd: 'rgb(59, 130, 246)',
            },
            2: {
                color: 'rgb(192, 132, 252)',
                gradientStart: 'rgb(192, 132, 252)',
                gradientEnd: 'rgb(236, 72, 153)',
            },
            3: {
                color: 'rgb(251, 191, 36)',
                gradientStart: 'rgb(251, 191, 36)',
                gradientEnd: 'rgb(249, 115, 22)',
            },
        };
        for (const referral of referrals) {
            const levelColor = levelColors[referral.level] || levelColors[1];
            const nodeKey = `referral_${referral.id}`;
            nodes.push({
                key: nodeKey,
                text: referral.referredCustomer?.fullName?.charAt(0) || 'U',
                level: referral.level,
                ...levelColor,
                customerId: referral.referredCustomerId,
                customerName: referral.referredCustomer?.fullName || 'Unknown',
                customerAvatar: referral.referredCustomer?.avatar,
                status: referral.status,
                totalSpent: referral.totalSpent,
                totalOrders: referral.totalOrders,
            });
            if (referral.parentAffiliateId && referral.level > 1) {
                const parentReferral = referrals.find((r) => r.referredCustomerId ===
                    (referrals.find((pr) => pr.affiliateId === referral.parentAffiliateId)
                        ?.referredCustomerId || 0));
                if (parentReferral) {
                    links.push({
                        from: `referral_${parentReferral.id}`,
                        to: nodeKey,
                    });
                }
                else {
                    links.push({
                        from: `affiliate_${affiliateId}`,
                        to: nodeKey,
                    });
                }
            }
            else {
                links.push({
                    from: `affiliate_${affiliateId}`,
                    to: nodeKey,
                });
            }
        }
        return { nodes, links };
    }
    static async getCommissions(affiliateId, limit = 10) {
        return AffiliateCommission.query()
            .where('affiliate_id', affiliateId)
            .orderBy('created_at', 'desc')
            .limit(limit);
    }
    static async updateReferralStatus(referredCustomerId) {
        const customer = await Customer.find(referredCustomerId);
        if (!customer)
            return;
        const referral = await AffiliateReferral.query()
            .where('referred_customer_id', referredCustomerId)
            .first();
        if (!referral)
            return;
        referral.totalSpent = customer.totalSpent || 0;
        referral.totalOrders = customer.totalOrdersCount || 0;
        if (customer.totalOrdersCount > 0) {
            referral.status = 'active';
        }
        else if (referral.status === 'prospect') {
            referral.status = 'prospect';
        }
        await referral.save();
    }
    static async processMLMCommission(orderId, orderTotal, customerId) {
        const referral = await AffiliateReferral.query()
            .where('referred_customer_id', customerId)
            .preload('affiliate')
            .first();
        if (!referral)
            return;
        const commissionRates = {
            1: 5.0,
            2: 2.0,
            3: 1.0,
        };
        await this.createCommission(referral.affiliateId, orderId, orderTotal, commissionRates[1], 1);
        if (referral.parentAffiliateId) {
            await this.createCommission(referral.parentAffiliateId, orderId, orderTotal, commissionRates[2], 2);
            const parentReferral = await AffiliateReferral.query()
                .where('affiliate_id', referral.parentAffiliateId)
                .first();
            if (parentReferral?.parentAffiliateId) {
                await this.createCommission(parentReferral.parentAffiliateId, orderId, orderTotal, commissionRates[3], 3);
            }
        }
        await this.updateReferralStatus(customerId);
    }
    static async createCommission(affiliateId, orderId, orderTotal, commissionRate, level) {
        const commissionAmount = (orderTotal * commissionRate) / 100;
        await AffiliateCommission.create({
            affiliateId,
            orderId,
            orderTotal,
            commissionRate,
            commissionAmount,
            level,
            status: 'pending',
        });
        await Affiliate.query().where('id', affiliateId).increment('pending_earnings', commissionAmount);
    }
    static async generateReferralCode(prefix = 'OGI') {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code;
        let exists = true;
        while (exists) {
            code = prefix;
            for (let i = 0; i < 6; i++) {
                code += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            const existing = await Affiliate.findBy('referral_code', code);
            exists = !!existing;
        }
        return code;
    }
}
//# sourceMappingURL=affiliate_repository.js.map