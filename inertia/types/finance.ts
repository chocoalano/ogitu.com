// Finance Types

export interface WithdrawalStats {
  total: number
  pending: number
  completed: number
  failed: number
  cancelled: number
  totalAmount: number
  pendingAmount: number
}

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

export interface WithdrawalRequest {
  id: number
  customerId: number
  customerName: string
  customerEmail: string
  customerAvatar: string | null
  amount: number
  balanceBefore: number
  balanceAfter: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  statusLabel: string
  statusColor: string
  description: string | null
  metadata: Record<string, any> | null
  bankName: string
  accountNumber: string
  accountName: string
  createdAt: string
  updatedAt: string
}

export interface Transaction {
  id: number
  customerId: number
  customerName: string
  customerEmail: string
  customerAvatar: string | null
  transactionType: 'topup' | 'withdrawal' | 'commission' | 'payment' | 'refund' | 'cashback'
  typeLabel: string
  typeColor: string
  typeIcon: string
  amount: number
  balanceBefore: number
  balanceAfter: number
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  statusLabel: string
  statusColor: string
  referenceType: string | null
  referenceId: number | null
  description: string | null
  metadata: Record<string, any> | null
  createdAt: string
}

export interface FinancePagination {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}

export interface WithdrawalFilters {
  status: string
  search: string
  dateFrom: string
  dateTo: string
}

export interface TransactionFilters {
  type: string
  status: string
  search: string
  dateFrom: string
  dateTo: string
}

// Status options
export const withdrawalStatusOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Menunggu', value: 'pending' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Gagal', value: 'failed' },
  { label: 'Dibatalkan', value: 'cancelled' },
]

export const transactionTypeOptions = [
  { label: 'Semua Tipe', value: 'all' },
  { label: 'Top Up', value: 'topup' },
  { label: 'Penarikan', value: 'withdrawal' },
  { label: 'Komisi', value: 'commission' },
  { label: 'Pembayaran', value: 'payment' },
  { label: 'Refund', value: 'refund' },
  { label: 'Cashback', value: 'cashback' },
]

export const transactionStatusOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Menunggu', value: 'pending' },
  { label: 'Selesai', value: 'completed' },
  { label: 'Gagal', value: 'failed' },
  { label: 'Dibatalkan', value: 'cancelled' },
]

// Helper functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const formatShortDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
