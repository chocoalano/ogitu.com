import { a as _sfc_main$1, _ as _sfc_main$9 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$8 } from './DropdownMenu-DnaZdPLR.js';
import { _ as _sfc_main$7 } from './Switch-BkqmHkc6.js';
import { a as _sfc_main$5 } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$4 } from './Card-Ci6a5H8H.js';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, toDisplayString, createCommentVNode, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { _ as _sfc_main$2, a as _sfc_main$3, b as _sfc_main$a, c as _sfc_main$b } from './DeleteConfirmModal-CJEvjd5B.js';
import { _ as _sfc_main$6 } from './PromotionStatusBadge-B4Sy28XQ.js';
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
import './SelectMenu-CGTADs72.js';
import './Modal-lw8uQ47S.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    discounts: {},
    pagination: {},
    stats: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const selectedStatus = ref(props.filters.status || "all");
    const searchQuery = ref(props.filters.search);
    const selectedType = ref(props.filters.type || "all");
    const isLoading = ref(false);
    const showDeleteModal = ref(false);
    const selectedDiscount = ref(null);
    const isDeleting = ref(false);
    const typeOptions = [
      { label: "Semua Tipe", value: "all" },
      { label: "Persentase", value: "percentage" },
      { label: "Nominal", value: "fixed" }
    ];
    const getDropdownItems = (discount) => [
      [
        { label: "Lihat Detail", icon: "i-heroicons-eye", to: `/admin/promotions/discounts/${discount.id}` },
        { label: "Edit", icon: "i-heroicons-pencil", to: `/admin/promotions/discounts/${discount.id}/edit` }
      ],
      [
        { label: "Hapus", icon: "i-heroicons-trash", color: "error", onSelect: () => confirmDelete(discount) }
      ]
    ];
    const applyFilters = () => {
      isLoading.value = true;
      const params = {};
      if (selectedStatus.value && selectedStatus.value !== "all") params.status = selectedStatus.value;
      if (searchQuery.value) params.search = searchQuery.value;
      if (selectedType.value && selectedType.value !== "all") params.type = selectedType.value;
      router.get(
        "/admin/promotions/discounts",
        params,
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => {
            isLoading.value = false;
          }
        }
      );
    };
    const goToPage = (page) => {
      isLoading.value = true;
      const params = { page };
      if (selectedStatus.value && selectedStatus.value !== "all") params.status = selectedStatus.value;
      if (searchQuery.value) params.search = searchQuery.value;
      if (selectedType.value && selectedType.value !== "all") params.type = selectedType.value;
      router.get(
        "/admin/promotions/discounts",
        params,
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => {
            isLoading.value = false;
          }
        }
      );
    };
    const toggleActive = (discount) => {
      router.post(`/admin/promotions/discounts/${discount.id}/toggle`, {}, {
        preserveScroll: true
      });
    };
    const confirmDelete = (discount) => {
      selectedDiscount.value = discount;
      showDeleteModal.value = true;
    };
    const deleteDiscount = () => {
      if (!selectedDiscount.value) return;
      isDeleting.value = true;
      router.delete(`/admin/promotions/discounts/${selectedDiscount.value.id}`, {
        preserveScroll: true,
        onFinish: () => {
          isDeleting.value = false;
          showDeleteModal.value = false;
          selectedDiscount.value = null;
        }
      });
    };
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      const _component_USwitch = _sfc_main$7;
      const _component_UDropdownMenu = _sfc_main$8;
      const _component_UIcon = _sfc_main$9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><!-- Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Diskon Produk</h1><p class="text-gray-500 dark:text-gray-400"> Kelola diskon yang berlaku untuk customer di seluruh platform </p></div>`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/promotions/discounts/create" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-plus",
              color: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Buat Diskon `);
                } else {
                  return [
                    createTextVNode(" Buat Diskon ")
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
                  createTextVNode(" Buat Diskon ")
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
      _push(ssrRenderComponent(_sfc_main$2, {
        stats: __props.stats,
        type: "discount"
      }, null, _parent));
      _push(`<!-- Filters -->`);
      _push(ssrRenderComponent(_sfc_main$3, {
        status: selectedStatus.value,
        "onUpdate:status": ($event) => selectedStatus.value = $event,
        search: searchQuery.value,
        "onUpdate:search": ($event) => searchQuery.value = $event,
        type: selectedType.value,
        "onUpdate:type": ($event) => selectedType.value = $event,
        "show-type-filter": "",
        "type-options": typeOptions,
        onFilter: applyFilters
      }, null, _parent));
      _push(`<!-- Discounts Table -->`);
      _push(ssrRenderComponent(_component_UCard, { ui: { body: { padding: "" } } }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-200 dark:border-gray-700"${_scopeId}><th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Nama Diskon </th><th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Tipe </th><th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Nilai </th><th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Periode </th><th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Penggunaan </th><th class="px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Status </th><th class="px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Aksi </th></tr></thead><tbody class="divide-y divide-gray-200 dark:divide-gray-700"${_scopeId}><!--[-->`);
            ssrRenderList(__props.discounts, (discount) => {
              _push2(`<tr class="hover:bg-gray-50 dark:hover:bg-gray-800/50"${_scopeId}><td class="px-4 py-4"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(discount.name)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(discount.appliesToAll ? "Semua produk" : `${discount.productCount} produk`)}</p></div></td><td class="px-4 py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: discount.type === "percentage" ? "primary" : "info",
                variant: "soft",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(discount.typeLabel)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(discount.typeLabel),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`</td><td class="px-4 py-4"${_scopeId}><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(discount.valueDisplay)}</span></td><td class="px-4 py-4"${_scopeId}><div class="text-sm"${_scopeId}><p class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(discount.startDate))}</p><p class="text-gray-500 dark:text-gray-400"${_scopeId}> s/d ${ssrInterpolate(formatDate(discount.endDate))}</p></div></td><td class="px-4 py-4"${_scopeId}><div class="text-sm"${_scopeId}><p class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(discount.usageCount)} kali </p>`);
              if (discount.usageLimit) {
                _push2(`<p class="text-gray-500 dark:text-gray-400"${_scopeId}> dari ${ssrInterpolate(discount.usageLimit)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></td><td class="px-4 py-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$6, {
                status: discount.status
              }, null, _parent2, _scopeId));
              _push2(`</td><td class="px-4 py-4"${_scopeId}><div class="flex items-center justify-end gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_USwitch, {
                "model-value": Boolean(discount.isActive),
                size: "sm",
                "onUpdate:modelValue": ($event) => toggleActive(discount)
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UDropdownMenu, {
                items: getDropdownItems(discount)
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-ellipsis-vertical",
                      color: "neutral",
                      variant: "ghost",
                      size: "sm"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-ellipsis-vertical",
                        color: "neutral",
                        variant: "ghost",
                        size: "sm"
                      })
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`</div></td></tr>`);
            });
            _push2(`<!--]-->`);
            if (__props.discounts.length === 0) {
              _push2(`<tr${_scopeId}><td colspan="7" class="px-4 py-12 text-center"${_scopeId}><div class="flex flex-col items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-tag",
                class: "w-12 h-12 text-gray-300 dark:text-gray-600 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500 dark:text-gray-400 mb-4"${_scopeId}>Belum ada diskon</p>`);
              _push2(ssrRenderComponent(unref(Link), { href: "/admin/promotions/discounts/create" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-plus",
                      color: "primary",
                      variant: "soft"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Buat Diskon Pertama `);
                        } else {
                          return [
                            createTextVNode(" Buat Diskon Pertama ")
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
                        color: "primary",
                        variant: "soft"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Buat Diskon Pertama ")
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
              _push2(`</div></td></tr>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</tbody></table></div><!-- Pagination -->`);
            if (__props.discounts.length > 0) {
              _push2(`<div class="px-4 pb-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_sfc_main$a, {
                "current-page": __props.pagination.currentPage,
                "last-page": __props.pagination.lastPage,
                total: __props.pagination.total,
                "per-page": __props.pagination.perPage,
                onPageChange: goToPage
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "overflow-x-auto" }, [
                createVNode("table", { class: "w-full" }, [
                  createVNode("thead", null, [
                    createVNode("tr", { class: "border-b border-gray-200 dark:border-gray-700" }, [
                      createVNode("th", { class: "px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400" }, " Nama Diskon "),
                      createVNode("th", { class: "px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400" }, " Tipe "),
                      createVNode("th", { class: "px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400" }, " Nilai "),
                      createVNode("th", { class: "px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400" }, " Periode "),
                      createVNode("th", { class: "px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400" }, " Penggunaan "),
                      createVNode("th", { class: "px-4 py-3 text-left text-sm font-medium text-gray-500 dark:text-gray-400" }, " Status "),
                      createVNode("th", { class: "px-4 py-3 text-right text-sm font-medium text-gray-500 dark:text-gray-400" }, " Aksi ")
                    ])
                  ]),
                  createVNode("tbody", { class: "divide-y divide-gray-200 dark:divide-gray-700" }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.discounts, (discount) => {
                        return openBlock(), createBlock("tr", {
                          key: discount.id,
                          class: "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }, [
                          createVNode("td", { class: "px-4 py-4" }, [
                            createVNode("div", null, [
                              createVNode(
                                "p",
                                { class: "font-medium text-gray-900 dark:text-white" },
                                toDisplayString(discount.name),
                                1
                                /* TEXT */
                              ),
                              createVNode(
                                "p",
                                { class: "text-sm text-gray-500 dark:text-gray-400" },
                                toDisplayString(discount.appliesToAll ? "Semua produk" : `${discount.productCount} produk`),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          createVNode("td", { class: "px-4 py-4" }, [
                            createVNode(_component_UBadge, {
                              color: discount.type === "percentage" ? "primary" : "info",
                              variant: "soft",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(discount.typeLabel),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["color"])
                          ]),
                          createVNode("td", { class: "px-4 py-4" }, [
                            createVNode(
                              "span",
                              { class: "font-semibold text-gray-900 dark:text-white" },
                              toDisplayString(discount.valueDisplay),
                              1
                              /* TEXT */
                            )
                          ]),
                          createVNode("td", { class: "px-4 py-4" }, [
                            createVNode("div", { class: "text-sm" }, [
                              createVNode(
                                "p",
                                { class: "text-gray-900 dark:text-white" },
                                toDisplayString(formatDate(discount.startDate)),
                                1
                                /* TEXT */
                              ),
                              createVNode(
                                "p",
                                { class: "text-gray-500 dark:text-gray-400" },
                                " s/d " + toDisplayString(formatDate(discount.endDate)),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          createVNode("td", { class: "px-4 py-4" }, [
                            createVNode("div", { class: "text-sm" }, [
                              createVNode(
                                "p",
                                { class: "text-gray-900 dark:text-white" },
                                toDisplayString(discount.usageCount) + " kali ",
                                1
                                /* TEXT */
                              ),
                              discount.usageLimit ? (openBlock(), createBlock(
                                "p",
                                {
                                  key: 0,
                                  class: "text-gray-500 dark:text-gray-400"
                                },
                                " dari " + toDisplayString(discount.usageLimit),
                                1
                                /* TEXT */
                              )) : createCommentVNode("v-if", true)
                            ])
                          ]),
                          createVNode("td", { class: "px-4 py-4" }, [
                            createVNode(_sfc_main$6, {
                              status: discount.status
                            }, null, 8, ["status"])
                          ]),
                          createVNode("td", { class: "px-4 py-4" }, [
                            createVNode("div", { class: "flex items-center justify-end gap-2" }, [
                              createVNode(_component_USwitch, {
                                "model-value": Boolean(discount.isActive),
                                size: "sm",
                                "onUpdate:modelValue": ($event) => toggleActive(discount)
                              }, null, 8, ["model-value", "onUpdate:modelValue"]),
                              createVNode(_component_UDropdownMenu, {
                                items: getDropdownItems(discount)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UButton, {
                                    icon: "i-heroicons-ellipsis-vertical",
                                    color: "neutral",
                                    variant: "ghost",
                                    size: "sm"
                                  })
                                ]),
                                _: 1
                                /* STABLE */
                              }, 8, ["items"])
                            ])
                          ])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    )),
                    __props.discounts.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "7",
                        class: "px-4 py-12 text-center"
                      }, [
                        createVNode("div", { class: "flex flex-col items-center" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-tag",
                            class: "w-12 h-12 text-gray-300 dark:text-gray-600 mb-4"
                          }),
                          createVNode("p", { class: "text-gray-500 dark:text-gray-400 mb-4" }, "Belum ada diskon"),
                          createVNode(unref(Link), { href: "/admin/promotions/discounts/create" }, {
                            default: withCtx(() => [
                              createVNode(_component_UButton, {
                                icon: "i-heroicons-plus",
                                color: "primary",
                                variant: "soft"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Buat Diskon Pertama ")
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
                    ])) : createCommentVNode("v-if", true)
                  ])
                ])
              ]),
              createCommentVNode(" Pagination "),
              __props.discounts.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "px-4 pb-4"
              }, [
                createVNode(_sfc_main$a, {
                  "current-page": __props.pagination.currentPage,
                  "last-page": __props.pagination.lastPage,
                  total: __props.pagination.total,
                  "per-page": __props.pagination.perPage,
                  onPageChange: goToPage
                }, null, 8, ["current-page", "last-page", "total", "per-page"])
              ])) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Delete Modal -->`);
      _push(ssrRenderComponent(_sfc_main$b, {
        show: showDeleteModal.value,
        title: "Hapus Diskon",
        message: `Apakah Anda yakin ingin menghapus diskon '${selectedDiscount.value?.name}'? Tindakan ini tidak dapat dibatalkan.`,
        loading: isDeleting.value,
        onClose: ($event) => showDeleteModal.value = false,
        onConfirm: deleteDiscount
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/promotions/discounts/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
