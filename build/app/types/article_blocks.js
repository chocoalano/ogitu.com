export const BLOCK_REGISTRY = [
    {
        type: 'heading',
        label: 'Heading',
        icon: 'i-lucide-heading',
        category: 'text',
        description: 'Add a heading (H1-H6)',
    },
    {
        type: 'paragraph',
        label: 'Paragraph',
        icon: 'i-lucide-text',
        category: 'text',
        description: 'Add a text paragraph',
    },
    {
        type: 'list',
        label: 'List',
        icon: 'i-lucide-list',
        category: 'text',
        description: 'Add ordered or unordered list',
    },
    {
        type: 'quote',
        label: 'Quote',
        icon: 'i-lucide-quote',
        category: 'text',
        description: 'Add a blockquote',
    },
    {
        type: 'code',
        label: 'Code',
        icon: 'i-lucide-code',
        category: 'text',
        description: 'Add a code block',
    },
    {
        type: 'table',
        label: 'Table',
        icon: 'i-lucide-table',
        category: 'text',
        description: 'Add a data table',
    },
    {
        type: 'image',
        label: 'Image',
        icon: 'i-lucide-image',
        category: 'media',
        description: 'Add an image',
    },
    {
        type: 'gallery',
        label: 'Gallery',
        icon: 'i-lucide-images',
        category: 'media',
        description: 'Add an image gallery',
    },
    {
        type: 'embed',
        label: 'Embed',
        icon: 'i-lucide-video',
        category: 'media',
        description: 'Embed YouTube, TikTok, etc.',
    },
    {
        type: 'divider',
        label: 'Divider',
        icon: 'i-lucide-minus',
        category: 'layout',
        description: 'Add a horizontal divider',
    },
    {
        type: 'spacer',
        label: 'Spacer',
        icon: 'i-lucide-move-vertical',
        category: 'layout',
        description: 'Add vertical space',
    },
    {
        type: 'columns',
        label: 'Columns',
        icon: 'i-lucide-columns',
        category: 'layout',
        description: 'Create multi-column layout',
    },
    {
        type: 'alert',
        label: 'Alert',
        icon: 'i-lucide-alert-circle',
        category: 'interactive',
        description: 'Add an info/warning box',
    },
    {
        type: 'accordion',
        label: 'Accordion',
        icon: 'i-lucide-chevrons-down',
        category: 'interactive',
        description: 'Add collapsible FAQ',
    },
    {
        type: 'button',
        label: 'Button',
        icon: 'i-lucide-mouse-pointer-click',
        category: 'interactive',
        description: 'Add a call-to-action button',
    },
    {
        type: 'toc',
        label: 'Table of Contents',
        icon: 'i-lucide-list-tree',
        category: 'interactive',
        description: 'Auto-generated TOC',
    },
    {
        type: 'product-card',
        label: 'Product Card',
        icon: 'i-lucide-shopping-bag',
        category: 'commerce',
        description: 'Feature a single product',
    },
    {
        type: 'product-list',
        label: 'Product List',
        icon: 'i-lucide-layout-grid',
        category: 'commerce',
        description: 'Show multiple products',
    },
    {
        type: 'cta-box',
        label: 'CTA Box',
        icon: 'i-lucide-megaphone',
        category: 'commerce',
        description: 'Add promotional box',
    },
    {
        type: 'pros-cons',
        label: 'Pros & Cons',
        icon: 'i-lucide-scale',
        category: 'commerce',
        description: 'Product pros/cons list',
    },
    {
        type: 'rating-box',
        label: 'Rating Box',
        icon: 'i-lucide-star',
        category: 'commerce',
        description: 'Product rating summary',
    },
    {
        type: 'comparison-table',
        label: 'Comparison',
        icon: 'i-lucide-git-compare',
        category: 'commerce',
        description: 'Compare products',
    },
    {
        type: 'newsletter',
        label: 'Newsletter',
        icon: 'i-lucide-mail',
        category: 'embed',
        description: 'Newsletter signup form',
    },
    {
        type: 'author-box',
        label: 'Author Box',
        icon: 'i-lucide-user',
        category: 'embed',
        description: 'Show author info',
    },
    {
        type: 'related-articles',
        label: 'Related Articles',
        icon: 'i-lucide-newspaper',
        category: 'embed',
        description: 'Show related posts',
    },
    {
        type: 'html',
        label: 'HTML',
        icon: 'i-lucide-code-2',
        category: 'embed',
        description: 'Custom HTML code',
    },
];
export function generateBlockId() {
    return `block_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
export function createBlock(type, data) {
    return {
        id: generateBlockId(),
        type,
        data,
    };
}
export function extractPlainText(blocks) {
    const textParts = [];
    for (const block of blocks) {
        switch (block.type) {
            case 'heading':
            case 'paragraph':
                textParts.push(stripHtml(block.data.text));
                break;
            case 'list':
                for (const item of block.data.items) {
                    textParts.push(stripHtml(item.text));
                    if (item.children) {
                        textParts.push(...item.children.map((c) => stripHtml(c.text)));
                    }
                }
                break;
            case 'quote':
                textParts.push(stripHtml(block.data.text));
                if (block.data.citation)
                    textParts.push(block.data.citation);
                break;
            case 'alert':
                if (block.data.title)
                    textParts.push(block.data.title);
                textParts.push(stripHtml(block.data.text));
                break;
            case 'accordion':
                for (const item of block.data.items) {
                    textParts.push(item.title);
                    textParts.push(stripHtml(item.content));
                }
                break;
            case 'cta-box':
                textParts.push(block.data.title);
                if (block.data.description)
                    textParts.push(block.data.description);
                break;
            case 'table':
                textParts.push(...block.data.headers);
                for (const row of block.data.rows) {
                    textParts.push(...row);
                }
                break;
            case 'columns':
                textParts.push(extractPlainText(block.data.columns.flatMap((c) => c.blocks)));
                break;
        }
    }
    return textParts.filter(Boolean).join(' ');
}
function stripHtml(html) {
    return html.replace(/<[^>]*>/g, '').trim();
}
export function extractHeadings(blocks) {
    const headings = [];
    for (const block of blocks) {
        if (block.type === 'heading') {
            headings.push({
                id: block.data.anchor || block.id,
                text: stripHtml(block.data.text),
                level: block.data.level,
            });
        }
        else if (block.type === 'columns') {
            headings.push(...extractHeadings(block.data.columns.flatMap((c) => c.blocks)));
        }
    }
    return headings;
}
export function calculateReadTime(blocks) {
    const plainText = extractPlainText(blocks);
    const wordCount = plainText.split(/\s+/).filter(Boolean).length;
    const imageCount = blocks.filter((b) => b.type === 'image' || b.type === 'gallery').length;
    const readTimeMinutes = wordCount / 200 + (imageCount * 12) / 60;
    return Math.max(1, Math.ceil(readTimeMinutes));
}
//# sourceMappingURL=article_blocks.js.map