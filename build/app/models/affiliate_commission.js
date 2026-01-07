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
import Affiliate from './affiliate.js';
import Order from './order.js';
import Customer from './customer.js';
export default class AffiliateCommission extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], AffiliateCommission.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateCommission.prototype, "affiliateId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateCommission.prototype, "orderId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateCommission.prototype, "referredCustomerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateCommission.prototype, "orderTotal", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateCommission.prototype, "commissionRate", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateCommission.prototype, "commissionAmount", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AffiliateCommission.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateCommission.prototype, "level", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], AffiliateCommission.prototype, "approvedAt", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], AffiliateCommission.prototype, "paidAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], AffiliateCommission.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], AffiliateCommission.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Affiliate),
    __metadata("design:type", Object)
], AffiliateCommission.prototype, "affiliate", void 0);
__decorate([
    belongsTo(() => Order),
    __metadata("design:type", Object)
], AffiliateCommission.prototype, "order", void 0);
__decorate([
    belongsTo(() => Customer, { foreignKey: 'referredCustomerId' }),
    __metadata("design:type", Object)
], AffiliateCommission.prototype, "referredCustomer", void 0);
//# sourceMappingURL=affiliate_commission.js.map