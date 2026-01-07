import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'discounts';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('product_id')
                .unsigned()
                .references('id')
                .inTable('products')
                .onDelete('CASCADE')
                .nullable();
            table.string('name', 255).notNullable();
            table.text('description').nullable();
            table.enum('type', ['percentage', 'fixed']).defaultTo('percentage');
            table.decimal('value', 10, 2).notNullable();
            table.decimal('min_purchase', 12, 2).defaultTo(0);
            table.decimal('max_discount', 12, 2).nullable();
            table.integer('usage_limit').nullable();
            table.integer('used_count').defaultTo(0);
            table.timestamp('start_date').notNullable();
            table.timestamp('end_date').notNullable();
            table.boolean('is_active').defaultTo(true);
            table.boolean('applies_to_all').defaultTo(false);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
        this.schema.createTable('discount_products', (table) => {
            table.increments('id');
            table
                .integer('discount_id')
                .unsigned()
                .references('id')
                .inTable('discounts')
                .onDelete('CASCADE');
            table
                .integer('product_id')
                .unsigned()
                .references('id')
                .inTable('products')
                .onDelete('CASCADE');
            table.unique(['discount_id', 'product_id']);
            table.timestamp('created_at');
        });
    }
    async down() {
        this.schema.dropTable('discount_products');
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765800000001_create_discounts_table.js.map