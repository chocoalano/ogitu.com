import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'affiliate_commissions';
    async up() {
        this.schema.alterTable(this.tableName, (table) => {
            table.integer('level').unsigned().defaultTo(1).notNullable().after('status');
        });
    }
    async down() {
        this.schema.alterTable(this.tableName, (table) => {
            table.dropColumn('level');
        });
    }
}
//# sourceMappingURL=1766500000002_add_level_to_affiliate_commissions.js.map