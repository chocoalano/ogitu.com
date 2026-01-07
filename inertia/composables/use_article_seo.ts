import { computed } from 'vue'
import { useHead } from '@unhead/vue'

const SITE_URL = 'https://ogitu.com'
const SITE_NAME = 'Ogitu'

export interface ArticleSeoData {
  title: string
  slug: string
  excerpt: string | null
  thumbnail: string | null
  banner: string | null
  tags: string[]
  publishedAt: string | null
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: string | null
  author: { fullName: string } | null
}

/**
 * Composable for article SEO meta tags and structured data
 */
export function useArticleSeo(article: ArticleSeoData) {
  const seo = computed(() => ({
    title: article.metaTitle || `${article.title} | ${SITE_NAME}`,
    description:
      article.metaDescription || article.excerpt || `Baca artikel ${article.title} di blog Ogitu`,
    keywords: article.metaKeywords || article.tags.join(', ') + ', vape, rokok elektrik',
    image: article.banner || article.thumbnail || `${SITE_URL}/images/og-default.jpg`,
    url: `${SITE_URL}/artikel/${article.slug}`,
  }))

  const structuredData = computed(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': article.title,
    'description': article.excerpt,
    'image': article.banner || article.thumbnail,
    'datePublished': article.publishedAt,
    'author': article.author
      ? {
          '@type': 'Person',
          'name': article.author.fullName,
        }
      : undefined,
    'publisher': {
      '@type': 'Organization',
      'name': SITE_NAME,
      'logo': {
        '@type': 'ImageObject',
        'url': `${SITE_URL}/images/logo.png`,
      },
    },
    'mainEntityOfPage': {
      '@type': 'WebPage',
      '@id': seo.value.url,
    },
  }))

  useHead({
    title: seo.value.title,
    meta: [
      { name: 'description', content: seo.value.description },
      { name: 'keywords', content: seo.value.keywords },
      { property: 'og:title', content: seo.value.title },
      { property: 'og:description', content: seo.value.description },
      { property: 'og:image', content: seo.value.image },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: seo.value.url },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: seo.value.title },
      { name: 'twitter:description', content: seo.value.description },
      { name: 'twitter:image', content: seo.value.image },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(structuredData.value),
      },
    ],
  })

  return { seo }
}
