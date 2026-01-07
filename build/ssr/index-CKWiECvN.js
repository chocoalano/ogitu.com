import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, unref, useSSRContext, mergeModels, useModel, createTextVNode, createCommentVNode, withKeys, createBlock, openBlock, Fragment, renderList, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { _ as _sfc_main$5, a as _sfc_main$8 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$4 } from './Card-h3oZeDee.js';
import { f as formatCurrency, t as transactionTypeOptions, a as transactionStatusOptions, b as formatDate } from './finance-BXYpuocZ.js';
import { _ as _sfc_main$7 } from './SelectMenu-BqLaY6AT.js';
import { _ as _sfc_main$6, a as _sfc_main$9 } from './Badge-CQlYH3Fo.js';
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

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TransactionStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!-- Overview Stats --><div class="grid grid-cols-1 sm:grid-cols-3 gap-4">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-document-text",
              class: "w-5 h-5 text-primary-600 dark:text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Total Transaksi</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.totalTransactions.toLocaleString())}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-document-text",
                    class: "w-5 h-5 text-primary-600 dark:text-primary-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Total Transaksi"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.totalTransactions.toLocaleString()),
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
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-success-100 dark:bg-success-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-calendar",
              class: "w-5 h-5 text-success-600 dark:text-success-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Bulan Ini</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.monthTransactions.toLocaleString())}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-success-100 dark:bg-success-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-calendar",
                    class: "w-5 h-5 text-success-600 dark:text-success-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Bulan Ini"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.monthTransactions.toLocaleString()),
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
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-info-100 dark:bg-info-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-clock",
              class: "w-5 h-5 text-info-600 dark:text-info-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Hari Ini</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.stats.todayTransactions.toLocaleString())}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-info-100 dark:bg-info-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-clock",
                    class: "w-5 h-5 text-info-600 dark:text-info-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Hari Ini"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.stats.todayTransactions.toLocaleString()),
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
      _push(`</div><!-- Amount Stats --><div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-down-circle",
              class: "w-6 h-6 mx-auto text-success-500 mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>Top Up</p><p class="font-bold text-gray-900 dark:text-white text-sm"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.stats.totalTopup))}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-down-circle",
                  class: "w-6 h-6 mx-auto text-success-500 mb-2"
                }),
                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Top Up"),
                createVNode(
                  "p",
                  { class: "font-bold text-gray-900 dark:text-white text-sm" },
                  toDisplayString(unref(formatCurrency)(__props.stats.totalTopup)),
                  1
                  /* TEXT */
                )
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-up-circle",
              class: "w-6 h-6 mx-auto text-error-500 mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>Penarikan</p><p class="font-bold text-gray-900 dark:text-white text-sm"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.stats.totalWithdrawal))}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-up-circle",
                  class: "w-6 h-6 mx-auto text-error-500 mb-2"
                }),
                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Penarikan"),
                createVNode(
                  "p",
                  { class: "font-bold text-gray-900 dark:text-white text-sm" },
                  toDisplayString(unref(formatCurrency)(__props.stats.totalWithdrawal)),
                  1
                  /* TEXT */
                )
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-currency-dollar",
              class: "w-6 h-6 mx-auto text-primary-500 mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>Komisi</p><p class="font-bold text-gray-900 dark:text-white text-sm"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.stats.totalCommission))}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-currency-dollar",
                  class: "w-6 h-6 mx-auto text-primary-500 mb-2"
                }),
                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Komisi"),
                createVNode(
                  "p",
                  { class: "font-bold text-gray-900 dark:text-white text-sm" },
                  toDisplayString(unref(formatCurrency)(__props.stats.totalCommission)),
                  1
                  /* TEXT */
                )
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shopping-cart",
              class: "w-6 h-6 mx-auto text-warning-500 mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>Pembayaran</p><p class="font-bold text-gray-900 dark:text-white text-sm"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.stats.totalPayment))}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shopping-cart",
                  class: "w-6 h-6 mx-auto text-warning-500 mb-2"
                }),
                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Pembayaran"),
                createVNode(
                  "p",
                  { class: "font-bold text-gray-900 dark:text-white text-sm" },
                  toDisplayString(unref(formatCurrency)(__props.stats.totalPayment)),
                  1
                  /* TEXT */
                )
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-uturn-left",
              class: "w-6 h-6 mx-auto text-info-500 mb-2"
            }, null, _parent2, _scopeId));
            _push2(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>Refund</p><p class="font-bold text-gray-900 dark:text-white text-sm"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.stats.totalRefund))}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "text-center" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-uturn-left",
                  class: "w-6 h-6 mx-auto text-info-500 mb-2"
                }),
                createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Refund"),
                createVNode(
                  "p",
                  { class: "font-bold text-gray-900 dark:text-white text-sm" },
                  toDisplayString(unref(formatCurrency)(__props.stats.totalRefund)),
                  1
                  /* TEXT */
                )
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/finance/TransactionStatsCards.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TransactionFilters",
  __ssrInlineRender: true,
  props: {
    "type": { default: "all" },
    "typeModifiers": {},
    "status": { default: "all" },
    "statusModifiers": {},
    "search": { default: "" },
    "searchModifiers": {},
    "dateFrom": { default: "" },
    "dateFromModifiers": {},
    "dateTo": { default: "" },
    "dateToModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["filter", "reset"], ["update:type", "update:status", "update:search", "update:dateFrom", "update:dateTo"]),
  setup(__props, { emit: __emit }) {
    const type = useModel(__props, "type");
    const status = useModel(__props, "status");
    const search = useModel(__props, "search");
    const dateFrom = useModel(__props, "dateFrom");
    const dateTo = useModel(__props, "dateTo");
    const emit = __emit;
    const handleFilter = () => {
      emit("filter");
    };
    const handleReset = () => {
      type.value = "all";
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
            _push2(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4"${_scopeId}><!-- Search -->`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari customer...",
              icon: "i-heroicons-magnifying-glass",
              onKeyup: handleFilter
            }, null, _parent2, _scopeId));
            _push2(`<!-- Type -->`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: type.value,
              "onUpdate:modelValue": ($event) => type.value = $event,
              items: unref(transactionTypeOptions),
              "value-key": "value",
              placeholder: "Tipe"
            }, null, _parent2, _scopeId));
            _push2(`<!-- Status -->`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: status.value,
              "onUpdate:modelValue": ($event) => status.value = $event,
              items: unref(transactionStatusOptions),
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
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4" }, [
                  createCommentVNode(" Search "),
                  createVNode(_component_UInput, {
                    modelValue: search.value,
                    "onUpdate:modelValue": ($event) => search.value = $event,
                    placeholder: "Cari customer...",
                    icon: "i-heroicons-magnifying-glass",
                    onKeyup: withKeys(handleFilter, ["enter"])
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createCommentVNode(" Type "),
                  createVNode(_component_USelectMenu, {
                    modelValue: type.value,
                    "onUpdate:modelValue": ($event) => type.value = $event,
                    items: unref(transactionTypeOptions),
                    "value-key": "value",
                    placeholder: "Tipe"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                  createCommentVNode(" Status "),
                  createVNode(_component_USelectMenu, {
                    modelValue: status.value,
                    "onUpdate:modelValue": ($event) => status.value = $event,
                    items: unref(transactionStatusOptions),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/finance/TransactionFilters.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TransactionTable",
  __ssrInlineRender: true,
  props: {
    transactions: {},
    isLoading: { type: Boolean }
  },
  setup(__props) {
    const getAvatarUrl = (avatar) => {
      if (!avatar) {
        return "https://placehold.co/40x40/1a1a2e/ffffff?text=U";
      }
      return avatar;
    };
    const isIncome = (type) => {
      return ["topup", "commission", "refund", "cashback"].includes(type);
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
            } else if (__props.transactions.length === 0) {
              _push2(`<div class="text-center py-12"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-inbox",
                class: "w-12 h-12 mx-auto text-gray-400 mb-3"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-500 dark:text-gray-400"${_scopeId}>Tidak ada transaksi</p></div>`);
            } else {
              _push2(`<div class="overflow-x-auto"${_scopeId}><table class="w-full"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-200 dark:border-gray-700"${_scopeId}><th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Customer </th><th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Tipe </th><th class="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Jumlah </th><th class="text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Saldo </th><th class="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Status </th><th class="text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Tanggal </th><th class="text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400"${_scopeId}> Aksi </th></tr></thead><tbody${_scopeId}><!--[-->`);
              ssrRenderList(__props.transactions, (transaction) => {
                _push2(`<tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"${_scopeId}><!-- Customer --><td class="py-3 px-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><img${ssrRenderAttr("src", getAvatarUrl(transaction.customerAvatar))}${ssrRenderAttr("alt", transaction.customerName)} class="w-10 h-10 rounded-full object-cover"${_scopeId}><div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(transaction.customerName)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(transaction.customerEmail)}</p></div></div></td><!-- Type --><td class="py-3 px-4"${_scopeId}><div class="flex items-center gap-2"${_scopeId}><div class="${ssrRenderClass([
                  "p-1.5 rounded-lg",
                  `bg-${transaction.typeColor}-100 dark:bg-${transaction.typeColor}-900/30`
                ])}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: transaction.typeIcon,
                  class: [
                    "w-4 h-4",
                    `text-${transaction.typeColor}-600 dark:text-${transaction.typeColor}-400`
                  ]
                }, null, _parent2, _scopeId));
                _push2(`</div><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(transaction.typeLabel)}</span></div></td><!-- Amount --><td class="py-3 px-4 text-right"${_scopeId}><p class="${ssrRenderClass([
                  "font-bold",
                  isIncome(transaction.transactionType) ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"
                ])}"${_scopeId}>${ssrInterpolate(isIncome(transaction.transactionType) ? "+" : "-")} ${ssrInterpolate(unref(formatCurrency)(transaction.amount))}</p></td><!-- Balance --><td class="py-3 px-4 text-right"${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(transaction.balanceBefore))}</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}> → ${ssrInterpolate(unref(formatCurrency)(transaction.balanceAfter))}</p></td><!-- Status --><td class="py-3 px-4 text-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: transaction.statusColor,
                  variant: "soft"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(transaction.statusLabel)}`);
                    } else {
                      return [
                        createTextVNode(
                          toDisplayString(transaction.statusLabel),
                          1
                          /* TEXT */
                        )
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(`</td><!-- Date --><td class="py-3 px-4"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-300"${_scopeId}>${ssrInterpolate(unref(formatDate)(transaction.createdAt))}</p></td><!-- Actions --><td class="py-3 px-4 text-center"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Link), {
                  href: `/admin/finance/transactions/${transaction.id}`
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
                _push2(`</td></tr>`);
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
              ])) : __props.transactions.length === 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-12"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-inbox",
                  class: "w-12 h-12 mx-auto text-gray-400 mb-3"
                }),
                createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Tidak ada transaksi")
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "overflow-x-auto"
              }, [
                createVNode("table", { class: "w-full" }, [
                  createVNode("thead", null, [
                    createVNode("tr", { class: "border-b border-gray-200 dark:border-gray-700" }, [
                      createVNode("th", { class: "text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Customer "),
                      createVNode("th", { class: "text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Tipe "),
                      createVNode("th", { class: "text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Jumlah "),
                      createVNode("th", { class: "text-right py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Saldo "),
                      createVNode("th", { class: "text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Status "),
                      createVNode("th", { class: "text-left py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Tanggal "),
                      createVNode("th", { class: "text-center py-3 px-4 text-sm font-medium text-gray-500 dark:text-gray-400" }, " Aksi ")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.transactions, (transaction) => {
                        return openBlock(), createBlock("tr", {
                          key: transaction.id,
                          class: "border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }, [
                          createCommentVNode(" Customer "),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("img", {
                                src: getAvatarUrl(transaction.customerAvatar),
                                alt: transaction.customerName,
                                class: "w-10 h-10 rounded-full object-cover"
                              }, null, 8, ["src", "alt"]),
                              createVNode("div", null, [
                                createVNode(
                                  "p",
                                  { class: "font-medium text-gray-900 dark:text-white" },
                                  toDisplayString(transaction.customerName),
                                  1
                                  /* TEXT */
                                ),
                                createVNode(
                                  "p",
                                  { class: "text-sm text-gray-500 dark:text-gray-400" },
                                  toDisplayString(transaction.customerEmail),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ])
                          ]),
                          createCommentVNode(" Type "),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode("div", { class: "flex items-center gap-2" }, [
                              createVNode(
                                "div",
                                {
                                  class: [
                                    "p-1.5 rounded-lg",
                                    `bg-${transaction.typeColor}-100 dark:bg-${transaction.typeColor}-900/30`
                                  ]
                                },
                                [
                                  createVNode(_component_UIcon, {
                                    name: transaction.typeIcon,
                                    class: [
                                      "w-4 h-4",
                                      `text-${transaction.typeColor}-600 dark:text-${transaction.typeColor}-400`
                                    ]
                                  }, null, 8, ["name", "class"])
                                ],
                                2
                                /* CLASS */
                              ),
                              createVNode(
                                "span",
                                { class: "font-medium text-gray-900 dark:text-white" },
                                toDisplayString(transaction.typeLabel),
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          createCommentVNode(" Amount "),
                          createVNode("td", { class: "py-3 px-4 text-right" }, [
                            createVNode(
                              "p",
                              {
                                class: [
                                  "font-bold",
                                  isIncome(transaction.transactionType) ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"
                                ]
                              },
                              toDisplayString(isIncome(transaction.transactionType) ? "+" : "-") + " " + toDisplayString(unref(formatCurrency)(transaction.amount)),
                              3
                              /* TEXT, CLASS */
                            )
                          ]),
                          createCommentVNode(" Balance "),
                          createVNode("td", { class: "py-3 px-4 text-right" }, [
                            createVNode(
                              "p",
                              { class: "text-sm text-gray-500 dark:text-gray-400" },
                              toDisplayString(unref(formatCurrency)(transaction.balanceBefore)),
                              1
                              /* TEXT */
                            ),
                            createVNode(
                              "p",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              " → " + toDisplayString(unref(formatCurrency)(transaction.balanceAfter)),
                              1
                              /* TEXT */
                            )
                          ]),
                          createCommentVNode(" Status "),
                          createVNode("td", { class: "py-3 px-4 text-center" }, [
                            createVNode(_component_UBadge, {
                              color: transaction.statusColor,
                              variant: "soft"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(transaction.statusLabel),
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
                              toDisplayString(unref(formatDate)(transaction.createdAt)),
                              1
                              /* TEXT */
                            )
                          ]),
                          createCommentVNode(" Actions "),
                          createVNode("td", { class: "py-3 px-4 text-center" }, [
                            createVNode(unref(Link), {
                              href: `/admin/finance/transactions/${transaction.id}`
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
                            }, 8, ["href"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/finance/TransactionTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    transactions: {},
    pagination: {},
    stats: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const type = ref(props.filters.type || "all");
    const status = ref(props.filters.status || "all");
    const search = ref(props.filters.search);
    const dateFrom = ref(props.filters.dateFrom);
    const dateTo = ref(props.filters.dateTo);
    const isLoading = ref(false);
    const applyFilters = () => {
      isLoading.value = true;
      router.get(
        "/admin/finance/transactions",
        {
          type: type.value === "all" ? "" : type.value,
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
      type.value = "all";
      status.value = "all";
      search.value = "";
      dateFrom.value = "";
      dateTo.value = "";
      applyFilters();
    };
    const goToPage = (page) => {
      isLoading.value = true;
      router.get(
        "/admin/finance/transactions",
        {
          type: type.value === "all" ? "" : type.value,
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 space-y-6" }, _attrs))}><!-- Header --><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Riwayat Transaksi</h1><p class="text-gray-500 dark:text-gray-400"> Lihat semua transaksi wallet dari customer </p></div><!-- Stats -->`);
      _push(ssrRenderComponent(_sfc_main$3, { stats: __props.stats }, null, _parent));
      _push(`<!-- Filters -->`);
      _push(ssrRenderComponent(_sfc_main$2, {
        type: type.value,
        "onUpdate:type": ($event) => type.value = $event,
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
        transactions: __props.transactions,
        "is-loading": isLoading.value
      }, null, _parent));
      _push(`<!-- Pagination -->`);
      _push(ssrRenderComponent(_sfc_main$a, {
        pagination: __props.pagination,
        onPageChange: goToPage
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/finance/transactions/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
