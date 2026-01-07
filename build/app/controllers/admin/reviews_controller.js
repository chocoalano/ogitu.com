import Review from '#models/review';
import { DateTime } from 'luxon';
import BugReportService from '#services/bug_report_service';
export default class ReviewsController {
    moduleName = 'ReviewsController';
    async reportAdmin(ctx, action, error, context, severity = 'medium') {
        await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity);
    }
    async index({ inertia, request, auth, session }) {
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 10);
        const status = request.input('status', 'all');
        const search = request.input('search', '');
        const rating = request.input('rating', '');
        try {
            let query = Review.query()
                .preload('product')
                .preload('customer')
                .preload('order')
                .orderBy('createdAt', 'desc');
            if (status === 'pending') {
                query = query.where('isApproved', false);
            }
            else if (status === 'approved') {
                query = query.where('isApproved', true);
            }
            if (search) {
                query = query.where((q) => {
                    q.whereHas('product', (pq) => {
                        pq.where('name', 'LIKE', `%${search}%`);
                    }).orWhereHas('customer', (cq) => {
                        cq.where('fullName', 'LIKE', `%${search}%`);
                    });
                });
            }
            if (rating) {
                query = query.where('rating', Number(rating));
            }
            const reviews = await query.paginate(page, perPage);
            return inertia.render('admin/reviews/index', {
                reviews: reviews.serialize(),
                filters: { status, search, rating },
            });
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'index', error, { page, perPage, status, search, rating }, 'medium');
            session.flash('error', 'Gagal memuat data review');
            return inertia.render('admin/reviews/index', {
                reviews: { data: [], meta: {}, links: {} },
                filters: { status, search, rating },
            });
        }
    }
    async approve({ params, request, auth, response, session }) {
        const reviewId = params.id;
        try {
            const review = await Review.findOrFail(reviewId);
            review.isApproved = true;
            await review.save();
            session.flash('success', 'Review berhasil disetujui');
            return response.redirect().back();
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'approve', error, { reviewId }, 'medium');
            session.flash('error', 'Gagal menyetujui review');
            return response.redirect().back();
        }
    }
    async reject({ params, request, auth, response, session }) {
        const reviewId = params.id;
        try {
            const review = await Review.findOrFail(reviewId);
            review.isApproved = false;
            await review.save();
            session.flash('success', 'Review berhasil ditolak');
            return response.redirect().back();
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'reject', error, { reviewId }, 'medium');
            session.flash('error', 'Gagal menolak review');
            return response.redirect().back();
        }
    }
    async reply({ params, request, auth, response, session }) {
        const reviewId = params.id;
        const { reply } = request.only(['reply']);
        try {
            const review = await Review.findOrFail(reviewId);
            review.adminReply = reply;
            review.adminRepliedAt = DateTime.now();
            await review.save();
            session.flash('success', 'Balasan berhasil dikirim');
            return response.redirect().back();
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'reply', error, {
                reviewId,
                hasReply: Boolean(reply),
                replyLength: typeof reply === 'string' ? reply.length : 0,
            }, 'high');
            session.flash('error', 'Gagal mengirim balasan review');
            return response.redirect().back();
        }
    }
    async destroy({ params, request, auth, response, session }) {
        const reviewId = params.id;
        try {
            const review = await Review.findOrFail(reviewId);
            await review.delete();
            session.flash('success', 'Review berhasil dihapus');
            return response.redirect().back();
        }
        catch (error) {
            await this.reportAdmin({ request, auth }, 'destroy', error, { reviewId }, 'high');
            session.flash('error', 'Gagal menghapus review');
            return response.redirect().back();
        }
    }
}
//# sourceMappingURL=reviews_controller.js.map