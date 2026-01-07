import Product from '#models/product';
export default class ProductRepository {
    baseQuery() {
        return Product.query()
            .where('status', 'active')
            .preload('images', (query) => {
            query.where('is_primary', true).limit(1);
        });
    }
    detailQuery() {
        return Product.query()
            .preload('images', (query) => {
            query.orderBy('sortOrder', 'asc');
        })
            .preload('category')
            .preload('variants')
            .preload('reviews', (query) => {
            query.where('isApproved', true).preload('customer').orderBy('createdAt', 'desc');
        });
    }
    async getFeatured(limit = 8) {
        return this.baseQuery()
            .where('isFeatured', true)
            .preload('category')
            .orderBy('totalSold', 'desc')
            .limit(limit);
    }
    async getBestSellers(limit = 8) {
        return this.baseQuery().orderBy('totalSold', 'desc').limit(limit);
    }
    async getNewArrivals(limit = 8) {
        return this.baseQuery().orderBy('createdAt', 'desc').limit(limit);
    }
    async getOnSale(limit = 8) {
        return this.baseQuery()
            .whereNotNull('discountPrice')
            .where('discountPrice', '>', 0)
            .orderBy('totalSold', 'desc')
            .limit(limit);
    }
    async getBrands(limit = 8) {
        const result = await Product.query()
            .where('status', 'active')
            .whereNotNull('brand')
            .select('brand')
            .groupBy('brand')
            .orderByRaw('COUNT(*) DESC')
            .limit(limit);
        return result.map((p) => p.brand).filter(Boolean);
    }
    async findBySlug(slug) {
        return this.detailQuery().where('slug', slug).first();
    }
    async findById(id) {
        return this.detailQuery().where('id', id).first();
    }
    async getFiltered(filters, pagination = {}) {
        const { page = 1, limit = 12, orderBy = 'createdAt', orderDirection = 'desc' } = pagination;
        const query = this.baseQuery();
        if (filters.categoryId) {
            query.where('categoryId', filters.categoryId);
        }
        if (filters.categorySlug) {
            query.whereHas('category', (categoryQuery) => {
                categoryQuery.where('slug', filters.categorySlug);
            });
        }
        if (filters.brand) {
            query.where('brand', filters.brand);
        }
        if (filters.minPrice !== undefined) {
            query.where('price', '>=', filters.minPrice);
        }
        if (filters.maxPrice !== undefined) {
            query.where('price', '<=', filters.maxPrice);
        }
        if (filters.isFeatured !== undefined) {
            query.where('isFeatured', filters.isFeatured);
        }
        if (filters.search) {
            const searchTerm = `%${filters.search}%`;
            query.where((subQuery) => {
                subQuery
                    .whereILike('name', searchTerm)
                    .orWhereILike('description', searchTerm)
                    .orWhereILike('brand', searchTerm);
            });
        }
        query.orderBy(orderBy, orderDirection);
        const result = await query.paginate(page, limit);
        return {
            data: result.all(),
            meta: {
                total: result.total,
                perPage: result.perPage,
                currentPage: result.currentPage,
                lastPage: result.lastPage,
                firstPage: result.firstPage,
            },
        };
    }
    async getByCategory(categoryId, limit = 12) {
        return this.baseQuery()
            .where('categoryId', categoryId)
            .orderBy('totalSold', 'desc')
            .limit(limit);
    }
    async getRelated(product, limit = 4) {
        if (!product.categoryId) {
            return [];
        }
        return this.baseQuery()
            .where('categoryId', product.categoryId)
            .whereNot('id', product.id)
            .orderBy('totalSold', 'desc')
            .limit(limit);
    }
    async getByCategoryExcept(categoryId, excludeProductId, limit = 8) {
        return this.baseQuery()
            .where('categoryId', categoryId)
            .whereNot('id', excludeProductId)
            .orderBy('totalSold', 'desc')
            .limit(limit);
    }
    async getByBrandExcept(brand, excludeProductId, limit = 8) {
        return this.baseQuery()
            .where('brand', brand)
            .whereNot('id', excludeProductId)
            .orderBy('totalSold', 'desc')
            .limit(limit);
    }
    async getSimilarProducts(product, limit = 12) {
        const query = this.baseQuery().whereNot('id', product.id);
        if (product.categoryId && product.brand) {
            query.where((q) => {
                q.where('categoryId', product.categoryId).orWhere('brand', product.brand);
            });
        }
        else if (product.categoryId) {
            query.where('categoryId', product.categoryId);
        }
        else if (product.brand) {
            query.where('brand', product.brand);
        }
        return query.orderBy('totalSold', 'desc').limit(limit);
    }
    async search(query, limit = 10) {
        const searchTerm = `%${query}%`;
        return this.baseQuery()
            .where((subQuery) => {
            subQuery
                .whereILike('name', searchTerm)
                .orWhereILike('description', searchTerm)
                .orWhereILike('brand', searchTerm);
        })
            .orderBy('totalSold', 'desc')
            .limit(limit);
    }
}
//# sourceMappingURL=product_repository.js.map