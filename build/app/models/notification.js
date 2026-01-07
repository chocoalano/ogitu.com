var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, column } from '@adonisjs/lucid/orm';
export default class Notification extends BaseModel {
    static table = 'notifications';
    get icon() {
        const icons = {
            order_new: 'i-heroicons-shopping-bag',
            order_paid: 'i-heroicons-banknotes',
            order_cancelled: 'i-heroicons-x-circle',
            order_shipped: 'i-heroicons-truck',
            order_completed: 'i-heroicons-check-circle',
            review_new: 'i-heroicons-star',
            product_low_stock: 'i-heroicons-exclamation-triangle',
            product_out_of_stock: 'i-heroicons-archive-box-x-mark',
            withdrawal_approved: 'i-heroicons-arrow-down-tray',
            withdrawal_rejected: 'i-heroicons-x-mark',
            system: 'i-heroicons-bell',
        };
        return icons[this.type] || 'i-heroicons-bell';
    }
    get color() {
        const colors = {
            order_new: 'primary',
            order_paid: 'success',
            order_cancelled: 'error',
            order_shipped: 'info',
            order_completed: 'success',
            review_new: 'warning',
            product_low_stock: 'warning',
            product_out_of_stock: 'error',
            withdrawal_approved: 'success',
            withdrawal_rejected: 'error',
            system: 'neutral',
        };
        return colors[this.type] || 'neutral';
    }
    static async notifyAdmin(userId, type, title, message, data) {
        return await Notification.create({
            userId,
            customerId: null,
            type,
            title,
            message,
            data,
            isRead: false,
        });
    }
    static async notifyCustomer(customerId, type, title, message, data) {
        return await Notification.create({
            userId: null,
            customerId,
            type,
            title,
            message,
            data,
            isRead: false,
        });
    }
    static async notifyAllAdmins(type, title, message, data) {
        const User = (await import('#models/user')).default;
        const admins = await User.query().where('role', 'admin');
        const notifications = await Promise.all(admins.map((admin) => this.notifyAdmin(admin.id, type, title, message, data)));
        return notifications;
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Notification.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Notification.prototype, "userId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Notification.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Notification.prototype, "type", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Notification.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Notification.prototype, "message", void 0);
__decorate([
    column({
        prepare: (value) => (value ? JSON.stringify(value) : null),
        consume: (value) => (value ? JSON.parse(value) : null),
    }),
    __metadata("design:type", Object)
], Notification.prototype, "data", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Notification.prototype, "isRead", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Notification.prototype, "readAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Notification.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Notification.prototype, "updatedAt", void 0);
//# sourceMappingURL=notification.js.map