<script setup lang="ts">
import { ref, computed } from 'vue'
import { router, Link } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import AdminLayout from '~/layouts/admin.vue'

defineOptions({
  layout: AdminLayout,
})

interface User {
  id: number
  fullName: string | null
  email: string
  role: string
  createdAt: string
  updatedAt: string | null
}

interface Props {
  user: User
}

const props = defineProps<Props>()

const toast = useToast()

// Form state
const form = ref({
  fullName: props.user.fullName || '',
  email: props.user.email,
  password: '',
  passwordConfirmation: '',
  role: props.user.role,
})

const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Role options
const roleOptions = [
  { label: 'Admin', value: 'admin' },
  { label: 'Super Admin', value: 'superadmin' },
]

// Check if form has changes
const hasChanges = computed(() => {
  return form.value.fullName !== (props.user.fullName || '') ||
    form.value.email !== props.user.email ||
    form.value.role !== props.user.role ||
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

  return Object.keys(errors.value).length === 0
}

// Submit form
const handleSubmit = () => {
  if (!validateForm()) return

  isSubmitting.value = true

  const data: Record<string, any> = {
    fullName: form.value.fullName,
    email: form.value.email,
    role: form.value.role,
  }

  if (form.value.password) {
    data.password = form.value.password
  }

  router.put(`/admin/users/${props.user.id}`, data, {
    onSuccess: () => {
      toast.success('Pengguna berhasil diperbarui')
    },
    onError: (serverErrors) => {
      if (serverErrors) {
        errors.value = { ...errors.value, ...serverErrors }
      }
      toast.error('Gagal memperbarui pengguna')
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
        href="/admin/users"
        class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
      >
        <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-slate-600 dark:text-slate-400" />
      </Link>
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Edit Pengguna</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Edit data pengguna {{ props.user.fullName || props.user.email }}
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

        <!-- Role -->
        <div>
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Role <span class="text-red-500">*</span>
          </label>
          <USelect
            v-model="form.role"
            :items="roleOptions"
          />
          <p class="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Super Admin memiliki akses penuh ke semua fitur termasuk manajemen pengguna
          </p>
        </div>

        <!-- Submit -->
        <div class="flex justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
          <UButton
            color="neutral"
            variant="outline"
            :to="'/admin/users'"
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
