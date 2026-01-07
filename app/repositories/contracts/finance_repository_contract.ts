import type { TransactionType, TransactionStatus } from '#models/wallet_transaction'

// =====================================
// Filter Types
// =====================================

export interface WithdrawalFilters {
  page?: number
  perPage?: number
  status?: string
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface TransactionFilters {
  page?: number
  perPage?: number
  type?: string
  status?: string
  search?: string
  dateFrom?: string
  dateTo?: string
}

// =====================================
// Withdrawal Types
// =====================================

export interface WithdrawalStats {
  total: number
  pending: number
  completed: number
  failed: number
  cancelled: number
  totalAmount: number
  pendingAmount: number
}

export interface WithdrawalListItem {
  id: number
  customerId: number
  customerName: string
  customerEmail: string
  customerAvatar: string | null
  amount: number
  balanceBefore: number
  balanceAfter: number
  status: TransactionStatus
  statusLabel: string
  statusColor: string
  description: string | null
  metadata: Record<string, any> | null
  bankName: string
  accountNumber: string
  accountName: string
  createdAt: string | null
  updatedAt: string | null
}

export interface WithdrawalDetail extends WithdrawalListItem {
  customerPhone: string | null
  walletBalance: number
}

export interface PaginatedWithdrawals {
  data: WithdrawalListItem[]
  pagination: {
    currentPage: number
    lastPage: number
    total: number
    perPage: number
  }
  stats: WithdrawalStats
}

// =====================================
// Transaction Types
// =====================================

export interface TransactionStats {
  totalTransactions: number
  todayTransactions: number
  monthTransactions: number
  totalTopup: number
  totalWithdrawal: number
  totalCommission: number
  totalPayment: number
  totalRefund: number
}

export interface TransactionListItem {
  id: number
  customerId: number
  customerName: string
  customerEmail: string
  customerAvatar: string | null
  transactionType: TransactionType
  typeLabel: string
  typeColor: string
  typeIcon: string
  amount: number
  balanceBefore: number
  balanceAfter: number
  status: TransactionStatus
  statusLabel: string
  statusColor: string
  referenceType: string | null
  referenceId: number | null
  description: string | null
  metadata: Record<string, any> | null
  createdAt: string | null
}

export interface TransactionDetail extends TransactionListItem {
  customerPhone: string | null
  walletBalance: number
  updatedAt: string | null
}

export interface PaginatedTransactions {
  data: TransactionListItem[]
  pagination: {
    currentPage: number
    lastPage: number
    total: number
    perPage: number
  }
  stats: TransactionStats
}

// =====================================
// Operation Results
// =====================================

export interface WithdrawalOperationResult {
  success: boolean
  message: string
  withdrawal?: WithdrawalDetail
}

// =====================================
// Repository Contract
// =====================================

export interface FinanceRepositoryContract {
  // Withdrawals
  getPaginatedWithdrawals(filters: WithdrawalFilters): Promise<PaginatedWithdrawals>
  getWithdrawalById(id: number): Promise<WithdrawalDetail | null>
  getWithdrawalStats(): Promise<WithdrawalStats>
  approveWithdrawal(id: number, notes?: string): Promise<WithdrawalOperationResult>
  rejectWithdrawal(id: number, reason: string): Promise<WithdrawalOperationResult>

  // Transactions
  getPaginatedTransactions(filters: TransactionFilters): Promise<PaginatedTransactions>
  getTransactionById(id: number): Promise<TransactionDetail | null>
  getTransactionStats(): Promise<TransactionStats>

  // Helper labels
  getStatusLabel(status: string): string
  getStatusColor(status: string): string
  getTypeLabel(type: string): string
  getTypeColor(type: string): string
  getTypeIcon(type: string): string
}
