import type { HttpContext } from '@adonisjs/core/http'
import { WishlistRepository, CartRepository } from '#repositories/index'
import Helper from '#services/helper'
import BugReportService from '#services/bug_report_service'

export default class WishlistsController {
  private wishlistRepository: WishlistRepository
  private cartRepository: CartRepository

  constructor() {
    this.wishlistRepository = new WishlistRepository()
    this.cartRepository = new CartRepository()
  }

  /**
   * Render wishlist page
   */
  public async view({ auth, inertia }: HttpContext) {
    const customer = auth.use('customer').user!
    const wishlists = await this.wishlistRepository.getByCustomerId(customer.id)

    // Transform wishlist items for the page
    const items = wishlists.map((item) => {
      const product = item.product
      const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0]

      return {
        id: item.id,
        productId: item.productId,
        product: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          discountPrice: product.discountPrice,
          stock: product.stock,
          status: product.status,
          image: Helper.getFullImageUrl(primaryImage?.url),
        },
        createdAt: item.createdAt.toISO(),
      }
    })

    return inertia.render('wishlist/index', {
      items,
      totalItems: items.length,
    })
  }

  /**
   * Get wishlist items for current customer
   */
  public async index({ auth, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const wishlists = await this.wishlistRepository.getByCustomerId(customer.id)

      // Transform wishlist items to match frontend expected format
      const items = wishlists.map((item) => ({
        id: item.id,
        productId: item.productId,
        product: {
          id: item.product.id,
          name: item.product.name,
          slug: item.product.slug,
          price: item.product.price,
          discountPrice: item.product.discountPrice,
          images:
            item.product.images?.map((img) => ({
              url: Helper.getFullImageUrl(img.url),
            })) || [],
        },
        createdAt: item.createdAt.toISO(),
      }))

      return response.json({
        success: true,
        data: { items },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => '/api/wishlist', method: () => 'GET', ip: () => '', header: () => '' } as any, auth },
        'WishlistsController',
        'index',
        error
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil wishlist',
      })
    }
  }

  /**
   * Toggle wishlist item (add if not exists, remove if exists)
   */
  public async toggle({ auth, request, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const { productId } = request.only(['productId'])

      // Validate input
      if (!productId) {
        return response.status(400).json({
          success: false,
          message: 'Product ID diperlukan',
        })
      }

      // Validate product exists and is active
      const isValidProduct = await this.wishlistRepository.validateProduct(productId)
      if (!isValidProduct) {
        return response.status(404).json({
          success: false,
          message: 'Produk tidak ditemukan atau tidak tersedia',
        })
      }

      // Toggle wishlist
      const result = await this.wishlistRepository.toggle(customer.id, productId)

      return response.status(result.isWishlisted ? 201 : 200).json({
        success: true,
        message: result.isWishlisted
          ? 'Produk ditambahkan ke wishlist'
          : 'Produk dihapus dari wishlist',
        data: {
          isWishlisted: result.isWishlisted,
        },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request, auth },
        'WishlistsController',
        'toggle',
        error,
        { productId: request.input('productId') }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memproses wishlist',
      })
    }
  }

  /**
   * Check if product is in wishlist
   */
  public async check({ auth, params, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const productId = Number(params.productId)

      if (!productId || Number.isNaN(productId)) {
        return response.status(400).json({
          success: false,
          message: 'Product ID tidak valid',
        })
      }

      const isWishlisted = await this.wishlistRepository.isWishlisted(customer.id, productId)

      return response.json({
        success: true,
        data: { isWishlisted },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => `/api/wishlist/check/${params.productId}`, method: () => 'GET', ip: () => '', header: () => '' } as any, auth },
        'WishlistsController',
        'check',
        error,
        { productId: params.productId }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memeriksa wishlist',
      })
    }
  }

  /**
   * Check multiple products in wishlist (batch check)
   */
  public async checkBatch({ auth, request, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const { productIds } = request.only(['productIds'])

      if (!Array.isArray(productIds) || productIds.length === 0) {
        return response.status(400).json({
          success: false,
          message: 'productIds harus berupa array yang tidak kosong',
        })
      }

      // Limit batch size for performance
      if (productIds.length > 100) {
        return response.status(400).json({
          success: false,
          message: 'Maksimal 100 product IDs per request',
        })
      }

      const wishlistedIds = await this.wishlistRepository.getWishlistedProductIds(
        customer.id,
        productIds.map(Number)
      )

      return response.json({
        success: true,
        data: { wishlistedIds },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request, auth },
        'WishlistsController',
        'checkBatch',
        error
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memeriksa wishlist',
      })
    }
  }

  /**
   * Remove item from wishlist
   */
  public async destroy({ auth, params, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const productId = Number(params.productId)

      if (!productId || Number.isNaN(productId)) {
        return response.status(400).json({
          success: false,
          message: 'Product ID tidak valid',
        })
      }

      const removed = await this.wishlistRepository.remove(customer.id, productId)

      if (!removed) {
        return response.status(404).json({
          success: false,
          message: 'Item wishlist tidak ditemukan',
        })
      }

      return response.json({
        success: true,
        message: 'Item berhasil dihapus dari wishlist',
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => `/api/wishlist/${params.productId}`, method: () => 'DELETE', ip: () => '', header: () => '' } as any, auth },
        'WishlistsController',
        'destroy',
        error,
        { productId: params.productId }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat menghapus dari wishlist',
      })
    }
  }

  /**
   * Clear all wishlist items
   */
  public async clear({ auth, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const deletedCount = await this.wishlistRepository.clearWishlist(customer.id)

      return response.json({
        success: true,
        message: `${deletedCount} item berhasil dihapus dari wishlist`,
        data: { deletedCount },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => '/api/wishlist/clear', method: () => 'DELETE', ip: () => '', header: () => '' } as any, auth },
        'WishlistsController',
        'clear',
        error
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengosongkan wishlist',
      })
    }
  }

  /**
   * Get wishlist count
   */
  public async count({ auth, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const count = await this.wishlistRepository.getCount(customer.id)

      return response.json({
        success: true,
        data: { count },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request: { url: () => '/api/wishlist/count', method: () => 'GET', ip: () => '', header: () => '' } as any, auth },
        'WishlistsController',
        'count',
        error
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat mengambil jumlah wishlist',
      })
    }
  }

  /**
   * Move wishlist item to cart
   */
  public async moveToCart({ auth, params, request, response }: HttpContext) {
    try {
      const customer = auth.use('customer').user!
      const productId = Number(params.productId)
      const { variantId, quantity = 1 } = request.only(['variantId', 'quantity'])

      if (!productId || Number.isNaN(productId)) {
        return response.status(400).json({
          success: false,
          message: 'Product ID tidak valid',
        })
      }

      // Check if product is in wishlist
      const isInWishlist = await this.wishlistRepository.isWishlisted(customer.id, productId)
      if (!isInWishlist) {
        return response.status(404).json({
          success: false,
          message: 'Produk tidak ditemukan di wishlist',
        })
      }

      // Validate stock
      const stockValidation = await this.cartRepository.validateStock(
        productId,
        variantId || null,
        quantity
      )

      if (!stockValidation.isValid) {
        return response.status(400).json({
          success: false,
          message: stockValidation.message,
          data: { availableStock: stockValidation.availableStock },
        })
      }

      // Add to cart
      const { cartItem, isNew } = await this.cartRepository.addToCart({
        customerId: customer.id,
        productId,
        variantId: variantId || null,
        quantity,
      })

      // Remove from wishlist
      await this.wishlistRepository.remove(customer.id, productId)

      return response.json({
        success: true,
        message: 'Produk berhasil dipindahkan ke keranjang',
        data: {
          cartItemId: cartItem.id,
          isNew,
        },
      })
    } catch (error) {
      await BugReportService.logCustomerError(
        { request, auth },
        'WishlistsController',
        'moveToCart',
        error,
        { productId: params.productId, variantId: request.input('variantId'), quantity: request.input('quantity') }
      )
      return response.status(500).json({
        success: false,
        message: 'Terjadi kesalahan saat memindahkan ke keranjang',
      })
    }
  }
}
