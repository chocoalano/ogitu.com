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
import Order from './order.js';
export default class Shipping extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Shipping.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Shipping.prototype, "orderId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Shipping.prototype, "courierCode", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Shipping.prototype, "courierService", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Shipping.prototype, "courierName", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Shipping.prototype, "serviceDescription", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Shipping.prototype, "cost", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Shipping.prototype, "weight", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Shipping.prototype, "etd", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Shipping.prototype, "waybill", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Shipping.prototype, "originCityId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Shipping.prototype, "destinationCityId", void 0);
__decorate([
    column({
        prepare: (value) => JSON.stringify(value),
        consume: (value) => JSON.parse(value),
    }),
    __metadata("design:type", Object)
], Shipping.prototype, "rajaongkirResponse", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Shipping.prototype, "shippedAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Shipping.prototype, "deliveredAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Shipping.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Shipping.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Order),
    __metadata("design:type", Object)
], Shipping.prototype, "order", void 0);
//# sourceMappingURL=shipping.js.map