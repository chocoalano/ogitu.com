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
import Customer from './customer.js';
export default class AffiliateReferral extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], AffiliateReferral.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateReferral.prototype, "affiliateId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], AffiliateReferral.prototype, "parentAffiliateId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateReferral.prototype, "referredCustomerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateReferral.prototype, "level", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], AffiliateReferral.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateReferral.prototype, "totalSpent", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], AffiliateReferral.prototype, "totalOrders", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", DateTime)
], AffiliateReferral.prototype, "registeredAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], AffiliateReferral.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], AffiliateReferral.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Affiliate),
    __metadata("design:type", Object)
], AffiliateReferral.prototype, "affiliate", void 0);
__decorate([
    belongsTo(() => Affiliate, { foreignKey: 'parentAffiliateId' }),
    __metadata("design:type", Object)
], AffiliateReferral.prototype, "parentAffiliate", void 0);
__decorate([
    belongsTo(() => Customer, { foreignKey: 'referredCustomerId' }),
    __metadata("design:type", Object)
], AffiliateReferral.prototype, "referredCustomer", void 0);
//# sourceMappingURL=affiliate_referral.js.map