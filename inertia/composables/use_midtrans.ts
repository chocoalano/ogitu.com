import { ref } from 'vue'

// Declare Midtrans Snap type
declare global {
  interface Window {
    snap: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: MidtransResult) => void
          onPending?: (result: MidtransResult) => void
          onError?: (result: MidtransResult) => void
          onClose?: () => void
        }
      ) => void
      hide: () => void
    }
  }
}

export interface MidtransResult {
  order_id: string
  transaction_id?: string
  gross_amount?: string
  payment_type?: string
  transaction_time?: string
  transaction_status?: string
  fraud_status?: string
  finish_redirect_url?: string
  status_code?: string
  status_message?: string
}

export function useMidtrans() {
  const isPaymentOpen = ref(false)
  const paymentResult = ref<MidtransResult | null>(null)
  const paymentError = ref<string | null>(null)

  /**
   * Check if Midtrans Snap is loaded
   */
  const isSnapLoaded = (): boolean => {
    return typeof globalThis.window !== 'undefined' && (globalThis.window as typeof window).snap !== undefined
  }

  /**
   * Open Midtrans Snap payment popup
   */
  const openSnapPopup = (
    snapToken: string,
    options?: {
      onSuccess?: (result: MidtransResult) => void
      onPending?: (result: MidtransResult) => void
      onError?: (result: MidtransResult) => void
      onClose?: () => void
    }
  ): Promise<{ success: boolean; result?: MidtransResult; error?: string }> => {
    return new Promise((resolve) => {
      if (!isSnapLoaded()) {
        const error = 'Midtrans Snap belum dimuat. Silakan refresh halaman.'
        paymentError.value = error
        resolve({ success: false, error })
        return
      }

      isPaymentOpen.value = true
      paymentError.value = null
      paymentResult.value = null

      ;(globalThis.window as typeof window).snap.pay(snapToken, {
        onSuccess: (result: MidtransResult) => {
          console.log('Payment success:', result)
          paymentResult.value = result
          isPaymentOpen.value = false
          options?.onSuccess?.(result)
          resolve({ success: true, result })
        },
        onPending: (result: MidtransResult) => {
          console.log('Payment pending:', result)
          paymentResult.value = result
          isPaymentOpen.value = false
          options?.onPending?.(result)
          resolve({ success: true, result })
        },
        onError: (result: MidtransResult) => {
          console.error('Payment error:', result)
          paymentResult.value = result
          paymentError.value = result.status_message || 'Pembayaran gagal'
          isPaymentOpen.value = false
          options?.onError?.(result)
          resolve({ success: false, result, error: paymentError.value ?? undefined })
        },
        onClose: () => {
          console.log('Payment popup closed')
          isPaymentOpen.value = false
          options?.onClose?.()
          // Don't resolve here to let the user try again
          if (!paymentResult.value) {
            resolve({ success: false, error: 'Pembayaran dibatalkan' })
          }
        },
      })
    })
  }

  /**
   * Open Midtrans Snap and handle callbacks
   */
  const payWithSnap = async (
    snapToken: string,
    options?: {
      onSuccess?: (result?: MidtransResult) => void | Promise<void>
      onPending?: (result?: MidtransResult) => void | Promise<void>
      onError?: (message: string) => void
      onClose?: () => void
    }
  ) => {
    const result = await openSnapPopup(snapToken, {
      onSuccess: async (res) => {
        console.log('Midtrans success result:', res)
        await options?.onSuccess?.(res)
      },
      onPending: async (res) => {
        console.log('Midtrans pending result:', res)
        await options?.onPending?.(res)
      },
      onError: (res) => {
        options?.onError?.(res.status_message || 'Pembayaran gagal')
      },
      onClose: () => {
        options?.onClose?.()
      },
    })

    return result
  }

  return {
    isPaymentOpen,
    paymentResult,
    paymentError,
    isSnapLoaded,
    openSnapPopup,
    payWithSnap,
  }
}
