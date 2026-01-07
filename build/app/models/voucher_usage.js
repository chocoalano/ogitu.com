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
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm';
import Voucher from '#models/voucher';
import Customer from '#models/customer';
import Order from '#models/order';
export default class VoucherUsage extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], VoucherUsage.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], VoucherUsage.prototype, "voucherId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], VoucherUsage.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], VoucherUsage.prototype, "orderId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], VoucherUsage.prototype, "discountAmount", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], VoucherUsage.prototype, "usedAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], VoucherUsage.prototype, "createdAt", void 0);
__decorate([
    belongsTo(() => Voucher),
    __metadata("design:type", Object)
], VoucherUsage.prototype, "voucher", void 0);
__decorate([
    belongsTo(() => Customer),
    __metadata("design:type", Object)
], VoucherUsage.prototype, "customer", void 0);
__decorate([
    belongsTo(() => Order),
    __metadata("design:type", Object)
], VoucherUsage.prototype, "order", void 0);
//# sourceMappingURL=voucher_usage.js.map