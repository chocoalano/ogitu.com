<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3'
import { ref, computed } from 'vue'
import AdminLayout from '~/layouts/admin.vue'
import type { NotificationsIndexPageProps, NotificationSettingData } from '~/types/settings'

defineOptions({ layout: AdminLayout })

const props = defineProps<NotificationsIndexPageProps>()

// Flatten settings for easy access
const allNotifications = computed((): NotificationSettingData[] => {
  return [
    ...props.settings.orders,
    ...props.settings.payments,
    ...props.settings.promotions,
    ...props.settings.system,
  ]
})

// Group labels
const groupLabels: Record<string, { label: string; icon: string; description: string }> = {
  orders: {
    label: 'Pesanan',
    icon: 'i-heroicons-shopping-bag',
    description: 'Notifikasi terkait status dan aktivitas pesanan',
  },
  payments: {
    label: 'Pembayaran',
    icon: 'i-heroicons-credit-card',
    description: 'Notifikasi terkait transaksi dan pembayaran',
  },
  promotions: {
    label: 'Promosi',
    icon: 'i-heroicons-megaphone',
    description: 'Notifikasi terkait promosi dan penawaran',
  },
  system: {
    label: 'Sistem',
    icon: 'i-heroicons-cog-6-tooth',
    description: 'Notifikasi terkait sistem dan keamanan',
  },
}

// Notification groups as array for iteration
const notificationGroups = computed(() => [
  { key: 'orders', notifications: props.settings.orders },
  { key: 'payments', notifications: props.settings.payments },
  { key: 'promotions', notifications: props.settings.promotions },
  { key: 'system', notifications: props.settings.system },
])

// Track changes
const hasChanges = ref(false)
const changedSettings = ref<Map<number, Partial<NotificationSettingData>>>(new Map())

// Toggle notification channel
const toggleChannel = (
  notification: NotificationSettingData,
  channel: 'emailEnabled' | 'pushEnabled' | 'whatsappEnabled'
) => {
  const currentValue = notification[channel]
  notification[channel] = !currentValue

  // Track changes
  if (!changedSettings.value.has(notification.id)) {
    changedSettings.value.set(notification.id, { id: notification.id })
  }
  const changes = changedSettings.value.get(notification.id)!
  changes[channel] = notification[channel]

  hasChanges.value = true
}

// Save all changes
const saving = ref(false)
const saveChanges = async () => {
  if (changedSettings.value.size === 0) return

  saving.value = true

  const updates = Array.from(changedSettings.value.values())

  useForm({ notifications: updates }).post('/admin/settings/notifications/bulk', {
    onSuccess: () => {
      hasChanges.value = false
      changedSettings.value.clear()
    },
    onFinish: () => {
      saving.value = false
    },
  })
}

// Reset changes
const resetChanges = () => {
  window.location.reload()
}

// Channel info
const channels = [
  {
    key: 'emailEnabled' as const,
    label: 'Email',
    icon: 'i-heroicons-envelope',
    available: true,
  },
  {
    key: 'pushEnabled' as const,
    label: 'Push',
    icon: 'i-heroicons-bell',
    available: true,
  },
  {
    key: 'whatsappEnabled' as const,
    label: 'WhatsApp',
    icon: 'i-heroicons-chat-bubble-left-right',
    available: false, // Can be enabled when WhatsApp integration is ready
  },
]

// Check if notification is enabled (at least one channel active)
const isNotificationEnabled = (notification: NotificationSettingData): boolean => {
  return Boolean(notification.emailEnabled) || Boolean(notification.pushEnabled) || Boolean(notification.whatsappEnabled)
}

// Get boolean value from notification channel
const getChannelValue = (notification: NotificationSettingData, key: 'emailEnabled' | 'pushEnabled' | 'whatsappEnabled'): boolean => {
  return Boolean(notification[key])
}

// Toggle all channels for a single notification
const toggleNotificationEnabled = (notification: NotificationSettingData) => {
  const enabled = isNotificationEnabled(notification)
  const newValue = !enabled

  // Toggle all available channels
  channels.forEach((channel) => {
    if (channel.available) {
      notification[channel.key] = newValue

      // Track changes
      if (!changedSettings.value.has(notification.id)) {
        changedSettings.value.set(notification.id, { id: notification.id })
      }
      const changes = changedSettings.value.get(notification.id)!
      changes[channel.key] = newValue
    }
  })

  hasChanges.value = true
}

// Check if all notifications in a group are enabled
const isGroupEnabled = (notifications: NotificationSettingData[]): boolean => {
  return notifications.every((n) => isNotificationEnabled(n))
}

// Check if some notifications in a group are enabled (for indeterminate state)
const isGroupPartiallyEnabled = (notifications: NotificationSettingData[]): boolean => {
  const enabledCount = notifications.filter((n) => isNotificationEnabled(n)).length
  return enabledCount > 0 && enabledCount < notifications.length
}

// Toggle all notifications in a group
const toggleGroupEnabled = (notifications: NotificationSettingData[]) => {
  const allEnabled = isGroupEnabled(notifications)
  const newValue = !allEnabled

  notifications.forEach((notification) => {
    channels.forEach((channel) => {
      if (channel.available) {
        notification[channel.key] = newValue

        // Track changes
        if (!changedSettings.value.has(notification.id)) {
          changedSettings.value.set(notification.id, { id: notification.id })
        }
        const changes = changedSettings.value.get(notification.id)!
        changes[channel.key] = newValue
      }
    })
  })

  hasChanges.value = true
}
</script>

<template>
  <Head title="Pengaturan Notifikasi" />

  <div class="space-y-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan Notifikasi</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Kelola preferensi notifikasi untuk berbagai event
        </p>
      </div>

      <!-- Save Button -->
      <div v-if="hasChanges" class="flex items-center gap-3">
        <span class="text-sm text-amber-600 dark:text-amber-400">
          Ada perubahan yang belum disimpan
        </span>
        <UButton
          color="neutral"
          variant="outline"
          label="Batal"
          @click="resetChanges"
        />
        <UButton
          color="primary"
          label="Simpan Perubahan"
          :loading="saving"
          @click="saveChanges"
        />
      </div>
    </div>

    <!-- Channel Legend -->
    <UCard>
      <div class="flex items-center justify-between">
        <div>
          <h3 class="font-medium text-gray-900 dark:text-white">Saluran Notifikasi</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Pilih saluran yang ingin digunakan untuk setiap jenis notifikasi
          </p>
        </div>
        <div class="flex items-center gap-4">
          <div
            v-for="channel in channels"
            :key="channel.key"
            class="flex items-center gap-2"
            :class="[!channel.available ? 'opacity-50' : '']"
          >
            <UIcon :name="channel.icon" class="w-5 h-5 text-gray-400" />
            <span class="text-sm text-gray-600 dark:text-gray-400">{{ channel.label }}</span>
            <UBadge v-if="!channel.available" size="xs" color="neutral" variant="soft">
              Segera
            </UBadge>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Notification Groups -->
    <div class="space-y-6">
      <div
        v-for="group in notificationGroups"
        :key="group.key"
      >
        <UCard>
          <!-- Group Header -->
          <template #header>
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                  <UIcon
                    :name="groupLabels[group.key]?.icon || 'i-heroicons-bell'"
                    class="w-5 h-5 text-primary-500"
                  />
                </div>
                <div>
                  <h2 class="font-semibold text-gray-900 dark:text-white">
                    {{ groupLabels[group.key]?.label || group.key }}
                  </h2>
                  <p class="text-sm text-gray-500 dark:text-gray-400">
                    {{ groupLabels[group.key]?.description }}
                  </p>
                </div>
              </div>
              <!-- Group Toggle -->
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500 dark:text-gray-400">
                  {{ isGroupEnabled(group.notifications) ? 'Aktif' : 'Nonaktif' }}
                </span>
                <USwitch
                  :model-value="isGroupEnabled(group.notifications)"
                  :indeterminate="isGroupPartiallyEnabled(group.notifications)"
                  @update:model-value="toggleGroupEnabled(group.notifications)"
                />
              </div>
            </div>
          </template>

          <!-- Notification List -->
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <div
              v-for="notification in group.notifications"
              :key="notification.id"
              class="py-4 first:pt-0 last:pb-0"
              :class="{ 'opacity-50': !isNotificationEnabled(notification) }"
            >
              <div class="flex items-center justify-between gap-4">
                <!-- Enable/Disable Toggle -->
                <div class="flex items-center gap-3">
                  <USwitch
                    :model-value="isNotificationEnabled(notification)"
                    size="lg"
                    @update:model-value="toggleNotificationEnabled(notification)"
                  />
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-900 dark:text-white">
                      {{ notification.eventName }}
                    </h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400">
                      {{ notification.description || 'Tidak ada deskripsi' }}
                    </p>
                  </div>
                </div>

                <!-- Channel Toggles -->
                <div class="flex items-center gap-6">
                  <div
                    v-for="channel in channels"
                    :key="channel.key"
                    class="flex flex-col items-center gap-1"
                  >
                    <USwitch
                      :model-value="getChannelValue(notification, channel.key)"
                      :disabled="!channel.available || !isNotificationEnabled(notification)"
                      @update:model-value="toggleChannel(notification, channel.key)"
                    />
                    <span class="text-xs text-gray-400">{{ channel.label }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </div>

    <!-- Empty State -->
    <UCard
      v-if="allNotifications.length === 0"
      class="text-center py-12"
    >
      <UIcon name="i-heroicons-bell-slash" class="w-12 h-12 text-gray-400 mx-auto mb-4" />
      <h3 class="font-medium text-gray-900 dark:text-white mb-2">
        Tidak ada pengaturan notifikasi
      </h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">
        Pengaturan notifikasi belum diinisialisasi
      </p>
      <UButton
        color="primary"
        label="Inisialisasi Notifikasi"
        @click="useForm({}).post('/admin/settings/notifications/initialize')"
      />
    </UCard>

    <!-- Floating Save Button (Mobile) -->
    <Teleport to="body">
      <Transition
        enter-active-class="transform transition duration-200 ease-out"
        enter-from-class="translate-y-full opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transform transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-full opacity-0"
      >
        <div
          v-if="hasChanges"
          class="fixed bottom-4 left-4 right-4 md:hidden bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 z-50"
        >
          <div class="flex items-center justify-between">
            <span class="text-sm text-amber-600 dark:text-amber-400">
              Perubahan belum disimpan
            </span>
            <div class="flex gap-2">
              <UButton
                size="sm"
                color="neutral"
                variant="outline"
                label="Batal"
                @click="resetChanges"
              />
              <UButton
                size="sm"
                color="primary"
                label="Simpan"
                :loading="saving"
                @click="saveChanges"
              />
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
