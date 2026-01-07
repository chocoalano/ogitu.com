import type { HttpContext } from '@adonisjs/core/http'
import Customer from '#models/customer'
import Affiliate from '#models/affiliate'
import AffiliateReferral from '#models/affiliate_referral'
import AffiliateRepository from '#repositories/affiliate_repository'
import BugReportService from '#services/bug_report_service'

export default class NetworkController {
  private moduleName = 'NetworkController'

  private async reportAdmin(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    action: string,
    error: unknown,
    context?: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity)
  }

  /**
   * Display MLM network setup page
   */
  async index({ inertia, request, auth, session }: HttpContext) {
    try {
      // Get all customers who have affiliate accounts (potential root nodes)
      const affiliates = await Affiliate.query()
        .preload('customer')
        .where('is_active', true)
        .orderBy('created_at', 'desc')

      // Get customers who don't have affiliate but have referral code (potential uplines)
      const customersWithReferralCode = await Customer.query()
        .whereNotNull('referredByCode')
        .andWhere('referredByCode', '!=', '')
        .orderBy('created_at', 'desc')

      // Get all affiliates for tree display
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
      }))

      return inertia.render('admin/network/index', {
        affiliates: allAffiliates,
        stats: {
          totalAffiliates: affiliates.length,
          totalCustomersWithReferral: customersWithReferralCode.length,
        },
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'index', error, {}, 'medium')
      session.flash('error', 'Gagal memuat data network')

      return inertia.render('admin/network/index', {
        affiliates: [],
        stats: { totalAffiliates: 0, totalCustomersWithReferral: 0 },
      })
    }
  }

  /**
   * Get customers who were referred by a specific affiliate (by referral code)
   * These are potential members to place in the MLM tree
   */
  async getReferredCustomers({ params, response, request, auth }: HttpContext) {
    const affiliateId = params.affiliateId

    try {
      const affiliate = await Affiliate.query()
        .where('id', affiliateId)
        .preload('customer')
        .firstOrFail()

      // Find customers who used this affiliate's referral code
      const referredCustomers = await Customer.query()
        .where('referred_by_code', affiliate.referralCode)
        .orderBy('created_at', 'desc')

      // Get already placed referrals for this affiliate (with full data for placed customers)
      const placedReferrals = await AffiliateReferral.query()
        .where('affiliate_id', affiliateId)
        .preload('referredCustomer')

      const placedReferralMap = new Map<number, { referralId: number; level: number }>(
        placedReferrals.map((r) => [r.referredCustomerId, { referralId: r.id, level: r.level }])
      )

      // Separate placed and unplaced customers
      const customers = referredCustomers.map((c) => {
        const referralInfo = placedReferralMap.get(c.id)
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
        }
      })

      const unplacedCustomers = customers.filter((c) => !c.isPlaced)
      const placedCustomers = customers.filter((c) => c.isPlaced)

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
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'getReferredCustomers',
        error,
        { affiliateId },
        'medium'
      )
      return response.status(500).json({ error: 'Gagal memuat data referral' })
    }
  }

  /**
   * Get MLM tree structure for a specific affiliate
   */
  async getNetworkTree({ params, response, request, auth }: HttpContext) {
    const affiliateId = params.affiliateId

    try {
      const treeData = await AffiliateRepository.getNetworkTree(Number(affiliateId))
      const stats = await AffiliateRepository.getNetworkStats(Number(affiliateId))

      return response.json({
        tree: treeData,
        stats,
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'getNetworkTree', error, { affiliateId }, 'medium')
      return response.status(500).json({ error: 'Gagal memuat tree network' })
    }
  }

  /**
   * Place a customer in the MLM tree under a specific affiliate
   */
  async placeCustomer({ request, response, auth, session }: HttpContext) {
    try {
      const { affiliateId, customerId, parentReferralId, level } = request.only([
        'affiliateId',
        'customerId',
        'parentReferralId',
        'level',
      ])

      // Validate inputs
      if (!affiliateId || !customerId) {
        return response.status(400).json({ error: 'Affiliate ID dan Customer ID diperlukan' })
      }

      // Check if affiliate exists
      const affiliate = await Affiliate.find(affiliateId)
      if (!affiliate) {
        return response.status(404).json({ error: 'Affiliate tidak ditemukan' })
      }

      // Check if customer exists
      const customer = await Customer.find(customerId)
      if (!customer) {
        return response.status(404).json({ error: 'Customer tidak ditemukan' })
      }

      // Check if customer is already placed under this affiliate
      const existingReferral = await AffiliateReferral.query()
        .where('affiliate_id', affiliateId)
        .where('referred_customer_id', customerId)
        .first()

      if (existingReferral) {
        return response.status(400).json({ error: 'Customer sudah ditempatkan di tree ini' })
      }

      // Determine level and parent
      let finalLevel = level || 1
      let parentAffiliateId: number | null = null

      if (parentReferralId) {
        // Find the parent referral to get their level
        const parentReferral = await AffiliateReferral.find(parentReferralId)
        if (parentReferral) {
          finalLevel = Math.min(parentReferral.level + 1, 3) // Max level 3
          // For parent_affiliate_id, we need to find if the parent customer has an affiliate account
          const parentCustomerAffiliate = await Affiliate.query()
            .where('customer_id', parentReferral.referredCustomerId)
            .first()
          if (parentCustomerAffiliate) {
            parentAffiliateId = parentCustomerAffiliate.id
          }
        }
      }

      // Create the referral
      await AffiliateRepository.addReferral(affiliateId, customerId, parentAffiliateId, finalLevel)

      // Update referral status
      await AffiliateRepository.updateReferralStatus(customerId)

      session.flash(
        'success',
        `${customer.fullName} berhasil ditempatkan di tree level ${finalLevel}`
      )

      return response.json({
        success: true,
        message: `${customer.fullName} berhasil ditempatkan di tree level ${finalLevel}`,
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'placeCustomer', error, {}, 'high')
      return response.status(500).json({ error: 'Gagal menempatkan customer di tree' })
    }
  }

  /**
   * Place multiple customers at once
   */
  async bulkPlaceCustomers({ request, response, auth, session }: HttpContext) {
    try {
      const { affiliateId, customerIds, level } = request.only([
        'affiliateId',
        'customerIds',
        'level',
      ])

      if (!affiliateId || !customerIds || !Array.isArray(customerIds) || customerIds.length === 0) {
        return response.status(400).json({ error: 'Data tidak valid' })
      }

      const affiliate = await Affiliate.find(affiliateId)
      if (!affiliate) {
        return response.status(404).json({ error: 'Affiliate tidak ditemukan' })
      }

      let placedCount = 0
      let skippedCount = 0
      const errors: string[] = []

      for (const customerId of customerIds) {
        try {
          // Check if already placed
          const existing = await AffiliateReferral.query()
            .where('affiliate_id', affiliateId)
            .where('referred_customer_id', customerId)
            .first()

          if (existing) {
            skippedCount++
            continue
          }

          // Create referral
          await AffiliateRepository.addReferral(affiliateId, customerId, null, level || 1)
          await AffiliateRepository.updateReferralStatus(customerId)
          placedCount++
        } catch (err) {
          errors.push(
            `Customer ID ${customerId}: ${err instanceof Error ? err.message : 'Unknown error'}`
          )
          skippedCount++
        }
      }

      const message = `${placedCount} customer berhasil ditempatkan, ${skippedCount} dilewati`
      session.flash('success', message)

      return response.json({
        success: true,
        message,
        placedCount,
        skippedCount,
        errors,
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'bulkPlaceCustomers', error, {}, 'high')
      return response.status(500).json({ error: 'Gagal menempatkan customers di tree' })
    }
  }

  /**
   * Remove a customer from the MLM tree
   */
  async removeFromTree({ params, request, response, auth, session }: HttpContext) {
    const referralId = params.referralId

    try {
      const referral = await AffiliateReferral.query()
        .where('id', referralId)
        .preload('referredCustomer')
        .firstOrFail()

      const customerName = referral.referredCustomer?.fullName || 'Customer'

      // Check if this referral has children (downlines)
      const hasChildren = await AffiliateReferral.query()
        .where('parent_affiliate_id', referral.affiliateId)
        .whereExists((q) => {
          q.from('affiliates')
            .whereColumn('affiliates.id', 'affiliate_referrals.affiliate_id')
            .where('affiliates.customer_id', referral.referredCustomerId)
        })
        .first()

      if (hasChildren) {
        return response.status(400).json({
          error:
            'Tidak dapat menghapus member yang memiliki downline. Hapus downline terlebih dahulu.',
        })
      }

      // Delete the referral
      await referral.delete()

      // Decrement total referrals count
      await Affiliate.query().where('id', referral.affiliateId).decrement('total_referrals', 1)

      session.flash('success', `${customerName} berhasil dihapus dari tree`)

      return response.json({
        success: true,
        message: `${customerName} berhasil dihapus dari tree`,
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'removeFromTree', error, { referralId }, 'high')
      return response.status(500).json({ error: 'Gagal menghapus member dari tree' })
    }
  }

  /**
   * Create affiliate account for a customer
   */
  async createAffiliate({ request, response, auth, session }: HttpContext) {
    try {
      const { customerId } = request.only(['customerId'])

      if (!customerId) {
        return response.status(400).json({ error: 'Customer ID diperlukan' })
      }

      const customer = await Customer.find(customerId)
      if (!customer) {
        return response.status(404).json({ error: 'Customer tidak ditemukan' })
      }

      // Check if already has affiliate account
      const existingAffiliate = await Affiliate.query().where('customer_id', customerId).first()

      if (existingAffiliate) {
        return response.status(400).json({ error: 'Customer sudah memiliki akun affiliate' })
      }

      // Generate referral code
      const referralCode = await AffiliateRepository.generateReferralCode()

      // Create affiliate
      const affiliate = await AffiliateRepository.createAffiliate(customerId, referralCode)

      session.flash('success', `Akun affiliate berhasil dibuat untuk ${customer.fullName}`)

      return response.json({
        success: true,
        message: `Akun affiliate berhasil dibuat untuk ${customer.fullName}`,
        affiliate: {
          id: affiliate.id,
          referralCode: affiliate.referralCode,
          customerId: affiliate.customerId,
        },
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'createAffiliate', error, {}, 'high')
      return response.status(500).json({ error: 'Gagal membuat akun affiliate' })
    }
  }

  /**
   * Get all customers without affiliate account (for creating new affiliates)
   */
  async getCustomersWithoutAffiliate({ request, response, auth }: HttpContext) {
    try {
      const search = request.input('search', '')

      let query = Customer.query()
        .whereNotExists((q) => {
          q.from('affiliates').whereColumn('affiliates.customer_id', 'customers.id')
        })
        .where('is_active', true)
        .orderBy('full_name', 'asc')
        .limit(50)

      if (search) {
        query = query.where((q) => {
          q.where('full_name', 'LIKE', `%${search}%`).orWhere('email', 'LIKE', `%${search}%`)
        })
      }

      const customers = await query

      return response.json({
        customers: customers.map((c) => ({
          id: c.id,
          fullName: c.fullName,
          email: c.email,
          avatar: c.avatar,
        })),
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'getCustomersWithoutAffiliate', error, {}, 'medium')
      return response.status(500).json({ error: 'Gagal memuat data customers' })
    }
  }

  /**
   * Get affiliated customers without referral code (customers in tree that need referral code setup)
   * These are customers who are placed in the MLM tree but don't have their own referral code yet
   */
  async getAffiliatedCustomersWithoutReferralCode({ request, response, auth }: HttpContext) {
    try {
      const affiliateId = request.input('affiliateId')
      const search = request.input('search', '')

      // Get customers who are in the referral tree (have been referred) but don't have their own affiliate account
      let query = Customer.query()
        .whereExists((q) => {
          q.from('affiliate_referrals').whereColumn(
            'affiliate_referrals.referred_customer_id',
            'customers.id'
          )
          if (affiliateId) {
            q.where('affiliate_referrals.affiliate_id', affiliateId)
          }
        })
        .whereNotExists((q) => {
          q.from('affiliates').whereColumn('affiliates.customer_id', 'customers.id')
        })
        .where('is_active', true)
        .orderBy('full_name', 'asc')
        .limit(100)

      if (search) {
        query = query.where((q) => {
          q.where('full_name', 'LIKE', `%${search}%`).orWhere('email', 'LIKE', `%${search}%`)
        })
      }

      const customers = await query

      // Get additional info about their placement
      const customerIds = customers.map((c) => c.id)
      const referrals = await AffiliateReferral.query()
        .whereIn('referred_customer_id', customerIds)
        .preload('affiliate', (q) => q.preload('customer'))

      const referralMap = new Map(referrals.map((r) => [r.referredCustomerId, r]))

      return response.json({
        customers: customers.map((c) => {
          const referral = referralMap.get(c.id)
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
          }
        }),
        total: customers.length,
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'getAffiliatedCustomersWithoutReferralCode',
        error,
        {},
        'medium'
      )
      return response.status(500).json({ error: 'Gagal memuat data customers terafiliasi' })
    }
  }

  /**
   * Setup referral code for a single affiliated customer
   * Creates an affiliate account for them so they can refer others
   */
  async setupReferralCodeForCustomer({ request, response, auth, session }: HttpContext) {
    try {
      const { customerId, customReferralCode } = request.only(['customerId', 'customReferralCode'])

      if (!customerId) {
        return response.status(400).json({ error: 'Customer ID diperlukan' })
      }

      const customer = await Customer.find(customerId)
      if (!customer) {
        return response.status(404).json({ error: 'Customer tidak ditemukan' })
      }

      // Check if customer is in the referral tree
      const inTree = await AffiliateReferral.query()
        .where('referred_customer_id', customerId)
        .first()

      if (!inTree) {
        return response.status(400).json({
          error: 'Customer belum ditempatkan di tree network. Tempatkan terlebih dahulu.',
        })
      }

      // Check if already has affiliate account
      const existingAffiliate = await Affiliate.query().where('customer_id', customerId).first()

      if (existingAffiliate) {
        return response.status(400).json({
          error: 'Customer sudah memiliki kode referral',
          referralCode: existingAffiliate.referralCode,
        })
      }

      // Generate or use custom referral code
      let referralCode: string
      if (customReferralCode) {
        // Validate custom code
        const codeExists = await Affiliate.findBy('referral_code', customReferralCode.toUpperCase())
        if (codeExists) {
          return response.status(400).json({ error: 'Kode referral sudah digunakan' })
        }
        referralCode = customReferralCode.toUpperCase()
      } else {
        referralCode = await AffiliateRepository.generateReferralCode()
      }

      // Create affiliate account
      const affiliate = await AffiliateRepository.createAffiliate(customerId, referralCode)

      session.flash(
        'success',
        `Kode referral ${referralCode} berhasil dibuat untuk ${customer.fullName}`
      )

      return response.json({
        success: true,
        message: `Kode referral ${referralCode} berhasil dibuat untuk ${customer.fullName}`,
        affiliate: {
          id: affiliate.id,
          referralCode: affiliate.referralCode,
          customerId: affiliate.customerId,
        },
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'setupReferralCodeForCustomer', error, {}, 'high')
      return response.status(500).json({ error: 'Gagal membuat kode referral' })
    }
  }

  /**
   * Bulk setup referral codes for multiple affiliated customers
   */
  async bulkSetupReferralCodes({ request, response, auth, session }: HttpContext) {
    try {
      const { customerIds } = request.only(['customerIds'])

      if (!customerIds || !Array.isArray(customerIds) || customerIds.length === 0) {
        return response.status(400).json({ error: 'Customer IDs diperlukan' })
      }

      let successCount = 0
      let skippedCount = 0
      const results: { customerId: number; referralCode?: string; error?: string }[] = []

      for (const customerId of customerIds) {
        try {
          const customer = await Customer.find(customerId)
          if (!customer) {
            results.push({ customerId, error: 'Customer tidak ditemukan' })
            skippedCount++
            continue
          }

          // Check if in tree
          const inTree = await AffiliateReferral.query()
            .where('referred_customer_id', customerId)
            .first()

          if (!inTree) {
            results.push({ customerId, error: 'Belum ada di tree network' })
            skippedCount++
            continue
          }

          // Check if already has affiliate
          const existingAffiliate = await Affiliate.query().where('customer_id', customerId).first()

          if (existingAffiliate) {
            results.push({
              customerId,
              referralCode: existingAffiliate.referralCode,
              error: 'Sudah memiliki kode referral',
            })
            skippedCount++
            continue
          }

          // Generate referral code
          const referralCode = await AffiliateRepository.generateReferralCode()
          await AffiliateRepository.createAffiliate(customerId, referralCode)

          results.push({ customerId, referralCode })
          successCount++
        } catch (err) {
          results.push({
            customerId,
            error: err instanceof Error ? err.message : 'Unknown error',
          })
          skippedCount++
        }
      }

      const message = `${successCount} kode referral berhasil dibuat, ${skippedCount} dilewati`
      session.flash('success', message)

      return response.json({
        success: true,
        message,
        successCount,
        skippedCount,
        results,
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'bulkSetupReferralCodes', error, {}, 'high')
      return response.status(500).json({ error: 'Gagal membuat kode referral batch' })
    }
  }

  /**
   * Get all affiliated customers (customers in tree with their referral code status)
   */
  async getAffiliatedCustomers({ params, request, response, auth }: HttpContext) {
    const affiliateId = params.affiliateId

    try {
      const affiliate = await Affiliate.query()
        .where('id', affiliateId)
        .preload('customer')
        .firstOrFail()

      // Get all customers in this affiliate's tree
      const referrals = await AffiliateReferral.query()
        .where('affiliate_id', affiliateId)
        .preload('referredCustomer')

      const customerIds = referrals.map((r) => r.referredCustomerId)

      // Check which customers have affiliate accounts (have referral codes)
      const affiliateAccounts = await Affiliate.query().whereIn('customer_id', customerIds)

      const affiliateMap = new Map(affiliateAccounts.map((a) => [a.customerId, a]))

      const customers = referrals.map((r) => {
        const affiliateAccount = affiliateMap.get(r.referredCustomerId)
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
        }
      })

      const withReferralCode = customers.filter((c) => c.hasReferralCode)
      const withoutReferralCode = customers.filter((c) => !c.hasReferralCode)

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
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'getAffiliatedCustomers',
        error,
        { affiliateId },
        'medium'
      )
      return response.status(500).json({ error: 'Gagal memuat data customers terafiliasi' })
    }
  }

  /**
   * Search customers for adding to tree (any customer can be added)
   */
  async searchCustomersForTree({ params, request, response, auth }: HttpContext) {
    const affiliateId = params.affiliateId
    const search = request.input('search', '')

    try {
      if (!search || search.length < 2) {
        return response.json({ customers: [] })
      }

      const affiliate = await Affiliate.find(affiliateId)
      if (!affiliate) {
        return response.status(404).json({ error: 'Affiliate tidak ditemukan' })
      }

      // Get all customers matching search
      const customers = await Customer.query()
        .where((q) => {
          q.where('full_name', 'LIKE', `%${search}%`)
            .orWhere('email', 'LIKE', `%${search}%`)
            .orWhere('phone', 'LIKE', `%${search}%`)
        })
        .where('is_active', true)
        .orderBy('full_name', 'asc')
        .limit(50)

      // Get customers already in this affiliate's tree
      const existingReferrals = await AffiliateReferral.query()
        .where('affiliate_id', affiliateId)
        .select('referred_customer_id')

      const inTreeIds = new Set(existingReferrals.map((r) => r.referredCustomerId))

      // Get customers with affiliate accounts
      const customerIds = customers.map((c) => c.id)
      const affiliateAccounts = await Affiliate.query().whereIn('customer_id', customerIds)
      const hasAffiliateIds = new Set(affiliateAccounts.map((a) => a.customerId))

      // Don't include the affiliate's own customer
      const affiliateCustomerId = affiliate.customerId

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
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'searchCustomersForTree',
        error,
        { affiliateId, search },
        'medium'
      )
      return response.status(500).json({ error: 'Gagal mencari customers' })
    }
  }

  /**
   * Add any customer directly to the tree (without requiring them to use referral code)
   */
  async addMemberToTree({ request, response, auth, session }: HttpContext) {
    try {
      const { affiliateId, customerId, level } = request.only([
        'affiliateId',
        'customerId',
        'level',
      ])

      if (!affiliateId || !customerId) {
        return response.status(400).json({ error: 'Affiliate ID dan Customer ID diperlukan' })
      }

      const affiliate = await Affiliate.find(affiliateId)
      if (!affiliate) {
        return response.status(404).json({ error: 'Affiliate tidak ditemukan' })
      }

      const customer = await Customer.find(customerId)
      if (!customer) {
        return response.status(404).json({ error: 'Customer tidak ditemukan' })
      }

      // Check if customer is already in this tree
      const existingReferral = await AffiliateReferral.query()
        .where('affiliate_id', affiliateId)
        .where('referred_customer_id', customerId)
        .first()

      if (existingReferral) {
        return response.status(400).json({ error: 'Customer sudah ada di tree ini' })
      }

      // Don't allow adding the affiliate's own customer
      if (affiliate.customerId === customerId) {
        return response.status(400).json({ error: 'Tidak dapat menambahkan diri sendiri ke tree' })
      }

      const finalLevel = Math.min(Math.max(level || 1, 1), 3) // Ensure level is between 1-3

      // Create the referral
      await AffiliateRepository.addReferral(affiliateId, customerId, null, finalLevel)

      // Update the customer's referredByCode to link them to this affiliate
      customer.referredByCode = affiliate.referralCode
      await customer.save()

      session.flash(
        'success',
        `${customer.fullName} berhasil ditambahkan ke tree level ${finalLevel}`
      )

      return response.json({
        success: true,
        message: `${customer.fullName} berhasil ditambahkan ke tree level ${finalLevel}`,
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'addMemberToTree', error, {}, 'high')
      return response.status(500).json({ error: 'Gagal menambahkan member ke tree' })
    }
  }
}
