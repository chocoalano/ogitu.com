import limiter from '@adonisjs/limiter/services/main';
export const throttle = limiter.define('global', () => {
    return limiter.allowRequests(60).every('1 minute');
});
export const authThrottle = limiter.define('auth', (ctx) => {
    return limiter
        .allowRequests(5)
        .every('1 minute')
        .usingKey(`auth_${ctx.request.ip()}`)
        .blockFor('15 mins')
        .limitExceeded((error) => {
        error.setMessage('Terlalu banyak percobaan login. Silakan coba lagi dalam 15 menit.');
    });
});
export const otpThrottle = limiter.define('otp', (ctx) => {
    const email = ctx.request.input('email', '');
    return limiter
        .allowRequests(3)
        .every('5 minutes')
        .usingKey(`otp_${ctx.request.ip()}_${email}`)
        .blockFor('30 mins')
        .limitExceeded((error) => {
        error.setMessage('Terlalu banyak permintaan OTP. Silakan coba lagi dalam 30 menit.');
    });
});
export const apiThrottle = limiter.define('api', (ctx) => {
    if (ctx.auth.user) {
        return limiter
            .allowRequests(100)
            .every('1 minute')
            .usingKey(`api_user_${ctx.auth.user.id}`);
    }
    return limiter
        .allowRequests(30)
        .every('1 minute')
        .usingKey(`api_ip_${ctx.request.ip()}`);
});
export const adminThrottle = limiter.define('admin', (ctx) => {
    const userId = ctx.auth.user?.id || 'anonymous';
    return limiter
        .allowRequests(120)
        .every('1 minute')
        .usingKey(`admin_${userId}_${ctx.request.ip()}`);
});
export const writeThrottle = limiter.define('write', (ctx) => {
    const userId = ctx.auth.user?.id || 'anonymous';
    return limiter
        .allowRequests(30)
        .every('1 minute')
        .usingKey(`write_${userId}_${ctx.request.ip()}`)
        .limitExceeded((error) => {
        error.setMessage('Terlalu banyak operasi. Silakan tunggu sebentar.');
    });
});
export const uploadThrottle = limiter.define('upload', (ctx) => {
    const userId = ctx.auth.user?.id || 'anonymous';
    return limiter
        .allowRequests(10)
        .every('1 minute')
        .usingKey(`upload_${userId}`)
        .limitExceeded((error) => {
        error.setMessage('Terlalu banyak upload. Silakan tunggu sebentar.');
    });
});
export const bulkThrottle = limiter.define('bulk', (ctx) => {
    const userId = ctx.auth.user?.id || 'anonymous';
    return limiter
        .allowRequests(5)
        .every('1 minute')
        .usingKey(`bulk_${userId}`)
        .blockFor('5 mins')
        .limitExceeded((error) => {
        error.setMessage('Terlalu banyak operasi bulk. Silakan tunggu 5 menit.');
    });
});
export const customerApiThrottle = limiter.define('customerApi', (ctx) => {
    const customerId = ctx.auth.user?.id || 'anonymous';
    return limiter
        .allowRequests(60)
        .every('1 minute')
        .usingKey(`customer_api_${customerId}_${ctx.request.ip()}`);
});
export const checkoutThrottle = limiter.define('checkout', (ctx) => {
    const customerId = ctx.auth.user?.id || 'anonymous';
    return limiter
        .allowRequests(10)
        .every('1 minute')
        .usingKey(`checkout_${customerId}`)
        .blockFor('5 mins')
        .limitExceeded((error) => {
        error.setMessage('Terlalu banyak permintaan checkout. Silakan tunggu sebentar.');
    });
});
export const publicThrottle = limiter.define('public', (ctx) => {
    return limiter
        .allowRequests(120)
        .every('1 minute')
        .usingKey(`public_${ctx.request.ip()}`);
});
export const webhookThrottle = limiter.define('webhook', (ctx) => {
    return limiter
        .allowRequests(100)
        .every('1 minute')
        .usingKey(`webhook_${ctx.request.ip()}`);
});
//# sourceMappingURL=limiter.js.map