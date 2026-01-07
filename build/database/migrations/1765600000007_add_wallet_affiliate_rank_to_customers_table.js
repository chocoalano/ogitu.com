import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'customers';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('rank_id')
                .unsigned()
                .references('id')
                .inTable('customer_ranks')
                .onDelete('SET NULL')
                .after('is_verified');
            table.string('referred_by_code', 50).nullable().after('rank_id');
            table.integer('total_orders_count').defaultTo(0).notNullable().after('referred_by_code');
            table.decimal('total_spent', 15, 2).defaultTo(0).notNullable().after('total_orders_count');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropForeign('rank_id');
            table.dropColumn('rank_id');
            table.dropColumn('referred_by_code');
            table.dropColumn('total_orders_count');
            table.dropColumn('total_spent');
        });
    }
}
//# sourceMappingURL=1765600000007_add_wallet_affiliate_rank_to_customers_table.js.map