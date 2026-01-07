import StoreAddress from '#models/store_address';
import ShippingCourier from '#models/shipping_courier';
import NotificationSetting from '#models/notification_setting';
import RajaOngkirService from '#services/rajaongkir_service';
export default class SettingsRepository {
    rajaOngkirService;
    constructor() {
        this.rajaOngkirService = new RajaOngkirService();
    }
    async getAllAddresses() {
        const addresses = await StoreAddress.query().orderBy('isDefault', 'desc').orderBy('name', 'asc');
        return addresses.map((addr) => this.transformAddress(addr));
    }
    async getAddressById(id) {
        const address = await StoreAddress.find(id);
        return address ? this.transformAddress(address) : null;
    }
    async getDefaultAddress() {
        const address = await StoreAddress.query()
            .where('isDefault', true)
            .where('isActive', true)
            .first();
        return address ? this.transformAddress(address) : null;
    }
    async createAddress(input) {
        try {
            if (input.isDefault) {
                await StoreAddress.query().update({ isDefault: false });
            }
            const address = await StoreAddress.create({
                name: input.name,
                contactName: input.contactName,
                phone: input.phone,
                addressLine1: input.addressLine1,
                addressLine2: input.addressLine2 || null,
                districtId: input.districtId,
                districtName: input.districtName,
                cityId: input.cityId,
                cityName: input.cityName,
                provinceId: input.provinceId,
                provinceName: input.provinceName,
                postalCode: input.postalCode,
                country: 'Indonesia',
                isDefault: input.isDefault ?? false,
                isActive: input.isActive ?? true,
            });
            return {
                success: true,
                message: 'Alamat berhasil ditambahkan',
                data: this.transformAddress(address),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal menambahkan alamat: ' + error.message,
            };
        }
    }
    async updateAddress(id, input) {
        try {
            const address = await StoreAddress.find(id);
            if (!address) {
                return { success: false, message: 'Alamat tidak ditemukan' };
            }
            if (input.isDefault) {
                await StoreAddress.query().where('id', '!=', id).update({ isDefault: false });
            }
            address.merge(input);
            await address.save();
            return {
                success: true,
                message: 'Alamat berhasil diperbarui',
                data: this.transformAddress(address),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal memperbarui alamat: ' + error.message,
            };
        }
    }
    async deleteAddress(id) {
        try {
            const address = await StoreAddress.find(id);
            if (!address) {
                return { success: false, message: 'Alamat tidak ditemukan' };
            }
            const count = await StoreAddress.query().count('* as total');
            if (Number(count[0].$extras.total) <= 1) {
                return { success: false, message: 'Tidak dapat menghapus alamat terakhir' };
            }
            if (address.isDefault) {
                const another = await StoreAddress.query().where('id', '!=', id).first();
                if (another) {
                    another.isDefault = true;
                    await another.save();
                }
            }
            await address.delete();
            return { success: true, message: 'Alamat berhasil dihapus' };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal menghapus alamat: ' + error.message,
            };
        }
    }
    async setDefaultAddress(id) {
        try {
            const address = await StoreAddress.find(id);
            if (!address) {
                return { success: false, message: 'Alamat tidak ditemukan' };
            }
            await StoreAddress.query().update({ isDefault: false });
            address.isDefault = true;
            await address.save();
            return {
                success: true,
                message: 'Alamat default berhasil diubah',
                data: this.transformAddress(address),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal mengubah alamat default: ' + error.message,
            };
        }
    }
    async toggleAddressActive(id) {
        try {
            const address = await StoreAddress.find(id);
            if (!address) {
                return { success: false, message: 'Alamat tidak ditemukan' };
            }
            if (address.isDefault && address.isActive) {
                return { success: false, message: 'Tidak dapat menonaktifkan alamat default' };
            }
            address.isActive = !address.isActive;
            await address.save();
            return {
                success: true,
                message: address.isActive ? 'Alamat diaktifkan' : 'Alamat dinonaktifkan',
                data: this.transformAddress(address),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal mengubah status alamat: ' + error.message,
            };
        }
    }
    transformAddress(address) {
        return {
            id: address.id,
            name: address.name,
            contactName: address.contactName,
            phone: address.phone,
            addressLine1: address.addressLine1,
            addressLine2: address.addressLine2,
            districtId: address.districtId,
            districtName: address.districtName,
            cityId: address.cityId,
            cityName: address.cityName,
            provinceId: address.provinceId,
            provinceName: address.provinceName,
            postalCode: address.postalCode,
            country: address.country,
            isDefault: address.isDefault,
            isActive: address.isActive,
            fullAddress: address.fullAddress,
            createdAt: address.createdAt?.toISO() || null,
            updatedAt: address.updatedAt?.toISO() || null,
        };
    }
    async getAllCouriers() {
        const couriers = await ShippingCourier.query()
            .orderBy('sortOrder', 'asc')
            .orderBy('name', 'asc');
        return couriers.map((c) => this.transformCourier(c));
    }
    async getActiveCouriers() {
        const couriers = await ShippingCourier.query()
            .where('isActive', true)
            .orderBy('sortOrder', 'asc')
            .orderBy('name', 'asc');
        return couriers.map((c) => this.transformCourier(c));
    }
    async getCourierById(id) {
        const courier = await ShippingCourier.find(id);
        return courier ? this.transformCourier(courier) : null;
    }
    async createCourier(input) {
        try {
            const existing = await ShippingCourier.findBy('code', input.code);
            if (existing) {
                return { success: false, message: 'Kode kurir sudah digunakan' };
            }
            const courier = await ShippingCourier.create({
                code: input.code,
                name: input.name,
                logo: input.logo || null,
                description: input.description || null,
                services: input.services || [],
                isActive: input.isActive ?? true,
                sortOrder: input.sortOrder ?? 0,
            });
            return {
                success: true,
                message: 'Kurir berhasil ditambahkan',
                data: this.transformCourier(courier),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal menambahkan kurir: ' + error.message,
            };
        }
    }
    async updateCourier(id, input) {
        try {
            const courier = await ShippingCourier.find(id);
            if (!courier) {
                return { success: false, message: 'Kurir tidak ditemukan' };
            }
            if (input.code && input.code !== courier.code) {
                const existing = await ShippingCourier.findBy('code', input.code);
                if (existing) {
                    return { success: false, message: 'Kode kurir sudah digunakan' };
                }
            }
            courier.merge(input);
            await courier.save();
            return {
                success: true,
                message: 'Kurir berhasil diperbarui',
                data: this.transformCourier(courier),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal memperbarui kurir: ' + error.message,
            };
        }
    }
    async deleteCourier(id) {
        try {
            const courier = await ShippingCourier.find(id);
            if (!courier) {
                return { success: false, message: 'Kurir tidak ditemukan' };
            }
            await courier.delete();
            return { success: true, message: 'Kurir berhasil dihapus' };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal menghapus kurir: ' + error.message,
            };
        }
    }
    async toggleCourierActive(id) {
        try {
            const courier = await ShippingCourier.find(id);
            if (!courier) {
                return { success: false, message: 'Kurir tidak ditemukan' };
            }
            courier.isActive = !courier.isActive;
            await courier.save();
            return {
                success: true,
                message: courier.isActive ? 'Kurir diaktifkan' : 'Kurir dinonaktifkan',
                data: this.transformCourier(courier),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal mengubah status kurir: ' + error.message,
            };
        }
    }
    async updateCourierServices(id, services) {
        try {
            const courier = await ShippingCourier.find(id);
            if (!courier) {
                return { success: false, message: 'Kurir tidak ditemukan' };
            }
            courier.services = services;
            await courier.save();
            return {
                success: true,
                message: 'Layanan kurir berhasil diperbarui',
                data: this.transformCourier(courier),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal memperbarui layanan kurir: ' + error.message,
            };
        }
    }
    async reorderCouriers(orderedIds) {
        try {
            for (const [i, orderedId] of orderedIds.entries()) {
                await ShippingCourier.query().where('id', orderedId).update({ sortOrder: i });
            }
            return { success: true, message: 'Urutan kurir berhasil diperbarui' };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal memperbarui urutan kurir: ' + error.message,
            };
        }
    }
    transformCourier(courier) {
        return {
            id: courier.id,
            code: courier.code,
            name: courier.name,
            logo: courier.logo,
            description: courier.description,
            services: courier.services || [],
            isActive: courier.isActive,
            sortOrder: courier.sortOrder,
            createdAt: courier.createdAt?.toISO() || null,
            updatedAt: courier.updatedAt?.toISO() || null,
        };
    }
    async getAllNotificationSettings() {
        const settings = await NotificationSetting.query()
            .orderBy('eventGroup', 'asc')
            .orderBy('eventName', 'asc');
        return settings.map((s) => this.transformNotificationSetting(s));
    }
    async getNotificationSettingsByGroup(group) {
        const settings = await NotificationSetting.query()
            .where('eventGroup', group)
            .orderBy('eventName', 'asc');
        return settings.map((s) => this.transformNotificationSetting(s));
    }
    async getNotificationSettingById(id) {
        const setting = await NotificationSetting.find(id);
        return setting ? this.transformNotificationSetting(setting) : null;
    }
    async updateNotificationSetting(id, input) {
        try {
            const setting = await NotificationSetting.find(id);
            if (!setting) {
                return { success: false, message: 'Pengaturan notifikasi tidak ditemukan' };
            }
            if (input.emailEnabled !== undefined)
                setting.emailEnabled = input.emailEnabled;
            if (input.pushEnabled !== undefined)
                setting.pushEnabled = input.pushEnabled;
            if (input.whatsappEnabled !== undefined)
                setting.whatsappEnabled = input.whatsappEnabled;
            await setting.save();
            return {
                success: true,
                message: 'Pengaturan notifikasi berhasil diperbarui',
                data: this.transformNotificationSetting(setting),
            };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal memperbarui pengaturan notifikasi: ' + error.message,
            };
        }
    }
    async initializeDefaultNotifications() {
        try {
            const { DEFAULT_NOTIFICATION_EVENTS } = await import('./contracts/settings_repository_contract.js');
            for (const event of DEFAULT_NOTIFICATION_EVENTS) {
                const existing = await NotificationSetting.findBy('eventKey', event.eventKey);
                if (!existing) {
                    await NotificationSetting.create({
                        eventKey: event.eventKey,
                        eventName: event.eventName,
                        eventGroup: event.eventGroup,
                        description: event.description,
                        emailEnabled: true,
                        pushEnabled: true,
                        whatsappEnabled: false,
                    });
                }
            }
            return { success: true, message: 'Pengaturan notifikasi default berhasil dibuat' };
        }
        catch (error) {
            return {
                success: false,
                message: 'Gagal membuat pengaturan notifikasi default: ' + error.message,
            };
        }
    }
    transformNotificationSetting(setting) {
        return {
            id: setting.id,
            eventKey: setting.eventKey,
            eventName: setting.eventName,
            eventGroup: setting.eventGroup,
            description: setting.description,
            emailEnabled: setting.emailEnabled,
            pushEnabled: setting.pushEnabled,
            whatsappEnabled: setting.whatsappEnabled,
            emailTemplate: setting.emailTemplate,
            whatsappTemplate: setting.whatsappTemplate,
            createdAt: setting.createdAt?.toISO() || null,
            updatedAt: setting.updatedAt?.toISO() || null,
        };
    }
    async getProvinces() {
        const provinces = await this.rajaOngkirService.getProvinces();
        return provinces.map((p) => ({
            province_id: p.province_id || p.id,
            province: p.province || p.name,
        }));
    }
    async getCities(provinceId) {
        const cities = await this.rajaOngkirService.getCities(provinceId);
        return cities.map((c) => ({
            city_id: c.city_id || c.id,
            city_name: c.city_name || c.name,
            type: c.type || 'Kota',
            province_id: c.province_id || provinceId,
            postal_code: c.postal_code || '',
        }));
    }
    async getDistricts(cityId) {
        const districts = await this.rajaOngkirService.getSubdistricts(cityId);
        return districts.map((d) => ({
            district_id: d.district_id || d.subdistrict_id || d.id,
            district_name: d.district_name || d.subdistrict_name || d.name,
            city_id: d.city_id || cityId,
        }));
    }
}
//# sourceMappingURL=settings_repository.js.map