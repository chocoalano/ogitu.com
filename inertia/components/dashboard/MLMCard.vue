<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Affiliate, Commission, Referral, NetworkStats, MLMTab, MLMMainTabId } from './types'
import type { NetworkTreeData } from '~/composables/use_network_diagram'
import {
  MLMHeader,
  MLMTabNavigation,
  MLMMitraTab,
  MLMNetworkTab,
  MLMBonusTab,
  MLMBackground,
} from './mlm'

const props = defineProps<{
  affiliate: Affiliate
  commissions: Commission[]
  referrals: Referral[]
  networkStats: NetworkStats
  networkTree?: NetworkTreeData | null
}>()

const emit = defineEmits<{
  withdraw: []
  viewAllMitra: [status: 'active' | 'inactive' | 'prospect']
  referralCopied: []
}>()

// Tab state
const activeTab = ref<MLMMainTabId>('mitra')

// Tab configuration
const tabs = computed<MLMTab[]>(() => [
  { id: 'mitra', label: 'Mitra', icon: 'i-lucide-users', count: props.referrals.length },
  { id: 'network', label: 'Network', icon: 'i-lucide-git-branch', count: null },
  { id: 'bonus', label: 'Bonus', icon: 'i-lucide-coins', count: props.commissions.length },
])

// Event handlers
const handleWithdraw = () => emit('withdraw')
const handleViewAllMitra = (status: 'active' | 'inactive' | 'prospect') =>
  emit('viewAllMitra', status)
const handleReferralCopied = () => emit('referralCopied')
</script>

<template>
  <div class="relative overflow-hidden rounded-2xl">
    <!-- Gaming Card Background -->
    <MLMBackground />

    <div class="relative z-10">
      <!-- Header Section -->
      <MLMHeader :affiliate="affiliate" @copied="handleReferralCopied" />

      <!-- Main Tab Navigation -->
      <MLMTabNavigation v-model:activeTab="activeTab" :tabs="tabs" />

      <!-- Tab Content -->
      <div class="p-4">
        <!-- Mitra Tab -->
        <MLMMitraTab
          v-if="activeTab === 'mitra'"
          :referrals="referrals"
          @view-all="handleViewAllMitra"
        />

        <!-- Network Tab -->
        <MLMNetworkTab
          v-else-if="activeTab === 'network'"
          :network-stats="networkStats"
          :network-tree="networkTree"
          :is-active="activeTab === 'network'"
        />

        <!-- Bonus Tab -->
        <MLMBonusTab
          v-else-if="activeTab === 'bonus'"
          :affiliate="affiliate"
          :commissions="commissions"
          @withdraw="handleWithdraw"
        />
      </div>
    </div>
  </div>
</template>
