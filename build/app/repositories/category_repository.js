import Category from '#models/category';
export default class CategoryRepository {
    baseQuery() {
        return Category.query().where('isActive', true);
    }
    async getMainCategories(limit = 6) {
        return this.baseQuery().whereNull('parentId').orderBy('sortOrder', 'asc').limit(limit);
    }
    async findBySlug(slug) {
        return this.baseQuery()
            .where('slug', slug)
            .preload('children', (query) => {
            query.where('isActive', true).orderBy('sortOrder', 'asc');
        })
            .first();
    }
    async findById(id) {
        return this.baseQuery()
            .where('id', id)
            .preload('children', (query) => {
            query.where('isActive', true).orderBy('sortOrder', 'asc');
        })
            .first();
    }
    async getSubcategories(parentId) {
        return this.baseQuery().where('parentId', parentId).orderBy('sortOrder', 'asc');
    }
    async getAllActive() {
        return this.baseQuery()
            .whereNull('parentId')
            .preload('children', (query) => {
            query.where('isActive', true).orderBy('sortOrder', 'asc');
        })
            .orderBy('sortOrder', 'asc');
    }
    async getForNavigation(limit = 8) {
        return this.baseQuery().whereNull('parentId').orderBy('sortOrder', 'asc').limit(limit);
    }
}
//# sourceMappingURL=category_repository.js.map