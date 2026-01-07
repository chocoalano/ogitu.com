import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, beforeSave } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import string from '@adonisjs/core/helpers/string'
import type { ContentBlock, HeadingBlock } from '#types/article_blocks'
import { extractPlainText, calculateReadTime, extractHeadings } from '#types/article_blocks'

// Article categories type
export type ArticleCategory = 'tips' | 'review' | 'news' | 'guide' | 'promo'

// Article status type
export type ArticleStatus = 'draft' | 'published' | 'archived'

export default class Article extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare authorId: number | null

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare excerpt: string | null

  // Page builder blocks - main content
  @column({
    prepare: (value: ContentBlock[]) => JSON.stringify(value),
    consume: (value: string | ContentBlock[]) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value) as ContentBlock[]
        } catch {
          return []
        }
      }
      return value || []
    },
  })
  declare blocks: ContentBlock[]

  // Plain text content for search/SEO (auto-generated from blocks)
  @column()
  declare contentPlain: string | null

  @column()
  declare metaTitle: string | null

  @column()
  declare metaDescription: string | null

  @column()
  declare metaKeywords: string | null

  @column()
  declare thumbnail: string | null

  @column()
  declare banner: string | null

  @column()
  declare category: ArticleCategory

  @column({
    prepare: (value: string[]) => JSON.stringify(value),
    consume: (value: string | string[]) => {
      if (typeof value === 'string') {
        try {
          return JSON.parse(value) as string[]
        } catch {
          return []
        }
      }
      return value || []
    },
  })
  declare tags: string[]

  @column()
  declare status: ArticleStatus

  @column()
  declare isFeatured: boolean

  @column()
  declare isPinned: boolean

  @column()
  declare viewCount: number

  @column()
  declare likeCount: number

  @column()
  declare shareCount: number

  @column()
  declare readTime: number

  @column.dateTime()
  declare publishedAt: DateTime | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  // Relationships
  @belongsTo(() => User, {
    foreignKey: 'authorId',
  })
  declare author: BelongsTo<typeof User>

  // Hooks
  @beforeSave()
  static async generateSlug(article: Article) {
    if (article.$dirty.title && !article.$dirty.slug) {
      article.slug = string.slug(article.title, { lower: true })

      // Check for uniqueness
      const existing = await Article.query()
        .where('slug', article.slug)
        .whereNot('id', article.id || 0)
        .first()

      if (existing) {
        article.slug = `${article.slug}-${Date.now()}`
      }
    }
  }

  @beforeSave()
  static processBlocks(article: Article) {
    if (article.$dirty.blocks && article.blocks?.length > 0) {
      // Generate plain text from blocks for search/SEO
      article.contentPlain = extractPlainText(article.blocks)

      // Calculate read time from blocks
      article.readTime = calculateReadTime(article.blocks)
    }
  }

  @beforeSave()
  static setPublishedAt(article: Article) {
    if (article.$dirty.status && article.status === 'published' && !article.publishedAt) {
      article.publishedAt = DateTime.now()
    }
  }

  // Computed properties
  get isPublished(): boolean {
    return this.status === 'published' && this.publishedAt !== null
  }

  get formattedPublishedAt(): string | null {
    return this.publishedAt?.toFormat('dd LLLL yyyy') || null
  }

  get thumbnailUrl(): string {
    return this.thumbnail || '/images/default-article.jpg'
  }

  get bannerUrl(): string {
    return this.banner || this.thumbnailUrl
  }

  // Get table of contents from headings
  get tableOfContents(): Array<{ id: string; text: string; level: number }> {
    return extractHeadings(this.blocks || [])
  }

  // Get first paragraph as auto-excerpt
  get autoExcerpt(): string | null {
    if (this.excerpt) return this.excerpt

    const firstParagraph = this.blocks?.find((block) => block.type === 'paragraph')
    if (firstParagraph && firstParagraph.type === 'paragraph') {
      const text = firstParagraph.data.text.replace(/<[^>]*>/g, '')
      return text.length > 160 ? `${text.substring(0, 157)}...` : text
    }

    return null
  }

  // Get first heading
  get firstHeading(): string | null {
    const heading = this.blocks?.find((block) => block.type === 'heading') as
      | HeadingBlock
      | undefined
    return heading?.data.text || null
  }

  // Scopes as static methods
  static published() {
    return this.query().where('status', 'published').whereNotNull('publishedAt')
  }

  static featured() {
    return this.published().where('isFeatured', true)
  }

  static byCategory(category: string) {
    return this.published().where('category', category)
  }

  // Helper to increment view count
  async incrementViewCount(): Promise<void> {
    this.viewCount = (this.viewCount || 0) + 1
    await this.save()
  }

  // Helper to add a block
  addBlock(block: ContentBlock): void {
    if (!this.blocks) this.blocks = []
    this.blocks.push(block)
  }

  // Helper to remove a block by id
  removeBlock(blockId: string): void {
    if (!this.blocks) return
    this.blocks = this.blocks.filter((b) => b.id !== blockId)
  }

  // Helper to move a block
  moveBlock(blockId: string, newIndex: number): void {
    if (!this.blocks) return

    const currentIndex = this.blocks.findIndex((b) => b.id === blockId)
    if (currentIndex === -1) return

    const [block] = this.blocks.splice(currentIndex, 1)
    this.blocks.splice(newIndex, 0, block)
  }

  // Helper to update a block
  updateBlock(blockId: string, data: Record<string, unknown>): void {
    if (!this.blocks) return

    const block = this.blocks.find((b) => b.id === blockId)
    if (block) {
      block.data = { ...block.data, ...data } as ContentBlock['data']
    }
  }
}
