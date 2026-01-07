import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'affiliate_referrals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('affiliate_id')
        .unsigned()
        .references('id')
        .inTable('affiliates')
        .onDelete('CASCADE')
      table
        .integer('referred_customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onDelete('CASCADE')
      table.string('status', 30).defaultTo('active').notNullable() // active, inactive
      table.timestamp('registered_at')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['referred_customer_id']) // A customer can only be referred once
      table.index(['affiliate_id', 'status'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
