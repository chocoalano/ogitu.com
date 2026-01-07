import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'wallet_transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('wallet_id').unsigned().references('id').inTable('wallets').onDelete('CASCADE')
      table
        .integer('customer_id')
        .unsigned()
        .references('id')
        .inTable('customers')
        .onDelete('CASCADE')
      table.string('transaction_type', 50).notNullable() // topup, withdrawal, commission, payment, refund
      table.decimal('amount', 15, 2).notNullable()
      table.decimal('balance_before', 15, 2).notNullable()
      table.decimal('balance_after', 15, 2).notNullable()
      table.string('reference_type', 50).nullable() // order, affiliate_commission, topup_request
      table.integer('reference_id').unsigned().nullable()
      table.string('description', 255).nullable()
      table.string('status', 30).defaultTo('completed').notNullable() // pending, completed, failed, cancelled
      table.json('metadata').nullable() // For additional data like payment gateway info
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['wallet_id', 'transaction_type'])
      table.index(['customer_id', 'created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
