import Bug from '#models/bug';
import logger from '@adonisjs/core/services/logger';
export default class BugReportService {
    static async logFromContext(ctx, options) {
        const { request, auth } = ctx;
        await this.log({
            ...options,
            request: {
                url: request.url(),
                method: request.method(),
                ip: request.ip(),
                userAgent: request.header('User-Agent') || undefined,
                body: options.context,
            },
            userType: 'admin',
            userId: auth.user?.id,
        });
    }
    static async log(params) {
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
            logger.error({ module: params.module, action: params.action, error: params.error }, 'Bug reported');
        }
        catch (logError) {
            logger.error('Failed to log bug to database:', logError);
            logger.error('Original error:', params.error);
        }
    }
    static async logAdminError(ctx, module, action, error, context, severity = 'medium') {
        await this.logFromContext(ctx, {
            module,
            action,
            error,
            context,
            severity,
        });
    }
    static async logCustomerError(ctx, module, action, error, context, severity = 'medium') {
        const { request, auth } = ctx;
        await this.log({
            module,
            action,
            error,
            request: {
                url: request.url(),
                method: request.method(),
                ip: request.ip(),
                userAgent: request.header('User-Agent') || undefined,
                body: context,
            },
            context,
            userType: 'customer',
            userId: auth.user?.id,
            severity,
        });
    }
    static async logGuestError(ctx, module, action, error, context, severity = 'medium') {
        const { request } = ctx;
        await this.log({
            module,
            action,
            error,
            request: {
                url: request.url(),
                method: request.method(),
                ip: request.ip(),
                userAgent: request.header('User-Agent') || undefined,
                body: context,
            },
            context,
            userType: 'guest',
            severity,
        });
    }
}
//# sourceMappingURL=bug_report_service.js.map