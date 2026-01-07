<script setup lang="ts">
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import type { Product, PaginationMeta } from './types'
import { getStatusConfig, getConditionConfig, formatPrice, formatNumber } from './types'

const props = defineProps<{
  products: Product[]
  meta: PaginationMeta
  selectedIds: number[]
  sortBy: string
  sortDirection: 'asc' | 'desc'
}>()

const emit = defineEmits<{
  'update:selectedIds': [ids: number[]]
  sort: [field: string]
  delete: [id: number]
  'bulk-action': [action: string]
}>()

// Check if all products are selected
const allSelected = computed(() => {
  if (props.products.length === 0) return false
  return props.products.every((p) => props.selectedIds.includes(p.id))
})

// Toggle all selection
const toggleAll = () => {
  if (allSelected.value) {
    emit('update:selectedIds', [])
  } else {
    emit('update:selectedIds', props.products.map((p) => p.id))
  }
}

// Toggle single selection
const toggleSelection = (id: number) => {
  const newIds = props.selectedIds.includes(id)
    ? props.selectedIds.filter((i) => i !== id)
    : [...props.selectedIds, id]
  emit('update:selectedIds', newIds)
}

// Get sort icon
const getSortIcon = (field: string) => {
  if (props.sortBy !== field) return 'i-heroicons-chevron-up-down'
  return props.sortDirection === 'asc' ? 'i-heroicons-chevron-up' : 'i-heroicons-chevron-down'
}

// Sortable columns
const sortableColumns = ['name', 'price', 'stock', 'totalSold', 'createdAt']
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
    <!-- Bulk Actions Bar -->
    <div
      v-if="selectedIds.length > 0"
      class="flex items-center justify-between px-4 py-3 bg-violet-50 dark:bg-violet-900/20 border-b border-violet-200 dark:border-violet-800"
    >
      <span class="text-sm text-violet-700 dark:text-violet-300">
        {{ selectedIds.length }} produk dipilih
      </span>
      <div class="flex items-center gap-2">
        <UButton
          size="sm"
          color="success"
          variant="soft"
          icon="i-heroicons-check-circle"
          @click="$emit('bulk-action', 'active')"
        >
          Aktifkan
        </UButton>
        <UButton
          size="sm"
          color="warning"
          variant="soft"
          icon="i-heroicons-pause-circle"
          @click="$emit('bulk-action', 'inactive')"
        >
          Nonaktifkan
        </UButton>
        <UButton
          size="sm"
          color="error"
          variant="soft"
          icon="i-heroicons-trash"
          @click="$emit('bulk-action', 'delete')"
        >
          Hapus
        </UButton>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
            <th class="w-12 px-4 py-3">
              <UCheckbox :model-value="allSelected" @update:model-value="toggleAll" />
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Produk
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"
              @click="sortableColumns.includes('price') && $emit('sort', 'price')"
            >
              <div class="flex items-center gap-1">
                Harga
                <UIcon :name="getSortIcon('price')" class="w-4 h-4" />
              </div>
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"
              @click="sortableColumns.includes('stock') && $emit('sort', 'stock')"
            >
              <div class="flex items-center gap-1">
                Stok
                <UIcon :name="getSortIcon('stock')" class="w-4 h-4" />
              </div>
            </th>
            <th
              class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"
              @click="sortableColumns.includes('totalSold') && $emit('sort', 'totalSold')"
            >
              <div class="flex items-center gap-1">
                Terjual
                <UIcon :name="getSortIcon('totalSold')" class="w-4 h-4" />
              </div>
            </th>
            <th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Status
            </th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
          <tr
            v-for="product in products"
            :key="product.id"
            class="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
          >
            <td class="px-4 py-4">
              <UCheckbox
                :model-value="selectedIds.includes(product.id)"
                @update:model-value="toggleSelection(product.id)"
              />
            </td>
            <td class="px-4 py-4">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0"
                >
                  <img
                    v-if="product.primaryImage"
                    :src="product.primaryImage.url"
                    :alt="product.name"
                    class="w-full h-full object-cover"
                  />
                  <div v-else class="w-full h-full flex items-center justify-center">
                    <UIcon name="i-heroicons-photo" class="w-6 h-6 text-slate-400" />
                  </div>
                </div>
                <div class="min-w-0">
                  <Link
                    :href="`/admin/products/${product.id}`"
                    class="font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 truncate block max-w-xs"
                  >
                    {{ product.name }}
                  </Link>
                  <p class="text-xs text-slate-500 dark:text-slate-400">
                    SKU: {{ product.sku }}
                    <span v-if="product.category" class="ml-2">• {{ product.category.name }}</span>
                  </p>
                  <div class="flex items-center gap-2 mt-1">
                    <UBadge
                      :color="getConditionConfig(product.condition).color"
                      variant="subtle"
                      size="xs"
                    >
                      {{ getConditionConfig(product.condition).label }}
                    </UBadge>
                    <UBadge v-if="product.isFeatured" color="warning" variant="subtle" size="xs">
                      <UIcon name="i-heroicons-star" class="w-3 h-3 mr-0.5" />
                      Featured
                    </UBadge>
                  </div>
                </div>
              </div>
            </td>
            <td class="px-4 py-4">
              <div>
                <p class="font-medium text-slate-900 dark:text-white">
                  {{ formatPrice(product.discountPrice || product.price) }}
                </p>
                <p
                  v-if="product.discountPrice"
                  class="text-xs text-slate-500 line-through"
                >
                  {{ formatPrice(product.price) }}
                </p>
              </div>
            </td>
            <td class="px-4 py-4">
              <div class="flex items-center gap-2">
                <span
                  class="font-medium"
                  :class="
                    product.stock === 0
                      ? 'text-red-500'
                      : product.stock <= 10
                        ? 'text-amber-500'
                        : 'text-slate-900 dark:text-white'
                  "
                >
                  {{ formatNumber(product.stock) }}
                </span>
                <UIcon
                  v-if="product.stock <= 10 && product.stock > 0"
                  name="i-heroicons-exclamation-triangle"
                  class="w-4 h-4 text-amber-500"
                />
              </div>
            </td>
            <td class="px-4 py-4">
              <span class="text-slate-900 dark:text-white">
                {{ formatNumber(product.totalSold) }}
              </span>
            </td>
            <td class="px-4 py-4">
              <UBadge :color="getStatusConfig(product.status).color" variant="subtle">
                {{ getStatusConfig(product.status).label }}
              </UBadge>
            </td>
            <td class="px-4 py-4">
              <div class="flex items-center justify-end gap-1">
                <UButton
                  :to="`/admin/products/${product.id}`"
                  icon="i-heroicons-eye"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                />
                <UButton
                  :to="`/admin/products/${product.id}/edit`"
                  icon="i-heroicons-pencil"
                  color="neutral"
                  variant="ghost"
                  size="xs"
                />
                <UButton
                  icon="i-heroicons-trash"
                  color="error"
                  variant="ghost"
                  size="xs"
                  @click="$emit('delete', product.id)"
                />
              </div>
            </td>
          </tr>
          <tr v-if="products.length === 0">
            <td colspan="7" class="px-4 py-12 text-center">
              <div class="flex flex-col items-center">
                <UIcon name="i-heroicons-cube" class="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
                <p class="text-slate-500 dark:text-slate-400 mb-4">Belum ada produk</p>
                <UButton
                  to="/admin/products/create"
                  icon="i-heroicons-plus"
                  color="primary"
                >
                  Tambah Produk
                </UButton>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
