import { CategoryRepository, ProductRepository } from '#repositories/index';
import { CategoryTransformer, ProductTransformer } from '#transformers/index';
import cache, { CacheKeys } from '#services/cache_service';
import CustomerRank from '#models/customer_rank';
const CACHE_TTL = 3600;
export default class HomeController {
    categoryRepository;
    productRepository;
    constructor() {
        this.categoryRepository = new CategoryRepository();
        this.productRepository = new ProductRepository();
    }
    async index({ inertia }) {
        const [categories, featuredProducts, bestSellerProducts, brands, customerRanks] = await Promise.all([
            this.getCachedCategories(),
            this.getCachedFeaturedProducts(),
            this.getCachedBestSellers(),
            this.getCachedBrands(),
            this.getCachedCustomerRanks(),
        ]);
        return inertia.render('home', {
            categories,
            featuredProducts,
            bestSellerProducts,
            brands,
            customerRanks,
            benefits: this.getBenefits(),
        });
    }
    async getCachedCategories() {
        return cache.remember(CacheKeys.HOME_CATEGORIES, CACHE_TTL, async () => {
            const categories = await this.categoryRepository.getMainCategories(6);
            return CategoryTransformer.toListDTOs(categories);
        });
    }
    async getCachedFeaturedProducts() {
        return cache.remember(CacheKeys.HOME_FEATURED_PRODUCTS, CACHE_TTL, async () => {
            const products = await this.productRepository.getFeatured(8);
            return ProductTransformer.toListDTOs(products);
        });
    }
    async getCachedBestSellers() {
        return cache.remember(CacheKeys.HOME_BEST_SELLERS, CACHE_TTL, async () => {
            const products = await this.productRepository.getBestSellers(8);
            return ProductTransformer.toListDTOs(products);
        });
    }
    async getCachedBrands() {
        return cache.remember(CacheKeys.HOME_BRANDS, CACHE_TTL, async () => {
            return this.productRepository.getBrands(8);
        });
    }
    async getCachedCustomerRanks() {
        return cache.remember(CacheKeys.HOME_CUSTOMER_RANKS, CACHE_TTL, async () => {
            const ranks = await CustomerRank.query()
                .where('isActive', true)
                .orderBy('orderPriority', 'asc');
            return ranks.map((rank, index) => ({
                id: rank.id,
                name: rank.name,
                slug: rank.slug,
                level: index + 1,
                icon: rank.icon || this.getDefaultRankIcon(index),
                color: rank.color,
                cashbackRate: rank.cashbackRate,
                affiliateBonusRate: rank.affiliateBonusRate,
                minOrders: rank.minOrders,
                minSpent: rank.minSpent,
                benefits: rank.benefits,
            }));
        });
    }
    getDefaultRankIcon(index) {
        const icons = ['i-lucide-flame', 'i-lucide-zap', 'i-lucide-crown'];
        return icons[index] || 'i-lucide-star';
    }
    getBenefits() {
        return [
            {
                icon: 'i-lucide-shield-check',
                title: '100% Original',
                description: 'Semua produk dijamin original dari distributor resmi',
            },
            {
                icon: 'i-lucide-truck',
                title: 'Pengiriman Cepat',
                description: 'Gratis ongkir dengan RajaOngkir ke seluruh Indonesia',
            },
            {
                icon: 'i-lucide-lock',
                title: 'Pembayaran Aman',
                description: 'Integrasi Midtrans dengan berbagai metode pembayaran',
            },
            {
                icon: 'i-lucide-headphones',
                title: 'Customer Support 24/7',
                description: 'Tim support siap membantu kapan saja',
            },
        ];
    }
}
//# sourceMappingURL=home_controller.js.map