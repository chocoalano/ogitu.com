<script setup lang="ts">
import { ref, computed } from 'vue'
import AdminLayout from '~/layouts/admin.vue'
import type {
  AdminOrder,
  Courier,
  TrackingInfo,
  ShippingFormData,
} from '~/types/admin_order'
import { getStatusBadgeColor } from '~/types/admin_order'
import { useOrderActions } from '~/composables/use_order_actions'
import { useOrderFormatters } from '~/composables/use_order_formatters'

// Components
import OrderItemsList from '~/components/admin/orders/OrderItemsList.vue'
import OrderSummary from '~/components/admin/orders/OrderSummary.vue'
import OrderTimeline from '~/components/admin/orders/OrderTimeline.vue'
import ShippingTracker from '~/components/admin/orders/ShippingTracker.vue'
import CustomerInfo from '~/components/admin/orders/CustomerInfo.vue'
import AddressInfo from '~/components/admin/orders/AddressInfo.vue'
import PaymentInfo from '~/components/admin/orders/PaymentInfo.vue'
import ShippingModal from '~/components/admin/orders/ShippingModal.vue'
import CancelModal from '~/components/admin/orders/CancelModal.vue'

defineOptions({
  layout: AdminLayout,
})

// Props
interface Props {
  admin?: {
    id: number
    storeName: string
    cityId: string
    districtId: string
  }
  order?: AdminOrder
  trackingInfo?: TrackingInfo | null
  couriers?: Courier[]
}

const props = withDefaults(defineProps<Props>(), {
  admin: () => ({ id: 0, storeName: '', cityId: '', districtId: '' }),
  order: () => ({
    id: 0,
    orderNumber: '',
    status: 'pending_payment',
    statusLabel: 'Pending',
    statusColor: 'warning',
    customer: null,
    subtotal: 0,
    shippingCost: 0,
    discount: 0,
    tax: 0,
    adminFee: 0,
    total: 0,
    customerNotes: null,
    adminNotes: null,
    itemCount: 0,
    firstItemImage: '',
    items: [],
    payment: null,
    shipping: null,
    createdAt: '',
    paidAt: null,
    processedAt: null,
    shippedAt: null,
    deliveredAt: null,
    cancelledAt: null,
  }),
  trackingInfo: null,
  couriers: () => [],
})

// Composables
const {
  isLoading,
  processOrder,
  submitShipping,
  refreshTracking,
  cancelOrder,
  reloadPage,
  copyToClipboard,
} = useOrderActions()
const { formatDate } = useOrderFormatters()

// State
const trackingData = ref<TrackingInfo | null>(props.trackingInfo)
const showShippingModal = ref(false)
const showCancelModal = ref(false)
const isSubmitting = ref(false)

// Computed states for action buttons
const canProcess = computed(() => props.order.status === 'paid')
const canShip = computed(() => ['paid', 'processing'].includes(props.order.status))
const canTrack = computed(() => props.order.status === 'shipped' && props.order.shipping?.waybill)
const canCancel = computed(() => ['pending_payment', 'paid'].includes(props.order.status))

// Timeline steps
const timelineSteps = computed(() => {
  const order = props.order
  const steps = [
    {
      label: 'Pesanan Dibuat',
      date: order.createdAt,
      completed: true,
      icon: 'i-heroicons-shopping-cart',
      color: 'primary' as const,
    },
    {
      label: 'Pembayaran',
      date: order.paidAt,
      completed: !!order.paidAt,
      icon: 'i-heroicons-credit-card',
      color: 'primary' as const,
    },
    {
      label: 'Diproses',
      date: order.processedAt,
      completed: !!order.processedAt,
      icon: 'i-heroicons-cog-6-tooth',
      color: 'primary' as const,
    },
    {
      label: 'Dikirim',
      date: order.shippedAt,
      completed: !!order.shippedAt,
      icon: 'i-heroicons-truck',
      color: 'primary' as const,
    },
    {
      label: 'Selesai',
      date: order.deliveredAt,
      completed: !!order.deliveredAt,
      icon: 'i-heroicons-check-circle',
      color: 'primary' as const,
    },
  ]

  if (order.status === 'cancelled') {
    return [
      steps[0],
      {
        label: 'Dibatalkan',
        date: order.cancelledAt,
        completed: true,
        icon: 'i-heroicons-x-circle',
        color: 'error' as const,
      },
    ]
  }

  return steps
})

// Handle process order
const handleProcessOrder = async () => {
  const success = await processOrder(props.order.id)
  if (success) {
    reloadPage()
  }
}

// Handle refresh tracking
const handleRefreshTracking = async () => {
  const data = await refreshTracking(props.order.id)
  if (data) {
    trackingData.value = data
  }
}

// Handle submit shipping
const handleSubmitShipping = async (form: ShippingFormData, isUpdate: boolean) => {
  isSubmitting.value = true
  const success = await submitShipping(props.order.id, form, isUpdate)
  if (success) {
    showShippingModal.value = false
    reloadPage()
  }
  isSubmitting.value = false
}

// Handle cancel order
const handleConfirmCancel = async (reason: string) => {
  isSubmitting.value = true
  const success = await cancelOrder(props.order.id, reason)
  if (success) {
    showCancelModal.value = false
    reloadPage()
  }
  isSubmitting.value = false
}

// Handle copy waybill
const handleCopyWaybill = (text: string) => {
  copyToClipboard(text)
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-arrow-left"
          to="/admin/orders"
        >
          Kembali
        </UButton>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            {{ order.orderNumber }}
          </h1>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ formatDate(order.createdAt) }}
          </p>
        </div>
      </div>

      <!-- Status Badge -->
      <UBadge
        :color="getStatusBadgeColor(order.statusColor)"
        variant="soft"
        size="lg"
      >
        {{ order.statusLabel }}
      </UBadge>
    </div>

    <!-- Action Buttons -->
    <div v-if="canProcess || canShip || canCancel" class="flex flex-wrap gap-3">
      <UButton
        v-if="canProcess"
        color="primary"
        icon="i-heroicons-play"
        :loading="isLoading"
        @click="handleProcessOrder"
      >
        Proses Pesanan
      </UButton>

      <UButton
        v-if="canShip"
        color="primary"
        icon="i-heroicons-truck"
        @click="showShippingModal = true"
      >
        {{ order.shipping?.waybill ? 'Update Resi' : 'Input Resi' }}
      </UButton>

      <UButton
        v-if="canTrack"
        color="neutral"
        variant="soft"
        icon="i-heroicons-arrow-path"
        :loading="isLoading"
        @click="handleRefreshTracking"
      >
        Refresh Tracking
      </UButton>

      <UButton
        v-if="canCancel"
        color="error"
        variant="ghost"
        icon="i-heroicons-x-mark"
        @click="showCancelModal = true"
      >
        Batalkan Pesanan
      </UButton>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left Column -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Order Items -->
        <OrderItemsList :items="order.items">
          <template #footer>
            <OrderSummary
              :subtotal="order.subtotal"
              :shipping-cost="order.shippingCost"
              :discount="order.discount"
              :tax="order.tax"
              :admin-fee="order.adminFee"
              :total="order.total"
            />
          </template>
        </OrderItemsList>

        <!-- Shipping Tracking -->
        <ShippingTracker
          v-if="order.shipping?.waybill"
          :shipping="order.shipping"
          :tracking="trackingData"
          :loading="isLoading"
          @refresh="handleRefreshTracking"
          @copy="handleCopyWaybill"
        />

        <!-- Customer Notes -->
        <UCard v-if="order.customerNotes">
          <template #header>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Catatan Pembeli
            </h3>
          </template>
          <p class="text-gray-600 dark:text-gray-400">
            {{ order.customerNotes }}
          </p>
        </UCard>
      </div>

      <!-- Right Column -->
      <div class="space-y-6">
        <!-- Order Timeline -->
        <OrderTimeline :steps="timelineSteps" />

        <!-- Customer Info -->
        <CustomerInfo v-if="order.customer" :customer="order.customer" />

        <!-- Shipping Address -->
        <AddressInfo v-if="order.address" :address="order.address" />

        <!-- Payment Info -->
        <PaymentInfo v-if="order.payment" :payment="order.payment" />
      </div>
    </div>

    <!-- Shipping Modal -->
    <ShippingModal
      v-model:open="showShippingModal"
      :order="order"
      :couriers="couriers"
      :loading="isSubmitting"
      @submit="handleSubmitShipping"
    />

    <!-- Cancel Modal -->
    <CancelModal
      v-model:open="showCancelModal"
      :order="order"
      :loading="isSubmitting"
      @confirm="handleConfirmCancel"
    />
  </div>
</template>
