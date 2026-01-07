<script setup lang="ts">
import { computed } from 'vue'
import AuthErrorAlert from './AuthErrorAlert.vue'

interface Props {
  /** OTP code model value */
  modelValue: string
  /** Email address for display */
  email: string
  /** Error message */
  errorMessage?: string
  /** Verify loading state */
  isVerifying?: boolean
  /** Resend loading state */
  isResending?: boolean
  /** Remaining time in seconds */
  remainingTime: number
  /** Can resend OTP */
  canResend: boolean
  /** OTP length */
  otpLength?: number
}

const props = withDefaults(defineProps<Props>(), {
  errorMessage: '',
  isVerifying: false,
  isResending: false,
  otpLength: 6,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
  (e: 'resend'): void
  (e: 'back'): void
}>()

// Two-way binding
const otpCode = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

// Computed
const isOtpValid = computed(() => otpCode.value.length === props.otpLength)

// Format time helper
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// Methods
const handleSubmit = () => {
  if (!isOtpValid.value || props.isVerifying) return
  emit('submit')
}

const handleResend = () => {
  if (!props.canResend || props.isResending) return
  emit('resend')
}

const handleBack = () => {
  emit('back')
}
</script>

<template>
  <div>
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="w-20 h-20 bg-linear-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
        <UIcon name="i-heroicons-shield-check" class="w-10 h-10 text-emerald-600 dark:text-emerald-400" />
      </div>
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        <slot name="title">Verifikasi OTP</slot>
      </h2>
      <p class="mt-2 text-gray-600 dark:text-gray-400">
        <slot name="subtitle">Masukkan kode OTP yang dikirim ke</slot>
      </p>
      <p class="font-semibold text-emerald-600 dark:text-emerald-400">
        {{ email }}
      </p>
    </div>

    <!-- OTP Form -->
    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Error Alert -->
      <AuthErrorAlert :message="errorMessage" />

      <!-- OTP Input -->
      <div class="space-y-2">
        <label class="text-sm font-medium text-gray-700 dark:text-gray-300">
          Kode OTP ({{ otpLength }} digit)
        </label>
        <UInput
          v-model="otpCode"
          type="text"
          placeholder="000000"
          icon="i-heroicons-key"
          size="lg"
          class="w-full"
          :maxlength="otpLength"
          pattern="[0-9]*"
          inputmode="numeric"
          autocomplete="one-time-code"
          :ui="{
            rounded: 'rounded-xl',
            base: 'text-center tracking-[0.5em] font-mono text-2xl'
          }"
        />
      </div>

      <!-- Timer / Resend -->
      <div class="text-center">
        <p v-if="!canResend" class="text-sm text-gray-500 dark:text-gray-400">
          Kode berlaku selama
          <span class="font-semibold text-emerald-600">{{ formatTime(remainingTime) }}</span>
        </p>
        <button
          v-else
          type="button"
          @click="handleResend"
          :disabled="isResending"
          class="text-sm font-semibold text-emerald-600 hover:text-emerald-500 disabled:opacity-50"
        >
          <span v-if="isResending">Mengirim...</span>
          <span v-else>Kirim Ulang Kode OTP</span>
        </button>
      </div>

      <!-- Verify Button -->
      <UButton
        type="submit"
        color="primary"
        size="lg"
        block
        :loading="isVerifying"
        :disabled="isVerifying || !isOtpValid"
        class="rounded-xl h-12 bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
      >
        <UIcon name="i-heroicons-check-circle" class="w-5 h-5 mr-2" />
        <slot name="submit-text">Verifikasi & Login</slot>
      </UButton>

      <!-- Back Button -->
      <UButton
        type="button"
        color="neutral"
        variant="ghost"
        block
        @click="handleBack"
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
          <slot name="info-text">
            Kode OTP berlaku selama 5 menit. Periksa folder spam jika email tidak ditemukan di inbox.
          </slot>
        </p>
      </div>
    </div>
  </div>
</template>
