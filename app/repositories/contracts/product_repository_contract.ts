import Product from '#models/product'

export interface ProductFilters {
  categoryId?: number
  categorySlug?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  status?: 'active' | 'inactive' | 'draft'
  isFeatured?: boolean
  search?: string
}

export interface PaginationOptions {
  page?: number
  limit?: number
  orderBy?: string
  orderDirection?: 'asc' | 'desc'
}

export interface PaginatedResult<T> {
  data: T[]
  meta: {
    total: number
    perPage: number
    currentPage: number
    lastPage: number
    firstPage: number
  }
}

export interface ProductRepositoryContract {
  /**
   * Get featured products
   */
  getFeatured(limit?: number): Promise<Product[]>

  /**
   * Get best seller products
   */
  getBestSellers(limit?: number): Promise<Product[]>

  /**
   * Get new arrival products
   */
  getNewArrivals(limit?: number): Promise<Product[]>

  /**
   * Get products on sale/discount
   */
  getOnSale(limit?: number): Promise<Product[]>

  /**
   * Get unique brands
   */
  getBrands(limit?: number): Promise<string[]>

  /**
   * Find product by slug
   */
  findBySlug(slug: string): Promise<Product | null>

  /**
   * Find product by id
   */
  findById(id: number): Promise<Product | null>

  /**
   * Get products with filters and pagination
   */
  getFiltered(
    filters: ProductFilters,
    pagination?: PaginationOptions
  ): Promise<PaginatedResult<Product>>

  /**
   * Get products by category
   */
  getByCategory(categoryId: number, limit?: number): Promise<Product[]>

  /**
   * Get related products
   */
  getRelated(product: Product, limit?: number): Promise<Product[]>

  /**
   * Search products
   */
  search(query: string, limit?: number): Promise<Product[]>
}
