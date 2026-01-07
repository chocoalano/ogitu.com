<script setup lang="ts">
interface Props {
  /** Current active step (1-based) */
  currentStep: number
  /** Total number of steps */
  totalSteps?: number
  /** Active color theme */
  activeColor?: string
}

withDefaults(defineProps<Props>(), {
  totalSteps: 2,
  activeColor: 'emerald',
})
</script>

<template>
  <div class="flex items-center justify-center gap-3 mb-8">
    <template v-for="stepNum in totalSteps" :key="stepNum">
      <!-- Step Circle -->
      <div
        :class="[
          'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
          stepNum <= currentStep
            ? `bg-${activeColor}-500 text-white shadow-lg shadow-${activeColor}-500/30`
            : stepNum === currentStep + 1
              ? 'bg-gray-200 text-gray-400 dark:bg-gray-700'
              : `bg-${activeColor}-100 text-${activeColor}-600 dark:bg-${activeColor}-900/30`
        ]"
      >
        {{ stepNum }}
      </div>

      <!-- Connector Line (not after last step) -->
      <div
        v-if="stepNum < totalSteps"
        class="w-12 h-1 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden"
      >
        <div
          :class="[
            'h-full rounded-full transition-all',
            `bg-${activeColor}-500`,
            stepNum < currentStep ? 'w-full' : 'w-0'
          ]"
        />
      </div>
    </template>
  </div>
</template>
