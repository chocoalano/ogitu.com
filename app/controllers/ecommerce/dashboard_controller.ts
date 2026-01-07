import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import Order from '#models/order'
import CartItem from '#models/cart_item'
import Wishlist from '#models/wishlist'
import Address from '#models/address'
import Wallet from '#models/wallet'
import Affiliate from '#models/affiliate'
import CustomerRank from '#models/customer_rank'
import WalletTransaction from '#models/wallet_transaction'
import AffiliateCommission from '#models/affiliate_commission'
import AffiliateReferral from '#models/affiliate_referral'
import AffiliateRepository from '#repositories/affiliate_repository'
import MidtransService from '#services/midtrans_service'
import Helper from '#services/helper'
import BugReportService from '#services/bug_report_service'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  /**
   * Customer Dashboard Page
   */
  public async index({ auth, inertia }: HttpContext) {
    const customer = auth.use('customer').user!

    // Get order statistics
    const orderStats = await Order.query()
      .where('customerId', customer.id)
      .select(
        db.raw('COUNT(*) as total_orders'),
        db.raw("SUM(CASE WHEN status = 'pending_payment' THEN 1 ELSE 0 END) as pending_payment"),
        db.raw("SUM(CASE WHEN status = 'paid' THEN 1 ELSE 0 END) as paid"),
        db.raw("SUM(CASE WHEN status = 'processing' THEN 1 ELSE 0 END) as processing"),
        db.raw("SUM(CASE WHEN status = 'shipped' THEN 1 ELSE 0 END) as shipped"),
        db.raw("SUM(CASE WHEN status = 'delivered' THEN 1 ELSE 0 END) as delivered"),
        db.raw("SUM(CASE WHEN status = 'cancelled' THEN 1 ELSE 0 END) as cancelled"),
        db.raw("SUM(CASE WHEN status = 'delivered' THEN total ELSE 0 END) as total_spent")
      )
      .first()

    // Get recent orders
    const recentOrders = await Order.query()
      .where('customerId', customer.id)
      .preload('items', (query) => {
        query.preload('product', (pq) => {
          pq.preload('images', (imgQuery) => {
            imgQuery.orderBy('isPrimary', 'desc').orderBy('sortOrder', 'asc')
          })
        })
        query.preload('productVariant')
      })
      .preload('payment')
      .orderBy('createdAt', 'desc')
      .limit(5)

    // Get cart count
    const cartCount = await CartItem.query()
      .where('customerId', customer.id)
      .count('* as total')
      .first()

    // Get wishlist count
    const wishlistCount = await Wishlist.query()
      .where('customerId', customer.id)
      .count('* as total')
      .first()

    // Get all addresses for the customer
    const addresses = await Address.query()
      .where('customerId', customer.id)
      .orderBy('isDefault', 'desc')
      .orderBy('createdAt', 'desc')

    // Get default address
    const defaultAddress = addresses.find((addr) => addr.isDefault) || addresses[0] || null

    // Get or create wallet
    let wallet = await Wallet.query().where('customerId', customer.id).first()
    if (!wallet) {
      wallet = await Wallet.create({
        customerId: customer.id,
        balance: 0,
        pendingBalance: 0,
        isActive: true,
      })
    }

    // Get recent wallet transactions
    const recentTransactions = await WalletTransaction.query()
      .where('customerId', customer.id)
      .orderBy('createdAt', 'desc')
      .limit(5)

    // Get or create affiliate
    let affiliate = await Affiliate.query().where('customerId', customer.id).first()
    if (!affiliate) {
      // Generate unique referral code
      const referralCode = await this.generateReferralCode(customer.fullName, customer.id)
      affiliate = await Affiliate.create({
        customerId: customer.id,
        referralCode,
        commissionRate: 5.0, // 5% default
        totalEarnings: 0,
        pendingEarnings: 0,
        withdrawnEarnings: 0,
        totalReferrals: 0,
        totalOrders: 0,
        isActive: true,
      })
    }

    // Get recent commissions
    const recentCommissions = await AffiliateCommission.query()
      .where('affiliateId', affiliate.id)
      .preload('order')
      .orderBy('createdAt', 'desc')
      .limit(5)

    // Get referrals for MLM tab
    const referrals = await AffiliateReferral.query()
      .where('affiliateId', affiliate.id)
      .preload('referredCustomer', (query) => {
        query.preload('orders', (orderQuery) => {
          orderQuery.where('status', 'delivered')
        })
      })
      .orderBy('createdAt', 'desc')
      .limit(10)

    // Get network stats from repository (includes level counts)
    const networkStats = await AffiliateRepository.getNetworkStats(affiliate.id)

    // Get network tree data for GoJS visualization
    const networkTree = await AffiliateRepository.getNetworkTree(affiliate.id)

    // Get all ranks for progress display
    const allRanks = await CustomerRank.query()
      .where('isActive', true)
      .orderBy('orderPriority', 'asc')

    // Get current customer rank
    const totalOrdersCount = Number(orderStats?.$extras.total_orders || 0)
    const totalSpent = Number(orderStats?.$extras.total_spent || 0)

    // Determine current rank based on orders and spending
    let currentRank = allRanks[0] // Default to first rank
    let nextRank = allRanks[1] || null

    for (let i = 0; i < allRanks.length; i++) {
      const rank = allRanks[i]
      if (totalOrdersCount >= rank.minOrders && totalSpent >= rank.minSpent) {
        currentRank = rank
        nextRank = allRanks[i + 1] || null
      }
    }

    // Calculate progress to next rank
    let rankProgress = 100
    let ordersToNextRank = 0
    let spentToNextRank = 0

    if (nextRank) {
      const ordersProgress =
        nextRank.minOrders > 0 ? Math.min(100, (totalOrdersCount / nextRank.minOrders) * 100) : 100
      const spentProgress =
        nextRank.minSpent > 0 ? Math.min(100, (totalSpent / nextRank.minSpent) * 100) : 100
      rankProgress = Math.min(ordersProgress, spentProgress)
      ordersToNextRank = Math.max(0, nextRank.minOrders - totalOrdersCount)
      spentToNextRank = Math.max(0, nextRank.minSpent - totalSpent)
    }

    // Transform recent orders
    const transformedOrders = recentOrders.map((order) => {
      const firstItem = order.items[0]
      let itemImage: string | null = null

      if (firstItem) {
        // Get primary image or first image from product
        const productImages = firstItem.product?.images || []
        const primaryImage = productImages.find((img) => img.isPrimary)
        const imageUrl = primaryImage?.url || productImages[0]?.url || null
        itemImage = Helper.getFullImageUrl(imageUrl)
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
      }
    })

    // Transform addresses
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
    }))

    // Transform wallet transactions
    const transformedTransactions = recentTransactions.map((tx) => ({
      id: tx.id,
      type: tx.transactionType,
      amount: tx.amount,
      balanceAfter: tx.balanceAfter,
      description: tx.description,
      status: tx.status,
      createdAt: tx.createdAt.toISO(),
    }))

    // Transform commissions to include level
    const transformedCommissions = recentCommissions.map((comm) => ({
      id: comm.id,
      orderNumber: comm.order?.orderNumber || '-',
      orderTotal: comm.orderTotal,
      commissionRate: comm.commissionRate,
      commissionAmount: comm.commissionAmount,
      status: comm.status,
      level: comm.level || 1,
      createdAt: comm.createdAt.toISO(),
    }))

    // Transform referrals for MLM tab
    const transformedReferrals = referrals.map((ref) => {
      const customer = ref.referredCustomer
      const customerOrders = customer?.orders || []
      const totalSpentCalc = customerOrders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
      )
      return {
        id: ref.id,
        customerName: customer?.fullName || 'Customer',
        customerAvatar: customer?.avatar ? Helper.getFullImageUrl(customer.avatar) : null,
        status: ref.status,
        totalOrders: ref.totalOrders || customerOrders.length,
        totalSpent: ref.totalSpent || totalSpentCalc,
        registeredAt: ref.registeredAt?.toISO() || ref.createdAt.toISO(),
        level: ref.level || 1,
      }
    })

    // Transform commissions to include level
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
    }))

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
    })
  }

  /**
   * Customer Profile Page
   */
  public async profile({ auth, inertia }: HttpContext) {
    const customer = auth.use('customer').user!

    // Get order statistics
    const orderStats = await Order.query()
      .where('customerId', customer.id)
      .select(
        db.raw('COUNT(*) as total_orders'),
        db.raw("SUM(CASE WHEN status = 'delivered' THEN total ELSE 0 END) as total_spent")
      )
      .first()

    // Get or create wallet
    let wallet = await Wallet.query().where('customerId', customer.id).first()
    if (!wallet) {
      wallet = await Wallet.create({
        customerId: customer.id,
        balance: 0,
        pendingBalance: 0,
        isActive: true,
      })
    }

    // Get current customer rank
    const allRanks = await CustomerRank.query()
      .where('isActive', true)
      .orderBy('orderPriority', 'asc')

    const totalOrdersCount = Number(orderStats?.$extras.total_orders || 0)
    const totalSpent = Number(orderStats?.$extras.total_spent || 0)

    let currentRank = allRanks[0]
    for (const rank of allRanks) {
      if (totalOrdersCount >= rank.minOrders && totalSpent >= rank.minSpent) {
        currentRank = rank
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
    })
  }

  /**
   * Update Customer Profile
   */
  public async updateProfile({ auth, request, response }: HttpContext) {
    const customer = auth.use('customer').user!
    const data = request.only(['fullName', 'phone'])

    try {
      customer.fullName = data.fullName || customer.fullName
      customer.phone = data.phone || customer.phone
      await customer.save()

      return response.json({
        success: true,
        message: 'Profil berhasil diperbarui',
        customer: {
          id: customer.id,
          fullName: customer.fullName,
          email: customer.email,
          phone: customer.phone,
        },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Gagal memperbarui profil',
      })
    }
  }

  /**
   * Save address (create or update)
   */
  public async saveAddress({ auth, request, response }: HttpContext) {
    const customer = auth.use('customer').user!
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
    ])

    // If setting as default, unset other defaults
    if (data.isDefault) {
      await Address.query().where('customerId', customer.id).update({ isDefault: false })
    }

    let address: Address
    if (data.id) {
      // Update existing address
      address = await Address.query()
        .where('id', data.id)
        .where('customerId', customer.id)
        .firstOrFail()

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
      })
      await address.save()
    } else {
      // Create new address
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
      })
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
    })
  }

  /**
   * Delete address
   */
  public async deleteAddress({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!
    const address = await Address.query()
      .where('id', params.id)
      .where('customerId', customer.id)
      .firstOrFail()

    await address.delete()

    return response.json({
      success: true,
      message: 'Alamat berhasil dihapus',
    })
  }

  /**
   * Set default address
   */
  public async setDefaultAddress({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    // Unset all defaults
    await Address.query().where('customerId', customer.id).update({ isDefault: false })

    // Set the new default
    await Address.query()
      .where('id', params.id)
      .where('customerId', customer.id)
      .update({ isDefault: true })

    return response.json({
      success: true,
      message: 'Alamat utama berhasil diubah',
    })
  }

  /**
   * Topup wallet (create pending topup request with Midtrans)
   */
  public async topupWallet({ auth, request, response }: HttpContext) {
    const customer = auth.use('customer').user!
    const { amount } = request.only(['amount'])

    if (!amount || amount < 10000) {
      return response.badRequest({ message: 'Minimum top up Rp 10.000' })
    }

    const wallet = await Wallet.query().where('customerId', customer.id).firstOrFail()

    // Generate unique topup ID
    const topupId = `TOPUP-${customer.id}-${Date.now()}`

    // Create pending transaction
    const transaction = await WalletTransaction.create({
      walletId: wallet.id,
      customerId: customer.id,
      transactionType: 'topup',
      amount: amount,
      balanceBefore: wallet.balance,
      balanceAfter: wallet.balance + amount, // Will be updated when confirmed
      description: `Top up saldo Rp ${amount.toLocaleString('id-ID')}`,
      status: 'pending',
      referenceType: 'midtrans_topup',
      referenceId: null,
      metadata: { topupId },
    })

    // Create Midtrans Snap token for bank transfer
    const midtransService = new MidtransService()

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
      })

      // Update transaction with Midtrans reference
      transaction.metadata = {
        ...transaction.metadata,
        snapToken: snapResult.token,
        redirectUrl: snapResult.redirect_url,
      }
      await transaction.save()

      return response.json({
        success: true,
        message: 'Silakan lanjutkan pembayaran',
        snapToken: snapResult.token,
        redirectUrl: snapResult.redirect_url,
        transactionId: transaction.id,
        topupId,
        // Include Midtrans client config for frontend
        midtransConfig: {
          clientKey: env.get('MIDTRANS_CLIENT_KEY'),
          snapUrl: env.get('MIDTRANS_IS_PRODUCTION')
            ? 'https://app.midtrans.com/snap/snap.js'
            : 'https://app.sandbox.midtrans.com/snap/snap.js',
        },
      })
    } catch (error) {
      // Delete the failed transaction
      await transaction.delete()

      return response.internalServerError({
        success: false,
        message: 'Gagal membuat pembayaran',
        error: error.message,
      })
    }
  }

  /**
   * Get topup status
   */
  public async getTopupStatus({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    const transaction = await WalletTransaction.query()
      .where('customerId', customer.id)
      .where('id', params.id)
      .first()

    if (!transaction) {
      return response.notFound({ message: 'Transaksi tidak ditemukan' })
    }

    return response.json({
      success: true,
      transaction: {
        id: transaction.id,
        status: transaction.status,
        amount: transaction.amount,
        createdAt: transaction.createdAt.toISO(),
      },
    })
  }

  /**
   * Confirm topup status by checking Midtrans API
   * This is called after payment to ensure status is updated
   */
  public async confirmTopup({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    // Find the pending transaction
    const transaction = await WalletTransaction.query()
      .where('customerId', customer.id)
      .where('id', params.id)
      .where('transactionType', 'topup')
      .first()

    if (!transaction) {
      return response.notFound({ message: 'Transaksi tidak ditemukan' })
    }

    // If already completed, return success
    if (transaction.status === 'completed') {
      return response.json({
        success: true,
        message: 'Top up sudah berhasil',
        status: 'completed',
      })
    }

    // Get topupId from metadata
    const topupId = transaction.metadata?.topupId
    if (!topupId) {
      return response.badRequest({ message: 'Invalid transaction data' })
    }

    // Check status with Midtrans
    const midtransService = new MidtransService()
    try {
      const midtransStatus = await midtransService.getTransactionStatus(topupId)
      // Handle based on transaction status
      if (
        midtransStatus.transaction_status === 'settlement' ||
        midtransStatus.transaction_status === 'capture'
      ) {
        // Payment successful - update transaction and wallet
        const wallet = await Wallet.query().where('customerId', customer.id).firstOrFail()

        // Convert to numbers to avoid string concatenation
        const currentBalance = Number(wallet.balance) || 0
        const topupAmount = Number(transaction.amount) || 0

        transaction.status = 'completed'
        transaction.balanceBefore = currentBalance
        transaction.balanceAfter = currentBalance + topupAmount
        transaction.metadata = {
          ...transaction.metadata,
          midtransTransactionId: midtransStatus.transaction_id,
          paymentType: midtransStatus.payment_type,
          settlementTime: midtransStatus.settlement_time,
          confirmedAt: new Date().toISOString(),
        }
        await transaction.save()

        // Update wallet balance
        wallet.balance = currentBalance + topupAmount
        await wallet.save()

        return response.json({
          success: true,
          message: 'Top up berhasil dikonfirmasi',
          status: 'completed',
          newBalance: wallet.balance,
        })
      } else if (['cancel', 'deny', 'expire'].includes(midtransStatus.transaction_status)) {
        // Payment failed - delete the transaction
        await transaction.delete()

        return response.json({
          success: false,
          message: 'Pembayaran gagal atau dibatalkan',
          status: midtransStatus.transaction_status,
        })
      } else {
        // Still pending
        return response.json({
          success: true,
          message: 'Menunggu pembayaran',
          status: midtransStatus.transaction_status,
        })
      }
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => `/api/topup/${params.id}/check`, method: () => 'POST', ip: () => '', header: () => '' } as any, auth },
        'DashboardController',
        'checkTopup',
        error,
        { topupId: params.id },
        'high'
      )
      return response.internalServerError({
        success: false,
        message: 'Gagal mengecek status pembayaran',
        error: (error as Error).message,
      })
    }
  }

  /**
   * Cancel pending topup (delete the transaction)
   */
  public async cancelTopup({ auth, params, response }: HttpContext) {
    const customer = auth.use('customer').user!

    const transaction = await WalletTransaction.query()
      .where('customerId', customer.id)
      .where('id', params.id)
      .where('transactionType', 'topup')
      .where('status', 'pending')
      .first()

    if (!transaction) {
      return response.notFound({ message: 'Transaksi tidak ditemukan atau sudah diproses' })
    }

    // Delete the pending transaction
    await transaction.delete()

    return response.json({
      success: true,
      message: 'Top up dibatalkan',
    })
  }

  /**
   * Generate unique referral code
   */
  private async generateReferralCode(name: string, id: number): Promise<string> {
    // Take first 3 letters of name, uppercase + random suffix
    const prefix = name
      .replace(/[^a-zA-Z]/g, '')
      .substring(0, 3)
      .toUpperCase()
    const suffix = id.toString().padStart(4, '0')
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `${prefix}${suffix}${random}`
  }
}
