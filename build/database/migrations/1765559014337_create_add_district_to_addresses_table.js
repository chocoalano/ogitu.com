import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    async up() {
        const hasDistrictId = await this.db.rawQuery(`SELECT COUNT(*) as count FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'addresses' AND column_name = 'district_id'`);
        if (hasDistrictId[0][0].count === 0) {
            this.schema.alterTable('addresses', (table) => {
                table.string('district_id').nullable().comment('RajaOngkir district/kecamatan ID');
                table.string('district_name').nullable();
            });
        }
    }
    async down() {
        const hasDistrictId = await this.db.rawQuery(`SELECT COUNT(*) as count FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = 'addresses' AND column_name = 'district_id'`);
        if (hasDistrictId[0][0].count > 0) {
            this.schema.alterTable('addresses', (table) => {
                table.dropColumn('district_id');
                table.dropColumn('district_name');
            });
        }
    }
}
//# sourceMappingURL=1765559014337_create_add_district_to_addresses_table.js.map