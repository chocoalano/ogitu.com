import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'bugs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('module', 100).notNullable().comment('Module/Controller where error occurred')
      table.string('action', 100).notNullable().comment('Action/Method name')
      table.string('error_type', 100).nullable().comment('Error type/name')
      table.text('error_message').notNullable().comment('Error message')
      table.text('error_stack').nullable().comment('Error stack trace')
      table.json('request_data').nullable().comment('Request data that caused the error')
      table.json('context').nullable().comment('Additional context information')
      table.string('user_type', 50).nullable().comment('admin, customer, guest')
      table.integer('user_id').unsigned().nullable().comment('User ID if authenticated')
      table.string('ip_address', 45).nullable()
      table.string('user_agent').nullable()
      table.string('url').nullable()
      table.string('method', 10).nullable().comment('HTTP method')
      table.enum('severity', ['low', 'medium', 'high', 'critical']).defaultTo('medium')
      table.enum('status', ['new', 'investigating', 'resolved', 'ignored']).defaultTo('new')
      table.text('resolution_notes').nullable()
      table.integer('resolved_by').unsigned().nullable()
      table.timestamp('resolved_at').nullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
