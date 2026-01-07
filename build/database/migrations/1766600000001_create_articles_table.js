import { BaseSchema } from '@adonisjs/lucid/schema';
export default class extends BaseSchema {
    tableName = 'articles';
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('author_id').unsigned().references('id').inTable('users').onDelete('SET NULL');
            table.string('title', 255).notNullable();
            table.string('slug', 255).notNullable().unique();
            table.string('excerpt', 500).nullable();
            table.json('blocks').notNullable();
            table.text('content_plain', 'longtext').nullable();
            table.string('meta_title', 255).nullable();
            table.string('meta_description', 500).nullable();
            table.string('meta_keywords', 500).nullable();
            table.string('thumbnail', 500).nullable();
            table.string('banner', 500).nullable();
            table.string('category', 100).notNullable().defaultTo('tips');
            table.json('tags').nullable();
            table.enum('status', ['draft', 'published', 'archived']).defaultTo('draft');
            table.boolean('is_featured').defaultTo(false);
            table.boolean('is_pinned').defaultTo(false);
            table.integer('view_count').unsigned().defaultTo(0);
            table.integer('like_count').unsigned().defaultTo(0);
            table.integer('share_count').unsigned().defaultTo(0);
            table.integer('read_time').unsigned().defaultTo(5);
            table.timestamp('published_at').nullable();
            table.timestamp('created_at');
            table.timestamp('updated_at');
            table.index(['status', 'published_at']);
            table.index(['category', 'status']);
            table.index(['is_featured', 'status']);
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
//# sourceMappingURL=1766600000001_create_articles_table.js.map