import type { HttpContext } from '@adonisjs/core/http'
import Discount from '#models/discount'
import Product from '#models/product'
import { DateTime } from 'luxon'

/**
 * Parse date string to DateTime object
 * Handles multiple formats: ISO, datetime-local input, etc.
 */
function parseDateTime(dateString: string): DateTime {
  if (!dateString) {
    return DateTime.now()
  }

  // Try ISO format first
  let dt = DateTime.fromISO(dateString)
  if (dt.isValid) {
    return dt
  }

  // Try SQL format
  dt = DateTime.fromSQL(dateString)
  if (dt.isValid) {
    return dt
  }

  // Try format from datetime-local input (yyyy-MM-ddTHH:mm)
  dt = DateTime.fromFormat(dateString, "yyyy-MM-dd'T'HH:mm")
  if (dt.isValid) {
    return dt
  }

  // Try format with seconds
  dt = DateTime.fromFormat(dateString, "yyyy-MM-dd'T'HH:mm:ss")
  if (dt.isValid) {
    return dt
  }

  // Try JavaScript Date constructor as last resort
  const jsDate = new Date(dateString)
  if (!Number.isNaN(jsDate.getTime())) {
    return DateTime.fromJSDate(jsDate)
  }

  // If all fails, return current time
  console.error(`Failed to parse date: ${dateString}`)
  return DateTime.now()
}

export default class DiscountsController {
  /**
   * Display a list of discounts
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const status = request.input('status', '')
    const search = request.input('search', '')
    const type = request.input('type', '')

    const query = Discount.query().preload('products', (q) => q.limit(5))

    // Apply search filter
    if (search) {
      query.where((q) => {
        q.where('name', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`)
      })
    }

    // Apply type filter
    if (type) {
      query.where('type', type)
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

    // Order by created date
    query.orderBy('createdAt', 'desc')

    const discounts = await query.paginate(page, perPage)

    // Calculate stats
    const now = DateTime.now()
    const allDiscounts = await Discount.query()
    const stats = {
      total: allDiscounts.length,
      active: allDiscounts.filter((d) => d.isActive && d.startDate <= now && d.endDate >= now)
        .length,
      upcoming: allDiscounts.filter((d) => d.startDate > now).length,
      expired: allDiscounts.filter((d) => d.endDate < now).length,
      inactive: allDiscounts.filter((d) => !d.isActive).length,
    }

    // Transform discounts for frontend
    const transformedDiscounts = discounts.all().map((discount) => ({
      id: discount.id,
      name: discount.name,
      description: discount.description,
      type: discount.type,
      typeLabel: discount.type === 'percentage' ? 'Persentase' : 'Nominal',
      value: discount.value,
      valueDisplay:
        discount.type === 'percentage'
          ? `${discount.value}%`
          : `Rp ${discount.value.toLocaleString('id-ID')}`,
      minPurchase: discount.minPurchase,
      maxDiscount: discount.maxDiscount,
      startDate: discount.startDate.toISO(),
      endDate: discount.endDate.toISO(),
      usageLimit: discount.usageLimit,
      usageCount: discount.usedCount,
      remainingUsage: discount.remainingUsage,
      isActive: discount.isActive,
      appliesToAll: discount.appliesToAll,
      status: discount.status,
      statusColor: this.getStatusColor(discount.status),
      productCount: discount.products?.length || 0,
      products:
        discount.products?.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.images?.[0]?.url || '/images/placeholder.png',
          price: p.price,
        })) || [],
      createdAt: discount.createdAt.toISO(),
    }))

    return inertia.render('admin/promotions/discounts/index', {
      discounts: transformedDiscounts,
      pagination: {
        currentPage: discounts.currentPage,
        lastPage: discounts.lastPage,
        total: discounts.total,
        perPage: discounts.perPage,
      },
      stats,
      filters: {
        status,
        search,
        type,
      },
    })
  }

  /**
   * Show the form for creating a new discount
   */
  async create({ inertia }: HttpContext) {
    const products = await Product.query()
      .where('status', 'active')
      .orderBy('name', 'asc')
      .limit(100)

    return inertia.render('admin/promotions/discounts/create', {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.images?.[0]?.url || '/images/placeholder.png',
        price: p.price,
      })),
    })
  }

  /**
   * Store a newly created discount
   */
  async store({ request, response, session }: HttpContext) {
    const data = request.only([
      'name',
      'description',
      'type',
      'value',
      'min_purchase',
      'max_discount',
      'start_date',
      'end_date',
      'usage_limit',
      'is_active',
      'applies_to_all',
      'product_ids',
    ])

    const discount = await Discount.create({
      name: data.name,
      description: data.description || null,
      type: data.type,
      value: Number(data.value),
      minPurchase: Number(data.min_purchase) || 0,
      maxDiscount: data.max_discount ? Number(data.max_discount) : null,
      startDate: parseDateTime(data.start_date),
      endDate: parseDateTime(data.end_date),
      usageLimit: data.usage_limit ? Number(data.usage_limit) : null,
      isActive: Boolean(data.is_active),
      appliesToAll: Boolean(data.applies_to_all),
    })

    // Attach products if not applying to all
    if (!data.applies_to_all && data.product_ids?.length > 0) {
      await discount.related('products').attach(data.product_ids)
    }

    session.flash('success', 'Diskon berhasil dibuat')
    return response.redirect().toPath('/admin/promotions/discounts')
  }

  /**
   * Show a single discount
   */
  async show({ params, inertia }: HttpContext) {
    const discount = await Discount.query().where('id', params.id).preload('products').firstOrFail()

    return inertia.render('admin/promotions/discounts/show', {
      discount: {
        id: discount.id,
        name: discount.name,
        description: discount.description,
        type: discount.type,
        typeLabel: discount.type === 'percentage' ? 'Persentase' : 'Nominal',
        value: discount.value,
        valueDisplay:
          discount.type === 'percentage'
            ? `${discount.value}%`
            : `Rp ${discount.value.toLocaleString('id-ID')}`,
        minPurchase: discount.minPurchase,
        maxDiscount: discount.maxDiscount,
        startDate: discount.startDate.toISO(),
        endDate: discount.endDate.toISO(),
        usageLimit: discount.usageLimit,
        usageCount: discount.usedCount,
        remainingUsage: discount.remainingUsage,
        isActive: discount.isActive,
        appliesToAll: discount.appliesToAll,
        status: discount.status,
        statusColor: this.getStatusColor(discount.status),
        productCount: discount.products?.length || 0,
        products:
          discount.products?.map((p) => ({
            id: p.id,
            name: p.name,
            image: p.images?.[0]?.url || '/images/placeholder.png',
            price: p.price,
          })) || [],
        createdAt: discount.createdAt.toISO(),
        updatedAt: discount.updatedAt.toISO(),
      },
    })
  }

  /**
   * Show the form for editing a discount
   */
  async edit({ params, inertia }: HttpContext) {
    const discount = await Discount.query().where('id', params.id).preload('products').firstOrFail()

    const products = await Product.query()
      .where('status', 'active')
      .orderBy('name', 'asc')
      .limit(100)

    return inertia.render('admin/promotions/discounts/edit', {
      discount: {
        id: discount.id,
        name: discount.name,
        description: discount.description,
        type: discount.type,
        value: discount.value,
        minPurchase: discount.minPurchase,
        maxDiscount: discount.maxDiscount,
        startDate: discount.startDate.toFormat("yyyy-MM-dd'T'HH:mm"),
        endDate: discount.endDate.toFormat("yyyy-MM-dd'T'HH:mm"),
        usageLimit: discount.usageLimit,
        usageCount: discount.usedCount,
        isActive: discount.isActive,
        appliesToAll: discount.appliesToAll,
        productIds: discount.products?.map((p) => p.id) || [],
      },
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.images?.[0]?.url || '/images/placeholder.png',
        price: p.price,
      })),
    })
  }

  /**
   * Update a discount
   */
  async update({ params, request, response, session }: HttpContext) {
    const discount = await Discount.findOrFail(params.id)

    const data = request.only([
      'name',
      'description',
      'type',
      'value',
      'min_purchase',
      'max_discount',
      'start_date',
      'end_date',
      'usage_limit',
      'is_active',
      'applies_to_all',
      'product_ids',
    ])

    discount.merge({
      name: data.name,
      description: data.description || null,
      type: data.type,
      value: Number(data.value),
      minPurchase: Number(data.min_purchase) || 0,
      maxDiscount: data.max_discount ? Number(data.max_discount) : null,
      startDate: parseDateTime(data.start_date),
      endDate: parseDateTime(data.end_date),
      usageLimit: data.usage_limit ? Number(data.usage_limit) : null,
      isActive: Boolean(data.is_active),
      appliesToAll: Boolean(data.applies_to_all),
    })

    await discount.save()

    // Sync products
    if (data.applies_to_all) {
      await discount.related('products').detach()
    } else if (data.product_ids) {
      await discount.related('products').sync(data.product_ids)
    }

    session.flash('success', 'Diskon berhasil diperbarui')
    return response.redirect().toPath('/admin/promotions/discounts')
  }

  /**
   * Delete a discount
   */
  async destroy({ params, response, session }: HttpContext) {
    const discount = await Discount.findOrFail(params.id)
    await discount.related('products').detach()
    await discount.delete()

    session.flash('success', 'Diskon berhasil dihapus')
    return response.redirect().toPath('/admin/promotions/discounts')
  }

  /**
   * Toggle discount active status
   */
  async toggleStatus({ params, response }: HttpContext) {
    const discount = await Discount.findOrFail(params.id)
    discount.isActive = !discount.isActive
    await discount.save()

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
