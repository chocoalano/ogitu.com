export interface User {
  id: number
  fullName: string | null
  email: string
  role: string
  createdAt: string
  updatedAt: string | null
}

export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
}

export interface UserFilters {
  search: string
  role: string
}

export interface UsersData {
  data: User[]
  meta: PaginationMeta
}

export interface RoleOption {
  label: string
  value: string
}
