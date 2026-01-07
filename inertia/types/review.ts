// Review types for admin reviews page

export interface Review {
  id: number
  rating: number
  comment: string | null
  images: string[]
  isVerifiedPurchase: boolean
  isApproved: boolean
  helpfulCount: number
  adminReply: string | null
  adminRepliedAt: string | null
  product: {
    id: number
    name: string
    slug: string
    image: string
    sku: string
  }
  customer: {
    id: number
    name: string
    avatar: string | null
  }
  order: {
    id: number
    orderNumber: string
  } | null
  createdAt: string
  updatedAt: string
}

export interface ReviewStats {
  total: number
  pending: number
  approved: number
  averageRating: number
  fiveStars: number
  fourStars: number
  threeStars: number
  twoStars: number
  oneStar: number
}

export interface ReviewFilters {
  status: string
  rating: number | null
  search: string
  productId: number | null
  dateFrom: string
  dateTo: string
}

export interface ReviewProduct {
  id: number
  name: string
  reviewCount: number
}

export interface ReviewMeta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  firstPage: number
}
