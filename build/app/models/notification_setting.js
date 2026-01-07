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
export default class NotificationSetting extends BaseModel {
    static table = 'notification_settings';
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], NotificationSetting.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], NotificationSetting.prototype, "eventKey", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], NotificationSetting.prototype, "eventName", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], NotificationSetting.prototype, "eventGroup", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], NotificationSetting.prototype, "description", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "emailEnabled", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "pushEnabled", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], NotificationSetting.prototype, "whatsappEnabled", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], NotificationSetting.prototype, "emailTemplate", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], NotificationSetting.prototype, "whatsappTemplate", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], NotificationSetting.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], NotificationSetting.prototype, "updatedAt", void 0);
//# sourceMappingURL=notification_setting.js.map