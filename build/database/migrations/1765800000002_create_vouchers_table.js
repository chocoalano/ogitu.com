import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'vouchers';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('code', 50).notNullable().unique();
            table.string('name', 255).notNullable();
            table.text('description').nullable();
            table.enum('type', ['percentage', 'fixed', 'free_shipping']).defaultTo('percentage');
            table.decimal('value', 10, 2).notNullable();
            table.decimal('min_purchase', 12, 2).defaultTo(0);
            table.decimal('max_discount', 12, 2).nullable();
            table.integer('usage_limit').nullable();
            table.integer('usage_limit_per_customer').defaultTo(1);
            table.integer('used_count').defaultTo(0);
            table.timestamp('start_date').notNullable();
            table.timestamp('end_date').notNullable();
            table.boolean('is_active').defaultTo(true);
            table.boolean('is_public').defaultTo(true);
            table.boolean('applies_to_all').defaultTo(true);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
        this.schema.createTable('voucher_products', (table) => {
            table.increments('id');
            table
                .integer('voucher_id')
                .unsigned()
                .references('id')
                .inTable('vouchers')
                .onDelete('CASCADE');
            table
                .integer('product_id')
                .unsigned()
                .references('id')
                .inTable('products')
                .onDelete('CASCADE');
            table.unique(['voucher_id', 'product_id']);
            table.timestamp('created_at');
        });
        this.schema.createTable('voucher_usages', (table) => {
            table.increments('id');
            table
                .integer('voucher_id')
                .unsigned()
                .references('id')
                .inTable('vouchers')
                .onDelete('CASCADE');
            table
                .integer('customer_id')
                .unsigned()
                .references('id')
                .inTable('customers')
                .onDelete('CASCADE');
            table
                .integer('order_id')
                .unsigned()
                .references('id')
                .inTable('orders')
                .onDelete('SET NULL')
                .nullable();
            table.decimal('discount_amount', 12, 2).notNullable();
            table.timestamp('used_at').notNullable();
            table.timestamp('created_at');
        });
    }
    async down() {
        this.schema.dropTable('voucher_usages');
        this.schema.dropTable('voucher_products');
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765800000002_create_vouchers_table.js.map