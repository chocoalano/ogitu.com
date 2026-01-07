import Article from '#models/article';
export default class ArticleRepository {
    publishedQuery() {
        return Article.query()
            .where('status', 'published')
            .whereNotNull('publishedAt')
            .preload('author');
    }
    applyFilters(query, filters) {
        if (filters.category) {
            query.where('category', filters.category);
        }
        if (filters.tag) {
            query.whereRaw('JSON_CONTAINS(tags, ?)', [JSON.stringify(filters.tag)]);
        }
        if (filters.search) {
            const searchTerm = `%${filters.search}%`;
            query.where((q) => {
                q.where('title', 'like', searchTerm)
                    .orWhere('excerpt', 'like', searchTerm)
                    .orWhere('content', 'like', searchTerm);
            });
        }
        if (filters.status) {
            query.where('status', filters.status);
        }
        if (filters.isFeatured !== undefined) {
            query.where('isFeatured', filters.isFeatured);
        }
        return query;
    }
    async getPublished(filters = {}, pagination = {}) {
        const { page = 1, limit = 12, orderBy = 'publishedAt', orderDirection = 'desc' } = pagination;
        let query = this.publishedQuery();
        query = this.applyFilters(query, filters);
        query.orderBy('isPinned', 'desc').orderBy(orderBy, orderDirection);
        const paginated = await query.paginate(page, limit);
        return {
            data: paginated.all(),
            meta: {
                total: paginated.total,
                perPage: paginated.perPage,
                currentPage: paginated.currentPage,
                lastPage: paginated.lastPage,
                firstPage: paginated.firstPage,
                hasMorePages: paginated.hasMorePages,
                hasPreviousPages: paginated.currentPage > 1,
            },
        };
    }
    async getFeatured(limit = 4) {
        return this.publishedQuery()
            .where('isFeatured', true)
            .orderBy('publishedAt', 'desc')
            .limit(limit);
    }
    async getLatest(limit = 6) {
        return this.publishedQuery().orderBy('publishedAt', 'desc').limit(limit);
    }
    async getPopular(limit = 5) {
        return this.publishedQuery().orderBy('viewCount', 'desc').limit(limit);
    }
    async getByCategory(category, limit = 6) {
        return this.publishedQuery()
            .where('category', category)
            .orderBy('publishedAt', 'desc')
            .limit(limit);
    }
    async getRelated(article, limit = 4) {
        return this.publishedQuery()
            .where('id', '!=', article.id)
            .where((query) => {
            query.where('category', article.category);
            if (article.tags && article.tags.length > 0) {
                article.tags.forEach((tag) => {
                    query.orWhereRaw('JSON_CONTAINS(tags, ?)', [JSON.stringify(tag)]);
                });
            }
        })
            .orderBy('viewCount', 'desc')
            .limit(limit);
    }
    async findBySlug(slug) {
        return this.publishedQuery().where('slug', slug).first();
    }
    async findById(id) {
        return Article.query().where('id', id).preload('author').first();
    }
    async getCategoriesWithCount() {
        const results = await Article.query()
            .where('status', 'published')
            .whereNotNull('publishedAt')
            .select('category')
            .count('* as count')
            .groupBy('category')
            .orderBy('count', 'desc');
        return results.map((r) => ({
            category: r.category,
            count: Number(r.$extras.count),
        }));
    }
    async getAllTags() {
        const articles = await Article.query()
            .where('status', 'published')
            .whereNotNull('publishedAt')
            .whereNotNull('tags')
            .select('tags');
        const tagsSet = new Set();
        articles.forEach((article) => {
            if (article.tags && Array.isArray(article.tags)) {
                article.tags.forEach((tag) => tagsSet.add(tag));
            }
        });
        return Array.from(tagsSet).sort();
    }
    async incrementViewCount(articleId) {
        await Article.query().where('id', articleId).increment('view_count', 1);
    }
}
//# sourceMappingURL=article_repository.js.map