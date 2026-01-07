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
import { BaseModel, column } from '@adonisjs/lucid/orm';
export default class StoreSetting extends BaseModel {
    static table = 'store_settings';
    getTypedValue() {
        if (this.value === null)
            return null;
        switch (this.type) {
            case 'json':
                try {
                    return JSON.parse(this.value);
                }
                catch {
                    return null;
                }
            case 'boolean':
                return this.value === 'true' || this.value === '1';
            case 'number':
                return Number(this.value);
            default:
                return this.value;
        }
    }
    setTypedValue(val) {
        if (val === null || val === undefined) {
            this.value = null;
            return;
        }
        switch (this.type) {
            case 'json':
                this.value = JSON.stringify(val);
                break;
            case 'boolean':
                this.value = val ? 'true' : 'false';
                break;
            case 'number':
                this.value = String(val);
                break;
            default:
                this.value = String(val);
        }
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], StoreSetting.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreSetting.prototype, "key", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], StoreSetting.prototype, "value", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreSetting.prototype, "type", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], StoreSetting.prototype, "group", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], StoreSetting.prototype, "description", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], StoreSetting.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], StoreSetting.prototype, "updatedAt", void 0);
//# sourceMappingURL=store_setting.js.map