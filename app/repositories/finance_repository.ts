import WalletTransaction from '#models/wallet_transaction'
import Wallet from '#models/wallet'
import { DateTime } from 'luxon'
import OrderNotificationService from '#services/order_notification_service'
import type {
  FinanceRepositoryContract,
  WithdrawalFilters,
  TransactionFilters,
  WithdrawalStats,
  WithdrawalListItem,
  WithdrawalDetail,
  PaginatedWithdrawals,
  TransactionStats,
  TransactionListItem,
  TransactionDetail,
  PaginatedTransactions,
  WithdrawalOperationResult,
} from './contracts/finance_repository_contract.js'

export default class FinanceRepository implements FinanceRepositoryContract {
  // =====================================
  // Label Maps
  // =====================================

  private readonly STATUS_LABELS: Record<string, string> = {
    pending: 'Menunggu',
    completed: 'Selesai',
    failed: 'Gagal',
    cancelled: 'Dibatalkan',
  }

  private readonly STATUS_COLORS: Record<string, string> = {
    pending: 'warning',
    completed: 'success',
    failed: 'error',
    cancelled: 'neutral',
  }

  private readonly TYPE_LABELS: Record<string, string> = {
    topup: 'Top Up',
    withdrawal: 'Penarikan',
    commission: 'Komisi',
    payment: 'Pembayaran',
    refund: 'Refund',
    cashback: 'Cashback',
  }

  private readonly TYPE_COLORS: Record<string, string> = {
    topup: 'success',
    withdrawal: 'error',
    commission: 'primary',
    payment: 'warning',
    refund: 'info',
    cashback: 'success',
  }

  private readonly TYPE_ICONS: Record<string, string> = {
    topup: 'i-heroicons-arrow-down-circle',
    withdrawal: 'i-heroicons-arrow-up-circle',
    commission: 'i-heroicons-currency-dollar',
    payment: 'i-heroicons-shopping-cart',
    refund: 'i-heroicons-arrow-uturn-left',
    cashback: 'i-heroicons-gift',
  }

  // =====================================
  // Helper Label Methods
  // =====================================

  getStatusLabel(status: string): string {
    return this.STATUS_LABELS[status] || status
  }

  getStatusColor(status: string): string {
    return this.STATUS_COLORS[status] || 'neutral'
  }

  getTypeLabel(type: string): string {
    return this.TYPE_LABELS[type] || type
  }

  getTypeColor(type: string): string {
    return this.TYPE_COLORS[type] || 'neutral'
  }

  getTypeIcon(type: string): string {
    return this.TYPE_ICONS[type] || 'i-heroicons-banknotes'
  }

  // =====================================
  // Withdrawal Methods
  // =====================================

  /**
   * Get paginated withdrawal requests
   */
  async getPaginatedWithdrawals(filters: WithdrawalFilters): Promise<PaginatedWithdrawals> {
    const { page = 1, perPage = 15, status, search, dateFrom, dateTo } = filters

    const query = WalletTransaction.query()
      .where('transactionType', 'withdrawal')
      .preload('customer')
      .preload('wallet')

    // Apply filters
    if (status) {
      query.where('status', status)
    }

    if (search) {
      query.whereHas('customer', (customerQuery) => {
        customerQuery
          .where('fullName', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`)
      })
    }

    if (dateFrom) {
      const fromDate = DateTime.fromISO(dateFrom).startOf('day').toSQL()
      if (fromDate) query.where('createdAt', '>=', fromDate)
    }

    if (dateTo) {
      const toDate = DateTime.fromISO(dateTo).endOf('day').toSQL()
      if (toDate) query.where('createdAt', '<=', toDate)
    }

    query.orderBy('createdAt', 'desc')

    const withdrawals = await query.paginate(page, perPage)
    const stats = await this.getWithdrawalStats()

    return {
      data: withdrawals.all().map((w) => this.transformWithdrawalToListItem(w)),
      pagination: {
        currentPage: withdrawals.currentPage,
        lastPage: withdrawals.lastPage,
        total: withdrawals.total,
        perPage: withdrawals.perPage,
      },
      stats,
    }
  }

  /**
   * Get withdrawal stats
   */
  async getWithdrawalStats(): Promise<WithdrawalStats> {
    const allWithdrawals = await WalletTransaction.query().where('transactionType', 'withdrawal')

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
    }
  }

  /**
   * Get withdrawal by ID
   */
  async getWithdrawalById(id: number): Promise<WithdrawalDetail | null> {
    const withdrawal = await WalletTransaction.query()
      .where('id', id)
      .where('transactionType', 'withdrawal')
      .preload('customer')
      .preload('wallet')
      .first()

    if (!withdrawal) return null

    return this.transformWithdrawalToDetail(withdrawal)
  }

  /**
   * Approve withdrawal request
   */
  async approveWithdrawal(id: number, notes?: string): Promise<WithdrawalOperationResult> {
    const withdrawal = await WalletTransaction.query()
      .where('id', id)
      .where('transactionType', 'withdrawal')
      .where('status', 'pending')
      .preload('wallet')
      .first()

    if (!withdrawal) {
      return {
        success: false,
        message: 'Withdrawal tidak ditemukan atau sudah diproses',
      }
    }

    // Update withdrawal status
    withdrawal.status = 'completed'
    withdrawal.metadata = {
      ...withdrawal.metadata,
      approvedAt: DateTime.now().toISO(),
      approvalNotes: notes || '',
    }
    await withdrawal.save()

    // Send notification to customer
    await OrderNotificationService.sendWithdrawalApproved(
      withdrawal.customerId,
      Number(withdrawal.amount)
    )

    // Reload with relations for response
    await withdrawal.load('customer')
    await withdrawal.load('wallet')

    return {
      success: true,
      message: 'Permintaan withdraw berhasil disetujui',
      withdrawal: this.transformWithdrawalToDetail(withdrawal),
    }
  }

  /**
   * Reject withdrawal request
   */
  async rejectWithdrawal(id: number, reason: string): Promise<WithdrawalOperationResult> {
    const withdrawal = await WalletTransaction.query()
      .where('id', id)
      .where('transactionType', 'withdrawal')
      .where('status', 'pending')
      .preload('wallet')
      .first()

    if (!withdrawal) {
      return {
        success: false,
        message: 'Withdrawal tidak ditemukan atau sudah diproses',
      }
    }

    // Refund amount back to wallet
    const wallet = await Wallet.findOrFail(withdrawal.walletId)
    wallet.balance = Number(wallet.balance) + Number(withdrawal.amount)
    wallet.pendingBalance = Number(wallet.pendingBalance) - Number(withdrawal.amount)
    await wallet.save()

    // Update withdrawal status
    withdrawal.status = 'failed'
    withdrawal.metadata = {
      ...withdrawal.metadata,
      rejectedAt: DateTime.now().toISO(),
      rejectionReason: reason,
    }
    await withdrawal.save()

    // Send notification to customer
    await OrderNotificationService.sendWithdrawalRejected(
      withdrawal.customerId,
      Number(withdrawal.amount),
      reason
    )

    // Reload with relations for response
    await withdrawal.load('customer')
    await withdrawal.load('wallet')

    return {
      success: true,
      message: 'Permintaan withdraw ditolak dan saldo dikembalikan',
      withdrawal: this.transformWithdrawalToDetail(withdrawal),
    }
  }

  /**
   * Transform withdrawal to list item
   */
  private transformWithdrawalToListItem(w: WalletTransaction): WithdrawalListItem {
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
    }
  }

  /**
   * Transform withdrawal to detail
   */
  private transformWithdrawalToDetail(w: WalletTransaction): WithdrawalDetail {
    return {
      ...this.transformWithdrawalToListItem(w),
      customerPhone: w.customer?.phone || null,
      walletBalance: Number(w.wallet?.balance || 0),
    }
  }

  // =====================================
  // Transaction Methods
  // =====================================

  /**
   * Get paginated transactions
   */
  async getPaginatedTransactions(filters: TransactionFilters): Promise<PaginatedTransactions> {
    const { page = 1, perPage = 20, type, status, search, dateFrom, dateTo } = filters

    const query = WalletTransaction.query().preload('customer').preload('wallet')

    // Apply filters
    if (type) {
      query.where('transactionType', type)
    }

    if (status) {
      query.where('status', status)
    }

    if (search) {
      query.whereHas('customer', (customerQuery) => {
        customerQuery
          .where('fullName', 'like', `%${search}%`)
          .orWhere('email', 'like', `%${search}%`)
      })
    }

    if (dateFrom) {
      const fromDate = DateTime.fromISO(dateFrom).startOf('day').toSQL()
      if (fromDate) query.where('createdAt', '>=', fromDate)
    }

    if (dateTo) {
      const toDate = DateTime.fromISO(dateTo).endOf('day').toSQL()
      if (toDate) query.where('createdAt', '<=', toDate)
    }

    query.orderBy('createdAt', 'desc')

    const transactions = await query.paginate(page, perPage)
    const stats = await this.getTransactionStats()

    return {
      data: transactions.all().map((t) => this.transformTransactionToListItem(t)),
      pagination: {
        currentPage: transactions.currentPage,
        lastPage: transactions.lastPage,
        total: transactions.total,
        perPage: transactions.perPage,
      },
      stats,
    }
  }

  /**
   * Get transaction stats
   */
  async getTransactionStats(): Promise<TransactionStats> {
    const todayStart = DateTime.now().startOf('day')
    const monthStart = DateTime.now().startOf('month')

    const [allTransactions, todayTransactions, monthTransactions] = await Promise.all([
      WalletTransaction.query(),
      WalletTransaction.query().where('createdAt', '>=', todayStart.toSQL()!),
      WalletTransaction.query().where('createdAt', '>=', monthStart.toSQL()!),
    ])

    const completedByType = (type: string) =>
      allTransactions
        .filter((t) => t.transactionType === type && t.status === 'completed')
        .reduce((sum, t) => sum + Number(t.amount), 0)

    return {
      totalTransactions: allTransactions.length,
      todayTransactions: todayTransactions.length,
      monthTransactions: monthTransactions.length,
      totalTopup: completedByType('topup'),
      totalWithdrawal: completedByType('withdrawal'),
      totalCommission: completedByType('commission'),
      totalPayment: completedByType('payment'),
      totalRefund: completedByType('refund'),
    }
  }

  /**
   * Get transaction by ID
   */
  async getTransactionById(id: number): Promise<TransactionDetail | null> {
    const transaction = await WalletTransaction.query()
      .where('id', id)
      .preload('customer')
      .preload('wallet')
      .first()

    if (!transaction) return null

    return this.transformTransactionToDetail(transaction)
  }

  /**
   * Transform transaction to list item
   */
  private transformTransactionToListItem(t: WalletTransaction): TransactionListItem {
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
    }
  }

  /**
   * Transform transaction to detail
   */
  private transformTransactionToDetail(t: WalletTransaction): TransactionDetail {
    return {
      ...this.transformTransactionToListItem(t),
      customerPhone: t.customer?.phone || null,
      walletBalance: Number(t.wallet?.balance || 0),
      updatedAt: t.updatedAt.toISO(),
    }
  }
}
