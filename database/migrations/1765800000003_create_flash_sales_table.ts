import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'flash_sales'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255).notNullable()
      table.text('description').nullable()
      table.timestamp('start_date').notNullable()
      table.timestamp('end_date').notNullable()
      table.boolean('is_active').defaultTo(true)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    // Create flash_sale_products pivot table
    this.schema.createTable('flash_sale_products', (table) => {
      table.increments('id')
      table
        .integer('flash_sale_id')
        .unsigned()
        .references('id')
        .inTable('flash_sales')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.decimal('original_price', 12, 2).notNullable()
      table.decimal('flash_price', 12, 2).notNullable()
      table.integer('stock_limit').notNullable() // limited stock for flash sale
      table.integer('sold_count').defaultTo(0)
      table.unique(['flash_sale_id', 'product_id'])
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable('flash_sale_products')
    this.schema.dropTable(this.tableName)
  }
}
