<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head, router } from '@inertiajs/vue3'
import AppLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'
import { useMidtrans } from '~/composables/use_midtrans'
import CheckoutAddressCard from '~/components/checkout/CheckoutAddressCard.vue'
import CheckoutItemsCard from '~/components/checkout/CheckoutItemsCard.vue'
import CheckoutSummaryCard from '~/components/checkout/CheckoutSummaryCard.vue'
import CheckoutAddressModal from '~/components/checkout/CheckoutAddressModal.vue'

// Types
interface Address {
  id: number
  label: string
  recipientName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  cityId: string
  cityName: string
  districtId: string | null
  districtName: string | null
  provinceId: string
  provinceName: string
  postalCode: string
  isDefault: boolean
}

interface CartItem {
  id: number
  productId: number
  productName: string
  variantName: string | null
  quantity: number
  price: number
  weight: number
  image: string | null
}

interface SelectedShipping {
  courierCode: string
  courierService: string
  courierName: string
  serviceDescription: string
  cost: number
  etd: string
}

interface Customer {
  id: number
  fullName: string
  email: string
  phone: string
}

// Props
const props = defineProps<{
  addresses: Address[]
  items: CartItem[]
  summary: {
    subtotal: number
    totalWeight: number
    totalItems: number
  }
  customer: Customer
}>()

// Composables
const toast = useToast()
const { openSnapPopup, isSnapLoaded } = useMidtrans()

// State
const selectedAddressId = ref<number | null>(
  props.addresses.find((a) => a.isDefault)?.id || props.addresses[0]?.id || null
)
const selectedShipping = ref<SelectedShipping | null>(null)
const notes = ref('')
const isProcessing = ref(false)
const showAddressModal = ref(false)

// Computed
const selectedAddress = computed(() => {
  return props.addresses.find((a) => a.id === selectedAddressId.value)
})

const destinationDistrictId = computed(() => {
  return selectedAddress.value?.districtId || null
})

const totalShipping = computed(() => {
  return selectedShipping.value?.cost || 0
})

const canCheckout = computed(() => {
  if (!selectedAddressId.value) return false
  if (props.items.length === 0) return false
  if (!selectedShipping.value) return false
  return true
})

// Helpers
const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// Methods
const handleShippingUpdate = (shipping: SelectedShipping) => {
  selectedShipping.value = shipping
}

const handleAddressChange = (addressId: number) => {
  selectedAddressId.value = addressId
  // Clear shipping when address changes
  selectedShipping.value = null
}

const handleAddressSaved = () => {
  toast.success('Alamat berhasil ditambahkan')
  router.reload({ only: ['addresses'] })
}

const processCheckout = async () => {
  if (!canCheckout.value) {
    toast.error('Mohon pilih alamat dan metode pengiriman')
    return
  }

  isProcessing.value = true

  try {
    const xsrfToken = getXsrfToken()

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      credentials: 'include',
      body: JSON.stringify({
        addressId: selectedAddressId.value,
        shipping: selectedShipping.value,
        notes: notes.value,
      }),
    })

    const result = await response.json()

    if (result.success && result.data?.payment?.snapToken) {
      // Open Midtrans Snap using composable
      if (isSnapLoaded()) {
        await openSnapPopup(result.data.payment.snapToken, {
          onSuccess: async (midtransResult) => {
            // Verify payment status
            if (result.data.order?.id) {
              await fetch(`/api/orders/${result.data.order.id}/verify-payment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
                  ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
                },
                credentials: 'include',
                body: JSON.stringify({
                  transactionStatus: midtransResult?.transaction_status || 'settlement',
                  transactionId: midtransResult?.transaction_id,
                }),
              })
            }
            toast.success('Pembayaran berhasil!')
            router.visit('/orders')
          },
          onPending: async (midtransResult) => {
            // Verify pending status
            if (result.data.order?.id) {
              await fetch(`/api/orders/${result.data.order.id}/verify-payment`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest',
                  ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
                },
                credentials: 'include',
                body: JSON.stringify({
                  transactionStatus: midtransResult?.transaction_status || 'pending',
                  transactionId: midtransResult?.transaction_id,
                }),
              })
            }
            toast.info('Menunggu pembayaran...')
            router.visit('/orders')
          },
          onError: (res) => {
            toast.error(res.status_message || 'Pembayaran gagal')
            router.visit('/orders')
          },
          onClose: () => {
            toast.info('Pembayaran dibatalkan. Silakan selesaikan pembayaran melalui halaman pesanan.')
            router.visit('/orders')
          },
        })
      } else {
        // Redirect to Midtrans if snap not loaded
        window.location.href = result.data.payment.snapRedirectUrl
      }
    } else {
      toast.error(result.message || 'Gagal memproses checkout')
    }
  } catch (error) {
    console.error('Checkout error:', error)
    toast.error('Terjadi kesalahan saat memproses checkout')
  } finally {
    isProcessing.value = false
  }
}

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head title="Checkout - Ogitu" />

  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Checkout</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">{{ summary.totalItems }} item dalam pesanan</p>
      </div>

      <!-- Empty State -->
      <div v-if="items.length === 0" class="text-center py-16">
        <UIcon name="i-heroicons-shopping-cart" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600" />
        <h2 class="mt-4 text-xl font-semibold text-gray-900 dark:text-white">Tidak ada item untuk checkout</h2>
        <p class="mt-2 text-gray-500 dark:text-gray-400">Pilih item dari keranjang terlebih dahulu</p>
        <UButton to="/cart" class="mt-4">
          Kembali ke Keranjang
        </UButton>
      </div>

      <!-- Checkout Content -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Items & Shipping -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Address Section -->
          <CheckoutAddressCard
            :addresses="addresses"
            :selected-address-id="selectedAddressId"
            @update:selected-address-id="handleAddressChange"
            @add-address="showAddressModal = true"
          />

          <!-- Items & Shipping -->
          <CheckoutItemsCard
            :items="items"
            :total-weight="summary.totalWeight"
            :subtotal="summary.subtotal"
            :destination-district-id="destinationDistrictId"
            :selected-shipping="selectedShipping"
            @update:selected-shipping="handleShippingUpdate"
          />

          <!-- Notes -->
          <UCard>
            <template #header>
              <h3 class="font-semibold text-gray-900 dark:text-white">Catatan (Opsional)</h3>
            </template>
            <UTextarea
              v-model="notes"
              placeholder="Tambahkan catatan untuk pesanan Anda..."
              :rows="3"
            />
          </UCard>
        </div>

        <!-- Right Column - Summary -->
        <div class="lg:col-span-1">
          <CheckoutSummaryCard
            :subtotal="summary.subtotal"
            :total-items="summary.totalItems"
            :total-shipping="totalShipping"
            :can-checkout="canCheckout"
            :is-processing="isProcessing"
            @checkout="processCheckout"
          />
        </div>
      </div>
    </div>
  </div>

  <!-- Add Address Modal -->
  <CheckoutAddressModal
    v-model:open="showAddressModal"
    :default-name="customer.fullName"
    :default-phone="customer.phone"
    :is-first-address="addresses.length === 0"
    @saved="handleAddressSaved"
  />
</template>
