import { defineConfig } from '@adonisjs/auth';
import { sessionGuard, sessionUserProvider } from '@adonisjs/auth/session';
const authConfig = defineConfig({
    default: 'web',
    guards: {
        web: sessionGuard({
            useRememberMeTokens: false,
            provider: sessionUserProvider({
                model: () => import('#models/user'),
            }),
        }),
        customer: sessionGuard({
            useRememberMeTokens: true,
            provider: sessionUserProvider({
                model: () => import('#models/customer'),
            }),
        }),
    },
});
export default authConfig;
//# sourceMappingURL=auth.js.map