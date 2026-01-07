<script setup lang="ts">
import type { Category, CollectionFilters } from '~/types/product'

const props = defineProps<{
  categories: Category[]
  brands: string[]
  hasActiveFilters: boolean
}>()

const isOpen = defineModel<boolean>('open', { required: true })
const filters = defineModel<CollectionFilters>('filters', { required: true })

const emit = defineEmits<{
  apply: []
  clear: []
}>()

const handleApply = () => {
  emit('apply')
  isOpen.value = false
}
</script>

<template>
  <USlideover v-model:open="isOpen">
    <template #content>
      <div class="p-6 h-full overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Filter</h2>
          <UButton color="neutral" variant="ghost" size="sm" square @click="isOpen = false">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </UButton>
        </div>

        <div class="space-y-6">
          <!-- Search -->
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white mb-3">Pencarian</h3>
            <UInput
              v-model="filters.search"
              placeholder="Cari produk..."
              icon="i-heroicons-magnifying-glass"
            />
          </div>

          <!-- Categories -->
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white mb-3">Kategori</h3>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value=""
                  v-model="filters.category"
                  class="w-4 h-4 text-primary-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Semua Kategori</span>
              </label>
              <label
                v-for="category in categories"
                :key="category.id"
                class="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  :value="category.slug"
                  v-model="filters.category"
                  class="w-4 h-4 text-primary-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ category.name }}</span>
              </label>
            </div>
          </div>

          <!-- Brands -->
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white mb-3">Brand</h3>
            <div class="space-y-2 max-h-48 overflow-y-auto">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value=""
                  v-model="filters.brand"
                  class="w-4 h-4 text-primary-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">Semua Brand</span>
              </label>
              <label
                v-for="brand in brands"
                :key="brand"
                class="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  :value="brand"
                  v-model="filters.brand"
                  class="w-4 h-4 text-primary-500"
                />
                <span class="text-sm text-gray-700 dark:text-gray-300">{{ brand }}</span>
              </label>
            </div>
          </div>

          <!-- Price Range -->
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white mb-3">Rentang Harga</h3>
            <div class="space-y-3">
              <UInput v-model="filters.minPrice" type="number" placeholder="Harga Minimum" />
              <UInput v-model="filters.maxPrice" type="number" placeholder="Harga Maksimum" />
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div
          class="sticky bottom-0 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-2"
        >
          <UButton color="primary" block @click="handleApply">Terapkan Filter</UButton>
          <UButton
            v-if="hasActiveFilters"
            color="neutral"
            variant="ghost"
            block
            @click="emit('clear')"
          >
            Hapus Semua Filter
          </UButton>
        </div>
      </div>
    </template>
  </USlideover>
</template>
