import { a as _sfc_main$5 } from './Badge-CQlYH3Fo.js';
import { a as _sfc_main$1, _ as _sfc_main$4 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$3 } from './Card-h3oZeDee.js';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { _ as _sfc_main$2 } from './PromotionStatusBadge-Bwh-Yb4e.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import './Tooltip-C54KurGy.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "show",
  __ssrInlineRender: true,
  props: {
    flashSale: {}
  },
  setup(__props) {
    const props = __props;
    const formatPrice = (price) => {
      return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(price);
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
    const getImageUrl = (url) => {
      if (!url || url === "/images/placeholder.png") {
        return "https://placehold.co/100x100/1a1a2e/ffffff?text=No+Image";
      }
      return url;
    };
    const toggleStatus = () => {
      router.post(`/admin/promotions/flash-sale/${props.flashSale.id}/toggle`, {}, {
        preserveScroll: true
      });
    };
    const deleteFlashSale = () => {
      if (confirm("Apakah Anda yakin ingin menghapus flash sale ini?")) {
        router.delete(`/admin/promotions/flash-sale/${props.flashSale.id}`);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$1;
      const _component_UCard = _sfc_main$3;
      const _component_UIcon = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-7xl mx-auto space-y-6" }, _attrs))}><!-- Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div class="flex items-center gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/promotions/flash-sale" }, {
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
      _push(`<div><div class="flex items-center gap-3"><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(__props.flashSale.name)}</h1>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        status: __props.flashSale.status
      }, null, _parent));
      _push(`</div>`);
      if (__props.flashSale.description) {
        _push(`<p class="text-gray-500 dark:text-gray-400 mt-1">${ssrInterpolate(__props.flashSale.description)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: __props.flashSale.isActive ? "i-heroicons-pause" : "i-heroicons-play",
        color: __props.flashSale.isActive ? "warning" : "success",
        variant: "soft",
        onClick: toggleStatus
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(__props.flashSale.isActive ? "Nonaktifkan" : "Aktifkan")}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(__props.flashSale.isActive ? "Nonaktifkan" : "Aktifkan"),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(unref(Link), {
        href: `/admin/promotions/flash-sale/${__props.flashSale.id}/edit`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-pencil-square",
              color: "primary",
              variant: "soft"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Edit `);
                } else {
                  return [
                    createTextVNode(" Edit ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UButton, {
                icon: "i-heroicons-pencil-square",
                color: "primary",
                variant: "soft"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Edit ")
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
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-trash",
        color: "error",
        variant: "soft",
        onClick: deleteFlashSale
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Hapus `);
          } else {
            return [
              createTextVNode(" Hapus ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></div><!-- Stats Cards --><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shopping-bag",
              class: "w-5 h-5 text-primary-600 dark:text-primary-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Total Produk</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.flashSale.productCount)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-primary-100 dark:bg-primary-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-bag",
                    class: "w-5 h-5 text-primary-600 dark:text-primary-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Total Produk"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.flashSale.productCount),
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
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-green-100 dark:bg-green-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-shopping-cart",
              class: "w-5 h-5 text-green-600 dark:text-green-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Total Terjual</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.flashSale.totalSold)}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-green-100 dark:bg-green-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-shopping-cart",
                    class: "w-5 h-5 text-green-600 dark:text-green-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Total Terjual"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.flashSale.totalSold),
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
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-currency-dollar",
              class: "w-5 h-5 text-amber-600 dark:text-amber-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Total Pendapatan</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatPrice(__props.flashSale.totalRevenue))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-amber-100 dark:bg-amber-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-currency-dollar",
                    class: "w-5 h-5 text-amber-600 dark:text-amber-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Total Pendapatan"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(formatPrice(__props.flashSale.totalRevenue)),
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
            _push2(`<div class="flex items-center gap-3"${_scopeId}><div class="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-chart-bar",
              class: "w-5 h-5 text-blue-600 dark:text-blue-400"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Progress Penjualan</p><p class="text-xl font-bold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(__props.flashSale.progress)}%</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-3" }, [
                createVNode("div", { class: "p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-chart-bar",
                    class: "w-5 h-5 text-blue-600 dark:text-blue-400"
                  })
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Progress Penjualan"),
                  createVNode(
                    "p",
                    { class: "text-xl font-bold text-gray-900 dark:text-white" },
                    toDisplayString(__props.flashSale.progress) + "%",
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
      _push(`</div><!-- Period Info -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Periode</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Periode")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Mulai</p><p class="text-lg font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(__props.flashSale.startDate))}</p></div><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>Tanggal Selesai</p><p class="text-lg font-medium text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(__props.flashSale.endDate))}</p></div></div>`);
            if (__props.flashSale.timeRemaining) {
              _push2(`<div class="mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20"${_scopeId}><div class="flex items-center gap-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-clock",
                class: "w-5 h-5 text-primary-600 dark:text-primary-400"
              }, null, _parent2, _scopeId));
              _push2(`<span class="font-medium text-primary-700 dark:text-primary-300"${_scopeId}> Waktu tersisa: ${ssrInterpolate(__props.flashSale.timeRemaining)}</span></div></div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-6" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Mulai"),
                  createVNode(
                    "p",
                    { class: "text-lg font-medium text-gray-900 dark:text-white" },
                    toDisplayString(formatDate(__props.flashSale.startDate)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, "Tanggal Selesai"),
                  createVNode(
                    "p",
                    { class: "text-lg font-medium text-gray-900 dark:text-white" },
                    toDisplayString(formatDate(__props.flashSale.endDate)),
                    1
                    /* TEXT */
                  )
                ])
              ]),
              __props.flashSale.timeRemaining ? (openBlock(), createBlock("div", {
                key: 0,
                class: "mt-4 p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20"
              }, [
                createVNode("div", { class: "flex items-center gap-2" }, [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-clock",
                    class: "w-5 h-5 text-primary-600 dark:text-primary-400"
                  }),
                  createVNode(
                    "span",
                    { class: "font-medium text-primary-700 dark:text-primary-300" },
                    " Waktu tersisa: " + toDisplayString(__props.flashSale.timeRemaining),
                    1
                    /* TEXT */
                  )
                ])
              ])) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Products List -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Produk Flash Sale</h3>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: "primary",
              variant: "soft"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(__props.flashSale.products.length)} produk `);
                } else {
                  return [
                    createTextVNode(
                      toDisplayString(__props.flashSale.products.length) + " produk ",
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
                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Produk Flash Sale"),
                createVNode(_component_UBadge, {
                  color: "primary",
                  variant: "soft"
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString(__props.flashSale.products.length) + " produk ",
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
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.flashSale.products.length > 0) {
              _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
              ssrRenderList(__props.flashSale.products, (product) => {
                _push2(`<div class="flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"${_scopeId}><img${ssrRenderAttr("src", getImageUrl(product.image))}${ssrRenderAttr("alt", product.name)} class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"${_scopeId}><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium text-gray-900 dark:text-white truncate"${_scopeId}>${ssrInterpolate(product.name)}</p><div class="flex items-center gap-2 mt-1"${_scopeId}><span class="text-lg font-bold text-primary-600 dark:text-primary-400"${_scopeId}>${ssrInterpolate(formatPrice(product.flashPrice))}</span><span class="text-sm text-gray-400 line-through"${_scopeId}>${ssrInterpolate(formatPrice(product.originalPrice))}</span>`);
                _push2(ssrRenderComponent(_component_UBadge, {
                  color: "error",
                  variant: "soft",
                  size: "xs"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(` -${ssrInterpolate(product.discountPercentage)}% `);
                    } else {
                      return [
                        createTextVNode(
                          " -" + toDisplayString(product.discountPercentage) + "% ",
                          1
                          /* TEXT */
                        )
                      ];
                    }
                  }),
                  _: 2
                  /* DYNAMIC */
                }, _parent2, _scopeId));
                _push2(`</div></div><div class="text-right"${_scopeId}><div class="flex items-center gap-4"${_scopeId}><div${_scopeId}><p class="text-xs text-gray-500 dark:text-gray-400"${_scopeId}>Terjual</p><p class="font-semibold text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(product.soldCount)} / ${ssrInterpolate(product.stockLimit)}</p></div><div class="w-24"${_scopeId}><div class="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"${_scopeId}><div class="h-full bg-primary-500 rounded-full transition-all" style="${ssrRenderStyle({ width: `${product.soldCount / product.stockLimit * 100}%` })}"${_scopeId}></div></div><p class="text-xs text-gray-500 dark:text-gray-400 mt-1 text-center"${_scopeId}>${ssrInterpolate(Math.round(product.soldCount / product.stockLimit * 100))}% </p></div></div></div></div>`);
              });
              _push2(`<!--]--></div>`);
            } else {
              _push2(`<div class="text-center py-8 text-gray-500 dark:text-gray-400"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-inbox",
                class: "w-12 h-12 mx-auto mb-2"
              }, null, _parent2, _scopeId));
              _push2(`<p${_scopeId}>Tidak ada produk dalam flash sale ini</p></div>`);
            }
          } else {
            return [
              __props.flashSale.products.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "space-y-4"
              }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.flashSale.products, (product) => {
                    return openBlock(), createBlock("div", {
                      key: product.id,
                      class: "flex items-center gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
                    }, [
                      createVNode("img", {
                        src: getImageUrl(product.image),
                        alt: product.name,
                        class: "w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-800"
                      }, null, 8, ["src", "alt"]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode(
                          "p",
                          { class: "font-medium text-gray-900 dark:text-white truncate" },
                          toDisplayString(product.name),
                          1
                          /* TEXT */
                        ),
                        createVNode("div", { class: "flex items-center gap-2 mt-1" }, [
                          createVNode(
                            "span",
                            { class: "text-lg font-bold text-primary-600 dark:text-primary-400" },
                            toDisplayString(formatPrice(product.flashPrice)),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "span",
                            { class: "text-sm text-gray-400 line-through" },
                            toDisplayString(formatPrice(product.originalPrice)),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            _component_UBadge,
                            {
                              color: "error",
                              variant: "soft",
                              size: "xs"
                            },
                            {
                              default: withCtx(() => [
                                createTextVNode(
                                  " -" + toDisplayString(product.discountPercentage) + "% ",
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            },
                            1024
                            /* DYNAMIC_SLOTS */
                          )
                        ])
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode("div", { class: "flex items-center gap-4" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-xs text-gray-500 dark:text-gray-400" }, "Terjual"),
                            createVNode(
                              "p",
                              { class: "font-semibold text-gray-900 dark:text-white" },
                              toDisplayString(product.soldCount) + " / " + toDisplayString(product.stockLimit),
                              1
                              /* TEXT */
                            )
                          ]),
                          createVNode("div", { class: "w-24" }, [
                            createVNode("div", { class: "h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" }, [
                              createVNode(
                                "div",
                                {
                                  class: "h-full bg-primary-500 rounded-full transition-all",
                                  style: { width: `${product.soldCount / product.stockLimit * 100}%` }
                                },
                                null,
                                4
                                /* STYLE */
                              )
                            ]),
                            createVNode(
                              "p",
                              { class: "text-xs text-gray-500 dark:text-gray-400 mt-1 text-center" },
                              toDisplayString(Math.round(product.soldCount / product.stockLimit * 100)) + "% ",
                              1
                              /* TEXT */
                            )
                          ])
                        ])
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                ))
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "text-center py-8 text-gray-500 dark:text-gray-400"
              }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-inbox",
                  class: "w-12 h-12 mx-auto mb-2"
                }),
                createVNode("p", null, "Tidak ada produk dalam flash sale ini")
              ]))
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Metadata -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Lainnya</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Lainnya")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"${_scopeId}><div${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>Dibuat pada</p><p class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(__props.flashSale.createdAt))}</p></div><div${_scopeId}><p class="text-gray-500 dark:text-gray-400"${_scopeId}>Terakhir diubah</p><p class="text-gray-900 dark:text-white"${_scopeId}>${ssrInterpolate(formatDate(__props.flashSale.updatedAt))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 text-sm" }, [
                createVNode("div", null, [
                  createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Dibuat pada"),
                  createVNode(
                    "p",
                    { class: "text-gray-900 dark:text-white" },
                    toDisplayString(formatDate(__props.flashSale.createdAt)),
                    1
                    /* TEXT */
                  )
                ]),
                createVNode("div", null, [
                  createVNode("p", { class: "text-gray-500 dark:text-gray-400" }, "Terakhir diubah"),
                  createVNode(
                    "p",
                    { class: "text-gray-900 dark:text-white" },
                    toDisplayString(formatDate(__props.flashSale.updatedAt)),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/promotions/flash-sale/show.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
