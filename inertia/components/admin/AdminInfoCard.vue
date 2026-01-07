<script setup lang="ts">
import type { AdminData } from './types'
import { formatNumber } from './utils'

defineProps<{
  admin: AdminData
  sidebarOpen: boolean
}>()

const statusColor = (status: string) => {
  switch (status) {
    case 'active':
      return 'bg-emerald-500/20 text-emerald-400'
    case 'pending':
      return 'bg-amber-500/20 text-amber-400'
    default:
      return 'bg-slate-500/20 text-slate-400'
  }
}

const statusLabel = (status: string) => {
  switch (status) {
    case 'active':
      return 'Aktif'
    case 'pending':
      return 'Pending'
    default:
      return 'Tidak Aktif'
  }
}
</script>

<template>
  <!-- Admin Info Card -->
  <div v-if="sidebarOpen" class="mx-3 mt-4 p-3 rounded-xl bg-linear-to-r from-slate-800 to-slate-800/50 border border-slate-700/50">
    <div class="flex items-center gap-3">
      <div class="relative">
        <div class="w-11 h-11 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/30">
          {{ admin.storeName?.charAt(0).toUpperCase() }}
        </div>
        <div
          class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-slate-800"
          :class="admin.status === 'active' ? 'bg-emerald-400' : 'bg-amber-400'"
        ></div>
      </div>
      <div class="flex-1 min-w-0">
        <h4 class="text-white font-semibold text-sm truncate">{{ admin.storeName }}</h4>
        <span
          class="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium mt-1"
          :class="statusColor(admin.status ?? 'active')"
        >
          {{ statusLabel(admin.status ?? 'active') }}
        </span>
      </div>
    </div>
    <!-- Quick Stats -->
    <div class="grid grid-cols-2 gap-2 mt-3">
      <div class="text-center p-2 rounded-lg bg-slate-900/50">
        <div class="flex items-center justify-center gap-1">
          <UIcon name="i-heroicons-star-solid" class="w-3.5 h-3.5 text-amber-400" />
          <span class="text-white font-semibold text-sm">{{ Number(admin.rating ?? 0).toFixed(1) }}</span>
        </div>
        <span class="text-slate-400 text-[10px]">Rating</span>
      </div>
      <div class="text-center p-2 rounded-lg bg-slate-900/50">
        <span class="text-white font-semibold text-sm">{{ formatNumber(admin.totalSales ?? 0) }}</span>
        <span class="text-slate-400 text-[10px] block">Terjual</span>
      </div>
    </div>
  </div>

  <!-- Collapsed admin avatar -->
  <div v-else class="flex justify-center mt-4">
    <div
      class="w-10 h-10 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-bold shadow-lg shadow-violet-500/30"
    >
      {{ admin.storeName?.charAt(0).toUpperCase() }}
    </div>
  </div>
</template>
