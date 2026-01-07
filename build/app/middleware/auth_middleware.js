export default class AuthMiddleware {
    redirectTo = '/login';
    async handle(ctx, next, options = {}) {
        const isApiRoute = ctx.request.url().startsWith('/api');
        const isXhrRequest = ctx.request.header('X-Requested-With') === 'XMLHttpRequest';
        if (isApiRoute || isXhrRequest) {
            for (const guard of options.guards || [ctx.auth.defaultGuard]) {
                if (await ctx.auth.use(guard).check()) {
                    return next();
                }
            }
            return ctx.response.status(401).json({
                success: false,
                message: 'Silakan login terlebih dahulu',
            });
        }
        await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo });
        return next();
    }
}
//# sourceMappingURL=auth_middleware.js.map