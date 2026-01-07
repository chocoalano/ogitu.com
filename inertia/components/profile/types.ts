/**
 * Profile Page Types
 */

export interface ProfileCustomer {
  id: number
  fullName: string
  email: string
  phone: string | null
  avatar: string | null
  isVerified: boolean
  createdAt: string
}

export interface ProfileStats {
  totalOrders: number
  totalSpent: number
}

export interface ProfileWallet {
  balance: number
  pendingBalance: number
}

export interface ProfileRank {
  name: string
  icon: string
  color: string
}

export interface ProfileFormData {
  fullName: string
  phone: string
}

export interface ProfileMenuItem {
  icon: string
  label: string
  href: string
  color: string
}

export interface ProfilePageProps {
  customer: ProfileCustomer
  stats: ProfileStats
  wallet: ProfileWallet
  currentRank: ProfileRank | null
}
