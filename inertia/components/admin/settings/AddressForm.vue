<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import type { Province, City, District, StoreAddressData } from '~/types/settings'

// Props
const props = defineProps<{
  provinces: Province[]
  initialCities?: City[]
  initialDistricts?: District[]
  initialData?: Partial<StoreAddressData>
  processing?: boolean
  submitLabel?: string
}>()

// Emits
const emit = defineEmits<{
  submit: [data: AddressFormData]
  cancel: []
}>()

// Form data type
export interface AddressFormData {
  name: string
  contactName: string
  phone: string
  addressLine1: string
  addressLine2: string
  provinceId: string
  provinceName: string
  cityId: string
  cityName: string
  districtId: string
  districtName: string
  postalCode: string
  isDefault: boolean
}

// Form state
const formData = ref<AddressFormData>({
  name: props.initialData?.name || '',
  contactName: props.initialData?.contactName || '',
  phone: props.initialData?.phone || '',
  addressLine1: props.initialData?.addressLine1 || '',
  addressLine2: props.initialData?.addressLine2 || '',
  provinceId: props.initialData?.provinceId || '',
  provinceName: props.initialData?.provinceName || '',
  cityId: props.initialData?.cityId || '',
  cityName: props.initialData?.cityName || '',
  districtId: props.initialData?.districtId || '',
  districtName: props.initialData?.districtName || '',
  postalCode: props.initialData?.postalCode || '',
  isDefault: props.initialData?.isDefault || false,
})

// Location data
const cities = ref<City[]>(props.initialCities || [])
const districts = ref<District[]>(props.initialDistricts || [])
const loadingCities = ref(false)
const loadingDistricts = ref(false)

// Track if form is initialized (for edit mode)
const initialized = ref(!props.initialData)

onMounted(() => {
  if (props.initialData) {
    // Wait for initial render to complete before enabling watchers
    setTimeout(() => {
      initialized.value = true
    }, 100)
  }
})

// Province options
const provinceOptions = computed(() =>
  props.provinces.map((p) => ({
    label: p.province,
    value: p.province_id,
  }))
)

// City options
const cityOptions = computed(() =>
  cities.value.map((c) => ({
    label: `${c.type} ${c.city_name}`,
    value: c.city_id,
  }))
)

// District options
const districtOptions = computed(() =>
  districts.value.map((d) => ({
    label: d.district_name,
    value: d.district_id,
  }))
)

// Fetch cities by province
const fetchCities = async (provinceId: string): Promise<City[]> => {
  try {
    const response = await fetch(`/admin/api/locations/cities/${provinceId}`)
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Failed to load cities:', error)
    return []
  }
}

// Fetch districts by city
const fetchDistricts = async (cityId: string): Promise<District[]> => {
  try {
    const response = await fetch(`/admin/api/locations/districts/${cityId}`)
    const data = await response.json()
    return data.data || []
  } catch (error) {
    console.error('Failed to load districts:', error)
    return []
  }
}

// Watch province changes
watch(
  () => formData.value.provinceId,
  async (newProvinceId, oldProvinceId) => {
    if (!initialized.value) return

    if (!newProvinceId) {
      cities.value = []
      formData.value.cityId = ''
      formData.value.cityName = ''
      formData.value.districtId = ''
      formData.value.districtName = ''
      districts.value = []
      return
    }

    // Set province name
    const province = props.provinces.find((p) => p.province_id === newProvinceId)
    if (province) {
      formData.value.provinceName = province.province
    }

    // Only fetch cities if province actually changed (not on initial load)
    if (oldProvinceId !== undefined && newProvinceId !== oldProvinceId) {
      loadingCities.value = true
      cities.value = await fetchCities(newProvinceId)
      loadingCities.value = false

      // Reset dependent fields
      formData.value.cityId = ''
      formData.value.cityName = ''
      formData.value.districtId = ''
      formData.value.districtName = ''
      districts.value = []
    }
  }
)

// Watch city changes
watch(
  () => formData.value.cityId,
  async (newCityId, oldCityId) => {
    if (!initialized.value) return

    if (!newCityId) {
      districts.value = []
      formData.value.districtId = ''
      formData.value.districtName = ''
      return
    }

    // Set city name and postal code
    const city = cities.value.find((c) => c.city_id === newCityId)
    if (city) {
      formData.value.cityName = city.city_name
      if (!formData.value.postalCode || oldCityId !== undefined) {
        formData.value.postalCode = city.postal_code || ''
      }
    }

    // Only fetch districts if city actually changed
    if (oldCityId !== undefined && newCityId !== oldCityId) {
      loadingDistricts.value = true
      districts.value = await fetchDistricts(newCityId)
      loadingDistricts.value = false

      // Reset dependent field
      formData.value.districtId = ''
      formData.value.districtName = ''
    }
  }
)

// Watch district changes
watch(
  () => formData.value.districtId,
  (newDistrictId) => {
    if (!initialized.value) return

    if (!newDistrictId) {
      formData.value.districtName = ''
      return
    }

    const district = districts.value.find((d) => d.district_id === newDistrictId)
    if (district) {
      formData.value.districtName = district.district_name
    }
  }
)

// Form validation
const errors = ref<Record<string, string>>({})

const validate = (): boolean => {
  errors.value = {}

  if (!formData.value.name.trim()) {
    errors.value.name = 'Nama alamat wajib diisi'
  }
  if (!formData.value.contactName.trim()) {
    errors.value.contactName = 'Nama kontak wajib diisi'
  }
  if (!formData.value.phone.trim()) {
    errors.value.phone = 'Nomor telepon wajib diisi'
  } else if (!/^0[0-9]{9,13}$/.test(formData.value.phone.replace(/\D/g, ''))) {
    errors.value.phone = 'Format nomor telepon tidak valid'
  }
  if (!formData.value.addressLine1.trim()) {
    errors.value.addressLine1 = 'Alamat lengkap wajib diisi'
  }
  if (!formData.value.provinceId) {
    errors.value.provinceId = 'Provinsi wajib dipilih'
  }
  if (!formData.value.cityId) {
    errors.value.cityId = 'Kota wajib dipilih'
  }
  if (!formData.value.districtId) {
    errors.value.districtId = 'Kecamatan wajib dipilih'
  }
  if (!formData.value.postalCode.trim()) {
    errors.value.postalCode = 'Kode pos wajib diisi'
  }

  return Object.keys(errors.value).length === 0
}

// Handle submit
const handleSubmit = () => {
  if (validate()) {
    emit('submit', { ...formData.value })
  }
}

// Handle cancel
const handleCancel = () => {
  emit('cancel')
}

// Expose form data for parent component if needed
defineExpose({
  formData,
  validate,
  reset: () => {
    formData.value = {
      name: '',
      contactName: '',
      phone: '',
      addressLine1: '',
      addressLine2: '',
      provinceId: '',
      provinceName: '',
      cityId: '',
      cityName: '',
      districtId: '',
      districtName: '',
      postalCode: '',
      isDefault: false,
    }
    cities.value = []
    districts.value = []
    errors.value = {}
  },
})
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Basic Info -->
    <div class="grid gap-4 md:grid-cols-2">
      <UFormField label="Nama Alamat" required :error="errors.name">
        <UInput
          v-model="formData.name"
          placeholder="Contoh: Gudang Utama, Toko Pusat"
          class="w-full"
          :disabled="processing"
          :color="errors.name ? 'error' : undefined"
        />
      </UFormField>

      <UFormField label="Jadikan Default">
        <div class="flex items-center gap-2 h-10">
          <USwitch v-model="formData.isDefault" :disabled="processing" />
          <span class="text-sm text-gray-500 dark:text-gray-400">
            Gunakan sebagai alamat pengiriman default
          </span>
        </div>
      </UFormField>
    </div>

    <!-- Contact Info -->
    <div class="grid gap-4 md:grid-cols-2">
      <UFormField label="Nama Kontak" required :error="errors.contactName">
        <UInput
          v-model="formData.contactName"
          placeholder="Nama penanggung jawab"
          class="w-full"
          :disabled="processing"
          :color="errors.contactName ? 'error' : undefined"
        />
      </UFormField>

      <UFormField label="Nomor Telepon" required :error="errors.phone">
        <UInput
          v-model="formData.phone"
          placeholder="08xxxxxxxxxx"
          class="w-full"
          :disabled="processing"
          :color="errors.phone ? 'error' : undefined"
        />
      </UFormField>
    </div>

    <!-- Address -->
    <UFormField label="Alamat Lengkap" required :error="errors.addressLine1">
      <UTextarea
        v-model="formData.addressLine1"
        placeholder="Nama jalan, nomor rumah, RT/RW"
        class="w-full"
        :rows="2"
        :disabled="processing"
        :color="errors.addressLine1 ? 'error' : undefined"
      />
    </UFormField>

    <UFormField label="Alamat Tambahan (Opsional)">
      <UInput
        v-model="formData.addressLine2"
        placeholder="Patokan, nama gedung, dll"
        class="w-full"
        :disabled="processing"
      />
    </UFormField>

    <!-- Location -->
    <div class="grid gap-4 md:grid-cols-3">
      <UFormField label="Provinsi" required :error="errors.provinceId">
        <USelectMenu
          v-model="formData.provinceId"
          :items="provinceOptions"
          value-key="value"
          placeholder="Pilih Provinsi"
          :disabled="processing"
          searchable
          class="w-full"
        />
      </UFormField>

      <UFormField label="Kota/Kabupaten" required :error="errors.cityId">
        <USelectMenu
          v-model="formData.cityId"
          :items="cityOptions"
          value-key="value"
          placeholder="Pilih Kota"
          :disabled="processing || !formData.provinceId || loadingCities"
          :loading="loadingCities"
          searchable
          class="w-full"
        />
      </UFormField>

      <UFormField label="Kecamatan" required :error="errors.districtId">
        <USelectMenu
          v-model="formData.districtId"
          :items="districtOptions"
          value-key="value"
          placeholder="Pilih Kecamatan"
          :disabled="processing || !formData.cityId || loadingDistricts"
          :loading="loadingDistricts"
          searchable
          class="w-full"
        />
      </UFormField>
    </div>

    <div class="grid gap-4 md:grid-cols-3">
      <UFormField label="Kode Pos" required :error="errors.postalCode">
        <UInput
          v-model="formData.postalCode"
          placeholder="Kode pos"
          :disabled="processing"
          :color="errors.postalCode ? 'error' : undefined"
          class="w-full"
        />
      </UFormField>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        label="Batal"
        :disabled="processing"
        @click="handleCancel"
      />
      <UButton
        type="submit"
        color="primary"
        :label="submitLabel || 'Simpan'"
        :loading="processing"
      />
    </div>
  </form>
</template>
