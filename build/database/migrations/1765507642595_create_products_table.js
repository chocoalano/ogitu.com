import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'products';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('category_id')
                .unsigned()
                .references('categories.id')
                .onDelete('SET NULL')
                .nullable();
            table.string('name').notNullable();
            table.string('slug').unique().notNullable();
            table.string('sku').unique().notNullable();
            table.text('description').nullable();
            table.text('specifications').nullable();
            table.decimal('price', 12, 2).notNullable();
            table.decimal('discount_price', 12, 2).nullable();
            table.integer('stock').defaultTo(0);
            table.integer('min_order').defaultTo(1);
            table.integer('max_order').nullable();
            table.decimal('weight', 8, 2).notNullable().comment('in grams');
            table.string('brand').nullable();
            table.enum('condition', ['new', 'used']).defaultTo('new');
            table.enum('status', ['draft', 'active', 'inactive', 'out_of_stock']).defaultTo('draft');
            table.boolean('is_featured').defaultTo(false);
            table.decimal('rating', 3, 2).defaultTo(0);
            table.integer('total_reviews').defaultTo(0);
            table.integer('total_sold').defaultTo(0);
            table.integer('view_count').defaultTo(0);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642595_create_products_table.js.map