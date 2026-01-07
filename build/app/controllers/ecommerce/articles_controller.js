import { ArticleRepository } from '#repositories/index';
import { ArticleTransformer } from '#transformers/index';
import cache, { CacheKeys } from '#services/cache_service';
const CACHE_TTL = 1800;
export default class ArticlesController {
    articleRepository;
    constructor() {
        this.articleRepository = new ArticleRepository();
    }
    async index({ inertia, request }) {
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 12);
        const category = request.input('category');
        const tag = request.input('tag');
        const search = request.input('search');
        const articlesResult = await this.articleRepository.getPublished({ category, tag, search }, { page, limit: perPage });
        const articles = ArticleTransformer.toPaginatedListDTO(articlesResult);
        const [categories, featuredArticles, popularTags] = await Promise.all([
            this.getCachedCategories(),
            this.getCachedFeaturedArticles(),
            this.getCachedPopularTags(),
        ]);
        return inertia.render('artikel/index', {
            articles,
            categories,
            featuredArticles,
            popularTags,
            filters: {
                category: category || null,
                tag: tag || null,
                search: search || '',
            },
        });
    }
    async show({ inertia, params }) {
        const slug = params.slug;
        const article = await this.articleRepository.findBySlug(slug);
        if (!article) {
            return inertia.render('errors/404', {
                message: 'Artikel tidak ditemukan',
            });
        }
        this.articleRepository.incrementViewCount(article.id).catch(() => { });
        const relatedArticles = await this.articleRepository.getRelated(article, 4);
        const articleDetail = ArticleTransformer.toDetailDTO(article);
        const relatedArticlesDTOs = ArticleTransformer.toListDTOs(relatedArticles);
        const [categories, popularArticles] = await Promise.all([
            this.getCachedCategories(),
            this.getCachedPopularArticles(),
        ]);
        return inertia.render('artikel/show', {
            article: articleDetail,
            relatedArticles: relatedArticlesDTOs,
            popularArticles,
            categories,
        });
    }
    async category({ inertia, params, request }) {
        const category = params.category;
        const page = request.input('page', 1);
        const perPage = request.input('per_page', 12);
        const validCategories = ['tips', 'review', 'news', 'guide', 'promo'];
        if (!validCategories.includes(category)) {
            return inertia.render('errors/404', {
                message: 'Kategori tidak ditemukan',
            });
        }
        const articlesResult = await this.articleRepository.getPublished({ category }, { page, limit: perPage });
        const articles = ArticleTransformer.toPaginatedListDTO(articlesResult);
        const [categories, featuredArticles, popularTags] = await Promise.all([
            this.getCachedCategories(),
            this.getCachedFeaturedArticles(),
            this.getCachedPopularTags(),
        ]);
        const categoryLabels = {
            tips: 'Tips & Trik',
            review: 'Review Produk',
            news: 'Berita Vape',
            guide: 'Panduan',
            promo: 'Promo & Diskon',
        };
        return inertia.render('artikel/category', {
            articles,
            category: {
                slug: category,
                name: categoryLabels[category] || category,
            },
            categories,
            featuredArticles,
            popularTags,
        });
    }
    async getCachedCategories() {
        return cache.remember(CacheKeys.ARTICLE_CATEGORIES, CACHE_TTL, async () => {
            const categories = await this.articleRepository.getCategoriesWithCount();
            return categories.map((cat) => ({
                slug: cat.category,
                name: cat.category,
                count: cat.count,
                label: this.getCategoryLabel(cat.category),
            }));
        });
    }
    async getCachedFeaturedArticles() {
        return cache.remember(CacheKeys.ARTICLE_FEATURED, CACHE_TTL, async () => {
            const articles = await this.articleRepository.getFeatured(5);
            return ArticleTransformer.toListDTOs(articles);
        });
    }
    async getCachedPopularArticles() {
        return cache.remember(CacheKeys.ARTICLE_POPULAR, CACHE_TTL, async () => {
            const articles = await this.articleRepository.getPopular(5);
            return ArticleTransformer.toListDTOs(articles);
        });
    }
    async getCachedPopularTags() {
        return cache.remember(CacheKeys.ARTICLE_TAGS, CACHE_TTL, async () => {
            return this.articleRepository.getAllTags();
        });
    }
    getCategoryLabel(slug) {
        const labels = {
            tips: 'Tips & Trik',
            review: 'Review Produk',
            news: 'Berita Vape',
            guide: 'Panduan',
            promo: 'Promo & Diskon',
        };
        return labels[slug] || slug;
    }
}
//# sourceMappingURL=articles_controller.js.map