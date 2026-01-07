import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import ProductImage from '#models/product_image'
import ProductVariant from '#models/product_variant'
import Category from '#models/category'
import db from '@adonisjs/lucid/services/db'
import app from '@adonisjs/core/services/app'
import FileUploadService from '#services/file_upload_service'
import BugReportService from '#services/bug_report_service'
import Helper from '#services/helper'
import logger from '@adonisjs/core/services/logger'

export default class ProductsController {
  private moduleName = 'ProductsController'

  private async reportAdmin(
    ctx: Pick<HttpContext, 'request' | 'auth'>,
    action: string,
    error: unknown,
    context?: Record<string, unknown>,
    severity: 'low' | 'medium' | 'high' | 'critical' = 'medium'
  ) {
    await BugReportService.logAdminError(ctx, this.moduleName, action, error, context, severity)
  }

  async index({ inertia, request, auth, session }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10)
    const search = request.input('search', '')
    const status = request.input('status', '')
    const categoryId = request.input('category', '')
    const condition = request.input('condition', '')
    const sortBy = request.input('sortBy', 'createdAt')
    const sortDirection = request.input('sortDirection', 'desc')

    try {
      let query = Product.query().preload('category').preload('images')

      if (search) {
        query = query.where((q) => {
          q.where('name', 'LIKE', `%${search}%`)
            .orWhere('sku', 'LIKE', `%${search}%`)
            .orWhere('brand', 'LIKE', `%${search}%`)
        })
      }

      if (status && status !== 'all') {
        query = query.where('status', status)
      }

      if (condition && condition !== 'all') {
        query = query.where('condition', condition)
      }

      if (categoryId) {
        query = query.where('categoryId', Number(categoryId))
      }

      // Apply sorting
      query = query.orderBy(sortBy, sortDirection as 'asc' | 'desc')

      const products = await query.paginate(page, perPage)
      const categories = await Category.query().where('isActive', true).orderBy('name', 'asc')

      // Get stats
      const statsQuery = await db
        .from('products')
        .select(
          db.raw('COUNT(*) as total'),
          db.raw("SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active"),
          db.raw("SUM(CASE WHEN status = 'inactive' THEN 1 ELSE 0 END) as inactive"),
          db.raw("SUM(CASE WHEN status = 'draft' THEN 1 ELSE 0 END) as draft"),
          db.raw('SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) as out_of_stock'),
          db.raw('SUM(CASE WHEN stock > 0 AND stock <= 10 THEN 1 ELSE 0 END) as low_stock')
        )
        .first()

      const stats = {
        total: Number(statsQuery?.total || 0),
        active: Number(statsQuery?.active || 0),
        inactive: Number(statsQuery?.inactive || 0),
        draft: Number(statsQuery?.draft || 0),
        outOfStock: Number(statsQuery?.out_of_stock || 0),
        lowStock: Number(statsQuery?.low_stock || 0),
      }

      // Transform products
      const transformedProducts = products.all().map((product) => {
        const primaryImg =
          product.images?.find((img) => img.isPrimary) || product.images?.[0] || null

        return {
          id: product.id,
          name: product.name,
          slug: product.slug,
          sku: product.sku,
          price: product.price,
          discountPrice: product.discountPrice,
          stock: product.stock,
          status: product.status,
          condition: product.condition,
          isFeatured: product.isFeatured,
          rating: product.rating || 0,
          totalReviews: product.totalReviews || 0,
          totalSold: product.totalSold || 0,
          viewCount: product.viewCount || 0,
          createdAt: product.createdAt.toISO(),
          updatedAt: product.updatedAt.toISO(),
          category: product.category
            ? { id: product.category.id, name: product.category.name, slug: product.category.slug }
            : null,
          primaryImage: primaryImg
            ? {
                id: primaryImg.id,
                url: Helper.getFullImageUrl(primaryImg.url),
                alt: primaryImg.altText,
                isPrimary: primaryImg.isPrimary,
                sortOrder: primaryImg.sortOrder,
              }
            : null,
        }
      })

      const meta = {
        total: products.total,
        perPage: products.perPage,
        currentPage: products.currentPage,
        lastPage: products.lastPage,
        firstPage: 1,
        firstPageUrl: products.getUrl(1),
        lastPageUrl: products.getUrl(products.lastPage),
        nextPageUrl: products.getNextPageUrl(),
        previousPageUrl: products.getPreviousPageUrl(),
        hasNext: products.hasMorePages,
        hasPrev: products.currentPage > 1,
      }

      return inertia.render('admin/products/index', {
        products: transformedProducts,
        meta,
        stats,
        categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
        filters: {
          search,
          status: status || 'all',
          condition: condition || 'all',
          category: categoryId ? Number(categoryId) : null,
          minPrice: null,
          maxPrice: null,
          sortBy,
          sortDirection,
        },
        admin: {
          id: 1,
          storeName: 'Admin',
          slug: 'admin',
          status: 'active',
        },
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'index',
        error,
        { page, perPage, search, status, categoryId, condition, sortBy, sortDirection },
        'medium'
      )

      session.flash('error', 'Gagal memuat data produk')

      return inertia.render('admin/products/index', {
        products: [],
        meta: { total: 0, perPage, currentPage: page, lastPage: 1, firstPage: 1 },
        stats: { total: 0, active: 0, inactive: 0, draft: 0, outOfStock: 0, lowStock: 0 },
        categories: [],
        filters: {
          search,
          status: status || 'all',
          condition: condition || 'all',
          category: categoryId ? Number(categoryId) : null,
          minPrice: null,
          maxPrice: null,
          sortBy,
          sortDirection,
        },
        admin: { id: 1, storeName: 'Admin', slug: 'admin', status: 'active' },
      })
    }
  }

  async show({ params, inertia, request, auth, session }: HttpContext) {
    const productId = params.id

    try {
      const product = await Product.query()
        .where('id', productId)
        .preload('category')
        .preload('images')
        .preload('variants')
        .preload('reviews', (query) => {
          query.preload('customer').orderBy('createdAt', 'desc').limit(10)
        })
        .first()

      if (!product) {
        return inertia.render('admin/products/not-found')
      }

      const primaryImg = product.images?.find((img) => img.isPrimary) || product.images?.[0] || null

      const transformedProduct = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        price: product.price,
        discountPrice: product.discountPrice,
        stock: product.stock,
        status: product.status,
        condition: product.condition,
        isFeatured: product.isFeatured,
        rating: product.rating || 0,
        totalReviews: product.totalReviews || 0,
        totalSold: product.totalSold || 0,
        viewCount: product.viewCount || 0,
        description: product.description,
        specifications: product.specifications,
        minOrder: product.minOrder,
        maxOrder: product.maxOrder,
        weight: product.weight,
        brand: product.brand,
        categoryId: product.categoryId,
        createdAt: product.createdAt.toISO(),
        updatedAt: product.updatedAt.toISO(),
        category: product.category
          ? { id: product.category.id, name: product.category.name, slug: product.category.slug }
          : null,
        primaryImage: primaryImg
          ? {
              id: primaryImg.id,
              url: Helper.getFullImageUrl(primaryImg.url),
              alt: primaryImg.altText,
              isPrimary: primaryImg.isPrimary,
              sortOrder: primaryImg.sortOrder,
            }
          : null,
        images:
          product.images?.map((img) => ({
            id: img.id,
            url: Helper.getFullImageUrl(img.url),
            alt: img.altText,
            isPrimary: img.isPrimary,
            sortOrder: img.sortOrder,
          })) || [],
        variants:
          product.variants?.map((v) => ({
            id: v.id,
            name: v.name,
            value: v.value,
            sku: v.sku,
            priceAdjustment: v.priceAdjustment,
            stock: v.stock,
            isActive: v.isActive,
          })) || [],
      }

      return inertia.render('admin/products/show', {
        product: transformedProduct,
        admin: {
          id: 1,
          storeName: 'Admin',
          slug: 'admin',
          status: 'active',
        },
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'show', error, { productId }, 'high')
      session.flash('error', 'Gagal memuat detail produk')
      return inertia.render('admin/products/not-found')
    }
  }

  async toggleStatus({ params, request, response, session, auth }: HttpContext) {
    const productId = params.id

    try {
      const product = await Product.find(productId)

      if (!product) {
        const errorMessage = `Produk dengan ID ${productId} tidak ditemukan`
        if (request.header('X-Requested-With') === 'XMLHttpRequest') {
          return response.status(404).json({ success: false, message: errorMessage })
        }
        session.flash('error', errorMessage)
        return response.redirect().back()
      }

      const oldStatus = product.status
      product.status = product.status === 'active' ? 'inactive' : 'active'
      await product.save()

      const message = `Produk "${product.name}" berhasil di${
        product.status === 'active' ? 'aktifkan' : 'nonaktifkan'
      }`

      if (request.header('X-Requested-With') === 'XMLHttpRequest') {
        return response.json({
          success: true,
          message,
          status: product.status,
          oldStatus,
          productName: product.name,
        })
      }

      session.flash('success', message)
      return response.redirect().back()
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'toggleStatus', error, { productId }, 'high')

      const errorMessage =
        'Gagal mengubah status produk. Silakan coba lagi atau hubungi administrator.'

      if (request.header('X-Requested-With') === 'XMLHttpRequest') {
        return response.status(500).json({
          success: false,
          message: errorMessage,
          error: app.inDev ? String(error) : undefined,
        })
      }
      session.flash('error', errorMessage)
      return response.redirect().back()
    }
  }

  async toggleFeatured({ params, request, auth, response, session }: HttpContext) {
    const productId = params.id

    try {
      const product = await Product.findOrFail(productId)
      product.isFeatured = !product.isFeatured
      await product.save()

      session.flash(
        'success',
        `Produk berhasil ${product.isFeatured ? 'ditambahkan ke' : 'dihapus dari'} featured`
      )
      return response.redirect().back()
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'toggleFeatured', error, { productId }, 'medium')
      session.flash('error', 'Gagal mengubah status featured produk')
      return response.redirect().back()
    }
  }

  async destroy({ params, request, response, session, auth }: HttpContext) {
    const productId = params.id

    try {
      const product = await Product.query().where('id', productId).preload('images').first()

      if (!product) {
        const errorMessage = `Produk dengan ID ${productId} tidak ditemukan`
        if (request.header('X-Requested-With') === 'XMLHttpRequest') {
          return response.status(404).json({ success: false, message: errorMessage })
        }
        session.flash('error', errorMessage)
        return response.redirect().back()
      }

      // Delete product images (best-effort)
      if (product.images && product.images.length > 0) {
        for (const image of product.images) {
          if (!image.url) continue
          try {
            await FileUploadService.delete(image.url)
          } catch (deleteErr) {
            await this.reportAdmin(
              { request, auth },
              'destroy.deleteImage',
              deleteErr,
              { productId: product.id, imageId: image.id, imageKey: image.url },
              'low'
            )
          }
        }
      }

      const productName = product.name
      await product.delete()

      if (request.header('X-Requested-With') === 'XMLHttpRequest') {
        return response.json({ success: true, message: `Produk "${productName}" berhasil dihapus` })
      }

      session.flash('success', `Produk "${productName}" berhasil dihapus`)
      return response.redirect().back()
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'destroy', error, { productId }, 'high')

      const errorMessage = 'Gagal menghapus produk. Silakan coba lagi atau hubungi administrator.'

      if (request.header('X-Requested-With') === 'XMLHttpRequest') {
        return response.status(500).json({
          success: false,
          message: errorMessage,
          error: app.inDev ? String(error) : undefined,
        })
      }
      session.flash('error', errorMessage)
      return response.redirect().back()
    }
  }

  async duplicate({ params, request, response, auth }: HttpContext) {
    const productId = params.id

    try {
      const product = await Product.query()
        .where('id', productId)
        .preload('images')
        .preload('variants')
        .first()

      if (!product) {
        return response.status(404).json({
          success: false,
          message: `Produk dengan ID ${productId} tidak ditemukan`,
        })
      }

      // Generate new SKU with timestamp
      const now = new Date()
      const dateStr =
        now.getFullYear().toString() +
        (now.getMonth() + 1).toString().padStart(2, '0') +
        now.getDate().toString().padStart(2, '0')

      const lastProduct = await Product.query()
        .where('sku', 'LIKE', `SKU-${dateStr}%`)
        .orderBy('sku', 'desc')
        .first()

      let counter = 1
      if (lastProduct) {
        const lastNumber = Number.parseInt(lastProduct.sku.slice(-4), 10)
        counter = Number.isNaN(lastNumber) ? 1 : lastNumber + 1
      }

      const newSku = `SKU-${dateStr}${counter.toString().padStart(4, '0')}`

      // Generate new slug
      const baseSlug = product.slug + '-copy'
      let newSlug = baseSlug
      let slugCounter = 1
      while (await Product.findBy('slug', newSlug)) {
        newSlug = `${baseSlug}-${slugCounter}`
        slugCounter++
      }

      const newProduct = await Product.create({
        name: `${product.name} (Copy)`,
        slug: newSlug,
        sku: newSku,
        description: product.description,
        specifications: product.specifications,
        price: product.price,
        discountPrice: product.discountPrice,
        stock: product.stock,
        minOrder: product.minOrder,
        maxOrder: product.maxOrder,
        weight: product.weight,
        brand: product.brand,
        categoryId: product.categoryId,
        status: 'draft',
        condition: product.condition,
        isFeatured: false,
      })

      if (product.variants && product.variants.length > 0) {
        for (let i = 0; i < product.variants.length; i++) {
          const variant = product.variants[i]
          const variantSku = `SKUV-${dateStr}${(counter + i).toString().padStart(4, '0')}`

          await ProductVariant.create({
            productId: newProduct.id,
            name: variant.name,
            value: variant.value,
            sku: variantSku,
            priceAdjustment: variant.priceAdjustment,
            stock: variant.stock,
            isActive: variant.isActive,
          })
        }
      }

      return response.json({
        success: true,
        message: `Produk "${product.name}" berhasil diduplikasi menjadi "${newProduct.name}"`,
        productId: newProduct.id,
        productName: newProduct.name,
        sku: newSku,
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'duplicate', error, { productId }, 'high')
      logger.error('Error duplicating product:', error)

      return response.status(500).json({
        success: false,
        message: 'Gagal menduplikasi produk. Silakan coba lagi atau hubungi administrator.',
        error: app.inDev ? String(error) : undefined,
      })
    }
  }

  async create({ inertia, request, auth, session }: HttpContext) {
    try {
      const categories = await Category.query().where('isActive', true).orderBy('name', 'asc')

      return inertia.render('admin/products/create', {
        categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
        admin: { id: 1, storeName: 'Admin', slug: 'admin', status: 'active' },
        isDev: app.inDev,
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'create', error, {}, 'medium')
      session.flash('error', 'Gagal memuat halaman tambah produk')
      return inertia.render('admin/products/create', {
        categories: [],
        admin: { id: 1, storeName: 'Admin', slug: 'admin', status: 'active' },
        isDev: app.inDev,
      })
    }
  }

  async store({ request, auth, response }: HttpContext) {
    let name: string | undefined
    let sku: string | undefined

    try {
      const data = request.only([
        'name',
        'description',
        'shortDescription',
        'price',
        'discountPrice',
        'stock',
        'sku',
        'brand',
        'weight',
        'categoryId',
        'status',
        'condition',
        'isFeatured',
      ])

      name = data.name
      sku = data.sku

      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const product = await Product.create({
        ...data,
        slug,
        categoryId: data.categoryId ? Number(data.categoryId) : null,
        price: Number(data.price),
        discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
        stock: Number(data.stock || 0),
        weight: data.weight ? Number(data.weight) : undefined,
        isFeatured: Boolean(data.isFeatured),
      })

      // Handle image uploads
      const newImages = request.files('newImages', {
        size: '5mb',
        extnames: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      })

      const newImagesMeta = request.input('newImagesMeta')
      let imageMeta: { isPrimary: boolean; sortOrder: number }[] = []
      try {
        imageMeta = newImagesMeta ? JSON.parse(newImagesMeta) : []
      } catch {
        imageMeta = []
      }

      if (newImages && newImages.length > 0) {
        for (const [i, file] of newImages.entries()) {
          const meta = imageMeta[i] || { isPrimary: i === 0, sortOrder: i }
          const uploaded = await FileUploadService.upload(file, {
            folder: 'products',
            slug,
            index: i,
          })

          if (uploaded) {
            await ProductImage.create({
              productId: product.id,
              url: uploaded.key,
              altText: data.name,
              isPrimary: meta.isPrimary,
              sortOrder: meta.sortOrder,
            })
          }
        }
      }

      // Handle variants
      const variantsData = request.input('variants')
      if (variantsData) {
        try {
          const variants = JSON.parse(variantsData)
          if (Array.isArray(variants) && variants.length > 0) {
            for (const variant of variants) {
              await ProductVariant.create({
                productId: product.id,
                name: variant.name || '',
                value: variant.value || '',
                sku: variant.sku || '',
                priceAdjustment: Number(variant.priceAdjustment) || 0,
                stock: Number(variant.stock) || 0,
                isActive: variant.isActive !== false,
              })
            }
          }
        } catch (e) {
          // parsing variants error bukan fatal, tapi tetap bagus di log app
          logger.error('Error parsing variants:', e)
        }
      }

      return response.json({
        success: true,
        message: 'Produk berhasil dibuat',
        product: { id: product.id },
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'store',
        error,
        {
          name,
          sku,
          categoryId: request.input('categoryId'),
          status: request.input('status'),
        },
        'high'
      )

      logger.error('Store product error:', error)

      return response.json({
        success: false,
        message: 'Gagal menyimpan produk',
        errors: {},
        error: app.inDev ? String(error) : undefined,
      })
    }
  }

  async edit({ params, inertia, request, auth, session }: HttpContext) {
    const productId = params.id

    try {
      const product = await Product.query()
        .where('id', productId)
        .preload('category')
        .preload('images')
        .preload('variants')
        .first()

      if (!product) {
        return inertia.render('admin/products/not-found')
      }

      const categories = await Category.query().where('isActive', true).orderBy('name', 'asc')

      const transformedProduct = {
        ...product.serialize(),
        images:
          product.images?.map((img) => ({
            id: img.id,
            url: Helper.getFullImageUrl(img.url),
            altText: img.altText,
            isPrimary: img.isPrimary,
            sortOrder: img.sortOrder,
          })) || [],
      }

      return inertia.render('admin/products/edit', {
        product: transformedProduct,
        categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
      })
    } catch (error) {
      await this.reportAdmin({ request, auth }, 'edit', error, { productId }, 'high')
      session.flash('error', 'Gagal memuat halaman edit produk')
      return inertia.render('admin/products/not-found')
    }
  }

  async update({ params, request, auth, response }: HttpContext) {
    const productId = params.id

    try {
      const product = await Product.findOrFail(productId)

      const data = request.only([
        'name',
        'description',
        'shortDescription',
        'price',
        'discountPrice',
        'stock',
        'sku',
        'brand',
        'weight',
        'categoryId',
        'status',
        'condition',
        'isFeatured',
      ])

      if (data.name && data.name !== product.name) {
        product.slug = data.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      }

      product.merge({
        ...data,
        categoryId: data.categoryId ? Number(data.categoryId) : null,
        price: Number(data.price),
        discountPrice: data.discountPrice ? Number(data.discountPrice) : null,
        stock: Number(data.stock || 0),
        weight: data.weight ? Number(data.weight) : undefined,
        isFeatured: Boolean(data.isFeatured),
      })

      await product.save()

      // Handle deleted images
      const deletedImages = request.input('deletedImages')
      if (deletedImages) {
        try {
          const deletedIds = JSON.parse(deletedImages)
          if (Array.isArray(deletedIds) && deletedIds.length > 0) {
            const imagesToDelete = await ProductImage.query()
              .where('productId', product.id)
              .whereIn('id', deletedIds)

            for (const image of imagesToDelete) {
              if (!image.url) continue
              try {
                await FileUploadService.delete(image.url)
              } catch (deleteErr) {
                await this.reportAdmin(
                  { request, auth },
                  'update.deleteImage',
                  deleteErr,
                  { productId: product.id, imageId: image.id, imageKey: image.url },
                  'low'
                )
              }
            }

            await ProductImage.query()
              .where('productId', product.id)
              .whereIn('id', deletedIds)
              .delete()
          }
        } catch {
          // ignore parse errors
        }
      }

      // Handle new image uploads
      const newImages = request.files('newImages', {
        size: '5mb',
        extnames: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      })

      const newImagesMeta = request.input('newImagesMeta')
      let imageMeta: { isPrimary: boolean; sortOrder: number }[] = []
      try {
        imageMeta = newImagesMeta ? JSON.parse(newImagesMeta) : []
      } catch {
        imageMeta = []
      }

      if (newImages && newImages.length > 0) {
        const existingImages = await ProductImage.query()
          .where('productId', product.id)
          .orderBy('sortOrder', 'desc')
          .first()

        const startSortOrder = existingImages ? existingImages.sortOrder + 1 : 0

        for (const [i, file] of newImages.entries()) {
          const meta = imageMeta[i] || { isPrimary: false, sortOrder: startSortOrder + i }

          const uploaded = await FileUploadService.upload(file, {
            folder: 'products',
            slug: product.slug,
            index: startSortOrder + i,
          })

          if (uploaded) {
            if (meta.isPrimary) {
              await ProductImage.query().where('productId', product.id).update({ isPrimary: false })
            }

            await ProductImage.create({
              productId: product.id,
              url: uploaded.key,
              altText: product.name,
              isPrimary: meta.isPrimary,
              sortOrder: meta.sortOrder,
            })
          }
        }
      }

      // Update existing images meta
      const existingImagesMeta = request.input('existingImagesMeta')
      if (existingImagesMeta) {
        try {
          const metaList = JSON.parse(existingImagesMeta)
          for (const meta of metaList) {
            if (meta.id && meta.isPrimary !== undefined) {
              await ProductImage.query()
                .where('id', meta.id)
                .where('productId', product.id)
                .update({
                  isPrimary: meta.isPrimary,
                  sortOrder: meta.sortOrder ?? 0,
                })
            }
          }
        } catch {
          // ignore parse errors
        }
      }

      // Handle deleted variants
      const deletedVariantIds = request.input('deletedVariantIds')
      if (deletedVariantIds) {
        try {
          const deletedIds = JSON.parse(deletedVariantIds)
          if (Array.isArray(deletedIds) && deletedIds.length > 0) {
            await ProductVariant.query()
              .where('productId', product.id)
              .whereIn('id', deletedIds)
              .delete()
          }
        } catch {
          // ignore parse errors
        }
      }

      // Handle variants (create new, update existing)
      const variantsData = request.input('variants')
      if (variantsData) {
        try {
          const variants = JSON.parse(variantsData)
          if (Array.isArray(variants)) {
            for (const variant of variants) {
              if (variant.id) {
                await ProductVariant.query()
                  .where('id', variant.id)
                  .where('productId', product.id)
                  .update({
                    name: variant.name || '',
                    value: variant.value || '',
                    sku: variant.sku || '',
                    priceAdjustment: Number(variant.priceAdjustment) || 0,
                    stock: Number(variant.stock) || 0,
                    isActive: variant.isActive !== false,
                  })
              } else {
                await ProductVariant.create({
                  productId: product.id,
                  name: variant.name || '',
                  value: variant.value || '',
                  sku: variant.sku || '',
                  priceAdjustment: Number(variant.priceAdjustment) || 0,
                  stock: Number(variant.stock) || 0,
                  isActive: variant.isActive !== false,
                })
              }
            }
          }
        } catch (e) {
          logger.error('Error processing variants:', e)
        }
      }

      return response.json({
        success: true,
        message: 'Produk berhasil diupdate',
        product: { id: product.id },
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'update',
        error,
        { productId, name: request.input('name'), sku: request.input('sku') },
        'high'
      )

      logger.error('Update product error:', error)

      return response.json({
        success: false,
        message: 'Gagal mengupdate produk',
        errors: {},
        error: app.inDev ? String(error) : undefined,
      })
    }
  }

  async inventory({ inertia, request, auth, session }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 20)
    const search = request.input('search', '')
    const status = request.input('status', '')
    const categoryId = request.input('categoryId', '')
    const stockStatus = request.input('stockStatus', '')

    try {
      let query = Product.query()
        .preload('category')
        .preload('images')
        .preload('variants')
        .select('*')

      if (search) {
        query = query.where((q) => {
          q.where('name', 'LIKE', `%${search}%`).orWhere('sku', 'LIKE', `%${search}%`)
        })
      }

      if (status) query = query.where('status', status)
      if (categoryId) query = query.where('categoryId', Number(categoryId))

      if (stockStatus === 'in_stock') {
        query = query.where('stock', '>', 10)
      } else if (stockStatus === 'low_stock') {
        query = query.where('stock', '>', 0).where('stock', '<=', 10)
      } else if (stockStatus === 'out_of_stock') {
        query = query.where('stock', '<=', 0)
      }

      query = query.orderBy('stock', 'asc')

      const products = await query.paginate(page, perPage)
      const categories = await Category.query().where('isActive', true).orderBy('name', 'asc')

      const statsQuery = await db
        .from('products')
        .select(
          db.raw('COUNT(*) as total_products'),
          db.raw('SUM(CASE WHEN stock > 10 THEN 1 ELSE 0 END) as in_stock'),
          db.raw('SUM(CASE WHEN stock > 0 AND stock <= 10 THEN 1 ELSE 0 END) as low_stock'),
          db.raw('SUM(CASE WHEN stock <= 0 THEN 1 ELSE 0 END) as out_of_stock')
        )
        .first()

      const variantStatsQuery = await db.from('product_variants').count('* as total').first()

      const stats = {
        totalProducts: Number(statsQuery?.total_products || 0),
        inStock: Number(statsQuery?.in_stock || 0),
        lowStock: Number(statsQuery?.low_stock || 0),
        outOfStock: Number(statsQuery?.out_of_stock || 0),
        totalVariants: Number(variantStatsQuery?.total || 0),
      }

      const transformedProducts = products.all().map((product) => {
        const variants = product.variants || []
        const totalVariantStock = variants.reduce((sum, v) => sum + (v.stock || 0), 0)
        const primaryImg =
          product.images?.find((img) => img.isPrimary) || product.images?.[0] || null

        return {
          id: product.id,
          name: product.name,
          sku: product.sku,
          price: product.price,
          discountPrice: product.discountPrice,
          stock: product.stock,
          status: product.status,
          category: product.category
            ? { id: product.category.id, name: product.category.name }
            : null,
          primaryImage: primaryImg
            ? {
                id: primaryImg.id,
                url: Helper.getFullImageUrl(primaryImg.url),
                alt: primaryImg.altText,
                isPrimary: primaryImg.isPrimary,
                sortOrder: primaryImg.sortOrder,
              }
            : null,
          variants: variants.map((v) => ({
            id: v.id,
            name: v.name,
            value: v.value,
            sku: v.sku,
            stock: v.stock,
            priceAdjustment: v.priceAdjustment,
            isActive: v.isActive,
          })),
          totalVariantStock,
          hasVariants: variants.length > 0,
        }
      })

      const meta = {
        total: products.total,
        perPage: products.perPage,
        currentPage: products.currentPage,
        lastPage: products.lastPage,
        firstPage: 1,
      }

      return inertia.render('admin/products/inventory', {
        products: transformedProducts,
        meta,
        stats,
        categories: categories.map((c) => ({ id: c.id, name: c.name, slug: c.slug })),
        filters: {
          search,
          status: status || undefined,
          categoryId: categoryId ? Number(categoryId) : undefined,
          stockStatus: stockStatus || undefined,
        },
        admin: { id: 1, storeName: 'Admin', slug: 'admin', status: 'active' },
      })
    } catch (error) {
      await this.reportAdmin(
        { request, auth },
        'inventory',
        error,
        { page, perPage, search, status, categoryId, stockStatus },
        'medium'
      )

      session.flash('error', 'Gagal memuat data inventory')

      return inertia.render('admin/products/inventory', {
        products: [],
        meta: { total: 0, perPage, currentPage: page, lastPage: 1, firstPage: 1 },
        stats: { totalProducts: 0, inStock: 0, lowStock: 0, outOfStock: 0, totalVariants: 0 },
        categories: [],
        filters: {
          search,
          status: status || undefined,
          categoryId: categoryId ? Number(categoryId) : undefined,
          stockStatus: stockStatus || undefined,
        },
        admin: { id: 1, storeName: 'Admin', slug: 'admin', status: 'active' },
      })
    }
  }

  async updateStock({ request, auth, response }: HttpContext) {
    try {
      const updates = request.input('updates', [])

      for (const update of updates) {
        const { productId, stock, variantStocks } = update

        if (typeof stock === 'number') {
          await Product.query().where('id', productId).update({ stock })
        }

        if (variantStocks && Array.isArray(variantStocks)) {
          for (const variantUpdate of variantStocks) {
            const { variantId, stock: variantStock } = variantUpdate
            if (typeof variantStock === 'number') {
              await ProductVariant.query().where('id', variantId).update({ stock: variantStock })
            }
          }
        }
      }

      return response.json({ success: true, message: 'Stok berhasil diperbarui' })
    } catch (error) {
      // jangan log payload updates full (bisa besar), cukup ringkasannya
      const updates = request.input('updates', [])
      const sample = Array.isArray(updates) ? updates.slice(0, 3) : []

      await this.reportAdmin(
        { request, auth },
        'updateStock',
        error,
        {
          updatesCount: Array.isArray(updates) ? updates.length : 0,
          sample,
        },
        'high'
      )

      logger.error('Update stock error:', error)

      return response.json({
        success: false,
        message: 'Gagal memperbarui stok',
        error: app.inDev ? String(error) : undefined,
      })
    }
  }
}
