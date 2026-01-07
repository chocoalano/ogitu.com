// Types for Inventory Management
export interface ProductVariant {
  id: number
  name: string
  value: string
  sku: string
  stock: number
  priceAdjustment: number
  isActive: boolean
}

export interface InventoryProduct {
  id: number
  name: string
  sku: string
  price: number
  discountPrice: number | null
  stock: number
  status: string
  category: { id: number; name: string } | null
  primaryImage: { id: number; url: string } | null
  variants: ProductVariant[]
  totalVariantStock: number
  hasVariants: boolean
}

export interface InventoryStats {
  totalProducts: number
  inStock: number
  lowStock: number
  outOfStock: number
  totalVariants: number
}

export interface InventoryFilters {
  status?: string
  categoryId?: number
  search?: string
  stockStatus?: string
}

export interface EditedStock {
  stock: number
  variantStocks: Map<number, number>
}

export interface StockUpdate {
  productId: number
  stock: number
  variantStocks: { variantId: number; stock: number }[]
}

// Helper functions
export const getStockBadge = (stock: number) => {
  if (stock <= 0) return { label: 'Habis', color: 'error' as const }
  if (stock <= 10) return { label: 'Rendah', color: 'warning' as const }
  return { label: 'Tersedia', color: 'success' as const }
}

export const getStatusBadge = (status: string) => {
  const config: Record<
    string,
    { label: string; color: 'success' | 'warning' | 'error' | 'neutral' }
  > = {
    active: { label: 'Aktif', color: 'success' },
    draft: { label: 'Draft', color: 'neutral' },
    inactive: { label: 'Nonaktif', color: 'warning' },
    out_of_stock: { label: 'Stok Habis', color: 'error' },
  }
  return config[status] || { label: status, color: 'neutral' as const }
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value)
}

export const stockStatusOptions = [
  { label: 'Semua Stok', value: undefined },
  { label: 'Stok Tersedia', value: 'in_stock' },
  { label: 'Stok Rendah', value: 'low_stock' },
  { label: 'Stok Habis', value: 'out_of_stock' },
]

export const productStatusOptions = [
  { label: 'Semua Status', value: undefined },
  { label: 'Aktif', value: 'active' },
  { label: 'Draft', value: 'draft' },
  { label: 'Nonaktif', value: 'inactive' },
  { label: 'Stok Habis', value: 'out_of_stock' },
]
