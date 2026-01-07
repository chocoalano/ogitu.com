<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  initialEmail: { type: String, default: '' }
})

const emit = defineEmits<{ (e: 'subscribe', email: string): void }>()

const email = ref(props.initialEmail)
const onSubmit = () => {
  if (email.value.trim()) emit('subscribe', email.value)
}
</script>

<template>
  <div class="bg-linear-to-r from-primary-600 via-primary-500 to-secondary-500">
    <UContainer>
      <div class="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
        <div class="text-center md:text-left">
          <div class="flex items-center gap-2 justify-center md:justify-start mb-2">
            <UIcon name="i-heroicons-envelope" class="w-6 h-6 text-white" />
            <h3 class="text-xl font-bold text-white">Berlangganan Newsletter</h3>
          </div>
          <p class="text-sm text-white/90">Dapatkan info promo eksklusif, flash sale, dan produk terbaru langsung ke email Anda!</p>
        </div>
        <form @submit.prevent="onSubmit" class="flex items-center gap-2 w-full md:w-auto md:min-w-100">
          <UInput v-model="email" placeholder="Masukkan email Anda" size="lg" class="flex-1" :ui="{ rounded: 'rounded-lg' }" />
          <UButton type="submit" size="lg" class="font-semibold">Subscribe</UButton>
        </form>
      </div>
    </UContainer>
  </div>
</template>
