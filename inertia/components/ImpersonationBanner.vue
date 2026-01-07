<script setup lang="ts">
import { computed } from 'vue'
import { router, usePage } from '@inertiajs/vue3'

const page = usePage()

const impersonating = computed(() => {
  const data = (page.props as any).impersonating
  return {
    isImpersonating: data?.isImpersonating || false,
    customerName: data?.customerName || null,
  }
})

const stopImpersonating = () => {
  router.post('/admin/impersonate/stop', {}, {
    onSuccess: () => {
      // Will redirect to admin panel
    },
  })
}
</script>

<template>
  <div
    v-if="impersonating.isImpersonating"
    class="bg-amber-500 text-amber-950 px-4 py-2 text-center text-sm font-medium"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-center gap-3">
      <UIcon name="i-heroicons-eye" class="w-4 h-4" />
      <span>
        Anda sedang login sebagai <strong>{{ impersonating.customerName }}</strong>
      </span>
      <UButton
        size="xs"
        color="neutral"
        variant="solid"
        @click="stopImpersonating"
      >
        Kembali ke Admin
      </UButton>
    </div>
  </div>
</template>
