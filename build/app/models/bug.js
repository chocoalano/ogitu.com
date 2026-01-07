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
export default class Bug extends BaseModel {
    static async logError(params) {
        try {
            const errorObj = params.error instanceof Error ? params.error : new Error(String(params.error));
            await Bug.create({
                module: params.module,
                action: params.action,
                errorType: errorObj.name || 'UnknownError',
                errorMessage: errorObj.message || String(params.error),
                errorStack: errorObj.stack || null,
                requestData: params.request?.body || null,
                context: params.context || null,
                userType: params.userType || null,
                userId: params.userId || null,
                ipAddress: params.request?.ip || null,
                userAgent: params.request?.userAgent || null,
                url: params.request?.url || null,
                method: params.request?.method || null,
                severity: params.severity || 'medium',
                status: 'new',
            });
        }
        catch (logError) {
            console.error('Failed to log bug to database:', logError);
            console.error('Original error:', params.error);
        }
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Bug.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Bug.prototype, "module", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Bug.prototype, "action", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "errorType", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Bug.prototype, "errorMessage", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "errorStack", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "requestData", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "context", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "userType", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "userId", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "ipAddress", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "userAgent", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "url", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "method", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Bug.prototype, "severity", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Bug.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "resolutionNotes", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Bug.prototype, "resolvedBy", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Bug.prototype, "resolvedAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Bug.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Bug.prototype, "updatedAt", void 0);
//# sourceMappingURL=bug.js.map