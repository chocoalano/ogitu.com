<script setup lang="ts">
export interface SidebarFeature {
  icon: string
  title: string
  description: string
}

interface Props {
  /** Main logo icon */
  logoIcon?: string
  /** Main title */
  title?: string
  /** Subtitle text */
  subtitle?: string
  /** List of features to display */
  features?: SidebarFeature[]
  /** Gradient colors - from color */
  gradientFrom?: string
  /** Gradient colors - via color */
  gradientVia?: string
  /** Gradient colors - to color */
  gradientTo?: string
}

withDefaults(defineProps<Props>(), {
  logoIcon: 'i-heroicons-building-storefront',
  title: 'Admin Center',
  subtitle: 'Kelola toko dan produk Anda',
  features: () => [],
  gradientFrom: 'emerald-600',
  gradientVia: 'teal-600',
  gradientTo: 'cyan-500',
})
</script>

<template>
  <div
    :class="[
      'hidden lg:flex lg:w-1/2 relative overflow-hidden',
      `bg-linear-to-br from-${gradientFrom} via-${gradientVia} to-${gradientTo}`
    ]"
  >
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
      <div class="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-2xl" />
    </div>

    <!-- Content -->
    <div class="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
      <!-- Logo -->
      <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-8 shadow-2xl">
        <UIcon :name="logoIcon" class="w-14 h-14 text-white" />
      </div>

      <h1 class="text-4xl font-bold mb-4 text-center">{{ title }}</h1>
      <p class="text-xl text-white/80 mb-12 text-center">{{ subtitle }}</p>

      <!-- Features -->
      <div v-if="features.length > 0" class="space-y-6 w-full max-w-sm">
        <div
          v-for="(feature, index) in features"
          :key="index"
          class="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4"
        >
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
            <UIcon :name="feature.icon" class="w-6 h-6" />
          </div>
          <div>
            <div class="font-semibold">{{ feature.title }}</div>
            <div class="text-sm text-white/70">{{ feature.description }}</div>
          </div>
        </div>
      </div>

      <!-- Custom Slot for additional content -->
      <slot />
    </div>
  </div>
</template>
