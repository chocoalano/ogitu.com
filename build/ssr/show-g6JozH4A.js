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
    discount: {}
  },
  setup(__props) {
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-4xl mx-auto space-y-6" }, _attrs))}><!-- Header --><div class="flex items-center justify-between"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/promotions/discounts" }, {
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
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.discount.name)}</h1><div class="flex items-center gap-2 mt-1">`);
      _push(ssrRenderComponent(_sfc_main$2, {
        status: __props.discount.status
      }, null, _parent));
      _push(ssrRenderComponent(_component_UBadge, {
        color: __props.discount.type === "percentage" ? "primary" : "info",
        variant: "soft",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.discount.typeLabel)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.discount.typeLabel),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(unref(Link), {
        href: `/admin/promotions/discounts/${__props.discount.id}/edit`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-pencil",
              color: "primary"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit Diskon `);
                } else {
                  return [
                    createTextVNode(" Edit Diskon ")
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
                  createTextVNode(" Edit Diskon ")
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
      _push(`</div><!-- Main Content --><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><!-- Left Column --><div class="lg:col-span-2 space-y-6"><!-- Discount Info -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Diskon</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Diskon")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            if (__props.discount.description) {
              _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Deskripsi</p><p class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.discount.description)}</p></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Nilai Diskon</p><p class="text-2xl font-bold text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(__props.discount.valueDisplay)}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Minimal Pembelian</p><p class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(__props.discount.minPurchase))}</p></div></div>`);
            if (__props.discount.maxDiscount) {
              _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Maksimal Diskon</p><p class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(__props.discount.maxDiscount))}</p></div></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                __props.discount.description ? (openBlock(), createBlock("div", { key: 0 }, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Deskripsi"),
                  createVNode(
                    "p",
                    { class: "text-gray-900 dark:text-white" },
                    toDisplayString(__props.discount.description),
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true),
                createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Nilai Diskon"),
                    createVNode(
                      "p",
                      { class: "text-2xl font-bold text-primary-600 dark:text-primary-400" },
                      toDisplayString(__props.discount.valueDisplay),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Minimal Pembelian"),
                    createVNode(
                      "p",
                      { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                      toDisplayString(formatPrice(__props.discount.minPurchase)),
                      1
                      /* TEXT */
                    )
                  ])
                ]),
                __props.discount.maxDiscount ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "grid grid-cols-2 gap-4"
                }, [
                  createVNode("div", null, [
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Maksimal Diskon"),
                    createVNode(
                      "p",
                      { class: "text-lg font-semibold text-gray-900 dark:text-white" },
                      toDisplayString(formatPrice(__props.discount.maxDiscount)),
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
            _push2(`<div class="grid grid-cols-2 gap-4"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Mulai</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(__props.discount.startDate))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Selesai</p><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(__props.discount.endDate))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Mulai"),
                  createVNode(
                    "p",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(formatDate(__props.discount.startDate)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Selesai"),
                  createVNode(
                    "p",
                    { class: "font-medium text-gray-900 dark:text-white" },
                    toDisplayString(formatDate(__props.discount.endDate)),
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
            if (__props.discount.appliesToAll) {
              _push2(`<div class="text-center py-8"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-squares-2x2",
                class: "w-12 h-12 text-primary-500 mx-auto mb-2"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-gray-900 dark:text-white font-medium"${_scopeId}>Semua Produk</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Diskon ini berlaku untuk semua produk di toko Anda </p></div>`);
            } else if (__props.discount.products.length > 0) {
              _push2(`<div class="grid grid-cols-1 sm:grid-cols-2 gap-3"${_scopeId}><!--[-->`);
              ssrRenderList(__props.discount.products, (product) => {
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
              __props.discount.appliesToAll ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center py-8"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-squares-2x2",
                  class: "w-12 h-12 text-primary-500 mx-auto mb-2"
                }),
                createVNode("p", { class: "text-gray-900 dark:text-white font-medium" }, "Semua Produk"),
                createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Diskon ini berlaku untuk semua produk di toko Anda ")
              ])) : __props.discount.products.length > 0 ? (openBlock(), createBlock("div", {
                key: 1,
                class: "grid grid-cols-1 sm:grid-cols-2 gap-3"
              }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.discount.products, (product) => {
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
            _push2(`<div class="space-y-4"${_scopeId}><div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Total Penggunaan</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.discount.usageCount)} kali </span></div>`);
            if (__props.discount.usageLimit) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Batas Penggunaan</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.discount.usageLimit)} kali </span></div>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.discount.usageLimit) {
              _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Sisa Kuota</span><span class="${ssrRenderClass([__props.discount.remainingUsage && __props.discount.remainingUsage > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400", "font-semibold"])}"${_scopeId}>${ssrInterpolate(__props.discount.remainingUsage)} kali </span></div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="flex items-center justify-between"${_scopeId}><span class="text-gray-500 dark:text-gray-400"${_scopeId}>Jumlah Produk</span><span class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.discount.appliesToAll ? "Semua" : __props.discount.productCount)}</span></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Total Penggunaan"),
                  createVNode(
                    "span",
                    { class: "font-semibold text-gray-900 dark:text-white" },
                    toDisplayString(__props.discount.usageCount) + " kali ",
                    1
                    /* TEXT */
                  )
                ]),
                __props.discount.usageLimit ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "flex items-center justify-between"
                }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Batas Penggunaan"),
                  createVNode(
                    "span",
                    { class: "font-semibold text-gray-900 dark:text-white" },
                    toDisplayString(__props.discount.usageLimit) + " kali ",
                    1
                    /* TEXT */
                  )
                ])) : createCommentVNode("v-if", true),
                __props.discount.usageLimit ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex items-center justify-between"
                }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Sisa Kuota"),
                  createVNode(
                    "span",
                    {
                      class: ["font-semibold", __props.discount.remainingUsage && __props.discount.remainingUsage > 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"]
                    },
                    toDisplayString(__props.discount.remainingUsage) + " kali ",
                    3
                    /* TEXT, CLASS */
                  )
                ])) : createCommentVNode("v-if", true),
                createVNode("div", { class: "flex items-center justify-between" }, [
                  createVNode("span", { class: "text-gray-500 dark:text-gray-400" }, "Jumlah Produk"),
                  createVNode(
                    "span",
                    { class: "font-semibold text-gray-900 dark:text-white" },
                    toDisplayString(__props.discount.appliesToAll ? "Semua" : __props.discount.productCount),
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
            _push2(ssrRenderComponent(unref(Link), {
              href: `/admin/promotions/discounts/${__props.discount.id}/edit`,
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
                        _push4(` Edit Diskon `);
                      } else {
                        return [
                          createTextVNode(" Edit Diskon ")
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
                        createTextVNode(" Edit Diskon ")
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
                createVNode(unref(Link), {
                  href: `/admin/promotions/discounts/${__props.discount.id}/edit`,
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
                        createTextVNode(" Edit Diskon ")
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
            _push2(`</div><div${_scopeId}><p class="text-sm font-medium text-gray-900 dark:text-white"${_scopeId}>Diskon dibuat</p><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(formatDate(__props.discount.createdAt))}</p></div></div></div>`);
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
                    createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-white" }, "Diskon dibuat"),
                    createVNode(
                      "p",
                      { class: "text-xs text-gray-500 dark:text-gray-400" },
                      toDisplayString(formatDate(__props.discount.createdAt)),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/promotions/discounts/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
