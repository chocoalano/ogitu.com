<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import type { Address, Customer } from './types'

interface Province {
  id: string
  name: string
}

interface City {
  id: string
  name: string
  type: string
  postal_code?: string
}

interface District {
  id: string
  name: string
}

const props = defineProps<{
  address: Address | null
  customer: Customer
  addressCount: number
}>()

const emit = defineEmits<{
  save: [data: Partial<Address>]
}>()

const isOpen = defineModel<boolean>({ default: false })

const isSaving = ref(false)

// Location data from RajaOngkir
const provinces = ref<Province[]>([])
const cities = ref<City[]>([])
const districts = ref<District[]>([])
const loadingProvinces = ref(false)
const loadingCities = ref(false)
const loadingDistricts = ref(false)

const form = ref({
  label: 'Rumah',
  recipientName: '',
  phone: '',
  addressLine1: '',
  addressLine2: '',
  cityId: '',
  cityName: '',
  districtId: '',
  districtName: '',
  provinceId: '',
  provinceName: '',
  postalCode: '',
  isDefault: false,
})

const addressLabelOptions = [
  { label: 'Rumah', value: 'Rumah' },
  { label: 'Kantor', value: 'Kantor' },
  { label: 'Apartemen', value: 'Apartemen' },
  { label: 'Kos', value: 'Kos' },
  { label: 'Lainnya', value: 'Lainnya' },
]

/**
 * Get XSRF token from cookie
 */
const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// Province options for select
const provinceOptions = computed(() =>
  provinces.value.map((p) => ({
    label: p.name,
    value: String(p.id),
  }))
)

// City options for select
const cityOptions = computed(() =>
  cities.value.map((c) => ({
    label: c.type ? `${c.type} ${c.name}` : c.name,
    value: String(c.id),
  }))
)

// District options for select
const districtOptions = computed(() =>
  districts.value.map((d) => ({
    label: d.name,
    value: String(d.id),
  }))
)

// Load provinces on mount
onMounted(async () => {
  await loadProvinces()
})

// Fetch provinces from RajaOngkir
const loadProvinces = async () => {
  loadingProvinces.value = true
  try {
    const response = await fetch('/api/location/provinces')
    const result = await response.json()
    provinces.value = result.data || result || []
  } catch (error) {
    console.error('Failed to load provinces:', error)
  } finally {
    loadingProvinces.value = false
  }
}

// Fetch cities when province changes
const loadCities = async (provinceId: string) => {
  if (!provinceId) {
    cities.value = []
    return
  }
  loadingCities.value = true
  try {
    const response = await fetch(`/api/location/cities?provinceId=${provinceId}`)
    const result = await response.json()
    cities.value = result.data || result || []
  } catch (error) {
    console.error('Failed to load cities:', error)
  } finally {
    loadingCities.value = false
  }
}

// Fetch districts when city changes
const loadDistricts = async (cityId: string) => {
  if (!cityId) {
    districts.value = []
    return
  }
  loadingDistricts.value = true
  try {
    const response = await fetch(`/api/location/districts?cityId=${cityId}`)
    const result = await response.json()
    districts.value = result.data || result || []
  } catch (error) {
    console.error('Failed to load districts:', error)
  } finally {
    loadingDistricts.value = false
  }
}

// Watch province change
watch(() => form.value.provinceId, async (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    const province = provinces.value.find(p => String(p.id) === newVal)
    form.value.provinceName = province?.name || ''

    // Reset city and district
    form.value.cityId = ''
    form.value.cityName = ''
    form.value.districtId = ''
    form.value.districtName = ''
    districts.value = []

    // Load cities
    await loadCities(newVal)
  }
})

// Watch city change
watch(() => form.value.cityId, async (newVal, oldVal) => {
  if (newVal && newVal !== oldVal) {
    const city = cities.value.find(c => String(c.id) === newVal)
    form.value.cityName = city ? (city.type ? `${city.type} ${city.name}` : city.name) : ''

    // Update postal code if available
    if (city?.postal_code) {
      form.value.postalCode = city.postal_code
    }

    // Reset district
    form.value.districtId = ''
    form.value.districtName = ''

    // Load districts
    await loadDistricts(newVal)
  }
})

// Watch district change
watch(() => form.value.districtId, (newVal) => {
  if (newVal) {
    const district = districts.value.find(d => String(d.id) === newVal)
    form.value.districtName = district?.name || ''
  }
})

const resetForm = () => {
  form.value = {
    label: 'Rumah',
    recipientName: props.customer.fullName,
    phone: props.customer.phone || '',
    addressLine1: '',
    addressLine2: '',
    cityId: '',
    cityName: '',
    districtId: '',
    districtName: '',
    provinceId: '',
    provinceName: '',
    postalCode: '',
    isDefault: props.addressCount === 0,
  }
  cities.value = []
  districts.value = []
}

// Watch for changes in address prop
watch(() => props.address, async (newAddress) => {
  if (newAddress) {
    form.value = {
      label: newAddress.label,
      recipientName: newAddress.recipientName,
      phone: newAddress.phone,
      addressLine1: newAddress.addressLine1,
      addressLine2: newAddress.addressLine2 || '',
      cityId: String(newAddress.cityId || ''),
      cityName: newAddress.cityName,
      districtId: String(newAddress.districtId || ''),
      districtName: newAddress.districtName || '',
      provinceId: String(newAddress.provinceId || ''),
      provinceName: newAddress.provinceName,
      postalCode: newAddress.postalCode,
      isDefault: Boolean(newAddress.isDefault),
    }

    // Load cities and districts for existing address
    if (newAddress.provinceId) {
      await loadCities(String(newAddress.provinceId))
    }
    if (newAddress.cityId) {
      await loadDistricts(String(newAddress.cityId))
    }
  } else {
    resetForm()
  }
}, { immediate: true })

// Watch dialog open state
watch(isOpen, async (open) => {
  if (open && provinces.value.length === 0) {
    await loadProvinces()
  }
})

const handleSave = async () => {
  isSaving.value = true
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch('/api/dashboard/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      body: JSON.stringify({
        id: props.address?.id,
        ...form.value,
      }),
    })
    const data = await response.json()
    if (data.success) {
      isOpen.value = false
      window.location.reload()
    } else {
      alert(data.message || 'Gagal menyimpan alamat')
    }
  } catch (error) {
    console.error('Failed to save address:', error)
    alert('Terjadi kesalahan saat menyimpan alamat')
  } finally {
    isSaving.value = false
  }
}

const close = () => {
  isOpen.value = false
}

// Form validation
const isFormValid = computed(() => {
  return (
    form.value.recipientName.trim() !== '' &&
    form.value.phone.trim() !== '' &&
    form.value.addressLine1.trim() !== '' &&
    form.value.provinceId !== '' &&
    form.value.cityId !== '' &&
    form.value.postalCode.trim() !== ''
  )
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ width: 'max-w-xl', overlay: 'z-[100]', content: 'z-[100]' }"
    :title="address ? 'Edit Alamat' : 'Tambah Alamat Baru'"
    description="Lengkapi data alamat pengiriman Anda"
  >
    <template #content>
      <div class="p-6 max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ address ? 'Edit Alamat' : 'Tambah Alamat Baru' }}
          </h2>
          <UButton variant="ghost" color="neutral" size="sm" square @click="close">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </UButton>
        </div>

        <form @submit.prevent="handleSave" class="space-y-4">
          <!-- Label -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Label Alamat
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="opt in addressLabelOptions"
                :key="opt.value"
                type="button"
                @click="form.label = opt.value"
                :class="[
                  'px-4 py-2 rounded-xl text-sm font-medium transition-all',
                  form.label === opt.value
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                ]"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Recipient & Phone -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Nama Penerima <span class="text-red-500">*</span>
              </label>
              <UInput v-model="form.recipientName" placeholder="Nama lengkap penerima" class="w-full"/>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                No. Telepon <span class="text-red-500">*</span>
              </label>
              <UInput v-model="form.phone" placeholder="08xxxxxxxxxx" class="w-full" />
            </div>
          </div>

          <!-- Address Lines -->
          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Alamat Lengkap <span class="text-red-500">*</span>
            </label>
            <UTextarea
              v-model="form.addressLine1"
              placeholder="Nama jalan, nomor rumah, RT/RW"
              :rows="2"
              class="w-full"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
              Detail Tambahan (Opsional)
            </label>
            <UInput
              v-model="form.addressLine2"
              placeholder="Gedung, lantai, patokan, dll"
              class="w-full"
            />
          </div>

          <!-- Province & City with RajaOngkir -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Provinsi <span class="text-red-500">*</span>
              </label>
              <USelectMenu
                v-model="form.provinceId"
                :items="provinceOptions"
                placeholder="Pilih provinsi"
                :loading="loadingProvinces"
                :disabled="loadingProvinces"
                value-key="value"
                :ui="{ content: 'z-[200] bg-white dark:bg-gray-900' }"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Kota/Kabupaten <span class="text-red-500">*</span>
              </label>
              <USelectMenu
                v-model="form.cityId"
                :items="cityOptions"
                placeholder="Pilih kota/kabupaten"
                :loading="loadingCities"
                :disabled="!form.provinceId || loadingCities"
                value-key="value"
                :ui="{ content: 'z-[200] bg-white dark:bg-gray-900' }"
                class="w-full"
              />
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Kecamatan
              </label>
              <USelectMenu
                v-model="form.districtId"
                :items="districtOptions"
                placeholder="Pilih kecamatan"
                :loading="loadingDistricts"
                :disabled="!form.cityId || loadingDistricts"
                value-key="value"
                :ui="{ content: 'z-[200] bg-white dark:bg-gray-900' }"
                class="w-full"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Kode Pos <span class="text-red-500">*</span>
              </label>
              <UInput v-model="form.postalCode" placeholder="Kode pos" class="w-full"/>
            </div>
          </div>

          <!-- Default Checkbox -->
          <label class="flex items-center gap-3 cursor-pointer">
            <UCheckbox v-model="form.isDefault" />
            <span class="text-sm text-gray-700 dark:text-gray-300">Jadikan alamat utama</span>
          </label>

          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700">
            <UButton variant="ghost" color="neutral" @click="close" :disabled="isSaving">
              Batal
            </UButton>
            <UButton type="submit" color="primary" :loading="isSaving" :disabled="!isFormValid">
              {{ address ? 'Simpan Perubahan' : 'Tambah Alamat' }}
            </UButton>
          </div>
        </form>
      </div>
    </template>
  </UModal>
</template>
