<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3'
import AdminLayout from '~/layouts/admin.vue'
import AddressForm from '~/components/admin/settings/AddressForm.vue'
import type { AddressFormPageProps } from '~/types/settings'
import type { AddressFormData } from '~/components/admin/settings/AddressForm.vue'

defineOptions({ layout: AdminLayout })

const props = defineProps<AddressFormPageProps>()

const form = useForm<AddressFormData>({
  name: props.address?.name || '',
  contactName: props.address?.contactName || '',
  phone: props.address?.phone || '',
  addressLine1: props.address?.addressLine1 || '',
  addressLine2: props.address?.addressLine2 || '',
  provinceId: props.address?.provinceId || '',
  provinceName: props.address?.provinceName || '',
  cityId: props.address?.cityId || '',
  cityName: props.address?.cityName || '',
  districtId: props.address?.districtId || '',
  districtName: props.address?.districtName || '',
  postalCode: props.address?.postalCode || '',
  isDefault: props.address?.isDefault || false,
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

  form.put(`/admin/settings/address/${props.address?.id}`)
}

const handleCancel = () => {
  router.visit('/admin/settings/address')
}
</script>

<template>
  <Head title="Edit Alamat" />

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
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Alamat</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ props.address?.name }}
        </p>
      </div>
    </div>

    <!-- Form -->
    <UCard>
      <AddressForm
        :provinces="props.provinces"
        :initial-cities="props.cities"
        :initial-districts="props.districts"
        :initial-data="props.address"
        :processing="form.processing"
        submit-label="Simpan Perubahan"
        @submit="handleSubmit"
        @cancel="handleCancel"
      />
    </UCard>
  </div>
</template>
