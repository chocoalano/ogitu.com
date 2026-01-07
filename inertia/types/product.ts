// Shared Product Types

export interface Product {
  id: number
  name: string
  slug: string
  price: number
  discountPrice: number | null
  formattedPrice: string
  formattedOriginalPrice: string | null
  discount: number
  image: string
  rating: number
  totalReviews: number
  totalSold: number
  stock: number
  brand: string | null
  badge: string | null
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  icon: string
  href: string
  color: string
}

export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
}

export interface CollectionFilters {
  search: string
  category: string
  brand: string
  minPrice: string
  maxPrice: string
  sortBy: string
}

export interface SortOption {
  label: string
  value: string
}
