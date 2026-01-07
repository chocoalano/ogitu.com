import Article from '#models/article'
import { ArticlePaginatedResult } from '#repositories/contracts/article_repository_contract'
import type { ContentBlock } from '#types/article_blocks'

/**
 * Table of Contents Item DTO
 */
export interface TOCItemDTO {
  id: string
  text: string
  level: number
  children?: TOCItemDTO[]
}

/**
 * Article List DTO
 */
export interface ArticleListDTO {
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

/**
 * Article Detail DTO - includes blocks for page builder
 */
export interface ArticleDetailDTO extends ArticleListDTO {
  blocks: ContentBlock[]
  contentPlain: string | null
  tableOfContents: TOCItemDTO[]
  banner: string | null
  metaTitle: string | null
  metaDescription: string | null
  metaKeywords: string | null
  shareCount: number
  isPinned: boolean
  isFeatured: boolean
  formattedPublishedAt: string
}

/**
 * Paginated Article List DTO
 */
export interface ArticlePaginatedDTO {
  data: ArticleListDTO[]
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

/**
 * Category labels mapping
 */
const CATEGORY_LABELS: Record<string, string> = {
  tips: 'Tips & Trik',
  review: 'Review Produk',
  news: 'Berita Vape',
  guide: 'Panduan',
  promo: 'Promo & Diskon',
}

export default class ArticleTransformer {
  /**
   * Transform article to list DTO
   */
  static toListDTO(article: Article): ArticleListDTO {
    const authorData = article.author
      ? {
          id: article.author.id,
          fullName: article.author.fullName || 'Anonymous',
          avatar: null as string | null, // User model doesn't have avatar
        }
      : null

    return {
      id: article.id,
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      thumbnail: article.thumbnailUrl,
      category: article.category,
      categoryLabel: CATEGORY_LABELS[article.category] || article.category,
      tags: article.tags || [],
      readTime: article.readTime || 0,
      viewCount: article.viewCount,
      likeCount: article.likeCount,
      publishedAt: article.publishedAt?.toISO() || null,
      author: authorData,
    }
  }

  /**
   * Transform multiple articles to list DTOs
   */
  static toListDTOs(articles: Article[]): ArticleListDTO[] {
    return articles.map((article) => this.toListDTO(article))
  }

  /**
   * Transform article to detail DTO with blocks
   */
  static toDetailDTO(article: Article): ArticleDetailDTO {
    return {
      ...this.toListDTO(article),
      blocks: article.blocks || [],
      contentPlain: article.contentPlain,
      tableOfContents: this.buildTOC(article.tableOfContents),
      banner: article.bannerUrl,
      metaTitle: article.metaTitle,
      metaDescription: article.metaDescription,
      metaKeywords: article.metaKeywords,
      shareCount: article.shareCount,
      isPinned: article.isPinned,
      isFeatured: article.isFeatured,
      formattedPublishedAt: article.formattedPublishedAt || '',
    }
  }

  /**
   * Build nested table of contents from flat headings
   */
  static buildTOC(headings: Array<{ id: string; text: string; level: number }>): TOCItemDTO[] {
    const toc: TOCItemDTO[] = []
    const stack: TOCItemDTO[] = []

    for (const heading of headings) {
      const item: TOCItemDTO = {
        id: heading.id,
        text: heading.text,
        level: heading.level,
        children: [],
      }

      // Find parent
      while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
        stack.pop()
      }

      if (stack.length === 0) {
        toc.push(item)
      } else {
        const parent = stack[stack.length - 1]
        if (!parent.children) parent.children = []
        parent.children.push(item)
      }

      stack.push(item)
    }

    // Clean up empty children arrays
    const cleanTOC = (items: TOCItemDTO[]): TOCItemDTO[] => {
      return items.map((item) => ({
        id: item.id,
        text: item.text,
        level: item.level,
        ...(item.children && item.children.length > 0 ? { children: cleanTOC(item.children) } : {}),
      }))
    }

    return cleanTOC(toc)
  }

  /**
   * Transform paginated result to DTO
   */
  static toPaginatedListDTO(result: ArticlePaginatedResult<Article>): ArticlePaginatedDTO {
    return {
      data: this.toListDTOs(result.data),
      meta: {
        total: result.meta.total,
        perPage: result.meta.perPage,
        currentPage: result.meta.currentPage,
        lastPage: result.meta.lastPage,
        firstPage: result.meta.firstPage,
        hasMorePages: result.meta.hasMorePages,
        hasPreviousPages: result.meta.hasPreviousPages,
      },
    }
  }

  /**
   * Format date for display
   */
  static formatDate(date: string | null): string {
    if (!date) return ''
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })
  }

  /**
   * Get reading time label
   */
  static getReadTimeLabel(minutes: number): string {
    if (minutes < 1) return 'Kurang dari 1 menit'
    if (minutes === 1) return '1 menit baca'
    return `${minutes} menit baca`
  }
}
