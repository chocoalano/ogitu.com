import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'notifications';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table
                .integer('user_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('users')
                .onDelete('CASCADE');
            table
                .integer('customer_id')
                .unsigned()
                .nullable()
                .references('id')
                .inTable('customers')
                .onDelete('CASCADE');
            table
                .enum('type', [
                'order_new',
                'order_paid',
                'order_cancelled',
                'order_shipped',
                'order_completed',
                'review_new',
                'product_low_stock',
                'product_out_of_stock',
                'withdrawal_approved',
                'withdrawal_rejected',
                'system',
            ])
                .notNullable();
            table.string('title').notNullable();
            table.text('message').notNullable();
            table.json('data').nullable();
            table.boolean('is_read').defaultTo(false);
            table.timestamp('read_at').nullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
            table.index(['user_id', 'is_read']);
            table.index(['user_id', 'created_at']);
            table.index(['customer_id', 'is_read']);
            table.index(['customer_id', 'created_at']);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765773891137_create_create_notifications_table.js.map