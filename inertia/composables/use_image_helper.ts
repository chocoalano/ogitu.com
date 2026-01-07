/**
 * Composable for handling image URLs
 * Provides utility functions for image URL processing
 * Note: Backend already transforms image URLs to full CDN URLs via Helper.getFullImageUrl()
 */
export function useImageHelper() {
  /**
   * Check if URL is valid image URL (not placeholder)
   * @param url - URL to check
   * @returns Boolean indicating if URL is a valid image
   */
  const isValidImageUrl = (url: string | undefined | null): boolean => {
    if (!url) return false
    if (url.includes('placehold.co')) return false
    if (url === '/images/placeholder.png') return false
    return true
  }

  /**
   * Get image URL - returns the URL as-is since backend already transforms it
   * Falls back to placeholder if URL is invalid
   * @param url - The image URL to process
   * @param placeholder - Custom placeholder text (optional)
   * @returns Processed image URL
   */
  const getImageUrl = (
    url: string | undefined | null,
    placeholder: string = 'No Image'
  ): string => {
    if (!url || url.includes('placehold.co')) {
      return `https://placehold.co/100x100/1a1a2e/ffffff?text=${encodeURIComponent(placeholder)}`
    }
    // URL is already transformed by backend, return as-is
    return url
  }

  /**
   * Get category image URL
   * @param imageUrl - The category image URL
   * @returns Processed image URL with category-specific placeholder
   */
  const getCategoryImageUrl = (imageUrl: string | undefined | null): string => {
    return getImageUrl(imageUrl, 'Category')
  }

  /**
   * Get product image URL
   * @param imageUrl - The product image URL
   * @returns Processed image URL with product-specific placeholder
   */
  const getProductImageUrl = (imageUrl: string | undefined | null): string => {
    return getImageUrl(imageUrl, 'Product')
  }

  /**
   * Get user avatar URL
   * @param avatarUrl - The user avatar URL
   * @returns Processed image URL with avatar-specific placeholder
   */
  const getAvatarUrl = (avatarUrl: string | undefined | null): string => {
    return getImageUrl(avatarUrl, 'User')
  }

  return {
    getImageUrl,
    getCategoryImageUrl,
    getProductImageUrl,
    getAvatarUrl,
    isValidImageUrl,
  }
}
