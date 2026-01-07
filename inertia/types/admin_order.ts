// Admin Order Types - Extended types for admin dashboard

export interface AdminOrderItem {
  id: number
  productId: number
  productName: string
  productSku: string
  variantName: string | null
  price: number
  quantity: number
  subtotal: number
  image: string
}

export interface AdminOrderCustomer {
  id: number
  name: string
  email: string
  phone: string
}

export interface AdminOrderAddress {
  recipientName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  districtName: string | null
  cityName: string
  provinceName: string
  postalCode: string
  fullAddress: string
}

export interface AdminOrderShipping {
  id: number
  courierCode: string
  courierName: string
  courierService: string
  waybill: string | null
  weight: number
  shippedAt: string | null
  deliveredAt: string | null
}

export interface AdminOrderPayment {
  method: string
  status: string
  paidAt: string | null
}

export interface AdminOrder {
  id: number
  orderNumber: string
  status: string
  statusLabel: string
  statusColor: string
  customer: AdminOrderCustomer | null
  address?: AdminOrderAddress | null
  subtotal: number
  shippingCost: number
  discount: number
  tax: number
  adminFee: number
  total: number
  customerNotes: string | null
  adminNotes: string | null
  itemCount: number
  firstItemImage: string
  items: AdminOrderItem[]
  payment: AdminOrderPayment | null
  shipping: AdminOrderShipping | null
  createdAt: string
  paidAt: string | null
  processedAt: string | null
  shippedAt: string | null
  deliveredAt: string | null
  cancelledAt: string | null
}

export interface OrderStats {
  total: number
  pendingPayment: number
  paid: number
  processing: number
  shipped: number
  delivered: number
  cancelled: number
  needsAction: number
}

export interface TrackingHistory {
  date: string
  time: string
  description: string
  city: string
}

export interface TrackingInfo {
  waybill: string
  courier: {
    code: string
    name: string
  }
  status: string
  statusDescription: string
  shipper: string
  receiver: string
  origin: string
  destination: string
  history: TrackingHistory[]
}

export interface Courier {
  code: string
  name: string
}

export interface CourierService {
  value: string
  label: string
}

export interface ShippingFormData {
  courierCode: string
  courierService: string
  waybill: string
  weight: number
}

export interface StatusOption {
  value: string
  label: string
  color: string
}

export interface OrderPagination {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}

// Constants
export const COURIER_SERVICES: CourierService[] = [
  { value: 'REG', label: 'Regular' },
  { value: 'YES', label: 'Yakin Esok Sampai' },
  { value: 'OKE', label: 'Ongkos Kirim Ekonomis' },
  { value: 'JTR', label: 'JTR (J&T Cargo)' },
  { value: 'EXPRESS', label: 'Express' },
  { value: 'SAME_DAY', label: 'Same Day' },
]

// Status badge color mapping
export const STATUS_COLOR_MAP: Record<string, string> = {
  warning: 'warning',
  info: 'info',
  primary: 'primary',
  success: 'success',
  error: 'error',
  neutral: 'neutral',
}

export function getStatusBadgeColor(color: string): string {
  return STATUS_COLOR_MAP[color] || 'neutral'
}
