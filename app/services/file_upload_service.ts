import drive from '@adonisjs/drive/services/main'
import { MultipartFile } from '@adonisjs/core/bodyparser'
import env from '#start/env'

export interface UploadedFile {
  url: string
  key: string
  size: number
  mimeType: string
}

export interface UploadOptions {
  folder?: string
  slug?: string
  index?: number
}

export default class FileUploadService {
  /**
   * Get base path prefix from environment (directory/environment)
   */
  private static getBasePath(): string {
    const directory = env.get('SPACES_DIRECTORY', '')
    const nodeEnv = env.get('NODE_ENV', 'development')
    return directory ? `${directory}/${nodeEnv}` : nodeEnv
  }

  /**
   * Generate date prefix in format YYYYMMDDHHMMSS
   */
  private static generateDatePrefix(): string {
    const now = new Date()
    return (
      now.getFullYear().toString() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0')
    )
  }

  /**
   * Generate SEO-friendly filename with date prefix
   * Format: YYYYMMDDHHMMSS-slug-index.extension
   */
  private static generateSeoFilename(slug: string, extension: string, index: number = 0): string {
    const datePrefix = this.generateDatePrefix()

    // Clean slug - convert to lowercase, replace spaces with hyphens, remove special chars
    const cleanSlug = slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 50) // Limit slug length

    const indexSuffix = index > 0 ? `-${index}` : ''

    return `${datePrefix}-${cleanSlug}${indexSuffix}.${extension}`
  }

  /**
   * Upload a file to Spaces with SEO-friendly filename
   */
  static async upload(
    file: MultipartFile,
    options: UploadOptions | string = 'uploads'
  ): Promise<UploadedFile | null> {
    if (!file.tmpPath) {
      return null
    }

    // Handle backward compatibility - if string is passed, use as folder
    const opts: UploadOptions = typeof options === 'string' ? { folder: options } : options

    const folder = opts.folder || 'uploads'
    const basePath = this.getBasePath()

    try {
      const disk = drive.use('spaces')
      const extension = file.extname || file.clientName.split('.').pop() || 'bin'

      // Generate filename based on slug or use random
      let filename: string
      if (opts.slug) {
        filename = this.generateSeoFilename(opts.slug, extension, opts.index || 0)
      } else {
        // Fallback to date-based random name
        const datePrefix = this.generateDatePrefix()
        const random = Math.random().toString(36).substring(2, 8)
        filename = `${datePrefix}-${random}.${extension}`
      }

      // Full key with base path: directory/environment/folder/filename
      const fullKey = `${basePath}/${folder}/${filename}`
      // Relative key for database storage: /folder/filename
      const relativeKey = `/${folder}/${filename}`

      await disk.put(fullKey, await this.readFile(file.tmpPath), {
        contentType: file.type ? `${file.type}/${file.subtype}` : 'application/octet-stream',
      })

      const url = await disk.getUrl(fullKey)

      return {
        url,
        key: relativeKey,
        size: file.size,
        mimeType: file.type ? `${file.type}/${file.subtype}` : 'application/octet-stream',
      }
    } catch (error) {
      console.error('File upload error:', error)
      return null
    }
  }

  /**
   * Upload multiple files to Spaces with SEO-friendly filenames
   */
  static async uploadMany(
    files: MultipartFile[],
    options: UploadOptions | string = 'uploads'
  ): Promise<UploadedFile[]> {
    const results: UploadedFile[] = []

    // Handle backward compatibility
    const opts: UploadOptions = typeof options === 'string' ? { folder: options } : options

    let index = 0
    for (const file of files) {
      const result = await this.upload(file, {
        ...opts,
        index,
      })
      if (result) {
        results.push(result)
      }
      index++
    }

    return results
  }

  /**
   * Delete a file from Spaces
   * @param key - Relative key starting with / (e.g., /categories/filename.png)
   */
  static async delete(key: string): Promise<boolean> {
    try {
      const disk = drive.use('spaces')
      const basePath = this.getBasePath()
      // Remove leading slash from key and prepend basePath
      const cleanKey = key.startsWith('/') ? key.substring(1) : key
      const fullKey = `${basePath}/${cleanKey}`
      await disk.delete(fullKey)
      return true
    } catch (error) {
      console.error('File delete error:', error)
      return false
    }
  }

  /**
   * Delete multiple files from Spaces
   */
  static async deleteMany(keys: string[]): Promise<number> {
    let deleted = 0
    for (const key of keys) {
      if (await this.delete(key)) {
        deleted++
      }
    }
    return deleted
  }

  /**
   * Get key from URL
   */
  static getKeyFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url)
      // Remove leading slash and bucket name if present
      let path = urlObj.pathname
      if (path.startsWith('/')) {
        path = path.substring(1)
      }
      // If URL contains bucket name, extract the key
      const bucketPattern = /^[^/]+\/(.*)/
      const match = path.match(bucketPattern)
      return match ? match[1] : path
    } catch {
      // If not a valid URL, assume it's already a key
      return url.startsWith('/') ? url.substring(1) : url
    }
  }

  /**
   * Read file buffer
   */
  private static async readFile(filePath: string): Promise<Buffer> {
    const fs = await import('node:fs/promises')
    return fs.readFile(filePath)
  }

  /**
   * Check if a file exists in Spaces
   */
  static async exists(key: string): Promise<boolean> {
    try {
      const disk = drive.use('spaces')
      return await disk.exists(key)
    } catch {
      return false
    }
  }

  /**
   * Get public URL for a key
   */
  static async getUrl(key: string): Promise<string> {
    const disk = drive.use('spaces')
    return disk.getUrl(key)
  }
}
