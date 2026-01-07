<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import type { AdminOrder, Courier, ShippingFormData } from '~/types/admin_order'
import { COURIER_SERVICES } from '~/types/admin_order'

const open = defineModel<boolean>('open', { required: true })

const props = defineProps<{
  order: AdminOrder | null
  couriers: Courier[]
  loading?: boolean
}>()

const emit = defineEmits<{
  submit: [form: ShippingFormData, isUpdate: boolean]
}>()

const form = ref<ShippingFormData>({
  courierCode: '',
  courierService: 'REG',
  waybill: '',
  weight: 1000,
})

const isUpdate = computed(() => !!props.order?.shipping?.waybill)

// Reset form when order changes
watch(() => props.order, (newOrder) => {
  if (newOrder) {
    form.value = {
      courierCode: newOrder.shipping?.courierCode || '',
      courierService: newOrder.shipping?.courierService || 'REG',
      waybill: newOrder.shipping?.waybill || '',
      weight: newOrder.shipping?.weight || 1000,
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  emit('submit', { ...form.value }, isUpdate.value)
}

const handleClose = () => {
  open.value = false
}
</script>

<template>
  <UModal
    v-model:open="open"
    :title="isUpdate ? 'Update Pengiriman' : 'Input Pengiriman'"
    description="Masukkan informasi pengiriman pesanan"
    :ui="{ overlay: 'z-[100]', content: 'z-[100]' }"
  >
    <template #content>
      <UCard class="max-h-[85vh] overflow-y-auto">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ isUpdate ? 'Update Pengiriman' : 'Input Pengiriman' }}
            </h3>
            <UButton color="neutral" variant="ghost" icon="i-heroicons-x-mark" @click="handleClose" />
          </div>
        </template>

        <div class="space-y-4">
          <!-- Order Info -->
          <div class="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <p class="font-medium text-gray-900 dark:text-white">{{ order?.orderNumber }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              {{ order?.customer?.name }} • {{ order?.itemCount }} item
            </p>
          </div>

          <!-- Courier Select -->
          <UFormField label="Kurir" required>
            <USelectMenu
              v-model="form.courierCode"
              :items="couriers"
              value-key="code"
              option-attribute="name"
              placeholder="Pilih kurir"
              class="w-full"
            />
          </UFormField>

          <!-- Service Select -->
          <UFormField label="Layanan">
            <USelectMenu
              v-model="form.courierService"
              :items="COURIER_SERVICES"
              value-key="value"
              option-attribute="label"
              placeholder="Pilih layanan"
              class="w-full"
            />
          </UFormField>

          <!-- Waybill Input -->
          <UFormField label="Nomor Resi" required>
            <UInput
              v-model="form.waybill"
              placeholder="Masukkan nomor resi"
              class="w-full font-mono"
            />
          </UFormField>

          <!-- Weight Input -->
          <UFormField label="Berat (gram)">
            <UInput
              v-model="form.weight"
              type="number"
              placeholder="Berat dalam gram"
              class="w-full"
            />
          </UFormField>
        </div>

        <template #footer>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="ghost" @click="handleClose">
              Batal
            </UButton>
            <UButton color="primary" :loading="loading" @click="handleSubmit">
              {{ isUpdate ? 'Perbarui' : 'Kirim Pesanan' }}
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
