// Dashboard Types - Shared across all dashboard components

export interface Customer {
  id: number
  fullName: string
  email: string
  phone: string | null
  avatar: string | null
  isVerified: boolean
  createdAt: string
}

export interface OrderStats {
  totalOrders: number
  pendingPayment: number
  paid: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  totalSpent: number
}

export interface OrderItem {
  name: string
  image: string | null
  quantity: number
}

export interface RecentOrder {
  id: number
  orderNumber: string
  status: string
  total: number
  itemCount: number
  firstItem: OrderItem | null
  createdAt: string
  paidAt: string | null
}

export interface Address {
  id: number
  label: string
  recipientName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  cityId: string
  cityName: string
  districtId: string | null
  districtName: string | null
  provinceId: string
  provinceName: string
  postalCode: string
  isDefault: boolean
}

export interface Wallet {
  id: number
  balance: number
  pendingBalance: number
  isActive: boolean
}

export interface WalletTransaction {
  id: number
  type: string
  amount: number
  balanceAfter: number
  description: string | null
  status: string
  createdAt: string
}

export interface Affiliate {
  id: number
  referralCode: string
  commissionRate: number
  totalEarnings: number
  pendingEarnings: number
  withdrawnEarnings: number
  totalReferrals: number
  totalOrders: number
  isActive: boolean
}

export interface Commission {
  id: number
  orderNumber: string
  orderTotal: number
  commissionRate: number
  commissionAmount: number
  status: string
  createdAt: string
}

export interface Referral {
  id: number
  customerName: string
  customerAvatar: string | null
  status: 'active' | 'inactive' | 'prospect'
  totalOrders: number
  totalSpent: number
  registeredAt: string
}

export interface NetworkStats {
  level1Count: number
  level2Count: number
  level3Count: number
  totalNetworkValue: number
  activeMembers: number
  inactiveMembers: number
}

// Network Tree types for MLM visualization
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

export interface NetworkTree {
  nodes: NetworkNode[]
  links: NetworkLink[]
}

export interface Rank {
  id: number
  name: string
  slug: string
  icon: string | null
  color: string | null
  minOrders: number
  minSpent: number
  cashbackRate: number
  affiliateBonusRate: number
  benefits: string[] | null
}

// Config types
export interface StatusConfig {
  label: string
  color: string
  icon: string
}

export interface RankColorConfig {
  icon: string
  gradient: string
  bg: string
  text: string
  border: string
}

// Status configs
export const orderStatusConfig: Record<string, StatusConfig> = {
  pending_payment: {
    label: 'Menunggu Bayar',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    icon: 'i-heroicons-clock',
  },
  paid: {
    label: 'Dibayar',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    icon: 'i-heroicons-check-circle',
  },
  processing: {
    label: 'Diproses',
    color: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
    icon: 'i-heroicons-cog-6-tooth',
  },
  shipped: {
    label: 'Dikirim',
    color: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    icon: 'i-heroicons-truck',
  },
  delivered: {
    label: 'Selesai',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    icon: 'i-heroicons-check-badge',
  },
  cancelled: {
    label: 'Dibatalkan',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
    icon: 'i-heroicons-x-circle',
  },
}

export const transactionTypeConfig: Record<string, StatusConfig> = {
  topup: { label: 'Top Up', color: 'text-emerald-500', icon: 'i-heroicons-arrow-down-circle' },
  withdrawal: { label: 'Penarikan', color: 'text-red-500', icon: 'i-heroicons-arrow-up-circle' },
  commission: { label: 'Komisi', color: 'text-blue-500', icon: 'i-heroicons-gift' },
  payment: { label: 'Pembayaran', color: 'text-orange-500', icon: 'i-heroicons-shopping-cart' },
  refund: { label: 'Refund', color: 'text-purple-500', icon: 'i-heroicons-arrow-path' },
  cashback: { label: 'Cashback', color: 'text-pink-500', icon: 'i-heroicons-sparkles' },
}

export const commissionStatusConfig: Record<string, { label: string; color: string }> = {
  pending: {
    label: 'Pending',
    color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  approved: {
    label: 'Disetujui',
    color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  },
  paid: {
    label: 'Dibayar',
    color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  },
  cancelled: {
    label: 'Dibatalkan',
    color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
}

// MLM Card Types
export type MLMMainTabId = 'mitra' | 'network' | 'bonus'
export type MitraSubTabId = 'active' | 'inactive' | 'prospect'
export type BonusSubTabId = 'summary' | 'history'
export type ReferralStatus = 'active' | 'inactive' | 'prospect'

export interface MLMTab {
  id: MLMMainTabId
  label: string
  icon: string
  count: number | null
}

export interface MitraSubTab {
  id: MitraSubTabId
  label: string
  icon: string
}

export interface BonusItem {
  id: string
  name: string
  icon: string
  amount: number
  color: string
  linear: string
}

export interface NetworkLevelColor {
  linear: string
  bg: string
  text: string
}

export const networkLevelColors: Record<1 | 2 | 3, NetworkLevelColor> = {
  1: { linear: 'from-cyan-400 to-blue-500', bg: 'bg-cyan-500/20', text: 'text-cyan-400' },
  2: { linear: 'from-purple-400 to-pink-500', bg: 'bg-purple-500/20', text: 'text-purple-400' },
  3: { linear: 'from-amber-400 to-orange-500', bg: 'bg-amber-500/20', text: 'text-amber-400' },
}

export const mitraStatusStyles: Record<ReferralStatus, { gradient: string; badge: string; text: string }> = {
  active: {
    gradient: 'bg-linear-to-br from-emerald-500 to-cyan-500',
    badge: 'bg-emerald-400',
    text: 'text-emerald-400',
  },
  inactive: {
    gradient: 'bg-linear-to-br from-gray-500 to-gray-600',
    badge: 'bg-gray-500',
    text: 'text-gray-400',
  },
  prospect: {
    gradient: 'bg-linear-to-br from-amber-500 to-orange-500',
    badge: 'bg-amber-400',
    text: 'text-amber-400',
  },
}

export const rankColorConfig: Record<string, RankColorConfig> = {
  // Vapor Ranks (new system)
  'vapor-newbie': {
    icon: 'i-lucide-flame',
    gradient: 'from-slate-400 via-slate-500 to-slate-600',
    bg: 'bg-slate-100 dark:bg-slate-800/50',
    text: 'text-slate-700 dark:text-slate-300',
    border: 'border-slate-400',
  },
  'vapor-active': {
    icon: 'i-lucide-zap',
    gradient: 'from-blue-400 via-cyan-500 to-teal-500',
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-700 dark:text-cyan-400',
    border: 'border-cyan-500',
  },
  'vapor-pro': {
    icon: 'i-lucide-crown',
    gradient: 'from-amber-400 via-orange-500 to-red-500',
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-700 dark:text-orange-400',
    border: 'border-orange-500',
  },
  // Legacy ranks (for backward compatibility)
  bronze: {
    icon: 'i-lucide-medal',
    gradient: 'from-amber-600 to-orange-700',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-400',
    border: 'border-amber-500',
  },
  silver: {
    icon: 'i-lucide-award',
    gradient: 'from-gray-400 to-gray-600',
    bg: 'bg-gray-100 dark:bg-gray-700/50',
    text: 'text-gray-700 dark:text-gray-300',
    border: 'border-gray-400',
  },
  gold: {
    icon: 'i-lucide-trophy',
    gradient: 'from-yellow-400 to-amber-500',
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    border: 'border-yellow-500',
  },
  platinum: {
    icon: 'i-lucide-crown',
    gradient: 'from-cyan-400 to-blue-500',
    bg: 'bg-cyan-100 dark:bg-cyan-900/30',
    text: 'text-cyan-700 dark:text-cyan-400',
    border: 'border-cyan-500',
  },
  diamond: {
    icon: 'i-lucide-gem',
    gradient: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-100 dark:bg-violet-900/30',
    text: 'text-violet-700 dark:text-violet-400',
    border: 'border-violet-500',
  },
}

// Helper functions
export const getOrderStatusConfig = (status: string): StatusConfig => {
  return orderStatusConfig[status] || orderStatusConfig.pending_payment
}

export const getRankColor = (slug: string): RankColorConfig => {
  return rankColorConfig[slug] || rankColorConfig['vapor-newbie']
}
