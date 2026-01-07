<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import { useHead } from '@unhead/vue'
import AppLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'
import type {
  Product,
  Category,
  PaginationMeta,
  CollectionFilters as FiltersType,
} from '~/types/product'
import { useCollectionFilters } from '~/composables/use_collection_filters'

// Components
import CollectionHeader from '~/components/collections/CollectionHeader.vue'
import CollectionFiltersSidebar from '~/components/collections/CollectionFilters.vue'
import CollectionToolbar from '~/components/collections/CollectionToolbar.vue'
import CollectionMobileFilter from '~/components/collections/CollectionMobileFilter.vue'
import CollectionEmptyState from '~/components/collections/CollectionEmptyState.vue'
import ProductCard from '~/components/ProductCard.vue'
import ProductCardList from '~/components/ProductCardList.vue'

// Props
const props = defineProps<{
  products: Product[]
  meta: PaginationMeta
  categories: Category[]
  brands: string[]
  filters: FiltersType
  activeCategory: Category | null
}>()

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
} = useCollectionFilters(props.filters)

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

// SEO Configuration
const siteUrl = 'https://ogitu.com'
const siteName = 'Ogitu'

// Dynamic page title based on filters
const pageTitle = computed(() => {
  if (props.activeCategory) {
    return `${props.activeCategory.name} - Beli Vape & Rokok Elektrik Original | ${siteName}`
  }
  if (props.filters.search) {
    return `Hasil Pencarian "${props.filters.search}" - ${siteName}`
  }
  if (props.filters.brand) {
    return `Produk ${props.filters.brand} - Vape & Rokok Elektrik | ${siteName}`
  }
  return `Koleksi Vape & Rokok Elektrik Terlengkap | ${siteName}`
})

// Dynamic meta description
const pageDescription = computed(() => {
  const totalProducts = props.meta.total
  if (props.activeCategory) {
    return `Jual ${props.activeCategory.name} original ${totalProducts}+ pilihan. ${props.activeCategory.description || 'Temukan vape, pod system, mod kit, liquid premium dengan harga terbaik.'} Garansi resmi & gratis ongkir ke seluruh Indonesia.`
  }
  if (props.filters.search) {
    return `Temukan ${totalProducts} produk untuk "${props.filters.search}". Belanja vape, pod, liquid, dan aksesoris berkualitas dengan harga terbaik di Ogitu.`
  }
  if (props.filters.brand) {
    return `Koleksi lengkap produk ${props.filters.brand} original. ${totalProducts}+ varian vape, pod system, dan liquid tersedia. Garansi resmi, gratis ongkir.`
  }
  return `Belanja vape, rokok elektrik, pod system, mod kit, liquid premium dari ${totalProducts}+ produk. Harga terbaik, 100% original, gratis ongkir ke seluruh Indonesia.`
})

// Dynamic keywords
const pageKeywords = computed(() => {
  const baseKeywords = [
    'vape',
    'rokok elektrik',
    'pod system',
    'mod kit',
    'liquid vape',
    'e-liquid',
    'salt nicotine',
    'coil',
    'atomizer',
    'vaporizer',
    'toko vape online',
    'jual vape murah',
    'vape indonesia',
  ]

  if (props.activeCategory) {
    return [props.activeCategory.name, `jual ${props.activeCategory.name}`, `beli ${props.activeCategory.name}`, ...baseKeywords].join(', ')
  }
  if (props.filters.brand) {
    return [`${props.filters.brand} vape`, `${props.filters.brand} pod`, `${props.filters.brand} original`, ...baseKeywords].join(', ')
  }
  return baseKeywords.join(', ')
})

// Canonical URL
const canonicalUrl = computed(() => {
  let url = `${siteUrl}/collections`
  const params = new URLSearchParams()

  if (props.filters.category) params.set('category', props.filters.category)
  if (props.filters.brand) params.set('brand', props.filters.brand)
  if (props.filters.search) params.set('search', props.filters.search)
  if (props.meta.currentPage > 1) params.set('page', String(props.meta.currentPage))

  const queryString = params.toString()
  return queryString ? `${url}?${queryString}` : url
})

// JSON-LD Structured Data
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
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Koleksi Produk',
          item: `${siteUrl}/collections`,
        },
        ...(props.activeCategory
          ? [
              {
                '@type': 'ListItem',
                position: 3,
                name: props.activeCategory.name,
                item: `${siteUrl}/collections/${props.activeCategory.slug}`,
              },
            ]
          : []),
      ],
    },
    // CollectionPage / SearchResultsPage
    {
      '@type': props.filters.search ? 'SearchResultsPage' : 'CollectionPage',
      name: props.activeCategory?.name || 'Koleksi Vape & Rokok Elektrik',
      description: pageDescription.value,
      url: canonicalUrl.value,
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
            description: `${product.name} - ${product.brand || 'Vape'} berkualitas`,
            brand: product.brand
              ? {
                  '@type': 'Brand',
                  name: product.brand,
                }
              : undefined,
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
                bestRating: 5,
                worstRating: 1,
              },
            }),
          },
        })),
      },
    },
    // WebSite SearchAction
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/collections?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    // Organization
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/images/logo.png`,
      sameAs: [
        'https://www.facebook.com/ogitu.id',
        'https://www.instagram.com/ogitu.id',
        'https://twitter.com/ogitu_id',
        'https://www.tiktok.com/@ogitu.id',
      ],
    },
  ],
}))

// Inject JSON-LD via useHead
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(structuredData.value)),
    },
  ],
})
</script>

<template>
  <AppLayout>
    <Head>
      <title>{{ pageTitle }}</title>
      <meta name="description" :content="pageDescription" />
      <meta name="keywords" :content="pageKeywords" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" :href="canonicalUrl" />

      <!-- Pagination SEO -->
      <link v-if="meta.currentPage > 1" rel="prev" :href="`${canonicalUrl.replace(/page=\d+/, `page=${meta.currentPage - 1}`)}`" />
      <link v-if="meta.currentPage < meta.lastPage" rel="next" :href="`${canonicalUrl.includes('page=') ? canonicalUrl.replace(/page=\d+/, `page=${meta.currentPage + 1}`) : `${canonicalUrl}${canonicalUrl.includes('?') ? '&' : '?'}page=${meta.currentPage + 1}`}`" />

      <!-- Open Graph -->
      <meta property="og:title" :content="pageTitle" />
      <meta property="og:description" :content="pageDescription" />
      <meta property="og:type" content="website" />
      <meta property="og:url" :content="canonicalUrl" />
      <meta property="og:site_name" content="Ogitu" />
      <meta property="og:locale" content="id_ID" />
      <meta property="og:image" :content="products[0]?.image || 'https://ogitu.com/images/og-collections.jpg'" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" :content="activeCategory?.name || 'Koleksi Vape & Rokok Elektrik Ogitu'" />

      <!-- Twitter Card -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ogitu_id" />
      <meta name="twitter:title" :content="pageTitle" />
      <meta name="twitter:description" :content="pageDescription" />
      <meta name="twitter:image" :content="products[0]?.image || 'https://ogitu.com/images/og-collections.jpg'" />

      <!-- Additional E-commerce Meta -->
      <meta property="product:price:currency" content="IDR" />
      <meta v-if="products.length > 0" property="product:price:amount" :content="String(products[0].discountPrice || products[0].price)" />
      <meta property="product:availability" :content="products.some(p => p.stock > 0) ? 'in stock' : 'out of stock'" />
    </Head>

    <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
      <!-- Page Header -->
      <CollectionHeader :active-category="activeCategory">
        <template #mobile-search>
          <div class="lg:hidden">
            <UInput
              v-model="localFilters.search"
              placeholder="Cari produk..."
              icon="i-heroicons-magnifying-glass"
              size="lg"
              @keyup.enter="applyFilters"
            />
          </div>
        </template>
      </CollectionHeader>

      <UContainer class="py-6 lg:py-8">
        <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <!-- Sidebar Filters (Desktop) -->
          <CollectionFiltersSidebar
            v-model:filters="localFilters"
            :categories="categories"
            :brands="brands"
            :has-active-filters="hasActiveFilters"
            @apply="applyFilters"
            @clear="clearFilters"
          />

          <!-- Main Content -->
          <div class="flex-1 min-w-0">
            <!-- Toolbar -->
            <CollectionToolbar
              v-model:view-mode="viewMode"
              v-model:filters="localFilters"
              :total-shown="products.length"
              :total-products="meta.total"
              :categories="categories"
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
    </div>

    <!-- Mobile Filter Sidebar -->
    <CollectionMobileFilter
      v-model:open="isMobileFilterOpen"
      v-model:filters="localFilters"
      :categories="categories"
      :brands="brands"
      :has-active-filters="hasActiveFilters"
      @apply="applyFilters"
      @clear="clearFilters"
    />
  </AppLayout>
</template>
