<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import AddressForm from '~/components/admin/settings/AddressForm.vue'
import type { AddressFormPageProps } from '~/types/settings'
import type { AddressFormData } from '~/components/admin/settings/AddressForm.vue'

defineOptions({ layout: AdminLayout })

const props = defineProps<AddressFormPageProps>()

const form = useForm<AddressFormData>({
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
})

const handleSubmit = (data: AddressFormData) => {
  form.name = data.name
  form.contactName = data.contactName
  form.phone = data.phone
  form.addressLine1 = data.addressLine1
  form.addressLine2 = data.addressLine2
  form.provinceId = data.provinceId
  form.provinceName = data.provinceName
  form.cityId = data.cityId
  form.cityName = data.cityName
  form.districtId = data.districtId
  form.districtName = data.districtName
  form.postalCode = data.postalCode
  form.isDefault = data.isDefault

  form.post('/admin/settings/address')
}

const handleCancel = () => {
  router.visit('/admin/settings/address')
}
</script>

<template>
  <Head title="Tambah Alamat" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center gap-4">
      <UButton
        icon="i-heroicons-arrow-left"
        color="neutral"
        variant="ghost"
        @click="router.visit('/admin/settings/address')"
      />
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Tambah Alamat</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Tambahkan alamat gudang/toko baru
        </p>
      </div>
    </div>

    <!-- Form -->
    <UCard>
      <AddressForm
        :provinces="props.provinces"
        :processing="form.processing"
        submit-label="Simpan Alamat"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </UCard>
  </div>
</template>
