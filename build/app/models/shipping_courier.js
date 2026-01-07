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
export default class ShippingCourier extends BaseModel {
    static table = 'shipping_couriers';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], ShippingCourier.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ShippingCourier.prototype, "code", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ShippingCourier.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ShippingCourier.prototype, "logo", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], ShippingCourier.prototype, "description", void 0);
__decorate([
    column({
        prepare: (value) => (value ? JSON.stringify(value) : null),
        consume: (value) => {
            if (!value)
                return [];
            try {
                return JSON.parse(value);
            }
            catch {
                return [];
            }
        },
    }),
    __metadata("design:type", Array)
], ShippingCourier.prototype, "services", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], ShippingCourier.prototype, "isActive", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ShippingCourier.prototype, "sortOrder", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], ShippingCourier.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], ShippingCourier.prototype, "updatedAt", void 0);
//# sourceMappingURL=shipping_courier.js.map