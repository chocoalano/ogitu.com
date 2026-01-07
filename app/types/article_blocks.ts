/**
 * Article Page Builder - Block Types
 * Defines all block types for the article page builder system
 */

// Base block interface
export interface BaseBlock {
  id: string
  type: BlockType
  data: Record<string, unknown>
}

// All available block types
export type BlockType =
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'gallery'
  | 'list'
  | 'quote'
  | 'code'
  | 'table'
  | 'divider'
  | 'embed'
  | 'alert'
  | 'accordion'
  | 'button'
  | 'product-card'
  | 'product-list'
  | 'cta-box'
  | 'pros-cons'
  | 'rating-box'
  | 'comparison-table'
  | 'toc' // Table of Contents
  | 'author-box'
  | 'related-articles'
  | 'newsletter'
  | 'spacer'
  | 'columns'
  | 'html' // Raw HTML for flexibility

// Heading Block
export interface HeadingBlock extends BaseBlock {
  type: 'heading'
  data: {
    text: string
    level: 1 | 2 | 3 | 4 | 5 | 6
    alignment?: 'left' | 'center' | 'right'
    anchor?: string // For table of contents
  }
}

// Paragraph Block
export interface ParagraphBlock extends BaseBlock {
  type: 'paragraph'
  data: {
    text: string // Can contain inline HTML (bold, italic, links)
    alignment?: 'left' | 'center' | 'right' | 'justify'
    dropCap?: boolean // First letter large
  }
}

// Image Block
export interface ImageBlock extends BaseBlock {
  type: 'image'
  data: {
    src: string
    alt: string
    caption?: string
    width?: number
    height?: number
    alignment?: 'left' | 'center' | 'right' | 'full'
    link?: string
    lightbox?: boolean
  }
}

// Gallery Block
export interface GalleryBlock extends BaseBlock {
  type: 'gallery'
  data: {
    images: Array<{
      src: string
      alt: string
      caption?: string
    }>
    columns: 2 | 3 | 4
    gap?: 'sm' | 'md' | 'lg'
    lightbox?: boolean
  }
}

// List Block
export interface ListBlock extends BaseBlock {
  type: 'list'
  data: {
    style: 'ordered' | 'unordered' | 'checklist'
    items: Array<{
      text: string
      checked?: boolean // For checklist
      children?: Array<{ text: string; checked?: boolean }>
    }>
  }
}

// Quote/Blockquote Block
export interface QuoteBlock extends BaseBlock {
  type: 'quote'
  data: {
    text: string
    citation?: string
    style?: 'default' | 'large' | 'bordered' | 'highlighted'
  }
}

// Code Block
export interface CodeBlock extends BaseBlock {
  type: 'code'
  data: {
    code: string
    language?: string
    filename?: string
    showLineNumbers?: boolean
    highlightLines?: number[]
  }
}

// Table Block
export interface TableBlock extends BaseBlock {
  type: 'table'
  data: {
    headers: string[]
    rows: string[][]
    striped?: boolean
    bordered?: boolean
    compact?: boolean
  }
}

// Divider Block
export interface DividerBlock extends BaseBlock {
  type: 'divider'
  data: {
    style?: 'solid' | 'dashed' | 'dotted' | 'gradient'
    spacing?: 'sm' | 'md' | 'lg'
  }
}

// Embed Block (YouTube, TikTok, Instagram, etc.)
export interface EmbedBlock extends BaseBlock {
  type: 'embed'
  data: {
    url: string
    provider?: 'youtube' | 'tiktok' | 'instagram' | 'twitter' | 'vimeo' | 'custom'
    caption?: string
    aspectRatio?: '16:9' | '4:3' | '1:1' | '9:16'
  }
}

// Alert/Callout Block
export interface AlertBlock extends BaseBlock {
  type: 'alert'
  data: {
    title?: string
    text: string
    type: 'info' | 'success' | 'warning' | 'error' | 'tip'
    icon?: string
    dismissible?: boolean
  }
}

// Accordion/FAQ Block
export interface AccordionBlock extends BaseBlock {
  type: 'accordion'
  data: {
    items: Array<{
      title: string
      content: string
      defaultOpen?: boolean
    }>
    allowMultiple?: boolean
    style?: 'default' | 'bordered' | 'separated'
  }
}

// Button/CTA Block
export interface ButtonBlock extends BaseBlock {
  type: 'button'
  data: {
    text: string
    url: string
    style?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    icon?: string
    iconPosition?: 'left' | 'right'
    alignment?: 'left' | 'center' | 'right'
    fullWidth?: boolean
    newTab?: boolean
  }
}

// Product Card Block (for e-commerce)
export interface ProductCardBlock extends BaseBlock {
  type: 'product-card'
  data: {
    productId?: number
    productSlug?: string
    // Manual data if no productId
    name?: string
    image?: string
    price?: number
    originalPrice?: number
    rating?: number
    url?: string
    badge?: string
    style?: 'default' | 'horizontal' | 'minimal'
  }
}

// Product List Block
export interface ProductListBlock extends BaseBlock {
  type: 'product-list'
  data: {
    title?: string
    productIds?: number[]
    productSlugs?: string[]
    category?: string
    limit?: number
    columns?: 2 | 3 | 4
    style?: 'grid' | 'carousel'
  }
}

// CTA Box Block
export interface CTABoxBlock extends BaseBlock {
  type: 'cta-box'
  data: {
    title: string
    description?: string
    buttonText: string
    buttonUrl: string
    backgroundImage?: string
    backgroundColor?: string
    style?: 'default' | 'gradient' | 'image'
  }
}

// Pros and Cons Block (for reviews)
export interface ProsConsBlock extends BaseBlock {
  type: 'pros-cons'
  data: {
    pros: string[]
    cons: string[]
    title?: string
    style?: 'default' | 'side-by-side' | 'stacked'
  }
}

// Rating Box Block (for reviews)
export interface RatingBoxBlock extends BaseBlock {
  type: 'rating-box'
  data: {
    title?: string
    overallRating: number
    maxRating?: number
    criteria?: Array<{
      label: string
      rating: number
    }>
    verdict?: string
    style?: 'default' | 'compact' | 'detailed'
  }
}

// Comparison Table Block
export interface ComparisonTableBlock extends BaseBlock {
  type: 'comparison-table'
  data: {
    title?: string
    headers: string[] // Product names
    features: Array<{
      label: string
      values: Array<string | boolean | number>
    }>
    highlightColumn?: number
  }
}

// Table of Contents Block
export interface TOCBlock extends BaseBlock {
  type: 'toc'
  data: {
    title?: string
    maxDepth?: 2 | 3 | 4
    style?: 'default' | 'numbered' | 'minimal'
    collapsible?: boolean
  }
}

// Author Box Block
export interface AuthorBoxBlock extends BaseBlock {
  type: 'author-box'
  data: {
    showBio?: boolean
    showSocial?: boolean
    style?: 'default' | 'compact' | 'card'
  }
}

// Related Articles Block
export interface RelatedArticlesBlock extends BaseBlock {
  type: 'related-articles'
  data: {
    title?: string
    articleIds?: number[]
    articleSlugs?: string[]
    category?: string
    limit?: number
    style?: 'grid' | 'list' | 'cards'
  }
}

// Newsletter Block
export interface NewsletterBlock extends BaseBlock {
  type: 'newsletter'
  data: {
    title?: string
    description?: string
    buttonText?: string
    style?: 'default' | 'inline' | 'card'
    backgroundColor?: string
  }
}

// Spacer Block
export interface SpacerBlock extends BaseBlock {
  type: 'spacer'
  data: {
    height: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  }
}

// Columns Block (for layout)
export interface ColumnsBlock extends BaseBlock {
  type: 'columns'
  data: {
    columns: Array<{
      width: '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 'auto'
      blocks: ContentBlock[]
    }>
    gap?: 'sm' | 'md' | 'lg'
    verticalAlignment?: 'top' | 'center' | 'bottom'
  }
}

// Raw HTML Block (for flexibility)
export interface HTMLBlock extends BaseBlock {
  type: 'html'
  data: {
    html: string
    sanitize?: boolean
  }
}

// Union type of all blocks
export type ContentBlock =
  | HeadingBlock
  | ParagraphBlock
  | ImageBlock
  | GalleryBlock
  | ListBlock
  | QuoteBlock
  | CodeBlock
  | TableBlock
  | DividerBlock
  | EmbedBlock
  | AlertBlock
  | AccordionBlock
  | ButtonBlock
  | ProductCardBlock
  | ProductListBlock
  | CTABoxBlock
  | ProsConsBlock
  | RatingBoxBlock
  | ComparisonTableBlock
  | TOCBlock
  | AuthorBoxBlock
  | RelatedArticlesBlock
  | NewsletterBlock
  | SpacerBlock
  | ColumnsBlock
  | HTMLBlock

// Helper type for article blocks
export type ArticleBlocks = ContentBlock[]

// Block metadata for editor
export interface BlockMeta {
  type: BlockType
  label: string
  icon: string
  category: 'text' | 'media' | 'layout' | 'embed' | 'commerce' | 'interactive'
  description: string
}

// Block registry for editor
export const BLOCK_REGISTRY: BlockMeta[] = [
  // Text blocks
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

  // Media blocks
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

  // Layout blocks
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

  // Interactive blocks
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

  // Commerce blocks
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

  // Embed blocks
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
]

// Helper functions
export function generateBlockId(): string {
  return `block_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

export function createBlock<T extends ContentBlock>(type: T['type'], data: T['data']): T {
  return {
    id: generateBlockId(),
    type,
    data,
  } as T
}

// Extract plain text from blocks for search/SEO
export function extractPlainText(blocks: ContentBlock[]): string {
  const textParts: string[] = []

  for (const block of blocks) {
    switch (block.type) {
      case 'heading':
      case 'paragraph':
        textParts.push(stripHtml(block.data.text))
        break
      case 'list':
        for (const item of block.data.items) {
          textParts.push(stripHtml(item.text))
          if (item.children) {
            textParts.push(...item.children.map((c) => stripHtml(c.text)))
          }
        }
        break
      case 'quote':
        textParts.push(stripHtml(block.data.text))
        if (block.data.citation) textParts.push(block.data.citation)
        break
      case 'alert':
        if (block.data.title) textParts.push(block.data.title)
        textParts.push(stripHtml(block.data.text))
        break
      case 'accordion':
        for (const item of block.data.items) {
          textParts.push(item.title)
          textParts.push(stripHtml(item.content))
        }
        break
      case 'cta-box':
        textParts.push(block.data.title)
        if (block.data.description) textParts.push(block.data.description)
        break
      case 'table':
        textParts.push(...block.data.headers)
        for (const row of block.data.rows) {
          textParts.push(...row)
        }
        break
      case 'columns':
        textParts.push(extractPlainText(block.data.columns.flatMap((c) => c.blocks)))
        break
    }
  }

  return textParts.filter(Boolean).join(' ')
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim()
}

// Extract headings for TOC
export function extractHeadings(
  blocks: ContentBlock[]
): Array<{ id: string; text: string; level: number }> {
  const headings: Array<{ id: string; text: string; level: number }> = []

  for (const block of blocks) {
    if (block.type === 'heading') {
      headings.push({
        id: block.data.anchor || block.id,
        text: stripHtml(block.data.text),
        level: block.data.level,
      })
    } else if (block.type === 'columns') {
      headings.push(...extractHeadings(block.data.columns.flatMap((c) => c.blocks)))
    }
  }

  return headings
}

// Calculate read time from blocks
export function calculateReadTime(blocks: ContentBlock[]): number {
  const plainText = extractPlainText(blocks)
  const wordCount = plainText.split(/\s+/).filter(Boolean).length
  const imageCount = blocks.filter((b) => b.type === 'image' || b.type === 'gallery').length

  // 200 words per minute + 12 seconds per image
  const readTimeMinutes = wordCount / 200 + (imageCount * 12) / 60

  return Math.max(1, Math.ceil(readTimeMinutes))
}
