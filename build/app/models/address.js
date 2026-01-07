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
import Customer from './customer.js';
export default class Address extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Address.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Address.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "label", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "recipientName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "phone", void 0);
__decorate([
    column({ columnName: 'address_line1' }),
    __metadata("design:type", String)
], Address.prototype, "addressLine1", void 0);
__decorate([
    column({ columnName: 'address_line2' }),
    __metadata("design:type", Object)
], Address.prototype, "addressLine2", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "cityId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "cityName", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Address.prototype, "districtId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Address.prototype, "districtName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "provinceId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "provinceName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "postalCode", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Address.prototype, "country", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Address.prototype, "isDefault", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Address.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Address.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Customer),
    __metadata("design:type", Object)
], Address.prototype, "customer", void 0);
//# sourceMappingURL=address.js.map