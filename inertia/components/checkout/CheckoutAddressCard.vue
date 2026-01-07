<script setup lang="ts">
interface Address {
  id: number
  label: string
  recipientName: string
  phone: string
  addressLine1: string
  addressLine2: string | null
  cityId: string
  cityName: string
  provinceId: string
  provinceName: string
  postalCode: string
  isDefault: boolean
}

const props = defineProps<{
  addresses: Address[]
  selectedAddressId: number | null
}>()

const emit = defineEmits<{
  'update:selectedAddressId': [value: number]
  'add-address': []
}>()

const selectAddress = (id: number) => {
  emit('update:selectedAddressId', id)
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
          <UIcon name="i-heroicons-map-pin" class="text-primary" />
          Alamat Pengiriman
        </h3>
        <UButton size="sm" variant="ghost" @click="emit('add-address')">
          <UIcon name="i-heroicons-plus" class="mr-1" />
          Tambah Alamat
        </UButton>
      </div>
    </template>

    <div v-if="addresses.length === 0" class="text-center py-8">
      <UIcon name="i-heroicons-map-pin" class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600" />
      <p class="mt-2 text-gray-500 dark:text-gray-400">Belum ada alamat tersimpan</p>
      <UButton class="mt-4" @click="emit('add-address')">
        Tambah Alamat Baru
      </UButton>
    </div>

    <div v-else class="space-y-3">
      <div
        v-for="address in addresses"
        :key="address.id"
        class="relative border rounded-lg p-4 cursor-pointer transition-all"
        :class="selectedAddressId === address.id
          ? 'border-primary bg-primary/5 dark:bg-primary/10'
          : 'border-gray-200 dark:border-gray-700 hover:border-primary/50'"
        @click="selectAddress(address.id)"
      >
        <div class="flex items-start gap-3">
          <div class="mt-1">
            <div
              class="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors"
              :class="selectedAddressId === address.id
                ? 'border-primary bg-primary'
                : 'border-gray-300 dark:border-gray-600'"
            >
              <div
                v-if="selectedAddressId === address.id"
                class="w-2 h-2 rounded-full bg-white"
              />
            </div>
          </div>
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-1">
              <span class="font-medium text-gray-900 dark:text-white">{{ address.label }}</span>
              <UBadge v-if="address.isDefault" size="xs" color="primary" variant="soft">Default</UBadge>
            </div>
            <p class="font-semibold text-gray-800 dark:text-gray-200">{{ address.recipientName }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ address.phone }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ address.addressLine1 }}
              <span v-if="address.addressLine2">, {{ address.addressLine2 }}</span>
            </p>
            <p class="text-sm text-gray-600 dark:text-gray-400">
              {{ address.cityName }}, {{ address.provinceName }} {{ address.postalCode }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>
