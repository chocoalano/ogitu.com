<script setup lang="ts">
import type { Rank } from './types'
import { getRankColor } from './types'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  modelValue: boolean
  allRanks: Rank[]
  currentRank: Rank | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const { formatPrice } = useOrderFormatters()

const close = () => {
  emit('update:modelValue', false)
}

const isCurrentRank = (rank: Rank) => {
  return props.currentRank?.id === rank.id
}

const isAchieved = (rank: Rank) => {
  if (!props.currentRank) return false
  const currentIdx = props.allRanks.findIndex(r => r.id === props.currentRank?.id)
  const rankIdx = props.allRanks.findIndex(r => r.id === rank.id)
  return rankIdx <= currentIdx
}
</script>

<template>
  <UModal
    v-model:open="props.modelValue"
    :ui="{ width: 'max-w-2xl', overlay: 'z-[100]', content: 'z-[100]' }"
    title="Sistem Ranking Member"
    description="Semakin sering belanja, semakin banyak keuntungan!"
  >
    <template #content>
      <div class="p-6 max-h-[85vh] overflow-y-auto">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center">
              <UIcon name="i-heroicons-trophy" class="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-gray-900 dark:text-white">Sistem Ranking Member</h2>
              <p class="text-sm text-gray-500 dark:text-gray-400">Semakin sering belanja, semakin banyak keuntungan!</p>
            </div>
          </div>
          <UButton variant="ghost" color="gray" size="sm" square @click="close">
            <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
          </UButton>
        </div>

        <div class="space-y-4 max-h-[60vh] overflow-y-auto">
          <div
            v-for="rank in allRanks"
            :key="rank.id"
            :class="[
              'relative p-4 rounded-2xl border-2 transition-all',
              isCurrentRank(rank)
                ? `${getRankColor(rank.slug).border} ${getRankColor(rank.slug).bg}`
                : isAchieved(rank)
                  ? 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-75'
            ]"
          >
            <!-- Current Badge -->
            <div
              v-if="isCurrentRank(rank)"
              class="absolute -top-2.5 left-4 px-2.5 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full"
            >
              Rank Anda
            </div>

            <div class="flex items-start gap-4">
              <!-- Rank Icon -->
              <div
                :class="['w-14 h-14 rounded-xl bg-linear-to-br flex items-center justify-center shrink-0', getRankColor(rank.slug).gradient]"
              >
                <UIcon :name="getRankColor(rank.slug).icon" class="w-7 h-7 text-white drop-shadow-lg" />
              </div>

              <!-- Rank Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <h3 class="font-bold text-gray-900 dark:text-white">{{ rank.name }}</h3>
                  <UIcon
                    v-if="isAchieved(rank)"
                    name="i-heroicons-check-circle-solid"
                    class="w-5 h-5 text-emerald-500"
                  />
                </div>

                <!-- Requirements -->
                <div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-shopping-bag" class="w-4 h-4" />
                    {{ rank.minOrders }} order
                  </span>
                  <span class="flex items-center gap-1">
                    <UIcon name="i-heroicons-banknotes" class="w-4 h-4" />
                    {{ formatPrice(rank.minSpent) }}
                  </span>
                </div>

                <!-- Benefits Preview -->
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    v-if="rank.cashbackRate > 0"
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                  >
                    <UIcon name="i-heroicons-arrow-trending-up" class="w-3 h-3" />
                    Cashback {{ rank.cashbackRate }}%
                  </span>
                  <span
                    v-if="rank.affiliateBonusRate > 0"
                    class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                  >
                    <UIcon name="i-heroicons-gift" class="w-3 h-3" />
                    +{{ rank.affiliateBonusRate }}% Affiliate
                  </span>
                </div>

                <!-- Full Benefits -->
                <div v-if="rank.benefits && rank.benefits.length > 0" class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <li
                      v-for="(benefit, idx) in rank.benefits"
                      :key="idx"
                      class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <UIcon name="i-heroicons-check" class="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      {{ benefit }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
          <UButton color="primary" block @click="close">
            Mengerti
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
