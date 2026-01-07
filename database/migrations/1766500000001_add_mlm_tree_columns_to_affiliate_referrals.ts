import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'affiliate_referrals'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Add parent affiliate reference for MLM hierarchy
      table
        .integer('parent_affiliate_id')
        .unsigned()
        .references('id')
        .inTable('affiliates')
        .onDelete('SET NULL')
        .nullable()
        .after('affiliate_id')

      // Add level in the MLM tree (1 = direct referral, 2 = sub-referral, 3 = sub-sub-referral)
      table.integer('level').unsigned().defaultTo(1).notNullable().after('parent_affiliate_id')

      // Add total spent by referred customer for tracking
      table.decimal('total_spent', 15, 2).defaultTo(0).notNullable().after('status')

      // Add total orders by referred customer
      table.integer('total_orders').unsigned().defaultTo(0).notNullable().after('total_spent')

      // Index for faster tree queries
      table.index(['parent_affiliate_id', 'level'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['parent_affiliate_id', 'level'])
      table.dropColumn('parent_affiliate_id')
      table.dropColumn('level')
      table.dropColumn('total_spent')
      table.dropColumn('total_orders')
    })
  }
}
