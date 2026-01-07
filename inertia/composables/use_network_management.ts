import { ref, watch } from 'vue'
import { router } from '@inertiajs/vue3'
import { useToast } from '~/composables/use_toast'
import { getXsrfToken } from '~/components/admin/types'
import type {
  Affiliate,
  ReferredCustomersData,
  TreeData,
  NetworkStats,
  NewAffiliateCustomer,
  AffiliatedCustomersData,
  AffiliatedCustomerWithoutCode,
  CustomerSearchResult,
} from '~/components/admin/network/types'

export function useNetworkManagement() {
  const toast = useToast()

  // State
  const selectedAffiliate = ref<Affiliate | null>(null)
  const referredCustomers = ref<ReferredCustomersData | null>(null)
  const networkTree = ref<TreeData | null>(null)
  const networkStats = ref<NetworkStats | null>(null)

  // Loading states
  const isLoading = ref(false)
  const isLoadingTree = ref(false)
  const isPlacing = ref(false)
  const isSearchingCustomers = ref(false)
  const isCreatingAffiliate = ref(false)

  // Selection state
  const selectedCustomers = ref<number[]>([])
  const placementLevel = ref(1)

  // Modal states
  const showPlacementModal = ref(false)
  const showCreateAffiliateModal = ref(false)
  const showTreeModal = ref(false)

  // Create affiliate state
  const newAffiliateSearch = ref('')
  const newAffiliateCustomers = ref<NewAffiliateCustomer[]>([])
  const selectedNewCustomer = ref<number | null>(null)

  // Setup referral code state
  const showSetupReferralModal = ref(false)
  const affiliatedCustomersData = ref<AffiliatedCustomersData | null>(null)
  const affiliatedCustomersWithoutCode = ref<AffiliatedCustomerWithoutCode[]>([])
  const isLoadingAffiliatedCustomers = ref(false)
  const isSettingUpReferralCode = ref(false)
  const selectedCustomersForReferral = ref<number[]>([])
  const customReferralCode = ref('')

  // Add member to tree state
  const showAddMemberModal = ref(false)
  const addMemberSearch = ref('')
  const addMemberCustomers = ref<CustomerSearchResult[]>([])
  const selectedAddMemberCustomer = ref<number | null>(null)
  const selectedAddMemberLevel = ref(1)
  const isSearchingAddMember = ref(false)
  const isAddingMember = ref(false)

  // Load referred customers for selected affiliate
  const loadReferredCustomers = async (affiliate: Affiliate) => {
    selectedAffiliate.value = affiliate
    isLoading.value = true
    selectedCustomers.value = []

    try {
      const response = await fetch(`/admin/network/${affiliate.id}/referred-customers`)
      const data = await response.json()

      if (response.ok) {
        referredCustomers.value = data
      } else {
        toast.error(data.error || 'Gagal memuat data referral')
      }
    } catch {
      toast.error('Gagal memuat data referral')
    } finally {
      isLoading.value = false
    }
  }

  // Load network tree for affiliate
  const loadNetworkTree = async (affiliate: Affiliate) => {
    selectedAffiliate.value = affiliate
    isLoadingTree.value = true
    showTreeModal.value = true

    try {
      const response = await fetch(`/admin/network/${affiliate.id}/tree`)
      const data = await response.json()

      if (response.ok) {
        networkTree.value = data.tree
        networkStats.value = data.stats
      } else {
        toast.error(data.error || 'Gagal memuat tree network')
      }
    } catch {
      toast.error('Gagal memuat tree network')
    } finally {
      isLoadingTree.value = false
    }
  }

  // Place single customer
  const placeCustomer = async (customerId: number, level: number = 1) => {
    if (!selectedAffiliate.value) return

    isPlacing.value = true

    try {
      const response = await fetch('/admin/network/place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': getXsrfToken(),
        },
        body: JSON.stringify({
          affiliateId: selectedAffiliate.value.id,
          customerId,
          level,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Customer berhasil ditempatkan')
        await loadReferredCustomers(selectedAffiliate.value)
      } else {
        toast.error(data.error || 'Gagal menempatkan customer')
      }
    } catch {
      toast.error('Gagal menempatkan customer')
    } finally {
      isPlacing.value = false
    }
  }

  // Bulk place customers
  const bulkPlaceCustomers = async () => {
    if (!selectedAffiliate.value || selectedCustomers.value.length === 0) return

    isPlacing.value = true

    try {
      const response = await fetch('/admin/network/bulk-place', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': getXsrfToken(),
        },
        body: JSON.stringify({
          affiliateId: selectedAffiliate.value.id,
          customerIds: selectedCustomers.value,
          level: placementLevel.value,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Customers berhasil ditempatkan')
        selectedCustomers.value = []
        showPlacementModal.value = false
        await loadReferredCustomers(selectedAffiliate.value)
      } else {
        toast.error(data.error || 'Gagal menempatkan customers')
      }
    } catch {
      toast.error('Gagal menempatkan customers')
    } finally {
      isPlacing.value = false
    }
  }

  // Remove from tree
  const removeFromTree = async (referralId: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus member ini dari tree?')) return

    try {
      const response = await fetch(`/admin/network/referral/${referralId}`, {
        method: 'DELETE',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': getXsrfToken(),
        },
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Member berhasil dihapus dari tree')
        if (selectedAffiliate.value) {
          await loadReferredCustomers(selectedAffiliate.value)
        }
      } else {
        toast.error(data.error || 'Gagal menghapus member')
      }
    } catch {
      toast.error('Gagal menghapus member')
    }
  }

  // Search customers without affiliate
  const searchCustomersWithoutAffiliate = async () => {
    if (newAffiliateSearch.value.length < 2) {
      newAffiliateCustomers.value = []
      return
    }

    isSearchingCustomers.value = true

    try {
      const response = await fetch(
        `/admin/network/customers-without-affiliate?search=${encodeURIComponent(newAffiliateSearch.value)}`
      )
      const data = await response.json()

      if (response.ok) {
        newAffiliateCustomers.value = data.customers
      }
    } catch (error) {
      console.error('Failed to search customers', error)
    } finally {
      isSearchingCustomers.value = false
    }
  }

  // Create affiliate for customer
  const createAffiliate = async () => {
    if (!selectedNewCustomer.value) {
      toast.error('Pilih customer terlebih dahulu')
      return
    }

    isCreatingAffiliate.value = true

    try {
      const response = await fetch('/admin/network/create-affiliate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': getXsrfToken(),
        },
        body: JSON.stringify({
          customerId: selectedNewCustomer.value,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Akun affiliate berhasil dibuat')
        closeCreateAffiliateModal()
        router.reload()
      } else {
        toast.error(data.error || 'Gagal membuat akun affiliate')
      }
    } catch {
      toast.error('Gagal membuat akun affiliate')
    } finally {
      isCreatingAffiliate.value = false
    }
  }

  // Toggle customer selection
  const toggleCustomerSelection = (customerId: number) => {
    const index = selectedCustomers.value.indexOf(customerId)
    if (index === -1) {
      selectedCustomers.value.push(customerId)
    } else {
      selectedCustomers.value.splice(index, 1)
    }
  }

  // Select all unplaced customers
  const selectAllUnplaced = () => {
    if (!referredCustomers.value) return

    if (selectedCustomers.value.length === referredCustomers.value.unplacedCustomers.length) {
      selectedCustomers.value = []
    } else {
      selectedCustomers.value = referredCustomers.value.unplacedCustomers.map((c) => c.id)
    }
  }

  // Close create affiliate modal and reset state
  const closeCreateAffiliateModal = () => {
    showCreateAffiliateModal.value = false
    newAffiliateSearch.value = ''
    newAffiliateCustomers.value = []
    selectedNewCustomer.value = null
  }

  // Load affiliated customers with referral code status
  const loadAffiliatedCustomers = async (affiliate: Affiliate) => {
    selectedAffiliate.value = affiliate
    isLoadingAffiliatedCustomers.value = true
    showSetupReferralModal.value = true
    selectedCustomersForReferral.value = []

    try {
      const response = await fetch(`/admin/network/${affiliate.id}/affiliated-customers`)
      const data = await response.json()

      if (response.ok) {
        affiliatedCustomersData.value = data
      } else {
        toast.error(data.error || 'Gagal memuat data customers terafiliasi')
      }
    } catch {
      toast.error('Gagal memuat data customers terafiliasi')
    } finally {
      isLoadingAffiliatedCustomers.value = false
    }
  }

  // Setup referral code for single customer
  const setupReferralCode = async (customerId: number, customCode?: string) => {
    if (!selectedAffiliate.value) return

    isSettingUpReferralCode.value = true

    try {
      const response = await fetch('/admin/network/setup-referral-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': getXsrfToken(),
        },
        body: JSON.stringify({
          customerId,
          customReferralCode: customCode || undefined,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Kode referral berhasil dibuat')
        await loadAffiliatedCustomers(selectedAffiliate.value)
        customReferralCode.value = ''
      } else {
        toast.error(data.error || 'Gagal membuat kode referral')
      }
    } catch {
      toast.error('Gagal membuat kode referral')
    } finally {
      isSettingUpReferralCode.value = false
    }
  }

  // Bulk setup referral codes
  const bulkSetupReferralCodes = async () => {
    if (!selectedAffiliate.value || selectedCustomersForReferral.value.length === 0) return

    isSettingUpReferralCode.value = true

    try {
      const response = await fetch('/admin/network/bulk-setup-referral-codes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': getXsrfToken(),
        },
        body: JSON.stringify({
          customerIds: selectedCustomersForReferral.value,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Kode referral berhasil dibuat')
        selectedCustomersForReferral.value = []
        await loadAffiliatedCustomers(selectedAffiliate.value)
      } else {
        toast.error(data.error || 'Gagal membuat kode referral batch')
      }
    } catch {
      toast.error('Gagal membuat kode referral batch')
    } finally {
      isSettingUpReferralCode.value = false
    }
  }

  // Toggle customer selection for referral code setup
  const toggleReferralCustomerSelection = (customerId: number) => {
    const index = selectedCustomersForReferral.value.indexOf(customerId)
    if (index === -1) {
      selectedCustomersForReferral.value.push(customerId)
    } else {
      selectedCustomersForReferral.value.splice(index, 1)
    }
  }

  // Select all customers without referral code
  const selectAllWithoutReferralCode = () => {
    if (!affiliatedCustomersData.value) return

    if (
      selectedCustomersForReferral.value.length ===
      affiliatedCustomersData.value.withoutReferralCode.length
    ) {
      selectedCustomersForReferral.value = []
    } else {
      selectedCustomersForReferral.value = affiliatedCustomersData.value.withoutReferralCode.map(
        (c) => c.id
      )
    }
  }

  // Close setup referral modal
  const closeSetupReferralModal = () => {
    showSetupReferralModal.value = false
    affiliatedCustomersData.value = null
    selectedCustomersForReferral.value = []
    customReferralCode.value = ''
  }

  // Search customers for adding to tree
  const searchCustomersForTree = async () => {
    if (addMemberSearch.value.length < 2 || !selectedAffiliate.value) {
      addMemberCustomers.value = []
      return
    }

    isSearchingAddMember.value = true

    try {
      const response = await fetch(
        `/admin/network/${selectedAffiliate.value.id}/search-customers?search=${encodeURIComponent(addMemberSearch.value)}`
      )
      const data = await response.json()

      if (response.ok) {
        addMemberCustomers.value = data.customers
      }
    } catch (error) {
      console.error('Failed to search customers', error)
    } finally {
      isSearchingAddMember.value = false
    }
  }

  // Add member to tree
  const addMemberToTree = async () => {
    if (!selectedAffiliate.value || !selectedAddMemberCustomer.value) return

    isAddingMember.value = true

    try {
      const response = await fetch('/admin/network/add-member', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'X-XSRF-TOKEN': getXsrfToken(),
        },
        body: JSON.stringify({
          affiliateId: selectedAffiliate.value.id,
          customerId: selectedAddMemberCustomer.value,
          level: selectedAddMemberLevel.value,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Member berhasil ditambahkan ke tree')
        closeAddMemberModal()
        await loadReferredCustomers(selectedAffiliate.value)
        router.reload()
      } else {
        toast.error(data.error || 'Gagal menambahkan member ke tree')
      }
    } catch {
      toast.error('Gagal menambahkan member ke tree')
    } finally {
      isAddingMember.value = false
    }
  }

  // Open add member modal
  const openAddMemberModal = (affiliate: Affiliate) => {
    selectedAffiliate.value = affiliate
    showAddMemberModal.value = true
  }

  // Close add member modal
  const closeAddMemberModal = () => {
    showAddMemberModal.value = false
    addMemberSearch.value = ''
    addMemberCustomers.value = []
    selectedAddMemberCustomer.value = null
    selectedAddMemberLevel.value = 1
  }

  // Debounced search watcher
  let searchTimeout: ReturnType<typeof setTimeout> | null = null
  watch(newAffiliateSearch, () => {
    if (searchTimeout) clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      searchCustomersWithoutAffiliate()
    }, 300)
  })

  // Watch for add member search
  let addMemberSearchTimeout: ReturnType<typeof setTimeout> | null = null
  watch(addMemberSearch, () => {
    if (addMemberSearchTimeout) clearTimeout(addMemberSearchTimeout)
    addMemberSearchTimeout = setTimeout(() => {
      searchCustomersForTree()
    }, 300)
  })

  return {
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
    affiliatedCustomersWithoutCode,
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
  }
}
