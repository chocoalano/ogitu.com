<script setup lang="ts">
import type { Affiliate, TreeData, NetworkStats } from './types'

interface Props {
  open: boolean
  affiliate: Affiliate | null
  networkTree: TreeData | null
  networkStats: NetworkStats | null
  isLoading: boolean
}

interface Emits {
  (e: 'update:open', value: boolean): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

// Format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

// Handle modal close with proper focus management
const handleOpenChange = (value: boolean) => {
  if (!value) {
    setTimeout(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur()
      }
    }, 0)
  }
  emit('update:open', value)
}
</script>

<template>
  <UModal
    :open="open"
    :ui="{ width: 'max-w-4xl' }"
    title="Network Tree"
    description="Visualisasi struktur tree network MLM"
    @update:open="handleOpenChange"
  >
    <template #content>
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
              Network Tree: {{ affiliate?.customerName }}
            </h3>
            <p class="text-sm text-slate-500 dark:text-slate-400">
              Kode: {{ affiliate?.referralCode }}
            </p>
          </div>
          <UButton
            icon="i-heroicons-x-mark"
            color="neutral"
            variant="ghost"
            @click="handleOpenChange(false)"
          />
        </div>

        <div v-if="isLoading" class="flex justify-center py-12">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 text-violet-500 animate-spin" />
        </div>

        <div v-else-if="networkStats" class="space-y-4">
          <!-- Stats -->
          <div class="grid grid-cols-3 gap-4">
            <div class="bg-cyan-50 dark:bg-cyan-500/10 rounded-lg p-3 text-center">
              <p class="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                {{ networkStats.level1Count }}
              </p>
              <p class="text-xs text-slate-600 dark:text-slate-400">Level 1</p>
            </div>
            <div class="bg-purple-50 dark:bg-purple-500/10 rounded-lg p-3 text-center">
              <p class="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {{ networkStats.level2Count }}
              </p>
              <p class="text-xs text-slate-600 dark:text-slate-400">Level 2</p>
            </div>
            <div class="bg-amber-50 dark:bg-amber-500/10 rounded-lg p-3 text-center">
              <p class="text-2xl font-bold text-amber-600 dark:text-amber-400">
                {{ networkStats.level3Count }}
              </p>
              <p class="text-xs text-slate-600 dark:text-slate-400">Level 3</p>
            </div>
          </div>

          <!-- Tree visualization -->
          <div
            v-if="networkTree && networkTree.nodes.length > 0"
            class="bg-slate-50 dark:bg-slate-800 rounded-lg p-4"
          >
            <div class="space-y-4">
              <!-- Root node -->
              <div class="flex justify-center">
                <div class="flex flex-col items-center">
                  <div
                    class="w-16 h-16 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                  >
                    {{ affiliate?.customerName?.charAt(0) || 'Y' }}
                  </div>
                  <p class="mt-2 text-sm font-medium text-slate-900 dark:text-white">
                    {{ affiliate?.customerName }}
                  </p>
                  <p class="text-xs text-slate-500">Root</p>
                </div>
              </div>

              <!-- Level 1 -->
              <div v-if="networkTree.nodes.filter((n) => n.level === 1).length > 0">
                <div class="h-8 flex justify-center">
                  <div class="w-px bg-slate-300 dark:bg-slate-600"></div>
                </div>
                <div class="flex justify-center gap-4 flex-wrap">
                  <div
                    v-for="node in networkTree.nodes.filter((n) => n.level === 1)"
                    :key="node.key"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md"
                      :style="{
                        background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`,
                      }"
                    >
                      {{ node.text }}
                    </div>
                    <p class="mt-1 text-xs font-medium text-slate-900 dark:text-white">
                      {{ node.customerName }}
                    </p>
                    <UBadge
                      :color="node.status === 'active' ? 'success' : 'neutral'"
                      variant="subtle"
                      size="xs"
                    >
                      {{ node.status }}
                    </UBadge>
                  </div>
                </div>
              </div>

              <!-- Level 2 -->
              <div v-if="networkTree.nodes.filter((n) => n.level === 2).length > 0">
                <div class="h-8 flex justify-center">
                  <div class="w-px bg-slate-300 dark:bg-slate-600"></div>
                </div>
                <div class="flex justify-center gap-3 flex-wrap">
                  <div
                    v-for="node in networkTree.nodes.filter((n) => n.level === 2)"
                    :key="node.key"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md"
                      :style="{
                        background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`,
                      }"
                    >
                      {{ node.text }}
                    </div>
                    <p class="mt-1 text-xs text-slate-700 dark:text-slate-300">
                      {{ node.customerName }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Level 3 -->
              <div v-if="networkTree.nodes.filter((n) => n.level === 3).length > 0">
                <div class="h-8 flex justify-center">
                  <div class="w-px bg-slate-300 dark:bg-slate-600"></div>
                </div>
                <div class="flex justify-center gap-2 flex-wrap">
                  <div
                    v-for="node in networkTree.nodes.filter((n) => n.level === 3)"
                    :key="node.key"
                    class="flex flex-col items-center"
                  >
                    <div
                      class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md"
                      :style="{
                        background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`,
                      }"
                    >
                      {{ node.text }}
                    </div>
                    <p class="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      {{ node.customerName }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 text-center">
            <UIcon
              name="i-heroicons-user-group"
              class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
            />
            <p class="text-slate-500 dark:text-slate-400">Belum ada member di tree ini</p>
          </div>

          <!-- Total value -->
          <div
            class="flex items-center justify-between bg-emerald-50 dark:bg-emerald-500/10 rounded-lg p-4"
          >
            <span class="text-sm text-slate-600 dark:text-slate-400">Total Nilai Network</span>
            <span class="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              {{ formatCurrency(networkStats.totalNetworkValue) }}
            </span>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
