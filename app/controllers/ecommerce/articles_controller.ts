import type { HttpContext } from '@adonisjs/core/http'
import { ArticleRepository } from '#repositories/index'
import { ArticleTransformer } from '#transformers/index'
import cache, { CacheKeys } from '#services/cache_service'

// Cache TTL in seconds (30 minutes)
const CACHE_TTL = 1800

export default class ArticlesController {
  private articleRepository: ArticleRepository

  constructor() {
    this.articleRepository = new ArticleRepository()
  }

  /**
   * Display artikel listing page
   * GET /artikel
   */
  async index({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 12)
    const category = request.input('category')
    const tag = request.input('tag')
    const search = request.input('search')

    // Get articles with filters
    const articlesResult = await this.articleRepository.getPublished(
      { category, tag, search },
      { page, limit: perPage }
    )

    // Transform articles
    const articles = ArticleTransformer.toPaginatedListDTO(articlesResult)

    // Fetch sidebar data with caching
    const [categories, featuredArticles, popularTags] = await Promise.all([
      this.getCachedCategories(),
      this.getCachedFeaturedArticles(),
      this.getCachedPopularTags(),
    ])

    return inertia.render('artikel/index', {
      articles,
      categories,
      featuredArticles,
      popularTags,
      filters: {
        category: category || null,
        tag: tag || null,
        search: search || '',
      },
    })
  }

  /**
   * Display artikel detail page
   * GET /artikel/:slug
   */
  async show({ inertia, params }: HttpContext) {
    const slug = params.slug

    // Find article by slug
    const article = await this.articleRepository.findBySlug(slug)

    if (!article) {
      return inertia.render('errors/404', {
        message: 'Artikel tidak ditemukan',
      })
    }

    // Increment view count (fire and forget)
    this.articleRepository.incrementViewCount(article.id).catch(() => {})

    // Get related articles
    const relatedArticles = await this.articleRepository.getRelated(article, 4)

    // Transform data
    const articleDetail = ArticleTransformer.toDetailDTO(article)
    const relatedArticlesDTOs = ArticleTransformer.toListDTOs(relatedArticles)

    // Get sidebar data
    const [categories, popularArticles] = await Promise.all([
      this.getCachedCategories(),
      this.getCachedPopularArticles(),
    ])

    return inertia.render('artikel/show', {
      article: articleDetail,
      relatedArticles: relatedArticlesDTOs,
      popularArticles,
      categories,
    })
  }

  /**
   * Get articles by category
   * GET /artikel/kategori/:category
   */
  async category({ inertia, params, request }: HttpContext) {
    const category = params.category
    const page = request.input('page', 1)
    const perPage = request.input('per_page', 12)

    // Validate category
    const validCategories = ['tips', 'review', 'news', 'guide', 'promo']
    if (!validCategories.includes(category)) {
      return inertia.render('errors/404', {
        message: 'Kategori tidak ditemukan',
      })
    }

    // Get articles by category with pagination
    const articlesResult = await this.articleRepository.getPublished(
      { category },
      { page, limit: perPage }
    )

    // Transform articles
    const articles = ArticleTransformer.toPaginatedListDTO(articlesResult)

    // Get sidebar data
    const [categories, featuredArticles, popularTags] = await Promise.all([
      this.getCachedCategories(),
      this.getCachedFeaturedArticles(),
      this.getCachedPopularTags(),
    ])

    const categoryLabels: Record<string, string> = {
      tips: 'Tips & Trik',
      review: 'Review Produk',
      news: 'Berita Vape',
      guide: 'Panduan',
      promo: 'Promo & Diskon',
    }

    return inertia.render('artikel/category', {
      articles,
      category: {
        slug: category,
        name: categoryLabels[category] || category,
      },
      categories,
      featuredArticles,
      popularTags,
    })
  }

  /**
   * Get cached categories with article count
   */
  private async getCachedCategories() {
    return cache.remember(CacheKeys.ARTICLE_CATEGORIES, CACHE_TTL, async () => {
      const categories = await this.articleRepository.getCategoriesWithCount()
      return categories.map((cat) => ({
        slug: cat.category,
        name: cat.category,
        count: cat.count,
        label: this.getCategoryLabel(cat.category),
      }))
    })
  }

  /**
   * Get cached featured articles
   */
  private async getCachedFeaturedArticles() {
    return cache.remember(CacheKeys.ARTICLE_FEATURED, CACHE_TTL, async () => {
      const articles = await this.articleRepository.getFeatured(5)
      return ArticleTransformer.toListDTOs(articles)
    })
  }

  /**
   * Get cached popular articles
   */
  private async getCachedPopularArticles() {
    return cache.remember(CacheKeys.ARTICLE_POPULAR, CACHE_TTL, async () => {
      const articles = await this.articleRepository.getPopular(5)
      return ArticleTransformer.toListDTOs(articles)
    })
  }

  /**
   * Get cached popular tags
   */
  private async getCachedPopularTags() {
    return cache.remember(CacheKeys.ARTICLE_TAGS, CACHE_TTL, async () => {
      return this.articleRepository.getAllTags()
    })
  }

  /**
   * Get category label in Indonesian
   */
  private getCategoryLabel(slug: string): string {
    const labels: Record<string, string> = {
      tips: 'Tips & Trik',
      review: 'Review Produk',
      news: 'Berita Vape',
      guide: 'Panduan',
      promo: 'Promo & Diskon',
    }
    return labels[slug] || slug
  }
}
