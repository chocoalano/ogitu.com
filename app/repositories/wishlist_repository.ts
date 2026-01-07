import Wishlist from '#models/wishlist'
import Product from '#models/product'
import type {
  WishlistRepositoryContract,
  ToggleWishlistResult,
} from './contracts/wishlist_repository_contract.js'

export default class WishlistRepository implements WishlistRepositoryContract {
  /**
   * Base query with common preloads
   */
  private baseQuery() {
    return Wishlist.query().preload('product', (query) => {
      query.preload('images', (imgQuery) => {
        imgQuery.where('is_primary', true).limit(1)
      })
    })
  }

  /**
   * Get all wishlist items for a customer with relations
   */
  async getByCustomerId(customerId: number): Promise<Wishlist[]> {
    return this.baseQuery().where('customerId', customerId).orderBy('createdAt', 'desc')
  }

  /**
   * Find wishlist item by customer and product
   */
  async findByCustomerAndProduct(customerId: number, productId: number): Promise<Wishlist | null> {
    return Wishlist.query().where('customerId', customerId).where('productId', productId).first()
  }

  /**
   * Check if product is in customer's wishlist
   */
  async isWishlisted(customerId: number, productId: number): Promise<boolean> {
    const wishlist = await this.findByCustomerAndProduct(customerId, productId)
    return !!wishlist
  }

  /**
   * Toggle wishlist (add if not exists, remove if exists)
   */
  async toggle(customerId: number, productId: number): Promise<ToggleWishlistResult> {
    const existing = await this.findByCustomerAndProduct(customerId, productId)

    if (existing) {
      await existing.delete()
      return { isWishlisted: false }
    }

    const wishlist = await this.add(customerId, productId)
    return { isWishlisted: true, wishlist }
  }

  /**
   * Add product to wishlist
   */
  async add(customerId: number, productId: number): Promise<Wishlist> {
    return Wishlist.create({
      customerId,
      productId,
    })
  }

  /**
   * Remove product from wishlist
   */
  async remove(customerId: number, productId: number): Promise<boolean> {
    const result = await Wishlist.query()
      .where('customerId', customerId)
      .where('productId', productId)
      .delete()

    return (result[0] as number) > 0
  }

  /**
   * Clear all wishlist items for a customer
   */
  async clearWishlist(customerId: number): Promise<number> {
    const result = await Wishlist.query().where('customerId', customerId).delete()

    return result[0] as number
  }

  /**
   * Get wishlist count
   */
  async getCount(customerId: number): Promise<number> {
    const result = await Wishlist.query()
      .where('customerId', customerId)
      .count('* as total')
      .first()

    return Number(result?.$extras.total || 0)
  }

  /**
   * Check if multiple products are in wishlist
   */
  async getWishlistedProductIds(customerId: number, productIds: number[]): Promise<number[]> {
    if (productIds.length === 0) return []

    const wishlists = await Wishlist.query()
      .where('customerId', customerId)
      .whereIn('productId', productIds)
      .select('productId')

    return wishlists.map((w) => w.productId)
  }

  /**
   * Validate product exists and is available
   */
  async validateProduct(productId: number): Promise<boolean> {
    const product = await Product.query().where('id', productId).where('status', 'active').first()

    return !!product
  }
}
