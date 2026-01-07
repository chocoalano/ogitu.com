import env from '#start/env';
export default class Helper {
    static getFullImageUrl(imageUrl) {
        if (!imageUrl) {
            return 'https://placehold.co/400x400/1a1a2e/ffffff?text=No+Image';
        }
        if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
            return imageUrl;
        }
        const bucket = env.get('SPACES_BUCKET');
        const region = env.get('SPACES_REGION');
        const directory = env.get('SPACES_DIRECTORY');
        const nodeEnv = env.get('NODE_ENV');
        return `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${directory}/${nodeEnv}${imageUrl}`;
    }
    static async getProductImage(product) {
        const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0];
        return this.getFullImageUrl(primaryImage?.url);
    }
}
//# sourceMappingURL=helper.js.map