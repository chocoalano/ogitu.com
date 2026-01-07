import Helper from '#services/helper';
export default class ProductTransformer {
    static formatCurrency(value) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    }
    static calculateDiscount(price, discountPrice) {
        if (!discountPrice)
            return 0;
        return Math.round(((price - discountPrice) / price) * 100);
    }
    static getBadge(product) {
        if (product.isFeatured)
            return 'Pilihan';
        if (product.totalSold > 100)
            return 'Terlaris';
        if (product.discountPrice)
            return 'Promo';
        if (product.stock < 10 && product.stock > 0)
            return 'Stok Terbatas';
        if (product.stock === 0)
            return 'Habis';
        return null;
    }
    static async toListDTO(product) {
        const effectivePrice = product.discountPrice || product.price;
        return {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            discountPrice: product.discountPrice,
            formattedPrice: this.formatCurrency(effectivePrice),
            formattedOriginalPrice: product.discountPrice ? this.formatCurrency(product.price) : null,
            discount: this.calculateDiscount(product.price, product.discountPrice),
            image: await Helper.getProductImage(product),
            rating: product.rating,
            totalReviews: product.totalReviews,
            totalSold: product.totalSold,
            stock: product.stock,
            brand: product.brand,
            badge: this.getBadge(product),
        };
    }
    static async toListDTOs(products) {
        return Promise.all(products.map((product) => this.toListDTO(product)));
    }
    static calculateReviewSummary(reviews) {
        const reviewsArray = reviews || [];
        const totalReviews = reviewsArray.length;
        if (totalReviews === 0) {
            return {
                averageRating: 0,
                totalReviews: 0,
                ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
            };
        }
        const totalRating = reviewsArray.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = Math.round((totalRating / totalReviews) * 10) / 10;
        const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
        reviewsArray.forEach((review) => {
            const rating = Math.min(5, Math.max(1, Math.round(review.rating)));
            ratingDistribution[rating]++;
        });
        return {
            averageRating,
            totalReviews,
            ratingDistribution,
        };
    }
    static transformReviews(reviews) {
        if (!reviews)
            return [];
        return reviews.map((review) => ({
            id: review.id,
            rating: review.rating,
            comment: review.comment,
            images: review.images,
            isVerifiedPurchase: review.isVerifiedPurchase,
            helpfulCount: review.helpfulCount,
            createdAt: review.createdAt.toISO() || '',
            customer: review.customer
                ? {
                    id: review.customer.id,
                    fullName: review.customer.fullName,
                    avatar: review.customer.avatar ? Helper.getFullImageUrl(review.customer.avatar) : null,
                }
                : null,
        }));
    }
    static async toDetailDTO(product) {
        const listDTO = await this.toListDTO(product);
        const reviewSummary = this.calculateReviewSummary(product.reviews);
        listDTO.rating = reviewSummary.averageRating;
        listDTO.totalReviews = reviewSummary.totalReviews;
        return {
            ...listDTO,
            description: product.description,
            specifications: product.specifications,
            sku: product.sku,
            weight: product.weight,
            category: product.category
                ? {
                    id: product.category.id,
                    name: product.category.name,
                    slug: product.category.slug,
                }
                : null,
            images: product.images?.map((img) => ({
                id: img.id,
                url: Helper.getFullImageUrl(img.url),
                altText: img.altText,
                isPrimary: img.isPrimary,
            })) || [],
            variants: product.variants?.map((variant) => {
                const basePrice = Number(product.discountPrice) || Number(product.price);
                const adjustment = Number(variant.priceAdjustment) || 0;
                return {
                    id: variant.id,
                    name: variant.name,
                    value: variant.value,
                    sku: variant.sku,
                    priceAdjustment: adjustment,
                    price: basePrice + adjustment,
                    stock: variant.stock,
                };
            }) || [],
            reviews: this.transformReviews(product.reviews),
            reviewSummary,
        };
    }
}
//# sourceMappingURL=product_transformer.js.map