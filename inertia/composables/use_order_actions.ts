import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from './use_toast.js'
import type { ShippingFormData } from '../types/admin_order.js'

// API Response type
interface ApiResponse {
  success: boolean
  message?: string
  tracking?: unknown
}

// Get CSRF token
function getToken(): string {
  if (typeof document === 'undefined') return ''
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

export function useOrderActions() {
  const toast = useToast()
  const isLoading = ref(false)

  // Process order (paid -> processing)
  const processOrder = async (orderId: number): Promise<boolean> => {
    isLoading.value = true
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/process`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'X-XSRF-TOKEN': getToken(),
        },
      })

      const data = (await response.json()) as ApiResponse

      if (data.success) {
        toast.success('Berhasil', 'Pesanan sedang diproses')
        return true
      } else {
        toast.error('Gagal', data.message || 'Gagal memproses')
        return false
      }
    } catch (error) {
      toast.error('Error', 'Terjadi kesalahan saat memproses pesanan')
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Submit shipping info (add or update)
  const submitShipping = async (
    orderId: number,
    form: ShippingFormData,
    isUpdate: boolean = false
  ): Promise<boolean> => {
    if (!form.courierCode || !form.waybill) {
      toast.error('Error', 'Kurir dan nomor resi wajib diisi')
      return false
    }

    isLoading.value = true
    try {
      const method = isUpdate ? 'PUT' : 'POST'
      const url = `/api/admin/orders/${orderId}/shipping`

      const response = await fetch(url, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getToken(),
        },
        body: JSON.stringify(form),
      })

      const data = (await response.json()) as ApiResponse

      if (data.success) {
        toast.success('Berhasil', isUpdate ? 'Data pengiriman diperbarui' : 'Pesanan telah dikirim')
        return true
      } else {
        toast.error('Gagal', data.message || 'Gagal menyimpan')
        return false
      }
    } catch (error) {
      toast.error('Error', 'Terjadi kesalahan saat menyimpan data pengiriman')
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Refresh tracking
  const refreshTracking = async (orderId: number): Promise<unknown | null> => {
    isLoading.value = true
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/track`, {
        headers: { Accept: 'application/json' },
      })

      const data = (await response.json()) as ApiResponse

      if (data.success) {
        toast.success('Berhasil', 'Data tracking diperbarui')
        return data.tracking
      } else {
        toast.warning('Info', data.message || 'Data tracking belum tersedia')
        return null
      }
    } catch (error) {
      toast.error('Error', 'Gagal memuat data tracking')
      return null
    } finally {
      isLoading.value = false
    }
  }

  // Cancel order
  const cancelOrder = async (orderId: number, reason: string = ''): Promise<boolean> => {
    isLoading.value = true
    try {
      const response = await fetch(`/api/admin/orders/${orderId}/cancel`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getToken(),
        },
        body: JSON.stringify({ reason }),
      })

      const data = (await response.json()) as ApiResponse

      if (data.success) {
        toast.success('Berhasil', 'Pesanan dibatalkan')
        return true
      } else {
        toast.error('Gagal', data.message || 'Gagal membatalkan')
        return false
      }
    } catch (error) {
      toast.error('Error', 'Terjadi kesalahan saat membatalkan pesanan')
      return false
    } finally {
      isLoading.value = false
    }
  }

  // Reload page data
  const reloadOrders = (only: string[] = ['orders', 'stats']) => {
    router.reload({ only })
  }

  const reloadPage = () => {
    router.reload()
  }

  // Copy to clipboard
  const copyToClipboard = (text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text)
      toast.success('Disalin', 'Teks berhasil disalin ke clipboard')
    }
  }

  return {
    isLoading,
    processOrder,
    submitShipping,
    refreshTracking,
    cancelOrder,
    reloadOrders,
    reloadPage,
    copyToClipboard,
  }
}
