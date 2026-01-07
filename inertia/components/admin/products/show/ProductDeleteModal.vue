<script setup lang="ts">
import { ref } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'

const props = defineProps<{
  productId: number
  productName: string
}>()

const open = defineModel<boolean>('open', { default: false })

const toast = useToast()
const isDeleting = ref(false)

// Get XSRF token from cookie
const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

// Handle delete
const handleDelete = async () => {
  isDeleting.value = true
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/admin/products/${props.productId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
    })

    const data = await response.json()

    if (data.success) {
      toast.success('Berhasil', data.message)
      router.visit('/admin/products')
    } else {
      toast.error('Gagal', data.message)
    }
  } catch (error) {
    toast.error('Error', 'Terjadi kesalahan saat menghapus produk')
  } finally {
    isDeleting.value = false
    open.value = false
  }
}
</script>

<template>
  <UModal
    v-model:open="open"
    title="Hapus Produk"
    description="Apakah Anda yakin ingin menghapus produk ini?"
  >
    <template #content>
      <div class="p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <UIcon name="i-heroicons-trash" class="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Hapus Produk</h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Apakah Anda yakin ingin menghapus produk ini?
            </p>
          </div>
        </div>
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
          <strong>{{ productName }}</strong> akan dihapus secara permanen. Tindakan ini tidak dapat dibatalkan.
        </p>
        <div class="flex justify-end gap-3">
          <UButton color="neutral" variant="outline" @click="open = false" :disabled="isDeleting">
            Batal
          </UButton>
          <UButton color="error" @click="handleDelete" :loading="isDeleting">
            Hapus
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
