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
import { BaseModel, column, manyToMany, hasMany } from '@adonisjs/lucid/orm';
import Product from '#models/product';
import VoucherUsage from '#models/voucher_usage';
export default class Voucher extends BaseModel {
    get isExpired() {
        return DateTime.now() > this.endDate;
    }
    get isUpcoming() {
        return DateTime.now() < this.startDate;
    }
    get isOngoing() {
        return DateTime.now() >= this.startDate && DateTime.now() <= this.endDate && this.isActive;
    }
    get status() {
        if (!this.isActive)
            return 'inactive';
        if (this.isExpired)
            return 'expired';
        if (this.isUpcoming)
            return 'upcoming';
        return 'active';
    }
    get remainingUsage() {
        if (this.usageLimit === null)
            return null;
        return this.usageLimit - this.usedCount;
    }
    get typeLabel() {
        const labels = {
            percentage: 'Persentase',
            fixed: 'Potongan Tetap',
            free_shipping: 'Gratis Ongkir',
        };
        return labels[this.type];
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Voucher.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Voucher.prototype, "code", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Voucher.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Voucher.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Voucher.prototype, "type", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Voucher.prototype, "value", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Voucher.prototype, "minPurchase", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Voucher.prototype, "maxDiscount", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Voucher.prototype, "usageLimit", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Voucher.prototype, "usageLimitPerCustomer", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Voucher.prototype, "usedCount", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], Voucher.prototype, "startDate", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], Voucher.prototype, "endDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Voucher.prototype, "isActive", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Voucher.prototype, "isPublic", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Voucher.prototype, "appliesToAll", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Voucher.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Voucher.prototype, "updatedAt", void 0);
__decorate([
    manyToMany(() => Product, {
        pivotTable: 'voucher_products',
        pivotTimestamps: {
            createdAt: 'created_at',
            updatedAt: false,
        },
    }),
    __metadata("design:type", Object)
], Voucher.prototype, "products", void 0);
__decorate([
    hasMany(() => VoucherUsage),
    __metadata("design:type", Object)
], Voucher.prototype, "usages", void 0);
//# sourceMappingURL=voucher.js.map