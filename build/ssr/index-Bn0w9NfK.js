import { _ as _sfc_main$e } from './Modal-VctJV7vb.js';
import { _ as _sfc_main$d } from './Pagination-B8CAUWkD.js';
import { _ as _sfc_main$c } from './Select-mEsLh9Ds.js';
import { _ as _sfc_main$b } from './Table-BgpRkRI2.js';
import { _ as _sfc_main$5, a as _sfc_main$8 } from './Button-BTdvmZ8N.js';
import { _ as _sfc_main$6, a as _sfc_main$a, u as useToast } from './Badge-CQlYH3Fo.js';
import { _ as _sfc_main$9 } from './Checkbox-DCS-_c5K.js';
import { defineComponent, mergeProps, unref, useSSRContext, ref, computed, watch, withCtx, createTextVNode, toDisplayString, createVNode, h } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { Link, router } from '@inertiajs/vue3';
import { A as AdminLayout } from './admin-ELJtfEoX.js';
import { f as formatNumber, g as getConditionConfig, a as formatPrice, b as getStatusConfig } from './types-Juw5hnH9.js';
import { _ as _sfc_main$7 } from './SelectMenu-BqLaY6AT.js';
import './ProductForm-KhU-FYHw.js';
import 'reka-ui';
import '@vueuse/core';
import './virtual_nuxt-ui-plugins-CrG8Uaxr.js';
import '@unhead/vue/client';
import 'tailwindcss/colors';
import 'hookable';
import 'defu';
import 'ohash/utils';
import '@unhead/vue';
import 'scule';
import '@tanstack/vue-table';
import '@tanstack/vue-virtual';
import 'tailwind-variants';
import '@iconify/vue';
import 'ufo';
import 'reka-ui/namespaced';
import './Tooltip-C54KurGy.js';
import './Switch-eKFRwox7.js';
import './Textarea-yrK84h3-.js';
import './FormField-CdECN7pk.js';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "ProductStatsCards",
  __ssrInlineRender: true,
  props: {
    stats: {}
  },
  setup(__props) {
    const statItems = (stats) => [
      {
        label: "Total Produk",
        value: stats.total,
        icon: "i-heroicons-cube",
        color: "text-violet-500",
        bgColor: "bg-violet-500/10"
      },
      {
        label: "Produk Aktif",
        value: stats.active,
        icon: "i-heroicons-check-circle",
        color: "text-emerald-500",
        bgColor: "bg-emerald-500/10"
      },
      {
        label: "Draft",
        value: stats.draft,
        icon: "i-heroicons-document",
        color: "text-slate-500",
        bgColor: "bg-slate-500/10"
      },
      {
        label: "Stok Habis",
        value: stats.outOfStock,
        icon: "i-heroicons-exclamation-triangle",
        color: "text-red-500",
        bgColor: "bg-red-500/10"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid grid-cols-2 lg:grid-cols-4 gap-4" }, _attrs))}><!--[-->`);
      ssrRenderList(statItems(__props.stats), (item) => {
        _push(`<div class="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700"><div class="flex items-center gap-3"><div class="${ssrRenderClass([item.bgColor, "w-10 h-10 rounded-lg flex items-center justify-center"])}">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: item.icon,
          class: ["w-5 h-5", item.color]
        }, null, _parent));
        _push(`</div><div><p class="text-2xl font-bold text-slate-900 dark:text-white">${ssrInterpolate(unref(formatNumber)(item.value))}</p><p class="text-xs text-slate-500 dark:text-slate-400">${ssrInterpolate(item.label)}</p></div></div></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});

const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/ProductStatsCards.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductFilters",
  __ssrInlineRender: true,
  props: {
    filters: {},
    categories: {}
  },
  emits: ["update:filters", "search", "reset"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const searchQuery = ref(props.filters.search || "");
    const selectedStatus = ref(props.filters.status || "all");
    const selectedCategory = ref(props.filters.categoryId?.toString() || "all");
    const statusOptions = [
      { label: "Semua Status", value: "all" },
      { label: "Aktif", value: "active" },
      { label: "Draft", value: "draft" },
      { label: "Nonaktif", value: "inactive" },
      { label: "Stok Habis", value: "out_of_stock" }
    ];
    const categoryOptions = computed(() => [
      { label: "Semua Kategori", value: "all" },
      ...props.categories.map((c) => ({ label: c.name, value: c.id.toString() }))
    ]);
    const handleSearch = () => {
      emit("update:filters", {
        search: searchQuery.value || void 0,
        status: selectedStatus.value !== "all" ? selectedStatus.value : void 0,
        categoryId: selectedCategory.value !== "all" ? Number(selectedCategory.value) : void 0
      });
      emit("search");
    };
    const handleReset = () => {
      searchQuery.value = "";
      selectedStatus.value = "all";
      selectedCategory.value = "all";
      emit("update:filters", {});
      emit("reset");
    };
    let debounceTimer;
    const handleSearchInput = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        handleSearch();
      }, 500);
    };
    watch([selectedStatus, selectedCategory], () => {
      handleSearch();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$6;
      const _component_USelectMenu = _sfc_main$7;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4" }, _attrs))}><div class="flex flex-col lg:flex-row gap-4"><!-- Search Input --><div class="flex-1">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: searchQuery.value,
        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
        placeholder: "Cari produk berdasarkan nama, SKU, atau brand...",
        icon: "i-heroicons-magnifying-glass",
        size: "md",
        class: "w-full",
        onInput: handleSearchInput,
        onKeyup: handleSearch
      }, null, _parent));
      _push(`</div><!-- Status Filter --><div class="w-full lg:w-48">`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: selectedStatus.value,
        "onUpdate:modelValue": ($event) => selectedStatus.value = $event,
        items: statusOptions,
        "value-key": "value",
        placeholder: "Status",
        size: "md"
      }, null, _parent));
      _push(`</div><!-- Category Filter --><div class="w-full lg:w-48">`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: selectedCategory.value,
        "onUpdate:modelValue": ($event) => selectedCategory.value = $event,
        items: categoryOptions.value,
        "value-key": "value",
        placeholder: "Kategori",
        size: "md"
      }, null, _parent));
      _push(`</div><!-- Actions --><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-magnifying-glass",
        color: "primary",
        size: "md",
        onClick: handleSearch
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Cari `);
          } else {
            return [
              createTextVNode(" Cari ")
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-x-mark",
        color: "neutral",
        variant: "outline",
        size: "md",
        onClick: handleReset
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Reset `);
          } else {
            return [
              createTextVNode(" Reset ")
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

const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/ProductFilters.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ProductTable",
  __ssrInlineRender: true,
  props: {
    products: {},
    meta: {},
    selectedIds: {},
    sortBy: {},
    sortDirection: {}
  },
  emits: ["update:selectedIds", "sort", "delete", "bulk-action"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const allSelected = computed(() => {
      if (props.products.length === 0) return false;
      return props.products.every((p) => props.selectedIds.includes(p.id));
    });
    const toggleAll = () => {
      if (allSelected.value) {
        emit("update:selectedIds", []);
      } else {
        emit("update:selectedIds", props.products.map((p) => p.id));
      }
    };
    const toggleSelection = (id) => {
      const newIds = props.selectedIds.includes(id) ? props.selectedIds.filter((i) => i !== id) : [...props.selectedIds, id];
      emit("update:selectedIds", newIds);
    };
    const getSortIcon = (field) => {
      if (props.sortBy !== field) return "i-heroicons-chevron-up-down";
      return props.sortDirection === "asc" ? "i-heroicons-chevron-up" : "i-heroicons-chevron-down";
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UCheckbox = _sfc_main$9;
      const _component_UIcon = _sfc_main$5;
      const _component_UBadge = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden" }, _attrs))}><!-- Bulk Actions Bar -->`);
      if (__props.selectedIds.length > 0) {
        _push(`<div class="flex items-center justify-between px-4 py-3 bg-violet-50 dark:bg-violet-900/20 border-b border-violet-200 dark:border-violet-800"><span class="text-sm text-violet-700 dark:text-violet-300">${ssrInterpolate(__props.selectedIds.length)} produk dipilih </span><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "success",
          variant: "soft",
          icon: "i-heroicons-check-circle",
          onClick: ($event) => _ctx.$emit("bulk-action", "active")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Aktifkan `);
            } else {
              return [
                createTextVNode(" Aktifkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "warning",
          variant: "soft",
          icon: "i-heroicons-pause-circle",
          onClick: ($event) => _ctx.$emit("bulk-action", "inactive")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Nonaktifkan `);
            } else {
              return [
                createTextVNode(" Nonaktifkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "error",
          variant: "soft",
          icon: "i-heroicons-trash",
          onClick: ($event) => _ctx.$emit("bulk-action", "delete")
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
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Table --><div class="overflow-x-auto"><table class="w-full"><thead><tr class="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700"><th class="w-12 px-4 py-3">`);
      _push(ssrRenderComponent(_component_UCheckbox, {
        "model-value": allSelected.value,
        "onUpdate:modelValue": toggleAll
      }, null, _parent));
      _push(`</th><th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Produk </th><th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"><div class="flex items-center gap-1"> Harga `);
      _push(ssrRenderComponent(_component_UIcon, {
        name: getSortIcon("price"),
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</div></th><th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"><div class="flex items-center gap-1"> Stok `);
      _push(ssrRenderComponent(_component_UIcon, {
        name: getSortIcon("stock"),
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</div></th><th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider cursor-pointer hover:text-slate-700 dark:hover:text-slate-300"><div class="flex items-center gap-1"> Terjual `);
      _push(ssrRenderComponent(_component_UIcon, {
        name: getSortIcon("totalSold"),
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</div></th><th class="px-4 py-3 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Status </th><th class="px-4 py-3 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider"> Aksi </th></tr></thead><tbody class="divide-y divide-slate-200 dark:divide-slate-700"><!--[-->`);
      ssrRenderList(__props.products, (product) => {
        _push(`<tr class="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"><td class="px-4 py-4">`);
        _push(ssrRenderComponent(_component_UCheckbox, {
          "model-value": __props.selectedIds.includes(product.id),
          "onUpdate:modelValue": ($event) => toggleSelection(product.id)
        }, null, _parent));
        _push(`</td><td class="px-4 py-4"><div class="flex items-center gap-3"><div class="w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0">`);
        if (product.primaryImage) {
          _push(`<img${ssrRenderAttr("src", product.primaryImage.url)}${ssrRenderAttr("alt", product.name)} class="w-full h-full object-cover">`);
        } else {
          _push(`<div class="w-full h-full flex items-center justify-center">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-photo",
            class: "w-6 h-6 text-slate-400"
          }, null, _parent));
          _push(`</div>`);
        }
        _push(`</div><div class="min-w-0">`);
        _push(ssrRenderComponent(unref(Link), {
          href: `/admin/products/${product.id}`,
          class: "font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 truncate block max-w-xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(product.name)}`);
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
        }, _parent));
        _push(`<p class="text-xs text-slate-500 dark:text-slate-400"> SKU: ${ssrInterpolate(product.sku)} `);
        if (product.category) {
          _push(`<span class="ml-2">• ${ssrInterpolate(product.category.name)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p><div class="flex items-center gap-2 mt-1">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: unref(getConditionConfig)(product.condition).color,
          variant: "subtle",
          size: "xs"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(getConditionConfig)(product.condition).label)}`);
            } else {
              return [
                createTextVNode(
                  toDisplayString(unref(getConditionConfig)(product.condition).label),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        if (product.isFeatured) {
          _push(ssrRenderComponent(_component_UBadge, {
            color: "warning",
            variant: "subtle",
            size: "xs"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-star",
                  class: "w-3 h-3 mr-0.5"
                }, null, _parent2, _scopeId));
                _push2(` Featured `);
              } else {
                return [
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-star",
                    class: "w-3 h-3 mr-0.5"
                  }),
                  createTextVNode(" Featured ")
                ];
              }
            }),
            _: 2
            /* DYNAMIC */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div></div></td><td class="px-4 py-4"><div><p class="font-medium text-slate-900 dark:text-white">${ssrInterpolate(unref(formatPrice)(product.discountPrice || product.price))}</p>`);
        if (product.discountPrice) {
          _push(`<p class="text-xs text-slate-500 line-through">${ssrInterpolate(unref(formatPrice)(product.price))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td><td class="px-4 py-4"><div class="flex items-center gap-2"><span class="${ssrRenderClass([
          product.stock === 0 ? "text-red-500" : product.stock <= 10 ? "text-amber-500" : "text-slate-900 dark:text-white",
          "font-medium"
        ])}">${ssrInterpolate(unref(formatNumber)(product.stock))}</span>`);
        if (product.stock <= 10 && product.stock > 0) {
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-exclamation-triangle",
            class: "w-4 h-4 text-amber-500"
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div></td><td class="px-4 py-4"><span class="text-slate-900 dark:text-white">${ssrInterpolate(unref(formatNumber)(product.totalSold))}</span></td><td class="px-4 py-4">`);
        _push(ssrRenderComponent(_component_UBadge, {
          color: unref(getStatusConfig)(product.status).color,
          variant: "subtle"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(getStatusConfig)(product.status).label)}`);
            } else {
              return [
                createTextVNode(
                  toDisplayString(unref(getStatusConfig)(product.status).label),
                  1
                  /* TEXT */
                )
              ];
            }
          }),
          _: 2
          /* DYNAMIC */
        }, _parent));
        _push(`</td><td class="px-4 py-4"><div class="flex items-center justify-end gap-1">`);
        _push(ssrRenderComponent(_component_UButton, {
          to: `/admin/products/${product.id}`,
          icon: "i-heroicons-eye",
          color: "neutral",
          variant: "ghost",
          size: "xs"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          to: `/admin/products/${product.id}/edit`,
          icon: "i-heroicons-pencil",
          color: "neutral",
          variant: "ghost",
          size: "xs"
        }, null, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          icon: "i-heroicons-trash",
          color: "error",
          variant: "ghost",
          size: "xs",
          onClick: ($event) => _ctx.$emit("delete", product.id)
        }, null, _parent));
        _push(`</div></td></tr>`);
      });
      _push(`<!--]-->`);
      if (__props.products.length === 0) {
        _push(`<tr><td colspan="7" class="px-4 py-12 text-center"><div class="flex flex-col items-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-cube",
          class: "w-12 h-12 text-slate-300 dark:text-slate-600 mb-4"
        }, null, _parent));
        _push(`<p class="text-slate-500 dark:text-slate-400 mb-4">Belum ada produk</p>`);
        _push(ssrRenderComponent(_component_UButton, {
          to: "/admin/products/create",
          icon: "i-heroicons-plus",
          color: "primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Tambah Produk `);
            } else {
              return [
                createTextVNode(" Tambah Produk ")
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
      _push(`</tbody></table></div></div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/ProductTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "ProductPagination",
  __ssrInlineRender: true,
  props: {
    meta: {}
  },
  emits: ["page-change", "per-page-change"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const perPageOptions = [
      { label: "10 per halaman", value: 10 },
      { label: "25 per halaman", value: 25 },
      { label: "50 per halaman", value: 50 },
      { label: "100 per halaman", value: 100 }
    ];
    const selectedPerPage = ref(props.meta.perPage.toString());
    watch(selectedPerPage, (value) => {
      emit("per-page-change", Number(value));
    });
    const visiblePages = computed(() => {
      const pages = [];
      const current = props.meta.currentPage;
      const last = props.meta.lastPage;
      if (last <= 7) {
        for (let i = 1; i <= last; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        if (current > 3) {
          pages.push("...");
        }
        for (let i = Math.max(2, current - 1); i <= Math.min(last - 1, current + 1); i++) {
          pages.push(i);
        }
        if (current < last - 2) {
          pages.push("...");
        }
        pages.push(last);
      }
      return pages;
    });
    const showingFrom = computed(() => {
      if (props.meta.total === 0) return 0;
      return (props.meta.currentPage - 1) * props.meta.perPage + 1;
    });
    const showingTo = computed(() => {
      return Math.min(props.meta.currentPage * props.meta.perPage, props.meta.total);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USelectMenu = _sfc_main$7;
      const _component_UButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700" }, _attrs))}><!-- Showing info --><div class="text-sm text-slate-500 dark:text-slate-400"> Menampilkan <span class="font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(showingFrom.value)}</span> - <span class="font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(showingTo.value)}</span> dari <span class="font-medium text-slate-700 dark:text-slate-300">${ssrInterpolate(__props.meta.total)}</span> produk </div><!-- Per page selector and pagination --><div class="flex items-center gap-4"><!-- Per page selector -->`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: selectedPerPage.value,
        "onUpdate:modelValue": ($event) => selectedPerPage.value = $event,
        items: perPageOptions,
        "value-key": "value",
        size: "sm",
        class: "w-40"
      }, null, _parent));
      _push(`<!-- Pagination --><nav class="flex items-center gap-1"><!-- Previous button -->`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-chevron-left",
        color: "neutral",
        variant: "ghost",
        size: "sm",
        disabled: !__props.meta.hasPrev,
        onClick: ($event) => _ctx.$emit("page-change", __props.meta.currentPage - 1)
      }, null, _parent));
      _push(`<!-- Page numbers --><!--[-->`);
      ssrRenderList(visiblePages.value, (page, index) => {
        _push(`<!--[-->`);
        if (page === "...") {
          _push(`<span class="px-2 text-slate-400"> ... </span>`);
        } else {
          _push(ssrRenderComponent(_component_UButton, {
            color: page === __props.meta.currentPage ? "primary" : "neutral",
            variant: page === __props.meta.currentPage ? "solid" : "ghost",
            class: "min-w-8",
            onClick: ($event) => _ctx.$emit("page-change", page)
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
        }
        _push(`<!--]-->`);
      });
      _push(`<!--]--><!-- Next button -->`);
      _push(ssrRenderComponent(_component_UButton, {
        icon: "i-heroicons-chevron-right",
        color: "neutral",
        variant: "ghost",
        size: "sm",
        disabled: !__props.meta.hasNext,
        onClick: ($event) => _ctx.$emit("page-change", __props.meta.currentPage + 1)
      }, null, _parent));
      _push(`</nav></div></div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/products/ProductPagination.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  ...{
    layout: AdminLayout
  },
  __name: "index",
  __ssrInlineRender: true,
  props: {
    products: { default: () => [] },
    meta: { default: () => ({
      total: 0,
      perPage: 10,
      currentPage: 1,
      lastPage: 1,
      firstPage: 1,
      firstPageUrl: "",
      lastPageUrl: "",
      nextPageUrl: null,
      previousPageUrl: null,
      hasNext: false,
      hasPrev: false
    }) },
    stats: { default: () => ({
      total: 0,
      active: 0,
      inactive: 0,
      draft: 0,
      outOfStock: 0,
      lowStock: 0
    }) },
    categories: { default: () => [] },
    filters: { default: () => ({
      search: "",
      category: null,
      status: "all",
      condition: "all",
      minPrice: null,
      maxPrice: null,
      sortBy: "createdAt",
      sortDirection: "desc"
    }) },
    admin: { default: () => ({
      id: 0,
      storeName: "Admin",
      slug: "",
      status: "active"
    }) }
  },
  setup(__props) {
    const props = __props;
    const table = ref(null);
    const sortBy = ref("createdAt");
    const sortDirection = ref("desc");
    const currentFilters = ref({ ...props.filters });
    const currentPage = ref(props.meta.currentPage);
    const isLoading = ref(false);
    const deleteModalOpen = ref(false);
    const deleteTargetId = ref(null);
    const bulkDeleteModalOpen = ref(false);
    const globalFilter = ref(props.filters.search || "");
    watch(() => props.filters, (newFilters) => {
      currentFilters.value = { ...newFilters };
      globalFilter.value = newFilters.search || "";
    }, { deep: true });
    watch(() => props.meta.currentPage, (newPage) => {
      currentPage.value = newPage;
    });
    watch(currentPage, (newPage, oldPage) => {
      if (newPage !== oldPage && newPage !== props.meta.currentPage) {
        table.value?.tableApi?.resetRowSelection();
        window.scrollTo({ top: 0, behavior: "smooth" });
        isLoading.value = true;
        const params = {
          page: newPage,
          perPage: props.meta.perPage,
          sortBy: sortBy.value,
          sortDirection: sortDirection.value
        };
        if (currentFilters.value.search) {
          params.search = currentFilters.value.search;
        }
        if (currentFilters.value.status && currentFilters.value.status !== "all") {
          params.status = currentFilters.value.status;
        }
        if (currentFilters.value.condition && currentFilters.value.condition !== "all") {
          params.condition = currentFilters.value.condition;
        }
        if (currentFilters.value.category) {
          params.category = currentFilters.value.category;
        }
        if (currentFilters.value.minPrice) {
          params.minPrice = currentFilters.value.minPrice;
        }
        if (currentFilters.value.maxPrice) {
          params.maxPrice = currentFilters.value.maxPrice;
        }
        router.get("/admin/products", params, {
          preserveState: true,
          preserveScroll: false,
          onFinish: () => {
            isLoading.value = false;
          }
        });
      }
    });
    const toast = useToast();
    const columns = [
      {
        id: "select",
        header: ({ table: tbl }) => h(_sfc_main$9, {
          modelValue: tbl.getIsAllPageRowsSelected(),
          indeterminate: tbl.getIsSomePageRowsSelected(),
          "onUpdate:modelValue": (value) => tbl.toggleAllPageRowsSelected(!!value)
        }),
        cell: ({ row }) => h(_sfc_main$9, {
          modelValue: row.getIsSelected(),
          "onUpdate:modelValue": (value) => row.toggleSelected(!!value)
        }),
        enableSorting: false,
        enableHiding: false
      },
      {
        accessorKey: "name",
        header: "Produk",
        cell: ({ row }) => {
          const product = row.original;
          return h("div", { class: "flex items-center gap-3" }, [
            h(
              "div",
              { class: "w-12 h-12 rounded-lg bg-slate-100 dark:bg-slate-700 overflow-hidden shrink-0" },
              product.primaryImage ? h("img", {
                src: product.primaryImage.url,
                alt: product.name,
                class: "w-full h-full object-cover"
              }) : h("div", { class: "w-full h-full flex items-center justify-center" }, [
                h(_sfc_main$5, { name: "i-heroicons-photo", class: "w-6 h-6 text-slate-400" })
              ])
            ),
            h("div", { class: "min-w-0" }, [
              h(
                Link,
                {
                  href: `/admin/products/${product.id}`,
                  class: "font-medium text-slate-900 dark:text-white hover:text-violet-600 dark:hover:text-violet-400 truncate block max-w-xs"
                },
                () => product.name
              ),
              h("p", { class: "text-xs text-slate-500 dark:text-slate-400" }, [
                `SKU: ${product.sku}`,
                product.category ? h("span", { class: "ml-2" }, `• ${product.category.name}`) : null
              ]),
              h("div", { class: "flex items-center gap-2 mt-1" }, [
                h(
                  _sfc_main$a,
                  { color: getConditionConfig(product.condition).color, variant: "subtle", size: "xs" },
                  () => getConditionConfig(product.condition).label
                ),
                product.isFeatured ? h(_sfc_main$a, { color: "warning", variant: "subtle", size: "xs" }, () => [
                  h(_sfc_main$5, { name: "i-heroicons-star", class: "w-3 h-3 mr-0.5" }),
                  "Featured"
                ]) : null
              ])
            ])
          ]);
        }
      },
      {
        accessorKey: "price",
        header: "Harga",
        cell: ({ row }) => {
          const product = row.original;
          return h("div", {}, [
            h("p", { class: "font-medium text-slate-900 dark:text-white" }, formatPrice(product.discountPrice || product.price)),
            product.discountPrice ? h("p", { class: "text-xs text-slate-500 line-through" }, formatPrice(product.price)) : null
          ]);
        }
      },
      {
        accessorKey: "stock",
        header: "Stok",
        cell: ({ row }) => {
          const stock = row.getValue("stock");
          const colorClass = stock === 0 ? "text-red-500" : stock <= 10 ? "text-amber-500" : "text-slate-900 dark:text-white";
          return h("div", { class: "flex items-center gap-2" }, [
            h("span", { class: `font-medium ${colorClass}` }, formatNumber(stock)),
            stock <= 10 && stock > 0 ? h(_sfc_main$5, { name: "i-heroicons-exclamation-triangle", class: "w-4 h-4 text-amber-500" }) : null
          ]);
        }
      },
      {
        accessorKey: "totalSold",
        header: "Terjual",
        cell: ({ row }) => h("span", { class: "text-slate-900 dark:text-white" }, formatNumber(row.getValue("totalSold")))
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status");
          const config = getStatusConfig(status);
          return h(_sfc_main$a, { color: config.color, variant: "subtle" }, () => config.label);
        }
      },
      {
        id: "actions",
        header: () => h("div", { class: "text-right" }, "Aksi"),
        cell: ({ row }) => {
          const product = row.original;
          return h("div", { class: "flex items-center justify-end gap-1" }, [
            h(_sfc_main$8, {
              to: `/admin/products/${product.id}`,
              icon: "i-heroicons-eye",
              color: "neutral",
              variant: "ghost",
              size: "xs"
            }),
            h(_sfc_main$8, {
              to: `/admin/products/${product.id}/edit`,
              icon: "i-heroicons-pencil",
              color: "neutral",
              variant: "ghost",
              size: "xs"
            }),
            h(_sfc_main$8, {
              icon: "i-heroicons-trash",
              color: "error",
              variant: "ghost",
              size: "xs",
              onClick: () => handleDelete(product.id)
            })
          ]);
        },
        enableSorting: false
      }
    ];
    const tableSelectedIds = computed(() => {
      const selectedRows = table.value?.tableApi?.getSelectedRowModel().rows || [];
      return selectedRows.map((row) => row.original.id);
    });
    const fetchProducts = (options = {}) => {
      isLoading.value = true;
      const params = {
        page: options.page || props.meta.currentPage,
        perPage: options.perPage || props.meta.perPage,
        sortBy: sortBy.value,
        sortDirection: sortDirection.value
      };
      if (currentFilters.value.search) {
        params.search = currentFilters.value.search;
      }
      if (currentFilters.value.status && currentFilters.value.status !== "all") {
        params.status = currentFilters.value.status;
      }
      if (currentFilters.value.condition && currentFilters.value.condition !== "all") {
        params.condition = currentFilters.value.condition;
      }
      if (currentFilters.value.category) {
        params.category = currentFilters.value.category;
      }
      if (currentFilters.value.minPrice) {
        params.minPrice = currentFilters.value.minPrice;
      }
      if (currentFilters.value.maxPrice) {
        params.maxPrice = currentFilters.value.maxPrice;
      }
      router.get("/admin/products", params, {
        preserveState: true,
        preserveScroll: true,
        onFinish: () => {
          isLoading.value = false;
        }
      });
    };
    const handleFiltersUpdate = (filters) => {
      currentFilters.value = filters;
    };
    const handleSearch = () => {
      table.value?.tableApi?.resetRowSelection();
      fetchProducts({ page: 1 });
    };
    const handleReset = () => {
      table.value?.tableApi?.resetRowSelection();
      sortBy.value = "createdAt";
      sortDirection.value = "desc";
      globalFilter.value = "";
      fetchProducts({ page: 1 });
    };
    const handlePerPageChange = (perPage) => {
      table.value?.tableApi?.resetRowSelection();
      window.scrollTo({ top: 0, behavior: "smooth" });
      isLoading.value = true;
      const params = {
        page: 1,
        perPage,
        sortBy: sortBy.value,
        sortDirection: sortDirection.value
      };
      if (currentFilters.value.search) {
        params.search = currentFilters.value.search;
      }
      if (currentFilters.value.status && currentFilters.value.status !== "all") {
        params.status = currentFilters.value.status;
      }
      if (currentFilters.value.condition && currentFilters.value.condition !== "all") {
        params.condition = currentFilters.value.condition;
      }
      if (currentFilters.value.category) {
        params.category = currentFilters.value.category;
      }
      if (currentFilters.value.minPrice) {
        params.minPrice = currentFilters.value.minPrice;
      }
      if (currentFilters.value.maxPrice) {
        params.maxPrice = currentFilters.value.maxPrice;
      }
      router.get("/admin/products", params, {
        preserveState: true,
        preserveScroll: false,
        onFinish: () => {
          isLoading.value = false;
        }
      });
    };
    const handleDelete = (id) => {
      deleteTargetId.value = id;
      deleteModalOpen.value = true;
    };
    const confirmDelete = async () => {
      if (!deleteTargetId.value) return;
      try {
        const response = await fetch(`/admin/products/${deleteTargetId.value}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          }
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Berhasil", data.message);
          router.reload({ only: ["products", "meta", "stats"] });
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        toast.error("Error", "Terjadi kesalahan saat menghapus produk");
      } finally {
        deleteModalOpen.value = false;
        deleteTargetId.value = null;
      }
    };
    const handleBulkAction = async (action) => {
      const ids = tableSelectedIds.value;
      if (ids.length === 0) return;
      if (action === "delete") {
        bulkDeleteModalOpen.value = true;
        return;
      }
      try {
        const response = await fetch("/admin/products/bulk-status", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: JSON.stringify({
            productIds: ids,
            status: action
          })
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Berhasil", data.message);
          table.value?.tableApi?.resetRowSelection();
          router.reload({ only: ["products", "meta", "stats"] });
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        toast.error("Error", "Terjadi kesalahan");
      }
    };
    const confirmBulkDelete = async () => {
      const ids = tableSelectedIds.value;
      try {
        const response = await fetch("/admin/products/bulk-delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest"
          },
          body: JSON.stringify({
            productIds: ids
          })
        });
        const data = await response.json();
        if (data.success) {
          toast.success("Berhasil", data.message);
          table.value?.tableApi?.resetRowSelection();
          router.reload({ only: ["products", "meta", "stats"] });
        } else {
          toast.error("Gagal", data.message);
        }
      } catch (error) {
        toast.error("Error", "Terjadi kesalahan saat menghapus produk");
      } finally {
        bulkDeleteModalOpen.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$8;
      const _component_UIcon = _sfc_main$5;
      const _component_UTable = _sfc_main$b;
      const _component_USelect = _sfc_main$c;
      const _component_UPagination = _sfc_main$d;
      const _component_UModal = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><!-- Page Header --><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="text-2xl font-bold text-slate-900 dark:text-white">Produk</h1><p class="text-sm text-slate-500 dark:text-slate-400 mt-1"> Kelola semua produk toko ${ssrInterpolate(__props.admin.storeName)}</p></div>`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/products/create" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              icon: "i-heroicons-plus",
              color: "primary",
              size: "md"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tambah Produk `);
                } else {
                  return [
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
                icon: "i-heroicons-plus",
                color: "primary",
                size: "md"
              }, {
                default: withCtx(() => [
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
      _push(`</div><!-- Stats Cards -->`);
      _push(ssrRenderComponent(unref(_sfc_main$4), { stats: __props.stats }, null, _parent));
      _push(`<!-- Filters -->`);
      _push(ssrRenderComponent(unref(_sfc_main$3), {
        filters: currentFilters.value,
        categories: __props.categories,
        "onUpdate:filters": handleFiltersUpdate,
        onSearch: handleSearch,
        onReset: handleReset
      }, null, _parent));
      _push(`<!-- Products Table Card --><div class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden"><!-- Bulk Actions Bar -->`);
      if (tableSelectedIds.value.length > 0) {
        _push(`<div class="flex items-center justify-between px-4 py-3 bg-violet-50 dark:bg-violet-900/20 border-b border-violet-200 dark:border-violet-800"><span class="text-sm text-violet-700 dark:text-violet-300">${ssrInterpolate(tableSelectedIds.value.length)} produk dipilih </span><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "success",
          variant: "soft",
          icon: "i-heroicons-check-circle",
          onClick: ($event) => handleBulkAction("active")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Aktifkan `);
            } else {
              return [
                createTextVNode(" Aktifkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "warning",
          variant: "soft",
          icon: "i-heroicons-pause-circle",
          onClick: ($event) => handleBulkAction("inactive")
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Nonaktifkan `);
            } else {
              return [
                createTextVNode(" Nonaktifkan ")
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(ssrRenderComponent(_component_UButton, {
          size: "sm",
          color: "error",
          variant: "soft",
          icon: "i-heroicons-trash",
          onClick: ($event) => handleBulkAction("delete")
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
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Loading Overlay -->`);
      if (isLoading.value) {
        _push(`<div class="p-8 flex items-center justify-center">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-arrow-path",
          class: "w-8 h-8 text-violet-500 animate-spin"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!--[--><!-- Table -->`);
        _push(ssrRenderComponent(_component_UTable, {
          ref_key: "table",
          ref: table,
          data: __props.products,
          columns,
          class: "w-full"
        }, {
          empty: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="px-4 py-12 text-center"${_scopeId}><div class="flex flex-col items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UIcon, {
                name: "i-heroicons-cube",
                class: "w-12 h-12 text-slate-300 dark:text-slate-600 mb-4"
              }, null, _parent2, _scopeId));
              _push2(`<p class="text-slate-500 dark:text-slate-400 mb-4"${_scopeId}>Belum ada produk</p>`);
              _push2(ssrRenderComponent(unref(Link), { href: "/admin/products/create" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UButton, {
                      icon: "i-heroicons-plus",
                      color: "primary"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Tambah Produk `);
                        } else {
                          return [
                            createTextVNode(" Tambah Produk ")
                          ];
                        }
                      }),
                      _: 1
                      /* STABLE */
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UButton, {
                        icon: "i-heroicons-plus",
                        color: "primary"
                      }, {
                        default: withCtx(() => [
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
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "px-4 py-12 text-center" }, [
                  createVNode("div", { class: "flex flex-col items-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-cube",
                      class: "w-12 h-12 text-slate-300 dark:text-slate-600 mb-4"
                    }),
                    createVNode("p", { class: "text-slate-500 dark:text-slate-400 mb-4" }, "Belum ada produk"),
                    createVNode(unref(Link), { href: "/admin/products/create" }, {
                      default: withCtx(() => [
                        createVNode(_component_UButton, {
                          icon: "i-heroicons-plus",
                          color: "primary"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Tambah Produk ")
                          ]),
                          _: 1
                          /* STABLE */
                        })
                      ]),
                      _: 1
                      /* STABLE */
                    })
                  ])
                ])
              ];
            }
          }),
          _: 1
          /* STABLE */
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`<!-- Server-Side Pagination -->`);
      if (__props.meta.total > 0) {
        _push(`<div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 dark:border-slate-700 px-4 py-3"><div class="text-sm text-slate-500 dark:text-slate-400"> Menampilkan ${ssrInterpolate((__props.meta.currentPage - 1) * __props.meta.perPage + 1)} - ${ssrInterpolate(Math.min(__props.meta.currentPage * __props.meta.perPage, __props.meta.total))} dari ${ssrInterpolate(__props.meta.total)} produk </div><div class="flex items-center gap-4">`);
        _push(ssrRenderComponent(_component_USelect, {
          "model-value": __props.meta.perPage,
          items: [
            { label: "10", value: 10 },
            { label: "20", value: 20 },
            { label: "50", value: 50 },
            { label: "100", value: 100 }
          ],
          "value-key": "value",
          "onUpdate:modelValue": (val) => handlePerPageChange(Number(val)),
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
      _push(`</div><!-- Delete Confirmation Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: deleteModalOpen.value,
        "onUpdate:open": ($event) => deleteModalOpen.value = $event,
        title: "Hapus Produk",
        description: "Apakah Anda yakin ingin menghapus produk ini?",
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-6 h-6 text-red-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}>Hapus Produk</h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}>Apakah Anda yakin ingin menghapus produk ini?</p></div></div><p class="text-sm text-slate-600 dark:text-slate-400 mb-6"${_scopeId}> Tindakan ini tidak dapat dibatalkan. Produk akan dihapus secara permanen. </p><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: ($event) => deleteModalOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: confirmDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hapus `);
                } else {
                  return [
                    createTextVNode(" Hapus ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-h-[85vh] overflow-y-auto" }, [
                createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-6 h-6 text-red-500"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode("h3", { class: "text-lg font-semibold text-slate-900 dark:text-white" }, "Hapus Produk"),
                    createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400" }, "Apakah Anda yakin ingin menghapus produk ini?")
                  ])
                ]),
                createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400 mb-6" }, " Tindakan ini tidak dapat dibatalkan. Produk akan dihapus secara permanen. "),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => deleteModalOpen.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "error",
                    onClick: confirmDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Hapus ")
                    ]),
                    _: 1
                    /* STABLE */
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Bulk Delete Confirmation Modal -->`);
      _push(ssrRenderComponent(_component_UModal, {
        open: bulkDeleteModalOpen.value,
        "onUpdate:open": ($event) => bulkDeleteModalOpen.value = $event,
        title: "Hapus Produk Terpilih",
        description: "Apakah Anda yakin ingin menghapus produk-produk terpilih?",
        ui: { overlay: "z-[100]", content: "z-[100]" }
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 max-h-[85vh] overflow-y-auto"${_scopeId}><div class="flex items-center gap-4 mb-4"${_scopeId}><div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-trash",
              class: "w-6 h-6 text-red-500"
            }, null, _parent2, _scopeId));
            _push2(`</div><div${_scopeId}><h3 class="text-lg font-semibold text-slate-900 dark:text-white"${_scopeId}> Hapus ${ssrInterpolate(tableSelectedIds.value.length)} Produk </h3><p class="text-sm text-slate-500 dark:text-slate-400"${_scopeId}> Apakah Anda yakin ingin menghapus produk-produk ini? </p></div></div><p class="text-sm text-slate-600 dark:text-slate-400 mb-6"${_scopeId}> Tindakan ini tidak dapat dibatalkan. Semua produk yang dipilih akan dihapus secara permanen. </p><div class="flex justify-end gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "outline",
              onClick: ($event) => bulkDeleteModalOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Batal `);
                } else {
                  return [
                    createTextVNode(" Batal ")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UButton, {
              color: "error",
              onClick: confirmBulkDelete
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Hapus ${ssrInterpolate(tableSelectedIds.value.length)} Produk `);
                } else {
                  return [
                    createTextVNode(
                      " Hapus " + toDisplayString(tableSelectedIds.value.length) + " Produk ",
                      1
                      /* TEXT */
                    )
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 max-h-[85vh] overflow-y-auto" }, [
                createVNode("div", { class: "flex items-center gap-4 mb-4" }, [
                  createVNode("div", { class: "w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center" }, [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-trash",
                      class: "w-6 h-6 text-red-500"
                    })
                  ]),
                  createVNode("div", null, [
                    createVNode(
                      "h3",
                      { class: "text-lg font-semibold text-slate-900 dark:text-white" },
                      " Hapus " + toDisplayString(tableSelectedIds.value.length) + " Produk ",
                      1
                      /* TEXT */
                    ),
                    createVNode("p", { class: "text-sm text-slate-500 dark:text-slate-400" }, " Apakah Anda yakin ingin menghapus produk-produk ini? ")
                  ])
                ]),
                createVNode("p", { class: "text-sm text-slate-600 dark:text-slate-400 mb-6" }, " Tindakan ini tidak dapat dibatalkan. Semua produk yang dipilih akan dihapus secara permanen. "),
                createVNode("div", { class: "flex justify-end gap-3" }, [
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "outline",
                    onClick: ($event) => bulkDeleteModalOpen.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Batal ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"]),
                  createVNode(_component_UButton, {
                    color: "error",
                    onClick: confirmBulkDelete
                  }, {
                    default: withCtx(() => [
                      createTextVNode(
                        " Hapus " + toDisplayString(tableSelectedIds.value.length) + " Produk ",
                        1
                        /* TEXT */
                      )
                    ]),
                    _: 1
                    /* STABLE */
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/pages/admin/products/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
