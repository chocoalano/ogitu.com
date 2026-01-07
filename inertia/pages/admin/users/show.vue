<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import { ref } from 'vue'
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

const deleteModalOpen = ref(false)

// Format date
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// Get role badge color
const getRoleBadgeColor = (role: string) => {
  return role === 'superadmin' ? 'primary' : 'neutral'
}

// Delete user
const confirmDelete = () => {
  router.delete(`/admin/users/${props.user.id}`, {
    onSuccess: () => {
      toast.success('Pengguna berhasil dihapus')
    },
    onError: () => {
      toast.error('Gagal menghapus pengguna')
    },
  })
}
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div class="flex items-center gap-4">
        <Link
          href="/admin/users"
          class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <UIcon name="i-heroicons-arrow-left" class="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Detail Pengguna</h1>
          <p class="text-gray-500 dark:text-gray-400">
            Informasi lengkap pengguna
          </p>
        </div>
      </div>
      <div class="flex gap-2">
        <UButton
          icon="i-heroicons-pencil-square"
          color="primary"
          variant="outline"
          :to="`/admin/users/${props.user.id}/edit`"
        >
          Edit
        </UButton>
        <UButton
          icon="i-heroicons-trash"
          color="error"
          variant="outline"
          @click="deleteModalOpen = true"
        >
          Hapus
        </UButton>
      </div>
    </div>

    <!-- User Info Card -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      <!-- Header with Avatar -->
      <div class="bg-linear-to-r from-violet-500 to-purple-600 px-6 py-8">
        <div class="flex items-center gap-4">
          <div class="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            <UIcon name="i-heroicons-user" class="w-10 h-10 text-white" />
          </div>
          <div>
            <h2 class="text-2xl font-bold text-white">
              {{ props.user.fullName || 'Belum diisi' }}
            </h2>
            <p class="text-white/80">{{ props.user.email }}</p>
            <UBadge :color="getRoleBadgeColor(props.user.role)" class="mt-2">
              {{ props.user.role === 'superadmin' ? 'Super Admin' : 'Admin' }}
            </UBadge>
          </div>
        </div>
      </div>

      <!-- Details -->
      <div class="p-6">
        <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Informasi Pengguna
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-slate-500 dark:text-slate-400">ID</label>
              <p class="text-slate-900 dark:text-white font-medium">#{{ props.user.id }}</p>
            </div>
            <div>
              <label class="block text-sm text-slate-500 dark:text-slate-400">Nama Lengkap</label>
              <p class="text-slate-900 dark:text-white font-medium">
                {{ props.user.fullName || 'Belum diisi' }}
              </p>
            </div>
            <div>
              <label class="block text-sm text-slate-500 dark:text-slate-400">Email</label>
              <p class="text-slate-900 dark:text-white font-medium">{{ props.user.email }}</p>
            </div>
          </div>
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-slate-500 dark:text-slate-400">Role</label>
              <UBadge :color="getRoleBadgeColor(props.user.role)" variant="subtle">
                {{ props.user.role === 'superadmin' ? 'Super Admin' : 'Admin' }}
              </UBadge>
            </div>
            <div>
              <label class="block text-sm text-slate-500 dark:text-slate-400">Tanggal Dibuat</label>
              <p class="text-slate-900 dark:text-white font-medium">
                {{ formatDate(props.user.createdAt) }}
              </p>
            </div>
            <div v-if="props.user.updatedAt">
              <label class="block text-sm text-slate-500 dark:text-slate-400">Terakhir Diperbarui</label>
              <p class="text-slate-900 dark:text-white font-medium">
                {{ formatDate(props.user.updatedAt) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Modal -->
    <UModal v-model:open="deleteModalOpen" :ui="{ overlay: 'z-[100]', content: 'z-[100]' }">
      <template #content>
        <div class="p-6 max-h-[85vh] overflow-y-auto">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center">
              <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Hapus Pengguna</h3>
              <p class="text-slate-500 dark:text-slate-400">
                Apakah Anda yakin ingin menghapus <strong>{{ props.user.fullName || props.user.email }}</strong>?
              </p>
            </div>
          </div>
          <div class="flex justify-end gap-3">
            <UButton color="neutral" variant="outline" @click="deleteModalOpen = false">
              Batal
            </UButton>
            <UButton color="error" @click="confirmDelete">
              Hapus
            </UButton>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
