<script setup lang="ts">
import { ref, computed } from 'vue'
import { router } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import {
  CategoryHeader,
  CategoryStats,
  CategoryList,
  CategoryFormModal,
  CategoryDeleteModal,
} from '~/components/admin/products/categories'
import type { Category, CategoryStatsData, ParentCategory } from '~/components/admin/products/categories'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  categories?: Category[]
  admin?: {
    id: number
    storeName: string
    slug: string
    status: string
  }
}

const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
  admin: () => ({ id: 0, storeName: '', slug: '', status: '' }),
})

// Modal states
const showFormModal = ref(false)
const showDeleteModal = ref(false)
const selectedCategory = ref<Category | null>(null)
const isSubmitting = ref(false)
const isDeleting = ref(false)

// Compute stats from categories
const stats = computed<CategoryStatsData>(() => {
  const mainCategories = props.categories.length
  const subCategories = props.categories.reduce((sum, cat) => sum + cat.children.length, 0)
  const totalCategories = mainCategories + subCategories

  // Count active categories
  let activeCategories = props.categories.filter((cat) => cat.isActive).length
  props.categories.forEach((cat) => {
    activeCategories += cat.children.filter((child) => child.isActive).length
  })

  return {
    totalCategories,
    mainCategories,
    subCategories,
    activeCategories,
  }
})

// Get parent categories for select dropdown
const parentCategories = computed<ParentCategory[]>(() => {
  return props.categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
  }))
})

// Open add modal
const handleAdd = () => {
  selectedCategory.value = null
  showFormModal.value = true
}

// Open edit modal
const handleEdit = (category: Category) => {
  selectedCategory.value = category
  showFormModal.value = true
}

// Open delete modal
const handleDelete = (category: Category) => {
  selectedCategory.value = category
  showDeleteModal.value = true
}

// Handle form submit (create or update)
const handleFormSubmit = (formData: FormData) => {
  isSubmitting.value = true

  const url = selectedCategory.value
    ? `/admin/products/categories/${selectedCategory.value.id}`
    : '/admin/products/categories'

  router.post(url, formData, {
    preserveScroll: true,
    onSuccess: () => {
      showFormModal.value = false
      selectedCategory.value = null
    },
    onFinish: () => {
      isSubmitting.value = false
    },
  })
}

// Handle delete confirm
const handleDeleteConfirm = () => {
  if (!selectedCategory.value) return

  isDeleting.value = true

  router.delete(`/admin/products/categories/${selectedCategory.value.id}`, {
    preserveScroll: true,
    onSuccess: () => {
      showDeleteModal.value = false
      selectedCategory.value = null
    },
    onFinish: () => {
      isDeleting.value = false
    },
  })
}

// Handle toggle active status
const handleToggleActive = (category: Category) => {
  router.patch(`/admin/products/categories/${category.id}/toggle`, {}, {
    preserveScroll: true,
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <CategoryHeader :store-name="admin.storeName" @add="handleAdd" />

    <!-- Stats Cards -->
    <CategoryStats :stats="stats" />

    <!-- Categories List -->
    <CategoryList
      :categories="categories"
      @edit="handleEdit"
      @delete="handleDelete"
      @toggle-active="handleToggleActive"
    />

    <!-- Form Modal (Create/Edit) -->
    <CategoryFormModal
      v-model:open="showFormModal"
      :category="selectedCategory"
      :parent-categories="parentCategories"
      :is-submitting="isSubmitting"
      @submit="handleFormSubmit"
    />

    <!-- Delete Modal -->
    <CategoryDeleteModal
      v-model:open="showDeleteModal"
      :category="selectedCategory"
      :is-deleting="isDeleting"
      @confirm="handleDeleteConfirm"
    />
  </div>
</template>
