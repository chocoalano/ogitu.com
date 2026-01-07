import Discount from '#models/discount';
import Product from '#models/product';
import { DateTime } from 'luxon';
function parseDateTime(dateString) {
    if (!dateString) {
        return DateTime.now();
    }
    let dt = DateTime.fromISO(dateString);
    if (dt.isValid) {
        return dt;
    }
    dt = DateTime.fromSQL(dateString);
    if (dt.isValid) {
        return dt;
    }
    dt = DateTime.fromFormat(dateString, "yyyy-MM-dd'T'HH:mm");
    if (dt.isValid) {
        return dt;
    }
    dt = DateTime.fromFormat(dateString, "yyyy-MM-dd'T'HH:mm:ss");
    if (dt.isValid) {
        return dt;
    }
    const jsDate = new Date(dateString);
    if (!Number.isNaN(jsDate.getTime())) {
        return DateTime.fromJSDate(jsDate);
    }
    console.error(`Failed to parse date: ${dateString}`);
    return DateTime.now();
}
export default class DiscountsController {
    async index({ inertia, request }) {
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 10);
        const status = request.input('status', '');
        const search = request.input('search', '');
        const type = request.input('type', '');
        const query = Discount.query().preload('products', (q) => q.limit(5));
        if (search) {
            query.where((q) => {
                q.where('name', 'like', `%${search}%`).orWhere('description', 'like', `%${search}%`);
            });
        }
        if (type) {
            query.where('type', type);
        }
        if (status) {
            const now = DateTime.now();
            switch (status) {
                case 'active':
                    query
                        .where('isActive', true)
                        .where('startDate', '<=', now.toSQL())
                        .where('endDate', '>=', now.toSQL());
                    break;
                case 'expired':
                    query.where('endDate', '<', now.toSQL());
                    break;
                case 'upcoming':
                    query.where('startDate', '>', now.toSQL());
                    break;
                case 'inactive':
                    query.where('isActive', false);
                    break;
            }
        }
        query.orderBy('createdAt', 'desc');
        const discounts = await query.paginate(page, perPage);
        const now = DateTime.now();
        const allDiscounts = await Discount.query();
        const stats = {
            total: allDiscounts.length,
            active: allDiscounts.filter((d) => d.isActive && d.startDate <= now && d.endDate >= now)
                .length,
            upcoming: allDiscounts.filter((d) => d.startDate > now).length,
            expired: allDiscounts.filter((d) => d.endDate < now).length,
            inactive: allDiscounts.filter((d) => !d.isActive).length,
        };
        const transformedDiscounts = discounts.all().map((discount) => ({
            id: discount.id,
            name: discount.name,
            description: discount.description,
            type: discount.type,
            typeLabel: discount.type === 'percentage' ? 'Persentase' : 'Nominal',
            value: discount.value,
            valueDisplay: discount.type === 'percentage'
                ? `${discount.value}%`
                : `Rp ${discount.value.toLocaleString('id-ID')}`,
            minPurchase: discount.minPurchase,
            maxDiscount: discount.maxDiscount,
            startDate: discount.startDate.toISO(),
            endDate: discount.endDate.toISO(),
            usageLimit: discount.usageLimit,
            usageCount: discount.usedCount,
            remainingUsage: discount.remainingUsage,
            isActive: discount.isActive,
            appliesToAll: discount.appliesToAll,
            status: discount.status,
            statusColor: this.getStatusColor(discount.status),
            productCount: discount.products?.length || 0,
            products: discount.products?.map((p) => ({
                id: p.id,
                name: p.name,
                image: p.images?.[0]?.url || '/images/placeholder.png',
                price: p.price,
            })) || [],
            createdAt: discount.createdAt.toISO(),
        }));
        return inertia.render('admin/promotions/discounts/index', {
            discounts: transformedDiscounts,
            pagination: {
                currentPage: discounts.currentPage,
                lastPage: discounts.lastPage,
                total: discounts.total,
                perPage: discounts.perPage,
            },
            stats,
            filters: {
                status,
                search,
                type,
            },
        });
    }
    async create({ inertia }) {
        const products = await Product.query()
            .where('status', 'active')
            .orderBy('name', 'asc')
            .limit(100);
        return inertia.render('admin/promotions/discounts/create', {
            products: products.map((p) => ({
                id: p.id,
                name: p.name,
                image: p.images?.[0]?.url || '/images/placeholder.png',
                price: p.price,
            })),
        });
    }
    async store({ request, response, session }) {
        const data = request.only([
            'name',
            'description',
            'type',
            'value',
            'min_purchase',
            'max_discount',
            'start_date',
            'end_date',
            'usage_limit',
            'is_active',
            'applies_to_all',
            'product_ids',
        ]);
        const discount = await Discount.create({
            name: data.name,
            description: data.description || null,
            type: data.type,
            value: Number(data.value),
            minPurchase: Number(data.min_purchase) || 0,
            maxDiscount: data.max_discount ? Number(data.max_discount) : null,
            startDate: parseDateTime(data.start_date),
            endDate: parseDateTime(data.end_date),
            usageLimit: data.usage_limit ? Number(data.usage_limit) : null,
            isActive: Boolean(data.is_active),
            appliesToAll: Boolean(data.applies_to_all),
        });
        if (!data.applies_to_all && data.product_ids?.length > 0) {
            await discount.related('products').attach(data.product_ids);
        }
        session.flash('success', 'Diskon berhasil dibuat');
        return response.redirect().toPath('/admin/promotions/discounts');
    }
    async show({ params, inertia }) {
        const discount = await Discount.query().where('id', params.id).preload('products').firstOrFail();
        return inertia.render('admin/promotions/discounts/show', {
            discount: {
                id: discount.id,
                name: discount.name,
                description: discount.description,
                type: discount.type,
                typeLabel: discount.type === 'percentage' ? 'Persentase' : 'Nominal',
                value: discount.value,
                valueDisplay: discount.type === 'percentage'
                    ? `${discount.value}%`
                    : `Rp ${discount.value.toLocaleString('id-ID')}`,
                minPurchase: discount.minPurchase,
                maxDiscount: discount.maxDiscount,
                startDate: discount.startDate.toISO(),
                endDate: discount.endDate.toISO(),
                usageLimit: discount.usageLimit,
                usageCount: discount.usedCount,
                remainingUsage: discount.remainingUsage,
                isActive: discount.isActive,
                appliesToAll: discount.appliesToAll,
                status: discount.status,
                statusColor: this.getStatusColor(discount.status),
                productCount: discount.products?.length || 0,
                products: discount.products?.map((p) => ({
                    id: p.id,
                    name: p.name,
                    image: p.images?.[0]?.url || '/images/placeholder.png',
                    price: p.price,
                })) || [],
                createdAt: discount.createdAt.toISO(),
                updatedAt: discount.updatedAt.toISO(),
            },
        });
    }
    async edit({ params, inertia }) {
        const discount = await Discount.query().where('id', params.id).preload('products').firstOrFail();
        const products = await Product.query()
            .where('status', 'active')
            .orderBy('name', 'asc')
            .limit(100);
        return inertia.render('admin/promotions/discounts/edit', {
            discount: {
                id: discount.id,
                name: discount.name,
                description: discount.description,
                type: discount.type,
                value: discount.value,
                minPurchase: discount.minPurchase,
                maxDiscount: discount.maxDiscount,
                startDate: discount.startDate.toFormat("yyyy-MM-dd'T'HH:mm"),
                endDate: discount.endDate.toFormat("yyyy-MM-dd'T'HH:mm"),
                usageLimit: discount.usageLimit,
                usageCount: discount.usedCount,
                isActive: discount.isActive,
                appliesToAll: discount.appliesToAll,
                productIds: discount.products?.map((p) => p.id) || [],
            },
            products: products.map((p) => ({
                id: p.id,
                name: p.name,
                image: p.images?.[0]?.url || '/images/placeholder.png',
                price: p.price,
            })),
        });
    }
    async update({ params, request, response, session }) {
        const discount = await Discount.findOrFail(params.id);
        const data = request.only([
            'name',
            'description',
            'type',
            'value',
            'min_purchase',
            'max_discount',
            'start_date',
            'end_date',
            'usage_limit',
            'is_active',
            'applies_to_all',
            'product_ids',
        ]);
        discount.merge({
            name: data.name,
            description: data.description || null,
            type: data.type,
            value: Number(data.value),
            minPurchase: Number(data.min_purchase) || 0,
            maxDiscount: data.max_discount ? Number(data.max_discount) : null,
            startDate: parseDateTime(data.start_date),
            endDate: parseDateTime(data.end_date),
            usageLimit: data.usage_limit ? Number(data.usage_limit) : null,
            isActive: Boolean(data.is_active),
            appliesToAll: Boolean(data.applies_to_all),
        });
        await discount.save();
        if (data.applies_to_all) {
            await discount.related('products').detach();
        }
        else if (data.product_ids) {
            await discount.related('products').sync(data.product_ids);
        }
        session.flash('success', 'Diskon berhasil diperbarui');
        return response.redirect().toPath('/admin/promotions/discounts');
    }
    async destroy({ params, response, session }) {
        const discount = await Discount.findOrFail(params.id);
        await discount.related('products').detach();
        await discount.delete();
        session.flash('success', 'Diskon berhasil dihapus');
        return response.redirect().toPath('/admin/promotions/discounts');
    }
    async toggleStatus({ params, response }) {
        const discount = await Discount.findOrFail(params.id);
        discount.isActive = !discount.isActive;
        await discount.save();
        return response.redirect().back();
    }
    getStatusColor(status) {
        const colors = {
            active: 'success',
            expired: 'error',
            upcoming: 'warning',
            inactive: 'neutral',
        };
        return colors[status] || 'neutral';
    }
}
//# sourceMappingURL=discounts_controller.js.map