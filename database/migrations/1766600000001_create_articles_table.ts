import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'articles'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      // Author reference (admin user who wrote the article)
      table.integer('author_id').unsigned().references('id').inTable('users').onDelete('SET NULL')

      // Basic info
      table.string('title', 255).notNullable()
      table.string('slug', 255).notNullable().unique()
      table.string('excerpt', 500).nullable() // Short description for listing

      // Page Builder Content - JSON blocks structure
      table.json('blocks').notNullable() // Array of content blocks
      table.text('content_plain', 'longtext').nullable() // Plain text version for search/SEO

      // SEO
      table.string('meta_title', 255).nullable()
      table.string('meta_description', 500).nullable()
      table.string('meta_keywords', 500).nullable()

      // Media
      table.string('thumbnail', 500).nullable() // Featured image
      table.string('banner', 500).nullable() // Banner image for detail page

      // Categorization
      table.string('category', 100).notNullable().defaultTo('tips') // tips, review, news, guide, promo
      table.json('tags').nullable() // Array of tags

      // Status
      table.enum('status', ['draft', 'published', 'archived']).defaultTo('draft')
      table.boolean('is_featured').defaultTo(false)
      table.boolean('is_pinned').defaultTo(false) // Pinned to top

      // Engagement
      table.integer('view_count').unsigned().defaultTo(0)
      table.integer('like_count').unsigned().defaultTo(0)
      table.integer('share_count').unsigned().defaultTo(0)

      // Reading
      table.integer('read_time').unsigned().defaultTo(5) // Estimated read time in minutes

      // Publishing
      table.timestamp('published_at').nullable()

      // Timestamps
      table.timestamp('created_at')
      table.timestamp('updated_at')

      // Indexes
      table.index(['status', 'published_at'])
      table.index(['category', 'status'])
      table.index(['is_featured', 'status'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
