<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { router, Head } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import type { ArticleIndexProps, ArticleFilters, AdminArticle } from '@/types/admin_article'
import { getStatusLabel, getStatusColor, getCategoryColor } from '@/types/admin_article'

defineOptions({ layout: AdminLayout })

const props = defineProps<ArticleIndexProps>()

// Local filter state
const filters = ref<ArticleFilters>({
  search: props.filters.search,
  status: props.filters.status,
  category: props.filters.category,
  sortBy: props.filters.sortBy,
  sortOrder: props.filters.sortOrder,
})

// Debounced search
const searchTimeout = ref<ReturnType<typeof setTimeout> | null>(null)

watch(
  () => filters.value.search,
  () => {
    if (searchTimeout.value) clearTimeout(searchTimeout.value)
    searchTimeout.value = setTimeout(() => {
      applyFilters()
    }, 500)
  }
)

function applyFilters() {
  router.get(
    '/admin/articles',
    {
      search: filters.value.search || undefined,
      status: filters.value.status || undefined,
      category: filters.value.category || undefined,
      sortBy: filters.value.sortBy || undefined,
      sortOrder: filters.value.sortOrder || undefined,
    },
    { preserveState: true, preserveScroll: true }
  )
}

function resetFilters() {
  filters.value = {
    search: '',
    status: '',
    category: '',
    sortBy: 'createdAt',
    sortOrder: 'desc',
  }
  router.get('/admin/articles')
}

function goToPage(page: number) {
  router.get(
    '/admin/articles',
    { ...filters.value, page },
    { preserveState: true, preserveScroll: true }
  )
}

// Actions
const selectedArticles = ref<number[]>([])
const isDeleting = ref<number | null>(null)

function toggleSelectAll(checked: boolean) {
  if (checked) {
    selectedArticles.value = props.articles.data.map((a) => a.id)
  } else {
    selectedArticles.value = []
  }
}

function toggleArticleSelection(articleId: number) {
  const index = selectedArticles.value.indexOf(articleId)
  if (index === -1) {
    selectedArticles.value.push(articleId)
  } else {
    selectedArticles.value.splice(index, 1)
  }
}

function toggleStatus(article: AdminArticle) {
  router.patch(
    `/admin/articles/${article.id}/status`,
    {},
    { preserveState: true, preserveScroll: true }
  )
}

function toggleFeatured(article: AdminArticle) {
  router.patch(
    `/admin/articles/${article.id}/featured`,
    {},
    { preserveState: true, preserveScroll: true }
  )
}

function duplicateArticle(article: AdminArticle) {
  router.post(
    `/admin/articles/${article.id}/duplicate`,
    {},
    { preserveState: false }
  )
}

function deleteArticle(article: AdminArticle) {
  if (!confirm(`Apakah Anda yakin ingin menghapus artikel "${article.title}"?`)) return

  isDeleting.value = article.id
  router.delete(`/admin/articles/${article.id}`, {
    preserveState: true,
    preserveScroll: true,
    onFinish: () => {
      isDeleting.value = null
    },
  })
}

// Format date
function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Status filter options
const statusOptions = [
  { value: '', label: 'Semua Status' },
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Dipublikasikan' },
  { value: 'archived', label: 'Diarsipkan' },
]

const categoryOptions = computed(() => [
  { value: '', label: 'Semua Kategori' },
  ...props.categories,
])

// Sorting
const sortOptions = [
  { value: 'createdAt', label: 'Tanggal Dibuat' },
  { value: 'title', label: 'Judul' },
  { value: 'viewCount', label: 'Views' },
  { value: 'publishedAt', label: 'Tanggal Publish' },
]
</script>

<template>
  <Head title="Kelola Artikel" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Kelola Artikel</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Kelola semua artikel dan konten blog
        </p>
      </div>
      <UButton
        to="/admin/articles/create"
        icon="i-heroicons-plus"
        color="primary"
      >
        Tambah Artikel
      </UButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <UCard class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Total</p>
        <p class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ stats.total }}
        </p>
      </UCard>
      <UCard class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Dipublikasikan</p>
        <p class="text-2xl font-bold text-green-600">{{ stats.published }}</p>
      </UCard>
      <UCard class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Draft</p>
        <p class="text-2xl font-bold text-yellow-600">{{ stats.draft }}</p>
      </UCard>
      <UCard class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">Unggulan</p>
        <p class="text-2xl font-bold text-primary-600">{{ stats.featured }}</p>
      </UCard>
    </div>

    <!-- Filters -->
    <UCard>
      <div class="flex flex-col gap-4 md:flex-row md:items-center">
        <UInput
          v-model="filters.search"
          icon="i-heroicons-magnifying-glass"
          placeholder="Cari artikel..."
          class="w-full md:w-64"
        />
        <USelect
          v-model="filters.status"
          :options="statusOptions"
          option-attribute="label"
          value-attribute="value"
          placeholder="Status"
          class="w-full md:w-40"
          @update:modelValue="applyFilters"
        />
        <USelect
          v-model="filters.category"
          :options="categoryOptions"
          option-attribute="label"
          value-attribute="value"
          placeholder="Kategori"
          class="w-full md:w-48"
          @update:modelValue="applyFilters"
        />
        <USelect
          v-model="filters.sortBy"
          :options="sortOptions"
          option-attribute="label"
          value-attribute="value"
          class="w-full md:w-40"
          @update:modelValue="applyFilters"
        />
        <UButton
          color="neutral"
          variant="ghost"
          icon="i-heroicons-arrow-path"
          @click="resetFilters"
        >
          Reset
        </UButton>
      </div>
    </UCard>

    <!-- Articles Table -->
    <UCard class="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th class="w-10 px-4 py-3">
                <UCheckbox
                  :model-value="selectedArticles.length === articles.data.length && articles.data.length > 0"
                  @update:modelValue="toggleSelectAll"
                />
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Judul
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Kategori
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Penulis
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Status
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Statistik
              </th>
              <th class="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Dibuat
              </th>
              <th class="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
            <tr
              v-for="article in articles.data"
              :key="article.id"
              class="hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <td class="px-4 py-3">
                <UCheckbox
                  :model-value="selectedArticles.includes(article.id)"
                  @update:model-value="toggleArticleSelection(article.id)"
                />
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <img
                    v-if="article.thumbnail"
                    :src="article.thumbnail"
                    :alt="article.title"
                    class="h-12 w-16 rounded object-cover"
                  />
                  <div
                    v-else
                    class="flex h-12 w-16 items-center justify-center rounded bg-gray-100 dark:bg-gray-800"
                  >
                    <UIcon name="i-heroicons-photo" class="text-gray-400" />
                  </div>
                  <div class="min-w-0 flex-1">
                    <p class="truncate font-medium text-gray-900 dark:text-white">
                      {{ article.title }}
                    </p>
                    <p class="truncate text-sm text-gray-500 dark:text-gray-400">
                      {{ article.slug }}
                    </p>
                    <div class="mt-1 flex items-center gap-2">
                      <UBadge
                        v-if="article.isFeatured"
                        color="warning"
                        variant="soft"
                        size="xs"
                      >
                        <UIcon name="i-heroicons-star" class="mr-1 h-3 w-3" />
                        Unggulan
                      </UBadge>
                      <UBadge
                        v-if="article.isPinned"
                        color="info"
                        variant="soft"
                        size="xs"
                      >
                        <UIcon name="i-heroicons-map-pin" class="mr-1 h-3 w-3" />
                        Disematkan
                      </UBadge>
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3">
                <UBadge
                  :color="getCategoryColor(article.category)"
                  variant="soft"
                >
                  {{ categories.find((c) => c.value === article.category)?.label || article.category }}
                </UBadge>
              </td>
              <td class="px-4 py-3">
                <div v-if="article.author" class="flex items-center gap-2">
                  <UAvatar
                    :src="article.author.avatar || undefined"
                    :alt="article.author.fullName"
                    size="xs"
                  />
                  <span class="text-sm text-gray-700 dark:text-gray-300">
                    {{ article.author.fullName }}
                  </span>
                </div>
                <span v-else class="text-sm text-gray-400">-</span>
              </td>
              <td class="px-4 py-3">
                <UBadge
                  :color="getStatusColor(article.status)"
                  variant="soft"
                >
                  {{ getStatusLabel(article.status) }}
                </UBadge>
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-eye" class="h-4 w-4" />
                    {{ article.viewCount }}
                  </span>
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-heart" class="h-4 w-4" />
                    {{ article.likeCount }}
                  </span>
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-clock" class="h-4 w-4" />
                    {{ article.readTime }} mnt
                  </span>
                </div>
              </td>
              <td class="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(article.createdAt) }}
              </td>
              <td class="px-4 py-3">
                <div class="flex items-center justify-end gap-2">
                  <UTooltip text="Lihat">
                    <UButton
                      icon="i-heroicons-eye"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                      :to="`/admin/articles/${article.id}`"
                    />
                  </UTooltip>
                  <UTooltip text="Edit">
                    <UButton
                      icon="i-heroicons-pencil"
                      color="primary"
                      variant="ghost"
                      size="xs"
                      :to="`/admin/articles/${article.id}/edit`"
                    />
                  </UTooltip>
                  <UDropdownMenu
                    :items="[
                      [
                        {
                          label: article.status === 'published' ? 'Jadikan Draft' : 'Publikasikan',
                          icon: article.status === 'published' ? 'i-heroicons-archive-box' : 'i-heroicons-paper-airplane',
                          onSelect: () => toggleStatus(article),
                        },
                        {
                          label: article.isFeatured ? 'Hapus Unggulan' : 'Jadikan Unggulan',
                          icon: 'i-heroicons-star',
                          onSelect: () => toggleFeatured(article),
                        },
                        {
                          label: 'Duplikat',
                          icon: 'i-heroicons-document-duplicate',
                          onSelect: () => duplicateArticle(article),
                        },
                      ],
                      [
                        {
                          label: 'Hapus',
                          icon: 'i-heroicons-trash',
                          color: 'error' as const,
                          onSelect: () => deleteArticle(article),
                        },
                      ],
                    ]"
                    :content="{ align: 'end' }"
                    :modal="false"
                  >
                    <UButton
                      icon="i-heroicons-ellipsis-vertical"
                      color="neutral"
                      variant="ghost"
                      size="xs"
                    />
                  </UDropdownMenu>
                </div>
              </td>
            </tr>
            <tr v-if="articles.data.length === 0">
              <td colspan="8" class="px-4 py-12 text-center">
                <UIcon
                  name="i-heroicons-document-text"
                  class="mx-auto mb-4 h-12 w-12 text-gray-300"
                />
                <p class="text-gray-500 dark:text-gray-400">Tidak ada artikel ditemukan</p>
                <UButton
                  to="/admin/articles/create"
                  color="primary"
                  variant="soft"
                  class="mt-4"
                >
                  Buat Artikel Baru
                </UButton>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="articles.meta.lastPage > 1"
        class="flex items-center justify-between border-t border-gray-200 px-4 py-3 dark:border-gray-700"
      >
        <div class="text-sm text-gray-500 dark:text-gray-400">
          Menampilkan {{ (articles.meta.currentPage - 1) * articles.meta.perPage + 1 }} -
          {{ Math.min(articles.meta.currentPage * articles.meta.perPage, articles.meta.total) }}
          dari {{ articles.meta.total }} artikel
        </div>
        <UPagination
          :model-value="articles.meta.currentPage"
          :page-count="articles.meta.perPage"
          :total="articles.meta.total"
          @update:model-value="goToPage"
        />
      </div>
    </UCard>
  </div>
</template>
