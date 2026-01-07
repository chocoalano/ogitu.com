<script setup lang="ts">
import { computed, ref, watch } from 'vue'

interface Province {
  id: number
  name: string
}

interface City {
  id: number
  name: string
  type?: string
}

interface District {
  id: number
  name: string
}

interface AddressForm {
  label: string
  recipientName: string
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

const props = defineProps<{
  open: boolean
  defaultName?: string
  defaultPhone?: string
  isFirstAddress?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'saved': []
}>()

const form = ref<AddressForm>({
  label: '',
  recipientName: props.defaultName || '',
  phone: props.defaultPhone || '',
  addressLine1: '',
  addressLine2: '',
  provinceId: '',
  provinceName: '',
  cityId: '',
  cityName: '',
  districtId: '',
  districtName: '',
  postalCode: '',
  isDefault: props.isFirstAddress || false,
})

const provinces = ref<Province[]>([])
const cities = ref<City[]>([])
const districts = ref<District[]>([])
const loadingProvinces = ref(false)
const loadingCities = ref(false)
const loadingDistricts = ref(false)
const saving = ref(false)
const error = ref<string | null>(null)

const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

const fetchProvinces = async () => {
  loadingProvinces.value = true
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch('/api/location/provinces', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      credentials: 'include',
    })
    const result = await response.json()
    if (result.success) {
      provinces.value = result.data || []
    }
  } catch (err) {
    console.error('Error fetching provinces:', err)
  } finally {
    loadingProvinces.value = false
  }
}

const fetchCities = async (provinceId: string) => {
  loadingCities.value = true
  cities.value = []
  districts.value = []
  form.value.cityId = ''
  form.value.cityName = ''
  form.value.districtId = ''
  form.value.districtName = ''

  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/api/location/cities?provinceId=${provinceId}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      credentials: 'include',
    })
    const result = await response.json()
    if (result.success) {
      cities.value = result.data || []
    }
  } catch (err) {
    console.error('Error fetching cities:', err)
  } finally {
    loadingCities.value = false
  }
}

const fetchDistricts = async (cityId: string) => {
  loadingDistricts.value = true
  districts.value = []
  form.value.districtId = ''
  form.value.districtName = ''

  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/api/location/districts?cityId=${cityId}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      credentials: 'include',
    })
    const result = await response.json()
    if (result.success) {
      districts.value = result.data || []
    }
  } catch (err) {
    console.error('Error fetching districts:', err)
  } finally {
    loadingDistricts.value = false
  }
}

const saveAddress = async () => {
  error.value = null

  if (!form.value.recipientName || !form.value.phone || !form.value.addressLine1 ||
      !form.value.provinceId || !form.value.cityId || !form.value.postalCode) {
    error.value = 'Mohon lengkapi semua field yang diperlukan'
    return
  }

  saving.value = true
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch('/api/address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
      credentials: 'include',
      body: JSON.stringify(form.value),
    })

    const result = await response.json()
    if (result.success) {
      emit('saved')
      emit('update:open', false)
    } else {
      error.value = result.message || 'Gagal menyimpan alamat'
    }
  } catch (err) {
    console.error('Error saving address:', err)
    error.value = 'Gagal menyimpan alamat'
  } finally {
    saving.value = false
  }
}

const close = () => {
  emit('update:open', false)
}

const resetForm = () => {
  form.value = {
    label: '',
    recipientName: props.defaultName || '',
    phone: props.defaultPhone || '',
    addressLine1: '',
    addressLine2: '',
    provinceId: '',
    provinceName: '',
    cityId: '',
    cityName: '',
    districtId: '',
    districtName: '',
    postalCode: '',
    isDefault: props.isFirstAddress || false,
  }
  error.value = null
}

// Province options for select
const provinceOptions = computed(() =>
  provinces.value.map(p => ({
    label: p.name,
    value: String(p.id),
  }))
)

// City options for select
const cityOptions = computed(() =>
  cities.value.map(c => ({
    label: c.type ? `${c.type} ${c.name}` : c.name,
    value: String(c.id),
  }))
)

// District options for select
const districtOptions = computed(() =>
  districts.value.map(d => ({
    label: d.name,
    value: String(d.id),
  }))
)

// Watch province change
watch(() => form.value.provinceId, (newVal) => {
  if (newVal) {
    const province = provinces.value.find(p => String(p.id) === newVal)
    form.value.provinceName = province?.name || ''
    fetchCities(newVal)
  }
})

// Watch city change
watch(() => form.value.cityId, (newVal) => {
  if (newVal) {
    const city = cities.value.find(c => String(c.id) === newVal)
    form.value.cityName = city ? (city.type ? `${city.type} ${city.name}` : city.name) : ''
    fetchDistricts(newVal)
  }
})

// Watch district change
watch(() => form.value.districtId, (newVal) => {
  if (newVal) {
    const district = districts.value.find(d => String(d.id) === newVal)
    form.value.districtName = district?.name || ''
  }
})

// Fetch provinces when modal opens
watch(() => props.open, (isOpen) => {
  if (isOpen) {
    resetForm()
    if (provinces.value.length === 0) {
      fetchProvinces()
    }
  }
})
</script>

<template>
  <UModal
    :open="open"
    @update:open="emit('update:open', $event)"
    title="Tambah Alamat Baru"
    description="Isi form berikut untuk menambahkan alamat pengiriman baru"
    :ui="{ overlay: 'z-[100]', content: 'z-[100]' }"
  >
    <template #body>
      <div class="space-y-4 max-h-[60vh] overflow-y-auto overflow-x-visible p-4">
        <UAlert v-if="error" color="error" :title="error" icon="i-heroicons-exclamation-circle" />

        <UFormField label="Label Alamat">
          <UInput v-model="form.label" placeholder="Contoh: Rumah, Kantor" class="w-full"/>
        </UFormField>

        <UFormField label="Nama Penerima" required>
          <UInput v-model="form.recipientName" placeholder="Nama lengkap penerima" class="w-full"/>
        </UFormField>

        <UFormField label="No. Telepon" required>
          <UInput v-model="form.phone" placeholder="08xxxxxxxxxx" type="tel" class="w-full"/>
        </UFormField>

        <UFormField label="Provinsi" required>
          <USelectMenu
            v-model="form.provinceId"
            :items="provinceOptions"
            placeholder="Pilih Provinsi"
            :loading="loadingProvinces"
            value-key="value"
            :ui="{ content: 'z-[200] bg-white dark:bg-gray-900' }"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Kota/Kabupaten" required>
          <USelectMenu
            v-model="form.cityId"
            :items="cityOptions"
            placeholder="Pilih Kota/Kabupaten"
            :loading="loadingCities"
            :disabled="!form.provinceId"
            value-key="value"
            :ui="{ content: 'z-[200] bg-white dark:bg-gray-900' }"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Kecamatan" required>
          <USelectMenu
            v-model="form.districtId"
            :items="districtOptions"
            placeholder="Pilih Kecamatan"
            :loading="loadingDistricts"
            :disabled="!form.cityId"
            value-key="value"
            :ui="{ content: 'z-[200] bg-white dark:bg-gray-900' }"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Alamat Lengkap" required>
          <UTextarea
            v-model="form.addressLine1"
            placeholder="Nama jalan, nomor rumah, RT/RW"
            :rows="2"
            class="w-full"
          />
        </UFormField>

        <UFormField label="Detail Tambahan">
          <UInput v-model="form.addressLine2" placeholder="Patokan, nama gedung, dll (opsional)" class="w-full"/>
        </UFormField>

        <UFormField label="Kode Pos" required>
          <UInput v-model="form.postalCode" placeholder="12345" class="w-full"/>
        </UFormField>

        <UCheckbox v-model="form.isDefault" label="Jadikan alamat utama" class="w-full"/>
      </div>
    </template>

    <template #footer>
      <div class="flex justify-end gap-3 p-4">
        <UButton variant="ghost" @click="close">Batal</UButton>
        <UButton :loading="saving" @click="saveAddress">Simpan Alamat</UButton>
      </div>
    </template>
  </UModal>
</template>
