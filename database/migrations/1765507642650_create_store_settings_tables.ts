import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'store_settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Setting key-value structure for flexible settings
      table.string('key', 100).notNullable().unique()
      table.text('value').nullable()
      table.string('type', 50).defaultTo('string') // string, json, boolean, number
      table.string('group', 50).defaultTo('general') // general, address, shipping, notification
      table.text('description').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    // Create store_addresses table for warehouses/origin addresses
    this.schema.createTable('store_addresses', (table) => {
      table.increments('id')

      table.string('name', 100).notNullable() // Warehouse name
      table.string('contact_name', 100).notNullable()
      table.string('phone', 20).notNullable()
      table.text('address_line1').notNullable()
      table.text('address_line2').nullable()
      table.string('district_id', 20).notNullable() // For RajaOngkir
      table.string('district_name', 100).notNullable()
      table.string('city_id', 20).notNullable()
      table.string('city_name', 100).notNullable()
      table.string('province_id', 20).notNullable()
      table.string('province_name', 100).notNullable()
      table.string('postal_code', 10).notNullable()
      table.string('country', 50).defaultTo('Indonesia')
      table.boolean('is_default').defaultTo(false)
      table.boolean('is_active').defaultTo(true)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    // Create shipping_couriers table for enabled couriers
    this.schema.createTable('shipping_couriers', (table) => {
      table.increments('id')

      table.string('code', 20).notNullable().unique() // jne, jnt, sicepat, etc
      table.string('name', 100).notNullable()
      table.string('logo', 255).nullable()
      table.text('description').nullable()
      table.json('services').nullable() // Array of enabled services
      table.boolean('is_active').defaultTo(true)
      table.integer('sort_order').defaultTo(0)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    // Create notification_settings table
    this.schema.createTable('notification_settings', (table) => {
      table.increments('id')

      table.string('event_key', 100).notNullable().unique() // order_placed, order_shipped, etc
      table.string('event_name', 255).notNullable()
      table.string('event_group', 50).defaultTo('orders') // orders, payments, promotions, system
      table.text('description').nullable()
      table.boolean('email_enabled').defaultTo(true)
      table.boolean('push_enabled').defaultTo(true)
      table.boolean('whatsapp_enabled').defaultTo(false)
      table.string('email_template', 255).nullable()
      table.string('whatsapp_template', 255).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable('notification_settings')
    this.schema.dropTable('shipping_couriers')
    this.schema.dropTable('store_addresses')
    this.schema.dropTable(this.tableName)
  }
}
