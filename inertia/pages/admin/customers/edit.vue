<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import AdminLayout from '~/layouts/admin.vue'

defineOptions({
  layout: AdminLayout,
})

interface Customer {
  id: number
  fullName: string
  email: string
  phone: string | null
  gender: 'male' | 'female' | null
  avatar: string | null
  isActive: boolean
  isVerified: boolean
  totalOrdersCount: number
  totalSpent: number
  createdAt: string
  updatedAt: string
}

interface Props {
  customer: Customer
}

const props = defineProps<Props>()

const toast = useToast()

// Form state
const form = ref({
  fullName: props.customer.fullName,
  email: props.customer.email,
  password: '',
  passwordConfirmation: '',
  phone: props.customer.phone || '',
  gender: props.customer.gender || '',
  isActive: props.customer.isActive,
  isVerified: props.customer.isVerified,
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Gender options
const genderOptions = [
  { label: 'Laki-laki', value: 'male' },
  { label: 'Perempuan', value: 'female' },
]

// Check if form has changes
const hasChanges = computed(() => {
  return form.value.fullName !== props.customer.fullName ||
    form.value.email !== props.customer.email ||
    form.value.phone !== (props.customer.phone || '') ||
    form.value.gender !== (props.customer.gender || '') ||
    form.value.isActive !== props.customer.isActive ||
    form.value.isVerified !== props.customer.isVerified ||
    form.value.password !== ''
})

// Validate form
const validateForm = () => {
  errors.value = {}

  if (!form.value.fullName) {
    errors.value.fullName = 'Nama lengkap wajib diisi'
  }

  if (!form.value.email) {
    errors.value.email = 'Email wajib diisi'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
    errors.value.email = 'Format email tidak valid'
  }

  if (form.value.password) {
    if (form.value.password.length < 8) {
      errors.value.password = 'Password minimal 8 karakter'
    }
    if (form.value.password !== form.value.passwordConfirmation) {
      errors.value.passwordConfirmation = 'Konfirmasi password tidak cocok'
    }
  }

  if (form.value.phone && !/^[0-9+\-\s()]+$/.test(form.value.phone)) {
    errors.value.phone = 'Format nomor telepon tidak valid'
  }

  return Object.keys(errors.value).length === 0
}

// Submit form
const handleSubmit = () => {
  if (!validateForm()) return

  isSubmitting.value = true

  const data: Record<string, any> = {
    fullName: form.value.fullName,
    email: form.value.email,
    phone: form.value.phone || null,
    gender: form.value.gender || null,
    isActive: form.value.isActive,
    isVerified: form.value.isVerified,
  }

  if (form.value.password) {
    data.password = form.value.password
  }

  router.put(`/admin/customers/${props.customer.id}`, data, {
    onSuccess: () => {
      toast.success('Pelanggan berhasil diperbarui')
    },
    onError: (serverErrors) => {
      if (serverErrors) {
        errors.value = { ...errors.value, ...serverErrors }
      }
      toast.error('Gagal memperbarui pelanggan')
    },
    onFinish: () => {
      isSubmitting.value = false
    },
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex items-center gap-4">
      <Link
        href="/admin/customers"
        class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-slate-600 dark:text-slate-400" />
      </Link>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Pelanggan</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Edit data pelanggan {{ props.customer.fullName }}
        </p>
      </div>
    </div>

    <!-- Form -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Full Name -->
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Nama Lengkap <span class="text-red-500">*</span>
          </label>
          <UInput
            v-model="form.fullName"
            placeholder="Masukkan nama lengkap"
            :error="!!errors.fullName"
          />
          <p v-if="errors.fullName" class="mt-1 text-sm text-red-500">{{ errors.fullName }}</p>
        </div>

        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Email <span class="text-red-500">*</span>
          </label>
          <UInput
            v-model="form.email"
            type="email"
            placeholder="Masukkan email"
            :error="!!errors.email"
          />
          <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
        </div>

        <!-- Password (optional) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Password Baru
            </label>
            <UInput
              v-model="form.password"
              type="password"
              placeholder="Kosongkan jika tidak ingin mengubah"
              :error="!!errors.password"
            />
            <p v-if="errors.password" class="mt-1 text-sm text-red-500">{{ errors.password }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Konfirmasi Password Baru
            </label>
            <UInput
              v-model="form.passwordConfirmation"
              type="password"
              placeholder="Konfirmasi password baru"
              :error="!!errors.passwordConfirmation"
            />
            <p v-if="errors.passwordConfirmation" class="mt-1 text-sm text-red-500">{{ errors.passwordConfirmation }}</p>
          </div>
        </div>

        <!-- Phone & Gender -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Nomor Telepon
            </label>
            <UInput
              v-model="form.phone"
              placeholder="Contoh: 081234567890"
              :error="!!errors.phone"
            />
            <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Gender
            </label>
            <USelect
              v-model="form.gender"
              :items="genderOptions"
              placeholder="Pilih Gender"
            />
          </div>
        </div>

        <!-- Status Toggles -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">Status Aktif</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Pelanggan dapat login dan berbelanja</p>
            </div>
            <USwitch v-model="form.isActive" />
          </div>

          <div class="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <div>
              <p class="font-medium text-slate-900 dark:text-white">Email Terverifikasi</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">Tandai email sebagai terverifikasi</p>
            </div>
            <USwitch v-model="form.isVerified" />
          </div>
        </div>

        <!-- Submit -->
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <UButton
            color="neutral"
            variant="outline"
            :to="'/admin/customers'"
          >
            Batal
          </UButton>
          <UButton
            type="submit"
            color="primary"
            :loading="isSubmitting"
            :disabled="!hasChanges"
          >
            Simpan Perubahan
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>
