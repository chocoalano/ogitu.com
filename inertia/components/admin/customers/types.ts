export interface Customer {
  id: number
  fullName: string
  email: string
  phone: string | null
  gender: 'male' | 'female' | null
  avatar: string | null
  isActive: boolean
  isVerified: boolean
  totalOrdersCount: number
  totalSpent: number
  createdAt: string
  updatedAt: string
}

export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
}

export interface CustomerFilters {
  search: string
  status: string
}

export interface CustomersData {
  data: Customer[]
  meta: PaginationMeta
}

// Alias for composable compatibility
export type CustomerPaginatedResponse = CustomersData

export interface CustomerStats {
  total: number
  active: number
  verified: number
}

export interface CustomerDeleteState {
  isOpen: boolean
  targetId: number | null
  targetName: string
}

export interface StatusOption {
  label: string
  value: string
}

// Alias for composable compatibility
export type CustomerStatusOption = StatusOption
