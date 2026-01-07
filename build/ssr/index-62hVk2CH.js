import { _ as _sfc_main$5 } from './Card-Ci6a5H8H.js';
import { _ as _sfc_main$6, a as _sfc_main$7 } from './Button-BBveOjhJ.js';
import { defineComponent, computed, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext, createBlock, openBlock, Fragment, renderList, unref, createSlots, ref, createTextVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { Head, router } from '@inertiajs/vue3';
import { f as formatCurrency, a as formatNumber } from './analytics-DeT-yMaP.js';
import { Bar, Pie } from 'vue-chartjs';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { _ as _sfc_main$8, a as _sfc_main$9 } from './PeriodSelector-DrHXroHK.js';
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
import './Badge-DaOjA2YD.js';
import 'reka-ui/namespaced';
import './SelectMenu-CGTADs72.js';
import './FormField-BIqlRgyi.js';
import './Tooltip-N44Fzd4m.js';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FinanceStatsCards",
  __ssrInlineRender: true,
  props: {
    summary: {}
  },
  setup(__props) {
    const props = __props;
    const stats = computed(() => [
      {
        title: "Total Pendapatan",
        value: formatCurrency(props.summary.totalRevenue),
        icon: "i-heroicons-banknotes",
        color: "success"
      },
      {
        title: "Pendapatan Bersih",
        value: formatCurrency(props.summary.netRevenue),
        icon: "i-heroicons-currency-dollar",
        color: "primary"
      },
      {
        title: "Total Diskon",
        value: formatCurrency(props.summary.totalDiscount),
        icon: "i-heroicons-tag",
        color: "warning",
        negative: true
      },
      {
        title: "Total Ongkir",
        value: formatCurrency(props.summary.totalShippingCost),
        icon: "i-heroicons-truck",
        color: "info"
      }
    ]);
    const secondaryStats = computed(() => [
      {
        title: "Total Pesanan",
        value: formatNumber(props.summary.totalOrders),
        icon: "i-heroicons-shopping-cart"
      },
      {
        title: "Rata-rata Pesanan",
        value: formatCurrency(props.summary.averageOrderValue),
        icon: "i-heroicons-calculator"
      },
      {
        title: "Total Admin Fee",
        value: formatCurrency(props.summary.totalAdminFee),
        icon: "i-heroicons-receipt-percent"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"><!--[-->`);
      ssrRenderList(stats.value, (stat) => {
        _push(ssrRenderComponent(_component_UCard, {
          key: stat.title
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-start justify-between"${_scopeId}><div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(stat.title)}</p><p class="${ssrRenderClass([{ "text-red-500": stat.negative }, "mt-1 text-2xl font-bold"])}"${_scopeId}>${ssrInterpolate(stat.negative ? "-" : "")}${ssrInterpolate(stat.value)}</p></div><div class="${ssrRenderClass([{
                "bg-green-100 dark:bg-green-900": stat.color === "success",
                "bg-primary-100 dark:bg-primary-900": stat.color === "primary",
                "bg-yellow-100 dark:bg-yellow-900": stat.color === "warning",
                "bg-blue-100 dark:bg-blue-900": stat.color === "info"
              }, "p-3 rounded-lg"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: stat.icon,
                class: ["w-6 h-6", {
                  "text-green-500": stat.color === "success",
                  "text-primary-500": stat.color === "primary",
                  "text-yellow-500": stat.color === "warning",
                  "text-blue-500": stat.color === "info"
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
                      {
                        class: ["mt-1 text-2xl font-bold", { "text-red-500": stat.negative }]
                      },
                      toDisplayString(stat.negative ? "-" : "") + toDisplayString(stat.value),
                      3
                      /* TEXT, CLASS */
                    )
                  ]),
                  createVNode(
                    "div",
                    {
                      class: ["p-3 rounded-lg", {
                        "bg-green-100 dark:bg-green-900": stat.color === "success",
                        "bg-primary-100 dark:bg-primary-900": stat.color === "primary",
                        "bg-yellow-100 dark:bg-yellow-900": stat.color === "warning",
                        "bg-blue-100 dark:bg-blue-900": stat.color === "info"
                      }]
                    },
                    [
                      createVNode(_component_UIcon, {
                        name: stat.icon,
                        class: ["w-6 h-6", {
                          "text-green-500": stat.color === "success",
                          "text-primary-500": stat.color === "primary",
                          "text-yellow-500": stat.color === "warning",
                          "text-blue-500": stat.color === "info"
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
      _push(`<!--]--></div><div class="grid grid-cols-1 sm:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(secondaryStats.value, (stat) => {
        _push(ssrRenderComponent(_component_UCard, {
          key: stat.title,
          class: "bg-gray-50 dark:bg-gray-800"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center gap-3"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: stat.icon,
                class: "w-5 h-5 text-gray-500"
              }, null, _parent2, _scopeId));
              _push2(`<div${_scopeId}><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}>${ssrInterpolate(stat.title)}</p><p class="font-semibold"${_scopeId}>${ssrInterpolate(stat.value)}</p></div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(_component_UIcon, {
                    name: stat.icon,
                    class: "w-5 h-5 text-gray-500"
                  }, null, 8, ["name"]),
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
                      { class: "font-semibold" },
                      toDisplayString(stat.value),
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
      _push(`<!--]--></div></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/FinanceStatsCards.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "WalletSummaryCard",
  __ssrInlineRender: true,
  props: {
    summary: {}
  },
  setup(__props) {
    const props = __props;
    const stats = computed(() => [
      {
        title: "Top Up",
        value: formatCurrency(props.summary.topupTotal),
        icon: "i-heroicons-arrow-down-circle",
        color: "text-green-500",
        bgColor: "bg-green-100 dark:bg-green-900"
      },
      {
        title: "Penarikan",
        value: formatCurrency(props.summary.withdrawalTotal),
        icon: "i-heroicons-arrow-up-circle",
        color: "text-red-500",
        bgColor: "bg-red-100 dark:bg-red-900"
      },
      {
        title: "Komisi Affiliate",
        value: formatCurrency(props.summary.commissionTotal),
        icon: "i-heroicons-users",
        color: "text-purple-500",
        bgColor: "bg-purple-100 dark:bg-purple-900"
      },
      {
        title: "Refund",
        value: formatCurrency(props.summary.refundTotal),
        icon: "i-heroicons-arrow-uturn-left",
        color: "text-orange-500",
        bgColor: "bg-orange-100 dark:bg-orange-900"
      }
    ]);
    const netFlowClass = computed(() => {
      if (props.summary.netWalletFlow > 0) return "text-green-500";
      if (props.summary.netWalletFlow < 0) return "text-red-500";
      return "text-gray-500";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Ringkasan Wallet</h3><div class="text-right"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Net Flow</p><p class="${ssrRenderClass([netFlowClass.value, "text-xl font-bold"])}"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(__props.summary.netWalletFlow))}</p></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-semibold" }, "Ringkasan Wallet"),
                createVNode("div", { class: "text-right" }, [
                  createVNode("p", { class: "text-sm text-gray-500" }, "Net Flow"),
                  createVNode(
                    "p",
                    {
                      class: ["text-xl font-bold", netFlowClass.value]
                    },
                    toDisplayString(unref(formatCurrency)(__props.summary.netWalletFlow)),
                    3
                    /* TEXT, CLASS */
                  )
                ])
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-2 lg:grid-cols-4 gap-4"${_scopeId}><!--[-->`);
            ssrRenderList(stats.value, (stat) => {
              _push2(`<div class="p-4 rounded-lg bg-gray-50 dark:bg-gray-800"${_scopeId}><div class="flex items-center gap-2 mb-2"${_scopeId}><div class="${ssrRenderClass([stat.bgColor, "p-2 rounded-lg"])}"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: stat.icon,
                class: ["w-5 h-5", stat.color]
              }, null, _parent2, _scopeId));
              _push2(`</div><span class="text-sm text-gray-500"${_scopeId}>${ssrInterpolate(stat.title)}</span></div><p class="text-lg font-semibold"${_scopeId}>${ssrInterpolate(stat.value)}</p></div>`);
            });
            _push2(`<!--]--></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, [
                (openBlock(true), createBlock(
                  Fragment,
                  null,
                  renderList(stats.value, (stat) => {
                    return openBlock(), createBlock("div", {
                      key: stat.title,
                      class: "p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
                    }, [
                      createVNode("div", { class: "flex items-center gap-2 mb-2" }, [
                        createVNode(
                          "div",
                          {
                            class: ["p-2 rounded-lg", stat.bgColor]
                          },
                          [
                            createVNode(_component_UIcon, {
                              name: stat.icon,
                              class: ["w-5 h-5", stat.color]
                            }, null, 8, ["name", "class"])
                          ],
                          2
                          /* CLASS */
                        ),
                        createVNode(
                          "span",
                          { class: "text-sm text-gray-500" },
                          toDisplayString(stat.title),
                          1
                          /* TEXT */
                        )
                      ]),
                      createVNode(
                        "p",
                        { class: "text-lg font-semibold" },
                        toDisplayString(stat.value),
                        1
                        /* TEXT */
                      )
                    ]);
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
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/WalletSummaryCard.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MonthlyRevenueChart",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
    const props = __props;
    const chartData = computed(() => ({
      labels: props.data.map((d) => d.month),
      datasets: [
        {
          label: "Pendapatan",
          data: props.data.map((d) => d.revenue),
          backgroundColor: "rgba(59, 130, 246, 0.8)",
          borderColor: "rgb(59, 130, 246)",
          borderWidth: 1,
          borderRadius: 4
        }
      ]
    }));
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
              }).format(context.parsed.y);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return "Rp " + new Intl.NumberFormat("id-ID").format(value);
            }
          }
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold"${_scopeId}>Pendapatan Bulanan</h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold" }, "Pendapatan Bulanan")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-80"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Bar), {
              data: chartData.value,
              options: chartOptions
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "h-80" }, [
                createVNode(unref(Bar), {
                  data: chartData.value,
                  options: chartOptions
                }, null, 8, ["data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/MonthlyRevenueChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaymentMethodsChart",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    Chart.register(ArcElement, Tooltip, Legend);
    const props = __props;
    const colors = [
      "rgb(59, 130, 246)",
      "rgb(16, 185, 129)",
      "rgb(251, 191, 36)",
      "rgb(139, 92, 246)",
      "rgb(236, 72, 153)",
      "rgb(249, 115, 22)"
    ];
    const chartData = computed(() => ({
      labels: props.data.map((d) => d.method || "Lainnya"),
      datasets: [
        {
          data: props.data.map((d) => d.total),
          backgroundColor: props.data.map((_, i) => colors[i % colors.length]),
          borderWidth: 0
        }
      ]
    }));
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
              const method = props.data[context.dataIndex];
              const percentage = (context.parsed / context.dataset.data.reduce((a, b) => a + b, 0) * 100).toFixed(1);
              return [
                `${context.label}: ${formatCurrency(context.parsed)}`,
                `${method.count} transaksi (${percentage}%)`
              ];
            }
          }
        }
      }
    };
    const totalTransactions = computed(
      () => props.data.reduce((sum, d) => sum + d.count, 0)
    );
    const totalAmount = computed(
      () => props.data.reduce((sum, d) => sum + d.total, 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$5;
      _push(ssrRenderComponent(_component_UCard, _attrs, createSlots({
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="text-lg font-semibold"${_scopeId}>Metode Pembayaran</h3><div class="text-right text-sm text-gray-500"${_scopeId}>${ssrInterpolate(unref(formatNumber)(totalTransactions.value))} transaksi </div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "text-lg font-semibold" }, "Metode Pembayaran"),
                createVNode(
                  "div",
                  { class: "text-right text-sm text-gray-500" },
                  toDisplayString(unref(formatNumber)(totalTransactions.value)) + " transaksi ",
                  1
                  /* TEXT */
                )
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-64"${_scopeId}>`);
            if (__props.data.length > 0) {
              _push2(ssrRenderComponent(unref(Pie), {
                data: chartData.value,
                options: chartOptions
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<div class="flex items-center justify-center h-full text-gray-500"${_scopeId}> Tidak ada data pembayaran </div>`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "h-64" }, [
                __props.data.length > 0 ? (openBlock(), createBlock(unref(Pie), {
                  key: 0,
                  data: chartData.value,
                  options: chartOptions
                }, null, 8, ["data"])) : (openBlock(), createBlock("div", {
                  key: 1,
                  class: "flex items-center justify-center h-full text-gray-500"
                }, " Tidak ada data pembayaran "))
              ])
            ];
          }
        }),
        _: 2
        /* DYNAMIC */
      }, [
        __props.data.length > 0 ? {
          name: "footer",
          fn: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="text-center"${_scopeId}><p class="text-sm text-gray-500"${_scopeId}>Total</p><p class="text-lg font-bold text-green-600"${_scopeId}>${ssrInterpolate(unref(formatCurrency)(totalAmount.value))}</p></div>`);
            } else {
              return [
                createVNode("div", { class: "text-center" }, [
                  createVNode("p", { class: "text-sm text-gray-500" }, "Total"),
                  createVNode(
                    "p",
                    { class: "text-lg font-bold text-green-600" },
                    toDisplayString(unref(formatCurrency)(totalAmount.value)),
                    1
                    /* TEXT */
                  )
                ])
              ];
            }
          }),
          key: "0"
        } : void 0
      ]), _parent));
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/PaymentMethodsChart.vue");
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
    walletSummary: {},
    dailyRevenue: {},
    monthlyData: {},
    paymentMethods: {},
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
      router.get("/admin/analytics/finance", params, {
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
      window.open(`/admin/analytics/finance?${params.toString()}`, "_blank");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$7;
      const _component_UIcon = _sfc_main$6;
      const _component_UCard = _sfc_main$5;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(Head), { title: "Laporan Keuangan" }, null, _parent));
      _push(`<div class="space-y-6"><!-- Header --><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold">Laporan Keuangan</h1><p class="text-gray-500">Ringkasan keuangan dan pembayaran</p></div>`);
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
            _push2(ssrRenderComponent(_sfc_main$8, {
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
              createVNode(_sfc_main$8, {
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
      _push(`<!-- Finance Stats -->`);
      _push(ssrRenderComponent(_sfc_main$4, { summary: __props.summary }, null, _parent));
      _push(`<!-- Wallet Summary -->`);
      _push(ssrRenderComponent(_sfc_main$3, { summary: __props.walletSummary }, null, _parent));
      _push(`<!-- Charts Row --><div class="grid grid-cols-1 lg:grid-cols-2 gap-6">`);
      _push(ssrRenderComponent(_sfc_main$2, { data: __props.monthlyData }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { data: __props.paymentMethods }, null, _parent));
      _push(`</div><!-- Daily Revenue Chart using Sales Chart -->`);
      _push(ssrRenderComponent(_sfc_main$9, { data: __props.dailyRevenue }, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/analytics/finance/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
