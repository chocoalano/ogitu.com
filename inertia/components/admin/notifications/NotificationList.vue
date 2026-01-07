<script setup lang="ts">
import type { AdminNotification } from '~/types/admin_notification'
import NotificationItem from './NotificationItem.vue'

interface Props {
  notifications: AdminNotification[]
  isLoading: boolean
  hasFilters: boolean
}

interface Emits {
  (e: 'read', id: number): void
  (e: 'delete', id: number): void
  (e: 'resetFilters'): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div
    class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"
  >
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center py-16">
      <div class="flex flex-col items-center gap-3">
        <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-violet-500 animate-spin" />
        <p class="text-sm text-slate-500 dark:text-slate-400">Memuat notifikasi...</p>
      </div>
    </div>

    <!-- Notifications -->
    <div
      v-else-if="notifications.length > 0"
      class="divide-y divide-slate-100 dark:divide-slate-700"
    >
      <NotificationItem
        v-for="notification in notifications"
        :key="notification.id"
        :notification="notification"
        @read="$emit('read', $event)"
        @delete="$emit('delete', $event)"
      />
    </div>

    <!-- Empty State -->
    <div v-else class="py-16 text-center">
      <div
        class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 mb-4"
      >
        <UIcon name="i-heroicons-bell-slash" class="w-8 h-8 text-slate-400 dark:text-slate-500" />
      </div>
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">
        Tidak Ada Notifikasi
      </h3>
      <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
        {{
          hasFilters
            ? 'Tidak ada notifikasi yang sesuai dengan filter Anda.'
            : 'Anda belum memiliki notifikasi. Notifikasi akan muncul saat ada pesanan baru, pembayaran, atau pembaruan sistem.'
        }}
      </p>
      <UButton
        v-if="hasFilters"
        color="primary"
        variant="soft"
        size="sm"
        class="mt-4"
        @click="$emit('resetFilters')"
      >
        Reset Filter
      </UButton>
    </div>

    <!-- Pagination Slot -->
    <slot name="pagination" />
  </div>
</template>
