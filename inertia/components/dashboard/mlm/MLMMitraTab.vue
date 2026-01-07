<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Referral, MitraSubTab, MitraSubTabId } from '../types'
import { mitraStatusStyles } from '../types'
import { useOrderFormatters } from '~/composables/use_orders'

const props = defineProps<{
  referrals: Referral[]
}>()

const emit = defineEmits<{
  viewAll: [status: MitraSubTabId]
}>()

const { formatPrice, formatRelativeTime } = useOrderFormatters()

// Sub-tab state
const mitraSubTab = ref<MitraSubTabId>('active')

const mitraSubTabs: MitraSubTab[] = [
  { id: 'active', label: 'Aktif', icon: 'i-lucide-user-check' },
  { id: 'inactive', label: 'Pasif', icon: 'i-lucide-user-x' },
  { id: 'prospect', label: 'Prospek', icon: 'i-lucide-user-plus' },
]

// Filter referrals based on sub-tab
const filteredReferrals = computed(() => {
  return props.referrals.filter((r) => r.status === mitraSubTab.value)
})

// Count by status
const referralCounts = computed(() => ({
  active: props.referrals.filter((r) => r.status === 'active').length,
  inactive: props.referrals.filter((r) => r.status === 'inactive').length,
  prospect: props.referrals.filter((r) => r.status === 'prospect').length,
}))

// Sub-tab style helper
const getSubTabStyle = (subTabId: MitraSubTabId, isActive: boolean) => {
  if (!isActive) return 'text-gray-500 hover:text-gray-300'

  const styles: Record<MitraSubTabId, string> = {
    active: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30',
    inactive: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
    prospect: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  }
  return styles[subTabId]
}

const getCountBadgeStyle = (subTabId: MitraSubTabId, isActive: boolean) => {
  if (!isActive) return 'bg-gray-700'

  const styles: Record<MitraSubTabId, string> = {
    active: 'bg-emerald-500/30',
    inactive: 'bg-gray-500/30',
    prospect: 'bg-amber-500/30',
  }
  return styles[subTabId]
}

// Empty state content
const emptyStateContent = computed(() => {
  const content: Record<MitraSubTabId, { title: string; subtitle: string }> = {
    active: {
      title: 'Belum ada member aktif',
      subtitle: 'Ajak teman untuk bergabung!',
    },
    inactive: {
      title: 'Tidak ada member pasif',
      subtitle: 'Semua member sedang aktif!',
    },
    prospect: {
      title: 'Belum ada prospek',
      subtitle: 'Bagikan link referral anda!',
    },
  }
  return content[mitraSubTab.value]
})
</script>

<template>
  <div class="space-y-3">
    <!-- Sub-Tab Navigation -->
    <div class="flex items-center gap-1 p-1 bg-gray-800/40 border border-gray-700/30 rounded-xl">
      <button
        v-for="subTab in mitraSubTabs"
        :key="subTab.id"
        @click="mitraSubTab = subTab.id"
        :class="[
          'flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200',
          getSubTabStyle(subTab.id, mitraSubTab === subTab.id),
        ]"
      >
        <UIcon :name="subTab.icon" class="w-3 h-3" />
        <span>{{ subTab.label }}</span>
        <span
          v-if="referralCounts[subTab.id] > 0"
          :class="[
            'px-1 py-0.5 rounded text-[8px] ml-0.5',
            getCountBadgeStyle(subTab.id, mitraSubTab === subTab.id),
          ]"
        >
          {{ referralCounts[subTab.id] }}
        </span>
      </button>
    </div>

    <!-- Member List -->
    <div v-if="filteredReferrals.length > 0" class="space-y-2">
      <div
        v-for="referral in filteredReferrals.slice(0, 5)"
        :key="referral.id"
        class="flex items-center gap-3 p-3 bg-gray-800/40 border border-gray-700/30 rounded-xl hover:bg-gray-800/60 transition-colors group"
      >
        <!-- Avatar -->
        <div class="relative">
          <div
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center',
              mitraStatusStyles[referral.status].gradient,
            ]"
          >
            <UIcon
              v-if="!referral.customerAvatar"
              name="i-lucide-user"
              class="w-5 h-5 text-white"
            />
            <img
              v-else
              :src="referral.customerAvatar"
              class="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div
            :class="[
              'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-800',
              mitraStatusStyles[referral.status].badge,
            ]"
          ></div>
        </div>

        <!-- Info -->
        <div class="flex-1 min-w-0">
          <p class="text-sm font-bold text-white truncate">{{ referral.customerName }}</p>
          <div class="flex items-center gap-2 text-[10px] text-gray-500">
            <span class="flex items-center gap-1">
              <UIcon name="i-lucide-shopping-bag" class="w-3 h-3" />
              {{ referral.totalOrders }} orders
            </span>
            <span>•</span>
            <span>{{ formatRelativeTime(referral.registeredAt) }}</span>
          </div>
        </div>

        <!-- Stats -->
        <div class="text-right">
          <p :class="['text-xs font-bold', mitraStatusStyles[referral.status].text]">
            {{ formatPrice(referral.totalSpent) }}
          </p>
          <p class="text-[9px] text-gray-500">spent</p>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="py-8 text-center">
      <div
        :class="[
          'w-16 h-16 mx-auto mb-3 rounded-2xl border flex items-center justify-center',
          mitraSubTab === 'active'
            ? 'bg-emerald-500/10 border-emerald-500/20'
            : mitraSubTab === 'inactive'
              ? 'bg-gray-500/10 border-gray-500/20'
              : 'bg-amber-500/10 border-amber-500/20',
        ]"
      >
        <UIcon
          :name="
            mitraSubTab === 'active'
              ? 'i-lucide-user-check'
              : mitraSubTab === 'inactive'
                ? 'i-lucide-user-x'
                : 'i-lucide-user-plus'
          "
          :class="[
            'w-8 h-8',
            mitraSubTab === 'active'
              ? 'text-emerald-500/50'
              : mitraSubTab === 'inactive'
                ? 'text-gray-500/50'
                : 'text-amber-500/50',
          ]"
        />
      </div>
      <p class="text-sm text-gray-500 mb-1">{{ emptyStateContent.title }}</p>
      <p class="text-xs text-gray-600">{{ emptyStateContent.subtitle }}</p>
    </div>

    <!-- View All Link -->
    <button
      v-if="filteredReferrals.length > 5"
      @click="emit('viewAll', mitraSubTab)"
      class="w-full py-2 text-xs text-violet-400 hover:text-violet-300 transition-colors"
    >
      Lihat semua {{ filteredReferrals.length }} member →
    </button>
  </div>
</template>
