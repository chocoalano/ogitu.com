import type { HttpContext } from '@adonisjs/core/http'
import SettingsRepository from '#repositories/settings_repository'
import { AVAILABLE_COURIERS } from '#repositories/contracts/settings_repository_contract'

export default class SettingsController {
  private settingsRepository: SettingsRepository

  constructor() {
    this.settingsRepository = new SettingsRepository()
  }

  // =====================================
  // Address / Warehouse Routes
  // =====================================

  /**
   * Display all addresses/warehouses
   */
  async addressIndex({ inertia }: HttpContext) {
    const addresses = await this.settingsRepository.getAllAddresses()

    return inertia.render('admin/settings/address/index', {
      addresses,
    })
  }

  /**
   * Show create address form
   */
  async addressCreate({ inertia }: HttpContext) {
    const provinces = await this.settingsRepository.getProvinces()

    return inertia.render('admin/settings/address/create', {
      provinces,
    })
  }

  /**
   * Store new address
   */
  async addressStore({ request, response, session }: HttpContext) {
    const data = request.only([
      'name',
      'contactName',
      'phone',
      'addressLine1',
      'addressLine2',
      'districtId',
      'districtName',
      'cityId',
      'cityName',
      'provinceId',
      'provinceName',
      'postalCode',
      'isDefault',
    ])

    const result = await this.settingsRepository.createAddress(data)

    if (!result.success) {
      session.flash('error', result.message)
      return response.redirect().back()
    }

    session.flash('success', result.message)
    return response.redirect().toRoute('admin.settings.address.index')
  }

  /**
   * Show edit address form
   */
  async addressEdit({ params, inertia, response }: HttpContext) {
    const address = await this.settingsRepository.getAddressById(params.id)

    if (!address) {
      return response.notFound({ message: 'Alamat tidak ditemukan' })
    }

    const provinces = await this.settingsRepository.getProvinces()
    const cities = await this.settingsRepository.getCities(address.provinceId)
    const districts = await this.settingsRepository.getDistricts(address.cityId)

    return inertia.render('admin/settings/address/edit', {
      address,
      provinces,
      cities,
      districts,
    })
  }

  /**
   * Update address
   */
  async addressUpdate({ params, request, response, session }: HttpContext) {
    const data = request.only([
      'name',
      'contactName',
      'phone',
      'addressLine1',
      'addressLine2',
      'districtId',
      'districtName',
      'cityId',
      'cityName',
      'provinceId',
      'provinceName',
      'postalCode',
      'isDefault',
    ])

    const result = await this.settingsRepository.updateAddress(params.id, data)

    if (!result.success) {
      session.flash('error', result.message)
      return response.redirect().back()
    }

    session.flash('success', result.message)
    return response.redirect().toRoute('admin.settings.address.index')
  }

  /**
   * Delete address
   */
  async addressDestroy({ params, response, session }: HttpContext) {
    const result = await this.settingsRepository.deleteAddress(params.id)

    if (!result.success) {
      session.flash('error', result.message)
      return response.redirect().back()
    }

    session.flash('success', result.message)
    return response.redirect().toRoute('admin.settings.address.index')
  }

  /**
   * Set address as default
   */
  async addressSetDefault({ params, response, session }: HttpContext) {
    const result = await this.settingsRepository.setDefaultAddress(params.id)

    if (!result.success) {
      session.flash('error', result.message)
    } else {
      session.flash('success', result.message)
    }

    return response.redirect().back()
  }

  /**
   * Toggle address active status
   */
  async addressToggleActive({ params, response, session }: HttpContext) {
    const result = await this.settingsRepository.toggleAddressActive(params.id)

    if (!result.success) {
      session.flash('error', result.message)
    } else {
      session.flash('success', result.message)
    }

    return response.redirect().back()
  }

  // =====================================
  // Shipping / Courier Routes
  // =====================================

  /**
   * Display shipping settings
   */
  async shippingIndex({ inertia }: HttpContext) {
    const couriers = await this.settingsRepository.getAllCouriers()
    const defaultAddress = await this.settingsRepository.getDefaultAddress()

    return inertia.render('admin/settings/shipping/index', {
      couriers,
      availableCouriers: AVAILABLE_COURIERS,
      defaultAddress,
    })
  }

  /**
   * Add/enable a courier
   */
  async shippingAddCourier({ request, response, session }: HttpContext) {
    const data = request.only(['code', 'name', 'logo', 'description', 'services'])

    // Parse services if it's a string
    if (typeof data.services === 'string') {
      try {
        data.services = JSON.parse(data.services)
      } catch {
        data.services = []
      }
    }

    const result = await this.settingsRepository.createCourier(data)

    if (!result.success) {
      session.flash('error', result.message)
    } else {
      session.flash('success', result.message)
    }

    return response.redirect().back()
  }

  /**
   * Update courier settings
   */
  async shippingUpdateCourier({ params, request, response, session }: HttpContext) {
    const data = request.only(['name', 'description', 'services', 'isActive'])

    // Parse services if it's a string
    if (typeof data.services === 'string') {
      try {
        data.services = JSON.parse(data.services)
      } catch {
        data.services = []
      }
    }

    const result = await this.settingsRepository.updateCourier(params.id, data)

    if (!result.success) {
      session.flash('error', result.message)
    } else {
      session.flash('success', result.message)
    }

    return response.redirect().back()
  }

  /**
   * Remove courier
   */
  async shippingRemoveCourier({ params, response, session }: HttpContext) {
    const result = await this.settingsRepository.deleteCourier(params.id)

    if (!result.success) {
      session.flash('error', result.message)
    } else {
      session.flash('success', result.message)
    }

    return response.redirect().back()
  }

  /**
   * Toggle courier active status
   */
  async shippingToggleCourier({ params, response, session }: HttpContext) {
    const result = await this.settingsRepository.toggleCourierActive(params.id)

    if (!result.success) {
      session.flash('error', result.message)
    } else {
      session.flash('success', result.message)
    }

    return response.redirect().back()
  }

  /**
   * Reorder couriers
   */
  async shippingReorderCouriers({ request, response }: HttpContext) {
    const { orderedIds } = request.only(['orderedIds'])
    const result = await this.settingsRepository.reorderCouriers(orderedIds || [])

    return response.json(result)
  }

  // =====================================
  // Notification Settings Routes
  // =====================================

  /**
   * Display notification settings
   */
  async notificationsIndex({ inertia }: HttpContext) {
    // Initialize default notifications if empty
    const allSettings = await this.settingsRepository.getAllNotificationSettings()

    if (allSettings.length === 0) {
      await this.settingsRepository.initializeDefaultNotifications()
    }

    const settings = await this.settingsRepository.getAllNotificationSettings()

    // Group by event group
    const groupedSettings = {
      orders: settings.filter((s) => s.eventGroup === 'orders'),
      payments: settings.filter((s) => s.eventGroup === 'payments'),
      promotions: settings.filter((s) => s.eventGroup === 'promotions'),
      system: settings.filter((s) => s.eventGroup === 'system'),
    }

    return inertia.render('admin/settings/notifications/index', {
      settings: groupedSettings,
    })
  }

  /**
   * Update notification setting
   */
  async notificationsUpdate({ params, request, response, session }: HttpContext) {
    const data = request.only(['emailEnabled', 'pushEnabled', 'whatsappEnabled'])

    const result = await this.settingsRepository.updateNotificationSetting(params.id, data)

    if (!result.success) {
      session.flash('error', result.message)
    } else {
      session.flash('success', result.message)
    }

    return response.redirect().back()
  }

  /**
   * Bulk update notification settings
   */
  async notificationsBulkUpdate({ request, response }: HttpContext) {
    const { updates } = request.only(['updates'])

    const results = []
    for (const update of updates || []) {
      const result = await this.settingsRepository.updateNotificationSetting(update.id, {
        emailEnabled: update.emailEnabled,
        pushEnabled: update.pushEnabled,
        whatsappEnabled: update.whatsappEnabled,
      })
      results.push(result)
    }

    const allSuccess = results.every((r) => r.success)
    return response.json({
      success: allSuccess,
      message: allSuccess
        ? 'Semua pengaturan berhasil diperbarui'
        : 'Beberapa pengaturan gagal diperbarui',
    })
  }

  // =====================================
  // Location API Routes
  // =====================================

  /**
   * Get provinces
   */
  async getProvinces({ response }: HttpContext) {
    const provinces = await this.settingsRepository.getProvinces()
    return response.json({ data: provinces })
  }

  /**
   * Get cities by province
   */
  async getCities({ params, response }: HttpContext) {
    const cities = await this.settingsRepository.getCities(params.provinceId)
    return response.json({ data: cities })
  }

  /**
   * Get districts by city
   */
  async getDistricts({ params, response }: HttpContext) {
    const districts = await this.settingsRepository.getDistricts(params.cityId)
    return response.json({ data: districts })
  }
}
