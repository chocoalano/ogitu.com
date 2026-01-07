import { b as _export_sfc, c as _sfc_main$j, _ as _sfc_main$m, d as _sfc_main$n, a as _sfc_main$o, u as useToast, e as _sfc_main$p, f as _sfc_main$q } from './Badge-DaOjA2YD.js';
import { defineComponent, mergeProps, unref, withCtx, createVNode, useSSRContext, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createCommentVNode, computed, ref, onMounted, onUnmounted, reactive, watch, provide, Transition, renderSlot } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderStyle, ssrRenderAttr, ssrRenderSlot } from 'vue/server-renderer';
import { Link, usePage } from '@inertiajs/vue3';
import { _ as _sfc_main$i, a as _sfc_main$k } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$l } from './Tooltip-N44Fzd4m.js';

const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "AdminSidebarLogo",
  __ssrInlineRender: true,
  props: {
    sidebarOpen: { type: Boolean }
  },
  emits: ["toggleSidebar"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      _push(`<!--[--><!-- Logo Header --><div${ssrRenderAttrs(mergeProps({
        class: ["flex items-center justify-between p-4 border-b border-slate-700/50", __props.sidebarOpen ? "px-4" : "px-2"]
      }, _attrs))} data-v-ff305072>`);
      if (__props.sidebarOpen) {
        _push(ssrRenderComponent(unref(Link), {
          href: "/admin/dashboard",
          class: "flex items-center gap-2 group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow duration-300" data-v-ff305072${_scopeId}><span class="text-white font-bold text-lg" data-v-ff305072${_scopeId}>O</span></div><div class="flex flex-col" data-v-ff305072${_scopeId}><span class="font-bold text-lg bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent" data-v-ff305072${_scopeId}> Ogitu </span><span class="text-slate-400 text-[10px] -mt-1" data-v-ff305072${_scopeId}>Admin Center</span></div>`);
            } else {
              return [
                createVNode("div", { class: "w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30 group-hover:shadow-violet-500/50 transition-shadow duration-300" }, [
                  createVNode("span", { class: "text-white font-bold text-lg" }, "O")
                ]),
                createVNode("div", { class: "flex flex-col" }, [
                  createVNode("span", { class: "font-bold text-lg bg-linear-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent" }, " Ogitu "),
                  createVNode("span", { class: "text-slate-400 text-[10px] -mt-1" }, "Admin Center")
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(Link), {
          href: "/admin/dashboard",
          class: "flex justify-center w-full"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30" data-v-ff305072${_scopeId}><span class="text-white font-bold text-lg" data-v-ff305072${_scopeId}>O</span></div>`);
            } else {
              return [
                createVNode("div", { class: "w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30" }, [
                  createVNode("span", { class: "text-white font-bold text-lg" }, "O")
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      }
      _push(`<!-- Desktop Toggle Button -->`);
      if (__props.sidebarOpen) {
        _push(`<button class="hidden lg:flex p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-all duration-200" data-v-ff305072>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-chevron-left",
          class: "w-5 h-5"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/AdminSidebarLogo.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const AdminSidebarLogo = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-ff305072"]]);

const menuItems = [
  {
    label: "Dashboard",
    icon: "i-heroicons-squares-2x2",
    to: "/admin/dashboard"
  },
  {
    label: "Kelola Pengguna",
    icon: "i-heroicons-users",
    to: "/admin/users",
    children: [
      { label: "Semua Pengguna", to: "/admin/users" },
      { label: "Tambah Pengguna", to: "/admin/users/create" },
      { label: "Semua Pelanggan", to: "/admin/customers" },
      { label: "Tambah Pelanggan", to: "/admin/customers/create" }
    ]
  },
  {
    label: "Katalog Produk",
    icon: "i-heroicons-cube",
    to: "/admin/products",
    children: [
      { label: "Semua Produk", to: "/admin/products" },
      { label: "Tambah Produk", to: "/admin/products/create" },
      { label: "Stok & Varian", to: "/admin/products/inventory" },
      { label: "Kategori", to: "/admin/products/categories" }
    ]
  },
  {
    label: "Kelola Artikel",
    icon: "i-heroicons-document-text",
    to: "/admin/articles",
    children: [
      { label: "Semua Artikel", to: "/admin/articles" },
      { label: "Tambah Artikel", to: "/admin/articles/create" },
      { label: "Draft", to: "/admin/articles?status=draft" },
      { label: "Terpublikasi", to: "/admin/articles?status=published" }
    ]
  },
  {
    label: "Pesanan",
    icon: "i-heroicons-shopping-cart",
    to: "/admin/orders",
    badge: "orderCount",
    children: [
      { label: "Semua Pesanan", to: "/admin/orders" },
      { label: "Perlu Diproses", to: "/admin/orders?status=paid" },
      { label: "Dikirim", to: "/admin/orders?status=shipped" },
      { label: "Selesai", to: "/admin/orders?status=delivered" }
    ]
  },
  {
    label: "Promosi",
    icon: "i-heroicons-megaphone",
    to: "/admin/promotions",
    children: [
      { label: "Diskon Produk", to: "/admin/promotions/discounts" },
      { label: "Voucher Toko", to: "/admin/promotions/vouchers" },
      { label: "Flash Sale", to: "/admin/promotions/flash-sale" }
    ]
  },
  {
    label: "Ulasan & Rating",
    icon: "i-heroicons-star",
    to: "/admin/reviews"
  },
  {
    label: "Notifikasi",
    icon: "i-heroicons-bell",
    to: "/admin/notifications",
    badge: "notificationCount"
  },
  {
    label: "Keuangan",
    icon: "i-heroicons-wallet",
    to: "/admin/finance",
    children: [
      { label: "Permintaan Withdraw", to: "/admin/finance/withdraw" },
      { label: "Riwayat Transaksi", to: "/admin/finance/transactions" }
    ]
  },
  {
    label: "Network MLM",
    icon: "i-heroicons-share",
    to: "/admin/network"
  },
  {
    label: "Laporan & Analitik",
    icon: "i-heroicons-chart-bar-square",
    to: "/admin/analytics",
    children: [
      { label: "Statistik Penjualan", to: "/admin/analytics/sales" },
      { label: "Performa Produk", to: "/admin/analytics/products" },
      { label: "Laporan Keuangan", to: "/admin/analytics/finance" }
    ]
  },
  {
    label: "Pengaturan",
    icon: "i-heroicons-cog-8-tooth",
    to: "/admin/settings",
    children: [
      { label: "Alamat & Gudang", to: "/admin/settings/address" },
      { label: "Pengiriman", to: "/admin/settings/shipping" },
      { label: "Notifikasi", to: "/admin/settings/notifications" }
    ]
  }
];
const getXsrfToken = () => {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : "";
};
const isMenuActive = (item, currentPath) => {
  if (item.children) {
    return item.children.some((child) => currentPath.startsWith(child.to.split("?")[0]));
  }
  return currentPath === item.to || currentPath.startsWith(item.to + "/");
};

const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "AdminNavigation",
  __ssrInlineRender: true,
  props: {
    menuItems: {},
    sidebarOpen: { type: Boolean },
    currentPath: {},
    badges: {},
    expandedMenus: {}
  },
  emits: ["toggleSubmenu"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const isActive = (item) => isMenuActive(item, props.currentPath);
    const isChildActive = (childTo) => {
      return props.currentPath.startsWith(childTo.split("?")[0]);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      const _component_UPopover = _sfc_main$j;
      const _component_UButton = _sfc_main$k;
      const _component_UTooltip = _sfc_main$l;
      _push(`<!--[--><!-- Navigation Menu --><nav${ssrRenderAttrs(mergeProps({ class: "flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent" }, _attrs))}><ul class="space-y-1 px-2"><!--[-->`);
      ssrRenderList(__props.menuItems, (item) => {
        _push(`<li><!-- Menu with children -->`);
        if (item.children) {
          _push(`<!--[-->`);
          if (__props.sidebarOpen) {
            _push(`<button class="${ssrRenderClass([
              isActive(item) ? "bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30" : "text-slate-300 hover:bg-slate-700/50 hover:text-white",
              "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200"
            ])}"><div class="flex items-center gap-3"><div class="${ssrRenderClass([
              isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50",
              "w-8 h-8 rounded-lg flex items-center justify-center"
            ])}">`);
            _push(ssrRenderComponent(_component_UIcon, {
              name: item.icon,
              class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
            }, null, _parent));
            _push(`</div><span>${ssrInterpolate(item.label)}</span></div><div class="flex items-center gap-2">`);
            if (item.badge && __props.badges[item.badge]) {
              _push(`<span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-linear-to-r from-violet-500 to-fuchsia-500 text-white">${ssrInterpolate(__props.badges[item.badge])}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chevron-down",
              class: ["w-4 h-4 transition-transform duration-200", __props.expandedMenus.has(item.label) ? "rotate-180" : ""]
            }, null, _parent));
            _push(`</div></button>`);
          } else {
            _push(`<!--[--><!-- Collapsed state with dropdown -->`);
            _push(ssrRenderComponent(_component_UPopover, {
              ui: { content: "min-w-45" },
              modal: false
            }, {
              content: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="p-2 bg-slate-800 rounded-xl"${_scopeId}><span class="px-3 py-2 text-xs font-semibold text-slate-400 uppercase"${_scopeId}>${ssrInterpolate(item.label)}</span><!--[-->`);
                  ssrRenderList(item.children, (child) => {
                    _push2(ssrRenderComponent(unref(Link), {
                      key: child.to,
                      href: child.to,
                      class: ["flex items-center px-3 py-2 mt-1 rounded-lg text-sm transition-colors duration-200", isChildActive(child.to) ? "bg-violet-600/20 text-violet-400" : "text-slate-300 hover:bg-slate-700/50 hover:text-white"]
                    }, {
                      default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                        if (_push3) {
                          _push3(`${ssrInterpolate(child.label)}`);
                        } else {
                          return [
                            createTextVNode(
                              toDisplayString(child.label),
                              1
                              /* TEXT */
                            )
                          ];
                        }
                      }),
                      _: 2
                      /* DYNAMIC */
                    }, _parent2, _scopeId));
                  });
                  _push2(`<!--]--></div>`);
                } else {
                  return [
                    createVNode("div", { class: "p-2 bg-slate-800 rounded-xl" }, [
                      createVNode(
                        "span",
                        { class: "px-3 py-2 text-xs font-semibold text-slate-400 uppercase" },
                        toDisplayString(item.label),
                        1
                        /* TEXT */
                      ),
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(item.children, (child) => {
                          return openBlock(), createBlock(unref(Link), {
                            key: child.to,
                            href: child.to,
                            class: ["flex items-center px-3 py-2 mt-1 rounded-lg text-sm transition-colors duration-200", isChildActive(child.to) ? "bg-violet-600/20 text-violet-400" : "text-slate-300 hover:bg-slate-700/50 hover:text-white"]
                          }, {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(child.label),
                                1
                                /* TEXT */
                              )
                            ]),
                            _: 2
                            /* DYNAMIC */
                          }, 1032, ["href", "class"]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ];
                }
              }),
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    class: [
                      "w-full flex justify-center p-2.5 rounded-xl transition-all duration-200",
                      isActive(item) ? "bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30" : "text-slate-300 hover:bg-slate-700/50"
                    ]
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="${ssrRenderClass([
                          isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50",
                          "w-8 h-8 rounded-lg flex items-center justify-center"
                        ])}"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: item.icon,
                          class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        return [
                          createVNode(
                            "div",
                            {
                              class: [
                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50"
                              ]
                            },
                            [
                              createVNode(_component_UIcon, {
                                name: item.icon,
                                class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                              }, null, 8, ["name", "class"])
                            ],
                            2
                            /* CLASS */
                          )
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      color: "neutral",
                      variant: "ghost",
                      class: [
                        "w-full flex justify-center p-2.5 rounded-xl transition-all duration-200",
                        isActive(item) ? "bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30" : "text-slate-300 hover:bg-slate-700/50"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode(
                          "div",
                          {
                            class: [
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50"
                            ]
                          },
                          [
                            createVNode(_component_UIcon, {
                              name: item.icon,
                              class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                            }, null, 8, ["name", "class"])
                          ],
                          2
                          /* CLASS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["class"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(`<!--]-->`);
          }
          _push(`<!-- Submenu (expanded state) -->`);
          if (__props.sidebarOpen && __props.expandedMenus.has(item.label)) {
            _push(`<ul class="mt-1 ml-11 space-y-1 overflow-hidden"><!--[-->`);
            ssrRenderList(item.children, (child) => {
              _push(`<li>`);
              _push(ssrRenderComponent(unref(Link), {
                href: child.to,
                class: [
                  "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                  isChildActive(child.to) ? "text-violet-400 bg-violet-500/10 font-medium" : "text-slate-400 hover:text-white hover:bg-slate-700/30"
                ]
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(child.label)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(child.label),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent));
              _push(`</li>`);
            });
            _push(`<!--]--></ul>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<!--[--><!-- Menu without children -->`);
          if (__props.sidebarOpen) {
            _push(ssrRenderComponent(unref(Link), {
              href: item.to,
              class: [
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive(item) ? "bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30" : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
              ]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<div class="${ssrRenderClass([
                    isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50",
                    "w-8 h-8 rounded-lg flex items-center justify-center"
                  ])}"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: item.icon,
                    class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                  }, null, _parent2, _scopeId));
                  _push2(`</div><span${_scopeId}>${ssrInterpolate(item.label)}</span>`);
                } else {
                  return [
                    createVNode(
                      "div",
                      {
                        class: [
                          "w-8 h-8 rounded-lg flex items-center justify-center",
                          isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50"
                        ]
                      },
                      [
                        createVNode(_component_UIcon, {
                          name: item.icon,
                          class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                        }, null, 8, ["name", "class"])
                      ],
                      2
                      /* CLASS */
                    ),
                    createVNode(
                      "span",
                      null,
                      toDisplayString(item.label),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
          } else {
            _push(`<!--[--><!-- Collapsed state -->`);
            _push(ssrRenderComponent(_component_UTooltip, {
              text: item.label,
              popper: { placement: "right" }
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(ssrRenderComponent(unref(Link), {
                    href: item.to,
                    class: [
                      "flex justify-center p-2.5 rounded-xl transition-all duration-200",
                      isActive(item) ? "bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30" : "text-slate-300 hover:bg-slate-700/50"
                    ]
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<div class="${ssrRenderClass([
                          isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50",
                          "w-8 h-8 rounded-lg flex items-center justify-center"
                        ])}"${_scopeId2}>`);
                        _push3(ssrRenderComponent(_component_UIcon, {
                          name: item.icon,
                          class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                        }, null, _parent3, _scopeId2));
                        _push3(`</div>`);
                      } else {
                        return [
                          createVNode(
                            "div",
                            {
                              class: [
                                "w-8 h-8 rounded-lg flex items-center justify-center",
                                isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50"
                              ]
                            },
                            [
                              createVNode(_component_UIcon, {
                                name: item.icon,
                                class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                              }, null, 8, ["name", "class"])
                            ],
                            2
                            /* CLASS */
                          )
                        ];
                      }
                    }),
                    _: 2
                    /* DYNAMIC */
                  }, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(unref(Link), {
                      href: item.to,
                      class: [
                        "flex justify-center p-2.5 rounded-xl transition-all duration-200",
                        isActive(item) ? "bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30" : "text-slate-300 hover:bg-slate-700/50"
                      ]
                    }, {
                      default: withCtx(() => [
                        createVNode(
                          "div",
                          {
                            class: [
                              "w-8 h-8 rounded-lg flex items-center justify-center",
                              isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50"
                            ]
                          },
                          [
                            createVNode(_component_UIcon, {
                              name: item.icon,
                              class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                            }, null, 8, ["name", "class"])
                          ],
                          2
                          /* CLASS */
                        )
                      ]),
                      _: 2
                      /* DYNAMIC */
                    }, 1032, ["href", "class"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(`<!--]-->`);
          }
          _push(`<!--]-->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav><!--]-->`);
    };
  }
});

const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/AdminNavigation.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};

const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "AdminMobileNavigation",
  __ssrInlineRender: true,
  props: {
    menuItems: {},
    currentPath: {},
    badges: {}
  },
  setup(__props) {
    const props = __props;
    const isActive = (item) => isMenuActive(item, props.currentPath);
    const isChildActive = (childTo) => {
      return props.currentPath.startsWith(childTo.split("?")[0]);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      _push(`<!--[--><!-- Mobile Navigation Menu --><nav${ssrRenderAttrs(mergeProps({ class: "flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent" }, _attrs))}><ul class="space-y-1 px-2"><!--[-->`);
      ssrRenderList(__props.menuItems, (item) => {
        _push(`<li><!-- Menu with children -->`);
        if (item.children) {
          _push(`<div class="mb-2"><div class="${ssrRenderClass([
            isActive(item) ? "bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30" : "text-slate-300",
            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium"
          ])}"><div class="${ssrRenderClass([
            isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50",
            "w-8 h-8 rounded-lg flex items-center justify-center"
          ])}">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: item.icon,
            class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
          }, null, _parent));
          _push(`</div><span>${ssrInterpolate(item.label)}</span>`);
          if (item.badge && __props.badges[item.badge]) {
            _push(`<span class="ml-auto px-2 py-0.5 rounded-full text-xs font-semibold bg-linear-to-r from-violet-500 to-fuchsia-500 text-white">${ssrInterpolate(__props.badges[item.badge])}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!-- Submenu always visible on mobile --><ul class="mt-1 ml-11 space-y-1"><!--[-->`);
          ssrRenderList(item.children, (child) => {
            _push(`<li>`);
            _push(ssrRenderComponent(unref(Link), {
              href: child.to,
              class: [
                "block px-3 py-2 rounded-lg text-sm transition-all duration-200",
                isChildActive(child.to) ? "text-violet-400 bg-violet-500/10 font-medium" : "text-slate-400 hover:text-white hover:bg-slate-700/30"
              ]
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(child.label)}`);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(child.label),
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul></div>`);
        } else {
          _push(`<!--[--><!-- Menu without children -->`);
          _push(ssrRenderComponent(unref(Link), {
            href: item.to,
            class: [
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive(item) ? "bg-linear-to-r from-violet-600/20 to-fuchsia-600/20 text-white border border-violet-500/30" : "text-slate-300 hover:bg-slate-700/50 hover:text-white"
            ]
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="${ssrRenderClass([
                  isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50",
                  "w-8 h-8 rounded-lg flex items-center justify-center"
                ])}"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: item.icon,
                  class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                }, null, _parent2, _scopeId));
                _push2(`</div><span${_scopeId}>${ssrInterpolate(item.label)}</span>`);
              } else {
                return [
                  createVNode(
                    "div",
                    {
                      class: [
                        "w-8 h-8 rounded-lg flex items-center justify-center",
                        isActive(item) ? "bg-linear-to-br from-violet-500 to-fuchsia-600 shadow-lg shadow-violet-500/30" : "bg-slate-700/50"
                      ]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: item.icon,
                        class: ["w-4 h-4", isActive(item) ? "text-white" : "text-slate-400"]
                      }, null, 8, ["name", "class"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createVNode(
                    "span",
                    null,
                    toDisplayString(item.label),
                    1
                    /* TEXT */
                  )
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
          _push(`<!--]-->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></nav><!--]-->`);
    };
  }
});

const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/AdminMobileNavigation.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};

const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "AdminSidebarActions",
  __ssrInlineRender: true,
  props: {
    sidebarOpen: { type: Boolean }
  },
  emits: ["logout"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      _push(`<!--[--><!-- Sidebar Bottom Actions --><div${ssrRenderAttrs(mergeProps({
        class: ["border-t border-slate-700/50 p-3", __props.sidebarOpen ? "" : "flex flex-col items-center gap-2"]
      }, _attrs))}><!-- Back to Store -->`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/",
        class: ["flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-700/50 hover:text-white transition-all duration-200", __props.sidebarOpen ? "" : "justify-center p-2.5"]
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-left",
              class: "w-5 h-5 text-slate-400"
            }, null, _parent2, _scopeId));
            if (__props.sidebarOpen) {
              _push2(`<span${_scopeId}>Kembali ke Toko</span>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-left",
                class: "w-5 h-5 text-slate-400"
              }),
              __props.sidebarOpen ? (openBlock(), createBlock("span", { key: 0 }, "Kembali ke Toko")) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Logout --><button class="${ssrRenderClass([__props.sidebarOpen ? "" : "justify-center p-2.5", "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition-all duration-200"])}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-right-on-rectangle",
        class: "w-5 h-5"
      }, null, _parent));
      if (__props.sidebarOpen) {
        _push(`<span>Logout</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><!--]-->`);
    };
  }
});

const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/AdminSidebarActions.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};

const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "AdminHeader",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, name: "", email: "", avatar: null, role: "admin" }) },
    sidebarOpen: { type: Boolean, default: true }
  },
  emits: ["toggleSidebar", "toggleMobileSidebar", "logout"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      const _component_UInput = _sfc_main$m;
      const _component_UColorModeButton = _sfc_main$n;
      const _component_UPopover = _sfc_main$j;
      const _component_UButton = _sfc_main$k;
      _push(`<!--[--><!-- Top Header --><header${ssrRenderAttrs(mergeProps({ class: "sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/50" }, _attrs))}><div class="flex items-center justify-between px-4 lg:px-6 py-3"><div class="flex items-center gap-3"><!-- Mobile Menu Button --><button class="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-bars-3",
        class: "w-6 h-6"
      }, null, _parent));
      _push(`</button><!-- Desktop Expand Button (when collapsed) -->`);
      if (!__props.sidebarOpen) {
        _push(`<button class="hidden lg:flex p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-bars-3",
          class: "w-6 h-6"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Search Bar --><div class="hidden md:flex items-center"><div class="relative">`);
      _push(ssrRenderComponent(_component_UInput, {
        placeholder: "Cari produk, pesanan...",
        icon: "i-heroicons-magnifying-glass",
        class: "w-64 lg:w-80",
        ui: {
          rounded: "rounded-xl",
          color: {
            white: {
              outline: "bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
            }
          }
        }
      }, null, _parent));
      _push(`</div></div></div><div class="flex items-center gap-2"><!-- Dark Mode Toggle -->`);
      _push(ssrRenderComponent(_component_UColorModeButton, { size: "sm" }, null, _parent));
      _push(`<!-- Notifications -->`);
      _push(ssrRenderComponent(_component_UPopover, { modal: false }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-4 w-80 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl"${_scopeId}><h4 class="font-semibold text-slate-900 dark:text-white mb-3"${_scopeId}>Notifikasi</h4><div class="space-y-3"${_scopeId}><div class="flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer"${_scopeId}><div class="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shrink-0"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shopping-bag",
              class: "w-4 h-4 text-white"
            }, null, _parent2, _scopeId));
            _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><p class="text-sm text-slate-900 dark:text-white font-medium"${_scopeId}>Pesanan Baru</p><p class="text-xs text-slate-500 dark:text-slate-400 truncate"${_scopeId}> Anda menerima pesanan baru #ORD-001 </p><span class="text-xs text-violet-500"${_scopeId}>5 menit lalu</span></div></div></div>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/admin/notifications",
              class: "block mt-3 text-center text-sm text-violet-500 hover:text-violet-600 font-medium"
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "p-4 w-80 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl" }, [
                createVNode("h4", { class: "font-semibold text-slate-900 dark:text-white mb-3" }, "Notifikasi"),
                createVNode("div", { class: "space-y-3" }, [
                  createVNode("div", { class: "flex items-start gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer" }, [
                    createVNode("div", { class: "w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shrink-0" }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-shopping-bag",
                        class: "w-4 h-4 text-white"
                      })
                    ]),
                    createVNode("div", { class: "flex-1 min-w-0" }, [
                      createVNode("p", { class: "text-sm text-slate-900 dark:text-white font-medium" }, "Pesanan Baru"),
                      createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400 truncate" }, " Anda menerima pesanan baru #ORD-001 "),
                      createVNode("span", { class: "text-xs text-violet-500" }, "5 menit lalu")
                    ])
                  ])
                ]),
                createVNode(unref(Link), {
                  href: "/admin/notifications",
                  class: "block mt-3 text-center text-sm text-violet-500 hover:text-violet-600 font-medium"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Lihat Semua ")
                  ]),
                  _: 1
                  /* STABLE */
                })
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-bell",
              color: "neutral",
              variant: "ghost",
              size: "sm",
              class: "relative"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900"${_scopeId2}></span>`);
                } else {
                  return [
                    createVNode("span", { class: "absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-bell",
                color: "neutral",
                variant: "ghost",
                size: "sm",
                class: "relative"
              }, {
                default: withCtx(() => [
                  createVNode("span", { class: "absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900" })
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
      _push(`<!-- User Menu -->`);
      _push(ssrRenderComponent(_component_UPopover, { modal: false }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-2 w-56 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl"${_scopeId}><div class="px-3 py-2 border-b border-slate-200 dark:border-slate-700"${_scopeId}><p class="font-semibold text-slate-900 dark:text-white text-sm"${_scopeId}>${ssrInterpolate(__props.admin.storeName)}</p><p class="text-xs text-slate-500 dark:text-slate-400"${_scopeId}>Admin Account</p></div><div class="py-1"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Link), {
              href: "/admin/settings/profile",
              class: "flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user-circle",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Profil `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-user-circle",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Profil ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: "/admin/settings",
              class: "flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-cog-6-tooth",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Pengaturan `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-cog-6-tooth",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Pengaturan ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><div class="pt-1 border-t border-slate-200 dark:border-slate-700"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              variant: "ghost",
              class: "w-full justify-start",
              onClick: ($event) => _ctx.$emit("logout")
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-arrow-right-on-rectangle",
                    class: "w-4 h-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` Logout `);
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-right-on-rectangle",
                      class: "w-4 h-4"
                    }),
                    createTextVNode(" Logout ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-2 w-56 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl" }, [
                createVNode("div", { class: "px-3 py-2 border-b border-slate-200 dark:border-slate-700" }, [
                  createVNode(
                    "p",
                    { class: "font-semibold text-slate-900 dark:text-white text-sm" },
                    toDisplayString(__props.admin.storeName),
                    1
                    /* TEXT */
                  ),
                  createVNode("p", { class: "text-xs text-slate-500 dark:text-slate-400" }, "Admin Account")
                ]),
                createVNode("div", { class: "py-1" }, [
                  createVNode(unref(Link), {
                    href: "/admin/settings/profile",
                    class: "flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-user-circle",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Profil ")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  createVNode(unref(Link), {
                    href: "/admin/settings",
                    class: "flex items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-cog-6-tooth",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Pengaturan ")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ]),
                createVNode("div", { class: "pt-1 border-t border-slate-200 dark:border-slate-700" }, [
                  createVNode(_component_UButton, {
                    color: "error",
                    variant: "ghost",
                    class: "w-full justify-start",
                    onClick: ($event) => _ctx.$emit("logout")
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-arrow-right-on-rectangle",
                        class: "w-4 h-4"
                      }),
                      createTextVNode(" Logout ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"])
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              class: "gap-2 p-1.5"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-semibold text-sm"${_scopeId2}>${ssrInterpolate(__props.admin.storeName?.charAt(0).toUpperCase())}</div>`);
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-chevron-down",
                    class: "w-4 h-4 text-slate-400 hidden sm:block"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(
                      "div",
                      { class: "w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-semibold text-sm" },
                      toDisplayString(__props.admin.storeName?.charAt(0).toUpperCase()),
                      1
                      /* TEXT */
                    ),
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-chevron-down",
                      class: "w-4 h-4 text-slate-400 hidden sm:block"
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
                color: "neutral",
                variant: "ghost",
                class: "gap-2 p-1.5"
              }, {
                default: withCtx(() => [
                  createVNode(
                    "div",
                    { class: "w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center text-white font-semibold text-sm" },
                    toDisplayString(__props.admin.storeName?.charAt(0).toUpperCase()),
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chevron-down",
                    class: "w-4 h-4 text-slate-400 hidden sm:block"
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
      _push(`</div></div></header><!--]-->`);
    };
  }
});

const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/AdminHeader.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};

const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "AdminFooter",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><!-- Footer --><footer${ssrRenderAttrs(mergeProps({ class: "border-t border-slate-200 dark:border-slate-700/50 py-4 px-6 bg-white/50 dark:bg-slate-900/50" }, _attrs))}><div class="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500 dark:text-slate-400"><p>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} Ogitu Admin Center. All rights reserved.</p><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/help",
        class: "hover:text-violet-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Bantuan `);
          } else {
            return [
              createTextVNode(" Bantuan ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/terms",
        class: "hover:text-violet-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Syarat &amp; Ketentuan `);
          } else {
            return [
              createTextVNode(" Syarat & Ketentuan ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/privacy",
        class: "hover:text-violet-500 transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kebijakan Privasi `);
          } else {
            return [
              createTextVNode(" Kebijakan Privasi ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></footer><!--]-->`);
    };
  }
});

const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/AdminFooter.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};

const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "DashboardHeader",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, name: "", email: "", avatar: null, role: "admin" }) }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$k;
      const _component_UIcon = _sfc_main$i;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, _attrs))}><div><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1><p class="text-slate-500 dark:text-slate-400 mt-1"> Selamat datang kembali, <span class="text-violet-600 dark:text-violet-400 font-medium">${ssrInterpolate(__props.admin.storeName || "Admin")}</span>! 🔥 </p></div><div class="flex items-center gap-3">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "outline",
        size: "md",
        class: "rounded-xl",
        to: "/admin/analytics"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chart-bar-square",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Lihat Statistik `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-chart-bar-square",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(" Lihat Statistik ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        size: "md",
        class: "rounded-xl bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700",
        to: "/admin/products/create"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-5 h-5 mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Tambah Produk `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-5 h-5 mr-2"
              }),
              createTextVNode(" Tambah Produk ")
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

const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardHeader.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};

const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "DashboardStatusAlert",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, name: "", email: "", avatar: null, role: "admin" }) }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      _push(`<!--[--><!-- Pending Status Alert -->`);
      if (__props.admin.status === "pending") {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 bg-linear-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl" }, _attrs))}><div class="flex items-start gap-4"><div class="w-12 h-12 bg-linear-to-br from-amber-500/20 to-orange-500/20 rounded-xl flex items-center justify-center shrink-0">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-clock",
          class: "w-6 h-6 text-amber-500"
        }, null, _parent));
        _push(`</div><div><h3 class="font-semibold text-amber-700 dark:text-amber-300"> Akun Admin Dalam Peninjauan </h3><p class="text-sm text-amber-600 dark:text-amber-400 mt-1"> Akun admin Anda sedang dalam proses verifikasi oleh tim OGITU. Anda akan mendapat notifikasi via email setelah akun disetujui. Proses verifikasi biasanya memakan waktu 1-3 hari kerja. </p></div></div></div>`);
      } else if (__props.admin.status === "suspended") {
        _push(`<!--[--><!-- Suspended Alert --><div class="p-4 bg-linear-to-r from-red-500/10 to-rose-500/10 border border-red-500/30 rounded-2xl"><div class="flex items-start gap-4"><div class="w-12 h-12 bg-linear-to-br from-red-500/20 to-rose-500/20 rounded-xl flex items-center justify-center shrink-0">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-triangle",
          class: "w-6 h-6 text-red-500"
        }, null, _parent));
        _push(`</div><div><h3 class="font-semibold text-red-700 dark:text-red-300">Akun Admin Ditangguhkan</h3><p class="text-sm text-red-600 dark:text-red-400 mt-1"> Akun admin Anda telah ditangguhkan. Silakan hubungi tim support OGITU untuk informasi lebih lanjut dan proses pemulihan akun. </p>`);
        _push(ssrRenderComponent(unref(Link), {
          href: "/admin/help/contact",
          class: "inline-flex items-center gap-1 mt-2 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Hubungi Support `);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-right",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createTextVNode(" Hubungi Support "),
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
        _push(`</div></div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardStatusAlert.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
const formatNumber = (num) => {
  return new Intl.NumberFormat("id-ID").format(num);
};
const formatRelativeDate = (dateString) => {
  const date = new Date(dateString);
  const now = /* @__PURE__ */ new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 6e4);
  const diffHours = Math.floor(diffMs / 36e5);
  const diffDays = Math.floor(diffMs / 864e5);
  if (diffMins < 1) return "Baru saja";
  if (diffMins < 60) return `${diffMins} menit lalu`;
  if (diffHours < 24) return `${diffHours} jam lalu`;
  if (diffDays < 7) return `${diffDays} hari lalu`;
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
};
const getOrderStatusColor = (status) => {
  const colors = {
    pending: "warning",
    pending_payment: "warning",
    paid: "info",
    processing: "primary",
    shipped: "secondary",
    delivered: "success",
    completed: "success",
    cancelled: "error",
    refunded: "neutral",
    failed: "error"
  };
  return colors[status] || "neutral";
};
const getOrderStatusLabel = (status) => {
  const labels = {
    pending: "Pending",
    pending_payment: "Menunggu Pembayaran",
    paid: "Dibayar",
    processing: "Diproses",
    shipped: "Dikirim",
    delivered: "Selesai",
    completed: "Selesai",
    cancelled: "Dibatalkan",
    refunded: "Refund",
    failed: "Gagal"
  };
  return labels[status] || status;
};
const calculateDiscountPercent = (price, discountPrice) => {
  if (!discountPrice || discountPrice >= price) return 0;
  return Math.round((price - discountPrice) / price * 100);
};

const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "DashboardStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const props = __props;
    const statsCards = computed(() => [
      {
        label: "Total Produk",
        value: formatNumber(props.stats.totalProducts),
        subValue: `${formatNumber(props.stats.activeProducts)} produk aktif`,
        icon: "i-heroicons-cube",
        gradient: "from-violet-500 to-purple-600",
        bgGradient: "from-violet-500/10 to-purple-600/10",
        to: "/admin/products"
      },
      {
        label: "Total Pesanan",
        value: formatNumber(props.stats.totalOrders),
        subValue: `${formatNumber(props.stats.pendingOrders)} perlu diproses`,
        icon: "i-heroicons-shopping-cart",
        gradient: "from-fuchsia-500 to-pink-600",
        bgGradient: "from-fuchsia-500/10 to-pink-600/10",
        to: "/admin/orders"
      },
      {
        label: "Total Pendapatan",
        value: formatCurrency(props.stats.totalRevenue),
        subValue: "Sepanjang waktu",
        icon: "i-heroicons-wallet",
        gradient: "from-emerald-500 to-teal-600",
        bgGradient: "from-emerald-500/10 to-teal-600/10",
        to: "/admin/finance"
      },
      {
        label: "Bulan Ini",
        value: formatCurrency(props.stats.monthlyRevenue),
        subValue: "Pendapatan bulan ini",
        icon: "i-heroicons-chart-bar-square",
        gradient: "from-amber-500 to-orange-600",
        bgGradient: "from-amber-500/10 to-orange-600/10",
        to: "/admin/analytics"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(statsCards.value, (stat) => {
        _push(ssrRenderComponent(unref(Link), {
          key: stat.label,
          href: stat.to,
          class: "group relative p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-violet-300 dark:hover:border-violet-700 hover:shadow-xl hover:shadow-violet-500/10 transition-all overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!-- Background gradient overlay --><div class="${ssrRenderClass([
                "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity",
                stat.bgGradient
              ])}"${_scopeId}></div><div class="relative"${_scopeId}><div class="flex items-start justify-between"${_scopeId}><div class="${ssrRenderClass([
                "w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br shadow-lg",
                stat.gradient
              ])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: stat.icon,
                class: "w-6 h-6 text-white"
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-arrow-up-right",
                class: "w-5 h-5 text-slate-400 group-hover:text-violet-500 transition-colors"
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="mt-4"${_scopeId}><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>${ssrInterpolate(stat.label)}</p><p class="text-2xl font-bold text-slate-900 dark:text-white mt-1"${_scopeId}>${ssrInterpolate(stat.value)}</p><p class="text-xs text-slate-400 mt-1"${_scopeId}>${ssrInterpolate(stat.subValue)}</p></div></div>`);
            } else {
              return [
                createCommentVNode(" Background gradient overlay "),
                createVNode(
                  "div",
                  {
                    class: [
                      "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity",
                      stat.bgGradient
                    ]
                  },
                  null,
                  2
                  /* CLASS */
                ),
                createVNode("div", { class: "relative" }, [
                  createVNode("div", { class: "flex items-start justify-between" }, [
                    createVNode(
                      "div",
                      {
                        class: [
                          "w-12 h-12 rounded-xl flex items-center justify-center bg-linear-to-br shadow-lg",
                          stat.gradient
                        ]
                      },
                      [
                        createVNode(_component_UIcon, {
                          name: stat.icon,
                          class: "w-6 h-6 text-white"
                        }, null, 8, ["name"])
                      ],
                      2
                      /* CLASS */
                    ),
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-arrow-up-right",
                      class: "w-5 h-5 text-slate-400 group-hover:text-violet-500 transition-colors"
                    })
                  ]),
                  createVNode("div", { class: "mt-4" }, [
                    createVNode(
                      "p",
                      { class: "text-sm text-slate-500 dark:text-slate-400" },
                      toDisplayString(stat.label),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-2xl font-bold text-slate-900 dark:text-white mt-1" },
                      toDisplayString(stat.value),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "text-xs text-slate-400 mt-1" },
                      toDisplayString(stat.subValue),
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

const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardStatsCards.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "DashboardQuickActions",
  __ssrInlineRender: true,
  setup(__props) {
    const quickActions = [
      {
        label: "Tambah Produk Baru",
        description: "Device, liquid, atau aksesoris",
        icon: "i-heroicons-plus-circle",
        to: "/admin/products/create",
        gradient: "from-violet-600 to-fuchsia-600"
      },
      {
        label: "Proses Pesanan",
        description: "Lihat pesanan masuk",
        icon: "i-heroicons-inbox-stack",
        to: "/admin/orders?status=paid",
        gradient: "from-blue-600 to-cyan-600"
      },
      {
        label: "Buat Promo",
        description: "Diskon & voucher toko",
        icon: "i-heroicons-tag",
        to: "/admin/promotions",
        gradient: "from-pink-600 to-rose-600"
      },
      {
        label: "Tarik Saldo",
        description: "Cairkan pendapatan",
        icon: "i-heroicons-banknotes",
        to: "/admin/finance/withdraw",
        gradient: "from-emerald-600 to-teal-600"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(quickActions, (action) => {
        _push(ssrRenderComponent(unref(Link), {
          key: action.label,
          href: action.to,
          class: "group relative p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-transparent hover:shadow-xl transition-all overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!-- Hover gradient border effect --><div class="${ssrRenderClass([
                "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity -z-10",
                action.gradient
              ])}" style="${ssrRenderStyle({ "margin": "-1px", "border-radius": "inherit" })}"${_scopeId}></div><div class="absolute inset-px bg-white dark:bg-slate-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"${_scopeId}></div><div class="relative flex flex-col items-center text-center"${_scopeId}><div class="${ssrRenderClass([
                "w-14 h-14 rounded-2xl flex items-center justify-center mb-3 bg-linear-to-br transition-transform group-hover:scale-110",
                action.gradient
              ])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: action.icon,
                class: "w-7 h-7 text-white"
              }, null, _parent2, _scopeId));
              _push2(`</div><span class="font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(action.label)}</span><span class="text-xs text-slate-500 dark:text-slate-400 mt-1"${_scopeId}>${ssrInterpolate(action.description)}</span></div>`);
            } else {
              return [
                createCommentVNode(" Hover gradient border effect "),
                createVNode(
                  "div",
                  {
                    class: [
                      "absolute inset-0 bg-linear-to-br opacity-0 group-hover:opacity-100 transition-opacity -z-10",
                      action.gradient
                    ],
                    style: { "margin": "-1px", "border-radius": "inherit" }
                  },
                  null,
                  2
                  /* CLASS */
                ),
                createVNode("div", { class: "absolute inset-px bg-white dark:bg-slate-900 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" }),
                createVNode("div", { class: "relative flex flex-col items-center text-center" }, [
                  createVNode(
                    "div",
                    {
                      class: [
                        "w-14 h-14 rounded-2xl flex items-center justify-center mb-3 bg-linear-to-br transition-transform group-hover:scale-110",
                        action.gradient
                      ]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: action.icon,
                        class: "w-7 h-7 text-white"
                      }, null, 8, ["name"])
                    ],
                    2
                    /* CLASS */
                  ),
                  createVNode(
                    "span",
                    { class: "font-semibold text-slate-900 dark:text-white" },
                    toDisplayString(action.label),
                    1
                    /* TEXT */
                  ),
                  createVNode(
                    "span",
                    { class: "text-xs text-slate-500 dark:text-slate-400 mt-1" },
                    toDisplayString(action.description),
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
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardQuickActions.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "DashboardRecentOrders",
  __ssrInlineRender: true,
  props: {
    orders: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      const _component_UBadge = _sfc_main$o;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800" }, _attrs))}><!-- Header --><div class="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-shopping-cart",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-slate-900 dark:text-white">Pesanan Terbaru</h2></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/orders",
        class: "text-sm text-violet-600 hover:text-violet-500 font-medium flex items-center gap-1"
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
      _push(`</div><!-- Orders List -->`);
      if (__props.orders && __props.orders.length > 0) {
        _push(`<div class="divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
        ssrRenderList(__props.orders, (order) => {
          _push(ssrRenderComponent(unref(Link), {
            key: order.id,
            href: `/admin/orders/${order.id}`,
            class: "flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex items-center gap-4"${_scopeId}><!-- Customer Avatar --><div class="w-10 h-10 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center overflow-hidden"${_scopeId}>`);
                if (order.customerAvatar) {
                  _push2(`<img${ssrRenderAttr("src", order.customerAvatar)}${ssrRenderAttr("alt", order.customerName)} class="w-full h-full object-cover"${_scopeId}>`);
                } else {
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-user",
                    class: "w-5 h-5 text-slate-400"
                  }, null, _parent2, _scopeId));
                }
                _push2(`</div><div${_scopeId}><p class="font-medium text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(order.orderNumber)}</p><div class="flex items-center gap-2 text-sm text-slate-500"${_scopeId}><span${_scopeId}>${ssrInterpolate(order.customerName)}</span><span class="w-1 h-1 bg-slate-300 rounded-full"${_scopeId}></span><span${_scopeId}>${ssrInterpolate(order.itemCount)} item</span></div></div></div><div class="text-right"${_scopeId}><p class="font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(order.total))}</p><div class="flex items-center gap-2 justify-end mt-1"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: unref(getOrderStatusColor)(order.status),
                  variant: "subtle",
                  size: "xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(unref(getOrderStatusLabel)(order.status))}`);
                    } else {
                      return [
                        createTextVNode(
                          toDisplayString(unref(getOrderStatusLabel)(order.status)),
                          1
                          /* TEXT */
                        )
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(`</div><p class="text-xs text-slate-400 mt-1"${_scopeId}>${ssrInterpolate(unref(formatRelativeDate)(order.createdAt))}</p></div>`);
              } else {
                return [
                  createVNode("div", { class: "flex items-center gap-4" }, [
                    createCommentVNode(" Customer Avatar "),
                    createVNode("div", { class: "w-10 h-10 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-xl flex items-center justify-center overflow-hidden" }, [
                      order.customerAvatar ? (openBlock(), createBlock("img", {
                        key: 0,
                        src: order.customerAvatar,
                        alt: order.customerName,
                        class: "w-full h-full object-cover"
                      }, null, 8, ["src", "alt"])) : (openBlock(), createBlock(_component_UIcon, {
                        key: 1,
                        name: "i-heroicons-user",
                        class: "w-5 h-5 text-slate-400"
                      }))
                    ]),
                    createVNode("div", null, [
                      createVNode(
                        "p",
                        { class: "font-medium text-slate-900 dark:text-white" },
                        toDisplayString(order.orderNumber),
                        1
                        /* TEXT */
                      ),
                      createVNode("div", { class: "flex items-center gap-2 text-sm text-slate-500" }, [
                        createVNode(
                          "span",
                          null,
                          toDisplayString(order.customerName),
                          1
                          /* TEXT */
                        ),
                        createVNode("span", { class: "w-1 h-1 bg-slate-300 rounded-full" }),
                        createVNode(
                          "span",
                          null,
                          toDisplayString(order.itemCount) + " item",
                          1
                          /* TEXT */
                        )
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "text-right" }, [
                    createVNode(
                      "p",
                      { class: "font-semibold text-slate-900 dark:text-white" },
                      toDisplayString(unref(formatCurrency)(order.total)),
                      1
                      /* TEXT */
                    ),
                    createVNode("div", { class: "flex items-center gap-2 justify-end mt-1" }, [
                      createVNode(_component_UBadge, {
                        color: unref(getOrderStatusColor)(order.status),
                        variant: "subtle",
                        size: "xs"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(unref(getOrderStatusLabel)(order.status)),
                            1
                            /* TEXT */
                          )
                        ]),
                        _: 2
                        /* DYNAMIC */
                      }, 1032, ["color"])
                    ]),
                    createVNode(
                      "p",
                      { class: "text-xs text-slate-400 mt-1" },
                      toDisplayString(unref(formatRelativeDate)(order.createdAt)),
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
        _push(`<!--]--></div>`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="p-12 text-center"><div class="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-inbox",
          class: "w-10 h-10 text-slate-400"
        }, null, _parent));
        _push(`</div><p class="text-slate-500 dark:text-slate-400 font-medium">Belum ada pesanan</p><p class="text-sm text-slate-400 mt-1">Pesanan baru akan muncul di sini</p></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardRecentOrders.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "DashboardTopProducts",
  __ssrInlineRender: true,
  props: {
    products: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      const _component_UBadge = _sfc_main$o;
      const _component_UButton = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800" }, _attrs))}><!-- Header --><div class="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-600 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-fire",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-slate-900 dark:text-white">Produk Terlaris</h2></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: "/admin/analytics/products",
        class: "text-sm text-violet-600 hover:text-violet-500 font-medium flex items-center gap-1"
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
      _push(`</div><!-- Products List -->`);
      if (__props.products && __props.products.length > 0) {
        _push(`<div class="divide-y divide-slate-100 dark:divide-slate-800"><!--[-->`);
        ssrRenderList(__props.products, (product, index) => {
          _push(ssrRenderComponent(unref(Link), {
            key: product.id,
            href: `/admin/products/${product.id}`,
            class: "flex items-center gap-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!-- Rank Badge --><div class="${ssrRenderClass([
                  "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                  index === 0 ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" : index === 1 ? "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300" : index === 2 ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                ])}"${_scopeId}>${ssrInterpolate(index + 1)}</div><!-- Product Image --><div class="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0"${_scopeId}>`);
                if (product.image) {
                  _push2(`<img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover"${_scopeId}>`);
                } else {
                  _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-cube",
                    class: "w-6 h-6 text-slate-400"
                  }, null, _parent2, _scopeId));
                  _push2(`</div>`);
                }
                _push2(`</div><!-- Product Info --><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium text-slate-900 dark:text-white truncate"${_scopeId}>${ssrInterpolate(product.name)}</p><div class="flex items-center gap-2 text-sm"${_scopeId}>`);
                if (product.discountPrice) {
                  _push2(`<span class="text-red-500 font-semibold"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(product.discountPrice))}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<span class="${ssrRenderClass(product.discountPrice ? "line-through text-slate-400 text-xs" : "text-slate-600 dark:text-slate-400")}"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(product.price))}</span>`);
                if (product.discountPrice) {
                  _push2(ssrRenderComponent(_component_UBadge, {
                    color: "red",
                    variant: "subtle",
                    size: "xs"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(` -${ssrInterpolate(unref(calculateDiscountPercent)(product.price, product.discountPrice))}% `);
                      } else {
                        return [
                          createTextVNode(
                            " -" + toDisplayString(unref(calculateDiscountPercent)(product.price, product.discountPrice)) + "% ",
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
                _push2(`</div></div><!-- Sales & Stock --><div class="text-right shrink-0"${_scopeId}><p class="font-semibold text-slate-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatNumber)(product.totalSold))} <span class="text-xs text-slate-400 font-normal"${_scopeId}>terjual</span></p><p class="${ssrRenderClass([
                  "text-xs",
                  product.stock < 10 ? "text-red-500" : "text-slate-400"
                ])}"${_scopeId}> Stok: ${ssrInterpolate(unref(formatNumber)(product.stock))}</p></div>`);
              } else {
                return [
                  createCommentVNode(" Rank Badge "),
                  createVNode(
                    "div",
                    {
                      class: [
                        "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm shrink-0",
                        index === 0 ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" : index === 1 ? "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300" : index === 2 ? "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                      ]
                    },
                    toDisplayString(index + 1),
                    3
                    /* TEXT, CLASS */
                  ),
                  createCommentVNode(" Product Image "),
                  createVNode("div", { class: "w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden shrink-0" }, [
                    product.image ? (openBlock(), createBlock("img", {
                      key: 0,
                      src: product.image,
                      alt: product.name,
                      class: "w-full h-full object-cover"
                    }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "w-full h-full flex items-center justify-center"
                    }, [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-cube",
                        class: "w-6 h-6 text-slate-400"
                      })
                    ]))
                  ]),
                  createCommentVNode(" Product Info "),
                  createVNode("div", { class: "flex-1 min-w-0" }, [
                    createVNode(
                      "p",
                      { class: "font-medium text-slate-900 dark:text-white truncate" },
                      toDisplayString(product.name),
                      1
                      /* TEXT */
                    ),
                    createVNode("div", { class: "flex items-center gap-2 text-sm" }, [
                      product.discountPrice ? (openBlock(), createBlock(
                        "span",
                        {
                          key: 0,
                          class: "text-red-500 font-semibold"
                        },
                        toDisplayString(unref(formatCurrency)(product.discountPrice)),
                        1
                        /* TEXT */
                      )) : createCommentVNode("v-if", true),
                      createVNode(
                        "span",
                        {
                          class: product.discountPrice ? "line-through text-slate-400 text-xs" : "text-slate-600 dark:text-slate-400"
                        },
                        toDisplayString(unref(formatCurrency)(product.price)),
                        3
                        /* TEXT, CLASS */
                      ),
                      product.discountPrice ? (openBlock(), createBlock(
                        _component_UBadge,
                        {
                          key: 1,
                          color: "red",
                          variant: "subtle",
                          size: "xs"
                        },
                        {
                          default: withCtx(() => [
                            createTextVNode(
                              " -" + toDisplayString(unref(calculateDiscountPercent)(product.price, product.discountPrice)) + "% ",
                              1
                              /* TEXT */
                            )
                          ]),
                          _: 2
                          /* DYNAMIC */
                        },
                        1024
                        /* DYNAMIC_SLOTS */
                      )) : createCommentVNode("v-if", true)
                    ])
                  ]),
                  createCommentVNode(" Sales & Stock "),
                  createVNode("div", { class: "text-right shrink-0" }, [
                    createVNode("p", { class: "font-semibold text-slate-900 dark:text-white" }, [
                      createTextVNode(
                        toDisplayString(unref(formatNumber)(product.totalSold)) + " ",
                        1
                        /* TEXT */
                      ),
                      createVNode("span", { class: "text-xs text-slate-400 font-normal" }, "terjual")
                    ]),
                    createVNode(
                      "p",
                      {
                        class: [
                          "text-xs",
                          product.stock < 10 ? "text-red-500" : "text-slate-400"
                        ]
                      },
                      " Stok: " + toDisplayString(unref(formatNumber)(product.stock)),
                      3
                      /* TEXT, CLASS */
                    )
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
        _push(`<!--[--><!-- Empty State --><div class="p-12 text-center"><div class="w-20 h-20 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-4">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-cube",
          class: "w-10 h-10 text-slate-400"
        }, null, _parent));
        _push(`</div><p class="text-slate-500 dark:text-slate-400 font-medium">Belum ada produk</p><p class="text-sm text-slate-400 mt-1">Tambahkan produk pertama Anda</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/admin/products/create",
          color: "primary",
          variant: "soft",
          size: "sm",
          class: "mt-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-plus",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Tambah Produk `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-plus",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" Tambah Produk ")
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

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardTopProducts.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DashboardPerformance",
  __ssrInlineRender: true,
  props: {
    admin: { default: () => ({ id: 0, name: "", email: "", avatar: null, role: "admin" }) },
    performance: { default: () => ({ rating: 0, totalReviews: 0, totalSales: 0, orderCompletionRate: 0, responseRate: 0, averageResponseTime: 0 }) }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800" }, _attrs))}><!-- Header --><div class="p-5 border-b border-slate-200 dark:border-slate-800"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-amber-500 to-orange-600 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-trophy",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><h2 class="font-semibold text-slate-900 dark:text-white">Performa Toko</h2></div></div><!-- Performance Metrics --><div class="p-5 space-y-5"><!-- Rating --><div><div class="flex items-center justify-between mb-2"><span class="text-sm text-slate-500 dark:text-slate-400">Rating Toko</span><div class="flex items-center gap-1">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star-solid",
        class: "w-5 h-5 text-amber-400"
      }, null, _parent));
      _push(`<span class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(Number(__props.admin.rating || 0).toFixed(1))}</span><span class="text-slate-400 text-sm">/5</span></div></div><div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="h-full bg-linear-to-r from-amber-400 to-orange-500 rounded-full transition-all" style="${ssrRenderStyle({ width: `${Number(__props.admin.rating || 0) / 5 * 100}%` })}"></div></div><p class="text-xs text-slate-400 mt-1">${ssrInterpolate(unref(formatNumber)(__props.performance.totalReviews))} ulasan </p></div><!-- Total Sales --><div><div class="flex items-center justify-between mb-2"><span class="text-sm text-slate-500 dark:text-slate-400">Total Penjualan</span><span class="font-bold text-slate-900 dark:text-white">${ssrInterpolate(unref(formatNumber)(__props.performance.totalSales))}</span></div><div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="h-full bg-linear-to-r from-violet-500 to-fuchsia-500 rounded-full" style="${ssrRenderStyle({ width: `${Math.min(__props.performance.totalSales / 1e3 * 100, 100)}%` })}"></div></div><p class="text-xs text-slate-400 mt-1">Target: 1.000 penjualan</p></div><!-- Response Rate --><div><div class="flex items-center justify-between mb-2"><span class="text-sm text-slate-500 dark:text-slate-400">Tingkat Respons</span><span class="font-bold text-emerald-500">${ssrInterpolate(__props.performance.responseRate)}%</span></div><div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="h-full bg-linear-to-r from-emerald-500 to-teal-500 rounded-full" style="${ssrRenderStyle({ width: `${__props.performance.responseRate}%` })}"></div></div><p class="text-xs text-slate-400 mt-1"> Rata-rata respons: ${ssrInterpolate(__props.performance.averageResponseTime)} menit </p></div><!-- Order Completion Rate --><div><div class="flex items-center justify-between mb-2"><span class="text-sm text-slate-500 dark:text-slate-400">Tingkat Penyelesaian</span><span class="font-bold text-blue-500">${ssrInterpolate(__props.performance.orderCompletionRate)}%</span></div><div class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full" style="${ssrRenderStyle({ width: `${__props.performance.orderCompletionRate}%` })}"></div></div><p class="text-xs text-slate-400 mt-1">Pesanan berhasil dikirim</p></div></div></div>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardPerformance.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DashboardTipsCard",
  __ssrInlineRender: true,
  setup(__props) {
    const vapeTips = [
      "Upload foto produk dengan background bersih dan pencahayaan yang baik",
      "Lengkapi spesifikasi produk seperti wattage, kapasitas tank, dan coil resistance",
      "Berikan deskripsi rasa liquid secara detail untuk membantu customer",
      "Pastikan stok selalu update untuk menghindari pembatalan pesanan",
      'Tambahkan label "Best Seller" pada produk terlaris untuk menarik pembeli',
      "Respond chat pembeli dalam waktu 15 menit untuk rating yang lebih baik",
      "Gunakan foto produk asli untuk meningkatkan kepercayaan pembeli",
      "Update harga secara berkala agar tetap kompetitif di pasar"
    ];
    const currentTip = computed(() => {
      const today = (/* @__PURE__ */ new Date()).toDateString();
      const seed = today.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
      return vapeTips[seed % vapeTips.length];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-5 bg-linear-to-br from-violet-500/10 to-fuchsia-500/10 border border-violet-500/20 rounded-2xl" }, _attrs))}><div class="flex items-start gap-3"><div class="w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shrink-0">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-light-bulb",
        class: "w-5 h-5 text-white"
      }, null, _parent));
      _push(`</div><div><p class="font-semibold text-violet-700 dark:text-violet-300">💡 Tips Admin</p><p class="text-sm text-violet-600 dark:text-violet-400 mt-1">${ssrInterpolate(currentTip.value)}</p></div></div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardTipsCard.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DashboardProductCategories",
  __ssrInlineRender: true,
  setup(__props) {
    const categories = [
      {
        label: "Device/Mod",
        to: "/admin/products?category=device",
        color: "from-violet-500 to-purple-600"
      },
      {
        label: "Liquid",
        to: "/admin/products?category=liquid",
        color: "from-blue-500 to-cyan-600"
      },
      {
        label: "Coil",
        to: "/admin/products?category=coil",
        color: "from-orange-500 to-red-600"
      },
      {
        label: "Aksesoris",
        to: "/admin/products?category=accessories",
        color: "from-emerald-500 to-teal-600"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5" }, _attrs))}><h3 class="font-semibold text-slate-900 dark:text-white mb-3">Kategori Produk</h3><div class="grid grid-cols-2 gap-2"><!--[-->`);
      ssrRenderList(categories, (category) => {
        _push(ssrRenderComponent(unref(Link), {
          key: category.label,
          href: category.to,
          class: "p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-violet-100 dark:hover:bg-violet-900/20 transition-all text-center group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!-- Device/Mod Icon - Vape Box Mod -->`);
              if (category.label === "Device/Mod") {
                _push2(`<div class="flex justify-center"${_scopeId}><div class="${ssrRenderClass(["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform", category.color])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><!-- Vape mod body --><rect x="7" y="2" width="10" height="20" rx="2" ry="2"${_scopeId}></rect><!-- Screen --><rect x="9" y="5" width="6" height="4" rx="1"${_scopeId}></rect><!-- Fire button --><circle cx="12" cy="13" r="2"${_scopeId}></circle><!-- Battery indicator --><line x1="10" y1="18" x2="14" y2="18"${_scopeId}></line></svg></div></div>`);
              } else if (category.label === "Liquid") {
                _push2(`<!--[--><!-- Liquid Icon - E-Liquid Bottle --><div class="flex justify-center"${_scopeId}><div class="${ssrRenderClass(["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform", category.color])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><!-- Bottle body --><path d="M10 2h4v4l2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-2V2z"${_scopeId}></path><!-- Dropper tip --><path d="M10 2h4v2h-4z"${_scopeId}></path><!-- Liquid level --><path d="M8 14h8"${_scopeId}></path><!-- Droplet --><circle cx="12" cy="17" r="1"${_scopeId}></circle></svg></div></div><!--]-->`);
              } else if (category.label === "Coil") {
                _push2(`<!--[--><!-- Coil Icon - Heating Coil --><div class="flex justify-center"${_scopeId}><div class="${ssrRenderClass(["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform", category.color])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><!-- Coil spiral --><path d="M12 4c-2 0-4 1-4 3s2 3 4 3 4 1 4 3-2 3-4 3"${_scopeId}></path><!-- Heat waves --><path d="M8 2v2"${_scopeId}></path><path d="M16 2v2"${_scopeId}></path><path d="M8 20v2"${_scopeId}></path><path d="M16 20v2"${_scopeId}></path><!-- Center pin --><line x1="12" y1="18" x2="12" y2="22"${_scopeId}></line><line x1="12" y1="2" x2="12" y2="4"${_scopeId}></line></svg></div></div><!--]-->`);
              } else {
                _push2(`<!--[--><!-- Accessories Icon - Tools/Parts --><div class="flex justify-center"${_scopeId}><div class="${ssrRenderClass(["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform", category.color])}"${_scopeId}><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"${_scopeId}><!-- Battery --><rect x="4" y="8" width="16" height="8" rx="2"${_scopeId}></rect><line x1="22" y1="10" x2="22" y2="14"${_scopeId}></line><!-- Plus sign --><line x1="8" y1="12" x2="10" y2="12"${_scopeId}></line><!-- Minus sign --><line x1="14" y1="12" x2="16" y2="12"${_scopeId}></line></svg></div></div><!--]-->`);
              }
              _push2(`<p class="text-xs text-slate-600 dark:text-slate-400 mt-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors font-medium"${_scopeId}>${ssrInterpolate(category.label)}</p>`);
            } else {
              return [
                createCommentVNode(" Device/Mod Icon - Vape Box Mod "),
                category.label === "Device/Mod" ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex justify-center"
                }, [
                  createVNode(
                    "div",
                    {
                      class: ["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform", category.color]
                    },
                    [
                      (openBlock(), createBlock("svg", {
                        xmlns: "http://www.w3.org/2000/svg",
                        class: "w-5 h-5 text-white",
                        viewBox: "0 0 24 24",
                        fill: "none",
                        stroke: "currentColor",
                        "stroke-width": "2",
                        "stroke-linecap": "round",
                        "stroke-linejoin": "round"
                      }, [
                        createCommentVNode(" Vape mod body "),
                        createVNode("rect", {
                          x: "7",
                          y: "2",
                          width: "10",
                          height: "20",
                          rx: "2",
                          ry: "2"
                        }),
                        createCommentVNode(" Screen "),
                        createVNode("rect", {
                          x: "9",
                          y: "5",
                          width: "6",
                          height: "4",
                          rx: "1"
                        }),
                        createCommentVNode(" Fire button "),
                        createVNode("circle", {
                          cx: "12",
                          cy: "13",
                          r: "2"
                        }),
                        createCommentVNode(" Battery indicator "),
                        createVNode("line", {
                          x1: "10",
                          y1: "18",
                          x2: "14",
                          y2: "18"
                        })
                      ]))
                    ],
                    2
                    /* CLASS */
                  )
                ])) : category.label === "Liquid" ? (openBlock(), createBlock(
                  Fragment,
                  { key: 1 },
                  [
                    createCommentVNode(" Liquid Icon - E-Liquid Bottle "),
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode(
                        "div",
                        {
                          class: ["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform", category.color]
                        },
                        [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "w-5 h-5 text-white",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          }, [
                            createCommentVNode(" Bottle body "),
                            createVNode("path", { d: "M10 2h4v4l2 2v12a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8l2-2V2z" }),
                            createCommentVNode(" Dropper tip "),
                            createVNode("path", { d: "M10 2h4v2h-4z" }),
                            createCommentVNode(" Liquid level "),
                            createVNode("path", { d: "M8 14h8" }),
                            createCommentVNode(" Droplet "),
                            createVNode("circle", {
                              cx: "12",
                              cy: "17",
                              r: "1"
                            })
                          ]))
                        ],
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : category.label === "Coil" ? (openBlock(), createBlock(
                  Fragment,
                  { key: 2 },
                  [
                    createCommentVNode(" Coil Icon - Heating Coil "),
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode(
                        "div",
                        {
                          class: ["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform", category.color]
                        },
                        [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "w-5 h-5 text-white",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          }, [
                            createCommentVNode(" Coil spiral "),
                            createVNode("path", { d: "M12 4c-2 0-4 1-4 3s2 3 4 3 4 1 4 3-2 3-4 3" }),
                            createCommentVNode(" Heat waves "),
                            createVNode("path", { d: "M8 2v2" }),
                            createVNode("path", { d: "M16 2v2" }),
                            createVNode("path", { d: "M8 20v2" }),
                            createVNode("path", { d: "M16 20v2" }),
                            createCommentVNode(" Center pin "),
                            createVNode("line", {
                              x1: "12",
                              y1: "18",
                              x2: "12",
                              y2: "22"
                            }),
                            createVNode("line", {
                              x1: "12",
                              y1: "2",
                              x2: "12",
                              y2: "4"
                            })
                          ]))
                        ],
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )) : (openBlock(), createBlock(
                  Fragment,
                  { key: 3 },
                  [
                    createCommentVNode(" Accessories Icon - Tools/Parts "),
                    createVNode("div", { class: "flex justify-center" }, [
                      createVNode(
                        "div",
                        {
                          class: ["w-10 h-10 rounded-xl bg-linear-to-br flex items-center justify-center group-hover:scale-110 transition-transform", category.color]
                        },
                        [
                          (openBlock(), createBlock("svg", {
                            xmlns: "http://www.w3.org/2000/svg",
                            class: "w-5 h-5 text-white",
                            viewBox: "0 0 24 24",
                            fill: "none",
                            stroke: "currentColor",
                            "stroke-width": "2",
                            "stroke-linecap": "round",
                            "stroke-linejoin": "round"
                          }, [
                            createCommentVNode(" Battery "),
                            createVNode("rect", {
                              x: "4",
                              y: "8",
                              width: "16",
                              height: "8",
                              rx: "2"
                            }),
                            createVNode("line", {
                              x1: "22",
                              y1: "10",
                              x2: "22",
                              y2: "14"
                            }),
                            createCommentVNode(" Plus sign "),
                            createVNode("line", {
                              x1: "8",
                              y1: "12",
                              x2: "10",
                              y2: "12"
                            }),
                            createCommentVNode(" Minus sign "),
                            createVNode("line", {
                              x1: "14",
                              y1: "12",
                              x2: "16",
                              y2: "12"
                            })
                          ]))
                        ],
                        2
                        /* CLASS */
                      )
                    ])
                  ],
                  2112
                  /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */
                )),
                createVNode(
                  "p",
                  { class: "text-xs text-slate-600 dark:text-slate-400 mt-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors font-medium" },
                  toDisplayString(category.label),
                  1
                  /* TEXT */
                )
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

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardProductCategories.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DashboardHealthWidget",
  __ssrInlineRender: true,
  setup(__props) {
    const healthData = ref(null);
    const loading = ref(true);
    const error = ref(null);
    let refreshInterval = null;
    const fetchHealth = async () => {
      try {
        error.value = null;
        const response = await fetch("/admin/api/health");
        const result = await response.json();
        if (result.success) {
          healthData.value = result.data;
        } else {
          error.value = result.message || "Failed to fetch health data";
        }
      } catch (err) {
        error.value = "Failed to connect to server";
      } finally {
        loading.value = false;
      }
    };
    const refreshHealth = async () => {
      await fetchHealth();
    };
    const overallStatus = computed(() => {
      if (!healthData.value) return "unknown";
      const statuses = Object.values(healthData.value.services);
      if (statuses.some((s) => s.status === "unhealthy")) return "unhealthy";
      if (statuses.some((s) => s.status === "degraded")) return "degraded";
      return "healthy";
    });
    const statusConfig = {
      healthy: {
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        icon: "i-heroicons-check-circle",
        label: "Sehat"
      },
      degraded: {
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        icon: "i-heroicons-exclamation-triangle",
        label: "Degradasi"
      },
      unhealthy: {
        color: "text-red-500",
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        icon: "i-heroicons-x-circle",
        label: "Tidak Sehat"
      },
      unknown: {
        color: "text-gray-500",
        bg: "bg-gray-500/10",
        border: "border-gray-500/20",
        icon: "i-heroicons-question-mark-circle",
        label: "Unknown"
      }
    };
    const getStatusConfig = (status) => {
      return statusConfig[status] || statusConfig.unknown;
    };
    const formatUptime = (seconds) => {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor(seconds % 86400 / 3600);
      const minutes = Math.floor(seconds % 3600 / 60);
      if (days > 0) return `${days}h ${hours}j ${minutes}m`;
      if (hours > 0) return `${hours}j ${minutes}m`;
      return `${minutes}m`;
    };
    const services = computed(() => {
      if (!healthData.value) return [];
      return [
        {
          key: "database",
          name: "Database",
          icon: "i-heroicons-circle-stack",
          ...healthData.value.services.database
        },
        {
          key: "redis",
          name: "Redis",
          icon: "i-heroicons-server",
          ...healthData.value.services.redis
        },
        {
          key: "queue",
          name: "Queue",
          icon: "i-heroicons-queue-list",
          ...healthData.value.services.queue
        }
      ];
    });
    onMounted(() => {
      fetchHealth();
      refreshInterval = setInterval(fetchHealth, 3e4);
    });
    onUnmounted(() => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      const _component_UButton = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden" }, _attrs))}><!-- Header --><div class="p-4 border-b border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500 to-blue-600 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-heart",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold text-slate-900 dark:text-white">System Health</h3></div><div class="flex items-center gap-2"><!-- Overall status badge -->`);
      if (healthData.value) {
        _push(`<span class="${ssrRenderClass([
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
          getStatusConfig(overallStatus.value).bg,
          getStatusConfig(overallStatus.value).color
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: getStatusConfig(overallStatus.value).icon,
          class: "w-3 h-3"
        }, null, _parent));
        _push(` ${ssrInterpolate(getStatusConfig(overallStatus.value).label)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-arrow-path",
        color: "neutral",
        variant: "ghost",
        size: "xs",
        loading: loading.value,
        onClick: refreshHealth
      }, null, _parent));
      _push(`</div></div></div><!-- Content --><div class="p-4 space-y-4"><!-- Loading state -->`);
      if (loading.value && !healthData.value) {
        _push(`<div class="flex items-center justify-center py-8">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-6 h-6 text-slate-400 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (error.value) {
        _push(`<!--[--><!-- Error state --><div class="flex flex-col items-center justify-center py-6 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-10 h-10 text-red-400 mb-2"
        }, null, _parent));
        _push(`<p class="text-sm text-slate-500 dark:text-slate-400">${ssrInterpolate(error.value)}</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          label: "Coba Lagi",
          color: "primary",
          variant: "ghost",
          size: "xs",
          class: "mt-2",
          onClick: refreshHealth
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (healthData.value) {
        _push(`<!--[--><!-- Health data --><!-- Services Status --><div class="space-y-2"><!--[-->`);
        ssrRenderList(services.value, (service) => {
          _push(`<div class="${ssrRenderClass([
            "flex items-center justify-between p-3 rounded-xl",
            getStatusConfig(service.status).bg,
            "border",
            getStatusConfig(service.status).border
          ])}"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: service.icon,
            class: ["w-5 h-5", getStatusConfig(service.status).color]
          }, null, _parent));
          _push(`<div><p class="font-medium text-sm text-slate-900 dark:text-white">${ssrInterpolate(service.name)}</p><p class="text-xs text-slate-500 dark:text-slate-400">${ssrInterpolate(service.message)}</p></div></div><div class="text-right">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: getStatusConfig(service.status).icon,
            class: ["w-5 h-5", getStatusConfig(service.status).color]
          }, null, _parent));
          if (service.latency) {
            _push(`<p class="text-xs text-slate-400 mt-1">${ssrInterpolate(service.latency)}ms </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div>`);
        });
        _push(`<!--]--></div><!-- Memory & Uptime --><div class="grid grid-cols-2 gap-3"><!-- Memory --><div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"><div class="flex items-center gap-2 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-cpu-chip",
          class: "w-4 h-4 text-slate-400"
        }, null, _parent));
        _push(`<span class="text-xs font-medium text-slate-500 dark:text-slate-400">Memory</span></div><div class="flex items-end gap-2"><span class="text-lg font-bold text-slate-900 dark:text-white">${ssrInterpolate(healthData.value.memory.percentage)}% </span><span class="text-xs text-slate-400 mb-0.5">${ssrInterpolate(healthData.value.memory.used)}MB / ${ssrInterpolate(healthData.value.memory.total)}MB </span></div><div class="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="${ssrRenderClass([
          "h-full rounded-full transition-all",
          healthData.value.memory.percentage > 80 ? "bg-red-500" : healthData.value.memory.percentage > 60 ? "bg-amber-500" : "bg-emerald-500"
        ])}" style="${ssrRenderStyle({ width: `${healthData.value.memory.percentage}%` })}"></div></div></div><!-- Uptime --><div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"><div class="flex items-center gap-2 mb-2">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-clock",
          class: "w-4 h-4 text-slate-400"
        }, null, _parent));
        _push(`<span class="text-xs font-medium text-slate-500 dark:text-slate-400">Uptime</span></div><div class="flex items-end gap-2"><span class="text-lg font-bold text-slate-900 dark:text-white">${ssrInterpolate(formatUptime(healthData.value.uptime))}</span></div><p class="text-xs text-slate-400 mt-2">Server aktif</p></div></div><!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardHealthWidget.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DashboardQueueWidget",
  __ssrInlineRender: true,
  props: {
    isSuperAdmin: { type: Boolean }
  },
  setup(__props) {
    const props = __props;
    const queueStats = ref(null);
    const failedJobs = ref([]);
    const loading = ref(true);
    const actionLoading = ref(false);
    const error = ref(null);
    const showFailedJobs = ref(false);
    let refreshInterval = null;
    const fetchQueueStats = async () => {
      try {
        error.value = null;
        const response = await fetch("/admin/api/queue-stats");
        const result = await response.json();
        if (result.success) {
          queueStats.value = result.data;
        } else {
          error.value = result.message || "Failed to fetch queue stats";
        }
      } catch (err) {
        error.value = "Failed to connect to server";
      } finally {
        loading.value = false;
      }
    };
    const fetchFailedJobs = async () => {
      try {
        const response = await fetch("/admin/queue/email/failed");
        const result = await response.json();
        if (result.success) {
          failedJobs.value = result.data;
        }
      } catch (err) {
        console.error("Failed to fetch failed jobs:", err);
      }
    };
    const retryJob = async (jobId) => {
      if (!props.isSuperAdmin) return;
      actionLoading.value = true;
      try {
        const response = await fetch(`/admin/queue/email/retry/${jobId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });
        const result = await response.json();
        if (result.success) {
          await fetchQueueStats();
          await fetchFailedJobs();
        }
      } catch (err) {
        console.error("Failed to retry job:", err);
      } finally {
        actionLoading.value = false;
      }
    };
    const removeJob = async (jobId) => {
      if (!props.isSuperAdmin) return;
      actionLoading.value = true;
      try {
        const response = await fetch(`/admin/queue/email/job/${jobId}`, {
          method: "DELETE"
        });
        const result = await response.json();
        if (result.success) {
          await fetchQueueStats();
          await fetchFailedJobs();
        }
      } catch (err) {
        console.error("Failed to remove job:", err);
      } finally {
        actionLoading.value = false;
      }
    };
    const toggleQueuePause = async () => {
      if (!props.isSuperAdmin || !queueStats.value) return;
      actionLoading.value = true;
      const action = queueStats.value.email.isPaused ? "resume" : "pause";
      try {
        const response = await fetch(`/admin/queue/email/${action}`, {
          method: "POST"
        });
        const result = await response.json();
        if (result.success) {
          await fetchQueueStats();
        }
      } catch (err) {
        console.error(`Failed to ${action} queue:`, err);
      } finally {
        actionLoading.value = false;
      }
    };
    const cleanQueue = async () => {
      if (!props.isSuperAdmin) return;
      actionLoading.value = true;
      try {
        const response = await fetch("/admin/queue/email/clean", {
          method: "POST"
        });
        const result = await response.json();
        if (result.success) {
          await fetchQueueStats();
          await fetchFailedJobs();
        }
      } catch (err) {
        console.error("Failed to clean queue:", err);
      } finally {
        actionLoading.value = false;
      }
    };
    const queueStatus = computed(() => {
      if (!queueStats.value) return "unknown";
      if (queueStats.value.email.isPaused) return "paused";
      if (queueStats.value.email.failed > 0) return "warning";
      if (queueStats.value.email.active > 0) return "processing";
      return "idle";
    });
    const statusConfig = {
      processing: {
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        icon: "i-heroicons-arrow-path",
        label: "Processing",
        animate: true
      },
      idle: {
        color: "text-emerald-500",
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        icon: "i-heroicons-check-circle",
        label: "Idle",
        animate: false
      },
      warning: {
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        icon: "i-heroicons-exclamation-triangle",
        label: "Warning",
        animate: false
      },
      paused: {
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        icon: "i-heroicons-pause-circle",
        label: "Paused",
        animate: false
      },
      unknown: {
        color: "text-gray-500",
        bg: "bg-gray-500/10",
        border: "border-gray-500/20",
        icon: "i-heroicons-question-mark-circle",
        label: "Unknown",
        animate: false
      }
    };
    const currentStatusConfig = computed(() => {
      return statusConfig[queueStatus.value] || statusConfig.unknown;
    });
    onMounted(() => {
      fetchQueueStats();
      if (props.isSuperAdmin) {
        fetchFailedJobs();
      }
      refreshInterval = setInterval(() => {
        fetchQueueStats();
        if (props.isSuperAdmin && showFailedJobs.value) {
          fetchFailedJobs();
        }
      }, 15e3);
    });
    onUnmounted(() => {
      if (refreshInterval) {
        clearInterval(refreshInterval);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$i;
      const _component_UButton = _sfc_main$k;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden" }, _attrs))}><!-- Header --><div class="p-4 border-b border-slate-200 dark:border-slate-800"><div class="flex items-center justify-between"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-linear-to-br from-violet-500 to-purple-600 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-queue-list",
        class: "w-4 h-4 text-white"
      }, null, _parent));
      _push(`</div><h3 class="font-semibold text-slate-900 dark:text-white">Email Queue</h3></div><div class="flex items-center gap-2"><!-- Status badge -->`);
      if (queueStats.value) {
        _push(`<span class="${ssrRenderClass([
          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
          currentStatusConfig.value.bg,
          currentStatusConfig.value.color
        ])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: currentStatusConfig.value.icon,
          class: ["w-3 h-3", currentStatusConfig.value.animate ? "animate-spin" : ""]
        }, null, _parent));
        _push(` ${ssrInterpolate(currentStatusConfig.value.label)}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-arrow-path",
        color: "neutral",
        variant: "ghost",
        size: "xs",
        loading: loading.value,
        onClick: fetchQueueStats
      }, null, _parent));
      _push(`</div></div></div><!-- Content --><div class="p-4 space-y-4"><!-- Loading state -->`);
      if (loading.value && !queueStats.value) {
        _push(`<div class="flex items-center justify-center py-8">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-6 h-6 text-slate-400 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else if (error.value) {
        _push(`<!--[--><!-- Error state --><div class="flex flex-col items-center justify-center py-6 text-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-exclamation-circle",
          class: "w-10 h-10 text-red-400 mb-2"
        }, null, _parent));
        _push(`<p class="text-sm text-slate-500 dark:text-slate-400">${ssrInterpolate(error.value)}</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          label: "Coba Lagi",
          color: "primary",
          variant: "ghost",
          size: "xs",
          class: "mt-2",
          onClick: fetchQueueStats
        }, null, _parent));
        _push(`</div><!--]-->`);
      } else if (queueStats.value) {
        _push(`<!--[--><!-- Queue Stats --><!-- Stats Grid --><div class="grid grid-cols-3 gap-2"><div class="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-center"><p class="text-2xl font-bold text-blue-600 dark:text-blue-400">${ssrInterpolate(queueStats.value.email.waiting)}</p><p class="text-xs text-blue-500/80 dark:text-blue-400/80">Menunggu</p></div><div class="p-3 bg-violet-50 dark:bg-violet-500/10 rounded-xl text-center"><p class="text-2xl font-bold text-violet-600 dark:text-violet-400">${ssrInterpolate(queueStats.value.email.active)}</p><p class="text-xs text-violet-500/80 dark:text-violet-400/80">Aktif</p></div><div class="p-3 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl text-center"><p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${ssrInterpolate(queueStats.value.email.completed)}</p><p class="text-xs text-emerald-500/80 dark:text-emerald-400/80">Selesai</p></div></div><!-- Additional stats --><div class="grid grid-cols-2 gap-3"><div class="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl"><div class="flex items-center justify-between"><span class="text-sm text-slate-600 dark:text-slate-400">Success Rate</span><span class="${ssrRenderClass([
          "text-sm font-bold",
          queueStats.value.totals.successRate >= 90 ? "text-emerald-500" : queueStats.value.totals.successRate >= 70 ? "text-amber-500" : "text-red-500"
        ])}">${ssrInterpolate(queueStats.value.totals.successRate)}% </span></div><div class="mt-2 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden"><div class="${ssrRenderClass([
          "h-full rounded-full transition-all",
          queueStats.value.totals.successRate >= 90 ? "bg-emerald-500" : queueStats.value.totals.successRate >= 70 ? "bg-amber-500" : "bg-red-500"
        ])}" style="${ssrRenderStyle({ width: `${queueStats.value.totals.successRate}%` })}"></div></div></div><div class="p-3 bg-red-50 dark:bg-red-500/10 rounded-xl"><div class="flex items-center justify-between"><span class="text-sm text-slate-600 dark:text-slate-400">Failed</span><span class="text-sm font-bold text-red-500">${ssrInterpolate(queueStats.value.email.failed)}</span></div><p class="text-xs text-slate-400 mt-2">${ssrInterpolate(queueStats.value.email.delayed)} tertunda </p></div></div><!-- SuperAdmin Actions -->`);
        if (__props.isSuperAdmin) {
          _push(`<div class="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-700"><p class="text-xs font-medium text-slate-500 uppercase">Queue Management</p><div class="flex flex-wrap gap-2">`);
          _push(ssrRenderComponent(_component_UButton, {
            icon: queueStats.value.email.isPaused ? "i-heroicons-play" : "i-heroicons-pause",
            label: queueStats.value.email.isPaused ? "Resume" : "Pause",
            color: queueStats.value.email.isPaused ? "success" : "warning",
            variant: "soft",
            size: "xs",
            loading: actionLoading.value,
            onClick: toggleQueuePause
          }, null, _parent));
          _push(ssrRenderComponent(_component_UButton, {
            icon: "i-heroicons-trash",
            label: "Clean",
            color: "neutral",
            variant: "soft",
            size: "xs",
            loading: actionLoading.value,
            onClick: cleanQueue
          }, null, _parent));
          if (queueStats.value.email.failed > 0) {
            _push(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-eye",
              label: `Failed (${queueStats.value.email.failed})`,
              color: "error",
              variant: "soft",
              size: "xs",
              onClick: ($event) => showFailedJobs.value = !showFailedJobs.value
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div><!-- Failed Jobs List -->`);
          if (showFailedJobs.value && failedJobs.value.length > 0) {
            _push(`<div class="mt-3 space-y-2 max-h-48 overflow-y-auto"><!--[-->`);
            ssrRenderList(failedJobs.value, (job) => {
              _push(`<div class="p-2 bg-red-50 dark:bg-red-500/10 rounded-lg text-xs"><div class="flex items-start justify-between gap-2"><div class="flex-1 min-w-0"><p class="font-medium text-slate-700 dark:text-slate-300 truncate">${ssrInterpolate(job.name)}</p><p class="text-red-500 truncate">${ssrInterpolate(job.failedReason)}</p><p class="text-slate-400">Attempts: ${ssrInterpolate(job.attemptsMade)}</p></div><div class="flex items-center gap-1 shrink-0">`);
              _push(ssrRenderComponent(_component_UButton, {
                icon: "i-heroicons-arrow-path",
                color: "primary",
                variant: "ghost",
                size: "xs",
                loading: actionLoading.value,
                onClick: ($event) => retryJob(job.id)
              }, null, _parent));
              _push(ssrRenderComponent(_component_UButton, {
                icon: "i-heroicons-trash",
                color: "error",
                variant: "ghost",
                size: "xs",
                loading: actionLoading.value,
                onClick: ($event) => removeJob(job.id)
              }, null, _parent));
              _push(`</div></div></div>`);
            });
            _push(`<!--]--></div>`);
          } else if (showFailedJobs.value && failedJobs.value.length === 0) {
            _push(`<p class="text-sm text-slate-400 text-center py-2"> Tidak ada job yang gagal </p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/dashboard/DashboardQueueWidget.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const sidebarOpen = ref(true);
    const mobileSidebarOpen = ref(false);
    const currentPath = ref("");
    const expandedMenus = reactive(/* @__PURE__ */ new Set());
    const page = usePage();
    const flash = computed(() => page.props.flash);
    watch(
      () => flash.value,
      (newFlash) => {
        if (newFlash?.success) {
          toast.success("Berhasil", newFlash.success);
        }
        if (newFlash?.error) {
          toast.error("Gagal", newFlash.error);
        }
      },
      { immediate: true }
    );
    const admin = ref({
      id: 0,
      name: "Admin",
      email: "",
      avatar: null,
      role: "admin",
      storeName: "Admin Panel",
      status: "active",
      rating: 0,
      totalSales: 0
    });
    const badges = ref({
      orderCount: 0,
      notificationCount: 0
    });
    provide("currentAdmin", admin);
    const getToken = () => {
      if (typeof document === "undefined") return "";
      const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
      return match ? decodeURIComponent(match[1]) : "";
    };
    const fetchAdminData = async () => {
      try {
        const response = await fetch("/admin/api/me", {
          headers: { Accept: "application/json" }
        });
        const data = await response.json();
        if (data.success && data.admin) {
          admin.value = data.admin;
        }
      } catch (error) {
        console.error("Failed to fetch admin data:", error);
      }
    };
    const logout = async () => {
      try {
        await fetch("/admin/logout", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "X-XSRF-TOKEN": getToken()
          }
        });
        window.location.href = "/admin/login";
      } catch (error) {
        console.error("Logout error:", error);
      }
    };
    const toggleSidebar = () => {
      sidebarOpen.value = !sidebarOpen.value;
    };
    const toggleMobileSidebar = () => {
      mobileSidebarOpen.value = !mobileSidebarOpen.value;
    };
    const toggleSubmenu = (label) => {
      if (expandedMenus.has(label)) {
        expandedMenus.delete(label);
      } else {
        expandedMenus.add(label);
      }
    };
    const autoExpandActiveMenus = () => {
      menuItems.forEach((item) => {
        if (item.children) {
          const isActive = item.children.some(
            (child) => currentPath.value.startsWith(child.to.split("?")[0])
          );
          if (isActive) {
            expandedMenus.add(item.label);
          }
        }
      });
    };
    watch(
      () => page.url,
      (newUrl) => {
        currentPath.value = newUrl?.split("?")[0] || "";
        mobileSidebarOpen.value = false;
      }
    );
    onMounted(() => {
      currentPath.value = window.location.pathname;
      fetchAdminData();
      autoExpandActiveMenus();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UApp = _sfc_main$p;
      _push(ssrRenderComponent(_component_UApp, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="min-h-screen bg-slate-100 dark:bg-slate-950" data-v-1bac277e${_scopeId}><!-- Mobile Sidebar Overlay -->`);
            if (mobileSidebarOpen.value) {
              _push2(`<div class="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden" data-v-1bac277e${_scopeId}></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Mobile Sidebar -->`);
            if (mobileSidebarOpen.value) {
              _push2(`<aside class="fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-800 z-50 lg:hidden flex flex-col" data-v-1bac277e${_scopeId}>`);
              _push2(ssrRenderComponent(unref(AdminSidebarLogo), {
                "sidebar-open": true,
                onToggleSidebar: toggleMobileSidebar
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$f), {
                "menu-items": unref(menuItems),
                "current-path": currentPath.value,
                badges: badges.value
              }, null, _parent2, _scopeId));
              _push2(ssrRenderComponent(unref(_sfc_main$e), {
                "sidebar-open": true,
                onLogout: logout
              }, null, _parent2, _scopeId));
              _push2(`</aside>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<!-- Desktop Sidebar --><aside class="${ssrRenderClass([sidebarOpen.value ? "w-72" : "w-20", "fixed inset-y-0 left-0 hidden lg:flex flex-col bg-linear-to-b from-slate-900 via-slate-900 to-slate-800 border-r border-slate-700/50 transition-all duration-300 z-30"])}" data-v-1bac277e${_scopeId}>`);
            _push2(ssrRenderComponent(unref(AdminSidebarLogo), {
              "sidebar-open": sidebarOpen.value,
              onToggleSidebar: toggleSidebar
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$g), {
              "menu-items": unref(menuItems),
              "sidebar-open": sidebarOpen.value,
              "current-path": currentPath.value,
              badges: badges.value,
              "expanded-menus": expandedMenus,
              onToggleSubmenu: toggleSubmenu
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(_sfc_main$e), {
              "sidebar-open": sidebarOpen.value,
              onLogout: logout
            }, null, _parent2, _scopeId));
            _push2(`</aside><!-- Main Content Area --><div class="${ssrRenderClass([sidebarOpen.value ? "lg:ml-72" : "lg:ml-20", "transition-all duration-300"])}" data-v-1bac277e${_scopeId}>`);
            _push2(ssrRenderComponent(unref(_sfc_main$d), {
              admin: admin.value,
              "sidebar-open": sidebarOpen.value,
              onToggleSidebar: toggleSidebar,
              onToggleMobileSidebar: toggleMobileSidebar,
              onLogout: logout
            }, null, _parent2, _scopeId));
            _push2(`<!-- Page Content (slot) --><main class="p-4 lg:p-6 min-h-[calc(100vh-130px)]" data-v-1bac277e${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            _push2(`</main>`);
            _push2(ssrRenderComponent(unref(_sfc_main$c), null, null, _parent2, _scopeId));
            _push2(`</div></div>`);
            _push2(ssrRenderComponent(_sfc_main$q, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("div", { class: "min-h-screen bg-slate-100 dark:bg-slate-950" }, [
                createCommentVNode(" Mobile Sidebar Overlay "),
                createVNode(Transition, { name: "fade" }, {
                  default: withCtx(() => [
                    mobileSidebarOpen.value ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden",
                      onClick: toggleMobileSidebar
                    })) : createCommentVNode("v-if", true)
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createCommentVNode(" Mobile Sidebar "),
                createVNode(Transition, { name: "slide" }, {
                  default: withCtx(() => [
                    mobileSidebarOpen.value ? (openBlock(), createBlock("aside", {
                      key: 0,
                      class: "fixed inset-y-0 left-0 w-72 bg-linear-to-b from-slate-900 via-slate-900 to-slate-800 z-50 lg:hidden flex flex-col"
                    }, [
                      createVNode(unref(AdminSidebarLogo), {
                        "sidebar-open": true,
                        onToggleSidebar: toggleMobileSidebar
                      }),
                      createVNode(unref(_sfc_main$f), {
                        "menu-items": unref(menuItems),
                        "current-path": currentPath.value,
                        badges: badges.value
                      }, null, 8, ["menu-items", "current-path", "badges"]),
                      createVNode(unref(_sfc_main$e), {
                        "sidebar-open": true,
                        onLogout: logout
                      })
                    ])) : createCommentVNode("v-if", true)
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createCommentVNode(" Desktop Sidebar "),
                createVNode(
                  "aside",
                  {
                    class: ["fixed inset-y-0 left-0 hidden lg:flex flex-col bg-linear-to-b from-slate-900 via-slate-900 to-slate-800 border-r border-slate-700/50 transition-all duration-300 z-30", sidebarOpen.value ? "w-72" : "w-20"]
                  },
                  [
                    createVNode(unref(AdminSidebarLogo), {
                      "sidebar-open": sidebarOpen.value,
                      onToggleSidebar: toggleSidebar
                    }, null, 8, ["sidebar-open"]),
                    createVNode(unref(_sfc_main$g), {
                      "menu-items": unref(menuItems),
                      "sidebar-open": sidebarOpen.value,
                      "current-path": currentPath.value,
                      badges: badges.value,
                      "expanded-menus": expandedMenus,
                      onToggleSubmenu: toggleSubmenu
                    }, null, 8, ["menu-items", "sidebar-open", "current-path", "badges", "expanded-menus"]),
                    createVNode(unref(_sfc_main$e), {
                      "sidebar-open": sidebarOpen.value,
                      onLogout: logout
                    }, null, 8, ["sidebar-open"])
                  ],
                  2
                  /* CLASS */
                ),
                createCommentVNode(" Main Content Area "),
                createVNode(
                  "div",
                  {
                    class: ["transition-all duration-300", sidebarOpen.value ? "lg:ml-72" : "lg:ml-20"]
                  },
                  [
                    createVNode(unref(_sfc_main$d), {
                      admin: admin.value,
                      "sidebar-open": sidebarOpen.value,
                      onToggleSidebar: toggleSidebar,
                      onToggleMobileSidebar: toggleMobileSidebar,
                      onLogout: logout
                    }, null, 8, ["admin", "sidebar-open"]),
                    createCommentVNode(" Page Content (slot) "),
                    createVNode("main", { class: "p-4 lg:p-6 min-h-[calc(100vh-130px)]" }, [
                      renderSlot(_ctx.$slots, "default", {}, void 0, true)
                    ]),
                    createVNode(unref(_sfc_main$c))
                  ],
                  2
                  /* CLASS */
                )
              ]),
              createVNode(_sfc_main$q)
            ];
          }
        }),
        _: 3
        /* FORWARDED */
      }, _parent));
    };
  }
});

/* unplugin-vue-components disabled */

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/layouts/admin.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const AdminLayout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1bac277e"]]);

export { AdminLayout as A, _sfc_main$9 as _, _sfc_main$8 as a, _sfc_main$7 as b, _sfc_main$2 as c, _sfc_main$1 as d, _sfc_main$4 as e, _sfc_main$3 as f, getXsrfToken as g };
