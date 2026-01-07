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
import Category from './category.js';
import User from './user.js';
export default class CategoryRequest extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], CategoryRequest.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], CategoryRequest.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], CategoryRequest.prototype, "slug", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "parentId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], CategoryRequest.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "rejectionReason", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "approvedCategoryId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "reviewedBy", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "reviewedAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], CategoryRequest.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], CategoryRequest.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => Category, {
        foreignKey: 'parentId',
    }),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "parentCategory", void 0);
__decorate([
    belongsTo(() => Category, {
        foreignKey: 'approvedCategoryId',
    }),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "approvedCategory", void 0);
__decorate([
    belongsTo(() => User, {
        foreignKey: 'reviewedBy',
    }),
    __metadata("design:type", Object)
], CategoryRequest.prototype, "reviewer", void 0);
//# sourceMappingURL=category_request.js.map