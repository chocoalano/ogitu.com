import env from '#start/env';
import app from '@adonisjs/core/services/app';
import { defineConfig, stores } from '@adonisjs/session';
const isSecureCookie = env.get('COOKIE_SECURE') ?? app.inProduction;
const sessionConfig = defineConfig({
    enabled: true,
    cookieName: 'adonis-session',
    clearWithBrowser: false,
    age: '2h',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: isSecureCookie,
        sameSite: 'lax',
    },
    store: env.get('SESSION_DRIVER'),
    stores: {
        cookie: stores.cookie(),
    },
});
export default sessionConfig;
//# sourceMappingURL=session.js.map