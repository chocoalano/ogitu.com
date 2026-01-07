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
export default class StoreAddress extends BaseModel {
    static table = 'store_addresses';
    get fullAddress() {
        const parts = [
            this.addressLine1,
            this.addressLine2,
            this.districtName,
            this.cityName,
            this.provinceName,
            this.postalCode,
        ].filter(Boolean);
        return parts.join(', ');
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], StoreAddress.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "contactName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "phone", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "addressLine1", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], StoreAddress.prototype, "addressLine2", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "districtId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "districtName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "cityId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "cityName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "provinceId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "provinceName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "postalCode", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreAddress.prototype, "country", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], StoreAddress.prototype, "isDefault", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], StoreAddress.prototype, "isActive", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], StoreAddress.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], StoreAddress.prototype, "updatedAt", void 0);
//# sourceMappingURL=store_address.js.map