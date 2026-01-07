<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import AdminLayout from '~/layouts/admin.vue'
import type { ShippingIndexPageProps, ShippingCourierData, AvailableCourier, CourierService } from '~/types/settings'

defineOptions({ layout: AdminLayout })

const props = defineProps<ShippingIndexPageProps>()

// Modal states
const showAddCourierModal = ref(false)
const showEditCourierModal = ref(false)
const selectedCourier = ref<ShippingCourierData | null>(null)
const selectedAvailableCourier = ref<AvailableCourier | null>(null)

// Add courier form
const addForm = useForm({
  code: '',
  name: '',
  logo: '',
  description: '',
  services: [] as CourierService[],
})

// Edit courier form
const editForm = useForm({
  name: '',
  description: '',
  services: [] as CourierService[],
  isActive: true,
})

// Get couriers that haven't been added yet
const availableCouriersToAdd = computed(() => {
  const existingCodes = props.couriers.map((c) => c.code)
  return props.availableCouriers.filter((c) => !existingCodes.includes(c.code))
})

// Open add courier modal
const openAddModal = (courier: AvailableCourier) => {
  selectedAvailableCourier.value = courier
  addForm.code = courier.code
  addForm.name = courier.name
  addForm.logo = courier.logo
  addForm.description = ''
  addForm.services = courier.services.map((s) => ({
    code: s.code,
    name: s.name,
    enabled: true,
  }))
  showAddCourierModal.value = true
}

// Open edit courier modal
const openEditModal = (courier: ShippingCourierData) => {
  selectedCourier.value = courier
  editForm.name = courier.name
  editForm.description = courier.description || ''
  editForm.services = [...courier.services]
  editForm.isActive = courier.isActive
  showEditCourierModal.value = true
}

// Submit add courier
const submitAddCourier = () => {
  addForm.post('/admin/settings/shipping/courier', {
    onSuccess: () => {
      showAddCourierModal.value = false
      addForm.reset()
      selectedAvailableCourier.value = null
    },
  })
}

// Submit edit courier
const submitEditCourier = () => {
  if (!selectedCourier.value) return

  editForm.put(`/admin/settings/shipping/courier/${selectedCourier.value.id}`, {
    onSuccess: () => {
      showEditCourierModal.value = false
      editForm.reset()
      selectedCourier.value = null
    },
  })
}

// Toggle courier active status
const toggleCourierActive = (courier: ShippingCourierData) => {
  router.post(`/admin/settings/shipping/courier/${courier.id}/toggle`)
}

// Remove courier
const removeCourier = (courier: ShippingCourierData) => {
  if (confirm(`Hapus kurir "${courier.name}" dari daftar?`)) {
    router.delete(`/admin/settings/shipping/courier/${courier.id}`)
  }
}

// Get courier logo or fallback
const getCourierLogo = (courier: ShippingCourierData): string | undefined => {
  const available = props.availableCouriers.find((c) => c.code === courier.code)
  return courier.logo || available?.logo || undefined
}

// Get courier initials for fallback
const getCourierInitials = (name: string) => {
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

// Handle image error - hide the broken image
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.style.display = 'none'
  // Show the fallback sibling element
  const fallback = img.nextElementSibling as HTMLElement
  if (fallback) {
    fallback.style.display = 'flex'
  }
}
</script>

<template>
  <Head title="Pengaturan Pengiriman" />

  <div class="space-y-6">
    <!-- Header -->
    <div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Pengiriman</h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Kelola kurir dan layanan pengiriman yang tersedia
      </p>
    </div>

    <!-- Default Address Warning -->
    <UAlert
      v-if="!props.defaultAddress"
      icon="i-heroicons-exclamation-triangle"
      color="warning"
      title="Alamat Belum Diatur"
      description="Anda perlu menambahkan alamat gudang/toko terlebih dahulu untuk menghitung ongkos kirim."
    >
      <template #actions>
        <UButton
          size="sm"
          color="warning"
          variant="outline"
          label="Atur Alamat"
          @click="router.visit('/admin/settings/address')"
        />
      </template>
    </UAlert>

    <!-- Default Address Info -->
    <UCard v-else>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
            <UIcon name="i-heroicons-map-pin" class="w-6 h-6 text-primary-500" />
          </div>
          <div>
            <h3 class="font-medium text-gray-900 dark:text-white">
              Alamat Pengiriman: {{ props.defaultAddress.name }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ props.defaultAddress.districtName }}, {{ props.defaultAddress.cityName }},
              {{ props.defaultAddress.provinceName }}
            </p>
          </div>
        </div>
        <UButton
          size="sm"
          color="neutral"
          variant="outline"
          label="Ubah"
          @click="router.visit('/admin/settings/address')"
        />
      </div>
    </UCard>

    <!-- Active Couriers -->
    <div>
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white">Kurir Aktif</h2>
      </div>

      <div v-if="props.couriers.length > 0" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <UCard
          v-for="courier in props.couriers"
          :key="courier.id"
          :class="[!courier.isActive ? 'opacity-60' : '']"
        >
          <div class="space-y-4">
            <!-- Header -->
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 shrink-0 relative">
                  <img
                    v-if="getCourierLogo(courier)"
                    :src="getCourierLogo(courier)"
                    :alt="courier.name"
                    class="w-full h-full object-contain"
                    @error="handleImageError"
                  />
                  <div
                    class="w-full h-full items-center justify-center text-sm font-bold text-gray-500 dark:text-gray-400"
                    :style="{ display: getCourierLogo(courier) ? 'none' : 'flex' }"
                  >
                    {{ getCourierInitials(courier.name) }}
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900 dark:text-white">
                    {{ courier.name }}
                  </h3>
                  <p class="text-xs text-gray-500 uppercase">{{ courier.code }}</p>
                </div>
              </div>
              <UDropdownMenu
                :items="[
                  [
                    {
                      label: 'Edit Layanan',
                      icon: 'i-heroicons-pencil',
                      click: () => openEditModal(courier),
                    },
                    {
                      label: courier.isActive ? 'Nonaktifkan' : 'Aktifkan',
                      icon: courier.isActive ? 'i-heroicons-eye-slash' : 'i-heroicons-eye',
                      click: () => toggleCourierActive(courier),
                    },
                  ],
                  [
                    {
                      label: 'Hapus',
                      icon: 'i-heroicons-trash',
                      color: 'error',
                      click: () => removeCourier(courier),
                    },
                  ],
                ]"
              >
                <UButton icon="i-heroicons-ellipsis-vertical" color="neutral" variant="ghost" size="sm" />
              </UDropdownMenu>
            </div>

            <!-- Status -->
            <div class="flex items-center gap-2">
              <UBadge :color="courier.isActive ? 'success' : 'neutral'" size="sm">
                {{ courier.isActive ? 'Aktif' : 'Nonaktif' }}
              </UBadge>
            </div>

            <!-- Services -->
            <div class="space-y-2">
              <p class="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Layanan</p>
              <div class="flex flex-wrap gap-1">
                <template v-for="service in courier.services" :key="service.code">
                  <UBadge
                    v-if="service.enabled"
                    color="primary"
                    variant="soft"
                    size="xs"
                  >
                    {{ service.code }}
                  </UBadge>
                </template>
                <span
                  v-if="courier.services.filter((s) => s.enabled).length === 0"
                  class="text-xs text-gray-400"
                >
                  Tidak ada layanan aktif
                </span>
              </div>
            </div>
          </div>
        </UCard>
      </div>

      <!-- Empty Active Couriers -->
      <UCard v-else class="text-center py-8">
        <UIcon name="i-heroicons-truck" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 class="font-medium text-gray-900 dark:text-white mb-2">Belum ada kurir aktif</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Tambahkan kurir dari daftar di bawah
        </p>
      </UCard>
    </div>

    <!-- Available Couriers to Add -->
    <div v-if="availableCouriersToAdd.length > 0">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tambah Kurir</h2>

      <div class="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <UCard
          v-for="courier in availableCouriersToAdd"
          :key="courier.code"
          class="cursor-pointer hover:ring-2 hover:ring-primary-500 transition-all"
          @click="openAddModal(courier)"
        >
          <div class="flex flex-col items-center text-center">
            <div class="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 p-2 mb-3 shrink-0 relative">
              <img
                v-if="courier.logo"
                :src="courier.logo"
                :alt="courier.name"
                class="w-full h-full object-contain"
                @error="handleImageError"
              />
              <div
                class="w-full h-full items-center justify-center text-lg font-bold text-gray-500 dark:text-gray-400"
                :style="{ display: courier.logo ? 'none' : 'flex' }"
              >
                {{ getCourierInitials(courier.name) }}
              </div>
            </div>
            <h3 class="font-medium text-gray-900 dark:text-white">{{ courier.name }}</h3>
            <p class="text-xs text-gray-500">{{ courier.services.length }} layanan</p>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Add Courier Modal -->
    <UModal v-model:open="showAddCourierModal" :ui="{ overlay: 'z-[100]', content: 'z-[100]' }">
      <template #header>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded bg-gray-100 dark:bg-gray-800 p-1 shrink-0 flex items-center justify-center">
            <img
              v-if="selectedAvailableCourier?.logo"
              :src="selectedAvailableCourier.logo"
              :alt="selectedAvailableCourier.name"
              class="w-full h-full object-contain"
              @error="handleImageError"
            />
            <span
              v-else
              class="text-sm font-bold text-gray-500 dark:text-gray-400"
            >
              {{ selectedAvailableCourier ? getCourierInitials(selectedAvailableCourier.name) : '' }}
            </span>
          </div>
          <div>
            <h3 class="text-lg font-semibold">Tambah {{ selectedAvailableCourier?.name }}</h3>
            <p class="text-sm text-gray-500">Pilih layanan yang ingin diaktifkan</p>
          </div>
        </div>
      </template>

      <div class="p-4 space-y-4">
        <!-- Services -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Layanan</label>
          <div class="space-y-2">
            <div
              v-for="service in addForm.services"
              :key="service.code"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ service.code }}</p>
                <p class="text-sm text-gray-500">{{ service.name }}</p>
              </div>
              <USwitch v-model="service.enabled" />
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            color="neutral"
            variant="outline"
            label="Batal"
            @click="showAddCourierModal = false"
          />
          <UButton
            color="primary"
            label="Tambah Kurir"
            :loading="addForm.processing"
            @click="submitAddCourier"
          />
        </div>
      </template>
    </UModal>

    <!-- Edit Courier Modal -->
    <UModal v-model:open="showEditCourierModal" :ui="{ overlay: 'z-[100]', content: 'z-[100]' }">
      <template #header>
        <h3 class="text-lg font-semibold">Edit {{ selectedCourier?.name }}</h3>
      </template>

      <div class="p-4 space-y-4">
        <!-- Description -->
        <UFormField label="Deskripsi (Opsional)">
          <UInput v-model="editForm.description" placeholder="Catatan untuk kurir ini" />
        </UFormField>

        <!-- Services -->
        <div class="space-y-2">
          <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Layanan</label>
          <div class="space-y-2">
            <div
              v-for="service in editForm.services"
              :key="service.code"
              class="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <p class="font-medium text-gray-900 dark:text-white">{{ service.code }}</p>
                <p class="text-sm text-gray-500">{{ service.name }}</p>
              </div>
              <USwitch v-model="service.enabled" />
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex justify-end gap-3">
          <UButton
            color="neutral"
            variant="outline"
            label="Batal"
            @click="showEditCourierModal = false"
          />
          <UButton
            color="primary"
            label="Simpan"
            :loading="editForm.processing"
            @click="submitEditCourier"
          />
        </div>
      </template>
    </UModal>
  </div>
</template>
