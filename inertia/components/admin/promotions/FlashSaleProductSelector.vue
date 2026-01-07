<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import CurrencyInput from '~/components/admin/CurrencyInput.vue'

interface AvailableProduct {
  id: number
  name: string
  image: string
  price: number
  stock?: number
}

interface SelectedProduct {
  product_id: number
  name: string
  image: string
  original_price: number
  flash_price: number
  stock_limit: number
  sold_count?: number
}

const props = defineProps<{
  availableProducts: AvailableProduct[]
  modelValue: SelectedProduct[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: SelectedProduct[]): void
}>()

const searchQuery = ref('')
const showProductList = ref(false)

// Local copy of selected products
const selectedProducts = ref<SelectedProduct[]>([...props.modelValue])

// Watch for external changes
watch(
  () => props.modelValue,
  (newVal) => {
    selectedProducts.value = [...newVal]
  },
  { deep: true }
)

// Filter available products (exclude already selected)
const filteredProducts = computed(() => {
  const selectedIds = selectedProducts.value.map((p) => p.product_id)
  let products = props.availableProducts.filter((p) => !selectedIds.includes(p.id))

  if (searchQuery.value) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  return products
})

// Add product to selection
const addProduct = (product: AvailableProduct) => {
  const newProduct: SelectedProduct = {
    product_id: product.id,
    name: product.name,
    image: product.image,
    original_price: product.price,
    flash_price: Math.round(product.price * 0.8), // Default 20% discount
    stock_limit: Math.min(product.stock ?? 100, 100),
  }
  selectedProducts.value.push(newProduct)
  emit('update:modelValue', selectedProducts.value)
  searchQuery.value = ''
  showProductList.value = false
}

// Remove product from selection
const removeProduct = (index: number) => {
  selectedProducts.value.splice(index, 1)
  emit('update:modelValue', selectedProducts.value)
}

// Update product data
const updateProduct = (index: number, field: keyof SelectedProduct, value: number) => {
  selectedProducts.value[index][field] = value as never
  emit('update:modelValue', selectedProducts.value)
}

// Calculate discount percentage
const getDiscountPercentage = (original: number, flash: number): number => {
  if (original <= 0) return 0
  return Math.round(((original - flash) / original) * 100)
}

// Format price
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

// Image URL helper
const getImageUrl = (url: string | undefined | null): string => {
  if (!url || url === '/images/placeholder.png') {
    return 'https://placehold.co/100x100/1a1a2e/ffffff?text=No+Image'
  }
  return url
}
</script>

<template>
  <div class="space-y-4">
    <!-- Add Product Button -->
    <div class="relative">
      <div class="flex gap-2">
        <UInput
          v-model="searchQuery"
          placeholder="Cari produk untuk ditambahkan..."
          icon="i-heroicons-magnifying-glass"
          class="flex-1"
          @focus="showProductList = true"
        />
        <UButton
          type="button"
          color="primary"
          variant="soft"
          icon="i-heroicons-plus"
          @click="showProductList = !showProductList"
        >
          Tambah Produk
        </UButton>
      </div>

      <!-- Product Dropdown -->
      <div
        v-if="showProductList && filteredProducts.length > 0"
        class="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
      >
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
          @click="addProduct(product)"
        >
          <img
            :src="getImageUrl(product.image)"
            :alt="product.name"
            class="w-10 h-10 rounded object-cover bg-gray-100 dark:bg-gray-800"
          />
          <div class="flex-1 min-w-0">
            <p class="font-medium text-gray-900 dark:text-white truncate text-sm">
              {{ product.name }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ formatPrice(product.price) }} • Stok: {{ product.stock }}
            </p>
          </div>
          <UIcon name="i-heroicons-plus-circle" class="w-5 h-5 text-primary-500" />
        </div>
      </div>

      <!-- Backdrop to close dropdown -->
      <div
        v-if="showProductList"
        class="fixed inset-0 z-40"
        @click="showProductList = false"
      />
    </div>

    <!-- Selected Products -->
    <div v-if="selectedProducts.length > 0" class="space-y-3">
      <div class="flex items-center justify-between">
        <p class="font-medium text-gray-900 dark:text-white">
          {{ selectedProducts.length }} Produk Flash Sale
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(product, index) in selectedProducts"
          :key="product.product_id"
          class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div class="flex items-start gap-4">
            <!-- Product Info -->
            <img
              :src="getImageUrl(product.image)"
              :alt="product.name"
              class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"
            />

            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <div>
                  <h4 class="font-medium text-gray-900 dark:text-white truncate">
                    {{ product.name }}
                  </h4>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    Harga Normal: {{ formatPrice(product.original_price) }}
                  </p>
                </div>
                <UButton
                  type="button"
                  color="error"
                  variant="ghost"
                  size="xs"
                  icon="i-heroicons-trash"
                  @click="removeProduct(index)"
                />
              </div>

              <!-- Price & Stock Inputs -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                <div>
                  <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                    Harga Flash Sale
                  </label>
                  <CurrencyInput
                    :model-value="product.flash_price"
                    @update:model-value="(val) => updateProduct(index, 'flash_price', val || 0)"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                    Batas Stok
                  </label>
                  <UInput
                    :model-value="product.stock_limit"
                    @update:model-value="(val: string | number) => updateProduct(index, 'stock_limit', Number(val) || 0)"
                    type="number"
                    :min="1"
                    placeholder="100"
                    class="w-full"
                  />
                </div>

                <div class="flex items-end">
                  <div
                    class="w-full px-3 py-2 rounded-lg text-center"
                    :class="
                      getDiscountPercentage(product.original_price, product.flash_price) >= 50
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400'
                    "
                  >
                    <span class="text-lg font-bold">
                      {{ getDiscountPercentage(product.original_price, product.flash_price) }}%
                    </span>
                    <span class="text-xs block">Diskon</span>
                  </div>
                </div>
              </div>

              <!-- Sold count (for edit mode) -->
              <p
                v-if="product.sold_count && product.sold_count > 0"
                class="text-xs text-gray-500 dark:text-gray-400 mt-2"
              >
                Terjual: {{ product.sold_count }} dari {{ product.stock_limit }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg"
    >
      <UIcon name="i-heroicons-shopping-bag" class="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
      <p class="font-medium">Belum ada produk</p>
      <p class="text-sm">Tambahkan produk untuk flash sale</p>
    </div>
  </div>
</template>
