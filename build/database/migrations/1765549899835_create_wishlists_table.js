import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'wishlists';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('customer_id')
                .unsigned()
                .references('id')
                .inTable('customers')
                .onDelete('CASCADE');
            table
                .integer('product_id')
                .unsigned()
                .references('id')
                .inTable('products')
                .onDelete('CASCADE');
            table.timestamp('created_at');
            table.timestamp('updated_at');
            table.unique(['customer_id', 'product_id']);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765549899835_create_wishlists_table.js.map