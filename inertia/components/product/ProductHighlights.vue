<script setup lang="ts">
interface Highlight {
  icon: string
  iconColor: string
  title: string
  subtitle: string
}

const highlights: Highlight[] = [
  {
    icon: 'i-lucide-shield-check',
    iconColor: 'text-green-500',
    title: '100% Original',
    subtitle: 'Produk Asli',
  },
  {
    icon: 'i-lucide-truck',
    iconColor: 'text-blue-500',
    title: 'Gratis Ongkir',
    subtitle: 'Min. belanja',
  },
  {
    icon: 'i-lucide-refresh-cw',
    iconColor: 'text-orange-500',
    title: '7 Hari Retur',
    subtitle: 'Jaminan',
  },
  {
    icon: 'i-lucide-credit-card',
    iconColor: 'text-purple-500',
    title: 'Pembayaran Aman',
    subtitle: 'Multi Opsi',
  },
]
</script>

<template>
  <div
    class="grid grid-cols-2 gap-4 p-4 bg-linear-to-br from-primary-50 to-secondary-50 dark:from-primary-950/50 dark:to-secondary-950/50 rounded-xl"
  >
    <div v-for="highlight in highlights" :key="highlight.title" class="flex items-center gap-3">
      <div
        class="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-sm"
      >
        <UIcon :name="highlight.icon" class="w-5 h-5" :class="highlight.iconColor" />
      </div>
      <div>
        <p class="text-sm font-medium text-gray-900 dark:text-white">{{ highlight.title }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ highlight.subtitle }}</p>
      </div>
    </div>
  </div>
</template>
