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
import Customer from './customer.js';
import Product from './product.js';
import ProductVariant from './product_variant.js';
export default class CartItem extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], CartItem.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], CartItem.prototype, "customerId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], CartItem.prototype, "productId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CartItem.prototype, "productVariantId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], CartItem.prototype, "quantity", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], CartItem.prototype, "checked", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], CartItem.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], CartItem.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Customer),
    __metadata("design:type", Object)
], CartItem.prototype, "customer", void 0);
__decorate([
    belongsTo(() => Product),
    __metadata("design:type", Object)
], CartItem.prototype, "product", void 0);
__decorate([
    belongsTo(() => ProductVariant),
    __metadata("design:type", Object)
], CartItem.prototype, "productVariant", void 0);
//# sourceMappingURL=cart_item.js.map