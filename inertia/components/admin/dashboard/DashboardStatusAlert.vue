<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import type { AdminData } from '../types'

withDefaults(defineProps<{
  admin?: AdminData
}>(), {
  admin: () => ({ id: 0, name: '', email: '', avatar: null, role: 'admin' as const }),
})
</script>

<template>
  <!-- Pending Status Alert -->
  <div
    v-if="admin.status === 'pending'"
    class="p-4 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl"
  >
    <div class="flex items-start gap-4">
      <div
        class="w-12 h-12 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center shrink-0"
      >
        <UIcon name="i-heroicons-clock" class="w-6 h-6 text-amber-500" />
      </div>
      <div>
        <h3 class="font-semibold text-amber-700 dark:text-amber-300">
          Akun Admin Dalam Peninjauan
        </h3>
        <p class="text-sm text-amber-600 dark:text-amber-400 mt-1">
          Akun admin Anda sedang dalam proses verifikasi oleh tim OGITU. Anda akan mendapat
          notifikasi via email setelah akun disetujui. Proses verifikasi biasanya memakan waktu 1-3
          hari kerja.
        </p>
      </div>
    </div>
  </div>

  <!-- Suspended Alert -->
  <div
    v-else-if="admin.status === 'suspended'"
    class="p-4 bg-linear-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-2xl"
  >
    <div class="flex items-start gap-4">
      <div
        class="w-12 h-12 bg-linear-to-br from-red-500/20 to-rose-500/20 rounded-xl flex items-center justify-center shrink-0"
      >
        <UIcon name="i-heroicons-exclamation-triangle" class="w-6 h-6 text-red-500" />
      </div>
      <div>
        <h3 class="font-semibold text-red-700 dark:text-red-300">Akun Admin Ditangguhkan</h3>
        <p class="text-sm text-red-600 dark:text-red-400 mt-1">
          Akun admin Anda telah ditangguhkan. Silakan hubungi tim support OGITU untuk informasi
          lebih lanjut dan proses pemulihan akun.
        </p>
        <Link
          href="/admin/help/contact"
          class="inline-flex items-center gap-1 mt-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Hubungi Support
          <UIcon name="i-heroicons-arrow-right" class="w-4 h-4" />
        </Link>
      </div>
    </div>
  </div>
</template>
