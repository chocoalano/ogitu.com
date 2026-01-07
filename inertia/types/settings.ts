// Settings Types

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

export interface CourierService {
  code: string
  name: string
  enabled: boolean
}

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

export interface AvailableCourier {
  code: string
  name: string
  logo: string
  services: { code: string; name: string }[]
}

export interface NotificationSettingData {
  id: number
  eventKey: string
  eventName: string
  eventGroup: 'orders' | 'payments' | 'promotions' | 'system'
  description: string | null
  emailEnabled: boolean
  pushEnabled: boolean
  whatsappEnabled: boolean
  emailTemplate: string | null
  whatsappTemplate: string | null
  createdAt: string | null
  updatedAt: string | null
}

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

// Page Props
export interface AddressIndexPageProps {
  addresses: StoreAddressData[]
}

export interface AddressFormPageProps {
  address?: StoreAddressData
  provinces: Province[]
  cities?: City[]
  districts?: District[]
}

export interface ShippingIndexPageProps {
  couriers: ShippingCourierData[]
  availableCouriers: AvailableCourier[]
  defaultAddress: StoreAddressData | null
}

export interface NotificationsIndexPageProps {
  settings: {
    orders: NotificationSettingData[]
    payments: NotificationSettingData[]
    promotions: NotificationSettingData[]
    system: NotificationSettingData[]
  }
}
