import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'otps';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('email', 255).notNullable();
            table.string('code', 6).notNullable();
            table.enum('type', ['login', 'register', 'forgot_password']).notNullable();
            table.boolean('is_used').defaultTo(false);
            table.timestamp('expires_at').notNullable();
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').notNullable();
            table.index(['email', 'code', 'type']);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1765700000001_create_otps_table.js.map