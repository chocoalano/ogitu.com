<script setup lang="ts">
import type { Category, CollectionFilters } from '~/types/product'

const props = defineProps<{
  categories: Category[]
  brands: string[]
  hasActiveFilters: boolean
}>()

const filters = defineModel<CollectionFilters>('filters', { required: true })

const emit = defineEmits<{
  apply: []
  clear: []
}>()
</script>

<template>
  <aside class="hidden lg:block w-64 shrink-0">
    <div class="sticky top-24 space-y-6">
      <!-- Search -->
      <div
        class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Pencarian</h3>
        <UInput
          v-model="filters.search"
          placeholder="Cari produk..."
          icon="i-heroicons-magnifying-glass"
          @keyup.enter="emit('apply')"
        />
      </div>

      <!-- Categories -->
      <div
        class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Kategori</h3>
        <div class="space-y-2 max-h-60 overflow-y-auto">
          <label
            v-for="category in categories"
            :key="category.id"
            class="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="radio"
              :value="category.slug"
              v-model="filters.category"
              class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500"
            />
            <span
              class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors"
            >
              {{ category.name }}
            </span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              value=""
              v-model="filters.category"
              class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500"
            />
            <span
              class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors"
            >
              Semua Kategori
            </span>
          </label>
        </div>
      </div>

      <!-- Brands -->
      <div
        class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Brand</h3>
        <div class="space-y-2 max-h-60 overflow-y-auto">
          <label
            v-for="brand in brands"
            :key="brand"
            class="flex items-center gap-2 cursor-pointer group"
          >
            <input
              type="radio"
              :value="brand"
              v-model="filters.brand"
              class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500"
            />
            <span
              class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors"
            >
              {{ brand }}
            </span>
          </label>
          <label class="flex items-center gap-2 cursor-pointer group">
            <input
              type="radio"
              value=""
              v-model="filters.brand"
              class="w-4 h-4 text-primary-500 border-gray-300 dark:border-gray-600 focus:ring-primary-500"
            />
            <span
              class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary-500 transition-colors"
            >
              Semua Brand
            </span>
          </label>
        </div>
      </div>

      <!-- Price Range -->
      <div
        class="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800"
      >
        <h3 class="font-semibold text-gray-900 dark:text-white mb-3">Rentang Harga</h3>
        <div class="space-y-3">
          <UInput
            v-model="filters.minPrice"
            type="number"
            placeholder="Harga Min"
            icon="i-heroicons-currency-dollar"
          />
          <UInput
            v-model="filters.maxPrice"
            type="number"
            placeholder="Harga Max"
            icon="i-heroicons-currency-dollar"
          />
        </div>
      </div>

      <!-- Apply & Clear Buttons -->
      <div class="flex flex-col gap-2">
        <UButton color="primary" block @click="emit('apply')">
          <UIcon name="i-heroicons-funnel" class="w-4 h-4" />
          Terapkan Filter
        </UButton>
        <UButton
          v-if="hasActiveFilters"
          color="neutral"
          variant="ghost"
          block
          @click="emit('clear')"
        >
          <UIcon name="i-heroicons-x-mark" class="w-4 h-4" />
          Hapus Filter
        </UButton>
      </div>
    </div>
  </aside>
</template>
