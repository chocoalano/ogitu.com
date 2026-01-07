import { defineConfig } from '@adonisjs/inertia';
import { CategoryRepository } from '#repositories/index';
import { CategoryTransformer } from '#transformers/index';
import cache, { CacheKeys } from '#services/cache_service';
const inertiaConfig = defineConfig({
    rootView: 'inertia_layout',
    sharedData: {
        flash: (ctx) => ctx.inertia.always(() => ({
            success: ctx.session?.flashMessages.get('success'),
            error: ctx.session?.flashMessages.get('error'),
        })),
        impersonating: (ctx) => ctx.inertia.always(() => {
            const adminId = ctx.session?.get('impersonating_admin_id');
            const customerName = ctx.session?.get('impersonating_customer_name');
            return {
                isImpersonating: !!adminId,
                customerName: customerName || null,
            };
        }),
        auth: (ctx) => ctx.inertia.always(async () => {
            if (!ctx.auth) {
                return {
                    isLoggedIn: false,
                    user: null,
                };
            }
            try {
                const customerAuth = ctx.auth.use('customer');
                await customerAuth.check();
                return {
                    isLoggedIn: customerAuth.isAuthenticated,
                    user: customerAuth.user
                        ? {
                            id: customerAuth.user.id,
                            fullName: customerAuth.user.fullName,
                            email: customerAuth.user.email,
                            avatar: customerAuth.user.avatar,
                        }
                        : null,
                };
            }
            catch {
                return {
                    isLoggedIn: false,
                    user: null,
                };
            }
        }),
        navCategories: async () => {
            return cache.remember(CacheKeys.NAV_CATEGORIES, 3600, async () => {
                const categoryRepository = new CategoryRepository();
                const categories = await categoryRepository.getForNavigation(8);
                return CategoryTransformer.toNavDTOs(categories);
            });
        },
    },
    ssr: {
        enabled: false,
        entrypoint: 'inertia/app/ssr.ts',
    },
});
export default inertiaConfig;
//# sourceMappingURL=inertia.js.map