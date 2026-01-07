import { _ as _sfc_main$6 } from './Card-Ci6a5H8H.js';
import { _ as _sfc_main$7, a as _sfc_main$b } from './Button-BBveOjhJ.js';
import { defineComponent, computed, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext, unref, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { Link, Head, router } from '@inertiajs/vue3';
import { a as formatNumber, p as periodOptions, s as sortByOptions, f as formatCurrency } from './analytics-DeT-yMaP.js';
import { _ as _sfc_main$a } from './SelectMenu-CGTADs72.js';
import { _ as _sfc_main$9, a as _sfc_main$c } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$8 } from './FormField-BIqlRgyi.js';
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
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Tooltip-N44Fzd4m.js';

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "ProductStatsCards",
  __ssrInlineRender: true,
  props: {
    summary: {}
  },
  setup(__props) {
    const props = __props;
    const stats = computed(() => [
      {
        title: "Total Produk",
        value: formatNumber(props.summary.totalProducts),
        icon: "i-heroicons-cube",
        color: "primary"
      },
      {
        title: "Produk Aktif",
        value: formatNumber(props.summary.activeProducts),
        icon: "i-heroicons-check-circle",
        color: "success"
      },
      {
        title: "Stok Habis",
        value: formatNumber(props.summary.outOfStockProducts),
        icon: "i-heroicons-x-circle",
        color: "error"
      },
      {
        title: "Stok Rendah",
        value: formatNumber(props.summary.lowStockProducts),
        icon: "i-heroicons-exclamation-triangle",
        color: "warning"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$6;
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(stats.value, (stat) => {
        _push(ssrRenderComponent(_component_UCard, {
          key: stat.title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-start justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(stat.title)}</p><p class="mt-1 text-2xl font-bold"${_scopeId}>${ssrInterpolate(stat.value)}</p></div><div class="${ssrRenderClass([{
                "bg-primary-100 dark:bg-primary-900": stat.color === "primary",
                "bg-green-100 dark:bg-green-900": stat.color === "success",
                "bg-red-100 dark:bg-red-900": stat.color === "error",
                "bg-yellow-100 dark:bg-yellow-900": stat.color === "warning"
              }, "p-3 rounded-lg"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: stat.icon,
                class: ["w-6 h-6", {
                  "text-primary-500": stat.color === "primary",
                  "text-green-500": stat.color === "success",
                  "text-red-500": stat.color === "error",
                  "text-yellow-500": stat.color === "warning"
                }]
              }, null, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-start justify-between" }, [
                  createVNode("div", null, [
                    createVNode(
                      "p",
                      { class: "text-sm text-gray-500 dark:text-gray-400" },
                      toDisplayString(stat.title),
                      1
                      /* TEXT */
                    ),
                    createVNode(
                      "p",
                      { class: "mt-1 text-2xl font-bold" },
                      toDisplayString(stat.value),
                      1
                      /* TEXT */
                    )
                  ]),
                  createVNode(
                    "div",
                    {
                      class: ["p-3 rounded-lg", {
                        "bg-primary-100 dark:bg-primary-900": stat.color === "primary",
                        "bg-green-100 dark:bg-green-900": stat.color === "success",
                        "bg-red-100 dark:bg-red-900": stat.color === "error",
                        "bg-yellow-100 dark:bg-yellow-900": stat.color === "warning"
                      }]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: stat.icon,
                        class: ["w-6 h-6", {
                          "text-primary-500": stat.color === "primary",
                          "text-green-500": stat.color === "success",
                          "text-red-500": stat.color === "error",
                          "text-yellow-500": stat.color === "warning"
                        }]
                      }, null, 8, ["name", "class"])
                    ],
                    2
                    /* CLASS */
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

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/ProductStatsCards.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProductFilters",
  __ssrInlineRender: true,
  props: {
    period: {},
    sortBy: {},
    search: {}
  },
  emits: ["update:period", "update:sortBy", "update:search", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedPeriod = computed({
      get: () => props.period,
      set: (value) => emit("update:period", value)
    });
    const selectedSortBy = computed({
      get: () => props.sortBy,
      set: (value) => emit("update:sortBy", value)
    });
    const searchQuery = computed({
      get: () => props.search || "",
      set: (value) => emit("update:search", value)
    });
    const handleApply = () => {
      emit("apply");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormField = _sfc_main$8;
      const _component_UInput = _sfc_main$9;
      const _component_USelectMenu = _sfc_main$a;
      const _component_UButton = _sfc_main$b;
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-end gap-3" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UFormField, {
        label: "Cari Produk",
        class: "flex-1 min-w-64"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: searchQuery.value,
              "onUpdate:modelValue": ($event) => searchQuery.value = $event,
              placeholder: "Nama produk atau SKU...",
              icon: "i-heroicons-magnifying-glass"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UInput, {
                modelValue: searchQuery.value,
                "onUpdate:modelValue": ($event) => searchQuery.value = $event,
                placeholder: "Nama produk atau SKU...",
                icon: "i-heroicons-magnifying-glass"
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Periode" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: selectedPeriod.value,
              "onUpdate:modelValue": ($event) => selectedPeriod.value = $event,
              items: unref(periodOptions),
              "value-key": "value",
              class: "w-44"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: selectedPeriod.value,
                "onUpdate:modelValue": ($event) => selectedPeriod.value = $event,
                items: unref(periodOptions),
                "value-key": "value",
                class: "w-44"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UFormField, { label: "Urutkan" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: selectedSortBy.value,
              "onUpdate:modelValue": ($event) => selectedSortBy.value = $event,
              items: unref(sortByOptions),
              "value-key": "value",
              class: "w-44"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: selectedSortBy.value,
                "onUpdate:modelValue": ($event) => selectedSortBy.value = $event,
                items: unref(sortByOptions),
                "value-key": "value",
                class: "w-44"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        onClick: handleApply
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-funnel",
              class: "mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Filter `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-funnel",
                class: "mr-1"
              }),
              createTextVNode(" Filter ")
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

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/ProductFilters.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductPerformanceTable",
  __ssrInlineRender: true,
  props: {
    products: {}
  },
  setup(__props) {
    const getStatusColor = (status) => {
      switch (status) {
        case "active":
          return "success";
        case "inactive":
          return "gray";
        case "out_of_stock":
          return "error";
        default:
          return "gray";
      }
    };
    const getStatusLabel = (status) => {
      switch (status) {
        case "active":
          return "Aktif";
        case "inactive":
          return "Nonaktif";
        case "out_of_stock":
          return "Habis";
        default:
          return status;
      }
    };
    const getStockClass = (stock) => {
      if (stock === 0) return "text-red-500";
      if (stock <= 10) return "text-yellow-500";
      return "text-green-500";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$6;
      const _component_UIcon = _sfc_main$7;
      const _component_UBadge = _sfc_main$c;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-200 dark:border-gray-700"${_scopeId}><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Produk</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Kategori</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Harga</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Stok</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Terjual (Periode)</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Total Terjual</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Pendapatan (Periode)</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Rating</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Dilihat</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Status</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.products, (product) => {
              _push2(`<tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"${_scopeId}><td class="py-3 px-4"${_scopeId}><div class="flex items-center gap-3"${_scopeId}><div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0"${_scopeId}>`);
              if (product.image) {
                _push2(`<img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-photo",
                  class: "w-5 h-5 text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div class="min-w-0"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/admin/products/${product.id}`,
                class: "text-primary-500 hover:text-primary-600 font-medium truncate block max-w-48"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(product.name)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(product.name),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`<p class="text-xs text-gray-500"${_scopeId}>${ssrInterpolate(product.sku)}</p></div></div></td><td class="py-3 px-4"${_scopeId}>${ssrInterpolate(product.category)}</td><td class="py-3 px-4 font-medium"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(product.price))}</td><td class="py-3 px-4"${_scopeId}><span class="${ssrRenderClass([getStockClass(product.stock), "font-medium"])}"${_scopeId}>${ssrInterpolate(unref(formatNumber)(product.stock))}</span></td><td class="py-3 px-4 font-medium"${_scopeId}>${ssrInterpolate(unref(formatNumber)(product.periodSold))}</td><td class="py-3 px-4"${_scopeId}>${ssrInterpolate(unref(formatNumber)(product.totalSold))}</td><td class="py-3 px-4 font-medium text-green-600"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(product.periodRevenue))}</td><td class="py-3 px-4"${_scopeId}><div class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-star-solid",
                class: "w-4 h-4 text-yellow-400"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(Number(product.rating || 0).toFixed(1))}</span><span class="text-gray-500 text-xs"${_scopeId}>(${ssrInterpolate(product.totalReviews)})</span></div></td><td class="py-3 px-4"${_scopeId}>${ssrInterpolate(unref(formatNumber)(product.viewCount))}</td><td class="py-3 px-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: getStatusColor(product.status),
                variant: "soft"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(getStatusLabel(product.status))}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(getStatusLabel(product.status)),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.products.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-8"${_scopeId}> Tidak ada produk ditemukan </div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "overflow-x-auto" }, [
                createVNode("table", { class: "w-full text-sm" }, [
                  createVNode("thead", null, [
                    createVNode("tr", { class: "border-b border-gray-200 dark:border-gray-700" }, [
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Produk"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Kategori"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Harga"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Stok"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Terjual (Periode)"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Total Terjual"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Pendapatan (Periode)"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Rating"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Dilihat"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Status")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.products, (product) => {
                        return openBlock(), createBlock("tr", {
                          key: product.id,
                          class: "border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }, [
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("div", { class: "w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0" }, [
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
                                    name: "i-heroicons-photo",
                                    class: "w-5 h-5 text-gray-400"
                                  })
                                ]))
                              ]),
                              createVNode("div", { class: "min-w-0" }, [
                                createVNode(unref(Link), {
                                  href: `/admin/products/${product.id}`,
                                  class: "text-primary-500 hover:text-primary-600 font-medium truncate block max-w-48"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(
                                      toDisplayString(product.name),
                                      1
                                      /* TEXT */
                                    )
                                  ]),
                                  _: 2
                                  /* DYNAMIC */
                                }, 1032, ["href"]),
                                createVNode(
                                  "p",
                                  { class: "text-xs text-gray-500" },
                                  toDisplayString(product.sku),
                                  1
                                  /* TEXT */
                                )
                              ])
                            ])
                          ]),
                          createVNode(
                            "td",
                            { class: "py-3 px-4" },
                            toDisplayString(product.category),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "td",
                            { class: "py-3 px-4 font-medium" },
                            toDisplayString(unref(formatCurrency)(product.price)),
                            1
                            /* TEXT */
                          ),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode(
                              "span",
                              {
                                class: [getStockClass(product.stock), "font-medium"]
                              },
                              toDisplayString(unref(formatNumber)(product.stock)),
                              3
                              /* TEXT, CLASS */
                            )
                          ]),
                          createVNode(
                            "td",
                            { class: "py-3 px-4 font-medium" },
                            toDisplayString(unref(formatNumber)(product.periodSold)),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "td",
                            { class: "py-3 px-4" },
                            toDisplayString(unref(formatNumber)(product.totalSold)),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "td",
                            { class: "py-3 px-4 font-medium text-green-600" },
                            toDisplayString(unref(formatCurrency)(product.periodRevenue)),
                            1
                            /* TEXT */
                          ),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode("div", { class: "flex items-center gap-1" }, [
                              createVNode(_component_UIcon, {
                                name: "i-heroicons-star-solid",
                                class: "w-4 h-4 text-yellow-400"
                              }),
                              createVNode(
                                "span",
                                null,
                                toDisplayString(Number(product.rating || 0).toFixed(1)),
                                1
                                /* TEXT */
                              ),
                              createVNode(
                                "span",
                                { class: "text-gray-500 text-xs" },
                                "(" + toDisplayString(product.totalReviews) + ")",
                                1
                                /* TEXT */
                              )
                            ])
                          ]),
                          createVNode(
                            "td",
                            { class: "py-3 px-4" },
                            toDisplayString(unref(formatNumber)(product.viewCount)),
                            1
                            /* TEXT */
                          ),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode(_component_UBadge, {
                              color: getStatusColor(product.status),
                              variant: "soft"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(getStatusLabel(product.status)),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["color"])
                          ])
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ]),
              __props.products.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center text-gray-500 py-8"
              }, " Tidak ada produk ditemukan ")) : createCommentVNode("v-if", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/ProductPerformanceTable.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TopProductsCards",
  __ssrInlineRender: true,
  props: {
    byViews: {},
    byRating: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$6;
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, _attrs))}><!-- Top by Views -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-eye",
              class: "w-5 h-5 text-blue-500"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="font-semibold"${_scopeId}>Paling Banyak Dilihat</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-eye",
                  class: "w-5 h-5 text-blue-500"
                }),
                createVNode("h3", { class: "font-semibold" }, "Paling Banyak Dilihat")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.byViews, (product, index) => {
              _push2(`<div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"${_scopeId}><span class="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-bold"${_scopeId}>${ssrInterpolate(index + 1)}</span><div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0"${_scopeId}>`);
              if (product.image) {
                _push2(`<img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-photo",
                  class: "w-4 h-4 text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium truncate"${_scopeId}>${ssrInterpolate(product.name)}</p></div><div class="flex items-center gap-1 text-gray-500"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-eye",
                class: "w-4 h-4"
              }, null, _parent2, _scopeId));
              _push2(`<span${_scopeId}>${ssrInterpolate(unref(formatNumber)(product.viewCount || 0))}</span></div></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.byViews.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-4"${_scopeId}> Belum ada data </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.byViews, (product, index) => {
                    return openBlock(), createBlock("div", {
                      key: product.id,
                      class: "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    }, [
                      createVNode(
                        "span",
                        { class: "w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 text-sm font-bold" },
                        toDisplayString(index + 1),
                        1
                        /* TEXT */
                      ),
                      createVNode("div", { class: "w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0" }, [
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
                            name: "i-heroicons-photo",
                            class: "w-4 h-4 text-gray-400"
                          })
                        ]))
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode(
                          "p",
                          { class: "font-medium truncate" },
                          toDisplayString(product.name),
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode("div", { class: "flex items-center gap-1 text-gray-500" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-eye",
                          class: "w-4 h-4"
                        }),
                        createVNode(
                          "span",
                          null,
                          toDisplayString(unref(formatNumber)(product.viewCount || 0)),
                          1
                          /* TEXT */
                        )
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                __props.byViews.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center text-gray-500 py-4"
                }, " Belum ada data ")) : createCommentVNode("v-if", true)
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Top by Rating -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-star",
              class: "w-5 h-5 text-yellow-500"
            }, null, _parent2, _scopeId));
            _push2(`<h3 class="font-semibold"${_scopeId}>Rating Tertinggi</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2" }, [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-star",
                  class: "w-5 h-5 text-yellow-500"
                }),
                createVNode("h3", { class: "font-semibold" }, "Rating Tertinggi")
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-3"${_scopeId}><!--[-->`);
            ssrRenderList(__props.byRating, (product, index) => {
              _push2(`<div class="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"${_scopeId}><span class="w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-sm font-bold"${_scopeId}>${ssrInterpolate(index + 1)}</span><div class="w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0"${_scopeId}>`);
              if (product.image) {
                _push2(`<img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-photo",
                  class: "w-4 h-4 text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium truncate"${_scopeId}>${ssrInterpolate(product.name)}</p></div><div class="flex items-center gap-1"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-star-solid",
                class: "w-4 h-4 text-yellow-400"
              }, null, _parent2, _scopeId));
              _push2(`<span class="font-medium"${_scopeId}>${ssrInterpolate(Number(product.rating || 0).toFixed(1))}</span><span class="text-gray-500 text-sm"${_scopeId}>(${ssrInterpolate(product.totalReviews || 0)})</span></div></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.byRating.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-4"${_scopeId}> Belum ada data </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-3" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.byRating, (product, index) => {
                    return openBlock(), createBlock("div", {
                      key: product.id,
                      class: "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    }, [
                      createVNode(
                        "span",
                        { class: "w-6 h-6 flex items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 text-sm font-bold" },
                        toDisplayString(index + 1),
                        1
                        /* TEXT */
                      ),
                      createVNode("div", { class: "w-10 h-10 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0" }, [
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
                            name: "i-heroicons-photo",
                            class: "w-4 h-4 text-gray-400"
                          })
                        ]))
                      ]),
                      createVNode("div", { class: "flex-1 min-w-0" }, [
                        createVNode(
                          "p",
                          { class: "font-medium truncate" },
                          toDisplayString(product.name),
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode("div", { class: "flex items-center gap-1" }, [
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-star-solid",
                          class: "w-4 h-4 text-yellow-400"
                        }),
                        createVNode(
                          "span",
                          { class: "font-medium" },
                          toDisplayString(Number(product.rating || 0).toFixed(1)),
                          1
                          /* TEXT */
                        ),
                        createVNode(
                          "span",
                          { class: "text-gray-500 text-sm" },
                          "(" + toDisplayString(product.totalReviews || 0) + ")",
                          1
                          /* TEXT */
                        )
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                __props.byRating.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center text-gray-500 py-4"
                }, " Belum ada data ")) : createCommentVNode("v-if", true)
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

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/TopProductsCards.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AnalyticsPagination",
  __ssrInlineRender: true,
  props: {
    pagination: {}
  },
  emits: ["changePage"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const pages = computed(() => {
      const range = [];
      const start = Math.max(1, props.pagination.currentPage - 2);
      const end = Math.min(props.pagination.lastPage, props.pagination.currentPage + 2);
      for (let i = start; i <= end; i++) {
        range.push(i);
      }
      return range;
    });
    const showStartEllipsis = computed(() => pages.value[0] > 1);
    const showEndEllipsis = computed(() => pages.value[pages.value.length - 1] < props.pagination.lastPage);
    const handlePageChange = (page) => {
      if (page >= 1 && page <= props.pagination.lastPage) {
        emit("changePage", page);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$b;
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700" }, _attrs))}><div class="text-sm text-gray-500"> Menampilkan ${ssrInterpolate((__props.pagination.currentPage - 1) * __props.pagination.perPage + 1)} - ${ssrInterpolate(Math.min(__props.pagination.currentPage * __props.pagination.perPage, __props.pagination.total))} dari ${ssrInterpolate(__props.pagination.total)} data </div>`);
      if (__props.pagination.lastPage > 1) {
        _push(`<div class="flex items-center gap-1">`);
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "sm",
          disabled: __props.pagination.currentPage === 1,
          onClick: ($event) => handlePageChange(__props.pagination.currentPage - 1)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-chevron-left" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, { name: "i-heroicons-chevron-left" })
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        if (showStartEllipsis.value) {
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            size: "sm",
            onClick: ($event) => handlePageChange(1)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` 1 `);
              } else {
                return [
                  createTextVNode(" 1 ")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (showStartEllipsis.value) {
          _push(`<span class="px-2 text-gray-500">...</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(pages.value, (page) => {
          _push(ssrRenderComponent(_component_UButton, {
            key: page,
            variant: page === __props.pagination.currentPage ? "solid" : "ghost",
            color: page === __props.pagination.currentPage ? "primary" : "gray",
            size: "sm",
            onClick: ($event) => handlePageChange(page)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(page)}`);
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
          }, _parent));
        });
        _push(`<!--]-->`);
        if (showEndEllipsis.value) {
          _push(`<span class="px-2 text-gray-500">...</span>`);
        } else {
          _push(`<!---->`);
        }
        if (showEndEllipsis.value) {
          _push(ssrRenderComponent(_component_UButton, {
            variant: "ghost",
            size: "sm",
            onClick: ($event) => handlePageChange(__props.pagination.lastPage)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(__props.pagination.lastPage)}`);
              } else {
                return [
                  createTextVNode(
                    toDisplayString(__props.pagination.lastPage),
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
        _push(ssrRenderComponent(_component_UButton, {
          variant: "ghost",
          size: "sm",
          disabled: __props.pagination.currentPage === __props.pagination.lastPage,
          onClick: ($event) => handlePageChange(__props.pagination.currentPage + 1)
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-chevron-right" }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UIcon, { name: "i-heroicons-chevron-right" })
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
      _push(`</div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/AnalyticsPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    summary: {},
    products: {},
    pagination: {},
    topByViews: {},
    topByRating: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const period = ref(props.filters.period || "30days");
    const sortBy = ref(props.filters.sortBy || "totalSold");
    const search = ref(props.filters.search || "");
    const applyFilters = () => {
      router.get(
        "/admin/analytics/products",
        {
          period: period.value,
          sortBy: sortBy.value,
          search: search.value || void 0
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    const handlePageChange = (page) => {
      router.get(
        "/admin/analytics/products",
        {
          period: period.value,
          sortBy: sortBy.value,
          search: search.value || void 0,
          page
        },
        {
          preserveState: true,
          preserveScroll: true
        }
      );
    };
    const exportCSV = () => {
      const params = new URLSearchParams({
        period: period.value,
        sortBy: sortBy.value,
        export: "csv"
      });
      if (search.value) params.append("search", search.value);
      window.open(`/admin/analytics/products?${params.toString()}`, "_blank");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$b;
      const _component_UIcon = _sfc_main$7;
      const _component_UCard = _sfc_main$6;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Performa Produk" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold">Performa Produk</h1><p class="text-gray-500">Analisis performa dan penjualan produk</p></div>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "gray",
        onClick: exportCSV
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-down-tray",
              class: "mr-2"
            }, null, _parent2, _scopeId));
            _push2(` Export CSV `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-down-tray",
                class: "mr-2"
              }),
              createTextVNode(" Export CSV ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Stats Cards -->`);
      _push(ssrRenderComponent(_sfc_main$5, { summary: __props.summary }, null, _parent));
      _push(`<!-- Top Products -->`);
      _push(ssrRenderComponent(_sfc_main$2, {
        "by-views": __props.topByViews,
        "by-rating": __props.topByRating
      }, null, _parent));
      _push(`<!-- Filters -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$4, {
              period: period.value,
              "onUpdate:period": ($event) => period.value = $event,
              "sort-by": sortBy.value,
              "onUpdate:sortBy": ($event) => sortBy.value = $event,
              search: search.value,
              "onUpdate:search": ($event) => search.value = $event,
              onApply: applyFilters
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$4, {
                period: period.value,
                "onUpdate:period": ($event) => period.value = $event,
                "sort-by": sortBy.value,
                "onUpdate:sortBy": ($event) => sortBy.value = $event,
                search: search.value,
                "onUpdate:search": ($event) => search.value = $event,
                onApply: applyFilters
              }, null, 8, ["period", "onUpdate:period", "sort-by", "onUpdate:sortBy", "search", "onUpdate:search"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Products Table -->`);
      _push(ssrRenderComponent(_sfc_main$3, { products: __props.products }, null, _parent));
      _push(`<!-- Pagination -->`);
      if (__props.pagination.lastPage > 1) {
        _push(ssrRenderComponent(_sfc_main$1, {
          pagination: __props.pagination,
          onChangePage: handlePageChange
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/analytics/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
