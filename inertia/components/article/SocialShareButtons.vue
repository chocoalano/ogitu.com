<script setup lang="ts">
import type { SocialShareUrls } from '~/composables/use_article_actions'

defineProps<{
  urls: SocialShareUrls
}>()
</script>

<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-gray-500 mr-2">Bagikan ke:</span>

    <UTooltip text="Facebook">
      <a
        :href="urls.facebook"
        target="_blank"
        rel="noopener noreferrer"
        class="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center text-white transition-colors"
      >
        <UIcon name="i-lucide-facebook" class="w-4 h-4" />
      </a>
    </UTooltip>

    <UTooltip text="Twitter">
      <a
        :href="urls.twitter"
        target="_blank"
        rel="noopener noreferrer"
        class="w-9 h-9 rounded-full bg-sky-500 hover:bg-sky-600 flex items-center justify-center text-white transition-colors"
      >
        <UIcon name="i-lucide-twitter" class="w-4 h-4" />
      </a>
    </UTooltip>

    <UTooltip text="WhatsApp">
      <a
        :href="urls.whatsapp"
        target="_blank"
        rel="noopener noreferrer"
        class="w-9 h-9 rounded-full bg-green-500 hover:bg-green-600 flex items-center justify-center text-white transition-colors"
      >
        <UIcon name="i-lucide-message-circle" class="w-4 h-4" />
      </a>
    </UTooltip>

    <UTooltip text="Telegram">
      <a
        :href="urls.telegram"
        target="_blank"
        rel="noopener noreferrer"
        class="w-9 h-9 rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center text-white transition-colors"
      >
        <UIcon name="i-lucide-send" class="w-4 h-4" />
      </a>
    </UTooltip>
  </div>
</template>
