<script setup lang="ts">
import { ref, toRef, watch, nextTick } from 'vue'
import type { NetworkStats } from '../types'
import { networkLevelColors } from '../types'
import { useNetworkDiagram, type NetworkTreeData } from '~/composables/use_network_diagram'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  networkStats: NetworkStats
  networkTree?: NetworkTreeData | null
  isActive: boolean
}>()

const { formatPrice } = useOrderFormatters()

// GoJS Network Diagram
const networkDiagramRef = ref<HTMLDivElement | null>(null)
const networkStatsRef = toRef(props, 'networkStats')
const networkTreeRef = toRef(props, 'networkTree')

const { initDiagram, updateDiagram, isInitialized } = useNetworkDiagram(
  networkDiagramRef,
  networkStatsRef,
  networkTreeRef
)

// Re-initialize diagram when tab becomes active
watch(
  () => props.isActive,
  (active) => {
    if (active) {
      nextTick(() => {
        setTimeout(() => {
          initDiagram()
        }, 150)
      })
    }
  }
)

// Update diagram when network tree data changes
watch(
  () => props.networkTree,
  (newTree) => {
    if (newTree && isInitialized.value) {
      updateDiagram()
    }
  },
  { deep: true }
)

// Get level count helper
const getLevelCount = (level: 1 | 2 | 3) => {
  const counts: Record<1 | 2 | 3, number> = {
    1: props.networkStats.level1Count,
    2: props.networkStats.level2Count,
    3: props.networkStats.level3Count,
  }
  return counts[level]
}
</script>

<template>
  <div class="space-y-4">
    <!-- GoJS Network Visualization -->
    <div class="relative">
      <!-- Background decorations -->
      <div class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div class="absolute top-0 left-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div>
        <div
          class="absolute bottom-0 right-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"
        ></div>
      </div>

      <!-- GoJS Container -->
      <div
        ref="networkDiagramRef"
        class="relative w-full rounded-2xl bg-gray-900/50 border border-gray-700/30 overflow-hidden"
        style="height: 220px; min-height: 220px"
      ></div>

      <!-- Loading/Fallback State (overlay) -->
      <div
        v-if="!isInitialized"
        class="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-2xl z-10"
      >
        <div class="text-center">
          <div
            class="w-10 h-10 mx-auto mb-2 rounded-xl bg-violet-500/20 flex items-center justify-center animate-pulse"
          >
            <UIcon name="i-lucide-network" class="w-5 h-5 text-violet-400" />
          </div>
          <p class="text-xs text-gray-500">Loading network...</p>
        </div>
      </div>
    </div>

    <!-- Network Stats -->
    <div class="grid grid-cols-2 gap-2">
      <div class="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
          <span class="text-[10px] text-emerald-400 font-bold uppercase">Active Members</span>
        </div>
        <p class="text-xl font-black text-emerald-400">{{ networkStats.activeMembers }}</p>
      </div>
      <div class="p-3 bg-gray-500/10 border border-gray-500/20 rounded-xl">
        <div class="flex items-center gap-2 mb-1">
          <div class="w-2 h-2 bg-gray-500 rounded-full"></div>
          <span class="text-[10px] text-gray-400 font-bold uppercase">Inactive</span>
        </div>
        <p class="text-xl font-black text-gray-400">{{ networkStats.inactiveMembers }}</p>
      </div>
    </div>

    <!-- Level Details -->
    <div class="grid grid-cols-3 gap-2">
      <div
        v-for="level in [1, 2, 3] as const"
        :key="level"
        class="p-2.5 bg-gray-800/40 border border-gray-700/30 rounded-xl text-center"
      >
        <div
          :class="[
            'w-8 h-8 mx-auto rounded-lg bg-linear-to-br flex items-center justify-center mb-2',
            networkLevelColors[level].linear,
          ]"
        >
          <span class="text-[10px] font-black text-white">L{{ level }}</span>
        </div>
        <p :class="['text-lg font-black', networkLevelColors[level].text]">
          {{ getLevelCount(level) }}
        </p>
        <p class="text-[9px] text-gray-500">Level {{ level }}</p>
      </div>
    </div>

    <!-- Network Value -->
    <div
      class="p-3 bg-linear-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5">
            Total Network Value
          </p>
          <p
            class="text-lg font-black bg-linear-to-r from-violet-400 to-purple-400 text-transparent bg-clip-text"
          >
            {{ formatPrice(networkStats.totalNetworkValue) }}
          </p>
        </div>
        <div class="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">
          <UIcon name="i-lucide-trending-up" class="w-6 h-6 text-violet-400" />
        </div>
      </div>
    </div>
  </div>
</template>
