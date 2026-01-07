<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { ContentBlock, BlockType } from '@/types/article'
import { BLOCK_DEFINITIONS, BLOCK_CATEGORIES } from '@/types/admin_article'
import BlockEditor from './BlockEditor.vue'

// Simple ID generator
function generateId(): string {
  return `block_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
}

// Props
const props = defineProps<{
  modelValue: ContentBlock[]
  uploadUrl?: string
}>()

// Emits
const emit = defineEmits<{
  'update:modelValue': [blocks: ContentBlock[]]
}>()

// State
const blocks = ref<ContentBlock[]>([...props.modelValue])
const selectedBlockIndex = ref<number | null>(null)
const showBlockPicker = ref(false)
const insertPosition = ref<'top' | 'bottom' | number>('bottom')
const activeCategory = ref('text')

// Sync with parent
watch(
  () => props.modelValue,
  (val) => {
    if (JSON.stringify(val) !== JSON.stringify(blocks.value)) {
      blocks.value = [...val]
    }
  }
)

watch(
  blocks,
  (val) => {
    emit('update:modelValue', val)
  },
  { deep: true }
)

// Computed
const filteredBlocks = computed(() => {
  return BLOCK_DEFINITIONS.filter((b) => b.category === activeCategory.value)
})

// Block management
function addBlock(type: BlockType) {
  const newBlock = createBlock(type)

  if (insertPosition.value === 'top') {
    blocks.value.unshift(newBlock)
    selectedBlockIndex.value = 0
  } else if (insertPosition.value === 'bottom') {
    blocks.value.push(newBlock)
    selectedBlockIndex.value = blocks.value.length - 1
  } else {
    const pos = insertPosition.value as number
    blocks.value.splice(pos + 1, 0, newBlock)
    selectedBlockIndex.value = pos + 1
  }

  showBlockPicker.value = false
}

function createBlock(type: BlockType): ContentBlock {
  const id = generateId()
  const defaults: Record<BlockType, ContentBlock> = {
    heading: { id, type: 'heading', data: { text: '', level: 2 } },
    paragraph: { id, type: 'paragraph', data: { text: '' } },
    image: { id, type: 'image', data: { src: '', alt: '' } },
    gallery: { id, type: 'gallery', data: { images: [], columns: 3 } },
    list: { id, type: 'list', data: { style: 'unordered', items: [{ text: '' }] } },
    quote: { id, type: 'quote', data: { text: '' } },
    code: { id, type: 'code', data: { code: '', language: 'javascript' } },
    table: { id, type: 'table', data: { headers: ['Kolom 1', 'Kolom 2'], rows: [['', '']] } },
    divider: { id, type: 'divider', data: { style: 'solid' } },
    embed: { id, type: 'embed', data: { url: '' } },
    alert: { id, type: 'alert', data: { text: '', type: 'info' } },
    accordion: { id, type: 'accordion', data: { items: [{ title: '', content: '' }] } },
    button: { id, type: 'button', data: { text: 'Button', url: '' } },
    'product-card': { id, type: 'product-card', data: {} },
    'product-list': { id, type: 'product-list', data: { limit: 4 } },
    'cta-box': { id, type: 'cta-box', data: { title: '', buttonText: '', buttonUrl: '' } },
    'pros-cons': { id, type: 'pros-cons', data: { pros: [''], cons: [''] } },
    'rating-box': { id, type: 'rating-box', data: { overallRating: 4 } },
    'comparison-table': { id, type: 'comparison-table', data: { headers: [], features: [] } },
    toc: { id, type: 'toc', data: { title: 'Daftar Isi' } },
    'author-box': { id, type: 'author-box', data: {} },
    'related-articles': { id, type: 'related-articles', data: { limit: 3 } },
    newsletter: { id, type: 'newsletter', data: { title: 'Berlangganan Newsletter' } },
    spacer: { id, type: 'spacer', data: { height: 'md' } },
    columns: { id, type: 'columns', data: { columns: [{ width: '1/2', blocks: [] }, { width: '1/2', blocks: [] }] } },
    html: { id, type: 'html', data: { html: '' } },
  }

  return defaults[type] || { id, type, data: {} }
}

function removeBlock(index: number) {
  blocks.value.splice(index, 1)
  selectedBlockIndex.value = null
}

function duplicateBlock(index: number) {
  const original = blocks.value[index]
  const duplicate: ContentBlock = {
    ...JSON.parse(JSON.stringify(original)),
    id: generateId(),
  }
  blocks.value.splice(index + 1, 0, duplicate)
  selectedBlockIndex.value = index + 1
}

function moveBlock(index: number, direction: 'up' | 'down') {
  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex < 0 || newIndex >= blocks.value.length) return

  const [block] = blocks.value.splice(index, 1)
  blocks.value.splice(newIndex, 0, block)
  selectedBlockIndex.value = newIndex
}

function openBlockPicker(position: 'top' | 'bottom' | number = 'bottom') {
  insertPosition.value = position
  showBlockPicker.value = true
}

// Block icon getter
function getBlockIcon(type: BlockType): string {
  const def = BLOCK_DEFINITIONS.find((b) => b.type === type)
  return def?.icon || 'i-heroicons-square-3-stack-3d'
}

function getBlockLabel(type: BlockType): string {
  const def = BLOCK_DEFINITIONS.find((b) => b.type === type)
  return def?.label || type
}

// Image upload handler
async function handleImageUpload(file: File): Promise<string> {
  if (!props.uploadUrl) {
    // Fallback to base64
    return new Promise((resolve) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.readAsDataURL(file)
    })
  }

  const formData = new FormData()
  formData.append('image', file)

  const response = await fetch(props.uploadUrl, {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()
  return data.url
}
</script>

<template>
  <div class="article-page-builder">
    <!-- Toolbar -->
    <div class="mb-4 flex items-center justify-between rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-800">
      <div class="flex items-center gap-2">
        <UButton
          icon="i-heroicons-plus"
          color="primary"
          variant="soft"
          size="sm"
          @click="openBlockPicker('bottom')"
        >
          Tambah Blok
        </UButton>
        <span class="text-sm text-gray-500">
          {{ blocks.length }} blok
        </span>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          v-if="blocks.length > 0"
          icon="i-heroicons-trash"
          color="error"
          variant="ghost"
          size="sm"
          @click="blocks = []"
        >
          Hapus Semua
        </UButton>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="blocks.length === 0"
      class="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600"
    >
      <UIcon
        name="i-heroicons-document-plus"
        class="mb-4 h-12 w-12 text-gray-300"
      />
      <h3 class="mb-2 text-lg font-medium text-gray-900 dark:text-white">
        Mulai membangun konten
      </h3>
      <p class="mb-4 text-sm text-gray-500">
        Klik tombol di bawah untuk menambahkan blok pertama
      </p>
      <UButton
        icon="i-heroicons-plus"
        color="primary"
        @click="openBlockPicker()"
      >
        Tambah Blok
      </UButton>
    </div>

    <!-- Blocks list -->
    <div v-else class="space-y-2">
      <!-- Add block at top -->
      <button
        class="flex w-full items-center justify-center gap-2 rounded border-2 border-dashed border-gray-200 py-2 text-sm text-gray-400 transition hover:border-primary-500 hover:text-primary-500 dark:border-gray-700"
        @click="openBlockPicker('top')"
      >
        <UIcon name="i-heroicons-plus" class="h-4 w-4" />
        <span>Tambah di atas</span>
      </button>

      <div
        v-for="(block, index) in blocks"
        :key="block.id"
        class="group relative"
      >
        <!-- Block wrapper -->
        <div
          :class="[
            'rounded-lg border-2 bg-white p-4 transition dark:bg-gray-800',
            selectedBlockIndex === index
              ? 'border-primary-500 ring-2 ring-primary-500/20'
              : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600',
          ]"
          @click="selectedBlockIndex = index"
        >
          <!-- Block header -->
          <div class="mb-3 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="flex h-8 w-8 items-center justify-center rounded bg-gray-100 dark:bg-gray-700">
                <UIcon :name="getBlockIcon(block.type)" class="h-4 w-4 text-gray-500" />
              </div>
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ getBlockLabel(block.type) }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <UButton
                icon="i-heroicons-chevron-up"
                color="neutral"
                variant="ghost"
                size="xs"
                :disabled="index === 0"
                @click.stop="moveBlock(index, 'up')"
              />
              <UButton
                icon="i-heroicons-chevron-down"
                color="neutral"
                variant="ghost"
                size="xs"
                :disabled="index === blocks.length - 1"
                @click.stop="moveBlock(index, 'down')"
              />
              <UButton
                icon="i-heroicons-document-duplicate"
                color="neutral"
                variant="ghost"
                size="xs"
                @click.stop="duplicateBlock(index)"
              />
              <UButton
                icon="i-heroicons-trash"
                color="error"
                variant="ghost"
                size="xs"
                @click.stop="removeBlock(index)"
              />
            </div>
          </div>

          <!-- Block editor -->
          <BlockEditor
            v-model="blocks[index]"
            :upload-handler="handleImageUpload"
          />
        </div>

        <!-- Add block after -->
        <button
          class="mt-2 flex w-full items-center justify-center gap-2 rounded border-2 border-dashed border-transparent py-1 text-sm text-gray-400 opacity-0 transition group-hover:border-gray-200 group-hover:opacity-100 hover:border-primary-500! hover:text-primary-500! dark:group-hover:border-gray-700"
          @click="openBlockPicker(index)"
        >
          <UIcon name="i-heroicons-plus" class="h-4 w-4" />
          <span>Tambah blok</span>
        </button>
      </div>
    </div>

    <!-- Block picker modal -->
    <UModal v-model="showBlockPicker" :ui="{ width: 'sm:max-w-2xl' }">
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold">Pilih Blok</h3>
            <UButton
              icon="i-heroicons-x-mark"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="showBlockPicker = false"
            />
          </div>
        </template>

        <div class="space-y-4">
          <!-- Category tabs -->
          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="cat in BLOCK_CATEGORIES"
              :key="cat.id"
              :color="activeCategory === cat.id ? 'primary' : 'neutral'"
              :variant="activeCategory === cat.id ? 'soft' : 'ghost'"
              size="sm"
              @click="activeCategory = cat.id"
            >
              {{ cat.label }}
            </UButton>
          </div>

          <!-- Block grid -->
          <div class="grid grid-cols-3 gap-3 sm:grid-cols-4">
            <button
              v-for="def in filteredBlocks"
              :key="def.type"
              class="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-4 transition hover:border-primary-500 hover:bg-primary-50 dark:border-gray-700 dark:hover:bg-primary-900/20"
              @click="addBlock(def.type)"
            >
              <UIcon :name="def.icon" class="h-6 w-6 text-gray-500" />
              <span class="text-xs text-gray-700 dark:text-gray-300">{{ def.label }}</span>
            </button>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
