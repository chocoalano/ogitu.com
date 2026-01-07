<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import type { AddressIndexPageProps, StoreAddressData } from '~/types/settings'

defineOptions({ layout: AdminLayout })

const props = defineProps<AddressIndexPageProps>()

const formatPhone = (phone: string) => {
  if (!phone) return '-'
  return phone.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')
}

const handleSetDefault = (address: StoreAddressData) => {
  router.post(`/admin/settings/address/${address.id}/default`)
}

const handleToggleActive = (address: StoreAddressData) => {
  router.post(`/admin/settings/address/${address.id}/toggle`)
}

const handleDelete = (address: StoreAddressData) => {
  if (confirm(`Hapus alamat "${address.name}"?`)) {
    router.delete(`/admin/settings/address/${address.id}`)
  }
}
</script>

<template>
  <Head title="Alamat & Gudang" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Alamat & Gudang</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Kelola alamat gudang/toko untuk pengiriman produk
        </p>
      </div>
      <UButton
        icon="i-heroicons-plus"
        label="Tambah Alamat"
        color="primary"
        @click="router.visit('/admin/settings/address/create')"
      />
    </div>

    <!-- Info Box -->
    <UAlert
      icon="i-heroicons-information-circle"
      color="info"
      title="Alamat Pengiriman"
      description="Alamat default akan digunakan sebagai lokasi asal untuk menghitung ongkos kirim. Pastikan alamat lengkap sampai tingkat kecamatan agar perhitungan ongkir akurat."
    />

    <!-- Address List -->
    <div v-if="props.addresses.length > 0" class="grid gap-4 md:grid-cols-2">
      <UCard
        v-for="address in props.addresses"
        :key="address.id"
        :class="[
          'relative',
          address.isDefault ? 'ring-2 ring-primary-500' : '',
          !address.isActive ? 'opacity-60' : '',
        ]"
      >
        <!-- Default Badge -->
        <div v-if="address.isDefault" class="absolute -top-2 -right-2">
          <UBadge color="primary" size="sm">Default</UBadge>
        </div>

        <!-- Inactive Badge -->
        <div v-if="!address.isActive" class="absolute -top-2 left-2">
          <UBadge color="neutral" size="sm">Nonaktif</UBadge>
        </div>

        <div class="space-y-4">
          <!-- Header -->
          <div class="flex items-start justify-between">
            <div>
              <h3 class="font-semibold text-gray-900 dark:text-white">
                {{ address.name }}
              </h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ address.contactName }} • {{ formatPhone(address.phone) }}
              </p>
            </div>
            <UDropdownMenu
              :items="[
                [
                  {
                    label: 'Edit',
                    icon: 'i-heroicons-pencil',
                    click: () => router.visit(`/admin/settings/address/${address.id}/edit`),
                  },
                  {
                    label: address.isDefault ? 'Sudah Default' : 'Jadikan Default',
                    icon: 'i-heroicons-star',
                    disabled: address.isDefault,
                    click: () => handleSetDefault(address),
                  },
                  {
                    label: address.isActive ? 'Nonaktifkan' : 'Aktifkan',
                    icon: address.isActive ? 'i-heroicons-eye-slash' : 'i-heroicons-eye',
                    disabled: address.isDefault && address.isActive,
                    click: () => handleToggleActive(address),
                  },
                ],
                [
                  {
                    label: 'Hapus',
                    icon: 'i-heroicons-trash',
                    color: 'error',
                    click: () => handleDelete(address),
                  },
                ],
              ]"
            >
              <UButton icon="i-heroicons-ellipsis-vertical" color="neutral" variant="ghost" size="sm" />
            </UDropdownMenu>
          </div>

          <!-- Address -->
          <div class="text-sm text-gray-600 dark:text-gray-300">
            <p>{{ address.addressLine1 }}</p>
            <p v-if="address.addressLine2">{{ address.addressLine2 }}</p>
            <p>
              {{ address.districtName }}, {{ address.cityName }}
            </p>
            <p>
              {{ address.provinceName }} {{ address.postalCode }}
            </p>
          </div>

          <!-- Location IDs (for debugging) -->
          <div class="flex flex-wrap gap-2 text-xs text-gray-400">
            <span>Kec: {{ address.districtId }}</span>
            <span>•</span>
            <span>Kota: {{ address.cityId }}</span>
            <span>•</span>
            <span>Prov: {{ address.provinceId }}</span>
          </div>
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <UCard v-else class="text-center py-12">
      <div class="flex flex-col items-center">
        <UIcon name="i-heroicons-map-pin" class="w-12 h-12 text-gray-400 mb-4" />
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Belum ada alamat
        </h3>
        <p class="text-gray-500 dark:text-gray-400 mb-4">
          Tambahkan alamat gudang/toko untuk memulai
        </p>
        <UButton
          icon="i-heroicons-plus"
          label="Tambah Alamat"
          color="primary"
          @click="router.visit('/admin/settings/address/create')"
        />
      </div>
    </UCard>
  </div>
</template>
