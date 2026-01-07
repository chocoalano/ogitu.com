import Product from '#models/product'
import type {
  ProductRepositoryContract,
  ProductFilters,
  PaginationOptions,
  PaginatedResult,
} from './contracts/product_repository_contract.js'

export default class ProductRepository implements ProductRepositoryContract {
  /**
   * Base query with common preloads for product listing
   */
  private baseQuery() {
    return Product.query()
      .where('status', 'active')
      .preload('images', (query) => {
        query.where('is_primary', true).limit(1)
      })
  }

  /**
   * Base query with full preloads for product detail
   */
  private detailQuery() {
    return Product.query()
      .preload('images', (query) => {
        query.orderBy('sortOrder', 'asc')
      })
      .preload('category')
      .preload('variants')
      .preload('reviews', (query) => {
        query.where('isApproved', true).preload('customer').orderBy('createdAt', 'desc')
      })
  }

  /**
   * Get featured products
   */
  async getFeatured(limit: number = 8): Promise<Product[]> {
    return this.baseQuery()
      .where('isFeatured', true)
      .preload('category')
      .orderBy('totalSold', 'desc')
      .limit(limit)
  }

  /**
   * Get best seller products
   */
  async getBestSellers(limit: number = 8): Promise<Product[]> {
    return this.baseQuery().orderBy('totalSold', 'desc').limit(limit)
  }

  /**
   * Get new arrival products
   */
  async getNewArrivals(limit: number = 8): Promise<Product[]> {
    return this.baseQuery().orderBy('createdAt', 'desc').limit(limit)
  }

  /**
   * Get products on sale/discount
   */
  async getOnSale(limit: number = 8): Promise<Product[]> {
    return this.baseQuery()
      .whereNotNull('discountPrice')
      .where('discountPrice', '>', 0)
      .orderBy('totalSold', 'desc')
      .limit(limit)
  }

  /**
   * Get unique brands
   */
  async getBrands(limit: number = 8): Promise<string[]> {
    const result = await Product.query()
      .where('status', 'active')
      .whereNotNull('brand')
      .select('brand')
      .groupBy('brand')
      .orderByRaw('COUNT(*) DESC')
      .limit(limit)

    return result.map((p) => p.brand).filter(Boolean) as string[]
  }

  /**
   * Find product by slug
   */
  async findBySlug(slug: string): Promise<Product | null> {
    return this.detailQuery().where('slug', slug).first()
  }

  /**
   * Find product by id
   */
  async findById(id: number): Promise<Product | null> {
    return this.detailQuery().where('id', id).first()
  }

  /**
   * Get products with filters and pagination
   */
  async getFiltered(
    filters: ProductFilters,
    pagination: PaginationOptions = {}
  ): Promise<PaginatedResult<Product>> {
    const { page = 1, limit = 12, orderBy = 'createdAt', orderDirection = 'desc' } = pagination

    const query = this.baseQuery()

    // Apply filters
    if (filters.categoryId) {
      query.where('categoryId', filters.categoryId)
    }

    if (filters.categorySlug) {
      query.whereHas('category', (categoryQuery) => {
        categoryQuery.where('slug', filters.categorySlug!)
      })
    }

    if (filters.brand) {
      query.where('brand', filters.brand)
    }

    if (filters.minPrice !== undefined) {
      query.where('price', '>=', filters.minPrice)
    }

    if (filters.maxPrice !== undefined) {
      query.where('price', '<=', filters.maxPrice)
    }

    if (filters.isFeatured !== undefined) {
      query.where('isFeatured', filters.isFeatured)
    }

    if (filters.search) {
      const searchTerm = `%${filters.search}%`
      query.where((subQuery) => {
        subQuery
          .whereILike('name', searchTerm)
          .orWhereILike('description', searchTerm)
          .orWhereILike('brand', searchTerm)
      })
    }

    // Apply ordering
    query.orderBy(orderBy, orderDirection)

    // Paginate
    const result = await query.paginate(page, limit)

    return {
      data: result.all(),
      meta: {
        total: result.total,
        perPage: result.perPage,
        currentPage: result.currentPage,
        lastPage: result.lastPage,
        firstPage: result.firstPage,
      },
    }
  }

  /**
   * Get products by category
   */
  async getByCategory(categoryId: number, limit: number = 12): Promise<Product[]> {
    return this.baseQuery()
      .where('categoryId', categoryId)
      .orderBy('totalSold', 'desc')
      .limit(limit)
  }

  /**
   * Get related products
   */
  async getRelated(product: Product, limit: number = 4): Promise<Product[]> {
    if (!product.categoryId) {
      return []
    }

    return this.baseQuery()
      .where('categoryId', product.categoryId)
      .whereNot('id', product.id)
      .orderBy('totalSold', 'desc')
      .limit(limit)
  }

  /**
   * Get products from the same category
   */
  async getByCategoryExcept(
    categoryId: number,
    excludeProductId: number,
    limit: number = 8
  ): Promise<Product[]> {
    return this.baseQuery()
      .where('categoryId', categoryId)
      .whereNot('id', excludeProductId)
      .orderBy('totalSold', 'desc')
      .limit(limit)
  }

  /**
   * Get products by same brand
   */
  async getByBrandExcept(
    brand: string,
    excludeProductId: number,
    limit: number = 8
  ): Promise<Product[]> {
    return this.baseQuery()
      .where('brand', brand)
      .whereNot('id', excludeProductId)
      .orderBy('totalSold', 'desc')
      .limit(limit)
  }

  /**
   * Get similar products (same category or brand, excluding current)
   */
  async getSimilarProducts(product: Product, limit: number = 12): Promise<Product[]> {
    const query = this.baseQuery().whereNot('id', product.id)

    if (product.categoryId && product.brand) {
      query.where((q) => {
        q.where('categoryId', product.categoryId!).orWhere('brand', product.brand!)
      })
    } else if (product.categoryId) {
      query.where('categoryId', product.categoryId)
    } else if (product.brand) {
      query.where('brand', product.brand)
    }

    return query.orderBy('totalSold', 'desc').limit(limit)
  }

  /**
   * Search products
   */
  async search(query: string, limit: number = 10): Promise<Product[]> {
    const searchTerm = `%${query}%`
    return this.baseQuery()
      .where((subQuery) => {
        subQuery
          .whereILike('name', searchTerm)
          .orWhereILike('description', searchTerm)
          .orWhereILike('brand', searchTerm)
      })
      .orderBy('totalSold', 'desc')
      .limit(limit)
  }
}
