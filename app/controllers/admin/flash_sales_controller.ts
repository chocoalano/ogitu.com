import type { HttpContext } from '@adonisjs/core/http'
import FlashSale from '#models/flash_sale'
import Product from '#models/product'
import { DateTime } from 'luxon'

/**
 * Parse date string to DateTime object
 */
function parseDateTime(dateString: string): DateTime {
  if (!dateString) {
    return DateTime.now()
  }

  // Try ISO format first
  let dt = DateTime.fromISO(dateString)
  if (dt.isValid) return dt

  // Try SQL format
  dt = DateTime.fromSQL(dateString)
  if (dt.isValid) return dt

  // Try datetime-local format
  dt = DateTime.fromFormat(dateString, "yyyy-MM-dd'T'HH:mm")
  if (dt.isValid) return dt

  // Try JavaScript Date
  const jsDate = new Date(dateString)
  if (!Number.isNaN(jsDate.getTime())) {
    return DateTime.fromJSDate(jsDate)
  }

  return DateTime.now()
}

export default class FlashSalesController {
  /**
   * Display a list of flash sales
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const status = request.input('status', '')
    const search = request.input('search', '')

    const query = FlashSale.query().preload('products')

    // Apply search filter
    if (search) {
      query.where((q) => {
        q.where('name', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`)
      })
    }

    // Apply status filter
    if (status) {
      const now = DateTime.now()
      switch (status) {
        case 'active':
          query
            .where('isActive', true)
            .where('startDate', '<=', now.toSQL())
            .where('endDate', '>=', now.toSQL())
          break
        case 'expired':
          query.where('endDate', '<', now.toSQL())
          break
        case 'upcoming':
          query.where('startDate', '>', now.toSQL())
          break
        case 'inactive':
          query.where('isActive', false)
          break
      }
    }

    query.orderBy('createdAt', 'desc')

    const flashSales = await query.paginate(page, perPage)

    // Calculate stats
    const now = DateTime.now()
    const allFlashSales = await FlashSale.query()
    const stats = {
      total: allFlashSales.length,
      active: allFlashSales.filter((f) => f.isActive && f.startDate <= now && f.endDate >= now)
        .length,
      upcoming: allFlashSales.filter((f) => f.startDate > now).length,
      expired: allFlashSales.filter((f) => f.endDate < now).length,
      inactive: allFlashSales.filter((f) => !f.isActive).length,
    }

    // Transform flash sales for frontend
    const transformedFlashSales = flashSales.all().map((flashSale) => {
      const products = flashSale.products || []
      const totalSold = products.reduce((sum, p) => sum + (p.$extras.pivot_sold_count || 0), 0)

      return {
        id: flashSale.id,
        name: flashSale.name,
        description: flashSale.description,
        startDate: flashSale.startDate.toISO(),
        endDate: flashSale.endDate.toISO(),
        isActive: flashSale.isActive,
        status: flashSale.status,
        statusColor: this.getStatusColor(flashSale.status),
        timeRemaining: flashSale.timeRemaining,
        progress: flashSale.progress,
        productCount: products.length,
        totalSold,
        products: products.slice(0, 5).map((p) => ({
          id: p.id,
          productId: p.id,
          name: p.name,
          image: p.images?.[0]?.url || '/images/placeholder.png',
          originalPrice: p.$extras.pivot_original_price,
          flashPrice: p.$extras.pivot_flash_price,
          discountPercentage: Math.round(
            ((p.$extras.pivot_original_price - p.$extras.pivot_flash_price) /
              p.$extras.pivot_original_price) *
              100
          ),
          stockLimit: p.$extras.pivot_stock_limit,
          soldCount: p.$extras.pivot_sold_count || 0,
          remainingStock: p.$extras.pivot_stock_limit - (p.$extras.pivot_sold_count || 0),
        })),
        createdAt: flashSale.createdAt.toISO(),
      }
    })

    return inertia.render('admin/promotions/flash-sale/index', {
      flashSales: transformedFlashSales,
      pagination: {
        currentPage: flashSales.currentPage,
        lastPage: flashSales.lastPage,
        total: flashSales.total,
        perPage: flashSales.perPage,
      },
      stats,
      filters: {
        status,
        search,
      },
    })
  }

  /**
   * Show the form for creating a new flash sale
   */
  async create({ inertia }: HttpContext) {
    const products = await Product.query()
      .where('status', 'active')
      .orderBy('name', 'asc')
      .limit(200)

    return inertia.render('admin/promotions/flash-sale/create', {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.images?.[0]?.url || '/images/placeholder.png',
        price: p.price,
        stock: p.stock,
      })),
    })
  }

  /**
   * Store a newly created flash sale
   */
  async store({ request, response, session }: HttpContext) {
    const data = request.only(['name', 'description', 'start_date', 'end_date', 'is_active'])
    const productsData = request.input('products', [])

    const flashSale = await FlashSale.create({
      name: data.name,
      description: data.description || null,
      startDate: parseDateTime(data.start_date),
      endDate: parseDateTime(data.end_date),
      isActive: Boolean(data.is_active),
    })

    // Attach products with pivot data
    if (productsData.length > 0) {
      const pivotData: Record<number, object> = {}
      for (const product of productsData) {
        pivotData[product.product_id] = {
          original_price: product.original_price,
          flash_price: product.flash_price,
          stock_limit: product.stock_limit,
          sold_count: 0,
        }
      }
      await flashSale.related('products').attach(pivotData)
    }

    session.flash('success', 'Flash Sale berhasil dibuat')
    return response.redirect().toPath('/admin/promotions/flash-sale')
  }

  /**
   * Show a single flash sale
   */
  async show({ params, inertia }: HttpContext) {
    const flashSale = await FlashSale.query()
      .where('id', params.id)
      .preload('products')
      .firstOrFail()

    const products = flashSale.products || []
    const totalSold = products.reduce((sum, p) => sum + (p.$extras.pivot_sold_count || 0), 0)
    const totalRevenue = products.reduce(
      (sum, p) => sum + p.$extras.pivot_flash_price * (p.$extras.pivot_sold_count || 0),
      0
    )

    return inertia.render('admin/promotions/flash-sale/show', {
      flashSale: {
        id: flashSale.id,
        name: flashSale.name,
        description: flashSale.description,
        startDate: flashSale.startDate.toISO(),
        endDate: flashSale.endDate.toISO(),
        isActive: flashSale.isActive,
        status: flashSale.status,
        statusColor: this.getStatusColor(flashSale.status),
        timeRemaining: flashSale.timeRemaining,
        progress: flashSale.progress,
        productCount: products.length,
        totalSold,
        totalRevenue,
        products: products.map((p) => ({
          id: p.id,
          productId: p.id,
          name: p.name,
          image: p.images?.[0]?.url || '/images/placeholder.png',
          originalPrice: p.$extras.pivot_original_price,
          flashPrice: p.$extras.pivot_flash_price,
          discountPercentage: Math.round(
            ((p.$extras.pivot_original_price - p.$extras.pivot_flash_price) /
              p.$extras.pivot_original_price) *
              100
          ),
          stockLimit: p.$extras.pivot_stock_limit,
          soldCount: p.$extras.pivot_sold_count || 0,
          remainingStock: p.$extras.pivot_stock_limit - (p.$extras.pivot_sold_count || 0),
        })),
        createdAt: flashSale.createdAt.toISO(),
        updatedAt: flashSale.updatedAt.toISO(),
      },
    })
  }

  /**
   * Show the form for editing a flash sale
   */
  async edit({ params, inertia }: HttpContext) {
    const flashSale = await FlashSale.query()
      .where('id', params.id)
      .preload('products')
      .firstOrFail()

    const products = await Product.query()
      .where('status', 'active')
      .orderBy('name', 'asc')
      .limit(200)

    return inertia.render('admin/promotions/flash-sale/edit', {
      flashSale: {
        id: flashSale.id,
        name: flashSale.name,
        description: flashSale.description,
        startDate: flashSale.startDate.toFormat("yyyy-MM-dd'T'HH:mm"),
        endDate: flashSale.endDate.toFormat("yyyy-MM-dd'T'HH:mm"),
        isActive: flashSale.isActive,
        products: flashSale.products.map((p) => ({
          product_id: p.id,
          name: p.name,
          image: p.images?.[0]?.url || '/images/placeholder.png',
          original_price: p.$extras.pivot_original_price,
          flash_price: p.$extras.pivot_flash_price,
          stock_limit: p.$extras.pivot_stock_limit,
          sold_count: p.$extras.pivot_sold_count || 0,
        })),
      },
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.images?.[0]?.url || '/images/placeholder.png',
        price: p.price,
        stock: p.stock,
      })),
    })
  }

  /**
   * Update a flash sale
   */
  async update({ params, request, response, session }: HttpContext) {
    const flashSale = await FlashSale.findOrFail(params.id)

    const data = request.only(['name', 'description', 'start_date', 'end_date', 'is_active'])
    const productsData = request.input('products', [])

    flashSale.merge({
      name: data.name,
      description: data.description || null,
      startDate: parseDateTime(data.start_date),
      endDate: parseDateTime(data.end_date),
      isActive: Boolean(data.is_active),
    })

    await flashSale.save()

    // Sync products with pivot data
    await flashSale.related('products').detach()
    if (productsData.length > 0) {
      const pivotData: Record<number, object> = {}
      for (const product of productsData) {
        pivotData[product.product_id] = {
          original_price: product.original_price,
          flash_price: product.flash_price,
          stock_limit: product.stock_limit,
          sold_count: product.sold_count || 0,
        }
      }
      await flashSale.related('products').attach(pivotData)
    }

    session.flash('success', 'Flash Sale berhasil diperbarui')
    return response.redirect().toPath('/admin/promotions/flash-sale')
  }

  /**
   * Delete a flash sale
   */
  async destroy({ params, response, session }: HttpContext) {
    const flashSale = await FlashSale.findOrFail(params.id)
    await flashSale.related('products').detach()
    await flashSale.delete()

    session.flash('success', 'Flash Sale berhasil dihapus')
    return response.redirect().toPath('/admin/promotions/flash-sale')
  }

  /**
   * Toggle flash sale active status
   */
  async toggleStatus({ params, response }: HttpContext) {
    const flashSale = await FlashSale.findOrFail(params.id)
    flashSale.isActive = !flashSale.isActive
    await flashSale.save()

    return response.redirect().back()
  }

  /**
   * Get status color for badge
   */
  private getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'success',
      expired: 'error',
      upcoming: 'warning',
      inactive: 'neutral',
    }
    return colors[status] || 'neutral'
  }
}
