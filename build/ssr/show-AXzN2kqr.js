import { _ as _sfc_main$8 } from './Card-Ci6a5H8H.js';
import { a as _sfc_main$b } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$9, a as _sfc_main$a } from './Button-BBveOjhJ.js';
import { defineComponent, withCtx, unref, createVNode, renderSlot, createBlock, openBlock, Fragment, renderList, createCommentVNode, toDisplayString, useSSRContext, mergeProps, createTextVNode, computed, ref } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderSlot, ssrRenderAttrs, ssrRenderClass } from 'vue/server-renderer';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { u as useOrderFormatters, a as useOrderActions, g as getStatusBadgeColor, _ as _sfc_main$c, b as _sfc_main$d } from './CancelModal-CwJL00Rr.js';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@inertiajs/vue3';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Tooltip-N44Fzd4m.js';
import './SelectMenu-CGTADs72.js';
import './FormField-BIqlRgyi.js';
import './Modal-lw8uQ47S.js';
import './Textarea-DTaAAeeU.js';
import './Alert-D5zWQYXW.js';

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "OrderItemsList",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const { formatCurrency } = useOrderFormatters();
    const handleImageError = (event) => {
      event.target.src = "https://placehold.co/80x80/1a1a2e/ffffff?text=No+Image";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$8;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Produk Pesanan </h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Produk Pesanan ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="divide-y divide-gray-200 dark:divide-gray-800"${_scopeId}><!--[-->`);
            ssrRenderList(__props.items, (item) => {
              _push2(`<div class="flex gap-4 py-4 first:pt-0 last:pb-0"${_scopeId}><img${ssrRenderAttr("src", item.image)}${ssrRenderAttr("alt", item.productName)} class="w-20 h-20 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 shrink-0"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(item.productName)}</p>`);
              if (item.variantName) {
                _push2(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Varian: ${ssrInterpolate(item.variantName)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> SKU: ${ssrInterpolate(item.productSku)}</p><div class="mt-2 flex items-center justify-between"${_scopeId}><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(item.quantity)}x ${ssrInterpolate(unref(formatCurrency)(item.price))}</p><p class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(item.subtotal))}</p></div></div></div>`);
            });
            _push2(`<!--]--></div>`);
            ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("div", { class: "divide-y divide-gray-200 dark:divide-gray-800" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.items, (item) => {
                    return openBlock(), createBlock("div", {
                      key: item.id,
                      class: "flex gap-4 py-4 first:pt-0 last:pb-0"
                    }, [
                      createVNode("img", {
                        src: item.image,
                        alt: item.productName,
                        class: "w-20 h-20 rounded-lg object-cover bg-gray-100 dark:bg-gray-800 shrink-0",
                        onError: handleImageError
                      }, null, 40, ["src", "alt"]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode(
                          "p",
                          { class: "font-medium text-gray-900 dark:text-white" },
                          toDisplayString(item.productName),
                          1
                          /* TEXT */
                        ),
                        item.variantName ? (openBlock(), createBlock(
                          "p",
                          {
                            key: 0,
                            class: "text-sm text-gray-500 dark:text-gray-400"
                          },
                          " Varian: " + toDisplayString(item.variantName),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true),
                        createVNode(
                          "p",
                          { class: "text-sm text-gray-500 dark:text-gray-400" },
                          " SKU: " + toDisplayString(item.productSku),
                          1
                          /* TEXT */
                        ),
                        createVNode("div", { class: "mt-2 flex items-center justify-between" }, [
                          createVNode(
                            "p",
                            { class: "text-sm text-gray-600 dark:text-gray-400" },
                            toDisplayString(item.quantity) + "x " + toDisplayString(unref(formatCurrency)(item.price)),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "p",
                            { class: "font-semibold text-gray-900 dark:text-white" },
                            toDisplayString(unref(formatCurrency)(item.subtotal)),
                            1
                            /* TEXT */
                          )
                        ])
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ]),
              renderSlot(_ctx.$slots, "footer")
            ];
          }
        }),
        _: 3
        /* FORWARDED */
      }, _parent));
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/OrderItemsList.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "OrderSummary",
  __ssrInlineRender: true,
  props: {
    subtotal: {},
    shippingCost: {},
    discount: {},
    tax: {},
    adminFee: {},
    total: {}
  },
  setup(__props) {
    const { formatCurrency } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 space-y-3" }, _attrs))}><div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Subtotal</span><span class="text-gray-900 dark:text-white">${ssrInterpolate(unref(formatCurrency)(__props.subtotal))}</span></div><div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Ongkos Kirim</span><span class="text-gray-900 dark:text-white">${ssrInterpolate(unref(formatCurrency)(__props.shippingCost))}</span></div>`);
      if (__props.discount > 0) {
        _push(`<div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Diskon</span><span class="text-green-600 dark:text-green-400">-${ssrInterpolate(unref(formatCurrency)(__props.discount))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.tax > 0) {
        _push(`<div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Pajak</span><span class="text-gray-900 dark:text-white">${ssrInterpolate(unref(formatCurrency)(__props.tax))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.adminFee > 0) {
        _push(`<div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Biaya Admin</span><span class="text-gray-900 dark:text-white">${ssrInterpolate(unref(formatCurrency)(__props.adminFee))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-800"><span class="text-gray-900 dark:text-white">Total</span><span class="text-primary-600 dark:text-primary-400">${ssrInterpolate(unref(formatCurrency)(__props.total))}</span></div></div>`);
    };
  }
});

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/OrderSummary.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "OrderTimeline",
  __ssrInlineRender: true,
  props: {
    steps: {}
  },
  setup(__props) {
    const { formatShortDate } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$8;
      const _component_UIcon = _sfc_main$9;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Status Pesanan </h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Status Pesanan ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.steps, (step, index) => {
              _push2(`<div class="flex gap-3"${_scopeId}><div class="relative flex flex-col items-center"${_scopeId}><div class="${ssrRenderClass([
                "w-8 h-8 rounded-full flex items-center justify-center",
                step.completed ? step.color === "error" ? "bg-red-100 dark:bg-red-900/30" : "bg-primary-100 dark:bg-primary-900/30" : "bg-gray-100 dark:bg-gray-800"
              ])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: step.icon,
                class: [
                  "w-4 h-4",
                  step.completed ? step.color === "error" ? "text-red-600 dark:text-red-400" : "text-primary-600 dark:text-primary-400" : "text-gray-400 dark:text-gray-600"
                ]
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (index < __props.steps.length - 1) {
                _push2(`<div class="${ssrRenderClass([
                  "w-0.5 h-8",
                  step.completed ? "bg-primary-200 dark:bg-primary-800" : "bg-gray-200 dark:bg-gray-700"
                ])}"${_scopeId}></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="flex-1 pb-4"${_scopeId}><p class="${ssrRenderClass([
                "font-medium",
                step.completed ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600"
              ])}"${_scopeId}>${ssrInterpolate(step.label)}</p>`);
              if (step.date) {
                _push2(`<p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(unref(formatShortDate)(step.date))}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.steps, (step, index) => {
                    return openBlock(), createBlock("div", {
                      key: step.label,
                      class: "flex gap-3"
                    }, [
                      createVNode("div", { class: "relative flex flex-col items-center" }, [
                        createVNode(
                          "div",
                          {
                            class: [
                              "w-8 h-8 rounded-full flex items-center justify-center",
                              step.completed ? step.color === "error" ? "bg-red-100 dark:bg-red-900/30" : "bg-primary-100 dark:bg-primary-900/30" : "bg-gray-100 dark:bg-gray-800"
                            ]
                          },
                          [
                            createVNode(_component_UIcon, {
                              name: step.icon,
                              class: [
                                "w-4 h-4",
                                step.completed ? step.color === "error" ? "text-red-600 dark:text-red-400" : "text-primary-600 dark:text-primary-400" : "text-gray-400 dark:text-gray-600"
                              ]
                            }, null, 8, ["name", "class"])
                          ],
                          2
                          /* CLASS */
                        ),
                        index < __props.steps.length - 1 ? (openBlock(), createBlock(
                          "div",
                          {
                            key: 0,
                            class: [
                              "w-0.5 h-8",
                              step.completed ? "bg-primary-200 dark:bg-primary-800" : "bg-gray-200 dark:bg-gray-700"
                            ]
                          },
                          null,
                          2
                          /* CLASS */
                        )) : createCommentVNode("v-if", true)
                      ]),
                      createVNode("div", { class: "flex-1 pb-4" }, [
                        createVNode(
                          "p",
                          {
                            class: [
                              "font-medium",
                              step.completed ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-600"
                            ]
                          },
                          toDisplayString(step.label),
                          3
                          /* TEXT, CLASS */
                        ),
                        step.date ? (openBlock(), createBlock(
                          "p",
                          {
                            key: 0,
                            class: "text-xs text-gray-500 dark:text-gray-400"
                          },
                          toDisplayString(unref(formatShortDate)(step.date)),
                          1
                          /* TEXT */
                        )) : createCommentVNode("v-if", true)
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/OrderTimeline.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ShippingTracker",
  __ssrInlineRender: true,
  props: {
    shipping: {},
    tracking: { default: null },
    loading: { type: Boolean, default: false }
  },
  emits: ["refresh", "copy"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$8;
      const _component_UButton = _sfc_main$a;
      const _component_UIcon = _sfc_main$9;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Lacak Pengiriman </h3>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              size: "sm",
              icon: "i-heroicons-arrow-path",
              loading: __props.loading,
              onClick: ($event) => emit("refresh")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Refresh `);
                } else {
                  return [
                    createTextVNode(" Refresh ")
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
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Lacak Pengiriman "),
                createVNode(_component_UButton, {
                  color: "neutral",
                  variant: "ghost",
                  size: "sm",
                  icon: "i-heroicons-arrow-path",
                  loading: __props.loading,
                  onClick: ($event) => emit("refresh")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Refresh ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["loading", "onClick"])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><div${_scopeId}><p class="font-semibold text-blue-900 dark:text-blue-100"${_scopeId}>${ssrInterpolate(__props.shipping.courierName)} - ${ssrInterpolate(__props.shipping.courierService)}</p><div class="flex items-center gap-2 mt-1"${_scopeId}><p class="text-blue-800 dark:text-blue-200 font-mono"${_scopeId}>${ssrInterpolate(__props.shipping.waybill)}</p>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              size: "xs",
              icon: "i-heroicons-clipboard-document",
              onClick: ($event) => emit("copy", __props.shipping.waybill)
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-truck",
              class: "w-10 h-10 text-blue-600 dark:text-blue-400"
            }, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            if (__props.tracking) {
              _push2(`<div class="space-y-4"${_scopeId}><div class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: __props.tracking.status === "DELIVERED" ? "i-heroicons-check-circle" : "i-heroicons-truck",
                class: [
                  "w-8 h-8",
                  __props.tracking.status === "DELIVERED" ? "text-green-600" : "text-blue-600"
                ]
              }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><p class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.tracking.status)}</p>`);
              if (__props.tracking.statusDescription) {
                _push2(`<p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.tracking.statusDescription)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div><!-- Tracking History --><div class="space-y-4"${_scopeId}><h4 class="font-medium text-gray-900 dark:text-white"${_scopeId}>Riwayat Pengiriman</h4><div class="relative"${_scopeId}><!--[-->`);
              ssrRenderList(__props.tracking.history, (history, index) => {
                _push2(`<div class="flex gap-4 pb-4 last:pb-0"${_scopeId}><div class="relative flex flex-col items-center"${_scopeId}><div class="${ssrRenderClass([
                  "w-3 h-3 rounded-full",
                  index === 0 ? "bg-primary-500" : "bg-gray-300 dark:bg-gray-600"
                ])}"${_scopeId}></div>`);
                if (index < __props.tracking.history.length - 1) {
                  _push2(`<div class="w-0.5 h-full bg-gray-200 dark:bg-gray-700 absolute top-3"${_scopeId}></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div><div class="flex-1 min-w-0 pb-4"${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(history.description)}</p><p class="text-xs text-gray-500 dark:text-gray-400 mt-1"${_scopeId}>${ssrInterpolate(history.date)} ${ssrInterpolate(history.time)} `);
                if (history.city) {
                  _push2(`<span${_scopeId}>• ${ssrInterpolate(history.city)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p></div></div>`);
              });
              _push2(`<!--]--></div></div></div>`);
            } else {
              _push2(`<!--[--><!-- No Tracking Data --><div class="text-center py-6"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-map-pin",
                class: "w-12 h-12 mx-auto text-gray-300 dark:text-gray-600"
              }, null, _parent2, _scopeId));
              _push2(`<p class="mt-2 text-gray-500 dark:text-gray-400"${_scopeId}> Data tracking belum tersedia </p>`);
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                variant: "soft",
                size: "sm",
                class: "mt-4",
                onClick: ($event) => emit("refresh")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Cek Tracking `);
                  } else {
                    return [
                      createTextVNode(" Cek Tracking ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div><!--]-->`);
            }
          } else {
            return [
              createVNode("div", { class: "mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("div", null, [
                    createVNode(
                      "p",
                      { class: "font-semibold text-blue-900 dark:text-blue-100" },
                      toDisplayString(__props.shipping.courierName) + " - " + toDisplayString(__props.shipping.courierService),
                      1
                      /* TEXT */
                    ),
                    createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                      createVNode(
                        "p",
                        { class: "text-blue-800 dark:text-blue-200 font-mono" },
                        toDisplayString(__props.shipping.waybill),
                        1
                        /* TEXT */
                      ),
                      createVNode(_component_UButton, {
                        color: "neutral",
                        variant: "ghost",
                        size: "xs",
                        icon: "i-heroicons-clipboard-document",
                        onClick: ($event) => emit("copy", __props.shipping.waybill)
                      }, null, 8, ["onClick"])
                    ])
                  ]),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-truck",
                    class: "w-10 h-10 text-blue-600 dark:text-blue-400"
                  })
                ])
              ]),
              __props.tracking ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-4"
              }, [
                createVNode("div", { class: "flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg" }, [
                  createVNode(_component_UIcon, {
                    name: __props.tracking.status === "DELIVERED" ? "i-heroicons-check-circle" : "i-heroicons-truck",
                    class: [
                      "w-8 h-8",
                      __props.tracking.status === "DELIVERED" ? "text-green-600" : "text-blue-600"
                    ]
                  }, null, 8, ["name", "class"]),
                  createVNode("div", null, [
                    createVNode(
                      "p",
                      { class: "font-semibold text-gray-900 dark:text-white" },
                      toDisplayString(__props.tracking.status),
                      1
                      /* TEXT */
                    ),
                    __props.tracking.statusDescription ? (openBlock(), createBlock(
                      "p",
                      {
                        key: 0,
                        class: "text-sm text-gray-500 dark:text-gray-400"
                      },
                      toDisplayString(__props.tracking.statusDescription),
                      1
                      /* TEXT */
                    )) : createCommentVNode("v-if", true)
                  ])
                ]),
                createCommentVNode(" Tracking History "),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("h4", { class: "font-medium text-gray-900 dark:text-white" }, "Riwayat Pengiriman"),
                  createVNode("div", { class: "relative" }, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.tracking.history, (history, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: "flex gap-4 pb-4 last:pb-0"
                        }, [
                          createVNode("div", { class: "relative flex flex-col items-center" }, [
                            createVNode(
                              "div",
                              {
                                class: [
                                  "w-3 h-3 rounded-full",
                                  index === 0 ? "bg-primary-500" : "bg-gray-300 dark:bg-gray-600"
                                ]
                              },
                              null,
                              2
                              /* CLASS */
                            ),
                            index < __props.tracking.history.length - 1 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "w-0.5 h-full bg-gray-200 dark:bg-gray-700 absolute top-3"
                            })) : createCommentVNode("v-if", true)
                          ]),
                          createVNode("div", { class: "flex-1 min-w-0 pb-4" }, [
                            createVNode(
                              "p",
                              { class: "text-sm font-medium text-gray-900 dark:text-white" },
                              toDisplayString(history.description),
                              1
                              /* TEXT */
                            ),
                            createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400 mt-1" }, [
                              createTextVNode(
                                toDisplayString(history.date) + " " + toDisplayString(history.time) + " ",
                                1
                                /* TEXT */
                              ),
                              history.city ? (openBlock(), createBlock(
                                "span",
                                { key: 0 },
                                "• " + toDisplayString(history.city),
                                1
                                /* TEXT */
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
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-6"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-map-pin",
                  class: "w-12 h-12 mx-auto text-gray-300 dark:text-gray-600"
                }),
                createVNode("p", { class: "mt-2 text-gray-500 dark:text-gray-400" }, " Data tracking belum tersedia "),
                createVNode(_component_UButton, {
                  color: "primary",
                  variant: "soft",
                  size: "sm",
                  class: "mt-4",
                  onClick: ($event) => emit("refresh")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Cek Tracking ")
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["onClick"])
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

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/ShippingTracker.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CustomerInfo",
  __ssrInlineRender: true,
  props: {
    customer: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$8;
      const _component_UIcon = _sfc_main$9;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Informasi Pembeli </h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Informasi Pembeli ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-user",
              class: "w-5 h-5 text-primary-600 dark:text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.customer.name)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.customer.email)}</p></div></div><div class="flex items-center gap-3 text-sm"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-phone",
              class: "w-4 h-4 text-gray-400"
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.customer.phone)}</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode("div", { class: "w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-user",
                      class: "w-5 h-5 text-primary-600 dark:text-primary-400"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.customer.name),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-sm text-gray-500 dark:text-gray-400" },
                      toDisplayString(__props.customer.email),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                createVNode("div", { class: "flex items-center gap-3 text-sm" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-phone",
                    class: "w-4 h-4 text-gray-400"
                  }),
                  createVNode(
                    "span",
                    { class: "text-gray-600 dark:text-gray-400" },
                    toDisplayString(__props.customer.phone),
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
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/CustomerInfo.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AddressInfo",
  __ssrInlineRender: true,
  props: {
    address: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$8;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Alamat Pengiriman </h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Alamat Pengiriman ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.address.recipientName)}</p><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.address.phone)}</p><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.address.fullAddress)}</p></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2" }, [
                createVNode(
                  "p",
                  { class: "font-medium text-gray-900 dark:text-white" },
                  toDisplayString(__props.address.recipientName),
                  1
                  /* TEXT */
                ),
                createVNode(
                  "p",
                  { class: "text-sm text-gray-600 dark:text-gray-400" },
                  toDisplayString(__props.address.phone),
                  1
                  /* TEXT */
                ),
                createVNode(
                  "p",
                  { class: "text-sm text-gray-600 dark:text-gray-400" },
                  toDisplayString(__props.address.fullAddress),
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
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/AddressInfo.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaymentInfo",
  __ssrInlineRender: true,
  props: {
    payment: {}
  },
  setup(__props) {
    const props = __props;
    const { formatShortDate } = useOrderFormatters();
    const paymentStatusConfig = computed(() => {
      const status = props.payment?.status || "pending";
      const configs = {
        pending: { label: "Menunggu Pembayaran", color: "warning" },
        capture: { label: "Diproses", color: "info" },
        settlement: { label: "Lunas", color: "success" },
        deny: { label: "Ditolak", color: "error" },
        cancel: { label: "Dibatalkan", color: "error" },
        expire: { label: "Kadaluarsa", color: "neutral" },
        refund: { label: "Refund", color: "neutral" }
      };
      return configs[status] || { label: status, color: "neutral" };
    });
    const formattedMethod = computed(() => {
      const method = props.payment?.method || "";
      const methodLabels = {
        bank_transfer: "Transfer Bank",
        credit_card: "Kartu Kredit",
        gopay: "GoPay",
        shopeepay: "ShopeePay",
        qris: "QRIS",
        cstore: "Convenience Store",
        echannel: "Mandiri Bill",
        bca_va: "BCA Virtual Account",
        bni_va: "BNI Virtual Account",
        bri_va: "BRI Virtual Account",
        permata_va: "Permata Virtual Account"
      };
      return methodLabels[method] || method?.replace(/_/g, " ") || "-";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$8;
      const _component_UBadge = _sfc_main$b;
      const _component_UIcon = _sfc_main$9;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Informasi Pembayaran </h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Informasi Pembayaran ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.payment) {
              _push2(`<div class="space-y-3"${_scopeId}><div class="flex justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Metode</span><span class="font-medium text-gray-900 dark:text-white capitalize"${_scopeId}>${ssrInterpolate(formattedMethod.value)}</span></div><div class="flex justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Status</span>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: paymentStatusConfig.value.color,
                variant: "soft",
                size: "sm"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(paymentStatusConfig.value.label)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(paymentStatusConfig.value.label),
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
              if (__props.payment.paidAt) {
                _push2(`<div class="flex justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Dibayar</span><span class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatShortDate)(__props.payment.paidAt))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="text-center py-4 text-gray-500 dark:text-gray-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-credit-card",
                class: "w-8 h-8 mx-auto mb-2 opacity-50"
              }, null, _parent2, _scopeId));
              _push2(`<p${_scopeId}>Belum ada informasi pembayaran</p></div>`);
            }
          } else {
            return [
              __props.payment ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-3"
              }, [
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Metode"),
                  createVNode(
                    "span",
                    { class: "font-medium text-gray-900 dark:text-white capitalize" },
                    toDisplayString(formattedMethod.value),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", { class: "flex justify-between" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Status"),
                  createVNode(_component_UBadge, {
                    color: paymentStatusConfig.value.color,
                    variant: "soft",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(paymentStatusConfig.value.label),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["color"])
                ]),
                __props.payment.paidAt ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex justify-between"
                }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Dibayar"),
                  createVNode(
                    "span",
                    { class: "text-gray-900 dark:text-white" },
                    toDisplayString(unref(formatShortDate)(__props.payment.paidAt)),
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-4 text-gray-500 dark:text-gray-400"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-credit-card",
                  class: "w-8 h-8 mx-auto mb-2 opacity-50"
                }),
                createVNode("p", null, "Belum ada informasi pembayaran")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/orders/PaymentInfo.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, storeName: "", cityId: "", districtId: "" }) },
    order: { default: () => ({
      id: 0,
      orderNumber: "",
      status: "pending_payment",
      statusLabel: "Pending",
      statusColor: "warning",
      customer: null,
      subtotal: 0,
      shippingCost: 0,
      discount: 0,
      tax: 0,
      adminFee: 0,
      total: 0,
      customerNotes: null,
      adminNotes: null,
      itemCount: 0,
      firstItemImage: "",
      items: [],
      payment: null,
      shipping: null,
      createdAt: "",
      paidAt: null,
      processedAt: null,
      shippedAt: null,
      deliveredAt: null,
      cancelledAt: null
    }) },
    trackingInfo: { default: null },
    couriers: { default: () => [] }
  },
  setup(__props) {
    const props = __props;
    const {
      isLoading,
      processOrder,
      submitShipping,
      refreshTracking,
      cancelOrder,
      reloadPage,
      copyToClipboard
    } = useOrderActions();
    const { formatDate } = useOrderFormatters();
    const trackingData = ref(props.trackingInfo);
    const showShippingModal = ref(false);
    const showCancelModal = ref(false);
    const isSubmitting = ref(false);
    const canProcess = computed(() => props.order.status === "paid");
    const canShip = computed(() => ["paid", "processing"].includes(props.order.status));
    const canTrack = computed(() => props.order.status === "shipped" && props.order.shipping?.waybill);
    const canCancel = computed(() => ["pending_payment", "paid"].includes(props.order.status));
    const timelineSteps = computed(() => {
      const order = props.order;
      const steps = [
        {
          label: "Pesanan Dibuat",
          date: order.createdAt,
          completed: true,
          icon: "i-heroicons-shopping-cart",
          color: "primary"
        },
        {
          label: "Pembayaran",
          date: order.paidAt,
          completed: !!order.paidAt,
          icon: "i-heroicons-credit-card",
          color: "primary"
        },
        {
          label: "Diproses",
          date: order.processedAt,
          completed: !!order.processedAt,
          icon: "i-heroicons-cog-6-tooth",
          color: "primary"
        },
        {
          label: "Dikirim",
          date: order.shippedAt,
          completed: !!order.shippedAt,
          icon: "i-heroicons-truck",
          color: "primary"
        },
        {
          label: "Selesai",
          date: order.deliveredAt,
          completed: !!order.deliveredAt,
          icon: "i-heroicons-check-circle",
          color: "primary"
        }
      ];
      if (order.status === "cancelled") {
        return [
          steps[0],
          {
            label: "Dibatalkan",
            date: order.cancelledAt,
            completed: true,
            icon: "i-heroicons-x-circle",
            color: "error"
          }
        ];
      }
      return steps;
    });
    const handleProcessOrder = async () => {
      const success = await processOrder(props.order.id);
      if (success) {
        reloadPage();
      }
    };
    const handleRefreshTracking = async () => {
      const data = await refreshTracking(props.order.id);
      if (data) {
        trackingData.value = data;
      }
    };
    const handleSubmitShipping = async (form, isUpdate) => {
      isSubmitting.value = true;
      const success = await submitShipping(props.order.id, form, isUpdate);
      if (success) {
        showShippingModal.value = false;
        reloadPage();
      }
      isSubmitting.value = false;
    };
    const handleConfirmCancel = async (reason) => {
      isSubmitting.value = true;
      const success = await cancelOrder(props.order.id, reason);
      if (success) {
        showCancelModal.value = false;
        reloadPage();
      }
      isSubmitting.value = false;
    };
    const handleCopyWaybill = (text) => {
      copyToClipboard(text);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$a;
      const _component_UBadge = _sfc_main$b;
      const _component_UCard = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "ghost",
        icon: "i-heroicons-arrow-left",
        to: "/admin/orders"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kembali `);
          } else {
            return [
              createTextVNode(" Kembali ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.order.orderNumber)}</h1><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(unref(formatDate)(__props.order.createdAt))}</p></div></div><!-- Status Badge -->`);
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
      _push(`</div><!-- Action Buttons -->`);
      if (canProcess.value || canShip.value || canCancel.value) {
        _push(`<div class="flex flex-wrap gap-3">`);
        if (canProcess.value) {
          _push(ssrRenderComponent(_component_UButton, {
            color: "primary",
            icon: "i-heroicons-play",
            loading: unref(isLoading),
            onClick: handleProcessOrder
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
            icon: "i-heroicons-truck",
            onClick: ($event) => showShippingModal.value = true
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
            icon: "i-heroicons-arrow-path",
            loading: unref(isLoading),
            onClick: handleRefreshTracking
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Refresh Tracking `);
              } else {
                return [
                  createTextVNode(" Refresh Tracking ")
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
            icon: "i-heroicons-x-mark",
            onClick: ($event) => showCancelModal.value = true
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Batalkan Pesanan `);
              } else {
                return [
                  createTextVNode(" Batalkan Pesanan ")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Main Content Grid --><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><!-- Left Column --><div class="lg:col-span-2 space-y-6"><!-- Order Items -->`);
      _push(ssrRenderComponent(_sfc_main$7, {
        items: __props.order.items
      }, {
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$6, {
              subtotal: __props.order.subtotal,
              "shipping-cost": __props.order.shippingCost,
              discount: __props.order.discount,
              tax: __props.order.tax,
              "admin-fee": __props.order.adminFee,
              total: __props.order.total
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$6, {
                subtotal: __props.order.subtotal,
                "shipping-cost": __props.order.shippingCost,
                discount: __props.order.discount,
                tax: __props.order.tax,
                "admin-fee": __props.order.adminFee,
                total: __props.order.total
              }, null, 8, ["subtotal", "shipping-cost", "discount", "tax", "admin-fee", "total"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Shipping Tracking -->`);
      if (__props.order.shipping?.waybill) {
        _push(ssrRenderComponent(_sfc_main$4, {
          shipping: __props.order.shipping,
          tracking: trackingData.value,
          loading: unref(isLoading),
          onRefresh: handleRefreshTracking,
          onCopy: handleCopyWaybill
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Customer Notes -->`);
      if (__props.order.customerNotes) {
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}> Catatan Pembeli </h3>`);
            } else {
              return [
                createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, " Catatan Pembeli ")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<p class="text-gray-600 dark:text-gray-400"${_scopeId}>${ssrInterpolate(__props.order.customerNotes)}</p>`);
            } else {
              return [
                createVNode(
                  "p",
                  { class: "text-gray-600 dark:text-gray-400" },
                  toDisplayString(__props.order.customerNotes),
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
      _push(`</div><!-- Right Column --><div class="space-y-6"><!-- Order Timeline -->`);
      _push(ssrRenderComponent(_sfc_main$5, { steps: timelineSteps.value }, null, _parent));
      _push(`<!-- Customer Info -->`);
      if (__props.order.customer) {
        _push(ssrRenderComponent(_sfc_main$3, {
          customer: __props.order.customer
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Shipping Address -->`);
      if (__props.order.address) {
        _push(ssrRenderComponent(_sfc_main$2, {
          address: __props.order.address
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Payment Info -->`);
      if (__props.order.payment) {
        _push(ssrRenderComponent(_sfc_main$1, {
          payment: __props.order.payment
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!-- Shipping Modal -->`);
      _push(ssrRenderComponent(_sfc_main$c, {
        open: showShippingModal.value,
        "onUpdate:open": ($event) => showShippingModal.value = $event,
        order: __props.order,
        couriers: __props.couriers,
        loading: isSubmitting.value,
        onSubmit: handleSubmitShipping
      }, null, _parent));
      _push(`<!-- Cancel Modal -->`);
      _push(ssrRenderComponent(_sfc_main$d, {
        open: showCancelModal.value,
        "onUpdate:open": ($event) => showCancelModal.value = $event,
        order: __props.order,
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/orders/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
