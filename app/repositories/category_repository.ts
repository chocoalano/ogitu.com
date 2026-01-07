import Category from '#models/category'
import type { CategoryRepositoryContract } from './contracts/category_repository_contract.js'

export default class CategoryRepository implements CategoryRepositoryContract {
  /**
   * Base query with common preloads
   */
  private baseQuery() {
    return Category.query().where('isActive', true)
  }

  /**
   * Get main/parent categories
   */
  async getMainCategories(limit: number = 6): Promise<Category[]> {
    return this.baseQuery().whereNull('parentId').orderBy('sortOrder', 'asc').limit(limit)
  }

  /**
   * Get category by slug
   */
  async findBySlug(slug: string): Promise<Category | null> {
    return this.baseQuery()
      .where('slug', slug)
      .preload('children', (query) => {
        query.where('isActive', true).orderBy('sortOrder', 'asc')
      })
      .first()
  }

  /**
   * Get category by id
   */
  async findById(id: number): Promise<Category | null> {
    return this.baseQuery()
      .where('id', id)
      .preload('children', (query) => {
        query.where('isActive', true).orderBy('sortOrder', 'asc')
      })
      .first()
  }

  /**
   * Get subcategories of a parent category
   */
  async getSubcategories(parentId: number): Promise<Category[]> {
    return this.baseQuery().where('parentId', parentId).orderBy('sortOrder', 'asc')
  }

  /**
   * Get all active categories
   */
  async getAllActive(): Promise<Category[]> {
    return this.baseQuery()
      .whereNull('parentId')
      .preload('children', (query) => {
        query.where('isActive', true).orderBy('sortOrder', 'asc')
      })
      .orderBy('sortOrder', 'asc')
  }

  /**
   * Get categories for navigation
   */
  async getForNavigation(limit: number = 8): Promise<Category[]> {
    return this.baseQuery().whereNull('parentId').orderBy('sortOrder', 'asc').limit(limit)
  }
}
