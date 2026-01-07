import vine from '@vinejs/vine'

/**
 * Validator for creating a new article
 */
export const articleValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(5).maxLength(200),
    slug: vine.string().trim().minLength(3).maxLength(200).optional(),
    excerpt: vine.string().trim().maxLength(500).optional(),
    blocks: vine.any().optional(),
    thumbnailUrl: vine.string().url().optional(),
    bannerUrl: vine.string().url().optional(),
    category: vine.enum(['tips', 'review', 'news', 'guide', 'promo']),
    tags: vine.any().optional(),
    status: vine.enum(['draft', 'published', 'archived']).optional(),
    isFeatured: vine.boolean().optional(),
    isPinned: vine.boolean().optional(),
    metaTitle: vine.string().trim().maxLength(70).optional(),
    metaDescription: vine.string().trim().maxLength(160).optional(),
    metaKeywords: vine.string().trim().maxLength(255).optional(),
    authorId: vine.number().positive().optional(),
  })
)

/**
 * Validator for updating an article
 */
export const articleUpdateValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(5).maxLength(200).optional(),
    slug: vine.string().trim().minLength(3).maxLength(200).optional(),
    excerpt: vine.string().trim().maxLength(500).optional(),
    blocks: vine.any().optional(),
    thumbnailUrl: vine.string().url().optional().nullable(),
    bannerUrl: vine.string().url().optional().nullable(),
    category: vine.enum(['tips', 'review', 'news', 'guide', 'promo']).optional(),
    tags: vine.any().optional(),
    status: vine.enum(['draft', 'published', 'archived']).optional(),
    isFeatured: vine.boolean().optional(),
    isPinned: vine.boolean().optional(),
    metaTitle: vine.string().trim().maxLength(70).optional().nullable(),
    metaDescription: vine.string().trim().maxLength(160).optional().nullable(),
    metaKeywords: vine.string().trim().maxLength(255).optional().nullable(),
    authorId: vine.number().positive().optional(),
  })
)

export type ArticleFormData = {
  title: string
  slug?: string
  excerpt?: string
  blocks: any[]
  thumbnailUrl?: string
  bannerUrl?: string
  category: 'tips' | 'review' | 'news' | 'guide' | 'promo'
  tags: string[]
  status: 'draft' | 'published' | 'archived'
  isFeatured: boolean
  isPinned: boolean
  metaTitle?: string
  metaDescription?: string
  metaKeywords?: string
  authorId?: number
}
