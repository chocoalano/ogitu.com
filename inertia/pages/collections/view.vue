<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import AppLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'
import type { Product, Category, PaginationMeta } from '~/types/product'
import { useCollectionFilters } from '~/composables/use_collection_filters'

// Components
import CollectionToolbar from '~/components/collections/CollectionToolbar.vue'
import CollectionMobileFilter from '~/components/collections/CollectionMobileFilter.vue'
import CollectionEmptyState from '~/components/collections/CollectionEmptyState.vue'
import ProductCard from '~/components/ProductCard.vue'
import ProductCardList from '~/components/ProductCardList.vue'

// Types
interface CategoryDetail {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  parentId: number | null
}

interface CollectionViewFilters {
  brand: string
  minPrice: string | number
  maxPrice: string | number
  sortBy: string
}

// Props
const props = defineProps<{
  category: CategoryDetail
  parentCategory: Category | null
  subcategories: Category[]
  products: Product[]
  meta: PaginationMeta
  brands: string[]
  featuredProducts: Product[]
  newArrivals: Product[]
  filters: CollectionViewFilters
}>()

// Extend filters with empty values for compatibility
const extendedFilters = computed(() => ({
  search: '',
  category: props.category.slug,
  brand: props.filters.brand || '',
  minPrice: String(props.filters.minPrice || ''),
  maxPrice: String(props.filters.maxPrice || ''),
  sortBy: props.filters.sortBy || 'newest',
}))

// Composable
const {
  localFilters,
  isMobileFilterOpen,
  hasActiveFilters,
  activeFilterCount,
  applyFilters,
  clearFilters,
  clearSingleFilter,
  goToPage,
  sortOptions,
} = useCollectionFilters(extendedFilters.value)

// View mode
const viewMode = ref<'grid' | 'list'>('grid')

// Pagination
const currentPage = ref(props.meta.currentPage)
const totalPages = computed(() => props.meta.lastPage)

// Event handlers
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

// SEO - JSON-LD Structured Data
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    // BreadcrumbList
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Beranda',
          item: window.location.origin,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Koleksi',
          item: `${window.location.origin}/collections`,
        },
        ...(props.parentCategory
          ? [
              {
                '@type': 'ListItem',
                position: 3,
                name: props.parentCategory.name,
                item: `${window.location.origin}/collections/${props.parentCategory.slug}`,
              },
              {
                '@type': 'ListItem',
                position: 4,
                name: props.category.name,
                item: `${window.location.origin}/collections/${props.category.slug}`,
              },
            ]
          : [
              {
                '@type': 'ListItem',
                position: 3,
                name: props.category.name,
                item: `${window.location.origin}/collections/${props.category.slug}`,
              },
            ]),
      ],
    },
    // CollectionPage
    {
      '@type': 'CollectionPage',
      name: props.category.name,
      description:
        props.category.description ||
        `Temukan berbagai produk ${props.category.name} berkualitas di Ogitu`,
      url: `${window.location.origin}/collections/${props.category.slug}`,
      ...(props.category.image && { image: props.category.image }),
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
            url: `${window.location.origin}/products/${product.slug}`,
            offers: {
              '@type': 'Offer',
              price: product.discountPrice || product.price,
              priceCurrency: 'IDR',
              availability:
                product.stock > 0
                  ? 'https://schema.org/InStock'
                  : 'https://schema.org/OutOfStock',
            },
            ...(product.rating > 0 && {
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                reviewCount: product.totalReviews,
              },
            }),
          },
        })),
      },
    },
  ],
}))

// Use head for SEO
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(structuredData.value)),
    },
  ],
})

// Page title
const pageTitle = computed(() => `${props.category.name} - Koleksi Produk Vape`)
const pageDescription = computed(
  () =>
    props.category.description ||
    `Jelajahi koleksi ${props.category.name} terlengkap. Temukan ${props.meta.total}+ produk berkualitas dengan harga terbaik hanya di Ogitu.`
)
</script>

<template>
  <AppLayout>
    <Head>
      <title>{{ category.name }}</title>
      <meta name="description" :content="category.description ?? `Jelajahi koleksi ${category.name} terlengkap. Temukan ${meta.total}+ produk berkualitas dengan harga terbaik hanya di Ogitu.`" />
      <meta name="keywords" :content="`${category.name}, vape, e-liquid, pod, mod, ogitu`" />
      <!-- Open Graph -->
      <meta property="og:title" :content="pageTitle" />
      <meta property="og:description" :content="pageDescription" />
      <meta property="og:type" content="website" />
      <meta property="og:url" :content="`${$page.props.appUrl}/collections/${category.slug}`" />
      <meta v-if="category.image" property="og:image" :content="category.image" />
      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" :content="pageTitle" />
      <meta name="twitter:description" :content="pageDescription" />
    </Head>

    <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Category Hero Banner -->
      <div
        class="relative bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 dark:from-primary-800 dark:via-primary-900 dark:to-gray-900"
      >
        <!-- Background Pattern -->
        <div class="absolute inset-0 opacity-10">
          <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="20" cy="20" r="2" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <!-- Category Image Overlay -->
        <div
          v-if="category.image"
          class="absolute inset-0 bg-cover bg-center opacity-20"
          :style="{ backgroundImage: `url(${category.image})` }"
        />

        <UContainer class="relative py-8 lg:py-12">
          <!-- Breadcrumb -->
          <nav class="mb-6" aria-label="Breadcrumb">
            <ol class="flex items-center flex-wrap gap-2 text-sm">
              <li>
                <Link href="/" class="text-white/70 hover:text-white transition-colors">
                  Beranda
                </Link>
              </li>
              <li class="text-white/50">/</li>
              <li>
                <Link href="/collections" class="text-white/70 hover:text-white transition-colors">
                  Koleksi
                </Link>
              </li>
              <template v-if="parentCategory">
                <li class="text-white/50">/</li>
                <li>
                  <Link
                    :href="`/collections/${parentCategory.slug}`"
                    class="text-white/70 hover:text-white transition-colors"
                  >
                    {{ parentCategory.name }}
                  </Link>
                </li>
              </template>
              <li class="text-white/50">/</li>
              <li class="text-white font-medium">{{ category.name }}</li>
            </ol>
          </nav>

          <!-- Category Info -->
          <div class="max-w-3xl">
            <h1 class="text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-4">
              {{ category.name }}
            </h1>
            <p v-if="category.description" class="text-lg text-white/80 mb-6">
              {{ category.description }}
            </p>
            <div class="flex items-center gap-4 text-white/70">
              <span class="flex items-center gap-2">
                <UIcon name="i-heroicons-cube" class="w-5 h-5" />
                {{ meta.total }} Produk
              </span>
              <span v-if="brands.length > 0" class="flex items-center gap-2">
                <UIcon name="i-heroicons-building-storefront" class="w-5 h-5" />
                {{ brands.length }} Brand
              </span>
            </div>
          </div>
        </UContainer>
      </div>

      <!-- Subcategories -->
      <div
        v-if="subcategories.length > 0"
        class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      >
        <UContainer class="py-4">
          <div class="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <span class="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
              >Subkategori:</span
            >
            <Link
              v-for="subcat in subcategories"
              :key="subcat.id"
              :href="`/collections/${subcat.slug}`"
              class="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 rounded-full text-sm font-medium transition-colors whitespace-nowrap"
            >
              <img
                v-if="subcat.image"
                :src="subcat.image"
                :alt="subcat.name"
                class="w-5 h-5 rounded-full object-cover"
              />
              {{ subcat.name }}
            </Link>
          </div>
        </UContainer>
      </div>

      <!-- Featured Products Section -->
      <div
        v-if="featuredProducts.length > 0"
        class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800"
      >
        <UContainer class="py-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                ⭐ Produk Unggulan {{ category.name }}
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Pilihan terbaik dari kategori ini
              </p>
            </div>
          </div>

          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4"
          >
            <ProductCard
              v-for="product in featuredProducts.slice(0, 6)"
              :key="product.id"
              :product="product"
              size="sm"
              @add-to-cart="handleAddToCart"
              @add-to-wishlist="handleAddToWishlist"
            />
          </div>
        </UContainer>
      </div>

      <!-- New Arrivals Section -->
      <div
        v-if="newArrivals.length > 0"
        class="bg-gray-50 dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800"
      >
        <UContainer class="py-8">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                Produk Terbaru
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Baru ditambahkan di kategori {{ category.name }}
              </p>
            </div>
          </div>

          <UCarousel
            v-slot="{ item }"
            :items="newArrivals.slice(0, 10)"
            arrows
            :prev="{
              color: 'neutral',
              variant: 'solid',
              class: 'rounded-full shadow-lg',
            }"
            :next="{
              color: 'neutral',
              variant: 'solid',
              class: 'rounded-full shadow-lg',
            }"
            :ui="{
              item: 'basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/4 xl:basis-1/4',
              prev: 'start-2 sm:start-4',
              next: 'end-2 sm:end-4',
            }"
            class="w-full"
          >
            <div class="p-2">
              <ProductCard
                :product="item"
                @add-to-cart="handleAddToCart"
                @add-to-wishlist="handleAddToWishlist"
              />
            </div>
          </UCarousel>
        </UContainer>
      </div>

      <!-- Main Products Section -->
      <UContainer class="py-6 lg:py-8">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <!-- Sidebar Filters (Desktop) -->
          <aside class="hidden lg:block w-64 shrink-0">
            <div
              class="sticky top-24 bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800"
            >
              <h3 class="font-semibold text-gray-900 dark:text-white mb-4">Filter</h3>

              <!-- Brand Filter -->
              <div v-if="brands.length > 0" class="mb-6">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Brand</h4>
                <div class="space-y-2 max-h-48 overflow-y-auto">
                  <label
                    v-for="brand in brands"
                    :key="brand"
                    class="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      v-model="localFilters.brand"
                      type="radio"
                      :value="brand"
                      name="brand"
                      class="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                    />
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ brand }}</span>
                  </label>
                  <button
                    v-if="localFilters.brand"
                    type="button"
                    class="text-xs text-primary-600 hover:text-primary-700 mt-2"
                    @click="localFilters.brand = ''"
                  >
                    Hapus filter brand
                  </button>
                </div>
              </div>

              <!-- Price Range -->
              <div class="mb-6">
                <h4 class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Rentang Harga
                </h4>
                <div class="flex gap-2">
                  <UInput
                    v-model="localFilters.minPrice"
                    type="number"
                    placeholder="Min"
                    size="sm"
                    class="flex-1"
                  />
                  <span class="text-gray-400 self-center">-</span>
                  <UInput
                    v-model="localFilters.maxPrice"
                    type="number"
                    placeholder="Max"
                    size="sm"
                    class="flex-1"
                  />
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-2">
                <UButton color="primary" block @click="applyFilters"> Terapkan </UButton>
                <UButton v-if="hasActiveFilters" color="neutral" variant="ghost" @click="clearFilters">
                  Reset
                </UButton>
              </div>
            </div>
          </aside>

          <!-- Main Content -->
          <div class="flex-1 min-w-0">
            <!-- Section Header -->
            <div class="mb-6">
              <h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                Semua Produk {{ category.name }}
              </h2>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Menampilkan {{ products.length }} dari {{ meta.total }} produk
              </p>
            </div>

            <!-- Toolbar -->
            <CollectionToolbar
              v-model:view-mode="viewMode"
              v-model:filters="localFilters"
              :total-shown="products.length"
              :total-products="meta.total"
              :categories="[]"
              :active-filter-count="activeFilterCount"
              :has-active-filters="hasActiveFilters"
              :sort-options="sortOptions"
              @open-mobile-filter="isMobileFilterOpen = true"
              @apply="applyFilters"
              @clear-filter="clearSingleFilter"
            />

            <!-- Products -->
            <div v-if="products.length > 0">
              <!-- Grid View -->
              <div
                v-if="viewMode === 'grid'"
                class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6"
              >
                <ProductCard
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  @add-to-cart="handleAddToCart"
                  @add-to-wishlist="handleAddToWishlist"
                />
              </div>

              <!-- List View -->
              <div v-else class="space-y-4">
                <ProductCardList
                  v-for="product in products"
                  :key="product.id"
                  :product="product"
                  @add-to-cart="handleAddToCart"
                  @add-to-wishlist="handleAddToWishlist"
                />
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
            <CollectionEmptyState v-else @reset="clearFilters" />
          </div>
        </div>
      </UContainer>

      <!-- Related Categories Section -->
      <div
        v-if="parentCategory || subcategories.length > 0"
        class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
      >
        <UContainer class="py-8">
          <h2 class="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Kategori Terkait
          </h2>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <!-- Parent Category -->
            <Link
              v-if="parentCategory"
              :href="`/collections/${parentCategory.slug}`"
              class="group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <div
                class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden"
              >
                <img
                  v-if="parentCategory.image"
                  :src="parentCategory.image"
                  :alt="parentCategory.name"
                  class="w-full h-full object-cover"
                />
                <UIcon v-else name="i-heroicons-folder" class="w-8 h-8 text-gray-400" />
              </div>
              <span
                class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center"
              >
                {{ parentCategory.name }}
              </span>
              <span class="text-xs text-gray-400 mt-1">Kategori Utama</span>
            </Link>

            <!-- Subcategories -->
            <Link
              v-for="subcat in subcategories"
              :key="subcat.id"
              :href="`/collections/${subcat.slug}`"
              class="group flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
            >
              <div
                class="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-3 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30 transition-colors overflow-hidden"
              >
                <img
                  v-if="subcat.image"
                  :src="subcat.image"
                  :alt="subcat.name"
                  class="w-full h-full object-cover"
                />
                <UIcon v-else name="i-heroicons-folder" class="w-8 h-8 text-gray-400" />
              </div>
              <span
                class="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-700 dark:group-hover:text-primary-400 text-center"
              >
                {{ subcat.name }}
              </span>
            </Link>
          </div>
        </UContainer>
      </div>

      <!-- Back to Collections -->
      <div class="bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
        <UContainer class="py-6">
          <div class="flex justify-center">
            <Link
              href="/collections"
              class="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors"
            >
              <UIcon name="i-heroicons-arrow-left" class="w-5 h-5" />
              Lihat Semua Koleksi
            </Link>
          </div>
        </UContainer>
      </div>
    </div>

    <!-- Mobile Filter Sidebar -->
    <CollectionMobileFilter
      v-model:open="isMobileFilterOpen"
      v-model:filters="localFilters"
      :categories="[]"
      :brands="brands"
      :has-active-filters="hasActiveFilters"
      @apply="applyFilters"
      @clear="clearFilters"
    />
  </AppLayout>
</template>

<style scoped>
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
</style>
