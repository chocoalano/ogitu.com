import type { CourierService } from '#models/shipping_courier'
import type { NotificationEventGroup } from '#models/notification_setting'

// =====================================
// Store Address Types
// =====================================

export interface StoreAddressData {
  id: number
  name: string
  contactName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  districtId: string
  districtName: string
  cityId: string
  cityName: string
  provinceId: string
  provinceName: string
  postalCode: string
  country: string
  isDefault: boolean
  isActive: boolean
  fullAddress: string
  createdAt: string | null
  updatedAt: string | null
}

export interface StoreAddressInput {
  name: string
  contactName: string
  phone: string
  addressLine1: string
  addressLine2?: string | null
  districtId: string
  districtName: string
  cityId: string
  cityName: string
  provinceId: string
  provinceName: string
  postalCode: string
  isDefault?: boolean
  isActive?: boolean
}

// =====================================
// Shipping Courier Types
// =====================================

export interface ShippingCourierData {
  id: number
  code: string
  name: string
  logo: string | null
  description: string | null
  services: CourierService[]
  isActive: boolean
  sortOrder: number
  createdAt: string | null
  updatedAt: string | null
}

export interface ShippingCourierInput {
  code: string
  name: string
  logo?: string | null
  description?: string | null
  services?: CourierService[]
  isActive?: boolean
  sortOrder?: number
}

// =====================================
// Notification Setting Types
// =====================================

export interface NotificationSettingData {
  id: number
  eventKey: string
  eventName: string
  eventGroup: NotificationEventGroup
  description: string | null
  emailEnabled: boolean
  pushEnabled: boolean
  whatsappEnabled: boolean
  emailTemplate: string | null
  whatsappTemplate: string | null
  createdAt: string | null
  updatedAt: string | null
}

export interface NotificationSettingInput {
  eventKey: string
  eventName: string
  eventGroup: NotificationEventGroup
  description?: string | null
  emailEnabled?: boolean
  pushEnabled?: boolean
  whatsappEnabled?: boolean
  emailTemplate?: string | null
  whatsappTemplate?: string | null
}

export interface NotificationSettingUpdateInput {
  emailEnabled?: boolean
  pushEnabled?: boolean
  whatsappEnabled?: boolean
}

// =====================================
// Location Types (RajaOngkir)
// =====================================

export interface Province {
  province_id: string
  province: string
}

export interface City {
  city_id: string
  city_name: string
  type: string
  province_id: string
  postal_code: string
}

export interface District {
  district_id: string
  district_name: string
  city_id: string
}

// =====================================
// Available Couriers
// =====================================

export interface AvailableCourier {
  code: string
  name: string
  logo: string
  services: { code: string; name: string }[]
}

export const AVAILABLE_COURIERS: AvailableCourier[] = [
  {
    code: 'jne',
    name: 'JNE Express',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/99/JNE_logo.png',
    services: [
      { code: 'REG', name: 'JNE Reguler' },
      { code: 'YES', name: 'JNE YES (Yakin Esok Sampai)' },
      { code: 'OKE', name: 'JNE OKE (Ongkos Kirim Ekonomis)' },
    ],
  },
  {
    code: 'jnt',
    name: 'J&T Express',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/J%26T_Express_logo.png',
    services: [
      { code: 'EZ', name: 'J&T EZ (Ekonomis)' },
      { code: 'JSD', name: 'J&T JSD (Same Day)' },
    ],
  },
  {
    code: 'sicepat',
    name: 'SiCepat',
    logo: 'https://www.sicepat.com/img/logo.png',
    services: [
      { code: 'REG', name: 'SiCepat REG (Reguler)' },
      { code: 'BEST', name: 'SiCepat BEST (Besok Sampai Tujuan)' },
      { code: 'CARGO', name: 'SiCepat Cargo' },
    ],
  },
  {
    code: 'anteraja',
    name: 'AnterAja',
    logo: 'https://anteraja.id/images/logo.png',
    services: [
      { code: 'REG', name: 'AnterAja Reguler' },
      { code: 'ND', name: 'AnterAja Next Day' },
      { code: 'SD', name: 'AnterAja Same Day' },
    ],
  },
  {
    code: 'ninja',
    name: 'Ninja Xpress',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Ninja_Van_logo.svg/320px-Ninja_Van_logo.svg.png',
    services: [
      { code: 'REG', name: 'Ninja Standard' },
      { code: 'ND', name: 'Ninja Next Day' },
    ],
  },
  {
    code: 'pos',
    name: 'POS Indonesia',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9e/Pos_Indonesia_logo.png',
    services: [
      { code: 'REG', name: 'Pos Reguler' },
      { code: 'EXPRESS', name: 'Pos Express' },
    ],
  },
  {
    code: 'tiki',
    name: 'TIKI',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Logo_TIKI.png',
    services: [
      { code: 'REG', name: 'TIKI Reguler' },
      { code: 'ONS', name: 'TIKI ONS (Over Night Service)' },
      { code: 'ECO', name: 'TIKI Ekonomi' },
    ],
  },
]

// =====================================
// Default Notification Events
// =====================================

export interface DefaultNotificationEvent {
  eventKey: string
  eventName: string
  eventGroup: NotificationEventGroup
  description: string
}

export const DEFAULT_NOTIFICATION_EVENTS: DefaultNotificationEvent[] = [
  // Orders
  {
    eventKey: 'order_placed',
    eventName: 'Pesanan Baru',
    eventGroup: 'orders',
    description: 'Notifikasi ketika ada pesanan baru masuk',
  },
  {
    eventKey: 'order_paid',
    eventName: 'Pembayaran Diterima',
    eventGroup: 'orders',
    description: 'Notifikasi ketika pembayaran pesanan berhasil',
  },
  {
    eventKey: 'order_processing',
    eventName: 'Pesanan Diproses',
    eventGroup: 'orders',
    description: 'Notifikasi ketika pesanan mulai diproses',
  },
  {
    eventKey: 'order_shipped',
    eventName: 'Pesanan Dikirim',
    eventGroup: 'orders',
    description: 'Notifikasi ketika pesanan sudah dikirim',
  },
  {
    eventKey: 'order_delivered',
    eventName: 'Pesanan Sampai',
    eventGroup: 'orders',
    description: 'Notifikasi ketika pesanan sudah sampai tujuan',
  },
  {
    eventKey: 'order_cancelled',
    eventName: 'Pesanan Dibatalkan',
    eventGroup: 'orders',
    description: 'Notifikasi ketika pesanan dibatalkan',
  },
  // Payments
  {
    eventKey: 'payment_pending',
    eventName: 'Menunggu Pembayaran',
    eventGroup: 'payments',
    description: 'Notifikasi reminder pembayaran',
  },
  {
    eventKey: 'payment_expired',
    eventName: 'Pembayaran Kadaluarsa',
    eventGroup: 'payments',
    description: 'Notifikasi ketika pembayaran sudah expired',
  },
  {
    eventKey: 'refund_processed',
    eventName: 'Refund Diproses',
    eventGroup: 'payments',
    description: 'Notifikasi ketika refund sedang diproses',
  },
  {
    eventKey: 'withdrawal_approved',
    eventName: 'Withdraw Disetujui',
    eventGroup: 'payments',
    description: 'Notifikasi ketika permintaan withdraw disetujui',
  },
  {
    eventKey: 'withdrawal_rejected',
    eventName: 'Withdraw Ditolak',
    eventGroup: 'payments',
    description: 'Notifikasi ketika permintaan withdraw ditolak',
  },
  // Promotions
  {
    eventKey: 'flash_sale_start',
    eventName: 'Flash Sale Dimulai',
    eventGroup: 'promotions',
    description: 'Notifikasi ketika flash sale dimulai',
  },
  {
    eventKey: 'voucher_received',
    eventName: 'Voucher Diterima',
    eventGroup: 'promotions',
    description: 'Notifikasi ketika customer menerima voucher',
  },
  // System
  {
    eventKey: 'low_stock',
    eventName: 'Stok Menipis',
    eventGroup: 'system',
    description: 'Notifikasi ketika stok produk hampir habis',
  },
  {
    eventKey: 'new_review',
    eventName: 'Review Baru',
    eventGroup: 'system',
    description: 'Notifikasi ketika ada review produk baru',
  },
  {
    eventKey: 'bug_report',
    eventName: 'Laporan Bug',
    eventGroup: 'system',
    description: 'Notifikasi ketika ada laporan bug dari user',
  },
]

// =====================================
// Operation Results
// =====================================

export interface SettingsOperationResult {
  success: boolean
  message: string
  data?: any
}

// =====================================
// Repository Contract
// =====================================

export interface SettingsRepositoryContract {
  // Store Addresses
  getAllAddresses(): Promise<StoreAddressData[]>
  getAddressById(id: number): Promise<StoreAddressData | null>
  getDefaultAddress(): Promise<StoreAddressData | null>
  createAddress(input: StoreAddressInput): Promise<SettingsOperationResult>
  updateAddress(id: number, input: Partial<StoreAddressInput>): Promise<SettingsOperationResult>
  deleteAddress(id: number): Promise<SettingsOperationResult>
  setDefaultAddress(id: number): Promise<SettingsOperationResult>
  toggleAddressActive(id: number): Promise<SettingsOperationResult>

  // Shipping Couriers
  getAllCouriers(): Promise<ShippingCourierData[]>
  getActiveCouriers(): Promise<ShippingCourierData[]>
  getCourierById(id: number): Promise<ShippingCourierData | null>
  createCourier(input: ShippingCourierInput): Promise<SettingsOperationResult>
  updateCourier(id: number, input: Partial<ShippingCourierInput>): Promise<SettingsOperationResult>
  deleteCourier(id: number): Promise<SettingsOperationResult>
  toggleCourierActive(id: number): Promise<SettingsOperationResult>
  updateCourierServices(id: number, services: CourierService[]): Promise<SettingsOperationResult>
  reorderCouriers(orderedIds: number[]): Promise<SettingsOperationResult>

  // Notification Settings
  getAllNotificationSettings(): Promise<NotificationSettingData[]>
  getNotificationSettingsByGroup(group: NotificationEventGroup): Promise<NotificationSettingData[]>
  getNotificationSettingById(id: number): Promise<NotificationSettingData | null>
  updateNotificationSetting(
    id: number,
    input: NotificationSettingUpdateInput
  ): Promise<SettingsOperationResult>
  initializeDefaultNotifications(): Promise<SettingsOperationResult>

  // Location API (RajaOngkir)
  getProvinces(): Promise<Province[]>
  getCities(provinceId: string): Promise<City[]>
  getDistricts(cityId: string): Promise<District[]>
}
