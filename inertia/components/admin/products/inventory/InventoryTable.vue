<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { InventoryProduct, EditedStock } from './types'
import InventoryProductRow from './InventoryProductRow.vue'
import InventoryVariantRow from './InventoryVariantRow.vue'

interface Props {
  products: InventoryProduct[]
  editMode: boolean
  expandedRows: Set<number>
  editedStocks: Map<number, EditedStock>
  isLoading: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'toggle-expand', productId: number): void
  (e: 'update-product-stock', productId: number, stock: number): void
  (e: 'update-variant-stock', productId: number, variantId: number, stock: number): void
}>()

// Get edited stock for a product
const getEditedStock = (productId: number): EditedStock | undefined => {
  return props.editedStocks.get(productId)
}

// Get edited variant stock
const getEditedVariantStock = (productId: number, variantId: number): number | undefined => {
  const edited = props.editedStocks.get(productId)
  return edited?.variantStocks.get(variantId)
}
</script>

<template>
  <!-- Loading Overlay -->
  <div v-if="isLoading" class="p-8 flex items-center justify-center">
    <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-violet-500 animate-spin" />
  </div>

  <!-- Table with expansion for variants -->
  <div v-else class="overflow-x-auto">
    <table class="w-full">
      <thead class="bg-slate-50 dark:bg-slate-900/50">
        <tr>
          <th class="w-10 px-4 py-3"></th>
          <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Produk
          </th>
          <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            SKU
          </th>
          <th class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Kategori
          </th>
          <th class="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Stok
          </th>
          <th class="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Varian
          </th>
          <th class="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Status Stok
          </th>
          <th class="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Status
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
        <template v-for="product in products" :key="product.id">
          <!-- Product Row -->
          <InventoryProductRow
            :product="product"
            :edit-mode="editMode"
            :is-expanded="expandedRows.has(product.id)"
            :edited-stock="getEditedStock(product.id)"
            @toggle-expand="(id) => emit('toggle-expand', id)"
            @update-stock="(id, stock) => emit('update-product-stock', id, stock)"
          />

          <!-- Variant Rows (Expanded) -->
          <template v-if="product.hasVariants && expandedRows.has(product.id)">
            <InventoryVariantRow
              v-for="variant in product.variants"
              :key="`variant-${variant.id}`"
              :variant="variant"
              :product-id="product.id"
              :edit-mode="editMode"
              :edited-stock="getEditedVariantStock(product.id, variant.id)"
              @update-stock="(productId, variantId, stock) => emit('update-variant-stock', productId, variantId, stock)"
            />
          </template>
        </template>

        <!-- Empty State -->
        <tr v-if="products.length === 0">
          <td colspan="8" class="px-4 py-12 text-center">
            <div class="flex flex-col items-center gap-3">
              <div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                <UIcon name="i-heroicons-cube" class="w-8 h-8 text-slate-400" />
              </div>
              <div>
                <p class="text-slate-900 dark:text-white font-medium">Tidak ada produk</p>
                <p class="text-sm text-slate-500 dark:text-slate-400">Tambahkan produk untuk mengelola stok</p>
              </div>
              <Link href="/admin/products/create">
                <UButton color="primary" size="sm">
                  <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
                  Tambah Produk
                </UButton>
              </Link>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
