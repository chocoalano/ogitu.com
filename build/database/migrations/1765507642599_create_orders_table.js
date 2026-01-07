import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'orders';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('order_number').unique().notNullable();
            table
                .integer('customer_id')
                .unsigned()
                .references('id')
                .inTable('customers')
                .onDelete('CASCADE');
            table
                .integer('address_id')
                .unsigned()
                .references('addresses.id')
                .onDelete('SET NULL')
                .nullable();
            table
                .enum('status', [
                'pending_payment',
                'paid',
                'processing',
                'shipped',
                'delivered',
                'cancelled',
                'refunded',
            ])
                .defaultTo('pending_payment');
            table.decimal('subtotal', 12, 2).notNullable();
            table.decimal('tax', 12, 2).defaultTo(0);
            table.decimal('shipping_cost', 12, 2).defaultTo(0);
            table.decimal('discount', 12, 2).defaultTo(0);
            table.decimal('admin_fee', 12, 2).defaultTo(0);
            table.decimal('total', 12, 2).notNullable();
            table.text('customer_notes').nullable();
            table.text('admin_notes').nullable();
            table.timestamp('paid_at').nullable();
            table.timestamp('processed_at').nullable();
            table.timestamp('shipped_at').nullable();
            table.timestamp('delivered_at').nullable();
            table.timestamp('cancelled_at').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642599_create_orders_table.js.map