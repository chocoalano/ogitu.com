import Product from '#models/product'
import env from '#start/env'

export default class Helper {
  /**
   * Convert relative image URL to full URL
   */
  static getFullImageUrl(imageUrl: string | null | undefined): string {
    if (!imageUrl) {
      return 'https://placehold.co/400x400/1a1a2e/ffffff?text=No+Image'
    }

    // If already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl
    }

    // Build full URL from relative path
    const bucket = env.get('SPACES_BUCKET')
    const region = env.get('SPACES_REGION')
    const directory = env.get('SPACES_DIRECTORY')
    const nodeEnv = env.get('NODE_ENV')

    return `https://${bucket}.${region}.cdn.digitaloceanspaces.com/${directory}/${nodeEnv}${imageUrl}`
  }

  static async getProductImage(product: Product): Promise<string> {
    // Find primary image from preloaded images array
    const primaryImage = product.images?.find((img) => img.isPrimary) || product.images?.[0]
    return this.getFullImageUrl(primaryImage?.url)
  }
}
