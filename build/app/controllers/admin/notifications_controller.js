import Notification from '#models/notification';
import transmit from '@adonisjs/transmit/services/main';
import BugReportService from '#services/bug_report_service';
import { DateTime } from 'luxon';
export default class NotificationsController {
    moduleName = 'notifications';
    async report(ctx, action, error, context, severity = 'medium') {
        await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity);
    }
    async index({ inertia, auth, request }) {
        try {
            const admin = auth.user;
            if (!admin) {
                return inertia.render('admin/notifications/index', {
                    admin: {
                        id: 0,
                        name: 'Admin',
                    },
                    notifications: [],
                    meta: {
                        total: 0,
                        perPage: 20,
                        currentPage: 1,
                        lastPage: 1,
                        firstPage: 1,
                    },
                    unreadCount: 0,
                    typeStats: {},
                    filters: {
                        type: 'all',
                        isRead: 'all',
                    },
                });
            }
            const page = request.input('page', 1);
            const perPage = request.input('perPage', 20);
            const type = request.input('type', 'all');
            const isRead = request.input('isRead', 'all');
            const query = Notification.query().where('user_id', admin.id);
            if (type !== 'all') {
                query.where('type', type);
            }
            if (isRead === 'read') {
                query.whereNotNull('read_at');
            }
            else if (isRead === 'unread') {
                query.whereNull('read_at');
            }
            query.orderBy('created_at', 'desc');
            const notifications = await query.paginate(page, perPage);
            const unreadCount = await Notification.query()
                .where('user_id', admin.id)
                .whereNull('read_at')
                .count('* as total');
            const typeCounts = await Notification.query()
                .where('user_id', admin.id)
                .select('type')
                .count('* as count')
                .groupBy('type');
            const typeStats = typeCounts.reduce((acc, item) => {
                acc[item.type] = Number(item.$extras.count);
                return acc;
            }, {});
            return inertia.render('admin/notifications/index', {
                admin: {
                    id: admin.id,
                    name: admin.fullName || 'Admin',
                },
                notifications: notifications.all().map((n) => ({
                    id: n.id,
                    type: n.type,
                    title: n.title,
                    message: n.message,
                    data: n.data,
                    isRead: n.isRead,
                    readAt: n.readAt?.toISO(),
                    createdAt: n.createdAt.toISO(),
                    icon: n.icon,
                    color: n.color,
                })),
                meta: notifications.getMeta(),
                unreadCount: Number(unreadCount[0].$extras.total),
                typeStats,
                filters: {
                    type,
                    isRead,
                },
            });
        }
        catch (error) {
            await this.report({ request, auth }, 'index', error);
            const userId = auth.user?.id || 0;
            const userName = auth.user ? auth.user.fullName || 'Admin' : 'Admin';
            return inertia.render('admin/notifications/index', {
                admin: {
                    id: userId,
                    name: userName,
                },
                notifications: [],
                meta: {
                    total: 0,
                    perPage: 20,
                    currentPage: 1,
                    lastPage: 1,
                    firstPage: 1,
                },
                unreadCount: 0,
                typeStats: {},
                filters: {
                    type: 'all',
                    isRead: 'all',
                },
            });
        }
    }
    async markAsRead({ auth, params, response, request }) {
        try {
            const admin = auth.user;
            const notification = await Notification.query()
                .where('id', params.id)
                .where('user_id', admin.id)
                .firstOrFail();
            if (!notification.isRead) {
                notification.isRead = true;
                notification.readAt = DateTime.now();
                await notification.save();
                transmit.broadcast(`admin/notifications`, {
                    event: 'notification_read',
                    id: notification.id,
                });
            }
            return response.json({
                success: true,
                notification: {
                    id: notification.id,
                    isRead: notification.isRead,
                    readAt: notification.readAt?.toISO(),
                },
            });
        }
        catch (error) {
            await this.report({ request, auth }, 'markAsRead', error, { notificationId: params.id });
            return response.status(500).json({
                success: false,
                message: 'Failed to mark notification as read',
            });
        }
    }
    async markAllAsRead({ auth, response, request }) {
        try {
            const admin = auth.user;
            await Notification.query()
                .where('user_id', admin.id)
                .where('user_id', admin.id)
                .whereNull('read_at')
                .update({ isRead: true, readAt: DateTime.now() });
            transmit.broadcast(`admin/notifications`, {
                event: 'all_notifications_read',
            });
            return response.json({
                success: true,
                message: 'All notifications marked as read',
            });
        }
        catch (error) {
            await this.report({ request, auth }, 'markAllAsRead', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to mark all notifications as read',
            });
        }
    }
    async destroy({ auth, params, response, request }) {
        try {
            const admin = auth.user;
            const notification = await Notification.query()
                .where('id', params.id)
                .where('user_id', admin.id)
                .where('user_id', admin.id)
                .firstOrFail();
            await notification.delete();
            transmit.broadcast(`admin/notifications`, {
                event: 'notification_deleted',
                id: notification.id,
            });
            return response.json({
                success: true,
                message: 'Notification deleted successfully',
            });
        }
        catch (error) {
            await this.report({ request, auth }, 'destroy', error, { notificationId: params.id });
            return response.status(500).json({
                success: false,
                message: 'Failed to delete notification',
            });
        }
    }
    async clearRead({ auth, response, request }) {
        try {
            const admin = auth.user;
            const deleted = await Notification.query()
                .where('user_id', admin.id)
                .where('user_id', admin.id)
                .whereNotNull('read_at')
                .delete();
            transmit.broadcast(`admin/notifications`, {
                event: 'read_notifications_cleared',
                count: deleted,
            });
            return response.json({
                success: true,
                message: `${deleted} notifications cleared successfully`,
                count: deleted,
            });
        }
        catch (error) {
            await this.report({ request, auth }, 'clearRead', error);
            return response.status(500).json({
                success: false,
                message: 'Failed to clear read notifications',
            });
        }
    }
}
//# sourceMappingURL=notifications_controller.js.map