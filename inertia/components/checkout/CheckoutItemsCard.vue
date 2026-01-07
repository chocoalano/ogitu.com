<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

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

interface ShippingOption {
  courierCode: string
  courierService: string
  courierName: string
  serviceDescription: string
  cost: number
  etd: string
}

interface SelectedShipping {
  courierCode: string
  courierService: string
  courierName: string
  serviceDescription: string
  cost: number
  etd: string
}

const props = defineProps<{
  items: CartItem[]
  totalWeight: number
  subtotal: number
  destinationDistrictId: string | null
  selectedShipping: SelectedShipping | null
}>()

const emit = defineEmits<{
  'update:selectedShipping': [shipping: SelectedShipping]
}>()

const shippingOptions = ref<ShippingOption[]>([])
const isLoadingShipping = ref(false)
const selectedCourier = ref<string | null>(null)

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

const fetchShippingRates = async () => {
  if (!props.destinationDistrictId) {
    shippingOptions.value = []
    return
  }

  isLoadingShipping.value = true
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch('/api/shipping/rates', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      credentials: 'include',
      body: JSON.stringify({
        destinationDistrictId: props.destinationDistrictId,
        weight: props.totalWeight,
      }),
    })

    const result = await response.json()
    if (result.success) {
      shippingOptions.value = result.data || []
    }
  } catch (error) {
    console.error('Failed to fetch shipping rates:', error)
    shippingOptions.value = []
  } finally {
    isLoadingShipping.value = false
  }
}

const selectShipping = (option: ShippingOption) => {
  selectedCourier.value = `${option.courierCode}-${option.courierService}`
  emit('update:selectedShipping', {
    courierCode: option.courierCode,
    courierService: option.courierService,
    courierName: option.courierName,
    serviceDescription: option.serviceDescription,
    cost: option.cost,
    etd: option.etd,
  })
}

watch(() => props.destinationDistrictId, fetchShippingRates)

onMounted(() => {
  if (props.destinationDistrictId) {
    fetchShippingRates()
  }
})
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-gray-900 dark:text-white">Detail Pesanan</h3>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ items.length }} item</span>
      </div>
    </template>

    <!-- Items List -->
    <div class="divide-y divide-gray-100 dark:divide-gray-800">
      <div
        v-for="item in items"
        :key="item.id"
        class="flex gap-4 py-4 first:pt-0 last:pb-0"
      >
        <img
          :src="item.image || '/images/placeholder.png'"
          :alt="item.productName"
          class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
        />
        <div class="flex-1 min-w-0">
          <p class="font-medium text-gray-900 dark:text-white truncate">{{ item.productName }}</p>
          <p v-if="item.variantName" class="text-sm text-gray-500 dark:text-gray-400">{{ item.variantName }}</p>
          <div class="flex items-center justify-between mt-1">
            <span class="text-sm text-gray-500 dark:text-gray-400">x{{ item.quantity }}</span>
            <span class="font-medium text-gray-900 dark:text-white">{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Subtotal -->
    <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
      <div class="flex justify-between text-sm">
        <span class="text-gray-500 dark:text-gray-400">Subtotal</span>
        <span class="font-semibold text-gray-900 dark:text-white">{{ formatPrice(subtotal) }}</span>
      </div>
      <div class="flex justify-between text-sm mt-1">
        <span class="text-gray-500 dark:text-gray-400">Berat Total</span>
        <span class="text-gray-900 dark:text-white">{{ totalWeight }} gram</span>
      </div>
    </div>

    <!-- Shipping Options -->
    <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
      <h4 class="font-medium text-gray-900 dark:text-white mb-3">Pilih Pengiriman</h4>

      <!-- Loading -->
      <div v-if="isLoadingShipping" class="flex items-center justify-center py-4">
        <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 animate-spin text-primary-500" />
        <span class="ml-2 text-sm text-gray-500 dark:text-gray-400">Memuat opsi pengiriman...</span>
      </div>

      <!-- No Address Selected -->
      <div v-else-if="!destinationDistrictId" class="text-center py-4">
        <UIcon name="i-heroicons-map-pin" class="w-8 h-8 mx-auto text-gray-300 dark:text-gray-600" />
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Pilih alamat pengiriman terlebih dahulu</p>
      </div>

      <!-- No Options Available -->
      <div v-else-if="shippingOptions.length === 0" class="text-center py-4">
        <UIcon name="i-heroicons-truck" class="w-8 h-8 mx-auto text-gray-300 dark:text-gray-600" />
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400">Tidak ada opsi pengiriman tersedia</p>
      </div>

      <!-- Shipping Options List -->
      <div v-else class="space-y-2">
        <div
          v-for="option in shippingOptions"
          :key="`${option.courierCode}-${option.courierService}`"
          class="flex items-center p-3 rounded-lg border cursor-pointer transition-colors"
          :class="
            selectedCourier === `${option.courierCode}-${option.courierService}`
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
              : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600'
          "
          @click="selectShipping(option)"
        >
          <URadio
            :model-value="selectedCourier === `${option.courierCode}-${option.courierService}`"
            class="mr-3"
          />
          <div class="flex-1">
            <div class="flex items-center justify-between">
              <span class="font-medium text-gray-900 dark:text-white">{{ option.courierName }}</span>
              <span class="font-semibold text-primary-600 dark:text-primary-400">{{ formatPrice(option.cost) }}</span>
            </div>
            <div class="flex items-center justify-between mt-1">
              <span class="text-sm text-gray-500 dark:text-gray-400">{{ option.serviceDescription }}</span>
              <span class="text-xs text-gray-400 dark:text-gray-500">{{ option.etd }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
