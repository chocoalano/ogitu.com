import Wishlist from '#models/wishlist'

export interface WishlistProductInfo {
  id: number
  name: string
  slug: string
  price: number
  discountPrice: number | null
  stock: number
  image: string
  images: Array<{
    id: number
    url: string
    isPrimary: boolean
  }>
}

export interface ToggleWishlistResult {
  isWishlisted: boolean
  wishlist?: Wishlist
}

export interface WishlistRepositoryContract {
  /**
   * Get all wishlist items for a customer with relations
   */
  getByCustomerId(customerId: number): Promise<Wishlist[]>

  /**
   * Find wishlist item by customer and product
   */
  findByCustomerAndProduct(customerId: number, productId: number): Promise<Wishlist | null>

  /**
   * Check if product is in customer's wishlist
   */
  isWishlisted(customerId: number, productId: number): Promise<boolean>

  /**
   * Toggle wishlist (add if not exists, remove if exists)
   */
  toggle(customerId: number, productId: number): Promise<ToggleWishlistResult>

  /**
   * Add product to wishlist
   */
  add(customerId: number, productId: number): Promise<Wishlist>

  /**
   * Remove product from wishlist
   */
  remove(customerId: number, productId: number): Promise<boolean>

  /**
   * Clear all wishlist items for a customer
   */
  clearWishlist(customerId: number): Promise<number>

  /**
   * Get wishlist count
   */
  getCount(customerId: number): Promise<number>

  /**
   * Check if multiple products are in wishlist
   */
  getWishlistedProductIds(customerId: number, productIds: number[]): Promise<number[]>

  /**
   * Validate product exists and is available
   */
  validateProduct(productId: number): Promise<boolean>
}
