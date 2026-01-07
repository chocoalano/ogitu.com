var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, beforeSave } from '@adonisjs/lucid/orm';
import User from './user.js';
import string from '@adonisjs/core/helpers/string';
import { extractPlainText, calculateReadTime, extractHeadings } from '#types/article_blocks';
export default class Article extends BaseModel {
    static async generateSlug(article) {
        if (article.$dirty.title && !article.$dirty.slug) {
            article.slug = string.slug(article.title, { lower: true });
            const existing = await Article.query()
                .where('slug', article.slug)
                .whereNot('id', article.id || 0)
                .first();
            if (existing) {
                article.slug = `${article.slug}-${Date.now()}`;
            }
        }
    }
    static processBlocks(article) {
        if (article.$dirty.blocks && article.blocks?.length > 0) {
            article.contentPlain = extractPlainText(article.blocks);
            article.readTime = calculateReadTime(article.blocks);
        }
    }
    static setPublishedAt(article) {
        if (article.$dirty.status && article.status === 'published' && !article.publishedAt) {
            article.publishedAt = DateTime.now();
        }
    }
    get isPublished() {
        return this.status === 'published' && this.publishedAt !== null;
    }
    get formattedPublishedAt() {
        return this.publishedAt?.toFormat('dd LLLL yyyy') || null;
    }
    get thumbnailUrl() {
        return this.thumbnail || '/images/default-article.jpg';
    }
    get bannerUrl() {
        return this.banner || this.thumbnailUrl;
    }
    get tableOfContents() {
        return extractHeadings(this.blocks || []);
    }
    get autoExcerpt() {
        if (this.excerpt)
            return this.excerpt;
        const firstParagraph = this.blocks?.find((block) => block.type === 'paragraph');
        if (firstParagraph && firstParagraph.type === 'paragraph') {
            const text = firstParagraph.data.text.replace(/<[^>]*>/g, '');
            return text.length > 160 ? `${text.substring(0, 157)}...` : text;
        }
        return null;
    }
    get firstHeading() {
        const heading = this.blocks?.find((block) => block.type === 'heading');
        return heading?.data.text || null;
    }
    static published() {
        return this.query().where('status', 'published').whereNotNull('publishedAt');
    }
    static featured() {
        return this.published().where('isFeatured', true);
    }
    static byCategory(category) {
        return this.published().where('category', category);
    }
    async incrementViewCount() {
        this.viewCount = (this.viewCount || 0) + 1;
        await this.save();
    }
    addBlock(block) {
        if (!this.blocks)
            this.blocks = [];
        this.blocks.push(block);
    }
    removeBlock(blockId) {
        if (!this.blocks)
            return;
        this.blocks = this.blocks.filter((b) => b.id !== blockId);
    }
    moveBlock(blockId, newIndex) {
        if (!this.blocks)
            return;
        const currentIndex = this.blocks.findIndex((b) => b.id === blockId);
        if (currentIndex === -1)
            return;
        const [block] = this.blocks.splice(currentIndex, 1);
        this.blocks.splice(newIndex, 0, block);
    }
    updateBlock(blockId, data) {
        if (!this.blocks)
            return;
        const block = this.blocks.find((b) => b.id === blockId);
        if (block) {
            block.data = { ...block.data, ...data };
        }
    }
}
__decorate([
    column({ isPrimary: true }),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "authorId", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "excerpt", void 0);
__decorate([
    column({
        prepare: (value) => JSON.stringify(value),
        consume: (value) => {
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value);
                }
                catch {
                    return [];
                }
            }
            return value || [];
        },
    }),
    __metadata("design:type", Array)
], Article.prototype, "blocks", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "contentPlain", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "metaTitle", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "metaDescription", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "metaKeywords", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "thumbnail", void 0);
__decorate([
    column(),
    __metadata("design:type", Object)
], Article.prototype, "banner", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Article.prototype, "category", void 0);
__decorate([
    column({
        prepare: (value) => JSON.stringify(value),
        consume: (value) => {
            if (typeof value === 'string') {
                try {
                    return JSON.parse(value);
                }
                catch {
                    return [];
                }
            }
            return value || [];
        },
    }),
    __metadata("design:type", Array)
], Article.prototype, "tags", void 0);
__decorate([
    column(),
    __metadata("design:type", String)
], Article.prototype, "status", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Article.prototype, "isFeatured", void 0);
__decorate([
    column(),
    __metadata("design:type", Boolean)
], Article.prototype, "isPinned", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Article.prototype, "viewCount", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Article.prototype, "likeCount", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Article.prototype, "shareCount", void 0);
__decorate([
    column(),
    __metadata("design:type", Number)
], Article.prototype, "readTime", void 0);
__decorate([
    column.dateTime(),
    __metadata("design:type", Object)
], Article.prototype, "publishedAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true }),
    __metadata("design:type", DateTime)
], Article.prototype, "createdAt", void 0);
__decorate([
    column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", DateTime)
], Article.prototype, "updatedAt", void 0);
__decorate([
    belongsTo(() => User, {
        foreignKey: 'authorId',
    }),
    __metadata("design:type", Object)
], Article.prototype, "author", void 0);
__decorate([
    beforeSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Article]),
    __metadata("design:returntype", Promise)
], Article, "generateSlug", null);
__decorate([
    beforeSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Article]),
    __metadata("design:returntype", void 0)
], Article, "processBlocks", null);
__decorate([
    beforeSave(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Article]),
    __metadata("design:returntype", void 0)
], Article, "setPublishedAt", null);
//# sourceMappingURL=article.js.map