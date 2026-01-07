// =====================================
// Admin Types
// =====================================

export interface AdminData {
  id: number
  name: string
  email?: string
  avatar: string | null
  role: 'admin' | 'superadmin'
  createdAt?: string
  // Store info (for compatibility with UI components)
  storeName?: string
  status?: 'active' | 'pending' | 'inactive' | 'suspended'
  rating?: number
  totalSales?: number
}

// =====================================
// Dashboard Types
// =====================================

export interface DashboardStats {
  totalProducts: number
  activeProducts: number
  draftProducts: number
  outOfStockProducts: number
  totalOrders: number
  pendingOrders: number
  processingOrders: number
  shippedOrders: number
  deliveredOrders: number
  cancelledOrders: number
  totalRevenue: number
  monthlyRevenue: number
  weeklyRevenue: number
  todayRevenue: number
}

export interface DashboardPerformanceData {
  rating: number
  totalReviews: number
  totalSales: number
  orderCompletionRate: number
  responseRate: number
  averageResponseTime: number
}

export interface RecentOrder {
  id: number
  orderNumber: string
  customerName: string
  customerAvatar: string | null
  total: number
  status: string
  itemCount: number
  createdAt: string
}

export interface TopProduct {
  id: number
  name: string
  slug: string
  image: string | null
  price: number
  discountPrice: number | null
  totalSold: number
  stock: number
  rating: number
}

export interface DashboardNotifications {
  unreadCount: number
  pendingReviews: number
  lowStockCount: number
}

export interface DashboardPageProps {
  admin?: AdminData
  stats?: DashboardStats
  performance?: DashboardPerformanceData
  recentOrders?: RecentOrder[]
  topProducts?: TopProduct[]
  notifications?: DashboardNotifications
}

// =====================================
// Menu Types
// =====================================

export interface MenuItem {
  label: string
  icon: string
  to: string
  badge?: string
  children?: { label: string; to: string }[]
}

// Menu Items Configuration
export const menuItems: MenuItem[] = [
  {
    label: 'Dashboard',
    icon: 'i-heroicons-squares-2x2',
    to: '/admin/dashboard',
  },
  {
    label: 'Kelola Pengguna',
    icon: 'i-heroicons-users',
    to: '/admin/users',
    children: [
      { label: 'Semua Pengguna', to: '/admin/users' },
      { label: 'Tambah Pengguna', to: '/admin/users/create' },
      { label: 'Semua Pelanggan', to: '/admin/customers' },
      { label: 'Tambah Pelanggan', to: '/admin/customers/create' },
    ],
  },
  {
    label: 'Katalog Produk',
    icon: 'i-heroicons-cube',
    to: '/admin/products',
    children: [
      { label: 'Semua Produk', to: '/admin/products' },
      { label: 'Tambah Produk', to: '/admin/products/create' },
      { label: 'Stok & Varian', to: '/admin/products/inventory' },
      { label: 'Kategori', to: '/admin/products/categories' },
    ],
  },
  {
    label: 'Kelola Artikel',
    icon: 'i-heroicons-document-text',
    to: '/admin/articles',
    children: [
      { label: 'Semua Artikel', to: '/admin/articles' },
      { label: 'Tambah Artikel', to: '/admin/articles/create' },
      { label: 'Draft', to: '/admin/articles?status=draft' },
      { label: 'Terpublikasi', to: '/admin/articles?status=published' },
    ],
  },
  {
    label: 'Pesanan',
    icon: 'i-heroicons-shopping-cart',
    to: '/admin/orders',
    badge: 'orderCount',
    children: [
      { label: 'Semua Pesanan', to: '/admin/orders' },
      { label: 'Perlu Diproses', to: '/admin/orders?status=paid' },
      { label: 'Dikirim', to: '/admin/orders?status=shipped' },
      { label: 'Selesai', to: '/admin/orders?status=delivered' },
    ],
  },
  {
    label: 'Promosi',
    icon: 'i-heroicons-megaphone',
    to: '/admin/promotions',
    children: [
      { label: 'Diskon Produk', to: '/admin/promotions/discounts' },
      { label: 'Voucher Toko', to: '/admin/promotions/vouchers' },
      { label: 'Flash Sale', to: '/admin/promotions/flash-sale' },
    ],
  },
  {
    label: 'Ulasan & Rating',
    icon: 'i-heroicons-star',
    to: '/admin/reviews',
  },
  {
    label: 'Notifikasi',
    icon: 'i-heroicons-bell',
    to: '/admin/notifications',
    badge: 'notificationCount',
  },
  {
    label: 'Keuangan',
    icon: 'i-heroicons-wallet',
    to: '/admin/finance',
    children: [
      { label: 'Permintaan Withdraw', to: '/admin/finance/withdraw' },
      { label: 'Riwayat Transaksi', to: '/admin/finance/transactions' },
    ],
  },
  {
    label: 'Network MLM',
    icon: 'i-heroicons-share',
    to: '/admin/network',
  },
  {
    label: 'Laporan & Analitik',
    icon: 'i-heroicons-chart-bar-square',
    to: '/admin/analytics',
    children: [
      { label: 'Statistik Penjualan', to: '/admin/analytics/sales' },
      { label: 'Performa Produk', to: '/admin/analytics/products' },
      { label: 'Laporan Keuangan', to: '/admin/analytics/finance' },
    ],
  },
  {
    label: 'Pengaturan',
    icon: 'i-heroicons-cog-8-tooth',
    to: '/admin/settings',
    children: [
      { label: 'Alamat & Gudang', to: '/admin/settings/address' },
      { label: 'Pengiriman', to: '/admin/settings/shipping' },
      { label: 'Notifikasi', to: '/admin/settings/notifications' },
    ],
  },
]

// Helper functions
export const getXsrfToken = () => {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export const isMenuActive = (item: MenuItem, currentPath: string) => {
  if (item.children) {
    return item.children.some((child) => currentPath.startsWith(child.to.split('?')[0]))
  }
  return currentPath === item.to || currentPath.startsWith(item.to + '/')
}
