<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import AdminLayout from '~/layouts/admin.vue'

defineOptions({
  layout: AdminLayout,
})

interface Admin {
  id: number
  storeName: string
  slug: string
  description: string | null
  logo: string | null
  banner: string | null
  phone: string | null
  email: string | null
  address: string | null
  cityId: string | null
  cityName: string | null
  districtId: string | null
  districtName: string | null
  provinceId: string | null
  provinceName: string | null
  postalCode: string | null
  status: string
  rating: number
  totalReviews: number
  totalSales: number
  createdAt: string
}

interface LocationOption {
  id: string
  name: string
}

const props = withDefaults(defineProps<{
  admin?: Admin
}>(), {
  admin: () => ({
    id: 0,
    storeName: '',
    slug: '',
    description: null,
    logo: null,
    banner: null,
    phone: null,
    email: null,
    address: null,
    cityId: null,
    cityName: null,
    districtId: null,
    districtName: null,
    provinceId: null,
    provinceName: null,
    postalCode: null,
    status: '',
    rating: 0,
    totalReviews: 0,
    totalSales: 0,
    createdAt: '',
  }),
})

const toast = useToast()

// Form state
const form = ref({
  storeName: props.admin.storeName,
  description: props.admin.description || '',
  phone: props.admin.phone || '',
  email: props.admin.email || '',
  address: props.admin.address || '',
  cityId: props.admin.cityId || '',
  cityName: props.admin.cityName || '',
  districtId: props.admin.districtId || '',
  districtName: props.admin.districtName || '',
  provinceId: props.admin.provinceId || '',
  provinceName: props.admin.provinceName || '',
  postalCode: props.admin.postalCode || '',
})

// Image state
const logo = ref<string | null>(props.admin.logo)
const banner = ref<string | null>(props.admin.banner)
const logoFailed = ref(false)
const bannerFailed = ref(false)

// Location data
const provinces = ref<LocationOption[]>([])
const cities = ref<LocationOption[]>([])
const districts = ref<LocationOption[]>([])

// Location loading states
const isLoadingProvinces = ref(false)
const isLoadingCities = ref(false)
const isLoadingDistricts = ref(false)

// Loading states
const isSaving = ref(false)
const isUploadingLogo = ref(false)
const isUploadingBanner = ref(false)
const isDeletingLogo = ref(false)
const isDeletingBanner = ref(false)

// File inputs
const logoInput = ref<HTMLInputElement | null>(null)
const bannerInput = ref<HTMLInputElement | null>(null)

// Get CSRF token from cookie
const getToken = () => {
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : ''
}

// Get initials from store name
const getInitials = (name: string) => {
  if (!name) return '??'
  const words = name.trim().split(/\s+/)
  if (words.length >= 2) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

// Check if form has changes
const hasChanges = computed(() => {
  return (
    form.value.storeName !== props.admin.storeName ||
    form.value.description !== (props.admin.description || '') ||
    form.value.phone !== (props.admin.phone || '') ||
    form.value.email !== (props.admin.email || '') ||
    form.value.address !== (props.admin.address || '') ||
    form.value.cityId !== (props.admin.cityId || '') ||
    form.value.cityName !== (props.admin.cityName || '') ||
    form.value.districtId !== (props.admin.districtId || '') ||
    form.value.districtName !== (props.admin.districtName || '') ||
    form.value.provinceId !== (props.admin.provinceId || '') ||
    form.value.provinceName !== (props.admin.provinceName || '') ||
    form.value.postalCode !== (props.admin.postalCode || '')
  )
})

// Status badge config
const statusConfig = computed(() => {
  const configs: Record<string, { label: string; color: 'success' | 'warning' | 'error' | 'neutral' }> = {
    active: { label: 'Aktif', color: 'success' },
    pending: { label: 'Pending', color: 'warning' },
    suspended: { label: 'Ditangguhkan', color: 'error' },
    inactive: { label: 'Tidak Aktif', color: 'neutral' },
  }
  return configs[props.admin.status] || { label: props.admin.status, color: 'neutral' }
})

// Format date
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Fetch provinces
const fetchProvinces = async () => {
  isLoadingProvinces.value = true
  try {
    const response = await fetch('/api/location/provinces', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    })
    const data = await response.json()
    if (data.success && Array.isArray(data.data)) {
      provinces.value = data.data.map((p: any) => ({
        id: String(p.province_id || p.id),
        name: p.province || p.name,
      }))
    }
  } catch (error) {
    console.error('Fetch provinces error:', error)
  } finally {
    isLoadingProvinces.value = false
  }
}

// Fetch cities by province
const fetchCities = async (provinceId: string) => {
  if (!provinceId) {
    cities.value = []
    return
  }

  isLoadingCities.value = true
  try {
    const response = await fetch(`/api/location/cities?provinceId=${provinceId}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    })
    const data = await response.json()
    if (data.success && Array.isArray(data.data)) {
      cities.value = data.data.map((c: any) => ({
        id: String(c.city_id || c.id),
        name: c.city_name || (c.type ? `${c.type} ${c.city}` : c.name),
      }))
    }
  } catch (error) {
    console.error('Fetch cities error:', error)
  } finally {
    isLoadingCities.value = false
  }
}

// Fetch districts by city
const fetchDistricts = async (cityId: string) => {
  if (!cityId) {
    districts.value = []
    return
  }

  isLoadingDistricts.value = true
  try {
    const response = await fetch(`/api/location/districts?cityId=${cityId}`, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      credentials: 'include',
    })
    const data = await response.json()
    if (data.success && Array.isArray(data.data)) {
      districts.value = data.data.map((d: any) => ({
        id: String(d.subdistrict_id || d.district_id || d.id),
        name: d.subdistrict_name || d.district_name || d.name,
      }))
    }
  } catch (error) {
    console.error('Fetch districts error:', error)
  } finally {
    isLoadingDistricts.value = false
  }
}

// Computed options for select menus
const provinceOptions = computed(() =>
  provinces.value.map((p) => ({
    label: p.name,
    value: p.id,
  }))
)

const cityOptions = computed(() =>
  cities.value.map((c) => ({
    label: c.name,
    value: c.id,
  }))
)

const districtOptions = computed(() =>
  districts.value.map((d) => ({
    label: d.name,
    value: d.id,
  }))
)

// Watch province change
watch(
  () => form.value.provinceId,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      const province = provinces.value.find((p) => p.id === newVal)
      form.value.provinceName = province?.name || ''
      // Reset city and district
      form.value.cityId = ''
      form.value.cityName = ''
      form.value.districtId = ''
      form.value.districtName = ''
      cities.value = []
      districts.value = []
      fetchCities(newVal)
    }
  }
)

// Watch city change
watch(
  () => form.value.cityId,
  (newVal, oldVal) => {
    if (newVal && newVal !== oldVal) {
      const city = cities.value.find((c) => c.id === newVal)
      form.value.cityName = city?.name || ''
      // Reset district
      form.value.districtId = ''
      form.value.districtName = ''
      districts.value = []
      fetchDistricts(newVal)
    }
  }
)

// Watch district change
watch(
  () => form.value.districtId,
  (newVal) => {
    if (newVal) {
      const district = districts.value.find((d) => d.id === newVal)
      form.value.districtName = district?.name || ''
    }
  }
)

// Initialize location data on mount
onMounted(async () => {
  await fetchProvinces()

  // If admin has existing location, pre-populate dropdowns
  if (props.admin.provinceId) {
    await fetchCities(props.admin.provinceId)
  }
  if (props.admin.cityId) {
    await fetchDistricts(props.admin.cityId)
  }
})

// Save profile
const saveProfile = async () => {
  if (!form.value.storeName.trim()) {
    toast.error('Error', 'Nama toko tidak boleh kosong')
    return
  }

  if (form.value.storeName.trim().length < 3) {
    toast.error('Error', 'Nama toko minimal 3 karakter')
    return
  }

  isSaving.value = true

  try {
    const response = await fetch('/admin/settings/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getToken(),
      },
      credentials: 'include',
      body: JSON.stringify(form.value),
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Berhasil', data.message)
      router.reload({ only: ['admin'] })
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    console.error('Save profile error:', error)
    toast.error('Error', 'Terjadi kesalahan saat menyimpan profil')
  } finally {
    isSaving.value = false
  }
}

// Upload logo
const handleLogoUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Validate file
  if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
    toast.error('Error', 'Format file harus JPG, PNG, atau WebP')
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    toast.error('Error', 'Ukuran file maksimal 2MB')
    return
  }

  isUploadingLogo.value = true

  try {
    const formData = new FormData()
    formData.append('logo', file)

    const response = await fetch('/admin/settings/logo', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getToken(),
      },
      credentials: 'include',
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      logo.value = data.data.logo
      logoFailed.value = false
      toast.success('Berhasil', data.message)
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    console.error('Upload logo error:', error)
    toast.error('Error', 'Terjadi kesalahan saat upload logo')
  } finally {
    isUploadingLogo.value = false
    if (logoInput.value) logoInput.value.value = ''
  }
}

// Upload banner
const handleBannerUpload = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  // Validate file
  if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
    toast.error('Error', 'Format file harus JPG, PNG, atau WebP')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    toast.error('Error', 'Ukuran file maksimal 5MB')
    return
  }

  isUploadingBanner.value = true

  try {
    const formData = new FormData()
    formData.append('banner', file)

    const response = await fetch('/admin/settings/banner', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getToken(),
      },
      credentials: 'include',
      body: formData,
    })

    const data = await response.json()

    if (data.success) {
      banner.value = data.data.banner
      bannerFailed.value = false
      toast.success('Berhasil', data.message)
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    console.error('Upload banner error:', error)
    toast.error('Error', 'Terjadi kesalahan saat upload banner')
  } finally {
    isUploadingBanner.value = false
    if (bannerInput.value) bannerInput.value.value = ''
  }
}

// Delete logo
const deleteLogo = async () => {
  if (!confirm('Apakah Anda yakin ingin menghapus logo?')) return

  isDeletingLogo.value = true

  try {
    const response = await fetch('/admin/settings/logo', {
      method: 'DELETE',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getToken(),
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (data.success) {
      logo.value = null
      toast.success('Berhasil', data.message)
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    console.error('Delete logo error:', error)
    toast.error('Error', 'Terjadi kesalahan saat menghapus logo')
  } finally {
    isDeletingLogo.value = false
  }
}

// Delete banner
const deleteBanner = async () => {
  if (!confirm('Apakah Anda yakin ingin menghapus banner?')) return

  isDeletingBanner.value = true

  try {
    const response = await fetch('/admin/settings/banner', {
      method: 'DELETE',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': getToken(),
      },
      credentials: 'include',
    })

    const data = await response.json()

    if (data.success) {
      banner.value = null
      toast.success('Berhasil', data.message)
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    console.error('Delete banner error:', error)
    toast.error('Error', 'Terjadi kesalahan saat menghapus banner')
  } finally {
    isDeletingBanner.value = false
  }
}

// Reset form
const resetForm = () => {
  form.value = {
    storeName: props.admin.storeName,
    description: props.admin.description || '',
    phone: props.admin.phone || '',
    email: props.admin.email || '',
    address: props.admin.address || '',
    cityId: props.admin.cityId || '',
    cityName: props.admin.cityName || '',
    districtId: props.admin.districtId || '',
    districtName: props.admin.districtName || '',
    provinceId: props.admin.provinceId || '',
    provinceName: props.admin.provinceName || '',
    postalCode: props.admin.postalCode || '',
  }
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Profil Toko</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Kelola informasi dan tampilan toko Anda
        </p>
      </div>
      <UBadge :color="statusConfig.color" size="lg">
        {{ statusConfig.label }}
      </UBadge>
    </div>

    <!-- Store Info Card -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <!-- Banner Section -->
      <div class="relative h-48 bg-linear-to-r from-violet-500 to-fuchsia-500">
        <img
          v-if="banner && !bannerFailed"
          :src="banner"
          alt="Store Banner"
          class="w-full h-full object-cover"
          @error="bannerFailed = true"
        />
        <div class="absolute inset-0 bg-black/20" />

        <!-- Banner Actions -->
        <div class="absolute top-4 right-4 flex gap-2">
          <input
            ref="bannerInput"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            class="hidden"
            @change="handleBannerUpload"
          />
          <UButton
            color="white"
            variant="solid"
            size="sm"
            :loading="isUploadingBanner"
            @click="bannerInput?.click()"
          >
            <UIcon name="i-heroicons-camera" class="w-4 h-4 mr-1" />
            {{ banner ? 'Ganti' : 'Upload' }} Banner
          </UButton>
          <UButton
            v-if="banner"
            color="error"
            variant="soft"
            size="sm"
            :loading="isDeletingBanner"
            @click="deleteBanner"
          >
            <UIcon name="i-heroicons-trash" class="w-4 h-4" />
          </UButton>
        </div>

        <!-- Logo Section -->
        <div class="absolute -bottom-12 left-6">
          <div class="relative">
            <div class="w-24 h-24 rounded-xl overflow-hidden border-4 border-white dark:border-slate-800 shadow-lg bg-white dark:bg-slate-700">
              <img
                v-if="logo && !logoFailed"
                :src="logo"
                alt="Store Logo"
                class="w-full h-full object-cover"
                @error="logoFailed = true"
              />
              <div
                v-else
                class="w-full h-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-2xl"
              >
                {{ getInitials(form.storeName) }}
              </div>
            </div>

            <!-- Logo Actions -->
            <div class="absolute -bottom-2 -right-2 flex gap-1">
              <input
                ref="logoInput"
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                class="hidden"
                @change="handleLogoUpload"
              />
              <UButton
                color="primary"
                size="xs"
                class="rounded-full shadow-lg"
                :loading="isUploadingLogo"
                @click="logoInput?.click()"
              >
                <UIcon name="i-heroicons-camera" class="w-3 h-3" />
              </UButton>
              <UButton
                v-if="logo"
                color="error"
                size="xs"
                class="rounded-full shadow-lg"
                :loading="isDeletingLogo"
                @click="deleteLogo"
              >
                <UIcon name="i-heroicons-trash" class="w-3 h-3" />
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <!-- Store Stats -->
      <div class="pt-16 px-6 pb-6">
        <div class="flex flex-wrap items-center gap-6 mb-6">
          <div>
            <h2 class="text-xl font-bold text-slate-900 dark:text-white">
              {{ form.storeName }}
            </h2>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Bergabung sejak {{ formatDate(admin.createdAt) }}
            </p>
          </div>
          <div class="flex gap-6 ml-auto">
            <div class="text-center">
              <div class="flex items-center gap-1 text-lg font-bold text-slate-900 dark:text-white">
                <UIcon name="i-heroicons-star-solid" class="w-5 h-5 text-amber-400" />
                {{ Number(admin.rating || 0).toFixed(1) }}
              </div>
              <p class="text-xs text-slate-500 dark:text-slate-400">Rating</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-bold text-slate-900 dark:text-white">{{ admin.totalReviews || 0 }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Ulasan</p>
            </div>
            <div class="text-center">
              <p class="text-lg font-bold text-slate-900 dark:text-white">{{ admin.totalSales || 0 }}</p>
              <p class="text-xs text-slate-500 dark:text-slate-400">Terjual</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Profile Form -->
    <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-6">Informasi Toko</h3>

      <div class="space-y-6">
        <!-- Store Name -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Nama Toko <span class="text-red-500">*</span>
            </label>
            <UInput
              v-model="form.storeName"
              placeholder="Masukkan nama toko"
              size="lg"
              class="w-full"
            />
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              URL Toko: ogitu.com/store/{{ admin.slug }}
            </p>
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Email Toko
            </label>
            <UInput
              v-model="form.email"
              type="email"
              placeholder="email@toko.com"
              size="lg"
              class="w-full"
            />
          </div>
        </div>

        <!-- Phone -->
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Nomor Telepon
          </label>
          <UInput
            v-model="form.phone"
            placeholder="08xxxxxxxxxx"
            size="lg"
            class="w-full md:w-1/2"
          />
        </div>

        <!-- Description -->
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Deskripsi Toko
          </label>
          <UTextarea
            v-model="form.description"
            placeholder="Ceritakan tentang toko Anda..."
            :rows="4"
            class="w-full"
          />
        </div>

        <!-- Address -->
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Alamat Lengkap
          </label>
          <UTextarea
            v-model="form.address"
            placeholder="Alamat lengkap toko"
            :rows="2"
            class="w-full"
          />
        </div>

        <!-- Location Section Header -->
        <div class="border-t border-slate-200 dark:border-slate-700 pt-6">
          <h4 class="text-base font-semibold text-slate-900 dark:text-white mb-1">
            <UIcon name="i-heroicons-map-pin" class="w-5 h-5 inline-block mr-2 text-violet-600" />
            Alamat Pickup
          </h4>
          <p class="text-sm text-slate-500 dark:text-slate-400 mb-4">
            Alamat ini digunakan untuk perhitungan ongkos kirim dan pickup barang
          </p>
        </div>

        <!-- Location Dropdowns -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Provinsi <span class="text-red-500">*</span>
            </label>
            <USelectMenu
              v-model="form.provinceId"
              :items="provinceOptions"
              placeholder="Pilih provinsi"
              :loading="isLoadingProvinces"
              value-key="value"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Kota/Kabupaten <span class="text-red-500">*</span>
            </label>
            <USelectMenu
              v-model="form.cityId"
              :items="cityOptions"
              placeholder="Pilih kota/kabupaten"
              :loading="isLoadingCities"
              :disabled="!form.provinceId"
              value-key="value"
              class="w-full"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Kecamatan <span class="text-red-500">*</span>
            </label>
            <USelectMenu
              v-model="form.districtId"
              :items="districtOptions"
              placeholder="Pilih kecamatan"
              :loading="isLoadingDistricts"
              :disabled="!form.cityId"
              value-key="value"
              class="w-full"
            />
          </div>
        </div>

        <!-- Postal Code -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Kode Pos
            </label>
            <UInput
              v-model="form.postalCode"
              placeholder="12345"
              size="lg"
              class="w-full"
            />
          </div>
          <div class="md:col-span-2">
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Lokasi Saat Ini
            </label>
            <div class="h-11 px-4 flex items-center bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400">
              <UIcon name="i-heroicons-map-pin" class="w-4 h-4 mr-2 text-slate-400" />
              <span v-if="form.districtName && form.cityName && form.provinceName">
                {{ form.districtName }}, {{ form.cityName }}, {{ form.provinceName }}
              </span>
              <span v-else class="text-slate-400">
                Belum ada lokasi dipilih
              </span>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <UButton
            v-if="hasChanges"
            color="neutral"
            variant="outline"
            @click="resetForm"
          >
            Reset
          </UButton>
          <UButton
            color="primary"
            :loading="isSaving"
            :disabled="!hasChanges"
            @click="saveProfile"
          >
            <UIcon name="i-heroicons-check" class="w-4 h-4 mr-1" />
            Simpan Perubahan
          </UButton>
        </div>
      </div>
    </div>

    <!-- Tips Card -->
    <div class="bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800 p-6">
      <div class="flex gap-4">
        <div class="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-light-bulb" class="w-5 h-5 text-violet-600 dark:text-violet-400" />
        </div>
        <div>
          <h4 class="font-semibold text-violet-900 dark:text-violet-100 mb-2">Tips Profil Toko</h4>
          <ul class="text-sm text-violet-700 dark:text-violet-300 space-y-1">
            <li>• Gunakan logo yang jelas dan mudah dikenali</li>
            <li>• Banner dengan ukuran 1200x300 pixel akan terlihat optimal</li>
            <li>• Deskripsi yang lengkap membantu pembeli mengenal toko Anda</li>
            <li>• <strong>Alamat Pickup wajib diisi</strong> agar ongkos kirim dapat dihitung dengan akurat, <strong>Kami hanya akan menampilkan produk aktif untuk toko yang sudah memiliki alamat pickup!</strong></li>
            <li>• Pilih kecamatan dengan benar untuk estimasi pengiriman yang tepat</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
