import { computed, type ComputedRef } from 'vue'
import { useSeoMeta, useHead } from '@unhead/vue'
import type { ProductDetail, ProductImage, BreadcrumbItem } from '~/types/product_detail'

interface UseProductSeoOptions {
  product: ProductDetail
  productImages: ComputedRef<ProductImage[]>
  currentPrice: ComputedRef<number>
  isOutOfStock: ComputedRef<boolean>
  breadcrumbItems: ComputedRef<BreadcrumbItem[]>
  appUrl: string
}

export function useProductSeo(options: UseProductSeoOptions) {
  const { product, productImages, currentPrice, isOutOfStock, breadcrumbItems, appUrl } = options

  const canonicalUrl = computed(() => `${appUrl}/products/${product.slug}`)

  const seoTitle = computed(() => `${product.name} | Ogitu - Toko Vape & Rokok Elektrik`)

  const seoDescription = computed(
    () =>
      product.description?.substring(0, 160) ||
      `Beli ${product.name} dengan harga ${product.formattedPrice}. ${product.brand ? `Brand: ${product.brand}.` : ''} Tersedia di Ogitu - Toko Vape & Rokok Elektrik Terpercaya.`
  )

  // Set meta tags
  useSeoMeta({
    title: seoTitle,
    description: seoDescription,
    ogTitle: seoTitle,
    ogDescription: seoDescription,
    ogImage: product.image,
    ogUrl: canonicalUrl,
    ogType: 'website',
    twitterCard: 'summary_large_image',
    twitterTitle: seoTitle,
    twitterDescription: seoDescription,
    twitterImage: product.image,
  })

  // JSON-LD Structured Data
  const productSchema = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    'name': product.name,
    'description': product.description || seoDescription.value,
    'image': productImages.value.map((img) => img.url),
    'sku': product.sku,
    'brand': product.brand
      ? {
          '@type': 'Brand',
          'name': product.brand,
        }
      : undefined,
    'category': product.category?.name || 'Vape & Rokok Elektrik',
    'offers': {
      '@type': 'Offer',
      'url': canonicalUrl.value,
      'priceCurrency': 'IDR',
      'price': currentPrice.value,
      'priceValidUntil': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0],
      'availability': isOutOfStock.value
        ? 'https://schema.org/OutOfStock'
        : 'https://schema.org/InStock',
    },
    'aggregateRating':
      product.totalReviews > 0
        ? {
            '@type': 'AggregateRating',
            'ratingValue': Number(product.rating),
            'reviewCount': product.totalReviews,
            'bestRating': 5,
            'worstRating': 1,
          }
        : undefined,
  }))

  const breadcrumbSchema = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': breadcrumbItems.value.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': item.href !== '#' ? `${appUrl}${item.href}` : undefined,
    })),
  }))

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }],
    script: [
      { type: 'application/ld+json', innerHTML: JSON.stringify(productSchema.value) },
      { type: 'application/ld+json', innerHTML: JSON.stringify(breadcrumbSchema.value) },
    ],
  })

  return {
    canonicalUrl,
    seoTitle,
    seoDescription,
  }
}
