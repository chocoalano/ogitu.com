import { defineComponent, mergeProps, withCtx, createTextVNode, createVNode, useSSRContext, computed, unref, toDisplayString, ref, watch } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderList, ssrRenderTeleport } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { _ as _sfc_main$b, a as _sfc_main$d, u as useToast } from './Badge-DaOjA2YD.js';
import { A as AdminLayout } from './admin-CGUULoJY.js';
import { a as _sfc_main$9, _ as _sfc_main$a } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$c } from './Select-1_-G9zx4.js';
import { _ as _sfc_main$e } from './Pagination-C9h35VkF.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-BqI2j5ZJ.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'reka-ui/namespaced';
import './Tooltip-N44Fzd4m.js';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "InventoryHeader",
  __ssrInlineRender: true,
  props: {
    storeName: {},
    editMode: { type: Boolean },
    isSaving: { type: Boolean },
    hasChanges: { type: Boolean }
  },
  emits: ["toggle-edit", "save", "cancel"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$9;
      const _component_UIcon = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" }, _attrs))}><div><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Manajemen Stok</h1><p class="text-sm text-slate-500 dark:text-slate-400 mt-1"> Kelola stok produk dan varian toko ${ssrInterpolate(__props.storeName)}</p></div><div class="flex items-center gap-3">`);
      if (__props.editMode) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_UButton, {
          color: "neutral",
          variant: "outline",
          onClick: ($event) => emit("cancel"),
          disabled: __props.isSaving
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Batal `);
            } else {
              return [
                createTextVNode(" Batal ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          onClick: ($event) => emit("save"),
          loading: __props.isSaving,
          disabled: !__props.hasChanges
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-check",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Simpan Perubahan `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-check",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" Simpan Perubahan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<!--]-->`);
      } else {
        _push(ssrRenderComponent(_component_UButton, {
          color: "primary",
          onClick: ($event) => emit("toggle-edit")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-pencil-square",
                class: "w-4 h-4 mr-1"
              }, null, _parent2, _scopeId));
              _push2(` Edit Stok `);
            } else {
              return [
                createVNode(_component_UIcon, {
                  name: "i-heroicons-pencil-square",
                  class: "w-4 h-4 mr-1"
                }),
                createTextVNode(" Edit Stok ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      }
      _push(`</div></div>`);
    };
  }
});

const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/inventory/InventoryHeader.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};

const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "InventoryStats",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 md:grid-cols-5 gap-4" }, _attrs))}><!-- Total Products --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-cube",
        class: "w-5 h-5 text-violet-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Total Produk</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.totalProducts)}</p></div></div></div><!-- In Stock --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-check-circle",
        class: "w-5 h-5 text-green-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Stok Tersedia</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.inStock)}</p></div></div></div><!-- Low Stock --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-exclamation-triangle",
        class: "w-5 h-5 text-amber-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Stok Rendah</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.lowStock)}</p></div></div></div><!-- Out of Stock --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-x-circle",
        class: "w-5 h-5 text-red-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Stok Habis</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.outOfStock)}</p></div></div></div><!-- Total Variants --><div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-2x2",
        class: "w-5 h-5 text-blue-500"
      }, null, _parent));
      _push(`</div><div><p class="text-xs text-slate-500 dark:text-slate-400">Total Varian</p><p class="text-lg font-semibold text-slate-900 dark:text-white">${ssrInterpolate(__props.stats.totalVariants)}</p></div></div></div></div>`);
    };
  }
});

const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/inventory/InventoryStats.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};

const getStockBadge = (stock) => {
  if (stock <= 0) return { label: "Habis", color: "error" };
  if (stock <= 10) return { label: "Rendah", color: "warning" };
  return { label: "Tersedia", color: "success" };
};
const getStatusBadge = (status) => {
  const config = {
    active: { label: "Aktif", color: "success" },
    draft: { label: "Draft", color: "neutral" },
    inactive: { label: "Nonaktif", color: "warning" },
    out_of_stock: { label: "Stok Habis", color: "error" }
  };
  return config[status] || { label: status, color: "neutral" };
};
const formatCurrency = (value) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0
  }).format(value);
};
const stockStatusOptions = [
  { label: "Semua Stok", value: void 0 },
  { label: "Stok Tersedia", value: "in_stock" },
  { label: "Stok Rendah", value: "low_stock" },
  { label: "Stok Habis", value: "out_of_stock" }
];
const productStatusOptions = [
  { label: "Semua Status", value: void 0 },
  { label: "Aktif", value: "active" },
  { label: "Draft", value: "draft" },
  { label: "Nonaktif", value: "inactive" },
  { label: "Stok Habis", value: "out_of_stock" }
];

const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "InventoryFilters",
  __ssrInlineRender: true,
  props: {
    filters: {},
    categories: {},
    search: {}
  },
  emits: ["update:filters", "update:search", "search", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const localFilters = computed({
      get: () => props.filters,
      set: (value) => emit("update:filters", value)
    });
    const localSearch = computed({
      get: () => props.search,
      set: (value) => emit("update:search", value)
    });
    const categoryOptions = computed(() => [
      { label: "Semua Kategori", value: void 0 },
      ...props.categories.map((c) => ({ label: c.name, value: c.id }))
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$b;
      const _component_USelect = _sfc_main$c;
      const _component_UButton = _sfc_main$9;
      const _component_UIcon = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 border-b border-slate-200 dark:border-slate-700" }, _attrs))}><div class="grid grid-cols-1 md:grid-cols-5 gap-4">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: localSearch.value,
        "onUpdate:modelValue": ($event) => localSearch.value = $event,
        placeholder: "Cari produk atau SKU...",
        icon: "i-heroicons-magnifying-glass",
        onKeyup: ($event) => emit("search")
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: localFilters.value.stockStatus,
        "onUpdate:modelValue": ($event) => localFilters.value.stockStatus = $event,
        items: unref(stockStatusOptions),
        "value-key": "value",
        placeholder: "Filter Stok"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: localFilters.value.status,
        "onUpdate:modelValue": ($event) => localFilters.value.status = $event,
        items: unref(productStatusOptions),
        "value-key": "value",
        placeholder: "Filter Status"
      }, null, _parent));
      _push(ssrRenderComponent(_component_USelect, {
        modelValue: localFilters.value.categoryId,
        "onUpdate:modelValue": ($event) => localFilters.value.categoryId = $event,
        items: categoryOptions.value,
        "value-key": "value",
        placeholder: "Filter Kategori"
      }, null, _parent));
      _push(`<div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        onClick: ($event) => emit("search"),
        class: "flex-1"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-magnifying-glass",
              class: "w-4 h-4 mr-1"
            }, null, _parent2, _scopeId));
            _push2(` Cari `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-magnifying-glass",
                class: "w-4 h-4 mr-1"
              }),
              createTextVNode(" Cari ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        color: "neutral",
        variant: "outline",
        onClick: ($event) => emit("reset")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4"
              })
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

const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/inventory/InventoryFilters.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "InventoryProductRow",
  __ssrInlineRender: true,
  props: {
    product: {},
    editMode: { type: Boolean },
    isExpanded: { type: Boolean },
    editedStock: {}
  },
  emits: ["toggle-expand", "update-stock"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentStock = computed(() => {
      return props.editedStock?.stock ?? props.product.stock;
    });
    const isStockModified = computed(() => {
      if (!props.editedStock) return false;
      return props.editedStock.stock !== props.product.stock;
    });
    const handleStockUpdate = (value) => {
      emit("update-stock", props.product.id, Number(value) || 0);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$a;
      const _component_UInput = _sfc_main$b;
      const _component_UBadge = _sfc_main$d;
      _push(`<tr${ssrRenderAttrs(mergeProps({ class: "hover:bg-slate-50 dark:hover:bg-slate-900/20 transition-colors" }, _attrs))}><!-- Expand Button --><td class="px-4 py-3">`);
      if (__props.product.hasVariants) {
        _push(`<button class="w-6 h-6 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: __props.isExpanded ? "i-heroicons-chevron-down" : "i-heroicons-chevron-right",
          class: "w-4 h-4 text-slate-500"
        }, null, _parent));
        _push(`</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</td><!-- Product Info --><td class="px-4 py-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 shrink-0">`);
      if (__props.product.primaryImage) {
        _push(`<img${ssrRenderAttr("src", __props.product.primaryImage.url)}${ssrRenderAttr("alt", __props.product.name)} class="w-full h-full object-cover">`);
      } else {
        _push(`<div class="w-full h-full flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-photo",
          class: "w-5 h-5 text-slate-400"
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div><div class="min-w-0"><p class="text-sm font-medium text-slate-900 dark:text-white truncate">${ssrInterpolate(__props.product.name)}</p>`);
      if (__props.product.hasVariants) {
        _push(`<p class="text-xs text-blue-500">${ssrInterpolate(__props.product.variants.length)} varian </p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></td><!-- SKU --><td class="px-4 py-3"><span class="text-sm font-mono text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.product.sku || "-")}</span></td><!-- Category --><td class="px-4 py-3"><span class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.product.category?.name || "-")}</span></td><!-- Stock --><td class="px-4 py-3 text-center">`);
      if (__props.editMode) {
        _push(ssrRenderComponent(_component_UInput, {
          type: "number",
          "model-value": currentStock.value,
          "onUpdate:modelValue": handleStockUpdate,
          min: "0",
          class: ["w-24 mx-auto", { "ring-2 ring-violet-500": isStockModified.value }],
          size: "sm"
        }, null, _parent));
      } else {
        _push(`<!--[--><span class="text-sm font-medium text-slate-900 dark:text-white">${ssrInterpolate(__props.product.stock)}</span>`);
        if (__props.product.hasVariants) {
          _push(`<span class="text-xs text-slate-500 block"> (+${ssrInterpolate(__props.product.totalVariantStock)} varian) </span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</td><!-- Variants Count --><td class="px-4 py-3 text-center">`);
      if (__props.product.hasVariants) {
        _push(`<span class="text-sm text-blue-500">${ssrInterpolate(__props.product.variants.length)} varian</span>`);
      } else {
        _push(`<span class="text-slate-400">-</span>`);
      }
      _push(`</td><!-- Stock Status --><td class="px-4 py-3 text-center">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(getStockBadge)(currentStock.value).color,
        variant: "subtle",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getStockBadge)(currentStock.value).label)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(getStockBadge)(currentStock.value).label),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</td><!-- Product Status --><td class="px-4 py-3 text-center">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(getStatusBadge)(__props.product.status).color,
        variant: "subtle",
        size: "sm"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getStatusBadge)(__props.product.status).label)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(getStatusBadge)(__props.product.status).label),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</td></tr>`);
    };
  }
});

const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/inventory/InventoryProductRow.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "InventoryVariantRow",
  __ssrInlineRender: true,
  props: {
    variant: {},
    productId: {},
    editMode: { type: Boolean },
    editedStock: {}
  },
  emits: ["update-stock"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentStock = computed(() => {
      return props.editedStock ?? props.variant.stock;
    });
    const isStockModified = computed(() => {
      return props.editedStock !== void 0 && props.editedStock !== props.variant.stock;
    });
    const handleStockUpdate = (value) => {
      emit("update-stock", props.productId, props.variant.id, Number(value) || 0);
    };
    const priceAdjustmentDisplay = computed(() => {
      if (props.variant.priceAdjustment > 0) {
        return `+${formatCurrency(props.variant.priceAdjustment)}`;
      } else if (props.variant.priceAdjustment < 0) {
        return formatCurrency(props.variant.priceAdjustment);
      }
      return "-";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$a;
      const _component_UBadge = _sfc_main$d;
      const _component_UInput = _sfc_main$b;
      _push(`<tr${ssrRenderAttrs(mergeProps({ class: "bg-slate-50/50 dark:bg-slate-900/20" }, _attrs))}><!-- Empty cell for alignment --><td class="px-4 py-2"></td><!-- Variant Info --><td class="px-4 py-2 pl-8" colspan="2"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-arrow-turn-down-right",
        class: "w-4 h-4 text-slate-400"
      }, null, _parent));
      _push(`<span class="text-sm text-slate-700 dark:text-slate-300">${ssrInterpolate(__props.variant.name)}: ${ssrInterpolate(__props.variant.value)}</span>`);
      if (!__props.variant.isActive) {
        _push(ssrRenderComponent(_component_UBadge, {
          color: "neutral",
          variant: "subtle",
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Nonaktif `);
            } else {
              return [
                createTextVNode(" Nonaktif ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="text-sm text-slate-500 font-mono ml-4">${ssrInterpolate(__props.variant.sku || "-")}</span></div></td><!-- Empty cell for category column --><td class="px-4 py-2"></td><!-- Variant Stock --><td class="px-4 py-2 text-center">`);
      if (__props.editMode) {
        _push(ssrRenderComponent(_component_UInput, {
          type: "number",
          "model-value": currentStock.value,
          "onUpdate:modelValue": handleStockUpdate,
          min: "0",
          class: ["w-24 mx-auto", { "ring-2 ring-violet-500": isStockModified.value }],
          size: "sm"
        }, null, _parent));
      } else {
        _push(`<span class="text-sm text-slate-600 dark:text-slate-300">${ssrInterpolate(__props.variant.stock)}</span>`);
      }
      _push(`</td><!-- Empty cell for variants column --><td class="px-4 py-2"></td><!-- Variant Stock Status --><td class="px-4 py-2 text-center">`);
      _push(ssrRenderComponent(_component_UBadge, {
        color: unref(getStockBadge)(currentStock.value).color,
        variant: "subtle",
        size: "xs"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(getStockBadge)(currentStock.value).label)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(unref(getStockBadge)(currentStock.value).label),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</td><!-- Price Adjustment --><td class="px-4 py-2 text-center"><span class="text-xs text-slate-500">${ssrInterpolate(priceAdjustmentDisplay.value)}</span></td></tr>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/inventory/InventoryVariantRow.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "InventoryTable",
  __ssrInlineRender: true,
  props: {
    products: {},
    editMode: { type: Boolean },
    expandedRows: {},
    editedStocks: {},
    isLoading: { type: Boolean }
  },
  emits: ["toggle-expand", "update-product-stock", "update-variant-stock"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const getEditedStock = (productId) => {
      return props.editedStocks.get(productId);
    };
    const getEditedVariantStock = (productId, variantId) => {
      const edited = props.editedStocks.get(productId);
      return edited?.variantStocks.get(variantId);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$a;
      const _component_UButton = _sfc_main$9;
      _push(`<!--[--><!-- Loading Overlay -->`);
      if (__props.isLoading) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-8 flex items-center justify-center" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 text-violet-500 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Table with expansion for variants --><div class="overflow-x-auto"><table class="w-full"><thead class="bg-slate-50 dark:bg-slate-900/50"><tr><th class="w-10 px-4 py-3"></th><th class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Produk </th><th class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"> SKU </th><th class="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Kategori </th><th class="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Stok </th><th class="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Varian </th><th class="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Status Stok </th><th class="px-4 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Status </th></tr></thead><tbody class="divide-y divide-slate-200 dark:divide-slate-700"><!--[-->`);
        ssrRenderList(__props.products, (product) => {
          _push(`<!--[--><!-- Product Row -->`);
          _push(ssrRenderComponent(_sfc_main$5, {
            product,
            "edit-mode": __props.editMode,
            "is-expanded": __props.expandedRows.has(product.id),
            "edited-stock": getEditedStock(product.id),
            onToggleExpand: (id) => emit("toggle-expand", id),
            onUpdateStock: (id, stock) => emit("update-product-stock", id, stock)
          }, null, _parent));
          _push(`<!-- Variant Rows (Expanded) -->`);
          if (product.hasVariants && __props.expandedRows.has(product.id)) {
            _push(`<!--[-->`);
            ssrRenderList(product.variants, (variant) => {
              _push(ssrRenderComponent(_sfc_main$4, {
                key: `variant-${variant.id}`,
                variant,
                "product-id": product.id,
                "edit-mode": __props.editMode,
                "edited-stock": getEditedVariantStock(product.id, variant.id),
                onUpdateStock: (productId, variantId, stock) => emit("update-variant-stock", productId, variantId, stock)
              }, null, _parent));
            });
            _push(`<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        });
        _push(`<!--]--><!-- Empty State -->`);
        if (__props.products.length === 0) {
          _push(`<tr><td colspan="8" class="px-4 py-12 text-center"><div class="flex flex-col items-center gap-3"><div class="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-cube",
            class: "w-8 h-8 text-slate-400"
          }, null, _parent));
          _push(`</div><div><p class="text-slate-900 dark:text-white font-medium">Tidak ada produk</p><p class="text-sm text-slate-500 dark:text-slate-400">Tambahkan produk untuk mengelola stok</p></div>`);
          _push(ssrRenderComponent(unref(Link), { href: "/admin/products/create" }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UButton, {
                  color: "primary",
                  size: "sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UIcon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4 mr-1"
                      }, null, _parent3, _scopeId2));
                      _push3(` Tambah Produk `);
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
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UButton, {
                    color: "primary",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-plus",
                        class: "w-4 h-4 mr-1"
                      }),
                      createTextVNode(" Tambah Produk ")
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
          _push(`</div></td></tr>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</tbody></table></div><!--]-->`);
      }
      _push(`<!--]-->`);
    };
  }
});

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/inventory/InventoryTable.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "InventoryPagination",
  __ssrInlineRender: true,
  props: {
    meta: {}
  },
  emits: ["page-change", "per-page-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const currentPage = ref(props.meta.currentPage);
    watch(() => props.meta.currentPage, (newPage) => {
      currentPage.value = newPage;
    });
    watch(currentPage, (newPage, oldPage) => {
      if (newPage !== oldPage && newPage !== props.meta.currentPage) {
        emit("page-change", newPage);
      }
    });
    const perPageOptions = [
      { label: "10", value: 10 },
      { label: "20", value: 20 },
      { label: "50", value: 50 },
      { label: "100", value: 100 }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelect = _sfc_main$c;
      const _component_UPagination = _sfc_main$e;
      if (__props.meta.total > 0) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "border-t border-slate-200 dark:border-slate-700 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4" }, _attrs))}><div class="text-sm text-slate-500 dark:text-slate-400"> Menampilkan ${ssrInterpolate((__props.meta.currentPage - 1) * __props.meta.perPage + 1)} - ${ssrInterpolate(Math.min(__props.meta.currentPage * __props.meta.perPage, __props.meta.total))} dari ${ssrInterpolate(__props.meta.total)} produk </div><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": __props.meta.perPage,
          items: perPageOptions,
          "value-key": "value",
          "onUpdate:modelValue": (val) => emit("per-page-change", Number(val)),
          size: "sm",
          class: "w-20"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UPagination, {
          page: currentPage.value,
          "onUpdate:page": ($event) => currentPage.value = $event,
          total: __props.meta.total,
          "items-per-page": __props.meta.perPage,
          "sibling-count": 1,
          "show-edges": "",
          size: "sm"
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/inventory/InventoryPagination.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "InventoryUnsavedWarning",
  __ssrInlineRender: true,
  props: {
    show: { type: Boolean },
    changesCount: {},
    isSaving: { type: Boolean }
  },
  emits: ["save"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$a;
      const _component_UButton = _sfc_main$9;
      ssrRenderTeleport(_push, (_push2) => {
        if (__props.show) {
          _push2(`<div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"><div class="bg-slate-900 dark:bg-slate-700 text-white rounded-xl px-6 py-3 shadow-lg flex items-center gap-4">`);
          _push2(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-exclamation-circle",
            class: "w-5 h-5 text-yellow-400"
          }, null, _parent));
          _push2(`<span class="text-sm">${ssrInterpolate(__props.changesCount)} produk memiliki perubahan yang belum disimpan</span>`);
          _push2(ssrRenderComponent(_component_UButton, {
            color: "primary",
            size: "sm",
            onClick: ($event) => emit("save"),
            loading: __props.isSaving
          }, {
            default: withCtx((_, _push3, _parent2, _scopeId) => {
              if (_push3) {
                _push3(` Simpan Sekarang `);
              } else {
                return [
                  createTextVNode(" Simpan Sekarang ")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push2(`</div></div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/inventory/InventoryUnsavedWarning.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "inventory",
  __ssrInlineRender: true,
  props: {
    products: { default: () => [] },
    meta: { default: () => ({ currentPage: 1, lastPage: 1, perPage: 20, total: 0, firstPage: 1, hasNext: false, hasPrev: false }) },
    stats: { default: () => ({ totalProducts: 0, inStock: 0, lowStock: 0, outOfStock: 0, totalVariants: 0 }) },
    categories: { default: () => [] },
    filters: { default: () => ({ search: "", category: "", status: "", page: 1 }) },
    admin: { default: () => ({ id: 0, storeName: "", slug: "", status: "" }) }
  },
  setup(__props) {
    const props = __props;
    const currentFilters = ref({ ...props.filters });
    const isLoading = ref(false);
    const expandedRows = ref(/* @__PURE__ */ new Set());
    const globalFilter = ref(props.filters.search || "");
    const editMode = ref(false);
    const editedStocks = ref(/* @__PURE__ */ new Map());
    const isSaving = ref(false);
    const toast = useToast();
    const hasChanges = computed(() => editedStocks.value.size > 0);
    const getXsrfToken = () => {
      const token = document.cookie.split("; ").find((row) => row.startsWith("XSRF-TOKEN="))?.split("=")[1];
      return token ? decodeURIComponent(token) : "";
    };
    const toggleRow = (productId) => {
      if (expandedRows.value.has(productId)) {
        expandedRows.value.delete(productId);
      } else {
        expandedRows.value.add(productId);
      }
    };
    const findProduct = (productId) => {
      return props.products.find((p) => p.id === productId);
    };
    const updateProductStock = (productId, newStock) => {
      const product = findProduct(productId);
      if (!product) return;
      if (!editedStocks.value.has(productId)) {
        editedStocks.value.set(productId, {
          stock: product.stock,
          variantStocks: /* @__PURE__ */ new Map()
        });
      }
      const edited = editedStocks.value.get(productId);
      edited.stock = newStock;
      if (edited.stock === product.stock && edited.variantStocks.size === 0) {
        editedStocks.value.delete(productId);
      }
    };
    const updateVariantStock = (productId, variantId, newStock) => {
      const product = findProduct(productId);
      if (!product) return;
      const variant = product.variants.find((v) => v.id === variantId);
      if (!variant) return;
      if (!editedStocks.value.has(productId)) {
        editedStocks.value.set(productId, {
          stock: product.stock,
          variantStocks: /* @__PURE__ */ new Map()
        });
      }
      const edited = editedStocks.value.get(productId);
      if (newStock === variant.stock) {
        edited.variantStocks.delete(variantId);
      } else {
        edited.variantStocks.set(variantId, newStock);
      }
      if (edited.stock === product.stock && edited.variantStocks.size === 0) {
        editedStocks.value.delete(productId);
      }
    };
    const saveChanges = async () => {
      if (!hasChanges.value) return;
      isSaving.value = true;
      try {
        const updates = Array.from(editedStocks.value.entries()).map(([productId, data]) => ({
          productId,
          stock: data.stock,
          variantStocks: Array.from(data.variantStocks.entries()).map(([variantId, stock]) => ({
            variantId,
            stock
          }))
        }));
        const response = await fetch("/admin/products/inventory/bulk-update", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            "X-XSRF-TOKEN": getXsrfToken()
          },
          body: JSON.stringify({ updates })
        });
        const result = await response.json();
        if (result.success) {
          toast.success("Berhasil", result.message);
          editedStocks.value.clear();
          editMode.value = false;
          router.reload({ only: ["products", "stats"] });
        } else {
          toast.error("Gagal", result.message);
        }
      } catch (error) {
        toast.error("Error", "Terjadi kesalahan saat menyimpan");
      } finally {
        isSaving.value = false;
      }
    };
    const cancelEdit = () => {
      editedStocks.value.clear();
      editMode.value = false;
    };
    const toggleEditMode = () => {
      editMode.value = true;
    };
    const fetchProducts = (options = {}) => {
      isLoading.value = true;
      const params = {
        page: options.page || props.meta.currentPage,
        perPage: options.perPage || props.meta.perPage,
        ...currentFilters.value
      };
      if (globalFilter.value) {
        params.search = globalFilter.value;
      }
      Object.keys(params).forEach((key) => {
        if (params[key] === void 0 || params[key] === null || params[key] === "") {
          delete params[key];
        }
      });
      router.get("/admin/products/inventory", params, {
        preserveState: true,
        onFinish: () => {
          isLoading.value = false;
        }
      });
    };
    const handleSearch = () => {
      currentFilters.value.search = globalFilter.value;
      fetchProducts({ page: 1 });
    };
    const handleReset = () => {
      currentFilters.value = {};
      globalFilter.value = "";
      fetchProducts({ page: 1 });
    };
    const handlePageChange = (page) => {
      fetchProducts({ page });
    };
    const handlePerPageChange = (perPage) => {
      fetchProducts({ page: 1, perPage });
    };
    watch(editMode, (newVal) => {
      if (!newVal) {
        editedStocks.value.clear();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header -->`);
      _push(ssrRenderComponent(unref(_sfc_main$8), {
        "store-name": __props.admin.storeName,
        "edit-mode": editMode.value,
        "is-saving": isSaving.value,
        "has-changes": hasChanges.value,
        onToggleEdit: toggleEditMode,
        onSave: saveChanges,
        onCancel: cancelEdit
      }, null, _parent));
      _push(`<!-- Stats Cards -->`);
      _push(ssrRenderComponent(unref(_sfc_main$7), { stats: __props.stats }, null, _parent));
      _push(`<!-- Inventory Table Card --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"><!-- Filters -->`);
      _push(ssrRenderComponent(unref(_sfc_main$6), {
        filters: currentFilters.value,
        categories: __props.categories,
        search: globalFilter.value,
        "onUpdate:filters": ($event) => currentFilters.value = $event,
        "onUpdate:search": ($event) => globalFilter.value = $event,
        onSearch: handleSearch,
        onReset: handleReset
      }, null, _parent));
      _push(`<!-- Table -->`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        products: __props.products,
        "edit-mode": editMode.value,
        "expanded-rows": expandedRows.value,
        "edited-stocks": editedStocks.value,
        "is-loading": isLoading.value,
        onToggleExpand: toggleRow,
        onUpdateProductStock: updateProductStock,
        onUpdateVariantStock: updateVariantStock
      }, null, _parent));
      _push(`<!-- Pagination -->`);
      _push(ssrRenderComponent(unref(_sfc_main$2), {
        meta: __props.meta,
        onPageChange: handlePageChange,
        onPerPageChange: handlePerPageChange
      }, null, _parent));
      _push(`</div><!-- Unsaved Changes Warning -->`);
      _push(ssrRenderComponent(unref(_sfc_main$1), {
        show: hasChanges.value && editMode.value,
        "changes-count": editedStocks.value.size,
        "is-saving": isSaving.value,
        onSave: saveChanges
      }, null, _parent));
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/products/inventory.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
