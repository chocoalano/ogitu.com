import type { HttpContext } from '@adonisjs/core/http'
import Voucher from '#models/voucher'
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

/**
 * Generate random voucher code
 */
function generateVoucherCode(prefix: string = 'OGITU'): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = prefix
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return code
}

export default class VouchersController {
  /**
   * Display a list of vouchers
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const status = request.input('status', '')
    const search = request.input('search', '')
    const type = request.input('type', '')

    const query = Voucher.query().preload('products', (q) => q.limit(5))

    // Apply search filter
    if (search) {
      query.where((q) => {
        q.where('name', 'like', `%${search}%`)
          .orWhere('code', 'like', `%${search}%`)
          .orWhere('description', 'like', `%${search}%`)
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

    const vouchers = await query.paginate(page, perPage)

    // Calculate stats
    const now = DateTime.now()
    const allVouchers = await Voucher.query()
    const stats = {
      total: allVouchers.length,
      active: allVouchers.filter((v) => v.isActive && v.startDate <= now && v.endDate >= now)
        .length,
      upcoming: allVouchers.filter((v) => v.startDate > now).length,
      expired: allVouchers.filter((v) => v.endDate < now).length,
      inactive: allVouchers.filter((v) => !v.isActive).length,
    }

    // Transform vouchers for frontend
    const transformedVouchers = vouchers.all().map((voucher) => ({
      id: voucher.id,
      code: voucher.code,
      name: voucher.name,
      description: voucher.description,
      type: voucher.type,
      typeLabel: voucher.typeLabel,
      value: voucher.value,
      valueDisplay: this.getValueDisplay(voucher),
      minPurchase: voucher.minPurchase,
      maxDiscount: voucher.maxDiscount,
      startDate: voucher.startDate.toISO(),
      endDate: voucher.endDate.toISO(),
      usageLimit: voucher.usageLimit,
      usageCount: voucher.usedCount,
      remainingUsage: voucher.remainingUsage,
      usageLimitPerCustomer: voucher.usageLimitPerCustomer,
      isActive: voucher.isActive,
      isPublic: voucher.isPublic,
      appliesToAll: voucher.appliesToAll,
      status: voucher.status,
      statusColor: this.getStatusColor(voucher.status),
      productCount: voucher.products?.length || 0,
      products:
        voucher.products?.map((p) => ({
          id: p.id,
          name: p.name,
          image: p.images?.[0]?.url || '/images/placeholder.png',
          price: p.price,
        })) || [],
      createdAt: voucher.createdAt.toISO(),
    }))

    return inertia.render('admin/promotions/vouchers/index', {
      vouchers: transformedVouchers,
      pagination: {
        currentPage: vouchers.currentPage,
        lastPage: vouchers.lastPage,
        total: vouchers.total,
        perPage: vouchers.perPage,
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
   * Show the form for creating a new voucher
   */
  async create({ inertia }: HttpContext) {
    const products = await Product.query()
      .where('status', 'active')
      .orderBy('name', 'asc')
      .limit(100)

    return inertia.render('admin/promotions/vouchers/create', {
      products: products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.images?.[0]?.url || '/images/placeholder.png',
        price: p.price,
      })),
      suggestedCode: generateVoucherCode(),
    })
  }

  /**
   * Store a newly created voucher
   */
  async store({ request, response, session }: HttpContext) {
    const data = request.only([
      'code',
      'name',
      'description',
      'type',
      'value',
      'min_purchase',
      'max_discount',
      'start_date',
      'end_date',
      'usage_limit',
      'usage_limit_per_customer',
      'is_active',
      'is_public',
      'applies_to_all',
      'product_ids',
    ])

    // Check if code already exists
    const existingVoucher = await Voucher.findBy('code', data.code)
    if (existingVoucher) {
      session.flash('error', 'Kode voucher sudah digunakan')
      return response.redirect().back()
    }

    const voucher = await Voucher.create({
      code: data.code.toUpperCase(),
      name: data.name,
      description: data.description || null,
      type: data.type,
      value: Number(data.value),
      minPurchase: Number(data.min_purchase) || 0,
      maxDiscount: data.max_discount ? Number(data.max_discount) : null,
      startDate: parseDateTime(data.start_date),
      endDate: parseDateTime(data.end_date),
      usageLimit: data.usage_limit ? Number(data.usage_limit) : null,
      usageLimitPerCustomer: Number(data.usage_limit_per_customer) || 1,
      usedCount: 0,
      isActive: Boolean(data.is_active),
      isPublic: Boolean(data.is_public),
      appliesToAll: Boolean(data.applies_to_all),
    })

    // Attach products if not applying to all
    if (!data.applies_to_all && data.product_ids?.length > 0) {
      await voucher.related('products').attach(data.product_ids)
    }

    session.flash('success', 'Voucher berhasil dibuat')
    return response.redirect().toPath('/admin/promotions/vouchers')
  }

  /**
   * Show a single voucher
   */
  async show({ params, inertia }: HttpContext) {
    const voucher = await Voucher.query()
      .where('id', params.id)
      .preload('products')
      .preload('usages', (q) => q.orderBy('createdAt', 'desc').limit(20))
      .firstOrFail()

    return inertia.render('admin/promotions/vouchers/show', {
      voucher: {
        id: voucher.id,
        code: voucher.code,
        name: voucher.name,
        description: voucher.description,
        type: voucher.type,
        typeLabel: voucher.typeLabel,
        value: voucher.value,
        valueDisplay: this.getValueDisplay(voucher),
        minPurchase: voucher.minPurchase,
        maxDiscount: voucher.maxDiscount,
        startDate: voucher.startDate.toISO(),
        endDate: voucher.endDate.toISO(),
        usageLimit: voucher.usageLimit,
        usageCount: voucher.usedCount,
        remainingUsage: voucher.remainingUsage,
        usageLimitPerCustomer: voucher.usageLimitPerCustomer,
        isActive: voucher.isActive,
        isPublic: voucher.isPublic,
        appliesToAll: voucher.appliesToAll,
        status: voucher.status,
        statusColor: this.getStatusColor(voucher.status),
        productCount: voucher.products?.length || 0,
        products:
          voucher.products?.map((p) => ({
            id: p.id,
            name: p.name,
            image: p.images?.[0]?.url || '/images/placeholder.png',
            price: p.price,
          })) || [],
        createdAt: voucher.createdAt.toISO(),
        updatedAt: voucher.updatedAt.toISO(),
      },
    })
  }

  /**
   * Show the form for editing a voucher
   */
  async edit({ params, inertia }: HttpContext) {
    const voucher = await Voucher.query().where('id', params.id).preload('products').firstOrFail()

    const products = await Product.query()
      .where('status', 'active')
      .orderBy('name', 'asc')
      .limit(100)

    return inertia.render('admin/promotions/vouchers/edit', {
      voucher: {
        id: voucher.id,
        code: voucher.code,
        name: voucher.name,
        description: voucher.description,
        type: voucher.type,
        value: voucher.value,
        minPurchase: voucher.minPurchase,
        maxDiscount: voucher.maxDiscount,
        startDate: voucher.startDate.toFormat("yyyy-MM-dd'T'HH:mm"),
        endDate: voucher.endDate.toFormat("yyyy-MM-dd'T'HH:mm"),
        usageLimit: voucher.usageLimit,
        usageCount: voucher.usedCount,
        usageLimitPerCustomer: voucher.usageLimitPerCustomer,
        isActive: voucher.isActive,
        isPublic: voucher.isPublic,
        appliesToAll: voucher.appliesToAll,
        productIds: voucher.products?.map((p) => p.id) || [],
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
   * Update a voucher
   */
  async update({ params, request, response, session }: HttpContext) {
    const voucher = await Voucher.findOrFail(params.id)

    const data = request.only([
      'code',
      'name',
      'description',
      'type',
      'value',
      'min_purchase',
      'max_discount',
      'start_date',
      'end_date',
      'usage_limit',
      'usage_limit_per_customer',
      'is_active',
      'is_public',
      'applies_to_all',
      'product_ids',
    ])

    // Check if code already exists (excluding current voucher)
    if (data.code !== voucher.code) {
      const existingVoucher = await Voucher.findBy('code', data.code)
      if (existingVoucher) {
        session.flash('error', 'Kode voucher sudah digunakan')
        return response.redirect().back()
      }
    }

    voucher.merge({
      code: data.code.toUpperCase(),
      name: data.name,
      description: data.description || null,
      type: data.type,
      value: Number(data.value),
      minPurchase: Number(data.min_purchase) || 0,
      maxDiscount: data.max_discount ? Number(data.max_discount) : null,
      startDate: parseDateTime(data.start_date),
      endDate: parseDateTime(data.end_date),
      usageLimit: data.usage_limit ? Number(data.usage_limit) : null,
      usageLimitPerCustomer: Number(data.usage_limit_per_customer) || 1,
      isActive: Boolean(data.is_active),
      isPublic: Boolean(data.is_public),
      appliesToAll: Boolean(data.applies_to_all),
    })

    await voucher.save()

    // Sync products
    if (data.applies_to_all) {
      await voucher.related('products').detach()
    } else if (data.product_ids) {
      await voucher.related('products').sync(data.product_ids)
    }

    session.flash('success', 'Voucher berhasil diperbarui')
    return response.redirect().toPath('/admin/promotions/vouchers')
  }

  /**
   * Delete a voucher
   */
  async destroy({ params, response, session }: HttpContext) {
    const voucher = await Voucher.findOrFail(params.id)
    await voucher.related('products').detach()
    await voucher.delete()

    session.flash('success', 'Voucher berhasil dihapus')
    return response.redirect().toPath('/admin/promotions/vouchers')
  }

  /**
   * Toggle voucher active status
   */
  async toggleStatus({ params, response }: HttpContext) {
    const voucher = await Voucher.findOrFail(params.id)
    voucher.isActive = !voucher.isActive
    await voucher.save()

    return response.redirect().back()
  }

  /**
   * Generate a new voucher code
   */
  async generateCode({ response }: HttpContext) {
    const code = generateVoucherCode()
    return response.json({ code })
  }

  /**
   * Get value display for voucher
   */
  private getValueDisplay(voucher: Voucher): string {
    if (voucher.type === 'percentage') {
      return `${voucher.value}%`
    } else if (voucher.type === 'free_shipping') {
      return 'Gratis Ongkir'
    }
    return `Rp ${voucher.value.toLocaleString('id-ID')}`
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
