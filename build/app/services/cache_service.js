import Redis from 'ioredis';
import redisConfig from '#config/redis';
import logger from '@adonisjs/core/services/logger';
export const CacheKeys = {
    HOME_CATEGORIES: 'home:categories',
    HOME_FEATURED_PRODUCTS: 'home:featured_products',
    HOME_BEST_SELLERS: 'home:best_sellers',
    HOME_BRANDS: 'home:brands',
    HOME_CUSTOMER_RANKS: 'home:customer_ranks',
    NAV_CATEGORIES: 'nav:categories',
    CATEGORY_PRODUCTS: (categoryId) => `category:${categoryId}:products`,
    PRODUCT_DETAIL: (productId) => `product:${productId}:detail`,
    PRODUCT_STATS: 'product_stats',
    ALL_CATEGORIES: 'categories:all',
    ADMIN_DASHBOARD_STATS: 'admin:dashboard_stats',
    ADMIN_ORDERS: (filters) => (filters ? `admin:orders:${filters}` : `admin:orders`),
    ADMIN_ORDER: (orderId) => `admin:order:${orderId}`,
    ADMIN_ORDER_STATS: 'admin:order_stats',
    ARTICLE_CATEGORIES: 'articles:categories',
    ARTICLE_FEATURED: 'articles:featured',
    ARTICLE_POPULAR: 'articles:popular',
    ARTICLE_TAGS: 'articles:tags',
    ARTICLE_DETAIL: (slug) => `articles:detail:${slug}`,
};
export const CacheTags = {
    CATEGORIES: 'categories',
    PRODUCTS: 'products',
    HOME: 'home',
    ADMIN: 'admin',
    ORDERS: 'orders',
    ARTICLES: 'articles',
};
const KEY_TAGS = {
    [CacheKeys.HOME_CATEGORIES]: [CacheTags.CATEGORIES, CacheTags.HOME],
    [CacheKeys.HOME_FEATURED_PRODUCTS]: [CacheTags.PRODUCTS, CacheTags.HOME],
    [CacheKeys.HOME_BEST_SELLERS]: [CacheTags.PRODUCTS, CacheTags.HOME],
    [CacheKeys.HOME_BRANDS]: [CacheTags.PRODUCTS, CacheTags.HOME],
    [CacheKeys.HOME_CUSTOMER_RANKS]: [CacheTags.HOME],
    [CacheKeys.NAV_CATEGORIES]: [CacheTags.CATEGORIES],
};
const DEFAULT_TTL = 3600;
class CacheService {
    redis = null;
    isConnected = false;
    getConnection() {
        if (!this.redis) {
            const config = redisConfig.connections.main;
            const client = new Redis.default({
                host: config.host,
                port: config.port,
                password: config.password || undefined,
                db: config.db,
                keyPrefix: config.keyPrefix,
                retryStrategy: (times) => {
                    if (times > 3) {
                        logger.error('Redis connection failed after 3 retries');
                        return null;
                    }
                    return Math.min(times * 100, 3000);
                },
            });
            client.on('connect', () => {
                this.isConnected = true;
                logger.info('Redis connected');
            });
            client.on('error', (error) => {
                this.isConnected = false;
                logger.error('Redis error:', error.message);
            });
            client.on('close', () => {
                this.isConnected = false;
            });
            this.redis = client;
        }
        return this.redis;
    }
    isAvailable() {
        return this.isConnected;
    }
    async get(key) {
        try {
            const redis = this.getConnection();
            const data = await redis.get(key);
            if (!data) {
                return null;
            }
            return JSON.parse(data);
        }
        catch (error) {
            console.error(`Cache get error for key ${key}:`, error);
            return null;
        }
    }
    async set(key, value, ttl = DEFAULT_TTL, tags) {
        try {
            const redis = this.getConnection();
            const data = JSON.stringify(value);
            await redis.setex(key, ttl, data);
            const keyTags = tags || KEY_TAGS[key] || [];
            for (const tag of keyTags) {
                await redis.sadd(`tag:${tag}`, key);
            }
        }
        catch (error) {
            console.error(`Cache set error for key ${key}:`, error);
        }
    }
    async delete(key) {
        try {
            const redis = this.getConnection();
            await redis.del(key);
        }
        catch (error) {
            console.error(`Cache delete error for key ${key}:`, error);
        }
    }
    async invalidateTag(tag) {
        try {
            const redis = this.getConnection();
            const keys = await redis.smembers(`tag:${tag}`);
            if (keys.length > 0) {
                await redis.del(...keys);
                await redis.del(`tag:${tag}`);
                logger.info(`Cache invalidated for tag: ${tag}, keys: ${keys.join(', ')}`);
            }
        }
        catch (error) {
            logger.error(`Cache invalidate tag error for ${tag}:`, error);
        }
    }
    async invalidateTags(tags) {
        await Promise.all(tags.map((tag) => this.invalidateTag(tag)));
    }
    async remember(key, ttl, callback, tags) {
        const cached = await this.get(key);
        if (cached !== null) {
            return cached;
        }
        const value = await callback();
        await this.set(key, value, ttl, tags);
        return value;
    }
    async flush() {
        try {
            const redis = this.getConnection();
            const keys = await redis.keys('ogitu:*');
            if (keys.length > 0) {
                const keysWithoutPrefix = keys.map((k) => k.replace('ogitu:', ''));
                await redis.del(...keysWithoutPrefix);
                logger.info(`Cache flushed: ${keys.length} keys deleted`);
            }
        }
        catch (error) {
            logger.error('Cache flush error:', error);
        }
    }
    async disconnect() {
        if (this.redis) {
            await this.redis.quit();
            this.redis = null;
            this.isConnected = false;
        }
    }
}
const cache = new CacheService();
export default cache;
//# sourceMappingURL=cache_service.js.map