import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'wallets';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('customer_id')
                .unsigned()
                .references('id')
                .inTable('customers')
                .onDelete('CASCADE');
            table.decimal('balance', 15, 2).defaultTo(0).notNullable();
            table.decimal('pending_balance', 15, 2).defaultTo(0).notNullable();
            table.boolean('is_active').defaultTo(true).notNullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
            table.unique(['customer_id']);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765600000001_create_wallets_table.js.map