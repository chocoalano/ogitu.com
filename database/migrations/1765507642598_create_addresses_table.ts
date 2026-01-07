import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'addresses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE')
      table.string('label').notNullable().comment('e.g., Home, Office')
      table.string('recipient_name').notNullable()
      table.string('phone').notNullable()
      table.text('address_line1').notNullable()
      table.text('address_line2').nullable()
      table.string('city_id').notNullable().comment('RajaOngkir city ID')
      table.string('city_name').notNullable()
      table.string('province_id').notNullable().comment('RajaOngkir province ID')
      table.string('province_name').notNullable()
      table.string('postal_code').notNullable()
      table.string('country').defaultTo('Indonesia')
      table.boolean('is_default').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
