<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import ProductSelector from '~/components/admin/promotions/ProductSelector.vue'
import CurrencyInput from '~/components/admin/CurrencyInput.vue'
import type { PromotionProduct, DiscountFormData } from '~/types/promotion'

interface DiscountEditData {
  id: number
  name: string
  description: string | null
  type: 'percentage' | 'fixed'
  value: number
  minPurchase: number
  maxDiscount: number | null
  startDate: string
  endDate: string
  usageLimit: number | null
  usageCount?: number
  isActive: boolean
  appliesToAll: boolean
  productIds: number[]
}

interface Props {
  discount?: DiscountEditData
  products: PromotionProduct[]
  mode: 'create' | 'edit'
}

const props = defineProps<Props>()

// Convert ISO date to datetime-local format
const formatDateTimeLocal = (dateStr: string) => {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  return date.toISOString().slice(0, 16)
}

// Default form values
const defaultForm: DiscountFormData = {
  name: '',
  description: '',
  type: 'percentage',
  value: 0,
  min_purchase: 0,
  max_discount: null,
  start_date: '',
  end_date: '',
  usage_limit: null,
  is_active: true,
  applies_to_all: false,
  product_ids: [],
}

// Form state - initialize based on mode
const form = ref<DiscountFormData>(
  props.mode === 'edit' && props.discount
    ? {
        name: props.discount.name,
        description: props.discount.description || '',
        type: props.discount.type,
        value: props.discount.value,
        min_purchase: props.discount.minPurchase,
        max_discount: props.discount.maxDiscount,
        start_date: formatDateTimeLocal(props.discount.startDate),
        end_date: formatDateTimeLocal(props.discount.endDate),
        usage_limit: props.discount.usageLimit,
        is_active: props.discount.isActive,
        applies_to_all: props.discount.appliesToAll,
        product_ids: props.discount.productIds || [],
      }
    : { ...defaultForm }
)

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Type options
const typeOptions = [
  { label: 'Persentase (%)', value: 'percentage' },
  { label: 'Nominal (Rp)', value: 'fixed' },
]

// Validation
const validate = (): boolean => {
  errors.value = {}

  if (!form.value.name.trim()) {
    errors.value.name = 'Nama diskon wajib diisi'
  }

  if (form.value.value <= 0) {
    errors.value.value = 'Nilai diskon harus lebih dari 0'
  }

  if (form.value.type === 'percentage' && form.value.value > 100) {
    errors.value.value = 'Nilai persentase maksimal 100%'
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

  if (!form.value.applies_to_all && form.value.product_ids.length === 0) {
    errors.value.products = 'Pilih minimal satu produk atau aktifkan "Berlaku untuk semua produk"'
  }

  return Object.keys(errors.value).length === 0
}

// Submit form
const submit = () => {
  if (!validate()) return

  isSubmitting.value = true

  if (props.mode === 'edit' && props.discount) {
    router.put(`/admin/promotions/discounts/${props.discount.id}`, form.value, {
      onFinish: () => {
        isSubmitting.value = false
      },
      onError: (err) => {
        errors.value = err
      },
    })
  } else {
    router.post('/admin/promotions/discounts', form.value, {
      onFinish: () => {
        isSubmitting.value = false
      },
      onError: (err) => {
        errors.value = err
      },
    })
  }
}

// Format helper
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price)
}

// Preview discount
const discountPreview = computed(() => {
  if (form.value.type === 'percentage') {
    return `${form.value.value}%`
  }
  return formatPrice(form.value.value)
})

// Page title and subtitle
const pageTitle = computed(() => (props.mode === 'edit' ? 'Edit Diskon' : 'Buat Diskon Baru'))
const pageSubtitle = computed(() =>
  props.mode === 'edit'
    ? props.discount?.name || ''
    : 'Buat diskon untuk customer dan terapkan ke produk pilihan'
)
const submitButtonText = computed(() =>
  props.mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Diskon'
)
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Link href="/admin/promotions/discounts">
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
          <UFormField label="Nama Diskon" :error="errors.name" required>
            <UInput
              v-model="form.name"
              placeholder="Contoh: Diskon Tahun Baru"
              :color="errors.name ? 'error' : undefined"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Deskripsi">
            <UTextarea
              v-model="form.description"
              placeholder="Deskripsi singkat tentang diskon ini"
              :rows="3"
              class="w-full"
            />
          </UFormField>
        </div>
      </UCard>

      <!-- Discount Value -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-white">Nilai Diskon</h3>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Tipe Diskon" required>
              <USelectMenu
                v-model="form.type"
                :items="typeOptions"
                value-key="value"
                class="w-full"
              />
            </UFormField>

            <UFormField
              :label="form.type === 'percentage' ? 'Nilai (%)' : 'Nilai (Rp)'"
              :error="errors.value"
              required
            >
              <UInput
                v-if="form.type === 'percentage'"
                v-model.number="form.value"
                type="number"
                :min="0"
                :max="100"
                placeholder="10"
                :color="errors.value ? 'error' : undefined"
                class="w-full"
              />
              <CurrencyInput
                v-else
                v-model="form.value"
                placeholder="50.000"
                :color="errors.value ? 'error' : undefined"
              />
            </UFormField>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Minimal Pembelian">
              <CurrencyInput
                v-model="form.min_purchase"
                placeholder="0"
              />
              <template #hint>
                <span class="text-xs text-gray-500">Kosongkan jika tidak ada minimal</span>
              </template>
            </UFormField>

            <UFormField v-if="form.type === 'percentage'" label="Maksimal Diskon">
              <CurrencyInput
                v-model="form.max_discount"
                placeholder="Tidak ada batasan"
              />
              <template #hint>
                <span class="text-xs text-gray-500">Kosongkan jika tidak ada batasan</span>
              </template>
            </UFormField>
          </div>

          <!-- Preview -->
          <div
            class="p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800"
          >
            <div class="flex items-center gap-3">
              <div class="p-2 rounded-full bg-primary-100 dark:bg-primary-800">
                <UIcon
                  name="i-heroicons-tag"
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div>
                <p class="text-sm text-primary-600 dark:text-primary-400">Preview Diskon</p>
                <p class="text-xl font-bold text-primary-700 dark:text-primary-300">
                  {{ discountPreview }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Period -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-white">Periode & Penggunaan</h3>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Tanggal Mulai" :error="errors.start_date" required>
              <UInput
                v-model="form.start_date"
                type="datetime-local"
                :color="errors.start_date ? 'error' : undefined"
                class="w-full"
              />
            </UFormField>

            <UFormField label="Tanggal Selesai" :error="errors.end_date" required>
              <UInput
                v-model="form.end_date"
                type="datetime-local"
                :color="errors.end_date ? 'error' : undefined"
                class="w-full"
              />
            </UFormField>
          </div>

          <UFormField label="Batas Penggunaan">
            <UInput
              v-model.number="form.usage_limit"
              type="number"
              :min="0"
              placeholder="Tidak ada batasan"
              class="w-full"
            />
            <template #hint>
              <span v-if="mode === 'edit' && discount?.usageCount" class="text-xs text-gray-500">
                Sudah digunakan: {{ discount.usageCount }} kali
              </span>
              <span v-else class="text-xs text-gray-500">
                Kosongkan jika tidak ada batasan penggunaan
              </span>
            </template>
          </UFormField>

          <div class="flex items-center gap-3">
            <USwitch v-model="form.is_active" />
            <div>
              <p class="font-medium text-gray-900 dark:text-white">Aktifkan Diskon</p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                Diskon akan aktif sesuai periode yang ditentukan
              </p>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Products -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-white">Produk</h3>
        </template>

        <ProductSelector
          :products="products"
          v-model:selected-ids="form.product_ids"
          v-model:applies-to-all="form.applies_to_all"
        />
        <p v-if="errors.products" class="mt-2 text-sm text-red-500">{{ errors.products }}</p>
      </UCard>

      <!-- Actions -->
      <div class="flex items-center justify-end gap-4">
        <Link href="/admin/promotions/discounts">
          <UButton color="neutral" variant="ghost" :disabled="isSubmitting"> Batal </UButton>
        </Link>
        <UButton type="submit" color="primary" :loading="isSubmitting">
          {{ submitButtonText }}
        </UButton>
      </div>
    </form>
  </div>
</template>
