import Product from '#models/product'
import Helper from '#services/helper'

export interface ProductListDTO {
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

export interface ReviewDTO {
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

export interface ReviewSummaryDTO {
  averageRating: number
  totalReviews: number
  ratingDistribution: {
    [key: number]: number
  }
}

export interface ProductDetailDTO extends ProductListDTO {
  description: string | null
  specifications: string | null
  sku: string | null
  weight: number
  category: {
    id: number
    name: string
    slug: string
  } | null
  images: Array<{
    id: number
    url: string
    altText: string | null
    isPrimary: boolean
  }>
  variants: Array<{
    id: number
    name: string
    value: string
    sku: string
    priceAdjustment: number
    price: number
    stock: number
  }>
  reviews: ReviewDTO[]
  reviewSummary: ReviewSummaryDTO
}

export default class ProductTransformer {
  /**
   * Format currency to IDR
   */
  private static formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  /**
   * Calculate discount percentage
   */
  private static calculateDiscount(price: number, discountPrice: number | null): number {
    if (!discountPrice) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

  /**
   * Get product badge based on attributes
   */
  private static getBadge(product: Product): string | null {
    if (product.isFeatured) return 'Pilihan'
    if (product.totalSold > 100) return 'Terlaris'
    if (product.discountPrice) return 'Promo'
    if (product.stock < 10 && product.stock > 0) return 'Stok Terbatas'
    if (product.stock === 0) return 'Habis'
    return null
  }

  /**
   * Transform product to list DTO
   */
  static async toListDTO(product: Product): Promise<ProductListDTO> {
    const effectivePrice = product.discountPrice || product.price

    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      discountPrice: product.discountPrice,
      formattedPrice: this.formatCurrency(effectivePrice),
      formattedOriginalPrice: product.discountPrice ? this.formatCurrency(product.price) : null,
      discount: this.calculateDiscount(product.price, product.discountPrice),
      image: await Helper.getProductImage(product),
      rating: product.rating,
      totalReviews: product.totalReviews,
      totalSold: product.totalSold,
      stock: product.stock,
      brand: product.brand,
      badge: this.getBadge(product),
    }
  }

  /**
   * Transform products to list DTOs
   */
  static async toListDTOs(products: Product[]): Promise<ProductListDTO[]> {
    return Promise.all(products.map((product) => this.toListDTO(product)))
  }

  /**
   * Calculate review summary from reviews array
   */
  private static calculateReviewSummary(reviews: Product['reviews']): ReviewSummaryDTO {
    const reviewsArray = reviews || []
    const totalReviews = reviewsArray.length

    if (totalReviews === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      }
    }

    // Calculate average rating
    const totalRating = reviewsArray.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = Math.round((totalRating / totalReviews) * 10) / 10

    // Calculate rating distribution
    const ratingDistribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviewsArray.forEach((review) => {
      const rating = Math.min(5, Math.max(1, Math.round(review.rating)))
      ratingDistribution[rating]++
    })

    return {
      averageRating,
      totalReviews,
      ratingDistribution,
    }
  }

  /**
   * Transform reviews to DTOs
   */
  private static transformReviews(reviews: Product['reviews']): ReviewDTO[] {
    if (!reviews) return []

    return reviews.map((review) => ({
      id: review.id,
      rating: review.rating,
      comment: review.comment,
      images: review.images,
      isVerifiedPurchase: review.isVerifiedPurchase,
      helpfulCount: review.helpfulCount,
      createdAt: review.createdAt.toISO() || '',
      customer: review.customer
        ? {
            id: review.customer.id,
            fullName: review.customer.fullName,
            avatar: review.customer.avatar ? Helper.getFullImageUrl(review.customer.avatar) : null,
          }
        : null,
    }))
  }

  /**
   * Transform product to detail DTO
   */
  static async toDetailDTO(product: Product): Promise<ProductDetailDTO> {
    const listDTO = await this.toListDTO(product)
    const reviewSummary = this.calculateReviewSummary(product.reviews)

    // Override rating and totalReviews from actual reviews
    listDTO.rating = reviewSummary.averageRating
    listDTO.totalReviews = reviewSummary.totalReviews

    return {
      ...listDTO,
      description: product.description,
      specifications: product.specifications,
      sku: product.sku,
      weight: product.weight,
      category: product.category
        ? {
            id: product.category.id,
            name: product.category.name,
            slug: product.category.slug,
          }
        : null,
      images:
        product.images?.map((img) => ({
          id: img.id,
          url: Helper.getFullImageUrl(img.url),
          altText: img.altText,
          isPrimary: img.isPrimary,
        })) || [],
      variants:
        product.variants?.map((variant) => {
          const basePrice = Number(product.discountPrice) || Number(product.price)
          const adjustment = Number(variant.priceAdjustment) || 0
          return {
            id: variant.id,
            name: variant.name,
            value: variant.value,
            sku: variant.sku,
            priceAdjustment: adjustment,
            price: basePrice + adjustment,
            stock: variant.stock,
          }
        }) || [],
      reviews: this.transformReviews(product.reviews),
      reviewSummary,
    }
  }
}
