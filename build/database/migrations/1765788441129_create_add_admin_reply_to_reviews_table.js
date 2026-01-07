import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'reviews';
    async up() {
        const hasAdminReply = await this.db.rawQuery(`SELECT COUNT(*) as count FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = '${this.tableName}' AND column_name = 'admin_reply'`);
        if (hasAdminReply[0][0].count === 0) {
            this.schema.alterTable(this.tableName, (table) => {
                table.text('admin_reply').nullable();
                table.timestamp('admin_replied_at').nullable();
            });
        }
    }
    async down() {
        const hasAdminReply = await this.db.rawQuery(`SELECT COUNT(*) as count FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = '${this.tableName}' AND column_name = 'admin_reply'`);
        if (hasAdminReply[0][0].count > 0) {
            this.schema.alterTable(this.tableName, (table) => {
                table.dropColumn('admin_reply');
                table.dropColumn('admin_replied_at');
            });
        }
    }
}
//# sourceMappingURL=1765788441129_create_add_admin_reply_to_reviews_table.js.map