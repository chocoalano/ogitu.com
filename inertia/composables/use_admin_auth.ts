import { ref, computed, onUnmounted } from 'vue'
import { useToast } from './use_toast'

export interface AdminAuthConfig {
  /** Base path for auth endpoints */
  basePath: string
  /** Default redirect path after login */
  defaultRedirect: string
  /** OTP expiry time in seconds */
  otpExpiryTime?: number
}

export interface AdminLoginForm {
  email: string
  password: string
  remember: boolean
}

export type AuthStep = 'credentials' | 'otp'

/**
 * Composable for admin authentication with OTP verification
 */
export function useAdminAuth(config: AdminAuthConfig) {
  const { basePath, defaultRedirect, otpExpiryTime = 300 } = config

  const toast = useToast()

  // State
  const step = ref<AuthStep>('credentials')
  const isLoading = ref(false)
  const isSendingOtp = ref(false)
  const errorMessage = ref('')

  // Form data
  const form = ref<AdminLoginForm>({
    email: '',
    password: '',
    remember: false,
  })

  // OTP state
  const otpCode = ref('')
  const otpExpiry = ref(otpExpiryTime)
  const otpTimer = ref<ReturnType<typeof setInterval> | null>(null)
  const canResend = ref(false)

  // Computed
  const isCredentialsStep = computed(() => step.value === 'credentials')
  const isOtpStep = computed(() => step.value === 'otp')
  const isFormValid = computed(() => !!form.value.email && !!form.value.password)
  const isOtpValid = computed(() => otpCode.value.length === 6)

  /**
   * Format seconds to MM:SS display
   */
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const formattedOtpExpiry = computed(() => formatTime(otpExpiry.value))

  /**
   * Get XSRF token from cookie
   */
  const getXsrfToken = (): string => {
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
    return match ? decodeURIComponent(match[1]) : ''
  }

  /**
   * Make authenticated API request
   */
  const apiRequest = async <T = unknown>(
    endpoint: string,
    body: Record<string, unknown>
  ): Promise<{ success: boolean; data?: T; message?: string; redirect?: string }> => {
    try {
      const response = await fetch(`${basePath}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-XSRF-TOKEN': getXsrfToken(),
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()
      return {
        success: data.success ?? false,
        data,
        message: data.message,
        redirect: data.redirect,
      }
    } catch (error) {
      console.error(`API request error (${endpoint}):`, error)
      return {
        success: false,
        message: 'Terjadi kesalahan, silakan coba lagi',
      }
    }
  }

  /**
   * Start OTP countdown timer
   */
  const startOtpTimer = (): void => {
    otpExpiry.value = otpExpiryTime
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

  /**
   * Clear OTP timer
   */
  const clearOtpTimer = (): void => {
    if (otpTimer.value) {
      clearInterval(otpTimer.value)
      otpTimer.value = null
    }
  }

  /**
   * Send OTP to email
   */
  const sendOtp = async (): Promise<boolean> => {
    if (isSendingOtp.value || !isFormValid.value) return false

    errorMessage.value = ''
    isSendingOtp.value = true

    try {
      const result = await apiRequest('/send-otp', {
        email: form.value.email,
        password: form.value.password,
      })

      if (result.success) {
        step.value = 'otp'
        startOtpTimer()
        toast.success(result.message || 'Kode OTP telah dikirim ke email Anda')
        return true
      } else {
        errorMessage.value = result.message || 'Gagal mengirim OTP'
        toast.error(result.message || 'Gagal mengirim OTP')
        return false
      }
    } finally {
      isSendingOtp.value = false
    }
  }

  /**
   * Verify OTP and complete login
   */
  const verifyOtp = async (redirectTo: string): Promise<boolean> => {
    if (isLoading.value || !isOtpValid.value) return false

    errorMessage.value = ''
    isLoading.value = true

    try {
      const result = await apiRequest('/verify-otp', {
        email: form.value.email,
        otp: otpCode.value,
        remember: form.value.remember,
        redirect: redirectTo,
      })

      if (result.success) {
        toast.success(result.message || 'Login berhasil!')
        setTimeout(() => {
          window.location.href = result.redirect || defaultRedirect
        }, 500)
        return true
      } else {
        errorMessage.value = result.message || 'Verifikasi OTP gagal'
        toast.error(result.message || 'Verifikasi OTP gagal')
        return false
      }
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Resend OTP code
   */
  const resendOtp = async (): Promise<boolean> => {
    if (!canResend.value || isSendingOtp.value) return false

    isSendingOtp.value = true
    errorMessage.value = ''

    try {
      const result = await apiRequest('/resend-otp', {
        email: form.value.email,
        type: 'login',
      })

      if (result.success) {
        toast.success('Kode OTP baru telah dikirim')
        startOtpTimer()
        otpCode.value = ''
        return true
      } else {
        toast.error(result.message || 'Gagal mengirim ulang OTP')
        return false
      }
    } finally {
      isSendingOtp.value = false
    }
  }

  /**
   * Go back to credentials step
   */
  const goBack = (): void => {
    step.value = 'credentials'
    otpCode.value = ''
    errorMessage.value = ''
    clearOtpTimer()
  }

  /**
   * Reset all state
   */
  const reset = (): void => {
    step.value = 'credentials'
    form.value = { email: '', password: '', remember: false }
    otpCode.value = ''
    errorMessage.value = ''
    isLoading.value = false
    isSendingOtp.value = false
    clearOtpTimer()
  }

  /**
   * Set form values (useful for pre-filling)
   */
  const setForm = (data: Partial<AdminLoginForm>): void => {
    form.value = { ...form.value, ...data }
  }

  // Cleanup timer on unmount
  onUnmounted(() => {
    clearOtpTimer()
  })

  return {
    // State
    step,
    form,
    otpCode,
    otpExpiry,
    canResend,
    isLoading,
    isSendingOtp,
    errorMessage,

    // Computed
    isCredentialsStep,
    isOtpStep,
    isFormValid,
    isOtpValid,
    formattedOtpExpiry,

    // Methods
    sendOtp,
    verifyOtp,
    resendOtp,
    goBack,
    reset,
    setForm,
    formatTime,
  }
}
