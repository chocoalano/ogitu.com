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
import CartItem from './cart_item.js';
import OrderItem from './order_item.js';
import Product from './product.js';
export default class ProductVariant extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], ProductVariant.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ProductVariant.prototype, "productId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ProductVariant.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ProductVariant.prototype, "value", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], ProductVariant.prototype, "sku", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ProductVariant.prototype, "priceAdjustment", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], ProductVariant.prototype, "stock", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], ProductVariant.prototype, "isActive", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], ProductVariant.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], ProductVariant.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Product),
    __metadata("design:type", Object)
], ProductVariant.prototype, "product", void 0);
__decorate([
    hasMany(() => OrderItem),
    __metadata("design:type", Object)
], ProductVariant.prototype, "orderItems", void 0);
__decorate([
    hasMany(() => CartItem),
    __metadata("design:type", Object)
], ProductVariant.prototype, "cartItems", void 0);
//# sourceMappingURL=product_variant.js.map