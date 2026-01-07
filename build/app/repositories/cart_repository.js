import CartItem from '#models/cart_item';
import Product from '#models/product';
import ProductVariant from '#models/product_variant';
export default class CartRepository {
    baseQuery() {
        return CartItem.query()
            .preload('product', (query) => {
            query.preload('images', (imgQuery) => {
                imgQuery.where('is_primary', true).limit(1);
            });
        })
            .preload('productVariant');
    }
    async getByCustomerId(customerId) {
        return this.baseQuery().where('customerId', customerId).orderBy('createdAt', 'desc');
    }
    async getCartSummary(customerId) {
        const items = await this.getByCustomerId(customerId);
        let totalQuantity = 0;
        let subtotal = 0;
        for (const item of items) {
            totalQuantity += item.quantity;
            const basePrice = item.product.discountPrice || item.product.price;
            const variantAdjustment = item.productVariant?.priceAdjustment || 0;
            const itemPrice = basePrice + variantAdjustment;
            subtotal += itemPrice * item.quantity;
        }
        return {
            items: items,
            totalItems: items.length,
            totalQuantity,
            subtotal,
        };
    }
    async findByIdAndCustomer(id, customerId) {
        return this.baseQuery().where('id', id).where('customerId', customerId).first();
    }
    async findExisting(customerId, productId, variantId) {
        return CartItem.query()
            .where('customerId', customerId)
            .where('productId', productId)
            .if(variantId, (query) => query.where('productVariantId', variantId))
            .if(!variantId, (query) => query.whereNull('productVariantId'))
            .first();
    }
    async validateStock(productId, variantId, quantity) {
        const product = await Product.query().where('id', productId).where('status', 'active').first();
        if (!product) {
            return {
                isValid: false,
                availableStock: 0,
                message: 'Produk tidak ditemukan atau tidak tersedia',
            };
        }
        let availableStock = product.stock;
        if (variantId) {
            const variant = await ProductVariant.query()
                .where('id', variantId)
                .where('productId', productId)
                .first();
            if (!variant) {
                return {
                    isValid: false,
                    availableStock: 0,
                    message: 'Varian produk tidak ditemukan',
                };
            }
            availableStock = variant.stock;
        }
        if (availableStock < quantity) {
            return {
                isValid: false,
                availableStock,
                message: `Stok tidak mencukupi. Tersedia: ${availableStock}`,
            };
        }
        return {
            isValid: true,
            availableStock,
        };
    }
    async addToCart(input) {
        const { customerId, productId, variantId, quantity } = input;
        const existingItem = await this.findExisting(customerId, productId, variantId);
        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            await existingItem.load('product', (query) => {
                query.preload('images');
            });
            await existingItem.load('productVariant');
            return { cartItem: existingItem, isNew: false };
        }
        const cartItem = await CartItem.create({
            customerId,
            productId,
            productVariantId: variantId || null,
            quantity,
        });
        await cartItem.load('product', (query) => {
            query.preload('images');
        });
        await cartItem.load('productVariant');
        return { cartItem, isNew: true };
    }
    async updateQuantity(cartItem, quantity) {
        if (quantity <= 0) {
            await cartItem.delete();
            return null;
        }
        cartItem.quantity = quantity;
        await cartItem.save();
        return cartItem;
    }
    async remove(cartItem) {
        await cartItem.delete();
    }
    async clearCart(customerId) {
        const result = await CartItem.query().where('customerId', customerId).delete();
        return result[0];
    }
    async getCount(customerId) {
        const result = await CartItem.query()
            .where('customerId', customerId)
            .count('* as total')
            .first();
        return Number(result?.$extras.total || 0);
    }
    async getTotalQuantity(customerId) {
        const result = await CartItem.query()
            .where('customerId', customerId)
            .sum('quantity as total')
            .first();
        return Number(result?.$extras.total || 0);
    }
    async updateChecked(cartItem, checked) {
        cartItem.checked = checked;
        await cartItem.save();
        return cartItem;
    }
    async bulkRemove(customerId, ids) {
        const result = await CartItem.query()
            .where('customerId', customerId)
            .whereIn('id', ids)
            .delete();
        return result[0];
    }
}
//# sourceMappingURL=cart_repository.js.map