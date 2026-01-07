<script setup lang="ts">
import { computed } from 'vue'
import type { AdminNotification } from '~/types/admin_notification'
import { router } from '@inertiajs/vue3'

interface Props {
  notification: AdminNotification
}

const props = defineProps<Props>()
const emit = defineEmits<{
  read: [id: number]
  delete: [id: number]
}>()

// Format date
const formattedDate = computed(() => {
  const date = new Date(props.notification.createdAt)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Baru saja'
  if (minutes < 60) return `${minutes} menit yang lalu`
  if (hours < 24) return `${hours} jam yang lalu`
  if (days < 7) return `${days} hari yang lalu`
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
})

// Color mappings for notification types
const colorClasses = computed(() => {
  const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
    primary: {
      bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/40',
      icon: 'bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400',
      badge: 'blue',
    },
    success: {
      bg: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/40',
      icon: 'bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400',
      badge: 'green',
    },
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/40',
      icon: 'bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400',
      badge: 'red',
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-900/40',
      icon: 'bg-yellow-100 dark:bg-yellow-900/40 text-yellow-600 dark:text-yellow-400',
      badge: 'yellow',
    },
    info: {
      bg: 'bg-cyan-50 dark:bg-cyan-900/20 border-cyan-100 dark:border-cyan-900/40',
      icon: 'bg-cyan-100 dark:bg-cyan-900/40 text-cyan-600 dark:text-cyan-400',
      badge: 'cyan',
    },
    neutral: {
      bg: 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700',
      icon: 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400',
      badge: 'gray',
    },
  }
  return colorMap[props.notification.color] || colorMap.neutral
})

// Handle click on notification
const handleClick = () => {
  if (!props.notification.isRead) {
    emit('read', props.notification.id)
  }

  // Navigate based on notification type
  if (props.notification.data?.orderId) {
    router.visit(`/admin/orders/${props.notification.data.orderId}`)
  } else if (props.notification.data?.productId) {
    router.visit(`/admin/products/${props.notification.data.productId}`)
  } else if (props.notification.data?.reviewId) {
    router.visit(`/admin/reviews`)
  }
}

// Handle delete
const handleDelete = (e: Event) => {
  e.stopPropagation()
  emit('delete', props.notification.id)
}
</script>

<template>
  <div
    class="group relative rounded-xl border p-4 transition-all duration-200 cursor-pointer hover:shadow-md"
    :class="[
      colorClasses.bg,
      !notification.isRead && 'ring-2 ring-primary-500/20',
    ]"
    @click="handleClick"
  >
    <!-- Unread indicator -->
    <div
      v-if="!notification.isRead"
      class="absolute top-4 right-4 w-2.5 h-2.5 bg-primary-500 rounded-full animate-pulse"
    />

    <div class="flex gap-4">
      <!-- Icon -->
      <div class="shrink-0">
        <div
          class="w-12 h-12 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
          :class="colorClasses.icon"
        >
          <UIcon :name="notification.icon" class="w-6 h-6" />
        </div>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <div class="flex items-start justify-between gap-3 mb-1">
          <h3
            class="text-sm font-semibold text-gray-900 dark:text-white"
            :class="{ 'font-bold': !notification.isRead }"
          >
            {{ notification.title }}
          </h3>
          <UBadge
            :color="colorClasses.badge"
            variant="soft"
            size="xs"
            class="shrink-0"
          >
            {{ notification.type.replace('_', ' ') }}
          </UBadge>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">
          {{ notification.message }}
        </p>

        <div class="flex items-center justify-between">
          <span class="text-xs text-gray-500 dark:text-gray-400">
            {{ formattedDate }}
          </span>

          <!-- Actions -->
          <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <UButton
              v-if="!notification.isRead"
              color="primary"
              variant="ghost"
              size="xs"
              icon="i-heroicons-check"
              @click.stop="emit('read', notification.id)"
            >
              Tandai dibaca
            </UButton>
            <UButton
              color="red"
              variant="ghost"
              size="xs"
              icon="i-heroicons-trash"
              @click="handleDelete"
            >
              Hapus
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
