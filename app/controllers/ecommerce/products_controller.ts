import type { HttpContext } from '@adonisjs/core/http'
import { ProductRepository, CategoryRepository } from '#repositories/index'
import { ProductTransformer, CategoryTransformer } from '#transformers/index'

export default class ProductsController {
  private productRepository: ProductRepository
  private categoryRepository: CategoryRepository

  constructor() {
    this.productRepository = new ProductRepository()
    this.categoryRepository = new CategoryRepository()
  }

  public async view({ inertia, params }: HttpContext) {
    const slug = params.slug

    // Fetch product by slug
    const product = await this.productRepository.findBySlug(slug)
    if (!product) {
      return inertia.render('errors/404', {}, { status: 404 })
    }

    // Fetch recommendations in parallel
    const [relatedProducts, categoryProducts, similarProducts, brandProducts] = await Promise.all([
      // Products from the same category
      product.categoryId
        ? this.productRepository.getByCategoryExcept(product.categoryId, product.id, 8)
        : Promise.resolve([]),
      // Products from the same category (related)
      product.categoryId ? this.productRepository.getRelated(product, 8) : Promise.resolve([]),
      // Similar products (category or brand)
      this.productRepository.getSimilarProducts(product, 12),
      // Products from the same brand
      product.brand
        ? this.productRepository.getByBrandExcept(product.brand, product.id, 8)
        : Promise.resolve([]),
    ])

    // Transform product and recommendations
    const [
      productDetail,
      relatedProductsDTOs,
      categoryProductsDTOs,
      similarProductsDTOs,
      brandProductsDTOs,
    ] = await Promise.all([
      ProductTransformer.toDetailDTO(product),
      ProductTransformer.toListDTOs(relatedProducts),
      ProductTransformer.toListDTOs(categoryProducts),
      ProductTransformer.toListDTOs(similarProducts),
      ProductTransformer.toListDTOs(brandProducts),
    ])
    // Get category for breadcrumb
    let categoryBreadcrumb = null
    if (product.category) {
      categoryBreadcrumb = CategoryTransformer.toListDTO(product.category)

      // Get parent category if exists
      if (product.category.parentId) {
        const parentCategory = await this.categoryRepository.findById(product.category.parentId)
        if (parentCategory) {
          categoryBreadcrumb = {
            ...categoryBreadcrumb,
            parent: CategoryTransformer.toListDTO(parentCategory),
          }
        }
      }
    }

    return inertia.render('products/view', {
      product: productDetail,
      categoryBreadcrumb,
      recommendations: {
        relatedProducts: relatedProductsDTOs,
        categoryProducts: categoryProductsDTOs,
        similarProducts: similarProductsDTOs,
        brandProducts: brandProductsDTOs,
      },
    })
  }
}
