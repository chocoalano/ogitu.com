const CATEGORY_LABELS = {
    tips: 'Tips & Trik',
    review: 'Review Produk',
    news: 'Berita Vape',
    guide: 'Panduan',
    promo: 'Promo & Diskon',
};
export default class ArticleTransformer {
    static toListDTO(article) {
        const authorData = article.author
            ? {
                id: article.author.id,
                fullName: article.author.fullName || 'Anonymous',
                avatar: null,
            }
            : null;
        return {
            id: article.id,
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            thumbnail: article.thumbnailUrl,
            category: article.category,
            categoryLabel: CATEGORY_LABELS[article.category] || article.category,
            tags: article.tags || [],
            readTime: article.readTime || 0,
            viewCount: article.viewCount,
            likeCount: article.likeCount,
            publishedAt: article.publishedAt?.toISO() || null,
            author: authorData,
        };
    }
    static toListDTOs(articles) {
        return articles.map((article) => this.toListDTO(article));
    }
    static toDetailDTO(article) {
        return {
            ...this.toListDTO(article),
            blocks: article.blocks || [],
            contentPlain: article.contentPlain,
            tableOfContents: this.buildTOC(article.tableOfContents),
            banner: article.bannerUrl,
            metaTitle: article.metaTitle,
            metaDescription: article.metaDescription,
            metaKeywords: article.metaKeywords,
            shareCount: article.shareCount,
            isPinned: article.isPinned,
            isFeatured: article.isFeatured,
            formattedPublishedAt: article.formattedPublishedAt || '',
        };
    }
    static buildTOC(headings) {
        const toc = [];
        const stack = [];
        for (const heading of headings) {
            const item = {
                id: heading.id,
                text: heading.text,
                level: heading.level,
                children: [],
            };
            while (stack.length > 0 && stack[stack.length - 1].level >= heading.level) {
                stack.pop();
            }
            if (stack.length === 0) {
                toc.push(item);
            }
            else {
                const parent = stack[stack.length - 1];
                if (!parent.children)
                    parent.children = [];
                parent.children.push(item);
            }
            stack.push(item);
        }
        const cleanTOC = (items) => {
            return items.map((item) => ({
                id: item.id,
                text: item.text,
                level: item.level,
                ...(item.children && item.children.length > 0 ? { children: cleanTOC(item.children) } : {}),
            }));
        };
        return cleanTOC(toc);
    }
    static toPaginatedListDTO(result) {
        return {
            data: this.toListDTOs(result.data),
            meta: {
                total: result.meta.total,
                perPage: result.meta.perPage,
                currentPage: result.meta.currentPage,
                lastPage: result.meta.lastPage,
                firstPage: result.meta.firstPage,
                hasMorePages: result.meta.hasMorePages,
                hasPreviousPages: result.meta.hasPreviousPages,
            },
        };
    }
    static formatDate(date) {
        if (!date)
            return '';
        return new Date(date).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    }
    static getReadTimeLabel(minutes) {
        if (minutes < 1)
            return 'Kurang dari 1 menit';
        if (minutes === 1)
            return '1 menit baca';
        return `${minutes} menit baca`;
    }
}
//# sourceMappingURL=article_transformer.js.map