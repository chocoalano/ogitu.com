import type { ContentBlock } from '@/types/article'

// Admin Article Types

export interface AdminArticle {
  id: number
  title: string
  slug: string
  excerpt: string | null
  blocks: ContentBlock[]
  contentPlain: string | null
  thumbnail: string | null
  banner: string | null
  category: ArticleCategory
  tags: string[]
  status: ArticleStatus
  isFeatured: boolean
  isPinned: boolean
  viewCount: number
  likeCount: number
  shareCount: number
  readTime: number
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: string | null
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: ArticleAuthor | null
}

export interface ArticleAuthor {
  id: number
  fullName: string
  email: string
  avatar: string | null
}

export type ArticleCategory = 'tips' | 'review' | 'news' | 'guide' | 'promo'
export type ArticleStatus = 'draft' | 'published' | 'archived'

export interface ArticleCategoryOption {
  value: ArticleCategory
  label: string
}

export interface ArticleStats {
  total: number
  published: number
  draft: number
  featured: number
}

export interface ArticleFilters {
  search: string
  status: ArticleStatus | ''
  category: ArticleCategory | ''
  sortBy: string
  sortOrder: 'asc' | 'desc'
}

export interface ArticlePaginatedResponse {
  data: AdminArticle[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
    hasMorePages: boolean
    hasPreviousPages: boolean
  }
}

// Props for admin pages
export interface ArticleIndexProps {
  articles: ArticlePaginatedResponse
  filters: ArticleFilters
  stats: ArticleStats
  categories: ArticleCategoryOption[]
}

export interface ArticleCreateProps {
  authors: ArticleAuthor[]
  categories: ArticleCategoryOption[]
}

export interface ArticleEditProps {
  article: AdminArticle
  authors: ArticleAuthor[]
  categories: ArticleCategoryOption[]
}

export interface ArticleShowProps {
  article: AdminArticle & {
    tableOfContents: Array<{ id: string; text: string; level: number }>
    formattedPublishedAt: string
  }
}

// Form data for article create/edit
export interface ArticleFormData {
  title: string
  slug: string
  excerpt: string
  blocks: ContentBlock[]
  thumbnail: File | null
  banner: File | null
  thumbnailUrl: string
  bannerUrl: string
  category: ArticleCategory
  tags: string[]
  status: ArticleStatus
  isFeatured: boolean
  isPinned: boolean
  metaTitle: string
  metaDescription: string
  metaKeywords: string
  authorId: number | null
}

// Block definitions for page builder
export const BLOCK_DEFINITIONS = [
  { type: 'heading', label: 'Heading', icon: 'i-heroicons-h1', category: 'text' },
  {
    type: 'paragraph',
    label: 'Paragraf',
    icon: 'i-heroicons-bars-3-bottom-left',
    category: 'text',
  },
  { type: 'image', label: 'Gambar', icon: 'i-heroicons-photo', category: 'media' },
  { type: 'gallery', label: 'Galeri', icon: 'i-heroicons-squares-2x2', category: 'media' },
  { type: 'list', label: 'Daftar', icon: 'i-heroicons-list-bullet', category: 'text' },
  {
    type: 'quote',
    label: 'Kutipan',
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    category: 'text',
  },
  { type: 'code', label: 'Kode', icon: 'i-heroicons-code-bracket', category: 'text' },
  { type: 'table', label: 'Tabel', icon: 'i-heroicons-table-cells', category: 'data' },
  { type: 'divider', label: 'Pembatas', icon: 'i-heroicons-minus', category: 'layout' },
  { type: 'embed', label: 'Embed Video', icon: 'i-heroicons-play-circle', category: 'media' },
  { type: 'alert', label: 'Peringatan', icon: 'i-heroicons-exclamation-triangle', category: 'ui' },
  { type: 'accordion', label: 'Akordion', icon: 'i-heroicons-chevron-down', category: 'ui' },
  { type: 'button', label: 'Tombol', icon: 'i-heroicons-cursor-arrow-rays', category: 'ui' },
  {
    type: 'product-card',
    label: 'Kartu Produk',
    icon: 'i-heroicons-shopping-bag',
    category: 'commerce',
  },
  {
    type: 'product-list',
    label: 'Daftar Produk',
    icon: 'i-heroicons-shopping-cart',
    category: 'commerce',
  },
  { type: 'cta-box', label: 'CTA Box', icon: 'i-heroicons-megaphone', category: 'ui' },
  { type: 'pros-cons', label: 'Pro & Kontra', icon: 'i-heroicons-scale', category: 'review' },
  { type: 'rating-box', label: 'Rating', icon: 'i-heroicons-star', category: 'review' },
  {
    type: 'comparison-table',
    label: 'Perbandingan',
    icon: 'i-heroicons-arrows-right-left',
    category: 'review',
  },
  { type: 'toc', label: 'Daftar Isi', icon: 'i-heroicons-queue-list', category: 'navigation' },
  { type: 'author-box', label: 'Info Penulis', icon: 'i-heroicons-user-circle', category: 'meta' },
  {
    type: 'related-articles',
    label: 'Artikel Terkait',
    icon: 'i-heroicons-document-duplicate',
    category: 'meta',
  },
  { type: 'newsletter', label: 'Newsletter', icon: 'i-heroicons-envelope', category: 'marketing' },
  { type: 'spacer', label: 'Spasi', icon: 'i-heroicons-arrows-pointing-out', category: 'layout' },
  { type: 'columns', label: 'Kolom', icon: 'i-heroicons-view-columns', category: 'layout' },
  {
    type: 'html',
    label: 'HTML Kustom',
    icon: 'i-heroicons-code-bracket-square',
    category: 'advanced',
  },
] as const

export const BLOCK_CATEGORIES = [
  { id: 'text', label: 'Teks' },
  { id: 'media', label: 'Media' },
  { id: 'layout', label: 'Layout' },
  { id: 'ui', label: 'UI Elements' },
  { id: 'data', label: 'Data' },
  { id: 'commerce', label: 'E-Commerce' },
  { id: 'review', label: 'Review' },
  { id: 'meta', label: 'Meta' },
  { id: 'navigation', label: 'Navigasi' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'advanced', label: 'Lanjutan' },
] as const

// Status options
export const STATUS_OPTIONS = [
  { value: 'draft', label: 'Draft', color: 'neutral' },
  { value: 'published', label: 'Dipublikasikan', color: 'success' },
  { value: 'archived', label: 'Diarsipkan', color: 'warning' },
] as const

// Category color mapping
export const CATEGORY_COLORS: Record<ArticleCategory, string> = {
  tips: 'primary',
  review: 'success',
  news: 'info',
  guide: 'warning',
  promo: 'error',
}

// Helper functions
export function getStatusColor(status: ArticleStatus): string {
  const option = STATUS_OPTIONS.find((s) => s.value === status)
  return option?.color || 'neutral'
}

export function getStatusLabel(status: ArticleStatus): string {
  const option = STATUS_OPTIONS.find((s) => s.value === status)
  return option?.label || status
}

export function getCategoryColor(category: ArticleCategory): string {
  return CATEGORY_COLORS[category] || 'neutral'
}

export function createEmptyFormData(): ArticleFormData {
  return {
    title: '',
    slug: '',
    excerpt: '',
    blocks: [],
    thumbnail: null,
    banner: null,
    thumbnailUrl: '',
    bannerUrl: '',
    category: 'tips',
    tags: [],
    status: 'draft',
    isFeatured: false,
    isPinned: false,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    authorId: null,
  }
}

export function articleToFormData(article: AdminArticle): ArticleFormData {
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt || '',
    blocks: article.blocks,
    thumbnail: null,
    banner: null,
    thumbnailUrl: article.thumbnail || '',
    bannerUrl: article.banner || '',
    category: article.category,
    tags: article.tags,
    status: article.status,
    isFeatured: Boolean(article.isFeatured),
    isPinned: Boolean(article.isPinned),
    metaTitle: article.metaTitle || '',
    metaDescription: article.metaDescription || '',
    metaKeywords: article.metaKeywords || '',
    authorId: article.author?.id || null,
  }
}
