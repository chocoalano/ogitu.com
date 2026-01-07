import CartItem from '#models/cart_item'

export interface AddToCartInput {
  customerId: number
  productId: number
  variantId?: number | null
  quantity: number
}

export interface UpdateCartInput {
  quantity: number
}

export interface CartProductInfo {
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

export interface CartVariantInfo {
  id: number
  name: string
  value: string
  priceAdjustment: number
  stock: number
}

export interface CartSummary {
  items: CartItem[]
  totalItems: number
  totalQuantity: number
  subtotal: number
}

export interface StockValidationResult {
  isValid: boolean
  availableStock: number
  message?: string
}

export interface CartRepositoryContract {
  /**
   * Get all cart items for a customer with relations
   */
  getByCustomerId(customerId: number): Promise<CartItem[]>

  /**
   * Get cart summary with totals
   */
  getCartSummary(customerId: number): Promise<CartSummary>

  /**
   * Find cart item by id and customer
   */
  findByIdAndCustomer(id: number, customerId: number): Promise<CartItem | null>

  /**
   * Find existing cart item by product and variant
   */
  findExisting(
    customerId: number,
    productId: number,
    variantId?: number | null
  ): Promise<CartItem | null>

  /**
   * Add item to cart (creates new or updates existing)
   */
  addToCart(input: AddToCartInput): Promise<{ cartItem: CartItem; isNew: boolean }>

  /**
   * Update cart item quantity
   */
  updateQuantity(cartItem: CartItem, quantity: number): Promise<CartItem | null>

  /**
   * Remove cart item
   */
  remove(cartItem: CartItem): Promise<void>

  /**
   * Clear all cart items for a customer
   */
  clearCart(customerId: number): Promise<number>

  /**
   * Get cart items count
   */
  getCount(customerId: number): Promise<number>

  /**
   * Get total quantity in cart
   */
  getTotalQuantity(customerId: number): Promise<number>

  /**
   * Validate stock availability
   */
  validateStock(
    productId: number,
    variantId: number | null,
    quantity: number
  ): Promise<StockValidationResult>
}
