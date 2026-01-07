<script setup lang="ts">
interface AppStore {
  name: string
  url: string
  icon: string
  platform: 'Google Play' | 'App Store'
}

const appStores: AppStore[] = [
  {
    name: 'Google Play',
    url: 'https://play.google.com',
    icon: 'i-heroicons-device-phone-mobile',
    platform: 'Google Play'
  },
  {
    name: 'App Store',
    url: 'https://apps.apple.com',
    icon: 'i-heroicons-device-phone-mobile',
    platform: 'App Store'
  }
]
</script>

<template>
  <div>
    <h4 class="text-sm font-bold text-gray-900 dark:text-white mb-4">Download Aplikasi</h4>
    <div class="space-y-3 mb-4">
      <a
        v-for="store in appStores"
        :key="store.name"
        :href="store.url"
        target="_blank"
        rel="noopener noreferrer"
        class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-colors group"
      >
        <UIcon :name="store.icon" class="w-6 h-6 text-gray-900 dark:text-white group-hover:text-primary-600" />
        <div>
          <div class="text-[10px] text-gray-600 dark:text-gray-400">Download on</div>
          <div class="text-xs font-semibold text-gray-900 dark:text-white">{{ store.platform }}</div>
        </div>
      </a>
    </div>

    <!-- QR Code -->
    <div class="p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-center">
      <div class="w-20 h-20 mx-auto bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center mb-2">
        <UIcon name="i-heroicons-qr-code" class="w-12 h-12 text-gray-400" />
      </div>
      <p class="text-[10px] text-gray-600 dark:text-gray-400">Scan untuk download</p>
    </div>
  </div>
</template>
