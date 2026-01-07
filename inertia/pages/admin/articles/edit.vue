<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { router, Head, useForm } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import ArticlePageBuilder from '~/components/admin/ArticlePageBuilder.vue'
import type { ArticleEditProps, ArticleFormData } from '@/types/admin_article'
import { articleToFormData, getStatusLabel, getStatusColor } from '@/types/admin_article'

defineOptions({ layout: AdminLayout })

const props = defineProps<ArticleEditProps>()

// Form state
const form = useForm<ArticleFormData>(articleToFormData(props.article))
const activeTab = ref('content')
const isSaving = ref(false)
const hasUnsavedChanges = ref(false)

// File upload refs
const thumbnailInputRef = ref<HTMLInputElement | null>(null)
const bannerInputRef = ref<HTMLInputElement | null>(null)
const thumbnailPreview = ref<string | null>(props.article.thumbnail || null)
const bannerPreview = ref<string | null>(props.article.banner || null)

// File upload handlers
function handleThumbnailSelect(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    form.thumbnail = file
    const reader = new FileReader()
    reader.onload = (e) => {
      thumbnailPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function handleBannerSelect(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    form.banner = file
    const reader = new FileReader()
    reader.onload = (e) => {
      bannerPreview.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

function removeThumbnail() {
  form.thumbnail = null
  form.thumbnailUrl = ''
  thumbnailPreview.value = null
  if (thumbnailInputRef.value) {
    thumbnailInputRef.value.value = ''
  }
}

function removeBanner() {
  form.banner = null
  form.bannerUrl = ''
  bannerPreview.value = null
  if (bannerInputRef.value) {
    bannerInputRef.value.value = ''
  }
}

// Track changes
watch(
  () => form.data(),
  () => {
    hasUnsavedChanges.value = true
  },
  { deep: true }
)

// Tags management
const tagInput = ref('')

function addTag() {
  const tag = tagInput.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
  }
  tagInput.value = ''
}

function removeTag(index: number) {
  form.tags.splice(index, 1)
}

function handleTagKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' || event.key === ',') {
    event.preventDefault()
    addTag()
  }
}

// Form submission
function handleSubmit(status?: 'draft' | 'published' | 'archived') {
  if (status) {
    form.status = status
  }
  isSaving.value = true

  form.put(`/admin/articles/${props.article.id}`, {
    preserveScroll: true,
    onSuccess: () => {
      hasUnsavedChanges.value = false
    },
    onFinish: () => {
      isSaving.value = false
    },
  })
}

// Delete article
function handleDelete() {
  if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${props.article.title}"?`)) return

  router.delete(`/admin/articles/${props.article.id}`)
}

// Preview
function openPreview() {
  window.open(`/artikel/${props.article.slug}`, '_blank')
}

// Tabs
const tabs = [
  { value: 'content', label: 'Konten', icon: 'i-heroicons-document-text' },
  { value: 'media', label: 'Media', icon: 'i-heroicons-photo' },
  { value: 'seo', label: 'SEO', icon: 'i-heroicons-magnifying-glass' },
  { value: 'settings', label: 'Pengaturan', icon: 'i-heroicons-cog-6-tooth' },
]

// Meta description character count
const metaDescriptionCount = computed(() => form.metaDescription?.length || 0)
const metaTitleCount = computed(() => form.metaTitle?.length || 0)

// Format date
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <Head :title="`Edit: ${article.title}`" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div class="flex items-center gap-4">
        <UButton
          icon="i-heroicons-arrow-left"
          color="neutral"
          variant="ghost"
          to="/admin/articles"
        />
        <div>
          <div class="flex items-center gap-3">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Artikel</h1>
            <UBadge :color="getStatusColor(article.status)" variant="soft">
              {{ getStatusLabel(article.status) }}
            </UBadge>
            <UBadge v-if="hasUnsavedChanges" color="warning" variant="soft">
              Belum disimpan
            </UBadge>
          </div>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Terakhir diubah: {{ formatDate(article.updatedAt) }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <UButton
          color="neutral"
          variant="soft"
          icon="i-heroicons-eye"
          @click="openPreview"
        >
          Preview
        </UButton>
        <UDropdownMenu
          :items="[
            [
              {
                label: article.status === 'published' ? 'Jadikan Draft' : 'Publikasikan',
                icon: article.status === 'published' ? 'i-heroicons-archive-box' : 'i-heroicons-paper-airplane',
                onSelect: () => handleSubmit(article.status === 'published' ? 'draft' : 'published'),
              },
              {
                label: 'Arsipkan',
                icon: 'i-heroicons-archive-box-arrow-down',
                onSelect: () => handleSubmit('archived'),
                disabled: article.status === 'archived',
              },
            ],
            [
              {
                label: 'Hapus',
                icon: 'i-heroicons-trash',
                color: 'error' as const,
                onSelect: handleDelete,
              },
            ],
          ]"
          :content="{ align: 'end' }"
          :modal="false"
        >
          <UButton
            color="neutral"
            variant="outline"
            icon="i-heroicons-ellipsis-vertical"
          />
        </UDropdownMenu>
        <UButton
          color="primary"
          :loading="isSaving"
          :disabled="isSaving"
          icon="i-heroicons-check"
          @click="handleSubmit()"
        >
          Simpan Perubahan
        </UButton>
      </div>
    </div>

    <!-- Article stats -->
    <div class="grid grid-cols-2 gap-4 md:grid-cols-5">
      <UCard class="text-center">
        <p class="text-xs text-gray-500">Views</p>
        <p class="text-xl font-semibold">{{ article.viewCount.toLocaleString('id-ID') }}</p>
      </UCard>
      <UCard class="text-center">
        <p class="text-xs text-gray-500">Likes</p>
        <p class="text-xl font-semibold">{{ article.likeCount.toLocaleString('id-ID') }}</p>
      </UCard>
      <UCard class="text-center">
        <p class="text-xs text-gray-500">Shares</p>
        <p class="text-xl font-semibold">{{ article.shareCount.toLocaleString('id-ID') }}</p>
      </UCard>
      <UCard class="text-center">
        <p class="text-xs text-gray-500">Waktu Baca</p>
        <p class="text-xl font-semibold">{{ article.readTime }} menit</p>
      </UCard>
      <UCard class="text-center">
        <p class="text-xs text-gray-500">Blok Konten</p>
        <p class="text-xl font-semibold">{{ form.blocks.length }}</p>
      </UCard>
    </div>

    <!-- Tabs -->
    <UTabs v-model="activeTab" :items="tabs" />

    <!-- Form -->
    <form @submit.prevent="handleSubmit()">
      <!-- Content Tab -->
      <div v-show="activeTab === 'content'" class="space-y-6">
        <UCard>
          <div class="space-y-4">
            <!-- Title -->
            <UFormField label="Judul Artikel" required :error="form.errors.title">
              <UInput
                v-model="form.title"
                placeholder="Masukkan judul artikel..."
                size="lg"
                :class="{ 'text-xl font-semibold': true }"
                class="w-full"
              />
            </UFormField>

            <!-- Slug -->
            <UFormField label="Slug (URL)" :error="form.errors.slug">
              <UInput
                v-model="form.slug"
                placeholder="url-artikel"
                icon="i-heroicons-link"
                class="w-full"
              >
                <template #leading>
                  <span class="text-sm text-gray-500">/artikel/</span>
                </template>
              </UInput>
            </UFormField>

            <!-- Excerpt -->
            <UFormField label="Ringkasan" :error="form.errors.excerpt">
              <UTextarea
                v-model="form.excerpt"
                placeholder="Tulis ringkasan singkat artikel (akan ditampilkan di daftar artikel)..."
                :rows="3"
                class="w-full"
              />
            </UFormField>
          </div>
        </UCard>

        <!-- Page Builder -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">Konten Artikel</h3>
              <UBadge color="info" variant="soft">
                {{ form.blocks.length }} blok
              </UBadge>
            </div>
          </template>
          <ArticlePageBuilder
            v-model="form.blocks"
            upload-url="/admin/articles/upload-image"
            class="w-full"
          />
        </UCard>
      </div>

      <!-- Media Tab -->
      <div v-show="activeTab === 'media'" class="space-y-6">
        <UCard>
          <template #header>
            <h3 class="font-semibold">Gambar Artikel</h3>
          </template>
          <div class="grid gap-6 md:grid-cols-2">
            <!-- Thumbnail -->
            <UFormField label="Thumbnail" help="Gambar yang ditampilkan di daftar artikel (rasio 16:9)">
              <div class="space-y-3">
                <input
                  ref="thumbnailInputRef"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="hidden"
                  @change="handleThumbnailSelect"
                />
                <div
                  v-if="thumbnailPreview"
                  class="relative aspect-video overflow-hidden rounded-lg border dark:border-gray-700"
                >
                  <img
                    :src="thumbnailPreview"
                    alt="Thumbnail"
                    class="h-full w-full object-cover"
                  />
                  <UButton
                    icon="i-heroicons-x-mark"
                    color="error"
                    variant="solid"
                    size="xs"
                    class="absolute right-2 top-2"
                    @click="removeThumbnail"
                  />
                </div>
                <div
                  v-else
                  class="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-500 dark:border-gray-600"
                  @click="thumbnailInputRef?.click()"
                >
                  <UIcon name="i-heroicons-photo" class="mb-2 h-8 w-8 text-gray-400" />
                  <span class="text-sm text-gray-500">Klik untuk upload thumbnail</span>
                </div>
                <UButton
                  type="button"
                  color="neutral"
                  variant="outline"
                  size="sm"
                  @click="thumbnailInputRef?.click()"
                >
                  <UIcon name="i-heroicons-arrow-up-tray" class="mr-2 h-4 w-4" />
                  {{ thumbnailPreview ? 'Ganti Thumbnail' : 'Upload Thumbnail' }}
                </UButton>
              </div>
            </UFormField>

            <!-- Banner -->
            <UFormField label="Banner" help="Gambar header yang ditampilkan di halaman artikel">
              <div class="space-y-3">
                <input
                  ref="bannerInputRef"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  class="hidden"
                  @change="handleBannerSelect"
                />
                <div
                  v-if="bannerPreview"
                  class="relative aspect-video overflow-hidden rounded-lg border dark:border-gray-700"
                >
                  <img
                    :src="bannerPreview"
                    alt="Banner"
                    class="h-full w-full object-cover"
                  />
                  <UButton
                    icon="i-heroicons-x-mark"
                    color="error"
                    variant="solid"
                    size="xs"
                    class="absolute right-2 top-2"
                    @click="removeBanner"
                  />
                </div>
                <div
                  v-else
                  class="flex aspect-video cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 transition-colors hover:border-primary-500 dark:border-gray-600"
                  @click="bannerInputRef?.click()"
                >
                  <UIcon name="i-heroicons-photo" class="mb-2 h-8 w-8 text-gray-400" />
                  <span class="text-sm text-gray-500">Klik untuk upload banner</span>
                </div>
                <UButton
                  type="button"
                  color="neutral"
                  variant="outline"
                  size="sm"
                  @click="bannerInputRef?.click()"
                >
                  <UIcon name="i-heroicons-arrow-up-tray" class="mr-2 h-4 w-4" />
                  {{ bannerPreview ? 'Ganti Banner' : 'Upload Banner' }}
                </UButton>
              </div>
            </UFormField>
          </div>
        </UCard>
      </div>

      <!-- SEO Tab -->
      <div v-show="activeTab === 'seo'" class="space-y-6">
        <UCard>
          <template #header>
            <h3 class="font-semibold">Pengaturan SEO</h3>
          </template>
          <div class="space-y-4">
            <!-- Meta Title -->
            <UFormField label="Meta Title" :help="`${metaTitleCount}/70 karakter`">
              <UInput
                v-model="form.metaTitle"
                placeholder="Judul untuk mesin pencari (kosongkan untuk menggunakan judul artikel)..."
                :maxlength="70"
                class="w-full"
              />
            </UFormField>

            <!-- Meta Description -->
            <UFormField label="Meta Description" :help="`${metaDescriptionCount}/160 karakter`">
              <UTextarea
                v-model="form.metaDescription"
                placeholder="Deskripsi untuk mesin pencari (kosongkan untuk menggunakan ringkasan)..."
                :rows="3"
                :maxlength="160"
                class="w-full"
              />
            </UFormField>

            <!-- Meta Keywords -->
            <UFormField label="Meta Keywords">
              <UInput
                v-model="form.metaKeywords"
                placeholder="kata kunci, dipisah, koma..."
                class="w-full"
              />
            </UFormField>

            <!-- SEO Preview -->
            <div class="mt-6 rounded-lg border bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
              <p class="mb-2 text-xs text-gray-500">Preview di Google:</p>
              <div class="space-y-1">
                <p class="text-lg text-blue-600 hover:underline">
                  {{ form.metaTitle || form.title || 'Judul Artikel' }}
                </p>
                <p class="text-sm text-green-600">
                  https://ogitu.com/artikel/{{ form.slug || 'url-artikel' }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ form.metaDescription || form.excerpt || 'Deskripsi artikel akan muncul di sini...' }}
                </p>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Settings Tab -->
      <div v-show="activeTab === 'settings'" class="space-y-6">
        <div class="grid gap-6 md:grid-cols-2">
          <!-- Category & Tags -->
          <UCard>
            <template #header>
              <h3 class="font-semibold">Kategori & Tags</h3>
            </template>
            <div class="space-y-4">
              <!-- Category -->
              <UFormField label="Kategori" required :error="form.errors.category">
                <USelect
                  v-model="form.category"
                  :items="categories"
                  label-key="label"
                  value-key="value"
                  placeholder="Pilih kategori..."
                  class="w-full"
                  :portal="false"
                />
              </UFormField>

              <!-- Tags -->
              <UFormField label="Tags">
                <div class="space-y-2">
                  <div class="flex gap-2">
                    <UInput
                      v-model="tagInput"
                      placeholder="Tambah tag..."
                      class="flex-1 w-full"
                      @keydown="handleTagKeydown"
                    />
                    <UButton
                      icon="i-heroicons-plus"
                      color="primary"
                      variant="soft"
                      @click="addTag"
                    />
                  </div>
                  <div v-if="form.tags.length > 0" class="flex flex-wrap gap-2">
                    <UBadge
                      v-for="(tag, index) in form.tags"
                      :key="index"
                      color="neutral"
                      variant="soft"
                      class="cursor-pointer"
                      @click="removeTag(index)"
                    >
                      {{ tag }}
                      <UIcon name="i-heroicons-x-mark" class="ml-1 h-3 w-3" />
                    </UBadge>
                  </div>
                </div>
              </UFormField>
            </div>
          </UCard>

          <!-- Author & Options -->
          <UCard>
            <template #header>
              <h3 class="font-semibold">Pengaturan Lainnya</h3>
            </template>
            <div class="space-y-4">
              <!-- Author -->
              <UFormField label="Penulis">
                <USelect
                  v-model="form.authorId"
                  :items="authors.map((a) => ({ value: a.id, label: a.fullName }))"
                  label-key="label"
                  value-key="value"
                  placeholder="Pilih penulis..."
                  class="w-full"
                  :portal="false"
                />
              </UFormField>

              <!-- Status -->
              <UFormField label="Status">
                <USelect
                  v-model="form.status"
                  :items="[
                    { value: 'draft', label: 'Draft' },
                    { value: 'published', label: 'Dipublikasikan' },
                    { value: 'archived', label: 'Diarsipkan' },
                  ]"
                  label-key="label"
                  value-key="value"
                  class="w-full"
                  :portal="false"
                />
              </UFormField>

              <!-- Options -->
              <div class="space-y-3 pt-4">
                <UCheckbox
                  v-model="form.isFeatured"
                  label="Artikel Unggulan"
                  help="Artikel ini akan ditampilkan di bagian unggulan"
                />
                <UCheckbox
                  v-model="form.isPinned"
                  label="Sematkan di Atas"
                  help="Artikel ini akan selalu muncul di atas daftar"
                />
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </form>
  </div>
</template>
