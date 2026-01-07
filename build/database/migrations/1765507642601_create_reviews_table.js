import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'reviews';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE');
            table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE');
            table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE');
            table.integer('rating').notNullable().comment('1-5 stars');
            table.text('comment').nullable();
            table.json('images').nullable().comment('Array of review images');
            table.boolean('is_verified_purchase').defaultTo(true);
            table.boolean('is_approved').defaultTo(false);
            table.integer('helpful_count').defaultTo(0);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642601_create_reviews_table.js.map