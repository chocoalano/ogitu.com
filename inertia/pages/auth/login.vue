<script setup lang="ts">
import { ref, computed, onUnmounted } from 'vue'
import DefaultLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'

defineOptions({
  layout: DefaultLayout,
})

const props = defineProps<{
  redirect?: string
}>()

// State
const step = ref<'credentials' | 'otp'>('credentials')
const showPassword = ref(false)
const toast = useToast()
const isLoading = ref(false)
const isSendingOtp = ref(false)
const errorMessage = ref('')

// Form data
const form = ref({
  email: '',
  password: '',
  remember: false,
})

// OTP state
const otpCode = ref('')
const otpExpiry = ref(300) // 5 minutes in seconds
const otpTimer = ref<ReturnType<typeof setInterval> | null>(null)
const canResend = ref(false)

const redirectTo = computed(() => props.redirect || '/')

// Format time for display
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Get XSRF token from cookie
const getXsrfToken = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

// Start OTP countdown timer
const startOtpTimer = () => {
  otpExpiry.value = 300
  canResend.value = false

  if (otpTimer.value) clearInterval(otpTimer.value)

  otpTimer.value = setInterval(() => {
    otpExpiry.value--
    if (otpExpiry.value <= 0) {
      canResend.value = true
      if (otpTimer.value) clearInterval(otpTimer.value)
    }
  }, 1000)
}

// Clean up timer on unmount
onUnmounted(() => {
  if (otpTimer.value) clearInterval(otpTimer.value)
})

// Send OTP
const sendOtp = async () => {
  if (isSendingOtp.value) return

  errorMessage.value = ''
  isSendingOtp.value = true

  try {
    const response = await fetch('/auth/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({
        email: form.value.email,
        password: form.value.password,
      }),
    })

    const data = await response.json()

    if (data.success) {
      step.value = 'otp'
      startOtpTimer()
      toast.success(data.message || 'Kode OTP telah dikirim ke email Anda')
    } else {
      errorMessage.value = data.message || 'Gagal mengirim OTP'
      toast.error(data.message || 'Gagal mengirim OTP')
    }
  } catch (error) {
    console.error('Send OTP error:', error)
    errorMessage.value = 'Terjadi kesalahan, silakan coba lagi'
    toast.error('Terjadi kesalahan, silakan coba lagi')
  } finally {
    isSendingOtp.value = false
  }
}

// Verify OTP and login
const verifyOtp = async () => {
  if (isLoading.value || otpCode.value.length !== 6) return

  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({
        email: form.value.email,
        otp: otpCode.value,
        remember: form.value.remember,
        redirect: redirectTo.value,
      }),
    })

    const data = await response.json()

    if (data.success) {
      toast.success(data.message || 'Login berhasil!')
      setTimeout(() => {
        window.location.href = data.redirect || '/'
      }, 500)
    } else {
      errorMessage.value = data.message || 'Verifikasi OTP gagal'
      toast.error(data.message || 'Verifikasi OTP gagal')
    }
  } catch (error) {
    console.error('Verify OTP error:', error)
    errorMessage.value = 'Terjadi kesalahan, silakan coba lagi'
    toast.error('Terjadi kesalahan, silakan coba lagi')
  } finally {
    isLoading.value = false
  }
}

// Resend OTP
const resendOtp = async () => {
  if (!canResend.value || isSendingOtp.value) return

  isSendingOtp.value = true

  try {
    const response = await fetch('/auth/resend-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({
        email: form.value.email,
        type: 'login',
      }),
    })

    const data = await response.json()

    if (data.success) {
      startOtpTimer()
      otpCode.value = ''
      toast.success(data.message || 'Kode OTP baru telah dikirim')
    } else {
      toast.error(data.message || 'Gagal mengirim ulang OTP')
    }
  } catch (error) {
    toast.error('Terjadi kesalahan, silakan coba lagi')
  } finally {
    isSendingOtp.value = false
  }
}

// Go back to credentials step
const goBack = () => {
  step.value = 'credentials'
  otpCode.value = ''
  if (otpTimer.value) clearInterval(otpTimer.value)
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Decorative -->
    <div class="hidden lg:flex lg:w-1/2 bg-linear-to-br from-primary-600 via-purple-600 to-pink-600 relative overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col justify-center items-center text-white p-12">
        <!-- Logo -->
        <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
          <UIcon name="i-heroicons-bolt" class="w-14 h-14 text-white" />
        </div>

        <h1 class="text-4xl font-bold mb-4 text-center">OGITU Vape</h1>
        <p class="text-xl text-white/80 mb-12 text-center">Premium Vape Marketplace</p>

        <!-- Features -->
        <div class="space-y-6 w-full max-w-sm">
          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-shield-check" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Keamanan Terjamin</div>
              <div class="text-sm text-white/70">Verifikasi OTP untuk keamanan akun</div>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-truck" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Gratis Ongkir</div>
              <div class="text-sm text-white/70">Pengiriman gratis ke seluruh Indonesia</div>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-sparkles" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Produk Original</div>
              <div class="text-sm text-white/70">100% produk asli dan berkualitas</div>
            </div>
          </div>
        </div>

        <!-- Age Warning -->
        <div class="mt-12 flex items-center gap-3 bg-amber-500/20 backdrop-blur-sm rounded-xl px-4 py-3">
          <UIcon name="i-heroicons-exclamation-triangle" class="w-5 h-5 text-amber-300" />
          <span class="text-sm text-amber-100">Khusus 21 tahun ke atas</span>
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <div class="w-16 h-16 bg-linear-to-br from-primary-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-500/30">
            <UIcon name="i-heroicons-bolt" class="w-9 h-9 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">OGITU Vape</h1>
        </div>

        <!-- Step Indicator -->
        <div class="flex items-center justify-center gap-3 mb-8">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
            step === 'credentials'
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
              : 'bg-primary-100 text-primary-600 dark:bg-primary-900/30'
          ]">
            1
          </div>
          <div class="w-12 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
            <div :class="['h-full rounded-full bg-primary-500 transition-all', step === 'otp' ? 'w-full' : 'w-0']"></div>
          </div>
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
            step === 'otp'
              ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30'
              : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
          ]">
            2
          </div>
        </div>

        <!-- Credentials Step -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-4"
          mode="out-in"
        >
          <div v-if="step === 'credentials'" key="credentials">
            <!-- Header -->
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Masuk ke Akun
              </h2>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Masukkan email dan password Anda
              </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="sendOtp" class="space-y-5">
              <!-- Error Alert -->
              <div v-if="errorMessage" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
                  </div>
                  <span class="text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</span>
                </div>
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <UInput
                  v-model="form.email"
                  type="email"
                  placeholder="email@example.com"
                  icon="i-heroicons-envelope"
                  size="lg"
                  class="w-full"
                  autocomplete="email"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <UInput
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="••••••••"
                  icon="i-heroicons-lock-closed"
                  size="lg"
                  class="w-full"
                  autocomplete="current-password"
                  :ui="{ rounded: 'rounded-xl' }"
                >
                  <template #trailing>
                    <UButton
                      :icon="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </UInput>
              </div>

              <!-- Remember Me & Forgot Password -->
              <div class="flex items-center justify-between">
                <UCheckbox v-model="form.remember" label="Ingat saya" />
                <a
                  href="/forgot-password"
                  class="text-sm font-medium text-primary-600 hover:text-primary-500"
                >
                  Lupa password?
                </a>
              </div>

              <!-- Submit Button -->
              <UButton
                type="submit"
                color="primary"
                size="lg"
                block
                :loading="isSendingOtp"
                :disabled="isSendingOtp || !form.email || !form.password"
                class="rounded-xl h-12"
              >
                <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 mr-2" />
                Kirim Kode OTP
              </UButton>
            </form>

            <!-- Divider -->
            <div class="relative my-8">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-4 bg-gray-50 dark:bg-gray-950 text-gray-500">
                  Atau masuk dengan
                </span>
              </div>
            </div>

            <!-- Social Login -->
            <div class="grid grid-cols-2 gap-3">
              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                block
                disabled
                class="rounded-xl"
              >
                <UIcon name="i-simple-icons-google" class="w-5 h-5 mr-2" />
                Google
              </UButton>
              <UButton
                color="neutral"
                variant="outline"
                size="lg"
                block
                disabled
                class="rounded-xl"
              >
                <UIcon name="i-simple-icons-facebook" class="w-5 h-5 mr-2" />
                Facebook
              </UButton>
            </div>

            <!-- Register Link -->
            <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Belum punya akun?
              <a href="/register" class="font-semibold text-primary-600 hover:text-primary-500 ml-1">
                Daftar Sekarang
              </a>
            </p>
          </div>

          <!-- OTP Step -->
          <div v-else key="otp">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-envelope-open" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Verifikasi OTP
              </h2>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Masukkan 6 digit kode yang dikirim ke
              </p>
              <p class="font-medium text-gray-900 dark:text-white">{{ form.email }}</p>
            </div>

            <!-- OTP Form -->
            <form @submit.prevent="verifyOtp" class="space-y-6">
              <!-- Error Alert -->
              <div v-if="errorMessage" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
                  </div>
                  <span class="text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</span>
                </div>
              </div>

              <!-- OTP Input -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Kode OTP</label>
                <UInput
                  v-model="otpCode"
                  type="text"
                  placeholder="000000"
                  size="xl"
                  class="w-full text-center tracking-[0.5em] font-mono text-2xl"
                  maxlength="6"
                  autocomplete="one-time-code"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </div>

              <!-- Timer -->
              <div class="text-center">
                <div v-if="!canResend" class="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  <UIcon name="i-heroicons-clock" class="w-5 h-5" />
                  <span>Kode berlaku dalam <span class="font-semibold text-primary-600">{{ formatTime(otpExpiry) }}</span></span>
                </div>
                <div v-else class="text-amber-600 dark:text-amber-400">
                  Kode OTP telah kadaluarsa
                </div>
              </div>

              <!-- Verify Button -->
              <UButton
                type="submit"
                color="primary"
                size="lg"
                block
                :loading="isLoading"
                :disabled="isLoading || otpCode.length !== 6"
                class="rounded-xl h-12"
              >
                <UIcon name="i-heroicons-check-badge" class="w-5 h-5 mr-2" />
                Verifikasi & Masuk
              </UButton>

              <!-- Resend -->
              <div class="text-center">
                <span class="text-gray-600 dark:text-gray-400">Tidak menerima kode? </span>
                <button
                  type="button"
                  @click="resendOtp"
                  :disabled="!canResend || isSendingOtp"
                  :class="[
                    'font-semibold transition-colors',
                    canResend
                      ? 'text-primary-600 hover:text-primary-500 cursor-pointer'
                      : 'text-gray-400 cursor-not-allowed'
                  ]"
                >
                  {{ isSendingOtp ? 'Mengirim...' : 'Kirim Ulang' }}
                </button>
              </div>

              <!-- Back Button -->
              <UButton
                type="button"
                color="neutral"
                variant="ghost"
                block
                @click="goBack"
                class="rounded-xl"
              >
                <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 mr-2" />
                Kembali
              </UButton>
            </form>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
