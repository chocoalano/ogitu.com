<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  modelValue: number | null
  placeholder?: string
  min?: number
  max?: number
  color?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '0',
  min: 0,
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

// Display value (formatted string)
const displayValue = ref('')

// Format number to IDR currency display (without Rp prefix)
const formatCurrency = (value: number | null): string => {
  if (value === null || value === undefined || value === 0) return ''
  return new Intl.NumberFormat('id-ID').format(value)
}

// Parse formatted string back to number
const parseCurrency = (value: string): number | null => {
  if (!value || value.trim() === '') return null
  // Remove all non-digit characters
  const numericValue = value.replace(/[^\d]/g, '')
  const parsed = parseInt(numericValue, 10)
  return isNaN(parsed) ? null : parsed
}

// Initialize display value
displayValue.value = formatCurrency(props.modelValue)

// Watch for external changes to modelValue
watch(
  () => props.modelValue,
  (newValue) => {
    const currentParsed = parseCurrency(displayValue.value)
    if (currentParsed !== newValue) {
      displayValue.value = formatCurrency(newValue)
    }
  }
)

// Handle input changes
const onInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = input.value

  // Only allow digits and formatting characters
  const numericOnly = value.replace(/[^\d]/g, '')

  if (numericOnly === '') {
    displayValue.value = ''
    emit('update:modelValue', null)
    return
  }

  let numericValue = parseInt(numericOnly, 10)

  // Apply min/max constraints
  if (props.min !== undefined && numericValue < props.min) {
    numericValue = props.min
  }
  if (props.max !== undefined && numericValue > props.max) {
    numericValue = props.max
  }

  // Update display with formatted value
  displayValue.value = formatCurrency(numericValue)
  emit('update:modelValue', numericValue)
}

// Handle blur - ensure proper formatting
const onBlur = () => {
  const parsed = parseCurrency(displayValue.value)
  displayValue.value = formatCurrency(parsed)
}

// Handle focus - select all for easy editing
const onFocus = (event: Event) => {
  const input = event.target as HTMLInputElement
  setTimeout(() => input.select(), 0)
}
</script>

<template>
  <div class="relative">
    <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 text-sm pointer-events-none">
      Rp
    </span>
    <UInput
      :model-value="displayValue"
      @input="onInput"
      @blur="onBlur"
      @focus="onFocus"
      :placeholder="placeholder"
      :color="color"
      :disabled="disabled"
      class="w-full pl-10"
      inputmode="numeric"
    />
  </div>
</template>
