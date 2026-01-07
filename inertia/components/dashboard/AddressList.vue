<script setup lang="ts">
import type { Address } from './types'

defineProps<{
  addresses: Address[]
}>()

const emit = defineEmits<{
  add: []
  edit: [address: Address]
  delete: [id: number]
  setDefault: [id: number]
}>()
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">
            <UIcon name="i-heroicons-map-pin" class="w-5 h-5 text-emerald-500" />
          </div>
          <h2 class="font-semibold text-gray-900 dark:text-white">Alamat Saya</h2>
        </div>
        <UButton variant="ghost" color="primary" size="sm" @click="emit('add')">
          <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
          Tambah
        </UButton>
      </div>
    </div>

    <div v-if="addresses.length > 0" class="divide-y divide-gray-100 dark:divide-gray-700/50">
      <div
        v-for="address in addresses"
        :key="address.id"
        class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
      >
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1.5">
              <span class="font-semibold text-gray-900 dark:text-white">{{ address.recipientName }}</span>
              <span class="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                {{ address.label }}
              </span>
              <span
                v-if="address.isDefault"
                class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
              >
                Utama
              </span>
            </div>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ address.phone }}</p>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
              {{ address.addressLine1 }}
              <span v-if="address.addressLine2">, {{ address.addressLine2 }}</span>
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ address.districtName ? `${address.districtName}, ` : '' }}{{ address.cityName }}, {{ address.provinceName }} {{ address.postalCode }}
            </p>
          </div>

          <div class="flex items-center gap-1">
            <UButton
              v-if="!address.isDefault"
              variant="ghost"
              color="gray"
              size="xs"
              @click="emit('setDefault', address.id)"
            >
              <UIcon name="i-heroicons-star" class="w-4 h-4" />
            </UButton>
            <UButton
              variant="ghost"
              color="gray"
              size="xs"
              @click="emit('edit', address)"
            >
              <UIcon name="i-heroicons-pencil" class="w-4 h-4" />
            </UButton>
            <UButton
              variant="ghost"
              color="error"
              size="xs"
              @click="emit('delete', address.id)"
            >
              <UIcon name="i-heroicons-trash" class="w-4 h-4" />
            </UButton>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="p-8 text-center">
      <div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
        <UIcon name="i-heroicons-map-pin" class="w-7 h-7 text-gray-400" />
      </div>
      <h3 class="font-semibold text-gray-900 dark:text-white mb-1">Belum Ada Alamat</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Tambahkan alamat untuk mempermudah checkout
      </p>
      <UButton color="primary" size="sm" @click="emit('add')">
        <UIcon name="i-heroicons-plus" class="w-4 h-4 mr-1" />
        Tambah Alamat
      </UButton>
    </div>
  </div>
</template>
