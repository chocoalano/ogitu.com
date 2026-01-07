<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Category } from './types'
import CategoryItem from './CategoryItem.vue'

interface Props {
  categories: Category[]
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'edit', category: Category): void
  (e: 'delete', category: Category): void
  (e: 'toggle-active', category: Category): void
}>()

// Search state
const searchQuery = ref('')

// Expanded categories
const expandedCategories = ref<Set<number>>(new Set())

// Toggle category expansion
const toggleCategory = (categoryId: number) => {
  if (expandedCategories.value.has(categoryId)) {
    expandedCategories.value.delete(categoryId)
  } else {
    expandedCategories.value.add(categoryId)
  }
}

// Expand all categories
const expandAll = () => {
  props.categories.forEach((cat) => {
    if (cat.children.length > 0) {
      expandedCategories.value.add(cat.id)
    }
  })
}

// Collapse all categories
const collapseAll = () => {
  expandedCategories.value.clear()
}

// Filtered categories based on search
const filteredCategories = computed(() => {
  if (!searchQuery.value.trim()) {
    return props.categories
  }

  const query = searchQuery.value.toLowerCase()
  return props.categories.filter((category) => {
    // Check if parent matches
    if (category.name.toLowerCase().includes(query)) {
      return true
    }
    // Check if any child matches
    return category.children.some((child) => child.name.toLowerCase().includes(query))
  })
})

// Check if any category has children
const hasSubCategories = computed(() => {
  return props.categories.some((cat) => cat.children.length > 0)
})
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
    <!-- Header with Search -->
    <div class="p-4 border-b border-slate-200 dark:border-slate-700">
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex-1">
          <UInput
            v-model="searchQuery"
            placeholder="Cari kategori..."
            icon="i-heroicons-magnifying-glass"
          />
        </div>
        <div v-if="hasSubCategories" class="flex gap-2">
          <UButton color="neutral" variant="outline" size="sm" @click="expandAll">
            <UIcon name="i-heroicons-arrows-pointing-out" class="w-4 h-4 mr-1" />
            Buka Semua
          </UButton>
          <UButton color="neutral" variant="outline" size="sm" @click="collapseAll">
            <UIcon name="i-heroicons-arrows-pointing-in" class="w-4 h-4 mr-1" />
            Tutup Semua
          </UButton>
        </div>
      </div>
    </div>

    <!-- Categories List -->
    <div class="p-4">
      <!-- Empty State -->
      <div v-if="categories.length === 0" class="text-center py-12">
        <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-heroicons-folder" class="w-8 h-8 text-slate-400" />
        </div>
        <p class="text-slate-900 dark:text-white font-medium">Belum ada kategori</p>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Klik tombol "Tambah Kategori" untuk menambahkan kategori baru
        </p>
      </div>

      <!-- No Search Results -->
      <div v-else-if="filteredCategories.length === 0" class="text-center py-12">
        <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
          <UIcon name="i-heroicons-magnifying-glass" class="w-8 h-8 text-slate-400" />
        </div>
        <p class="text-slate-900 dark:text-white font-medium">Tidak ditemukan</p>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Tidak ada kategori yang cocok dengan pencarian "{{ searchQuery }}"
        </p>
        <UButton color="neutral" variant="outline" size="sm" class="mt-4" @click="searchQuery = ''">
          Reset Pencarian
        </UButton>
      </div>

      <!-- Category Items -->
      <div v-else class="space-y-3">
        <CategoryItem
          v-for="category in filteredCategories"
          :key="category.id"
          :category="category"
          :is-expanded="expandedCategories.has(category.id)"
          @toggle="toggleCategory(category.id)"
          @edit="emit('edit', $event)"
          @delete="emit('delete', $event)"
          @toggle-active="emit('toggle-active', $event)"
        />
      </div>
    </div>
  </div>
</template>
