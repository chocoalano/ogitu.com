import Redis from 'ioredis'
import type { Redis as RedisClient } from 'ioredis'
import redisConfig from '#config/redis'
import logger from '@adonisjs/core/services/logger'

/**
 * Cache keys used in the application
 */
export const CacheKeys = {
  HOME_CATEGORIES: 'home:categories',
  HOME_FEATURED_PRODUCTS: 'home:featured_products',
  HOME_BEST_SELLERS: 'home:best_sellers',
  HOME_BRANDS: 'home:brands',
  HOME_CUSTOMER_RANKS: 'home:customer_ranks',
  NAV_CATEGORIES: 'nav:categories',
  // Dynamic keys - use functions
  CATEGORY_PRODUCTS: (categoryId: number) => `category:${categoryId}:products`,
  PRODUCT_DETAIL: (productId: number) => `product:${productId}:detail`,
  PRODUCT_STATS: 'product_stats',
  ALL_CATEGORIES: 'categories:all',
  // Admin Cache Keys
  ADMIN_DASHBOARD_STATS: 'admin:dashboard_stats',
  ADMIN_ORDERS: (filters?: string) => (filters ? `admin:orders:${filters}` : `admin:orders`),
  ADMIN_ORDER: (orderId: number) => `admin:order:${orderId}`,
  ADMIN_ORDER_STATS: 'admin:order_stats',
  // Article Cache Keys
  ARTICLE_CATEGORIES: 'articles:categories',
  ARTICLE_FEATURED: 'articles:featured',
  ARTICLE_POPULAR: 'articles:popular',
  ARTICLE_TAGS: 'articles:tags',
  ARTICLE_DETAIL: (slug: string) => `articles:detail:${slug}`,
} as const

export type CacheKey = string

/**
 * Cache tags for invalidation
 */
export const CacheTags = {
  CATEGORIES: 'categories',
  PRODUCTS: 'products',
  HOME: 'home',
  ADMIN: 'admin',
  ORDERS: 'orders',
  ARTICLES: 'articles',
} as const

export type CacheTag = string

/**
 * Mapping of static cache keys to their tags
 */
const KEY_TAGS: Record<string, CacheTag[]> = {
  [CacheKeys.HOME_CATEGORIES]: [CacheTags.CATEGORIES, CacheTags.HOME],
  [CacheKeys.HOME_FEATURED_PRODUCTS]: [CacheTags.PRODUCTS, CacheTags.HOME],
  [CacheKeys.HOME_BEST_SELLERS]: [CacheTags.PRODUCTS, CacheTags.HOME],
  [CacheKeys.HOME_BRANDS]: [CacheTags.PRODUCTS, CacheTags.HOME],
  [CacheKeys.HOME_CUSTOMER_RANKS]: [CacheTags.HOME],
  [CacheKeys.NAV_CATEGORIES]: [CacheTags.CATEGORIES],
}

/**
 * Default TTL in seconds (1 hour)
 */
const DEFAULT_TTL = 3600

class CacheService {
  private redis: RedisClient | null = null
  private isConnected: boolean = false

  /**
   * Get Redis connection
   */
  private getConnection(): RedisClient {
    if (!this.redis) {
      const config = redisConfig.connections.main
      const client = new Redis.default({
        host: config.host,
        port: config.port,
        password: config.password || undefined,
        db: config.db,
        keyPrefix: config.keyPrefix,
        retryStrategy: (times: number) => {
          if (times > 3) {
            logger.error('Redis connection failed after 3 retries')
            return null
          }
          return Math.min(times * 100, 3000)
        },
      })

      client.on('connect', () => {
        this.isConnected = true
        logger.info('Redis connected')
      })

      client.on('error', (error: Error) => {
        this.isConnected = false
        logger.error('Redis error:', error.message)
      })

      client.on('close', () => {
        this.isConnected = false
      })

      this.redis = client
    }

    return this.redis
  }

  /**
   * Check if cache is available
   */
  isAvailable(): boolean {
    return this.isConnected
  }

  /**
   * Get value from cache
   */
  async get<T>(key: CacheKey): Promise<T | null> {
    try {
      const redis = this.getConnection()
      const data = await redis.get(key)

      if (!data) {
        return null
      }

      return JSON.parse(data) as T
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error)
      return null
    }
  }

  /**
   * Set value in cache
   */
  async set<T>(
    key: CacheKey,
    value: T,
    ttl: number = DEFAULT_TTL,
    tags?: CacheTag[]
  ): Promise<void> {
    try {
      const redis = this.getConnection()
      const data = JSON.stringify(value)

      await redis.setex(key, ttl, data)

      // Store key-tag relationship for invalidation
      const keyTags = tags || KEY_TAGS[key] || []
      for (const tag of keyTags) {
        await redis.sadd(`tag:${tag}`, key)
      }
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error)
    }
  }

  /**
   * Delete a specific key from cache
   */
  async delete(key: CacheKey): Promise<void> {
    try {
      const redis = this.getConnection()
      await redis.del(key)
    } catch (error) {
      console.error(`Cache delete error for key ${key}:`, error)
    }
  }

  /**
   * Invalidate all keys associated with a tag
   */
  async invalidateTag(tag: CacheTag): Promise<void> {
    try {
      const redis = this.getConnection()
      const keys = await redis.smembers(`tag:${tag}`)

      if (keys.length > 0) {
        await redis.del(...keys)
        await redis.del(`tag:${tag}`)
        logger.info(`Cache invalidated for tag: ${tag}, keys: ${keys.join(', ')}`)
      }
    } catch (error) {
      logger.error(`Cache invalidate tag error for ${tag}:`, error)
    }
  }

  /**
   * Invalidate multiple tags
   */
  async invalidateTags(tags: CacheTag[]): Promise<void> {
    await Promise.all(tags.map((tag) => this.invalidateTag(tag)))
  }

  /**
   * Get or set cache value with callback
   */
  async remember<T>(
    key: CacheKey,
    ttl: number,
    callback: () => Promise<T>,
    tags?: CacheTag[]
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key)

    if (cached !== null) {
      return cached
    }

    // Execute callback and cache the result
    const value = await callback()
    await this.set(key, value, ttl, tags)

    return value
  }

  /**
   * Clear all cache
   */
  async flush(): Promise<void> {
    try {
      const redis = this.getConnection()
      const keys = await redis.keys('ogitu:*')

      if (keys.length > 0) {
        // Remove prefix from keys before deleting
        const keysWithoutPrefix = keys.map((k: string) => k.replace('ogitu:', ''))
        await redis.del(...keysWithoutPrefix)
        logger.info(`Cache flushed: ${keys.length} keys deleted`)
      }
    } catch (error) {
      logger.error('Cache flush error:', error)
    }
  }

  /**
   * Close Redis connection
   */
  async disconnect(): Promise<void> {
    if (this.redis) {
      await this.redis.quit()
      this.redis = null
      this.isConnected = false
    }
  }
}

// Export singleton instance
const cache = new CacheService()
export default cache
