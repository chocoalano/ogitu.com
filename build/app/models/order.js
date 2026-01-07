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
import { BaseModel, column, belongsTo, hasMany, hasOne, afterCreate, afterSave, } from '@adonisjs/lucid/orm';
import Customer from './customer.js';
import Address from './address.js';
import OrderItem from './order_item.js';
import Payment from './payment.js';
import Shipping from './shipping.js';
import OrderNotificationService from '#services/order_notification_service';
export default class Order extends BaseModel {
    previousStatus = null;
    static async notifyNewOrder(order) {
        try {
            await OrderNotificationService.onOrderCreated(order);
        }
        catch (error) {
            console.error('Failed to send new order notification:', error);
        }
    }
    static async notifyStatusChange(order) {
        try {
            if (order.$dirty.status && order.previousStatus !== null) {
                await OrderNotificationService.onOrderStatusChanged(order, order.previousStatus);
            }
            order.previousStatus = order.status;
        }
        catch (error) {
            console.error('Failed to send order status notification:', error);
        }
    }
    $consumeAdapterResult(adapterResult, sideloaded) {
        if (this.$isPersisted) {
            this.previousStatus = this.status;
        }
        return super.$consumeAdapterResult(adapterResult, sideloaded);
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Order.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Order.prototype, "orderNumber", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Order.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Order.prototype, "addressId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Order.prototype, "subtotal", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Order.prototype, "tax", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Order.prototype, "shippingCost", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Order.prototype, "discount", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Order.prototype, "adminFee", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Order.prototype, "customerNotes", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Order.prototype, "adminNotes", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Order.prototype, "paidAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Order.prototype, "processedAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Order.prototype, "shippedAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Order.prototype, "deliveredAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Order.prototype, "cancelledAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Order.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Order.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Customer),
    __metadata("design:type", Object)
], Order.prototype, "customer", void 0);
__decorate([
    belongsTo(() => Address),
    __metadata("design:type", Object)
], Order.prototype, "address", void 0);
__decorate([
    hasMany(() => OrderItem),
    __metadata("design:type", Object)
], Order.prototype, "items", void 0);
__decorate([
    hasOne(() => Payment),
    __metadata("design:type", Object)
], Order.prototype, "payment", void 0);
__decorate([
    hasOne(() => Shipping),
    __metadata("design:type", Object)
], Order.prototype, "shipping", void 0);
__decorate([
    afterCreate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Order]),
    __metadata("design:returntype", Promise)
], Order, "notifyNewOrder", null);
__decorate([
    afterSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Order]),
    __metadata("design:returntype", Promise)
], Order, "notifyStatusChange", null);
//# sourceMappingURL=order.js.map