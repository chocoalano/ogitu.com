<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import ProductSelector from '~/components/admin/promotions/ProductSelector.vue'
import CurrencyInput from '~/components/admin/CurrencyInput.vue'
import type { PromotionProduct, VoucherFormData } from '~/types/promotion'

interface VoucherEditData {
  id: number
  code: string
  name: string
  description: string | null
  type: 'percentage' | 'fixed' | 'free_shipping'
  value: number
  minPurchase: number
  maxDiscount: number | null
  startDate: string
  endDate: string
  usageLimit: number | null
  usageCount?: number
  usageLimitPerCustomer: number
  isActive: boolean
  isPublic: boolean
  appliesToAll: boolean
  productIds: number[]
}

interface Props {
  voucher?: VoucherEditData
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
const defaultForm: VoucherFormData = {
  code: '',
  name: '',
  description: '',
  type: 'percentage',
  value: 0,
  min_purchase: 0,
  max_discount: null,
  start_date: '',
  end_date: '',
  usage_limit: null,
  usage_limit_per_customer: 1,
  is_active: true,
  is_public: false,
  applies_to_all: false,
  product_ids: [],
}

// Form state - initialize based on mode
const form = ref<VoucherFormData>(
  props.mode === 'edit' && props.voucher
    ? {
        code: props.voucher.code,
        name: props.voucher.name,
        description: props.voucher.description || '',
        type: props.voucher.type,
        value: props.voucher.value,
        min_purchase: props.voucher.minPurchase,
        max_discount: props.voucher.maxDiscount,
        start_date: formatDateTimeLocal(props.voucher.startDate),
        end_date: formatDateTimeLocal(props.voucher.endDate),
        usage_limit: props.voucher.usageLimit,
        usage_limit_per_customer: props.voucher.usageLimitPerCustomer,
        is_active: props.voucher.isActive,
        is_public: props.voucher.isPublic,
        applies_to_all: props.voucher.appliesToAll,
        product_ids: props.voucher.productIds || [],
      }
    : { ...defaultForm }
)

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Type options
const typeOptions = [
  { label: 'Persentase (%)', value: 'percentage' },
  { label: 'Nominal (Rp)', value: 'fixed' },
  { label: 'Gratis Ongkir', value: 'free_shipping' },
]

// Generate random code
const generateCode = async () => {
  try {
    const response = await fetch('/admin/promotions/vouchers/generate-code')
    const data = await response.json()
    form.value.code = data.code
  } catch {
    // Generate locally if API fails
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = 'OGITU'
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    form.value.code = code
  }
}

// Validation
const validate = (): boolean => {
  errors.value = {}

  if (!form.value.code.trim()) {
    errors.value.code = 'Kode voucher wajib diisi'
  } else if (form.value.code.length < 4) {
    errors.value.code = 'Kode voucher minimal 4 karakter'
  }

  if (!form.value.name.trim()) {
    errors.value.name = 'Nama voucher wajib diisi'
  }

  if (form.value.type !== 'free_shipping') {
    if (form.value.value <= 0) {
      errors.value.value = 'Nilai voucher harus lebih dari 0'
    }

    if (form.value.type === 'percentage' && form.value.value > 100) {
      errors.value.value = 'Nilai persentase maksimal 100%'
    }
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

  if (props.mode === 'edit' && props.voucher) {
    router.put(`/admin/promotions/vouchers/${props.voucher.id}`, form.value, {
      onFinish: () => {
        isSubmitting.value = false
      },
      onError: (err) => {
        errors.value = err
      },
    })
  } else {
    router.post('/admin/promotions/vouchers', form.value, {
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

// Preview voucher
const voucherPreview = computed(() => {
  if (form.value.type === 'free_shipping') {
    return 'Gratis Ongkir'
  }
  if (form.value.type === 'percentage') {
    return `${form.value.value}%`
  }
  return formatPrice(form.value.value)
})

// Page title and subtitle
const pageTitle = computed(() => (props.mode === 'edit' ? 'Edit Voucher' : 'Buat Voucher Baru'))
const pageSubtitle = computed(() =>
  props.mode === 'edit'
    ? props.voucher?.name || ''
    : 'Buat voucher untuk customer di platform'
)
const submitButtonText = computed(() =>
  props.mode === 'edit' ? 'Simpan Perubahan' : 'Simpan Voucher'
)
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <Link href="/admin/promotions/vouchers">
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
          <UFormField label="Kode Voucher" :error="errors.code" required>
            <div class="flex gap-2">
              <UInput
                v-model="form.code"
                placeholder="VOUCHER2024"
                class="flex-1 font-mono uppercase w-full"
                :color="errors.code ? 'error' : undefined"
              />
              <UButton
                v-if="mode === 'create'"
                type="button"
                color="neutral"
                variant="soft"
                icon="i-heroicons-arrow-path"
                @click="generateCode"
              >
                Generate
              </UButton>
            </div>
          </UFormField>

          <UFormField label="Nama Voucher" :error="errors.name" required>
            <UInput
              v-model="form.name"
              placeholder="Contoh: Voucher Pelanggan Baru"
              :color="errors.name ? 'error' : undefined"
              class="w-full"
            />
          </UFormField>

          <UFormField label="Deskripsi">
            <UTextarea
              v-model="form.description"
              placeholder="Deskripsi singkat tentang voucher ini"
              :rows="3"
              class="w-full"
            />
          </UFormField>
        </div>
      </UCard>

      <!-- Voucher Value -->
      <UCard>
        <template #header>
          <h3 class="font-semibold text-gray-900 dark:text-white">Nilai Voucher</h3>
        </template>

        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Tipe Voucher" required>
              <USelectMenu
                v-model="form.type"
                :items="typeOptions"
                value-key="value"
                class="w-full"
              />
            </UFormField>

            <UFormField
              v-if="form.type !== 'free_shipping'"
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
                  name="i-heroicons-ticket"
                  class="w-5 h-5 text-primary-600 dark:text-primary-400"
                />
              </div>
              <div>
                <p class="text-sm text-primary-600 dark:text-primary-400">Preview Voucher</p>
                <div class="flex items-center gap-2">
                  <code
                    class="px-2 py-1 rounded bg-primary-100 dark:bg-primary-800 text-sm font-mono text-primary-700 dark:text-primary-300"
                  >
                    {{ form.code || 'KODE' }}
                  </code>
                  <span class="text-xl font-bold text-primary-700 dark:text-primary-300">
                    {{ voucherPreview }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UCard>

      <!-- Period & Usage -->
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

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UFormField label="Batas Penggunaan Total">
              <UInput
                v-model.number="form.usage_limit"
                type="number"
                :min="0"
                placeholder="Tidak ada batasan"
                class="w-full"
              />
              <template #hint>
                <span v-if="mode === 'edit' && voucher?.usageCount" class="text-xs text-gray-500">
                  Sudah digunakan: {{ voucher.usageCount }} kali
                </span>
                <span v-else class="text-xs text-gray-500">
                  Kosongkan jika tidak ada batasan
                </span>
              </template>
            </UFormField>

            <UFormField label="Batas per Pelanggan">
              <UInput
                v-model.number="form.usage_limit_per_customer"
                type="number"
                :min="1"
                placeholder="1"
                class="w-full"
              />
              <template #hint>
                <span class="text-xs text-gray-500">
                  Maksimal penggunaan per pelanggan
                </span>
              </template>
            </UFormField>
          </div>

          <div class="flex flex-wrap items-center gap-6">
            <div class="flex items-center gap-3">
              <USwitch v-model="form.is_active" />
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Aktifkan Voucher</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Voucher akan aktif sesuai periode
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <USwitch v-model="form.is_public" />
              <div>
                <p class="font-medium text-gray-900 dark:text-white">Voucher Publik</p>
                <p class="text-xs text-gray-500 dark:text-gray-400">
                  Tampilkan di halaman promosi
                </p>
              </div>
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
        <Link href="/admin/promotions/vouchers">
          <UButton color="neutral" variant="ghost" :disabled="isSubmitting"> Batal </UButton>
        </Link>
        <UButton type="submit" color="primary" :loading="isSubmitting">
          {{ submitButtonText }}
        </UButton>
      </div>
    </form>
  </div>
</template>
