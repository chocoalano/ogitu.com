<script setup lang="ts">
import { computed } from 'vue'
import type { ContentBlock } from '@/types/article'

const props = defineProps<{
  modelValue: ContentBlock
  uploadHandler?: (file: File) => Promise<string>
}>()

const emit = defineEmits<{
  'update:modelValue': [block: ContentBlock]
}>()

const block = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

// Type-safe data accessor for template usage
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const blockData = computed(() => block.value.data as Record<string, any>)

// Update data helper - uses any to handle discriminated union
function updateData(key: string, value: unknown) {
  const updatedBlock = {
    ...props.modelValue,
    data: {
      ...props.modelValue.data,
      [key]: value,
    },
  } as ContentBlock
  emit('update:modelValue', updatedBlock)
}

// List item management
function addListItem() {
  if (block.value.type !== 'list') return
  const items = [...(block.value.data.items || [])]
  items.push({ text: '' })
  updateData('items', items)
}

function removeListItem(index: number) {
  if (block.value.type !== 'list') return
  const items = [...(block.value.data.items || [])]
  items.splice(index, 1)
  updateData('items', items)
}

function updateListItem(index: number, text: string) {
  if (block.value.type !== 'list') return
  const items = [...(block.value.data.items || [])]
  items[index] = { ...items[index], text }
  updateData('items', items)
}

// Pros/Cons management
function addProsItem() {
  if (block.value.type !== 'pros-cons') return
  const pros = [...(block.value.data.pros || [])]
  pros.push('')
  updateData('pros', pros)
}

function removeProsItem(index: number) {
  if (block.value.type !== 'pros-cons') return
  const pros = [...(block.value.data.pros || [])]
  pros.splice(index, 1)
  updateData('pros', pros)
}

function addConsItem() {
  if (block.value.type !== 'pros-cons') return
  const cons = [...(block.value.data.cons || [])]
  cons.push('')
  updateData('cons', cons)
}

function removeConsItem(index: number) {
  if (block.value.type !== 'pros-cons') return
  const cons = [...(block.value.data.cons || [])]
  cons.splice(index, 1)
  updateData('cons', cons)
}

// Accordion management
function addAccordionItem() {
  if (block.value.type !== 'accordion') return
  const items = [...(block.value.data.items || [])]
  items.push({ title: '', content: '' })
  updateData('items', items)
}

function removeAccordionItem(index: number) {
  if (block.value.type !== 'accordion') return
  const items = [...(block.value.data.items || [])]
  items.splice(index, 1)
  updateData('items', items)
}

// Table management
function addTableColumn() {
  if (block.value.type !== 'table') return
  const headers = [...(block.value.data.headers || [])]
  const rows = [...(block.value.data.rows || [])]
  headers.push('Kolom Baru')
  rows.forEach((row) => row.push(''))
  updateData('headers', headers)
  updateData('rows', rows)
}

function removeTableColumn(index: number) {
  if (block.value.type !== 'table') return
  const headers = [...(block.value.data.headers || [])]
  const rows = [...(block.value.data.rows || [])]
  headers.splice(index, 1)
  rows.forEach((row) => row.splice(index, 1))
  updateData('headers', headers)
  updateData('rows', rows)
}

function addTableRow() {
  if (block.value.type !== 'table') return
  const rows = [...(block.value.data.rows || [])]
  const columnCount = block.value.data.headers?.length || 2
  rows.push(Array(columnCount).fill(''))
  updateData('rows', rows)
}

function removeTableRow(index: number) {
  if (block.value.type !== 'table') return
  const rows = [...(block.value.data.rows || [])]
  rows.splice(index, 1)
  updateData('rows', rows)
}

// Image handling
async function handleImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file || !props.uploadHandler) return

  try {
    const url = await props.uploadHandler(file)
    updateData('src', url)
  } catch (error) {
    console.error('Failed to upload image:', error)
  }
}

// Gallery image handling
async function handleGalleryImageUpload(event: Event) {
  const input = event.target as HTMLInputElement
  const files = input.files
  if (!files || !props.uploadHandler) return

  const images = [...(block.value.type === 'gallery' ? block.value.data.images || [] : [])]

  for (const file of Array.from(files)) {
    try {
      const url = await props.uploadHandler(file)
      images.push({ src: url, alt: file.name })
    } catch (error) {
      console.error('Failed to upload image:', error)
    }
  }

  updateData('images', images)
}

function removeGalleryImage(index: number) {
  if (block.value.type !== 'gallery') return
  const images = [...(block.value.data.images || [])]
  images.splice(index, 1)
  updateData('images', images)
}

// Rating criteria management
function addRatingCriteria() {
  if (block.value.type !== 'rating-box') return
  const criteria = [...(block.value.data.criteria || [])]
  criteria.push({ label: '', rating: 3 })
  updateData('criteria', criteria)
}

function removeRatingCriteria(index: number) {
  if (block.value.type !== 'rating-box') return
  const criteria = [...(block.value.data.criteria || [])]
  criteria.splice(index, 1)
  updateData('criteria', criteria)
}

// Heading level options
const headingLevels = [
  { value: 1, label: 'H1 - Judul Utama' },
  { value: 2, label: 'H2 - Sub Judul' },
  { value: 3, label: 'H3 - Sub Sub Judul' },
  { value: 4, label: 'H4' },
  { value: 5, label: 'H5' },
  { value: 6, label: 'H6' },
]

const alignmentOptions = [
  { value: 'left', label: 'Kiri', icon: 'i-heroicons-bars-3-bottom-left' },
  { value: 'center', label: 'Tengah', icon: 'i-heroicons-bars-3' },
  { value: 'right', label: 'Kanan', icon: 'i-heroicons-bars-3-bottom-right' },
]

const listStyleOptions = [
  { value: 'unordered', label: 'Bullet' },
  { value: 'ordered', label: 'Numbered' },
  { value: 'checklist', label: 'Checklist' },
]

const alertTypeOptions = [
  { value: 'info', label: 'Info', color: 'info' },
  { value: 'success', label: 'Sukses', color: 'success' },
  { value: 'warning', label: 'Peringatan', color: 'warning' },
  { value: 'error', label: 'Error', color: 'error' },
  { value: 'tip', label: 'Tips', color: 'primary' },
]

const dividerStyleOptions = [
  { value: 'solid', label: 'Solid' },
  { value: 'dashed', label: 'Dashed' },
  { value: 'dotted', label: 'Dotted' },
  { value: 'gradient', label: 'Gradient' },
]

const spacerSizeOptions = [
  { value: 'xs', label: 'Extra Small' },
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra Large' },
]

const buttonStyleOptions = [
  { value: 'primary', label: 'Primary' },
  { value: 'secondary', label: 'Secondary' },
  { value: 'outline', label: 'Outline' },
  { value: 'ghost', label: 'Ghost' },
]

const codeLanguageOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'python', label: 'Python' },
  { value: 'php', label: 'PHP' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
  { value: 'json', label: 'JSON' },
  { value: 'bash', label: 'Bash' },
  { value: 'sql', label: 'SQL' },
]
</script>

<template>
  <div class="block-editor">
    <!-- Heading Block -->
    <template v-if="block.type === 'heading'">
      <div class="space-y-3">
        <UTextarea
          :model-value="blockData.text"
          placeholder="Masukkan teks heading..."
          :rows="1"
          autoresize
          @update:model-value="updateData('text', $event)"
          class="w-full"
        />
        <div class="flex flex-wrap gap-3">
          <USelect
            :model-value="blockData.level"
            :options="headingLevels"
            option-attribute="label"
            value-attribute="value"
            size="sm"
            class="w-40"
            @update:model-value="updateData('level', $event)"
          />
          <div class="inline-flex items-center rounded-md shadow-sm">
            <UButton
              v-for="opt in alignmentOptions"
              :key="opt.value"
              :icon="opt.icon"
              :color="blockData.alignment === opt.value ? 'primary' : 'neutral'"
              :variant="blockData.alignment === opt.value ? 'soft' : 'ghost'"
              @click="updateData('alignment', opt.value)"
            />
          </div>
        </div>
      </div>
    </template>

    <!-- Paragraph Block -->
    <template v-else-if="block.type === 'paragraph'">
      <div class="space-y-3">
        <UTextarea
          :model-value="blockData.text"
          placeholder="Tulis paragraf..."
          :rows="4"
          autoresize
          @update:model-value="updateData('text', $event)"
          class="w-full"
        />
        <div class="flex flex-wrap items-center gap-3">
          <div class="inline-flex items-center rounded-md shadow-sm">
            <UButton
              v-for="opt in alignmentOptions"
              :key="opt.value"
              :icon="opt.icon"
              :color="blockData.alignment === opt.value ? 'primary' : 'neutral'"
              :variant="blockData.alignment === opt.value ? 'soft' : 'ghost'"
              @click="updateData('alignment', opt.value)"
            />
          </div>
          <UCheckbox
            :model-value="blockData.dropCap"
            label="Drop Cap"
            @update:model-value="updateData('dropCap', $event)"
          />
        </div>
      </div>
    </template>

    <!-- Image Block -->
    <template v-else-if="block.type === 'image'">
      <div class="space-y-3">
        <div v-if="blockData.src" class="relative">
          <img
            :src="blockData.src"
            :alt="blockData.alt"
            class="max-h-64 rounded-lg object-contain"
          />
          <UButton
            icon="i-heroicons-x-mark"
            color="error"
            variant="solid"
            size="xs"
            class="absolute right-2 top-2"
            @click="updateData('src', '')"
          />
        </div>
        <div
          v-else
          class="flex flex-col items-center gap-3 rounded-lg border-2 border-dashed border-gray-300 p-6 dark:border-gray-600"
        >
          <UIcon name="i-heroicons-photo" class="h-10 w-10 text-gray-400" />
          <div class="text-center">
            <label class="cursor-pointer text-sm text-primary-600 hover:underline">
              Upload gambar
              <input type="file" class="hidden" accept="image/*" @change="handleImageUpload" />
            </label>
            <p class="mt-1 text-xs text-gray-500">atau masukkan URL di bawah</p>
          </div>
        </div>
        <UInput
          :model-value="blockData.src"
          placeholder="URL gambar..."
          icon="i-heroicons-link"
          @update:model-value="updateData('src', $event)"
          class="w-full"
        />
        <UInput
          :model-value="blockData.alt"
          placeholder="Alt text (deskripsi gambar)..."
          @update:model-value="updateData('alt', $event)"
          class="w-full"
        />
        <UInput
          :model-value="blockData.caption"
          placeholder="Caption (opsional)..."
          @update:model-value="updateData('caption', $event)"
          class="w-full"
        />
      </div>
    </template>

    <!-- List Block -->
    <template v-else-if="block.type === 'list'">
      <div class="space-y-3">
        <USelect
          :model-value="blockData.style"
          :options="listStyleOptions"
          option-attribute="label"
          value-attribute="value"
          size="sm"
          class="w-40"
          @update:model-value="updateData('style', $event)"
        />
        <div class="space-y-2">
          <div
            v-for="(item, index) in blockData.items"
            :key="index"
            class="flex items-center gap-2"
          >
            <UIcon
              :name="
                blockData.style === 'ordered'
                  ? 'i-heroicons-list-bullet'
                  : blockData.style === 'checklist'
                    ? 'i-heroicons-check-circle'
                    : 'i-heroicons-minus'
              "
              class="h-4 w-4 shrink-0 text-gray-400"
            />
            <UInput
              :model-value="item.text"
              placeholder="Item..."
              class="flex-1 w-full"
              @update:model-value="updateListItem(Number(index), $event)"
            />
            <UButton
              icon="i-heroicons-x-mark"
              color="error"
              variant="ghost"
              size="xs"
              @click="removeListItem(Number(index))"
            />
          </div>
        </div>
        <UButton icon="i-heroicons-plus" variant="soft" size="sm" @click="addListItem">
          Tambah Item
        </UButton>
      </div>
    </template>

    <!-- Quote Block -->
    <template v-else-if="block.type === 'quote'">
      <div class="space-y-3">
        <UTextarea
          :model-value="blockData.text"
          placeholder="Masukkan kutipan..."
          :rows="3"
          autoresize
          @update:model-value="updateData('text', $event)"
          class="w-full"
        />
        <UInput
          :model-value="blockData.citation"
          placeholder="Sumber kutipan (opsional)..."
          icon="i-heroicons-user"
          @update:model-value="updateData('citation', $event)"
          class="w-full"
        />
      </div>
    </template>

    <!-- Code Block -->
    <template v-else-if="block.type === 'code'">
      <div class="space-y-3">
        <div class="flex gap-3">
          <USelect
            :model-value="blockData.language"
            :options="codeLanguageOptions"
            option-attribute="label"
            value-attribute="value"
            size="sm"
            class="w-40"
            @update:model-value="updateData('language', $event)"
          />
          <UInput
            :model-value="blockData.filename"
            placeholder="Nama file (opsional)..."
            size="sm"
            class="flex-1 w-full"
            @update:model-value="updateData('filename', $event)"
          />
        </div>
        <UTextarea
          :model-value="blockData.code"
          placeholder="// Masukkan kode..."
          :rows="6"
          class="font-mono w-full"
          @update:model-value="updateData('code', $event)"
        />
      </div>
    </template>

    <!-- Alert Block -->
    <template v-else-if="block.type === 'alert'">
      <div class="space-y-3">
        <USelect
          :model-value="blockData.type"
          :options="alertTypeOptions"
          option-attribute="label"
          value-attribute="value"
          size="sm"
          class="w-40"
          @update:model-value="updateData('type', $event)"
        />
        <UInput
          :model-value="blockData.title"
          placeholder="Judul (opsional)..."
          @update:model-value="updateData('title', $event)"
          class="w-full"
        />
        <UTextarea
          :model-value="blockData.text"
          placeholder="Pesan..."
          :rows="2"
          autoresize
          @update:model-value="updateData('text', $event)"
          class="w-full"
        />
      </div>
    </template>

    <!-- Divider Block -->
    <template v-else-if="block.type === 'divider'">
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-500">Style:</span>
        <USelect
          :model-value="blockData.style"
          :options="dividerStyleOptions"
          option-attribute="label"
          value-attribute="value"
          size="sm"
          class="w-32"
          @update:model-value="updateData('style', $event)"
        />
        <span class="text-sm text-gray-500">Spacing:</span>
        <USelect
          :model-value="blockData.spacing"
          :options="spacerSizeOptions"
          option-attribute="label"
          value-attribute="value"
          size="sm"
          class="w-32"
          @update:model-value="updateData('spacing', $event)"
        />
      </div>
    </template>

    <!-- Spacer Block -->
    <template v-else-if="block.type === 'spacer'">
      <div class="flex items-center gap-3">
        <span class="text-sm text-gray-500">Tinggi:</span>
        <USelect
          :model-value="blockData.height"
          :options="spacerSizeOptions"
          option-attribute="label"
          value-attribute="value"
          size="sm"
          class="w-40"
          @update:model-value="updateData('height', $event)"
        />
      </div>
    </template>

    <!-- Button Block -->
    <template v-else-if="block.type === 'button'">
      <div class="space-y-3">
        <div class="flex gap-3">
          <UInput
            :model-value="blockData.text"
            placeholder="Teks button..."
            class="flex-1 w-full"
            @update:model-value="updateData('text', $event)"
          />
          <USelect
            :model-value="blockData.style"
            :options="buttonStyleOptions"
            option-attribute="label"
            value-attribute="value"
            size="sm"
            class="w-32"
            @update:model-value="updateData('style', $event)"
          />
        </div>
        <UInput
          :model-value="blockData.url"
          placeholder="URL tujuan..."
          icon="i-heroicons-link"
          class="w-full"
          @update:model-value="updateData('url', $event)"
        />
        <div class="flex items-center gap-4">
          <UCheckbox
            :model-value="blockData.fullWidth"
            label="Full Width"
            @update:model-value="updateData('fullWidth', $event)"
          />
          <UCheckbox
            :model-value="blockData.newTab"
            label="Buka di tab baru"
            @update:model-value="updateData('newTab', $event)"
          />
        </div>
      </div>
    </template>

    <!-- Embed Block -->
    <template v-else-if="block.type === 'embed'">
      <div class="space-y-3">
        <UInput
          :model-value="blockData.url"
          placeholder="URL YouTube, TikTok, Instagram, dll..."
          icon="i-heroicons-play"
          class="w-full"
          @update:model-value="updateData('url', $event)"
        />
        <UInput
          :model-value="blockData.caption"
          placeholder="Caption (opsional)..."
          class="w-full"
          @update:model-value="updateData('caption', $event)"
        />
      </div>
    </template>

    <!-- Pros Cons Block -->
    <template v-else-if="block.type === 'pros-cons'">
      <div class="space-y-4">
        <UInput
          :model-value="blockData.title"
          placeholder="Judul (opsional)..."
          class="w-full"
          @update:model-value="updateData('title', $event)"
        />
        <div class="grid gap-4 md:grid-cols-2">
          <!-- Pros -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-check-circle" class="h-5 w-5 text-green-500" />
              <span class="font-medium text-green-600">Kelebihan</span>
            </div>
            <div
              v-for="(item, index) in blockData.pros"
              :key="'pro-' + index"
              class="flex items-center gap-2"
            >
              <UInput
                :model-value="item"
                placeholder="Kelebihan..."
                class="flex-1 w-full"
                @update:model-value="
                  (val: string) => {
                    const pros = [...(blockData.pros || [])]
                    pros[Number(index)] = val
                    updateData('pros', pros)
                  }
                "
              />
              <UButton
                icon="i-heroicons-x-mark"
                color="error"
                variant="ghost"
                size="xs"
                @click="removeProsItem(Number(index))"
              />
            </div>
            <UButton icon="i-heroicons-plus" variant="soft" size="sm" @click="addProsItem">
              Tambah
            </UButton>
          </div>
          <!-- Cons -->
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <UIcon name="i-heroicons-x-circle" class="h-5 w-5 text-red-500" />
              <span class="font-medium text-red-600">Kekurangan</span>
            </div>
            <div
              v-for="(item, index) in blockData.cons"
              :key="'con-' + index"
              class="flex items-center gap-2"
            >
              <UInput
                :model-value="item"
                placeholder="Kekurangan..."
                class="flex-1 w-full"
                @update:model-value="
                  (val: string) => {
                    const cons = [...(blockData.cons || [])]
                    cons[Number(index)] = val
                    updateData('cons', cons)
                  }
                "
              />
              <UButton
                icon="i-heroicons-x-mark"
                color="error"
                variant="ghost"
                size="xs"
                @click="removeConsItem(Number(index))"
              />
            </div>
            <UButton icon="i-heroicons-plus" variant="soft" size="sm" @click="addConsItem">
              Tambah
            </UButton>
          </div>
        </div>
      </div>
    </template>

    <!-- Rating Box Block -->
    <template v-else-if="block.type === 'rating-box'">
      <div class="space-y-4">
        <UInput
          :model-value="blockData.title"
          placeholder="Judul rating..."
          class="w-full"
          @update:model-value="updateData('title', $event)"
        />
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Rating Keseluruhan:</span>
          <UInput
            :model-value="blockData.overallRating"
            type="number"
            min="0"
            max="5"
            step="0.5"
            class="w-20"
            @update:model-value="updateData('overallRating', Number($event))"
          />
          <span class="text-sm text-gray-500">/ 5</span>
        </div>
        <div class="space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-sm font-medium">Kriteria</span>
            <UButton icon="i-heroicons-plus" variant="soft" size="xs" @click="addRatingCriteria">
              Tambah
            </UButton>
          </div>
          <div
            v-for="(crit, index) in blockData.criteria"
            :key="index"
            class="flex items-center gap-2"
          >
            <UInput
              :model-value="crit.label"
              placeholder="Label..."
              class="flex-1 w-full"
              @update:model-value="
                (val: string) => {
                  const criteria = [...(blockData.criteria || [])]
                  criteria[Number(index)] = { ...criteria[Number(index)], label: val }
                  updateData('criteria', criteria)
                }
              "
            />
            <UInput
              :model-value="crit.rating"
              type="number"
              min="0"
              max="5"
              step="0.5"
              class="w-16"
              @update:model-value="
                (val: string | number) => {
                  const criteria = [...(blockData.criteria || [])]
                  criteria[Number(index)] = { ...criteria[Number(index)], rating: Number(val) }
                  updateData('criteria', criteria)
                }
              "
            />
            <UButton
              icon="i-heroicons-x-mark"
              color="error"
              variant="ghost"
              size="xs"
              @click="removeRatingCriteria(Number(index))"
            />
          </div>
        </div>
        <UTextarea
          :model-value="blockData.verdict"
          placeholder="Kesimpulan/verdict..."
          :rows="2"
          class="w-full"
          @update:model-value="updateData('verdict', $event)"
        />
      </div>
    </template>

    <!-- CTA Box Block -->
    <template v-else-if="block.type === 'cta-box'">
      <div class="space-y-3">
        <UInput
          :model-value="blockData.title"
          placeholder="Judul CTA..."
          class="w-full"
          @update:model-value="updateData('title', $event)"
        />
        <UTextarea
          :model-value="blockData.description"
          placeholder="Deskripsi (opsional)..."
          :rows="2"
          class="w-full"
          @update:model-value="updateData('description', $event)"
        />
        <div class="flex gap-3">
          <UInput
            :model-value="blockData.buttonText"
            placeholder="Teks button..."
            class="flex-1 w-full"
            @update:model-value="updateData('buttonText', $event)"
          />
          <UInput
            :model-value="blockData.buttonUrl"
            placeholder="URL button..."
            class="flex-1 w-full"
            @update:model-value="updateData('buttonUrl', $event)"
          />
        </div>
      </div>
    </template>

    <!-- Accordion Block -->
    <template v-else-if="block.type === 'accordion'">
      <div class="space-y-3">
        <div
          v-for="(item, index) in blockData.items"
          :key="index"
          class="rounded border p-3 dark:border-gray-700"
        >
          <div class="mb-2 flex items-center justify-between">
            <span class="text-sm font-medium">Item {{ Number(index) + 1 }}</span>
            <UButton
              icon="i-heroicons-x-mark"
              color="error"
              variant="ghost"
              size="xs"
              @click="removeAccordionItem(Number(index))"
            />
          </div>
          <div class="space-y-2">
            <UInput
              :model-value="item.title"
              placeholder="Judul..."
              class="w-full"
              @update:model-value="
                (val: string) => {
                  const items = [...(blockData.items || [])]
                  items[Number(index)] = { ...items[Number(index)], title: val }
                  updateData('items', items)
                }
              "
            />
            <UTextarea
              :model-value="item.content"
              placeholder="Konten..."
              :rows="2"
              class="w-full"
              @update:model-value="
                (val: string) => {
                  const items = [...(blockData.items || [])]
                  items[Number(index)] = { ...items[Number(index)], content: val }
                  updateData('items', items)
                }
              "
            />
          </div>
        </div>
        <UButton icon="i-heroicons-plus" variant="soft" size="sm" @click="addAccordionItem">
          Tambah Item
        </UButton>
      </div>
    </template>

    <!-- Table Block -->
    <template v-else-if="block.type === 'table'">
      <div class="space-y-3">
        <div class="flex items-center gap-2">
          <UButton icon="i-heroicons-plus" variant="soft" size="xs" @click="addTableColumn">
            Kolom
          </UButton>
          <UButton icon="i-heroicons-plus" variant="soft" size="xs" @click="addTableRow">
            Baris
          </UButton>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full border dark:border-gray-700">
            <thead>
              <tr>
                <th
                  v-for="(header, colIndex) in blockData.headers"
                  :key="'h-' + colIndex"
                  class="border-b bg-gray-50 p-2 dark:border-gray-700 dark:bg-gray-800"
                >
                  <div class="flex items-center gap-1">
                    <UInput
                      :model-value="header"
                      size="sm"
                      class="flex-1 w-full"
                      @update:model-value="
                        (val: string) => {
                          const headers = [...(blockData.headers || [])]
                          headers[Number(colIndex)] = val
                          updateData('headers', headers)
                        }
                      "
                    />
                    <UButton
                      icon="i-heroicons-x-mark"
                      color="error"
                      variant="ghost"
                      size="xs"
                      @click="removeTableColumn(Number(colIndex))"
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row, rowIndex) in blockData.rows" :key="'r-' + rowIndex">
                <td
                  v-for="(cell, colIndex) in row"
                  :key="'c-' + colIndex"
                  class="border-b p-2 dark:border-gray-700"
                >
                  <UInput
                    :model-value="cell"
                    size="sm"
                    class="w-full"
                    @update:model-value="
                      (val: string) => {
                        const rows = [...(blockData.rows || [])]
                        rows[Number(rowIndex)][Number(colIndex)] = val
                        updateData('rows', rows)
                      }
                    "
                  />
                </td>
                <td class="border-b p-2 dark:border-gray-700">
                  <UButton
                    icon="i-heroicons-x-mark"
                    color="error"
                    variant="ghost"
                    size="xs"
                    @click="removeTableRow(Number(rowIndex))"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- Gallery Block -->
    <template v-else-if="block.type === 'gallery'">
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Kolom:</span>
          <USelect
            :model-value="blockData.columns"
            :options="[
              { value: 2, label: '2 Kolom' },
              { value: 3, label: '3 Kolom' },
              { value: 4, label: '4 Kolom' },
            ]"
            option-attribute="label"
            value-attribute="value"
            size="sm"
            class="w-32"
            @update:model-value="updateData('columns', $event)"
          />
        </div>
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="(img, index) in blockData.images"
            :key="index"
            class="group relative aspect-square"
          >
            <img :src="img.src" :alt="img.alt" class="h-full w-full rounded object-cover" />
            <UButton
              icon="i-heroicons-x-mark"
              color="error"
              variant="solid"
              size="xs"
              class="absolute right-1 top-1 opacity-0 transition group-hover:opacity-100"
              @click="removeGalleryImage(Number(index))"
            />
          </div>
          <label
            class="flex aspect-square cursor-pointer flex-col items-center justify-center rounded border-2 border-dashed border-gray-300 hover:border-primary-500 dark:border-gray-600"
          >
            <UIcon name="i-heroicons-plus" class="h-6 w-6 text-gray-400" />
            <span class="mt-1 text-xs text-gray-500">Tambah</span>
            <input
              type="file"
              class="hidden"
              accept="image/*"
              multiple
              @change="handleGalleryImageUpload"
            />
          </label>
        </div>
      </div>
    </template>

    <!-- TOC Block -->
    <template v-else-if="block.type === 'toc'">
      <div class="space-y-3">
        <UInput
          :model-value="blockData.title"
          placeholder="Judul Daftar Isi..."
          class="w-full"
          @update:model-value="updateData('title', $event)"
        />
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Max Depth:</span>
          <USelect
            :model-value="blockData.maxDepth"
            :options="[
              { value: 2, label: 'H2 saja' },
              { value: 3, label: 'H2 - H3' },
              { value: 4, label: 'H2 - H4' },
            ]"
            option-attribute="label"
            value-attribute="value"
            size="sm"
            class="w-32"
            @update:model-value="updateData('maxDepth', $event)"
          />
        </div>
        <p class="text-sm text-gray-500">
          Daftar isi akan dibuat otomatis berdasarkan heading dalam artikel.
        </p>
      </div>
    </template>

    <!-- Product Card Block -->
    <template v-else-if="block.type === 'product-card'">
      <div class="space-y-3">
        <UInput
          :model-value="blockData.productSlug"
          placeholder="Slug produk (kosongkan untuk input manual)..."
          class="w-full"
          @update:model-value="updateData('productSlug', $event)"
        />
        <div class="text-sm text-gray-500">atau input manual:</div>
        <div class="grid gap-3 md:grid-cols-2">
          <UInput
            :model-value="blockData.name"
            placeholder="Nama produk..."
            class="w-full"
            @update:model-value="updateData('name', $event)"
          />
          <UInput
            :model-value="blockData.url"
            placeholder="URL produk..."
            class="w-full"
            @update:model-value="updateData('url', $event)"
          />
          <UInput
            :model-value="blockData.price"
            type="number"
            placeholder="Harga..."
            class="w-full"
            @update:model-value="updateData('price', Number($event))"
          />
          <UInput
            :model-value="blockData.image"
            placeholder="URL gambar..."
            class="w-full"
            @update:model-value="updateData('image', $event)"
          />
        </div>
      </div>
    </template>

    <!-- Product List Block -->
    <template v-else-if="block.type === 'product-list'">
      <div class="space-y-3">
        <UInput
          :model-value="blockData.title"
          placeholder="Judul (opsional)..."
          class="w-full"
          @update:model-value="updateData('title', $event)"
        />
        <UInput
          :model-value="blockData.category"
          placeholder="Kategori produk..."
          class="w-full"
          @update:model-value="updateData('category', $event)"
        />
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Jumlah:</span>
          <UInput
            :model-value="blockData.limit"
            type="number"
            min="1"
            max="12"
            class="w-20"
            @update:model-value="updateData('limit', Number($event))"
          />
          <span class="text-sm text-gray-500">Kolom:</span>
          <USelect
            :model-value="blockData.columns"
            :options="[
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
            ]"
            option-attribute="label"
            value-attribute="value"
            size="sm"
            class="w-20"
            @update:model-value="updateData('columns', $event)"
          />
        </div>
      </div>
    </template>

    <!-- HTML Block -->
    <template v-else-if="block.type === 'html'">
      <div class="space-y-3">
        <UTextarea
          :model-value="blockData.html"
          placeholder="<div>HTML kustom...</div>"
          :rows="6"
          class="font-mono w-full"
          @update:model-value="updateData('html', $event)"
        />
        <UAlert
          color="warning"
          variant="soft"
          icon="i-heroicons-exclamation-triangle"
          title="Perhatian"
          description="HTML kustom bisa berbahaya. Pastikan kode yang dimasukkan aman."
        />
      </div>
    </template>

    <!-- Newsletter Block -->
    <template v-else-if="block.type === 'newsletter'">
      <div class="space-y-3">
        <UInput
          :model-value="blockData.title"
          placeholder="Judul..."
          class="w-full"
          @update:model-value="updateData('title', $event)"
        />
        <UTextarea
          :model-value="blockData.description"
          placeholder="Deskripsi..."
          :rows="2"
          class="w-full"
          @update:model-value="updateData('description', $event)"
        />
        <UInput
          :model-value="blockData.buttonText"
          placeholder="Teks button..."
          class="w-full"
          @update:model-value="updateData('buttonText', $event)"
        />
      </div>
    </template>

    <!-- Author Box Block -->
    <template v-else-if="block.type === 'author-box'">
      <div class="space-y-3">
        <div class="flex items-center gap-4">
          <UCheckbox
            :model-value="blockData.showBio"
            label="Tampilkan bio"
            @update:model-value="updateData('showBio', $event)"
          />
          <UCheckbox
            :model-value="blockData.showSocial"
            label="Tampilkan social media"
            @update:model-value="updateData('showSocial', $event)"
          />
        </div>
        <p class="text-sm text-gray-500">
          Info penulis akan diambil otomatis dari data penulis artikel.
        </p>
      </div>
    </template>

    <!-- Related Articles Block -->
    <template v-else-if="block.type === 'related-articles'">
      <div class="space-y-3">
        <UInput
          :model-value="blockData.title"
          placeholder="Judul (opsional)..."
          class="w-full"
          @update:model-value="updateData('title', $event)"
        />
        <UInput
          :model-value="blockData.category"
          placeholder="Kategori (kosongkan untuk otomatis)..."
          class="w-full"
          @update:model-value="updateData('category', $event)"
        />
        <div class="flex items-center gap-3">
          <span class="text-sm text-gray-500">Jumlah:</span>
          <UInput
            :model-value="blockData.limit"
            type="number"
            min="1"
            max="6"
            class="w-20"
            @update:model-value="updateData('limit', Number($event))"
          />
        </div>
      </div>
    </template>

    <!-- Default fallback -->
    <template v-else>
      <div
        class="rounded bg-yellow-50 p-4 text-center text-sm text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
      >
        Editor untuk blok "{{ block.type }}" belum tersedia.
      </div>
    </template>
  </div>
</template>
