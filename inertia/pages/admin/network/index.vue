<script setup lang="ts">
import { useNetworkManagement } from '~/composables/use_network_management'
import AdminLayout from '~/layouts/admin.vue'
import {
  NetworkStatsCards,
  AffiliateList,
  ReferredCustomersList,
  PlacementModal,
  CreateAffiliateModal,
  NetworkTreeModal,
  SetupReferralCodeModal,
  AddMemberToTreeModal,
  type Affiliate,
  type NetworkPageStats,
} from '~/components/admin/network'

defineOptions({
  layout: AdminLayout,
})

interface Props {
  affiliates?: Affiliate[]
  stats?: NetworkPageStats
}

const props = withDefaults(defineProps<Props>(), {
  affiliates: () => [],
  stats: () => ({ totalAffiliates: 0, totalCustomersWithReferral: 0 }),
})

const {
  // State
  selectedAffiliate,
  referredCustomers,
  networkTree,
  networkStats,
  selectedCustomers,
  placementLevel,
  newAffiliateSearch,
  newAffiliateCustomers,
  selectedNewCustomer,

  // Setup referral code state
  affiliatedCustomersData,
  selectedCustomersForReferral,
  customReferralCode,

  // Add member to tree state
  showAddMemberModal,
  addMemberSearch,
  addMemberCustomers,
  selectedAddMemberCustomer,
  selectedAddMemberLevel,
  isSearchingAddMember,
  isAddingMember,

  // Loading states
  isLoading,
  isLoadingTree,
  isPlacing,
  isSearchingCustomers,
  isCreatingAffiliate,
  isLoadingAffiliatedCustomers,
  isSettingUpReferralCode,

  // Modal states
  showPlacementModal,
  showCreateAffiliateModal,
  showTreeModal,
  showSetupReferralModal,

  // Actions
  loadReferredCustomers,
  loadNetworkTree,
  placeCustomer,
  bulkPlaceCustomers,
  removeFromTree,
  createAffiliate,
  toggleCustomerSelection,
  selectAllUnplaced,
  closeCreateAffiliateModal,

  // Setup referral code actions
  loadAffiliatedCustomers,
  setupReferralCode,
  bulkSetupReferralCodes,
  toggleReferralCustomerSelection,
  selectAllWithoutReferralCode,
  closeSetupReferralModal,

  // Add member to tree actions
  openAddMemberModal,
  addMemberToTree,
  closeAddMemberModal,
} = useNetworkManagement()
</script>

<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Setup Tree Network MLM</h1>
        <p class="text-gray-500 dark:text-gray-400">
          Kelola dan tempatkan member ke dalam tree network MLM
        </p>
      </div>
      <UButton icon="i-heroicons-plus" color="primary" @click="showCreateAffiliateModal = true">
        Buat Akun Affiliate Baru
      </UButton>
    </div>

    <!-- Stats -->
    <NetworkStatsCards :stats="props.stats" />

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Affiliate List -->
      <AffiliateList
        :affiliates="props.affiliates"
        :selected-affiliate-id="selectedAffiliate?.id"
        @select="loadReferredCustomers"
        @view-tree="loadNetworkTree"
        @setup-referral-codes="loadAffiliatedCustomers"
        @add-member="openAddMemberModal"
      />

      <!-- Referred Customers -->
      <ReferredCustomersList
        :affiliate="selectedAffiliate"
        :referred-customers="referredCustomers"
        :is-loading="isLoading"
        :is-placing="isPlacing"
        :selected-customers="selectedCustomers"
        @place-customer="placeCustomer"
        @remove-from-tree="removeFromTree"
        @toggle-selection="toggleCustomerSelection"
        @select-all="selectAllUnplaced"
        @open-placement-modal="showPlacementModal = true"
      />
    </div>

    <!-- Bulk Placement Modal -->
    <PlacementModal
      v-model:open="showPlacementModal"
      v-model:placement-level="placementLevel"
      :affiliate="selectedAffiliate"
      :selected-count="selectedCustomers.length"
      :is-placing="isPlacing"
      @confirm="bulkPlaceCustomers"
    />

    <!-- Create Affiliate Modal -->
    <CreateAffiliateModal
      v-model:open="showCreateAffiliateModal"
      v-model:search-query="newAffiliateSearch"
      v-model:selected-customer-id="selectedNewCustomer"
      :customers="newAffiliateCustomers"
      :is-searching="isSearchingCustomers"
      :is-creating="isCreatingAffiliate"
      @confirm="createAffiliate"
      @close="closeCreateAffiliateModal"
    />

    <!-- Network Tree Modal -->
    <NetworkTreeModal
      v-model:open="showTreeModal"
      :affiliate="selectedAffiliate"
      :network-tree="networkTree"
      :network-stats="networkStats"
      :is-loading="isLoadingTree"
    />

    <!-- Setup Referral Code Modal -->
    <SetupReferralCodeModal
      v-model:open="showSetupReferralModal"
      v-model:custom-referral-code="customReferralCode"
      :affiliate="selectedAffiliate"
      :affiliated-customers-data="affiliatedCustomersData"
      :selected-customers="selectedCustomersForReferral"
      :is-loading="isLoadingAffiliatedCustomers"
      :is-setting-up="isSettingUpReferralCode"
      @setup-referral-code="setupReferralCode"
      @bulk-setup-referral-codes="bulkSetupReferralCodes"
      @toggle-selection="toggleReferralCustomerSelection"
      @select-all="selectAllWithoutReferralCode"
      @close="closeSetupReferralModal"
    />

    <!-- Add Member to Tree Modal -->
    <AddMemberToTreeModal
      v-model:open="showAddMemberModal"
      v-model:search-query="addMemberSearch"
      v-model:selected-customer-id="selectedAddMemberCustomer"
      v-model:selected-level="selectedAddMemberLevel"
      :affiliate="selectedAffiliate"
      :customers="addMemberCustomers"
      :is-searching="isSearchingAddMember"
      :is-adding="isAddingMember"
      @confirm="addMemberToTree"
      @close="closeAddMemberModal"
    />
  </div>
</template>
