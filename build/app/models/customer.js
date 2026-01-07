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
import hash from '@adonisjs/core/services/hash';
import { compose } from '@adonisjs/core/helpers';
import { BaseModel, column, hasOne, hasMany, belongsTo } from '@adonisjs/lucid/orm';
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { DbRememberMeTokensProvider } from '@adonisjs/auth/session';
import Address from './address.js';
import Order from './order.js';
import Review from './review.js';
import CartItem from './cart_item.js';
import Wishlist from './wishlist.js';
import Wallet from './wallet.js';
import Affiliate from './affiliate.js';
import CustomerRank from './customer_rank.js';
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
});
export default class Customer extends compose(BaseModel, AuthFinder) {
    static rememberMeTokens = DbRememberMeTokensProvider.forModel(Customer);
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Customer.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Customer.prototype, "fullName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", String)
], Customer.prototype, "password", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Customer.prototype, "phone", void 0);
__decorate([
    column.date(),
    __metadata("design:type", Object)
], Customer.prototype, "birthDate", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Customer.prototype, "gender", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Customer.prototype, "avatar", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Customer.prototype, "isActive", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Customer.prototype, "isVerified", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Customer.prototype, "rankId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Customer.prototype, "referredByCode", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Customer.prototype, "totalOrdersCount", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Customer.prototype, "totalSpent", void 0);
__decorate([
    column({ serializeAs: null }),
    __metadata("design:type", Object)
], Customer.prototype, "verificationToken", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Customer.prototype, "emailVerifiedAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Customer.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Customer.prototype, "updatedAt", void 0);
__decorate([
    hasMany(() => Address),
    __metadata("design:type", Object)
], Customer.prototype, "addresses", void 0);
__decorate([
    hasMany(() => Order),
    __metadata("design:type", Object)
], Customer.prototype, "orders", void 0);
__decorate([
    hasMany(() => Review),
    __metadata("design:type", Object)
], Customer.prototype, "reviews", void 0);
__decorate([
    hasMany(() => CartItem),
    __metadata("design:type", Object)
], Customer.prototype, "cartItems", void 0);
__decorate([
    hasMany(() => Wishlist),
    __metadata("design:type", Object)
], Customer.prototype, "wishlists", void 0);
__decorate([
    hasOne(() => Wallet),
    __metadata("design:type", Object)
], Customer.prototype, "wallet", void 0);
__decorate([
    hasOne(() => Affiliate),
    __metadata("design:type", Object)
], Customer.prototype, "affiliate", void 0);
__decorate([
    belongsTo(() => CustomerRank, { foreignKey: 'rankId' }),
    __metadata("design:type", Object)
], Customer.prototype, "rank", void 0);
//# sourceMappingURL=customer.js.map