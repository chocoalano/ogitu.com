import { ProductRepository, CategoryRepository } from '#repositories/index';
import { ProductTransformer, CategoryTransformer } from '#transformers/index';
export default class ProductsController {
    productRepository;
    categoryRepository;
    constructor() {
        this.productRepository = new ProductRepository();
        this.categoryRepository = new CategoryRepository();
    }
    async view({ inertia, params }) {
        const slug = params.slug;
        const product = await this.productRepository.findBySlug(slug);
        if (!product) {
            return inertia.render('errors/404', {}, { status: 404 });
        }
        const [relatedProducts, categoryProducts, similarProducts, brandProducts] = await Promise.all([
            product.categoryId
                ? this.productRepository.getByCategoryExcept(product.categoryId, product.id, 8)
                : Promise.resolve([]),
            product.categoryId ? this.productRepository.getRelated(product, 8) : Promise.resolve([]),
            this.productRepository.getSimilarProducts(product, 12),
            product.brand
                ? this.productRepository.getByBrandExcept(product.brand, product.id, 8)
                : Promise.resolve([]),
        ]);
        const [productDetail, relatedProductsDTOs, categoryProductsDTOs, similarProductsDTOs, brandProductsDTOs,] = await Promise.all([
            ProductTransformer.toDetailDTO(product),
            ProductTransformer.toListDTOs(relatedProducts),
            ProductTransformer.toListDTOs(categoryProducts),
            ProductTransformer.toListDTOs(similarProducts),
            ProductTransformer.toListDTOs(brandProducts),
        ]);
        let categoryBreadcrumb = null;
        if (product.category) {
            categoryBreadcrumb = CategoryTransformer.toListDTO(product.category);
            if (product.category.parentId) {
                const parentCategory = await this.categoryRepository.findById(product.category.parentId);
                if (parentCategory) {
                    categoryBreadcrumb = {
                        ...categoryBreadcrumb,
                        parent: CategoryTransformer.toListDTO(parentCategory),
                    };
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
        });
    }
}
//# sourceMappingURL=products_controller.js.map