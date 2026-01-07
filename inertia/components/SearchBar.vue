<script setup lang="ts">
const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Cari produk, brand, atau kategori...' },
  size: { type: String as () => 'md' | 'lg', default: 'lg' },
  showSubmit: { type: Boolean, default: true },
  class: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

const onSubmit = () => emit('submit')
</script>

<template>
  <form @submit.prevent="onSubmit" :class="class">
    <UInput
      :model-value="modelValue"
      @update:model-value="emit('update:modelValue', $event)"
      :placeholder="placeholder"
      icon="i-heroicons-magnifying-glass"
      :size="size"
      class="w-full"
      :ui="{ icon: { trailing: { pointer: '' } }, rounded: 'rounded-lg' }"
    >
      <template v-if="showSubmit" #trailing>
        <UButton
          type="submit"
          size="sm"
          color="primary"
          label="Cari"
        />
      </template>
    </UInput>
  </form>
</template>
