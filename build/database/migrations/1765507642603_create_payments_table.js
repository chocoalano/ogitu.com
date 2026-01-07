import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'payments';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE').unique();
            table.string('payment_type').notNullable().comment('credit_card, bank_transfer, gopay, etc');
            table.string('transaction_id').unique().nullable().comment('Midtrans transaction ID');
            table.string('order_id_midtrans').unique().nullable().comment('Midtrans order_id');
            table.decimal('gross_amount', 12, 2).notNullable();
            table
                .enum('transaction_status', [
                'pending',
                'capture',
                'settlement',
                'deny',
                'cancel',
                'expire',
                'refund',
            ])
                .defaultTo('pending');
            table.string('status_code').nullable();
            table.string('fraud_status').nullable();
            table.json('payment_details').nullable().comment('Full response from Midtrans');
            table.string('snap_token').nullable().comment('Snap token for frontend');
            table.string('snap_redirect_url').nullable();
            table.timestamp('transaction_time').nullable();
            table.timestamp('settlement_time').nullable();
            table.timestamp('expiry_time').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642603_create_payments_table.js.map