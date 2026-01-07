import type { HttpContext } from '@adonisjs/core/http'
import { CartRepository } from '#repositories/index'
import Helper from '#services/helper'
import BugReportService from '#services/bug_report_service'

export default class CartsController {
  private cartRepository: CartRepository

  constructor() {
    this.cartRepository = new CartRepository()
  }

  /**
   * Cart page view (Inertia)
   */
  public async view({ auth, inertia }: HttpContext) {
    const customer = auth.use('customer').user!
    const cartItems = await this.cartRepository.getByCustomerId(customer.id)

    // Transform cart items
    const items = cartItems.map((item) => {
      const basePrice = Number(item.product.discountPrice) || Number(item.product.price)
      const variantAdjustment = item.productVariant
        ? Number(item.productVariant.priceAdjustment) || 0
        : 0

      return {
        id: item.id,
        productId: item.productId,
        variantId: item.productVariantId,
        quantity: item.quantity,
        checked: item.checked ?? true,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          price: Number(item.product.price),
          discountPrice: item.product.discountPrice ? Number(item.product.discountPrice) : null,
          stock: item.product.stock,
          image: item.product.images[0]
            ? Helper.getFullImageUrl(item.product.images[0].url)
            : 'https://placehold.co/400x400/1a1a2e/ffffff?text=No+Image',
        },
        variant: item.productVariant
          ? {
              id: item.productVariant.id,
              name: item.productVariant.name,
              value: item.productVariant.value,
              price: basePrice + variantAdjustment,
              stock: item.productVariant.stock,
            }
          : null,
        itemPrice: item.productVariant ? basePrice + variantAdjustment : basePrice,
      }
    })

    // Calculate summary
    const checkedItems = items.filter((item) => item.checked)
    const summary = {
      totalItems: items.length,
      checkedItems: checkedItems.length,
      subtotal: checkedItems.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0),
      totalQuantity: checkedItems.reduce((sum, item) => sum + item.quantity, 0),
    }

    return inertia.render('cart/index', {
      cartItems: items,
      summary,
    })
  }

  /**
   * Get cart items for current customer (API)
   */
  public async index({ auth, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const cartItems = await this.cartRepository.getByCustomerId(customer.id)

      // Transform cart items to match frontend expected format
      const items = cartItems.map((item) => {
        const basePrice = Number(item.product.discountPrice) || Number(item.product.price)
        const variantAdjustment = item.productVariant
          ? Number(item.productVariant.priceAdjustment) || 0
          : 0

        return {
          id: item.id,
          productId: item.productId,
          variantId: item.productVariantId,
          quantity: item.quantity,
          checked: true,
          product: {
            id: item.product.id,
            name: item.product.name,
            slug: item.product.slug,
            price: Number(item.product.price),
            discountPrice: item.product.discountPrice ? Number(item.product.discountPrice) : null,
            images: item.product.images.map((img) => ({
              url: Helper.getFullImageUrl(img.url),
            })),
          },
          variant: item.productVariant
            ? {
                id: item.productVariant.id,
                name: item.productVariant.name,
                price: basePrice + variantAdjustment,
              }
            : null,
        }
      })

      return response.json({
        success: true,
        data: { items },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => '/api/cart', method: () => 'GET', ip: () => '', header: () => '' } as any, auth },
        'CartsController',
        'index',
        error
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil data keranjang',
      })
    }
  }

  /**
   * Get cart summary with totals
   */
  public async summary({ auth, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const summary = await this.cartRepository.getCartSummary(customer.id)

      return response.json({
        success: true,
        data: summary,
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil ringkasan keranjang',
      })
    }
  }

  /**
   * Add item to cart
   */
  public async store({ auth, request, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const {
        productId,
        variantId,
        quantity = 1,
      } = request.only(['productId', 'variantId', 'quantity'])

      // Validate input
      if (!productId) {
        return response.status(400).json({
          success: false,
          message: 'Product ID diperlukan',
        })
      }

      if (quantity < 1) {
        return response.status(400).json({
          success: false,
          message: 'Jumlah minimal adalah 1',
        })
      }

      // Validate stock availability
      const stockValidation = await this.cartRepository.validateStock(
        productId,
        variantId || null,
        quantity
      )

      if (!stockValidation.isValid) {
        return response.status(400).json({
          success: false,
          message: stockValidation.message,
        })
      }

      // Check existing cart item for total quantity validation
      const existingItem = await this.cartRepository.findExisting(customer.id, productId, variantId)

      if (existingItem) {
        const newTotalQuantity = existingItem.quantity + quantity
        if (newTotalQuantity > stockValidation.availableStock) {
          return response.status(400).json({
            success: false,
            message: `Jumlah melebihi stok. Tersedia: ${stockValidation.availableStock}, di keranjang: ${existingItem.quantity}`,
          })
        }
      }

      // Add to cart
      const { cartItem, isNew } = await this.cartRepository.addToCart({
        customerId: customer.id,
        productId,
        variantId: variantId || null,
        quantity,
      })

      return response.status(isNew ? 201 : 200).json({
        success: true,
        message: isNew
          ? 'Produk berhasil ditambahkan ke keranjang'
          : 'Keranjang berhasil diperbarui',
        data: cartItem,
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request, auth },
        'CartsController',
        'store',
        error,
        { productId: request.input('productId'), variantId: request.input('variantId'), quantity: request.input('quantity') }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menambahkan ke keranjang',
      })
    }
  }

  /**
   * Update cart item quantity
   */
  public async update({ auth, params, request, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const { quantity } = request.only(['quantity'])

      // Validate input
      if (quantity === undefined || quantity === null) {
        return response.status(400).json({
          success: false,
          message: 'Quantity diperlukan',
        })
      }

      // Find cart item
      const cartItem = await this.cartRepository.findByIdAndCustomer(Number(params.id), customer.id)

      if (!cartItem) {
        return response.status(404).json({
          success: false,
          message: 'Item keranjang tidak ditemukan',
        })
      }

      // If quantity is 0 or less, delete the item
      if (quantity <= 0) {
        await this.cartRepository.remove(cartItem)
        return response.json({
          success: true,
          message: 'Item dihapus dari keranjang',
        })
      }

      // Validate stock for the new quantity
      const stockValidation = await this.cartRepository.validateStock(
        cartItem.productId,
        cartItem.productVariantId,
        quantity
      )

      if (!stockValidation.isValid) {
        return response.status(400).json({
          success: false,
          message: stockValidation.message,
        })
      }

      // Update quantity
      const updatedItem = await this.cartRepository.updateQuantity(cartItem, quantity)

      return response.json({
        success: true,
        message: 'Keranjang berhasil diperbarui',
        data: updatedItem,
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request, auth },
        'CartsController',
        'update',
        error,
        { cartItemId: params.id, quantity: request.input('quantity') }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memperbarui keranjang',
      })
    }
  }

  /**
   * Remove item from cart
   */
  public async destroy({ auth, params, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!

      const cartItem = await this.cartRepository.findByIdAndCustomer(Number(params.id), customer.id)

      if (!cartItem) {
        return response.status(404).json({
          success: false,
          message: 'Item keranjang tidak ditemukan',
        })
      }

      await this.cartRepository.remove(cartItem)

      return response.json({
        success: true,
        message: 'Item berhasil dihapus dari keranjang',
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => `/api/cart/${params.id}`, method: () => 'DELETE', ip: () => '', header: () => '' } as any, auth },
        'CartsController',
        'destroy',
        error,
        { cartItemId: params.id }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus item',
      })
    }
  }

  /**
   * Clear all cart items
   */
  public async clear({ auth, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const deletedCount = await this.cartRepository.clearCart(customer.id)

      return response.json({
        success: true,
        message: `${deletedCount} item berhasil dihapus dari keranjang`,
        data: { deletedCount },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => '/api/cart/clear', method: () => 'DELETE', ip: () => '', header: () => '' } as any, auth },
        'CartsController',
        'clear',
        error
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengosongkan keranjang',
      })
    }
  }

  /**
   * Get cart count for current customer
   */
  public async count({ auth, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const count = await this.cartRepository.getCount(customer.id)

      return response.json({
        success: true,
        data: { count },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil jumlah keranjang',
      })
    }
  }

  /**
   * Get total quantity in cart
   */
  public async totalQuantity({ auth, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const totalQuantity = await this.cartRepository.getTotalQuantity(customer.id)

      return response.json({
        success: true,
        data: { totalQuantity },
      })
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil total quantity',
      })
    }
  }

  /**
   * Toggle item checked status
   */
  public async toggleChecked({ auth, params, request, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const { checked } = request.only(['checked'])

      const cartItem = await this.cartRepository.findByIdAndCustomer(Number(params.id), customer.id)

      if (!cartItem) {
        return response.status(404).json({
          success: false,
          message: 'Item keranjang tidak ditemukan',
        })
      }

      await this.cartRepository.updateChecked(cartItem, checked)

      return response.json({
        success: true,
        message: 'Status item diperbarui',
        data: { checked },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request, auth },
        'CartsController',
        'toggleChecked',
        error,
        { cartItemId: params.id }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memperbarui status item',
      })
    }
  }

  /**
   * Bulk delete cart items
   */
  public async bulkDestroy({ auth, request, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const { ids } = request.only(['ids'])

      if (!Array.isArray(ids) || ids.length === 0) {
        return response.status(400).json({
          success: false,
          message: 'IDs harus berupa array yang tidak kosong',
        })
      }

      const deletedCount = await this.cartRepository.bulkRemove(customer.id, ids)

      return response.json({
        success: true,
        message: `${deletedCount} item berhasil dihapus dari keranjang`,
        data: { deletedCount },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request, auth },
        'CartsController',
        'bulkDestroy',
        error,
        { ids: request.input('ids') }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus item',
      })
    }
  }
}
