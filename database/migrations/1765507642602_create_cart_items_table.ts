import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cart_items'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('customer_id').unsigned().references('customers.id').onDelete('CASCADE')
      table.integer('product_id').unsigned().references('products.id').onDelete('CASCADE')
      table
        .integer('product_variant_id')
        .unsigned()
        .references('product_variants.id')
        .onDelete('CASCADE')
        .nullable()
      table.integer('quantity').defaultTo(1)
      table.timestamp('created_at')
      table.timestamp('updated_at')

      // Composite unique constraint to prevent duplicate cart items
      table.unique(['customer_id', 'product_id', 'product_variant_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
