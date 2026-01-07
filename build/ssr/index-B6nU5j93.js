import { _ as _sfc_main$6, a as _sfc_main$a } from './Button-BBveOjhJ.js';
import { defineComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext, mergeModels, useModel, computed, unref, createTextVNode, createBlock, openBlock, Fragment, renderList, renderSlot, ref, watch, createSlots, createCommentVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { g as getStatusBadgeColor, u as useOrderFormatters, a as useOrderActions, _ as _sfc_main$b, b as _sfc_main$c } from './CancelModal-CwJL00Rr.js';
import { _ as _sfc_main$5 } from './Card-Ci6a5H8H.js';
import { _ as _sfc_main$8 } from './SelectMenu-CGTADs72.js';
import { _ as _sfc_main$7, a as _sfc_main$9 } from './Badge-DaOjA2YD.js';
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
import './Tooltip-N44Fzd4m.js';
import './FormField-BIqlRgyi.js';
import './Modal-lw8uQ47S.js';
import './Textarea-DTaAAeeU.js';
import './Alert-D5zWQYXW.js';
import 'reka-ui/namespaced';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "OrderStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const getIconBgClass = (color) => {
      const classes = {
        warning: "bg-yellow-100 dark:bg-yellow-900/30",
        primary: "bg-blue-100 dark:bg-blue-900/30",
        success: "bg-green-100 dark:bg-green-900/30",
        neutral: "bg-gray-100 dark:bg-gray-800"
      };
      return classes[color];
    };
    const getIconClass = (color) => {
      const classes = {
        warning: "text-yellow-600 dark:text-yellow-400",
        primary: "text-blue-600 dark:text-blue-400",
        success: "text-green-600 dark:text-green-400",
        neutral: "text-gray-600 dark:text-gray-400"
      };
      return classes[color];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.stats, (stat) => {
        _push(ssrRenderComponent(_component_UCard, {
          key: stat.label,
          class: "relative overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-4"${_scopeId}><div class="${ssrRenderClass(["p-3 rounded-xl", getIconBgClass(stat.color)])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: stat.icon,
                class: ["w-6 h-6", getIconClass(stat.color)]
              }, null, _parent2, _scopeId));
              _push2(`</div><div${_scopeId}><p class="text-2xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(stat.value)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(stat.label)}</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-4" }, [
                  createVNode(
                    "div",
                    {
                      class: ["p-3 rounded-xl", getIconBgClass(stat.color)]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: stat.icon,
                        class: ["w-6 h-6", getIconClass(stat.color)]
                      }, null, 8, ["name", "class"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createVNode("div", null, [
                    createVNode(
                      "p",
                      { class: "text-2xl font-bold text-gray-900 dark:text-white" },
                      toDisplayString(stat.value),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-sm text-gray-500 dark:text-gray-400" },
                      toDisplayString(stat.label),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
      });
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/OrderStatsCards.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "OrderFilters",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    statusOptions: {}
  }, {
    "search": { default: "" },
    "searchModifiers": {},
    "status": { default: "" },
    "statusModifiers": {}
  }),
  emits: ["update:search", "update:status"],
  setup(__props) {
    const search = useModel(__props, "search");
    const status = useModel(__props, "status");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UInput = _sfc_main$7;
      const _component_USelectMenu = _sfc_main$8;
      const _component_UIcon = _sfc_main$6;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col sm:flex-row gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: search.value,
              "onUpdate:modelValue": ($event) => search.value = $event,
              placeholder: "Cari nomor pesanan atau nama customer...",
              icon: "i-heroicons-magnifying-glass",
              class: "flex-1",
              size: "lg"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: status.value,
              "onUpdate:modelValue": ($event) => status.value = $event,
              items: __props.statusOptions,
              "value-key": "value",
              "option-attribute": "label",
              placeholder: "Filter Status",
              class: "w-full sm:w-64",
              size: "lg"
            }, {
              leading: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-funnel",
                    class: "w-5 h-5 text-gray-400"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-funnel",
                      class: "w-5 h-5 text-gray-400"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col sm:flex-row gap-4" }, [
                createVNode(_component_UInput, {
                  modelValue: search.value,
                  "onUpdate:modelValue": ($event) => search.value = $event,
                  placeholder: "Cari nomor pesanan atau nama customer...",
                  icon: "i-heroicons-magnifying-glass",
                  class: "flex-1",
                  size: "lg"
                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_USelectMenu, {
                  modelValue: status.value,
                  "onUpdate:modelValue": ($event) => status.value = $event,
                  items: __props.statusOptions,
                  "value-key": "value",
                  "option-attribute": "label",
                  placeholder: "Filter Status",
                  class: "w-full sm:w-64",
                  size: "lg"
                }, {
                  leading: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-funnel",
                      class: "w-5 h-5 text-gray-400"
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/OrderFilters.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "OrderCard",
  __ssrInlineRender: true,
  props: {
    order: {}
  },
  emits: ["view", "process", "ship", "track", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formatCurrency, formatRelativeTime } = useOrderFormatters();
    const firstItem = computed(() => props.order.items?.[0] || null);
    const canProcess = computed(() => props.order.status === "paid");
    const canShip = computed(() => ["paid", "processing"].includes(props.order.status));
    const canTrack = computed(() => props.order.status === "shipped" && props.order.shipping?.waybill);
    const canCancel = computed(() => ["pending_payment", "paid"].includes(props.order.status));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UBadge = _sfc_main$9;
      const _component_UIcon = _sfc_main$6;
      const _component_UButton = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors" }, _attrs))}><!-- Header: Status & Order Info --><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(getStatusBadgeColor)(__props.order.statusColor),
        variant: "soft",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.order.statusLabel)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.order.statusLabel),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<div><p class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.order.orderNumber)}</p><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(formatRelativeTime)(__props.order.createdAt))}</p></div></div><div class="text-right"><p class="text-lg font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(formatCurrency)(__props.order.total))}</p><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.order.itemCount)} item</p></div></div><!-- Product Preview -->`);
      if (firstItem.value) {
        _push(`<div class="flex items-center gap-4 mb-4"><img${ssrRenderAttr("src", __props.order.firstItemImage || "https://placehold.co/80x80/1a1a2e/ffffff?text=No+Image")}${ssrRenderAttr("alt", firstItem.value.productName || "Product")} class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"><div class="flex-1 min-w-0"><p class="font-medium text-gray-900 dark:text-white truncate">${ssrInterpolate(firstItem.value.productName)} `);
        if (firstItem.value.variantName) {
          _push(`<span class="text-gray-500">- ${ssrInterpolate(firstItem.value.variantName)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(firstItem.value.quantity)}x ${ssrInterpolate(unref(formatCurrency)(firstItem.value.price || 0))}</p>`);
        if (__props.order.itemCount > 1) {
          _push(`<p class="text-sm text-gray-400 dark:text-gray-500"> +${ssrInterpolate(__props.order.itemCount - 1)} produk lainnya </p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Customer Info -->`);
      if (__props.order.customer) {
        _push(`<div class="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-user",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(__props.order.customer.name)}</span><span class="text-gray-400">•</span><span>${ssrInterpolate(__props.order.customer.phone)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Shipping Info -->`);
      if (__props.order.shipping?.waybill) {
        _push(`<div class="flex items-center gap-2 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-sm">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-truck",
          class: "w-5 h-5 text-blue-600 dark:text-blue-400"
        }, null, _parent));
        _push(`<span class="font-medium text-blue-900 dark:text-blue-100">${ssrInterpolate(__props.order.shipping.courierName)}</span><span class="text-blue-600 dark:text-blue-400">•</span><span class="font-mono text-blue-800 dark:text-blue-200">${ssrInterpolate(__props.order.shipping.waybill)}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Customer Notes -->`);
      if (__props.order.customerNotes) {
        _push(`<div class="flex items-start gap-2 mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chat-bubble-left-ellipsis",
          class: "w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5"
        }, null, _parent));
        _push(`<p class="text-yellow-800 dark:text-yellow-200">${ssrInterpolate(__props.order.customerNotes)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Action Buttons --><div class="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "ghost",
        size: "sm",
        icon: "i-heroicons-eye",
        onClick: ($event) => emit("view", __props.order)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Detail `);
          } else {
            return [
              createTextVNode(" Detail ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (canProcess.value) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          variant: "soft",
          size: "sm",
          icon: "i-heroicons-play",
          onClick: ($event) => emit("process", __props.order)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Proses Pesanan `);
            } else {
              return [
                createTextVNode(" Proses Pesanan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (canShip.value) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          size: "sm",
          icon: "i-heroicons-truck",
          onClick: ($event) => emit("ship", __props.order)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.order.shipping?.waybill ? "Update Resi" : "Input Resi")}`);
            } else {
              return [
                createTextVNode(
                  toDisplayString(__props.order.shipping?.waybill ? "Update Resi" : "Input Resi"),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (canTrack.value) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "soft",
          size: "sm",
          icon: "i-heroicons-map-pin",
          onClick: ($event) => emit("track", __props.order)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Lacak `);
            } else {
              return [
                createTextVNode(" Lacak ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (canCancel.value) {
        _push(ssrRenderComponent(_component_UButton, {
          color: "error",
          variant: "ghost",
          size: "sm",
          icon: "i-heroicons-x-mark",
          onClick: ($event) => emit("cancel", __props.order)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Batalkan `);
            } else {
              return [
                createTextVNode(" Batalkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/OrderCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrderList",
  __ssrInlineRender: true,
  props: {
    orders: {},
    total: {},
    loading: { type: Boolean }
  },
  emits: ["view", "process", "ship", "track", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const hasOrders = computed(() => props.orders.length > 0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UBadge = _sfc_main$9;
      const _component_UIcon = _sfc_main$6;
      _push(ssrRenderComponent(_component_UCard, mergeProps({ ui: { body: { padding: "" } } }, _attrs), {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Daftar Pesanan</h3>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: "neutral",
              variant: "soft"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.total)} pesanan`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(__props.total) + " pesanan",
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Daftar Pesanan"),
                createVNode(_component_UBadge, {
                  color: "neutral",
                  variant: "soft"
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString(__props.total) + " pesanan",
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "pagination", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "pagination")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.loading) {
              _push2(`<div class="p-8 flex justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-8 h-8 text-primary-500 animate-spin"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else if (!hasOrders.value) {
              _push2(`<div class="p-8 text-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shopping-bag",
                class: "w-16 h-16 mx-auto text-gray-300 dark:text-gray-600"
              }, null, _parent2, _scopeId));
              _push2(`<h3 class="mt-4 text-lg font-medium text-gray-900 dark:text-white"${_scopeId}>Belum Ada Pesanan</h3><p class="mt-2 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Pesanan dari pelanggan akan muncul di sini</p></div>`);
            } else {
              _push2(`<div class="divide-y divide-gray-200 dark:divide-gray-800"${_scopeId}><!--[-->`);
              ssrRenderList(__props.orders, (order) => {
                _push2(ssrRenderComponent(_sfc_main$2, {
                  key: order.id,
                  order,
                  onView: ($event) => emit("view", order),
                  onProcess: ($event) => emit("process", order),
                  onShip: ($event) => emit("ship", order),
                  onTrack: ($event) => emit("track", order),
                  onCancel: ($event) => emit("cancel", order)
                }, null, _parent2, _scopeId));
              });
              _push2(`<!--]--></div>`);
            }
          } else {
            return [
              __props.loading ? (openBlock(), createBlock("div", {
                key: 0,
                class: "p-8 flex justify-center"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-8 h-8 text-primary-500 animate-spin"
                })
              ])) : !hasOrders.value ? (openBlock(), createBlock("div", {
                key: 1,
                class: "p-8 text-center"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-shopping-bag",
                  class: "w-16 h-16 mx-auto text-gray-300 dark:text-gray-600"
                }),
                createVNode("h3", { class: "mt-4 text-lg font-medium text-gray-900 dark:text-white" }, "Belum Ada Pesanan"),
                createVNode("p", { class: "mt-2 text-sm text-gray-500 dark:text-gray-400" }, "Pesanan dari pelanggan akan muncul di sini")
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "divide-y divide-gray-200 dark:divide-gray-800"
              }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.orders, (order) => {
                    return openBlock(), createBlock(_sfc_main$2, {
                      key: order.id,
                      order,
                      onView: ($event) => emit("view", order),
                      onProcess: ($event) => emit("process", order),
                      onShip: ($event) => emit("ship", order),
                      onTrack: ($event) => emit("track", order),
                      onCancel: ($event) => emit("cancel", order)
                    }, null, 8, ["order", "onView", "onProcess", "onShip", "onTrack", "onCancel"]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]))
            ];
          }
        }),
        _: 3
        /* FORWARDED */
      }, _parent));
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/OrderList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, storeName: "", cityId: "", districtId: "" }) },
    orders: { default: () => ({ data: [], meta: { total: 0, perPage: 10, currentPage: 1, lastPage: 1, firstPage: 1, firstPageUrl: null, lastPageUrl: null, nextPageUrl: null, previousPageUrl: null } }) },
    pagination: { default: () => ({ currentPage: 1, lastPage: 1, total: 0, perPage: 10 }) },
    stats: { default: () => ({ total: 0, pendingPayment: 0, paid: 0, processing: 0, shipped: 0, delivered: 0, cancelled: 0, needsAction: 0 }) },
    filters: { default: () => ({ status: "", search: "", sortBy: "created_at", sortOrder: "desc" }) },
    couriers: { default: () => [] },
    statusOptions: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const ordersList = computed(() => {
      if (Array.isArray(props.orders)) {
        return props.orders;
      }
      return props.orders?.data ?? [];
    });
    const paginationData = computed(() => {
      if (Array.isArray(props.orders)) {
        return props.pagination;
      }
      const meta = props.orders?.meta;
      return {
        currentPage: meta?.currentPage ?? 1,
        lastPage: meta?.lastPage ?? 1,
        total: meta?.total ?? 0,
        perPage: meta?.perPage ?? 10,
        hasNextPage: meta?.nextPageUrl !== null,
        hasPrevPage: meta?.previousPageUrl !== null
      };
    });
    const paginationInfo = computed(() => {
      const current = paginationData.value.currentPage;
      const perPage = paginationData.value.perPage;
      const total = paginationData.value.total;
      const start = total === 0 ? 0 : (current - 1) * perPage + 1;
      const end = Math.min(current * perPage, total);
      return { start, end, total };
    });
    const showPagination = computed(() => paginationData.value.lastPage > 1);
    const { processOrder, submitShipping, cancelOrder, reloadOrders } = useOrderActions();
    const selectedStatus = ref(props.filters.status);
    const searchQuery = ref(props.filters.search);
    const isLoading = ref(false);
    const showShippingModal = ref(false);
    const showCancelModal = ref(false);
    const selectedOrder = ref(null);
    const isSubmitting = ref(false);
    const statsCards = computed(() => [
      {
        label: "Perlu Tindakan",
        value: props.stats?.needsAction ?? 0,
        color: "warning",
        icon: "i-heroicons-exclamation-circle"
      },
      {
        label: "Sedang Dikirim",
        value: props.stats?.shipped ?? 0,
        color: "primary",
        icon: "i-heroicons-truck"
      },
      {
        label: "Selesai",
        value: props.stats?.delivered ?? 0,
        color: "success",
        icon: "i-heroicons-check-circle"
      },
      {
        label: "Total Pesanan",
        value: props.stats?.total ?? 0,
        color: "neutral",
        icon: "i-heroicons-shopping-bag"
      }
    ]);
    const applyFilters = () => {
      isLoading.value = true;
      router.get(
        "/admin/orders",
        {
          status: selectedStatus.value,
          search: searchQuery.value
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
    let searchTimeout;
    watch(searchQuery, () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(applyFilters, 500);
    });
    watch(selectedStatus, () => {
      applyFilters();
    });
    const handleViewOrder = (order) => {
      router.visit(`/admin/orders/${order.id}`);
    };
    const handleProcessOrder = async (order) => {
      if (order.status !== "paid") return;
      const success = await processOrder(order.id);
      if (success) {
        reloadOrders();
      }
    };
    const handleShipOrder = (order) => {
      selectedOrder.value = order;
      showShippingModal.value = true;
    };
    const handleTrackOrder = (order) => {
      router.visit(`/admin/orders/${order.id}`);
    };
    const handleCancelOrder = (order) => {
      selectedOrder.value = order;
      showCancelModal.value = true;
    };
    const handleSubmitShipping = async (form, isUpdate) => {
      if (!selectedOrder.value) return;
      isSubmitting.value = true;
      const success = await submitShipping(selectedOrder.value.id, form, isUpdate);
      if (success) {
        showShippingModal.value = false;
        reloadOrders();
      }
      isSubmitting.value = false;
    };
    const handleConfirmCancel = async (reason) => {
      if (!selectedOrder.value) return;
      isSubmitting.value = true;
      const success = await cancelOrder(selectedOrder.value.id, reason);
      if (success) {
        showCancelModal.value = false;
        reloadOrders();
      }
      isSubmitting.value = false;
    };
    const goToPage = (page) => {
      router.get(
        "/admin/orders",
        {
          page,
          status: selectedStatus.value,
          search: searchQuery.value
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pesanan</h1><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"> Kelola pesanan dari pelanggan Anda </p></div></div><!-- Stats Cards -->`);
      _push(ssrRenderComponent(_sfc_main$4, { stats: statsCards.value }, null, _parent));
      _push(`<!-- Filters -->`);
      _push(ssrRenderComponent(_sfc_main$3, {
        search: searchQuery.value,
        "onUpdate:search": ($event) => searchQuery.value = $event,
        status: selectedStatus.value,
        "onUpdate:status": ($event) => selectedStatus.value = $event,
        "status-options": __props.statusOptions
      }, null, _parent));
      _push(`<!-- Order List -->`);
      _push(ssrRenderComponent(_sfc_main$1, {
        orders: ordersList.value,
        total: paginationData.value?.total ?? 0,
        loading: isLoading.value,
        onView: handleViewOrder,
        onProcess: handleProcessOrder,
        onShip: handleShipOrder,
        onTrack: handleTrackOrder,
        onCancel: handleCancelOrder
      }, createSlots({
        _: 2
        /* DYNAMIC */
      }, [
        showPagination.value ? {
          name: "pagination",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3"${_scopeId}><!-- Info Text --><p class="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1"${_scopeId}> Menampilkan <span class="font-medium text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(paginationInfo.value.start)}</span> - <span class="font-medium text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(paginationInfo.value.end)}</span> dari <span class="font-medium text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(paginationInfo.value.total)}</span> pesanan </p><!-- Pagination Controls --><div class="flex items-center gap-2 order-1 sm:order-2"${_scopeId}><!-- Previous Button -->`);
              _push2(ssrRenderComponent(_component_UButton, {
                color: "neutral",
                variant: "outline",
                size: "sm",
                icon: "i-heroicons-chevron-left",
                disabled: paginationData.value.currentPage <= 1,
                onClick: ($event) => goToPage(paginationData.value.currentPage - 1)
              }, null, _parent2, _scopeId));
              _push2(`<!-- Page Numbers --><div class="flex items-center gap-1"${_scopeId}><!-- First page -->`);
              if (paginationData.value.currentPage > 2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  color: "neutral",
                  variant: 1 === paginationData.value.currentPage ? "solid" : "ghost",
                  size: "sm",
                  onClick: ($event) => goToPage(1)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` 1 `);
                    } else {
                      return [
                        createTextVNode(" 1 ")
                      ];
                    }
                  }),
                  _: 1
                  /* STABLE */
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!-- Ellipsis before -->`);
              if (paginationData.value.currentPage > 3) {
                _push2(`<span class="px-2 text-gray-400"${_scopeId}>...</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!-- Page numbers around current --><!--[-->`);
              ssrRenderList(paginationData.value.lastPage, (page) => {
                _push2(`<!--[-->`);
                if (page >= paginationData.value.currentPage - 1 && page <= paginationData.value.currentPage + 1) {
                  _push2(ssrRenderComponent(_component_UButton, {
                    color: page === paginationData.value.currentPage ? "primary" : "neutral",
                    variant: page === paginationData.value.currentPage ? "solid" : "ghost",
                    size: "sm",
                    onClick: ($event) => goToPage(page)
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`${ssrInterpolate(page)}`);
                      } else {
                        return [
                          createTextVNode(
                            toDisplayString(page),
                            1
                            /* TEXT */
                          )
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--><!-- Ellipsis after -->`);
              if (paginationData.value.currentPage < paginationData.value.lastPage - 2) {
                _push2(`<span class="px-2 text-gray-400"${_scopeId}>...</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!-- Last page -->`);
              if (paginationData.value.currentPage < paginationData.value.lastPage - 1) {
                _push2(ssrRenderComponent(_component_UButton, {
                  color: "neutral",
                  variant: paginationData.value.lastPage === paginationData.value.currentPage ? "solid" : "ghost",
                  size: "sm",
                  onClick: ($event) => goToPage(paginationData.value.lastPage)
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(paginationData.value.lastPage)}`);
                    } else {
                      return [
                        createTextVNode(
                          toDisplayString(paginationData.value.lastPage),
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
              _push2(`</div><!-- Next Button -->`);
              _push2(ssrRenderComponent(_component_UButton, {
                color: "neutral",
                variant: "outline",
                size: "sm",
                icon: "i-heroicons-chevron-right",
                disabled: paginationData.value.currentPage >= paginationData.value.lastPage,
                onClick: ($event) => goToPage(paginationData.value.currentPage + 1)
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3" }, [
                  createCommentVNode(" Info Text "),
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1" }, [
                    createTextVNode(" Menampilkan "),
                    createVNode(
                      "span",
                      { class: "font-medium text-gray-700 dark:text-gray-300" },
                      toDisplayString(paginationInfo.value.start),
                      1
                      /* TEXT */
                    ),
                    createTextVNode(" - "),
                    createVNode(
                      "span",
                      { class: "font-medium text-gray-700 dark:text-gray-300" },
                      toDisplayString(paginationInfo.value.end),
                      1
                      /* TEXT */
                    ),
                    createTextVNode(" dari "),
                    createVNode(
                      "span",
                      { class: "font-medium text-gray-700 dark:text-gray-300" },
                      toDisplayString(paginationInfo.value.total),
                      1
                      /* TEXT */
                    ),
                    createTextVNode(" pesanan ")
                  ]),
                  createCommentVNode(" Pagination Controls "),
                  createVNode("div", { class: "flex items-center gap-2 order-1 sm:order-2" }, [
                    createCommentVNode(" Previous Button "),
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "outline",
                      size: "sm",
                      icon: "i-heroicons-chevron-left",
                      disabled: paginationData.value.currentPage <= 1,
                      onClick: ($event) => goToPage(paginationData.value.currentPage - 1)
                    }, null, 8, ["disabled", "onClick"]),
                    createCommentVNode(" Page Numbers "),
                    createVNode("div", { class: "flex items-center gap-1" }, [
                      createCommentVNode(" First page "),
                      paginationData.value.currentPage > 2 ? (openBlock(), createBlock(_component_UButton, {
                        key: 0,
                        color: "neutral",
                        variant: 1 === paginationData.value.currentPage ? "solid" : "ghost",
                        size: "sm",
                        onClick: ($event) => goToPage(1)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" 1 ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["variant", "onClick"])) : createCommentVNode("v-if", true),
                      createCommentVNode(" Ellipsis before "),
                      paginationData.value.currentPage > 3 ? (openBlock(), createBlock("span", {
                        key: 1,
                        class: "px-2 text-gray-400"
                      }, "...")) : createCommentVNode("v-if", true),
                      createCommentVNode(" Page numbers around current "),
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(paginationData.value.lastPage, (page) => {
                          return openBlock(), createBlock(
                            Fragment,
                            { key: page },
                            [
                              page >= paginationData.value.currentPage - 1 && page <= paginationData.value.currentPage + 1 ? (openBlock(), createBlock(_component_UButton, {
                                key: 0,
                                color: page === paginationData.value.currentPage ? "primary" : "neutral",
                                variant: page === paginationData.value.currentPage ? "solid" : "ghost",
                                size: "sm",
                                onClick: ($event) => goToPage(page)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(
                                    toDisplayString(page),
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                _: 2
                                /* DYNAMIC */
                              }, 1032, ["color", "variant", "onClick"])) : createCommentVNode("v-if", true)
                            ],
                            64
                            /* STABLE_FRAGMENT */
                          );
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      )),
                      createCommentVNode(" Ellipsis after "),
                      paginationData.value.currentPage < paginationData.value.lastPage - 2 ? (openBlock(), createBlock("span", {
                        key: 2,
                        class: "px-2 text-gray-400"
                      }, "...")) : createCommentVNode("v-if", true),
                      createCommentVNode(" Last page "),
                      paginationData.value.currentPage < paginationData.value.lastPage - 1 ? (openBlock(), createBlock(_component_UButton, {
                        key: 3,
                        color: "neutral",
                        variant: paginationData.value.lastPage === paginationData.value.currentPage ? "solid" : "ghost",
                        size: "sm",
                        onClick: ($event) => goToPage(paginationData.value.lastPage)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(paginationData.value.lastPage),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["variant", "onClick"])) : createCommentVNode("v-if", true)
                    ]),
                    createCommentVNode(" Next Button "),
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "outline",
                      size: "sm",
                      icon: "i-heroicons-chevron-right",
                      disabled: paginationData.value.currentPage >= paginationData.value.lastPage,
                      onClick: ($event) => goToPage(paginationData.value.currentPage + 1)
                    }, null, 8, ["disabled", "onClick"])
                  ])
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
      _push(`<!-- Shipping Modal -->`);
      _push(ssrRenderComponent(_sfc_main$b, {
        open: showShippingModal.value,
        "onUpdate:open": ($event) => showShippingModal.value = $event,
        order: selectedOrder.value,
        couriers: __props.couriers,
        loading: isSubmitting.value,
        onSubmit: handleSubmitShipping
      }, null, _parent));
      _push(`<!-- Cancel Modal -->`);
      _push(ssrRenderComponent(_sfc_main$c, {
        open: showCancelModal.value,
        "onUpdate:open": ($event) => showCancelModal.value = $event,
        order: selectedOrder.value,
        loading: isSubmitting.value,
        onConfirm: handleConfirmCancel
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
