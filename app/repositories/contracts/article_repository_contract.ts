import Article from '#models/article'

export interface ArticleFilters {
  category?: string
  tag?: string
  search?: string
  status?: 'draft' | 'published' | 'archived'
  isFeatured?: boolean
}

export interface ArticlePaginationOptions {
  page?: number
  limit?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
}

export interface ArticlePaginatedResult<T> {
  data: T[]
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

export interface ArticleRepositoryContract {
  /**
   * Get published articles with pagination
   */
  getPublished(
    filters?: ArticleFilters,
    pagination?: ArticlePaginationOptions
  ): Promise<ArticlePaginatedResult<Article>>

  /**
   * Get featured articles
   */
  getFeatured(limit?: number): Promise<Article[]>

  /**
   * Get latest articles
   */
  getLatest(limit?: number): Promise<Article[]>

  /**
   * Get popular articles (by view count)
   */
  getPopular(limit?: number): Promise<Article[]>

  /**
   * Get articles by category
   */
  getByCategory(category: string, limit?: number): Promise<Article[]>

  /**
   * Get related articles
   */
  getRelated(article: Article, limit?: number): Promise<Article[]>

  /**
   * Find article by slug
   */
  findBySlug(slug: string): Promise<Article | null>

  /**
   * Find article by id
   */
  findById(id: number): Promise<Article | null>

  /**
   * Get all unique categories with counts
   */
  getCategoriesWithCount(): Promise<{ category: string; count: number }[]>

  /**
   * Get all unique tags
   */
  getAllTags(): Promise<string[]>

  /**
   * Increment view count
   */
  incrementViewCount(articleId: number): Promise<void>
}
