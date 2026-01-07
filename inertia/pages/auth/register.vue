<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import DefaultLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'

defineOptions({
  layout: DefaultLayout,
})

// State
const step = ref<'info' | 'otp'>('info')
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const toast = useToast()
const isLoading = ref(false)
const errorMessage = ref('')
const ageConfirmed = ref(false)

// OTP state
const otpCode = ref('')
const otpCountdown = ref(0)
const otpTimer = ref<ReturnType<typeof setInterval> | null>(null)

// Form data
const form = ref({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  passwordConfirmation: '',
  birthDate: '',
  agreeTerms: false,
})

// Computed
const passwordMatch = computed(() => {
  if (!form.value.passwordConfirmation) return true
  return form.value.password === form.value.passwordConfirmation
})

// Calculate age from birth date
const calculatedAge = computed(() => {
  if (!form.value.birthDate) return null

  const birth = new Date(form.value.birthDate)
  const today = new Date()

  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }

  return age
})

// Check if age is valid (21+)
const isAgeValid = computed(() => {
  return calculatedAge.value !== null && calculatedAge.value >= 21
})

// Can proceed to OTP step
const canProceedToOtp = computed(() => {
  return (
    form.value.fullName.trim() !== '' &&
    form.value.email.trim() !== '' &&
    form.value.password.length >= 8 &&
    passwordMatch.value &&
    form.value.agreeTerms &&
    form.value.birthDate !== '' &&
    isAgeValid.value &&
    ageConfirmed.value
  )
})

// Watch birth date changes to reset confirmation
watch(() => form.value.birthDate, () => {
  ageConfirmed.value = false
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

// Proceed to OTP step (send OTP)
const proceedToOtp = async () => {
  if (!canProceedToOtp.value || isLoading.value) return

  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/auth/register/send-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({
        fullName: form.value.fullName,
        email: form.value.email,
        phone: form.value.phone || null,
        password: form.value.password,
        birthDate: form.value.birthDate,
      }),
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

// Verify OTP and complete registration
const verifyOtp = async () => {
  if (otpCode.value.length !== 6 || isLoading.value) return

  errorMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/auth/register/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({
        email: form.value.email,
        otp: otpCode.value,
        fullName: form.value.fullName,
        phone: form.value.phone || null,
        password: form.value.password,
        birthDate: form.value.birthDate,
      }),
    })

    const data = await response.json()

    if (data.success) {
      toast.success(data.message || 'Pendaftaran berhasil!')
      setTimeout(() => {
        window.location.href = data.redirect || '/'
      }, 500)
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
        email: form.value.email,
        type: 'register',
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

// Go back to info step
const goBack = () => {
  step.value = 'info'
  otpCode.value = ''
  if (otpTimer.value) clearInterval(otpTimer.value)
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

        <h1 class="text-4xl font-bold mb-4 text-center">Bergabung dengan OGITU</h1>
        <p class="text-xl text-white/80 mb-12 text-center">Nikmati pengalaman belanja vape terbaik</p>

        <!-- Benefits -->
        <div class="space-y-6 w-full max-w-sm">
          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-gift" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Diskon Member</div>
              <div class="text-sm text-white/70">Dapatkan diskon eksklusif member</div>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-currency-dollar" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Poin Rewards</div>
              <div class="text-sm text-white/70">Kumpulkan poin dari setiap transaksi</div>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-bell" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Notifikasi Promo</div>
              <div class="text-sm text-white/70">Info flash sale & promo terbaru</div>
            </div>
          </div>
        </div>

        <!-- Age Warning -->
        <div class="mt-12 p-4 bg-amber-500/20 backdrop-blur-sm rounded-xl">
          <div class="flex items-center gap-3 mb-2">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-amber-300" />
            <span class="font-semibold text-amber-100">Verifikasi Usia Diperlukan</span>
          </div>
          <p class="text-sm text-amber-100/80">
            Produk vape hanya untuk pengguna berusia 21 tahun ke atas.
            Anda akan diminta untuk memverifikasi usia saat pendaftaran.
          </p>
        </div>
      </div>
    </div>

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8 overflow-y-auto">
      <div class="w-full max-w-md py-8">
        <!-- Mobile Logo -->
        <div class="lg:hidden text-center mb-8">
          <div class="w-16 h-16 bg-linear-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-purple-500/30">
            <UIcon name="i-heroicons-bolt" class="w-9 h-9 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Daftar OGITU</h1>
        </div>

        <!-- Step Indicator -->
        <div class="flex items-center justify-center gap-3 mb-8">
          <div :class="[
            'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
            step === 'info'
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

        <!-- Info Step -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-4"
          mode="out-in"
        >
          <div v-if="step === 'info'" key="info">
            <!-- Header -->
            <div class="text-center mb-8">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
                Buat Akun Baru
              </h2>
              <p class="mt-2 text-gray-600 dark:text-gray-400">
                Isi data diri Anda untuk mendaftar
              </p>
            </div>

            <!-- Form -->
            <form @submit.prevent="proceedToOtp" class="space-y-4">
              <!-- Error Alert -->
              <div v-if="errorMessage" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
                  </div>
                  <span class="text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</span>
                </div>
              </div>

              <!-- Full Name -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nama Lengkap <span class="text-red-500">*</span></label>
                <UInput
                  v-model="form.fullName"
                  type="text"
                  placeholder="John Doe"
                  icon="i-heroicons-user"
                  size="lg"
                  class="w-full"
                  autocomplete="name"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </div>

              <!-- Email -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Email <span class="text-red-500">*</span></label>
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

              <!-- Phone -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Nomor Telepon</label>
                <UInput
                  v-model="form.phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  icon="i-heroicons-phone"
                  size="lg"
                  class="w-full"
                  autocomplete="tel"
                  :ui="{ rounded: 'rounded-xl' }"
                />
              </div>

              <!-- Birth Date -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Tanggal Lahir <span class="text-red-500">*</span></label>
                <UInput
                  v-model="form.birthDate"
                  type="date"
                  icon="i-heroicons-calendar"
                  size="lg"
                  class="w-full"
                  :max="new Date().toISOString().split('T')[0]"
                  :ui="{ rounded: 'rounded-xl' }"
                />
                <!-- Age Verification Display -->
                <div v-if="form.birthDate" class="mt-2 p-3 rounded-lg" :class="[
                  isAgeValid
                    ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                    : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                ]">
                  <div class="flex items-center gap-2">
                    <UIcon
                      :name="isAgeValid ? 'i-heroicons-check-circle' : 'i-heroicons-x-circle'"
                      :class="['w-5 h-5', isAgeValid ? 'text-green-600' : 'text-red-500']"
                    />
                    <span :class="['text-sm font-medium', isAgeValid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400']">
                      Usia: {{ calculatedAge }} tahun
                      <span v-if="!isAgeValid" class="font-normal"> (minimal 21 tahun)</span>
                    </span>
                  </div>
                </div>
              </div>

              <!-- Password -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Password <span class="text-red-500">*</span></label>
                <UInput
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Minimal 8 karakter"
                  icon="i-heroicons-lock-closed"
                  size="lg"
                  class="w-full"
                  autocomplete="new-password"
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
                <p v-if="form.password && form.password.length < 8" class="text-xs text-amber-600">
                  Password minimal 8 karakter
                </p>
              </div>

              <!-- Confirm Password -->
              <div class="space-y-2">
                <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Password <span class="text-red-500">*</span></label>
                <UInput
                  v-model="form.passwordConfirmation"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Ulangi password"
                  icon="i-heroicons-lock-closed"
                  size="lg"
                  class="w-full"
                  autocomplete="new-password"
                  :color="!passwordMatch ? 'error' : undefined"
                  :ui="{ rounded: 'rounded-xl' }"
                >
                  <template #trailing>
                    <UButton
                      :icon="showConfirmPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      @click="showConfirmPassword = !showConfirmPassword"
                    />
                  </template>
                </UInput>
                <p v-if="!passwordMatch" class="text-xs text-red-500">
                  Password tidak cocok
                </p>
              </div>

              <!-- Terms Checkbox -->
              <div class="pt-2">
                <UCheckbox v-model="form.agreeTerms">
                  <template #label>
                    <span class="text-sm text-gray-600 dark:text-gray-400">
                      Saya setuju dengan
                      <a href="/terms" class="text-primary-600 hover:text-primary-500 font-medium">Syarat & Ketentuan</a>
                      dan
                      <a href="/privacy" class="text-primary-600 hover:text-primary-500 font-medium">Kebijakan Privasi</a>
                    </span>
                  </template>
                </UCheckbox>
              </div>

              <!-- Age Confirmation Checkbox -->
              <div v-if="isAgeValid" class="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800">
                <UCheckbox v-model="ageConfirmed">
                  <template #label>
                    <span class="text-sm text-amber-800 dark:text-amber-200">
                      Saya menyatakan dengan sesungguhnya bahwa saya berusia <strong>21 tahun atau lebih</strong> dan memahami
                      bahwa produk vape/rokok elektrik memiliki risiko kesehatan.
                    </span>
                  </template>
                </UCheckbox>
              </div>

              <!-- Next Button -->
              <UButton
                type="submit"
                color="primary"
                size="lg"
                block
                :loading="isLoading"
                :disabled="!canProceedToOtp || isLoading"
                class="rounded-xl h-12 mt-6 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <span>Lanjutkan</span>
                <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 ml-2" />
              </UButton>
            </form>

            <!-- Login Link -->
            <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              Sudah punya akun?
              <a href="/login" class="font-semibold text-primary-600 hover:text-primary-500 ml-1">
                Masuk di sini
              </a>
            </p>
          </div>

          <!-- OTP Verification Step -->
          <div v-else key="otp">
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
                {{ form.email }}
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
                :disabled="otpCode.length !== 6 || isLoading"
                class="rounded-xl h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
              >
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mr-2" />
                Verifikasi & Daftar
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
