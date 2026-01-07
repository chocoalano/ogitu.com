import User from '#models/user';
import OtpService from '#services/otp_service';
import BugReportService from '#services/bug_report_service';
const otpService = new OtpService();
export default class AuthController {
    moduleName = 'AuthController';
    isInvalidCredentialsError(error) {
        const code = error?.code;
        const name = error?.name;
        const message = String(error?.message || '');
        const known = new Set([
            'E_INVALID_CREDENTIALS',
            'E_INVALID_AUTH_UID',
            'E_INVALID_AUTH_PASSWORD',
            'E_UNAUTHORIZED_ACCESS',
            'E_AUTHORIZATION_FAILURE',
            'InvalidCredentialsException',
            'AuthenticationException',
        ]);
        if (code && known.has(code))
            return true;
        if (name && known.has(name))
            return true;
        if (message.toLowerCase().includes('invalid credentials'))
            return true;
        if (message.toLowerCase().includes('email') && message.toLowerCase().includes('password'))
            return true;
        return false;
    }
    async reportGuest(ctx, action, error, context, severity = 'medium') {
        await BugReportService.logGuestError(ctx, this.moduleName, action, error, context, severity);
    }
    async reportAdmin(ctx, action, error, context, severity = 'medium') {
        await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity);
    }
    async showLogin({ inertia, auth }) {
        if (auth.isAuthenticated) {
            return inertia.location('/admin/dashboard');
        }
        return inertia.render('admin/auth/login');
    }
    async sendOtp({ request, response }) {
        const { email, password } = request.only(['email', 'password']);
        try {
            const user = await User.verifyCredentials(email, password);
            if (!['admin', 'superadmin'].includes(user.role)) {
                return response.json({
                    success: false,
                    message: 'Anda tidak memiliki akses ke admin panel',
                });
            }
            const result = await otpService.sendOtp(email, 'login');
            return response.json(result);
        }
        catch (error) {
            if (!this.isInvalidCredentialsError(error)) {
                await this.reportGuest({ request }, 'sendOtp', error, { email }, 'medium');
            }
            return response.json({
                success: false,
                message: 'Email atau password salah',
            });
        }
    }
    async verifyOtp({ request, auth, response }) {
        const { email, otp, redirect } = request.only(['email', 'otp', 'redirect']);
        try {
            const result = await otpService.verifyOtp(email, otp, 'login');
            if (!result.success) {
                return response.json(result);
            }
            const user = await User.findByOrFail('email', email);
            if (!['admin', 'superadmin'].includes(user.role)) {
                return response.json({
                    success: false,
                    message: 'Anda tidak memiliki akses ke admin panel',
                });
            }
            await auth.use('web').login(user);
            return response.json({
                success: true,
                message: 'Login berhasil',
                redirect: redirect || '/admin/dashboard',
            });
        }
        catch (error) {
            await this.reportGuest({ request }, 'verifyOtp', error, {
                email,
            }, 'high');
            return response.json({
                success: false,
                message: 'Verifikasi OTP gagal',
            });
        }
    }
    async resendOtp({ request, response }) {
        const { email, type } = request.only(['email', 'type']);
        try {
            const user = await User.findBy('email', email);
            if (!user || !['admin', 'superadmin'].includes(user.role)) {
                return response.json({
                    success: false,
                    message: 'Email tidak terdaftar sebagai admin',
                });
            }
            const result = await otpService.sendOtp(email, type || 'login');
            return response.json(result);
        }
        catch (error) {
            await this.reportGuest({ request }, 'resendOtp', error, { email, type: type || 'login' }, 'medium');
            return response.json({
                success: false,
                message: 'Gagal mengirim ulang OTP',
            });
        }
    }
    async login({ request, auth, response, session }) {
        const { email, password, remember } = request.only(['email', 'password', 'remember']);
        try {
            const user = await User.verifyCredentials(email, password);
            if (!['admin', 'superadmin'].includes(user.role)) {
                session.flash('error', 'Anda tidak memiliki akses ke admin panel');
                return response.redirect().back();
            }
            await auth.use('web').login(user, remember);
            return response.redirect('/admin/dashboard');
        }
        catch (error) {
            if (!this.isInvalidCredentialsError(error)) {
                await this.reportGuest({ request }, 'login', error, { email, remember: Boolean(remember) }, 'medium');
            }
            session.flash('error', 'Email atau password salah');
            return response.redirect().back();
        }
    }
    async logout({ request, auth, response }) {
        try {
            await auth.use('web').logout();
            return response.redirect('/admin/login');
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'logout', error, { userId: auth.user?.id }, 'medium');
            return response.redirect('/admin/login');
        }
    }
}
//# sourceMappingURL=auth_controller.js.map