import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'product_images';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE');
            table.string('url').notNullable();
            table.string('alt_text').nullable();
            table.boolean('is_primary').defaultTo(false);
            table.integer('sort_order').defaultTo(0);
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642597_create_product_images_table.js.map