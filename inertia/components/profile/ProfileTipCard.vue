<script setup lang="ts">
defineProps<{
  title?: string
  description?: string
}>()
</script>

<template>
  <div class="bg-linear-to-br from-primary-500 to-purple-600 rounded-2xl p-6 text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="tip-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#tip-pattern)" />
      </svg>
    </div>

    <div class="relative">
      <div class="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-4">
        <UIcon name="i-heroicons-light-bulb" class="w-6 h-6" />
      </div>
      <h3 class="font-bold text-lg mb-2">{{ title ?? 'Tips Vaping' }}</h3>
      <p class="text-white/80 text-sm leading-relaxed">
        {{ description ?? 'Simpan e-liquid di tempat sejuk dan gelap untuk menjaga kualitas rasa. Hindari paparan sinar matahari langsung!' }}
      </p>
    </div>
  </div>
</template>
