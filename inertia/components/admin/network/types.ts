// Types for Network MLM Management

export interface Affiliate {
  id: number
  customerId: number
  customerName: string
  customerEmail: string
  customerAvatar: string | null
  referralCode: string
  totalReferrals: number
  totalEarnings: number
  isActive: boolean
}

export interface Customer {
  id: number
  fullName: string
  email: string
  phone: string | null
  avatar: string | null
  isActive: boolean
  isVerified: boolean
  totalOrdersCount: number
  totalSpent: number
  createdAt: string
  isPlaced: boolean
  referralId: number | null
  level: number | null
}

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

export interface TreeData {
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

export interface ReferredCustomersData {
  unplacedCustomers: Customer[]
  placedCustomers: Customer[]
  totalReferred: number
  totalPlaced: number
  totalUnplaced: number
}

export interface NewAffiliateCustomer {
  id: number
  fullName: string
  email: string
  avatar: string | null
}

export interface NetworkPageStats {
  totalAffiliates: number
  totalCustomersWithReferral: number
}

// Types for Affiliated Customers (customers in tree with referral code status)
export interface AffiliatedCustomer {
  id: number
  fullName: string
  email: string
  avatar: string | null
  phone: string | null
  level: number
  hasReferralCode: boolean
  referralCode: string | null
  totalReferrals: number
  totalEarnings: number
  totalOrdersCount?: number
  totalSpent?: number
  isActive: boolean
}

export interface AffiliatedCustomerWithoutCode {
  id: number
  fullName: string
  email: string
  avatar: string | null
  phone: string | null
  totalOrdersCount: number
  totalSpent: number
  level: number | null
  uplineName: string | null
  uplineReferralCode: string | null
}

export interface AffiliatedCustomersData {
  affiliate: {
    id: number
    referralCode: string
    customerName: string
  }
  customers: AffiliatedCustomer[]
  withReferralCode: AffiliatedCustomer[]
  withoutReferralCode: AffiliatedCustomer[]
  stats: {
    total: number
    withCode: number
    withoutCode: number
  }
}

export interface SetupReferralCodeResult {
  customerId: number
  referralCode?: string
  error?: string
}

// Types for Add Member to Tree
export interface CustomerSearchResult {
  id: number
  fullName: string
  email: string
  avatar: string | null
  phone: string | null
  totalOrdersCount: number
  totalSpent: number
  isInTree: boolean
  hasAffiliate: boolean
}
