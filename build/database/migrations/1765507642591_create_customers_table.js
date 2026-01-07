import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'customers';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('full_name').notNullable();
            table.string('email').unique().notNullable();
            table.string('password').notNullable();
            table.string('phone').nullable();
            table.date('birth_date').nullable();
            table.enum('gender', ['male', 'female']).nullable();
            table.string('avatar').nullable();
            table.boolean('is_active').defaultTo(true);
            table.boolean('is_verified').defaultTo(false);
            table.string('verification_token').nullable();
            table.timestamp('email_verified_at').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765507642591_create_customers_table.js.map