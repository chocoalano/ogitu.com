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
import Product from './product.js';
import ProductVariant from './product_variant.js';
export default class OrderItem extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], OrderItem.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], OrderItem.prototype, "productId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], OrderItem.prototype, "productVariantId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], OrderItem.prototype, "productName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], OrderItem.prototype, "productSku", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], OrderItem.prototype, "variantName", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], OrderItem.prototype, "price", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], OrderItem.prototype, "subtotal", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], OrderItem.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], OrderItem.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Order),
    __metadata("design:type", Object)
], OrderItem.prototype, "order", void 0);
__decorate([
    belongsTo(() => Product),
    __metadata("design:type", Object)
], OrderItem.prototype, "product", void 0);
__decorate([
    belongsTo(() => ProductVariant),
    __metadata("design:type", Object)
], OrderItem.prototype, "productVariant", void 0);
//# sourceMappingURL=order_item.js.map