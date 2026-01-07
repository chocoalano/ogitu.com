import CartItem from '#models/cart_item'
import Product from '#models/product'
import ProductVariant from '#models/product_variant'
import type {
  CartRepositoryContract,
  AddToCartInput,
  CartSummary,
  StockValidationResult,
} from './contracts/cart_repository_contract.js'

export default class CartRepository implements CartRepositoryContract {
  /**
   * Base query with common preloads
   */
  private baseQuery() {
    return CartItem.query()
      .preload('product', (query) => {
        query.preload('images', (imgQuery) => {
          imgQuery.where('is_primary', true).limit(1)
        })
      })
      .preload('productVariant')
  }

  /**
   * Get all cart items for a customer with relations
   */
  async getByCustomerId(customerId: number): Promise<CartItem[]> {
    return this.baseQuery().where('customerId', customerId).orderBy('createdAt', 'desc')
  }

  /**
   * Get cart summary with totals
   */
  async getCartSummary(customerId: number): Promise<CartSummary> {
    const items = await this.getByCustomerId(customerId)

    let totalQuantity = 0
    let subtotal = 0

    for (const item of items) {
      totalQuantity += item.quantity

      const basePrice = item.product.discountPrice || item.product.price
      const variantAdjustment = item.productVariant?.priceAdjustment || 0
      const itemPrice = basePrice + variantAdjustment

      subtotal += itemPrice * item.quantity
    }

    return {
      items: items as any,
      totalItems: items.length,
      totalQuantity,
      subtotal,
    }
  }

  /**
   * Find cart item by id and customer
   */
  async findByIdAndCustomer(id: number, customerId: number): Promise<CartItem | null> {
    return this.baseQuery().where('id', id).where('customerId', customerId).first()
  }

  /**
   * Find existing cart item by product and variant
   */
  async findExisting(
    customerId: number,
    productId: number,
    variantId?: number | null
  ): Promise<CartItem | null> {
    return CartItem.query()
      .where('customerId', customerId)
      .where('productId', productId)
      .if(variantId, (query) => query.where('productVariantId', variantId!))
      .if(!variantId, (query) => query.whereNull('productVariantId'))
      .first()
  }

  /**
   * Validate stock availability
   */
  async validateStock(
    productId: number,
    variantId: number | null,
    quantity: number
  ): Promise<StockValidationResult> {
    // Check product exists and is active
    const product = await Product.query().where('id', productId).where('status', 'active').first()

    if (!product) {
      return {
        isValid: false,
        availableStock: 0,
        message: 'Produk tidak ditemukan atau tidak tersedia',
      }
    }

    // Check variant if provided
    let availableStock = product.stock

    if (variantId) {
      const variant = await ProductVariant.query()
        .where('id', variantId)
        .where('productId', productId)
        .first()

      if (!variant) {
        return {
          isValid: false,
          availableStock: 0,
          message: 'Varian produk tidak ditemukan',
        }
      }

      availableStock = variant.stock
    }

    if (availableStock < quantity) {
      return {
        isValid: false,
        availableStock,
        message: `Stok tidak mencukupi. Tersedia: ${availableStock}`,
      }
    }

    return {
      isValid: true,
      availableStock,
    }
  }

  /**
   * Add item to cart (creates new or updates existing)
   */
  async addToCart(input: AddToCartInput): Promise<{ cartItem: CartItem; isNew: boolean }> {
    const { customerId, productId, variantId, quantity } = input

    // Check if item already exists in cart
    const existingItem = await this.findExisting(customerId, productId, variantId)

    if (existingItem) {
      // Update quantity
      existingItem.quantity += quantity
      await existingItem.save()

      // Reload with relations
      await existingItem.load('product', (query) => {
        query.preload('images')
      })
      await existingItem.load('productVariant')

      return { cartItem: existingItem, isNew: false }
    }

    // Create new cart item
    const cartItem = await CartItem.create({
      customerId,
      productId,
      productVariantId: variantId || null,
      quantity,
    })

    // Load relations
    await cartItem.load('product', (query) => {
      query.preload('images')
    })
    await cartItem.load('productVariant')

    return { cartItem, isNew: true }
  }

  /**
   * Update cart item quantity
   */
  async updateQuantity(cartItem: CartItem, quantity: number): Promise<CartItem | null> {
    if (quantity <= 0) {
      await cartItem.delete()
      return null
    }

    cartItem.quantity = quantity
    await cartItem.save()

    return cartItem
  }

  /**
   * Remove cart item
   */
  async remove(cartItem: CartItem): Promise<void> {
    await cartItem.delete()
  }

  /**
   * Clear all cart items for a customer
   */
  async clearCart(customerId: number): Promise<number> {
    const result = await CartItem.query().where('customerId', customerId).delete()

    return result[0] as number
  }

  /**
   * Get cart items count
   */
  async getCount(customerId: number): Promise<number> {
    const result = await CartItem.query()
      .where('customerId', customerId)
      .count('* as total')
      .first()

    return Number(result?.$extras.total || 0)
  }

  /**
   * Get total quantity in cart
   */
  async getTotalQuantity(customerId: number): Promise<number> {
    const result = await CartItem.query()
      .where('customerId', customerId)
      .sum('quantity as total')
      .first()

    return Number(result?.$extras.total || 0)
  }

  /**
   * Update checked status
   */
  async updateChecked(cartItem: CartItem, checked: boolean): Promise<CartItem> {
    cartItem.checked = checked
    await cartItem.save()
    return cartItem
  }

  /**
   * Bulk remove cart items
   */
  async bulkRemove(customerId: number, ids: number[]): Promise<number> {
    const result = await CartItem.query()
      .where('customerId', customerId)
      .whereIn('id', ids)
      .delete()

    return result[0] as number
  }
}
