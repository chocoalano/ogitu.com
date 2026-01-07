<script setup lang="ts">
/**
 * BlockRenderer - Renders article content blocks
 * Supports the page builder block system
 */

import type { ContentBlock, AccordionBlock, ColumnsBlock } from '~/types/article'

interface Props {
  blocks: ContentBlock[]
  showTOC?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  showTOC: false,
})

// Generate slug for headings
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Get YouTube video ID from URL
function getYouTubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
  )
  return match ? match[1] : null
}

// Get TikTok video ID from URL
function getTikTokId(url: string): string | null {
  const match = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/)
  return match ? match[1] : null
}
</script>

<template>
  <div class="block-renderer">
    <template v-for="block in props.blocks" :key="block.id">
      <!-- Heading Block -->
      <component v-if="block.type === 'heading'" :is="`h${block.data.level}`"
        :id="block.data.anchor || slugify(block.data.text)" :class="[
          'scroll-mt-24',
          {
            'text-left': block.data.alignment === 'left',
            'text-center': block.data.alignment === 'center',
            'text-right': block.data.alignment === 'right',
          },
        ]" v-html="block.data.text" />

      <!-- Paragraph Block -->
      <p v-else-if="block.type === 'paragraph'" :class="[
        'leading-relaxed',
        {
          'text-left': block.data.alignment === 'left',
          'text-center': block.data.alignment === 'center',
          'text-right': block.data.alignment === 'right',
          'text-justify': block.data.alignment === 'justify',
          'first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1':
            block.data.dropCap,
        },
      ]" v-html="block.data.text" />

      <!-- Image Block -->
      <figure v-else-if="block.type === 'image'" :class="[
        'my-6',
        {
          'mx-auto max-w-2xl': block.data.alignment === 'center',
          'float-left mr-6 max-w-sm': block.data.alignment === 'left',
          'float-right ml-6 max-w-sm': block.data.alignment === 'right',
          'w-full': block.data.alignment === 'full',
        },
      ]">
        <a v-if="block.data.link" :href="block.data.link" target="_blank" rel="noopener">
          <img :src="block.data.src" :alt="block.data.alt" :width="block.data.width" :height="block.data.height"
            class="rounded-lg shadow-md w-full h-auto" loading="lazy" />
        </a>
        <img v-else :src="block.data.src" :alt="block.data.alt" :width="block.data.width" :height="block.data.height"
          class="rounded-lg shadow-md w-full h-auto" loading="lazy" />
        <figcaption v-if="block.data.caption" class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {{ block.data.caption }}
        </figcaption>
      </figure>

      <!-- Gallery Block -->
      <div v-else-if="block.type === 'gallery'" :class="[
        'grid my-6',
        {
          'grid-cols-2': block.data.columns === 2,
          'grid-cols-3': block.data.columns === 3,
          'grid-cols-4': block.data.columns === 4,
          'gap-2': block.data.gap === 'sm',
          'gap-4': block.data.gap === 'md' || !block.data.gap,
          'gap-6': block.data.gap === 'lg',
        },
      ]">
        <figure v-for="(image, idx) in block.data.images" :key="idx" class="relative">
          <img :src="image.src" :alt="image.alt" class="rounded-lg w-full h-48 object-cover" loading="lazy" />
          <figcaption v-if="image.caption" class="mt-1 text-xs text-gray-500 dark:text-gray-400 truncate">
            {{ image.caption }}
          </figcaption>
        </figure>
      </div>

      <!-- List Block -->
      <component v-else-if="block.type === 'list'" :is="block.data.style === 'ordered' ? 'ol' : 'ul'" :class="[
        'my-4 ml-6',
        {
          'list-decimal': block.data.style === 'ordered',
          'list-disc': block.data.style === 'unordered',
          'list-none': block.data.style === 'checklist',
        },
      ]">
        <li v-for="(item, idx) in block.data.items" :key="idx" class="mb-2">
          <div class="flex items-start gap-2">
            <UCheckbox v-if="block.data.style === 'checklist'" :model-value="item.checked" disabled class="mt-0.5" />
            <span v-html="item.text" />
          </div>
          <ul v-if="item.children?.length" class="mt-2 ml-6 list-disc">
            <li v-for="(child, cidx) in item.children" :key="cidx" class="mb-1" v-html="child.text" />
          </ul>
        </li>
      </component>

      <!-- Quote Block -->
      <blockquote v-else-if="block.type === 'quote'" :class="[
        'my-6',
        {
          'border-l-4 border-primary-500 pl-4 italic':
            block.data.style === 'default' || !block.data.style,
          'text-xl font-medium text-center py-6':
            block.data.style === 'large',
          'border border-gray-200 dark:border-gray-700 rounded-lg p-4':
            block.data.style === 'bordered',
          'bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4':
            block.data.style === 'highlighted',
        },
      ]">
        <p v-html="block.data.text" />
        <cite v-if="block.data.citation" class="block mt-2 text-sm text-gray-500 dark:text-gray-400 not-italic">
          — {{ block.data.citation }}
        </cite>
      </blockquote>

      <!-- Code Block -->
      <div v-else-if="block.type === 'code'" class="my-6">
        <div v-if="block.data.filename" class="bg-gray-800 text-gray-300 px-4 py-2 text-sm font-mono rounded-t-lg">
          {{ block.data.filename }}
        </div>
        <pre
          :class="[
            'bg-gray-900 text-gray-100 p-4 overflow-x-auto text-sm',
            block.data.filename ? 'rounded-b-lg' : 'rounded-lg',
          ]"><code :class="block.data.language ? `language-${block.data.language}` : ''">{{ block.data.code }}</code></pre>
      </div>

      <!-- Table Block -->
      <div v-else-if="block.type === 'table'" class="my-6 overflow-x-auto">
        <table :class="[
          'w-full',
          {
            'divide-y divide-gray-200 dark:divide-gray-700': !block.data.bordered,
            'border border-gray-200 dark:border-gray-700': block.data.bordered,
          },
        ]">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th v-for="(header, idx) in block.data.headers" :key="idx"
                class="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                :class="{ 'border border-gray-200 dark:border-gray-700': block.data.bordered }">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody :class="{
            'divide-y divide-gray-200 dark:divide-gray-700': !block.data.striped,
          }">
            <tr v-for="(row, ridx) in block.data.rows" :key="ridx" :class="{
              'bg-gray-50 dark:bg-gray-800/50': block.data.striped && ridx % 2 === 1,
            }">
              <td v-for="(cell, cidx) in row" :key="cidx" :class="[
                'px-4 text-sm',
                block.data.compact ? 'py-2' : 'py-4',
                { 'border border-gray-200 dark:border-gray-700': block.data.bordered },
              ]" v-html="cell" />
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Divider Block -->
      <hr v-else-if="block.type === 'divider'" :class="[
        {
          'border-solid': block.data.style === 'solid' || !block.data.style,
          'border-dashed': block.data.style === 'dashed',
          'border-dotted': block.data.style === 'dotted',
          'my-4': block.data.spacing === 'sm',
          'my-8': block.data.spacing === 'md' || !block.data.spacing,
          'my-12': block.data.spacing === 'lg',
          'border-0 h-1 bg-linear-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent':
            block.data.style === 'gradient',
        },
      ]" />

      <!-- Embed Block (YouTube, TikTok, etc.) -->
      <div v-else-if="block.type === 'embed'" class="my-6">
        <!-- YouTube -->
        <div v-if="block.data.provider === 'youtube' || getYouTubeId(block.data.url)" :class="[
          'relative w-full',
          {
            'aspect-video': block.data.aspectRatio === '16:9' || !block.data.aspectRatio,
            'aspect-4/3': block.data.aspectRatio === '4:3',
            'aspect-square': block.data.aspectRatio === '1:1',
            'aspect-9/16': block.data.aspectRatio === '9:16',
          },
        ]">
          <iframe :src="`https://www.youtube.com/embed/${getYouTubeId(block.data.url)}`"
            class="absolute inset-0 w-full h-full rounded-lg" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen />
        </div>
        <!-- TikTok -->
        <div v-else-if="block.data.provider === 'tiktok' || getTikTokId(block.data.url)" class="flex justify-center">
          <iframe :src="`https://www.tiktok.com/embed/v2/${getTikTokId(block.data.url)}`" class="rounded-lg"
            style="width: 325px; height: 750px" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen />
        </div>
        <!-- Generic embed -->
        <div v-else class="aspect-video w-full">
          <iframe :src="block.data.url" class="w-full h-full rounded-lg" frameborder="0" />
        </div>
        <p v-if="block.data.caption" class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400">
          {{ block.data.caption }}
        </p>
      </div>

      <!-- Alert Block -->
      <UAlert v-else-if="block.type === 'alert'" :title="block.data.title" :description="block.data.text" :color="block.data.type === 'error'
        ? 'red'
        : block.data.type === 'success'
          ? 'green'
          : block.data.type === 'warning'
            ? 'yellow'
            : block.data.type === 'tip'
              ? 'purple'
              : 'blue'
        " :icon="block.data.icon" class="my-6" />

      <!-- Accordion Block -->
      <UAccordion v-else-if="block.type === 'accordion'" :items="(block as AccordionBlock).data.items.map((item: { title: string; content: string; defaultOpen?: boolean }, idx: number) => ({
        label: item.title,
        content: item.content,
        defaultOpen: item.defaultOpen,
        slot: `item-${idx}`,
      }))
        " :multiple="(block as AccordionBlock).data.allowMultiple" class="my-6">
        <template v-for="(item, idx) in (block as AccordionBlock).data.items" :key="idx" #[`item-${idx}`]>
          <div v-html="item.content" class="prose dark:prose-invert max-w-none" />
        </template>
      </UAccordion>

      <!-- Button Block -->
      <div v-else-if="block.type === 'button'" :class="[
        'my-6 flex',
        {
          'justify-start': block.data.alignment === 'left' || !block.data.alignment,
          'justify-center': block.data.alignment === 'center',
          'justify-end': block.data.alignment === 'right',
        },
      ]">
        <UButton :to="block.data.url" :target="block.data.newTab ? '_blank' : undefined" :variant="block.data.style === 'outline'
            ? 'outline'
            : block.data.style === 'ghost'
              ? 'ghost'
              : block.data.style === 'secondary'
                ? 'soft'
                : 'solid'
          " :color="block.data.style === 'secondary' ? 'neutral' : 'primary'" :size="block.data.size || 'md'"
          :icon="block.data.iconPosition === 'left' ? block.data.icon : undefined"
          :trailing-icon="block.data.iconPosition === 'right' ? block.data.icon : undefined" :class="[
            block.data.fullWidth ? 'w-full' : '',
            // FIX: paksa label + semua child (termasuk svg icon) jadi putih
            'text-white! **:text-white! [&_svg]:stroke-white! [&_svg]:fill-white!'
          ]">
          {{ block.data.text || 'Button' }}
        </UButton>
      </div>

      <!-- CTA Box Block -->
      <div v-else-if="block.type === 'cta-box'" :class="[
        // layout
        'my-8 rounded-xl p-8 text-center',
        // FIX: pastikan semua teks di dalam CTA putih + matikan efek typography (prose)
        'text-white! not-prose',
        // background variants
        {
          'bg-primary-500 dark:bg-primary-600':
            block.data.style === 'default' || !block.data.style,
          'bg-linear-to-r from-primary-500 to-primary-700':
            block.data.style === 'gradient',
        },
      ]" :style="block.data.style === 'image' && block.data.backgroundImage
        ? {
          backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${block.data.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }
        : block.data.backgroundColor
          ? { backgroundColor: block.data.backgroundColor }
          : undefined
        ">
        <h3 class="text-2xl font-bold mb-2 text-white!">
          {{ block.data.title }}
        </h3>

        <p v-if="block.data.description" class="mb-6 text-white/90!">
          {{ block.data.description }}
        </p>

        <UButton :to="block.data.buttonUrl" color="neutral" variant="solid"
          class="bg-white! text-primary-600! hover:bg-gray-100!" size="lg">
          {{ block.data.buttonText || 'Klik di sini' }}
        </UButton>
      </div>


      <!-- Pros & Cons Block -->
      <div v-else-if="block.type === 'pros-cons'" class="my-6">
        <h4 v-if="block.data.title" class="text-lg font-semibold mb-4">
          {{ block.data.title }}
        </h4>
        <div :class="[
          'grid gap-4',
          block.data.style === 'side-by-side'
            ? 'md:grid-cols-2'
            : 'grid-cols-1',
        ]">
          <!-- Pros -->
          <div class="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <h5 class="font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-thumbs-up" class="w-5 h-5" />
              Kelebihan
            </h5>
            <ul class="space-y-2">
              <li v-for="(pro, idx) in block.data.pros" :key="idx" class="flex items-start gap-2 text-sm">
                <UIcon name="i-lucide-check" class="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                <span>{{ pro }}</span>
              </li>
            </ul>
          </div>
          <!-- Cons -->
          <div class="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <h5 class="font-semibold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2">
              <UIcon name="i-lucide-thumbs-down" class="w-5 h-5" />
              Kekurangan
            </h5>
            <ul class="space-y-2">
              <li v-for="(con, idx) in block.data.cons" :key="idx" class="flex items-start gap-2 text-sm">
                <UIcon name="i-lucide-x" class="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                <span>{{ con }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Rating Box Block -->
      <div v-else-if="block.type === 'rating-box'" :class="[
        'my-6 border border-gray-200 dark:border-gray-700 rounded-xl p-6',
        { 'p-4': block.data.style === 'compact' },
      ]">
        <h4 v-if="block.data.title" class="font-semibold mb-4">
          {{ block.data.title }}
        </h4>
        <div class="flex items-center gap-4 mb-4">
          <div class="text-4xl font-bold text-primary-600">
            {{ Number(block.data.overallRating || 0).toFixed(1) }}
          </div>
          <div>
            <div class="flex gap-1">
              <UIcon v-for="star in (block.data.maxRating || 5)" :key="star" :name="star <= Math.floor(Number(block.data.overallRating || 0))
                ? 'i-lucide-star'
                : star - 0.5 <= Number(block.data.overallRating || 0)
                  ? 'i-lucide-star-half'
                  : 'i-lucide-star'
                " :class="[
                  'w-5 h-5',
                  star <= Number(block.data.overallRating || 0)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600',
                ]" />
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              dari {{ block.data.maxRating || 5 }} bintang
            </p>
          </div>
        </div>
        <!-- Criteria -->
        <div v-if="block.data.criteria?.length && block.data.style !== 'compact'" class="space-y-3">
          <div v-for="(criterion, idx) in block.data.criteria" :key="idx" class="flex items-center gap-3">
            <span class="w-32 text-sm text-gray-600 dark:text-gray-400">
              {{ criterion.label }}
            </span>
            <div class="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div class="bg-primary-500 h-2 rounded-full" :style="{
                width: `${(criterion.rating / (block.data.maxRating || 5)) * 100}%`,
              }" />
            </div>
            <span class="w-8 text-sm font-medium">{{ criterion.rating }}</span>
          </div>
        </div>
        <!-- Verdict -->
        <p v-if="block.data.verdict && block.data.style !== 'compact'"
          class="mt-4 text-sm bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
          <strong>Kesimpulan:</strong> {{ block.data.verdict }}
        </p>
      </div>

      <!-- Comparison Table Block -->
      <div v-else-if="block.type === 'comparison-table'" class="my-6 overflow-x-auto">
        <h4 v-if="block.data.title" class="font-semibold mb-4">
          {{ block.data.title }}
        </h4>
        <table class="w-full border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th
                class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                Fitur
              </th>
              <th v-for="(header, idx) in block.data.headers" :key="idx" :class="[
                'px-4 py-3 text-center text-sm font-medium border-b border-gray-200 dark:border-gray-700',
                block.data.highlightColumn === idx
                  ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                  : 'text-gray-500 dark:text-gray-400',
              ]">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(feature, fidx) in block.data.features" :key="fidx"
              class="border-b border-gray-200 dark:border-gray-700 last:border-0">
              <td class="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                {{ feature.label }}
              </td>
              <td v-for="(value, vidx) in feature.values" :key="vidx" :class="[
                'px-4 py-3 text-center text-sm',
                block.data.highlightColumn === vidx
                  ? 'bg-primary-50/50 dark:bg-primary-900/10'
                  : '',
              ]">
                <template v-if="typeof value === 'boolean'">
                  <UIcon :name="value ? 'i-lucide-check' : 'i-lucide-x'"
                    :class="value ? 'text-green-500' : 'text-red-500'" class="w-5 h-5 mx-auto" />
                </template>
                <template v-else>
                  {{ value }}
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Table of Contents Block -->
      <nav v-else-if="block.type === 'toc'" class="my-6 bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 class="font-semibold mb-3">
          {{ block.data.title || 'Daftar Isi' }}
        </h4>
        <!-- TOC is auto-generated from headings, passed via slot or computed -->
        <slot name="toc">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Table of contents akan di-generate otomatis
          </p>
        </slot>
      </nav>

      <!-- Spacer Block -->
      <div v-else-if="block.type === 'spacer'" :class="{
        'h-4': block.data.height === 'xs',
        'h-8': block.data.height === 'sm',
        'h-12': block.data.height === 'md',
        'h-16': block.data.height === 'lg',
        'h-24': block.data.height === 'xl',
      }" />

      <!-- Columns Block (Recursive) -->
      <div v-else-if="block.type === 'columns'" :class="[
        'grid my-6',
        {
          'gap-4': (block as ColumnsBlock).data.gap === 'sm',
          'gap-6': (block as ColumnsBlock).data.gap === 'md' || !(block as ColumnsBlock).data.gap,
          'gap-8': (block as ColumnsBlock).data.gap === 'lg',
          'items-start': (block as ColumnsBlock).data.verticalAlignment === 'top',
          'items-center': (block as ColumnsBlock).data.verticalAlignment === 'center',
          'items-end': (block as ColumnsBlock).data.verticalAlignment === 'bottom',
        },
      ]" :style="{
        gridTemplateColumns: (block as ColumnsBlock).data.columns
          .map((col: { width: string; blocks: ContentBlock[] }) => {
            switch (col.width) {
              case '1/2':
                return '1fr'
              case '1/3':
                return '1fr'
              case '2/3':
                return '2fr'
              case '1/4':
                return '1fr'
              case '3/4':
                return '3fr'
              default:
                return 'auto'
            }
          })
          .join(' '),
      }">
        <div v-for="(col, idx) in (block as ColumnsBlock).data.columns" :key="idx">
          <BlockRenderer :blocks="col.blocks" />
        </div>
      </div>

      <!-- HTML Block -->
      <div v-else-if="block.type === 'html'" class="my-6" v-html="block.data.html" />

      <!-- Product Card Block -->
      <div v-else-if="block.type === 'product-card'" class="my-6">
        <UCard :class="[
          {
            'flex flex-row': block.data.style === 'horizontal',
          },
        ]">
          <template #header v-if="block.data.style !== 'minimal'">
            <div class="relative">
              <img :src="block.data.image || '/images/placeholder-product.jpg'" :alt="block.data.name || 'Product'"
                class="w-full h-48 object-cover" />
              <UBadge v-if="block.data.badge" color="red" class="absolute top-2 left-2">
                {{ block.data.badge }}
              </UBadge>
            </div>
          </template>
          <div>
            <h4 class="font-semibold mb-2">{{ block.data.name || 'Product Name' }}</h4>
            <div class="flex items-center gap-2 mb-2">
              <span class="text-lg font-bold text-primary-600">
                Rp {{ (block.data.price || 0).toLocaleString('id-ID') }}
              </span>
              <span v-if="block.data.originalPrice" class="text-sm text-gray-500 line-through">
                Rp {{ block.data.originalPrice.toLocaleString('id-ID') }}
              </span>
            </div>
            <div v-if="block.data.rating" class="flex items-center gap-1 mb-3">
              <UIcon name="i-lucide-star" class="w-4 h-4 text-yellow-400" />
              <span class="text-sm">{{ block.data.rating }}</span>
            </div>
            <UButton v-if="block.data.url" :to="block.data.url" size="sm" block>
              Lihat Produk
            </UButton>
          </div>
        </UCard>
      </div>

      <!-- Newsletter Block -->
      <div v-else-if="block.type === 'newsletter'" :class="[
        'my-8 rounded-xl p-6',
        block.data.style === 'card'
          ? 'border border-gray-200 dark:border-gray-700'
          : 'bg-gray-100 dark:bg-gray-800',
      ]" :style="block.data.backgroundColor ? { backgroundColor: block.data.backgroundColor } : undefined">
        <h3 class="text-xl font-bold mb-2">
          {{ block.data.title || 'Berlangganan Newsletter' }}
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-4">
          {{ block.data.description || 'Dapatkan update artikel terbaru langsung di inbox Anda.' }}
        </p>
        <form :class="[
          'flex gap-2',
          block.data.style === 'inline' ? 'flex-row' : 'flex-col sm:flex-row',
        ]" @submit.prevent>
          <UInput type="email" placeholder="Email Anda" class="flex-1" />
          <UButton type="submit">
            {{ block.data.buttonText || 'Berlangganan' }}
          </UButton>
        </form>
      </div>

      <!-- Fallback for unknown block types -->
      <div v-else
        class="my-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <p class="text-sm text-yellow-700 dark:text-yellow-400">
          Block type "{{ block.type }}" tidak dikenali
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped lang="postcss">
@reference "../../css/app.css";

.block-renderer {
  @apply space-y-4;
}

.block-renderer :deep(h1) {
  @apply text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white;
}

.block-renderer :deep(h2) {
  @apply text-2xl font-bold mt-8 mb-4 text-gray-900 dark:text-white;
}

.block-renderer :deep(h3) {
  @apply text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white;
}

.block-renderer :deep(h4) {
  @apply text-lg font-semibold mt-4 mb-2 text-gray-900 dark:text-white;
}

.block-renderer :deep(h5),
.block-renderer :deep(h6) {
  @apply text-base font-semibold mt-4 mb-2 text-gray-900 dark:text-white;
}

.block-renderer :deep(p) {
  @apply text-gray-700 dark:text-gray-300;
}

.block-renderer :deep(a) {
  @apply text-primary-600 dark:text-primary-400 hover:underline;
}

.block-renderer :deep(strong) {
  @apply font-semibold;
}

.block-renderer :deep(em) {
  @apply italic;
}
</style>
