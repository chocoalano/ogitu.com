<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { Link } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'

const props = defineProps<{
  productId: number
  productName: string
  status: 'draft' | 'active' | 'inactive' | 'out_of_stock'
}>()

const emit = defineEmits<{
  delete: []
}>()

const toast = useToast()
const isLoading = ref(false)

// Modal states
const duplicateModalOpen = ref(false)
const statusModalOpen = ref(false)

// Get XSRF token from cookie
const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// Handle duplicate
const handleDuplicate = async () => {
  isLoading.value = true
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/admin/products/${props.productId}/duplicate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Berhasil', data.message)
      duplicateModalOpen.value = false
      // Navigate to the duplicated product's edit page
      router.visit(`/admin/products/${data.productId}/edit`)
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    toast.error('Error', 'Terjadi kesalahan saat menduplikasi produk. Silakan coba lagi.')
  } finally {
    isLoading.value = false
  }
}

// Handle toggle status
const handleToggleStatus = async () => {
  isLoading.value = true
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/admin/products/${props.productId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Berhasil', data.message)
      statusModalOpen.value = false
      router.reload()
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    toast.error('Error', 'Terjadi kesalahan saat mengubah status produk. Silakan coba lagi.')
  } finally {
    isLoading.value = false
  }
}

// Get status action text
const statusActionText = props.status === 'active' ? 'menonaktifkan' : 'mengaktifkan'
const statusResultText = props.status === 'active' ? 'Nonaktif' : 'Aktif'
</script>

<template>
  <div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
    <h3 class="font-semibold text-slate-900 dark:text-white mb-4">Aksi Cepat</h3>
    <div class="space-y-2">
      <Link :href="`/admin/products/${productId}/edit`" class="block">
        <UButton
          icon="i-heroicons-pencil"
          color="primary"
          variant="outline"
          class="w-full justify-start"
        >
          Edit Produk
        </UButton>
      </Link>
      <UButton
        icon="i-heroicons-document-duplicate"
        color="primary"
        variant="outline"
        class="w-full justify-start"
        @click="duplicateModalOpen = true"
      >
        Duplikat Produk
      </UButton>
      <UButton
        v-if="status === 'active'"
        icon="i-heroicons-pause-circle"
        color="warning"
        variant="outline"
        class="w-full justify-start"
        @click="statusModalOpen = true"
      >
        Nonaktifkan
      </UButton>
      <UButton
        v-else
        icon="i-heroicons-check-circle"
        color="success"
        variant="outline"
        class="w-full justify-start"
        @click="statusModalOpen = true"
      >
        Aktifkan
      </UButton>
      <UButton
        icon="i-heroicons-trash"
        color="error"
        variant="outline"
        class="w-full justify-start"
        @click="emit('delete')"
      >
        Hapus Produk
      </UButton>
    </div>
  </div>

  <!-- Duplicate Confirmation Modal -->
  <UModal
    v-model:open="duplicateModalOpen"
    title="Duplikat Produk"
    description="Konfirmasi duplikasi produk"
  >
    <template #content>
      <div class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
            <UIcon name="i-heroicons-document-duplicate" class="w-6 h-6 text-blue-500" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Duplikat Produk</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Konfirmasi duplikasi produk
            </p>
          </div>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4">
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Anda akan menduplikasi produk:
          </p>
          <p class="font-semibold text-slate-900 dark:text-white">{{ productName }}</p>
        </div>
        <div class="text-sm text-slate-600 dark:text-slate-400 mb-6 space-y-2">
          <p class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500" />
            Produk baru akan dibuat dengan status <strong>Draft</strong>
          </p>
          <p class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500" />
            SKU baru akan digenerate secara otomatis
          </p>
          <p class="flex items-center gap-2">
            <UIcon name="i-heroicons-check-circle" class="w-4 h-4 text-green-500" />
            Varian produk akan ikut diduplikasi
          </p>
          <p class="flex items-center gap-2">
            <UIcon name="i-heroicons-exclamation-triangle" class="w-4 h-4 text-amber-500" />
            Gambar produk <strong>tidak</strong> akan diduplikasi
          </p>
        </div>
        <div class="flex justify-end gap-3">
          <UButton color="neutral" variant="outline" @click="duplicateModalOpen = false" :disabled="isLoading">
            Batal
          </UButton>
          <UButton color="primary" @click="handleDuplicate" :loading="isLoading">
            <UIcon name="i-heroicons-document-duplicate" class="w-4 h-4 mr-1" />
            Duplikat Sekarang
          </UButton>
        </div>
      </div>
    </template>
  </UModal>

  <!-- Toggle Status Confirmation Modal -->
  <UModal
    v-model:open="statusModalOpen"
    :title="status === 'active' ? 'Nonaktifkan Produk' : 'Aktifkan Produk'"
    description="Konfirmasi perubahan status produk"
  >
    <template #content>
      <div class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div
            class="w-12 h-12 rounded-full flex items-center justify-center"
            :class="status === 'active' ? 'bg-amber-100 dark:bg-amber-900/30' : 'bg-green-100 dark:bg-green-900/30'"
          >
            <UIcon
              :name="status === 'active' ? 'i-heroicons-pause-circle' : 'i-heroicons-check-circle'"
              class="w-6 h-6"
              :class="status === 'active' ? 'text-amber-500' : 'text-green-500'"
            />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              {{ status === 'active' ? 'Nonaktifkan' : 'Aktifkan' }} Produk
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Konfirmasi perubahan status produk
            </p>
          </div>
        </div>
        <div class="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 mb-4">
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">
            Anda akan {{ statusActionText }} produk:
          </p>
          <p class="font-semibold text-slate-900 dark:text-white">{{ productName }}</p>
        </div>
        <div class="text-sm text-slate-600 dark:text-slate-400 mb-6 space-y-2">
          <p v-if="status === 'active'" class="flex items-start gap-2">
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-blue-500 mt-0.5" />
            <span>Produk yang dinonaktifkan <strong>tidak akan tampil</strong> di etalase toko dan tidak bisa dibeli oleh pelanggan.</span>
          </p>
          <p v-else class="flex items-start gap-2">
            <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-blue-500 mt-0.5" />
            <span>Produk yang diaktifkan akan <strong>tampil di etalase toko</strong> dan bisa dibeli oleh pelanggan.</span>
          </p>
          <p class="flex items-center gap-2">
            <UIcon name="i-heroicons-arrow-path" class="w-4 h-4 text-slate-400" />
            Status baru: <UBadge :color="status === 'active' ? 'warning' : 'success'" variant="subtle" size="xs">{{ statusResultText }}</UBadge>
          </p>
        </div>
        <div class="flex justify-end gap-3">
          <UButton color="neutral" variant="outline" @click="statusModalOpen = false" :disabled="isLoading">
            Batal
          </UButton>
          <UButton
            :color="status === 'active' ? 'warning' : 'success'"
            @click="handleToggleStatus"
            :loading="isLoading"
          >
            <UIcon :name="status === 'active' ? 'i-heroicons-pause-circle' : 'i-heroicons-check-circle'" class="w-4 h-4 mr-1" />
            {{ status === 'active' ? 'Nonaktifkan' : 'Aktifkan' }} Sekarang
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
