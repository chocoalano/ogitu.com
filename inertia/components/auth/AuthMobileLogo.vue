<script setup lang="ts">
interface Props {
  /** Logo icon */
  logoIcon?: string
  /** Title text */
  title?: string
  /** Show on mobile only */
  mobileOnly?: boolean
}

withDefaults(defineProps<Props>(), {
  logoIcon: 'i-heroicons-building-storefront',
  title: 'Admin Center',
  mobileOnly: true,
})
</script>

<template>
  <div :class="[mobileOnly ? 'lg:hidden' : '', 'text-center mb-8']">
    <div class="w-16 h-16 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
      <UIcon :name="logoIcon" class="w-9 h-9 text-white" />
    </div>
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ title }}</h1>
    <slot />
  </div>
</template>
