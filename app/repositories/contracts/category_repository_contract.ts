import Category from '#models/category'

export interface CategoryRepositoryContract {
  /**
   * Get main/parent categories
   */
  getMainCategories(limit?: number): Promise<Category[]>

  /**
   * Get category by slug
   */
  findBySlug(slug: string): Promise<Category | null>

  /**
   * Get category by id
   */
  findById(id: number): Promise<Category | null>

  /**
   * Get subcategories of a parent category
   */
  getSubcategories(parentId: number): Promise<Category[]>

  /**
   * Get all active categories
   */
  getAllActive(): Promise<Category[]>

  /**
   * Get categories for navigation
   */
  getForNavigation(limit?: number): Promise<Category[]>
}
