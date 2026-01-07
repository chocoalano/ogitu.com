import { ref, computed, watch, onMounted } from 'vue'
import { router } from '@inertiajs/vue3'
import type {
  ProductDetail,
  ProductVariant,
  ProductImage,
  BreadcrumbItem,
  CategoryBreadcrumb,
} from '../types/product_detail.js'
import { useCart } from './use_cart.js'
import { useWishlist } from './use_wishlist.js'
import { useToast } from './use_toast.js'

export function useProductDetail(
  product: ProductDetail,
  categoryBreadcrumb: CategoryBreadcrumb | null
) {
  // Composables
  const { addToCart: addToCartApi } = useCart()
  const { toggleWishlist: toggleWishlistApi, checkWishlist } = useWishlist()
  const toast = useToast()

  // State
  const selectedVariant = ref<ProductVariant | null>(null)
  const quantity = ref(1)
  const isWishlisted = ref(false)
  const isAddingToCart = ref(false)
  const isBuyingNow = ref(false)
  const isTogglingWishlist = ref(false)

  // Computed - Price
  const currentPrice = computed(() => {
    const basePrice = Number(product.discountPrice) || Number(product.price)
    if (selectedVariant.value) {
      // Use pre-calculated price from variant if available, otherwise calculate
      return (
        selectedVariant.value.price ??
        basePrice + (Number(selectedVariant.value.priceAdjustment) || 0)
      )
    }
    return basePrice
  })

  const formattedCurrentPrice = computed(() => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(currentPrice.value)
  })

  const formattedOriginalPrice = computed(() => {
    if (!product.discountPrice) return null
    const basePrice = Number(product.price)
    const price = selectedVariant.value
      ? basePrice + (Number(selectedVariant.value.priceAdjustment) || 0)
      : basePrice
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price)
  })

  // Computed - Stock
  const currentStock = computed(() => {
    if (selectedVariant.value) {
      return selectedVariant.value.stock
    }
    return product.stock
  })

  const isOutOfStock = computed(() => currentStock.value <= 0)

  // Computed - Images
  const productImages = computed((): ProductImage[] => {
    if (product.images.length === 0) {
      return [{ id: 0, url: product.image, altText: product.name, isPrimary: true }]
    }
    return product.images
  })

  // Computed - Variants
  const variantGroups = computed(() => {
    const groups: Record<string, ProductVariant[]> = {}
    product.variants.forEach((variant: ProductVariant) => {
      if (!groups[variant.name]) {
        groups[variant.name] = []
      }
      groups[variant.name].push(variant)
    })
    return groups
  })

  // Computed - Breadcrumb
  const breadcrumbItems = computed((): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Home', href: '/' },
      { label: 'Koleksi', href: '/collections' },
    ]

    if (categoryBreadcrumb?.parent) {
      items.push({
        label: categoryBreadcrumb.parent.name,
        href: categoryBreadcrumb.parent.href,
      })
    }

    if (categoryBreadcrumb) {
      items.push({
        label: categoryBreadcrumb.name,
        href: categoryBreadcrumb.href,
      })
    }

    items.push({ label: product.name, href: '#' })

    return items
  })

  // Methods
  const selectVariant = (variant: ProductVariant) => {
    selectedVariant.value = variant
    quantity.value = 1
  }

  const setQuantity = (value: number) => {
    quantity.value = Math.max(1, Math.min(value, currentStock.value))
  }

  const toggleWishlist = async () => {
    if (isTogglingWishlist.value) return

    isTogglingWishlist.value = true
    const result = await toggleWishlistApi(product.id)

    if (result.success && result.data) {
      isWishlisted.value = result.data.isWishlisted
      showToast(
        'success',
        result.data.isWishlisted ? 'Produk ditambahkan ke wishlist' : 'Produk dihapus dari wishlist'
      )
    } else if (result.message) {
      showToast('error', result.message)
    }

    isTogglingWishlist.value = false
  }

  const addToCart = async () => {
    if (isAddingToCart.value || isOutOfStock.value) return

    // Check if variant required but not selected
    if (product.variants.length > 0 && !selectedVariant.value) {
      showToast('error', 'Silakan pilih varian terlebih dahulu')
      return
    }

    isAddingToCart.value = true
    const result = await addToCartApi({
      productId: product.id,
      variantId: selectedVariant.value?.id,
      quantity: quantity.value,
    })

    if (result.success) {
      showToast('success', 'Produk berhasil ditambahkan ke keranjang')
    } else if (result.message) {
      showToast('error', result.message)
    }

    isAddingToCart.value = false
  }

  const buyNow = async () => {
    if (isBuyingNow.value || isOutOfStock.value) return

    // Check if variant required but not selected
    if (product.variants.length > 0 && !selectedVariant.value) {
      showToast('error', 'Silakan pilih varian terlebih dahulu')
      return
    }

    isBuyingNow.value = true
    const result = await addToCartApi({
      productId: product.id,
      variantId: selectedVariant.value?.id,
      quantity: quantity.value,
    })

    if (result.success) {
      // Redirect to checkout page
      router.visit('/checkout')
    } else if (result.message) {
      showToast('error', result.message)
    }

    isBuyingNow.value = false
  }

  const showToast = (type: 'success' | 'error', message: string) => {
    if (type === 'success') {
      toast.success(message)
    } else {
      toast.error(message)
    }
  }

  const shareProduct = async (url: string) => {
    if (typeof globalThis.navigator !== 'undefined' && 'share' in globalThis.navigator) {
      try {
        await (globalThis.navigator as Navigator).share({
          title: product.name,
          text: `Check out ${product.name} at Ogitu!`,
          url,
        })
      } catch (err) {
        // User cancelled or error
        console.error('Share cancelled or failed:', err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        if (typeof globalThis.navigator !== 'undefined' && globalThis.navigator.clipboard) {
          await globalThis.navigator.clipboard.writeText(url)
          toast.success('Link produk berhasil disalin')
        }
      } catch {
        toast.error('Gagal menyalin link')
      }
    }
  }

  // Watch for variant changes to reset quantity if needed
  watch(selectedVariant, (newVariant) => {
    if (newVariant && quantity.value > newVariant.stock) {
      quantity.value = Math.max(1, newVariant.stock)
    }
  })

  // Check wishlist status on mount
  onMounted(async () => {
    isWishlisted.value = await checkWishlist(product.id)
  })

  return {
    // State
    selectedVariant,
    quantity,
    isWishlisted,
    isAddingToCart,
    isBuyingNow,
    isTogglingWishlist,
    // Computed
    currentPrice,
    formattedCurrentPrice,
    formattedOriginalPrice,
    currentStock,
    isOutOfStock,
    productImages,
    variantGroups,
    breadcrumbItems,
    // Methods
    selectVariant,
    setQuantity,
    toggleWishlist,
    addToCart,
    buyNow,
    shareProduct,
    showToast,
  }
}
