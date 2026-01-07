<script setup lang="ts">
type Variant = 'ghost' | 'soft' | 'outline'
type Size = 'xs' | 'sm' | 'md'
type SocialColor = 'pink' | 'blue' | 'gray' | 'red' | 'green'

interface SocialLink {
  name: string
  url: string
  icon: string
  color: SocialColor
}

const props = defineProps<{
  variant?: Variant
  size?: Size
}>()

const variant = props.variant ?? 'soft'
const size = props.size ?? 'sm'

const socialLinks: SocialLink[] = [
  {
    name: 'Instagram',
    url: 'https://instagram.com/ogitu',
    icon: 'i-lucide-instagram',
    color: 'pink'
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/ogitu',
    icon: 'i-lucide-facebook',
    color: 'blue'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/ogitu',
    icon: 'i-lucide-twitter',
    color: 'gray'
  },
  {
    name: 'YouTube',
    url: 'https://youtube.com/@ogitu',
    icon: 'i-lucide-youtube',
    color: 'red'
  },
]
</script>

<template>
  <div class="flex items-center gap-2">
    <UButton
      v-for="social in socialLinks"
      :key="social.name"
      :href="social.url"
      target="_blank"
      rel="noopener noreferrer"
      :variant="variant"
      :size="size"
      :color="social.color"
      :icon="social.icon"
      :aria-label="social.name"
      square
    />
  </div>
</template>
