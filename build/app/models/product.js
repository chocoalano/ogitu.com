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
import { BaseModel, column, belongsTo, hasMany, afterSave, afterDelete } from '@adonisjs/lucid/orm';
import CartItem from './cart_item.js';
import Category from './category.js';
import OrderItem from './order_item.js';
import ProductImage from './product_image.js';
import ProductVariant from './product_variant.js';
import Review from './review.js';
import cache, { CacheTags } from '#services/cache_service';
export default class Product extends BaseModel {
    static async invalidateCacheOnSave() {
        await cache.invalidateTag(CacheTags.PRODUCTS);
    }
    static async invalidateCacheOnDelete() {
        await cache.invalidateTag(CacheTags.PRODUCTS);
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Product.prototype, "categoryId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "sku", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Product.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Product.prototype, "specifications", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Product.prototype, "discountPrice", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "minOrder", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Product.prototype, "maxOrder", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "weight", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Product.prototype, "brand", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "condition", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Product.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Product.prototype, "isFeatured", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "rating", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "totalReviews", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "totalSold", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Product.prototype, "viewCount", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Product.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Product.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Category),
    __metadata("design:type", Object)
], Product.prototype, "category", void 0);
__decorate([
    hasMany(() => ProductVariant),
    __metadata("design:type", Object)
], Product.prototype, "variants", void 0);
__decorate([
    hasMany(() => ProductImage),
    __metadata("design:type", Object)
], Product.prototype, "images", void 0);
__decorate([
    hasMany(() => Review),
    __metadata("design:type", Object)
], Product.prototype, "reviews", void 0);
__decorate([
    hasMany(() => OrderItem),
    __metadata("design:type", Object)
], Product.prototype, "orderItems", void 0);
__decorate([
    hasMany(() => CartItem),
    __metadata("design:type", Object)
], Product.prototype, "cartItems", void 0);
__decorate([
    afterSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Product, "invalidateCacheOnSave", null);
__decorate([
    afterDelete(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Product, "invalidateCacheOnDelete", null);
//# sourceMappingURL=product.js.map