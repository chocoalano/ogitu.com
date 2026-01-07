<script setup lang="ts">
import type { OrderTimeline } from '~/types/order'
import { useOrderFormatters } from '~/composables/use_orders'

/**
 * OrderTimeline - Visual timeline showing order progress
 */
defineProps<{
  timeline: OrderTimeline[]
}>()

const { formatDate } = useOrderFormatters()
</script>

<template>
  <div class="relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden">
    <!-- Header -->
    <div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-primary-500" />
        </div>
        <h2 class="font-semibold text-gray-900 dark:text-white">Status Pesanan</h2>
      </div>
    </div>

    <!-- Timeline -->
    <div class="p-5">
      <div class="relative">
        <!-- Line -->
        <div class="absolute left-3.75 top-3 bottom-3 w-0.5 bg-linear-to-b from-primary-500 via-primary-500/50 to-gray-200 dark:to-gray-700" />

        <!-- Items -->
        <div class="space-y-6">
          <div
            v-for="(item, index) in timeline"
            :key="index"
            class="relative flex gap-4 pl-10"
          >
            <!-- Dot -->
            <div
              :class="[
                'absolute left-0 w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all duration-300',
                item.completed
                  ? 'bg-linear-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/30'
                  : 'bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600',
              ]"
            >
              <UIcon
                v-if="item.completed"
                name="i-heroicons-check"
                class="w-4 h-4 text-white"
              />
              <div
                v-else
                class="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"
              />
            </div>

            <!-- Content -->
            <div class="flex-1 pb-2">
              <p
                :class="[
                  'font-medium transition-colors duration-200',
                  item.completed
                    ? 'text-gray-900 dark:text-white'
                    : 'text-gray-400 dark:text-gray-500',
                ]"
              >
                {{ item.label }}
              </p>
              <p
                v-if="item.date"
                class="text-sm text-gray-500 dark:text-gray-400 mt-0.5"
              >
                {{ formatDate(item.date) }}
              </p>
            </div>

            <!-- Status indicator for current -->
            <div
              v-if="item.completed && index === timeline.filter(t => t.completed).length - 1"
              class="flex items-center"
            >
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
                <span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
