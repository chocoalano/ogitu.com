<script setup lang="ts">
import type { Category, CollectionFilters, SortOption } from '~/types/product'

const props = defineProps<{
  totalShown: number
  totalProducts: number
  categories: Category[]
  activeFilterCount: number
  hasActiveFilters: boolean
  sortOptions: SortOption[]
}>()

const viewMode = defineModel<'grid' | 'list'>('viewMode', { required: true })
const filters = defineModel<CollectionFilters>('filters', { required: true })

const emit = defineEmits<{
  openMobileFilter: []
  apply: []
  clearFilter: [key: keyof CollectionFilters]
}>()

const getCategoryName = (slug: string) => {
  return props.categories.find((c) => c.slug === slug)?.name || slug
}
</script>

<template>
  <div
    class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mb-6"
  >
    <div class="flex flex-wrap items-center justify-between gap-4">
      <!-- Results Info -->
      <div class="flex items-center gap-4">
        <p class="text-sm text-gray-600 dark:text-gray-400">
          Menampilkan
          <span class="font-semibold text-gray-900 dark:text-white">{{ totalShown }}</span>
          dari
          <span class="font-semibold text-gray-900 dark:text-white">{{ totalProducts }}</span>
          produk
        </p>

        <!-- Mobile Filter Button -->
        <UButton
          class="lg:hidden"
          color="neutral"
          variant="outline"
          size="sm"
          @click="emit('openMobileFilter')"
        >
          <UIcon name="i-heroicons-funnel" class="w-4 h-4" />
          Filter
          <UBadge
            v-if="activeFilterCount > 0"
            :label="activeFilterCount.toString()"
            color="primary"
            size="xs"
          />
        </UButton>
      </div>

      <!-- Sort & View Options -->
      <div class="flex items-center gap-3">
        <!-- Sort Dropdown -->
        <USelectMenu
          v-model="filters.sortBy"
          :items="sortOptions"
          value-key="value"
          class="w-44"
          :ui="{ content: 'z-[100]' }"
        >
          <template #leading>
            <UIcon name="i-heroicons-arrows-up-down" class="w-4 h-4" />
          </template>
        </USelectMenu>

        <!-- View Mode Toggle -->
        <div
          class="hidden sm:flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1"
        >
          <button
            :class="[
              'p-2 rounded-md transition-colors',
              viewMode === 'grid'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
            @click="viewMode = 'grid'"
          >
            <UIcon name="i-heroicons-squares-2x2" class="w-4 h-4" />
          </button>
          <button
            :class="[
              'p-2 rounded-md transition-colors',
              viewMode === 'list'
                ? 'bg-primary-500 text-white'
                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300',
            ]"
            @click="viewMode = 'list'"
          >
            <UIcon name="i-heroicons-list-bullet" class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- Active Filters Tags -->
    <div
      v-if="hasActiveFilters"
      class="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
    >
      <span class="text-sm text-gray-500 dark:text-gray-400">Filter aktif:</span>

      <UBadge
        v-if="filters.category"
        color="primary"
        variant="soft"
        class="cursor-pointer"
        @click="emit('clearFilter', 'category')"
      >
        Kategori: {{ getCategoryName(filters.category) }}
        <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
      </UBadge>

      <UBadge
        v-if="filters.brand"
        color="primary"
        variant="soft"
        class="cursor-pointer"
        @click="emit('clearFilter', 'brand')"
      >
        Brand: {{ filters.brand }}
        <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
      </UBadge>

      <UBadge
        v-if="filters.minPrice || filters.maxPrice"
        color="primary"
        variant="soft"
        class="cursor-pointer"
        @click="
          () => {
            emit('clearFilter', 'minPrice')
            emit('clearFilter', 'maxPrice')
          }
        "
      >
        Harga: {{ filters.minPrice || '0' }} - {{ filters.maxPrice || '∞' }}
        <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
      </UBadge>

      <UBadge
        v-if="filters.search"
        color="primary"
        variant="soft"
        class="cursor-pointer"
        @click="emit('clearFilter', 'search')"
      >
        Pencarian: "{{ filters.search }}"
        <UIcon name="i-heroicons-x-mark" class="w-3 h-3 ml-1" />
      </UBadge>
    </div>
  </div>
</template>
