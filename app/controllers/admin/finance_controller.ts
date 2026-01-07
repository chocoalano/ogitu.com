import type { HttpContext } from '@adonisjs/core/http'
import FinanceRepository from '#repositories/finance_repository'

export default class FinanceController {
  private financeRepository: FinanceRepository

  constructor() {
    this.financeRepository = new FinanceRepository()
  }

  /**
   * Display withdrawal requests
   */
  async withdrawIndex({ inertia, request }: HttpContext) {
    const filters = {
      page: request.input('page', 1),
      perPage: request.input('perPage', 15),
      status: request.input('status', ''),
      search: request.input('search', ''),
      dateFrom: request.input('dateFrom', ''),
      dateTo: request.input('dateTo', ''),
    }

    const result = await this.financeRepository.getPaginatedWithdrawals(filters)

    return inertia.render('admin/finance/withdraw/index', {
      withdrawals: result.data,
      pagination: result.pagination,
      stats: result.stats,
      filters: {
        status: filters.status,
        search: filters.search,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      },
    })
  }

  /**
   * Show withdrawal request details
   */
  async withdrawShow({ params, inertia, response }: HttpContext) {
    const withdrawal = await this.financeRepository.getWithdrawalById(params.id)

    if (!withdrawal) {
      return response.notFound({ message: 'Withdrawal tidak ditemukan' })
    }

    return inertia.render('admin/finance/withdraw/show', {
      withdrawal,
    })
  }

  /**
   * Approve withdrawal request
   */
  async withdrawApprove({ params, request, response, session }: HttpContext) {
    const notes = request.input('notes', '')
    const result = await this.financeRepository.approveWithdrawal(params.id, notes)

    if (!result.success) {
      session.flash('error', result.message)
      return response.redirect().back()
    }

    session.flash('success', result.message)
    return response.redirect().back()
  }

  /**
   * Reject withdrawal request
   */
  async withdrawReject({ params, request, response, session }: HttpContext) {
    const reason = request.input('reason', 'Ditolak oleh admin')
    const result = await this.financeRepository.rejectWithdrawal(params.id, reason)

    if (!result.success) {
      session.flash('error', result.message)
      return response.redirect().back()
    }

    session.flash('success', result.message)
    return response.redirect().back()
  }

  /**
   * Display transaction history
   */
  async transactionsIndex({ inertia, request }: HttpContext) {
    const filters = {
      page: request.input('page', 1),
      perPage: request.input('perPage', 20),
      type: request.input('type', ''),
      status: request.input('status', ''),
      search: request.input('search', ''),
      dateFrom: request.input('dateFrom', ''),
      dateTo: request.input('dateTo', ''),
    }

    const result = await this.financeRepository.getPaginatedTransactions(filters)

    return inertia.render('admin/finance/transactions/index', {
      transactions: result.data,
      pagination: result.pagination,
      stats: result.stats,
      filters: {
        type: filters.type,
        status: filters.status,
        search: filters.search,
        dateFrom: filters.dateFrom,
        dateTo: filters.dateTo,
      },
    })
  }

  /**
   * Show transaction details
   */
  async transactionShow({ params, inertia, response }: HttpContext) {
    const transaction = await this.financeRepository.getTransactionById(params.id)

    if (!transaction) {
      return response.notFound({ message: 'Transaksi tidak ditemukan' })
    }

    return inertia.render('admin/finance/transactions/show', {
      transaction,
    })
  }
}
