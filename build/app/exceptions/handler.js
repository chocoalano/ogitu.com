import app from '@adonisjs/core/services/app';
import { ExceptionHandler } from '@adonisjs/core/http';
export default class HttpExceptionHandler extends ExceptionHandler {
    debug = !app.inProduction;
    renderStatusPages = true;
    statusPages = {
        '404': async (error, { inertia, auth }) => {
            let isAdminAuth = false;
            try {
                const webAuth = auth.use('web');
                await webAuth.check();
                isAdminAuth = webAuth.isAuthenticated;
            }
            catch {
                isAdminAuth = false;
            }
            return inertia.render('errors/not_found', { error, isAdminAuth });
        },
        '500..599': async (error, { inertia, auth }) => {
            let isAdminAuth = false;
            try {
                const webAuth = auth.use('web');
                await webAuth.check();
                isAdminAuth = webAuth.isAuthenticated;
            }
            catch {
                isAdminAuth = false;
            }
            return inertia.render('errors/server_error', { error, isAdminAuth });
        },
    };
    isJsonRequest(ctx) {
        const acceptHeader = ctx.request.header('accept') || '';
        const contentType = ctx.request.header('content-type') || '';
        const xRequestedWith = ctx.request.header('x-requested-with') || '';
        return (acceptHeader.includes('application/json') ||
            contentType.includes('application/json') ||
            xRequestedWith.toLowerCase() === 'xmlhttprequest');
    }
    async handle(error, ctx) {
        if (this.isJsonRequest(ctx)) {
            const err = error;
            const status = err.status || 500;
            const message = err.message || 'Terjadi kesalahan pada server';
            if (err.code === 'E_INVALID_CSRF_TOKEN') {
                return ctx.response.status(403).json({
                    success: false,
                    message: 'Session telah berakhir. Silakan refresh halaman dan coba lagi.',
                    code: 'CSRF_ERROR',
                });
            }
            if (err.code === 'E_UNAUTHORIZED_ACCESS') {
                return ctx.response.status(401).json({
                    success: false,
                    message: 'Anda harus login terlebih dahulu',
                    code: 'UNAUTHORIZED',
                });
            }
            if (err.code === 'E_VALIDATION_ERROR') {
                return ctx.response.status(422).json({
                    success: false,
                    message: message,
                    code: 'VALIDATION_ERROR',
                });
            }
            if (err.code === 'E_TOO_MANY_REQUESTS') {
                return ctx.response.status(429).json({
                    success: false,
                    message: 'Terlalu banyak permintaan. Silakan tunggu beberapa saat.',
                    code: 'RATE_LIMITED',
                });
            }
            return ctx.response.status(status).json({
                success: false,
                message: app.inProduction ? 'Terjadi kesalahan pada server' : message,
                code: err.code || 'SERVER_ERROR',
            });
        }
        return super.handle(error, ctx);
    }
    async report(error, ctx) {
        return super.report(error, ctx);
    }
}
//# sourceMappingURL=handler.js.map