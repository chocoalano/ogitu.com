import type { HttpContext } from '@adonisjs/core/http'
import Customer from '#models/customer'
import BugReportService from '#services/bug_report_service'
import { createCustomerValidator, updateCustomerValidator } from '#validators/customer'
import hash from '@adonisjs/core/services/hash'

export default class CustomersController {
  private moduleName = 'CustomersController'

  private async reportAdmin(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    action: string,
    error: unknown,
    context?: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity)
  }

  async index({ inertia, request, auth, session }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const search = request.input('search', '')
    const status = request.input('status', '')

    try {
      let query = Customer.query().orderBy('createdAt', 'desc')

      if (search) {
        query = query.where((q) => {
          q.where('fullName', 'LIKE', `%${search}%`)
            .orWhere('email', 'LIKE', `%${search}%`)
            .orWhere('phone', 'LIKE', `%${search}%`)
        })
      }

      if (status === 'active') {
        query = query.where('isActive', true)
      } else if (status === 'inactive') {
        query = query.where('isActive', false)
      } else if (status === 'verified') {
        query = query.where('isVerified', true)
      } else if (status === 'unverified') {
        query = query.where('isVerified', false)
      }

      const customers = await query.paginate(page, perPage)

      return inertia.render('admin/customers/index', {
        customers: customers.serialize(),
        filters: { search, status },
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'index',
        error,
        { page, perPage, search, status },
        'medium'
      )

      session.flash('error', 'Gagal memuat data customer')

      // Fallback render supaya UI tetap jalan
      return inertia.render('admin/customers/index', {
        customers: { data: [], meta: {}, links: {} },
        filters: { search, status },
      })
    }
  }

  /**
   * Display create customer form
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('admin/customers/create')
  }

  /**
   * Store a new customer
   */
  async store({ request, response, auth, session }: HttpContext) {
    try {
      const data = await request.validateUsing(createCustomerValidator)

      // Check if email already exists
      const existingCustomer = await Customer.findBy('email', data.email)
      if (existingCustomer) {
        session.flash('error', 'Email sudah digunakan')
        return response.redirect().back()
      }

      // Check if phone already exists
      if (data.phone) {
        const existingPhone = await Customer.findBy('phone', data.phone)
        if (existingPhone) {
          session.flash('error', 'Nomor telepon sudah digunakan')
          return response.redirect().back()
        }
      }

      await Customer.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        gender: data.gender,
        isActive: data.isActive ?? true,
        isVerified: data.isVerified ?? false,
      })

      session.flash('success', 'Pelanggan berhasil ditambahkan')
      return response.redirect().toRoute('admin.customers.index')
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'store', error, {}, 'high')

      if (error.messages) {
        session.flash('errors', error.messages)
      } else {
        session.flash('error', 'Gagal menambahkan pelanggan')
      }
      return response.redirect().back()
    }
  }

  async show({ params, inertia, request, auth, response, session }: HttpContext) {
    const customerId = params.id

    try {
      const customer = await Customer.query()
        .where('id', customerId)
        .preload('addresses')
        .preload('orders', (query) => {
          query.orderBy('createdAt', 'desc').limit(10)
        })
        .preload('reviews', (query) => {
          query.preload('product').orderBy('createdAt', 'desc').limit(10)
        })
        .preload('wallet')
        .firstOrFail()

      return inertia.render('admin/customers/show', {
        customer: customer.serialize(),
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'show', error, { customerId }, 'high')

      session.flash('error', 'Gagal memuat detail customer')
      return response.redirect().toRoute('admin.customers.index')
    }
  }

  /**
   * Display edit customer form
   */
  async edit({ params, inertia, request, auth, response, session }: HttpContext) {
    const customerId = params.id

    try {
      const customer = await Customer.findOrFail(customerId)

      return inertia.render('admin/customers/edit', {
        customer: customer.serialize(),
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'edit', error, { customerId }, 'high')

      session.flash('error', 'Pelanggan tidak ditemukan')
      return response.redirect().toRoute('admin.customers.index')
    }
  }

  /**
   * Update a customer
   */
  async update({ params, request, response, auth, session }: HttpContext) {
    const customerId = params.id

    try {
      const customer = await Customer.findOrFail(customerId)
      const data = await request.validateUsing(updateCustomerValidator)

      // Check if email already exists (exclude current customer)
      if (data.email && data.email !== customer.email) {
        const existingCustomer = await Customer.findBy('email', data.email)
        if (existingCustomer) {
          session.flash('error', 'Email sudah digunakan')
          return response.redirect().back()
        }
      }

      // Check if phone already exists (exclude current customer)
      if (data.phone && data.phone !== customer.phone) {
        const existingPhone = await Customer.findBy('phone', data.phone)
        if (existingPhone) {
          session.flash('error', 'Nomor telepon sudah digunakan')
          return response.redirect().back()
        }
      }

      customer.merge({
        fullName: data.fullName ?? customer.fullName,
        email: data.email ?? customer.email,
        phone: data.phone ?? customer.phone,
        gender: data.gender ?? customer.gender,
        isActive: data.isActive ?? customer.isActive,
        isVerified: data.isVerified ?? customer.isVerified,
      })

      // Update password if provided
      if (data.password) {
        customer.password = await hash.make(data.password)
      }

      await customer.save()

      session.flash('success', 'Pelanggan berhasil diperbarui')
      return response.redirect().toRoute('admin.customers.index')
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'update', error, { customerId }, 'high')

      if (error.messages) {
        session.flash('errors', error.messages)
      } else {
        session.flash('error', 'Gagal memperbarui pelanggan')
      }
      return response.redirect().back()
    }
  }

  /**
   * Delete a customer
   */
  async destroy({ params, request, response, auth, session }: HttpContext) {
    const customerId = params.id

    try {
      const customer = await Customer.findOrFail(customerId)

      // Check if customer has orders
      const ordersCount = await customer.related('orders').query().count('* as total')
      if (Number(ordersCount[0].$extras.total) > 0) {
        session.flash('error', 'Tidak dapat menghapus pelanggan yang memiliki pesanan')
        return response.redirect().back()
      }

      await customer.delete()

      session.flash('success', 'Pelanggan berhasil dihapus')
      return response.redirect().toRoute('admin.customers.index')
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'destroy', error, { customerId }, 'high')

      session.flash('error', 'Gagal menghapus pelanggan')
      return response.redirect().back()
    }
  }

  async toggleActive({ params, request, auth, response, session }: HttpContext) {
    const customerId = params.id

    try {
      const customer = await Customer.findOrFail(customerId)
      customer.isActive = !customer.isActive
      await customer.save()

      session.flash(
        'success',
        `Customer berhasil di${customer.isActive ? 'aktifkan' : 'nonaktifkan'}`
      )
      return response.redirect().back()
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'toggleActive', error, { customerId }, 'medium')

      session.flash('error', 'Gagal mengubah status customer')
      return response.redirect().back()
    }
  }

  /**
   * Toggle customer verification status
   */
  async toggleVerified({ params, request, auth, response, session }: HttpContext) {
    const customerId = params.id

    try {
      const customer = await Customer.findOrFail(customerId)
      customer.isVerified = !customer.isVerified
      await customer.save()

      session.flash(
        'success',
        `Customer berhasil di${customer.isVerified ? 'verifikasi' : 'unverifikasi'}`
      )
      return response.redirect().back()
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'toggleVerified', error, { customerId }, 'medium')

      session.flash('error', 'Gagal mengubah status verifikasi customer')
      return response.redirect().back()
    }
  }

  /**
   * Impersonate a customer (login as customer)
   */
  async impersonate({ params, request, auth, response, session }: HttpContext) {
    const customerId = params.id

    try {
      const admin = auth.use('web').user!
      const customer = await Customer.findOrFail(customerId)

      if (!customer.isActive) {
        session.flash('error', 'Tidak dapat login sebagai customer yang tidak aktif')
        return response.redirect().back()
      }

      // Store admin info in session for returning later
      session.put('impersonating_admin_id', admin.id)
      session.put('impersonating_customer_id', customer.id)
      session.put('impersonating_customer_name', customer.fullName)

      // Login as customer
      await auth.use('customer').login(customer)

      session.flash('success', `Anda sekarang login sebagai ${customer.fullName}`)
      return response.redirect().toPath('/')
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'impersonate', error, { customerId }, 'high')

      session.flash('error', 'Gagal login sebagai customer')
      return response.redirect().back()
    }
  }

  /**
   * Stop impersonating and return to admin
   */
  async stopImpersonate({ auth, response, session }: HttpContext) {
    try {
      const adminId = session.get('impersonating_admin_id')

      if (!adminId) {
        session.flash('error', 'Anda tidak sedang melakukan impersonasi')
        return response.redirect().toPath('/')
      }

      // Logout from customer
      await auth.use('customer').logout()

      // Clear impersonation session data
      session.forget('impersonating_admin_id')
      session.forget('impersonating_customer_id')
      session.forget('impersonating_customer_name')

      // Re-login as admin is not needed since admin session should still be active
      // The web guard session is separate from customer guard

      session.flash('success', 'Impersonasi dihentikan')
      return response.redirect().toRoute('admin.customers.index')
    } catch (error) {
      session.flash('error', 'Gagal menghentikan impersonasi')
      return response.redirect().toPath('/')
    }
  }
}
