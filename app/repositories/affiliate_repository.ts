import { DateTime } from 'luxon'
import Affiliate from '#models/affiliate'
import AffiliateReferral from '#models/affiliate_referral'
import AffiliateCommission from '#models/affiliate_commission'
import Customer from '#models/customer'

export interface NetworkNode {
  key: string
  text: string
  level: number
  count?: number
  isRoot?: boolean
  color: string
  gradientStart: string
  gradientEnd: string
  customerId?: number
  customerName?: string
  customerAvatar?: string | null
  status?: string
  totalSpent?: number
  totalOrders?: number
}

export interface NetworkLink {
  from: string
  to: string
}

export interface NetworkTreeData {
  nodes: NetworkNode[]
  links: NetworkLink[]
}

export interface NetworkStats {
  level1Count: number
  level2Count: number
  level3Count: number
  totalNetworkValue: number
  activeMembers: number
  inactiveMembers: number
}

export interface ReferralMember {
  id: number
  customerName: string
  customerAvatar: string | null
  status: 'active' | 'inactive' | 'prospect'
  totalOrders: number
  totalSpent: number
  registeredAt: string
  level: number
}

export default class AffiliateRepository {
  /**
   * Get affiliate by customer ID
   */
  static async getByCustomerId(customerId: number): Promise<Affiliate | null> {
    return Affiliate.query().where('customer_id', customerId).preload('customer').first()
  }

  /**
   * Get affiliate by referral code
   */
  static async getByReferralCode(referralCode: string): Promise<Affiliate | null> {
    return Affiliate.query()
      .where('referral_code', referralCode)
      .where('is_active', true)
      .preload('customer')
      .first()
  }

  /**
   * Create a new affiliate
   */
  static async createAffiliate(
    customerId: number,
    referralCode: string,
    commissionRate: number = 5.0
  ): Promise<Affiliate> {
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
    })
  }

  /**
   * Add a referral to an affiliate
   * @param affiliateId - The affiliate who referred
   * @param referredCustomerId - The customer who was referred
   * @param parentAffiliateId - The parent affiliate (for MLM hierarchy)
   * @param level - The level in the MLM tree (1, 2, or 3)
   */
  static async addReferral(
    affiliateId: number,
    referredCustomerId: number,
    parentAffiliateId: number | null = null,
    level: number = 1
  ): Promise<AffiliateReferral> {
    const referral = await AffiliateReferral.create({
      affiliateId,
      parentAffiliateId,
      referredCustomerId,
      level,
      status: 'prospect',
      totalSpent: 0,
      totalOrders: 0,
      registeredAt: DateTime.now(),
    })

    // Update affiliate's total referrals count
    await Affiliate.query().where('id', affiliateId).increment('total_referrals', 1)

    return referral
  }

  /**
   * Get network stats for an affiliate (counts by level)
   */
  static async getNetworkStats(affiliateId: number): Promise<NetworkStats> {
    // Count members by level
    const levelCounts = await AffiliateReferral.query()
      .where('affiliate_id', affiliateId)
      .select('level')
      .count('* as count')
      .groupBy('level')

    // Count active/inactive members
    const statusCounts = await AffiliateReferral.query()
      .where('affiliate_id', affiliateId)
      .select('status')
      .count('* as count')
      .groupBy('status')

    // Calculate total network value (total spent by all referrals)
    const totalValueResult = await AffiliateReferral.query()
      .where('affiliate_id', affiliateId)
      .sum('total_spent as total')

    const level1Count = levelCounts.find((l) => l.level === 1)?.$extras.count || 0
    const level2Count = levelCounts.find((l) => l.level === 2)?.$extras.count || 0
    const level3Count = levelCounts.find((l) => l.level === 3)?.$extras.count || 0

    const activeMembers = statusCounts.find((s) => s.status === 'active')?.$extras.count || 0
    const inactiveMembers =
      (statusCounts.find((s) => s.status === 'inactive')?.$extras.count || 0) +
      (statusCounts.find((s) => s.status === 'prospect')?.$extras.count || 0)

    return {
      level1Count: Number(level1Count),
      level2Count: Number(level2Count),
      level3Count: Number(level3Count),
      totalNetworkValue: Number(totalValueResult[0]?.$extras.total || 0),
      activeMembers: Number(activeMembers),
      inactiveMembers: Number(inactiveMembers),
    }
  }

  /**
   * Get all referrals for an affiliate with customer details
   */
  static async getReferrals(
    affiliateId: number,
    status?: 'active' | 'inactive' | 'prospect'
  ): Promise<ReferralMember[]> {
    const query = AffiliateReferral.query()
      .where('affiliate_id', affiliateId)
      .preload('referredCustomer')
      .orderBy('created_at', 'desc')

    if (status) {
      query.where('status', status)
    }

    const referrals = await query

    return referrals.map((r) => ({
      id: r.id,
      customerName: r.referredCustomer?.fullName || 'Unknown',
      customerAvatar: r.referredCustomer?.avatar || null,
      status: r.status,
      totalOrders: r.totalOrders,
      totalSpent: r.totalSpent,
      registeredAt: r.registeredAt?.toISO() || r.createdAt.toISO() || '',
      level: r.level,
    }))
  }

  /**
   * Get full MLM tree data for visualization
   * Returns nodes and links for GoJS diagram
   */
  static async getNetworkTree(affiliateId: number): Promise<NetworkTreeData> {
    const affiliate = await Affiliate.query().where('id', affiliateId).preload('customer').first()

    if (!affiliate) {
      return { nodes: [], links: [] }
    }

    const nodes: NetworkNode[] = []
    const links: NetworkLink[] = []

    // Root node (the affiliate)
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
    })

    // Get all referrals grouped by level
    const referrals = await AffiliateReferral.query()
      .where('affiliate_id', affiliateId)
      .preload('referredCustomer')
      .orderBy('level', 'asc')
      .orderBy('created_at', 'asc')

    // Level colors configuration
    const levelColors: Record<
      number,
      { color: string; gradientStart: string; gradientEnd: string }
    > = {
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
    }

    // Add referral nodes
    for (const referral of referrals) {
      const levelColor = levelColors[referral.level] || levelColors[1]
      const nodeKey = `referral_${referral.id}`

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
      })

      // Create link from parent
      if (referral.parentAffiliateId && referral.level > 1) {
        // Find the parent referral node
        const parentReferral = referrals.find(
          (r) =>
            r.referredCustomerId ===
            (referrals.find((pr) => pr.affiliateId === referral.parentAffiliateId)
              ?.referredCustomerId || 0)
        )
        if (parentReferral) {
          links.push({
            from: `referral_${parentReferral.id}`,
            to: nodeKey,
          })
        } else {
          // Link to root
          links.push({
            from: `affiliate_${affiliateId}`,
            to: nodeKey,
          })
        }
      } else {
        // Level 1 always links to root
        links.push({
          from: `affiliate_${affiliateId}`,
          to: nodeKey,
        })
      }
    }

    return { nodes, links }
  }

  /**
   * Get commissions for an affiliate
   */
  static async getCommissions(
    affiliateId: number,
    limit: number = 10
  ): Promise<AffiliateCommission[]> {
    return AffiliateCommission.query()
      .where('affiliate_id', affiliateId)
      .orderBy('created_at', 'desc')
      .limit(limit)
  }

  /**
   * Update referral status based on customer activity
   */
  static async updateReferralStatus(referredCustomerId: number): Promise<void> {
    const customer = await Customer.find(referredCustomerId)
    if (!customer) return

    const referral = await AffiliateReferral.query()
      .where('referred_customer_id', referredCustomerId)
      .first()

    if (!referral) return

    // Update totals
    referral.totalSpent = customer.totalSpent || 0
    referral.totalOrders = customer.totalOrdersCount || 0

    // Update status based on activity
    if (customer.totalOrdersCount > 0) {
      referral.status = 'active'
    } else if (referral.status === 'prospect') {
      // Keep as prospect if no orders yet
      referral.status = 'prospect'
    }

    await referral.save()
  }

  /**
   * Process multi-level commission when an order is placed
   * This distributes commissions up the MLM tree
   */
  static async processMLMCommission(
    orderId: number,
    orderTotal: number,
    customerId: number
  ): Promise<void> {
    // Find if this customer was referred
    const referral = await AffiliateReferral.query()
      .where('referred_customer_id', customerId)
      .preload('affiliate')
      .first()

    if (!referral) return

    // Commission rates by level (can be configured)
    const commissionRates: Record<number, number> = {
      1: 5.0, // 5% for level 1 (direct referral)
      2: 2.0, // 2% for level 2
      3: 1.0, // 1% for level 3
    }

    // Process commission for the direct affiliate (level 1)
    await this.createCommission(referral.affiliateId, orderId, orderTotal, commissionRates[1], 1)

    // Process commission for parent affiliates (level 2 and 3)
    if (referral.parentAffiliateId) {
      // Level 2 commission
      await this.createCommission(
        referral.parentAffiliateId,
        orderId,
        orderTotal,
        commissionRates[2],
        2
      )

      // Check for level 3
      const parentReferral = await AffiliateReferral.query()
        .where('affiliate_id', referral.parentAffiliateId)
        .first()

      if (parentReferral?.parentAffiliateId) {
        await this.createCommission(
          parentReferral.parentAffiliateId,
          orderId,
          orderTotal,
          commissionRates[3],
          3
        )
      }
    }

    // Update referral stats
    await this.updateReferralStatus(customerId)
  }

  /**
   * Create a commission record
   */
  private static async createCommission(
    affiliateId: number,
    orderId: number,
    orderTotal: number,
    commissionRate: number,
    level: number
  ): Promise<void> {
    const commissionAmount = (orderTotal * commissionRate) / 100

    await AffiliateCommission.create({
      affiliateId,
      orderId,
      orderTotal,
      commissionRate,
      commissionAmount,
      level,
      status: 'pending',
    })

    // Update affiliate's pending earnings
    await Affiliate.query().where('id', affiliateId).increment('pending_earnings', commissionAmount)
  }

  /**
   * Generate unique referral code
   */
  static async generateReferralCode(prefix: string = 'OGI'): Promise<string> {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code: string
    let exists = true

    while (exists) {
      code = prefix
      for (let i = 0; i < 6; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length))
      }
      const existing = await Affiliate.findBy('referral_code', code)
      exists = !!existing
    }

    return code!
  }
}
