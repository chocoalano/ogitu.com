<script setup lang="ts">
import { computed, onMounted } from 'vue'
import DefaultLayout from '~/layouts/default.vue'
import { useAdminAuth } from '~/composables/use_admin_auth'
import AuthLoginSidebar from '~/components/auth/AuthLoginSidebar.vue'
import AuthMobileLogo from '~/components/auth/AuthMobileLogo.vue'
import AuthStepIndicator from '~/components/auth/AuthStepIndicator.vue'
import AuthCredentialsForm from '~/components/auth/AuthCredentialsForm.vue'
import AuthOtpForm from '~/components/auth/AuthOtpForm.vue'
import type { SidebarFeature } from '~/components/auth'

defineOptions({
  layout: DefaultLayout,
})

const props = defineProps<{
  redirect?: string
}>()

// Use the admin auth composable
const auth = useAdminAuth({
  basePath: '/admin/auth',
  defaultRedirect: '/admin/dashboard',
})

// Computed redirect URL
const redirectTo = computed(() => props.redirect || '/admin/dashboard')

// Current step number for step indicator
const currentStep = computed(() => (auth.isOtpStep.value ? 2 : 1))

// Sidebar features configuration
const sidebarFeatures: SidebarFeature[] = [
  {
    icon: 'i-heroicons-chart-bar',
    title: 'Dashboard Analytics',
    description: 'Pantau performa penjualan Anda',
  },
  {
    icon: 'i-heroicons-cube',
    title: 'Manajemen Produk',
    description: 'Upload dan atur produk dengan mudah',
  },
  {
    icon: 'i-heroicons-truck',
    title: 'Kelola Pesanan',
    description: 'Proses pesanan pelanggan Anda',
  },
]

// Handlers
const handleSendOtp = () => auth.sendOtp()
const handleVerifyOtp = () => auth.verifyOtp(redirectTo.value)
const handleResendOtp = () => auth.resendOtp()
const handleGoBack = () => auth.goBack()

// Pre-fill form for development (remove in production)
onMounted(() => {
  if (import.meta.env.DEV) {
    auth.setForm({
      email: 'admin@ogitu.com',
      password: 'password123',
    })
  }
})
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left Side - Decorative Sidebar -->
    <AuthLoginSidebar
      title="Admin Center"
      subtitle="Kelola toko dan produk Anda"
      :features="sidebarFeatures"
    />

    <!-- Right Side - Form -->
    <div class="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4 sm:p-8">
      <div class="w-full max-w-md">
        <!-- Mobile Logo -->
        <AuthMobileLogo title="Admin Center" />

        <!-- Step Indicator -->
        <AuthStepIndicator :current-step="currentStep" :total-steps="2" />

        <!-- Form Steps with Transition -->
        <Transition
          enter-active-class="transition-all duration-300"
          enter-from-class="opacity-0 translate-x-4"
          enter-to-class="opacity-100 translate-x-0"
          leave-active-class="transition-all duration-300"
          leave-from-class="opacity-100 translate-x-0"
          leave-to-class="opacity-0 -translate-x-4"
          mode="out-in"
        >
          <!-- Credentials Form -->
          <AuthCredentialsForm
            v-if="auth.isCredentialsStep.value"
            key="credentials"
            v-model="auth.form.value"
            :error-message="auth.errorMessage.value"
            :is-loading="auth.isSendingOtp.value"
            @submit="handleSendOtp"
          >
            <template #title>Login Admin</template>
            <template #subtitle>Masuk ke Admin Center OGITU</template>
          </AuthCredentialsForm>

          <!-- OTP Verification Form -->
          <AuthOtpForm
            v-else
            key="otp"
            v-model="auth.otpCode.value"
            :email="auth.form.value.email"
            :error-message="auth.errorMessage.value"
            :is-verifying="auth.isLoading.value"
            :is-resending="auth.isSendingOtp.value"
            :remaining-time="auth.otpExpiry.value"
            :can-resend="auth.canResend.value"
            @submit="handleVerifyOtp"
            @resend="handleResendOtp"
            @back="handleGoBack"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>
