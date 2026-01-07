import type { HttpContext } from '@adonisjs/core/http'
import Article from '#models/article'
import User from '#models/user'
import { articleValidator, articleUpdateValidator } from '#validators/article'
import FileUploadService from '#services/file_upload_service'
import Helper from '#services/helper'

export default class ArticlesController {
  /**
   * Transform image URL - extract path from localhost URLs and convert to CDN
   */
  private transformImageUrl(url: string | null | undefined): string {
    if (!url) {
      return Helper.getFullImageUrl(null)
    }

    // Debug log
    console.log('Original URL:', url)

    // If it's a localhost URL, extract the path and convert to CDN
    if (url.includes('localhost') || url.includes('127.0.0.1')) {
      // Extract path after port number, e.g., http://localhost:3333/images/articles/file.jpg -> /images/articles/file.jpg
      const match = url.match(/localhost:\d+(.*)/) || url.match(/127\.0\.0\.1:\d+(.*)/)
      if (match && match[1]) {
        let relativePath = match[1]
        // Remove /images prefix if exists
        if (relativePath.startsWith('/images')) {
          relativePath = relativePath.replace('/images', '')
        }
        const result = Helper.getFullImageUrl(relativePath)
        console.log('Transformed URL:', result)
        return result
      }
      // Fallback: return placeholder if extraction fails
      return Helper.getFullImageUrl(null)
    }

    // Otherwise use the standard helper
    const result = Helper.getFullImageUrl(url)
    console.log('Transformed URL:', result)
    return result
  }
  /**
   * Display a listing of articles
   */
  async index({ request, inertia }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const search = request.input('search', '')
    const status = request.input('status', '')
    const category = request.input('category', '')
    const sortBy = request.input('sortBy', 'createdAt')
    const sortOrder = request.input('sortOrder', 'desc')

    const query = Article.query().preload('author')

    // Search filter
    if (search) {
      query.where((q) => {
        q.whereILike('title', `%${search}%`)
          .orWhereILike('excerpt', `%${search}%`)
          .orWhereILike('contentPlain', `%${search}%`)
      })
    }

    // Status filter
    if (status) {
      query.where('status', status)
    }

    // Category filter
    if (category) {
      query.where('category', category)
    }

    // Sorting
    query.orderBy(sortBy, sortOrder as 'asc' | 'desc')

    const articles = await query.paginate(page, perPage)
    // Transform function reference to avoid 'this' context issues
    const transformUrl = this.transformImageUrl.bind(this)

    // Transform articles to include full image URLs
    const serializedArticles = articles.serialize()
    const transformedArticles = {
      ...serializedArticles,
      data: serializedArticles.data.map((article: any) => ({
        ...article,
        thumbnail: transformUrl(article.thumbnail),
        banner: transformUrl(article.banner),
      })),
    }
    console.log('Transformed Articles:', JSON.stringify(transformedArticles.data[0], null, 2))
    // Get statistics
    const stats = {
      total: await Article.query().count('* as count').first(),
      published: await Article.query().where('status', 'published').count('* as count').first(),
      draft: await Article.query().where('status', 'draft').count('* as count').first(),
      featured: await Article.query().where('isFeatured', true).count('* as count').first(),
    }

    return inertia.render('admin/articles/index', {
      articles: transformedArticles,
      filters: { search, status, category, sortBy, sortOrder },
      stats: {
        total: Number(stats.total?.$extras.count || 0),
        published: Number(stats.published?.$extras.count || 0),
        draft: Number(stats.draft?.$extras.count || 0),
        featured: Number(stats.featured?.$extras.count || 0),
      },
      categories: [
        { value: 'tips', label: 'Tips & Trik' },
        { value: 'review', label: 'Review Produk' },
        { value: 'news', label: 'Berita Vape' },
        { value: 'guide', label: 'Panduan' },
        { value: 'promo', label: 'Promo & Diskon' },
      ],
    })
  }

  /**
   * Show the form for creating a new article
   */
  async create({ inertia }: HttpContext) {
    // Get authors for dropdown
    const authors = await User.query()
      .whereIn('role', ['admin', 'superadmin'])
      .select('id', 'fullName', 'email')
      .orderBy('fullName', 'asc')

    return inertia.render('admin/articles/create', {
      authors: authors.map((a) => ({
        id: a.id,
        fullName: a.fullName,
        email: a.email,
        avatar: null,
      })),
      categories: [
        { value: 'tips', label: 'Tips & Trik' },
        { value: 'review', label: 'Review Produk' },
        { value: 'news', label: 'Berita Vape' },
        { value: 'guide', label: 'Panduan' },
        { value: 'promo', label: 'Promo & Diskon' },
      ],
    })
  }

  /**
   * Store a newly created article
   */
  async store({ request, response, session, auth }: HttpContext) {
    try {
      const data = await request.validateUsing(articleValidator)

      // Handle thumbnail upload
      let thumbnailPath: string | null = null
      const thumbnail = request.file('thumbnail', {
        size: '5mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
      })

      if (thumbnail) {
        const uploaded = await FileUploadService.upload(thumbnail, {
          folder: 'articles/thumbnails',
          slug: data.slug || data.title,
        })
        if (uploaded) {
          thumbnailPath = Helper.getFullImageUrl(uploaded.key)
        }
      }

      // Handle banner upload
      let bannerPath: string | null = null
      const banner = request.file('banner', {
        size: '10mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
      })

      if (banner) {
        const uploaded = await FileUploadService.upload(banner, {
          folder: 'articles/banners',
          slug: data.slug || data.title,
        })
        if (uploaded) {
          bannerPath = Helper.getFullImageUrl(uploaded.key)
        }
      }

      // Parse blocks if sent as string
      let blocks = data.blocks || []
      if (typeof blocks === 'string') {
        try {
          blocks = JSON.parse(blocks)
        } catch {
          blocks = []
        }
      }

      // Parse tags if sent as string
      let tags = data.tags || []
      if (typeof tags === 'string') {
        try {
          tags = JSON.parse(tags)
        } catch {
          tags = []
        }
      }

      const article = await Article.create({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        blocks,
        thumbnail: thumbnailPath || data.thumbnailUrl,
        banner: bannerPath || data.bannerUrl,
        category: data.category,
        tags,
        status: data.status || 'draft',
        isFeatured: data.isFeatured || false,
        isPinned: data.isPinned || false,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        metaKeywords: data.metaKeywords,
        authorId: data.authorId || auth.user?.id,
      })

      session.flash('success', 'Artikel berhasil dibuat!')
      return response.redirect().toRoute('admin.articles.edit', { id: article.id })
    } catch (error) {
      console.error('Article create error:', error)
      session.flash('error', 'Gagal membuat artikel: ' + (error as Error).message)
      return response.redirect().back()
    }
  }

  /**
   * Display the specified article
   */
  async show({ params, inertia }: HttpContext) {
    const article = await Article.query().where('id', params.id).preload('author').firstOrFail()

    return inertia.render('admin/articles/show', {
      article: {
        ...article.serialize(),
        thumbnail: this.transformImageUrl(article.thumbnail),
        banner: this.transformImageUrl(article.banner),
        tableOfContents: article.tableOfContents,
        formattedPublishedAt: article.formattedPublishedAt,
      },
    })
  }

  /**
   * Show the form for editing the specified article
   */
  async edit({ params, inertia }: HttpContext) {
    const article = await Article.query().where('id', params.id).preload('author').firstOrFail()

    // Get authors for dropdown
    const authors = await User.query()
      .whereIn('role', ['admin', 'superadmin'])
      .select('id', 'fullName', 'email')
      .orderBy('fullName', 'asc')

    return inertia.render('admin/articles/edit', {
      article: {
        ...article.serialize(),
        thumbnail: this.transformImageUrl(article.thumbnail),
        banner: this.transformImageUrl(article.banner),
      },
      authors: authors.map((a) => ({
        id: a.id,
        fullName: a.fullName,
        email: a.email,
        avatar: null,
      })),
      categories: [
        { value: 'tips', label: 'Tips & Trik' },
        { value: 'review', label: 'Review Produk' },
        { value: 'news', label: 'Berita Vape' },
        { value: 'guide', label: 'Panduan' },
        { value: 'promo', label: 'Promo & Diskon' },
      ],
    })
  }

  /**
   * Update the specified article
   */
  async update({ params, request, response, session }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      const data = await request.validateUsing(articleUpdateValidator)

      // Handle thumbnail upload
      const thumbnail = request.file('thumbnail', {
        size: '5mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
      })

      if (thumbnail) {
        // Delete old thumbnail if exists
        if (article.thumbnail) {
          await FileUploadService.delete(article.thumbnail)
        }
        const uploaded = await FileUploadService.upload(thumbnail, {
          folder: 'articles/thumbnails',
          slug: data.slug || article.slug,
        })
        if (uploaded) {
          article.thumbnail = Helper.getFullImageUrl(uploaded.key)
        }
      } else if (data.thumbnailUrl) {
        article.thumbnail = data.thumbnailUrl
      }

      // Handle banner upload
      const banner = request.file('banner', {
        size: '10mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp'],
      })

      if (banner) {
        // Delete old banner if exists
        if (article.banner) {
          await FileUploadService.delete(article.banner)
        }
        const uploaded = await FileUploadService.upload(banner, {
          folder: 'articles/banners',
          slug: data.slug || article.slug,
        })
        if (uploaded) {
          article.banner = Helper.getFullImageUrl(uploaded.key)
        }
      } else if (data.bannerUrl) {
        article.banner = data.bannerUrl
      }

      // Parse blocks if sent as string
      let blocks = data.blocks
      if (typeof blocks === 'string') {
        try {
          blocks = JSON.parse(blocks)
        } catch {
          blocks = article.blocks
        }
      }

      // Parse tags if sent as string
      let tags = data.tags
      if (typeof tags === 'string') {
        try {
          tags = JSON.parse(tags)
        } catch {
          tags = article.tags
        }
      }

      // Update fields
      if (data.title !== undefined) article.title = data.title
      if (data.slug !== undefined) article.slug = data.slug
      if (data.excerpt !== undefined) article.excerpt = data.excerpt
      if (blocks !== undefined) article.blocks = blocks
      if (data.category !== undefined) article.category = data.category
      if (tags !== undefined) article.tags = tags
      if (data.status !== undefined) article.status = data.status
      if (data.isFeatured !== undefined) article.isFeatured = data.isFeatured
      if (data.isPinned !== undefined) article.isPinned = data.isPinned
      if (data.metaTitle !== undefined) article.metaTitle = data.metaTitle
      if (data.metaDescription !== undefined) article.metaDescription = data.metaDescription
      if (data.metaKeywords !== undefined) article.metaKeywords = data.metaKeywords
      if (data.authorId !== undefined) article.authorId = data.authorId

      await article.save()

      session.flash('success', 'Artikel berhasil diperbarui!')
      return response.redirect().back()
    } catch (error) {
      console.error('Article update error:', error)
      session.flash('error', 'Gagal memperbarui artikel: ' + (error as Error).message)
      return response.redirect().back()
    }
  }

  /**
   * Remove the specified article
   */
  async destroy({ params, response, session }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      await article.delete()

      session.flash('success', 'Artikel berhasil dihapus!')
      return response.redirect().toRoute('admin.articles.index')
    } catch (error) {
      console.error('Article delete error:', error)
      session.flash('error', 'Gagal menghapus artikel')
      return response.redirect().back()
    }
  }

  /**
   * Toggle article status (publish/unpublish)
   */
  async toggleStatus({ params, response, session }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      article.status = article.status === 'published' ? 'draft' : 'published'
      await article.save()

      session.flash(
        'success',
        `Artikel ${article.status === 'published' ? 'dipublikasikan' : 'disimpan sebagai draft'}!`
      )
      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Gagal mengubah status artikel')
      return response.redirect().back()
    }
  }

  /**
   * Toggle article featured status
   */
  async toggleFeatured({ params, response, session }: HttpContext) {
    try {
      const article = await Article.findOrFail(params.id)
      article.isFeatured = !article.isFeatured
      await article.save()

      session.flash(
        'success',
        `Artikel ${article.isFeatured ? 'ditandai sebagai unggulan' : 'dihapus dari unggulan'}!`
      )
      return response.redirect().back()
    } catch (error) {
      session.flash('error', 'Gagal mengubah status unggulan')
      return response.redirect().back()
    }
  }

  /**
   * Duplicate an article
   */
  async duplicate({ params, response, session }: HttpContext) {
    try {
      const original = await Article.findOrFail(params.id)

      const duplicate = await Article.create({
        title: `${original.title} (Copy)`,
        slug: `${original.slug}-copy-${Date.now()}`,
        excerpt: original.excerpt,
        blocks: original.blocks,
        thumbnail: original.thumbnail,
        banner: original.banner,
        category: original.category,
        tags: original.tags,
        status: 'draft',
        isFeatured: false,
        isPinned: false,
        metaTitle: original.metaTitle,
        metaDescription: original.metaDescription,
        metaKeywords: original.metaKeywords,
        authorId: original.authorId,
      })

      session.flash('success', 'Artikel berhasil diduplikasi!')
      return response.redirect().toRoute('admin.articles.edit', { id: duplicate.id })
    } catch (error) {
      session.flash('error', 'Gagal menduplikasi artikel')
      return response.redirect().back()
    }
  }

  /**
   * Upload image for article content
   */
  async uploadImage({ request, response }: HttpContext) {
    try {
      const image = request.file('image', {
        size: '5mb',
        extnames: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      })

      if (!image) {
        return response.badRequest({ success: false, message: 'No image provided' })
      }

      const uploaded = await FileUploadService.upload(image, {
        folder: 'articles/content',
      })

      if (!uploaded) {
        return response.internalServerError({
          success: false,
          message: 'Failed to upload image',
        })
      }

      return response.json({
        success: true,
        url: Helper.getFullImageUrl(uploaded.key),
      })
    } catch (error) {
      console.error('Image upload error:', error)
      return response.internalServerError({
        success: false,
        message: 'Failed to upload image',
      })
    }
  }
}
