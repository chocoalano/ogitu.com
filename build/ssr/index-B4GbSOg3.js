import { _ as _sfc_main$k, a as _sfc_main$l } from './Button-BBveOjhJ.js';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext, createBlock, createCommentVNode, openBlock, toDisplayString, ref, computed, onMounted, nextTick, watch, onUnmounted, toRef, mergeModels, useModel, withModifiers, Fragment, renderList } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderAttr, ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { Link, Head, router } from '@inertiajs/vue3';
import { b as _export_sfc, _ as _sfc_main$n, u as useToast } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$r } from './default-ChIG0McX.js';
import { u as useOrderFormatters } from './use_orders-BXfsuIbb.js';
import { _ as _sfc_main$q } from './Checkbox-9gbT5PLz.js';
import { _ as _sfc_main$p } from './SelectMenu-CGTADs72.js';
import { _ as _sfc_main$o } from './Textarea-DTaAAeeU.js';
import { _ as _sfc_main$m } from './Modal-lw8uQ47S.js';
import { u as useMidtrans } from './use_midtrans-C-FzEF4G.js';
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
import 'vaul-vue';
import './DropdownMenu-DnaZdPLR.js';

const orderStatusConfig = {
  pending_payment: {
    label: "Menunggu Bayar",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    icon: "i-heroicons-clock"
  },
  paid: {
    label: "Dibayar",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    icon: "i-heroicons-check-circle"
  },
  processing: {
    label: "Diproses",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    icon: "i-heroicons-cog-6-tooth"
  },
  shipped: {
    label: "Dikirim",
    color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    icon: "i-heroicons-truck"
  },
  delivered: {
    label: "Selesai",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    icon: "i-heroicons-check-badge"
  },
  cancelled: {
    label: "Dibatalkan",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    icon: "i-heroicons-x-circle"
  }
};
const transactionTypeConfig = {
  topup: { label: "Top Up", color: "text-emerald-500", icon: "i-heroicons-arrow-down-circle" },
  withdrawal: { label: "Penarikan", color: "text-red-500", icon: "i-heroicons-arrow-up-circle" },
  commission: { label: "Komisi", color: "text-blue-500", icon: "i-heroicons-gift" },
  payment: { label: "Pembayaran", color: "text-orange-500", icon: "i-heroicons-shopping-cart" },
  refund: { label: "Refund", color: "text-purple-500", icon: "i-heroicons-arrow-path" },
  cashback: { label: "Cashback", color: "text-pink-500", icon: "i-heroicons-sparkles" }
};
const commissionStatusConfig = {
  pending: {
    label: "Pending",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
  },
  approved: {
    label: "Disetujui",
    color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
  },
  paid: {
    label: "Dibayar",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
  },
  cancelled: {
    label: "Dibatalkan",
    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
  }
};
const networkLevelColors = {
  1: { linear: "from-cyan-400 to-blue-500", bg: "bg-cyan-500/20", text: "text-cyan-400" },
  2: { linear: "from-purple-400 to-pink-500", bg: "bg-purple-500/20", text: "text-purple-400" },
  3: { linear: "from-amber-400 to-orange-500", bg: "bg-amber-500/20", text: "text-amber-400" }
};
const mitraStatusStyles = {
  active: {
    gradient: "bg-linear-to-br from-emerald-500 to-cyan-500",
    badge: "bg-emerald-400",
    text: "text-emerald-400"
  },
  inactive: {
    gradient: "bg-linear-to-br from-gray-500 to-gray-600",
    badge: "bg-gray-500",
    text: "text-gray-400"
  },
  prospect: {
    gradient: "bg-linear-to-br from-amber-500 to-orange-500",
    badge: "bg-amber-400",
    text: "text-amber-400"
  }
};
const rankColorConfig = {
  // Vapor Ranks (new system)
  "vapor-newbie": {
    icon: "i-lucide-flame",
    gradient: "from-slate-400 via-slate-500 to-slate-600",
    bg: "bg-slate-100 dark:bg-slate-800/50",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-400"
  },
  "vapor-active": {
    icon: "i-lucide-zap",
    gradient: "from-blue-400 via-cyan-500 to-teal-500",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-700 dark:text-cyan-400",
    border: "border-cyan-500"
  },
  "vapor-pro": {
    icon: "i-lucide-crown",
    gradient: "from-amber-400 via-orange-500 to-red-500",
    bg: "bg-orange-100 dark:bg-orange-900/30",
    text: "text-orange-700 dark:text-orange-400",
    border: "border-orange-500"
  },
  // Legacy ranks (for backward compatibility)
  bronze: {
    icon: "i-lucide-medal",
    gradient: "from-amber-600 to-orange-700",
    bg: "bg-amber-100 dark:bg-amber-900/30",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500"
  },
  silver: {
    icon: "i-lucide-award",
    gradient: "from-gray-400 to-gray-600",
    bg: "bg-gray-100 dark:bg-gray-700/50",
    text: "text-gray-700 dark:text-gray-300",
    border: "border-gray-400"
  },
  gold: {
    icon: "i-lucide-trophy",
    gradient: "from-yellow-400 to-amber-500",
    bg: "bg-yellow-100 dark:bg-yellow-900/30",
    text: "text-yellow-700 dark:text-yellow-400",
    border: "border-yellow-500"
  },
  platinum: {
    icon: "i-lucide-crown",
    gradient: "from-cyan-400 to-blue-500",
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    text: "text-cyan-700 dark:text-cyan-400",
    border: "border-cyan-500"
  },
  diamond: {
    icon: "i-lucide-gem",
    gradient: "from-violet-500 to-purple-600",
    bg: "bg-violet-100 dark:bg-violet-900/30",
    text: "text-violet-700 dark:text-violet-400",
    border: "border-violet-500"
  }
};
const getOrderStatusConfig = (status) => {
  return orderStatusConfig[status] || orderStatusConfig.pending_payment;
};
const getRankColor = (slug) => {
  return rankColorConfig[slug] || rankColorConfig["vapor-newbie"];
};

const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "WelcomeHeader",
  __ssrInlineRender: true,
  props: {
    customer: {},
    stats: {},
    currentRank: {}
  },
  emits: ["openRankDialog"],
  setup(__props, { emit: __emit }) {
    const { formatPrice } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative mb-8 p-6 sm:p-8 bg-white dark:bg-gray-800/80 rounded-3xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Decorative Background --><div class="absolute inset-0 bg-linear-to-br from-primary-500/5 via-transparent to-secondary-500/5"></div><div class="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div><div class="relative flex flex-col sm:flex-row items-start sm:items-center gap-6"><!-- Avatar --><div class="relative"><div class="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-linear-to-br from-primary-500 to-secondary-600 flex items-center justify-center shadow-xl shadow-primary-500/30">`);
      if (!__props.customer.avatar) {
        _push(`<span class="text-3xl sm:text-4xl font-bold text-white">${ssrInterpolate(__props.customer.fullName.charAt(0).toUpperCase())}</span>`);
      } else {
        _push(`<img${ssrRenderAttr("src", __props.customer.avatar)}${ssrRenderAttr("alt", __props.customer.fullName)} class="w-full h-full object-cover rounded-2xl">`);
      }
      _push(`</div><!-- Verified Badge -->`);
      if (__props.customer.isVerified) {
        _push(`<div class="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-full flex items-center justify-center ring-4 ring-white dark:ring-gray-800">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-check",
          class: "w-4 h-4 text-white"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Info --><div class="flex-1"><div class="flex flex-wrap items-center gap-3 mb-2"><h1 class="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white"> Selamat Datang, ${ssrInterpolate(__props.customer.fullName.split(" ")[0])}! 👋 </h1><!-- Rank Badge -->`);
      if (__props.currentRank) {
        _push(`<button class="${ssrRenderClass(["inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-transform hover:scale-105", unref(getRankColor)(__props.currentRank.slug).bg, unref(getRankColor)(__props.currentRank.slug).text])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: unref(getRankColor)(__props.currentRank.slug).icon,
          class: "w-4 h-4"
        }, null, _parent));
        _push(` ${ssrInterpolate(__props.currentRank.name)}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-gray-500 dark:text-gray-400 mb-3">${ssrInterpolate(__props.customer.email)} `);
      if (__props.customer.phone) {
        _push(`<span class="hidden sm:inline"> • ${ssrInterpolate(__props.customer.phone)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</p><div class="flex flex-wrap items-center gap-3"><span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-bag",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(__props.stats.totalOrders)} Pesanan </span><span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-banknotes",
        class: "w-3.5 h-3.5"
      }, null, _parent));
      _push(` ${ssrInterpolate(unref(formatPrice)(__props.stats.totalSpent))} Total Belanja </span></div></div><!-- Edit Profile Button -->`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/profile",
        class: "hidden sm:flex"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-pencil-square",
                    class: "w-4 h-4 mr-2"
                  }, null, _parent3, _scopeId2));
                  _push3(` Edit Profil `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-pencil-square",
                      class: "w-4 h-4 mr-2"
                    }),
                    createTextVNode(" Edit Profil ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                variant: "outline",
                color: "primary"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-pencil-square",
                    class: "w-4 h-4 mr-2"
                  }),
                  createTextVNode(" Edit Profil ")
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
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$j = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/WelcomeHeader.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};

const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "QuickActions",
  __ssrInlineRender: true,
  props: {
    stats: {},
    cartCount: {},
    wishlistCount: {},
    addressCount: {}
  },
  setup(__props) {
    const props = __props;
    const quickActions = [
      { label: "Pesanan Saya", href: "/orders", icon: "i-heroicons-shopping-bag", count: props.stats.totalOrders },
      { label: "Keranjang", href: "/cart", icon: "i-heroicons-shopping-cart", count: props.cartCount },
      { label: "Wishlist", href: "/wishlist", icon: "i-heroicons-heart", count: props.wishlistCount },
      { label: "Alamat", href: "/addresses", icon: "i-heroicons-map-pin", count: props.addressCount }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8" }, _attrs))}><!--[-->`);
      ssrRenderList(quickActions, (action) => {
        _push(ssrRenderComponent(unref(Link), {
          key: action.href,
          href: action.href,
          class: "group relative p-5 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 hover:border-primary-500/50 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center justify-between mb-3"${_scopeId}><div class="w-12 h-12 rounded-xl bg-linear-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: action.icon,
                class: "w-6 h-6 text-primary-500"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              if (action.count > 0) {
                _push2(`<span class="px-2.5 py-1 rounded-full text-xs font-bold bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"${_scopeId}>${ssrInterpolate(action.count)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><p class="font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"${_scopeId}>${ssrInterpolate(action.label)}</p>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-right",
                class: "absolute bottom-5 right-5 w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode("div", { class: "flex items-center justify-between mb-3" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-xl bg-linear-to-br from-primary-500/10 to-secondary-500/10 flex items-center justify-center group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300" }, [
                    createVNode(_component_UIcon, {
                      name: action.icon,
                      class: "w-6 h-6 text-primary-500"
                    }, null, 8, ["name"])
                  ]),
                  action.count > 0 ? (openBlock(), createBlock(
                    "span",
                    {
                      key: 0,
                      class: "px-2.5 py-1 rounded-full text-xs font-bold bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"
                    },
                    toDisplayString(action.count),
                    1
                    /* TEXT */
                  )) : createCommentVNode("v-if", true)
                ]),
                createVNode(
                  "p",
                  { class: "font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors" },
                  toDisplayString(action.label),
                  1
                  /* TEXT */
                ),
                createVNode(_component_UIcon, {
                  name: "i-heroicons-arrow-right",
                  class: "absolute bottom-5 right-5 w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 group-hover:translate-x-1 transition-all duration-300"
                })
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

const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/QuickActions.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};

const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "OrderStatusCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const orderStatusCards = [
      { key: "pendingPayment", label: "Belum Bayar", icon: "i-heroicons-clock", color: "from-amber-500 to-orange-500", bgColor: "bg-amber-500/10" },
      { key: "processing", label: "Diproses", icon: "i-heroicons-cog-6-tooth", color: "from-indigo-500 to-purple-500", bgColor: "bg-indigo-500/10" },
      { key: "shipped", label: "Dikirim", icon: "i-heroicons-truck", color: "from-purple-500 to-pink-500", bgColor: "bg-purple-500/10" },
      { key: "delivered", label: "Selesai", icon: "i-heroicons-check-badge", color: "from-emerald-500 to-teal-500", bgColor: "bg-emerald-500/10" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-8" }, _attrs))}><div class="flex items-center justify-between mb-4"><h2 class="text-lg font-bold text-gray-900 dark:text-white">Status Pesanan</h2>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/orders",
        class: "text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Lihat Semua `);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-right",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(" Lihat Semua "),
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-right",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><div class="grid grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(orderStatusCards, (card) => {
        _push(ssrRenderComponent(unref(Link), {
          key: card.key,
          href: `/orders?status=${card.key === "pendingPayment" ? "pending_payment" : card.key}`,
          class: "group relative p-5 bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!-- Background Glow --><div class="${ssrRenderClass(["absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", card.bgColor])}"${_scopeId}></div><div class="relative"${_scopeId}><div class="${ssrRenderClass(["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center mb-3", card.color])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: card.icon,
                class: "w-5 h-5 text-white"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="text-2xl font-bold text-gray-900 dark:text-white mb-1"${_scopeId}>${ssrInterpolate(__props.stats[card.key])}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(card.label)}</p></div>`);
            } else {
              return [
                createCommentVNode(" Background Glow "),
                createVNode(
                  "div",
                  {
                    class: ["absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300", card.bgColor]
                  },
                  null,
                  2
                  /* CLASS */
                ),
                createVNode("div", { class: "relative" }, [
                  createVNode(
                    "div",
                    {
                      class: ["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center mb-3", card.color]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: card.icon,
                        class: "w-5 h-5 text-white"
                      }, null, 8, ["name"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-gray-900 dark:text-white mb-1" },
                    toDisplayString(__props.stats[card.key]),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "p",
                    { class: "text-sm text-gray-500 dark:text-gray-400" },
                    toDisplayString(card.label),
                    1
                    /* TEXT */
                  )
                ])
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});

const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/OrderStatusCards.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};

const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "RecentOrders",
  __ssrInlineRender: true,
  props: {
    orders: {}
  },
  setup(__props) {
    const { formatPrice, formatRelativeTime } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50 flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-blue-500/10 to-cyan-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-clock",
        class: "w-5 h-5 text-blue-500"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Pesanan Terbaru</h2></div>`);
      _push(ssrRenderComponent(unref(Link), { href: "/orders" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "primary",
              size: "sm"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Lihat Semua `);
                } else {
                  return [
                    createTextVNode(" Lihat Semua ")
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
                color: "primary",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Lihat Semua ")
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
      if (__props.orders.length > 0) {
        _push(`<div class="divide-y divide-gray-100 dark:divide-gray-700/50"><!--[-->`);
        ssrRenderList(__props.orders, (order) => {
          _push(ssrRenderComponent(unref(Link), {
            key: order.id,
            href: `/orders/${order.id}`,
            class: "flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors group"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!-- Product Image --><div class="w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0"${_scopeId}>`);
                if (order.firstItem?.image) {
                  _push2(`<img${ssrRenderAttr("src", order.firstItem.image)}${ssrRenderAttr("alt", order.firstItem.name)} class="w-full h-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-photo",
                    class: "w-6 h-6 text-gray-400"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><!-- Order Info --><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-2 mb-1"${_scopeId}><span class="font-semibold text-gray-900 dark:text-white text-sm truncate"${_scopeId}>${ssrInterpolate(order.orderNumber)}</span><span class="${ssrRenderClass(["inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", unref(getOrderStatusConfig)(order.status).color])}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: unref(getOrderStatusConfig)(order.status).icon,
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(` ${ssrInterpolate(unref(getOrderStatusConfig)(order.status).label)}</span></div><p class="text-sm text-gray-500 dark:text-gray-400 truncate"${_scopeId}>${ssrInterpolate(order.firstItem?.name || "Produk")} `);
                if (order.itemCount > 1) {
                  _push2(`<span class="text-gray-400"${_scopeId}> +${ssrInterpolate(order.itemCount - 1)} lainnya</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</p><p class="text-xs text-gray-400 dark:text-gray-500 mt-1"${_scopeId}>${ssrInterpolate(unref(formatRelativeTime)(order.createdAt))}</p></div><!-- Price --><div class="text-right shrink-0"${_scopeId}><p class="font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatPrice)(order.total))}</p>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-chevron-right",
                  class: "w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors mt-1"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                return [
                  createCommentVNode(" Product Image "),
                  createVNode("div", { class: "w-14 h-14 rounded-xl bg-gray-100 dark:bg-gray-700 overflow-hidden shrink-0" }, [
                    order.firstItem?.image ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: order.firstItem.image,
                      alt: order.firstItem.name,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "w-full h-full flex items-center justify-center"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-photo",
                        class: "w-6 h-6 text-gray-400"
                      })
                    ]))
                  ]),
                  createCommentVNode(" Order Info "),
                  createVNode("div", { class: "flex-1 min-w-0" }, [
                    createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                      createVNode(
                        "span",
                        { class: "font-semibold text-gray-900 dark:text-white text-sm truncate" },
                        toDisplayString(order.orderNumber),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "span",
                        {
                          class: ["inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", unref(getOrderStatusConfig)(order.status).color]
                        },
                        [
                          createVNode(_component_UIcon, {
                            name: unref(getOrderStatusConfig)(order.status).icon,
                            class: "w-3 h-3"
                          }, null, 8, ["name"]),
                          createTextVNode(
                            " " + toDisplayString(unref(getOrderStatusConfig)(order.status).label),
                            1
                            /* TEXT */
                          )
                        ],
                        2
                        /* CLASS */
                      )
                    ]),
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400 truncate" }, [
                      createTextVNode(
                        toDisplayString(order.firstItem?.name || "Produk") + " ",
                        1
                        /* TEXT */
                      ),
                      order.itemCount > 1 ? (openBlock(), createBlock(
                        "span",
                        {
                          key: 0,
                          class: "text-gray-400"
                        },
                        " +" + toDisplayString(order.itemCount - 1) + " lainnya",
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true)
                    ]),
                    createVNode(
                      "p",
                      { class: "text-xs text-gray-400 dark:text-gray-500 mt-1" },
                      toDisplayString(unref(formatRelativeTime)(order.createdAt)),
                      1
                      /* TEXT */
                    )
                  ]),
                  createCommentVNode(" Price "),
                  createVNode("div", { class: "text-right shrink-0" }, [
                    createVNode(
                      "p",
                      { class: "font-bold text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatPrice)(order.total)),
                      1
                      /* TEXT */
                    ),
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-chevron-right",
                      class: "w-5 h-5 text-gray-300 dark:text-gray-600 group-hover:text-primary-500 transition-colors mt-1"
                    })
                  ])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="p-8 text-center"><div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shopping-bag",
          class: "w-8 h-8 text-gray-400"
        }, null, _parent));
        _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">Belum Ada Pesanan</h3><p class="text-gray-500 dark:text-gray-400 text-sm mb-4"> Mulai belanja dan temukan produk vape favoritmu! </p>`);
        _push(ssrRenderComponent(unref(Link), { href: "/collections" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UButton, { color: "primary" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-shopping-cart",
                      class: "w-4 h-4 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` Mulai Belanja `);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-shopping-cart",
                        class: "w-4 h-4 mr-2"
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
                createVNode(_component_UButton, { color: "primary" }, {
                  default: withCtx(() => [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-shopping-cart",
                      class: "w-4 h-4 mr-2"
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
        _push(`</div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/RecentOrders.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};

const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "WalletCard",
  __ssrInlineRender: true,
  props: {
    wallet: {},
    transactions: {}
  },
  emits: ["openTopup"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { formatPrice, formatRelativeTime } = useOrderFormatters();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header with Balance --><div class="p-5 bg-linear-to-br from-emerald-500 to-teal-600 text-white"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-wallet",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</div><span class="font-semibold">E-Wallet</span></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        size: "sm",
        color: "white",
        variant: "solid",
        onClick: ($event) => emit("openTopup")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Top Up `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-1"
              }),
              createTextVNode(" Top Up ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><div><p class="text-white/70 text-sm mb-1">Saldo Tersedia</p><p class="text-3xl font-bold">${ssrInterpolate(unref(formatPrice)(__props.wallet.balance))}</p></div>`);
      if (__props.wallet.pendingBalance > 0) {
        _push(`<div class="mt-3 pt-3 border-t border-white/20"><div class="flex items-center justify-between text-sm"><span class="text-white/70">Saldo Pending</span><span class="font-medium">${ssrInterpolate(unref(formatPrice)(__props.wallet.pendingBalance))}</span></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Recent Transactions --><div class="p-4"><h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Transaksi Terakhir</h3>`);
      if (__props.transactions.length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(__props.transactions, (tx) => {
          _push(`<div class="flex items-center gap-3"><div class="${ssrRenderClass(["w-8 h-8 rounded-lg flex items-center justify-center", unref(transactionTypeConfig)[tx.type]?.color || "text-gray-500", "bg-gray-100 dark:bg-gray-700"])}">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: unref(transactionTypeConfig)[tx.type]?.icon || "i-heroicons-banknotes",
            class: "w-4 h-4"
          }, null, _parent));
          _push(`</div><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900 dark:text-white truncate">${ssrInterpolate(tx.description || unref(transactionTypeConfig)[tx.type]?.label || "Transaksi")}</p><p class="text-xs text-gray-400">${ssrInterpolate(unref(formatRelativeTime)(tx.createdAt))}</p></div><p class="${ssrRenderClass(["text-sm font-semibold", tx.type === "withdrawal" || tx.type === "payment" ? "text-red-500" : "text-emerald-500"])}">${ssrInterpolate(tx.type === "withdrawal" || tx.type === "payment" ? "-" : "+")}${ssrInterpolate(unref(formatPrice)(tx.amount))}</p></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-4"><p class="text-sm text-gray-400">Belum ada transaksi</p></div>`);
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/WalletCard.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};

const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "AffiliateCard",
  __ssrInlineRender: true,
  props: {
    affiliate: {},
    commissions: {}
  },
  setup(__props) {
    const props = __props;
    const { formatPrice, formatRelativeTime } = useOrderFormatters();
    const copiedReferral = ref(false);
    const affiliateLink = computed(() => {
      return `https://ogitu.com/r/${props.affiliate.referralCode}`;
    });
    const totalEarnings = computed(() => {
      return props.affiliate.totalEarnings + props.affiliate.pendingEarnings;
    });
    const copyReferralCode = async () => {
      try {
        await navigator.clipboard.writeText(affiliateLink.value);
        copiedReferral.value = true;
        setTimeout(() => {
          copiedReferral.value = false;
        }, 2e3);
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    };
    const shareReferral = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: "Daftar di Ogitu dan dapatkan bonus!",
            text: `Gunakan kode referral ${props.affiliate.referralCode} untuk mendapat bonus di Ogitu - Toko Vape Terpercaya!`,
            url: affiliateLink.value
          });
        } catch (error) {
          console.error("Failed to share:", error);
        }
      } else {
        copyReferralCode();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><!-- Header --><div class="p-5 bg-linear-to-br from-violet-500 to-purple-600 text-white"><div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-user-group",
        class: "w-5 h-5"
      }, null, _parent));
      _push(`</div><div><span class="font-semibold">Program Afiliasi</span><p class="text-white/70 text-xs">Komisi ${ssrInterpolate(__props.affiliate.commissionRate)}% per order</p></div></div><!-- Stats Grid --><div class="grid grid-cols-3 gap-3"><div class="text-center p-2 bg-white/10 rounded-xl"><p class="text-xl font-bold">${ssrInterpolate(__props.affiliate.totalReferrals)}</p><p class="text-xs text-white/70">Referral</p></div><div class="text-center p-2 bg-white/10 rounded-xl"><p class="text-xl font-bold">${ssrInterpolate(__props.affiliate.totalOrders)}</p><p class="text-xs text-white/70">Order</p></div><div class="text-center p-2 bg-white/10 rounded-xl"><p class="text-sm font-bold">${ssrInterpolate(unref(formatPrice)(totalEarnings.value))}</p><p class="text-xs text-white/70">Total</p></div></div></div><!-- Referral Code & Link --><div class="p-4 border-b border-gray-100 dark:border-gray-700/50"><p class="text-xs text-gray-500 dark:text-gray-400 mb-2">Kode Referral Anda</p><div class="flex items-center gap-2"><div class="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 rounded-xl font-mono font-bold text-primary-600 dark:text-primary-400 text-center tracking-wider">${ssrInterpolate(__props.affiliate.referralCode)}</div>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "primary",
        size: "sm",
        square: "",
        onClick: copyReferralCode
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: copiedReferral.value ? "i-heroicons-check" : "i-heroicons-clipboard",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: copiedReferral.value ? "i-heroicons-check" : "i-heroicons-clipboard",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        variant: "solid",
        color: "primary",
        size: "sm",
        square: "",
        onClick: shareReferral
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-share",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-share",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div>`);
      if (copiedReferral.value) {
        _push(`<p class="text-xs text-emerald-500 mt-2 text-center"> ✓ Link berhasil disalin! </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Earnings Breakdown --><div class="p-4 border-b border-gray-100 dark:border-gray-700/50"><div class="grid grid-cols-2 gap-4"><div><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Tersedia</p><p class="font-bold text-emerald-600 dark:text-emerald-400">${ssrInterpolate(unref(formatPrice)(__props.affiliate.totalEarnings))}</p></div><div><p class="text-xs text-gray-500 dark:text-gray-400 mb-1">Pending</p><p class="font-bold text-amber-600 dark:text-amber-400">${ssrInterpolate(unref(formatPrice)(__props.affiliate.pendingEarnings))}</p></div></div></div><!-- Recent Commissions --><div class="p-4"><h3 class="text-sm font-semibold text-gray-900 dark:text-white mb-3">Komisi Terbaru</h3>`);
      if (__props.commissions.length > 0) {
        _push(`<div class="space-y-3"><!--[-->`);
        ssrRenderList(__props.commissions, (comm) => {
          _push(`<div class="flex items-center justify-between"><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900 dark:text-white truncate">${ssrInterpolate(comm.orderNumber)}</p><p class="text-xs text-gray-400">${ssrInterpolate(unref(formatRelativeTime)(comm.createdAt))}</p></div><div class="text-right"><p class="text-sm font-semibold text-emerald-500">+${ssrInterpolate(unref(formatPrice)(comm.commissionAmount))}</p><span class="${ssrRenderClass(["inline-flex px-1.5 py-0.5 rounded text-xs font-medium", unref(commissionStatusConfig)[comm.status]?.color || "bg-gray-100 text-gray-600"])}">${ssrInterpolate(unref(commissionStatusConfig)[comm.status]?.label || comm.status)}</span></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="text-center py-4"><p class="text-sm text-gray-400">Belum ada komisi</p></div>`);
      }
      _push(`</div><!-- CTA Banner --><div class="p-4 bg-linear-to-r from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20"><div class="flex items-start gap-3"><div class="text-2xl">💰</div><div><p class="text-sm font-semibold text-gray-900 dark:text-white mb-1">Ajak Teman, Dapat Komisi!</p><p class="text-xs text-gray-500 dark:text-gray-400"> Bagikan link referral dan dapatkan ${ssrInterpolate(__props.affiliate.commissionRate)}% komisi dari setiap pembelian teman Anda! </p></div></div></div></div>`);
    };
  }
});

const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/AffiliateCard.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};

const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "MLMHeader",
  __ssrInlineRender: true,
  props: {
    affiliate: {}
  },
  emits: ["copied"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { formatPrice } = useOrderFormatters();
    const copiedReferral = ref(false);
    computed(() => `https://ogitu.com/r/${props.affiliate.referralCode}`);
    const totalEarnings = computed(() => props.affiliate.totalEarnings + props.affiliate.pendingEarnings);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-5 pb-4" }, _attrs))}><!-- Header Title --><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-2"><div class="h-px w-6 bg-linear-to-r from-transparent to-violet-500"></div><h2 class="text-sm font-black text-white flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-network",
        class: "w-4 h-4 text-violet-400"
      }, null, _parent));
      _push(`<span class="bg-linear-to-r from-violet-400 via-purple-400 to-pink-400 text-transparent bg-clip-text"> AFFILIATE CENTER </span></h2></div><div class="flex items-center gap-1 px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full"><div class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></div><span class="text-[10px] font-bold text-emerald-400">ACTIVE</span></div></div><!-- Quick Stats Bar --><div class="grid grid-cols-3 gap-2 mb-4"><div class="p-2 bg-gray-800/60 border border-gray-700/50 rounded-xl text-center"><p class="text-lg font-black text-white">${ssrInterpolate(__props.affiliate.totalReferrals)}</p><p class="text-[9px] text-gray-500 uppercase tracking-wider">Mitra</p></div><div class="p-2 bg-gray-800/60 border border-gray-700/50 rounded-xl text-center"><p class="text-lg font-black text-cyan-400">${ssrInterpolate(__props.affiliate.commissionRate)}%</p><p class="text-[9px] text-gray-500 uppercase tracking-wider">Komisi</p></div><div class="p-2 bg-gray-800/60 border border-gray-700/50 rounded-xl text-center"><p class="text-sm font-black text-emerald-400">${ssrInterpolate(unref(formatPrice)(totalEarnings.value))}</p><p class="text-[9px] text-gray-500 uppercase tracking-wider">Earnings</p></div></div><!-- Referral Code --><div class="flex items-center gap-2 p-2 bg-linear-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl"><div class="flex-1"><p class="text-[9px] text-gray-500 uppercase tracking-wider mb-0.5">Your Referral Code</p><p class="font-mono font-black text-violet-400 tracking-widest">${ssrInterpolate(__props.affiliate.referralCode)}</p></div><button class="p-2 bg-violet-500/20 hover:bg-violet-500/30 border border-violet-500/30 rounded-lg transition-colors">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: copiedReferral.value ? "i-lucide-check" : "i-lucide-copy",
        class: "w-4 h-4 text-violet-400"
      }, null, _parent));
      _push(`</button></div>`);
      if (copiedReferral.value) {
        _push(`<p class="text-[10px] text-emerald-400 text-center mt-1"> ✓ Link copied! </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/mlm/MLMHeader.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "MLMTabNavigation",
  __ssrInlineRender: true,
  props: {
    tabs: {},
    activeTab: {}
  },
  emits: ["update:activeTab"],
  setup(__props, { emit: __emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-3" }, _attrs))}><div class="flex items-center bg-gray-800/60 border border-gray-700/50 rounded-xl p-1"><!--[-->`);
      ssrRenderList(__props.tabs, (tab) => {
        _push(`<button class="${ssrRenderClass([
          "flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all duration-300",
          __props.activeTab === tab.id ? "bg-linear-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/30" : "text-gray-400 hover:text-white hover:bg-gray-700/50"
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: tab.icon,
          class: "w-3.5 h-3.5"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(tab.label)}</span>`);
        if (tab.count !== null && tab.count > 0) {
          _push(`<span class="${ssrRenderClass([
            "px-1.5 py-0.5 rounded-full text-[9px]",
            __props.activeTab === tab.id ? "bg-white/20" : "bg-gray-700"
          ])}">${ssrInterpolate(tab.count)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});

const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/mlm/MLMTabNavigation.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "MLMMitraTab",
  __ssrInlineRender: true,
  props: {
    referrals: {}
  },
  emits: ["viewAll"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { formatPrice, formatRelativeTime } = useOrderFormatters();
    const mitraSubTab = ref("active");
    const mitraSubTabs = [
      { id: "active", label: "Aktif", icon: "i-lucide-user-check" },
      { id: "inactive", label: "Pasif", icon: "i-lucide-user-x" },
      { id: "prospect", label: "Prospek", icon: "i-lucide-user-plus" }
    ];
    const filteredReferrals = computed(() => {
      return props.referrals.filter((r) => r.status === mitraSubTab.value);
    });
    const referralCounts = computed(() => ({
      active: props.referrals.filter((r) => r.status === "active").length,
      inactive: props.referrals.filter((r) => r.status === "inactive").length,
      prospect: props.referrals.filter((r) => r.status === "prospect").length
    }));
    const getSubTabStyle = (subTabId, isActive) => {
      if (!isActive) return "text-gray-500 hover:text-gray-300";
      const styles = {
        active: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        inactive: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
        prospect: "bg-amber-500/20 text-amber-400 border border-amber-500/30"
      };
      return styles[subTabId];
    };
    const getCountBadgeStyle = (subTabId, isActive) => {
      if (!isActive) return "bg-gray-700";
      const styles = {
        active: "bg-emerald-500/30",
        inactive: "bg-gray-500/30",
        prospect: "bg-amber-500/30"
      };
      return styles[subTabId];
    };
    const emptyStateContent = computed(() => {
      const content = {
        active: {
          title: "Belum ada member aktif",
          subtitle: "Ajak teman untuk bergabung!"
        },
        inactive: {
          title: "Tidak ada member pasif",
          subtitle: "Semua member sedang aktif!"
        },
        prospect: {
          title: "Belum ada prospek",
          subtitle: "Bagikan link referral anda!"
        }
      };
      return content[mitraSubTab.value];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))}><!-- Sub-Tab Navigation --><div class="flex items-center gap-1 p-1 bg-gray-800/40 border border-gray-700/30 rounded-xl"><!--[-->`);
      ssrRenderList(mitraSubTabs, (subTab) => {
        _push(`<button class="${ssrRenderClass([
          "flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200",
          getSubTabStyle(subTab.id, mitraSubTab.value === subTab.id)
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: subTab.icon,
          class: "w-3 h-3"
        }, null, _parent));
        _push(`<span>${ssrInterpolate(subTab.label)}</span>`);
        if (referralCounts.value[subTab.id] > 0) {
          _push(`<span class="${ssrRenderClass([
            "px-1 py-0.5 rounded text-[8px] ml-0.5",
            getCountBadgeStyle(subTab.id, mitraSubTab.value === subTab.id)
          ])}">${ssrInterpolate(referralCounts.value[subTab.id])}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></div><!-- Member List -->`);
      if (filteredReferrals.value.length > 0) {
        _push(`<div class="space-y-2"><!--[-->`);
        ssrRenderList(filteredReferrals.value.slice(0, 5), (referral) => {
          _push(`<div class="flex items-center gap-3 p-3 bg-gray-800/40 border border-gray-700/30 rounded-xl hover:bg-gray-800/60 transition-colors group"><!-- Avatar --><div class="relative"><div class="${ssrRenderClass([
            "w-10 h-10 rounded-xl flex items-center justify-center",
            unref(mitraStatusStyles)[referral.status].gradient
          ])}">`);
          if (!referral.customerAvatar) {
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-user",
              class: "w-5 h-5 text-white"
            }, null, _parent));
          } else {
            _push(`<img${ssrRenderAttr("src", referral.customerAvatar)} class="w-full h-full rounded-xl object-cover">`);
          }
          _push(`</div><div class="${ssrRenderClass([
            "absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-800",
            unref(mitraStatusStyles)[referral.status].badge
          ])}"></div></div><!-- Info --><div class="flex-1 min-w-0"><p class="text-sm font-bold text-white truncate">${ssrInterpolate(referral.customerName)}</p><div class="flex items-center gap-2 text-[10px] text-gray-500"><span class="flex items-center gap-1">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-shopping-bag",
            class: "w-3 h-3"
          }, null, _parent));
          _push(` ${ssrInterpolate(referral.totalOrders)} orders </span><span>•</span><span>${ssrInterpolate(unref(formatRelativeTime)(referral.registeredAt))}</span></div></div><!-- Stats --><div class="text-right"><p class="${ssrRenderClass(["text-xs font-bold", unref(mitraStatusStyles)[referral.status].text])}">${ssrInterpolate(unref(formatPrice)(referral.totalSpent))}</p><p class="text-[9px] text-gray-500">spent</p></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="py-8 text-center"><div class="${ssrRenderClass([
          "w-16 h-16 mx-auto mb-3 rounded-2xl border flex items-center justify-center",
          mitraSubTab.value === "active" ? "bg-emerald-500/10 border-emerald-500/20" : mitraSubTab.value === "inactive" ? "bg-gray-500/10 border-gray-500/20" : "bg-amber-500/10 border-amber-500/20"
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: mitraSubTab.value === "active" ? "i-lucide-user-check" : mitraSubTab.value === "inactive" ? "i-lucide-user-x" : "i-lucide-user-plus",
          class: [
            "w-8 h-8",
            mitraSubTab.value === "active" ? "text-emerald-500/50" : mitraSubTab.value === "inactive" ? "text-gray-500/50" : "text-amber-500/50"
          ]
        }, null, _parent));
        _push(`</div><p class="text-sm text-gray-500 mb-1">${ssrInterpolate(emptyStateContent.value.title)}</p><p class="text-xs text-gray-600">${ssrInterpolate(emptyStateContent.value.subtitle)}</p></div><!--]-->`);
      }
      _push(`<!-- View All Link -->`);
      if (filteredReferrals.value.length > 5) {
        _push(`<button class="w-full py-2 text-xs text-violet-400 hover:text-violet-300 transition-colors"> Lihat semua ${ssrInterpolate(filteredReferrals.value.length)} member → </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/mlm/MLMMitraTab.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};

let goModule = null;
function useNetworkDiagram(containerRef, networkStats, networkTree) {
  const diagram = ref(null);
  const isInitialized = ref(false);
  const loadGoJS = async () => {
    if (!goModule) {
      goModule = await import('gojs');
    }
    return goModule;
  };
  const createDiagram = async () => {
    if (!containerRef.value) {
      console.warn("Network diagram: Container ref is null");
      return;
    }
    if (typeof globalThis.window === "undefined") {
      console.warn("Network diagram: Not in browser environment");
      return;
    }
    const go = await loadGoJS();
    const rect = containerRef.value.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      console.warn("Network diagram: Container has no dimensions", rect);
      return;
    }
    if (diagram.value) {
      diagram.value.div = null;
      diagram.value = null;
    }
    const $ = go.GraphObject.make;
    const myDiagram = new go.Diagram(containerRef.value, {
      "undoManager.isEnabled": false,
      "animationManager.isEnabled": true,
      "animationManager.duration": 600,
      "layout": new go.TreeLayout({
        angle: 90,
        layerSpacing: 40,
        nodeSpacing: 30,
        arrangement: go.TreeArrangement.Horizontal
      }),
      "isReadOnly": true,
      "allowSelect": false,
      "allowMove": false,
      "allowCopy": false,
      "allowDelete": false,
      "allowHorizontalScroll": false,
      "allowVerticalScroll": false,
      "allowZoom": false,
      "hasHorizontalScrollbar": false,
      "hasVerticalScrollbar": false,
      "contentAlignment": go.Spot.Center,
      "padding": 10,
      "toolManager.mouseWheelBehavior": go.WheelMode.None
    });
    myDiagram.div.style.backgroundColor = "transparent";
    const rootTemplate = $(
      go.Node,
      "Vertical",
      { locationSpot: go.Spot.Center },
      // Glow effect panel
      $(
        go.Panel,
        "Auto",
        // Outer glow
        $(go.Shape, "RoundedRectangle", {
          fill: new go.Brush("Linear", {
            0: "rgba(139, 92, 246, 0.4)",
            1: "rgba(168, 85, 247, 0.4)"
          }),
          stroke: null,
          width: 66,
          height: 66,
          parameter1: 14
        }),
        $(
          go.Panel,
          "Auto",
          // Main shape
          $(go.Shape, "RoundedRectangle", {
            fill: new go.Brush("Linear", {
              0: "rgb(139, 92, 246)",
              0.5: "rgb(147, 51, 234)",
              1: "rgb(168, 85, 247)"
            }),
            stroke: "rgba(255, 255, 255, 0.2)",
            strokeWidth: 2,
            width: 52,
            height: 52,
            parameter1: 12,
            shadowVisible: true
          }),
          // Crown icon using text
          $(go.TextBlock, "👑", {
            font: "22px sans-serif",
            stroke: "white",
            margin: 8
          })
        )
      ),
      // Label
      $(
        go.TextBlock,
        {
          margin: new go.Margin(8, 0, 2, 0),
          font: "bold 11px Inter, system-ui, sans-serif",
          stroke: "white"
        },
        new go.Binding("text", "text")
      ),
      // Subtitle
      $(go.TextBlock, "Network Leader", {
        font: "9px Inter, system-ui, sans-serif",
        stroke: "rgb(107, 114, 128)"
      })
    );
    const levelTemplate = $(
      go.Node,
      "Vertical",
      { locationSpot: go.Spot.Center },
      $(
        go.Panel,
        "Auto",
        // Main shape with gradient
        $(
          go.Shape,
          "RoundedRectangle",
          {
            width: 40,
            height: 40,
            parameter1: 10,
            strokeWidth: 0,
            shadowVisible: true
          },
          new go.Binding("fill", "", (data) => {
            return new go.Brush("Linear", {
              0: data.gradientStart,
              1: data.gradientEnd
            });
          })
        ),
        // Level text
        $(
          go.TextBlock,
          {
            font: "bold 12px Inter, system-ui, sans-serif",
            stroke: "white",
            margin: 6
          },
          new go.Binding("text", "text")
        )
      ),
      // Level label
      $(
        go.TextBlock,
        {
          margin: new go.Margin(5, 0, 1, 0),
          font: "9px Inter, system-ui, sans-serif",
          stroke: "rgb(156, 163, 175)"
        },
        new go.Binding("text", "level", (l) => `Level ${l}`)
      ),
      // Count
      $(
        go.TextBlock,
        {
          font: "bold 13px Inter, system-ui, sans-serif"
        },
        new go.Binding("text", "count", (c) => c?.toString() || "0"),
        new go.Binding("stroke", "color")
      )
    );
    const memberTemplate = $(
      go.Node,
      "Vertical",
      { locationSpot: go.Spot.Center },
      $(
        go.Panel,
        "Auto",
        // Main shape with gradient based on status
        $(
          go.Shape,
          "RoundedRectangle",
          {
            width: 36,
            height: 36,
            parameter1: 8,
            strokeWidth: 1,
            shadowVisible: true
          },
          new go.Binding("fill", "", (data) => {
            return new go.Brush("Linear", {
              0: data.gradientStart,
              1: data.gradientEnd
            });
          }),
          new go.Binding("stroke", "status", (s) => {
            return s === "active" ? "rgb(52, 211, 153)" : "rgb(107, 114, 128)";
          })
        ),
        // Member initial or avatar placeholder
        $(
          go.TextBlock,
          {
            font: "bold 14px Inter, system-ui, sans-serif",
            stroke: "white",
            margin: 4
          },
          new go.Binding("text", "text")
        )
      ),
      // Member name
      $(
        go.TextBlock,
        {
          margin: new go.Margin(4, 0, 0, 0),
          font: "8px Inter, system-ui, sans-serif",
          stroke: "rgb(156, 163, 175)",
          maxSize: new go.Size(60, Number.NaN),
          wrap: go.Wrap.None,
          overflow: go.TextOverflow.Ellipsis
        },
        new go.Binding("text", "customerName")
      )
    );
    const templmap = new go.Map();
    templmap.add("root", rootTemplate);
    templmap.add("level", levelTemplate);
    templmap.add("member", memberTemplate);
    myDiagram.nodeTemplateMap = templmap;
    myDiagram.linkTemplate = $(
      go.Link,
      {
        routing: go.Routing.Orthogonal,
        corner: 8,
        curve: go.Curve.JumpOver
      },
      $(go.Shape, {
        strokeWidth: 2,
        stroke: new go.Brush("Linear", {
          0: "rgb(139, 92, 246)",
          1: "rgba(139, 92, 246, 0.3)"
        })
      })
    );
    diagram.value = myDiagram;
    updateDiagramData();
    await nextTick();
    isInitialized.value = true;
  };
  const updateDiagramData = () => {
    if (!diagram.value || !goModule) return;
    const go = goModule;
    const stats = networkStats.value;
    const tree = networkTree?.value;
    let nodeDataArray;
    let linkDataArray;
    if (tree && tree.nodes && tree.nodes.length > 0) {
      console.log("[NetworkDiagram] Using tree data from database:", tree.nodes.length, "nodes");
      console.log("[NetworkDiagram] Nodes:", JSON.stringify(tree.nodes, null, 2));
      console.log("[NetworkDiagram] Links:", JSON.stringify(tree.links, null, 2));
      nodeDataArray = tree.nodes.map((node) => {
        let category = "member";
        if (node.isRoot) {
          category = "root";
        }
        return {
          ...node,
          category,
          // Ensure text is set for member nodes (use first letter of name if not set)
          text: node.text || (node.customerName ? node.customerName.charAt(0).toUpperCase() : "U")
        };
      });
      linkDataArray = tree.links || [];
    } else {
      console.log("[NetworkDiagram] Using fallback summary view");
      nodeDataArray = [
        {
          key: "root",
          text: "YOU",
          level: 0,
          isRoot: true,
          category: "root",
          color: "rgb(139, 92, 246)",
          gradientStart: "rgb(139, 92, 246)",
          gradientEnd: "rgb(168, 85, 247)"
        },
        {
          key: "level1",
          text: "L1",
          level: 1,
          count: stats.level1Count,
          category: "level",
          color: "rgb(34, 211, 238)",
          gradientStart: "rgb(34, 211, 238)",
          gradientEnd: "rgb(59, 130, 246)"
        },
        {
          key: "level2",
          text: "L2",
          level: 2,
          count: stats.level2Count,
          category: "level",
          color: "rgb(192, 132, 252)",
          gradientStart: "rgb(192, 132, 252)",
          gradientEnd: "rgb(236, 72, 153)"
        },
        {
          key: "level3",
          text: "L3",
          level: 3,
          count: stats.level3Count,
          category: "level",
          color: "rgb(251, 191, 36)",
          gradientStart: "rgb(251, 191, 36)",
          gradientEnd: "rgb(249, 115, 22)"
        }
      ];
      linkDataArray = [
        { from: "root", to: "level1" },
        { from: "root", to: "level2" },
        { from: "root", to: "level3" }
      ];
    }
    diagram.value.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);
    diagram.value.layoutDiagram(true);
  };
  const updateDiagram = async () => {
    updateDiagramData();
  };
  onMounted(() => {
    nextTick(() => {
      setTimeout(() => {
        createDiagram();
      }, 200);
    });
  });
  watch(
    containerRef,
    (newVal) => {
      if (newVal && !diagram.value) {
        nextTick(() => {
          setTimeout(() => {
            createDiagram();
          }, 100);
        });
      }
    },
    { immediate: true }
  );
  onUnmounted(() => {
    if (diagram.value) {
      diagram.value.div = null;
      diagram.value = null;
    }
  });
  watch(networkStats, () => updateDiagram(), { deep: true });
  if (networkTree) {
    watch(networkTree, () => updateDiagram(), { deep: true });
  }
  const initDiagram = async () => {
    if (containerRef.value) {
      if (diagram.value) {
        diagram.value.div = null;
        diagram.value = null;
        isInitialized.value = false;
      }
      await createDiagram();
    }
  };
  return {
    diagram,
    isInitialized,
    updateDiagram,
    initDiagram
  };
}

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "MLMNetworkTab",
  __ssrInlineRender: true,
  props: {
    networkStats: {},
    networkTree: {},
    isActive: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const { formatPrice } = useOrderFormatters();
    const networkDiagramRef = ref(null);
    const networkStatsRef = toRef(props, "networkStats");
    const networkTreeRef = toRef(props, "networkTree");
    const { initDiagram, updateDiagram, isInitialized } = useNetworkDiagram(
      networkDiagramRef,
      networkStatsRef,
      networkTreeRef
    );
    watch(
      () => props.isActive,
      (active) => {
        if (active) {
          nextTick(() => {
            setTimeout(() => {
              initDiagram();
            }, 150);
          });
        }
      }
    );
    watch(
      () => props.networkTree,
      (newTree) => {
        if (newTree && isInitialized.value) {
          updateDiagram();
        }
      },
      { deep: true }
    );
    const getLevelCount = (level) => {
      const counts = {
        1: props.networkStats.level1Count,
        2: props.networkStats.level2Count,
        3: props.networkStats.level3Count
      };
      return counts[level];
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!-- GoJS Network Visualization --><div class="relative"><!-- Background decorations --><div class="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none"><div class="absolute top-0 left-1/4 w-32 h-32 bg-violet-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-0 right-1/4 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl"></div></div><!-- GoJS Container --><div class="relative w-full rounded-2xl bg-gray-900/50 border border-gray-700/30 overflow-hidden" style="${ssrRenderStyle({ "height": "220px", "min-height": "220px" })}"></div><!-- Loading/Fallback State (overlay) -->`);
      if (!unref(isInitialized)) {
        _push(`<div class="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-2xl z-10"><div class="text-center"><div class="w-10 h-10 mx-auto mb-2 rounded-xl bg-violet-500/20 flex items-center justify-center animate-pulse">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-network",
          class: "w-5 h-5 text-violet-400"
        }, null, _parent));
        _push(`</div><p class="text-xs text-gray-500">Loading network...</p></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Network Stats --><div class="grid grid-cols-2 gap-2"><div class="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl"><div class="flex items-center gap-2 mb-1"><div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div><span class="text-[10px] text-emerald-400 font-bold uppercase">Active Members</span></div><p class="text-xl font-black text-emerald-400">${ssrInterpolate(__props.networkStats.activeMembers)}</p></div><div class="p-3 bg-gray-500/10 border border-gray-500/20 rounded-xl"><div class="flex items-center gap-2 mb-1"><div class="w-2 h-2 bg-gray-500 rounded-full"></div><span class="text-[10px] text-gray-400 font-bold uppercase">Inactive</span></div><p class="text-xl font-black text-gray-400">${ssrInterpolate(__props.networkStats.inactiveMembers)}</p></div></div><!-- Level Details --><div class="grid grid-cols-3 gap-2"><!--[-->`);
      ssrRenderList([1, 2, 3], (level) => {
        _push(`<div class="p-2.5 bg-gray-800/40 border border-gray-700/30 rounded-xl text-center"><div class="${ssrRenderClass([
          "w-8 h-8 mx-auto rounded-lg bg-linear-to-br flex items-center justify-center mb-2",
          unref(networkLevelColors)[level].linear
        ])}"><span class="text-[10px] font-black text-white">L${ssrInterpolate(level)}</span></div><p class="${ssrRenderClass(["text-lg font-black", unref(networkLevelColors)[level].text])}">${ssrInterpolate(getLevelCount(level))}</p><p class="text-[9px] text-gray-500">Level ${ssrInterpolate(level)}</p></div>`);
      });
      _push(`<!--]--></div><!-- Network Value --><div class="p-3 bg-linear-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl"><div class="flex items-center justify-between"><div><p class="text-[10px] text-gray-500 uppercase tracking-wider mb-0.5"> Total Network Value </p><p class="text-lg font-black bg-linear-to-r from-violet-400 to-purple-400 text-transparent bg-clip-text">${ssrInterpolate(unref(formatPrice)(__props.networkStats.totalNetworkValue))}</p></div><div class="w-12 h-12 rounded-xl bg-violet-500/20 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-trending-up",
        class: "w-6 h-6 text-violet-400"
      }, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
});

const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/mlm/MLMNetworkTab.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "MLMBonusTab",
  __ssrInlineRender: true,
  props: {
    affiliate: {},
    commissions: {}
  },
  emits: ["withdraw"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { formatPrice } = useOrderFormatters();
    const bonusSubTab = ref("summary");
    const bonusTypes = computed(() => [
      {
        id: "referral_incentive",
        name: "Bonus Referral Incentive",
        icon: "i-lucide-gift",
        amount: props.affiliate.totalEarnings * 0.15,
        color: "text-pink-400",
        linear: "from-pink-500 to-rose-500"
      },
      {
        id: "team_affiliate",
        name: "Team Affiliate Commission",
        icon: "i-lucide-users",
        amount: props.affiliate.totalEarnings * 0.25,
        color: "text-violet-400",
        linear: "from-violet-500 to-purple-500"
      },
      {
        id: "partner_team",
        name: "Partner Team Commission",
        icon: "i-lucide-handshake",
        amount: props.affiliate.totalEarnings * 0.2,
        color: "text-cyan-400",
        linear: "from-cyan-500 to-blue-500"
      },
      {
        id: "cashback",
        name: "Cashback Commission",
        icon: "i-lucide-wallet",
        amount: props.affiliate.totalEarnings * 0.1,
        color: "text-emerald-400",
        linear: "from-emerald-500 to-green-500"
      },
      {
        id: "promotions",
        name: "Promotions Rewards",
        icon: "i-lucide-megaphone",
        amount: props.affiliate.totalEarnings * 0.08,
        color: "text-amber-400",
        linear: "from-amber-500 to-orange-500"
      },
      {
        id: "retail",
        name: "Retail Commission",
        icon: "i-lucide-store",
        amount: props.affiliate.totalEarnings * 0.12,
        color: "text-blue-400",
        linear: "from-blue-500 to-indigo-500"
      },
      {
        id: "lifetime",
        name: "Lifetime Cash Rewards",
        icon: "i-lucide-infinity",
        amount: props.affiliate.totalEarnings * 0.1,
        color: "text-purple-400",
        linear: "from-purple-500 to-fuchsia-500"
      }
    ]);
    const totalBonus = computed(() => bonusTypes.value.reduce((sum, b) => sum + b.amount, 0));
    const getStatusConfig = (status) => {
      return commissionStatusConfig[status] || commissionStatusConfig.pending;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-3" }, _attrs))} data-v-6d34c68f><!-- Sub-Tab Navigation --><div class="flex items-center gap-1 p-1 bg-gray-800/40 border border-gray-700/30 rounded-xl" data-v-6d34c68f><button class="${ssrRenderClass([
        "flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200",
        bonusSubTab.value === "summary" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "text-gray-500 hover:text-gray-300"
      ])}" data-v-6d34c68f>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-layout-grid",
        class: "w-3 h-3"
      }, null, _parent));
      _push(`<span data-v-6d34c68f>Ringkasan Bonus</span></button><button class="${ssrRenderClass([
        "flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg text-[10px] font-bold transition-all duration-200",
        bonusSubTab.value === "history" ? "bg-violet-500/20 text-violet-400 border border-violet-500/30" : "text-gray-500 hover:text-gray-300"
      ])}" data-v-6d34c68f>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-history",
        class: "w-3 h-3"
      }, null, _parent));
      _push(`<span data-v-6d34c68f>Riwayat</span></button></div><!-- Summary Sub-Tab -->`);
      if (bonusSubTab.value === "summary") {
        _push(`<div class="space-y-3" data-v-6d34c68f><!-- Total Bonus Card --><div class="relative p-4 bg-linear-to-br from-emerald-500/20 via-cyan-500/10 to-violet-500/20 border border-emerald-500/30 rounded-2xl overflow-hidden" data-v-6d34c68f><!-- Shine Effect --><div class="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent animate-shimmer" data-v-6d34c68f></div><div class="relative" data-v-6d34c68f><div class="flex items-center gap-2 mb-2" data-v-6d34c68f><div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/30" data-v-6d34c68f>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-trophy",
          class: "w-5 h-5 text-white"
        }, null, _parent));
        _push(`</div><div data-v-6d34c68f><p class="text-[10px] text-gray-400 uppercase tracking-wider" data-v-6d34c68f>Total Bonus</p><p class="text-xl font-black text-emerald-400" data-v-6d34c68f>${ssrInterpolate(unref(formatPrice)(totalBonus.value))}</p></div></div></div></div><!-- Bonus Types Grid --><div class="grid grid-cols-2 gap-2" data-v-6d34c68f><!--[-->`);
        ssrRenderList(bonusTypes.value, (bonus) => {
          _push(`<div class="p-3 bg-gray-800/40 border border-gray-700/30 rounded-xl hover:bg-gray-800/60 transition-all group" data-v-6d34c68f><div class="flex items-start gap-2 mb-2" data-v-6d34c68f><div class="${ssrRenderClass([
            "w-8 h-8 rounded-lg bg-linear-to-br flex items-center justify-center shrink-0",
            bonus.linear
          ])}" data-v-6d34c68f>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: bonus.icon,
            class: "w-4 h-4 text-white"
          }, null, _parent));
          _push(`</div></div><p class="text-[10px] text-gray-500 mb-0.5 line-clamp-1" data-v-6d34c68f>${ssrInterpolate(bonus.name)}</p><p class="${ssrRenderClass(["text-sm font-black", bonus.color])}" data-v-6d34c68f>${ssrInterpolate(unref(formatPrice)(bonus.amount))}</p></div>`);
        });
        _push(`<!--]--></div><!-- Earnings Summary --><div class="grid grid-cols-2 gap-2" data-v-6d34c68f><div class="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl" data-v-6d34c68f><p class="text-[10px] text-gray-500 uppercase tracking-wider mb-1" data-v-6d34c68f>Available</p><p class="text-lg font-black text-emerald-400" data-v-6d34c68f>${ssrInterpolate(unref(formatPrice)(__props.affiliate.totalEarnings))}</p></div><div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl" data-v-6d34c68f><p class="text-[10px] text-gray-500 uppercase tracking-wider mb-1" data-v-6d34c68f>Pending</p><p class="text-lg font-black text-amber-400" data-v-6d34c68f>${ssrInterpolate(unref(formatPrice)(__props.affiliate.pendingEarnings))}</p></div></div></div>`);
      } else if (bonusSubTab.value === "history") {
        _push(`<!--[--><!-- History Sub-Tab --><div class="space-y-3" data-v-6d34c68f><!-- Commission List -->`);
        if (__props.commissions.length > 0) {
          _push(`<div class="space-y-2" data-v-6d34c68f><!--[-->`);
          ssrRenderList(__props.commissions.slice(0, 5), (commission) => {
            _push(`<div class="flex items-center gap-3 p-3 bg-gray-800/40 border border-gray-700/30 rounded-xl" data-v-6d34c68f><!-- Icon --><div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/20 to-cyan-500/20 border border-emerald-500/20 flex items-center justify-center" data-v-6d34c68f>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-coins",
              class: "w-5 h-5 text-emerald-400"
            }, null, _parent));
            _push(`</div><!-- Info --><div class="flex-1 min-w-0" data-v-6d34c68f><p class="text-sm font-bold text-white" data-v-6d34c68f>#${ssrInterpolate(commission.orderNumber)}</p><div class="flex items-center gap-2 text-[10px]" data-v-6d34c68f><span class="text-gray-500" data-v-6d34c68f>${ssrInterpolate(unref(formatPrice)(commission.orderTotal))}</span><span class="text-gray-600" data-v-6d34c68f>×</span><span class="text-cyan-400" data-v-6d34c68f>${ssrInterpolate(commission.commissionRate)}%</span></div></div><!-- Amount & Status --><div class="text-right" data-v-6d34c68f><p class="text-sm font-black text-emerald-400" data-v-6d34c68f> +${ssrInterpolate(unref(formatPrice)(commission.commissionAmount))}</p><span class="${ssrRenderClass([
              "text-[9px] px-1.5 py-0.5 rounded-full",
              getStatusConfig(commission.status).color
            ])}" data-v-6d34c68f>${ssrInterpolate(getStatusConfig(commission.status).label)}</span></div></div>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!--[--><!-- Empty State --><div class="py-8 text-center" data-v-6d34c68f><div class="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gray-800/60 border border-gray-700/50 flex items-center justify-center" data-v-6d34c68f>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-coins",
            class: "w-8 h-8 text-gray-600"
          }, null, _parent));
          _push(`</div><p class="text-sm text-gray-500 mb-1" data-v-6d34c68f>Belum ada riwayat bonus</p><p class="text-xs text-gray-600" data-v-6d34c68f>Ajak mitra untuk belanja dan dapatkan bonus!</p></div><!--]-->`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Withdraw Button -->`);
      if (__props.affiliate.totalEarnings > 0) {
        _push(`<button class="w-full py-3 bg-linear-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-2" data-v-6d34c68f>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-wallet",
          class: "w-4 h-4"
        }, null, _parent));
        _push(` Withdraw ${ssrInterpolate(unref(formatPrice)(__props.affiliate.totalEarnings))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/mlm/MLMBonusTab.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const MLMBonusTab = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-6d34c68f"]]);

/* unplugin-vue-components disabled */const _sfc_main$8 = {  };

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><div class="absolute inset-0 bg-linear-to-br from-gray-900 via-gray-800 to-gray-900"><!-- Animated Grid Pattern --><div class="absolute inset-0 bg-[url(&#39;data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&#39;)] opacity-40"></div><!-- Glow Effects --><div class="absolute -top-20 -left-20 w-40 h-40 bg-violet-500/20 rounded-full blur-3xl"></div><div class="absolute -bottom-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl"></div></div><!-- Floating Particles --><div class="absolute top-8 right-8 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse"></div><div class="absolute top-20 left-6 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div><div class="absolute bottom-24 right-12 w-1 h-1 bg-pink-400 rounded-full animate-bounce opacity-50"></div><!--]-->`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("inertia/components/dashboard/mlm/MLMBackground.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : undefined
};
const MLMBackground = /*#__PURE__*/_export_sfc(_sfc_main$8, [['ssrRender',_sfc_ssrRender]]);

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "MLMCard",
  __ssrInlineRender: true,
  props: {
    affiliate: {},
    commissions: {},
    referrals: {},
    networkStats: {},
    networkTree: {}
  },
  emits: ["withdraw", "viewAllMitra", "referralCopied"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const activeTab = ref("mitra");
    const tabs = computed(() => [
      { id: "mitra", label: "Mitra", icon: "i-lucide-users", count: props.referrals.length },
      { id: "network", label: "Network", icon: "i-lucide-git-branch", count: null },
      { id: "bonus", label: "Bonus", icon: "i-lucide-coins", count: props.commissions.length }
    ]);
    const handleWithdraw = () => emit("withdraw");
    const handleViewAllMitra = (status) => emit("viewAllMitra", status);
    const handleReferralCopied = () => emit("referralCopied");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden rounded-2xl" }, _attrs))}><!-- Gaming Card Background -->`);
      _push(ssrRenderComponent(unref(MLMBackground), null, null, _parent));
      _push(`<div class="relative z-10"><!-- Header Section -->`);
      _push(ssrRenderComponent(unref(_sfc_main$d), {
        affiliate: __props.affiliate,
        onCopied: handleReferralCopied
      }, null, _parent));
      _push(`<!-- Main Tab Navigation -->`);
      _push(ssrRenderComponent(unref(_sfc_main$c), {
        activeTab: activeTab.value,
        "onUpdate:activeTab": ($event) => activeTab.value = $event,
        tabs: tabs.value
      }, null, _parent));
      _push(`<!-- Tab Content --><div class="p-4"><!-- Mitra Tab -->`);
      if (activeTab.value === "mitra") {
        _push(ssrRenderComponent(unref(_sfc_main$b), {
          referrals: __props.referrals,
          onViewAll: handleViewAllMitra
        }, null, _parent));
      } else if (activeTab.value === "network") {
        _push(`<!--[--><!-- Network Tab -->`);
        _push(ssrRenderComponent(unref(_sfc_main$a), {
          "network-stats": __props.networkStats,
          "network-tree": __props.networkTree,
          "is-active": activeTab.value === "network"
        }, null, _parent));
        _push(`<!--]-->`);
      } else if (activeTab.value === "bonus") {
        _push(`<!--[--><!-- Bonus Tab -->`);
        _push(ssrRenderComponent(unref(MLMBonusTab), {
          affiliate: __props.affiliate,
          commissions: __props.commissions,
          onWithdraw: handleWithdraw
        }, null, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/MLMCard.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "RankCard",
  __ssrInlineRender: true,
  props: {
    currentRank: {},
    nextRank: {},
    rankProgress: {},
    ordersToNextRank: {},
    spentToNextRank: {}
  },
  emits: ["openDetails"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { formatPrice } = useOrderFormatters();
    const currentRankConfig = computed(() => {
      if (!props.currentRank) return null;
      return getRankColor(props.currentRank.slug);
    });
    const nextRankConfig = computed(() => {
      if (!props.nextRank) return null;
      return getRankColor(props.nextRank.slug);
    });
    const rankLevel = computed(() => {
      if (!props.currentRank) return 1;
      const slugMap = {
        "vapor-newbie": 1,
        "vapor-active": 2,
        "vapor-pro": 3
      };
      return slugMap[props.currentRank.slug] || 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative overflow-hidden rounded-2xl" }, _attrs))} data-v-9994dd20><!-- Gaming Card Background --><div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" data-v-9994dd20><!-- Animated Grid Pattern --><div class="absolute inset-0 bg-[url(&#39;data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.05%22%3E%3Cpath d=%22M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&#39;)] opacity-40" data-v-9994dd20></div><!-- Glow Effects -->`);
      if (currentRankConfig.value) {
        _push(`<div class="${ssrRenderClass(["absolute -top-20 -right-20 w-40 h-40 rounded-full blur-3xl opacity-30 bg-gradient-to-r", currentRankConfig.value.gradient])}" data-v-9994dd20></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute -bottom-10 -left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-2xl" data-v-9994dd20></div></div><!-- Floating Particles --><div class="absolute top-4 right-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" data-v-9994dd20></div><div class="absolute top-12 right-16 w-1 h-1 bg-orange-400 rounded-full animate-ping opacity-60" data-v-9994dd20></div><div class="absolute bottom-16 left-4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-50" data-v-9994dd20></div><div class="relative z-10 p-5" data-v-9994dd20><!-- Header --><div class="flex items-center justify-between mb-4" data-v-9994dd20><div class="flex items-center gap-2" data-v-9994dd20><div class="h-px w-8 bg-gradient-to-r from-transparent to-cyan-500" data-v-9994dd20></div><h2 class="text-sm font-black text-white flex items-center gap-2" data-v-9994dd20>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-gamepad-2",
        class: "w-4 h-4 text-cyan-400"
      }, null, _parent));
      _push(`<span class="bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text" data-v-9994dd20>PLAYER RANK</span></h2></div><button class="text-xs text-gray-400 hover:text-cyan-400 transition-colors flex items-center gap-1" data-v-9994dd20><span data-v-9994dd20>Details</span>`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-lucide-chevron-right",
        class: "w-3 h-3"
      }, null, _parent));
      _push(`</button></div><!-- Current Rank Display -->`);
      if (__props.currentRank && currentRankConfig.value) {
        _push(`<div class="relative" data-v-9994dd20><!-- 3D Rank Badge --><div class="flex items-center gap-4 mb-4" data-v-9994dd20><!-- Rank Icon with 3D Effect --><div class="relative group" data-v-9994dd20><!-- Outer Glow Ring --><div class="${ssrRenderClass(["absolute -inset-2 rounded-2xl bg-gradient-to-r opacity-60 blur-md animate-pulse", currentRankConfig.value.gradient])}" data-v-9994dd20></div><!-- Inner Shadow Layer --><div class="${ssrRenderClass(["absolute inset-0 rounded-xl bg-gradient-to-br opacity-80", currentRankConfig.value.gradient])}" style="${ssrRenderStyle({ "transform": "translateY(4px)" })}" data-v-9994dd20></div><!-- Main Badge --><div class="${ssrRenderClass(["relative w-16 h-16 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-2xl border border-white/20", currentRankConfig.value.gradient])}" data-v-9994dd20><!-- Shine Effect --><div class="absolute inset-0 rounded-xl bg-gradient-to-br from-white/30 via-transparent to-transparent" data-v-9994dd20></div>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: currentRankConfig.value.icon,
          class: "w-8 h-8 text-white drop-shadow-lg relative z-10"
        }, null, _parent));
        _push(`</div><!-- Level Badge --><div class="absolute -bottom-1 -right-1 w-6 h-6 bg-gray-900 border-2 border-cyan-500 rounded-lg flex items-center justify-center shadow-lg" data-v-9994dd20><span class="text-[10px] font-black text-cyan-400" data-v-9994dd20>${ssrInterpolate(rankLevel.value)}</span></div></div><!-- Rank Info --><div class="flex-1" data-v-9994dd20><h3 class="${ssrRenderClass(["text-lg font-black mb-0.5 bg-gradient-to-r text-transparent bg-clip-text", currentRankConfig.value.gradient])}" data-v-9994dd20>${ssrInterpolate(__props.currentRank.name)}</h3><div class="flex flex-wrap items-center gap-2" data-v-9994dd20>`);
        if (__props.currentRank.cashbackRate > 0) {
          _push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded-md text-[10px] font-bold text-emerald-400" data-v-9994dd20>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-percent",
            class: "w-3 h-3"
          }, null, _parent));
          _push(` ${ssrInterpolate(__props.currentRank.cashbackRate)}% Cashback </span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.currentRank.affiliateBonusRate > 0) {
          _push(`<span class="inline-flex items-center gap-1 px-2 py-0.5 bg-violet-500/20 border border-violet-500/30 rounded-md text-[10px] font-bold text-violet-400" data-v-9994dd20>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-gift",
            class: "w-3 h-3"
          }, null, _parent));
          _push(` +${ssrInterpolate(__props.currentRank.affiliateBonusRate)}% </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div><!-- XP Progress Bar (Game Style) -->`);
        if (__props.nextRank && nextRankConfig.value) {
          _push(`<div class="mt-4" data-v-9994dd20><div class="flex items-center justify-between mb-2" data-v-9994dd20><span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider" data-v-9994dd20>Progress ke Level ${ssrInterpolate(rankLevel.value + 1)}</span><span class="text-xs font-black text-cyan-400" data-v-9994dd20>${ssrInterpolate(Math.round(__props.rankProgress))}%</span></div><!-- XP Bar Container --><div class="relative h-4 bg-gray-800/80 rounded-lg border border-gray-700/50 overflow-hidden" data-v-9994dd20><!-- XP Bar Fill --><div class="${ssrRenderClass(["absolute inset-y-0 left-0 bg-gradient-to-r rounded-lg transition-all duration-700", currentRankConfig.value.gradient])}" style="${ssrRenderStyle({ width: `${__props.rankProgress}%` })}" data-v-9994dd20><!-- Shine Animation --><div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" data-v-9994dd20></div></div><!-- XP Markers --><div class="absolute inset-0 flex" data-v-9994dd20><!--[-->`);
          ssrRenderList(4, (i) => {
            _push(`<div class="flex-1 border-r border-gray-700/30 last:border-r-0" data-v-9994dd20></div>`);
          });
          _push(`<!--]--></div></div><!-- Progress Details --><div class="flex items-center justify-between mt-2 text-[10px] text-gray-500" data-v-9994dd20><div class="flex items-center gap-1" data-v-9994dd20>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-shopping-bag",
            class: "w-3 h-3"
          }, null, _parent));
          if (__props.ordersToNextRank > 0) {
            _push(`<span data-v-9994dd20>${ssrInterpolate(__props.ordersToNextRank)} order</span>`);
          } else {
            _push(`<span data-v-9994dd20>✓</span>`);
          }
          _push(`</div><div class="flex items-center gap-1" data-v-9994dd20>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-coins",
            class: "w-3 h-3"
          }, null, _parent));
          if (__props.spentToNextRank > 0) {
            _push(`<span data-v-9994dd20>${ssrInterpolate(unref(formatPrice)(__props.spentToNextRank))}</span>`);
          } else {
            _push(`<span data-v-9994dd20>✓</span>`);
          }
          _push(`</div></div><!-- Next Rank Preview --><div class="mt-3 flex items-center justify-center gap-2 p-2 bg-gray-800/50 rounded-lg border border-gray-700/30" data-v-9994dd20><span class="text-[10px] text-gray-500" data-v-9994dd20>Next:</span><div class="${ssrRenderClass(["w-5 h-5 rounded-md bg-gradient-to-br flex items-center justify-center", nextRankConfig.value.gradient])}" data-v-9994dd20>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: nextRankConfig.value.icon,
            class: "w-3 h-3 text-white"
          }, null, _parent));
          _push(`</div><span class="${ssrRenderClass(["text-xs font-bold bg-gradient-to-r text-transparent bg-clip-text", nextRankConfig.value.gradient])}" data-v-9994dd20>${ssrInterpolate(__props.nextRank.name)}</span></div></div>`);
        } else {
          _push(`<!--[--><!-- Max Rank Badge --><div class="mt-4 relative overflow-hidden" data-v-9994dd20><div class="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 animate-pulse" data-v-9994dd20></div><div class="relative p-3 border border-amber-500/30 rounded-xl text-center" data-v-9994dd20><div class="flex items-center justify-center gap-2 mb-1" data-v-9994dd20>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-crown",
            class: "w-5 h-5 text-amber-400"
          }, null, _parent));
          _push(`<span class="text-sm font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 text-transparent bg-clip-text" data-v-9994dd20>MAX RANK!</span>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-crown",
            class: "w-5 h-5 text-amber-400"
          }, null, _parent));
          _push(`</div><p class="text-[10px] text-amber-400/70" data-v-9994dd20>Anda adalah Legend of Vapers!</p></div></div><!--]-->`);
        }
        _push(`<!-- Benefits List (Compact) -->`);
        if (__props.currentRank?.benefits && __props.currentRank.benefits.length > 0) {
          _push(`<div class="mt-4 pt-3 border-t border-gray-700/30" data-v-9994dd20><div class="flex items-center gap-1.5 mb-2" data-v-9994dd20>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-lucide-sparkles",
            class: "w-3 h-3 text-yellow-400"
          }, null, _parent));
          _push(`<span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider" data-v-9994dd20>Active Perks</span></div><div class="flex flex-wrap gap-1.5" data-v-9994dd20><!--[-->`);
          ssrRenderList(__props.currentRank.benefits.slice(0, 3), (benefit, idx) => {
            _push(`<span class="inline-flex items-center gap-1 px-2 py-1 bg-gray-800/80 border border-gray-700/50 rounded-md text-[10px] text-gray-300" data-v-9994dd20>`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-lucide-check",
              class: "w-3 h-3 text-emerald-400"
            }, null, _parent));
            _push(` ${ssrInterpolate(benefit)}</span>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- No Rank State --><div class="text-center py-6" data-v-9994dd20><div class="w-16 h-16 mx-auto mb-3 rounded-xl bg-gray-800/80 border border-gray-700/50 flex items-center justify-center" data-v-9994dd20>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-lucide-user",
          class: "w-8 h-8 text-gray-600"
        }, null, _parent));
        _push(`</div><p class="text-sm text-gray-500" data-v-9994dd20>Belum ada rank</p><p class="text-xs text-gray-600 mt-1" data-v-9994dd20>Belanja untuk mendapatkan rank!</p></div><!--]-->`);
      }
      _push(`</div></div>`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/RankCard.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const RankCard = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-9994dd20"]]);

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "AddressList",
  __ssrInlineRender: true,
  props: {
    addresses: {}
  },
  emits: ["add", "edit", "delete", "setDefault"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 overflow-hidden" }, _attrs))}><div class="px-5 py-4 border-b border-gray-100 dark:border-gray-700/50"><div class="flex items-center justify-between"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500/10 to-teal-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-map-pin",
        class: "w-5 h-5 text-emerald-500"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Alamat Saya</h2></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "ghost",
        color: "primary",
        size: "sm",
        onClick: ($event) => emit("add")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Tambah `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-1"
              }),
              createTextVNode(" Tambah ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div>`);
      if (__props.addresses.length > 0) {
        _push(`<div class="divide-y divide-gray-100 dark:divide-gray-700/50"><!--[-->`);
        ssrRenderList(__props.addresses, (address) => {
          _push(`<div class="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"><div class="flex items-start justify-between gap-3"><div class="flex-1 min-w-0"><div class="flex items-center gap-2 mb-1.5"><span class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(address.recipientName)}</span><span class="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">${ssrInterpolate(address.label)}</span>`);
          if (address.isDefault) {
            _push(`<span class="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400"> Utama </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><p class="text-sm text-gray-500 dark:text-gray-400 mb-1">${ssrInterpolate(address.phone)}</p><p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">${ssrInterpolate(address.addressLine1)} `);
          if (address.addressLine2) {
            _push(`<span>, ${ssrInterpolate(address.addressLine2)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p><p class="text-sm text-gray-500 dark:text-gray-400">${ssrInterpolate(address.districtName ? `${address.districtName}, ` : "")}${ssrInterpolate(address.cityName)}, ${ssrInterpolate(address.provinceName)} ${ssrInterpolate(address.postalCode)}</p></div><div class="flex items-center gap-1">`);
          if (!address.isDefault) {
            _push(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "gray",
              size: "xs",
              onClick: ($event) => emit("setDefault", address.id)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-star",
                    class: "w-4 h-4"
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-star",
                      class: "w-4 h-4"
                    })
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            color: "gray",
            size: "xs",
            onClick: ($event) => emit("edit", address)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-pencil",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-pencil",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            color: "error",
            size: "xs",
            onClick: ($event) => emit("delete", address.id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-trash",
                  class: "w-4 h-4"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-trash",
                    class: "w-4 h-4"
                  })
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="p-8 text-center"><div class="w-14 h-14 mx-auto mb-3 rounded-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-map-pin",
          class: "w-7 h-7 text-gray-400"
        }, null, _parent));
        _push(`</div><h3 class="font-semibold text-gray-900 dark:text-white mb-1">Belum Ada Alamat</h3><p class="text-sm text-gray-500 dark:text-gray-400 mb-4"> Tambahkan alamat untuk mempermudah checkout </p>`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          size: "sm",
          onClick: ($event) => emit("add")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Tambah Alamat `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" Tambah Alamat ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/AddressList.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AddressDialog",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    address: {},
    customer: {},
    addressCount: {}
  }, {
    "modelValue": { type: Boolean, ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["save"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isOpen = useModel(__props, "modelValue");
    const isSaving = ref(false);
    const provinces = ref([]);
    const cities = ref([]);
    const districts = ref([]);
    const loadingProvinces = ref(false);
    const loadingCities = ref(false);
    const loadingDistricts = ref(false);
    const form = ref({
      label: "Rumah",
      recipientName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      cityId: "",
      cityName: "",
      districtId: "",
      districtName: "",
      provinceId: "",
      provinceName: "",
      postalCode: "",
      isDefault: false
    });
    const addressLabelOptions = [
      { label: "Rumah", value: "Rumah" },
      { label: "Kantor", value: "Kantor" },
      { label: "Apartemen", value: "Apartemen" },
      { label: "Kos", value: "Kos" },
      { label: "Lainnya", value: "Lainnya" }
    ];
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const provinceOptions = computed(
      () => provinces.value.map((p) => ({
        label: p.name,
        value: String(p.id)
      }))
    );
    const cityOptions = computed(
      () => cities.value.map((c) => ({
        label: c.type ? `${c.type} ${c.name}` : c.name,
        value: String(c.id)
      }))
    );
    const districtOptions = computed(
      () => districts.value.map((d) => ({
        label: d.name,
        value: String(d.id)
      }))
    );
    onMounted(async () => {
      await loadProvinces();
    });
    const loadProvinces = async () => {
      loadingProvinces.value = true;
      try {
        const response = await fetch("/api/location/provinces");
        const result = await response.json();
        provinces.value = result.data || result || [];
      } catch (error) {
        console.error("Failed to load provinces:", error);
      } finally {
        loadingProvinces.value = false;
      }
    };
    const loadCities = async (provinceId) => {
      if (!provinceId) {
        cities.value = [];
        return;
      }
      loadingCities.value = true;
      try {
        const response = await fetch(`/api/location/cities?provinceId=${provinceId}`);
        const result = await response.json();
        cities.value = result.data || result || [];
      } catch (error) {
        console.error("Failed to load cities:", error);
      } finally {
        loadingCities.value = false;
      }
    };
    const loadDistricts = async (cityId) => {
      if (!cityId) {
        districts.value = [];
        return;
      }
      loadingDistricts.value = true;
      try {
        const response = await fetch(`/api/location/districts?cityId=${cityId}`);
        const result = await response.json();
        districts.value = result.data || result || [];
      } catch (error) {
        console.error("Failed to load districts:", error);
      } finally {
        loadingDistricts.value = false;
      }
    };
    watch(() => form.value.provinceId, async (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        const province = provinces.value.find((p) => String(p.id) === newVal);
        form.value.provinceName = province?.name || "";
        form.value.cityId = "";
        form.value.cityName = "";
        form.value.districtId = "";
        form.value.districtName = "";
        districts.value = [];
        await loadCities(newVal);
      }
    });
    watch(() => form.value.cityId, async (newVal, oldVal) => {
      if (newVal && newVal !== oldVal) {
        const city = cities.value.find((c) => String(c.id) === newVal);
        form.value.cityName = city ? city.type ? `${city.type} ${city.name}` : city.name : "";
        if (city?.postal_code) {
          form.value.postalCode = city.postal_code;
        }
        form.value.districtId = "";
        form.value.districtName = "";
        await loadDistricts(newVal);
      }
    });
    watch(() => form.value.districtId, (newVal) => {
      if (newVal) {
        const district = districts.value.find((d) => String(d.id) === newVal);
        form.value.districtName = district?.name || "";
      }
    });
    const resetForm = () => {
      form.value = {
        label: "Rumah",
        recipientName: props.customer.fullName,
        phone: props.customer.phone || "",
        addressLine1: "",
        addressLine2: "",
        cityId: "",
        cityName: "",
        districtId: "",
        districtName: "",
        provinceId: "",
        provinceName: "",
        postalCode: "",
        isDefault: props.addressCount === 0
      };
      cities.value = [];
      districts.value = [];
    };
    watch(() => props.address, async (newAddress) => {
      if (newAddress) {
        form.value = {
          label: newAddress.label,
          recipientName: newAddress.recipientName,
          phone: newAddress.phone,
          addressLine1: newAddress.addressLine1,
          addressLine2: newAddress.addressLine2 || "",
          cityId: String(newAddress.cityId || ""),
          cityName: newAddress.cityName,
          districtId: String(newAddress.districtId || ""),
          districtName: newAddress.districtName || "",
          provinceId: String(newAddress.provinceId || ""),
          provinceName: newAddress.provinceName,
          postalCode: newAddress.postalCode,
          isDefault: Boolean(newAddress.isDefault)
        };
        if (newAddress.provinceId) {
          await loadCities(String(newAddress.provinceId));
        }
        if (newAddress.cityId) {
          await loadDistricts(String(newAddress.cityId));
        }
      } else {
        resetForm();
      }
    }, { immediate: true });
    watch(isOpen, async (open) => {
      if (open && provinces.value.length === 0) {
        await loadProvinces();
      }
    });
    const handleSave = async () => {
      isSaving.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch("/api/dashboard/address", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          body: JSON.stringify({
            id: props.address?.id,
            ...form.value
          })
        });
        const data = await response.json();
        if (data.success) {
          isOpen.value = false;
          window.location.reload();
        } else {
          alert(data.message || "Gagal menyimpan alamat");
        }
      } catch (error) {
        console.error("Failed to save address:", error);
        alert("Terjadi kesalahan saat menyimpan alamat");
      } finally {
        isSaving.value = false;
      }
    };
    const close = () => {
      isOpen.value = false;
    };
    const isFormValid = computed(() => {
      return form.value.recipientName.trim() !== "" && form.value.phone.trim() !== "" && form.value.addressLine1.trim() !== "" && form.value.provinceId !== "" && form.value.cityId !== "" && form.value.postalCode.trim() !== "";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$m;
      const _component_UButton = _sfc_main$l;
      const _component_UIcon = _sfc_main$k;
      const _component_UInput = _sfc_main$n;
      const _component_UTextarea = _sfc_main$o;
      const _component_USelectMenu = _sfc_main$p;
      const _component_UCheckbox = _sfc_main$q;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        ui: { width: "max-w-xl", overlay: "z-[100]", content: "z-[100]" },
        title: __props.address ? "Edit Alamat" : "Tambah Alamat Baru",
        description: "Lengkapi data alamat pengiriman Anda"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h2 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.address ? "Edit Alamat" : "Tambah Alamat Baru")}</h2>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "neutral",
              size: "sm",
              square: "",
              onClick: close
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-x-mark",
                      class: "w-5 h-5"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><form class="space-y-4"${_scopeId}><!-- Label --><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> Label Alamat </label><div class="flex flex-wrap gap-2"${_scopeId}><!--[-->`);
            ssrRenderList(addressLabelOptions, (opt) => {
              _push2(`<button type="button" class="${ssrRenderClass([
                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                form.value.label === opt.value ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              ])}"${_scopeId}>${ssrInterpolate(opt.label)}</button>`);
            });
            _push2(`<!--]--></div></div><!-- Recipient & Phone --><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> Nama Penerima <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.value.recipientName,
              "onUpdate:modelValue": ($event) => form.value.recipientName = $event,
              placeholder: "Nama lengkap penerima",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> No. Telepon <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.value.phone,
              "onUpdate:modelValue": ($event) => form.value.phone = $event,
              placeholder: "08xxxxxxxxxx",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><!-- Address Lines --><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> Alamat Lengkap <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_UTextarea, {
              modelValue: form.value.addressLine1,
              "onUpdate:modelValue": ($event) => form.value.addressLine1 = $event,
              placeholder: "Nama jalan, nomor rumah, RT/RW",
              rows: 2,
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> Detail Tambahan (Opsional) </label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.value.addressLine2,
              "onUpdate:modelValue": ($event) => form.value.addressLine2 = $event,
              placeholder: "Gedung, lantai, patokan, dll",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div><!-- Province & City with RajaOngkir --><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> Provinsi <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: form.value.provinceId,
              "onUpdate:modelValue": ($event) => form.value.provinceId = $event,
              items: provinceOptions.value,
              placeholder: "Pilih provinsi",
              loading: loadingProvinces.value,
              disabled: loadingProvinces.value,
              "value-key": "value",
              ui: { content: "z-[200] bg-white dark:bg-gray-900" },
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> Kota/Kabupaten <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: form.value.cityId,
              "onUpdate:modelValue": ($event) => form.value.cityId = $event,
              items: cityOptions.value,
              placeholder: "Pilih kota/kabupaten",
              loading: loadingCities.value,
              disabled: !form.value.provinceId || loadingCities.value,
              "value-key": "value",
              ui: { content: "z-[200] bg-white dark:bg-gray-900" },
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> Kecamatan </label>`);
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: form.value.districtId,
              "onUpdate:modelValue": ($event) => form.value.districtId = $event,
              items: districtOptions.value,
              placeholder: "Pilih kecamatan",
              loading: loadingDistricts.value,
              disabled: !form.value.cityId || loadingDistricts.value,
              "value-key": "value",
              ui: { content: "z-[200] bg-white dark:bg-gray-900" },
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5"${_scopeId}> Kode Pos <span class="text-red-500"${_scopeId}>*</span></label>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: form.value.postalCode,
              "onUpdate:modelValue": ($event) => form.value.postalCode = $event,
              placeholder: "Kode pos",
              class: "w-full"
            }, null, _parent2, _scopeId));
            _push2(`</div></div><!-- Default Checkbox --><label class="flex items-center gap-3 cursor-pointer"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UCheckbox, {
              modelValue: form.value.isDefault,
              "onUpdate:modelValue": ($event) => form.value.isDefault = $event
            }, null, _parent2, _scopeId));
            _push2(`<span class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}>Jadikan alamat utama</span></label><!-- Actions --><div class="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "neutral",
              onClick: close,
              disabled: isSaving.value
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
              type: "submit",
              color: "primary",
              loading: isSaving.value,
              disabled: !isFormValid.value
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.address ? "Simpan Perubahan" : "Tambah Alamat")}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(__props.address ? "Simpan Perubahan" : "Tambah Alamat"),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></form></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-h-[85vh] overflow-y-auto" }, [
                createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                  createVNode(
                    "h2",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.address ? "Edit Alamat" : "Tambah Alamat Baru"),
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    color: "neutral",
                    size: "sm",
                    square: "",
                    onClick: close
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-5 h-5"
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                createVNode(
                  "form",
                  {
                    onSubmit: withModifiers(handleSave, ["prevent"]),
                    class: "space-y-4"
                  },
                  [
                    createCommentVNode(" Label "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, " Label Alamat "),
                      createVNode("div", { class: "flex flex-wrap gap-2" }, [
                        (openBlock(), createBlock(
                          Fragment,
                          null,
                          renderList(addressLabelOptions, (opt) => {
                            return createVNode("button", {
                              key: opt.value,
                              type: "button",
                              onClick: ($event) => form.value.label = opt.value,
                              class: [
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all",
                                form.value.label === opt.value ? "bg-primary-500 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              ]
                            }, toDisplayString(opt.label), 11, ["onClick"]);
                          }),
                          64
                          /* STABLE_FRAGMENT */
                        ))
                      ])
                    ]),
                    createCommentVNode(" Recipient & Phone "),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, [
                          createTextVNode(" Nama Penerima "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_UInput, {
                          modelValue: form.value.recipientName,
                          "onUpdate:modelValue": ($event) => form.value.recipientName = $event,
                          placeholder: "Nama lengkap penerima",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, [
                          createTextVNode(" No. Telepon "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_UInput, {
                          modelValue: form.value.phone,
                          "onUpdate:modelValue": ($event) => form.value.phone = $event,
                          placeholder: "08xxxxxxxxxx",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createCommentVNode(" Address Lines "),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, [
                        createTextVNode(" Alamat Lengkap "),
                        createVNode("span", { class: "text-red-500" }, "*")
                      ]),
                      createVNode(_component_UTextarea, {
                        modelValue: form.value.addressLine1,
                        "onUpdate:modelValue": ($event) => form.value.addressLine1 = $event,
                        placeholder: "Nama jalan, nomor rumah, RT/RW",
                        rows: 2,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, " Detail Tambahan (Opsional) "),
                      createVNode(_component_UInput, {
                        modelValue: form.value.addressLine2,
                        "onUpdate:modelValue": ($event) => form.value.addressLine2 = $event,
                        placeholder: "Gedung, lantai, patokan, dll",
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createCommentVNode(" Province & City with RajaOngkir "),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, [
                          createTextVNode(" Provinsi "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_USelectMenu, {
                          modelValue: form.value.provinceId,
                          "onUpdate:modelValue": ($event) => form.value.provinceId = $event,
                          items: provinceOptions.value,
                          placeholder: "Pilih provinsi",
                          loading: loadingProvinces.value,
                          disabled: loadingProvinces.value,
                          "value-key": "value",
                          ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, [
                          createTextVNode(" Kota/Kabupaten "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_USelectMenu, {
                          modelValue: form.value.cityId,
                          "onUpdate:modelValue": ($event) => form.value.cityId = $event,
                          items: cityOptions.value,
                          placeholder: "Pilih kota/kabupaten",
                          loading: loadingCities.value,
                          disabled: !form.value.provinceId || loadingCities.value,
                          "value-key": "value",
                          ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                      ])
                    ]),
                    createVNode("div", { class: "grid grid-cols-1 sm:grid-cols-2 gap-4" }, [
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, " Kecamatan "),
                        createVNode(_component_USelectMenu, {
                          modelValue: form.value.districtId,
                          "onUpdate:modelValue": ($event) => form.value.districtId = $event,
                          items: districtOptions.value,
                          placeholder: "Pilih kecamatan",
                          loading: loadingDistricts.value,
                          disabled: !form.value.cityId || loadingDistricts.value,
                          "value-key": "value",
                          ui: { content: "z-[200] bg-white dark:bg-gray-900" },
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                      ]),
                      createVNode("div", null, [
                        createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5" }, [
                          createTextVNode(" Kode Pos "),
                          createVNode("span", { class: "text-red-500" }, "*")
                        ]),
                        createVNode(_component_UInput, {
                          modelValue: form.value.postalCode,
                          "onUpdate:modelValue": ($event) => form.value.postalCode = $event,
                          placeholder: "Kode pos",
                          class: "w-full"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    createCommentVNode(" Default Checkbox "),
                    createVNode("label", { class: "flex items-center gap-3 cursor-pointer" }, [
                      createVNode(_component_UCheckbox, {
                        modelValue: form.value.isDefault,
                        "onUpdate:modelValue": ($event) => form.value.isDefault = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode("span", { class: "text-sm text-gray-700 dark:text-gray-300" }, "Jadikan alamat utama")
                    ]),
                    createCommentVNode(" Actions "),
                    createVNode("div", { class: "flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-gray-700" }, [
                      createVNode(_component_UButton, {
                        variant: "ghost",
                        color: "neutral",
                        onClick: close,
                        disabled: isSaving.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Batal ")
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["disabled"]),
                      createVNode(_component_UButton, {
                        type: "submit",
                        color: "primary",
                        loading: isSaving.value,
                        disabled: !isFormValid.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(__props.address ? "Simpan Perubahan" : "Tambah Alamat"),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 1
                        /* STABLE */
                      }, 8, ["loading", "disabled"])
                    ])
                  ],
                  32
                  /* NEED_HYDRATION */
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

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/AddressDialog.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "TopupDialog",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean, ...{ default: false } },
    "modelModifiers": {}
  },
  emits: /* @__PURE__ */ mergeModels(["topup", "success"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "modelValue");
    const emit = __emit;
    const { formatPrice } = useOrderFormatters();
    const { payWithSnap, isSnapLoaded } = useMidtrans();
    const topupAmount = ref(5e4);
    const customAmount = ref("");
    const isLoading = ref(false);
    const paymentStatus = ref("idle");
    const paymentMessage = ref("");
    const currentTransactionId = ref(null);
    const topupPresets = [2e4, 5e4, 1e5, 2e5, 5e5, 1e6];
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const loadSnapScript = (clientKey, snapUrl) => {
      return new Promise((resolve, reject) => {
        if (typeof window !== "undefined" && isSnapLoaded()) {
          resolve();
          return;
        }
        const existingScript = document.querySelector('script[src*="snap.js"]');
        if (existingScript) {
          existingScript.remove();
        }
        const script = document.createElement("script");
        const url = snapUrl || "https://app.sandbox.midtrans.com/snap/snap.js";
        const key = clientKey || void 0 || "";
        script.src = url;
        script.setAttribute("data-client-key", key);
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Midtrans Snap"));
        document.head.appendChild(script);
      });
    };
    const selectPreset = (amount) => {
      topupAmount.value = amount;
      customAmount.value = "";
    };
    const handleCustomAmount = () => {
      const parsed = parseInt(customAmount.value.replace(/\D/g, ""));
      if (parsed >= 1e4) {
        topupAmount.value = parsed;
      }
    };
    const formatCustomAmount = () => {
      const parsed = parseInt(customAmount.value.replace(/\D/g, ""));
      if (parsed) {
        customAmount.value = parsed.toLocaleString("id-ID");
      }
    };
    const cancelPendingTopup = async (transactionId) => {
      try {
        const xsrfToken = getXsrfToken();
        await fetch(`/api/dashboard/wallet/topup/${transactionId}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          }
        });
        currentTransactionId.value = null;
      } catch (error) {
        console.error("Failed to cancel topup:", error);
      }
    };
    const confirmTopupStatus = async (transactionId) => {
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/api/dashboard/wallet/topup/${transactionId}/confirm`, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          }
        });
        const data = await response.json();
        console.info("Confirm topup response:", data);
        return data.status === "completed";
      } catch (error) {
        console.error("Failed to confirm topup:", error);
        return false;
      }
    };
    const handleTopup = async () => {
      if (topupAmount.value < 1e4) return;
      isLoading.value = true;
      paymentStatus.value = "processing";
      paymentMessage.value = "Memproses permintaan top up...";
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch("/api/dashboard/wallet/topup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          },
          body: JSON.stringify({ amount: topupAmount.value })
        });
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          if (response.status === 401 || response.redirected) {
            throw new Error("Sesi Anda telah berakhir. Silakan login kembali.");
          }
          throw new Error("Terjadi kesalahan pada server. Silakan coba lagi.");
        }
        const data = await response.json();
        if (!response.ok || !data.success) {
          throw new Error(data.message || "Gagal membuat pembayaran");
        }
        currentTransactionId.value = data.transactionId;
        if (data.midtransConfig) {
          await loadSnapScript(data.midtransConfig.clientKey, data.midtransConfig.snapUrl);
        } else {
          await loadSnapScript();
        }
        isOpen.value = false;
        await new Promise((resolve) => setTimeout(resolve, 100));
        await payWithSnap(data.snapToken, {
          onSuccess: async () => {
            paymentStatus.value = "processing";
            paymentMessage.value = "Mengkonfirmasi pembayaran...";
            if (currentTransactionId.value) {
              const confirmed = await confirmTopupStatus(currentTransactionId.value);
              if (confirmed) {
                paymentStatus.value = "success";
                paymentMessage.value = "Top up berhasil! Saldo telah ditambahkan.";
                currentTransactionId.value = null;
                emit("success");
                setTimeout(() => {
                  window.location.reload();
                }, 2e3);
              } else {
                paymentStatus.value = "pending";
                paymentMessage.value = "Pembayaran sedang diproses. Saldo akan ditambahkan dalam beberapa saat.";
                isOpen.value = true;
              }
            } else {
              paymentStatus.value = "success";
              paymentMessage.value = "Top up berhasil! Saldo akan segera ditambahkan.";
              emit("success");
              setTimeout(() => {
                window.location.reload();
              }, 2e3);
            }
          },
          onPending: () => {
            paymentStatus.value = "pending";
            paymentMessage.value = "Menunggu pembayaran. Silakan selesaikan pembayaran Anda.";
            isOpen.value = true;
          },
          onError: async (message) => {
            paymentStatus.value = "failed";
            paymentMessage.value = message || "Pembayaran gagal. Silakan coba lagi.";
            if (currentTransactionId.value) {
              await cancelPendingTopup(currentTransactionId.value);
            }
            isOpen.value = true;
          },
          onClose: async () => {
            if (paymentStatus.value === "processing") {
              paymentStatus.value = "idle";
              paymentMessage.value = "";
              if (currentTransactionId.value) {
                await cancelPendingTopup(currentTransactionId.value);
              }
            }
            isLoading.value = false;
            if (paymentStatus.value !== "success") {
              isOpen.value = true;
            }
          }
        });
      } catch (error) {
        console.error("Failed to topup:", error);
        paymentStatus.value = "failed";
        paymentMessage.value = error.message || "Terjadi kesalahan. Silakan coba lagi.";
        isLoading.value = false;
      }
    };
    const resetAndClose = () => {
      paymentStatus.value = "idle";
      paymentMessage.value = "";
      isLoading.value = false;
      isOpen.value = false;
    };
    const close = () => {
      if (isLoading.value && paymentStatus.value === "processing") {
        return;
      }
      resetAndClose();
    };
    const statusConfig = computed(() => {
      switch (paymentStatus.value) {
        case "processing":
          return { icon: "i-heroicons-arrow-path", color: "text-blue-500", animate: "animate-spin" };
        case "pending":
          return { icon: "i-heroicons-clock", color: "text-yellow-500", animate: "" };
        case "success":
          return { icon: "i-heroicons-check-circle", color: "text-green-500", animate: "" };
        case "failed":
          return { icon: "i-heroicons-x-circle", color: "text-red-500", animate: "" };
        default:
          return null;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$m;
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      const _component_UInput = _sfc_main$n;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        ui: { width: "max-w-md", overlay: "z-[100]", content: "z-[100]" },
        title: "Top Up Saldo",
        description: "Pilih nominal untuk menambah saldo e-wallet Anda"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-wallet",
              class: "w-5 h-5 text-emerald-600 dark:text-emerald-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><h2 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Top Up Saldo</h2></div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "neutral",
              size: "sm",
              square: "",
              onClick: close,
              disabled: isLoading.value && paymentStatus.value === "processing"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-x-mark",
                      class: "w-5 h-5"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><!-- Payment Status Message -->`);
            if (statusConfig.value) {
              _push2(`<div class="${ssrRenderClass([{
                "bg-blue-50 dark:bg-blue-900/20": paymentStatus.value === "processing",
                "bg-yellow-50 dark:bg-yellow-900/20": paymentStatus.value === "pending",
                "bg-green-50 dark:bg-green-900/20": paymentStatus.value === "success",
                "bg-red-50 dark:bg-red-900/20": paymentStatus.value === "failed"
              }, "mb-5 p-4 rounded-xl"])}"${_scopeId}><div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: statusConfig.value.icon,
                class: ["w-6 h-6", [statusConfig.value.color, statusConfig.value.animate]]
              }, null, _parent2, _scopeId));
              _push2(`<p class="${ssrRenderClass([statusConfig.value.color, "text-sm font-medium"])}"${_scopeId}>${ssrInterpolate(paymentMessage.value)}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (paymentStatus.value === "idle" || paymentStatus.value === "failed") {
              _push2(`<div class="space-y-5"${_scopeId}><!-- Preset Amounts --><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"${_scopeId}> Pilih Nominal </label><div class="grid grid-cols-3 gap-2"${_scopeId}><!--[-->`);
              ssrRenderList(topupPresets, (amount) => {
                _push2(`<button type="button"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""} class="${ssrRenderClass([
                  "p-3 rounded-xl text-sm font-semibold transition-all border-2",
                  topupAmount.value === amount ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600",
                  isLoading.value ? "opacity-50 cursor-not-allowed" : ""
                ])}"${_scopeId}>${ssrInterpolate(unref(formatPrice)(amount))}</button>`);
              });
              _push2(`<!--]--></div></div><!-- Custom Amount --><div${_scopeId}><label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"${_scopeId}> Atau Masukkan Nominal Lain </label><div class="relative"${_scopeId}><span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium"${_scopeId}>Rp</span>`);
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: customAmount.value,
                "onUpdate:modelValue": ($event) => customAmount.value = $event,
                onInput: handleCustomAmount,
                onBlur: formatCustomAmount,
                placeholder: "Minimal 10.000",
                class: "pl-10 w-full",
                type: "text",
                disabled: isLoading.value
              }, null, _parent2, _scopeId));
              _push2(`</div></div><!-- Summary --><div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}>Total Top Up</span><span class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatPrice)(topupAmount.value))}</span></div></div><!-- Payment Methods Info --><div class="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl"${_scopeId}><div class="flex items-start gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-information-circle",
                class: "w-5 h-5 text-blue-500 shrink-0 mt-0.5"
              }, null, _parent2, _scopeId));
              _push2(`<div class="text-sm text-blue-700 dark:text-blue-300"${_scopeId}><p class="font-medium mb-1"${_scopeId}>Metode Pembayaran Tersedia:</p><ul class="list-disc list-inside text-xs space-y-0.5"${_scopeId}><li${_scopeId}>Transfer Bank (BCA, BNI, BRI, Mandiri, Permata)</li><li${_scopeId}>E-Wallet (GoPay, ShopeePay, QRIS)</li><li${_scopeId}>Kartu Kredit/Debit</li></ul></div></div></div><!-- Actions --><div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UButton, {
                variant: "outline",
                color: "neutral",
                block: "",
                onClick: close,
                disabled: isLoading.value
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
                block: "",
                loading: isLoading.value,
                disabled: topupAmount.value < 1e4,
                onClick: handleTopup
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UIcon, {
                      name: "i-heroicons-credit-card",
                      class: "w-4 h-4 mr-2"
                    }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(isLoading.value ? "Memproses..." : "Top Up Sekarang")}`);
                  } else {
                    return [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-credit-card",
                        class: "w-4 h-4 mr-2"
                      }),
                      createTextVNode(
                        " " + toDisplayString(isLoading.value ? "Memproses..." : "Top Up Sekarang"),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
              _push2(`</div><p class="text-xs text-gray-400 text-center"${_scopeId}> Pembayaran diproses melalui Midtrans. Saldo akan otomatis masuk setelah pembayaran dikonfirmasi. </p></div>`);
            } else if (paymentStatus.value === "pending") {
              _push2(`<!--[--><!-- Pending Payment Status --><div class="space-y-5"${_scopeId}><div class="text-center py-4"${_scopeId}><div class="w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-clock",
                class: "w-8 h-8 text-yellow-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>Menunggu Pembayaran</h3><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Silakan selesaikan pembayaran Anda sesuai instruksi yang diberikan. </p></div><div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}>Nominal Top Up</span><span class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatPrice)(topupAmount.value))}</span></div></div>`);
              _push2(ssrRenderComponent(_component_UButton, {
                color: "primary",
                block: "",
                onClick: resetAndClose
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
              _push2(`<p class="text-xs text-gray-400 text-center"${_scopeId}> Saldo akan otomatis masuk setelah pembayaran dikonfirmasi oleh sistem. </p></div><!--]-->`);
            } else if (paymentStatus.value === "success") {
              _push2(`<!--[--><!-- Success Status --><div class="space-y-5"${_scopeId}><div class="text-center py-4"${_scopeId}><div class="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check-circle",
                class: "w-8 h-8 text-green-500"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2"${_scopeId}>Top Up Berhasil!</h3><p class="text-sm text-gray-600 dark:text-gray-400"${_scopeId}> Saldo Anda akan segera ditambahkan. </p></div><div class="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-600 dark:text-gray-400"${_scopeId}>Nominal Top Up</span><span class="text-xl font-bold text-green-600 dark:text-green-400"${_scopeId}>+${ssrInterpolate(unref(formatPrice)(topupAmount.value))}</span></div></div><p class="text-xs text-gray-400 text-center"${_scopeId}> Halaman akan diperbarui secara otomatis... </p></div><!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-h-[85vh] overflow-y-auto" }, [
                createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-wallet",
                        class: "w-5 h-5 text-emerald-600 dark:text-emerald-400"
                      })
                    ]),
                    createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Top Up Saldo")
                  ]),
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    color: "neutral",
                    size: "sm",
                    square: "",
                    onClick: close,
                    disabled: isLoading.value && paymentStatus.value === "processing"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-5 h-5"
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"])
                ]),
                createCommentVNode(" Payment Status Message "),
                statusConfig.value ? (openBlock(), createBlock(
                  "div",
                  {
                    key: 0,
                    class: ["mb-5 p-4 rounded-xl", {
                      "bg-blue-50 dark:bg-blue-900/20": paymentStatus.value === "processing",
                      "bg-yellow-50 dark:bg-yellow-900/20": paymentStatus.value === "pending",
                      "bg-green-50 dark:bg-green-900/20": paymentStatus.value === "success",
                      "bg-red-50 dark:bg-red-900/20": paymentStatus.value === "failed"
                    }]
                  },
                  [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode(_component_UIcon, {
                        name: statusConfig.value.icon,
                        class: ["w-6 h-6", [statusConfig.value.color, statusConfig.value.animate]]
                      }, null, 8, ["name", "class"]),
                      createVNode(
                        "p",
                        {
                          class: ["text-sm font-medium", statusConfig.value.color]
                        },
                        toDisplayString(paymentMessage.value),
                        3
                        /* TEXT, CLASS */
                      )
                    ])
                  ],
                  2
                  /* CLASS */
                )) : createCommentVNode("v-if", true),
                paymentStatus.value === "idle" || paymentStatus.value === "failed" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "space-y-5"
                }, [
                  createCommentVNode(" Preset Amounts "),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3" }, " Pilih Nominal "),
                    createVNode("div", { class: "grid grid-cols-3 gap-2" }, [
                      (openBlock(), createBlock(
                        Fragment,
                        null,
                        renderList(topupPresets, (amount) => {
                          return createVNode("button", {
                            key: amount,
                            type: "button",
                            onClick: ($event) => selectPreset(amount),
                            disabled: isLoading.value,
                            class: [
                              "p-3 rounded-xl text-sm font-semibold transition-all border-2",
                              topupAmount.value === amount ? "border-primary-500 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600",
                              isLoading.value ? "opacity-50 cursor-not-allowed" : ""
                            ]
                          }, toDisplayString(unref(formatPrice)(amount)), 11, ["onClick", "disabled"]);
                        }),
                        64
                        /* STABLE_FRAGMENT */
                      ))
                    ])
                  ]),
                  createCommentVNode(" Custom Amount "),
                  createVNode("div", null, [
                    createVNode("label", { class: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" }, " Atau Masukkan Nominal Lain "),
                    createVNode("div", { class: "relative" }, [
                      createVNode("span", { class: "absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium" }, "Rp"),
                      createVNode(_component_UInput, {
                        modelValue: customAmount.value,
                        "onUpdate:modelValue": ($event) => customAmount.value = $event,
                        onInput: handleCustomAmount,
                        onBlur: formatCustomAmount,
                        placeholder: "Minimal 10.000",
                        class: "pl-10 w-full",
                        type: "text",
                        disabled: isLoading.value
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ])
                  ]),
                  createCommentVNode(" Summary "),
                  createVNode("div", { class: "p-4 bg-gray-50 dark:bg-gray-800 rounded-xl" }, [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Total Top Up"),
                      createVNode(
                        "span",
                        { class: "text-xl font-bold text-gray-900 dark:text-white" },
                        toDisplayString(unref(formatPrice)(topupAmount.value)),
                        1
                        /* TEXT */
                      )
                    ])
                  ]),
                  createCommentVNode(" Payment Methods Info "),
                  createVNode("div", { class: "p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl" }, [
                    createVNode("div", { class: "flex items-start gap-3" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-information-circle",
                        class: "w-5 h-5 text-blue-500 shrink-0 mt-0.5"
                      }),
                      createVNode("div", { class: "text-sm text-blue-700 dark:text-blue-300" }, [
                        createVNode("p", { class: "font-medium mb-1" }, "Metode Pembayaran Tersedia:"),
                        createVNode("ul", { class: "list-disc list-inside text-xs space-y-0.5" }, [
                          createVNode("li", null, "Transfer Bank (BCA, BNI, BRI, Mandiri, Permata)"),
                          createVNode("li", null, "E-Wallet (GoPay, ShopeePay, QRIS)"),
                          createVNode("li", null, "Kartu Kredit/Debit")
                        ])
                      ])
                    ])
                  ]),
                  createCommentVNode(" Actions "),
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode(_component_UButton, {
                      variant: "outline",
                      color: "neutral",
                      block: "",
                      onClick: close,
                      disabled: isLoading.value
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Batal ")
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["disabled"]),
                    createVNode(_component_UButton, {
                      color: "primary",
                      block: "",
                      loading: isLoading.value,
                      disabled: topupAmount.value < 1e4,
                      onClick: handleTopup
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-credit-card",
                          class: "w-4 h-4 mr-2"
                        }),
                        createTextVNode(
                          " " + toDisplayString(isLoading.value ? "Memproses..." : "Top Up Sekarang"),
                          1
                          /* TEXT */
                        )
                      ]),
                      _: 1
                      /* STABLE */
                    }, 8, ["loading", "disabled"])
                  ]),
                  createVNode("p", { class: "text-xs text-gray-400 text-center" }, " Pembayaran diproses melalui Midtrans. Saldo akan otomatis masuk setelah pembayaran dikonfirmasi. ")
                ])) : paymentStatus.value === "pending" ? (openBlock(), createBlock(
                  Fragment,
                  { key: 2 },
                  [
                    createCommentVNode(" Pending Payment Status "),
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode("div", { class: "text-center py-4" }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-clock",
                            class: "w-8 h-8 text-yellow-500"
                          })
                        ]),
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2" }, "Menunggu Pembayaran"),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Silakan selesaikan pembayaran Anda sesuai instruksi yang diberikan. ")
                      ]),
                      createVNode("div", { class: "p-4 bg-gray-50 dark:bg-gray-800 rounded-xl" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Nominal Top Up"),
                          createVNode(
                            "span",
                            { class: "text-xl font-bold text-gray-900 dark:text-white" },
                            toDisplayString(unref(formatPrice)(topupAmount.value)),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      createVNode(_component_UButton, {
                        color: "primary",
                        block: "",
                        onClick: resetAndClose
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Tutup ")
                        ]),
                        _: 1
                        /* STABLE */
                      }),
                      createVNode("p", { class: "text-xs text-gray-400 text-center" }, " Saldo akan otomatis masuk setelah pembayaran dikonfirmasi oleh sistem. ")
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : paymentStatus.value === "success" ? (openBlock(), createBlock(
                  Fragment,
                  { key: 3 },
                  [
                    createCommentVNode(" Success Status "),
                    createVNode("div", { class: "space-y-5" }, [
                      createVNode("div", { class: "text-center py-4" }, [
                        createVNode("div", { class: "w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center" }, [
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-check-circle",
                            class: "w-8 h-8 text-green-500"
                          })
                        ]),
                        createVNode("h3", { class: "text-lg font-semibold text-gray-900 dark:text-white mb-2" }, "Top Up Berhasil!"),
                        createVNode("p", { class: "text-sm text-gray-600 dark:text-gray-400" }, " Saldo Anda akan segera ditambahkan. ")
                      ]),
                      createVNode("div", { class: "p-4 bg-green-50 dark:bg-green-900/20 rounded-xl" }, [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode("span", { class: "text-gray-600 dark:text-gray-400" }, "Nominal Top Up"),
                          createVNode(
                            "span",
                            { class: "text-xl font-bold text-green-600 dark:text-green-400" },
                            "+" + toDisplayString(unref(formatPrice)(topupAmount.value)),
                            1
                            /* TEXT */
                          )
                        ])
                      ]),
                      createVNode("p", { class: "text-xs text-gray-400 text-center" }, " Halaman akan diperbarui secara otomatis... ")
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : createCommentVNode("v-if", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/TopupDialog.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "RankDialog",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    allRanks: {},
    currentRank: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const { formatPrice } = useOrderFormatters();
    const close = () => {
      emit("update:modelValue", false);
    };
    const isCurrentRank = (rank) => {
      return props.currentRank?.id === rank.id;
    };
    const isAchieved = (rank) => {
      if (!props.currentRank) return false;
      const currentIdx = props.allRanks.findIndex((r) => r.id === props.currentRank?.id);
      const rankIdx = props.allRanks.findIndex((r) => r.id === rank.id);
      return rankIdx <= currentIdx;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$m;
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: props.modelValue,
        "onUpdate:open": ($event) => props.modelValue = $event,
        ui: { width: "max-w-2xl", overlay: "z-[100]", content: "z-[100]" },
        title: "Sistem Ranking Member",
        description: "Semakin sering belanja, semakin banyak keuntungan!"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-trophy",
              class: "w-5 h-5 text-yellow-600 dark:text-yellow-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h2 class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>Sistem Ranking Member</h2><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Semakin sering belanja, semakin banyak keuntungan!</p></div></div>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "ghost",
              color: "gray",
              size: "sm",
              square: "",
              onClick: close
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-x-mark",
                      class: "w-5 h-5"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-4 max-h-[60vh] overflow-y-auto"${_scopeId}><!--[-->`);
            ssrRenderList(__props.allRanks, (rank) => {
              _push2(`<div class="${ssrRenderClass([
                "relative p-4 rounded-2xl border-2 transition-all",
                isCurrentRank(rank) ? `${unref(getRankColor)(rank.slug).border} ${unref(getRankColor)(rank.slug).bg}` : isAchieved(rank) ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-75"
              ])}"${_scopeId}><!-- Current Badge -->`);
              if (isCurrentRank(rank)) {
                _push2(`<div class="absolute -top-2.5 left-4 px-2.5 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full"${_scopeId}> Rank Anda </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="flex items-start gap-4"${_scopeId}><!-- Rank Icon --><div class="${ssrRenderClass(["w-14 h-14 rounded-xl bg-linear-to-br flex items-center justify-center shrink-0", unref(getRankColor)(rank.slug).gradient])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: unref(getRankColor)(rank.slug).icon,
                class: "w-7 h-7 text-white drop-shadow-lg"
              }, null, _parent2, _scopeId));
              _push2(`</div><!-- Rank Info --><div class="flex-1 min-w-0"${_scopeId}><div class="flex items-center gap-2 mb-1"${_scopeId}><h3 class="font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(rank.name)}</h3>`);
              if (isAchieved(rank)) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-check-circle-solid",
                  class: "w-5 h-5 text-emerald-500"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!-- Requirements --><div class="flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2"${_scopeId}><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-shopping-bag",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(rank.minOrders)} order </span><span class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-banknotes",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(` ${ssrInterpolate(unref(formatPrice)(rank.minSpent))}</span></div><!-- Benefits Preview --><div class="flex flex-wrap items-center gap-2"${_scopeId}>`);
              if (rank.cashbackRate > 0) {
                _push2(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-arrow-trending-up",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(` Cashback ${ssrInterpolate(rank.cashbackRate)}% </span>`);
              } else {
                _push2(`<!---->`);
              }
              if (rank.affiliateBonusRate > 0) {
                _push2(`<span class="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-gift",
                  class: "w-3 h-3"
                }, null, _parent2, _scopeId));
                _push2(` +${ssrInterpolate(rank.affiliateBonusRate)}% Affiliate </span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><!-- Full Benefits -->`);
              if (rank.benefits && rank.benefits.length > 0) {
                _push2(`<div class="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"${_scopeId}><ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5"${_scopeId}><!--[-->`);
                ssrRenderList(rank.benefits, (benefit, idx) => {
                  _push2(`<li class="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-check",
                    class: "w-3.5 h-3.5 text-emerald-500 shrink-0"
                  }, null, _parent2, _scopeId));
                  _push2(` ${ssrInterpolate(benefit)}</li>`);
                });
                _push2(`<!--]--></ul></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div></div>`);
            });
            _push2(`<!--]--></div><div class="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              block: "",
              onClick: close
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Mengerti `);
                } else {
                  return [
                    createTextVNode(" Mengerti ")
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
                createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                  createVNode("div", { class: "flex items-center gap-3" }, [
                    createVNode("div", { class: "w-10 h-10 rounded-xl bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-trophy",
                        class: "w-5 h-5 text-yellow-600 dark:text-yellow-400"
                      })
                    ]),
                    createVNode("div", null, [
                      createVNode("h2", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "Sistem Ranking Member"),
                      createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Semakin sering belanja, semakin banyak keuntungan!")
                    ])
                  ]),
                  createVNode(_component_UButton, {
                    variant: "ghost",
                    color: "gray",
                    size: "sm",
                    square: "",
                    onClick: close
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-5 h-5"
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                createVNode("div", { class: "space-y-4 max-h-[60vh] overflow-y-auto" }, [
                  (openBlock(true), createBlock(
                    Fragment,
                    null,
                    renderList(__props.allRanks, (rank) => {
                      return openBlock(), createBlock(
                        "div",
                        {
                          key: rank.id,
                          class: [
                            "relative p-4 rounded-2xl border-2 transition-all",
                            isCurrentRank(rank) ? `${unref(getRankColor)(rank.slug).border} ${unref(getRankColor)(rank.slug).bg}` : isAchieved(rank) ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50" : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 opacity-75"
                          ]
                        },
                        [
                          createCommentVNode(" Current Badge "),
                          isCurrentRank(rank) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "absolute -top-2.5 left-4 px-2.5 py-0.5 bg-primary-500 text-white text-xs font-bold rounded-full"
                          }, " Rank Anda ")) : createCommentVNode("v-if", true),
                          createVNode("div", { class: "flex items-start gap-4" }, [
                            createCommentVNode(" Rank Icon "),
                            createVNode(
                              "div",
                              {
                                class: ["w-14 h-14 rounded-xl bg-linear-to-br flex items-center justify-center shrink-0", unref(getRankColor)(rank.slug).gradient]
                              },
                              [
                                createVNode(_component_UIcon, {
                                  name: unref(getRankColor)(rank.slug).icon,
                                  class: "w-7 h-7 text-white drop-shadow-lg"
                                }, null, 8, ["name"])
                              ],
                              2
                              /* CLASS */
                            ),
                            createCommentVNode(" Rank Info "),
                            createVNode("div", { class: "flex-1 min-w-0" }, [
                              createVNode("div", { class: "flex items-center gap-2 mb-1" }, [
                                createVNode(
                                  "h3",
                                  { class: "font-bold text-gray-900 dark:text-white" },
                                  toDisplayString(rank.name),
                                  1
                                  /* TEXT */
                                ),
                                isAchieved(rank) ? (openBlock(), createBlock(_component_UIcon, {
                                  key: 0,
                                  name: "i-heroicons-check-circle-solid",
                                  class: "w-5 h-5 text-emerald-500"
                                })) : createCommentVNode("v-if", true)
                              ]),
                              createCommentVNode(" Requirements "),
                              createVNode("div", { class: "flex flex-wrap items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-2" }, [
                                createVNode("span", { class: "flex items-center gap-1" }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-shopping-bag",
                                    class: "w-4 h-4"
                                  }),
                                  createTextVNode(
                                    " " + toDisplayString(rank.minOrders) + " order ",
                                    1
                                    /* TEXT */
                                  )
                                ]),
                                createVNode("span", { class: "flex items-center gap-1" }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-banknotes",
                                    class: "w-4 h-4"
                                  }),
                                  createTextVNode(
                                    " " + toDisplayString(unref(formatPrice)(rank.minSpent)),
                                    1
                                    /* TEXT */
                                  )
                                ])
                              ]),
                              createCommentVNode(" Benefits Preview "),
                              createVNode("div", { class: "flex flex-wrap items-center gap-2" }, [
                                rank.cashbackRate > 0 ? (openBlock(), createBlock("span", {
                                  key: 0,
                                  class: "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                                }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-arrow-trending-up",
                                    class: "w-3 h-3"
                                  }),
                                  createTextVNode(
                                    " Cashback " + toDisplayString(rank.cashbackRate) + "% ",
                                    1
                                    /* TEXT */
                                  )
                                ])) : createCommentVNode("v-if", true),
                                rank.affiliateBonusRate > 0 ? (openBlock(), createBlock("span", {
                                  key: 1,
                                  class: "inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400"
                                }, [
                                  createVNode(_component_UIcon, {
                                    name: "i-heroicons-gift",
                                    class: "w-3 h-3"
                                  }),
                                  createTextVNode(
                                    " +" + toDisplayString(rank.affiliateBonusRate) + "% Affiliate ",
                                    1
                                    /* TEXT */
                                  )
                                ])) : createCommentVNode("v-if", true)
                              ]),
                              createCommentVNode(" Full Benefits "),
                              rank.benefits && rank.benefits.length > 0 ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "mt-3 pt-3 border-t border-gray-200 dark:border-gray-700"
                              }, [
                                createVNode("ul", { class: "grid grid-cols-1 sm:grid-cols-2 gap-1.5" }, [
                                  (openBlock(true), createBlock(
                                    Fragment,
                                    null,
                                    renderList(rank.benefits, (benefit, idx) => {
                                      return openBlock(), createBlock("li", {
                                        key: idx,
                                        class: "flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                                      }, [
                                        createVNode(_component_UIcon, {
                                          name: "i-heroicons-check",
                                          class: "w-3.5 h-3.5 text-emerald-500 shrink-0"
                                        }),
                                        createTextVNode(
                                          " " + toDisplayString(benefit),
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
                          ])
                        ],
                        2
                        /* CLASS */
                      );
                    }),
                    128
                    /* KEYED_FRAGMENT */
                  ))
                ]),
                createVNode("div", { class: "mt-6 pt-4 border-t border-gray-100 dark:border-gray-700" }, [
                  createVNode(_component_UButton, {
                    color: "primary",
                    block: "",
                    onClick: close
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Mengerti ")
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

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/RankDialog.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DeleteAddressDialog",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    addressId: {}
  }, {
    "modelValue": { type: Boolean, ...{ default: false } },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["confirm"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isOpen = useModel(__props, "modelValue");
    const isLoading = ref(false);
    const getXsrfToken = () => {
      if (typeof document === "undefined") return null;
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : null;
    };
    const handleDelete = async () => {
      if (!props.addressId) return;
      isLoading.value = true;
      try {
        const xsrfToken = getXsrfToken();
        const response = await fetch(`/api/dashboard/address/${props.addressId}`, {
          method: "DELETE",
          headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...xsrfToken && { "X-XSRF-TOKEN": xsrfToken }
          }
        });
        const data = await response.json();
        if (data.success) {
          isOpen.value = false;
          window.location.reload();
        } else {
          alert(data.message || "Gagal menghapus alamat");
        }
      } catch (error) {
        console.error("Failed to delete address:", error);
        alert("Terjadi kesalahan saat menghapus alamat");
      } finally {
        isLoading.value = false;
      }
    };
    const close = () => {
      isOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$m;
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        ui: { width: "max-w-sm", overlay: "z-[100]", content: "z-[100]" },
        title: "Hapus Alamat",
        description: "Konfirmasi penghapusan alamat"
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 text-center max-h-[85vh] overflow-y-auto"${_scopeId}><div class="w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-7 h-7 text-red-600 dark:text-red-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2"${_scopeId}>Hapus Alamat?</h3><p class="text-gray-500 dark:text-gray-400 text-sm mb-6"${_scopeId}> Alamat yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus alamat ini? </p><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              variant: "outline",
              color: "neutral",
              block: "",
              onClick: close,
              disabled: isLoading.value
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
              block: "",
              loading: isLoading.value,
              onClick: handleDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Ya, Hapus `);
                } else {
                  return [
                    createTextVNode(" Ya, Hapus ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 text-center max-h-[85vh] overflow-y-auto" }, [
                createVNode("div", { class: "w-14 h-14 mx-auto mb-4 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-trash",
                    class: "w-7 h-7 text-red-600 dark:text-red-400"
                  })
                ]),
                createVNode("h3", { class: "text-lg font-bold text-gray-900 dark:text-white mb-2" }, "Hapus Alamat?"),
                createVNode("p", { class: "text-gray-500 dark:text-gray-400 text-sm mb-6" }, " Alamat yang dihapus tidak dapat dikembalikan. Apakah Anda yakin ingin menghapus alamat ini? "),
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(_component_UButton, {
                    variant: "outline",
                    color: "neutral",
                    block: "",
                    onClick: close,
                    disabled: isLoading.value
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["disabled"]),
                  createVNode(_component_UButton, {
                    color: "error",
                    block: "",
                    loading: isLoading.value,
                    onClick: handleDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Ya, Hapus ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/dashboard/DeleteAddressDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{ layout: _sfc_main$r },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    customer: {},
    stats: {},
    cartCount: {},
    wishlistCount: {},
    addressCount: {},
    addresses: {},
    defaultAddress: {},
    recentOrders: {},
    wallet: {},
    recentTransactions: {},
    affiliate: {},
    recentCommissions: {},
    referrals: {},
    networkStats: {},
    networkTree: {},
    currentRank: {},
    nextRank: {},
    rankProgress: {},
    ordersToNextRank: {},
    spentToNextRank: {},
    allRanks: {}
  },
  setup(__props) {
    const addressDialogOpen = ref(false);
    const deleteAddressDialogOpen = ref(false);
    const topupDialogOpen = ref(false);
    const rankDialogOpen = ref(false);
    const editingAddress = ref(null);
    const deletingAddressId = ref(null);
    const handleAddAddress = () => {
      editingAddress.value = null;
      addressDialogOpen.value = true;
    };
    const handleEditAddress = (address) => {
      editingAddress.value = address;
      addressDialogOpen.value = true;
    };
    const handleDeleteAddress = (id) => {
      deletingAddressId.value = id;
      deleteAddressDialogOpen.value = true;
    };
    const handleSetDefaultAddress = async (id) => {
      try {
        const xsrfToken = document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
        const decodedToken = xsrfToken ? decodeURIComponent(xsrfToken) : null;
        const response = await fetch(`/api/dashboard/address/${id}/default`, {
          method: "PUT",
          headers: {
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            ...decodedToken && { "X-XSRF-TOKEN": decodedToken }
          }
        });
        const data = await response.json();
        if (data.success) {
          window.location.reload();
        } else {
          alert(data.message || "Gagal mengubah alamat utama");
        }
      } catch (error) {
        console.error("Failed to set default address:", error);
        alert("Terjadi kesalahan saat mengubah alamat utama");
      }
    };
    const toast = useToast();
    const handleWithdraw = () => {
      router.visit("/dashboard/wallet/withdraw");
    };
    const handleViewAllMitra = (status) => {
      router.visit(`/dashboard/referrals?status=${status}`);
    };
    const handleReferralCopied = () => {
      toast.success("Link Referral Disalin!", "Bagikan link referral Anda kepada teman untuk mendapatkan bonus.", 3e3);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$k;
      const _component_UButton = _sfc_main$l;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Dashboard - Ogitu" }, null, _parent));
      _push(`<div class="min-h-screen bg-linear-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900"><!-- Background Effects --><div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none"><div class="absolute top-0 left-1/4 w-125 h-125 bg-primary-500/10 rounded-full blur-3xl"></div><div class="absolute top-1/3 right-1/4 w-100 h-100 bg-secondary-500/10 rounded-full blur-3xl"></div><div class="absolute bottom-0 left-1/2 w-150 h-75 bg-primary-500/5 rounded-full blur-3xl"></div></div><div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12"><!-- Welcome Header -->`);
      _push(ssrRenderComponent(unref(_sfc_main$j), {
        customer: __props.customer,
        stats: __props.stats,
        "current-rank": __props.currentRank,
        onOpenRankDialog: ($event) => rankDialogOpen.value = true
      }, null, _parent));
      _push(`<!-- Quick Actions -->`);
      _push(ssrRenderComponent(unref(_sfc_main$i), {
        stats: __props.stats,
        "cart-count": __props.cartCount,
        "wishlist-count": __props.wishlistCount,
        "address-count": __props.addressCount
      }, null, _parent));
      _push(`<!-- Order Status Cards -->`);
      _push(ssrRenderComponent(unref(_sfc_main$h), { stats: __props.stats }, null, _parent));
      _push(`<!-- Main Content Grid --><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><!-- Left Column - Orders & Addresses --><div class="lg:col-span-2 space-y-8"><!-- Recent Orders -->`);
      _push(ssrRenderComponent(unref(_sfc_main$g), { orders: __props.recentOrders }, null, _parent));
      _push(`<!-- Address List -->`);
      _push(ssrRenderComponent(unref(_sfc_main$5), {
        addresses: __props.addresses,
        onAdd: handleAddAddress,
        onEdit: handleEditAddress,
        onDelete: handleDeleteAddress,
        onSetDefault: handleSetDefaultAddress
      }, null, _parent));
      _push(`</div><!-- Right Column - Sidebar --><div class="space-y-6"><!-- Wallet Card -->`);
      _push(ssrRenderComponent(unref(_sfc_main$f), {
        wallet: __props.wallet,
        transactions: __props.recentTransactions,
        onOpenTopup: ($event) => topupDialogOpen.value = true
      }, null, _parent));
      _push(`<!-- Rank Card -->`);
      _push(ssrRenderComponent(unref(RankCard), {
        "current-rank": __props.currentRank,
        "next-rank": __props.nextRank,
        "rank-progress": __props.rankProgress,
        "orders-to-next-rank": __props.ordersToNextRank,
        "spent-to-next-rank": __props.spentToNextRank,
        onOpenDetails: ($event) => rankDialogOpen.value = true
      }, null, _parent));
      _push(`<!-- MLM Card -->`);
      _push(ssrRenderComponent(unref(_sfc_main$7), {
        affiliate: __props.affiliate,
        commissions: __props.recentCommissions,
        referrals: __props.referrals,
        "network-stats": __props.networkStats,
        "network-tree": __props.networkTree,
        onWithdraw: handleWithdraw,
        onViewAllMitra: handleViewAllMitra,
        onReferralCopied: handleReferralCopied
      }, null, _parent));
      _push(`<!-- Help Card --><div class="bg-white dark:bg-gray-800/80 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 p-5"><div class="flex items-center gap-3 mb-4"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500/10 to-purple-500/10 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-question-mark-circle",
        class: "w-5 h-5 text-violet-500"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-gray-900 dark:text-white">Butuh Bantuan?</h2></div><p class="text-sm text-gray-500 dark:text-gray-400 mb-4"> Tim kami siap membantu Anda 24/7 melalui WhatsApp </p><a href="https://wa.me/6281234567890" target="_blank">`);
      _push(ssrRenderComponent(_component_UButton, {
        variant: "outline",
        color: "success",
        block: "",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-simple-icons-whatsapp",
              class: "w-4 h-4 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Hubungi Kami `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-simple-icons-whatsapp",
                class: "w-4 h-4 mr-2"
              }),
              createTextVNode(" Hubungi Kami ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</a></div></div></div></div></div><!-- Dialogs -->`);
      _push(ssrRenderComponent(unref(_sfc_main$4), {
        modelValue: addressDialogOpen.value,
        "onUpdate:modelValue": ($event) => addressDialogOpen.value = $event,
        address: editingAddress.value,
        customer: __props.customer,
        "address-count": __props.addressCount
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        modelValue: deleteAddressDialogOpen.value,
        "onUpdate:modelValue": ($event) => deleteAddressDialogOpen.value = $event,
        "address-id": deletingAddressId.value
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        modelValue: topupDialogOpen.value,
        "onUpdate:modelValue": ($event) => topupDialogOpen.value = $event
      }, null, _parent));
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        modelValue: rankDialogOpen.value,
        "onUpdate:modelValue": ($event) => rankDialogOpen.value = $event,
        "all-ranks": __props.allRanks,
        "current-rank": __props.currentRank
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/dashboard/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
