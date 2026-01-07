import { _ as _sfc_main$5, a as _sfc_main$8 } from './Button-BTdvmZ8N.js';
import { ref, defineComponent, computed, mergeProps, useSSRContext, mergeModels, useModel, withCtx, createTextVNode, unref, h, createVNode, toDisplayString, watch, isRef } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderStyle, ssrRenderSlot } from 'vue/server-renderer';
import { router, Link } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { u as useToast, _ as _sfc_main$6, a as _sfc_main$b } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$7 } from './Select-mEsLh9Ds.js';
import { _ as _sfc_main$a } from './Pagination-B8CAUWkD.js';
import { _ as _sfc_main$9 } from './Table-BgpRkRI2.js';
import { _ as _sfc_main$c } from './DropdownMenu-Zcq6i1qV.js';
import { getPaginationRowModel } from '@tanstack/vue-table';
import { _ as _sfc_main$d } from './Modal-VctJV7vb.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Tooltip-C54KurGy.js';
import 'reka-ui/namespaced';
import 'scule';
import '@tanstack/vue-virtual';

function useCustomerManagement(config) {
  const toast = useToast();
  const isLoading = ref(false);
  const searchQuery = ref(config.initialFilters.search || "");
  const selectedStatus = ref(config.initialFilters.status || "all");
  const deleteState = ref({
    isOpen: false,
    targetId: null,
    targetName: ""
  });
  const pagination = ref({
    pageIndex: config.initialData.meta.currentPage - 1,
    pageSize: config.initialData.meta.perPage
  });
  const statusOptions = [
    { label: "Semua Status", value: "all" },
    { label: "Aktif", value: "active" },
    { label: "Tidak Aktif", value: "inactive" },
    { label: "Terverifikasi", value: "verified" },
    { label: "Belum Verifikasi", value: "unverified" }
  ];
  const computeStats = (data, meta) => {
    return {
      total: meta.total,
      active: data.filter((c) => c.isActive).length,
      verified: data.filter((c) => c.isVerified).length
    };
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    }).format(amount);
  };
  const fetchData = () => {
    isLoading.value = true;
    const params = {
      page: pagination.value.pageIndex + 1,
      perPage: pagination.value.pageSize
    };
    if (searchQuery.value) {
      params.search = searchQuery.value;
    }
    if (selectedStatus.value && selectedStatus.value !== "all") {
      params.status = selectedStatus.value;
    }
    router.get("/admin/customers", params, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => {
        isLoading.value = false;
      }
    });
  };
  const handleSearch = () => {
    pagination.value.pageIndex = 0;
    fetchData();
  };
  const handleStatusChange = () => {
    pagination.value.pageIndex = 0;
    fetchData();
  };
  const clearFilters = () => {
    searchQuery.value = "";
    selectedStatus.value = "all";
    pagination.value.pageIndex = 0;
    fetchData();
  };
  const handlePageChange = (page) => {
    pagination.value.pageIndex = page - 1;
    fetchData();
  };
  const syncPagination = (currentPage) => {
    pagination.value.pageIndex = currentPage - 1;
  };
  const openDeleteModal = (customer) => {
    deleteState.value = {
      isOpen: true,
      targetId: customer.id,
      targetName: customer.fullName
    };
  };
  const closeDeleteModal = () => {
    deleteState.value = {
      isOpen: false,
      targetId: null,
      targetName: ""
    };
  };
  const confirmDelete = () => {
    if (!deleteState.value.targetId) return;
    router.delete(`/admin/customers/${deleteState.value.targetId}`, {
      onSuccess: () => {
        toast.success("Pelanggan berhasil dihapus");
        closeDeleteModal();
      },
      onError: () => {
        toast.error("Gagal menghapus pelanggan");
      }
    });
  };
  const toggleActive = (customer) => {
    router.patch(
      `/admin/customers/${customer.id}/active`,
      {},
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success(`Pelanggan berhasil di${customer.isActive ? "nonaktifkan" : "aktifkan"}`);
        },
        onError: () => {
          toast.error("Gagal mengubah status pelanggan");
        }
      }
    );
  };
  const toggleVerified = (customer) => {
    router.patch(
      `/admin/customers/${customer.id}/verified`,
      {},
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Status verifikasi berhasil diubah");
        },
        onError: () => {
          toast.error("Gagal mengubah status verifikasi");
        }
      }
    );
  };
  const impersonateCustomer = (customer) => {
    if (!customer.isActive) {
      toast.error("Tidak dapat login sebagai customer yang tidak aktif");
      return;
    }
    router.post(
      `/admin/customers/${customer.id}/impersonate`,
      {},
      {
        onSuccess: () => {
          toast.success(`Anda sekarang login sebagai ${customer.fullName}`);
        },
        onError: () => {
          toast.error("Gagal login sebagai customer");
        }
      }
    );
  };
  const viewCustomer = (customer) => {
    router.visit(`/admin/customers/${customer.id}`);
  };
  const editCustomer = (customer) => {
    router.visit(`/admin/customers/${customer.id}/edit`);
  };
  return {
    // State
    isLoading,
    searchQuery,
    selectedStatus,
    deleteState,
    pagination,
    // Constants
    statusOptions,
    // Methods
    computeStats,
    formatCurrency,
    fetchData,
    handleSearch,
    handleStatusChange,
    clearFilters,
    handlePageChange,
    syncPagination,
    // Delete handlers
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
    // Customer actions
    toggleActive,
    toggleVerified,
    impersonateCustomer,
    viewCustomer,
    editCustomer
  };
}

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "CustomerStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const props = __props;
    const activePercentage = computed(() => {
      if (props.stats.total === 0) return 0;
      return Math.round(props.stats.active / props.stats.total * 100);
    });
    const verifiedPercentage = computed(() => {
      if (props.stats.total === 0) return 0;
      return Math.round(props.stats.verified / props.stats.total * 100);
    });
    const formatNumber = (num) => {
      return new Intl.NumberFormat("id-ID").format(num);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, _attrs))}><!-- Total Customers Card --><div class="group relative overflow-hidden bg-linear-to-br from-violet-500 to-purple-600 rounded-2xl p-5 shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all duration-300"><!-- Background Pattern --><div class="absolute inset-0 opacity-10"><svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none"><defs><pattern id="grid1" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r="1" fill="white"></circle></pattern></defs><rect width="100" height="100" fill="url(#grid1)"></rect></svg></div><!-- Floating Icon --><div class="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div><div class="relative flex items-start justify-between"><div class="space-y-3"><div class="inline-flex items-center gap-2 px-2.5 py-1 bg-white/20 backdrop-blur-sm rounded-full"><span class="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span><span class="text-xs font-medium text-white/90">Total</span></div><div><p class="text-3xl font-bold text-white tracking-tight">${ssrInterpolate(formatNumber(__props.stats.total))}</p><p class="text-sm text-white/70 mt-1">Pelanggan Terdaftar</p></div></div><div class="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "w-6 h-6 text-white"
      }, null, _parent));
      _push(`</div></div></div><!-- Active Customers Card --><div class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5 shadow-sm hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-800/50 transition-all duration-300"><!-- Accent Line --><div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-emerald-400 to-teal-500 rounded-t-2xl"></div><div class="flex items-start justify-between mb-4"><div class="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/30 group-hover:scale-110 transition-transform duration-300">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 rounded-full">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-trending-up",
        class: "w-3.5 h-3.5 text-emerald-500"
      }, null, _parent));
      _push(`<span class="text-xs font-semibold text-emerald-600 dark:text-emerald-400">${ssrInterpolate(activePercentage.value)}%</span></div></div><div class="space-y-3"><div><p class="text-2xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(formatNumber(__props.stats.active))}</p><p class="text-sm text-slate-500 dark:text-slate-400">Pelanggan Aktif</p></div><!-- Progress Bar --><div class="relative h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div class="absolute inset-y-0 left-0 bg-linear-to-r from-emerald-400 to-teal-500 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: `${activePercentage.value}%` })}"></div></div></div></div><!-- Verified Customers Card --><div class="group relative overflow-hidden bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/50 dark:border-slate-700/50 p-5 shadow-sm hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-800/50 transition-all duration-300"><!-- Accent Line --><div class="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-400 to-indigo-500 rounded-t-2xl"></div><div class="flex items-start justify-between mb-4"><div class="w-11 h-11 rounded-xl bg-linear-to-br from-blue-400 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform duration-300">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shield-check",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 dark:bg-blue-500/10 rounded-full">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-badge",
        class: "w-3.5 h-3.5 text-blue-500"
      }, null, _parent));
      _push(`<span class="text-xs font-semibold text-blue-600 dark:text-blue-400">${ssrInterpolate(verifiedPercentage.value)}%</span></div></div><div class="space-y-3"><div><p class="text-2xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(formatNumber(__props.stats.verified))}</p><p class="text-sm text-slate-500 dark:text-slate-400">Terverifikasi</p></div><!-- Progress Bar --><div class="relative h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden"><div class="absolute inset-y-0 left-0 bg-linear-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-500" style="${ssrRenderStyle({ width: `${verifiedPercentage.value}%` })}"></div></div></div></div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/customers/CustomerStatsCards.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CustomerFiltersBar",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    statusOptions: {}
  }, {
    "globalFilter": { default: "" },
    "globalFilterModifiers": {},
    "selectedStatus": { default: "all" },
    "selectedStatusModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["search", "statusChange", "clear"], ["update:globalFilter", "update:selectedStatus"]),
  setup(__props, { emit: __emit }) {
    const globalFilter = useModel(__props, "globalFilter");
    const selectedStatus = useModel(__props, "selectedStatus");
    const emit = __emit;
    const handleSearch = () => {
      emit("search");
    };
    const handleStatusChange = () => {
      emit("statusChange");
    };
    const handleClear = () => {
      emit("clear");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$6;
      const _component_USelect = _sfc_main$7;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row gap-4 px-4 py-3.5 border-b border-slate-200 dark:border-slate-800" }, _attrs))}><!-- Search --><div class="flex-1">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: globalFilter.value,
        "onUpdate:modelValue": ($event) => globalFilter.value = $event,
        placeholder: "Cari nama, email, atau telepon...",
        icon: "i-heroicons-magnifying-glass",
        class: "max-w-md w-full",
        onKeyup: handleSearch
      }, null, _parent));
      _push(`</div><!-- Status Filter --><div class="w-full sm:w-48">`);
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: selectedStatus.value,
        "onUpdate:modelValue": ($event) => selectedStatus.value = $event,
        items: __props.statusOptions,
        placeholder: "Filter Status",
        class: "w-full",
        onChange: handleStatusChange
      }, null, _parent));
      _push(`</div><!-- Actions --><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-magnifying-glass",
        color: "primary",
        onClick: handleSearch
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cari `);
          } else {
            return [
              createTextVNode(" Cari ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-x-mark",
        color: "neutral",
        variant: "outline",
        onClick: handleClear
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Reset `);
          } else {
            return [
              createTextVNode(" Reset ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/customers/CustomerFiltersBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CustomerTable",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    customers: {},
    meta: {},
    isLoading: { type: Boolean }
  }, {
    "pagination": {
      default: () => ({ pageIndex: 0, pageSize: 10 })
    },
    "paginationModifiers": {},
    "globalFilter": { default: "" },
    "globalFilterModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["toggleActive", "toggleVerified", "impersonate", "delete", "pageChange"], ["update:pagination", "update:globalFilter"]),
  setup(__props, { emit: __emit }) {
    const pagination = useModel(__props, "pagination");
    const globalFilter = useModel(__props, "globalFilter");
    const emit = __emit;
    const table = ref(null);
    const formatCurrency = (amount) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(amount);
    };
    const columns = [
      {
        accessorKey: "fullName",
        header: "Pelanggan",
        cell: ({ row }) => {
          const customer = row.original;
          return h("div", { class: "flex items-center gap-3" }, [
            h(
              "div",
              { class: "w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center overflow-hidden shrink-0" },
              customer.avatar ? h("img", {
                src: customer.avatar,
                alt: customer.fullName,
                class: "w-full h-full object-cover"
              }) : h(_sfc_main$5, { name: "i-heroicons-user", class: "w-5 h-5 text-violet-500" })
            ),
            h("div", { class: "min-w-0" }, [
              h(
                Link,
                {
                  href: `/admin/customers/${customer.id}`,
                  class: "font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400"
                },
                () => customer.fullName
              ),
              customer.gender ? h("p", { class: "text-xs text-slate-500 dark:text-slate-400" }, customer.gender === "male" ? "Laki-laki" : "Perempuan") : null
            ])
          ]);
        }
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => h("span", { class: "text-slate-600 dark:text-slate-400" }, row.original.email)
      },
      {
        accessorKey: "phone",
        header: "Telepon",
        cell: ({ row }) => h("span", { class: "text-slate-600 dark:text-slate-400" }, row.original.phone || "-")
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const customer = row.original;
          return h("div", { class: "flex flex-col gap-1" }, [
            h(
              _sfc_main$b,
              { color: customer.isActive ? "success" : "error", variant: "subtle", size: "xs" },
              () => customer.isActive ? "Aktif" : "Tidak Aktif"
            ),
            h(
              _sfc_main$b,
              { color: customer.isVerified ? "primary" : "neutral", variant: "subtle", size: "xs" },
              () => customer.isVerified ? "Terverifikasi" : "Belum Verifikasi"
            )
          ]);
        }
      },
      {
        accessorKey: "totalOrdersCount",
        header: "Total Pesanan",
        cell: ({ row }) => h("span", { class: "font-medium text-slate-900 dark:text-white" }, row.original.totalOrdersCount)
      },
      {
        accessorKey: "totalSpent",
        header: () => h("div", { class: "text-right" }, "Total Belanja"),
        cell: ({ row }) => h("div", { class: "text-right font-medium text-emerald-600 dark:text-emerald-400" }, formatCurrency(row.original.totalSpent))
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Aksi"),
        cell: ({ row }) => {
          const customer = row.original;
          const UDropdownMenu = _sfc_main$c;
          const UButton = _sfc_main$8;
          const items = [
            [
              {
                label: "Lihat Detail",
                icon: "i-heroicons-eye",
                onSelect: () => router.visit(`/admin/customers/${customer.id}`)
              },
              {
                label: "Edit",
                icon: "i-heroicons-pencil-square",
                onSelect: () => router.visit(`/admin/customers/${customer.id}/edit`)
              }
            ],
            [
              {
                label: "Login sebagai Customer",
                icon: "i-heroicons-user-circle",
                disabled: !customer.isActive,
                onSelect: () => emit("impersonate", customer)
              }
            ],
            [
              {
                label: customer.isActive ? "Nonaktifkan" : "Aktifkan",
                icon: customer.isActive ? "i-heroicons-x-circle" : "i-heroicons-check-circle",
                onSelect: () => emit("toggleActive", customer)
              },
              {
                label: customer.isVerified ? "Batalkan Verifikasi" : "Verifikasi",
                icon: customer.isVerified ? "i-heroicons-shield-exclamation" : "i-heroicons-shield-check",
                onSelect: () => emit("toggleVerified", customer)
              }
            ],
            [
              {
                label: "Hapus",
                icon: "i-heroicons-trash",
                color: "error",
                onSelect: () => emit("delete", customer)
              }
            ]
          ];
          return h(
            "div",
            { class: "text-right" },
            h(
              UDropdownMenu,
              {
                content: { align: "end" },
                items,
                "aria-label": "Actions dropdown"
              },
              () => h(UButton, {
                icon: "i-heroicons-ellipsis-vertical",
                color: "neutral",
                variant: "ghost",
                size: "xs"
              })
            )
          );
        },
        enableSorting: false
      }
    ];
    const handlePageChange = (page) => {
      pagination.value.pageIndex = page - 1;
      emit("pageChange", page);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$5;
      const _component_UTable = _sfc_main$9;
      const _component_UButton = _sfc_main$8;
      const _component_UPagination = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden" }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "filters", {}, null, _push, _parent);
      _push(`<!-- Loading Overlay -->`);
      if (__props.isLoading) {
        _push(`<div class="p-8 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 text-violet-500 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Table -->`);
        _push(ssrRenderComponent(_component_UTable, {
          ref_key: "table",
          ref: table,
          pagination: pagination.value,
          "onUpdate:pagination": ($event) => pagination.value = $event,
          "global-filter": globalFilter.value,
          "onUpdate:globalFilter": ($event) => globalFilter.value = $event,
          data: __props.customers,
          columns,
          "pagination-options": {
            getPaginationRowModel: unref(getPaginationRowModel)()
          },
          class: "flex-1"
        }, {
          empty: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-4 py-12 text-center"${_scopeId}><div class="flex flex-col items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-users",
                class: "w-12 h-12 text-slate-300 dark:text-slate-600 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-slate-500 dark:text-slate-400 mb-4"${_scopeId}>Belum ada pelanggan</p>`);
              _push2(ssrRenderComponent(unref(Link), { href: "/admin/customers/create" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-plus",
                      color: "primary"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Tambah Pelanggan `);
                        } else {
                          return [
                            createTextVNode(" Tambah Pelanggan ")
                          ];
                        }
                      }),
                      _: 1
                      /* STABLE */
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-plus",
                        color: "primary"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tambah Pelanggan ")
                        ]),
                        _: 1
                        /* STABLE */
                      })
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "px-4 py-12 text-center" }, [
                  createVNode("div", { class: "flex flex-col items-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-users",
                      class: "w-12 h-12 text-slate-300 dark:text-slate-600 mb-4"
                    }),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 mb-4" }, "Belum ada pelanggan"),
                    createVNode(unref(Link), { href: "/admin/customers/create" }, {
                      default: withCtx(() => [
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-plus",
                          color: "primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tambah Pelanggan ")
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`<!-- Pagination -->`);
      if (__props.meta.lastPage > 1) {
        _push(`<div class="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800"><p class="text-sm text-slate-500 dark:text-slate-400"> Menampilkan ${ssrInterpolate((__props.meta.currentPage - 1) * __props.meta.perPage + 1)} - ${ssrInterpolate(Math.min(__props.meta.currentPage * __props.meta.perPage, __props.meta.total))} dari ${ssrInterpolate(__props.meta.total)} pelanggan </p>`);
        _push(ssrRenderComponent(_component_UPagination, {
          page: (table.value?.tableApi?.getState().pagination.pageIndex || 0) + 1,
          "items-per-page": table.value?.tableApi?.getState().pagination.pageSize || __props.meta.perPage,
          total: __props.meta.total,
          "onUpdate:page": handlePageChange
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/customers/CustomerTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CustomerDeleteModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    customerName: {}
  }, {
    "open": { type: Boolean, ...{ default: false } },
    "openModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["confirm"], ["update:open"]),
  setup(__props, { emit: __emit }) {
    const open = useModel(__props, "open");
    const emit = __emit;
    const handleConfirm = () => {
      emit("confirm");
    };
    const handleCancel = () => {
      open.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$d;
      const _component_UIcon = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: open.value,
        "onUpdate:open": ($event) => open.value = $event,
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "w-6 h-6 text-red-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Hapus Pelanggan</h3><p class="text-slate-500 dark:text-slate-400"${_scopeId}> Apakah Anda yakin ingin menghapus <strong${_scopeId}>${ssrInterpolate(__props.customerName)}</strong>? </p></div></div><p class="text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg mb-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-exclamation-triangle",
              class: "w-4 h-4 inline mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Pelanggan dengan riwayat pesanan tidak dapat dihapus. </p><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: handleCancel
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
              color: "error",
              onClick: handleConfirm
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hapus `);
                } else {
                  return [
                    createTextVNode(" Hapus ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-h-[85vh] overflow-y-auto" }, [
                createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-500/20 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-exclamation-triangle",
                      class: "w-6 h-6 text-red-500"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Hapus Pelanggan"),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400" }, [
                      createTextVNode(" Apakah Anda yakin ingin menghapus "),
                      createVNode(
                        "strong",
                        null,
                        toDisplayString(__props.customerName),
                        1
                        /* TEXT */
                      ),
                      createTextVNode("? ")
                    ])
                  ])
                ]),
                createVNode("p", { class: "text-sm text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 p-3 rounded-lg mb-4" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-exclamation-triangle",
                    class: "w-4 h-4 inline mr-1"
                  }),
                  createTextVNode(" Pelanggan dengan riwayat pesanan tidak dapat dihapus. ")
                ]),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: handleCancel
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(_component_UButton, {
                    color: "error",
                    onClick: handleConfirm
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Hapus ")
                    ]),
                    _: 1
                    /* STABLE */
                  })
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

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/customers/CustomerDeleteModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    customers: { default: () => ({
      data: [],
      meta: {
        total: 0,
        perPage: 10,
        currentPage: 1,
        lastPage: 1,
        firstPage: 1
      }
    }) },
    filters: { default: () => ({
      search: "",
      status: ""
    }) }
  },
  setup(__props) {
    const props = __props;
    const {
      // State
      isLoading,
      searchQuery,
      selectedStatus,
      deleteState,
      pagination,
      // Constants
      statusOptions,
      // Methods
      computeStats,
      handleSearch,
      handleStatusChange,
      clearFilters,
      handlePageChange,
      syncPagination,
      // Delete handlers
      openDeleteModal,
      confirmDelete,
      // Customer actions
      toggleActive,
      toggleVerified,
      impersonateCustomer
    } = useCustomerManagement({
      initialData: props.customers,
      initialFilters: props.filters
    });
    const stats = computed(() => computeStats(props.customers.data, props.customers.meta));
    watch(
      () => props.customers.meta.currentPage,
      (newPage) => syncPagination(newPage)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Kelola Pelanggan</h1><p class="text-gray-500 dark:text-gray-400"> Kelola data pelanggan toko </p></div>`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/customers/create" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-plus",
              color: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tambah Pelanggan `);
                } else {
                  return [
                    createTextVNode(" Tambah Pelanggan ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-plus",
                color: "primary"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Tambah Pelanggan ")
                ]),
                _: 1
                /* STABLE */
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Stats Cards -->`);
      _push(ssrRenderComponent(unref(_sfc_main$4), { stats: stats.value }, null, _parent));
      _push(`<!-- Table with Filters -->`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        pagination: unref(pagination),
        "onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
        "global-filter": unref(searchQuery),
        "onUpdate:globalFilter": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
        customers: props.customers.data,
        meta: props.customers.meta,
        "is-loading": unref(isLoading),
        onToggleActive: unref(toggleActive),
        onToggleVerified: unref(toggleVerified),
        onImpersonate: unref(impersonateCustomer),
        onDelete: unref(openDeleteModal),
        onPageChange: unref(handlePageChange)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              "global-filter": unref(searchQuery),
              "onUpdate:globalFilter": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
              "selected-status": unref(selectedStatus),
              "onUpdate:selectedStatus": ($event) => isRef(selectedStatus) ? selectedStatus.value = $event : null,
              "status-options": unref(statusOptions),
              onSearch: unref(handleSearch),
              onStatusChange: unref(handleStatusChange),
              onClear: unref(clearFilters)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), {
                "global-filter": unref(searchQuery),
                "onUpdate:globalFilter": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                "selected-status": unref(selectedStatus),
                "onUpdate:selectedStatus": ($event) => isRef(selectedStatus) ? selectedStatus.value = $event : null,
                "status-options": unref(statusOptions),
                onSearch: unref(handleSearch),
                onStatusChange: unref(handleStatusChange),
                onClear: unref(clearFilters)
              }, null, 8, ["global-filter", "onUpdate:globalFilter", "selected-status", "onUpdate:selectedStatus", "status-options", "onSearch", "onStatusChange", "onClear"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Delete Confirmation Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        open: unref(deleteState).isOpen,
        "onUpdate:open": ($event) => unref(deleteState).isOpen = $event,
        "customer-name": unref(deleteState).targetName,
        onConfirm: unref(confirmDelete)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/customers/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
