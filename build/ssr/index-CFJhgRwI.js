import { _ as _sfc_main$5 } from './Card-h3oZeDee.js';
import { _ as _sfc_main$6, a as _sfc_main$8 } from './Button-BTdvmZ8N.js';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, createBlock, createCommentVNode, toDisplayString, openBlock, useSSRContext, createTextVNode, Fragment, renderList, ref } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { Link, Head, router } from '@inertiajs/vue3';
import { a as formatNumber, f as formatCurrency, b as formatPercent, o as orderStatusLabels, c as formatDate, d as orderStatusColors } from './analytics-DeT-yMaP.js';
import { _ as _sfc_main$9, a as _sfc_main$a } from './PeriodSelector-D6q96A6_.js';
import { a as _sfc_main$7 } from './Badge-CQlYH3Fo.js';
import { Doughnut } from 'vue-chartjs';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
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
import './SelectMenu-BqLaY6AT.js';
import './FormField-CdECN7pk.js';
import 'reka-ui/namespaced';
import './Tooltip-C54KurGy.js';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "SalesStatsCards",
  __ssrInlineRender: true,
  props: {
    summary: {}
  },
  setup(__props) {
    const props = __props;
    const stats = computed(() => [
      {
        title: "Total Pesanan",
        value: formatNumber(props.summary.totalOrders),
        growth: props.summary.ordersGrowth,
        icon: "i-heroicons-shopping-cart",
        color: "primary"
      },
      {
        title: "Total Pendapatan",
        value: formatCurrency(props.summary.totalRevenue),
        growth: props.summary.revenueGrowth,
        icon: "i-heroicons-banknotes",
        color: "success"
      },
      {
        title: "Rata-rata Pesanan",
        value: formatCurrency(props.summary.averageOrderValue),
        icon: "i-heroicons-calculator",
        color: "info"
      },
      {
        title: "Total Item Terjual",
        value: formatNumber(props.summary.totalItems),
        icon: "i-heroicons-cube",
        color: "warning"
      }
    ]);
    const getGrowthClass = (growth) => {
      if (growth > 0) return "text-green-500";
      if (growth < 0) return "text-red-500";
      return "text-gray-500";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(stats.value, (stat) => {
        _push(ssrRenderComponent(_component_UCard, {
          key: stat.title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-start justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(stat.title)}</p><p class="mt-1 text-2xl font-bold"${_scopeId}>${ssrInterpolate(stat.value)}</p>`);
              if (stat.growth !== void 0) {
                _push2(`<p class="${ssrRenderClass([getGrowthClass(stat.growth), "mt-1 text-sm"])}"${_scopeId}>${ssrInterpolate(unref(formatPercent)(stat.growth))} dari periode sebelumnya </p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="${ssrRenderClass([{
                "bg-primary-100 dark:bg-primary-900": stat.color === "primary",
                "bg-green-100 dark:bg-green-900": stat.color === "success",
                "bg-blue-100 dark:bg-blue-900": stat.color === "info",
                "bg-yellow-100 dark:bg-yellow-900": stat.color === "warning"
              }, "p-3 rounded-lg"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: stat.icon,
                class: ["w-6 h-6", {
                  "text-primary-500": stat.color === "primary",
                  "text-green-500": stat.color === "success",
                  "text-blue-500": stat.color === "info",
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
                    ),
                    stat.growth !== void 0 ? (openBlock(), createBlock(
                      "p",
                      {
                        key: 0,
                        class: ["mt-1 text-sm", getGrowthClass(stat.growth)]
                      },
                      toDisplayString(unref(formatPercent)(stat.growth)) + " dari periode sebelumnya ",
                      3
                      /* TEXT, CLASS */
                    )) : createCommentVNode("v-if", true)
                  ]),
                  createVNode(
                    "div",
                    {
                      class: ["p-3 rounded-lg", {
                        "bg-primary-100 dark:bg-primary-900": stat.color === "primary",
                        "bg-green-100 dark:bg-green-900": stat.color === "success",
                        "bg-blue-100 dark:bg-blue-900": stat.color === "info",
                        "bg-yellow-100 dark:bg-yellow-900": stat.color === "warning"
                      }]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: stat.icon,
                        class: ["w-6 h-6", {
                          "text-primary-500": stat.color === "primary",
                          "text-green-500": stat.color === "success",
                          "text-blue-500": stat.color === "info",
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

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/SalesStatsCards.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "SalesByStatusChart",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    Chart.register(ArcElement, Tooltip, Legend);
    const props = __props;
    const statusColors = {
      pending_payment: "rgb(251, 191, 36)",
      paid: "rgb(16, 185, 129)",
      processing: "rgb(59, 130, 246)",
      shipped: "rgb(139, 92, 246)",
      delivered: "rgb(34, 197, 94)",
      cancelled: "rgb(239, 68, 68)"
    };
    const chartData = computed(() => {
      const labels = [];
      const values = [];
      const colors = [];
      Object.entries(props.data).forEach(([key, value]) => {
        if (value > 0) {
          labels.push(orderStatusLabels[key] || key);
          values.push(value);
          colors.push(statusColors[key] || "rgb(156, 163, 175)");
        }
      });
      return {
        labels,
        datasets: [
          {
            data: values,
            backgroundColor: colors,
            borderWidth: 0
          }
        ]
      };
    });
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right"
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = (context.parsed / total * 100).toFixed(1);
              return `${context.label}: ${context.parsed} (${percentage}%)`;
            }
          }
        }
      }
    };
    const totalOrders = computed(
      () => Object.values(props.data).reduce((sum, val) => sum + val, 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UBadge = _sfc_main$7;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Pesanan Berdasarkan Status</h3>`);
            _push2(ssrRenderComponent(_component_UBadge, {
              color: "gray",
              variant: "soft"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Total: ${ssrInterpolate(totalOrders.value)}`);
                } else {
                  return [
                    createTextVNode(
                      " Total: " + toDisplayString(totalOrders.value),
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
                createVNode("h3", { class: "text-lg font-semibold" }, "Pesanan Berdasarkan Status"),
                createVNode(_component_UBadge, {
                  color: "gray",
                  variant: "soft"
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      " Total: " + toDisplayString(totalOrders.value),
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
            _push2(`<div class="h-64"${_scopeId}>`);
            if (totalOrders.value > 0) {
              _push2(ssrRenderComponent(unref(Doughnut), {
                data: chartData.value,
                options: chartOptions
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<div class="flex items-center justify-center h-full text-gray-500"${_scopeId}> Tidak ada data pesanan </div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "h-64" }, [
                totalOrders.value > 0 ? (openBlock(), createBlock(unref(Doughnut), {
                  key: 0,
                  data: chartData.value,
                  options: chartOptions
                }, null, 8, ["data"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex items-center justify-center h-full text-gray-500"
                }, " Tidak ada data pesanan "))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/SalesByStatusChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TopSellingProducts",
  __ssrInlineRender: true,
  props: {
    products: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold"${_scopeId}>Produk Terlaris</h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold" }, "Produk Terlaris")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><!--[-->`);
            ssrRenderList(__props.products, (product, index) => {
              _push2(`<div class="flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"${_scopeId}><div class="flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-bold"${_scopeId}>${ssrInterpolate(index + 1)}</div><div class="w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0"${_scopeId}>`);
              if (product.image) {
                _push2(`<img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover"${_scopeId}>`);
              } else {
                _push2(`<div class="w-full h-full flex items-center justify-center"${_scopeId}>`);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-photo",
                  class: "w-6 h-6 text-gray-400"
                }, null, _parent2, _scopeId));
                _push2(`</div>`);
              }
              _push2(`</div><div class="flex-1 min-w-0"${_scopeId}><p class="font-medium truncate"${_scopeId}>${ssrInterpolate(product.name)}</p><p class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(formatNumber)(product.totalQuantity))} terjual </p></div><div class="text-right"${_scopeId}><p class="font-semibold text-green-600"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(product.totalRevenue))}</p></div></div>`);
            });
            _push2(`<!--]-->`);
            if (__props.products.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-8"${_scopeId}> Belum ada data penjualan </div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(__props.products, (product, index) => {
                    return openBlock(), createBlock("div", {
                      key: product.id,
                      class: "flex items-center gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
                    }, [
                      createVNode(
                        "div",
                        { class: "flex items-center justify-center w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400 font-bold" },
                        toDisplayString(index + 1),
                        1
                        /* TEXT */
                      ),
                      createVNode("div", { class: "w-12 h-12 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-700 shrink-0" }, [
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
                            class: "w-6 h-6 text-gray-400"
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
                        ),
                        createVNode(
                          "p",
                          { class: "text-sm text-gray-500" },
                          toDisplayString(unref(formatNumber)(product.totalQuantity)) + " terjual ",
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode("div", { class: "text-right" }, [
                        createVNode(
                          "p",
                          { class: "font-semibold text-green-600" },
                          toDisplayString(unref(formatCurrency)(product.totalRevenue)),
                          1
                          /* TEXT */
                        )
                      ])
                    ]);
                  }),
                  128
                  /* KEYED_FRAGMENT */
                )),
                __props.products.length === 0 ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "text-center text-gray-500 py-8"
                }, " Belum ada data penjualan ")) : createCommentVNode("v-if", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/TopSellingProducts.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RecentOrdersTable",
  __ssrInlineRender: true,
  props: {
    orders: {}
  },
  setup(__props) {
    const getStatusColor = (status) => {
      return orderStatusColors[status] || "gray";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$6;
      const _component_UBadge = _sfc_main$7;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Pesanan Terbaru</h3>`);
            _push2(ssrRenderComponent(unref(Link), { href: "/admin/orders" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UButton, {
                    variant: "ghost",
                    size: "sm"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Lihat Semua `);
                        _push4(ssrRenderComponent(_component_UIcon, {
                          name: "i-heroicons-arrow-right",
                          class: "ml-1"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Lihat Semua "),
                          createVNode(_component_UIcon, {
                            name: "i-heroicons-arrow-right",
                            class: "ml-1"
                          })
                        ];
                      }
                    }),
                    _: 1
                    /* STABLE */
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UButton, {
                      variant: "ghost",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat Semua "),
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-right",
                          class: "ml-1"
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
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-semibold" }, "Pesanan Terbaru"),
                createVNode(unref(Link), { href: "/admin/orders" }, {
                  default: withCtx(() => [
                    createVNode(_component_UButton, {
                      variant: "ghost",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Lihat Semua "),
                        createVNode(_component_UIcon, {
                          name: "i-heroicons-arrow-right",
                          class: "ml-1"
                        })
                      ]),
                      _: 1
                      /* STABLE */
                    })
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
            _push2(`<div class="overflow-x-auto"${_scopeId}><table class="w-full text-sm"${_scopeId}><thead${_scopeId}><tr class="border-b border-gray-200 dark:border-gray-700"${_scopeId}><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>No. Pesanan</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Pelanggan</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Total</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Status</th><th class="text-left py-3 px-4 font-medium text-gray-500"${_scopeId}>Tanggal</th></tr></thead><tbody${_scopeId}><!--[-->`);
            ssrRenderList(__props.orders, (order) => {
              _push2(`<tr class="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"${_scopeId}><td class="py-3 px-4"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(Link), {
                href: `/admin/orders/${order.id}`,
                class: "text-primary-500 hover:text-primary-600 font-medium"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(order.orderNumber)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(order.orderNumber),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`</td><td class="py-3 px-4"${_scopeId}>${ssrInterpolate(order.customerName)}</td><td class="py-3 px-4 font-medium"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(order.total))}</td><td class="py-3 px-4"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UBadge, {
                color: getStatusColor(order.status),
                variant: "soft"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(unref(orderStatusLabels)[order.status] || order.status)}`);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(unref(orderStatusLabels)[order.status] || order.status),
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 2
                /* DYNAMIC */
              }, _parent2, _scopeId));
              _push2(`</td><td class="py-3 px-4 text-gray-500"${_scopeId}>${ssrInterpolate(unref(formatDate)(order.createdAt))}</td></tr>`);
            });
            _push2(`<!--]--></tbody></table></div>`);
            if (__props.orders.length === 0) {
              _push2(`<div class="text-center text-gray-500 py-8"${_scopeId}> Belum ada pesanan </div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode("div", { class: "overflow-x-auto" }, [
                createVNode("table", { class: "w-full text-sm" }, [
                  createVNode("thead", null, [
                    createVNode("tr", { class: "border-b border-gray-200 dark:border-gray-700" }, [
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "No. Pesanan"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Pelanggan"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Total"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Status"),
                      createVNode("th", { class: "text-left py-3 px-4 font-medium text-gray-500" }, "Tanggal")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(
                      Fragment,
                      null,
                      renderList(__props.orders, (order) => {
                        return openBlock(), createBlock("tr", {
                          key: order.id,
                          class: "border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }, [
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode(unref(Link), {
                              href: `/admin/orders/${order.id}`,
                              class: "text-primary-500 hover:text-primary-600 font-medium"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(order.orderNumber),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["href"])
                          ]),
                          createVNode(
                            "td",
                            { class: "py-3 px-4" },
                            toDisplayString(order.customerName),
                            1
                            /* TEXT */
                          ),
                          createVNode(
                            "td",
                            { class: "py-3 px-4 font-medium" },
                            toDisplayString(unref(formatCurrency)(order.total)),
                            1
                            /* TEXT */
                          ),
                          createVNode("td", { class: "py-3 px-4" }, [
                            createVNode(_component_UBadge, {
                              color: getStatusColor(order.status),
                              variant: "soft"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(
                                  toDisplayString(unref(orderStatusLabels)[order.status] || order.status),
                                  1
                                  /* TEXT */
                                )
                              ]),
                              _: 2
                              /* DYNAMIC */
                            }, 1032, ["color"])
                          ]),
                          createVNode(
                            "td",
                            { class: "py-3 px-4 text-gray-500" },
                            toDisplayString(unref(formatDate)(order.createdAt)),
                            1
                            /* TEXT */
                          )
                        ]);
                      }),
                      128
                      /* KEYED_FRAGMENT */
                    ))
                  ])
                ])
              ]),
              __props.orders.length === 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "text-center text-gray-500 py-8"
              }, " Belum ada pesanan ")) : createCommentVNode("v-if", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/RecentOrdersTable.vue");
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
    dailySales: {},
    salesByStatus: {},
    topProducts: {},
    recentOrders: {},
    filters: {}
  },
  setup(__props) {
    const props = __props;
    const period = ref(props.filters.period || "30days");
    const dateFrom = ref(props.filters.dateFrom || "");
    const dateTo = ref(props.filters.dateTo || "");
    const applyFilters = () => {
      const params = {
        period: period.value
      };
      if (period.value === "custom") {
        if (dateFrom.value) params.dateFrom = dateFrom.value;
        if (dateTo.value) params.dateTo = dateTo.value;
      }
      router.get("/admin/analytics/sales", params, {
        preserveState: true,
        preserveScroll: true
      });
    };
    const exportCSV = () => {
      const params = new URLSearchParams({
        period: period.value,
        export: "csv"
      });
      if (period.value === "custom") {
        if (dateFrom.value) params.append("dateFrom", dateFrom.value);
        if (dateTo.value) params.append("dateTo", dateTo.value);
      }
      window.open(`/admin/analytics/sales?${params.toString()}`, "_blank");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$6;
      const _component_UCard = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Analisis Penjualan" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold">Analisis Penjualan</h1><p class="text-gray-500">Statistik dan laporan penjualan</p></div>`);
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
      _push(`</div><!-- Period Selector -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$9, {
              period: period.value,
              "onUpdate:period": ($event) => period.value = $event,
              "date-from": dateFrom.value,
              "onUpdate:dateFrom": ($event) => dateFrom.value = $event,
              "date-to": dateTo.value,
              "onUpdate:dateTo": ($event) => dateTo.value = $event,
              onApply: applyFilters
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$9, {
                period: period.value,
                "onUpdate:period": ($event) => period.value = $event,
                "date-from": dateFrom.value,
                "onUpdate:dateFrom": ($event) => dateFrom.value = $event,
                "date-to": dateTo.value,
                "onUpdate:dateTo": ($event) => dateTo.value = $event,
                onApply: applyFilters
              }, null, 8, ["period", "onUpdate:period", "date-from", "onUpdate:dateFrom", "date-to", "onUpdate:dateTo"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Stats Cards -->`);
      _push(ssrRenderComponent(_sfc_main$4, { summary: __props.summary }, null, _parent));
      _push(`<!-- Charts Row --><div class="grid grid-cols-1 lg:grid-cols-3 gap-6"><div class="lg:col-span-2">`);
      _push(ssrRenderComponent(_sfc_main$a, { data: __props.dailySales }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$3, { data: __props.salesByStatus }, null, _parent));
      _push(`</div><!-- Products and Orders --><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      _push(ssrRenderComponent(_sfc_main$2, { products: __props.topProducts }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { orders: __props.recentOrders }, null, _parent));
      _push(`</div></div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/analytics/sales/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
