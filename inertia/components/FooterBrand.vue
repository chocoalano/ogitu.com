<script setup lang="ts">
import SocialLinks from '~/components/SocialLinks.vue'
</script>

<template>
  <div>
    <div class="flex items-center gap-2 mb-4">
      <div class="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-lg">
        <UIcon name="i-heroicons-bolt" class="w-6 h-6 text-white" />
      </div>
      <div>
        <div class="text-lg font-bold text-gray-900 dark:text-white">ogitu.com</div>
        <div class="text-xs text-gray-600 dark:text-gray-400">Vape Marketplace Indonesia</div>
      </div>
    </div>
    <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
      Platform marketplace vape & rokok elektrik terpercaya dengan ratusan seller terbaik. Jaminan produk original, pengiriman cepat ke seluruh Indonesia.
    </p>
    <div class="space-y-2 mb-4">
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <UIcon name="i-heroicons-phone" class="w-4 h-4" />
        <span>+62 812-3456-7890</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <UIcon name="i-heroicons-envelope" class="w-4 h-4" />
        <span>support@ogitu.com</span>
      </div>
      <div class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
        <UIcon name="i-heroicons-clock" class="w-4 h-4" />
        <span>Senin - Minggu (08:00 - 22:00)</span>
      </div>
    </div>
    <div>
      <div class="text-xs font-semibold text-gray-900 dark:text-white mb-2">Ikuti Kami</div>
      <SocialLinks variant="soft" size="sm" />
    </div>
  </div>
</template>
