<script setup lang="ts">
const props = defineProps<{
  modelValue: number
  max: number
  min?: number
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const minQty = props.min ?? 1

const decrease = () => {
  if (props.modelValue > minQty) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const increase = () => {
  if (props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  let value = parseInt(target.value, 10)

  if (isNaN(value) || value < minQty) {
    value = minQty
  } else if (value > props.max) {
    value = props.max
  }

  emit('update:modelValue', value)
}
</script>

<template>
  <div class="space-y-2">
    <label class="text-sm font-medium text-gray-700 dark:text-gray-300">Jumlah</label>
    <div class="flex items-center gap-4">
      <div
        class="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
      >
        <button
          class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="modelValue <= minQty"
          @click="decrease"
        >
          <UIcon name="i-lucide-minus" class="w-4 h-4" />
        </button>
        <input
          :value="modelValue"
          type="number"
          :min="minQty"
          :max="max"
          class="w-16 h-10 text-center border-x border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none"
          @input="handleInput"
        />
        <button
          class="w-10 h-10 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="modelValue >= max"
          @click="increase"
        >
          <UIcon name="i-lucide-plus" class="w-4 h-4" />
        </button>
      </div>
      <span class="text-sm text-gray-500 dark:text-gray-400">
        Stok: <span :class="max <= 5 ? 'text-red-500 font-semibold' : ''">{{ max }}</span>
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Number input hide arrows */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type='number'] {
  appearance: textfield;
  -moz-appearance: textfield;
}
</style>
