import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'affiliate_referrals';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table
                .integer('parent_affiliate_id')
                .unsigned()
                .references('id')
                .inTable('affiliates')
                .onDelete('SET NULL')
                .nullable()
                .after('affiliate_id');
            table.integer('level').unsigned().defaultTo(1).notNullable().after('parent_affiliate_id');
            table.decimal('total_spent', 15, 2).defaultTo(0).notNullable().after('status');
            table.integer('total_orders').unsigned().defaultTo(0).notNullable().after('total_spent');
            table.index(['parent_affiliate_id', 'level']);
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropIndex(['parent_affiliate_id', 'level']);
            table.dropColumn('parent_affiliate_id');
            table.dropColumn('level');
            table.dropColumn('total_spent');
            table.dropColumn('total_orders');
        });
    }
}
//# sourceMappingURL=1766500000001_add_mlm_tree_columns_to_affiliate_referrals.js.map