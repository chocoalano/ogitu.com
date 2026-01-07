import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'shippings';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE').unique();
            table.string('courier_code').notNullable().comment('jne, pos, tiki, etc');
            table.string('courier_service').notNullable().comment('REG, OKE, YES, etc');
            table.string('courier_name').notNullable();
            table.string('service_description').nullable();
            table.decimal('cost', 12, 2).notNullable();
            table.integer('weight').notNullable().comment('in grams');
            table.string('etd').nullable().comment('Estimated Time Delivery');
            table.string('waybill').nullable().comment('Tracking number/resi');
            table.string('origin_city_id').notNullable();
            table.string('destination_city_id').notNullable();
            table.json('rajaongkir_response').nullable().comment('Full response from RajaOngkir');
            table.timestamp('shipped_at').nullable();
            table.timestamp('delivered_at').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642604_create_shippings_table.js.map