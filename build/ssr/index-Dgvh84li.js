import { _ as _sfc_main$5, a as _sfc_main$8 } from './Button-BTdvmZ8N.js';
import { ref, defineComponent, mergeProps, useSSRContext, mergeModels, useModel, withCtx, createTextVNode, unref, h, createVNode, toDisplayString, watch, isRef } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
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

function useUsers(options) {
  const toast = useToast();
  const isLoading = ref(false);
  const globalFilter = ref(options.initialFilters.search || "");
  const selectedRole = ref(options.initialFilters.role || "all");
  const deleteModalOpen = ref(false);
  const deleteTargetId = ref(null);
  const deleteTargetName = ref("");
  const pagination = ref({
    pageIndex: options.initialData.meta.currentPage - 1,
    pageSize: options.initialData.meta.perPage
  });
  const roleOptions = [
    { label: "Semua Role", value: "all" },
    { label: "Admin", value: "admin" },
    { label: "Super Admin", value: "superadmin" }
  ];
  const fetchData = () => {
    isLoading.value = true;
    const params = {
      page: pagination.value.pageIndex + 1,
      perPage: pagination.value.pageSize
    };
    if (globalFilter.value) {
      params.search = globalFilter.value;
    }
    if (selectedRole.value && selectedRole.value !== "all") {
      params.role = selectedRole.value;
    }
    router.get("/admin/users", params, {
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
  const handleRoleChange = () => {
    pagination.value.pageIndex = 0;
    fetchData();
  };
  const handlePageChange = (page) => {
    pagination.value.pageIndex = page - 1;
    fetchData();
  };
  const clearFilters = () => {
    globalFilter.value = "";
    selectedRole.value = "all";
    pagination.value.pageIndex = 0;
    fetchData();
  };
  const openDeleteModal = (user) => {
    deleteTargetId.value = user.id;
    deleteTargetName.value = user.fullName || user.email;
    deleteModalOpen.value = true;
  };
  const confirmDelete = () => {
    if (!deleteTargetId.value) return;
    router.delete(`/admin/users/${deleteTargetId.value}`, {
      onSuccess: () => {
        toast.success("Pengguna berhasil dihapus");
        deleteModalOpen.value = false;
        deleteTargetId.value = null;
      },
      onError: () => {
        toast.error("Gagal menghapus pengguna");
      }
    });
  };
  const syncPagination = (currentPage) => {
    pagination.value.pageIndex = currentPage - 1;
  };
  return {
    // State
    isLoading,
    globalFilter,
    selectedRole,
    pagination,
    deleteModalOpen,
    deleteTargetName,
    roleOptions,
    // Methods
    fetchData,
    handleSearch,
    handleRoleChange,
    handlePageChange,
    clearFilters,
    openDeleteModal,
    confirmDelete,
    syncPagination
  };
}

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "UserStatsCard",
  __ssrInlineRender: true,
  props: {
    total: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-3 gap-4" }, _attrs))}><div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-users",
        class: "w-5 h-5 text-violet-500"
      }, null, _parent));
      _push(`</div><div><p class="text-sm text-slate-500 dark:text-slate-400">Total Pengguna</p><p class="text-xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(__props.total)}</p></div></div></div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/users/UserStatsCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "UserFiltersBar",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    roleOptions: {}
  }, {
    "globalFilter": { default: "" },
    "globalFilterModifiers": {},
    "selectedRole": { default: "all" },
    "selectedRoleModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["search", "roleChange", "clear"], ["update:globalFilter", "update:selectedRole"]),
  setup(__props, { emit: __emit }) {
    const globalFilter = useModel(__props, "globalFilter");
    const selectedRole = useModel(__props, "selectedRole");
    const emit = __emit;
    const handleSearch = () => {
      emit("search");
    };
    const handleRoleChange = () => {
      emit("roleChange");
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
        placeholder: "Cari nama atau email...",
        icon: "i-heroicons-magnifying-glass",
        class: "max-w-sm",
        onKeyup: handleSearch
      }, null, _parent));
      _push(`</div><!-- Role Filter --><div class="w-full sm:w-48">`);
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: selectedRole.value,
        "onUpdate:modelValue": ($event) => selectedRole.value = $event,
        items: __props.roleOptions,
        placeholder: "Filter Role",
        onChange: handleRoleChange
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/users/UserFiltersBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "UserTable",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    users: {},
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
  emits: /* @__PURE__ */ mergeModels(["delete", "pageChange"], ["update:pagination", "update:globalFilter"]),
  setup(__props, { emit: __emit }) {
    const pagination = useModel(__props, "pagination");
    const globalFilter = useModel(__props, "globalFilter");
    const emit = __emit;
    const table = ref(null);
    const columns = [
      {
        accessorKey: "fullName",
        header: "Nama",
        cell: ({ row }) => {
          const user = row.original;
          return h("div", { class: "flex items-center gap-3" }, [
            h(
              "div",
              { class: "w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center shrink-0" },
              h(_sfc_main$5, { name: "i-heroicons-user", class: "w-5 h-5 text-violet-500" })
            ),
            h("div", { class: "min-w-0" }, [
              h(
                Link,
                {
                  href: `/admin/users/${user.id}`,
                  class: "font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400"
                },
                () => user.fullName || "-"
              ),
              h("p", { class: "text-xs text-slate-500 dark:text-slate-400" }, user.email)
            ])
          ]);
        }
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const role = row.original.role;
          return h(
            _sfc_main$b,
            { color: role === "superadmin" ? "primary" : "neutral", variant: "subtle" },
            () => role === "superadmin" ? "Super Admin" : "Admin"
          );
        }
      },
      {
        accessorKey: "createdAt",
        header: "Tanggal Dibuat",
        cell: ({ row }) => {
          const date = new Date(row.original.createdAt).toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric"
          });
          return h("span", { class: "text-slate-600 dark:text-slate-400" }, date);
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Aksi"),
        cell: ({ row }) => {
          const user = row.original;
          const UDropdownMenu = _sfc_main$c;
          const UButton = _sfc_main$8;
          const items = [
            [
              {
                label: "Lihat Detail",
                icon: "i-heroicons-eye",
                onSelect: () => router.visit(`/admin/users/${user.id}`)
              },
              {
                label: "Edit",
                icon: "i-heroicons-pencil-square",
                onSelect: () => router.visit(`/admin/users/${user.id}/edit`)
              }
            ],
            [
              {
                label: "Hapus",
                icon: "i-heroicons-trash",
                color: "error",
                onSelect: () => emit("delete", user)
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
          data: __props.users,
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
              _push2(`<p class="text-slate-500 dark:text-slate-400 mb-4"${_scopeId}>Belum ada pengguna</p>`);
              _push2(ssrRenderComponent(unref(Link), { href: "/admin/users/create" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-plus",
                      color: "primary"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Tambah Pengguna `);
                        } else {
                          return [
                            createTextVNode(" Tambah Pengguna ")
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
                          createTextVNode(" Tambah Pengguna ")
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
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 mb-4" }, "Belum ada pengguna"),
                    createVNode(unref(Link), { href: "/admin/users/create" }, {
                      default: withCtx(() => [
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-plus",
                          color: "primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tambah Pengguna ")
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
        _push(`<div class="flex items-center justify-between px-4 py-3 border-t border-slate-200 dark:border-slate-800"><p class="text-sm text-slate-500 dark:text-slate-400"> Menampilkan ${ssrInterpolate((__props.meta.currentPage - 1) * __props.meta.perPage + 1)} - ${ssrInterpolate(Math.min(__props.meta.currentPage * __props.meta.perPage, __props.meta.total))} dari ${ssrInterpolate(__props.meta.total)} pengguna </p>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/users/UserTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "UserDeleteModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    userName: {}
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
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Hapus Pengguna</h3><p class="text-slate-500 dark:text-slate-400"${_scopeId}> Apakah Anda yakin ingin menghapus <strong${_scopeId}>${ssrInterpolate(__props.userName)}</strong>? </p></div></div><div class="flex justify-end gap-3"${_scopeId}>`);
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
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Hapus Pengguna"),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400" }, [
                      createTextVNode(" Apakah Anda yakin ingin menghapus "),
                      createVNode(
                        "strong",
                        null,
                        toDisplayString(__props.userName),
                        1
                        /* TEXT */
                      ),
                      createTextVNode("? ")
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/users/UserDeleteModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    users: { default: () => ({
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
      role: ""
    }) }
  },
  setup(__props) {
    const props = __props;
    const {
      isLoading,
      globalFilter,
      selectedRole,
      pagination,
      deleteModalOpen,
      deleteTargetName,
      roleOptions,
      handleSearch,
      handleRoleChange,
      handlePageChange,
      clearFilters,
      openDeleteModal,
      confirmDelete,
      syncPagination
    } = useUsers({
      initialData: props.users,
      initialFilters: props.filters
    });
    watch(
      () => props.users.meta.currentPage,
      (newPage) => {
        syncPagination(newPage);
      }
    );
    const handleDelete = (user) => {
      openDeleteModal(user);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Kelola Pengguna</h1><p class="text-gray-500 dark:text-gray-400"> Kelola pengguna admin dan super admin </p></div>`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/users/create" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-plus",
              color: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tambah Pengguna `);
                } else {
                  return [
                    createTextVNode(" Tambah Pengguna ")
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
                  createTextVNode(" Tambah Pengguna ")
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
      _push(`</div><!-- Stats -->`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        total: props.users.meta.total
      }, null, _parent));
      _push(`<!-- Table Card -->`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        pagination: unref(pagination),
        "onUpdate:pagination": ($event) => isRef(pagination) ? pagination.value = $event : null,
        "global-filter": unref(globalFilter),
        "onUpdate:globalFilter": ($event) => isRef(globalFilter) ? globalFilter.value = $event : null,
        users: props.users.data,
        meta: props.users.meta,
        "is-loading": unref(isLoading),
        onDelete: handleDelete,
        onPageChange: unref(handlePageChange)
      }, {
        filters: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(_sfc_main$3), {
              "global-filter": unref(globalFilter),
              "onUpdate:globalFilter": ($event) => isRef(globalFilter) ? globalFilter.value = $event : null,
              "selected-role": unref(selectedRole),
              "onUpdate:selectedRole": ($event) => isRef(selectedRole) ? selectedRole.value = $event : null,
              "role-options": unref(roleOptions),
              onSearch: unref(handleSearch),
              onRoleChange: unref(handleRoleChange),
              onClear: unref(clearFilters)
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(_sfc_main$3), {
                "global-filter": unref(globalFilter),
                "onUpdate:globalFilter": ($event) => isRef(globalFilter) ? globalFilter.value = $event : null,
                "selected-role": unref(selectedRole),
                "onUpdate:selectedRole": ($event) => isRef(selectedRole) ? selectedRole.value = $event : null,
                "role-options": unref(roleOptions),
                onSearch: unref(handleSearch),
                onRoleChange: unref(handleRoleChange),
                onClear: unref(clearFilters)
              }, null, 8, ["global-filter", "onUpdate:globalFilter", "selected-role", "onUpdate:selectedRole", "role-options", "onSearch", "onRoleChange", "onClear"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Delete Modal -->`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        open: unref(deleteModalOpen),
        "onUpdate:open": ($event) => isRef(deleteModalOpen) ? deleteModalOpen.value = $event : null,
        "user-name": unref(deleteTargetName),
        onConfirm: unref(confirmDelete)
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/users/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
