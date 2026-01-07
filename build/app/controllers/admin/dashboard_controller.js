import Product from '#models/product';
import Order from '#models/order';
import Customer from '#models/customer';
import Review from '#models/review';
import Category from '#models/category';
import { DateTime } from 'luxon';
export default class DashboardController {
    async index({ inertia, auth }) {
        const user = auth.use('web').user;
        const [totalProducts, totalOrders, totalCustomers, totalCategories, pendingReviews, recentOrders,] = await Promise.all([
            Product.query().count('* as total').first(),
            Order.query().count('* as total').first(),
            Customer.query().count('* as total').first(),
            Category.query().count('* as total').first(),
            Review.query().where('isApproved', false).count('* as total').first(),
            Order.query().preload('customer').orderBy('createdAt', 'desc').limit(5),
        ]);
        const startOfMonth = DateTime.now().startOf('month');
        const monthlyRevenue = await Order.query()
            .whereIn('status', ['paid', 'processing', 'shipped', 'delivered'])
            .where('createdAt', '>=', startOfMonth.toSQL())
            .sum('total as total')
            .first();
        const ordersByStatus = await Order.query()
            .select('status')
            .count('* as count')
            .groupBy('status');
        const stats = {
            totalProducts: Number(totalProducts?.$extras.total || 0),
            totalOrders: Number(totalOrders?.$extras.total || 0),
            totalCustomers: Number(totalCustomers?.$extras.total || 0),
            totalCategories: Number(totalCategories?.$extras.total || 0),
            pendingReviews: Number(pendingReviews?.$extras.total || 0),
            monthlyRevenue: Number(monthlyRevenue?.$extras.total || 0),
            ordersByStatus: ordersByStatus.reduce((acc, item) => {
                acc[item.status] = Number(item.$extras.count);
                return acc;
            }, {}),
        };
        return inertia.render('admin/dashboard', {
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            },
            stats,
            recentOrders: recentOrders.map((order) => ({
                id: order.id,
                orderNumber: order.orderNumber,
                customerName: order.customer?.fullName || 'N/A',
                total: order.total,
                status: order.status,
                createdAt: order.createdAt.toISO(),
            })),
        });
    }
    async me({ auth, response }) {
        const user = auth.use('web').user;
        return response.json({
            success: true,
            admin: {
                id: user.id,
                name: user.fullName,
                email: user.email,
                avatar: null,
                role: user.role,
                storeName: 'Admin Panel',
                status: 'active',
                rating: 5,
                totalSales: 0,
            },
        });
    }
}
//# sourceMappingURL=dashboard_controller.js.map