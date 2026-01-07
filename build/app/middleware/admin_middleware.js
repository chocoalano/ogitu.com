export default class AdminMiddleware {
    allowedRoles = ['admin', 'superadmin'];
    async handle({ auth, response, session }, next) {
        await auth.use('web').check();
        const user = auth.use('web').user;
        if (!user) {
            session.flash('error', 'Silakan login terlebih dahulu');
            return response.redirect('/admin/login');
        }
        if (!this.allowedRoles.includes(user.role)) {
            session.flash('error', 'Anda tidak memiliki akses ke halaman ini');
            return response.redirect('/admin/login');
        }
        await next();
    }
}
//# sourceMappingURL=admin_middleware.js.map