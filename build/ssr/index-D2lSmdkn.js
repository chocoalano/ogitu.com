import { _ as _sfc_main$9, a as _sfc_main$b } from './Button-BBveOjhJ.js';
import { ref, watch, defineComponent, mergeProps, useSSRContext, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, unref, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { router } from '@inertiajs/vue3';
import { u as useToast, a as _sfc_main$a, _ as _sfc_main$e } from './Badge-DaOjA2YD.js';
import { g as getXsrfToken, A as AdminLayout } from './admin-CGUULoJY.js';
import { _ as _sfc_main$c } from './Checkbox-9gbT5PLz.js';
import { _ as _sfc_main$d } from './Modal-lw8uQ47S.js';
import { _ as _sfc_main$f } from './Select-1_-G9zx4.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Tooltip-N44Fzd4m.js';

function useNetworkManagement() {
  const toast = useToast();
  const selectedAffiliate = ref(null);
  const referredCustomers = ref(null);
  const networkTree = ref(null);
  const networkStats = ref(null);
  const isLoading = ref(false);
  const isLoadingTree = ref(false);
  const isPlacing = ref(false);
  const isSearchingCustomers = ref(false);
  const isCreatingAffiliate = ref(false);
  const selectedCustomers = ref([]);
  const placementLevel = ref(1);
  const showPlacementModal = ref(false);
  const showCreateAffiliateModal = ref(false);
  const showTreeModal = ref(false);
  const newAffiliateSearch = ref("");
  const newAffiliateCustomers = ref([]);
  const selectedNewCustomer = ref(null);
  const showSetupReferralModal = ref(false);
  const affiliatedCustomersData = ref(null);
  const affiliatedCustomersWithoutCode = ref([]);
  const isLoadingAffiliatedCustomers = ref(false);
  const isSettingUpReferralCode = ref(false);
  const selectedCustomersForReferral = ref([]);
  const customReferralCode = ref("");
  const showAddMemberModal = ref(false);
  const addMemberSearch = ref("");
  const addMemberCustomers = ref([]);
  const selectedAddMemberCustomer = ref(null);
  const selectedAddMemberLevel = ref(1);
  const isSearchingAddMember = ref(false);
  const isAddingMember = ref(false);
  const loadReferredCustomers = async (affiliate) => {
    selectedAffiliate.value = affiliate;
    isLoading.value = true;
    selectedCustomers.value = [];
    try {
      const response = await fetch(`/admin/network/${affiliate.id}/referred-customers`);
      const data = await response.json();
      if (response.ok) {
        referredCustomers.value = data;
      } else {
        toast.error(data.error || "Gagal memuat data referral");
      }
    } catch {
      toast.error("Gagal memuat data referral");
    } finally {
      isLoading.value = false;
    }
  };
  const loadNetworkTree = async (affiliate) => {
    selectedAffiliate.value = affiliate;
    isLoadingTree.value = true;
    showTreeModal.value = true;
    try {
      const response = await fetch(`/admin/network/${affiliate.id}/tree`);
      const data = await response.json();
      if (response.ok) {
        networkTree.value = data.tree ?? null;
        networkStats.value = data.stats ?? null;
      } else {
        toast.error(data.error || "Gagal memuat tree network");
      }
    } catch {
      toast.error("Gagal memuat tree network");
    } finally {
      isLoadingTree.value = false;
    }
  };
  const placeCustomer = async (customerId, level = 1) => {
    if (!selectedAffiliate.value) return;
    isPlacing.value = true;
    try {
      const response = await fetch("/admin/network/place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getXsrfToken()
        },
        body: JSON.stringify({
          affiliateId: selectedAffiliate.value.id,
          customerId,
          level
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Customer berhasil ditempatkan");
        await loadReferredCustomers(selectedAffiliate.value);
      } else {
        toast.error(data.error || "Gagal menempatkan customer");
      }
    } catch {
      toast.error("Gagal menempatkan customer");
    } finally {
      isPlacing.value = false;
    }
  };
  const bulkPlaceCustomers = async () => {
    if (!selectedAffiliate.value || selectedCustomers.value.length === 0) return;
    isPlacing.value = true;
    try {
      const response = await fetch("/admin/network/bulk-place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getXsrfToken()
        },
        body: JSON.stringify({
          affiliateId: selectedAffiliate.value.id,
          customerIds: selectedCustomers.value,
          level: placementLevel.value
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Customers berhasil ditempatkan");
        selectedCustomers.value = [];
        showPlacementModal.value = false;
        await loadReferredCustomers(selectedAffiliate.value);
      } else {
        toast.error(data.error || "Gagal menempatkan customers");
      }
    } catch {
      toast.error("Gagal menempatkan customers");
    } finally {
      isPlacing.value = false;
    }
  };
  const removeFromTree = async (referralId) => {
    if (!globalThis.confirm("Apakah Anda yakin ingin menghapus member ini dari tree?")) return;
    try {
      const response = await fetch(`/admin/network/referral/${referralId}`, {
        method: "DELETE",
        headers: {
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getXsrfToken()
        }
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Member berhasil dihapus dari tree");
        if (selectedAffiliate.value) {
          await loadReferredCustomers(selectedAffiliate.value);
        }
      } else {
        toast.error(data.error || "Gagal menghapus member");
      }
    } catch {
      toast.error("Gagal menghapus member");
    }
  };
  const searchCustomersWithoutAffiliate = async () => {
    if (newAffiliateSearch.value.length < 2) {
      newAffiliateCustomers.value = [];
      return;
    }
    isSearchingCustomers.value = true;
    try {
      const response = await fetch(
        `/admin/network/customers-without-affiliate?search=${encodeURIComponent(newAffiliateSearch.value)}`
      );
      const data = await response.json();
      if (response.ok) {
        newAffiliateCustomers.value = data.customers ?? [];
      }
    } catch (error) {
      console.error("Failed to search customers", error);
    } finally {
      isSearchingCustomers.value = false;
    }
  };
  const createAffiliate = async () => {
    if (!selectedNewCustomer.value) {
      toast.error("Pilih customer terlebih dahulu");
      return;
    }
    isCreatingAffiliate.value = true;
    try {
      const response = await fetch("/admin/network/create-affiliate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getXsrfToken()
        },
        body: JSON.stringify({
          customerId: selectedNewCustomer.value
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Akun affiliate berhasil dibuat");
        closeCreateAffiliateModal();
        router.reload();
      } else {
        toast.error(data.error || "Gagal membuat akun affiliate");
      }
    } catch {
      toast.error("Gagal membuat akun affiliate");
    } finally {
      isCreatingAffiliate.value = false;
    }
  };
  const toggleCustomerSelection = (customerId) => {
    const index = selectedCustomers.value.indexOf(customerId);
    if (index === -1) {
      selectedCustomers.value.push(customerId);
    } else {
      selectedCustomers.value.splice(index, 1);
    }
  };
  const selectAllUnplaced = () => {
    if (!referredCustomers.value) return;
    if (selectedCustomers.value.length === referredCustomers.value.unplacedCustomers.length) {
      selectedCustomers.value = [];
    } else {
      selectedCustomers.value = referredCustomers.value.unplacedCustomers.map((c) => c.id);
    }
  };
  const closeCreateAffiliateModal = () => {
    showCreateAffiliateModal.value = false;
    newAffiliateSearch.value = "";
    newAffiliateCustomers.value = [];
    selectedNewCustomer.value = null;
  };
  const loadAffiliatedCustomers = async (affiliate) => {
    selectedAffiliate.value = affiliate;
    isLoadingAffiliatedCustomers.value = true;
    showSetupReferralModal.value = true;
    selectedCustomersForReferral.value = [];
    try {
      const response = await fetch(`/admin/network/${affiliate.id}/affiliated-customers`);
      const data = await response.json();
      if (response.ok) {
        affiliatedCustomersData.value = data;
      } else {
        toast.error(data.error || "Gagal memuat data customers terafiliasi");
      }
    } catch {
      toast.error("Gagal memuat data customers terafiliasi");
    } finally {
      isLoadingAffiliatedCustomers.value = false;
    }
  };
  const setupReferralCode = async (customerId, customCode) => {
    if (!selectedAffiliate.value) return;
    isSettingUpReferralCode.value = true;
    try {
      const response = await fetch("/admin/network/setup-referral-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getXsrfToken()
        },
        body: JSON.stringify({
          customerId,
          customReferralCode: customCode || void 0
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Kode referral berhasil dibuat");
        await loadAffiliatedCustomers(selectedAffiliate.value);
        customReferralCode.value = "";
      } else {
        toast.error(data.error || "Gagal membuat kode referral");
      }
    } catch {
      toast.error("Gagal membuat kode referral");
    } finally {
      isSettingUpReferralCode.value = false;
    }
  };
  const bulkSetupReferralCodes = async () => {
    if (!selectedAffiliate.value || selectedCustomersForReferral.value.length === 0) return;
    isSettingUpReferralCode.value = true;
    try {
      const response = await fetch("/admin/network/bulk-setup-referral-codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getXsrfToken()
        },
        body: JSON.stringify({
          customerIds: selectedCustomersForReferral.value
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Kode referral berhasil dibuat");
        selectedCustomersForReferral.value = [];
        await loadAffiliatedCustomers(selectedAffiliate.value);
      } else {
        toast.error(data.error || "Gagal membuat kode referral batch");
      }
    } catch {
      toast.error("Gagal membuat kode referral batch");
    } finally {
      isSettingUpReferralCode.value = false;
    }
  };
  const toggleReferralCustomerSelection = (customerId) => {
    const index = selectedCustomersForReferral.value.indexOf(customerId);
    if (index === -1) {
      selectedCustomersForReferral.value.push(customerId);
    } else {
      selectedCustomersForReferral.value.splice(index, 1);
    }
  };
  const selectAllWithoutReferralCode = () => {
    if (!affiliatedCustomersData.value) return;
    if (selectedCustomersForReferral.value.length === affiliatedCustomersData.value.withoutReferralCode.length) {
      selectedCustomersForReferral.value = [];
    } else {
      selectedCustomersForReferral.value = affiliatedCustomersData.value.withoutReferralCode.map(
        (c) => c.id
      );
    }
  };
  const closeSetupReferralModal = () => {
    showSetupReferralModal.value = false;
    affiliatedCustomersData.value = null;
    selectedCustomersForReferral.value = [];
    customReferralCode.value = "";
  };
  const searchCustomersForTree = async () => {
    if (addMemberSearch.value.length < 2 || !selectedAffiliate.value) {
      addMemberCustomers.value = [];
      return;
    }
    isSearchingAddMember.value = true;
    try {
      const response = await fetch(
        `/admin/network/${selectedAffiliate.value.id}/search-customers?search=${encodeURIComponent(addMemberSearch.value)}`
      );
      const data = await response.json();
      if (response.ok) {
        addMemberCustomers.value = data.customers ?? [];
      }
    } catch (error) {
      console.error("Failed to search customers", error);
    } finally {
      isSearchingAddMember.value = false;
    }
  };
  const addMemberToTree = async () => {
    if (!selectedAffiliate.value || !selectedAddMemberCustomer.value) return;
    isAddingMember.value = true;
    try {
      const response = await fetch("/admin/network/add-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          "X-XSRF-TOKEN": getXsrfToken()
        },
        body: JSON.stringify({
          affiliateId: selectedAffiliate.value.id,
          customerId: selectedAddMemberCustomer.value,
          level: selectedAddMemberLevel.value
        })
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message || "Member berhasil ditambahkan ke tree");
        closeAddMemberModal();
        await loadReferredCustomers(selectedAffiliate.value);
        router.reload();
      } else {
        toast.error(data.error || "Gagal menambahkan member ke tree");
      }
    } catch {
      toast.error("Gagal menambahkan member ke tree");
    } finally {
      isAddingMember.value = false;
    }
  };
  const openAddMemberModal = (affiliate) => {
    selectedAffiliate.value = affiliate;
    showAddMemberModal.value = true;
  };
  const closeAddMemberModal = () => {
    showAddMemberModal.value = false;
    addMemberSearch.value = "";
    addMemberCustomers.value = [];
    selectedAddMemberCustomer.value = null;
    selectedAddMemberLevel.value = 1;
  };
  let searchTimeout = null;
  watch(newAffiliateSearch, () => {
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchCustomersWithoutAffiliate();
    }, 300);
  });
  let addMemberSearchTimeout = null;
  watch(addMemberSearch, () => {
    if (addMemberSearchTimeout) clearTimeout(addMemberSearchTimeout);
    addMemberSearchTimeout = setTimeout(() => {
      searchCustomersForTree();
    }, 300);
  });
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
    closeAddMemberModal
  };
}

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "NetworkStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, _attrs))}><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-user-group",
        class: "w-5 h-5 text-violet-500"
      }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-500 dark:text-slate-400">Total Affiliate</p><p class="text-xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.totalAffiliates)}</p></div></div></div><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "w-5 h-5 text-cyan-500"
      }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-500 dark:text-slate-400">Customer dengan Referral</p><p class="text-xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.totalCustomersWithReferral)}</p></div></div></div></div>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/network/NetworkStatsCards.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "AffiliateList",
  __ssrInlineRender: true,
  props: {
    affiliates: {},
    selectedAffiliateId: {}
  },
  emits: ["select", "viewTree", "setupReferralCodes", "addMember"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$9;
      const _component_UBadge = _sfc_main$a;
      const _component_UButton = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden" }, _attrs))}><div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800"><h2 class="text-lg font-semibold text-slate-900 dark:text-white">Daftar Affiliate</h2><p class="text-sm text-slate-500 dark:text-slate-400"> Pilih affiliate untuk mengelola tree network </p></div><div class="divide-y divide-slate-200 dark:divide-slate-800 max-h-125 overflow-y-auto"><!--[-->`);
      ssrRenderList(__props.affiliates, (affiliate) => {
        _push(`<div class="${ssrRenderClass([{ "bg-violet-50 dark:bg-violet-500/10": __props.selectedAffiliateId === affiliate.id }, "p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"])}"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center overflow-hidden">`);
        if (affiliate.customerAvatar) {
          _push(`<img${ssrRenderAttr("src", affiliate.customerAvatar)}${ssrRenderAttr("alt", affiliate.customerName)} class="w-full h-full object-cover">`);
        } else {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-user",
            class: "w-5 h-5 text-violet-500"
          }, null, _parent));
        }
        _push(`</div><div><p class="font-medium text-slate-900 dark:text-white">${ssrInterpolate(affiliate.customerName)}</p><p class="text-sm text-slate-500 dark:text-slate-400">${ssrInterpolate(affiliate.referralCode)}</p></div></div><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: "primary",
          variant: "subtle",
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(affiliate.totalReferrals)} referral `);
            } else {
              return [
                createTextVNode(
                  toDisplayString(affiliate.totalReferrals) + " referral ",
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-user-plus",
          color: "primary",
          variant: "ghost",
          size: "xs",
          title: "Tambah Member ke Tree",
          onClick: ($event) => _ctx.$emit("addMember", affiliate)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-sparkles",
          color: "violet",
          variant: "ghost",
          size: "xs",
          title: "Setup Kode Referral",
          onClick: ($event) => _ctx.$emit("setupReferralCodes", affiliate)
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-eye",
          color: "neutral",
          variant: "ghost",
          size: "xs",
          title: "Lihat Tree",
          onClick: ($event) => _ctx.$emit("viewTree", affiliate)
        }, null, _parent));
        _push(`</div></div></div>`);
      });
      _push(`<!--]-->`);
      if (__props.affiliates.length === 0) {
        _push(`<div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-user-group",
          class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-slate-500 dark:text-slate-400">Belum ada affiliate</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/network/AffiliateList.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "ReferredCustomersList",
  __ssrInlineRender: true,
  props: {
    affiliate: {},
    referredCustomers: {},
    isLoading: { type: Boolean },
    isPlacing: { type: Boolean },
    selectedCustomers: {}
  },
  emits: ["placeCustomer", "removeFromTree", "toggleSelection", "selectAll", "openPlacementModal"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    const isAllSelected = () => {
      if (!props.referredCustomers) return false;
      return props.selectedCustomers.length === props.referredCustomers.unplacedCustomers.length;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$a;
      const _component_UButton = _sfc_main$b;
      const _component_UIcon = _sfc_main$9;
      const _component_UCheckbox = _sfc_main$c;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden" }, _attrs))}><div class="px-4 py-3 border-b border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between"><div><h2 class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.affiliate ? `Referral ${__props.affiliate.customerName}` : "Pilih Affiliate")}</h2><p class="text-sm text-slate-500 dark:text-slate-400">${ssrInterpolate(__props.affiliate ? `Customers yang menggunakan kode ${__props.affiliate.referralCode}` : "Klik affiliate untuk melihat referral")}</p></div>`);
      if (__props.selectedCustomers.length > 0) {
        _push(`<div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UBadge, { color: "primary" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.selectedCustomers.length)} dipilih `);
            } else {
              return [
                createTextVNode(
                  toDisplayString(__props.selectedCustomers.length) + " dipilih ",
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-check-circle",
          color: "primary",
          size: "sm",
          onClick: ($event) => emit("openPlacementModal")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tempatkan `);
            } else {
              return [
                createTextVNode(" Tempatkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!-- Loading -->`);
      if (__props.isLoading) {
        _push(`<div class="p-8 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 text-violet-500 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (!__props.affiliate) {
        _push(`<!--[--><!-- No affiliate selected --><div class="p-8 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-cursor-arrow-rays",
          class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
        }, null, _parent));
        _push(`<p class="text-slate-500 dark:text-slate-400">Pilih affiliate dari daftar di samping</p></div><!--]-->`);
      } else if (__props.referredCustomers) {
        _push(`<!--[--><!-- Customer list --><div class="divide-y divide-slate-200 dark:divide-slate-800"><!-- Unplaced section -->`);
        if (__props.referredCustomers.unplacedCustomers.length > 0) {
          _push(`<div class="p-4"><div class="flex items-center justify-between mb-3"><div class="flex items-center gap-2">`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: "warning",
            variant: "subtle"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.referredCustomers.totalUnplaced)} Belum Ditempatkan `);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(__props.referredCustomers.totalUnplaced) + " Belum Ditempatkan ",
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            size: "xs",
            onClick: ($event) => emit("selectAll")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(isAllSelected() ? "Batal Pilih Semua" : "Pilih Semua")}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(isAllSelected() ? "Batal Pilih Semua" : "Pilih Semua"),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push(`</div><div class="space-y-2 max-h-62 overflow-y-auto"><!--[-->`);
          ssrRenderList(__props.referredCustomers.unplacedCustomers, (customer) => {
            _push(`<div class="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg"><div class="flex items-center gap-3">`);
            _push(ssrRenderComponent(_component_UCheckbox, {
              "model-value": __props.selectedCustomers.includes(customer.id),
              "onUpdate:modelValue": ($event) => emit("toggleSelection", customer.id)
            }, null, _parent));
            _push(`<div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden">`);
            if (customer.avatar) {
              _push(`<img${ssrRenderAttr("src", customer.avatar)}${ssrRenderAttr("alt", customer.fullName)} class="w-full h-full object-cover">`);
            } else {
              _push(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-user",
                class: "w-4 h-4 text-slate-500"
              }, null, _parent));
            }
            _push(`</div><div><p class="font-medium text-slate-900 dark:text-white text-sm">${ssrInterpolate(customer.fullName)}</p><p class="text-xs text-slate-500 dark:text-slate-400">${ssrInterpolate(customer.email)}</p></div></div><div class="flex items-center gap-2"><p class="text-xs text-slate-500">${ssrInterpolate(formatDate(customer.createdAt))}</p>`);
            _push(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-plus",
              color: "primary",
              size: "xs",
              loading: __props.isPlacing,
              onClick: ($event) => emit("placeCustomer", customer.id, 1)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(` Level 1 `);
                } else {
                  return [
                    createTextVNode(" Level 1 ")
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!-- Placed section -->`);
        if (__props.referredCustomers.placedCustomers.length > 0) {
          _push(`<div class="p-4"><div class="mb-3">`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: "success",
            variant: "subtle"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.referredCustomers.totalPlaced)} Sudah Ditempatkan `);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(__props.referredCustomers.totalPlaced) + " Sudah Ditempatkan ",
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push(`</div><div class="space-y-2 max-h-50 overflow-y-auto"><!--[-->`);
          ssrRenderList(__props.referredCustomers.placedCustomers, (customer) => {
            _push(`<div class="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg"><div class="flex items-center gap-3"><div class="w-8 h-8 rounded-full bg-emerald-200 dark:bg-emerald-700 flex items-center justify-center overflow-hidden">`);
            if (customer.avatar) {
              _push(`<img${ssrRenderAttr("src", customer.avatar)}${ssrRenderAttr("alt", customer.fullName)} class="w-full h-full object-cover">`);
            } else {
              _push(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-user",
                class: "w-4 h-4 text-emerald-700 dark:text-emerald-300"
              }, null, _parent));
            }
            _push(`</div><div><p class="font-medium text-slate-900 dark:text-white text-sm">${ssrInterpolate(customer.fullName)}</p><div class="flex items-center gap-2">`);
            _push(ssrRenderComponent(_component_UBadge, {
              color: "primary",
              variant: "subtle",
              size: "xs"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`Level ${ssrInterpolate(customer.level)}`);
                } else {
                  return [
                    createTextVNode(
                      "Level " + toDisplayString(customer.level),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(`<p class="text-xs text-slate-500 dark:text-slate-400">${ssrInterpolate(customer.totalOrdersCount)} order </p><p class="text-xs text-emerald-600 dark:text-emerald-400">${ssrInterpolate(formatCurrency(customer.totalSpent))}</p></div></div></div><div class="flex items-center gap-2">`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "w-5 h-5 text-emerald-500"
            }, null, _parent));
            if (customer.referralId) {
              _push(ssrRenderComponent(_component_UButton, {
                icon: "i-heroicons-trash",
                color: "error",
                variant: "ghost",
                size: "xs",
                onClick: ($event) => emit("removeFromTree", customer.referralId)
              }, null, _parent));
            } else {
              _push(`<!---->`);
            }
            _push(`</div></div>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!-- Empty state -->`);
        if (__props.referredCustomers.totalReferred === 0) {
          _push(`<div class="p-8 text-center">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-user-plus",
            class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
          }, null, _parent));
          _push(`<p class="text-slate-500 dark:text-slate-400"> Belum ada customer yang menggunakan kode referral ini </p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/network/ReferredCustomersList.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "PlacementModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    affiliate: {},
    selectedCount: {},
    placementLevel: {},
    isPlacing: { type: Boolean }
  },
  emits: ["update:open", "update:placementLevel", "confirm"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleOpenChange = (value) => {
      if (!value) {
        setTimeout(() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }, 0);
      }
      emit("update:open", value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$d;
      const _component_UButton = _sfc_main$b;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        title: "Tempatkan Customer",
        description: "Pilih level untuk menempatkan customer ke tree network",
        "onUpdate:open": handleOpenChange
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4"${_scopeId}> Tempatkan ${ssrInterpolate(__props.selectedCount)} Customer </h3><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"${_scopeId}> Pilih Level </label><div class="flex gap-2"${_scopeId}><!--[-->`);
            ssrRenderList([1, 2, 3], (level) => {
              _push2(ssrRenderComponent(_component_UButton, {
                key: level,
                color: __props.placementLevel === level ? "primary" : "neutral",
                variant: __props.placementLevel === level ? "solid" : "outline",
                onClick: ($event) => emit("update:placementLevel", level)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Level ${ssrInterpolate(level)}`);
                  } else {
                    return [
                      createTextVNode(
                        " Level " + toDisplayString(level),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div><p class="mt-2 text-xs text-slate-500 dark:text-slate-400"${_scopeId}> Level 1: 5% komisi | Level 2: 2% komisi | Level 3: 1% komisi </p></div><div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-4"${_scopeId}><p class="text-sm text-slate-600 dark:text-slate-400"${_scopeId}><strong${_scopeId}>${ssrInterpolate(__props.selectedCount)}</strong> customer akan ditempatkan di <strong${_scopeId}>Level ${ssrInterpolate(__props.placementLevel)}</strong> pada tree network <strong${_scopeId}>${ssrInterpolate(__props.affiliate?.customerName)}</strong></p></div></div><div class="flex justify-end gap-3 mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: ($event) => handleOpenChange(false)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              loading: __props.isPlacing,
              onClick: ($event) => emit("confirm")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tempatkan Sekarang `);
                } else {
                  return [
                    createTextVNode(" Tempatkan Sekarang ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode(
                  "h3",
                  { class: "text-lg font-semibold text-slate-900 dark:text-white mb-4" },
                  " Tempatkan " + toDisplayString(__props.selectedCount) + " Customer ",
                  1
                  /* TEXT */
                ),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" }, " Pilih Level "),
                    createVNode("div", { class: "flex gap-2" }, [
                      (openBlock(), createBlock(
                        Fragment,
                        null,
                        renderList([1, 2, 3], (level) => {
                          return createVNode(_component_UButton, {
                            key: level,
                            color: __props.placementLevel === level ? "primary" : "neutral",
                            variant: __props.placementLevel === level ? "solid" : "outline",
                            onClick: ($event) => emit("update:placementLevel", level)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                " Level " + toDisplayString(level),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["color", "variant", "onClick"]);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ]),
                    createVNode("p", { class: "mt-2 text-xs text-slate-500 dark:text-slate-400" }, " Level 1: 5% komisi | Level 2: 2% komisi | Level 3: 1% komisi ")
                  ]),
                  createVNode("div", { class: "bg-slate-50 dark:bg-slate-800 rounded-lg p-4" }, [
                    createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400" }, [
                      createVNode(
                        "strong",
                        null,
                        toDisplayString(__props.selectedCount),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(" customer akan ditempatkan di "),
                      createVNode(
                        "strong",
                        null,
                        "Level " + toDisplayString(__props.placementLevel),
                        1
                        /* TEXT */
                      ),
                      createTextVNode(" pada tree network "),
                      createVNode(
                        "strong",
                        null,
                        toDisplayString(__props.affiliate?.customerName),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                createVNode("div", { class: "flex justify-end gap-3 mt-6" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => handleOpenChange(false)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "primary",
                    loading: __props.isPlacing,
                    onClick: ($event) => emit("confirm")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Tempatkan Sekarang ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading", "onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/network/PlacementModal.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CreateAffiliateModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    searchQuery: {},
    customers: {},
    selectedCustomerId: {},
    isSearching: { type: Boolean },
    isCreating: { type: Boolean }
  },
  emits: ["update:open", "update:searchQuery", "update:selectedCustomerId", "confirm", "close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const handleClose = () => {
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 0);
      emit("close");
    };
    const handleOpenChange = (value) => {
      if (!value) {
        setTimeout(() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }, 0);
      }
      emit("update:open", value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$d;
      const _component_UInput = _sfc_main$e;
      const _component_UIcon = _sfc_main$9;
      const _component_UButton = _sfc_main$b;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        title: "Buat Akun Affiliate",
        description: "Cari dan pilih customer untuk membuat akun affiliate baru",
        "onUpdate:open": handleOpenChange
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4"${_scopeId}> Buat Akun Affiliate Baru </h3><div class="space-y-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"${_scopeId}> Cari Customer </label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              "model-value": __props.searchQuery,
              placeholder: "Ketik nama atau email customer...",
              icon: "i-heroicons-magnifying-glass",
              class: "w-full",
              "onUpdate:modelValue": ($event) => emit("update:searchQuery", $event)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.isSearching) {
              _push2(`<div class="flex justify-center py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-6 h-6 text-violet-500 animate-spin"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (__props.customers.length > 0) {
              _push2(`<div class="space-y-2 max-h-50 overflow-y-auto"${_scopeId}><!--[-->`);
              ssrRenderList(__props.customers, (customer) => {
                _push2(`<div class="${ssrRenderClass([
                  __props.selectedCustomerId === customer.id ? "bg-violet-100 dark:bg-violet-500/20" : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700",
                  "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"
                ])}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden"${_scopeId}>`);
                if (customer.avatar) {
                  _push2(`<img${ssrRenderAttr("src", customer.avatar)}${ssrRenderAttr("alt", customer.fullName)} class="w-full h-full object-cover"${_scopeId}>`);
                } else {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user",
                    class: "w-4 h-4 text-slate-500"
                  }, null, _parent2, _scopeId));
                }
                _push2(`</div><div${_scopeId}><p class="font-medium text-slate-900 dark:text-white text-sm"${_scopeId}>${ssrInterpolate(customer.fullName)}</p><p class="text-xs text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(customer.email)}</p></div></div>`);
                if (__props.selectedCustomerId === customer.id) {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-check-circle",
                    class: "w-5 h-5 text-violet-500"
                  }, null, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              });
              _push2(`<!--]--></div>`);
            } else if (__props.searchQuery.length >= 2) {
              _push2(`<div class="py-4 text-center text-slate-500 dark:text-slate-400"${_scopeId}> Tidak ada customer ditemukan </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="flex justify-end gap-3 mt-6"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: handleClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              loading: __props.isCreating,
              disabled: !__props.selectedCustomerId,
              onClick: ($event) => emit("confirm")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Buat Affiliate `);
                } else {
                  return [
                    createTextVNode(" Buat Affiliate ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white mb-4" }, " Buat Akun Affiliate Baru "),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" }, " Cari Customer "),
                    createVNode(_component_UInput, {
                      "model-value": __props.searchQuery,
                      placeholder: "Ketik nama atau email customer...",
                      icon: "i-heroicons-magnifying-glass",
                      class: "w-full",
                      "onUpdate:modelValue": ($event) => emit("update:searchQuery", $event)
                    }, null, 8, ["model-value", "onUpdate:modelValue"])
                  ]),
                  __props.isSearching ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "flex justify-center py-4"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-path",
                      class: "w-6 h-6 text-violet-500 animate-spin"
                    })
                  ])) : __props.customers.length > 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-2 max-h-50 overflow-y-auto"
                  }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.customers, (customer) => {
                        return openBlock(), createBlock("div", {
                          key: customer.id,
                          class: [
                            "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors",
                            __props.selectedCustomerId === customer.id ? "bg-violet-100 dark:bg-violet-500/20" : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700"
                          ],
                          onClick: ($event) => emit("update:selectedCustomerId", customer.id)
                        }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden" }, [
                              customer.avatar ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: customer.avatar,
                                alt: customer.fullName,
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                key: 1,
                                name: "i-heroicons-user",
                                class: "w-4 h-4 text-slate-500"
                              }))
                            ]),
                            createVNode("div", null, [
                              createVNode(
                                "p",
                                { class: "font-medium text-slate-900 dark:text-white text-sm" },
                                toDisplayString(customer.fullName),
                                1
                                /* TEXT */
                              ),
                              createVNode(
                                "p",
                                { class: "text-xs text-slate-500 dark:text-slate-400" },
                                toDisplayString(customer.email),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          __props.selectedCustomerId === customer.id ? (openBlock(), createBlock(_component_UIcon, {
                            key: 0,
                            name: "i-heroicons-check-circle",
                            class: "w-5 h-5 text-violet-500"
                          })) : createCommentVNode("v-if", true)
                        ], 10, ["onClick"]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])) : __props.searchQuery.length >= 2 ? (openBlock(), createBlock("div", {
                    key: 2,
                    class: "py-4 text-center text-slate-500 dark:text-slate-400"
                  }, " Tidak ada customer ditemukan ")) : createCommentVNode("v-if", true)
                ]),
                createVNode("div", { class: "flex justify-end gap-3 mt-6" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: handleClose
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_UButton, {
                    color: "primary",
                    loading: __props.isCreating,
                    disabled: !__props.selectedCustomerId,
                    onClick: ($event) => emit("confirm")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Buat Affiliate ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading", "disabled", "onClick"])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/network/CreateAffiliateModal.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "NetworkTreeModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    affiliate: {},
    networkTree: {},
    networkStats: {},
    isLoading: { type: Boolean }
  },
  emits: ["update:open"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const handleOpenChange = (value) => {
      if (!value) {
        setTimeout(() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }, 0);
      }
      emit("update:open", value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$d;
      const _component_UButton = _sfc_main$b;
      const _component_UIcon = _sfc_main$9;
      const _component_UBadge = _sfc_main$a;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        ui: { width: "max-w-4xl" },
        title: "Network Tree",
        description: "Visualisasi struktur tree network MLM",
        "onUpdate:open": handleOpenChange
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6"${_scopeId}><div class="flex items-center justify-between mb-4"${_scopeId}><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}> Network Tree: ${ssrInterpolate(__props.affiliate?.customerName)}</h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}> Kode: ${ssrInterpolate(__props.affiliate?.referralCode)}</p></div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-x-mark",
              color: "neutral",
              variant: "ghost",
              onClick: ($event) => handleOpenChange(false)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
            if (__props.isLoading) {
              _push2(`<div class="flex justify-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-8 h-8 text-violet-500 animate-spin"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (__props.networkStats) {
              _push2(`<div class="space-y-4"${_scopeId}><!-- Stats --><div class="grid grid-cols-3 gap-4"${_scopeId}><div class="bg-cyan-50 dark:bg-cyan-500/10 rounded-lg p-3 text-center"${_scopeId}><p class="text-2xl font-bold text-cyan-600 dark:text-cyan-400"${_scopeId}>${ssrInterpolate(__props.networkStats.level1Count)}</p><p class="text-xs text-slate-600 dark:text-slate-400"${_scopeId}>Level 1</p></div><div class="bg-purple-50 dark:bg-purple-500/10 rounded-lg p-3 text-center"${_scopeId}><p class="text-2xl font-bold text-purple-600 dark:text-purple-400"${_scopeId}>${ssrInterpolate(__props.networkStats.level2Count)}</p><p class="text-xs text-slate-600 dark:text-slate-400"${_scopeId}>Level 2</p></div><div class="bg-amber-50 dark:bg-amber-500/10 rounded-lg p-3 text-center"${_scopeId}><p class="text-2xl font-bold text-amber-600 dark:text-amber-400"${_scopeId}>${ssrInterpolate(__props.networkStats.level3Count)}</p><p class="text-xs text-slate-600 dark:text-slate-400"${_scopeId}>Level 3</p></div></div><!-- Tree visualization -->`);
              if (__props.networkTree && __props.networkTree.nodes.length > 0) {
                _push2(`<div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-4"${_scopeId}><div class="space-y-4"${_scopeId}><!-- Root node --><div class="flex justify-center"${_scopeId}><div class="flex flex-col items-center"${_scopeId}><div class="w-16 h-16 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg"${_scopeId}>${ssrInterpolate(__props.affiliate?.customerName?.charAt(0) || "Y")}</div><p class="mt-2 text-sm font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.affiliate?.customerName)}</p><p class="text-xs text-slate-500"${_scopeId}>Root</p></div></div><!-- Level 1 -->`);
                if (__props.networkTree.nodes.filter((n) => n.level === 1).length > 0) {
                  _push2(`<div${_scopeId}><div class="h-8 flex justify-center"${_scopeId}><div class="w-px bg-slate-300 dark:bg-slate-600"${_scopeId}></div></div><div class="flex justify-center gap-4 flex-wrap"${_scopeId}><!--[-->`);
                  ssrRenderList(__props.networkTree.nodes.filter((n) => n.level === 1), (node) => {
                    _push2(`<div class="flex flex-col items-center"${_scopeId}><div class="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md" style="${ssrRenderStyle({
                      background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`
                    })}"${_scopeId}>${ssrInterpolate(node.text)}</div><p class="mt-1 text-xs font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(node.customerName)}</p>`);
                    _push2(ssrRenderComponent(_component_UBadge, {
                      color: node.status === "active" ? "success" : "neutral",
                      variant: "subtle",
                      size: "xs"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(node.status)}`);
                        } else {
                          return [
                            createTextVNode(
                              toDisplayString(node.status),
                              1
                              /* TEXT */
                            )
                          ];
                        }
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, _parent2, _scopeId));
                    _push2(`</div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!-- Level 2 -->`);
                if (__props.networkTree.nodes.filter((n) => n.level === 2).length > 0) {
                  _push2(`<div${_scopeId}><div class="h-8 flex justify-center"${_scopeId}><div class="w-px bg-slate-300 dark:bg-slate-600"${_scopeId}></div></div><div class="flex justify-center gap-3 flex-wrap"${_scopeId}><!--[-->`);
                  ssrRenderList(__props.networkTree.nodes.filter((n) => n.level === 2), (node) => {
                    _push2(`<div class="flex flex-col items-center"${_scopeId}><div class="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md" style="${ssrRenderStyle({
                      background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`
                    })}"${_scopeId}>${ssrInterpolate(node.text)}</div><p class="mt-1 text-xs text-slate-700 dark:text-slate-300"${_scopeId}>${ssrInterpolate(node.customerName)}</p></div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!-- Level 3 -->`);
                if (__props.networkTree.nodes.filter((n) => n.level === 3).length > 0) {
                  _push2(`<div${_scopeId}><div class="h-8 flex justify-center"${_scopeId}><div class="w-px bg-slate-300 dark:bg-slate-600"${_scopeId}></div></div><div class="flex justify-center gap-2 flex-wrap"${_scopeId}><!--[-->`);
                  ssrRenderList(__props.networkTree.nodes.filter((n) => n.level === 3), (node) => {
                    _push2(`<div class="flex flex-col items-center"${_scopeId}><div class="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md" style="${ssrRenderStyle({
                      background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`
                    })}"${_scopeId}>${ssrInterpolate(node.text)}</div><p class="mt-1 text-xs text-slate-600 dark:text-slate-400"${_scopeId}>${ssrInterpolate(node.customerName)}</p></div>`);
                  });
                  _push2(`<!--]--></div></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div>`);
              } else {
                _push2(`<div class="bg-slate-50 dark:bg-slate-800 rounded-lg p-8 text-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-user-group",
                  class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                }, null, _parent2, _scopeId));
                _push2(`<p class="text-slate-500 dark:text-slate-400"${_scopeId}>Belum ada member di tree ini</p></div>`);
              }
              _push2(`<!-- Total value --><div class="flex items-center justify-between bg-emerald-50 dark:bg-emerald-500/10 rounded-lg p-4"${_scopeId}><span class="text-sm text-slate-600 dark:text-slate-400"${_scopeId}>Total Nilai Network</span><span class="text-lg font-bold text-emerald-600 dark:text-emerald-400"${_scopeId}>${ssrInterpolate(formatCurrency(__props.networkStats.totalNetworkValue))}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-6" }, [
                createVNode("div", { class: "flex items-center justify-between mb-4" }, [
                  createVNode("div", null, [
                    createVNode(
                      "h3",
                      { class: "text-lg font-semibold text-slate-900 dark:text-white" },
                      " Network Tree: " + toDisplayString(__props.affiliate?.customerName),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-sm text-slate-500 dark:text-slate-400" },
                      " Kode: " + toDisplayString(__props.affiliate?.referralCode),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode(_component_UButton, {
                    icon: "i-heroicons-x-mark",
                    color: "neutral",
                    variant: "ghost",
                    onClick: ($event) => handleOpenChange(false)
                  }, null, 8, ["onClick"])
                ]),
                __props.isLoading ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex justify-center py-12"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "w-8 h-8 text-violet-500 animate-spin"
                  })
                ])) : __props.networkStats ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-4"
                }, [
                  createCommentVNode(" Stats "),
                  createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                    createVNode("div", { class: "bg-cyan-50 dark:bg-cyan-500/10 rounded-lg p-3 text-center" }, [
                      createVNode(
                        "p",
                        { class: "text-2xl font-bold text-cyan-600 dark:text-cyan-400" },
                        toDisplayString(__props.networkStats.level1Count),
                        1
                        /* TEXT */
                      ),
                      createVNode("p", { class: "text-xs text-slate-600 dark:text-slate-400" }, "Level 1")
                    ]),
                    createVNode("div", { class: "bg-purple-50 dark:bg-purple-500/10 rounded-lg p-3 text-center" }, [
                      createVNode(
                        "p",
                        { class: "text-2xl font-bold text-purple-600 dark:text-purple-400" },
                        toDisplayString(__props.networkStats.level2Count),
                        1
                        /* TEXT */
                      ),
                      createVNode("p", { class: "text-xs text-slate-600 dark:text-slate-400" }, "Level 2")
                    ]),
                    createVNode("div", { class: "bg-amber-50 dark:bg-amber-500/10 rounded-lg p-3 text-center" }, [
                      createVNode(
                        "p",
                        { class: "text-2xl font-bold text-amber-600 dark:text-amber-400" },
                        toDisplayString(__props.networkStats.level3Count),
                        1
                        /* TEXT */
                      ),
                      createVNode("p", { class: "text-xs text-slate-600 dark:text-slate-400" }, "Level 3")
                    ])
                  ]),
                  createCommentVNode(" Tree visualization "),
                  __props.networkTree && __props.networkTree.nodes.length > 0 ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "bg-slate-50 dark:bg-slate-800 rounded-lg p-4"
                  }, [
                    createVNode("div", { class: "space-y-4" }, [
                      createCommentVNode(" Root node "),
                      createVNode("div", { class: "flex justify-center" }, [
                        createVNode("div", { class: "flex flex-col items-center" }, [
                          createVNode(
                            "div",
                            { class: "w-16 h-16 rounded-full bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg" },
                            toDisplayString(__props.affiliate?.customerName?.charAt(0) || "Y"),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "p",
                            { class: "mt-2 text-sm font-medium text-slate-900 dark:text-white" },
                            toDisplayString(__props.affiliate?.customerName),
                            1
                            /* TEXT */
                          ),
                          createVNode("p", { class: "text-xs text-slate-500" }, "Root")
                        ])
                      ]),
                      createCommentVNode(" Level 1 "),
                      __props.networkTree.nodes.filter((n) => n.level === 1).length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode("div", { class: "h-8 flex justify-center" }, [
                          createVNode("div", { class: "w-px bg-slate-300 dark:bg-slate-600" })
                        ]),
                        createVNode("div", { class: "flex justify-center gap-4 flex-wrap" }, [
                          (openBlock(true), createBlock(
                            Fragment,
                            null,
                            renderList(__props.networkTree.nodes.filter((n) => n.level === 1), (node) => {
                              return openBlock(), createBlock("div", {
                                key: node.key,
                                class: "flex flex-col items-center"
                              }, [
                                createVNode(
                                  "div",
                                  {
                                    class: "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md",
                                    style: {
                                      background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`
                                    }
                                  },
                                  toDisplayString(node.text),
                                  5
                                  /* TEXT, STYLE */
                                ),
                                createVNode(
                                  "p",
                                  { class: "mt-1 text-xs font-medium text-slate-900 dark:text-white" },
                                  toDisplayString(node.customerName),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(_component_UBadge, {
                                  color: node.status === "active" ? "success" : "neutral",
                                  variant: "subtle",
                                  size: "xs"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      toDisplayString(node.status),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                }, 1032, ["color"])
                              ]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Level 2 "),
                      __props.networkTree.nodes.filter((n) => n.level === 2).length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode("div", { class: "h-8 flex justify-center" }, [
                          createVNode("div", { class: "w-px bg-slate-300 dark:bg-slate-600" })
                        ]),
                        createVNode("div", { class: "flex justify-center gap-3 flex-wrap" }, [
                          (openBlock(true), createBlock(
                            Fragment,
                            null,
                            renderList(__props.networkTree.nodes.filter((n) => n.level === 2), (node) => {
                              return openBlock(), createBlock("div", {
                                key: node.key,
                                class: "flex flex-col items-center"
                              }, [
                                createVNode(
                                  "div",
                                  {
                                    class: "w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md",
                                    style: {
                                      background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`
                                    }
                                  },
                                  toDisplayString(node.text),
                                  5
                                  /* TEXT, STYLE */
                                ),
                                createVNode(
                                  "p",
                                  { class: "mt-1 text-xs text-slate-700 dark:text-slate-300" },
                                  toDisplayString(node.customerName),
                                  1
                                  /* TEXT */
                                )
                              ]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Level 3 "),
                      __props.networkTree.nodes.filter((n) => n.level === 3).length > 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                        createVNode("div", { class: "h-8 flex justify-center" }, [
                          createVNode("div", { class: "w-px bg-slate-300 dark:bg-slate-600" })
                        ]),
                        createVNode("div", { class: "flex justify-center gap-2 flex-wrap" }, [
                          (openBlock(true), createBlock(
                            Fragment,
                            null,
                            renderList(__props.networkTree.nodes.filter((n) => n.level === 3), (node) => {
                              return openBlock(), createBlock("div", {
                                key: node.key,
                                class: "flex flex-col items-center"
                              }, [
                                createVNode(
                                  "div",
                                  {
                                    class: "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-md",
                                    style: {
                                      background: `linear-gradient(135deg, ${node.gradientStart}, ${node.gradientEnd})`
                                    }
                                  },
                                  toDisplayString(node.text),
                                  5
                                  /* TEXT, STYLE */
                                ),
                                createVNode(
                                  "p",
                                  { class: "mt-1 text-xs text-slate-600 dark:text-slate-400" },
                                  toDisplayString(node.customerName),
                                  1
                                  /* TEXT */
                                )
                              ]);
                            }),
                            128
                            /* KEYED_FRAGMENT */
                          ))
                        ])
                      ])) : createCommentVNode("v-if", true)
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "bg-slate-50 dark:bg-slate-800 rounded-lg p-8 text-center"
                  }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-user-group",
                      class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                    }),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400" }, "Belum ada member di tree ini")
                  ])),
                  createCommentVNode(" Total value "),
                  createVNode("div", { class: "flex items-center justify-between bg-emerald-50 dark:bg-emerald-500/10 rounded-lg p-4" }, [
                    createVNode("span", { class: "text-sm text-slate-600 dark:text-slate-400" }, "Total Nilai Network"),
                    createVNode(
                      "span",
                      { class: "text-lg font-bold text-emerald-600 dark:text-emerald-400" },
                      toDisplayString(formatCurrency(__props.networkStats.totalNetworkValue)),
                      1
                      /* TEXT */
                    )
                  ])
                ])) : createCommentVNode("v-if", true)
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/network/NetworkTreeModal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "SetupReferralCodeModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    affiliate: {},
    affiliatedCustomersData: {},
    selectedCustomers: {},
    customReferralCode: {},
    isLoading: { type: Boolean },
    isSettingUp: { type: Boolean }
  },
  emits: ["update:open", "update:customReferralCode", "setupReferralCode", "bulkSetupReferralCodes", "toggleSelection", "selectAll", "close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const isAllSelected = () => {
      if (!props.affiliatedCustomersData) return false;
      return props.selectedCustomers.length === props.affiliatedCustomersData.withoutReferralCode.length && props.selectedCustomers.length > 0;
    };
    const singleCustomerCustomCode = ref({});
    const handleSingleSetup = (customerId) => {
      const customCode = singleCustomerCustomCode.value[customerId];
      emit("setupReferralCode", customerId, customCode || void 0);
      singleCustomerCustomCode.value[customerId] = "";
    };
    const handleClose = () => {
      setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }, 0);
      emit("close");
    };
    const handleOpenChange = (value) => {
      if (!value) {
        setTimeout(() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }, 0);
      }
      emit("update:open", value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$d;
      const _component_UIcon = _sfc_main$9;
      const _component_UButton = _sfc_main$b;
      const _component_UCheckbox = _sfc_main$c;
      const _component_UBadge = _sfc_main$a;
      const _component_UInput = _sfc_main$e;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        title: "Setup Kode Referral",
        description: "Buat kode referral untuk customer yang terafiliasi",
        ui: { width: "max-w-4xl" },
        "onUpdate:open": handleOpenChange
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.isLoading) {
              _push2(`<div class="py-12 flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-8 h-8 text-violet-500 animate-spin"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (__props.affiliatedCustomersData) {
              _push2(`<div class="space-y-6"${_scopeId}><!-- Stats --><div class="grid grid-cols-3 gap-4"${_scopeId}><div class="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.affiliatedCustomersData.stats.total)}</div><div class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>Total Member</div></div><div class="bg-emerald-100 dark:bg-emerald-500/20 rounded-lg p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-emerald-600 dark:text-emerald-400"${_scopeId}>${ssrInterpolate(__props.affiliatedCustomersData.stats.withCode)}</div><div class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>Sudah Punya Kode</div></div><div class="bg-amber-100 dark:bg-amber-500/20 rounded-lg p-4 text-center"${_scopeId}><div class="text-2xl font-bold text-amber-600 dark:text-amber-400"${_scopeId}>${ssrInterpolate(__props.affiliatedCustomersData.stats.withoutCode)}</div><div class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>Belum Punya Kode</div></div></div><!-- Customers without referral code -->`);
              if (__props.affiliatedCustomersData.withoutReferralCode.length > 0) {
                _push2(`<div${_scopeId}><div class="flex items-center justify-between mb-3"${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}> Customer Belum Punya Kode Referral </h3><div class="flex items-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UButton, {
                  variant: "ghost",
                  size: "xs",
                  onClick: ($event) => emit("selectAll")
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(isAllSelected() ? "Batal Pilih Semua" : "Pilih Semua")}`);
                    } else {
                      return [
                        createTextVNode(
                          toDisplayString(isAllSelected() ? "Batal Pilih Semua" : "Pilih Semua"),
                          1
                          /* TEXT */
                        )
                      ];
                    }
                  }),
                  _: 1
                  /* STABLE */
                }, _parent2, _scopeId));
                if (__props.selectedCustomers.length > 0) {
                  _push2(ssrRenderComponent(_component_UButton, {
                    color: "primary",
                    size: "sm",
                    loading: __props.isSettingUp,
                    onClick: ($event) => emit("bulkSetupReferralCodes")
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-sparkles",
                          class: "w-4 h-4 mr-1"
                        }, null, _parent3, _scopeId2));
                        _push3(` Generate ${ssrInterpolate(__props.selectedCustomers.length)} Kode `);
                      } else {
                        return [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-sparkles",
                            class: "w-4 h-4 mr-1"
                          }),
                          createTextVNode(
                            " Generate " + toDisplayString(__props.selectedCustomers.length) + " Kode ",
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></div><div class="space-y-2 max-h-64 overflow-y-auto"${_scopeId}><!--[-->`);
                ssrRenderList(__props.affiliatedCustomersData.withoutReferralCode, (customer) => {
                  _push2(`<div class="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UCheckbox, {
                    "model-value": __props.selectedCustomers.includes(customer.id),
                    "onUpdate:modelValue": ($event) => emit("toggleSelection", customer.id)
                  }, null, _parent2, _scopeId));
                  _push2(`<div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden"${_scopeId}>`);
                  if (customer.avatar) {
                    _push2(`<img${ssrRenderAttr("src", customer.avatar)}${ssrRenderAttr("alt", customer.fullName)} class="w-full h-full object-cover"${_scopeId}>`);
                  } else {
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-user",
                      class: "w-5 h-5 text-slate-500"
                    }, null, _parent2, _scopeId));
                  }
                  _push2(`</div><div${_scopeId}><div class="font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(customer.fullName)}</div><div class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(customer.email)}</div><div class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "violet",
                    variant: "subtle",
                    size: "xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Level ${ssrInterpolate(customer.level || "-")}`);
                      } else {
                        return [
                          createTextVNode(
                            " Level " + toDisplayString(customer.level || "-"),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                  if (customer.totalOrdersCount) {
                    _push2(`<span${_scopeId}>${ssrInterpolate(customer.totalOrdersCount)} orders</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  if (customer.totalSpent) {
                    _push2(`<span${_scopeId}>${ssrInterpolate(formatCurrency(customer.totalSpent))}</span>`);
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div></div><div class="flex items-center gap-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UInput, {
                    modelValue: singleCustomerCustomCode.value[customer.id],
                    "onUpdate:modelValue": ($event) => singleCustomerCustomCode.value[customer.id] = $event,
                    placeholder: "Kode custom (opsional)",
                    size: "sm",
                    class: "w-40"
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_UButton, {
                    icon: "i-heroicons-sparkles",
                    color: "primary",
                    size: "sm",
                    loading: __props.isSettingUp,
                    onClick: ($event) => handleSingleSetup(customer.id)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Generate `);
                      } else {
                        return [
                          createTextVNode(" Generate ")
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!-- Customers with referral code -->`);
              if (__props.affiliatedCustomersData.withReferralCode.length > 0) {
                _push2(`<div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-3"${_scopeId}> Customer Sudah Punya Kode Referral </h3><div class="space-y-2 max-h-64 overflow-y-auto"${_scopeId}><!--[-->`);
                ssrRenderList(__props.affiliatedCustomersData.withReferralCode, (customer) => {
                  _push2(`<div class="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden"${_scopeId}>`);
                  if (customer.avatar) {
                    _push2(`<img${ssrRenderAttr("src", customer.avatar)}${ssrRenderAttr("alt", customer.fullName)} class="w-full h-full object-cover"${_scopeId}>`);
                  } else {
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-user",
                      class: "w-5 h-5 text-slate-500"
                    }, null, _parent2, _scopeId));
                  }
                  _push2(`</div><div${_scopeId}><div class="font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(customer.fullName)}</div><div class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(customer.email)}</div></div></div><div class="flex items-center gap-3"${_scopeId}><div class="text-right"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "emerald",
                    variant: "soft",
                    size: "sm"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(customer.referralCode)}`);
                      } else {
                        return [
                          createTextVNode(
                            toDisplayString(customer.referralCode),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "violet",
                    variant: "subtle",
                    size: "xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` Level ${ssrInterpolate(customer.level)}`);
                      } else {
                        return [
                          createTextVNode(
                            " Level " + toDisplayString(customer.level),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                  _push2(`</div><div class="text-xs text-slate-500 dark:text-slate-400 mt-1"${_scopeId}>${ssrInterpolate(customer.totalReferrals)} referral • ${ssrInterpolate(formatCurrency(customer.totalEarnings))} earnings </div></div>`);
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: customer.isActive ? "emerald" : "gray",
                    variant: "subtle",
                    size: "xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(customer.isActive ? "Aktif" : "Nonaktif")}`);
                      } else {
                        return [
                          createTextVNode(
                            toDisplayString(customer.isActive ? "Aktif" : "Nonaktif"),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!-- Empty state -->`);
              if (__props.affiliatedCustomersData.customers.length === 0) {
                _push2(`<div class="py-8 text-center text-slate-500 dark:text-slate-400"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-users",
                  class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                }, null, _parent2, _scopeId));
                _push2(`<p${_scopeId}>Belum ada member terafiliasi di tree ini</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.isLoading ? (openBlock(), createBlock("div", {
                key: 0,
                class: "py-12 flex items-center justify-center"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-8 h-8 text-violet-500 animate-spin"
                })
              ])) : __props.affiliatedCustomersData ? (openBlock(), createBlock("div", {
                key: 1,
                class: "space-y-6"
              }, [
                createCommentVNode(" Stats "),
                createVNode("div", { class: "grid grid-cols-3 gap-4" }, [
                  createVNode("div", { class: "bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-center" }, [
                    createVNode(
                      "div",
                      { class: "text-2xl font-bold text-slate-900 dark:text-white" },
                      toDisplayString(__props.affiliatedCustomersData.stats.total),
                      1
                      /* TEXT */
                    ),
                    createVNode("div", { class: "text-sm text-slate-500 dark:text-slate-400" }, "Total Member")
                  ]),
                  createVNode("div", { class: "bg-emerald-100 dark:bg-emerald-500/20 rounded-lg p-4 text-center" }, [
                    createVNode(
                      "div",
                      { class: "text-2xl font-bold text-emerald-600 dark:text-emerald-400" },
                      toDisplayString(__props.affiliatedCustomersData.stats.withCode),
                      1
                      /* TEXT */
                    ),
                    createVNode("div", { class: "text-sm text-slate-500 dark:text-slate-400" }, "Sudah Punya Kode")
                  ]),
                  createVNode("div", { class: "bg-amber-100 dark:bg-amber-500/20 rounded-lg p-4 text-center" }, [
                    createVNode(
                      "div",
                      { class: "text-2xl font-bold text-amber-600 dark:text-amber-400" },
                      toDisplayString(__props.affiliatedCustomersData.stats.withoutCode),
                      1
                      /* TEXT */
                    ),
                    createVNode("div", { class: "text-sm text-slate-500 dark:text-slate-400" }, "Belum Punya Kode")
                  ])
                ]),
                createCommentVNode(" Customers without referral code "),
                __props.affiliatedCustomersData.withoutReferralCode.length > 0 ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, " Customer Belum Punya Kode Referral "),
                    createVNode("div", { class: "flex items-center gap-2" }, [
                      createVNode(_component_UButton, {
                        variant: "ghost",
                        size: "xs",
                        onClick: ($event) => emit("selectAll")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(isAllSelected() ? "Batal Pilih Semua" : "Pilih Semua"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["onClick"]),
                      __props.selectedCustomers.length > 0 ? (openBlock(), createBlock(_component_UButton, {
                        key: 0,
                        color: "primary",
                        size: "sm",
                        loading: __props.isSettingUp,
                        onClick: ($event) => emit("bulkSetupReferralCodes")
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-sparkles",
                            class: "w-4 h-4 mr-1"
                          }),
                          createTextVNode(
                            " Generate " + toDisplayString(__props.selectedCustomers.length) + " Kode ",
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["loading", "onClick"])) : createCommentVNode("v-if", true)
                    ])
                  ]),
                  createVNode("div", { class: "space-y-2 max-h-64 overflow-y-auto" }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.affiliatedCustomersData.withoutReferralCode, (customer) => {
                        return openBlock(), createBlock("div", {
                          key: customer.id,
                          class: "flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg"
                        }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode(_component_UCheckbox, {
                              "model-value": __props.selectedCustomers.includes(customer.id),
                              "onUpdate:modelValue": ($event) => emit("toggleSelection", customer.id)
                            }, null, 8, ["model-value", "onUpdate:modelValue"]),
                            createVNode("div", { class: "w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden" }, [
                              customer.avatar ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: customer.avatar,
                                alt: customer.fullName,
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                key: 1,
                                name: "i-heroicons-user",
                                class: "w-5 h-5 text-slate-500"
                              }))
                            ]),
                            createVNode("div", null, [
                              createVNode(
                                "div",
                                { class: "font-medium text-slate-900 dark:text-white" },
                                toDisplayString(customer.fullName),
                                1
                                /* TEXT */
                              ),
                              createVNode(
                                "div",
                                { class: "text-sm text-slate-500 dark:text-slate-400" },
                                toDisplayString(customer.email),
                                1
                                /* TEXT */
                              ),
                              createVNode("div", { class: "flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400" }, [
                                createVNode(
                                  _component_UBadge,
                                  {
                                    color: "violet",
                                    variant: "subtle",
                                    size: "xs"
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        " Level " + toDisplayString(customer.level || "-"),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                ),
                                customer.totalOrdersCount ? (openBlock(), createBlock(
                                  "span",
                                  { key: 0 },
                                  toDisplayString(customer.totalOrdersCount) + " orders",
                                  1
                                  /* TEXT */
                                )) : createCommentVNode("v-if", true),
                                customer.totalSpent ? (openBlock(), createBlock(
                                  "span",
                                  { key: 1 },
                                  toDisplayString(formatCurrency(customer.totalSpent)),
                                  1
                                  /* TEXT */
                                )) : createCommentVNode("v-if", true)
                              ])
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-2" }, [
                            createVNode(_component_UInput, {
                              modelValue: singleCustomerCustomCode.value[customer.id],
                              "onUpdate:modelValue": ($event) => singleCustomerCustomCode.value[customer.id] = $event,
                              placeholder: "Kode custom (opsional)",
                              size: "sm",
                              class: "w-40"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(_component_UButton, {
                              icon: "i-heroicons-sparkles",
                              color: "primary",
                              size: "sm",
                              loading: __props.isSettingUp,
                              onClick: ($event) => handleSingleSetup(customer.id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Generate ")
                              ]),
                              _: 1
                              /* STABLE */
                            }, 8, ["loading", "onClick"])
                          ])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" Customers with referral code "),
                __props.affiliatedCustomersData.withReferralCode.length > 0 ? (openBlock(), createBlock("div", { key: 1 }, [
                  createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white mb-3" }, " Customer Sudah Punya Kode Referral "),
                  createVNode("div", { class: "space-y-2 max-h-64 overflow-y-auto" }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.affiliatedCustomersData.withReferralCode, (customer) => {
                        return openBlock(), createBlock("div", {
                          key: customer.id,
                          class: "flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-lg"
                        }, [
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden" }, [
                              customer.avatar ? (openBlock(), createBlock("img", {
                                key: 0,
                                src: customer.avatar,
                                alt: customer.fullName,
                                class: "w-full h-full object-cover"
                              }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                key: 1,
                                name: "i-heroicons-user",
                                class: "w-5 h-5 text-slate-500"
                              }))
                            ]),
                            createVNode("div", null, [
                              createVNode(
                                "div",
                                { class: "font-medium text-slate-900 dark:text-white" },
                                toDisplayString(customer.fullName),
                                1
                                /* TEXT */
                              ),
                              createVNode(
                                "div",
                                { class: "text-sm text-slate-500 dark:text-slate-400" },
                                toDisplayString(customer.email),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          createVNode("div", { class: "flex items-center gap-3" }, [
                            createVNode("div", { class: "text-right" }, [
                              createVNode("div", { class: "flex items-center gap-2" }, [
                                createVNode(
                                  _component_UBadge,
                                  {
                                    color: "emerald",
                                    variant: "soft",
                                    size: "sm"
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(customer.referralCode),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                ),
                                createVNode(
                                  _component_UBadge,
                                  {
                                    color: "violet",
                                    variant: "subtle",
                                    size: "xs"
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        " Level " + toDisplayString(customer.level),
                                        1
                                        /* TEXT */
                                      )
                                    ]),
                                    _: 2
                                    /* DYNAMIC */
                                  },
                                  1024
                                  /* DYNAMIC_SLOTS */
                                )
                              ]),
                              createVNode(
                                "div",
                                { class: "text-xs text-slate-500 dark:text-slate-400 mt-1" },
                                toDisplayString(customer.totalReferrals) + " referral • " + toDisplayString(formatCurrency(customer.totalEarnings)) + " earnings ",
                                1
                                /* TEXT */
                              )
                            ]),
                            createVNode(_component_UBadge, {
                              color: customer.isActive ? "emerald" : "gray",
                              variant: "subtle",
                              size: "xs"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(customer.isActive ? "Aktif" : "Nonaktif"),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["color"])
                          ])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])) : createCommentVNode("v-if", true),
                createCommentVNode(" Empty state "),
                __props.affiliatedCustomersData.customers.length === 0 ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "py-8 text-center text-slate-500 dark:text-slate-400"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-users",
                    class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                  }),
                  createVNode("p", null, "Belum ada member terafiliasi di tree ini")
                ])) : createCommentVNode("v-if", true)
              ])) : createCommentVNode("v-if", true)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "gray",
              variant: "ghost",
              onClick: handleClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tutup `);
                } else {
                  return [
                    createTextVNode(" Tutup ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-3" }, [
                createVNode(_component_UButton, {
                  color: "gray",
                  variant: "ghost",
                  onClick: handleClose
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Tutup ")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/network/SetupReferralCodeModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AddMemberToTreeModal",
  __ssrInlineRender: true,
  props: {
    open: { type: Boolean },
    affiliate: {},
    searchQuery: {},
    customers: {},
    selectedCustomerId: {},
    selectedLevel: {},
    isSearching: { type: Boolean },
    isAdding: { type: Boolean }
  },
  emits: ["update:open", "update:searchQuery", "update:selectedCustomerId", "update:selectedLevel", "confirm", "close"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const levelOptions = [
      { label: "Level 1 (Langsung)", value: 1 },
      { label: "Level 2", value: 2 },
      { label: "Level 3", value: 3 }
    ];
    const handleClose = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      emit("close");
    };
    const handleOpenChange = (value) => {
      if (!value) {
        setTimeout(() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }, 0);
      }
      emit("update:open", value);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$d;
      const _component_UIcon = _sfc_main$9;
      const _component_UInput = _sfc_main$e;
      const _component_USelect = _sfc_main$f;
      const _component_UBadge = _sfc_main$a;
      const _component_UButton = _sfc_main$b;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: __props.open,
        title: "Tambah Member ke Tree",
        description: __props.affiliate ? `Tambahkan customer ke tree network ${__props.affiliate.customerName}` : "Pilih affiliate terlebih dahulu",
        ui: { width: "max-w-2xl" },
        "onUpdate:open": handleOpenChange
      }, _attrs), {
        body: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!__props.affiliate) {
              _push2(`<div class="py-8 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-exclamation-triangle",
                class: "w-12 h-12 text-amber-500 mx-auto mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-slate-500 dark:text-slate-400"${_scopeId}>Pilih affiliate terlebih dahulu dari daftar</p></div>`);
            } else {
              _push2(`<div class="space-y-4"${_scopeId}><!-- Search Input --><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"${_scopeId}> Cari Customer </label>`);
              _push2(ssrRenderComponent(_component_UInput, {
                "model-value": __props.searchQuery,
                placeholder: "Ketik nama, email, atau nomor telepon...",
                icon: "i-heroicons-magnifying-glass",
                class: "w-full",
                "onUpdate:modelValue": ($event) => emit("update:searchQuery", $event)
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-xs text-slate-500 mt-1"${_scopeId}>Minimal 2 karakter untuk memulai pencarian</p></div><!-- Level Selection --><div${_scopeId}><label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"${_scopeId}> Pilih Level </label>`);
              _push2(ssrRenderComponent(_component_USelect, {
                "model-value": __props.selectedLevel,
                items: levelOptions,
                placeholder: "Pilih level",
                class: "w-full",
                "onUpdate:modelValue": ($event) => emit("update:selectedLevel", $event)
              }, null, _parent2, _scopeId));
              _push2(`</div><!-- Loading State -->`);
              if (__props.isSearching) {
                _push2(`<div class="flex justify-center py-8"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-8 h-8 text-violet-500 animate-spin"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else if (__props.customers.length > 0) {
                _push2(`<!--[--><!-- Customer Results --><div class="space-y-2 max-h-80 overflow-y-auto"${_scopeId}><!--[-->`);
                ssrRenderList(__props.customers, (customer) => {
                  _push2(`<div class="${ssrRenderClass([[
                    __props.selectedCustomerId === customer.id ? "bg-violet-100 dark:bg-violet-500/20 border-2 border-violet-500" : customer.isInTree ? "bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed" : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-transparent"
                  ], "flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors"])}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden"${_scopeId}>`);
                  if (customer.avatar) {
                    _push2(`<img${ssrRenderAttr("src", customer.avatar)}${ssrRenderAttr("alt", customer.fullName)} class="w-full h-full object-cover"${_scopeId}>`);
                  } else {
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-user",
                      class: "w-5 h-5 text-slate-500"
                    }, null, _parent2, _scopeId));
                  }
                  _push2(`</div><div${_scopeId}><p class="font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(customer.fullName)}</p><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(customer.email)}</p><div class="flex items-center gap-2 mt-1"${_scopeId}><span class="text-xs text-slate-500"${_scopeId}>${ssrInterpolate(customer.totalOrdersCount)} orders</span><span class="text-xs text-emerald-600"${_scopeId}>${ssrInterpolate(formatCurrency(customer.totalSpent))}</span></div></div></div><div class="flex items-center gap-2"${_scopeId}>`);
                  if (customer.isInTree) {
                    _push2(ssrRenderComponent(_component_UBadge, {
                      color: "gray",
                      variant: "subtle",
                      size: "xs"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(` Sudah di Tree `);
                        } else {
                          return [
                            createTextVNode(" Sudah di Tree ")
                          ];
                        }
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, _parent2, _scopeId));
                  } else if (customer.hasAffiliate) {
                    _push2(ssrRenderComponent(_component_UBadge, {
                      color: "violet",
                      variant: "subtle",
                      size: "xs"
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(` Punya Kode Referral `);
                        } else {
                          return [
                            createTextVNode(" Punya Kode Referral ")
                          ];
                        }
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  if (__props.selectedCustomerId === customer.id) {
                    _push2(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-check-circle-solid",
                      class: "w-6 h-6 text-violet-500"
                    }, null, _parent2, _scopeId));
                  } else {
                    _push2(`<!---->`);
                  }
                  _push2(`</div></div>`);
                });
                _push2(`<!--]--></div><!--]-->`);
              } else if (__props.searchQuery.length >= 2) {
                _push2(`<!--[--><!-- Empty State --><div class="py-8 text-center text-slate-500 dark:text-slate-400"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-user-group",
                  class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                }, null, _parent2, _scopeId));
                _push2(`<p${_scopeId}>Tidak ada customer ditemukan</p></div><!--]-->`);
              } else {
                _push2(`<!--[--><!-- Initial State --><div class="py-8 text-center text-slate-500 dark:text-slate-400"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-magnifying-glass",
                  class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                }, null, _parent2, _scopeId));
                _push2(`<p${_scopeId}>Ketik untuk mencari customer</p></div><!--]-->`);
              }
              _push2(`</div>`);
            }
          } else {
            return [
              !__props.affiliate ? (openBlock(), createBlock("div", {
                key: 0,
                class: "py-8 text-center"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-exclamation-triangle",
                  class: "w-12 h-12 text-amber-500 mx-auto mb-4"
                }),
                createVNode("p", { class: "text-slate-500 dark:text-slate-400" }, "Pilih affiliate terlebih dahulu dari daftar")
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "space-y-4"
              }, [
                createCommentVNode(" Search Input "),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" }, " Cari Customer "),
                  createVNode(_component_UInput, {
                    "model-value": __props.searchQuery,
                    placeholder: "Ketik nama, email, atau nomor telepon...",
                    icon: "i-heroicons-magnifying-glass",
                    class: "w-full",
                    "onUpdate:modelValue": ($event) => emit("update:searchQuery", $event)
                  }, null, 8, ["model-value", "onUpdate:modelValue"]),
                  createVNode("p", { class: "text-xs text-slate-500 mt-1" }, "Minimal 2 karakter untuk memulai pencarian")
                ]),
                createCommentVNode(" Level Selection "),
                createVNode("div", null, [
                  createVNode("label", { class: "block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2" }, " Pilih Level "),
                  createVNode(_component_USelect, {
                    "model-value": __props.selectedLevel,
                    items: levelOptions,
                    placeholder: "Pilih level",
                    class: "w-full",
                    "onUpdate:modelValue": ($event) => emit("update:selectedLevel", $event)
                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                ]),
                createCommentVNode(" Loading State "),
                __props.isSearching ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex justify-center py-8"
                }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-path",
                    class: "w-8 h-8 text-violet-500 animate-spin"
                  })
                ])) : __props.customers.length > 0 ? (openBlock(), createBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" Customer Results "),
                    createVNode("div", { class: "space-y-2 max-h-80 overflow-y-auto" }, [
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(__props.customers, (customer) => {
                          return openBlock(), createBlock("div", {
                            key: customer.id,
                            class: ["flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors", [
                              __props.selectedCustomerId === customer.id ? "bg-violet-100 dark:bg-violet-500/20 border-2 border-violet-500" : customer.isInTree ? "bg-slate-100 dark:bg-slate-800 opacity-60 cursor-not-allowed" : "bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border-2 border-transparent"
                            ]],
                            onClick: ($event) => !customer.isInTree && emit("update:selectedCustomerId", customer.id)
                          }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", { class: "w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center overflow-hidden" }, [
                                customer.avatar ? (openBlock(), createBlock("img", {
                                  key: 0,
                                  src: customer.avatar,
                                  alt: customer.fullName,
                                  class: "w-full h-full object-cover"
                                }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                                  key: 1,
                                  name: "i-heroicons-user",
                                  class: "w-5 h-5 text-slate-500"
                                }))
                              ]),
                              createVNode("div", null, [
                                createVNode(
                                  "p",
                                  { class: "font-medium text-slate-900 dark:text-white" },
                                  toDisplayString(customer.fullName),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "p",
                                  { class: "text-sm text-slate-500 dark:text-slate-400" },
                                  toDisplayString(customer.email),
                                  1
                                  /* TEXT */
                                ),
                                createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                                  createVNode(
                                    "span",
                                    { class: "text-xs text-slate-500" },
                                    toDisplayString(customer.totalOrdersCount) + " orders",
                                    1
                                    /* TEXT */
                                  ),
                                  createVNode(
                                    "span",
                                    { class: "text-xs text-emerald-600" },
                                    toDisplayString(formatCurrency(customer.totalSpent)),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ])
                            ]),
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              customer.isInTree ? (openBlock(), createBlock(_component_UBadge, {
                                key: 0,
                                color: "gray",
                                variant: "subtle",
                                size: "xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Sudah di Tree ")
                                ]),
                                _: 1
                                /* STABLE */
                              })) : customer.hasAffiliate ? (openBlock(), createBlock(_component_UBadge, {
                                key: 1,
                                color: "violet",
                                variant: "subtle",
                                size: "xs"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Punya Kode Referral ")
                                ]),
                                _: 1
                                /* STABLE */
                              })) : createCommentVNode("v-if", true),
                              __props.selectedCustomerId === customer.id ? (openBlock(), createBlock(_component_UIcon, {
                                key: 2,
                                name: "i-heroicons-check-circle-solid",
                                class: "w-6 h-6 text-violet-500"
                              })) : createCommentVNode("v-if", true)
                            ])
                          ], 10, ["onClick"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : __props.searchQuery.length >= 2 ? (openBlock(), createBlock(
                  Fragment,
                  { key: 2 },
                  [
                    createCommentVNode(" Empty State "),
                    createVNode("div", { class: "py-8 text-center text-slate-500 dark:text-slate-400" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-user-group",
                        class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                      }),
                      createVNode("p", null, "Tidak ada customer ditemukan")
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : (openBlock(), createBlock(
                  Fragment,
                  { key: 3 },
                  [
                    createCommentVNode(" Initial State "),
                    createVNode("div", { class: "py-8 text-center text-slate-500 dark:text-slate-400" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-magnifying-glass",
                        class: "w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4"
                      }),
                      createVNode("p", null, "Ketik untuk mencari customer")
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                ))
              ]))
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              onClick: handleClose
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              loading: __props.isAdding,
              disabled: !__props.selectedCustomerId || !__props.affiliate,
              onClick: ($event) => emit("confirm")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user-plus",
                    class: "w-4 h-4 mr-1"
                  }, null, _parent3, _scopeId2));
                  _push3(` Tambah ke Tree `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-user-plus",
                      class: "w-4 h-4 mr-1"
                    }),
                    createTextVNode(" Tambah ke Tree ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex justify-end gap-3" }, [
                createVNode(_component_UButton, {
                  color: "neutral",
                  variant: "ghost",
                  onClick: handleClose
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Batal ")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(_component_UButton, {
                  color: "primary",
                  loading: __props.isAdding,
                  disabled: !__props.selectedCustomerId || !__props.affiliate,
                  onClick: ($event) => emit("confirm")
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-user-plus",
                      class: "w-4 h-4 mr-1"
                    }),
                    createTextVNode(" Tambah ke Tree ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["loading", "disabled", "onClick"])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/network/AddMemberToTreeModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    affiliates: { default: () => [] },
    stats: { default: () => ({ totalAffiliates: 0, totalCustomersWithReferral: 0 }) }
  },
  setup(__props) {
    const props = __props;
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
      closeAddMemberModal
    } = useNetworkManagement();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$b;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Setup Tree Network MLM</h1><p class="text-gray-500 dark:text-gray-400"> Kelola dan tempatkan member ke dalam tree network MLM </p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-plus",
        color: "primary",
        onClick: ($event) => showCreateAffiliateModal.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Buat Akun Affiliate Baru `);
          } else {
            return [
              createTextVNode(" Buat Akun Affiliate Baru ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Stats -->`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        stats: props.stats
      }, null, _parent));
      _push(`<!-- Main Content Grid --><div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><!-- Affiliate List -->`);
      _push(ssrRenderComponent(unref(_sfc_main$7), {
        affiliates: props.affiliates,
        "selected-affiliate-id": unref(selectedAffiliate)?.id,
        onSelect: unref(loadReferredCustomers),
        onViewTree: unref(loadNetworkTree),
        onSetupReferralCodes: unref(loadAffiliatedCustomers),
        onAddMember: unref(openAddMemberModal)
      }, null, _parent));
      _push(`<!-- Referred Customers -->`);
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        affiliate: unref(selectedAffiliate),
        "referred-customers": unref(referredCustomers),
        "is-loading": unref(isLoading),
        "is-placing": unref(isPlacing),
        "selected-customers": unref(selectedCustomers),
        onPlaceCustomer: unref(placeCustomer),
        onRemoveFromTree: unref(removeFromTree),
        onToggleSelection: unref(toggleCustomerSelection),
        onSelectAll: unref(selectAllUnplaced),
        onOpenPlacementModal: ($event) => showPlacementModal.value = true
      }, null, _parent));
      _push(`</div><!-- Bulk Placement Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        open: unref(showPlacementModal),
        "onUpdate:open": ($event) => isRef(showPlacementModal) ? showPlacementModal.value = $event : null,
        "placement-level": unref(placementLevel),
        "onUpdate:placementLevel": ($event) => isRef(placementLevel) ? placementLevel.value = $event : null,
        affiliate: unref(selectedAffiliate),
        "selected-count": unref(selectedCustomers).length,
        "is-placing": unref(isPlacing),
        onConfirm: unref(bulkPlaceCustomers)
      }, null, _parent));
      _push(`<!-- Create Affiliate Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        open: unref(showCreateAffiliateModal),
        "onUpdate:open": ($event) => isRef(showCreateAffiliateModal) ? showCreateAffiliateModal.value = $event : null,
        "search-query": unref(newAffiliateSearch),
        "onUpdate:searchQuery": ($event) => isRef(newAffiliateSearch) ? newAffiliateSearch.value = $event : null,
        "selected-customer-id": unref(selectedNewCustomer),
        "onUpdate:selectedCustomerId": ($event) => isRef(selectedNewCustomer) ? selectedNewCustomer.value = $event : null,
        customers: unref(newAffiliateCustomers),
        "is-searching": unref(isSearchingCustomers),
        "is-creating": unref(isCreatingAffiliate),
        onConfirm: unref(createAffiliate),
        onClose: unref(closeCreateAffiliateModal)
      }, null, _parent));
      _push(`<!-- Network Tree Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        open: unref(showTreeModal),
        "onUpdate:open": ($event) => isRef(showTreeModal) ? showTreeModal.value = $event : null,
        affiliate: unref(selectedAffiliate),
        "network-tree": unref(networkTree),
        "network-stats": unref(networkStats),
        "is-loading": unref(isLoadingTree)
      }, null, _parent));
      _push(`<!-- Setup Referral Code Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        open: unref(showSetupReferralModal),
        "onUpdate:open": ($event) => isRef(showSetupReferralModal) ? showSetupReferralModal.value = $event : null,
        "custom-referral-code": unref(customReferralCode),
        "onUpdate:customReferralCode": ($event) => isRef(customReferralCode) ? customReferralCode.value = $event : null,
        affiliate: unref(selectedAffiliate),
        "affiliated-customers-data": unref(affiliatedCustomersData),
        "selected-customers": unref(selectedCustomersForReferral),
        "is-loading": unref(isLoadingAffiliatedCustomers),
        "is-setting-up": unref(isSettingUpReferralCode),
        onSetupReferralCode: unref(setupReferralCode),
        onBulkSetupReferralCodes: unref(bulkSetupReferralCodes),
        onToggleSelection: unref(toggleReferralCustomerSelection),
        onSelectAll: unref(selectAllWithoutReferralCode),
        onClose: unref(closeSetupReferralModal)
      }, null, _parent));
      _push(`<!-- Add Member to Tree Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        open: unref(showAddMemberModal),
        "onUpdate:open": ($event) => isRef(showAddMemberModal) ? showAddMemberModal.value = $event : null,
        "search-query": unref(addMemberSearch),
        "onUpdate:searchQuery": ($event) => isRef(addMemberSearch) ? addMemberSearch.value = $event : null,
        "selected-customer-id": unref(selectedAddMemberCustomer),
        "onUpdate:selectedCustomerId": ($event) => isRef(selectedAddMemberCustomer) ? selectedAddMemberCustomer.value = $event : null,
        "selected-level": unref(selectedAddMemberLevel),
        "onUpdate:selectedLevel": ($event) => isRef(selectedAddMemberLevel) ? selectedAddMemberLevel.value = $event : null,
        affiliate: unref(selectedAffiliate),
        customers: unref(addMemberCustomers),
        "is-searching": unref(isSearchingAddMember),
        "is-adding": unref(isAddingMember),
        onConfirm: unref(addMemberToTree),
        onClose: unref(closeAddMemberModal)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/network/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
