<script setup lang="ts">
import type { MLMTab, MLMMainTabId } from '../types'

defineProps<{
  tabs: MLMTab[]
  activeTab: MLMMainTabId
}>()

const emit = defineEmits<{
  'update:activeTab': [value: MLMMainTabId]
}>()

const handleTabClick = (tabId: MLMMainTabId) => {
  emit('update:activeTab', tabId)
}
</script>

<template>
  <div class="px-3">
    <div class="flex items-center bg-gray-800/60 border border-gray-700/50 rounded-xl p-1">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="handleTabClick(tab.id)"
        :class="[
          'flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300',
          activeTab === tab.id
            ? 'bg-linear-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30'
            : 'text-gray-400 hover:text-white hover:bg-gray-700/50',
        ]"
      >
        <UIcon :name="tab.icon" class="w-3.5 h-3.5" />
        <span>{{ tab.label }}</span>
        <span
          v-if="tab.count !== null && tab.count > 0"
          :class="[
            'px-1.5 py-0.5 rounded-full text-[9px]',
            activeTab === tab.id ? 'bg-white/20' : 'bg-gray-700',
          ]"
        >
          {{ tab.count }}
        </span>
      </button>
    </div>
  </div>
</template>
