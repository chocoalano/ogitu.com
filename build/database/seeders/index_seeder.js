import { BaseSeeder } from '@adonisjs/lucid/seeders';
import logger from '@adonisjs/core/services/logger';
export default class extends BaseSeeder {
    async seed(path) {
        const { default: seeder } = await import(`../seeders/${path}.js`);
        await new seeder(this.client).run();
    }
    async run() {
        logger.info('');
        logger.info('🚀 Starting Database Seeding for Ogitu.com Vape Marketplace');
        logger.info('='.repeat(60));
        logger.info('');
        logger.info('📦 Seeding Users (Admin)...');
        await this.seed('user_seeder');
        logger.info('');
        logger.info('📦 Seeding Customers...');
        await this.seed('customer_seeder');
        logger.info('');
        logger.info('📦 Seeding Categories...');
        await this.seed('category_seeder');
        logger.info('');
        logger.info('📦 Seeding Products...');
        await this.seed('product_seeder');
        logger.info('');
        logger.info('📦 Seeding Product Variants...');
        await this.seed('product_variant_seeder');
        logger.info('');
        logger.info('📦 Seeding Product Images...');
        await this.seed('product_image_seeder');
        logger.info('');
        logger.info('📦 Seeding Addresses...');
        await this.seed('address_seeder');
        logger.info('');
        logger.info('📦 Seeding Orders, Payments, Shipping & Reviews...');
        await this.seed('order_seeder');
        logger.info('');
        logger.info('='.repeat(60));
        logger.info('🎉 Database seeding completed successfully!');
        logger.info('');
        logger.info('📋 Summary:');
        logger.info('   - Users (Admin/SuperAdmin)');
        logger.info('   - 10+ Customers');
        logger.info('   - 7 Main Categories + 35 Sub Categories');
        logger.info('   - 30 Products');
        logger.info('   - 60+ Product Variants');
        logger.info('   - 65+ Product Images');
        logger.info('   - 12 Customer Addresses');
        logger.info('   - 10 Sample Orders with Payments, Shipping & Reviews');
        logger.info('');
        logger.info('🔐 Default Credentials:');
        logger.info('   Admin: admin@ogitu.com / Admin123!');
        logger.info('   Customer: ahmad.fauzi@gmail.com / password');
        logger.info('');
    }
}
//# sourceMappingURL=index_seeder.js.map