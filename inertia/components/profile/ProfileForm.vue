<script setup lang="ts">
import type { ProfileCustomer, ProfileFormData } from './types'

const props = defineProps<{
  customer: ProfileCustomer
  form: ProfileFormData
  isEditing: boolean
  isSaving: boolean
  formatDate: (date: string) => string
}>()

const emit = defineEmits<{
  'update:form': [form: ProfileFormData]
  save: []
  cancel: []
}>()

// Create local v-model bindings
const updateFullName = (value: string) => {
  emit('update:form', { ...props.form, fullName: value })
}

const updatePhone = (value: string) => {
  emit('update:form', { ...props.form, phone: value })
}
</script>

<template>
  <div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-100 dark:border-gray-700/50">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <UIcon name="i-heroicons-user-circle" class="w-5 h-5 text-primary-500" />
        Informasi Profil
      </h2>
    </div>

    <div class="p-6 space-y-5">
      <!-- Full Name -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Nama Lengkap
        </label>
        <UInput
          :model-value="form.fullName"
          @update:model-value="updateFullName"
          :disabled="!isEditing"
          placeholder="Masukkan nama lengkap"
          size="lg"
          class="w-full"
          :ui="{ base: 'disabled:bg-gray-50 dark:disabled:bg-gray-800' }"
        />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Email
        </label>
        <UInput
          :model-value="customer.email"
          disabled
          class="w-full"
          size="lg"
          :ui="{ base: 'disabled:bg-gray-50 dark:disabled:bg-gray-800' }"
        />
        <p class="text-xs text-gray-500 mt-1">Email tidak dapat diubah</p>
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Nomor Telepon
        </label>
        <UInput
          :model-value="form.phone"
          @update:model-value="updatePhone"
          :disabled="!isEditing"
          placeholder="08xxxxxxxxxx"
          class="w-full"
          size="lg"
          :ui="{ base: 'disabled:bg-gray-50 dark:disabled:bg-gray-800' }"
        />
      </div>

      <!-- Member Since -->
      <div>
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
          Terdaftar Sejak
        </label>
        <UInput
          :model-value="formatDate(customer.createdAt)"
          disabled
          class="w-full"
          size="lg"
          :ui="{ base: 'disabled:bg-gray-50 dark:disabled:bg-gray-800' }"
        />
      </div>

      <!-- Action Buttons -->
      <div v-if="isEditing" class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700/50">
        <UButton variant="ghost" color="neutral" @click="emit('cancel')" :disabled="isSaving">
          Batal
        </UButton>
        <UButton color="primary" @click="emit('save')" :loading="isSaving">
          <UIcon name="i-heroicons-check" class="w-4 h-4 mr-2" />
          Simpan Perubahan
        </UButton>
      </div>
    </div>
  </div>
</template>
