import Order from '#models/order'

// =====================================
// Input/Filter Types
// =====================================

export interface OrderFilters {
  customerId: number
  status?: string
  page?: number
  perPage?: number
}

export interface PaginationMeta {
  currentPage: number
  lastPage: number
  total: number
  perPage: number
}

// =====================================
// Response Types
// =====================================

export interface OrderAddressInfo {
  recipientName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  cityName: string
  provinceName: string
  postalCode: string
}

export interface OrderItemInfo {
  id: number
  productId?: number
  productName: string
  productSku?: string
  variantName: string | null
  price: number
  quantity: number
  subtotal: number
  image: string
}

export interface OrderPaymentInfo {
  method: string
  status: string
  transactionId?: string | null
  paidAt?: string | null
  snapToken?: string | null
  snapRedirectUrl?: string | null
}

export interface OrderShippingInfo {
  courier: string
  service: string
  trackingNumber: string | null
  status: string
  shippedAt?: string | null
  deliveredAt?: string | null
}

export interface OrderTimelineItem {
  status: string
  label: string
  date: string | null
  completed: boolean
}

export interface OrderListItem {
  id: number
  orderNumber: string
  status: string
  statusLabel: string
  statusColor: string
  subtotal: number
  shippingCost: number
  discount: number
  total: number
  customerNotes: string | null
  createdAt: string
  paidAt: string | null
  shippedAt: string | null
  deliveredAt: string | null
  items: OrderItemInfo[]
  payment: OrderPaymentInfo | null
  shipping: OrderShippingInfo | null
}

export interface OrderDetail extends OrderListItem {
  tax: number
  adminFee: number
  adminNotes: string | null
  processedAt: string | null
  cancelledAt: string | null
  address: OrderAddressInfo | null
  timeline: OrderTimelineItem[]
}

export interface PaginatedOrders {
  data: OrderListItem[]
  pagination: PaginationMeta
}

// =====================================
// Operation Results
// =====================================

export interface OrderOperationResult {
  success: boolean
  message: string
  order?: Order
}

export type OrderStatus =
  | 'pending_payment'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export interface StatusOption {
  label: string
  value: string
}

// =====================================
// Repository Contract
// =====================================

export interface OrderRepositoryContract {
  /**
   * Get paginated orders for a customer with full relations
   */
  getPaginatedOrders(filters: OrderFilters): Promise<PaginatedOrders>

  /**
   * Get single order by ID for a customer
   */
  findByIdAndCustomer(orderId: number, customerId: number): Promise<Order | null>

  /**
   * Get order detail with all relations transformed
   */
  getOrderDetail(orderId: number, customerId: number): Promise<OrderDetail | null>

  /**
   * Cancel an order
   */
  cancelOrder(orderId: number, customerId: number): Promise<OrderOperationResult>

  /**
   * Confirm order received
   */
  confirmReceived(orderId: number, customerId: number): Promise<OrderOperationResult>

  /**
   * Update order status
   */
  updateStatus(order: Order, status: OrderStatus): Promise<Order>

  /**
   * Get status label
   */
  getStatusLabel(status: string): string

  /**
   * Get status color
   */
  getStatusColor(status: string): string

  /**
   * Get all status options
   */
  getStatusOptions(): StatusOption[]

  /**
   * Build order timeline
   */
  buildTimeline(order: Order): OrderTimelineItem[]

  /**
   * Transform order to list item
   */
  transformToListItem(order: Order): OrderListItem

  /**
   * Transform order to detail
   */
  transformToDetail(order: Order): OrderDetail
}
