import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

interface WishlistItemData {
  id: number
  productId: number
  product: {
    id: number
    name: string
    slug: string
    price: number
    discountPrice: number | null
    images: Array<{ url: string; alt: string | null }>
  }
  createdAt: string
}

interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}

const wishlistCount = ref(0)
const wishlistItems = ref<WishlistItemData[]>([])
const isLoading = ref(false)

/**
 * Get XSRF token from cookie
 */
function getXsrfToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

export function useWishlist() {
  const fetchWishlistItems = async (): Promise<void> => {
    try {
      const response = await fetch('/api/wishlist', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const data: ApiResponse<{ items: WishlistItemData[] }> = await response.json()
        wishlistItems.value = data.data?.items || []
        wishlistCount.value = wishlistItems.value.length
      }
    } catch {
      // Silently fail
    }
  }

  const toggleWishlist = async (
    productId: number
  ): Promise<ApiResponse<{ isWishlisted: boolean }>> => {
    isLoading.value = true

    try {
      const xsrfToken = getXsrfToken()
      const response = await fetch('/api/wishlist/toggle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        credentials: 'include',
        body: JSON.stringify({ productId }),
      })

      const data: ApiResponse<{ isWishlisted: boolean }> = await response.json()

      if (response.status === 401) {
        // Not authenticated - redirect to login with return URL
        const currentPath = globalThis.window?.location?.pathname || '/'
        router.visit(`/login?redirect=${encodeURIComponent(currentPath)}`)
        return { success: false, message: 'Silakan login terlebih dahulu' }
      }

      if (data.success) {
        await fetchWishlistItems()
      }

      return data
    } catch (error) {
      console.error('Toggle wishlist error:', error)
      return { success: false, message: 'Terjadi kesalahan, silakan coba lagi' }
    } finally {
      isLoading.value = false
    }
  }

  const checkWishlist = async (productId: number): Promise<boolean> => {
    try {
      const response = await fetch(`/api/wishlist/check/${productId}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const data: ApiResponse<{ isWishlisted: boolean }> = await response.json()
        return data.data?.isWishlisted || false
      }

      return false
    } catch {
      return false
    }
  }

  const removeFromWishlist = async (productId: number): Promise<ApiResponse> => {
    isLoading.value = true

    try {
      const xsrfToken = getXsrfToken()
      const response = await fetch(`/api/wishlist/${productId}`, {
        method: 'DELETE',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
        },
        credentials: 'include',
      })

      const data: ApiResponse = await response.json()

      if (data.success) {
        await fetchWishlistItems()
      }

      return data
    } catch (error) {
      console.error('Remove from wishlist error:', error)
      return { success: false, message: 'Terjadi kesalahan, silakan coba lagi' }
    } finally {
      isLoading.value = false
    }
  }

  const fetchWishlistCount = async (): Promise<void> => {
    try {
      const response = await fetch('/api/wishlist/count', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
        },
        credentials: 'include',
      })

      if (response.ok) {
        const data: ApiResponse<{ count: number }> = await response.json()
        wishlistCount.value = data.data?.count || 0
      }
    } catch {
      // Silently fail - user might not be logged in
    }
  }

  return {
    wishlistCount,
    wishlistItems,
    isLoading,
    toggleWishlist,
    checkWishlist,
    removeFromWishlist,
    fetchWishlistItems,
    fetchWishlistCount,
  }
}
