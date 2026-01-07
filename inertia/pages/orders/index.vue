<script setup lang="ts">
import { Head } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'
import type { Order, StatusOption, OrderPagination, OrderFilters } from '~/types/order'
import { useOrders, useOrderActions } from '~/composables/use_orders'
import { useToast } from '~/composables/use_toast'
import { useMidtrans } from '~/composables/use_midtrans'

// Components
import {
  OrderPageHeader,
  OrderStatusTabs,
  OrderList,
  OrderPagination as OrderPaginationComponent,
} from '~/components/orders'

// Props from server
const props = defineProps<{
  orders: Order[]
  pagination: OrderPagination
  filters: OrderFilters
  statusOptions: StatusOption[]
}>()

// Composables
const toast = useToast()
const { cancelOrder, confirmReceived, payOrder, verifyPayment, isProcessing } = useOrderActions()
const { payWithSnap, isPaymentOpen } = useMidtrans()

const {
  selectedStatus,
  isLoading,
  hasPagination,
  statusOptionsWithIcons,
  filterByStatus,
  goToPage,
  refreshOrders,
} = useOrders({
  orders: props.orders,
  pagination: props.pagination,
  filters: props.filters,
  statusOptions: props.statusOptions,
})

// Handlers
const handlePay = async (order: Order) => {
  // Get snap token from backend
  const result = await payOrder(order.id)

  if (!result.success) {
    toast.error(result.message)
    return
  }

  if (!result.snapToken) {
    toast.error('Token pembayaran tidak tersedia')
    return
  }

  // Open Midtrans Snap popup
  await payWithSnap(result.snapToken, {
    onSuccess: async (midtransResult) => {
      // Verify and update payment status on backend
      const verifyResult = await verifyPayment(
        order.id,
        midtransResult?.transaction_status || 'settlement',
        midtransResult?.transaction_id
      )

      if (verifyResult.success) {
        toast.success('Pembayaran berhasil! Pesanan sedang diproses.')
      } else {
        toast.success('Pembayaran berhasil!')
      }

      refreshOrders()
    },
    onPending: async (midtransResult) => {
      // Verify pending status
      await verifyPayment(
        order.id,
        midtransResult?.transaction_status || 'pending',
        midtransResult?.transaction_id
      )

      toast.info('Menunggu pembayaran. Silakan selesaikan pembayaran Anda.')
      refreshOrders()
    },
    onError: (message) => {
      toast.error(message)
    },
    onClose: () => {
      toast.info('Pembayaran dibatalkan')
    },
  })
}

const handleConfirmReceived = async (order: Order) => {
  const confirmed = window.confirm('Konfirmasi bahwa Anda sudah menerima pesanan ini?')
  if (!confirmed) return

  const result = await confirmReceived(order.id)

  if (result.success) {
    toast.success(result.message)
    refreshOrders()
  } else {
    toast.error(result.message)
  }
}

const handleCancel = async (order: Order) => {
  const confirmed = window.confirm('Apakah Anda yakin ingin membatalkan pesanan ini?')
  if (!confirmed) return

  const result = await cancelOrder(order.id)

  if (result.success) {
    toast.success(result.message)
    refreshOrders()
  } else {
    toast.error(result.message)
  }
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Pesanan Saya - Ogitu" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Background Pattern -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <!-- Gradient Mesh -->
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />

      <!-- Grid Pattern -->
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[60px_60px]"
      />
    </div>

    <!-- Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Page Header -->
      <OrderPageHeader
        title="Pesanan Saya"
        subtitle="Kelola dan lacak pesanan vape Anda"
      />

      <!-- Status Filter Tabs -->
      <OrderStatusTabs
        :options="statusOptionsWithIcons"
        :selected="selectedStatus"
        :loading="isLoading"
        @select="filterByStatus"
      />

      <!-- Orders List -->
      <OrderList
        :orders="orders"
        :loading="isLoading || isProcessing || isPaymentOpen"
        :filtered="selectedStatus !== 'all'"
        @pay="handlePay"
        @confirm-received="handleConfirmReceived"
        @cancel="handleCancel"
      />

      <!-- Pagination -->
      <OrderPaginationComponent
        v-if="hasPagination"
        :current-page="pagination.currentPage"
        :last-page="pagination.lastPage"
        :total="pagination.total"
        :per-page="pagination.perPage"
        @change="goToPage"
      />
    </div>
  </div>
</template>
