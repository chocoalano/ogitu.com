import Wishlist from '#models/wishlist';
import Product from '#models/product';
export default class WishlistRepository {
    baseQuery() {
        return Wishlist.query().preload('product', (query) => {
            query.preload('images', (imgQuery) => {
                imgQuery.where('is_primary', true).limit(1);
            });
        });
    }
    async getByCustomerId(customerId) {
        return this.baseQuery().where('customerId', customerId).orderBy('createdAt', 'desc');
    }
    async findByCustomerAndProduct(customerId, productId) {
        return Wishlist.query().where('customerId', customerId).where('productId', productId).first();
    }
    async isWishlisted(customerId, productId) {
        const wishlist = await this.findByCustomerAndProduct(customerId, productId);
        return !!wishlist;
    }
    async toggle(customerId, productId) {
        const existing = await this.findByCustomerAndProduct(customerId, productId);
        if (existing) {
            await existing.delete();
            return { isWishlisted: false };
        }
        const wishlist = await this.add(customerId, productId);
        return { isWishlisted: true, wishlist };
    }
    async add(customerId, productId) {
        return Wishlist.create({
            customerId,
            productId,
        });
    }
    async remove(customerId, productId) {
        const result = await Wishlist.query()
            .where('customerId', customerId)
            .where('productId', productId)
            .delete();
        return result[0] > 0;
    }
    async clearWishlist(customerId) {
        const result = await Wishlist.query().where('customerId', customerId).delete();
        return result[0];
    }
    async getCount(customerId) {
        const result = await Wishlist.query()
            .where('customerId', customerId)
            .count('* as total')
            .first();
        return Number(result?.$extras.total || 0);
    }
    async getWishlistedProductIds(customerId, productIds) {
        if (productIds.length === 0)
            return [];
        const wishlists = await Wishlist.query()
            .where('customerId', customerId)
            .whereIn('productId', productIds)
            .select('productId');
        return wishlists.map((w) => w.productId);
    }
    async validateProduct(productId) {
        const product = await Product.query().where('id', productId).where('status', 'active').first();
        return !!product;
    }
}
//# sourceMappingURL=wishlist_repository.js.map