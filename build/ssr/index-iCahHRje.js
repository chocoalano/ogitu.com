import { defineComponent, mergeProps, withCtx, unref, createVNode, toDisplayString, useSSRContext, mergeModels, useModel, createTextVNode, createCommentVNode, withKeys, createBlock, openBlock, Fragment, renderList, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { _ as _sfc_main$5, a as _sfc_main$8 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$4 } from './Card-h3oZeDee.js';
import { f as formatCurrency, w as withdrawalStatusOptions, b as formatDate } from './finance-BXYpuocZ.js';
import { _ as _sfc_main$7 } from './SelectMenu-BqLaY6AT.js';
import { _ as _sfc_main$6, a as _sfc_main$9 } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$b } from './WithdrawalActionModal-DN7W-zKE.js';
import { _ as _sfc_main$a } from './FinancePagination-_vsyN3Z1.js';
import './Tooltip-C54KurGy.js';
import 'defu';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Textarea-yrK84h3-.js';
import './FormField-CdECN7pk.js';
import './Modal-VctJV7vb.js';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WithdrawalStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, _attrs))}><!-- Pending -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-warning-100 dark:bg-warning-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-clock",
              class: "w-5 h-5 text-warning-600 dark:text-warning-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Menunggu</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.pending)}</p><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.stats.pendingAmount))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-warning-100 dark:bg-warning-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-clock",
                    class: "w-5 h-5 text-warning-600 dark:text-warning-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Menunggu"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.pending),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-xs text-gray-400" },
                    toDisplayString(unref(formatCurrency)(__props.stats.pendingAmount)),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Completed -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-success-100 dark:bg-success-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-check-circle",
              class: "w-5 h-5 text-success-600 dark:text-success-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Selesai</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.completed)}</p><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.stats.totalAmount))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-success-100 dark:bg-success-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-check-circle",
                    class: "w-5 h-5 text-success-600 dark:text-success-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Selesai"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.completed),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-xs text-gray-400" },
                    toDisplayString(unref(formatCurrency)(__props.stats.totalAmount)),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Failed -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-error-100 dark:bg-error-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-x-circle",
              class: "w-5 h-5 text-error-600 dark:text-error-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Ditolak</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.failed)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-error-100 dark:bg-error-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-circle",
                    class: "w-5 h-5 text-error-600 dark:text-error-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Ditolak"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.failed),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Total -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-banknotes",
              class: "w-5 h-5 text-primary-600 dark:text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Total Request</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.total)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-banknotes",
                    class: "w-5 h-5 text-primary-600 dark:text-primary-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Total Request"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.total),
                    1
                    /* TEXT */
                  )
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/finance/WithdrawalStatsCards.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "WithdrawalFilters",
  __ssrInlineRender: true,
  props: {
    "status": { default: "all" },
    "statusModifiers": {},
    "search": { default: "" },
    "searchModifiers": {},
    "dateFrom": { default: "" },
    "dateFromModifiers": {},
    "dateTo": { default: "" },
    "dateToModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["filter", "reset"], ["update:status", "update:search", "update:dateFrom", "update:dateTo"]),
  setup(__props, { emit: __emit }) {
    const status = useModel(__props, "status");
    const search = useModel(__props, "search");
    const dateFrom = useModel(__props, "dateFrom");
    const dateTo = useModel(__props, "dateTo");
    const emit = __emit;
    const handleFilter = () => {
      emit("filter");
    };
    const handleReset = () => {
      status.value = "all";
      search.value = "";
      dateFrom.value = "";
      dateTo.value = "";
      emit("reset");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UInput = _sfc_main$6;
      const _component_USelectMenu = _sfc_main$7;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"${_scopeId}><!-- Search -->`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari nama/email customer...",
              icon: "i-heroicons-magnifying-glass",
              onKeyup: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`<!-- Status -->`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: status.value,
              "onUpdate:modelValue": ($event) => status.value = $event,
              items: unref(withdrawalStatusOptions),
              "value-key": "value",
              placeholder: "Status"
            }, null, _parent2, _scopeId));
            _push2(`<!-- Date From -->`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: dateFrom.value,
              "onUpdate:modelValue": ($event) => dateFrom.value = $event,
              type: "date",
              placeholder: "Dari Tanggal"
            }, null, _parent2, _scopeId));
            _push2(`<!-- Date To -->`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: dateTo.value,
              "onUpdate:modelValue": ($event) => dateTo.value = $event,
              type: "date",
              placeholder: "Sampai Tanggal"
            }, null, _parent2, _scopeId));
            _push2(`<!-- Actions --><div class="flex gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              icon: "i-heroicons-funnel",
              onClick: handleFilter
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Filter `);
                } else {
                  return [
                    createTextVNode(" Filter ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              icon: "i-heroicons-x-mark",
              onClick: handleReset
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Reset `);
                } else {
                  return [
                    createTextVNode(" Reset ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4" }, [
                  createCommentVNode(" Search "),
                  createVNode(_component_UInput, {
                    modelValue: search.value,
                    "onUpdate:modelValue": ($event) => search.value = $event,
                    placeholder: "Cari nama/email customer...",
                    icon: "i-heroicons-magnifying-glass",
                    onKeyup: withKeys(handleFilter, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createCommentVNode(" Status "),
                  createVNode(_component_USelectMenu, {
                    modelValue: status.value,
                    "onUpdate:modelValue": ($event) => status.value = $event,
                    items: unref(withdrawalStatusOptions),
                    "value-key": "value",
                    placeholder: "Status"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                  createCommentVNode(" Date From "),
                  createVNode(_component_UInput, {
                    modelValue: dateFrom.value,
                    "onUpdate:modelValue": ($event) => dateFrom.value = $event,
                    type: "date",
                    placeholder: "Dari Tanggal"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createCommentVNode(" Date To "),
                  createVNode(_component_UInput, {
                    modelValue: dateTo.value,
                    "onUpdate:modelValue": ($event) => dateTo.value = $event,
                    type: "date",
                    placeholder: "Sampai Tanggal"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createCommentVNode(" Actions "),
                  createVNode("div", { class: "flex gap-2" }, [
                    createVNode(_component_UButton, {
                      color: "primary",
                      icon: "i-heroicons-funnel",
                      onClick: handleFilter
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Filter ")
                      ]),
                      _: 1
                      /* STABLE */
                    }),
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      icon: "i-heroicons-x-mark",
                      onClick: handleReset
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Reset ")
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])
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

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/finance/WithdrawalFilters.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "WithdrawalTable",
  __ssrInlineRender: true,
  props: {
    withdrawals: {},
    isLoading: { type: Boolean }
  },
  emits: ["approve", "reject"],
  setup(__props, { emit: __emit }) {
    const getAvatarUrl = (avatar) => {
      if (!avatar) {
        return "https://placehold.co/40x40/1a1a2e/ffffff?text=U";
      }
      return avatar;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      const _component_UBadge = _sfc_main$9;
      const _component_UButton = _sfc_main$8;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.isLoading) {
              _push2(`<div class="flex items-center justify-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-8 h-8 animate-spin text-gray-400"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (__props.withdrawals.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-inbox",
                class: "w-12 h-12 mx-auto text-gray-400 mb-3"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500 dark:text-gray-400"${_scopeId}>Tidak ada permintaan withdraw</p></div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-200 dark:border-gray-700"${_scopeId}><th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Customer </th><th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Bank Info </th><th class="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Jumlah </th><th class="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Status </th><th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Tanggal </th><th class="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Aksi </th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.withdrawals, (withdrawal) => {
                _push2(`<tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"${_scopeId}><!-- Customer --><td class="py-3 px-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><img${ssrRenderAttr("src", getAvatarUrl(withdrawal.customerAvatar))}${ssrRenderAttr("alt", withdrawal.customerName)} class="w-10 h-10 rounded-full object-cover"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(withdrawal.customerName)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(withdrawal.customerEmail)}</p></div></div></td><!-- Bank Info --><td class="py-3 px-4"${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(withdrawal.bankName)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(withdrawal.accountNumber)}</p><p class="text-xs text-gray-400"${_scopeId}>${ssrInterpolate(withdrawal.accountName)}</p></td><!-- Amount --><td class="py-3 px-4 text-right"${_scopeId}><p class="font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(withdrawal.amount))}</p></td><!-- Status --><td class="py-3 px-4 text-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: withdrawal.statusColor,
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(withdrawal.statusLabel)}`);
                    } else {
                      return [
                        createTextVNode(
                          toDisplayString(withdrawal.statusLabel),
                          1
                          /* TEXT */
                        )
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(`</td><!-- Date --><td class="py-3 px-4"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-300"${_scopeId}>${ssrInterpolate(unref(formatDate)(withdrawal.createdAt))}</p></td><!-- Actions --><td class="py-3 px-4"${_scopeId}><div class="flex items-center justify-center gap-2"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/admin/finance/withdraw/${withdrawal.id}`
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UButton, {
                        icon: "i-heroicons-eye",
                        color: "neutral",
                        variant: "ghost",
                        size: "sm"
                      }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-eye",
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
                if (withdrawal.status === "pending") {
                  _push2(`<!--[-->`);
                  _push2(ssrRenderComponent(_component_UButton, {
                    icon: "i-heroicons-check",
                    color: "success",
                    variant: "soft",
                    size: "sm",
                    onClick: ($event) => _ctx.$emit("approve", withdrawal)
                  }, null, _parent2, _scopeId));
                  _push2(ssrRenderComponent(_component_UButton, {
                    icon: "i-heroicons-x-mark",
                    color: "error",
                    variant: "soft",
                    size: "sm",
                    onClick: ($event) => _ctx.$emit("reject", withdrawal)
                  }, null, _parent2, _scopeId));
                  _push2(`<!--]-->`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div></td></tr>`);
              });
              _push2(`<!--]--></tbody></table></div>`);
            }
          } else {
            return [
              __props.isLoading ? (openBlock(), createBlock("div", {
                key: 0,
                class: "flex items-center justify-center py-12"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-8 h-8 animate-spin text-gray-400"
                })
              ])) : __props.withdrawals.length === 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-12"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-inbox",
                  class: "w-12 h-12 mx-auto text-gray-400 mb-3"
                }),
                createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Tidak ada permintaan withdraw")
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "overflow-x-auto"
              }, [
                createVNode("table", { class: "w-full" }, [
                  createVNode("thead", null, [
                    createVNode("tr", { class: "border-b border-gray-200 dark:border-gray-700" }, [
                      createVNode("th", { class: "text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Customer "),
                      createVNode("th", { class: "text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Bank Info "),
                      createVNode("th", { class: "text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Jumlah "),
                      createVNode("th", { class: "text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Status "),
                      createVNode("th", { class: "text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Tanggal "),
                      createVNode("th", { class: "text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Aksi ")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.withdrawals, (withdrawal) => {
                        return openBlock(), createBlock("tr", {
                          key: withdrawal.id,
                          class: "border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }, [
                          createCommentVNode(" Customer "),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("img", {
                                src: getAvatarUrl(withdrawal.customerAvatar),
                                alt: withdrawal.customerName,
                                class: "w-10 h-10 rounded-full object-cover"
                              }, null, 8, ["src", "alt"]),
                              createVNode("div", null, [
                                createVNode(
                                  "p",
                                  { class: "font-medium text-gray-900 dark:text-white" },
                                  toDisplayString(withdrawal.customerName),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "p",
                                  { class: "text-sm text-gray-500 dark:text-gray-400" },
                                  toDisplayString(withdrawal.customerEmail),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ])
                          ]),
                          createCommentVNode(" Bank Info "),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode(
                              "p",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              toDisplayString(withdrawal.bankName),
                              1
                              /* TEXT */
                            ),
                            createVNode(
                              "p",
                              { class: "text-sm text-gray-500 dark:text-gray-400" },
                              toDisplayString(withdrawal.accountNumber),
                              1
                              /* TEXT */
                            ),
                            createVNode(
                              "p",
                              { class: "text-xs text-gray-400" },
                              toDisplayString(withdrawal.accountName),
                              1
                              /* TEXT */
                            )
                          ]),
                          createCommentVNode(" Amount "),
                          createVNode("td", { class: "py-3 px-4 text-right" }, [
                            createVNode(
                              "p",
                              { class: "font-bold text-gray-900 dark:text-white" },
                              toDisplayString(unref(formatCurrency)(withdrawal.amount)),
                              1
                              /* TEXT */
                            )
                          ]),
                          createCommentVNode(" Status "),
                          createVNode("td", { class: "py-3 px-4 text-center" }, [
                            createVNode(_component_UBadge, {
                              color: withdrawal.statusColor,
                              variant: "soft"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(withdrawal.statusLabel),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["color"])
                          ]),
                          createCommentVNode(" Date "),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode(
                              "p",
                              { class: "text-sm text-gray-600 dark:text-gray-300" },
                              toDisplayString(unref(formatDate)(withdrawal.createdAt)),
                              1
                              /* TEXT */
                            )
                          ]),
                          createCommentVNode(" Actions "),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode("div", { class: "flex items-center justify-center gap-2" }, [
                              createVNode(unref(Link), {
                                href: `/admin/finance/withdraw/${withdrawal.id}`
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UButton, {
                                    icon: "i-heroicons-eye",
                                    color: "neutral",
                                    variant: "ghost",
                                    size: "sm"
                                  })
                                ]),
                                _: 1
                                /* STABLE */
                              }, 8, ["href"]),
                              withdrawal.status === "pending" ? (openBlock(), createBlock(
                                Fragment,
                                { key: 0 },
                                [
                                  createVNode(_component_UButton, {
                                    icon: "i-heroicons-check",
                                    color: "success",
                                    variant: "soft",
                                    size: "sm",
                                    onClick: ($event) => _ctx.$emit("approve", withdrawal)
                                  }, null, 8, ["onClick"]),
                                  createVNode(_component_UButton, {
                                    icon: "i-heroicons-x-mark",
                                    color: "error",
                                    variant: "soft",
                                    size: "sm",
                                    onClick: ($event) => _ctx.$emit("reject", withdrawal)
                                  }, null, 8, ["onClick"])
                                ],
                                64
                                /* STABLE_FRAGMENT */
                              )) : createCommentVNode("v-if", true)
                            ])
                          ])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/finance/WithdrawalTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    withdrawals: {},
    pagination: {},
    stats: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const status = ref(props.filters.status || "all");
    const search = ref(props.filters.search);
    const dateFrom = ref(props.filters.dateFrom);
    const dateTo = ref(props.filters.dateTo);
    const isLoading = ref(false);
    const showApproveModal = ref(false);
    const showRejectModal = ref(false);
    const selectedWithdrawal = ref(null);
    const applyFilters = () => {
      isLoading.value = true;
      router.get(
        "/admin/finance/withdraw",
        {
          status: status.value === "all" ? "" : status.value,
          search: search.value,
          dateFrom: dateFrom.value,
          dateTo: dateTo.value
        },
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => {
            isLoading.value = false;
          }
        }
      );
    };
    const resetFilters = () => {
      status.value = "all";
      search.value = "";
      dateFrom.value = "";
      dateTo.value = "";
      applyFilters();
    };
    const goToPage = (page) => {
      isLoading.value = true;
      router.get(
        "/admin/finance/withdraw",
        {
          status: status.value === "all" ? "" : status.value,
          search: search.value,
          dateFrom: dateFrom.value,
          dateTo: dateTo.value,
          page
        },
        {
          preserveState: true,
          preserveScroll: true,
          onFinish: () => {
            isLoading.value = false;
          }
        }
      );
    };
    const handleApprove = (withdrawal) => {
      selectedWithdrawal.value = withdrawal;
      showApproveModal.value = true;
    };
    const handleReject = (withdrawal) => {
      selectedWithdrawal.value = withdrawal;
      showRejectModal.value = true;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><!-- Header --><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Permintaan Withdraw</h1><p class="text-gray-500 dark:text-gray-400"> Kelola permintaan penarikan saldo dari customer </p></div><!-- Stats -->`);
      _push(ssrRenderComponent(_sfc_main$3, { stats: __props.stats }, null, _parent));
      _push(`<!-- Filters -->`);
      _push(ssrRenderComponent(_sfc_main$2, {
        status: status.value,
        "onUpdate:status": ($event) => status.value = $event,
        search: search.value,
        "onUpdate:search": ($event) => search.value = $event,
        "date-from": dateFrom.value,
        "onUpdate:dateFrom": ($event) => dateFrom.value = $event,
        "date-to": dateTo.value,
        "onUpdate:dateTo": ($event) => dateTo.value = $event,
        onFilter: applyFilters,
        onReset: resetFilters
      }, null, _parent));
      _push(`<!-- Table -->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        withdrawals: __props.withdrawals,
        "is-loading": isLoading.value,
        onApprove: handleApprove,
        onReject: handleReject
      }, null, _parent));
      _push(`<!-- Pagination -->`);
      _push(ssrRenderComponent(_sfc_main$a, {
        pagination: __props.pagination,
        onPageChange: goToPage
      }, null, _parent));
      _push(`<!-- Modals -->`);
      _push(ssrRenderComponent(_sfc_main$b, {
        modelValue: showApproveModal.value,
        "onUpdate:modelValue": ($event) => showApproveModal.value = $event,
        withdrawal: selectedWithdrawal.value,
        type: "approve"
      }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$b, {
        modelValue: showRejectModal.value,
        "onUpdate:modelValue": ($event) => showRejectModal.value = $event,
        withdrawal: selectedWithdrawal.value,
        type: "reject"
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/finance/withdraw/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
