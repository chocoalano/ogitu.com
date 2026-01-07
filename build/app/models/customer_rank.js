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
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm';
import Customer from './customer.js';
export default class CustomerRank extends BaseModel {
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], CustomerRank.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], CustomerRank.prototype, "name", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], CustomerRank.prototype, "slug", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CustomerRank.prototype, "icon", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], CustomerRank.prototype, "color", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], CustomerRank.prototype, "minOrders", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], CustomerRank.prototype, "minSpent", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], CustomerRank.prototype, "cashbackRate", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], CustomerRank.prototype, "affiliateBonusRate", void 0);
__decorate([
    column({
        prepare: (value) => (value ? JSON.stringify(value) : null),
        consume: (value) => {
            if (!value)
                return null;
            if (Array.isArray(value))
                return value;
            try {
                const parsed = JSON.parse(value);
                return Array.isArray(parsed) ? parsed : [value];
            }
            catch {
                return [value];
            }
        },
    }),
    __metadata("design:type", Object)
], CustomerRank.prototype, "benefits", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], CustomerRank.prototype, "orderPriority", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], CustomerRank.prototype, "isActive", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], CustomerRank.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], CustomerRank.prototype, "updatedAt", void 0);
__decorate([
    hasMany(() => Customer, { foreignKey: 'rankId' }),
    __metadata("design:type", Object)
], CustomerRank.prototype, "customers", void 0);
//# sourceMappingURL=customer_rank.js.map