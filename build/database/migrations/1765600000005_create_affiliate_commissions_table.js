import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'affiliate_commissions';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('affiliate_id')
                .unsigned()
                .references('id')
                .inTable('affiliates')
                .onDelete('CASCADE');
            table.integer('order_id').unsigned().references('id').inTable('orders').onDelete('CASCADE');
            table
                .integer('referred_customer_id')
                .unsigned()
                .references('id')
                .inTable('customers')
                .onDelete('SET NULL');
            table.decimal('order_total', 15, 2).notNullable();
            table.decimal('commission_rate', 5, 2).notNullable();
            table.decimal('commission_amount', 15, 2).notNullable();
            table.string('status', 30).defaultTo('pending').notNullable();
            table.timestamp('approved_at').nullable();
            table.timestamp('paid_at').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
            table.index(['affiliate_id', 'status']);
            table.index(['order_id']);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765600000005_create_affiliate_commissions_table.js.map