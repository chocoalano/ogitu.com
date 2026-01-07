import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'affiliates';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('customer_id')
                .unsigned()
                .references('id')
                .inTable('customers')
                .onDelete('CASCADE');
            table.string('referral_code', 50).notNullable().unique();
            table.decimal('commission_rate', 5, 2).defaultTo(5.0).notNullable();
            table.decimal('total_earnings', 15, 2).defaultTo(0).notNullable();
            table.decimal('pending_earnings', 15, 2).defaultTo(0).notNullable();
            table.decimal('withdrawn_earnings', 15, 2).defaultTo(0).notNullable();
            table.integer('total_referrals').defaultTo(0).notNullable();
            table.integer('total_orders').defaultTo(0).notNullable();
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
//# sourceMappingURL=1765600000003_create_affiliates_table.js.map