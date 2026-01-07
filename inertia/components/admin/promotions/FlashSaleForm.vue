<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import FlashSaleProductSelector from '~/components/admin/promotions/FlashSaleProductSelector.vue'
import type { FlashSaleFormData } from '~/types/promotion'

interface AvailableProduct {
  id: number
  name: string
  image: string
  price: number
  stock?: number
}

interface FlashSaleEditData {
  id: number
  name: string
  description: string | null
  startDate: string
  endDate: string
  isActive: boolean
  products: Array<{
    product_id: number
    name: string
    image: string
    original_price: number
    flash_price: number
    stock_limit: number
    sold_count?: number
  }>
}

interface Props {
  flashSale?: FlashSaleEditData
  products: AvailableProduct[]
  mode: 'create' | 'edit'
}

const props = defineProps<Props>()

// Default form values
const defaultForm: FlashSaleFormData = {
  name: '',
  description: '',
  start_date: '',
  end_date: '',
  is_active: true,
  products: [],
}

// Form state
const form = ref<FlashSaleFormData>(
  props.mode === 'edit' && props.flashSale
    ? {
        name: props.flashSale.name,
        description: props.flashSale.description || '',
        start_date: props.flashSale.startDate,
        end_date: props.flashSale.endDate,
        is_active: props.flashSale.isActive,
        products: props.flashSale.products.map((p) => ({
          product_id: p.product_id,
          original_price: p.original_price,
          flash_price: p.flash_price,
          stock_limit: p.stock_limit,
        })),
      }
    : { ...defaultForm }
)

// Selected products with full data for display
interface SelectedProductItem {
  product_id: number
  name: string
  image: string
  original_price: number
  flash_price: number
  stock_limit: number
  sold_count?: number
}

const selectedProducts = ref<SelectedProductItem[]>(
  props.mode === 'edit' && props.flashSale
    ? props.flashSale.products.map((p) => ({
        product_id: p.product_id,
        name: p.name,
        image: p.image,
        original_price: p.original_price,
        flash_price: p.flash_price,
        stock_limit: p.stock_limit,
        sold_count: p.sold_count,
      }))
    : []
)

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Validation
const validate = (): boolean => {
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'Nama flash sale wajib diisi'
  }

  if (!form.value.start_date) {
    errors.value.start_date = 'Tanggal mulai wajib diisi'
  }

  if (!form.value.end_date) {
    errors.value.end_date = 'Tanggal selesai wajib diisi'
  }

  if (form.value.start_date && form.value.end_date && form.value.start_date > form.value.end_date) {
    errors.value.end_date = 'Tanggal selesai harus setelah tanggal mulai'
  }

  if (selectedProducts.value.length === 0) {
    errors.value.products = 'Tambahkan minimal satu produk untuk flash sale'
  }

  // Validate each product
  for (const product of selectedProducts.value) {
    if (product.flash_price <= 0) {
      errors.value.products = 'Harga flash sale harus lebih dari 0'
      break
    }
    if (product.flash_price >= product.original_price) {
      errors.value.products = 'Harga flash sale harus lebih rendah dari harga normal'
      break
    }
    if (product.stock_limit <= 0) {
      errors.value.products = 'Batas stok harus lebih dari 0'
      break
    }
  }

  return Object.keys(errors.value).length === 0
}

// Handle product selection change
const onProductsChange = (products: SelectedProductItem[]) => {
  selectedProducts.value = products
  form.value.products = products.map((p) => ({
    product_id: p.product_id,
    original_price: p.original_price,
    flash_price: p.flash_price,
    stock_limit: p.stock_limit,
  }))
}

// Submit form
const submit = () => {
  if (!validate()) return

  isSubmitting.value = true

  // Prepare data with products
  const submitData = {
    ...form.value,
    products: selectedProducts.value.map((p) => ({
      product_id: p.product_id,
      original_price: p.original_price,
      flash_price: p.flash_price,
      stock_limit: p.stock_limit,
      sold_count: p.sold_count || 0,
    })),
  }

  if (props.mode === 'edit' && props.flashSale) {
    router.put(`/admin/promotions/flash-sale/${props.flashSale.id}`, submitData, {
      onFinish: () => {
        isSubmitting.value = false
      },
      onError: (err) => {
        errors.value = err
      },
    })
  } else {
    router.post('/admin/promotions/flash-sale', submitData, {
      onFinish: () => {
        isSubmitting.value = false
      },
      onError: (err) => {
        errors.value = err
      },
    })
  }
}

// Page computed
const pageTitle = computed(() =>
  props.mode === 'edit' ? 'Edit Flash Sale' : 'Buat Flash Sale Baru'
)
const pageSubtitle = computed(() =>
  props.mode === 'edit'
    ? props.flashSale?.name || ''
    : 'Buat event flash sale dengan harga spesial'
)
const submitButtonText = computed(() =>
  props.mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Flash Sale'
)
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Link href="/admin/promotions/flash-sale">
        <UButton icon="i-heroicons-arrow-left" color="neutral" variant="ghost" size="sm" />
      </Link>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ pageTitle }}</h1>
        <p class="text-gray-500 dark:text-gray-400">
          {{ pageSubtitle }}
        </p>
      </div>
    </div>

    <!-- Form -->
    <form @submit.prevent="submit" class="space-y-6">
      <!-- Basic Info -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-white">Informasi Dasar</h3>
        </template>

        <div class="space-y-4">
          <UFormField label="Nama Flash Sale" :error="errors.name" required>
            <UInput
              v-model="form.name"
              placeholder="Contoh: Flash Sale Akhir Tahun"
              :color="errors.name ? 'error' : undefined"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Deskripsi">
            <UTextarea
              v-model="form.description"
              placeholder="Deskripsi singkat tentang flash sale ini"
              :rows="3"
              class="w-full"
            />
          </UFormField>
        </div>
      </UCard>

      <!-- Period -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-white">Periode Flash Sale</h3>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Tanggal & Waktu Mulai" :error="errors.start_date" required>
              <UInput
                v-model="form.start_date"
                type="datetime-local"
                :color="errors.start_date ? 'error' : undefined"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Tanggal & Waktu Selesai" :error="errors.end_date" required>
              <UInput
                v-model="form.end_date"
                type="datetime-local"
                :color="errors.end_date ? 'error' : undefined"
                class="w-full"
              />
            </UFormField>
          </div>

          <div class="flex items-center gap-3">
            <USwitch v-model="form.is_active" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Aktifkan Flash Sale</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Flash sale akan aktif sesuai periode yang ditentukan
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Products -->
      <UCard>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-900 dark:text-white">Produk Flash Sale</h3>
            <UBadge v-if="selectedProducts.length > 0" color="primary" variant="soft">
              {{ selectedProducts.length }} produk
            </UBadge>
          </div>
        </template>

        <FlashSaleProductSelector
          :available-products="products"
          :model-value="selectedProducts"
          @update:model-value="onProductsChange"
        />
        <p v-if="errors.products" class="mt-2 text-sm text-red-500">{{ errors.products }}</p>
      </UCard>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-4">
        <Link href="/admin/promotions/flash-sale">
          <UButton color="neutral" variant="ghost" :disabled="isSubmitting"> Batal </UButton>
        </Link>
        <UButton type="submit" color="primary" :loading="isSubmitting">
          {{ submitButtonText }}
        </UButton>
      </div>
    </form>
  </div>
</template>
