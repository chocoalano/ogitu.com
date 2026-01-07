import { DateTime } from 'luxon';
import Otp from '#models/otp';
import emailQueueService from '#services/email_queue_service';
import logger from '@adonisjs/core/services/logger';
export default class OtpService {
    generateCode() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    async sendOtp(email, type) {
        try {
            await Otp.query()
                .where('email', email)
                .where('type', type)
                .where('is_used', false)
                .update({ is_used: true });
            const code = this.generateCode();
            const expiresAt = DateTime.now().plus({ minutes: 5 });
            logger.debug({ email, code, type, expiresAt: expiresAt.toISO() }, 'Creating OTP');
            const newOtp = await Otp.create({
                email,
                code,
                type,
                isUsed: false,
                expiresAt,
            });
            logger.debug({ id: newOtp.id, code: newOtp.code, type: newOtp.type }, 'OTP created');
            const jobId = await emailQueueService.queueOtpEmail(email, code, type);
            logger.info({ email, type, jobId }, 'OTP email queued successfully');
            return {
                success: true,
                message: `Kode OTP telah dikirim ke ${email}`,
                jobId,
            };
        }
        catch (error) {
            logger.error({ email, type, error }, 'OTP send error');
            return {
                success: false,
                message: 'Gagal mengirim kode OTP. Silakan coba lagi.',
            };
        }
    }
    async verifyOtp(email, code, type) {
        try {
            logger.debug({ email, code, type }, 'OTP verification attempt');
            const otp = await Otp.query()
                .where('email', email)
                .where('code', code)
                .where('type', type)
                .where('is_used', false)
                .orderBy('created_at', 'desc')
                .first();
            logger.debug(otp
                ? {
                    id: otp.id,
                    code: otp.code,
                    type: otp.type,
                    isUsed: otp.isUsed,
                    expiresAt: otp.expiresAt,
                }
                : null, 'OTP found');
            if (!otp) {
                const allOtps = await Otp.query()
                    .where('email', email)
                    .orderBy('created_at', 'desc')
                    .limit(5);
                logger.debug(allOtps.map((o) => ({ id: o.id, code: o.code, type: o.type, isUsed: o.isUsed })), 'All recent OTPs for email');
                return {
                    success: false,
                    message: 'Kode OTP tidak valid',
                };
            }
            if (otp.isExpired) {
                return {
                    success: false,
                    message: 'Kode OTP sudah kadaluarsa',
                };
            }
            otp.isUsed = true;
            await otp.save();
            return {
                success: true,
                message: 'Verifikasi OTP berhasil',
            };
        }
        catch (error) {
            logger.error({ email, type, error }, 'OTP verify error');
            return {
                success: false,
                message: 'Gagal memverifikasi OTP',
            };
        }
    }
    async cleanupExpiredOtps() {
        const result = await Otp.query()
            .where('expires_at', '<', DateTime.now().toSQL())
            .orWhere('is_used', true)
            .delete();
        return result[0] || 0;
    }
}
//# sourceMappingURL=otp_service.js.map