<script setup lang="ts">
import { ref, computed } from 'vue'
import DefaultLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'

defineOptions({
  layout: DefaultLayout,
})

// State
const step = ref<'email' | 'otp' | 'success'>('email')
const toast = useToast()
const isLoading = ref(false)
const errorMessage = ref('')

// OTP state
const otpCode = ref('')
const otpCountdown = ref(0)
const otpTimer = ref<ReturnType<typeof setInterval> | null>(null)
const resetToken = ref('')

// Form data
const email = ref('')

// Computed
const canSendOtp = computed(() => {
  return email.value.trim() !== '' && email.value.includes('@')
})

const canVerifyOtp = computed(() => {
  return otpCode.value.length === 6
})

// Get XSRF token from cookie
const getXsrfToken = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

// Start OTP countdown
const startCountdown = () => {
  otpCountdown.value = 60
  if (otpTimer.value) clearInterval(otpTimer.value)
  otpTimer.value = setInterval(() => {
    if (otpCountdown.value > 0) {
      otpCountdown.value--
    } else {
      if (otpTimer.value) clearInterval(otpTimer.value)
    }
  }, 1000)
}

// Send OTP
const sendOtp = async () => {
  if (!canSendOtp.value || isLoading.value) return

  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/auth/forgot-password/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({ email: email.value }),
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Kode OTP telah dikirim ke email Anda')
      step.value = 'otp'
      startCountdown()
    } else {
      errorMessage.value = data.message || 'Gagal mengirim OTP'
      toast.error(data.message || 'Gagal mengirim OTP')
    }
  } catch (error) {
    console.error('Send OTP error:', error)
    errorMessage.value = 'Terjadi kesalahan, silakan coba lagi'
    toast.error('Terjadi kesalahan, silakan coba lagi')
  } finally {
    isLoading.value = false
  }
}

// Verify OTP
const verifyOtp = async () => {
  if (!canVerifyOtp.value || isLoading.value) return

  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/auth/forgot-password/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({
        email: email.value,
        otp: otpCode.value,
      }),
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Verifikasi berhasil!')
      resetToken.value = data.token
      // Redirect to reset password page
      window.location.href = `/reset-password?email=${encodeURIComponent(email.value)}&token=${encodeURIComponent(data.token)}`
    } else {
      errorMessage.value = data.message || 'Kode OTP tidak valid'
      toast.error(data.message || 'Kode OTP tidak valid')
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
  if (otpCountdown.value > 0 || isLoading.value) return

  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await fetch('/auth/resend-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({
        email: email.value,
        type: 'forgot_password',
      }),
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Kode OTP baru telah dikirim')
      startCountdown()
      otpCode.value = ''
    } else {
      toast.error(data.message || 'Gagal mengirim ulang OTP')
    }
  } catch (error) {
    console.error('Resend OTP error:', error)
    toast.error('Terjadi kesalahan, silakan coba lagi')
  } finally {
    isLoading.value = false
  }
}

// Go back
const goBack = () => {
  if (step.value === 'otp') {
    step.value = 'email'
    otpCode.value = ''
    if (otpTimer.value) clearInterval(otpTimer.value)
  }
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Decorative -->
    <div class="hidden lg:flex lg:w-1/2 bg-linear-to-br from-purple-600 via-pink-600 to-orange-500 relative overflow-hidden">
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

        <h1 class="text-4xl font-bold mb-4 text-center">Lupa Password?</h1>
        <p class="text-xl text-white/80 mb-12 text-center">Jangan khawatir, kami akan bantu Anda</p>

        <!-- Steps Info -->
        <div class="space-y-6 w-full max-w-sm">
          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg">
              1
            </div>
            <div>
              <div class="font-semibold">Masukkan Email</div>
              <div class="text-sm text-white/70">Email yang terdaftar di akun Anda</div>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg">
              2
            </div>
            <div>
              <div class="font-semibold">Verifikasi OTP</div>
              <div class="text-sm text-white/70">Masukkan kode yang dikirim ke email</div>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center font-bold text-lg">
              3
            </div>
            <div>
              <div class="font-semibold">Buat Password Baru</div>
              <div class="text-sm text-white/70">Atur password baru untuk akun Anda</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <div class="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
            <UIcon name="i-heroicons-bolt" class="w-9 h-9 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Lupa Password</h1>
        </div>

        <!-- Step Indicator -->
        <div class="flex items-center justify-center gap-3 mb-8">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
            step === 'email'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
              : 'bg-purple-100 text-purple-600 dark:bg-purple-900/30'
          ]">
            1
          </div>
          <div class="w-12 h-1 rounded-full bg-gray-200 dark:bg-gray-700">
            <div :class="['h-full rounded-full bg-purple-500 transition-all', step === 'otp' ? 'w-full' : 'w-0']"></div>
          </div>
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
            step === 'otp'
              ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
              : 'bg-gray-200 text-gray-400 dark:bg-gray-700'
          ]">
            2
          </div>
        </div>

        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-4"
          mode="out-in"
        >
          <!-- Email Step -->
          <div v-if="step === 'email'" key="email">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="w-20 h-20 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-key" class="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Reset Password
              </h2>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Masukkan email Anda untuk menerima kode verifikasi
              </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="sendOtp" class="space-y-6">
              <!-- Error Alert -->
              <div v-if="errorMessage" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
                  </div>
                  <span class="text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</span>
                </div>
              </div>

              <!-- Email Input -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <UInput
                  v-model="email"
                  type="email"
                  placeholder="email@example.com"
                  icon="i-heroicons-envelope"
                  size="lg"
                  class="w-full"
                  autocomplete="email"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </div>

              <!-- Submit Button -->
              <UButton
                type="submit"
                color="primary"
                size="lg"
                block
                :loading="isLoading"
                :disabled="!canSendOtp || isLoading"
                class="rounded-xl h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <UIcon name="i-heroicons-paper-airplane" class="w-5 h-5 mr-2" />
                Kirim Kode OTP
              </UButton>
            </form>

            <!-- Back to Login -->
            <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Ingat password Anda?
              <a href="/login" class="font-semibold text-primary-600 hover:text-primary-500 ml-1">
                Kembali ke Login
              </a>
            </p>
          </div>

          <!-- OTP Verification Step -->
          <div v-else-if="step === 'otp'" key="otp">
            <!-- Header -->
            <div class="text-center mb-8">
              <div class="w-20 h-20 bg-linear-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <UIcon name="i-heroicons-envelope-open" class="w-10 h-10 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Verifikasi Email
              </h2>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Masukkan kode OTP yang dikirim ke
              </p>
              <p class="font-semibold text-purple-600 dark:text-purple-400">
                {{ email }}
              </p>
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
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Kode OTP (6 digit)</label>
                <UInput
                  v-model="otpCode"
                  type="text"
                  placeholder="000000"
                  icon="i-heroicons-key"
                  size="lg"
                  class="w-full"
                  maxlength="6"
                  pattern="[0-9]*"
                  inputmode="numeric"
                  autocomplete="one-time-code"
                  :ui="{
                    rounded: 'rounded-xl',
                    base: 'text-center tracking-[0.5em] font-mono text-2xl'
                  }"
                />
              </div>

              <!-- Timer & Resend -->
              <div class="text-center">
                <p v-if="otpCountdown > 0" class="text-sm text-gray-500 dark:text-gray-400">
                  Kirim ulang kode dalam <span class="font-semibold text-purple-600">{{ otpCountdown }}</span> detik
                </p>
                <button
                  v-else
                  type="button"
                  @click="resendOtp"
                  :disabled="isLoading"
                  class="text-sm font-semibold text-purple-600 hover:text-purple-500 disabled:opacity-50"
                >
                  Kirim Ulang Kode OTP
                </button>
              </div>

              <!-- Verify Button -->
              <UButton
                type="submit"
                color="primary"
                size="lg"
                block
                :loading="isLoading"
                :disabled="!canVerifyOtp || isLoading"
                class="rounded-xl h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mr-2" />
                Verifikasi OTP
              </UButton>

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

            <!-- Info -->
            <div class="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <div class="flex items-start gap-3">
                <UIcon name="i-heroicons-information-circle" class="w-5 h-5 text-gray-500 shrink-0 mt-0.5" />
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Kode OTP berlaku selama 5 menit. Periksa folder spam jika email tidak ditemukan di inbox.
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
