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
import Wallet from './wallet.js';
import Customer from './customer.js';
export default class WalletTransaction extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], WalletTransaction.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], WalletTransaction.prototype, "walletId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], WalletTransaction.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WalletTransaction.prototype, "transactionType", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], WalletTransaction.prototype, "amount", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], WalletTransaction.prototype, "balanceBefore", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], WalletTransaction.prototype, "balanceAfter", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], WalletTransaction.prototype, "referenceType", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], WalletTransaction.prototype, "referenceId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], WalletTransaction.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], WalletTransaction.prototype, "status", void 0);
__decorate([
    column({
        prepare: (value) => (value ? JSON.stringify(value) : null),
        consume: (value) => {
            if (!value)
                return null;
            if (typeof value === 'object')
                return value;
            try {
                return JSON.parse(value);
            }
            catch {
                return null;
            }
        },
    }),
    __metadata("design:type", Object)
], WalletTransaction.prototype, "metadata", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], WalletTransaction.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], WalletTransaction.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Wallet),
    __metadata("design:type", Object)
], WalletTransaction.prototype, "wallet", void 0);
__decorate([
    belongsTo(() => Customer),
    __metadata("design:type", Object)
], WalletTransaction.prototype, "customer", void 0);
//# sourceMappingURL=wallet_transaction.js.map