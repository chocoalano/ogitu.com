import { errors } from '@adonisjs/auth';
import { DateTime } from 'luxon';
import Customer from '#models/customer';
import OtpService from '#services/otp_service';
import BugReportService from '#services/bug_report_service';
export default class AuthController {
    otpService = new OtpService();
    async showLogin({ inertia, request }) {
        const redirect = request.input('redirect', '/');
        return inertia.render('auth/login', { redirect });
    }
    async showRegister({ inertia }) {
        return inertia.render('auth/register');
    }
    async sendLoginOtp({ request, response }) {
        const { email, password } = request.only(['email', 'password']);
        try {
            const customer = await Customer.verifyCredentials(email, password);
            if (!customer.isActive) {
                return response.status(400).json({
                    success: false,
                    message: 'Akun Anda tidak aktif. Silakan hubungi customer service.',
                });
            }
            const result = await this.otpService.sendOtp(email, 'login');
            return response.json({
                success: result.success,
                message: result.message,
                requireOtp: true,
            });
        }
        catch (error) {
            if (error instanceof errors.E_INVALID_CREDENTIALS) {
                return response.status(400).json({
                    success: false,
                    message: 'Email atau password salah',
                });
            }
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'sendLoginOtp', error, { email });
            throw error;
        }
    }
    async verifyLoginOtp({ request, auth, response }) {
        const { email, otp, remember, redirect: redirectTo, } = request.only(['email', 'otp', 'remember', 'redirect']);
        try {
            const otpResult = await this.otpService.verifyOtp(email, otp, 'login');
            if (!otpResult.success) {
                return response.status(400).json({
                    success: false,
                    message: otpResult.message,
                });
            }
            const customer = await Customer.findByOrFail('email', email);
            await auth.use('customer').login(customer, remember === true || remember === 'on');
            return response.json({
                success: true,
                message: 'Login berhasil!',
                redirect: redirectTo || '/',
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'verifyLoginOtp', error, { email });
            return response.status(400).json({
                success: false,
                message: 'Gagal memverifikasi OTP',
            });
        }
    }
    async login({ request, auth, response }) {
        const { email, password, remember, redirect: redirectTo, } = request.only(['email', 'password', 'remember', 'redirect']);
        try {
            const customer = await Customer.verifyCredentials(email, password);
            if (!customer.isActive) {
                return response.status(400).json({
                    success: false,
                    message: 'Akun Anda tidak aktif. Silakan hubungi customer service.',
                });
            }
            await auth.use('customer').login(customer, remember === true || remember === 'on');
            return response.json({
                success: true,
                message: 'Login berhasil!',
                redirect: redirectTo || '/',
            });
        }
        catch (error) {
            if (error instanceof errors.E_INVALID_CREDENTIALS) {
                return response.status(400).json({
                    success: false,
                    message: 'Email atau password salah',
                });
            }
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'login', error, { email });
            throw error;
        }
    }
    async sendRegisterOtp({ request, response }) {
        const { email, fullName, password, phone, birthDate } = request.only([
            'email',
            'fullName',
            'password',
            'phone',
            'birthDate',
        ]);
        try {
            if (birthDate) {
                const birth = DateTime.fromISO(birthDate);
                const age = Math.floor(DateTime.now().diff(birth, 'years').years);
                if (age < 21) {
                    return response.status(400).json({
                        success: false,
                        message: 'Anda harus berusia minimal 21 tahun untuk mendaftar.',
                    });
                }
            }
            else {
                return response.status(400).json({
                    success: false,
                    message: 'Tanggal lahir wajib diisi untuk verifikasi usia.',
                });
            }
            const existingCustomer = await Customer.findBy('email', email);
            if (existingCustomer) {
                return response.status(400).json({
                    success: false,
                    message: 'Email sudah terdaftar',
                });
            }
            const result = await this.otpService.sendOtp(email, 'register');
            return response.json({
                success: result.success,
                message: result.message,
                data: {
                    email,
                    fullName,
                    password,
                    phone,
                    birthDate,
                },
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'sendRegisterOtp', error, { email, fullName });
            return response.status(500).json({
                success: false,
                message: 'Gagal mengirim kode OTP',
            });
        }
    }
    async verifyRegisterOtp({ request, auth, response }) {
        const { email, otp, fullName, password, phone, birthDate } = request.only([
            'email',
            'otp',
            'fullName',
            'password',
            'phone',
            'birthDate',
        ]);
        try {
            const otpResult = await this.otpService.verifyOtp(email, otp, 'register');
            if (!otpResult.success) {
                return response.status(400).json({
                    success: false,
                    message: otpResult.message,
                });
            }
            const existingCustomer = await Customer.findBy('email', email);
            if (existingCustomer) {
                return response.status(400).json({
                    success: false,
                    message: 'Email sudah terdaftar',
                });
            }
            const customer = await Customer.create({
                fullName,
                email,
                password,
                phone: phone || null,
                birthDate: DateTime.fromISO(birthDate),
                isActive: true,
                isVerified: true,
                emailVerifiedAt: DateTime.now(),
            });
            await auth.use('customer').login(customer);
            return response.json({
                success: true,
                message: 'Pendaftaran berhasil! Selamat datang di Ogitu.',
                redirect: '/',
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'verifyRegisterOtp', error, { email, fullName });
            return response.status(500).json({
                success: false,
                message: 'Terjadi kesalahan saat memverifikasi OTP',
            });
        }
    }
    async register({ request, auth, response }) {
        const data = request.only(['fullName', 'email', 'password', 'phone', 'birthDate']);
        try {
            if (data.birthDate) {
                const birthDate = DateTime.fromISO(data.birthDate);
                const age = Math.floor(DateTime.now().diff(birthDate, 'years').years);
                if (age < 21) {
                    return response.status(400).json({
                        success: false,
                        message: 'Anda harus berusia minimal 21 tahun untuk mendaftar.',
                    });
                }
            }
            else {
                return response.status(400).json({
                    success: false,
                    message: 'Tanggal lahir wajib diisi untuk verifikasi usia.',
                });
            }
            const existingCustomer = await Customer.findBy('email', data.email);
            if (existingCustomer) {
                return response.status(400).json({
                    success: false,
                    message: 'Email sudah terdaftar',
                });
            }
            const customer = await Customer.create({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                phone: data.phone || null,
                birthDate: DateTime.fromISO(data.birthDate),
                isActive: true,
                isVerified: false,
            });
            await auth.use('customer').login(customer);
            return response.json({
                success: true,
                message: 'Pendaftaran berhasil! Selamat datang di Ogitu.',
                redirect: '/',
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'register', error, { email: data.email, fullName: data.fullName });
            return response.status(500).json({
                success: false,
                message: 'Terjadi kesalahan saat mendaftar',
            });
        }
    }
    async showForgotPassword({ inertia }) {
        return inertia.render('auth/forgot-password');
    }
    async showResetPassword({ inertia, request }) {
        const email = request.input('email', '');
        const token = request.input('token', '');
        return inertia.render('auth/reset-password', { email, token });
    }
    async sendResetOtp({ request, response }) {
        const { email } = request.only(['email']);
        try {
            const customer = await Customer.findBy('email', email);
            if (!customer) {
                return response.json({
                    success: true,
                    message: 'Jika email terdaftar, kode OTP akan dikirim.',
                });
            }
            if (!customer.isActive) {
                return response.status(400).json({
                    success: false,
                    message: 'Akun Anda tidak aktif. Silakan hubungi customer service.',
                });
            }
            const result = await this.otpService.sendOtp(email, 'forgot_password');
            return response.json({
                success: result.success,
                message: result.message,
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'sendResetOtp', error, { email });
            return response.status(500).json({
                success: false,
                message: 'Gagal mengirim kode OTP',
            });
        }
    }
    async verifyResetOtp({ request, response }) {
        const { email, otp } = request.only(['email', 'otp']);
        try {
            const customer = await Customer.findBy('email', email);
            if (!customer) {
                return response.status(400).json({
                    success: false,
                    message: 'Email tidak terdaftar',
                });
            }
            const otpResult = await this.otpService.verifyOtp(email, otp, 'forgot_password');
            if (!otpResult.success) {
                return response.status(400).json({
                    success: false,
                    message: otpResult.message,
                });
            }
            const crypto = await import('node:crypto');
            const resetToken = crypto.randomBytes(32).toString('hex');
            customer.verificationToken = resetToken;
            await customer.save();
            return response.json({
                success: true,
                message: 'Verifikasi OTP berhasil',
                token: resetToken,
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'verifyResetOtp', error, { email });
            return response.status(500).json({
                success: false,
                message: 'Gagal memverifikasi OTP',
            });
        }
    }
    async resetPassword({ request, response }) {
        const { email, token, password } = request.only(['email', 'token', 'password']);
        try {
            if (!password || password.length < 8) {
                return response.status(400).json({
                    success: false,
                    message: 'Password minimal 8 karakter',
                });
            }
            const customer = await Customer.query()
                .where('email', email)
                .where('verification_token', token)
                .first();
            if (!customer) {
                return response.status(400).json({
                    success: false,
                    message: 'Token tidak valid atau sudah kadaluarsa',
                });
            }
            customer.password = password;
            customer.verificationToken = null;
            await customer.save();
            return response.json({
                success: true,
                message: 'Password berhasil direset. Silakan login dengan password baru.',
            });
        }
        catch (error) {
            await BugReportService.logGuestError({ request }, 'EcommerceAuthController', 'resetPassword', error, { email });
            return response.status(500).json({
                success: false,
                message: 'Gagal mereset password',
            });
        }
    }
    async resendOtp({ request, response }) {
        const { email, type } = request.only(['email', 'type']);
        if (!['login', 'register', 'forgot_password'].includes(type)) {
            return response.status(400).json({
                success: false,
                message: 'Tipe OTP tidak valid',
            });
        }
        const result = await this.otpService.sendOtp(email, type);
        return response.json({
            success: result.success,
            message: result.message,
        });
    }
    async logout({ auth, inertia }) {
        await auth.use('customer').logout();
        return inertia.location('/');
    }
    async me({ auth, response }) {
        try {
            await auth.use('customer').check();
            const customer = auth.use('customer').user;
            if (!customer) {
                return response.json({
                    success: false,
                    message: 'Tidak terautentikasi',
                });
            }
            return response.json({
                success: true,
                data: {
                    id: customer.id,
                    fullName: customer.fullName,
                    email: customer.email,
                    phone: customer.phone,
                    avatar: customer.avatar,
                    isVerified: customer.isVerified,
                },
            });
        }
        catch {
            return response.json({
                success: false,
                message: 'Tidak terautentikasi',
            });
        }
    }
}
//# sourceMappingURL=auth_controller.js.map