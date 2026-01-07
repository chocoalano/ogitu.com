/**
 * Article Page Builder - Frontend Types
 * Mirrors the backend types for type-safe frontend development
 */

// Base block interface
export interface BaseBlock {
  id: string
  type: BlockType
  data: Record<string, unknown>
}

// All available block types
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'gallery'
  | 'list'
  | 'quote'
  | 'code'
  | 'table'
  | 'divider'
  | 'embed'
  | 'alert'
  | 'accordion'
  | 'button'
  | 'product-card'
  | 'product-list'
  | 'cta-box'
  | 'pros-cons'
  | 'rating-box'
  | 'comparison-table'
  | 'toc'
  | 'author-box'
  | 'related-articles'
  | 'newsletter'
  | 'spacer'
  | 'columns'
  | 'html'

// Block type definitions
export interface HeadingBlock extends BaseBlock {
  type: 'heading'
  data: {
    text: string
    level: 1 | 2 | 3 | 4 | 5 | 6
    alignment?: 'left' | 'center' | 'right'
    anchor?: string
  }
}

export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph'
  data: {
    text: string
    alignment?: 'left' | 'center' | 'right' | 'justify'
    dropCap?: boolean
  }
}

export interface ImageBlock extends BaseBlock {
  type: 'image'
  data: {
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
    alignment?: 'left' | 'center' | 'right' | 'full'
    link?: string
    lightbox?: boolean
  }
}

export interface GalleryBlock extends BaseBlock {
  type: 'gallery'
  data: {
    images: Array<{
      src: string
      alt: string
      caption?: string
    }>
    columns: 2 | 3 | 4
    gap?: 'sm' | 'md' | 'lg'
    lightbox?: boolean
  }
}

export interface ListBlock extends BaseBlock {
  type: 'list'
  data: {
    style: 'ordered' | 'unordered' | 'checklist'
    items: Array<{
      text: string
      checked?: boolean
      children?: Array<{ text: string; checked?: boolean }>
    }>
  }
}

export interface QuoteBlock extends BaseBlock {
  type: 'quote'
  data: {
    text: string
    citation?: string
    style?: 'default' | 'large' | 'bordered' | 'highlighted'
  }
}

export interface CodeBlock extends BaseBlock {
  type: 'code'
  data: {
    code: string
    language?: string
    filename?: string
    showLineNumbers?: boolean
    highlightLines?: number[]
  }
}

export interface TableBlock extends BaseBlock {
  type: 'table'
  data: {
    headers: string[]
    rows: string[][]
    striped?: boolean
    bordered?: boolean
    compact?: boolean
  }
}

export interface DividerBlock extends BaseBlock {
  type: 'divider'
  data: {
    style?: 'solid' | 'dashed' | 'dotted' | 'gradient'
    spacing?: 'sm' | 'md' | 'lg'
  }
}

export interface EmbedBlock extends BaseBlock {
  type: 'embed'
  data: {
    url: string
    provider?: 'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'vimeo' | 'custom'
    caption?: string
    aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16'
  }
}

export interface AlertBlock extends BaseBlock {
  type: 'alert'
  data: {
    title?: string
    text: string
    type: 'info' | 'success' | 'warning' | 'error' | 'tip'
    icon?: string
    dismissible?: boolean
  }
}

export interface AccordionBlock extends BaseBlock {
  type: 'accordion'
  data: {
    items: Array<{
      title: string
      content: string
      defaultOpen?: boolean
    }>
    allowMultiple?: boolean
    style?: 'default' | 'bordered' | 'separated'
  }
}

export interface ButtonBlock extends BaseBlock {
  type: 'button'
  data: {
    text: string
    url: string
    style?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    icon?: string
    iconPosition?: 'left' | 'right'
    alignment?: 'left' | 'center' | 'right'
    fullWidth?: boolean
    newTab?: boolean
  }
}

export interface ProductCardBlock extends BaseBlock {
  type: 'product-card'
  data: {
    productId?: number
    productSlug?: string
    name?: string
    image?: string
    price?: number
    originalPrice?: number
    rating?: number
    url?: string
    badge?: string
    style?: 'default' | 'horizontal' | 'minimal'
  }
}

export interface ProductListBlock extends BaseBlock {
  type: 'product-list'
  data: {
    title?: string
    productIds?: number[]
    productSlugs?: string[]
    category?: string
    limit?: number
    columns?: 2 | 3 | 4
    style?: 'grid' | 'carousel'
  }
}

export interface CTABoxBlock extends BaseBlock {
  type: 'cta-box'
  data: {
    title: string
    description?: string
    buttonText: string
    buttonUrl: string
    backgroundImage?: string
    backgroundColor?: string
    style?: 'default' | 'gradient' | 'image'
  }
}

export interface ProsConsBlock extends BaseBlock {
  type: 'pros-cons'
  data: {
    pros: string[]
    cons: string[]
    title?: string
    style?: 'default' | 'side-by-side' | 'stacked'
  }
}

export interface RatingBoxBlock extends BaseBlock {
  type: 'rating-box'
  data: {
    title?: string
    overallRating: number
    maxRating?: number
    criteria?: Array<{
      label: string
      rating: number
    }>
    verdict?: string
    style?: 'default' | 'compact' | 'detailed'
  }
}

export interface ComparisonTableBlock extends BaseBlock {
  type: 'comparison-table'
  data: {
    title?: string
    headers: string[]
    features: Array<{
      label: string
      values: Array<string | boolean | number>
    }>
    highlightColumn?: number
  }
}

export interface TOCBlock extends BaseBlock {
  type: 'toc'
  data: {
    title?: string
    maxDepth?: 2 | 3 | 4
    style?: 'default' | 'numbered' | 'minimal'
    collapsible?: boolean
  }
}

export interface AuthorBoxBlock extends BaseBlock {
  type: 'author-box'
  data: {
    showBio?: boolean
    showSocial?: boolean
    style?: 'default' | 'compact' | 'card'
  }
}

export interface RelatedArticlesBlock extends BaseBlock {
  type: 'related-articles'
  data: {
    title?: string
    articleIds?: number[]
    articleSlugs?: string[]
    category?: string
    limit?: number
    style?: 'grid' | 'list' | 'cards'
  }
}

export interface NewsletterBlock extends BaseBlock {
  type: 'newsletter'
  data: {
    title?: string
    description?: string
    buttonText?: string
    style?: 'default' | 'inline' | 'card'
    backgroundColor?: string
  }
}

export interface SpacerBlock extends BaseBlock {
  type: 'spacer'
  data: {
    height: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
}

export interface ColumnsBlock extends BaseBlock {
  type: 'columns'
  data: {
    columns: Array<{
      width: '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 'auto'
      blocks: ContentBlock[]
    }>
    gap?: 'sm' | 'md' | 'lg'
    verticalAlignment?: 'top' | 'center' | 'bottom'
  }
}

export interface HTMLBlock extends BaseBlock {
  type: 'html'
  data: {
    html: string
    sanitize?: boolean
  }
}

// Union type of all blocks
export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | GalleryBlock
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | TableBlock
  | DividerBlock
  | EmbedBlock
  | AlertBlock
  | AccordionBlock
  | ButtonBlock
  | ProductCardBlock
  | ProductListBlock
  | CTABoxBlock
  | ProsConsBlock
  | RatingBoxBlock
  | ComparisonTableBlock
  | TOCBlock
  | AuthorBoxBlock
  | RelatedArticlesBlock
  | NewsletterBlock
  | SpacerBlock
  | ColumnsBlock
  | HTMLBlock

// Table of Contents Item
export interface TOCItem {
  id: string
  text: string
  level: number
  children?: TOCItem[]
}

// Article DTOs
export interface ArticleListItem {
  id: number
  title: string
  slug: string
  excerpt: string | null
  thumbnail: string | null
  category: string
  categoryLabel: string
  tags: string[]
  readTime: number
  viewCount: number
  likeCount: number
  publishedAt: string | null
  author: {
    id: number
    fullName: string
    avatar: string | null
  } | null
}

export interface ArticleDetail extends ArticleListItem {
  blocks: ContentBlock[]
  contentPlain: string | null
  tableOfContents: TOCItem[]
  banner: string | null
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: string | null
  shareCount: number
  isPinned: boolean
  isFeatured: boolean
  formattedPublishedAt: string
}

export interface ArticlePagination {
  data: ArticleListItem[]
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

// Category info
export interface CategoryInfo {
  name: string
  slug: string
  label: string
  count: number
}

// Article Categories
export const ARTICLE_CATEGORIES: CategoryInfo[] = [
  { name: 'tips', slug: 'tips', label: 'Tips & Trik', count: 0 },
  { name: 'review', slug: 'review', label: 'Review Produk', count: 0 },
  { name: 'news', slug: 'news', label: 'Berita Vape', count: 0 },
  { name: 'guide', slug: 'guide', label: 'Panduan', count: 0 },
  { name: 'promo', slug: 'promo', label: 'Promo & Diskon', count: 0 },
]

// Category colors for UI badges
export const CATEGORY_COLORS: Record<string, string> = {
  tips: 'primary',
  review: 'success',
  news: 'info',
  guide: 'warning',
  promo: 'error',
}

// Helper functions
export function formatDate(date: string | null): string {
  if (!date) return ''
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function formatReadTime(minutes: number): string {
  if (minutes < 1) return 'Kurang dari 1 menit'
  if (minutes === 1) return '1 menit baca'
  return `${minutes} menit baca`
}

export function getCategoryLabel(category: string): string {
  const cat = ARTICLE_CATEGORIES.find((c) => c.name === category)
  return cat?.label || category
}

/**
 * Format large numbers with K/M suffix
 */
export function formatCount(count: number): string {
  if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
  if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
  return count.toString()
}
