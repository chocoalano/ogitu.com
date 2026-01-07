<script setup lang="ts">
import { ref, computed } from 'vue'
import DefaultLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'

defineOptions({
  layout: DefaultLayout,
})

// Props from URL query params
const props = defineProps<{
  email?: string
  token?: string
}>()

// State
const toast = useToast()
const isLoading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Form data
const form = ref({
  password: '',
  passwordConfirmation: '',
})

// Computed
const passwordMatch = computed(() => {
  if (!form.value.passwordConfirmation) return true
  return form.value.password === form.value.passwordConfirmation
})

const canSubmit = computed(() => {
  return (
    props.email &&
    props.token &&
    form.value.password.length >= 8 &&
    passwordMatch.value
  )
})

// Get XSRF token from cookie
const getXsrfToken = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

// Submit new password
const submit = async () => {
  if (!canSubmit.value || isLoading.value) return

  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    const response = await fetch('/auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-XSRF-TOKEN': getXsrfToken(),
      },
      body: JSON.stringify({
        email: props.email,
        token: props.token,
        password: form.value.password,
      }),
    })

    const data = await response.json()

    if (data.success) {
      successMessage.value = data.message || 'Password berhasil direset!'
      toast.success(data.message || 'Password berhasil direset!')

      // Redirect to login after 2 seconds
      setTimeout(() => {
        window.location.href = '/login'
      }, 2000)
    } else {
      errorMessage.value = data.message || 'Gagal mereset password'
      toast.error(data.message || 'Gagal mereset password')
    }
  } catch (error) {
    console.error('Reset password error:', error)
    errorMessage.value = 'Terjadi kesalahan, silakan coba lagi'
    toast.error('Terjadi kesalahan, silakan coba lagi')
  } finally {
    isLoading.value = false
  }
}

// Navigation
const goToForgotPassword = () => {
  window.location.href = '/forgot-password'
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

        <h1 class="text-4xl font-bold mb-4 text-center">Buat Password Baru</h1>
        <p class="text-xl text-white/80 mb-12 text-center">Langkah terakhir untuk mengamankan akun Anda</p>

        <!-- Security Tips -->
        <div class="space-y-6 w-full max-w-sm">
          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-check-circle" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Minimal 8 Karakter</div>
              <div class="text-sm text-white/70">Password yang lebih panjang lebih aman</div>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-shield-check" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Kombinasi Unik</div>
              <div class="text-sm text-white/70">Gunakan huruf, angka, dan simbol</div>
            </div>
          </div>

          <div class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UIcon name="i-heroicons-eye-slash" class="w-6 h-6" />
            </div>
            <div>
              <div class="font-semibold">Jaga Kerahasiaan</div>
              <div class="text-sm text-white/70">Jangan bagikan password kepada siapapun</div>
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
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h1>
        </div>

        <!-- Invalid Token Warning -->
        <div v-if="!email || !token" class="text-center">
          <div class="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-10 h-10 text-red-500" />
          </div>
          <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Link Tidak Valid
          </h2>
          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Link reset password tidak valid atau sudah kadaluarsa.
            Silakan minta link baru.
          </p>
          <UButton
            color="primary"
            size="lg"
            class="rounded-xl bg-linear-to-r from-purple-500 to-pink-600"
            @click="goToForgotPassword"
          >
            <UIcon name="i-heroicons-arrow-path" class="w-5 h-5 mr-2" />
            Minta Link Baru
          </UButton>
        </div>

        <!-- Reset Password Form -->
        <div v-else>
          <!-- Header -->
          <div class="text-center mb-8">
            <div class="w-20 h-20 bg-linear-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UIcon name="i-heroicons-lock-closed" class="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
              Buat Password Baru
            </h2>
            <p class="mt-2 text-gray-600 dark:text-gray-400">
              Masukkan password baru untuk akun
            </p>
            <p class="font-semibold text-purple-600 dark:text-purple-400">
              {{ email }}
            </p>
          </div>

          <!-- Success Message -->
          <div v-if="successMessage" class="mb-6 p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5 text-green-500" />
              </div>
              <div>
                <span class="text-sm text-green-700 dark:text-green-400">{{ successMessage }}</span>
                <p class="text-xs text-green-600 dark:text-green-500 mt-1">Mengalihkan ke halaman login...</p>
              </div>
            </div>
          </div>

          <!-- Form -->
          <form v-else @submit.prevent="submit" class="space-y-6">
            <!-- Error Alert -->
            <div v-if="errorMessage" class="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <UIcon name="i-heroicons-exclamation-circle" class="w-5 h-5 text-red-500" />
                </div>
                <span class="text-sm text-red-700 dark:text-red-400">{{ errorMessage }}</span>
              </div>
            </div>

            <!-- New Password -->
            <div class="space-y-2">
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Password Baru</label>
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
              <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Konfirmasi Password</label>
              <UInput
                v-model="form.passwordConfirmation"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Ulangi password baru"
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

            <!-- Password Strength Indicator -->
            <div v-if="form.password" class="space-y-2">
              <div class="flex items-center justify-between text-xs">
                <span class="text-gray-500 dark:text-gray-400">Kekuatan Password</span>
                <span :class="[
                  form.password.length >= 12 ? 'text-green-500' :
                  form.password.length >= 8 ? 'text-amber-500' : 'text-red-500'
                ]">
                  {{ form.password.length >= 12 ? 'Kuat' : form.password.length >= 8 ? 'Sedang' : 'Lemah' }}
                </span>
              </div>
              <div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  class="h-full transition-all rounded-full"
                  :class="[
                    form.password.length >= 12 ? 'bg-green-500 w-full' :
                    form.password.length >= 8 ? 'bg-amber-500 w-2/3' : 'bg-red-500 w-1/3'
                  ]"
                ></div>
              </div>
            </div>

            <!-- Submit Button -->
            <UButton
              type="submit"
              color="primary"
              size="lg"
              block
              :loading="isLoading"
              :disabled="!canSubmit || isLoading"
              class="rounded-xl h-12 bg-linear-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mr-2" />
              Reset Password
            </UButton>
          </form>

          <!-- Back to Login -->
          <p class="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <a href="/login" class="font-semibold text-primary-600 hover:text-primary-500">
              <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 inline mr-1" />
              Kembali ke Login
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
