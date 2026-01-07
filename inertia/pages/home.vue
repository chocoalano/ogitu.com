<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import { computed, ref } from 'vue'
import { useHead } from '@unhead/vue'
import AppLayout from '~/layouts/default.vue'
import { useToast } from '~/composables/use_toast'
// Composables
import { useScrollReveal } from '~/composables/use_scroll_reveal'

// Components
import HomeHero from '~/components/home/HomeHero.vue'
import HomeCategories from '~/components/home/HomeCategories.vue'
import HomeFeaturedProducts from '~/components/home/HomeFeaturedProducts.vue'
import HomeBenefits from '~/components/home/HomeBenefits.vue'
import HomeBrands from '~/components/home/HomeBrands.vue'
import HomeCTA from '~/components/home/HomeCTA.vue'
import Testimonial from '~/components/Testimonial.vue'

// Types
interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  image: string | null
  icon: string
  href: string
  color: string
}

interface Product {
  id: number
  name: string
  slug: string
  price: number
  discountPrice: number | null
  formattedPrice: string
  formattedOriginalPrice: string | null
  discount: number
  image: string
  rating: number
  totalReviews: number
  totalSold: number
  stock: number
  brand: string | null
  badge: string | null
}

interface Benefit {
  icon: string
  title: string
  description: string
}

interface CustomerRank {
  id: number
  name: string
  slug: string
  level: number
  icon: string
  color: string | null
  cashbackRate: number
  affiliateBonusRate: number
  minOrders: number
  minSpent: number
  benefits: string[] | null
}

// Props from controller
const props = defineProps<{
  categories: Category[]
  featuredProducts: Product[]
  bestSellerProducts: Product[]
  brands: string[]
  benefits: Benefit[]
  customerRanks: CustomerRank[]
}>()

// SEO Configuration
const siteUrl = 'https://ogitu.com'
const siteName = 'Ogitu'

const seo = {
  title: 'Ogitu - Marketplace Vape & Rokok Elektrik Terpercaya #1 Indonesia',
  description:
    'Belanja vape, pod system, mod kit, liquid, dan aksesoris vape terlengkap dengan harga terbaik. Garansi original, gratis ongkir, dan pengiriman cepat ke seluruh Indonesia.',
  keywords:
    'vape, rokok elektrik, pod system, mod kit, liquid vape, e-liquid, coil, atomizer, vaporizer, toko vape online, jual vape murah, vape indonesia, marketplace vape',
  image: `${siteUrl}/images/og-home.jpg`,
  type: 'website',
}

// Generate JSON-LD structured data for SEO
const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    // Organization
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/logo.png`,
        width: 200,
        height: 60,
      },
      sameAs: [
        'https://www.facebook.com/ogitu.id',
        'https://www.instagram.com/ogitu.id',
        'https://twitter.com/ogitu_id',
        'https://www.tiktok.com/@ogitu.id',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+62-812-3456-7890',
        contactType: 'customer service',
        availableLanguage: ['Indonesian', 'English'],
      },
    },
    // WebSite with SearchAction
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: seo.description,
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/collections?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    // WebPage
    {
      '@type': 'WebPage',
      '@id': `${siteUrl}/#webpage`,
      url: siteUrl,
      name: seo.title,
      isPartOf: { '@id': `${siteUrl}/#website` },
      about: { '@id': `${siteUrl}/#organization` },
      description: seo.description,
      inLanguage: 'id-ID',
    },
    // ItemList for Featured Products
    {
      '@type': 'ItemList',
      name: 'Produk Pilihan',
      description: 'Produk vape terlaris dan terpopuler minggu ini',
      itemListElement: props.featuredProducts.slice(0, 10).map((product, index) => ({
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
            availability:
              product.stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock',
          },
          aggregateRating: product.totalReviews > 0
            ? {
                '@type': 'AggregateRating',
                ratingValue: product.rating,
                reviewCount: product.totalReviews,
              }
            : undefined,
        },
      })),
    },
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
      ],
    },
  ],
}))

// Initialize composables
useScrollReveal()
const toast = useToast()

// Loading states
const isAddingToCart = ref<number | null>(null)
const isTogglingWishlist = ref<number | null>(null)

// Get CSRF token from cookie
const getToken = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

// Inject JSON-LD Structured Data via useHead
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: computed(() => JSON.stringify(structuredData.value)),
    },
  ],
})

// Event handlers
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
      // Not logged in, redirect to login
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
      // Not logged in, redirect to login
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
</script>

<template>
  <AppLayout>
    <!-- SEO Head -->
    <Head :title="seo.title">
      <!-- Primary Meta Tags -->
      <meta name="description" :content="seo.description" />
      <meta name="keywords" :content="seo.keywords" />
      <meta name="author" content="Ogitu" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" :href="siteUrl" />

      <!-- Open Graph / Facebook -->
      <meta property="og:type" :content="seo.type" />
      <meta property="og:url" :content="siteUrl" />
      <meta property="og:title" :content="seo.title" />
      <meta property="og:description" :content="seo.description" />
      <meta property="og:image" :content="seo.image" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" :content="siteName" />
      <meta property="og:locale" content="id_ID" />

      <!-- Twitter -->
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" :content="siteUrl" />
      <meta name="twitter:title" :content="seo.title" />
      <meta name="twitter:description" :content="seo.description" />
      <meta name="twitter:image" :content="seo.image" />
      <meta name="twitter:site" content="@ogitu_id" />
      <meta name="twitter:creator" content="@ogitu_id" />

      <!-- Additional SEO -->
      <meta name="geo.region" content="ID" />
      <meta name="geo.placename" content="Indonesia" />
      <meta name="language" content="Indonesian" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="general" />
    </Head>

    <!-- Global Background Wrapper -->
    <div class="home-page-wrapper min-h-screen">
      <!-- Global Glow Orbs -->
      <div class="global-glow-orbs">
        <div class="orb-3"></div>
      </div>

      <!-- Global Grid Pattern -->
      <div class="global-grid-pattern"></div>

      <!-- Content Sections -->
      <main class="relative z-10">
        <!-- Hero Section -->
        <HomeHero />

        <!-- Categories Section -->
        <section aria-label="Kategori Produk">
          <HomeCategories :categories="props.categories" />
        </section>

        <!-- Featured Products Section -->
        <section aria-label="Produk Pilihan">
          <HomeFeaturedProducts
            :products="props.featuredProducts"
            title="Produk Pilihan"
            subtitle="Produk terlaris dan terpopuler minggu ini"
            @add-to-cart="handleAddToCart"
            @add-to-wishlist="handleAddToWishlist"
          />
        </section>

        <!-- Benefits Section -->
        <section aria-label="Keuntungan Belanja">
          <HomeBenefits :benefits="props.benefits" />
        </section>

        <!-- Brands Section -->
        <section aria-label="Brand Partner">
          <HomeBrands :brands="props.brands" />
        </section>

        <!-- Testimonial & CTA Section -->
        <section aria-label="Testimoni Pelanggan">
          <Testimonial />
        </section>
        <section aria-label="Ajakan Bergabung">
          <HomeCTA :ranks="customerRanks" />
        </section>
      </main>
    </div>
  </AppLayout>
</template>
