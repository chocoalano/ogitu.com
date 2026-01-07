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
import Product from './product.js';
import Customer from './customer.js';
import Order from './order.js';
export default class Review extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Review.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Review.prototype, "productId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Review.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Review.prototype, "orderId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Review.prototype, "rating", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Review.prototype, "comment", void 0);
__decorate([
    column({
        prepare: (value) => JSON.stringify(value),
        consume: (value) => JSON.parse(value),
    }),
    __metadata("design:type", Object)
], Review.prototype, "images", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Review.prototype, "isVerifiedPurchase", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Review.prototype, "isApproved", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Review.prototype, "helpfulCount", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Review.prototype, "adminReply", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Review.prototype, "adminRepliedAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Review.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Review.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Product),
    __metadata("design:type", Object)
], Review.prototype, "product", void 0);
__decorate([
    belongsTo(() => Customer),
    __metadata("design:type", Object)
], Review.prototype, "customer", void 0);
__decorate([
    belongsTo(() => Order),
    __metadata("design:type", Object)
], Review.prototype, "order", void 0);
//# sourceMappingURL=review.js.map