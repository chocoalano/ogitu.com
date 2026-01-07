import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'categories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').unique().notNullable()
      table.text('description').nullable()
      table.string('image').nullable()
      table
        .integer('parent_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
        .nullable()
      table.boolean('is_active').defaultTo(true)
      table.integer('sort_order').defaultTo(0)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
