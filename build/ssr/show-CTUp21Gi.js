import { _ as _sfc_main$4 } from './Card-h3oZeDee.js';
import { a as _sfc_main$1, _ as _sfc_main$3 } from './Button-BTdvmZ8N.js';
import { a as _sfc_main$2 } from './Badge-CQlYH3Fo.js';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrRenderList } from 'vue/server-renderer';
import { Link } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { f as formatCurrency, b as formatDate } from './finance-BXYpuocZ.js';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import '@vueuse/core';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Tooltip-C54KurGy.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    transaction: {}
  },
  setup(__props) {
    const getAvatarUrl = (avatar) => {
      if (!avatar) {
        return "https://placehold.co/80x80/1a1a2e/ffffff?text=U";
      }
      return avatar;
    };
    const isIncome = (type) => {
      return ["topup", "commission", "refund", "cashback"].includes(type);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UBadge = _sfc_main$2;
      const _component_UIcon = _sfc_main$3;
      const _component_UCard = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-4xl mx-auto space-y-6" }, _attrs))}><!-- Header --><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/finance/transactions" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-arrow-left",
              color: "neutral",
              variant: "ghost",
              size: "sm"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-arrow-left",
                color: "neutral",
                variant: "ghost",
                size: "sm"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<div class="flex-1"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">Detail Transaksi</h1><p class="text-gray-500 dark:text-gray-400">ID: #${ssrInterpolate(__props.transaction.id)}</p></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: __props.transaction.typeColor,
        variant: "soft",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: __props.transaction.typeIcon,
              class: "w-4 h-4 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(__props.transaction.typeLabel)}`);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: __props.transaction.typeIcon,
                class: "w-4 h-4 mr-1"
              }, null, 8, ["name"]),
              createTextVNode(
                " " + toDisplayString(__props.transaction.typeLabel),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UBadge, {
        color: __props.transaction.statusColor,
        variant: "soft",
        size: "lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.transaction.statusLabel)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.transaction.statusLabel),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div><!-- Customer Info -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Customer</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Customer")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-start gap-6"${_scopeId}><img${ssrRenderAttr("src", getAvatarUrl(__props.transaction.customerAvatar))}${ssrRenderAttr("alt", __props.transaction.customerName)} class="w-20 h-20 rounded-full object-cover"${_scopeId}><div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Nama</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.transaction.customerName)}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Email</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.transaction.customerEmail)}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Telepon</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.transaction.customerPhone || "-")}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Saldo Wallet Saat Ini</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.transaction.walletBalance))}</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-start gap-6" }, [
                createVNode("img", {
                  src: getAvatarUrl(__props.transaction.customerAvatar),
                  alt: __props.transaction.customerName,
                  class: "w-20 h-20 rounded-full object-cover"
                }, null, 8, ["src", "alt"]),
                createVNode("div", { class: "flex-1 grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Nama"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.transaction.customerName),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Email"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.transaction.customerEmail),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Telepon"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.transaction.customerPhone || "-"),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Saldo Wallet Saat Ini"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatCurrency)(__props.transaction.walletBalance)),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Transaction Details -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Detail Transaksi</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Detail Transaksi")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div class="space-y-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Jumlah</p><p class="${ssrRenderClass([
              "text-2xl font-bold",
              isIncome(__props.transaction.transactionType) ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"
            ])}"${_scopeId}>${ssrInterpolate(isIncome(__props.transaction.transactionType) ? "+" : "-")} ${ssrInterpolate(unref(formatCurrency)(__props.transaction.amount))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tipe Transaksi</p><div class="flex items-center gap-2 mt-1"${_scopeId}><div class="${ssrRenderClass([`p-1.5 rounded-lg bg-${__props.transaction.typeColor}-100 dark:bg-${__props.transaction.typeColor}-900/30`])}"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: __props.transaction.typeIcon,
              class: [`w-4 h-4 text-${__props.transaction.typeColor}-600 dark:text-${__props.transaction.typeColor}-400`]
            }, null, _parent2, _scopeId));
            _push2(`</div><span class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.transaction.typeLabel)}</span></div></div></div><div class="space-y-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Saldo Sebelum</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.transaction.balanceBefore))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Saldo Sesudah</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.transaction.balanceAfter))}</p></div></div></div>`);
            if (__props.transaction.description) {
              _push2(`<div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Deskripsi</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.transaction.description)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Jumlah"),
                    createVNode(
                      "p",
                      {
                        class: [
                          "text-2xl font-bold",
                          isIncome(__props.transaction.transactionType) ? "text-success-600 dark:text-success-400" : "text-error-600 dark:text-error-400"
                        ]
                      },
                      toDisplayString(isIncome(__props.transaction.transactionType) ? "+" : "-") + " " + toDisplayString(unref(formatCurrency)(__props.transaction.amount)),
                      3
                      /* TEXT, CLASS */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tipe Transaksi"),
                    createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                      createVNode(
                        "div",
                        {
                          class: [`p-1.5 rounded-lg bg-${__props.transaction.typeColor}-100 dark:bg-${__props.transaction.typeColor}-900/30`]
                        },
                        [
                          createVNode(_component_UIcon, {
                            name: __props.transaction.typeIcon,
                            class: [`w-4 h-4 text-${__props.transaction.typeColor}-600 dark:text-${__props.transaction.typeColor}-400`]
                          }, null, 8, ["name", "class"])
                        ],
                        2
                        /* CLASS */
                      ),
                      createVNode(
                        "span",
                        { class: "font-medium text-gray-900 dark:text-white" },
                        toDisplayString(__props.transaction.typeLabel),
                        1
                        /* TEXT */
                      )
                    ])
                  ])
                ]),
                createVNode("div", { class: "space-y-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Saldo Sebelum"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatCurrency)(__props.transaction.balanceBefore)),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Saldo Sesudah"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(unref(formatCurrency)(__props.transaction.balanceAfter)),
                      1
                      /* TEXT */
                    )
                  ])
                ])
              ]),
              __props.transaction.description ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-6 pt-6 border-t border-gray-200 dark:border-gray-700"
              }, [
                createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Deskripsi"),
                createVNode(
                  "p",
                  { class: "font-medium text-gray-900 dark:text-white" },
                  toDisplayString(__props.transaction.description),
                  1
                  /* TEXT */
                )
              ])) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Reference -->`);
      if (__props.transaction.referenceType || __props.transaction.referenceId) {
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Referensi</h3>`);
            } else {
              return [
                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Referensi")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
              if (__props.transaction.referenceType) {
                _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tipe Referensi</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.transaction.referenceType)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.transaction.referenceId) {
                _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>ID Referensi</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>#${ssrInterpolate(__props.transaction.referenceId)}</p></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  __props.transaction.referenceType ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tipe Referensi"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      toDisplayString(__props.transaction.referenceType),
                      1
                      /* TEXT */
                    )
                  ])) : createCommentVNode("v-if", true),
                  __props.transaction.referenceId ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "ID Referensi"),
                    createVNode(
                      "p",
                      { class: "font-medium text-gray-900 dark:text-white" },
                      "#" + toDisplayString(__props.transaction.referenceId),
                      1
                      /* TEXT */
                    )
                  ])) : createCommentVNode("v-if", true)
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Metadata -->`);
      if (__props.transaction.metadata && Object.keys(__props.transaction.metadata).length > 0) {
        _push(ssrRenderComponent(_component_UCard, null, {
          header: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Tambahan</h3>`);
            } else {
              return [
                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Tambahan")
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.transaction.metadata, (value, key) => {
                _push2(`<!--[-->`);
                if (value) {
                  _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400 capitalize"${_scopeId}>${ssrInterpolate(String(key).replace(/_/g, " "))}</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(typeof value === "object" ? JSON.stringify(value) : value)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--]-->`);
              });
              _push2(`<!--]--></div>`);
            } else {
              return [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  (openBlock(true), createBlock(
                    Fragment,
                    null,
                    renderList(__props.transaction.metadata, (value, key) => {
                      return openBlock(), createBlock(
                        Fragment,
                        { key },
                        [
                          value ? (openBlock(), createBlock("div", { key: 0 }, [
                            createVNode(
                              "p",
                              { class: "text-sm text-gray-500 dark:text-gray-400 capitalize" },
                              toDisplayString(String(key).replace(/_/g, " ")),
                              1
                              /* TEXT */
                            ),
                            createVNode(
                              "p",
                              { class: "font-medium text-gray-900 dark:text-white" },
                              toDisplayString(typeof value === "object" ? JSON.stringify(value) : value),
                              1
                              /* TEXT */
                            )
                          ])) : createCommentVNode("v-if", true)
                        ],
                        64
                        /* STABLE_FRAGMENT */
                      );
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
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Timestamps -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Waktu</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Waktu")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Transaksi</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatDate)(__props.transaction.createdAt))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Terakhir Diupdate</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(unref(formatDate)(__props.transaction.updatedAt))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Transaksi"),
                  createVNode(
                    "p",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(unref(formatDate)(__props.transaction.createdAt)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Terakhir Diupdate"),
                  createVNode(
                    "p",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(unref(formatDate)(__props.transaction.updatedAt)),
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

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/finance/transactions/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
