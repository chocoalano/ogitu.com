import env from '#start/env';
import { defineConfig, transports } from '@adonisjs/mail';
const mailConfig = defineConfig({
    default: 'smtp',
    from: {
        address: env.get('MAIL_FROM_ADDRESS', 'noreply@ogitu.com'),
        name: env.get('MAIL_FROM_NAME', 'OGITU Vape'),
    },
    replyTo: {
        address: env.get('MAIL_FROM_ADDRESS', 'noreply@ogitu.com'),
        name: env.get('MAIL_FROM_NAME', 'OGITU Vape'),
    },
    mailers: {
        smtp: transports.smtp({
            host: env.get('SMTP_HOST', 'sandbox.smtp.mailtrap.io'),
            port: env.get('SMTP_PORT', 2525),
            secure: false,
            auth: {
                type: 'login',
                user: env.get('SMTP_USERNAME', ''),
                pass: env.get('SMTP_PASSWORD', ''),
            },
        }),
    },
});
export default mailConfig;
//# sourceMappingURL=mail.js.map