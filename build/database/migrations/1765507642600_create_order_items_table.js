import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'order_items';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE');
            table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE');
            table
                .integer('product_variant_id')
                .unsigned()
                .references('product_variants.id')
                .onDelete('SET NULL')
                .nullable();
            table.string('product_name').notNullable();
            table.string('product_sku').notNullable();
            table.string('variant_name').nullable();
            table.decimal('price', 12, 2).notNullable();
            table.integer('quantity').notNullable();
            table.decimal('subtotal', 12, 2).notNullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642600_create_order_items_table.js.map