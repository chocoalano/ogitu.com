import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'cart_items';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.boolean('checked').defaultTo(true).after('quantity');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('checked');
        });
    }
}
//# sourceMappingURL=1765555476419_create_add_checked_to_cart_items_table.js.map