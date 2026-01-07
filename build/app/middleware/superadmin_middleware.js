export default class SuperAdminMiddleware {
    async handle({ auth, response, session }, next) {
        await auth.use('web').check();
        const user = auth.use('web').user;
        if (!user) {
            session.flash('error', 'Silakan login terlebih dahulu');
            return response.redirect('/admin/login');
        }
        if (user.role !== 'superadmin') {
            session.flash('error', 'Hanya superadmin yang dapat mengakses halaman ini');
            return response.redirect('/admin/dashboard');
        }
        await next();
    }
}
//# sourceMappingURL=superadmin_middleware.js.map