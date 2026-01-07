/**
 * Profile Composable
 * Handles profile edit logic and data formatting
 */
import { ref, computed, type Ref } from 'vue'
import type { ProfileCustomer, ProfileFormData } from '~/components/profile/types'

interface UseProfileConfig {
  customer: ProfileCustomer
}

export function useProfile({ customer }: UseProfileConfig) {
  // State
  const isEditing = ref(false)
  const isSaving = ref(false)
  const error = ref<string | null>(null)

  // Form data
  const form: Ref<ProfileFormData> = ref({
    fullName: customer.fullName,
    phone: customer.phone || '',
  })

  // Computed
  const initials = computed(() => {
    return customer.fullName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  })

  const hasChanges = computed(() => {
    return form.value.fullName !== customer.fullName || form.value.phone !== (customer.phone || '')
  })

  // Formatters
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Get XSRF token
  const getXsrfToken = (): string | null => {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
    return match ? decodeURIComponent(match[1]) : null
  }

  // Actions
  const startEditing = () => {
    isEditing.value = true
    error.value = null
  }

  const cancelEdit = () => {
    form.value.fullName = customer.fullName
    form.value.phone = customer.phone || ''
    isEditing.value = false
    error.value = null
  }

  const saveProfile = async (): Promise<boolean> => {
    if (!hasChanges.value) {
      isEditing.value = false
      return true
    }

    isSaving.value = true
    error.value = null

    try {
      const xsrfToken = getXsrfToken()
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        body: JSON.stringify(form.value),
      })

      const data = await response.json()

      if (data.success) {
        isEditing.value = false
        window.location.reload()
        return true
      } else {
        error.value = data.message || 'Gagal menyimpan profil'
        return false
      }
    } catch (err) {
      console.error('Failed to save profile:', err)
      error.value = 'Terjadi kesalahan saat menyimpan profil'
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    // State
    isEditing,
    isSaving,
    error,
    form,

    // Computed
    initials,
    hasChanges,

    // Formatters
    formatPrice,
    formatDate,

    // Actions
    startEditing,
    cancelEdit,
    saveProfile,
  }
}
