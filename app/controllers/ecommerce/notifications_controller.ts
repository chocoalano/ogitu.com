import type { HttpContext } from '@adonisjs/core/http'
import Notification from '#models/notification'
import Customer from '#models/customer'
import transmit from '@adonisjs/transmit/services/main'
import BugReportService from '#services/bug_report_service'
import type { Severity } from '#services/bug_report_service'
import { DateTime } from 'luxon'

export default class NotificationsController {
  private moduleName = 'customer_notifications'

  private async report(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    action: string,
    error: unknown,
    context?: Record<string, unknown>,
    severity: Severity = 'medium'
  ) {
    await BugReportService.logCustomerError(ctx, this.moduleName, action, error, context, severity)
  }

  /**
   * Display a list of notifications for customer
   * Shows notifications where customer_id matches the authenticated customer
   */
  async index({ inertia, auth, request }: HttpContext) {
    try {
      const customer = auth.user!
      const page = request.input('page', 1)
      const perPage = request.input('perPage', 20)
      const type = request.input('type', 'all')
      const isRead = request.input('isRead', 'all')

      // Build query - filter notifications for this customer (customer_id)
      const query = Notification.query().where('customer_id', customer.id)

      // Filter by type
      if (type !== 'all') {
        query.where('type', type)
      }

      // Filter by read status
      if (isRead === 'read') {
        query.whereNotNull('read_at')
      } else if (isRead === 'unread') {
        query.whereNull('read_at')
      }

      // Order by latest first
      query.orderBy('created_at', 'desc')

      // Paginate
      const notifications = await query.paginate(page, perPage)

      // Get unread count
      const unreadCount = await Notification.query()
        .where('customer_id', customer.id)
        .whereNull('read_at')
        .count('* as total')

      // Get type counts for filters
      const typeCounts = await Notification.query()
        .where('customer_id', customer.id)
        .select('type')
        .count('* as count')
        .groupBy('type')

      const typeStats = typeCounts.reduce(
        (acc, item) => {
          acc[item.type] = Number(item.$extras.count)
          return acc
        },
        {} as Record<string, number>
      )

      return inertia.render('customer/notifications/index', {
        customer: {
          id: customer.id,
          name: (customer as Customer).fullName || 'Customer',
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
      })
    } catch (error) {
      await this.report({ request, auth }, 'index', error)

      return inertia.render('customer/notifications/index', {
        customer: {
          id: auth.user!.id,
          name: (auth.user as Customer).fullName || 'Customer',
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
      })
    }
  }

  /**
   * Mark a notification as read
   * Only marks notifications that belong to the authenticated customer (customer_id)
   */
  async markAsRead({ auth, params, response, request }: HttpContext) {
    try {
      const customer = auth.user!
      const notification = await Notification.query()
        .where('id', params.id)
        .where('customer_id', customer.id) // Ensure notification belongs to this customer
        .firstOrFail()

      if (!notification.isRead) {
        notification.isRead = true
        notification.readAt = DateTime.now()
        await notification.save()

        // Broadcast update via transmit
        transmit.broadcast(`customer/${customer.id}/notifications`, {
          event: 'notification_read',
          id: notification.id,
        })
      }

      return response.json({
        success: true,
        notification: {
          id: notification.id,
          isRead: notification.isRead,
          readAt: notification.readAt?.toISO(),
        },
      })
    } catch (error) {
      await this.report({ request, auth }, 'markAsRead', error, { notificationId: params.id })

      return response.status(500).json({
        success: false,
        message: 'Failed to mark notification as read',
      })
    }
  }

  /**
   * Mark all notifications as read for the authenticated customer
   * Only updates notifications where customer_id matches
   */
  async markAllAsRead({ auth, response, request }: HttpContext) {
    try {
      const customer = auth.user!

      await Notification.query()
        .where('customer_id', customer.id) // Only update customer's notifications
        .whereNull('read_at')
        .update({ isRead: true, readAt: DateTime.now() })

      // Broadcast update via transmit
      transmit.broadcast(`customer/${customer.id}/notifications`, {
        event: 'all_notifications_read',
      })

      return response.json({
        success: true,
        message: 'All notifications marked as read',
      })
    } catch (error) {
      await this.report({ request, auth }, 'markAllAsRead', error)

      return response.status(500).json({
        success: false,
        message: 'Failed to mark all notifications as read',
      })
    }
  }

  /**
   * Delete a notification
   * Only deletes notifications that belong to the authenticated customer (customer_id)
   */
  async destroy({ auth, params, response, request }: HttpContext) {
    try {
      const customer = auth.user!
      const notification = await Notification.query()
        .where('id', params.id)
        .where('customer_id', customer.id) // Ensure notification belongs to this customer
        .firstOrFail()

      await notification.delete()

      // Broadcast update via transmit
      transmit.broadcast(`customer/${customer.id}/notifications`, {
        event: 'notification_deleted',
        id: notification.id,
      })

      return response.json({
        success: true,
        message: 'Notification deleted successfully',
      })
    } catch (error) {
      await this.report({ request, auth }, 'destroy', error, { notificationId: params.id })

      return response.status(500).json({
        success: false,
        message: 'Failed to delete notification',
      })
    }
  }

  /**
   * Delete all read notifications for the authenticated customer
   * Only deletes notifications where customer_id matches
   */
  async clearRead({ auth, response, request }: HttpContext) {
    try {
      const customer = auth.user!

      const deleted = await Notification.query()
        .where('customer_id', customer.id) // Only delete customer's notifications
        .whereNotNull('read_at')
        .delete()

      // Broadcast update via transmit
      transmit.broadcast(`customer/${customer.id}/notifications`, {
        event: 'read_notifications_cleared',
        count: deleted,
      })

      return response.json({
        success: true,
        message: `${deleted} notifications cleared successfully`,
        count: deleted,
      })
    } catch (error) {
      await this.report({ request, auth }, 'clearRead', error)

      return response.status(500).json({
        success: false,
        message: 'Failed to clear read notifications',
      })
    }
  }

  /**
   * Get unread count for the authenticated customer
   */
  async unreadCount({ auth, response, request }: HttpContext) {
    try {
      const customer = auth.user!

      const result = await Notification.query()
        .where('customer_id', customer.id)
        .whereNull('read_at')
        .count('* as total')

      return response.json({
        success: true,
        unreadCount: Number(result[0].$extras.total),
      })
    } catch (error) {
      await this.report({ request, auth }, 'unreadCount', error)

      return response.status(500).json({
        success: false,
        unreadCount: 0,
      })
    }
  }
}
