<script setup lang="ts">
import type { AdminNotification } from '~/types/admin_notification'
import {
  getNotificationIcon,
  getNotificationColor,
  getNotificationBgClass,
  getNotificationTextClass,
  getNotificationTypeLabel,
  formatRelativeTime,
} from './types'

interface Props {
  notification: AdminNotification
}

interface Emits {
  (e: 'read', id: number): void
  (e: 'delete', id: number): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<template>
  <div
    class="group relative p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
    :class="{ 'bg-violet-50/50 dark:bg-violet-900/10': !notification.isRead }"
  >
    <!-- Unread Indicator -->
    <div
      v-if="!notification.isRead"
      class="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-violet-500 to-purple-600"
    />

    <div class="flex items-start gap-4 pl-2">
      <!-- Icon -->
      <div class="shrink-0 p-2.5 rounded-xl" :class="getNotificationBgClass(notification.type)">
        <UIcon
          :name="notification.icon || getNotificationIcon(notification.type)"
          class="w-5 h-5"
          :class="getNotificationTextClass(notification.type)"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 mb-1">
              <h3
                class="font-semibold truncate"
                :class="
                  notification.isRead
                    ? 'text-slate-700 dark:text-slate-300'
                    : 'text-slate-900 dark:text-white'
                "
              >
                {{ notification.title }}
              </h3>
              <UBadge :color="getNotificationColor(notification.type)" variant="subtle" size="xs">
                {{ getNotificationTypeLabel(notification.type) }}
              </UBadge>
            </div>
            <p
              class="text-sm line-clamp-2"
              :class="
                notification.isRead
                  ? 'text-slate-500 dark:text-slate-400'
                  : 'text-slate-600 dark:text-slate-300'
              "
            >
              {{ notification.message }}
            </p>
            <p class="text-xs text-slate-400 dark:text-slate-500 mt-2 flex items-center gap-1">
              <UIcon name="i-heroicons-clock" class="w-3.5 h-3.5" />
              {{ formatRelativeTime(notification.createdAt) }}
            </p>
          </div>

          <!-- Actions -->
          <div
            class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <UButton
              v-if="!notification.isRead"
              color="primary"
              variant="ghost"
              size="xs"
              icon="i-heroicons-check"
              square
              @click="$emit('read', notification.id)"
            />
            <UButton
              color="error"
              variant="ghost"
              size="xs"
              icon="i-heroicons-trash"
              square
              @click="$emit('delete', notification.id)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
