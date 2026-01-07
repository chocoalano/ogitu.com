<script setup lang="ts">
import { computed } from 'vue'
import AdminLayout from '~/layouts/admin.vue'
import {
  DashboardStatsCards,
  DashboardQuickActions,
  DashboardRecentOrders,
  DashboardTipsCard,
  DashboardProductCategories,
  DashboardHealthWidget,
  DashboardQueueWidget,
} from '~/components/admin'

defineOptions({
  layout: AdminLayout,
})

// Props from server - matching what controller sends
interface AdminDashboardProps {
  user?: {
    id: number
    fullName: string
    email: string
    role: string
  }
  stats?: {
    totalProducts: number
    totalOrders: number
    totalCustomers: number
    totalCategories: number
    pendingReviews: number
    monthlyRevenue: number
    ordersByStatus: Record<string, number>
  }
  recentOrders?: {
    id: number
    orderNumber: string
    customerName: string
    total: number
    status: string
    createdAt: string
  }[]
}

const props = withDefaults(defineProps<AdminDashboardProps>(), {
  user: () => ({
    id: 0,
    fullName: 'Admin',
    email: '',
    role: 'admin',
  }),
  stats: () => ({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalCategories: 0,
    pendingReviews: 0,
    monthlyRevenue: 0,
    ordersByStatus: {},
  }),
  recentOrders: () => [],
})

// Check if user is superadmin
const isSuperAdmin = computed(() => props.user.role === 'superadmin')

// Transform stats for DashboardStatsCards component
const dashboardStats = computed(() => ({
  totalProducts: props.stats.totalProducts,
  activeProducts: props.stats.totalProducts,
  draftProducts: 0,
  outOfStockProducts: 0,
  totalOrders: props.stats.totalOrders,
  pendingOrders: props.stats.ordersByStatus?.pending || 0,
  processingOrders: props.stats.ordersByStatus?.processing || 0,
  shippedOrders: props.stats.ordersByStatus?.shipped || 0,
  deliveredOrders: props.stats.ordersByStatus?.delivered || 0,
  cancelledOrders: props.stats.ordersByStatus?.cancelled || 0,
  totalRevenue: props.stats.monthlyRevenue,
  monthlyRevenue: props.stats.monthlyRevenue,
  weeklyRevenue: 0,
  todayRevenue: 0,
}))

// Transform recentOrders for DashboardRecentOrders component
const recentOrdersTransformed = computed(() =>
  props.recentOrders.map((order) => ({
    ...order,
    customerAvatar: null as string | null,
    itemCount: 1,
  }))
)
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Selamat datang kembali, {{ props.user.fullName }}
        </p>
      </div>
    </div>

    <!-- Stats Cards -->
    <DashboardStatsCards :stats="dashboardStats" />

    <!-- Quick Actions -->
    <DashboardQuickActions />

    <!-- Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column - Recent Orders -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Recent Orders -->
        <DashboardRecentOrders :orders="recentOrdersTransformed" />
      </div>

      <!-- Right Column - System Info & Tips -->
      <div class="space-y-6">
        <!-- System Health Widget -->
        <DashboardHealthWidget />

        <!-- Queue Widget -->
        <DashboardQueueWidget :is-super-admin="isSuperAdmin" />

        <!-- Tips Card -->
        <DashboardTipsCard />

        <!-- Product Categories -->
        <DashboardProductCategories />
      </div>
    </div>
  </div>
</template>

