import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'product_variants';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE');
            table.string('name').notNullable().comment('e.g., Color, Size, Flavor');
            table.string('value').notNullable().comment('e.g., Red, 60ml, Mint');
            table.string('sku').unique().notNullable();
            table.decimal('price_adjustment', 12, 2).defaultTo(0);
            table.integer('stock').defaultTo(0);
            table.boolean('is_active').defaultTo(true);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642596_create_product_variants_table.js.map