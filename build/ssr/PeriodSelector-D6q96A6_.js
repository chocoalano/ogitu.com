import { _ as _sfc_main$2 } from './Card-h3oZeDee.js';
import { defineComponent, computed, withCtx, unref, createVNode, useSSRContext, mergeProps, createTextVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { Line } from 'vue-chartjs';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { a as _sfc_main$6, _ as _sfc_main$7 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$5 } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$4 } from './SelectMenu-BqLaY6AT.js';
import { _ as _sfc_main$3 } from './FormField-CdECN7pk.js';
import { p as periodOptions } from './analytics-DeT-yMaP.js';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SalesChart",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    Chart.register(
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      Title,
      Tooltip,
      Legend,
      Filler
    );
    const props = __props;
    const chartData = computed(() => ({
      labels: props.data.map(
        (d) => new Date(d.date).toLocaleDateString("id-ID", { day: "numeric", month: "short" })
      ),
      datasets: [
        {
          label: "Pendapatan",
          data: props.data.map((d) => d.revenue),
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          fill: true,
          tension: 0.4,
          yAxisID: "y"
        },
        {
          label: "Pesanan",
          data: props.data.map((d) => d.orders),
          borderColor: "rgb(16, 185, 129)",
          backgroundColor: "rgba(16, 185, 129, 0.1)",
          fill: false,
          tension: 0.4,
          yAxisID: "y1"
        }
      ]
    }));
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false
      },
      plugins: {
        legend: {
          position: "top"
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              let label = context.dataset.label || "";
              if (label) {
                label += ": ";
              }
              if (context.parsed.y !== null) {
                if (context.datasetIndex === 0) {
                  label += new Intl.NumberFormat("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0
                  }).format(context.parsed.y);
                } else {
                  label += context.parsed.y + " pesanan";
                }
              }
              return label;
            }
          }
        }
      },
      scales: {
        y: {
          type: "linear",
          display: true,
          position: "left",
          title: {
            display: true,
            text: "Pendapatan (Rp)"
          },
          ticks: {
            callback: function(value) {
              return "Rp " + new Intl.NumberFormat("id-ID").format(value);
            }
          }
        },
        y1: {
          type: "linear",
          display: true,
          position: "right",
          title: {
            display: true,
            text: "Jumlah Pesanan"
          },
          grid: {
            drawOnChartArea: false
          }
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = _sfc_main$2;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="text-lg font-semibold"${_scopeId}>Grafik Penjualan</h3>`);
          } else {
            return [
              createVNode("h3", { class: "text-lg font-semibold" }, "Grafik Penjualan")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-80"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Line), {
              data: chartData.value,
              options: chartOptions
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "h-80" }, [
                createVNode(unref(Line), {
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

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/SalesChart.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "PeriodSelector",
  __ssrInlineRender: true,
  props: {
    period: {},
    dateFrom: {},
    dateTo: {}
  },
  emits: ["update:period", "update:dateFrom", "update:dateTo", "apply"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const selectedPeriod = computed({
      get: () => props.period,
      set: (value) => emit("update:period", value)
    });
    const fromDate = computed({
      get: () => props.dateFrom,
      set: (value) => emit("update:dateFrom", value || "")
    });
    const toDate = computed({
      get: () => props.dateTo,
      set: (value) => emit("update:dateTo", value || "")
    });
    const showCustomDates = computed(() => props.period === "custom");
    const handleApply = () => {
      emit("apply");
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UFormField = _sfc_main$3;
      const _component_USelectMenu = _sfc_main$4;
      const _component_UInput = _sfc_main$5;
      const _component_UButton = _sfc_main$6;
      const _component_UIcon = _sfc_main$7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-wrap items-end gap-3" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UFormField, { label: "Periode" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_USelectMenu, {
              modelValue: selectedPeriod.value,
              "onUpdate:modelValue": ($event) => selectedPeriod.value = $event,
              items: unref(periodOptions),
              "value-key": "value",
              class: "w-48"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_USelectMenu, {
                modelValue: selectedPeriod.value,
                "onUpdate:modelValue": ($event) => selectedPeriod.value = $event,
                items: unref(periodOptions),
                "value-key": "value",
                class: "w-48"
              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      if (showCustomDates.value) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_UFormField, { label: "Dari Tanggal" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: fromDate.value,
                "onUpdate:modelValue": ($event) => fromDate.value = $event,
                type: "date",
                class: "w-40"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  modelValue: fromDate.value,
                  "onUpdate:modelValue": ($event) => fromDate.value = $event,
                  type: "date",
                  class: "w-40"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UFormField, { label: "Sampai Tanggal" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UInput, {
                modelValue: toDate.value,
                "onUpdate:modelValue": ($event) => toDate.value = $event,
                type: "date",
                class: "w-40"
              }, null, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UInput, {
                  modelValue: toDate.value,
                  "onUpdate:modelValue": ($event) => toDate.value = $event,
                  type: "date",
                  class: "w-40"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
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
            _push2(` Terapkan `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-funnel",
                class: "mr-1"
              }),
              createTextVNode(" Terapkan ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/analytics/PeriodSelector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$1 as a };
