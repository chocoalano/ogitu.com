import Category from '#models/category';
import { cuid } from '@adonisjs/core/helpers';
import Helper from '#services/helper';
import FileUploadService from '#services/file_upload_service';
import BugReportService from '#services/bug_report_service';
export default class CategoriesController {
    moduleName = 'CategoriesController';
    slugify(input) {
        return input
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    normalizeParentId(value) {
        if (value === null || value === undefined)
            return null;
        if (value === '' || value === 'null')
            return null;
        const n = Number(value);
        return Number.isFinite(n) ? n : null;
    }
    toBool(value) {
        if (value === true)
            return true;
        if (value === false)
            return false;
        if (typeof value === 'string')
            return value === 'true' || value === '1' || value === 'on';
        if (typeof value === 'number')
            return value === 1;
        return false;
    }
    async report(ctx, action, error, context, severity = 'medium') {
        await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity);
    }
    async index({ inertia, request, auth, session }) {
        const page = request.input('page', 1);
        const perPage = request.input('perPage', 20);
        const search = request.input('search', '');
        try {
            let query = Category.query()
                .whereNull('parentId')
                .preload('children')
                .orderBy('sortOrder', 'asc');
            if (search) {
                query = query.where('name', 'LIKE', `%${search}%`);
            }
            const categories = await query.paginate(page, perPage);
            return inertia.render('admin/categories/index', {
                categories: categories.serialize(),
                filters: { search },
            });
        }
        catch (error) {
            await this.report({ request, auth }, 'index', error, { page, perPage, search }, 'medium');
            session.flash('error', 'Gagal memuat data kategori');
            return inertia.render('admin/categories/index', {
                categories: { data: [], meta: {}, links: {} },
                filters: { search },
            });
        }
    }
    async productsCategories({ inertia, request, auth, session }) {
        const search = request.input('search', '');
        try {
            const categoriesQuery = Category.query()
                .whereNull('parentId')
                .preload('children')
                .orderBy('sortOrder', 'asc');
            if (search) {
                categoriesQuery.where('name', 'LIKE', `%${search}%`);
            }
            const categories = await categoriesQuery;
            const allCategories = await Category.query().whereNull('parentId').orderBy('name', 'asc');
            const transformCategory = (cat) => ({
                id: cat.id,
                name: cat.name,
                slug: cat.slug,
                description: cat.description,
                image: Helper.getFullImageUrl(cat.image),
                isActive: cat.isActive,
                sortOrder: cat.sortOrder,
                parentId: cat.parentId,
                children: cat.children?.map(transformCategory) || [],
            });
            const totalCategories = categories.length + categories.reduce((sum, cat) => sum + (cat.children?.length || 0), 0);
            const mainCategories = categories.length;
            const subCategories = categories.reduce((sum, cat) => sum + (cat.children?.length || 0), 0);
            const activeCategories = categories.filter((c) => c.isActive).length +
                categories.reduce((sum, cat) => sum + (cat.children?.filter((c) => c.isActive).length || 0), 0);
            return inertia.render('admin/products/categories', {
                categories: categories.map(transformCategory),
                parentCategories: allCategories.map((c) => ({ id: c.id, name: c.name })),
                stats: { totalCategories, mainCategories, subCategories, activeCategories },
                filters: { search },
                admin: {
                    id: 1,
                    storeName: 'Admin',
                    slug: 'admin',
                    status: 'active',
                },
            });
        }
        catch (error) {
            await this.report({ request, auth }, 'productsCategories', error, { search }, 'medium');
            session.flash('error', 'Gagal memuat halaman kategori produk');
            return inertia.render('admin/products/categories', {
                categories: [],
                parentCategories: [],
                stats: { totalCategories: 0, mainCategories: 0, subCategories: 0, activeCategories: 0 },
                filters: { search },
                admin: { id: 1, storeName: 'Admin', slug: 'admin', status: 'active' },
            });
        }
    }
    async storeCategory({ request, response, session, auth }) {
        let name = '';
        let parentId = null;
        try {
            const payload = request.only(['name', 'description', 'parentId', 'isActive']);
            name = payload.name ? String(payload.name) : '';
            parentId = this.normalizeParentId(payload.parentId);
            if (!name) {
                session.flash('error', 'Nama kategori wajib diisi');
                return response.redirect().back();
            }
            const description = payload.description ? String(payload.description) : null;
            const isActive = this.toBool(payload.isActive);
            const imageFile = request.file('image', {
                size: '2mb',
                extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
            });
            const baseSlug = this.slugify(name);
            const existingCategory = await Category.findBy('slug', baseSlug);
            const finalSlug = existingCategory ? `${baseSlug}-${cuid().slice(0, 6)}` : baseSlug;
            let imagePath = null;
            if (imageFile && imageFile.isValid) {
                const uploaded = await FileUploadService.upload(imageFile, {
                    folder: 'categories',
                    slug: finalSlug,
                });
                if (uploaded)
                    imagePath = uploaded.key;
            }
            const maxSortOrderQuery = Category.query().max('sortOrder as max');
            if (parentId === null) {
                maxSortOrderQuery.whereNull('parentId');
            }
            else {
                maxSortOrderQuery.where('parentId', parentId);
            }
            const maxSortOrder = await maxSortOrderQuery.first();
            await Category.create({
                name,
                slug: finalSlug,
                description,
                parentId,
                image: imagePath,
                sortOrder: (maxSortOrder?.$extras.max || 0) + 1,
                isActive,
            });
            session.flash('success', 'Kategori berhasil ditambahkan');
            return response.redirect().back();
        }
        catch (error) {
            await this.report({ request, auth }, 'storeCategory', error, { name, parentId }, 'high');
            session.flash('error', 'Gagal menambahkan kategori');
            return response.redirect().back();
        }
    }
    async updateCategory({ params, request, response, session, auth }) {
        let categoryId = params.id;
        let name;
        try {
            const category = await Category.findOrFail(params.id);
            const payload = request.only(['name', 'description', 'parentId', 'isActive']);
            name = payload.name ? String(payload.name) : category.name;
            const parentId = this.normalizeParentId(payload.parentId);
            const description = payload.description ? String(payload.description) : null;
            const isActive = this.toBool(payload.isActive);
            const imageFile = request.file('image', {
                size: '2mb',
                extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
            });
            let finalSlug = category.slug;
            if (name && name !== category.name) {
                const baseSlug = this.slugify(name);
                const existingCategory = await Category.query()
                    .where('slug', baseSlug)
                    .whereNot('id', category.id)
                    .first();
                finalSlug = existingCategory ? `${baseSlug}-${cuid().slice(0, 6)}` : baseSlug;
            }
            let imagePath = category.image;
            if (imageFile && imageFile.isValid) {
                if (category.image) {
                    try {
                        await FileUploadService.delete(category.image);
                    }
                    catch (deleteErr) {
                        await this.report({ request, auth }, 'updateCategory.deleteOldImage', deleteErr, { categoryId: category.id, oldImage: category.image }, 'low');
                    }
                }
                const uploaded = await FileUploadService.upload(imageFile, {
                    folder: 'categories',
                    slug: finalSlug,
                });
                if (uploaded) {
                    imagePath = uploaded.key;
                }
            }
            category.merge({
                name: name,
                slug: finalSlug,
                description,
                parentId,
                image: imagePath,
                isActive,
            });
            await category.save();
            session.flash('success', 'Kategori berhasil diupdate');
            return response.redirect().back();
        }
        catch (error) {
            await this.report({ request, auth }, 'updateCategory', error, { categoryId, name }, 'high');
            session.flash('error', 'Gagal mengupdate kategori');
            return response.redirect().back();
        }
    }
    async destroyCategory({ params, request, response, session, auth }) {
        const categoryId = params.id;
        try {
            const category = await Category.findOrFail(params.id);
            const childrenCount = await Category.query()
                .where('parentId', category.id)
                .count('* as total')
                .first();
            if (Number(childrenCount?.$extras.total) > 0) {
                session.flash('error', 'Kategori tidak dapat dihapus karena memiliki sub-kategori');
                return response.redirect().back();
            }
            if (category.image) {
                try {
                    await FileUploadService.delete(category.image);
                }
                catch (deleteErr) {
                    await this.report({ request, auth }, 'destroyCategory.deleteImage', deleteErr, { categoryId: category.id, image: category.image }, 'low');
                }
            }
            await category.delete();
            session.flash('success', 'Kategori berhasil dihapus');
            return response.redirect().back();
        }
        catch (error) {
            await this.report({ request, auth }, 'destroyCategory', error, { categoryId }, 'high');
            session.flash('error', 'Gagal menghapus kategori');
            return response.redirect().back();
        }
    }
    async toggleCategoryActive({ params, request, response, session, auth }) {
        const categoryId = params.id;
        try {
            const category = await Category.findOrFail(params.id);
            category.isActive = !category.isActive;
            await category.save();
            session.flash('success', `Kategori berhasil di${category.isActive ? 'aktifkan' : 'nonaktifkan'}`);
            return response.redirect().back();
        }
        catch (error) {
            await this.report({ request, auth }, 'toggleCategoryActive', error, { categoryId }, 'medium');
            session.flash('error', 'Gagal mengubah status kategori');
            return response.redirect().back();
        }
    }
    async store(ctx) {
        return this.storeCategory(ctx);
    }
    async update(ctx) {
        return this.updateCategory(ctx);
    }
    async destroy(ctx) {
        return this.destroyCategory(ctx);
    }
    async toggleActive(ctx) {
        return this.toggleCategoryActive(ctx);
    }
}
//# sourceMappingURL=categories_controller.js.map