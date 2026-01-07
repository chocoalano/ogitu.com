import StoreAddress from '#models/store_address'
import ShippingCourier from '#models/shipping_courier'
import type { CourierService } from '#models/shipping_courier'
import NotificationSetting from '#models/notification_setting'
import type { NotificationEventGroup } from '#models/notification_setting'
import RajaOngkirService from '#services/rajaongkir_service'
import type {
  SettingsRepositoryContract,
  StoreAddressData,
  StoreAddressInput,
  ShippingCourierData,
  ShippingCourierInput,
  NotificationSettingData,
  NotificationSettingUpdateInput,
  SettingsOperationResult,
  Province,
  City,
  District,
} from './contracts/settings_repository_contract.js'

export default class SettingsRepository implements SettingsRepositoryContract {
  private rajaOngkirService: RajaOngkirService

  constructor() {
    this.rajaOngkirService = new RajaOngkirService()
  }

  // =====================================
  // Store Address Methods
  // =====================================

  /**
   * Get all store addresses
   */
  async getAllAddresses(): Promise<StoreAddressData[]> {
    const addresses = await StoreAddress.query().orderBy('isDefault', 'desc').orderBy('name', 'asc')

    return addresses.map((addr) => this.transformAddress(addr))
  }

  /**
   * Get address by ID
   */
  async getAddressById(id: number): Promise<StoreAddressData | null> {
    const address = await StoreAddress.find(id)
    return address ? this.transformAddress(address) : null
  }

  /**
   * Get default address
   */
  async getDefaultAddress(): Promise<StoreAddressData | null> {
    const address = await StoreAddress.query()
      .where('isDefault', true)
      .where('isActive', true)
      .first()
    return address ? this.transformAddress(address) : null
  }

  /**
   * Create new address
   */
  async createAddress(input: StoreAddressInput): Promise<SettingsOperationResult> {
    try {
      // If this is set as default, unset other defaults
      if (input.isDefault) {
        await StoreAddress.query().update({ isDefault: false })
      }

      const address = await StoreAddress.create({
        name: input.name,
        contactName: input.contactName,
        phone: input.phone,
        addressLine1: input.addressLine1,
        addressLine2: input.addressLine2 || null,
        districtId: input.districtId,
        districtName: input.districtName,
        cityId: input.cityId,
        cityName: input.cityName,
        provinceId: input.provinceId,
        provinceName: input.provinceName,
        postalCode: input.postalCode,
        country: 'Indonesia',
        isDefault: input.isDefault ?? false,
        isActive: input.isActive ?? true,
      })

      return {
        success: true,
        message: 'Alamat berhasil ditambahkan',
        data: this.transformAddress(address),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal menambahkan alamat: ' + (error as Error).message,
      }
    }
  }

  /**
   * Update address
   */
  async updateAddress(
    id: number,
    input: Partial<StoreAddressInput>
  ): Promise<SettingsOperationResult> {
    try {
      const address = await StoreAddress.find(id)
      if (!address) {
        return { success: false, message: 'Alamat tidak ditemukan' }
      }

      // If setting as default, unset other defaults
      if (input.isDefault) {
        await StoreAddress.query().where('id', '!=', id).update({ isDefault: false })
      }

      address.merge(input as any)
      await address.save()

      return {
        success: true,
        message: 'Alamat berhasil diperbarui',
        data: this.transformAddress(address),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal memperbarui alamat: ' + (error as Error).message,
      }
    }
  }

  /**
   * Delete address
   */
  async deleteAddress(id: number): Promise<SettingsOperationResult> {
    try {
      const address = await StoreAddress.find(id)
      if (!address) {
        return { success: false, message: 'Alamat tidak ditemukan' }
      }

      // Check if it's the only address
      const count = await StoreAddress.query().count('* as total')
      if (Number(count[0].$extras.total) <= 1) {
        return { success: false, message: 'Tidak dapat menghapus alamat terakhir' }
      }

      // If deleting default, set another as default
      if (address.isDefault) {
        const another = await StoreAddress.query().where('id', '!=', id).first()
        if (another) {
          another.isDefault = true
          await another.save()
        }
      }

      await address.delete()

      return { success: true, message: 'Alamat berhasil dihapus' }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal menghapus alamat: ' + (error as Error).message,
      }
    }
  }

  /**
   * Set address as default
   */
  async setDefaultAddress(id: number): Promise<SettingsOperationResult> {
    try {
      const address = await StoreAddress.find(id)
      if (!address) {
        return { success: false, message: 'Alamat tidak ditemukan' }
      }

      // Unset all defaults
      await StoreAddress.query().update({ isDefault: false })

      // Set this as default
      address.isDefault = true
      await address.save()

      return {
        success: true,
        message: 'Alamat default berhasil diubah',
        data: this.transformAddress(address),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal mengubah alamat default: ' + (error as Error).message,
      }
    }
  }

  /**
   * Toggle address active status
   */
  async toggleAddressActive(id: number): Promise<SettingsOperationResult> {
    try {
      const address = await StoreAddress.find(id)
      if (!address) {
        return { success: false, message: 'Alamat tidak ditemukan' }
      }

      // Can't deactivate default address
      if (address.isDefault && address.isActive) {
        return { success: false, message: 'Tidak dapat menonaktifkan alamat default' }
      }

      address.isActive = !address.isActive
      await address.save()

      return {
        success: true,
        message: address.isActive ? 'Alamat diaktifkan' : 'Alamat dinonaktifkan',
        data: this.transformAddress(address),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal mengubah status alamat: ' + (error as Error).message,
      }
    }
  }

  /**
   * Transform address model to data object
   */
  private transformAddress(address: StoreAddress): StoreAddressData {
    return {
      id: address.id,
      name: address.name,
      contactName: address.contactName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2,
      districtId: address.districtId,
      districtName: address.districtName,
      cityId: address.cityId,
      cityName: address.cityName,
      provinceId: address.provinceId,
      provinceName: address.provinceName,
      postalCode: address.postalCode,
      country: address.country,
      isDefault: address.isDefault,
      isActive: address.isActive,
      fullAddress: address.fullAddress,
      createdAt: address.createdAt?.toISO() || null,
      updatedAt: address.updatedAt?.toISO() || null,
    }
  }

  // =====================================
  // Shipping Courier Methods
  // =====================================

  /**
   * Get all couriers
   */
  async getAllCouriers(): Promise<ShippingCourierData[]> {
    const couriers = await ShippingCourier.query()
      .orderBy('sortOrder', 'asc')
      .orderBy('name', 'asc')
    return couriers.map((c) => this.transformCourier(c))
  }

  /**
   * Get active couriers only
   */
  async getActiveCouriers(): Promise<ShippingCourierData[]> {
    const couriers = await ShippingCourier.query()
      .where('isActive', true)
      .orderBy('sortOrder', 'asc')
      .orderBy('name', 'asc')
    return couriers.map((c) => this.transformCourier(c))
  }

  /**
   * Get courier by ID
   */
  async getCourierById(id: number): Promise<ShippingCourierData | null> {
    const courier = await ShippingCourier.find(id)
    return courier ? this.transformCourier(courier) : null
  }

  /**
   * Create new courier
   */
  async createCourier(input: ShippingCourierInput): Promise<SettingsOperationResult> {
    try {
      // Check if courier code already exists
      const existing = await ShippingCourier.findBy('code', input.code)
      if (existing) {
        return { success: false, message: 'Kode kurir sudah digunakan' }
      }

      const courier = await ShippingCourier.create({
        code: input.code,
        name: input.name,
        logo: input.logo || null,
        description: input.description || null,
        services: input.services || [],
        isActive: input.isActive ?? true,
        sortOrder: input.sortOrder ?? 0,
      })

      return {
        success: true,
        message: 'Kurir berhasil ditambahkan',
        data: this.transformCourier(courier),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal menambahkan kurir: ' + (error as Error).message,
      }
    }
  }

  /**
   * Update courier
   */
  async updateCourier(
    id: number,
    input: Partial<ShippingCourierInput>
  ): Promise<SettingsOperationResult> {
    try {
      const courier = await ShippingCourier.find(id)
      if (!courier) {
        return { success: false, message: 'Kurir tidak ditemukan' }
      }

      // Check if changing code to existing one
      if (input.code && input.code !== courier.code) {
        const existing = await ShippingCourier.findBy('code', input.code)
        if (existing) {
          return { success: false, message: 'Kode kurir sudah digunakan' }
        }
      }

      courier.merge(input as any)
      await courier.save()

      return {
        success: true,
        message: 'Kurir berhasil diperbarui',
        data: this.transformCourier(courier),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal memperbarui kurir: ' + (error as Error).message,
      }
    }
  }

  /**
   * Delete courier
   */
  async deleteCourier(id: number): Promise<SettingsOperationResult> {
    try {
      const courier = await ShippingCourier.find(id)
      if (!courier) {
        return { success: false, message: 'Kurir tidak ditemukan' }
      }

      await courier.delete()

      return { success: true, message: 'Kurir berhasil dihapus' }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal menghapus kurir: ' + (error as Error).message,
      }
    }
  }

  /**
   * Toggle courier active status
   */
  async toggleCourierActive(id: number): Promise<SettingsOperationResult> {
    try {
      const courier = await ShippingCourier.find(id)
      if (!courier) {
        return { success: false, message: 'Kurir tidak ditemukan' }
      }

      courier.isActive = !courier.isActive
      await courier.save()

      return {
        success: true,
        message: courier.isActive ? 'Kurir diaktifkan' : 'Kurir dinonaktifkan',
        data: this.transformCourier(courier),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal mengubah status kurir: ' + (error as Error).message,
      }
    }
  }

  /**
   * Update courier services
   */
  async updateCourierServices(
    id: number,
    services: CourierService[]
  ): Promise<SettingsOperationResult> {
    try {
      const courier = await ShippingCourier.find(id)
      if (!courier) {
        return { success: false, message: 'Kurir tidak ditemukan' }
      }

      courier.services = services
      await courier.save()

      return {
        success: true,
        message: 'Layanan kurir berhasil diperbarui',
        data: this.transformCourier(courier),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal memperbarui layanan kurir: ' + (error as Error).message,
      }
    }
  }

  /**
   * Reorder couriers
   */
  async reorderCouriers(orderedIds: number[]): Promise<SettingsOperationResult> {
    try {
      for (const [i, orderedId] of orderedIds.entries()) {
        await ShippingCourier.query().where('id', orderedId).update({ sortOrder: i })
      }

      return { success: true, message: 'Urutan kurir berhasil diperbarui' }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal memperbarui urutan kurir: ' + (error as Error).message,
      }
    }
  }

  /**
   * Transform courier model to data object
   */
  private transformCourier(courier: ShippingCourier): ShippingCourierData {
    return {
      id: courier.id,
      code: courier.code,
      name: courier.name,
      logo: courier.logo,
      description: courier.description,
      services: courier.services || [],
      isActive: courier.isActive,
      sortOrder: courier.sortOrder,
      createdAt: courier.createdAt?.toISO() || null,
      updatedAt: courier.updatedAt?.toISO() || null,
    }
  }

  // =====================================
  // Notification Settings Methods
  // =====================================

  /**
   * Get all notification settings
   */
  async getAllNotificationSettings(): Promise<NotificationSettingData[]> {
    const settings = await NotificationSetting.query()
      .orderBy('eventGroup', 'asc')
      .orderBy('eventName', 'asc')
    return settings.map((s) => this.transformNotificationSetting(s))
  }

  /**
   * Get notification settings by group
   */
  async getNotificationSettingsByGroup(
    group: NotificationEventGroup
  ): Promise<NotificationSettingData[]> {
    const settings = await NotificationSetting.query()
      .where('eventGroup', group)
      .orderBy('eventName', 'asc')
    return settings.map((s) => this.transformNotificationSetting(s))
  }

  /**
   * Get notification setting by ID
   */
  async getNotificationSettingById(id: number): Promise<NotificationSettingData | null> {
    const setting = await NotificationSetting.find(id)
    return setting ? this.transformNotificationSetting(setting) : null
  }

  /**
   * Update notification setting
   */
  async updateNotificationSetting(
    id: number,
    input: NotificationSettingUpdateInput
  ): Promise<SettingsOperationResult> {
    try {
      const setting = await NotificationSetting.find(id)
      if (!setting) {
        return { success: false, message: 'Pengaturan notifikasi tidak ditemukan' }
      }

      if (input.emailEnabled !== undefined) setting.emailEnabled = input.emailEnabled
      if (input.pushEnabled !== undefined) setting.pushEnabled = input.pushEnabled
      if (input.whatsappEnabled !== undefined) setting.whatsappEnabled = input.whatsappEnabled

      await setting.save()

      return {
        success: true,
        message: 'Pengaturan notifikasi berhasil diperbarui',
        data: this.transformNotificationSetting(setting),
      }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal memperbarui pengaturan notifikasi: ' + (error as Error).message,
      }
    }
  }

  /**
   * Initialize default notification events
   */
  async initializeDefaultNotifications(): Promise<SettingsOperationResult> {
    try {
      const { DEFAULT_NOTIFICATION_EVENTS } =
        await import('./contracts/settings_repository_contract.js')

      for (const event of DEFAULT_NOTIFICATION_EVENTS) {
        const existing = await NotificationSetting.findBy('eventKey', event.eventKey)
        if (!existing) {
          await NotificationSetting.create({
            eventKey: event.eventKey,
            eventName: event.eventName,
            eventGroup: event.eventGroup,
            description: event.description,
            emailEnabled: true,
            pushEnabled: true,
            whatsappEnabled: false,
          })
        }
      }

      return { success: true, message: 'Pengaturan notifikasi default berhasil dibuat' }
    } catch (error) {
      return {
        success: false,
        message: 'Gagal membuat pengaturan notifikasi default: ' + (error as Error).message,
      }
    }
  }

  /**
   * Transform notification setting model to data object
   */
  private transformNotificationSetting(setting: NotificationSetting): NotificationSettingData {
    return {
      id: setting.id,
      eventKey: setting.eventKey,
      eventName: setting.eventName,
      eventGroup: setting.eventGroup,
      description: setting.description,
      emailEnabled: setting.emailEnabled,
      pushEnabled: setting.pushEnabled,
      whatsappEnabled: setting.whatsappEnabled,
      emailTemplate: setting.emailTemplate,
      whatsappTemplate: setting.whatsappTemplate,
      createdAt: setting.createdAt?.toISO() || null,
      updatedAt: setting.updatedAt?.toISO() || null,
    }
  }

  // =====================================
  // Location API Methods
  // =====================================

  /**
   * Get provinces from RajaOngkir
   */
  async getProvinces(): Promise<Province[]> {
    const provinces = await this.rajaOngkirService.getProvinces()
    return provinces.map((p: any) => ({
      province_id: p.province_id || p.id,
      province: p.province || p.name,
    }))
  }

  /**
   * Get cities by province from RajaOngkir
   */
  async getCities(provinceId: string): Promise<City[]> {
    const cities = await this.rajaOngkirService.getCities(provinceId)
    return cities.map((c: any) => ({
      city_id: c.city_id || c.id,
      city_name: c.city_name || c.name,
      type: c.type || 'Kota',
      province_id: c.province_id || provinceId,
      postal_code: c.postal_code || '',
    }))
  }

  /**
   * Get districts by city from RajaOngkir
   */
  async getDistricts(cityId: string): Promise<District[]> {
    const districts = await this.rajaOngkirService.getSubdistricts(cityId)
    return districts.map((d: any) => ({
      district_id: d.district_id || d.subdistrict_id || d.id,
      district_name: d.district_name || d.subdistrict_name || d.name,
      city_id: d.city_id || cityId,
    }))
  }
}
