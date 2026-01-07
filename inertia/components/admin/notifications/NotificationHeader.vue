<script setup lang="ts">
interface Props {
  isConnected: boolean
  unreadCount: number
  hasReadNotifications: boolean
}

interface Emits {
  (e: 'markAllAsRead'): void
  (e: 'clearRead'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    <div class="flex items-center gap-4">
      <div
        class="p-3 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl shadow-lg shadow-violet-500/25"
      >
        <UIcon name="i-heroicons-bell" class="w-7 h-7 text-white" />
      </div>
      <div>
        <div class="flex items-center gap-3">
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Pusat Notifikasi</h1>
          <UBadge v-if="unreadCount > 0" color="error" variant="solid" size="sm">
            {{ unreadCount }} baru
          </UBadge>
        </div>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Kelola notifikasi pesanan, pembayaran, dan pembaruan sistem
        </p>
      </div>
    </div>

    <div class="flex items-center gap-2">
      <!-- Realtime Connection Status -->
      <UBadge
        v-if="isConnected"
        color="success"
        variant="subtle"
        size="sm"
        class="flex items-center gap-1.5"
      >
        <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
        Live
      </UBadge>

      <!-- Mark All as Read -->
      <UButton
        v-if="unreadCount > 0"
        color="primary"
        variant="soft"
        size="sm"
        icon="i-heroicons-check-circle"
        @click="$emit('markAllAsRead')"
      >
        Tandai Semua Dibaca
      </UButton>

      <!-- Clear Read -->
      <UButton
        v-if="hasReadNotifications"
        color="error"
        variant="ghost"
        size="sm"
        icon="i-heroicons-trash"
        @click="$emit('clearRead')"
      >
        Hapus Dibaca
      </UButton>
    </div>
  </div>
</template>
