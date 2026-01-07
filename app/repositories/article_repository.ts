import Article from '#models/article'
import type {
  ArticleRepositoryContract,
  ArticleFilters,
  ArticlePaginationOptions,
  ArticlePaginatedResult,
} from './contracts/article_repository_contract.js'
import { ModelQueryBuilderContract } from '@adonisjs/lucid/types/model'

type ArticleQuery = ModelQueryBuilderContract<typeof Article, Article>

export default class ArticleRepository implements ArticleRepositoryContract {
  /**
   * Base query for published articles
   */
  private publishedQuery(): ArticleQuery {
    return Article.query()
      .where('status', 'published')
      .whereNotNull('publishedAt')
      .preload('author')
  }

  /**
   * Apply filters to query
   */
  private applyFilters(query: ArticleQuery, filters: ArticleFilters): ArticleQuery {
    if (filters.category) {
      query.where('category', filters.category)
    }

    if (filters.tag) {
      query.whereRaw('JSON_CONTAINS(tags, ?)', [JSON.stringify(filters.tag)])
    }

    if (filters.search) {
      const searchTerm = `%${filters.search}%`
      query.where((q) => {
        q.where('title', 'like', searchTerm)
          .orWhere('excerpt', 'like', searchTerm)
          .orWhere('content', 'like', searchTerm)
      })
    }

    if (filters.status) {
      query.where('status', filters.status)
    }

    if (filters.isFeatured !== undefined) {
      query.where('isFeatured', filters.isFeatured)
    }

    return query
  }

  /**
   * Get published articles with pagination
   */
  async getPublished(
    filters: ArticleFilters = {},
    pagination: ArticlePaginationOptions = {}
  ): Promise<ArticlePaginatedResult<Article>> {
    const { page = 1, limit = 12, orderBy = 'publishedAt', orderDirection = 'desc' } = pagination

    let query = this.publishedQuery()
    query = this.applyFilters(query, filters)

    // Apply pinned sorting first, then the specified order
    query.orderBy('isPinned', 'desc').orderBy(orderBy, orderDirection)

    const paginated = await query.paginate(page, limit)

    return {
      data: paginated.all(),
      meta: {
        total: paginated.total,
        perPage: paginated.perPage,
        currentPage: paginated.currentPage,
        lastPage: paginated.lastPage,
        firstPage: paginated.firstPage,
        hasMorePages: paginated.hasMorePages,
        hasPreviousPages: paginated.currentPage > 1,
      },
    }
  }

  /**
   * Get featured articles
   */
  async getFeatured(limit: number = 4): Promise<Article[]> {
    return this.publishedQuery()
      .where('isFeatured', true)
      .orderBy('publishedAt', 'desc')
      .limit(limit)
  }

  /**
   * Get latest articles
   */
  async getLatest(limit: number = 6): Promise<Article[]> {
    return this.publishedQuery().orderBy('publishedAt', 'desc').limit(limit)
  }

  /**
   * Get popular articles (by view count)
   */
  async getPopular(limit: number = 5): Promise<Article[]> {
    return this.publishedQuery().orderBy('viewCount', 'desc').limit(limit)
  }

  /**
   * Get articles by category
   */
  async getByCategory(category: string, limit: number = 6): Promise<Article[]> {
    return this.publishedQuery()
      .where('category', category)
      .orderBy('publishedAt', 'desc')
      .limit(limit)
  }

  /**
   * Get related articles based on category and tags
   */
  async getRelated(article: Article, limit: number = 4): Promise<Article[]> {
    return this.publishedQuery()
      .where('id', '!=', article.id)
      .where((query) => {
        // Same category
        query.where('category', article.category)

        // Or has matching tags
        if (article.tags && article.tags.length > 0) {
          article.tags.forEach((tag) => {
            query.orWhereRaw('JSON_CONTAINS(tags, ?)', [JSON.stringify(tag)])
          })
        }
      })
      .orderBy('viewCount', 'desc')
      .limit(limit)
  }

  /**
   * Find article by slug
   */
  async findBySlug(slug: string): Promise<Article | null> {
    return this.publishedQuery().where('slug', slug).first()
  }

  /**
   * Find article by id
   */
  async findById(id: number): Promise<Article | null> {
    return Article.query().where('id', id).preload('author').first()
  }

  /**
   * Get all unique categories with counts
   */
  async getCategoriesWithCount(): Promise<{ category: string; count: number }[]> {
    const results = await Article.query()
      .where('status', 'published')
      .whereNotNull('publishedAt')
      .select('category')
      .count('* as count')
      .groupBy('category')
      .orderBy('count', 'desc')

    return results.map((r) => ({
      category: r.category,
      count: Number(r.$extras.count),
    }))
  }

  /**
   * Get all unique tags from published articles
   */
  async getAllTags(): Promise<string[]> {
    const articles = await Article.query()
      .where('status', 'published')
      .whereNotNull('publishedAt')
      .whereNotNull('tags')
      .select('tags')

    const tagsSet = new Set<string>()
    articles.forEach((article) => {
      if (article.tags && Array.isArray(article.tags)) {
        article.tags.forEach((tag) => tagsSet.add(tag))
      }
    })

    return Array.from(tagsSet).sort()
  }

  /**
   * Increment view count
   */
  async incrementViewCount(articleId: number): Promise<void> {
    await Article.query().where('id', articleId).increment('view_count', 1)
  }
}
