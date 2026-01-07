import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

interface CartItemInput {
  productId: number
  variantId?: number | null
  quantity: number
}

interface CartItemData {
  id: number
  productId: number
  variantId: number | null
  quantity: number
  checked: boolean
  product: {
    id: number
    name: string
    slug: string
    price: number
    discountPrice: number | null
    images: Array<{ url: string; alt: string | null }>
  }
  variant?: {
    id: number
    name: string
    price: number
  } | null
}

interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}

const cartCount = ref(0)
const cartItems = ref<CartItemData[]>([])
const isLoading = ref(false)

/**
 * Get XSRF token from cookie
 */
function getXsrfToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export function useCart() {
  const fetchCartItems = async (): Promise<void> => {
    try {
      const response = await fetch('/api/cart', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const data: ApiResponse<{ items: CartItemData[] }> = await response.json()
        cartItems.value = data.data?.items || []
        cartCount.value = cartItems.value.length
      }
    } catch {
      // Silently fail
    }
  }

  const addToCart = async (item: CartItemInput): Promise<ApiResponse> => {
    isLoading.value = true

    try {
      const xsrfToken = getXsrfToken()
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify(item),
      })

      const data: ApiResponse = await response.json()

      if (response.status === 401) {
        const currentPath = globalThis.window?.location?.pathname || '/'
        router.visit(`/login?redirect=${encodeURIComponent(currentPath)}`)
        return { success: false, message: 'Silakan login terlebih dahulu' }
      }

      if (data.success) {
        await fetchCartItems()
      }

      return data
    } catch (error) {
      console.error('Add to cart error:', error)
      return { success: false, message: 'Terjadi kesalahan, silakan coba lagi' }
    } finally {
      isLoading.value = false
    }
  }

  const updateCartItem = async (id: number, quantity: number): Promise<ApiResponse> => {
    isLoading.value = true

    try {
      const xsrfToken = getXsrfToken()
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ quantity }),
      })

      const data: ApiResponse = await response.json()

      if (data.success) {
        await fetchCartItems()
      }

      return data
    } catch (error) {
      console.error('Update cart error:', error)
      return { success: false, message: 'Terjadi kesalahan, silakan coba lagi' }
    } finally {
      isLoading.value = false
    }
  }

  const removeFromCart = async (id: number): Promise<ApiResponse> => {
    isLoading.value = true

    try {
      const xsrfToken = getXsrfToken()
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        credentials: 'include',
      })

      const data: ApiResponse = await response.json()

      if (data.success) {
        await fetchCartItems()
      }

      return data
    } catch (error) {
      console.error('Remove from cart error:', error)
      return { success: false, message: 'Terjadi kesalahan, silakan coba lagi' }
    } finally {
      isLoading.value = false
    }
  }

  const fetchCartCount = async (): Promise<void> => {
    try {
      const response = await fetch('/api/cart/count', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const data: ApiResponse<{ count: number }> = await response.json()
        cartCount.value = data.data?.count || 0
      }
    } catch {
      // Silently fail - user might not be logged in
    }
  }

  const updateCartItemChecked = async (id: number, checked: boolean): Promise<ApiResponse> => {
    try {
      const xsrfToken = getXsrfToken()
      const response = await fetch(`/api/cart/${id}/checked`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ checked }),
      })

      const data: ApiResponse = await response.json()
      return data
    } catch (error) {
      console.error('Update cart item checked error:', error)
      return { success: false, message: 'Terjadi kesalahan, silakan coba lagi' }
    }
  }

  return {
    cartCount,
    cartItems,
    isLoading,
    addToCart,
    updateCartItem,
    removeFromCart,
    fetchCartItems,
    fetchCartCount,
    updateCartItemChecked,
  }
}
