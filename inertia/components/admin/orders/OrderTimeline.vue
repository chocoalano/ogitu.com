<script setup lang="ts">
import { useOrderFormatters } from '~/composables/use_order_formatters'

interface TimelineStep {
  label: string
  date: string | null
  completed: boolean
  icon: string
  color: 'primary' | 'error'
}

defineProps<{
  steps: TimelineStep[]
}>()

const { formatShortDate } = useOrderFormatters()
</script>

<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
        Status Pesanan
      </h3>
    </template>

    <div class="space-y-4">
      <div
        v-for="(step, index) in steps"
        :key="step.label"
        class="flex gap-3"
      >
        <div class="relative flex flex-col items-center">
          <div
            :class="[
              'w-8 h-8 rounded-full flex items-center justify-center',
              step.completed
                ? step.color === 'error'
                  ? 'bg-red-100 dark:bg-red-900/30'
                  : 'bg-primary-100 dark:bg-primary-900/30'
                : 'bg-gray-100 dark:bg-gray-800',
            ]"
          >
            <UIcon
              :name="step.icon"
              :class="[
                'w-4 h-4',
                step.completed
                  ? step.color === 'error'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-primary-600 dark:text-primary-400'
                  : 'text-gray-400 dark:text-gray-600',
              ]"
            />
          </div>
          <div
            v-if="index < steps.length - 1"
            :class="[
              'w-0.5 h-8',
              step.completed ? 'bg-primary-200 dark:bg-primary-800' : 'bg-gray-200 dark:bg-gray-700',
            ]"
          />
        </div>
        <div class="flex-1 pb-4">
          <p
            :class="[
              'font-medium',
              step.completed
                ? 'text-gray-900 dark:text-white'
                : 'text-gray-400 dark:text-gray-600',
            ]"
          >
            {{ step.label }}
          </p>
          <p v-if="step.date" class="text-xs text-gray-500 dark:text-gray-400">
            {{ formatShortDate(step.date) }}
          </p>
        </div>
      </div>
    </div>
  </UCard>
</template>
