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
export default class Payment extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Payment.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Payment.prototype, "orderId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Payment.prototype, "paymentType", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Payment.prototype, "transactionId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Payment.prototype, "orderIdMidtrans", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Payment.prototype, "grossAmount", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Payment.prototype, "transactionStatus", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Payment.prototype, "statusCode", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Payment.prototype, "fraudStatus", void 0);
__decorate([
    column({
        prepare: (value) => JSON.stringify(value),
        consume: (value) => JSON.parse(value),
    }),
    __metadata("design:type", Object)
], Payment.prototype, "paymentDetails", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Payment.prototype, "snapToken", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Payment.prototype, "snapRedirectUrl", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Payment.prototype, "transactionTime", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Payment.prototype, "settlementTime", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Payment.prototype, "expiryTime", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Payment.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Payment.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Order),
    __metadata("design:type", Object)
], Payment.prototype, "order", void 0);
//# sourceMappingURL=payment.js.map