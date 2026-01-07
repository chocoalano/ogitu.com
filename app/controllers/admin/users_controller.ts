import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import BugReportService from '#services/bug_report_service'
import { createUserValidator, updateUserValidator } from '#validators/user'
import hash from '@adonisjs/core/services/hash'

export default class UsersController {
  private moduleName = 'UsersController'

  private async reportAdmin(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    action: string,
    error: unknown,
    context?: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity)
  }

  /**
   * Display a list of users
   */
  async index({ inertia, request, auth, session }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const search = request.input('search', '')
    const role = request.input('role', '')

    try {
      let query = User.query().orderBy('createdAt', 'desc')

      if (search) {
        query = query.where((q) => {
          q.where('fullName', 'LIKE', `%${search}%`).orWhere('email', 'LIKE', `%${search}%`)
        })
      }

      if (role) {
        query = query.where('role', role)
      }

      const users = await query.paginate(page, perPage)

      return inertia.render('admin/users/index', {
        users: users.serialize(),
        filters: { search, role },
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'index',
        error,
        { page, perPage, search, role },
        'medium'
      )

      session.flash('error', 'Gagal memuat data pengguna')

      return inertia.render('admin/users/index', {
        users: { data: [], meta: {}, links: {} },
        filters: { search, role },
      })
    }
  }

  /**
   * Display create user form
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('admin/users/create')
  }

  /**
   * Store a new user
   */
  async store({ request, response, auth, session }: HttpContext) {
    try {
      const data = await request.validateUsing(createUserValidator)

      // Check if email already exists
      const existingUser = await User.findBy('email', data.email)
      if (existingUser) {
        session.flash('error', 'Email sudah digunakan')
        return response.redirect().back()
      }

      await User.create({
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
      })

      session.flash('success', 'Pengguna berhasil ditambahkan')
      return response.redirect().toRoute('admin.users.index')
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'store', error, {}, 'high')

      if (error.messages) {
        session.flash('errors', error.messages)
      } else {
        session.flash('error', 'Gagal menambahkan pengguna')
      }
      return response.redirect().back()
    }
  }

  /**
   * Display a single user
   */
  async show({ params, inertia, request, auth, response, session }: HttpContext) {
    const userId = params.id

    try {
      const user = await User.findOrFail(userId)

      return inertia.render('admin/users/show', {
        user: user.serialize(),
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'show', error, { userId }, 'high')

      session.flash('error', 'Pengguna tidak ditemukan')
      return response.redirect().toRoute('admin.users.index')
    }
  }

  /**
   * Display edit user form
   */
  async edit({ params, inertia, request, auth, response, session }: HttpContext) {
    const userId = params.id

    try {
      const user = await User.findOrFail(userId)

      return inertia.render('admin/users/edit', {
        user: user.serialize(),
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'edit', error, { userId }, 'high')

      session.flash('error', 'Pengguna tidak ditemukan')
      return response.redirect().toRoute('admin.users.index')
    }
  }

  /**
   * Update a user
   */
  async update({ params, request, response, auth, session }: HttpContext) {
    const userId = params.id

    try {
      const user = await User.findOrFail(userId)
      const data = await request.validateUsing(updateUserValidator)

      // Check if email already exists (exclude current user)
      if (data.email && data.email !== user.email) {
        const existingUser = await User.findBy('email', data.email)
        if (existingUser) {
          session.flash('error', 'Email sudah digunakan')
          return response.redirect().back()
        }
      }

      user.merge({
        fullName: data.fullName ?? user.fullName,
        email: data.email ?? user.email,
        role: data.role ?? user.role,
      })

      // Update password if provided
      if (data.password) {
        user.password = await hash.make(data.password)
      }

      await user.save()

      session.flash('success', 'Pengguna berhasil diperbarui')
      return response.redirect().toRoute('admin.users.index')
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'update', error, { userId }, 'high')

      if (error.messages) {
        session.flash('errors', error.messages)
      } else {
        session.flash('error', 'Gagal memperbarui pengguna')
      }
      return response.redirect().back()
    }
  }

  /**
   * Delete a user
   */
  async destroy({ params, request, response, auth, session }: HttpContext) {
    const userId = params.id

    try {
      const user = await User.findOrFail(userId)
      const currentUser = auth.use('web').user

      // Prevent self-deletion
      if (currentUser && currentUser.id === user.id) {
        session.flash('error', 'Tidak dapat menghapus akun sendiri')
        return response.redirect().back()
      }

      // Prevent deleting the last superadmin
      if (user.role === 'superadmin') {
        const superadminCount = await User.query().where('role', 'superadmin').count('* as total')
        if (Number(superadminCount[0].$extras.total) <= 1) {
          session.flash('error', 'Tidak dapat menghapus superadmin terakhir')
          return response.redirect().back()
        }
      }

      await user.delete()

      session.flash('success', 'Pengguna berhasil dihapus')
      return response.redirect().toRoute('admin.users.index')
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'destroy', error, { userId }, 'high')

      session.flash('error', 'Gagal menghapus pengguna')
      return response.redirect().back()
    }
  }
}
