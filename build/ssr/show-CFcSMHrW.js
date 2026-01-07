import { a as _sfc_main$1, _ as _sfc_main$5 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$4 } from './Card-h3oZeDee.js';
import { a as _sfc_main$3 } from './Badge-CQlYH3Fo.js';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { Link } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { _ as _sfc_main$2 } from './PromotionStatusBadge-Bwh-Yb4e.js';
import 'defu';
import 'reka-ui';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
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
import './Tooltip-C54KurGy.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    voucher: {}
  },
  setup(__props) {
    const props = __props;
    const copyCode = () => {
      navigator.clipboard.writeText(props.voucher.code);
    };
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(price);
    };
    const getImageUrl = (url) => {
      if (!url || url === "/images/placeholder.png") {
        return "https://placehold.co/100x100/1a1a2e/ffffff?text=No+Image";
      }
      if (url.startsWith("http://") || url.startsWith("https://")) {
        return url;
      }
      return url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UBadge = _sfc_main$3;
      const _component_UCard = _sfc_main$4;
      const _component_UIcon = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-7xl mx-auto space-y-6" }, _attrs))}><!-- Header --><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/promotions/vouchers" }, {
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
      _push(`<div><div class="flex items-center gap-2"><code class="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-lg font-mono text-primary-600 dark:text-primary-400">${ssrInterpolate(__props.voucher.code)}</code>`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-clipboard-document",
        color: "neutral",
        variant: "ghost",
        size: "sm",
        onClick: copyCode
      }, null, _parent));
      _push(`</div><div class="flex items-center gap-2 mt-2">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        status: __props.voucher.status
      }, null, _parent));
      _push(ssrRenderComponent(_component_UBadge, {
        color: __props.voucher.type === "free_shipping" ? "success" : __props.voucher.type === "percentage" ? "primary" : "info",
        variant: "soft",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.voucher.typeLabel)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.voucher.typeLabel),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (__props.voucher.isPublic) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "info",
          variant: "soft",
          size: "sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Publik `);
            } else {
              return [
                createTextVNode(" Publik ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/admin/promotions/vouchers/${__props.voucher.id}/edit`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-pencil",
              color: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit Voucher `);
                } else {
                  return [
                    createTextVNode(" Edit Voucher ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-pencil",
                color: "primary"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Edit Voucher ")
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
      _push(`</div><!-- Main Content --><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><!-- Left Column --><div class="lg:col-span-2 space-y-6"><!-- Voucher Info -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Voucher</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Voucher")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Nama</p><p class="text-lg font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.voucher.name)}</p></div>`);
            if (__props.voucher.description) {
              _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Deskripsi</p><p class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.voucher.description)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Nilai Voucher</p><p class="text-2xl font-bold text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(__props.voucher.valueDisplay)}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Minimal Pembelian</p><p class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(__props.voucher.minPurchase))}</p></div></div>`);
            if (__props.voucher.maxDiscount) {
              _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Maksimal Diskon</p><p class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(__props.voucher.maxDiscount))}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Nama"),
                  createVNode(
                    "p",
                    { class: "text-lg font-medium text-gray-900 dark:text-white" },
                    toDisplayString(__props.voucher.name),
                    1
                    /* TEXT */
                  )
                ]),
                __props.voucher.description ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Deskripsi"),
                  createVNode(
                    "p",
                    { class: "text-gray-900 dark:text-white" },
                    toDisplayString(__props.voucher.description),
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Nilai Voucher"),
                    createVNode(
                      "p",
                      { class: "text-2xl font-bold text-primary-600 dark:text-primary-400" },
                      toDisplayString(__props.voucher.valueDisplay),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Minimal Pembelian"),
                    createVNode(
                      "p",
                      { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                      toDisplayString(formatPrice(__props.voucher.minPurchase)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                __props.voucher.maxDiscount ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "grid grid-cols-2 gap-4"
                }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Maksimal Diskon"),
                    createVNode(
                      "p",
                      { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                      toDisplayString(formatPrice(__props.voucher.maxDiscount)),
                      1
                      /* TEXT */
                    )
                  ])
                ])) : createCommentVNode("v-if", true)
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Period -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Periode</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Periode")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Mulai</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(__props.voucher.startDate))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Selesai</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(__props.voucher.endDate))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Mulai"),
                  createVNode(
                    "p",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(formatDate(__props.voucher.startDate)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Selesai"),
                  createVNode(
                    "p",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(formatDate(__props.voucher.endDate)),
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
      _push(`<!-- Products -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}> Produk yang Berlaku </h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, " Produk yang Berlaku ")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.voucher.appliesToAll) {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-squares-2x2",
                class: "w-12 h-12 text-primary-500 mx-auto mb-2"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-900 dark:text-white font-medium"${_scopeId}>Semua Produk</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Voucher ini berlaku untuk semua produk di toko Anda </p></div>`);
            } else if (__props.voucher.products.length > 0) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.voucher.products, (product) => {
                _push2(`<div class="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"${_scopeId}><img${ssrRenderAttr("src", getImageUrl(product.image))}${ssrRenderAttr("alt", product.name)} class="w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium text-gray-900 dark:text-white truncate"${_scopeId}>${ssrInterpolate(product.name)}</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(formatPrice(product.price))}</p></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-8 text-gray-500 dark:text-gray-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-inbox",
                class: "w-12 h-12 mx-auto mb-2 opacity-50"
              }, null, _parent2, _scopeId));
              _push2(`<p${_scopeId}>Tidak ada produk yang dipilih</p></div>`);
            }
          } else {
            return [
              __props.voucher.appliesToAll ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-8"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-squares-2x2",
                  class: "w-12 h-12 text-primary-500 mx-auto mb-2"
                }),
                createVNode("p", { class: "text-gray-900 dark:text-white font-medium" }, "Semua Produk"),
                createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Voucher ini berlaku untuk semua produk di toko Anda ")
              ])) : __props.voucher.products.length > 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "grid grid-cols-1 sm:grid-cols-2 gap-3"
              }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.voucher.products, (product) => {
                    return openBlock(), createBlock("div", {
                      key: product.id,
                      class: "flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700"
                    }, [
                      createVNode("img", {
                        src: getImageUrl(product.image),
                        alt: product.name,
                        class: "w-12 h-12 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode(
                          "p",
                          { class: "font-medium text-gray-900 dark:text-white truncate" },
                          toDisplayString(product.name),
                          1
                          /* TEXT */
                        ),
                        createVNode(
                          "p",
                          { class: "text-sm text-gray-500 dark:text-gray-400" },
                          toDisplayString(formatPrice(product.price)),
                          1
                          /* TEXT */
                        )
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : (openBlock(), createBlock("div", {
                key: 2,
                class: "text-center py-8 text-gray-500 dark:text-gray-400"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-inbox",
                  class: "w-12 h-12 mx-auto mb-2 opacity-50"
                }),
                createVNode("p", null, "Tidak ada produk yang dipilih")
              ]))
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Right Column --><div class="space-y-6"><!-- Stats -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Statistik</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Statistik")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Total Penggunaan</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.voucher.usageCount)} kali </span></div>`);
            if (__props.voucher.usageLimit) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Batas Total</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.voucher.usageLimit)} kali </span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.voucher.usageLimit) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Sisa Kuota</span><span class="${ssrRenderClass([__props.voucher.remainingUsage && __props.voucher.remainingUsage > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400", "font-semibold"])}"${_scopeId}>${ssrInterpolate(__props.voucher.remainingUsage)} kali </span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Batas per Customer</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.voucher.usageLimitPerCustomer)} kali </span></div><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Jumlah Produk</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.voucher.appliesToAll ? "Semua" : __props.voucher.productCount)}</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Total Penggunaan"),
                  createVNode(
                    "span",
                    { class: "font-semibold text-gray-900 dark:text-white" },
                    toDisplayString(__props.voucher.usageCount) + " kali ",
                    1
                    /* TEXT */
                  )
                ]),
                __props.voucher.usageLimit ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-between"
                }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Batas Total"),
                  createVNode(
                    "span",
                    { class: "font-semibold text-gray-900 dark:text-white" },
                    toDisplayString(__props.voucher.usageLimit) + " kali ",
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true),
                __props.voucher.usageLimit ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex items-center justify-between"
                }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Sisa Kuota"),
                  createVNode(
                    "span",
                    {
                      class: ["font-semibold", __props.voucher.remainingUsage && __props.voucher.remainingUsage > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"]
                    },
                    toDisplayString(__props.voucher.remainingUsage) + " kali ",
                    3
                    /* TEXT, CLASS */
                  )
                ])) : createCommentVNode("v-if", true),
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Batas per Customer"),
                  createVNode(
                    "span",
                    { class: "font-semibold text-gray-900 dark:text-white" },
                    toDisplayString(__props.voucher.usageLimitPerCustomer) + " kali ",
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Jumlah Produk"),
                  createVNode(
                    "span",
                    { class: "font-semibold text-gray-900 dark:text-white" },
                    toDisplayString(__props.voucher.appliesToAll ? "Semua" : __props.voucher.productCount),
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
      _push(`<!-- Quick Actions -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Aksi Cepat</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Aksi Cepat")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-clipboard-document",
              color: "neutral",
              variant: "soft",
              block: "",
              onClick: copyCode
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Salin Kode `);
                } else {
                  return [
                    createTextVNode(" Salin Kode ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(Link), {
              href: `/admin/promotions/vouchers/${__props.voucher.id}/edit`,
              class: "block"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    icon: "i-heroicons-pencil",
                    color: "neutral",
                    variant: "soft",
                    block: ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Edit Voucher `);
                      } else {
                        return [
                          createTextVNode(" Edit Voucher ")
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      icon: "i-heroicons-pencil",
                      color: "neutral",
                      variant: "soft",
                      block: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit Voucher ")
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
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2" }, [
                createVNode(_component_UButton, {
                  icon: "i-heroicons-clipboard-document",
                  color: "neutral",
                  variant: "soft",
                  block: "",
                  onClick: copyCode
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Salin Kode ")
                  ]),
                  _: 1
                  /* STABLE */
                }),
                createVNode(unref(Link), {
                  href: `/admin/promotions/vouchers/${__props.voucher.id}/edit`,
                  class: "block"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UButton, {
                      icon: "i-heroicons-pencil",
                      color: "neutral",
                      variant: "soft",
                      block: ""
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Edit Voucher ")
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["href"])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Timeline -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Riwayat</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Riwayat")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><div class="flex items-start gap-3"${_scopeId}><div class="p-1.5 rounded-full bg-gray-100 dark:bg-gray-800"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-plus",
              class: "w-4 h-4 text-gray-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Voucher dibuat</p><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(__props.voucher.createdAt))}</p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                createVNode("div", { class: "flex items-start gap-3" }, [
                  createVNode("div", { class: "p-1.5 rounded-full bg-gray-100 dark:bg-gray-800" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-plus",
                      class: "w-4 h-4 text-gray-500"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Voucher dibuat"),
                    createVNode(
                      "p",
                      { class: "text-xs text-gray-500 dark:text-gray-400" },
                      toDisplayString(formatDate(__props.voucher.createdAt)),
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
      _push(`</div></div></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/promotions/vouchers/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
