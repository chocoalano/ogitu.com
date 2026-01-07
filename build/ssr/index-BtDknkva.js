import { _ as _sfc_main$4 } from './Card-Ci6a5H8H.js';
import { a as _sfc_main$3 } from './Badge-DaOjA2YD.js';
import { n as _sfc_main$1, _ as _sfc_main$2 } from './Button-BBveOjhJ.js';
import { defineComponent, unref, withCtx, createVNode, toDisplayString, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { Head } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Tooltip-N44Fzd4m.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, storeName: "", slug: "", logo: null, status: "", rating: 0, totalReviews: 0, totalSales: 0 }) }
  },
  setup(__props) {
    const props = __props;
    const settingsMenu = [
      {
        title: "Profil Toko",
        description: "Kelola informasi toko, logo, banner, dan alamat pickup",
        icon: "i-heroicons-building-storefront",
        href: "/admin/settings/profile",
        color: "primary"
      },
      {
        title: "Pengiriman",
        description: "Atur kurir dan opsi pengiriman yang tersedia",
        icon: "i-heroicons-truck",
        href: "/admin/settings/shipping",
        color: "emerald",
        comingSoon: true
      },
      {
        title: "Pembayaran",
        description: "Kelola metode pembayaran dan rekening bank",
        icon: "i-heroicons-credit-card",
        href: "/admin/settings/payment",
        color: "amber",
        comingSoon: true
      },
      {
        title: "Notifikasi",
        description: "Atur preferensi notifikasi pesanan dan chat",
        icon: "i-heroicons-bell",
        href: "/admin/settings/notifications",
        color: "violet",
        comingSoon: true
      },
      {
        title: "Keamanan",
        description: "Ubah password dan pengaturan keamanan akun",
        icon: "i-heroicons-shield-check",
        href: "/admin/settings/security",
        color: "rose",
        comingSoon: true
      },
      {
        title: "Kebijakan Toko",
        description: "Atur kebijakan pengembalian dan garansi produk",
        icon: "i-heroicons-document-text",
        href: "/admin/settings/policies",
        color: "cyan",
        comingSoon: true
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ULink = _sfc_main$1;
      const _component_UIcon = _sfc_main$2;
      const _component_UBadge = _sfc_main$3;
      const _component_UCard = _sfc_main$4;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Pengaturan Toko" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Pengaturan</h1><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"> Kelola pengaturan toko ${ssrInterpolate(props.admin.storeName)}</p></div></div><!-- Settings Grid --><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"><!--[-->`);
      ssrRenderList(settingsMenu, (item) => {
        _push(`<!--[--><!-- Active Menu Item -->`);
        if (!item.comingSoon) {
          _push(ssrRenderComponent(_component_ULink, {
            to: item.href,
            class: "group relative flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-primary-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-primary-600"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-start gap-4"${_scopeId}><div class="${ssrRenderClass([{
                  "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400": item.color === "primary",
                  "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400": item.color === "emerald",
                  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400": item.color === "amber",
                  "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400": item.color === "violet",
                  "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400": item.color === "rose",
                  "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400": item.color === "cyan"
                }, "flex h-12 w-12 shrink-0 items-center justify-center rounded-lg"])}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: item.icon,
                  class: "h-6 w-6"
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="flex-1"${_scopeId}><h3 class="font-semibold text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400"${_scopeId}>${ssrInterpolate(item.title)}</h3><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(item.description)}</p></div>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-chevron-right",
                  class: "h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-500"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-start gap-4" }, [
                    createVNode(
                      "div",
                      {
                        class: ["flex h-12 w-12 shrink-0 items-center justify-center rounded-lg", {
                          "bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400": item.color === "primary",
                          "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400": item.color === "emerald",
                          "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400": item.color === "amber",
                          "bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400": item.color === "violet",
                          "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400": item.color === "rose",
                          "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400": item.color === "cyan"
                        }]
                      },
                      [
                        createVNode(_component_UIcon, {
                          name: item.icon,
                          class: "h-6 w-6"
                        }, null, 8, ["name"])
                      ],
                      2
                      /* CLASS */
                    ),
                    createVNode("div", { class: "flex-1" }, [
                      createVNode(
                        "h3",
                        { class: "font-semibold text-gray-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400" },
                        toDisplayString(item.title),
                        1
                        /* TEXT */
                      ),
                      createVNode(
                        "p",
                        { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" },
                        toDisplayString(item.description),
                        1
                        /* TEXT */
                      )
                    ]),
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-chevron-right",
                      class: "h-5 w-5 shrink-0 text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-primary-500"
                    })
                  ])
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        } else {
          _push(`<!--[--><!-- Coming Soon Item --><div class="relative flex flex-col rounded-xl border border-gray-200 bg-gray-50 p-6 opacity-60 dark:border-gray-700 dark:bg-gray-800/50"><div class="flex items-start gap-4"><div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-200 text-gray-400 dark:bg-gray-700 dark:text-gray-500">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: item.icon,
            class: "h-6 w-6"
          }, null, _parent));
          _push(`</div><div class="flex-1"><div class="flex items-center gap-2"><h3 class="font-semibold text-gray-600 dark:text-gray-400">${ssrInterpolate(item.title)}</h3>`);
          _push(ssrRenderComponent(_component_UBadge, {
            color: "gray",
            variant: "subtle",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Segera Hadir `);
              } else {
                return [
                  createTextVNode(" Segera Hadir ")
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`</div><p class="mt-1 text-sm text-gray-400 dark:text-gray-500">${ssrInterpolate(item.description)}</p></div></div></div><!--]-->`);
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--></div><!-- Store Quick Stats -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chart-bar",
              class: "h-5 w-5 text-gray-500"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Ringkasan Toko</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-chart-bar",
                  class: "h-5 w-5 text-gray-500"
                }),
                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Ringkasan Toko")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-2 gap-4 sm:grid-cols-4"${_scopeId}><div class="text-center"${_scopeId}><p class="text-2xl font-bold text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(Number(props.admin.rating || 0).toFixed(1))}</p><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Rating</p></div><div class="text-center"${_scopeId}><p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400"${_scopeId}>${ssrInterpolate(props.admin.totalReviews || 0)}</p><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Ulasan</p></div><div class="text-center"${_scopeId}><p class="text-2xl font-bold text-amber-600 dark:text-amber-400"${_scopeId}>${ssrInterpolate(props.admin.totalSales || 0)}</p><p class="mt-1 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Penjualan</p></div><div class="text-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: props.admin.status === "active" ? "success" : "warning",
              variant: "subtle",
              size: "lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(props.admin.status === "active" ? "Aktif" : "Tidak Aktif")}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(props.admin.status === "active" ? "Aktif" : "Tidak Aktif"),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`<p class="mt-1 text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Status</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-2 gap-4 sm:grid-cols-4" }, [
                createVNode("div", { class: "text-center" }, [
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-primary-600 dark:text-primary-400" },
                    toDisplayString(Number(props.admin.rating || 0).toFixed(1)),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" }, "Rating")
                ]),
                createVNode("div", { class: "text-center" }, [
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-emerald-600 dark:text-emerald-400" },
                    toDisplayString(props.admin.totalReviews || 0),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" }, "Ulasan")
                ]),
                createVNode("div", { class: "text-center" }, [
                  createVNode(
                    "p",
                    { class: "text-2xl font-bold text-amber-600 dark:text-amber-400" },
                    toDisplayString(props.admin.totalSales || 0),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" }, "Penjualan")
                ]),
                createVNode("div", { class: "text-center" }, [
                  createVNode(_component_UBadge, {
                    color: props.admin.status === "active" ? "success" : "warning",
                    variant: "subtle",
                    size: "lg"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(props.admin.status === "active" ? "Aktif" : "Tidak Aktif"),
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["color"]),
                  createVNode("p", { class: "mt-1 text-sm text-gray-500 dark:text-gray-400" }, "Status")
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/settings/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
