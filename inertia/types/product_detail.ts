import type { Product } from './product.js'

// Product Detail Types
export interface ProductImage {
  id: number
  url: string
  altText: string | null
  isPrimary: boolean
}

export interface ProductVariant {
  id: number
  name: string
  value: string
  sku: string
  priceAdjustment: number
  price: number
  stock: number
}

export interface ProductCategory {
  id: number
  name: string
  slug: string
}

export interface ProductReview {
  id: number
  rating: number
  comment: string | null
  images: string[] | null
  isVerifiedPurchase: boolean
  helpfulCount: number
  createdAt: string
  customer: {
    id: number
    fullName: string
    avatar: string | null
  } | null
}

export interface ProductReviewSummary {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    [key: number]: number
  }
}

export interface ProductDetail {
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
  description: string | null
  specifications: string | null
  sku: string | null
  weight: number
  category: ProductCategory | null
  images: ProductImage[]
  variants: ProductVariant[]
  reviews: ProductReview[]
  reviewSummary: ProductReviewSummary
}

export interface CategoryBreadcrumb {
  id: number
  name: string
  slug: string
  href: string
  parent?: {
    id: number
    name: string
    slug: string
    href: string
  }
}

export interface ProductRecommendations {
  relatedProducts: Product[]
  categoryProducts: Product[]
  similarProducts: Product[]
  brandProducts: Product[]
}

export interface BreadcrumbItem {
  label: string
  href: string
}

export interface SpecificationItem {
  key: string
  value: string
}
