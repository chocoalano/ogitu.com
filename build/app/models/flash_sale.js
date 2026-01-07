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
import { BaseModel, column, manyToMany, computed } from '@adonisjs/lucid/orm';
import Product from '#models/product';
export default class FlashSale extends BaseModel {
    get isExpired() {
        return DateTime.now() > this.endDate;
    }
    get isUpcoming() {
        return DateTime.now() < this.startDate;
    }
    get isOngoing() {
        return this.isActive && !this.isExpired && !this.isUpcoming;
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
    get timeRemaining() {
        if (!this.isOngoing)
            return null;
        const diff = this.endDate.diff(DateTime.now(), ['days', 'hours', 'minutes']);
        if (diff.days > 0)
            return `${Math.floor(diff.days)} hari lagi`;
        if (diff.hours > 0)
            return `${Math.floor(diff.hours)} jam lagi`;
        return `${Math.floor(diff.minutes)} menit lagi`;
    }
    get progress() {
        if (!this.startDate || !this.endDate)
            return 0;
        const now = DateTime.now();
        const total = this.endDate.diff(this.startDate, 'milliseconds').milliseconds;
        const elapsed = now.diff(this.startDate, 'milliseconds').milliseconds;
        return Math.min(100, Math.max(0, (elapsed / total) * 100));
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], FlashSale.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], FlashSale.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], FlashSale.prototype, "description", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], FlashSale.prototype, "startDate", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], FlashSale.prototype, "endDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], FlashSale.prototype, "isActive", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], FlashSale.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], FlashSale.prototype, "updatedAt", void 0);
__decorate([
    manyToMany(() => Product, {
        pivotTable: 'flash_sale_products',
        pivotColumns: ['original_price', 'flash_price', 'stock_limit', 'sold_count'],
        pivotTimestamps: true,
    }),
    __metadata("design:type", Object)
], FlashSale.prototype, "products", void 0);
__decorate([
    computed(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], FlashSale.prototype, "isExpired", null);
__decorate([
    computed(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], FlashSale.prototype, "isUpcoming", null);
__decorate([
    computed(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], FlashSale.prototype, "isOngoing", null);
__decorate([
    computed(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], FlashSale.prototype, "status", null);
__decorate([
    computed(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], FlashSale.prototype, "timeRemaining", null);
__decorate([
    computed(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [])
], FlashSale.prototype, "progress", null);
//# sourceMappingURL=flash_sale.js.map