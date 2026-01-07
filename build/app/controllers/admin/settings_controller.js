import SettingsRepository from '#repositories/settings_repository';
import { AVAILABLE_COURIERS } from '#repositories/contracts/settings_repository_contract';
export default class SettingsController {
    settingsRepository;
    constructor() {
        this.settingsRepository = new SettingsRepository();
    }
    async addressIndex({ inertia }) {
        const addresses = await this.settingsRepository.getAllAddresses();
        return inertia.render('admin/settings/address/index', {
            addresses,
        });
    }
    async addressCreate({ inertia }) {
        const provinces = await this.settingsRepository.getProvinces();
        return inertia.render('admin/settings/address/create', {
            provinces,
        });
    }
    async addressStore({ request, response, session }) {
        const data = request.only([
            'name',
            'contactName',
            'phone',
            'addressLine1',
            'addressLine2',
            'districtId',
            'districtName',
            'cityId',
            'cityName',
            'provinceId',
            'provinceName',
            'postalCode',
            'isDefault',
        ]);
        const result = await this.settingsRepository.createAddress(data);
        if (!result.success) {
            session.flash('error', result.message);
            return response.redirect().back();
        }
        session.flash('success', result.message);
        return response.redirect().toRoute('admin.settings.address.index');
    }
    async addressEdit({ params, inertia, response }) {
        const address = await this.settingsRepository.getAddressById(params.id);
        if (!address) {
            return response.notFound({ message: 'Alamat tidak ditemukan' });
        }
        const provinces = await this.settingsRepository.getProvinces();
        const cities = await this.settingsRepository.getCities(address.provinceId);
        const districts = await this.settingsRepository.getDistricts(address.cityId);
        return inertia.render('admin/settings/address/edit', {
            address,
            provinces,
            cities,
            districts,
        });
    }
    async addressUpdate({ params, request, response, session }) {
        const data = request.only([
            'name',
            'contactName',
            'phone',
            'addressLine1',
            'addressLine2',
            'districtId',
            'districtName',
            'cityId',
            'cityName',
            'provinceId',
            'provinceName',
            'postalCode',
            'isDefault',
        ]);
        const result = await this.settingsRepository.updateAddress(params.id, data);
        if (!result.success) {
            session.flash('error', result.message);
            return response.redirect().back();
        }
        session.flash('success', result.message);
        return response.redirect().toRoute('admin.settings.address.index');
    }
    async addressDestroy({ params, response, session }) {
        const result = await this.settingsRepository.deleteAddress(params.id);
        if (!result.success) {
            session.flash('error', result.message);
            return response.redirect().back();
        }
        session.flash('success', result.message);
        return response.redirect().toRoute('admin.settings.address.index');
    }
    async addressSetDefault({ params, response, session }) {
        const result = await this.settingsRepository.setDefaultAddress(params.id);
        if (!result.success) {
            session.flash('error', result.message);
        }
        else {
            session.flash('success', result.message);
        }
        return response.redirect().back();
    }
    async addressToggleActive({ params, response, session }) {
        const result = await this.settingsRepository.toggleAddressActive(params.id);
        if (!result.success) {
            session.flash('error', result.message);
        }
        else {
            session.flash('success', result.message);
        }
        return response.redirect().back();
    }
    async shippingIndex({ inertia }) {
        const couriers = await this.settingsRepository.getAllCouriers();
        const defaultAddress = await this.settingsRepository.getDefaultAddress();
        return inertia.render('admin/settings/shipping/index', {
            couriers,
            availableCouriers: AVAILABLE_COURIERS,
            defaultAddress,
        });
    }
    async shippingAddCourier({ request, response, session }) {
        const data = request.only(['code', 'name', 'logo', 'description', 'services']);
        if (typeof data.services === 'string') {
            try {
                data.services = JSON.parse(data.services);
            }
            catch {
                data.services = [];
            }
        }
        const result = await this.settingsRepository.createCourier(data);
        if (!result.success) {
            session.flash('error', result.message);
        }
        else {
            session.flash('success', result.message);
        }
        return response.redirect().back();
    }
    async shippingUpdateCourier({ params, request, response, session }) {
        const data = request.only(['name', 'description', 'services', 'isActive']);
        if (typeof data.services === 'string') {
            try {
                data.services = JSON.parse(data.services);
            }
            catch {
                data.services = [];
            }
        }
        const result = await this.settingsRepository.updateCourier(params.id, data);
        if (!result.success) {
            session.flash('error', result.message);
        }
        else {
            session.flash('success', result.message);
        }
        return response.redirect().back();
    }
    async shippingRemoveCourier({ params, response, session }) {
        const result = await this.settingsRepository.deleteCourier(params.id);
        if (!result.success) {
            session.flash('error', result.message);
        }
        else {
            session.flash('success', result.message);
        }
        return response.redirect().back();
    }
    async shippingToggleCourier({ params, response, session }) {
        const result = await this.settingsRepository.toggleCourierActive(params.id);
        if (!result.success) {
            session.flash('error', result.message);
        }
        else {
            session.flash('success', result.message);
        }
        return response.redirect().back();
    }
    async shippingReorderCouriers({ request, response }) {
        const { orderedIds } = request.only(['orderedIds']);
        const result = await this.settingsRepository.reorderCouriers(orderedIds || []);
        return response.json(result);
    }
    async notificationsIndex({ inertia }) {
        const allSettings = await this.settingsRepository.getAllNotificationSettings();
        if (allSettings.length === 0) {
            await this.settingsRepository.initializeDefaultNotifications();
        }
        const settings = await this.settingsRepository.getAllNotificationSettings();
        const groupedSettings = {
            orders: settings.filter((s) => s.eventGroup === 'orders'),
            payments: settings.filter((s) => s.eventGroup === 'payments'),
            promotions: settings.filter((s) => s.eventGroup === 'promotions'),
            system: settings.filter((s) => s.eventGroup === 'system'),
        };
        return inertia.render('admin/settings/notifications/index', {
            settings: groupedSettings,
        });
    }
    async notificationsUpdate({ params, request, response, session }) {
        const data = request.only(['emailEnabled', 'pushEnabled', 'whatsappEnabled']);
        const result = await this.settingsRepository.updateNotificationSetting(params.id, data);
        if (!result.success) {
            session.flash('error', result.message);
        }
        else {
            session.flash('success', result.message);
        }
        return response.redirect().back();
    }
    async notificationsBulkUpdate({ request, response }) {
        const { updates } = request.only(['updates']);
        const results = [];
        for (const update of updates || []) {
            const result = await this.settingsRepository.updateNotificationSetting(update.id, {
                emailEnabled: update.emailEnabled,
                pushEnabled: update.pushEnabled,
                whatsappEnabled: update.whatsappEnabled,
            });
            results.push(result);
        }
        const allSuccess = results.every((r) => r.success);
        return response.json({
            success: allSuccess,
            message: allSuccess
                ? 'Semua pengaturan berhasil diperbarui'
                : 'Beberapa pengaturan gagal diperbarui',
        });
    }
    async getProvinces({ response }) {
        const provinces = await this.settingsRepository.getProvinces();
        return response.json({ data: provinces });
    }
    async getCities({ params, response }) {
        const cities = await this.settingsRepository.getCities(params.provinceId);
        return response.json({ data: cities });
    }
    async getDistricts({ params, response }) {
        const districts = await this.settingsRepository.getDistricts(params.cityId);
        return response.json({ data: districts });
    }
}
//# sourceMappingURL=settings_controller.js.map