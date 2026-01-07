<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import AppLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'
import type { Product, Category, PaginationMeta } from '~/types/product'

// Components
import ProductCard from '~/components/ProductCard.vue'
import ProductCardList from '~/components/ProductCardList.vue'

interface Filters {
  brand: string
  minPrice: string
  maxPrice: string
}

const props = defineProps<{
  products: Product[]
  meta: PaginationMeta
  categories: Category[]
  brands: string[]
  filters: Filters
}>()

// Local state
const viewMode = ref<'grid' | 'list'>('grid')
const currentPage = ref(props.meta.currentPage)
const localFilters = ref({ ...props.filters })

// Computed
const totalPages = computed(() => props.meta.lastPage)

// Apply filters
const applyFilters = () => {
  const params = new URLSearchParams()
  if (localFilters.value.brand && localFilters.value.brand !== 'all') params.set('brand', localFilters.value.brand)
  if (localFilters.value.minPrice) params.set('minPrice', localFilters.value.minPrice)
  if (localFilters.value.maxPrice) params.set('maxPrice', localFilters.value.maxPrice)
  if (currentPage.value > 1) params.set('page', String(currentPage.value))

  const queryString = params.toString()
  window.location.href = `/new-arrival${queryString ? `?${queryString}` : ''}`
}

// Clear filters
const clearFilters = () => {
  localFilters.value = { brand: 'all', minPrice: '', maxPrice: '' }
  window.location.href = '/new-arrival'
}

// Go to page
const goToPage = (page: number) => {
  currentPage.value = page
  applyFilters()
}

// Handle product actions
const toast = useToast()
const isAddingToCart = ref<number | null>(null)
const isTogglingWishlist = ref<number | null>(null)

// Get CSRF token from cookie
const getToken = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

const handleAddToCart = async (product: Product) => {
  if (isAddingToCart.value) return

  isAddingToCart.value = product.id

  try {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getToken(),
      },
      credentials: 'include',
      body: JSON.stringify({
        productId: product.id,
        quantity: 1,
      }),
    })

    const data = await response.json()

    if (response.status === 401) {
      toast.warning('Login Diperlukan', 'Silakan login untuk menambahkan ke keranjang')
      router.visit('/login')
      return
    }

    if (data.success) {
      toast.success('Berhasil', data.message || 'Produk ditambahkan ke keranjang')
    } else {
      toast.error('Gagal', data.message || 'Gagal menambahkan ke keranjang')
    }
  } catch (error) {
    console.error('Add to cart error:', error)
    toast.error('Error', 'Terjadi kesalahan saat menambahkan ke keranjang')
  } finally {
    isAddingToCart.value = null
  }
}

const handleAddToWishlist = async (product: Product) => {
  if (isTogglingWishlist.value) return

  isTogglingWishlist.value = product.id

  try {
    const response = await fetch('/api/wishlist/toggle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getToken(),
      },
      credentials: 'include',
      body: JSON.stringify({
        productId: product.id,
      }),
    })

    const data = await response.json()

    if (response.status === 401) {
      toast.warning('Login Diperlukan', 'Silakan login untuk menambahkan ke wishlist')
      router.visit('/login')
      return
    }

    if (data.success) {
      if (data.data?.isWishlisted) {
        toast.success('Berhasil', 'Produk ditambahkan ke wishlist')
      } else {
        toast.info('Info', 'Produk dihapus dari wishlist')
      }
    } else {
      toast.error('Gagal', data.message || 'Gagal memproses wishlist')
    }
  } catch (error) {
    console.error('Toggle wishlist error:', error)
    toast.error('Error', 'Terjadi kesalahan saat memproses wishlist')
  } finally {
    isTogglingWishlist.value = null
  }
}

// SEO
const siteUrl = 'https://ogitu.com'
const pageTitle = 'Produk Terbaru - New Arrival Vape & Rokok Elektrik | Ogitu'
const pageDescription = `Jelajahi ${props.meta.total}+ produk vape terbaru yang baru saja datang. Pod system, mod kit, liquid premium terkini dari brand ternama. Jadilah yang pertama memilikinya!`

// JSON-LD Structured Data
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Produk Terbaru Vape & Rokok Elektrik',
  description: pageDescription,
  url: `${siteUrl}/new-arrival`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: props.meta.total,
    itemListElement: props.products.slice(0, 10).map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        image: product.image,
        url: `${siteUrl}/products/${product.slug}`,
        offers: {
          '@type': 'Offer',
          price: product.discountPrice || product.price,
          priceCurrency: 'IDR',
          availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        },
      },
    })),
  },
}))

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(structuredData.value)),
    },
  ],
})

defineOptions({ layout: AppLayout })
</script>

<template>
  <Head>
    <title>{{ pageTitle }}</title>
    <meta name="description" :content="pageDescription" />
    <meta name="robots" content="index, follow" />
    <link rel="canonical" :href="`${siteUrl}/new-arrival`" />
    <meta property="og:title" :content="pageTitle" />
    <meta property="og:description" :content="pageDescription" />
    <meta property="og:type" content="website" />
    <meta property="og:url" :content="`${siteUrl}/new-arrival`" />
  </Head>

  <div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
    <!-- Background Effects -->
    <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div class="absolute top-0 left-1/4 w-125 h-125 bg-cyan-500/10 rounded-full blur-3xl" />
      <div class="absolute top-1/3 right-1/4 w-100 h-100 bg-blue-500/10 rounded-full blur-3xl" />
      <div class="absolute bottom-1/4 left-1/2 w-150 h-75 bg-purple-500/5 rounded-full blur-3xl" />
    </div>

    <!-- Hero Section -->
    <div class="relative bg-linear-to-r from-cyan-500 via-blue-500 to-purple-500 overflow-hidden">
      <!-- Animated Particles -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-10 left-10 w-4 h-4 bg-white/30 rounded-full animate-float" />
        <div class="absolute top-20 right-20 w-3 h-3 bg-white/20 rounded-full animate-float-delayed" />
        <div class="absolute bottom-10 left-1/3 w-5 h-5 bg-white/25 rounded-full animate-float" />
        <div class="absolute top-1/2 right-1/4 w-2 h-2 bg-white/30 rounded-full animate-float-delayed" />
      </div>

      <!-- Pattern Overlay -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="star-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <polygon points="40,5 45,35 75,35 50,55 60,85 40,65 20,85 30,55 5,35 35,35" fill="white" opacity="0.3" transform="scale(0.3) translate(60, 60)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#star-pattern)" />
        </svg>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <!-- Breadcrumb -->
        <nav class="flex items-center gap-2 text-sm mb-6 text-white/80">
          <Link href="/" class="hover:text-white transition-colors">
            <UIcon name="i-heroicons-home" class="w-4 h-4" />
          </Link>
          <UIcon name="i-heroicons-chevron-right" class="w-4 h-4" />
          <span class="text-white font-medium">New Arrival</span>
        </nav>

        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div class="flex items-center gap-4 mb-4">
              <div class="relative">
                <div class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <UIcon name="i-heroicons-sparkles" class="w-8 h-8 text-white" />
                </div>
                <!-- NEW Badge -->
                <div class="absolute -top-2 -right-2 px-2 py-0.5 bg-yellow-400 text-yellow-900 text-xs font-bold rounded-full animate-pulse">
                  NEW
                </div>
              </div>
              <div>
                <h1 class="text-3xl sm:text-4xl font-bold text-white">New Arrival</h1>
                <p class="text-white/80 mt-1">Produk Terbaru Untuk Kamu</p>
              </div>
            </div>
            <p class="text-white/70 max-w-xl">
              Jadilah yang pertama mencoba produk vape terbaru! Update koleksimu dengan inovasi terkini dari brand ternama.
            </p>
          </div>

          <!-- Stats -->
          <div class="flex gap-6">
            <div class="text-center">
              <p class="text-3xl font-bold text-white">{{ meta.total }}+</p>
              <p class="text-sm text-white/70">Produk Baru</p>
            </div>
            <div class="text-center">
              <p class="text-3xl font-bold text-white">Weekly</p>
              <p class="text-sm text-white/70">Update</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Toolbar -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div class="flex items-center gap-4">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Menampilkan <span class="font-medium text-gray-900 dark:text-white">{{ products.length }}</span>
            dari <span class="font-medium text-gray-900 dark:text-white">{{ meta.total }}</span> produk
          </p>
        </div>

        <div class="flex items-center gap-3">
          <!-- Brand Filter -->
          <USelectMenu
            v-model="localFilters.brand"
            :items="[{ label: 'Semua Brand', value: 'all' }, ...brands.map(b => ({ label: b, value: b }))]"
            placeholder="Filter Brand"
            value-key="value"
            class="w-40"
            @update:model-value="applyFilters"
          />

          <!-- View Mode Toggle -->
          <div class="hidden sm:flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <UButton
              :color="viewMode === 'grid' ? 'primary' : 'neutral'"
              :variant="viewMode === 'grid' ? 'solid' : 'ghost'"
              size="sm"
              square
              @click="viewMode = 'grid'"
            >
              <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4" />
            </UButton>
            <UButton
              :color="viewMode === 'list' ? 'primary' : 'neutral'"
              :variant="viewMode === 'list' ? 'solid' : 'ghost'"
              size="sm"
              square
              @click="viewMode = 'list'"
            >
              <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div v-if="products.length > 0">
        <!-- Grid View -->
        <div
          v-if="viewMode === 'grid'"
          class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
        >
          <div
            v-for="product in products"
            :key="product.id"
            class="relative"
          >
            <!-- NEW Badge for recent products -->
            <div class="absolute top-2 left-2 z-10 px-2 py-1 bg-cyan-500 text-white text-xs font-bold rounded-lg shadow-lg">
              <span class="flex items-center gap-1">
                <UIcon name="i-heroicons-sparkles" class="w-3 h-3" />
                BARU
              </span>
            </div>
            <ProductCard
              :product="product"
              @add-to-cart="handleAddToCart"
              @add-to-wishlist="handleAddToWishlist"
            />
          </div>
        </div>

        <!-- List View -->
        <div v-else class="space-y-4">
          <div
            v-for="product in products"
            :key="product.id"
            class="relative"
          >
            <ProductCardList
              :product="product"
              @add-to-cart="handleAddToCart"
              @add-to-wishlist="handleAddToWishlist"
            />
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="totalPages > 1" class="mt-8 flex justify-center">
          <UPagination
            v-model:page="currentPage"
            :total="meta.total"
            :items-per-page="meta.perPage"
            show-edges
            @update:page="goToPage"
          />
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-6 rounded-3xl bg-cyan-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-sparkles" class="w-12 h-12 text-cyan-500" />
        </div>
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Belum Ada Produk Baru</h2>
        <p class="text-gray-500 dark:text-gray-400 mb-6">Coba ubah filter atau cek kembali nanti untuk produk terbaru.</p>
        <UButton color="primary" @click="clearFilters">
          Reset Filter
        </UButton>
      </div>
    </div>

    <!-- Features Section -->
    <div class="bg-white dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 class="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Keuntungan Belanja Produk Terbaru
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="text-center p-6">
            <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-cyan-500/10 flex items-center justify-center">
              <UIcon name="i-heroicons-bolt" class="w-7 h-7 text-cyan-500" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Teknologi Terkini</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Dapatkan fitur dan teknologi vaping terbaru dari inovasi brand ternama
            </p>
          </div>
          <div class="text-center p-6">
            <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <UIcon name="i-heroicons-gift" class="w-7 h-7 text-blue-500" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">Promo Launching</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Nikmati harga spesial dan bonus eksklusif untuk produk baru
            </p>
          </div>
          <div class="text-center p-6">
            <div class="w-14 h-14 mx-auto mb-4 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <UIcon name="i-heroicons-clock" class="w-7 h-7 text-purple-500" />
            </div>
            <h3 class="font-semibold text-gray-900 dark:text-white mb-2">First to Try</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              Jadilah yang pertama merasakan sensasi vaping dengan produk terbaru
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Newsletter CTA -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-linear-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl p-8 border border-cyan-500/20 text-center">
        <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-linear-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
          <UIcon name="i-heroicons-bell-alert" class="w-8 h-8 text-white" />
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Jangan Ketinggalan Produk Terbaru!
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
          Subscribe untuk mendapat notifikasi setiap ada produk baru dan promo eksklusif
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
          <UInput
            placeholder="Email kamu..."
            size="lg"
            class="w-full sm:flex-1"
          />
          <UButton color="primary" size="lg">
            Subscribe
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-15px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 4s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 5s ease-in-out infinite;
  animation-delay: 1s;
}
</style>
