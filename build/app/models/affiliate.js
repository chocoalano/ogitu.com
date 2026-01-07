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
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm';
import Customer from './customer.js';
import AffiliateReferral from './affiliate_referral.js';
import AffiliateCommission from './affiliate_commission.js';
export default class Affiliate extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Affiliate.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Affiliate.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Affiliate.prototype, "referralCode", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Affiliate.prototype, "commissionRate", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Affiliate.prototype, "totalEarnings", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Affiliate.prototype, "pendingEarnings", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Affiliate.prototype, "withdrawnEarnings", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Affiliate.prototype, "totalReferrals", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Affiliate.prototype, "totalOrders", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Affiliate.prototype, "isActive", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Affiliate.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Affiliate.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Customer),
    __metadata("design:type", Object)
], Affiliate.prototype, "customer", void 0);
__decorate([
    hasMany(() => AffiliateReferral),
    __metadata("design:type", Object)
], Affiliate.prototype, "referrals", void 0);
__decorate([
    hasMany(() => AffiliateCommission),
    __metadata("design:type", Object)
], Affiliate.prototype, "commissions", void 0);
//# sourceMappingURL=affiliate.js.map