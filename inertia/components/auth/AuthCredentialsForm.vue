<script setup lang="ts">
import { ref, computed } from 'vue'
import type { AdminLoginForm } from '~/composables/use_admin_auth'
import AuthErrorAlert from './AuthErrorAlert.vue'

interface Props {
  /** Form model value */
  modelValue: AdminLoginForm
  /** Error message */
  errorMessage?: string
  /** Loading state */
  isLoading?: boolean
  /** Submit button text */
  submitText?: string
  /** Submit button icon */
  submitIcon?: string
  /** Show register link */
  showRegisterLink?: boolean
  /** Register link URL */
  registerUrl?: string
  /** Show back to customer link */
  showCustomerLink?: boolean
  /** Customer login URL */
  customerLoginUrl?: string
  /** Forgot password URL */
  forgotPasswordUrl?: string
}

const props = withDefaults(defineProps<Props>(), {
  errorMessage: '',
  isLoading: false,
  submitText: 'Kirim Kode OTP',
  submitIcon: 'i-heroicons-paper-airplane',
  showRegisterLink: true,
  registerUrl: '/admin/register',
  showCustomerLink: true,
  customerLoginUrl: '/login',
  forgotPasswordUrl: '/forgot-password',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: AdminLoginForm): void
  (e: 'submit'): void
}>()

// Local state
const showPassword = ref(false)

// Two-way binding helpers
const email = computed({
  get: () => props.modelValue.email,
  set: (value: string) => emit('update:modelValue', { ...props.modelValue, email: value }),
})

const password = computed({
  get: () => props.modelValue.password,
  set: (value: string) => emit('update:modelValue', { ...props.modelValue, password: value }),
})

const remember = computed({
  get: () => props.modelValue.remember,
  set: (value: boolean) => emit('update:modelValue', { ...props.modelValue, remember: value }),
})

// Computed
const isFormValid = computed(() => !!email.value && !!password.value)

// Methods
const handleSubmit = () => {
  if (!isFormValid.value || props.isLoading) return
  emit('submit')
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        <slot name="title">Login Admin</slot>
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        <slot name="subtitle">Masuk ke Admin Center</slot>
      </p>
    </div>

    <!-- Form -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Error Alert -->
      <AuthErrorAlert :message="errorMessage" />

      <!-- Email -->
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

      <!-- Password -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
        <UInput
          v-model="password"
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
              @click="togglePassword"
            />
          </template>
        </UInput>
      </div>

      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between">
        <UCheckbox v-model="remember" label="Ingat saya" />
        <a
          :href="forgotPasswordUrl"
          class="text-sm font-medium text-emerald-600 hover:text-emerald-500"
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
        :loading="isLoading"
        :disabled="isLoading || !isFormValid"
        class="rounded-xl h-12 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
      >
        <UIcon :name="submitIcon" class="w-5 h-5 mr-2" />
        {{ submitText }}
      </UButton>
    </form>

    <!-- Register Link -->
    <div
      v-if="showRegisterLink"
      class="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800"
    >
      <p class="text-sm text-emerald-800 dark:text-emerald-200 text-center">
        <slot name="register-text">Belum menjadi admin?</slot>
        <a :href="registerUrl" class="font-semibold hover:underline ml-1">
          <slot name="register-link-text">Daftar Sekarang</slot>
        </a>
      </p>
    </div>

    <!-- Back to Customer -->
    <p v-if="showCustomerLink" class="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
      <a :href="customerLoginUrl" class="font-medium text-gray-500 hover:text-gray-700">
        <UIcon name="i-heroicons-arrow-left" class="w-4 h-4 inline mr-1" />
        <slot name="customer-link-text">Login sebagai Customer</slot>
      </a>
    </p>
  </div>
</template>
