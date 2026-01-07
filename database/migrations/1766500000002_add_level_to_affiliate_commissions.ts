import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'affiliate_commissions'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Add level column to track which MLM level the commission came from
      table.integer('level').unsigned().defaultTo(1).notNullable().after('status')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('level')
    })
  }
}
