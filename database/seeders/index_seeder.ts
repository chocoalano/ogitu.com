import { BaseSeeder } from '@adonisjs/lucid/seeders'
import logger from '@adonisjs/core/services/logger'
/**
 * Main seeder that runs all seeders in correct order.
 *
 * IMPORTANT: Run this seeder only with:
 *   node ace db:seed --files="database/seeders/index_seeder.ts"
 *
 * DO NOT use `node ace db:seed` without --files flag as it will
 * run all seeders multiple times causing duplicate entry errors.
 */
export default class extends BaseSeeder {
  private async seed(path: string) {
    const { default: seeder } = await import(`../seeders/${path}.js`)
    await new seeder(this.client).run()
  }

  async run() {
    logger.info('')
    logger.info('🚀 Starting Database Seeding for Ogitu.com Vape Marketplace')
    logger.info('='.repeat(60))
    logger.info('')

    // 1. Users (Admin)
    logger.info('📦 Seeding Users (Admin)...')
    await this.seed('user_seeder')
    logger.info('')

    // 2. Customers
    logger.info('📦 Seeding Customers...')
    await this.seed('customer_seeder')
    logger.info('')

    // 3. Categories
    logger.info('📦 Seeding Categories...')
    await this.seed('category_seeder')
    logger.info('')

    // 4. Products (depends on categories)
    logger.info('📦 Seeding Products...')
    await this.seed('product_seeder')
    logger.info('')

    // 5. Product Variants (depends on products)
    logger.info('📦 Seeding Product Variants...')
    await this.seed('product_variant_seeder')
    logger.info('')

    // 6. Product Images (depends on products)
    logger.info('📦 Seeding Product Images...')
    await this.seed('product_image_seeder')
    logger.info('')

    // 7. Addresses (depends on customers)
    logger.info('📦 Seeding Addresses...')
    await this.seed('address_seeder')
    logger.info('')

    // 8. Orders & Related (depends on customers, products, variants, addresses)
    logger.info('📦 Seeding Orders, Payments, Shipping & Reviews...')
    await this.seed('order_seeder')
    logger.info('')

    logger.info('='.repeat(60))
    logger.info('🎉 Database seeding completed successfully!')
    logger.info('')
    logger.info('📋 Summary:')
    logger.info('   - Users (Admin/SuperAdmin)')
    logger.info('   - 10+ Customers')
    logger.info('   - 7 Main Categories + 35 Sub Categories')
    logger.info('   - 30 Products')
    logger.info('   - 60+ Product Variants')
    logger.info('   - 65+ Product Images')
    logger.info('   - 12 Customer Addresses')
    logger.info('   - 10 Sample Orders with Payments, Shipping & Reviews')
    logger.info('')
    logger.info('🔐 Default Credentials:')
    logger.info('   Admin: admin@ogitu.com / Admin123!')
    logger.info('   Customer: ahmad.fauzi@gmail.com / password')
    logger.info('')
  }
}
