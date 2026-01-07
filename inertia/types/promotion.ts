export interface PromotionStats {
  total: number
  active: number
  upcoming: number
  expired: number
  inactive: number
}

export interface PromotionProduct {
  id: number
  name: string
  image: string
  price: number
}

export interface PromotionPagination {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}

// Discount types
export interface Discount {
  id: number
  name: string
  description: string | null
  type: 'percentage' | 'fixed'
  typeLabel: string
  value: number
  valueDisplay: string
  minPurchase: number
  maxDiscount: number | null
  startDate: string
  endDate: string
  usageLimit: number | null
  usageCount: number
  remainingUsage: number | null
  isActive: boolean
  appliesToAll: boolean
  status: string
  statusColor: string
  productCount: number
  products: PromotionProduct[]
  createdAt: string
}

export interface DiscountFormData {
  name: string
  description: string
  type: 'percentage' | 'fixed'
  value: number
  min_purchase: number
  max_discount: number | null
  start_date: string
  end_date: string
  usage_limit: number | null
  is_active: boolean
  applies_to_all: boolean
  product_ids: number[]
}

// Voucher types
export interface Voucher {
  id: number
  code: string
  name: string
  description: string | null
  type: 'percentage' | 'fixed' | 'free_shipping'
  typeLabel: string
  value: number
  valueDisplay: string
  minPurchase: number
  maxDiscount: number | null
  startDate: string
  endDate: string
  usageLimit: number | null
  usageCount: number
  remainingUsage: number | null
  usageLimitPerCustomer: number
  isActive: boolean
  isPublic: boolean
  appliesToAll: boolean
  status: string
  statusColor: string
  productCount: number
  products: PromotionProduct[]
  createdAt: string
}

export interface VoucherFormData {
  code: string
  name: string
  description: string
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  min_purchase: number
  max_discount: number | null
  start_date: string
  end_date: string
  usage_limit: number | null
  usage_limit_per_customer: number
  is_active: boolean
  is_public: boolean
  applies_to_all: boolean
  product_ids: number[]
}

// Flash Sale types
export interface FlashSaleProduct {
  id: number
  productId: number
  name: string
  image: string
  originalPrice: number
  flashPrice: number
  discountPercentage: number
  stockLimit: number
  soldCount: number
  remainingStock: number
}

export interface FlashSale {
  id: number
  name: string
  description: string | null
  startDate: string
  endDate: string
  isActive: boolean
  status: string
  statusColor: string
  timeRemaining: string | null
  progress: number
  productCount: number
  totalSold: number
  products: FlashSaleProduct[]
  createdAt: string
}

export interface FlashSaleFormProduct {
  product_id: number
  original_price: number
  flash_price: number
  stock_limit: number
}

export interface FlashSaleFormData {
  name: string
  description: string
  start_date: string
  end_date: string
  is_active: boolean
  products: FlashSaleFormProduct[]
}
