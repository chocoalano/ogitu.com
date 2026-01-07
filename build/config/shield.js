import env from '#start/env';
import app from '@adonisjs/core/services/app';
import { defineConfig } from '@adonisjs/shield';
const isSecureCookie = env.get('COOKIE_SECURE') ?? app.inProduction;
const shieldConfig = defineConfig({
    csp: {
        enabled: false,
        directives: {},
        reportOnly: false,
    },
    csrf: {
        enabled: true,
        exceptRoutes: ['/webhooks/midtrans'],
        enableXsrfCookie: true,
        methods: ['POST', 'PUT', 'PATCH', 'DELETE'],
        cookieOptions: {
            httpOnly: false,
            secure: isSecureCookie,
            sameSite: 'lax',
            path: '/',
        },
    },
    xFrame: {
        enabled: true,
        action: 'DENY',
    },
    hsts: {
        enabled: true,
        maxAge: '180 days',
    },
    contentTypeSniffing: {
        enabled: true,
    },
});
export default shieldConfig;
//# sourceMappingURL=shield.js.map