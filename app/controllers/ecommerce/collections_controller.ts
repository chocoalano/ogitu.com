import type { HttpContext } from '@adonisjs/core/http'
import { CategoryRepository, ProductRepository } from '#repositories/index'
import { CategoryTransformer, ProductTransformer } from '#transformers/index'
import type {
  ProductFilters,
  PaginationOptions,
} from '#repositories/contracts/product_repository_contract'

export default class CollectionsController {
  private categoryRepository: CategoryRepository
  private productRepository: ProductRepository

  constructor() {
    this.categoryRepository = new CategoryRepository()
    this.productRepository = new ProductRepository()
  }

  public async index({ inertia, request }: HttpContext) {
    // Get query parameters
    const page = request.input('page', 1)
    const limit = request.input('limit', 12)
    const search = request.input('search')
    // Support both 'category' and 'categories' query param
    const categorySlug = request.input('category') || request.input('categories')
    const brand = request.input('brand')
    const minPrice = request.input('minPrice')
    const maxPrice = request.input('maxPrice')
    const sortBy = request.input('sortBy', 'newest')

    // Build filters
    const filters: ProductFilters = {}
    if (search) filters.search = search
    if (categorySlug) filters.categorySlug = categorySlug
    if (brand) filters.brand = brand
    if (minPrice) filters.minPrice = Number(minPrice)
    if (maxPrice) filters.maxPrice = Number(maxPrice)

    // Build pagination options with sorting
    const sortOptions = this.getSortOptions(sortBy)
    const pagination: PaginationOptions = {
      page: Number(page),
      limit: Number(limit),
      ...sortOptions,
    }

    // Fetch data
    const [productsResult, categories, brands] = await Promise.all([
      this.productRepository.getFiltered(filters, pagination),
      this.categoryRepository.getMainCategories(20),
      this.productRepository.getBrands(20),
    ])

    // Transform products
    const products = await ProductTransformer.toListDTOs(productsResult.data)

    // Get active category if filtered
    let activeCategory = null
    if (categorySlug) {
      const category = await this.categoryRepository.findBySlug(categorySlug)
      if (category) {
        activeCategory = CategoryTransformer.toListDTO(category)
      }
    }

    return inertia.render('collections/index', {
      products,
      meta: productsResult.meta,
      categories: CategoryTransformer.toListDTOs(categories),
      brands,
      filters: {
        search: search || '',
        category: categorySlug || '',
        brand: brand || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
        sortBy,
      },
      activeCategory,
    })
  }

  private getSortOptions(sortBy: string): Pick<PaginationOptions, 'orderBy' | 'orderDirection'> {
    const sortMap: Record<string, Pick<PaginationOptions, 'orderBy' | 'orderDirection'>> = {
      'newest': { orderBy: 'createdAt', orderDirection: 'desc' },
      'oldest': { orderBy: 'createdAt', orderDirection: 'asc' },
      'price-low': { orderBy: 'price', orderDirection: 'asc' },
      'price-high': { orderBy: 'price', orderDirection: 'desc' },
      'popular': { orderBy: 'totalSold', orderDirection: 'desc' },
      'rating': { orderBy: 'rating', orderDirection: 'desc' },
    }
    return sortMap[sortBy] || sortMap.newest
  }

  public async view({ inertia, request, params }: HttpContext) {
    const slug = params.slug

    // Fetch category by slug
    const category = await this.categoryRepository.findBySlug(slug)
    if (!category) {
      return inertia.render('errors/404', {}, { status: 404 })
    }

    // Get query parameters for pagination and sorting
    const page = request.input('page', 1)
    const limit = request.input('limit', 12)
    const sortBy = request.input('sortBy', 'newest')
    const brand = request.input('brand')
    const minPrice = request.input('minPrice')
    const maxPrice = request.input('maxPrice')

    // Build filters for this category
    const filters: ProductFilters = {
      categorySlug: slug,
    }
    if (brand) filters.brand = brand
    if (minPrice) filters.minPrice = Number(minPrice)
    if (maxPrice) filters.maxPrice = Number(maxPrice)

    // Build pagination options with sorting
    const sortOptions = this.getSortOptions(sortBy)
    const pagination: PaginationOptions = {
      page: Number(page),
      limit: Number(limit),
      ...sortOptions,
    }

    // Fetch products in this category with pagination
    const [productsResult, brands, featuredProducts, newArrivals] = await Promise.all([
      this.productRepository.getFiltered(filters, pagination),
      this.productRepository.getBrands(20),
      this.productRepository.getFiltered(
        { categorySlug: slug, isFeatured: true },
        { limit: 8, orderBy: 'totalSold', orderDirection: 'desc' }
      ),
      this.productRepository.getFiltered(
        { categorySlug: slug },
        { limit: 8, orderBy: 'createdAt', orderDirection: 'desc' }
      ),
    ])

    // Transform products
    const products = await ProductTransformer.toListDTOs(productsResult.data)
    const featuredProductsDTO = await ProductTransformer.toListDTOs(featuredProducts.data)
    const newArrivalsDTO = await ProductTransformer.toListDTOs(newArrivals.data)

    // Get subcategories if any
    const subcategories = category.children || []

    // Get parent category for breadcrumb
    let parentCategory = null
    if (category.parentId) {
      const parent = await this.categoryRepository.findById(category.parentId)
      if (parent) {
        parentCategory = CategoryTransformer.toListDTO(parent)
      }
    }

    return inertia.render('collections/view', {
      category: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        parentId: category.parentId,
      },
      parentCategory,
      subcategories: CategoryTransformer.toListDTOs(subcategories),
      products,
      meta: productsResult.meta,
      brands,
      featuredProducts: featuredProductsDTO,
      newArrivals: newArrivalsDTO,
      filters: {
        brand: brand || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
        sortBy,
      },
    })
  }

  /**
   * Best Seller products page
   */
  public async bestSeller({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 12)
    const brand = request.input('brand')
    const minPrice = request.input('minPrice')
    const maxPrice = request.input('maxPrice')

    // Build filters
    const filters: ProductFilters = {}
    if (brand) filters.brand = brand
    if (minPrice) filters.minPrice = Number(minPrice)
    if (maxPrice) filters.maxPrice = Number(maxPrice)

    // Pagination with best seller sorting
    const pagination: PaginationOptions = {
      page: Number(page),
      limit: Number(limit),
      orderBy: 'totalSold',
      orderDirection: 'desc',
    }

    // Fetch data
    const [productsResult, categories, brands] = await Promise.all([
      this.productRepository.getFiltered(filters, pagination),
      this.categoryRepository.getMainCategories(20),
      this.productRepository.getBrands(20),
    ])

    // Transform products
    const products = await ProductTransformer.toListDTOs(productsResult.data)

    return inertia.render('collections/best-seller', {
      products,
      meta: productsResult.meta,
      categories: CategoryTransformer.toListDTOs(categories),
      brands,
      filters: {
        brand: brand || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
      },
    })
  }

  /**
   * New Arrival products page
   */
  public async newArrival({ inertia, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 12)
    const brand = request.input('brand')
    const minPrice = request.input('minPrice')
    const maxPrice = request.input('maxPrice')

    // Build filters
    const filters: ProductFilters = {}
    if (brand) filters.brand = brand
    if (minPrice) filters.minPrice = Number(minPrice)
    if (maxPrice) filters.maxPrice = Number(maxPrice)

    // Pagination with newest first
    const pagination: PaginationOptions = {
      page: Number(page),
      limit: Number(limit),
      orderBy: 'createdAt',
      orderDirection: 'desc',
    }

    // Fetch data
    const [productsResult, categories, brands] = await Promise.all([
      this.productRepository.getFiltered(filters, pagination),
      this.categoryRepository.getMainCategories(20),
      this.productRepository.getBrands(20),
    ])

    // Transform products
    const products = await ProductTransformer.toListDTOs(productsResult.data)

    return inertia.render('collections/new-arrival', {
      products,
      meta: productsResult.meta,
      categories: CategoryTransformer.toListDTOs(categories),
      brands,
      filters: {
        brand: brand || '',
        minPrice: minPrice || '',
        maxPrice: maxPrice || '',
      },
    })
  }
}
