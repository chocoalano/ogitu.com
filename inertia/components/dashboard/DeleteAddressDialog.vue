<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  addressId: number | null
}>()

const emit = defineEmits<{
  confirm: []
}>()

const isOpen = defineModel<boolean>({ default: false })

const isLoading = ref(false)

/**
 * Get XSRF token from cookie
 */
const getXsrfToken = (): string | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/)
  return match ? decodeURIComponent(match[1]) : null
}

const handleDelete = async () => {
  if (!props.addressId) return

  isLoading.value = true
  try {
    const xsrfToken = getXsrfToken()
    const response = await fetch(`/api/dashboard/address/${props.addressId}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        ...(xsrfToken && { 'X-XSRF-TOKEN': xsrfToken }),
      },
    })
    const data = await response.json()
    if (data.success) {
      isOpen.value = false
      window.location.reload()
    } else {
      alert(data.message || 'Gagal menghapus alamat')
    }
  } catch (error) {
    console.error('Failed to delete address:', error)
    alert('Terjadi kesalahan saat menghapus alamat')
  } finally {
    isLoading.value = false
  }
}

const close = () => {
  isOpen.value = false
}
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{ width: 'max-w-sm', overlay: 'z-[100]', content: 'z-[100]' }"
    title="Hapus Alamat"
    description="Konfirmasi penghapusan alamat"
  >
    <template #content>
      <div class="p-6 text-center max-h-[85vh] overflow-y-auto">
        <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <UIcon name="i-heroicons-trash" class="w-7 h-7 text-red-600 dark:text-red-400" />
        </div>

        <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">Hapus Alamat?</h3>
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
          Alamat yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus alamat ini?
        </p>

        <div class="flex items-center gap-3">
          <UButton variant="outline" color="neutral" block @click="close" :disabled="isLoading">
            Batal
          </UButton>
          <UButton color="error" block :loading="isLoading" @click="handleDelete">
            Ya, Hapus
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
