// =====================================
// Product Types
// =====================================

export interface ProductCategory {
  id: number
  name: string
  slug: string
}

export interface ProductImage {
  id: number
  url: string
  alt: string | null
  isPrimary?: boolean
  sortOrder?: number
}

export interface ProductVariant {
  id: number
  name: string
  value: string
  sku: string
  priceAdjustment: number
  stock: number
  isActive: boolean
}

export interface Product {
  id: number
  name: string
  slug: string
  sku: string
  price: number
  discountPrice: number | null
  stock: number
  status: 'draft' | 'active' | 'inactive' | 'out_of_stock'
  condition: 'new' | 'used'
  isFeatured: boolean
  rating: number
  totalReviews: number
  totalSold: number
  viewCount: number
  createdAt: string
  updatedAt: string
  category: ProductCategory | null
  primaryImage: ProductImage | null
}

export interface ProductDetail extends Product {
  categoryId: number | null
  description: string | null
  specifications: string | null
  minOrder: number
  maxOrder: number | null
  weight: number
  brand: string | null
  images: ProductImage[]
  variants: ProductVariant[]
}

export interface ProductStats {
  total: number
  active: number
  draft: number
  inactive: number
  outOfStock: number
  lowStock: number
}

export interface PaginationMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ProductFilters {
  search?: string
  category?: number | null
  status?: string
  condition?: string
  minPrice?: number | null
  maxPrice?: number | null
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

// =====================================
// Status Helpers
// =====================================

export const statusConfig: Record<
  string,
  { label: string; color: 'success' | 'warning' | 'error' | 'neutral' }
> = {
  active: { label: 'Aktif', color: 'success' },
  draft: { label: 'Draft', color: 'neutral' },
  inactive: { label: 'Nonaktif', color: 'warning' },
  out_of_stock: { label: 'Stok Habis', color: 'error' },
}

export const conditionConfig: Record<string, { label: string; color: 'success' | 'neutral' }> = {
  new: { label: 'Baru', color: 'success' },
  used: { label: 'Bekas', color: 'neutral' },
}

export function getStatusConfig(status: string) {
  return statusConfig[status] || { label: status, color: 'neutral' as const }
}

export function getConditionConfig(condition: string) {
  return conditionConfig[condition] || { label: condition, color: 'neutral' as const }
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('id-ID').format(num)
}
