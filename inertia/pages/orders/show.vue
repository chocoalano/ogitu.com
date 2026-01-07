<script setup lang="ts">
import { ref } from 'vue'
import { Head, Link, router } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'
import type { Order } from '~/types/order'
import { useOrderFormatters, useOrderActions } from '~/composables/use_orders'
import { useToast } from '~/composables/use_toast'
import { useMidtrans } from '~/composables/use_midtrans'

// Components
import {
  OrderStatusBadge,
  OrderTimeline,
  OrderItemsCard,
  OrderAddressCard,
  OrderSummaryCard,
  OrderShippingCard,
  OrderDetailActions,
} from '~/components/orders'

const props = defineProps<{
  order: Order
}>()

// Composables
const toast = useToast()
const { formatDate, formatRelativeTime } = useOrderFormatters()
const { cancelOrder, confirmReceived, payOrder, verifyPayment, isProcessing } = useOrderActions()
const { payWithSnap, isPaymentOpen } = useMidtrans()

// Modal states
const showCancelModal = ref(false)
const isCancelling = ref(false)
const showConfirmReceivedModal = ref(false)
const isConfirming = ref(false)

// Handlers
const handlePay = async () => {
  // Get snap token from backend
  const result = await payOrder(props.order.id)

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
        props.order.id,
        midtransResult?.transaction_status || 'settlement',
        midtransResult?.transaction_id
      )

      if (verifyResult.success) {
        toast.success('Pembayaran berhasil! Pesanan sedang diproses.')
      } else {
        toast.success('Pembayaran berhasil!')
      }

      // Reload to show updated status
      router.reload()
    },
    onPending: async (midtransResult) => {
      // Verify pending status
      await verifyPayment(
        props.order.id,
        midtransResult?.transaction_status || 'pending',
        midtransResult?.transaction_id
      )

      toast.info('Menunggu pembayaran. Silakan selesaikan pembayaran Anda.')
      router.reload()
    },
    onError: (message) => {
      toast.error(message)
    },
    onClose: () => {
      toast.info('Pembayaran dibatalkan')
    },
  })
}

const handleConfirmReceived = () => {
  showConfirmReceivedModal.value = true
}

const confirmReceivedOrder = async () => {
  isConfirming.value = true

  const result = await confirmReceived(props.order.id)

  if (result.success) {
    toast.success(result.message)
    showConfirmReceivedModal.value = false
    router.reload()
  } else {
    toast.error(result.message)
  }

  isConfirming.value = false
}

const handleCancel = () => {
  showCancelModal.value = true
}

const confirmCancelOrder = async () => {
  isCancelling.value = true

  const result = await cancelOrder(props.order.id)

  if (result.success) {
    toast.success(result.message)
    showCancelModal.value = false
    router.reload()
  } else {
    toast.error(result.message)
  }

  isCancelling.value = false
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head :title="`Pesanan ${order.orderNumber} - Ogitu`" />

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Background Pattern -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      <div class="absolute top-1/3 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary-500/5 rounded-full blur-3xl" />
    </div>

    <!-- Content -->
    <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <!-- Back Button -->
      <Link
        href="/orders"
        class="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors duration-200 mb-6 group"
      >
        <UIcon
          name="i-heroicons-arrow-left"
          class="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
        />
        <span>Kembali ke Daftar Pesanan</span>
      </Link>

      <!-- Order Header -->
      <div class="relative mb-8 p-6 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
        <!-- Decorative Glow -->
        <div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div class="relative flex flex-wrap items-start justify-between gap-4">
          <div class="flex items-center gap-4">
            <!-- Order Icon -->
            <div class="hidden sm:flex w-16 h-16 rounded-2xl bg-linear-to-br from-primary-500 to-secondary-600 items-center justify-center shadow-lg shadow-primary-500/30">
              <UIcon name="i-heroicons-document-text" class="w-8 h-8 text-white" />
            </div>

            <div>
              <div class="flex items-center gap-3 mb-1">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {{ order.orderNumber }}
                </h1>
              </div>
              <div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
                <span class="flex items-center gap-1.5">
                  <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                  {{ formatDate(order.createdAt) }}
                </span>
                <span class="text-gray-300 dark:text-gray-600">•</span>
                <span>{{ formatRelativeTime(order.createdAt) }}</span>
              </div>
            </div>
          </div>

          <OrderStatusBadge :status="order.status" size="lg" animated />
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column - Main Content -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Timeline -->
          <OrderTimeline v-if="order.timeline" :timeline="order.timeline" />

          <!-- Items -->
          <OrderItemsCard
            :items="order.items"
          />

          <!-- Shipping -->
          <OrderShippingCard v-if="order.shipping" :shipping="order.shipping" />

          <!-- Customer Notes -->
          <div
            v-if="order.customerNotes"
            class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden"
          >
            <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-linear-to-br from-pink-500/10 to-rose-500/10 flex items-center justify-center">
                  <UIcon name="i-heroicons-chat-bubble-left-ellipsis" class="w-5 h-5 text-pink-500" />
                </div>
                <h2 class="font-semibold text-gray-900 dark:text-white">Catatan</h2>
              </div>
            </div>
            <div class="p-5">
              <p class="text-gray-600 dark:text-gray-400">{{ order.customerNotes }}</p>
            </div>
          </div>
        </div>

        <!-- Right Column - Sidebar -->
        <div class="space-y-6">
          <!-- Address -->
          <OrderAddressCard v-if="order.address" :address="order.address" />

          <!-- Summary -->
          <OrderSummaryCard :order="order" />

          <!-- Actions -->
          <OrderDetailActions
            :order="order"
            :loading="isProcessing || isPaymentOpen"
            @pay="handlePay"
            @confirm-received="handleConfirmReceived"
            @cancel="handleCancel"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Cancel Order Confirmation Modal -->
  <UModal
    v-model:open="showCancelModal"
    title="Batalkan Pesanan"
    description="Apakah Anda yakin ingin membatalkan pesanan ini?"
    :ui="{ overlay: 'z-[100]', content: 'z-[100]' }"
  >
    <template #body>
      <div class="p-4 max-h-[70vh] overflow-y-auto">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p class="text-gray-600 dark:text-gray-400">
              Pesanan <span class="font-semibold text-gray-900 dark:text-white">{{ order.orderNumber }}</span> akan dibatalkan.
              Tindakan ini tidak dapat dibatalkan.
            </p>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
        <UButton
          variant="ghost"
          color="neutral"
          :disabled="isCancelling"
          @click="showCancelModal = false"
        >
          Kembali
        </UButton>
        <UButton
          color="error"
          :loading="isCancelling"
          @click="confirmCancelOrder"
        >
          <UIcon name="i-heroicons-x-circle" class="w-4 h-4 mr-2" />
          Ya, Batalkan Pesanan
        </UButton>
      </div>
    </template>
  </UModal>

  <!-- Confirm Received Modal -->
  <UModal
    v-model:open="showConfirmReceivedModal"
    title="Konfirmasi Pesanan Diterima"
    description="Pastikan Anda sudah menerima pesanan dengan baik"
    :ui="{ overlay: 'z-[100]', content: 'z-[100]' }"
  >
    <template #body>
      <div class="p-4 max-h-[70vh] overflow-y-auto">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center shrink-0">
            <UIcon name="i-heroicons-check-badge" class="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div class="space-y-2">
            <p class="text-gray-600 dark:text-gray-400">
              Konfirmasi bahwa pesanan <span class="font-semibold text-gray-900 dark:text-white">{{ order.orderNumber }}</span> sudah Anda terima dengan baik.
            </p>
            <div v-if="order.shipping?.trackingNumber" class="flex items-center gap-2 text-sm">
              <UIcon name="i-heroicons-truck" class="w-4 h-4 text-gray-400" />
              <span class="text-gray-500 dark:text-gray-400">No. Resi:</span>
              <code class="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs font-mono text-gray-700 dark:text-gray-300">
                {{ order.shipping.trackingNumber }}
              </code>
            </div>
            <p class="text-xs text-amber-600 dark:text-amber-400">
              <UIcon name="i-heroicons-information-circle" class="w-4 h-4 inline mr-1" />
              Setelah dikonfirmasi, dana akan diteruskan ke penjual.
            </p>
          </div>
        </div>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3 p-4 border-t border-gray-200 dark:border-gray-700">
        <UButton
          variant="ghost"
          color="neutral"
          :disabled="isConfirming"
          @click="showConfirmReceivedModal = false"
        >
          Kembali
        </UButton>
        <UButton
          color="success"
          :loading="isConfirming"
          @click="confirmReceivedOrder"
        >
          <UIcon name="i-heroicons-check-circle" class="w-4 h-4 mr-2" />
          Ya, Pesanan Diterima
        </UButton>
      </div>
    </template>
  </UModal>
</template>
