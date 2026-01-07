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
import WalletTransaction from './wallet_transaction.js';
export default class Wallet extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Wallet.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Wallet.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Wallet.prototype, "balance", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Wallet.prototype, "pendingBalance", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Wallet.prototype, "isActive", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Wallet.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Wallet.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Customer),
    __metadata("design:type", Object)
], Wallet.prototype, "customer", void 0);
__decorate([
    hasMany(() => WalletTransaction),
    __metadata("design:type", Object)
], Wallet.prototype, "transactions", void 0);
//# sourceMappingURL=wallet.js.map