<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrderFormatters } from '~/composables/use_orders'
import { useMidtrans } from '~/composables/use_midtrans'

const isOpen = defineModel<boolean>({ default: false })

const emit = defineEmits<{
  topup: [amount: number]
  success: []
}>()

const { formatPrice } = useOrderFormatters()
const { payWithSnap, isSnapLoaded } = useMidtrans()

const topupAmount = ref(50000)
const customAmount = ref('')
const isLoading = ref(false)
const paymentStatus = ref<'idle' | 'processing' | 'pending' | 'success' | 'failed'>('idle')
const paymentMessage = ref('')
const currentTransactionId = ref<number | null>(null)

const topupPresets = [20000, 50000, 100000, 200000, 500000, 1000000]

/**
 * Get XSRF token from cookie
 */
const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// Load Midtrans Snap script
const loadSnapScript = (clientKey?: string, snapUrl?: string) => {
  return new Promise<void>((resolve, reject) => {
    if (typeof window !== 'undefined' && isSnapLoaded()) {
      resolve()
      return
    }

    // Remove any existing Snap script to reload with correct client key
    const existingScript = document.querySelector('script[src*="snap.js"]')
    if (existingScript) {
      existingScript.remove()
    }

    const script = document.createElement('script')
    // Use provided URL or default to sandbox
    const url = snapUrl || import.meta.env.VITE_MIDTRANS_SNAP_URL || 'https://app.sandbox.midtrans.com/snap/snap.js'
    const key = clientKey || import.meta.env.VITE_MIDTRANS_CLIENT_KEY || ''

    script.src = url
    script.setAttribute('data-client-key', key)
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Midtrans Snap'))
    document.head.appendChild(script)
  })
}

// No longer pre-load on mount - we load with server config when topup is clicked

const selectPreset = (amount: number) => {
  topupAmount.value = amount
  customAmount.value = ''
}

const handleCustomAmount = () => {
  const parsed = parseInt(customAmount.value.replace(/\D/g, ''))
  if (parsed >= 10000) {
    topupAmount.value = parsed
  }
}

const formatCustomAmount = () => {
  const parsed = parseInt(customAmount.value.replace(/\D/g, ''))
  if (parsed) {
    customAmount.value = parsed.toLocaleString('id-ID')
  }
}

/**
 * Cancel pending topup transaction
 */
const cancelPendingTopup = async (transactionId: number) => {
  try {
    const xsrfToken = getXsrfToken()
    await fetch(`/api/dashboard/wallet/topup/${transactionId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
    })
    currentTransactionId.value = null
  } catch (error) {
    console.error('Failed to cancel topup:', error)
  }
}

/**
 * Confirm topup transaction status with server (checks Midtrans API)
 */
const confirmTopupStatus = async (transactionId: number): Promise<boolean> => {
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/api/dashboard/wallet/topup/${transactionId}/confirm`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
    })
    const data = await response.json()
    console.info('Confirm topup response:', data)
    return data.status === 'completed'
  } catch (error) {
    console.error('Failed to confirm topup:', error)
    return false
  }
}

const handleTopup = async () => {
  if (topupAmount.value < 10000) return

  isLoading.value = true
  paymentStatus.value = 'processing'
  paymentMessage.value = 'Memproses permintaan top up...'

  try {
    // Get XSRF token
    const xsrfToken = getXsrfToken()

    // Request Snap token from backend
    const response = await fetch('/api/dashboard/wallet/topup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      body: JSON.stringify({ amount: topupAmount.value })
    })

    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      // Response is not JSON (likely auth redirect or error page)
      if (response.status === 401 || response.redirected) {
        throw new Error('Sesi Anda telah berakhir. Silakan login kembali.')
      }
      throw new Error('Terjadi kesalahan pada server. Silakan coba lagi.')
    }

    const data = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Gagal membuat pembayaran')
    }

    currentTransactionId.value = data.transactionId

    // Load Snap script with config from server
    if (data.midtransConfig) {
      await loadSnapScript(data.midtransConfig.clientKey, data.midtransConfig.snapUrl)
    } else {
      await loadSnapScript()
    }

    // Hide our modal temporarily so Midtrans Snap can be clicked
    isOpen.value = false

    // Small delay to ensure our modal is hidden before Snap opens
    await new Promise(resolve => setTimeout(resolve, 100))

    // Open Midtrans Snap popup using composable
    await payWithSnap(data.snapToken, {
      onSuccess: async () => {
        paymentStatus.value = 'processing'
        paymentMessage.value = 'Mengkonfirmasi pembayaran...'

        // Confirm the payment status with server
        if (currentTransactionId.value) {
          const confirmed = await confirmTopupStatus(currentTransactionId.value)
          if (confirmed) {
            paymentStatus.value = 'success'
            paymentMessage.value = 'Top up berhasil! Saldo telah ditambahkan.'
            currentTransactionId.value = null
            emit('success')
            setTimeout(() => {
              window.location.reload()
            }, 2000)
          } else {
            // Still pending, webhook will handle it
            paymentStatus.value = 'pending'
            paymentMessage.value = 'Pembayaran sedang diproses. Saldo akan ditambahkan dalam beberapa saat.'
            isOpen.value = true
          }
        } else {
          paymentStatus.value = 'success'
          paymentMessage.value = 'Top up berhasil! Saldo akan segera ditambahkan.'
          emit('success')
          setTimeout(() => {
            window.location.reload()
          }, 2000)
        }
      },
      onPending: () => {
        paymentStatus.value = 'pending'
        paymentMessage.value = 'Menunggu pembayaran. Silakan selesaikan pembayaran Anda.'
        // Re-show our modal with pending status
        isOpen.value = true
      },
      onError: async (message) => {
        paymentStatus.value = 'failed'
        paymentMessage.value = message || 'Pembayaran gagal. Silakan coba lagi.'
        // Cancel/delete the pending transaction
        if (currentTransactionId.value) {
          await cancelPendingTopup(currentTransactionId.value)
        }
        // Re-show our modal with error status
        isOpen.value = true
      },
      onClose: async () => {
        if (paymentStatus.value === 'processing') {
          paymentStatus.value = 'idle'
          paymentMessage.value = ''
          // User closed Snap without completing - cancel the transaction
          if (currentTransactionId.value) {
            await cancelPendingTopup(currentTransactionId.value)
          }
        }
        isLoading.value = false
        // Re-show our modal if user closed Snap without completing
        if (paymentStatus.value !== 'success') {
          isOpen.value = true
        }
      }
    })
  } catch (error: any) {
    console.error('Failed to topup:', error)
    paymentStatus.value = 'failed'
    paymentMessage.value = error.message || 'Terjadi kesalahan. Silakan coba lagi.'
    isLoading.value = false
  }
}

const resetAndClose = () => {
  paymentStatus.value = 'idle'
  paymentMessage.value = ''
  isLoading.value = false
  isOpen.value = false
}

const close = () => {
  if (isLoading.value && paymentStatus.value === 'processing') {
    return // Don't close while processing
  }
  resetAndClose()
}

const statusConfig = computed(() => {
  switch (paymentStatus.value) {
    case 'processing':
      return { icon: 'i-heroicons-arrow-path', color: 'text-blue-500', animate: 'animate-spin' }
    case 'pending':
      return { icon: 'i-heroicons-clock', color: 'text-yellow-500', animate: '' }
    case 'success':
      return { icon: 'i-heroicons-check-circle', color: 'text-green-500', animate: '' }
    case 'failed':
      return { icon: 'i-heroicons-x-circle', color: 'text-red-500', animate: '' }
    default:
      return null
  }
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ width: 'max-w-md', overlay: 'z-[100]', content: 'z-[100]' }"
    title="Top Up Saldo"
    description="Pilih nominal untuk menambah saldo e-wallet Anda"
  >
    <template #content>
      <div class="p-6 max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <UIcon name="i-heroicons-wallet" class="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h2 class="text-xl font-bold text-gray-900 dark:text-white">Top Up Saldo</h2>
          </div>
          <UButton variant="ghost" color="neutral" size="sm" square @click="close" :disabled="isLoading && paymentStatus === 'processing'">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </UButton>
        </div>

        <!-- Payment Status Message -->
        <div v-if="statusConfig" class="mb-5 p-4 rounded-xl" :class="{
          'bg-blue-50 dark:bg-blue-900/20': paymentStatus === 'processing',
          'bg-yellow-50 dark:bg-yellow-900/20': paymentStatus === 'pending',
          'bg-green-50 dark:bg-green-900/20': paymentStatus === 'success',
          'bg-red-50 dark:bg-red-900/20': paymentStatus === 'failed',
        }">
          <div class="flex items-center gap-3">
            <UIcon :name="statusConfig.icon" class="w-6 h-6" :class="[statusConfig.color, statusConfig.animate]" />
            <p class="text-sm font-medium" :class="statusConfig.color">{{ paymentMessage }}</p>
          </div>
        </div>

        <div v-if="paymentStatus === 'idle' || paymentStatus === 'failed'" class="space-y-5">
          <!-- Preset Amounts -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Pilih Nominal
            </label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="amount in topupPresets"
                :key="amount"
                type="button"
                @click="selectPreset(amount)"
                :disabled="isLoading"
                :class="[
                  'p-3 rounded-xl text-sm font-semibold transition-all border-2',
                  topupAmount === amount
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600',
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                ]"
              >
                {{ formatPrice(amount) }}
              </button>
            </div>
          </div>

          <!-- Custom Amount -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Atau Masukkan Nominal Lain
            </label>
            <div class="relative">
              <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">Rp</span>
              <UInput
                v-model="customAmount"
                @input="handleCustomAmount"
                @blur="formatCustomAmount"
                placeholder="Minimal 10.000"
                class="pl-10 w-full"
                type="text"
                :disabled="isLoading"
              />
            </div>
          </div>

          <!-- Summary -->
          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400">Total Top Up</span>
              <span class="text-xl font-bold text-gray-900 dark:text-white">{{ formatPrice(topupAmount) }}</span>
            </div>
          </div>

          <!-- Payment Methods Info -->
          <div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <div class="flex items-start gap-3">
              <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div class="text-sm text-blue-700 dark:text-blue-300">
                <p class="font-medium mb-1">Metode Pembayaran Tersedia:</p>
                <ul class="list-disc list-inside text-xs space-y-0.5">
                  <li>Transfer Bank (BCA, BNI, BRI, Mandiri, Permata)</li>
                  <li>E-Wallet (GoPay, ShopeePay, QRIS)</li>
                  <li>Kartu Kredit/Debit</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <UButton variant="outline" color="neutral" block @click="close" :disabled="isLoading">
              Batal
            </UButton>
            <UButton
              color="primary"
              block
              :loading="isLoading"
              :disabled="topupAmount < 10000"
              @click="handleTopup"
            >
              <UIcon name="i-heroicons-credit-card" class="w-4 h-4 mr-2" />
              {{ isLoading ? 'Memproses...' : 'Top Up Sekarang' }}
            </UButton>
          </div>

          <p class="text-xs text-gray-400 text-center">
            Pembayaran diproses melalui Midtrans. Saldo akan otomatis masuk setelah pembayaran dikonfirmasi.
          </p>
        </div>

        <!-- Pending Payment Status -->
        <div v-else-if="paymentStatus === 'pending'" class="space-y-5">
          <div class="text-center py-4">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <UIcon name="i-heroicons-clock" class="w-8 h-8 text-yellow-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Menunggu Pembayaran</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Silakan selesaikan pembayaran Anda sesuai instruksi yang diberikan.
            </p>
          </div>

          <div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400">Nominal Top Up</span>
              <span class="text-xl font-bold text-gray-900 dark:text-white">{{ formatPrice(topupAmount) }}</span>
            </div>
          </div>

          <UButton color="primary" block @click="resetAndClose">
            Tutup
          </UButton>

          <p class="text-xs text-gray-400 text-center">
            Saldo akan otomatis masuk setelah pembayaran dikonfirmasi oleh sistem.
          </p>
        </div>

        <!-- Success Status -->
        <div v-else-if="paymentStatus === 'success'" class="space-y-5">
          <div class="text-center py-4">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <UIcon name="i-heroicons-check-circle" class="w-8 h-8 text-green-500" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Top Up Berhasil!</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              Saldo Anda akan segera ditambahkan.
            </p>
          </div>

          <div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <div class="flex items-center justify-between">
              <span class="text-gray-600 dark:text-gray-400">Nominal Top Up</span>
              <span class="text-xl font-bold text-green-600 dark:text-green-400">+{{ formatPrice(topupAmount) }}</span>
            </div>
          </div>

          <p class="text-xs text-gray-400 text-center">
            Halaman akan diperbarui secara otomatis...
          </p>
        </div>
      </div>
    </template>
  </UModal>
</template>
