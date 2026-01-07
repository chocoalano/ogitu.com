import { CategoryRepository, ProductRepository } from '#repositories/index';
import { CategoryTransformer, ProductTransformer } from '#transformers/index';
export default class CollectionsController {
    categoryRepository;
    productRepository;
    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.productRepository = new ProductRepository();
    }
    async index({ inertia, request }) {
        const page = request.input('page', 1);
        const limit = request.input('limit', 12);
        const search = request.input('search');
        const categorySlug = request.input('category') || request.input('categories');
        const brand = request.input('brand');
        const minPrice = request.input('minPrice');
        const maxPrice = request.input('maxPrice');
        const sortBy = request.input('sortBy', 'newest');
        const filters = {};
        if (search)
            filters.search = search;
        if (categorySlug)
            filters.categorySlug = categorySlug;
        if (brand)
            filters.brand = brand;
        if (minPrice)
            filters.minPrice = Number(minPrice);
        if (maxPrice)
            filters.maxPrice = Number(maxPrice);
        const sortOptions = this.getSortOptions(sortBy);
        const pagination = {
            page: Number(page),
            limit: Number(limit),
            ...sortOptions,
        };
        const [productsResult, categories, brands] = await Promise.all([
            this.productRepository.getFiltered(filters, pagination),
            this.categoryRepository.getMainCategories(20),
            this.productRepository.getBrands(20),
        ]);
        const products = await ProductTransformer.toListDTOs(productsResult.data);
        let activeCategory = null;
        if (categorySlug) {
            const category = await this.categoryRepository.findBySlug(categorySlug);
            if (category) {
                activeCategory = CategoryTransformer.toListDTO(category);
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
        });
    }
    getSortOptions(sortBy) {
        const sortMap = {
            'newest': { orderBy: 'createdAt', orderDirection: 'desc' },
            'oldest': { orderBy: 'createdAt', orderDirection: 'asc' },
            'price-low': { orderBy: 'price', orderDirection: 'asc' },
            'price-high': { orderBy: 'price', orderDirection: 'desc' },
            'popular': { orderBy: 'totalSold', orderDirection: 'desc' },
            'rating': { orderBy: 'rating', orderDirection: 'desc' },
        };
        return sortMap[sortBy] || sortMap.newest;
    }
    async view({ inertia, request, params }) {
        const slug = params.slug;
        const category = await this.categoryRepository.findBySlug(slug);
        if (!category) {
            return inertia.render('errors/404', {}, { status: 404 });
        }
        const page = request.input('page', 1);
        const limit = request.input('limit', 12);
        const sortBy = request.input('sortBy', 'newest');
        const brand = request.input('brand');
        const minPrice = request.input('minPrice');
        const maxPrice = request.input('maxPrice');
        const filters = {
            categorySlug: slug,
        };
        if (brand)
            filters.brand = brand;
        if (minPrice)
            filters.minPrice = Number(minPrice);
        if (maxPrice)
            filters.maxPrice = Number(maxPrice);
        const sortOptions = this.getSortOptions(sortBy);
        const pagination = {
            page: Number(page),
            limit: Number(limit),
            ...sortOptions,
        };
        const [productsResult, brands, featuredProducts, newArrivals] = await Promise.all([
            this.productRepository.getFiltered(filters, pagination),
            this.productRepository.getBrands(20),
            this.productRepository.getFiltered({ categorySlug: slug, isFeatured: true }, { limit: 8, orderBy: 'totalSold', orderDirection: 'desc' }),
            this.productRepository.getFiltered({ categorySlug: slug }, { limit: 8, orderBy: 'createdAt', orderDirection: 'desc' }),
        ]);
        const products = await ProductTransformer.toListDTOs(productsResult.data);
        const featuredProductsDTO = await ProductTransformer.toListDTOs(featuredProducts.data);
        const newArrivalsDTO = await ProductTransformer.toListDTOs(newArrivals.data);
        const subcategories = category.children || [];
        let parentCategory = null;
        if (category.parentId) {
            const parent = await this.categoryRepository.findById(category.parentId);
            if (parent) {
                parentCategory = CategoryTransformer.toListDTO(parent);
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
        });
    }
    async bestSeller({ inertia, request }) {
        const page = request.input('page', 1);
        const limit = request.input('limit', 12);
        const brand = request.input('brand');
        const minPrice = request.input('minPrice');
        const maxPrice = request.input('maxPrice');
        const filters = {};
        if (brand)
            filters.brand = brand;
        if (minPrice)
            filters.minPrice = Number(minPrice);
        if (maxPrice)
            filters.maxPrice = Number(maxPrice);
        const pagination = {
            page: Number(page),
            limit: Number(limit),
            orderBy: 'totalSold',
            orderDirection: 'desc',
        };
        const [productsResult, categories, brands] = await Promise.all([
            this.productRepository.getFiltered(filters, pagination),
            this.categoryRepository.getMainCategories(20),
            this.productRepository.getBrands(20),
        ]);
        const products = await ProductTransformer.toListDTOs(productsResult.data);
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
        });
    }
    async newArrival({ inertia, request }) {
        const page = request.input('page', 1);
        const limit = request.input('limit', 12);
        const brand = request.input('brand');
        const minPrice = request.input('minPrice');
        const maxPrice = request.input('maxPrice');
        const filters = {};
        if (brand)
            filters.brand = brand;
        if (minPrice)
            filters.minPrice = Number(minPrice);
        if (maxPrice)
            filters.maxPrice = Number(maxPrice);
        const pagination = {
            page: Number(page),
            limit: Number(limit),
            orderBy: 'createdAt',
            orderDirection: 'desc',
        };
        const [productsResult, categories, brands] = await Promise.all([
            this.productRepository.getFiltered(filters, pagination),
            this.categoryRepository.getMainCategories(20),
            this.productRepository.getBrands(20),
        ]);
        const products = await ProductTransformer.toListDTOs(productsResult.data);
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
        });
    }
}
//# sourceMappingURL=collections_controller.js.map