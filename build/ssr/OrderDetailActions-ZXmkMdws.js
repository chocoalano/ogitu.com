import { _ as _sfc_main$g, a as _sfc_main$h } from './Button-BTdvmZ8N.js';
import { defineComponent, mergeProps, useSSRContext, unref, withCtx, createVNode, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { b as _export_sfc } from './Badge-CQlYH3Fo.js';
import { u as useOrderFormatters } from './use_orders-BXfsuIbb.js';
import { Link } from '@inertiajs/vue3';

const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "OrderPageHeader",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mb-8 overflow-hidden" }, _attrs))} data-v-4f600967><!-- Animated Background --><div class="absolute inset-0 -z-10" data-v-4f600967><!-- Gradient Orbs --><div class="absolute -top-20 -left-20 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl animate-pulse" data-v-4f600967></div><div class="absolute -top-10 right-0 w-64 h-64 bg-secondary-500/15 rounded-full blur-3xl animate-pulse delay-1000" data-v-4f600967></div><!-- Vapor/Smoke Animation --><div class="absolute inset-0 opacity-30 dark:opacity-20" data-v-4f600967><div class="absolute bottom-0 left-1/4 w-1 h-32 bg-linear-to-t from-gray-400/50 to-transparent rounded-full animate-vapor-1" data-v-4f600967></div><div class="absolute bottom-0 left-1/3 w-0.5 h-24 bg-linear-to-t from-gray-300/40 to-transparent rounded-full animate-vapor-2" data-v-4f600967></div><div class="absolute bottom-0 right-1/3 w-1 h-28 bg-linear-to-t from-gray-400/50 to-transparent rounded-full animate-vapor-3" data-v-4f600967></div></div></div><!-- Content --><div class="relative py-6" data-v-4f600967><div class="flex items-center gap-4" data-v-4f600967><!-- Icon with Glow --><div class="relative" data-v-4f600967><div class="absolute inset-0 bg-primary-500/30 blur-xl rounded-full animate-pulse" data-v-4f600967></div><div class="relative w-14 h-14 bg-linear-to-br from-primary-500 to-secondary-600 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/30" data-v-4f600967>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-bag",
        class: "w-7 h-7 text-white"
      }, null, _parent));
      _push(`</div></div><!-- Text --><div data-v-4f600967><h1 class="text-2xl sm:text-3xl font-bold bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent" data-v-4f600967>${ssrInterpolate(__props.title || "Pesanan Saya")}</h1><p class="text-gray-500 dark:text-gray-400 mt-1" data-v-4f600967>${ssrInterpolate(__props.subtitle || "Kelola dan lacak pesanan Anda")}</p></div></div></div></div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderPageHeader.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const OrderPageHeader = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-4f600967"]]);

const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "OrderStatusTabs",
  __ssrInlineRender: true,
  props: {
    options: {},
    selected: {},
    loading: { type: Boolean }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mb-8" }, _attrs))} data-v-6a848e56><!-- Fade edges for scroll indication --><div class="absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none sm:hidden" data-v-6a848e56></div><div class="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none sm:hidden" data-v-6a848e56></div><!-- Tabs Container --><div class="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0" data-v-6a848e56><div class="flex gap-2 sm:gap-3 min-w-max p-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-gray-700/50" data-v-6a848e56><!--[-->`);
      ssrRenderList(__props.options, (option) => {
        _push(`<button${ssrIncludeBooleanAttr(__props.loading) ? " disabled" : ""} class="${ssrRenderClass([
          "relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-300",
          "focus:outline-none focus:ring-2 focus:ring-primary-500/50",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          __props.selected === option.value ? "bg-linear-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30 scale-[1.02]" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
        ])}" data-v-6a848e56>ß <!-- Icon -->`);
        if (option.icon) {
          _push(ssrRenderComponent(_component_UIcon, {
            name: option.icon,
            class: [
              "w-4 h-4 transition-transform duration-300",
              __props.selected === option.value ? "scale-110" : ""
            ]
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!-- Label --><span data-v-6a848e56>${ssrInterpolate(option.label)}</span><!-- Active Indicator Glow -->`);
        if (__props.selected === option.value) {
          _push(`<div class="absolute inset-0 bg-linear-tßo-r from-primary-500/20 to-secondary-500/20 rounded-xl blur-xl -z-10" data-v-6a848e56></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div><!-- Loading Overlay -->`);
      if (__props.loading) {
        _push(`<div class="absolute inset-0 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-2xl flex items-center justify-center" data-v-6a848e56>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-5 h-5 animate-spin text-primary-500"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderStatusTabs.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const OrderStatusTabs = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-6a848e56"]]);

const ORDER_STATUS_CONFIG = {
  pending_payment: {
    label: "Menunggu Pembayaran",
    color: "warning",
    bgClass: "bg-amber-500/10 dark:bg-amber-500/20",
    textClass: "text-amber-600 dark:text-amber-400",
    borderClass: "border-amber-500/30",
    icon: "i-heroicons-clock",
    glowClass: "shadow-amber-500/20"
  },
  paid: {
    label: "Dibayar",
    color: "info",
    bgClass: "bg-blue-500/10 dark:bg-blue-500/20",
    textClass: "text-blue-600 dark:text-blue-400",
    borderClass: "border-blue-500/30",
    icon: "i-heroicons-check-circle",
    glowClass: "shadow-blue-500/20"
  },
  processing: {
    label: "Diproses",
    color: "info",
    bgClass: "bg-indigo-500/10 dark:bg-indigo-500/20",
    textClass: "text-indigo-600 dark:text-indigo-400",
    borderClass: "border-indigo-500/30",
    icon: "i-heroicons-cog-6-tooth",
    glowClass: "shadow-indigo-500/20"
  },
  shipped: {
    label: "Dikirim",
    color: "primary",
    bgClass: "bg-primary-500/10 dark:bg-primary-500/20",
    textClass: "text-primary-600 dark:text-primary-400",
    borderClass: "border-primary-500/30",
    icon: "i-heroicons-truck",
    glowClass: "shadow-primary-500/20"
  },
  delivered: {
    label: "Selesai",
    color: "success",
    bgClass: "bg-emerald-500/10 dark:bg-emerald-500/20",
    textClass: "text-emerald-600 dark:text-emerald-400",
    borderClass: "border-emerald-500/30",
    icon: "i-heroicons-check-badge",
    glowClass: "shadow-emerald-500/20"
  },
  cancelled: {
    label: "Dibatalkan",
    color: "error",
    bgClass: "bg-red-500/10 dark:bg-red-500/20",
    textClass: "text-red-600 dark:text-red-400",
    borderClass: "border-red-500/30",
    icon: "i-heroicons-x-circle",
    glowClass: "shadow-red-500/20"
  },
  refunded: {
    label: "Dikembalikan",
    color: "neutral",
    bgClass: "bg-gray-500/10 dark:bg-gray-500/20",
    textClass: "text-gray-600 dark:text-gray-400",
    borderClass: "border-gray-500/30",
    icon: "i-heroicons-arrow-uturn-left",
    glowClass: "shadow-gray-500/20"
  }
};

const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "OrderStatusBadge",
  __ssrInlineRender: true,
  props: {
    status: {},
    size: {},
    showIcon: { type: Boolean },
    animated: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const config = ORDER_STATUS_CONFIG[props.status] || ORDER_STATUS_CONFIG.pending_payment;
    const sizeClasses = {
      sm: "px-2 py-1 text-xs gap-1",
      md: "px-3 py-1.5 text-sm gap-1.5",
      lg: "px-4 py-2 text-base gap-2"
    };
    const iconSizes = {
      sm: "w-3 h-3",
      md: "w-4 h-4",
      lg: "w-5 h-5"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: [
          "inline-flex items-center font-medium rounded-full border transition-all duration-300",
          unref(config).bgClass,
          unref(config).textClass,
          unref(config).borderClass,
          sizeClasses[__props.size || "md"],
          __props.animated && "hover:scale-105",
          __props.animated && unref(config).glowClass && `hover:shadow-lg ${unref(config).glowClass}`
        ]
      }, _attrs))}><!-- Pulse indicator for pending -->`);
      if (__props.status === "pending_payment") {
        _push(`<span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span></span>`);
      } else if (__props.showIcon !== false) {
        _push(`<!--[--><!-- Icon -->`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: unref(config).icon,
          class: [
            iconSizes[__props.size || "md"],
            __props.status === "processing" && "animate-spin"
          ]
        }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Label --><span>${ssrInterpolate(unref(config).label)}</span></span>`);
    };
  }
});

const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderStatusBadge.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};

const placeholderImage$1 = "https://placehold.co/100x100/1a1a2e/ffffff?text=Vape";
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "OrderItemPreview",
  __ssrInlineRender: true,
  props: {
    item: {},
    index: {}
  },
  setup(__props) {
    const { formatPrice } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "group/item flex gap-3 sm:gap-4 p-2 -mx-2 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors duration-200" }, _attrs))}><!-- Image --><div class="relative shrink-0"><div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/50 dark:ring-gray-700/50 group-hover/item:ring-primary-500/30 transition-all duration-300"><img${ssrRenderAttr("src", __props.item.image || placeholderImage$1)}${ssrRenderAttr("alt", __props.item.productName)} class="w-full h-full object-cover group-hover/item:scale-110 transition-transform duration-500" loading="lazy"></div><!-- Quantity Badge -->`);
      if (__props.item.quantity > 1) {
        _push(`<span class="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30">${ssrInterpolate(__props.item.quantity)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Info --><div class="flex-1 min-w-0 py-0.5"><h4 class="font-medium text-gray-900 dark:text-white text-sm sm:text-base line-clamp-2 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors duration-200">${ssrInterpolate(__props.item.productName)}</h4>`);
      if (__props.item.variantName) {
        _push(`<p class="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5"><span class="inline-flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-swatch",
          class: "w-3 h-3"
        }, null, _parent));
        _push(` ${ssrInterpolate(__props.item.variantName)}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex items-center justify-between mt-2"><span class="text-xs sm:text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.item.quantity)} × ${ssrInterpolate(unref(formatPrice)(__props.item.price))}</span><span class="font-semibold text-gray-900 dark:text-white text-sm sm:text-base">${ssrInterpolate(unref(formatPrice)(__props.item.subtotal))}</span></div></div></div>`);
    };
  }
});

const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderItemPreview.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "OrderCardActions",
  __ssrInlineRender: true,
  props: {
    order: {}
  },
  emits: ["pay", "confirmReceived"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$h;
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-center gap-2" }, _attrs))}><!-- Pay Now Button -->`);
      if (__props.order.status === "pending_payment") {
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          size: "sm",
          class: "shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300",
          onClick: ($event) => emit("pay")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-credit-card",
                class: "w-4 h-4 mr-1.5"
              }, null, _parent2, _scopeId));
              _push2(` Bayar Sekarang `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-credit-card",
                  class: "w-4 h-4 mr-1.5"
                }),
                createTextVNode(" Bayar Sekarang ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Confirm Received Button -->`);
      if (__props.order.status === "shipped") {
        _push(ssrRenderComponent(_component_UButton, {
          color: "success",
          size: "sm",
          class: "shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300",
          onClick: ($event) => emit("confirmReceived")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-4 h-4 mr-1.5"
              }, null, _parent2, _scopeId));
              _push2(` Konfirmasi Diterima `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check-circle",
                  class: "w-4 h-4 mr-1.5"
                }),
                createTextVNode(" Konfirmasi Diterima ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Track Shipment -->`);
      if (__props.order.status === "shipped" && __props.order.shipping?.trackingNumber) {
        _push(ssrRenderComponent(_component_UButton, {
          variant: "outline",
          color: "primary",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-truck",
                class: "w-4 h-4 mr-1.5"
              }, null, _parent2, _scopeId));
              _push2(` Lacak `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-truck",
                  class: "w-4 h-4 mr-1.5"
                }),
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
      _push(`<!-- View Detail Button -->`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/orders/${__props.order.id}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "neutral",
              size: "sm",
              class: "group/btn"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>Lihat Detail</span>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("span", null, "Lihat Detail"),
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right",
                      class: "w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                variant: "ghost",
                color: "neutral",
                size: "sm",
                class: "group/btn"
              }, {
                default: withCtx(() => [
                  createVNode("span", null, "Lihat Detail"),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-arrow-right",
                    class: "w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform duration-200"
                  })
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
      _push(`</div>`);
    };
  }
});

const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderCardActions.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "OrderCard",
  __ssrInlineRender: true,
  props: {
    order: {},
    index: {}
  },
  emits: ["pay", "confirmReceived", "cancel"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formatPrice, formatShortDate, formatRelativeTime } = useOrderFormatters();
    const animationDelay = `${(props.index || 0) * 100}ms`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<article${ssrRenderAttrs(mergeProps({
        style: { animationDelay },
        class: "group relative bg-white dark:bg-gray-800/80 rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 dark:hover:shadow-primary-500/5 hover:border-primary-500/30 animate-fade-in-up"
      }, _attrs))} data-v-c1c3fdda><!-- Hover Glow Effect --><div class="absolute inset-0 bg-linear-to-br from-primary-500/0 via-transparent to-secondary-500/0 group-hover:from-primary-500/5 group-hover:to-secondary-500/5 transition-all duration-500 pointer-events-none" data-v-c1c3fdda></div><!-- Card Content --><div class="relative" data-v-c1c3fdda><!-- Header --><div class="flex flex-wrap items-start sm:items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700/50" data-v-c1c3fdda><div class="flex items-center gap-3 sm:gap-4" data-v-c1c3fdda><!-- Order Icon --><div class="hidden sm:flex w-12 h-12 rounded-xl bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800 items-center justify-center group-hover:from-primary-500/10 group-hover:to-secondary-500/10 transition-all duration-300" data-v-c1c3fdda>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-document-text",
        class: "w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors duration-300"
      }, null, _parent));
      _push(`</div><!-- Order Info --><div data-v-c1c3fdda><div class="flex items-center gap-2 mb-1" data-v-c1c3fdda><span class="font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300" data-v-c1c3fdda>${ssrInterpolate(__props.order.orderNumber)}</span></div><div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400" data-v-c1c3fdda>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-calendar",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`<span${ssrRenderAttr("title", unref(formatShortDate)(__props.order.createdAt))} data-v-c1c3fdda>${ssrInterpolate(unref(formatRelativeTime)(__props.order.createdAt))}</span></div></div></div><!-- Status Badge -->`);
      _push(ssrRenderComponent(_sfc_main$d, {
        status: __props.order.status,
        animated: ""
      }, null, _parent));
      _push(`</div><!-- Order Items --><div class="p-4 sm:p-5 space-y-3" data-v-c1c3fdda><!--[-->`);
      ssrRenderList(__props.order.items.slice(0, 2), (item, idx) => {
        _push(ssrRenderComponent(_sfc_main$c, {
          key: item.id,
          item,
          index: idx
        }, null, _parent));
      });
      _push(`<!--]--><!-- More items indicator -->`);
      if (__props.order.items.length > 2) {
        _push(`<div class="flex items-center gap-2 py-2 px-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg" data-v-c1c3fdda>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-plus-circle",
          class: "w-4 h-4 text-gray-400"
        }, null, _parent));
        _push(`<span class="text-sm text-gray-500 dark:text-gray-400" data-v-c1c3fdda>${ssrInterpolate(__props.order.items.length - 2)} produk lainnya </span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Footer --><div class="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 bg-linear-to-r from-gray-50/80 via-white to-gray-50/80 dark:from-gray-900/50 dark:via-gray-800/50 dark:to-gray-900/50 border-t border-gray-100 dark:border-gray-700/50" data-v-c1c3fdda><!-- Total --><div data-v-c1c3fdda><p class="text-xs text-gray-500 dark:text-gray-400 mb-0.5" data-v-c1c3fdda>Total Pesanan</p><p class="text-xl font-bold bg-linear-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent" data-v-c1c3fdda>${ssrInterpolate(unref(formatPrice)(__props.order.total))}</p></div><!-- Actions -->`);
      _push(ssrRenderComponent(_sfc_main$b, {
        order: __props.order,
        onPay: ($event) => emit("pay", __props.order),
        onConfirmReceived: ($event) => emit("confirmReceived", __props.order)
      }, null, _parent));
      _push(`</div></div></article>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderCard.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const OrderCard = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-c1c3fdda"]]);

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "OrderEmptyState",
  __ssrInlineRender: true,
  props: {
    filtered: { type: Boolean },
    status: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      const _component_UButton = _sfc_main$h;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative py-16 sm:py-24 text-center overflow-hidden" }, _attrs))} data-v-33afa90c><!-- Background Animation --><div class="absolute inset-0 -z-10" data-v-33afa90c><!-- Floating Particles --><div class="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500/20 rounded-full animate-float-1" data-v-33afa90c></div><div class="absolute top-1/3 right-1/3 w-3 h-3 bg-secondary-500/20 rounded-full animate-float-2" data-v-33afa90c></div><div class="absolute bottom-1/3 left-1/3 w-2 h-2 bg-primary-500/15 rounded-full animate-float-3" data-v-33afa90c></div><div class="absolute top-1/2 right-1/4 w-4 h-4 bg-secondary-500/15 rounded-full animate-float-1" data-v-33afa90c></div><!-- Gradient Glow --><div class="absolute inset-0 bg-linear-to-b from-transparent via-primary-500/5 to-transparent" data-v-33afa90c></div></div><!-- Icon --><div class="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 mb-6" data-v-33afa90c><!-- Glow Ring --><div class="absolute inset-0 bg-linear-to-br from-primary-500/20 to-secondary-500/20 rounded-full blur-2xl animate-pulse" data-v-33afa90c></div><!-- Icon Container --><div class="relative w-full h-full rounded-full bg-linear-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center border border-gray-200/50 dark:border-gray-700/50" data-v-33afa90c>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-bag",
        class: "w-12 h-12 sm:w-16 sm:h-16 text-gray-300 dark:text-gray-600"
      }, null, _parent));
      _push(`<!-- Decorative elements --><div class="absolute -top-1 -right-1 w-4 h-4 bg-primary-500/20 rounded-full" data-v-33afa90c></div><div class="absolute -bottom-2 -left-2 w-6 h-6 bg-secondary-500/20 rounded-full" data-v-33afa90c></div></div></div><!-- Content --><div class="relative space-y-4" data-v-33afa90c><h2 class="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white" data-v-33afa90c>${ssrInterpolate(__props.filtered ? "Tidak Ada Pesanan" : "Belum Ada Pesanan")}</h2><p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto" data-v-33afa90c>`);
      if (__props.filtered) {
        _push(`<!--[--> Tidak ada pesanan dengan status ini. Coba filter dengan status lainnya. <!--]-->`);
      } else {
        _push(`<!--[--> Anda belum memiliki pesanan. Yuk, mulai belanja produk vape berkualitas! <!--]-->`);
      }
      _push(`</p><!-- CTA Button --><div class="pt-4" data-v-33afa90c>`);
      _push(ssrRenderComponent(unref(Link), { href: "/collections" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              size: "lg",
              class: "shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-5 h-5 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Mulai Belanja `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-shopping-cart",
                      class: "w-5 h-5 mr-2"
                    }),
                    createTextVNode(" Mulai Belanja ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                color: "primary",
                size: "lg",
                class: "shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all duration-300 hover:-translate-y-0.5"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-5 h-5 mr-2"
                  }),
                  createTextVNode(" Mulai Belanja ")
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
      _push(`</div></div><!-- Decorative Bottom --><div class="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" data-v-33afa90c></div></div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderEmptyState.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const OrderEmptyState = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-33afa90c"]]);

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "OrderListSkeleton",
  __ssrInlineRender: true,
  props: {
    count: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!--[-->`);
      ssrRenderList(__props.count || 3, (i) => {
        _push(`<div class="bg-white dark:bg-gray-800/80 rounded-2xl sm:rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden animate-pulse"><!-- Header Skeleton --><div class="flex items-center justify-between gap-4 p-4 sm:p-5 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center gap-4"><div class="hidden sm:block w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700"></div><div class="space-y-2"><div class="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div><div class="h-4 w-24 bg-gray-100 dark:bg-gray-700/50 rounded"></div></div></div><div class="h-7 w-28 bg-gray-200 dark:bg-gray-700 rounded-full"></div></div><!-- Seller Skeleton --><div class="flex items-center gap-3 px-4 sm:px-5 py-3 bg-gray-50/50 dark:bg-gray-900/30"><div class="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div><div class="space-y-1.5"><div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div><div class="h-3 w-16 bg-gray-100 dark:bg-gray-700/50 rounded"></div></div></div><!-- Items Skeleton --><div class="p-4 sm:p-5 space-y-3"><!--[-->`);
        ssrRenderList(2, (j) => {
          _push(`<div class="flex gap-4"><div class="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0"></div><div class="flex-1 space-y-2 py-1"><div class="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div><div class="h-3 w-1/2 bg-gray-100 dark:bg-gray-700/50 rounded"></div><div class="flex justify-between"><div class="h-4 w-20 bg-gray-100 dark:bg-gray-700/50 rounded"></div><div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div></div></div></div>`);
        });
        _push(`<!--]--></div><!-- Footer Skeleton --><div class="flex items-center justify-between gap-4 p-4 sm:p-5 bg-gray-50/50 dark:bg-gray-900/30 border-t border-gray-100 dark:border-gray-700/50"><div class="space-y-1.5"><div class="h-3 w-20 bg-gray-100 dark:bg-gray-700/50 rounded"></div><div class="h-6 w-28 bg-gray-200 dark:bg-gray-700 rounded"></div></div><div class="flex gap-2"><div class="h-9 w-24 bg-gray-200 dark:bg-gray-700 rounded-lg"></div><div class="h-9 w-20 bg-gray-100 dark:bg-gray-700/50 rounded-lg"></div></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderListSkeleton.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "OrderPagination",
  __ssrInlineRender: true,
  props: {
    currentPage: {},
    lastPage: {},
    total: {},
    perPage: {}
  },
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const getPageNumbers = () => {
      const pages = [];
      const { currentPage, lastPage } = props;
      if (lastPage <= 7) {
        for (let i = 1; i <= lastPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (currentPage > 3) {
          pages.push("...");
        }
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(lastPage - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        if (currentPage < lastPage - 2) {
          pages.push("...");
        }
        pages.push(lastPage);
      }
      return pages;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      if (__props.lastPage > 1) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center justify-between gap-4 mt-8" }, _attrs))}><!-- Info --><p class="text-sm text-gray-500 dark:text-gray-400 order-2 sm:order-1"> Menampilkan <span class="font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate((__props.currentPage - 1) * __props.perPage + 1)}</span> - <span class="font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(Math.min(__props.currentPage * __props.perPage, __props.total))}</span> dari <span class="font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.total)}</span> pesanan </p><!-- Pagination --><nav class="flex items-center gap-1 order-1 sm:order-2" aria-label="Pagination"><!-- Previous --><button${ssrIncludeBooleanAttr(__props.currentPage === 1) ? " disabled" : ""} class="${ssrRenderClass([
          "relative p-2 rounded-lg transition-all duration-200",
          __props.currentPage === 1 ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chevron-left",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button><!-- Pages --><div class="flex items-center gap-1"><!--[-->`);
        ssrRenderList(getPageNumbers(), (page, index) => {
          _push(`<!--[--><!-- Ellipsis -->`);
          if (page === "...") {
            _push(`<span class="px-2 text-gray-400 dark:text-gray-500"> ... </span>`);
          } else {
            _push(`<!--[--><!-- Page Number --><button class="${ssrRenderClass([
              "relative min-w-[40px] h-10 px-3 rounded-lg font-medium transition-all duration-200",
              page === __props.currentPage ? "bg-linear-to-r from-primary-500 to-secondary-500 text-white shadow-lg shadow-primary-500/30" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
            ])}">${ssrInterpolate(page)} <!-- Active indicator glow -->`);
            if (page === __props.currentPage) {
              _push(`<div class="absolute inset-0 bg-linear-to-r from-primary-500/30 to-secondary-500/30 rounded-lg blur-lg -z-10"></div>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</button><!--]-->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--></div><!-- Next --><button${ssrIncludeBooleanAttr(__props.currentPage === __props.lastPage) ? " disabled" : ""} class="${ssrRenderClass([
          "relative p-2 rounded-lg transition-all duration-200",
          __props.currentPage === __props.lastPage ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chevron-right",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button></nav></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderPagination.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "OrderList",
  __ssrInlineRender: true,
  props: {
    orders: {},
    loading: { type: Boolean },
    filtered: { type: Boolean }
  },
  emits: ["pay", "confirmReceived", "cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-3cdc577e><!-- Loading State -->`);
      if (__props.loading) {
        _push(ssrRenderComponent(_sfc_main$8, { count: 3 }, null, _parent));
      } else if (__props.orders.length > 0) {
        _push(`<!--[--><!-- Orders List --><div${ssrRenderAttrs({
          name: "list",
          class: "space-y-4 sm:space-y-6"
        })} data-v-3cdc577e>`);
        ssrRenderList(__props.orders, (order, index) => {
          _push(ssrRenderComponent(OrderCard, {
            key: order.id,
            order,
            index,
            onPay: ($event) => emit("pay", order),
            onConfirmReceived: ($event) => emit("confirmReceived", order),
            onCancel: ($event) => emit("cancel", order)
          }, null, _parent));
        });
        _push(`</div><!--]-->`);
      } else {
        _push(`<!--[--><!-- Empty State -->`);
        _push(ssrRenderComponent(OrderEmptyState, { filtered: __props.filtered }, null, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderList.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const OrderList = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-3cdc577e"]]);

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "OrderTimeline",
  __ssrInlineRender: true,
  props: {
    timeline: {}
  },
  setup(__props) {
    const { formatDate } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header --><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-5 h-5 text-primary-500"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Status Pesanan</h2></div></div><!-- Timeline --><div class="p-5"><div class="relative"><!-- Line --><div class="absolute left-3.75 top-3 bottom-3 w-0.5 bg-linear-to-b from-primary-500 via-primary-500/50 to-gray-200 dark:to-gray-700"></div><!-- Items --><div class="space-y-6"><!--[-->`);
      ssrRenderList(__props.timeline, (item, index) => {
        _push(`<div class="relative flex gap-4 pl-10"><!-- Dot --><div class="${ssrRenderClass([
          "absolute left-0 w-7.5 h-7.5 rounded-full flex items-center justify-center transition-all duration-300",
          item.completed ? "bg-linear-to-br from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/30" : "bg-gray-100 dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600"
        ])}">`);
        if (item.completed) {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-check",
            class: "w-4 h-4 text-white"
          }, null, _parent));
        } else {
          _push(`<div class="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500"></div>`);
        }
        _push(`</div><!-- Content --><div class="flex-1 pb-2"><p class="${ssrRenderClass([
          "font-medium transition-colors duration-200",
          item.completed ? "text-gray-900 dark:text-white" : "text-gray-400 dark:text-gray-500"
        ])}">${ssrInterpolate(item.label)}</p>`);
        if (item.date) {
          _push(`<p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">${ssrInterpolate(unref(formatDate)(item.date))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!-- Status indicator for current -->`);
        if (item.completed && index === __props.timeline.filter((t) => t.completed).length - 1) {
          _push(`<div class="flex items-center"><span class="relative flex h-2 w-2"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span></span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      });
      _push(`<!--]--></div></div></div></div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderTimeline.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "OrderAddressCard",
  __ssrInlineRender: true,
  props: {
    address: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header --><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-map-pin",
        class: "w-5 h-5 text-emerald-500"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Alamat Pengiriman</h2></div></div><!-- Content --><div class="p-5 space-y-3"><!-- Recipient --><div class="flex items-start gap-3"><div class="w-8 h-8 rounded-full bg-linear-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-sm font-bold shrink-0">${ssrInterpolate(__props.address.recipientName.charAt(0).toUpperCase())}</div><div><p class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.address.recipientName)}</p><p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-phone",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.address.phone)}</p></div></div><!-- Divider --><div class="border-t border-gray-100 dark:border-gray-700/50"></div><!-- Address Lines --><div class="text-gray-600 dark:text-gray-400 text-sm space-y-1"><p>${ssrInterpolate(__props.address.addressLine1)}</p>`);
      if (__props.address.addressLine2) {
        _push(`<p>${ssrInterpolate(__props.address.addressLine2)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.address.cityName)}, ${ssrInterpolate(__props.address.provinceName)}</p><p class="inline-flex items-center gap-1.5 text-gray-500">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-envelope",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.address.postalCode)}</p></div></div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderAddressCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "OrderSummaryCard",
  __ssrInlineRender: true,
  props: {
    order: {}
  },
  setup(__props) {
    const { formatPrice } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header --><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-calculator",
        class: "w-5 h-5 text-violet-500"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Ringkasan Pembayaran</h2></div></div><!-- Content --><div class="p-5"><!-- Items --><div class="space-y-3"><div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400"> Subtotal (${ssrInterpolate(__props.order.items.length)} produk) </span><span class="text-gray-700 dark:text-gray-300">${ssrInterpolate(unref(formatPrice)(__props.order.subtotal))}</span></div><div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Ongkos Kirim</span><span class="text-gray-700 dark:text-gray-300">${ssrInterpolate(unref(formatPrice)(__props.order.shippingCost))}</span></div>`);
      if (__props.order.discount > 0) {
        _push(`<div class="flex justify-between text-sm"><span class="text-emerald-600 dark:text-emerald-400">Diskon</span><span class="text-emerald-600 dark:text-emerald-400">-${ssrInterpolate(unref(formatPrice)(__props.order.discount))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.order.adminFee && __props.order.adminFee > 0) {
        _push(`<div class="flex justify-between text-sm"><span class="text-gray-500 dark:text-gray-400">Biaya Layanan</span><span class="text-gray-700 dark:text-gray-300">${ssrInterpolate(unref(formatPrice)(__props.order.adminFee))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Divider --><div class="my-4 border-t border-dashed border-gray-200 dark:border-gray-700"></div><!-- Total --><div class="flex justify-between items-center"><span class="font-semibold text-gray-900 dark:text-white">Total</span><span class="text-xl font-bold bg-linear-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 bg-clip-text text-transparent">${ssrInterpolate(unref(formatPrice)(__props.order.total))}</span></div><!-- Payment Method -->`);
      if (__props.order.payment) {
        _push(`<div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50"><div class="flex items-center justify-between"><div class="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-credit-card",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`<span>Metode Pembayaran</span></div><span class="text-sm font-medium text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.order.payment.method)}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderSummaryCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const placeholderImage = "https://placehold.co/100x100/1a1a2e/ffffff?text=Vape";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "OrderItemsCard",
  __ssrInlineRender: true,
  props: {
    items: {}
  },
  setup(__props) {
    const { formatPrice } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header --><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-bag",
        class: "w-5 h-5 text-blue-500"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Produk Pesanan</h2></div></div></div><!-- Items --><div class="divide-y divide-gray-100 dark:divide-gray-700/50"><!--[-->`);
      ssrRenderList(__props.items, (item) => {
        _push(`<div class="group p-4 sm:p-5 hover:bg-gray-50/50 dark:hover:bg-gray-900/30 transition-colors duration-200"><div class="flex gap-4"><!-- Image --><div class="relative shrink-0"><div class="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200/50 dark:ring-gray-700/50"><img${ssrRenderAttr("src", item.image || placeholderImage)}${ssrRenderAttr("alt", item.productName)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy"></div><!-- Quantity Badge -->`);
        if (item.quantity > 1) {
          _push(`<span class="absolute -top-1.5 -right-1.5 w-6 h-6 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-primary-500/30">${ssrInterpolate(item.quantity)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!-- Info --><div class="flex-1 min-w-0"><h4 class="font-semibold text-gray-900 dark:text-white line-clamp-2">${ssrInterpolate(item.productName)}</h4><div class="mt-1 space-y-0.5">`);
        if (item.variantName) {
          _push(`<p class="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-swatch",
            class: "w-3.5 h-3.5"
          }, null, _parent));
          _push(` ${ssrInterpolate(item.variantName)}</p>`);
        } else {
          _push(`<!---->`);
        }
        if (item.productSku) {
          _push(`<p class="text-xs text-gray-400 dark:text-gray-500"> SKU: ${ssrInterpolate(item.productSku)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex items-center justify-between mt-3"><span class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(item.quantity)} × ${ssrInterpolate(unref(formatPrice)(item.price))}</span><span class="font-bold text-gray-900 dark:text-white">${ssrInterpolate(unref(formatPrice)(item.subtotal))}</span></div></div></div></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderItemsCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "OrderShippingCard",
  __ssrInlineRender: true,
  props: {
    shipping: {}
  },
  setup(__props) {
    const courierLogos = {
      jne: "JNE",
      jnt: "J&T",
      sicepat: "SiCepat",
      anteraja: "AnterAja",
      pos: "POS",
      tiki: "TIKI"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$g;
      const _component_UButton = _sfc_main$h;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header --><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500/10 to-amber-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-truck",
        class: "w-5 h-5 text-orange-500"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Informasi Pengiriman</h2></div></div><!-- Content --><div class="p-5"><div class="grid grid-cols-2 gap-4"><!-- Courier --><div class="space-y-1"><p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">Kurir</p><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center"><span class="text-xs font-bold text-gray-600 dark:text-gray-300">${ssrInterpolate(courierLogos[__props.shipping.courier.toLowerCase()] || __props.shipping.courier.substring(0, 3).toUpperCase())}</span></div><div><p class="font-medium text-gray-900 dark:text-white text-sm">${ssrInterpolate(__props.shipping.courier)}</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(__props.shipping.service)}</p></div></div></div><!-- Tracking Number --><div class="space-y-1"><p class="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">No. Resi</p>`);
      if (__props.shipping.trackingNumber) {
        _push(`<div class="flex items-center gap-2"><code class="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm font-mono text-gray-700 dark:text-gray-300">${ssrInterpolate(__props.shipping.trackingNumber)}</code><button class="p-1.5 text-gray-400 hover:text-primary-500 transition-colors" title="Salin No. Resi">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-clipboard-document",
          class: "w-4 h-4"
        }, null, _parent));
        _push(`</button></div>`);
      } else {
        _push(`<p class="text-sm text-gray-400 dark:text-gray-500"> Belum tersedia </p>`);
      }
      _push(`</div></div><!-- Track Button -->`);
      if (__props.shipping.trackingNumber) {
        _push(`<div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/50">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "outline",
          color: "primary",
          block: "",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-magnifying-glass",
                class: "w-4 h-4 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Lacak Pengiriman `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-magnifying-glass",
                  class: "w-4 h-4 mr-2"
                }),
                createTextVNode(" Lacak Pengiriman ")
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
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderShippingCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OrderDetailActions",
  __ssrInlineRender: true,
  props: {
    order: {},
    loading: { type: Boolean }
  },
  emits: ["pay", "confirmReceived", "cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$h;
      const _component_UIcon = _sfc_main$g;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-5 space-y-3" }, _attrs))}><!-- Pay Button -->`);
      if (__props.order.status === "pending_payment") {
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          block: "",
          size: "lg",
          loading: __props.loading,
          class: "shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-all duration-300",
          onClick: ($event) => emit("pay")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-credit-card",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Bayar Sekarang `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-credit-card",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Bayar Sekarang ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Confirm Received Button -->`);
      if (__props.order.status === "shipped") {
        _push(ssrRenderComponent(_component_UButton, {
          color: "success",
          block: "",
          size: "lg",
          loading: __props.loading,
          class: "shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-300",
          onClick: ($event) => emit("confirmReceived")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Konfirmasi Diterima `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check-circle",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Konfirmasi Diterima ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Cancel Button -->`);
      if (__props.order.status === "pending_payment") {
        _push(ssrRenderComponent(_component_UButton, {
          color: "error",
          variant: "outline",
          block: "",
          loading: __props.loading,
          onClick: ($event) => emit("cancel")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-x-circle",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Batalkan Pesanan `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-x-circle",
                  class: "w-5 h-5 mr-2"
                }),
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
      _push(`<!-- Reorder Button -->`);
      if (__props.order.status === "delivered" || __props.order.status === "cancelled") {
        _push(ssrRenderComponent(_component_UButton, {
          variant: "soft",
          color: "primary",
          block: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-5 h-5 mr-2"
              }, null, _parent2, _scopeId));
              _push2(` Pesan Lagi `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-path",
                  class: "w-5 h-5 mr-2"
                }),
                createTextVNode(" Pesan Lagi ")
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
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/orders/OrderDetailActions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { OrderPageHeader as O, _sfc_main$7 as _, OrderStatusTabs as a, OrderList as b, _sfc_main$d as c, _sfc_main$5 as d, _sfc_main$2 as e, _sfc_main$1 as f, _sfc_main$4 as g, _sfc_main$3 as h, _sfc_main as i };
