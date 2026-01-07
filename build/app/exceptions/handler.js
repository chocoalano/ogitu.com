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
    async handle(error, ctx) {
        return super.handle(error, ctx);
    }
    async report(error, ctx) {
        return super.report(error, ctx);
    }
}
//# sourceMappingURL=handler.js.map