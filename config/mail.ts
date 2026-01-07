import env from '#start/env'
import { defineConfig, transports } from '@adonisjs/mail'

const mailConfig = defineConfig({
  default: 'smtp',

  /**
   * A static address for the "from" property. It will be used when
   * you don't provide the from address when sending emails.
   */
  from: {
    address: env.get('MAIL_FROM_ADDRESS', 'noreply@ogitu.com'),
    name: env.get('MAIL_FROM_NAME', 'OGITU Vape'),
  },

  /**
   * A static address for the "reply-to" property. It will be used when
   * you don't provide the reply-to address when sending emails.
   */
  replyTo: {
    address: env.get('MAIL_FROM_ADDRESS', 'noreply@ogitu.com'),
    name: env.get('MAIL_FROM_NAME', 'OGITU Vape'),
  },

  /**
   * The mailers object can be used to configure multiple mailers
   * each using a different transport or same transport with different
   * options.
   */
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
})

export default mailConfig

declare module '@adonisjs/mail/types' {
  export interface MailersList extends InferMailers<typeof mailConfig> {}
}
