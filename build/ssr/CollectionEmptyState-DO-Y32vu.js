import { ref, computed, watch, defineComponent, mergeModels, useModel, mergeProps, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, useSSRContext, withDirectives, vModelRadio, Fragment, renderList } from 'vue';
import { router } from '@inertiajs/vue3';
import { _ as _sfc_main$6 } from './SelectMenu-CGTADs72.js';
import { a as _sfc_main$5, _ as _sfc_main$8 } from './Badge-DaOjA2YD.js';
import { a as _sfc_main$3, _ as _sfc_main$4 } from './Button-BBveOjhJ.js';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseEqual, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { b as _sfc_main$7 } from './default-ChIG0McX.js';

const SORT_OPTIONS = [
  { label: "Terbaru", value: "newest" },
  { label: "Terlama", value: "oldest" },
  { label: "Harga Terendah", value: "price-low" },
  { label: "Harga Tertinggi", value: "price-high" },
  { label: "Terpopuler", value: "popular" },
  { label: "Rating Tertinggi", value: "rating" }
];
const DEFAULT_FILTERS = {
  search: "",
  category: "",
  brand: "",
  minPrice: "",
  maxPrice: "",
  sortBy: "newest"
};
function useCollectionFilters(initialFilters) {
  const localFilters = ref({ ...initialFilters });
  const isMobileFilterOpen = ref(false);
  const hasActiveFilters = computed(() => {
    return Boolean(
      localFilters.value.search || localFilters.value.category || localFilters.value.brand || localFilters.value.minPrice || localFilters.value.maxPrice
    );
  });
  const activeFilterCount = computed(() => {
    let count = 0;
    if (localFilters.value.category) count++;
    if (localFilters.value.brand) count++;
    if (localFilters.value.minPrice || localFilters.value.maxPrice) count++;
    return count;
  });
  const buildQuery = (additionalParams = {}) => {
    const query = { ...additionalParams };
    if (localFilters.value.search) query.search = localFilters.value.search;
    if (localFilters.value.category) query.category = localFilters.value.category;
    if (localFilters.value.brand) query.brand = localFilters.value.brand;
    if (localFilters.value.minPrice) query.minPrice = localFilters.value.minPrice;
    if (localFilters.value.maxPrice) query.maxPrice = localFilters.value.maxPrice;
    if (localFilters.value.sortBy && localFilters.value.sortBy !== "newest") {
      query.sortBy = localFilters.value.sortBy;
    }
    return query;
  };
  const applyFilters = () => {
    router.get("/collections", buildQuery(), {
      preserveState: true,
      preserveScroll: true
    });
    isMobileFilterOpen.value = false;
  };
  const clearFilters = () => {
    localFilters.value = { ...DEFAULT_FILTERS };
    router.get("/collections", {}, { preserveState: true });
  };
  const clearSingleFilter = (key) => {
    localFilters.value[key] = "";
    applyFilters();
  };
  const goToPage = (page) => {
    router.get("/collections", buildQuery({ page }), {
      preserveState: true,
      preserveScroll: true
    });
  };
  watch(
    () => localFilters.value.sortBy,
    () => {
      applyFilters();
    }
  );
  return {
    localFilters,
    isMobileFilterOpen,
    hasActiveFilters,
    activeFilterCount,
    applyFilters,
    clearFilters,
    clearSingleFilter,
    goToPage,
    sortOptions: SORT_OPTIONS
  };
}

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CollectionToolbar",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    totalShown: {},
    totalProducts: {},
    categories: {},
    activeFilterCount: {},
    hasActiveFilters: { type: Boolean },
    sortOptions: {}
  }, {
    "viewMode": { required: true },
    "viewModeModifiers": {},
    "filters": { required: true },
    "filtersModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["openMobileFilter", "apply", "clearFilter"], ["update:viewMode", "update:filters"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const viewMode = useModel(__props, "viewMode");
    const filters = useModel(__props, "filters");
    const emit = __emit;
    const getCategoryName = (slug) => {
      return props.categories.find((c) => c.slug === slug)?.name || slug;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$3;
      const _component_UIcon = _sfc_main$4;
      const _component_UBadge = _sfc_main$5;
      const _component_USelectMenu = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 mb-6" }, _attrs))}><div class="flex flex-wrap items-center justify-between gap-4"><!-- Results Info --><div class="flex items-center gap-4"><p class="text-sm text-gray-600 dark:text-gray-400"> Menampilkan <span class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.totalShown)}</span> dari <span class="font-semibold text-gray-900 dark:text-white">${ssrInterpolate(__props.totalProducts)}</span> produk </p><!-- Mobile Filter Button -->`);
      _push(ssrRenderComponent(_component_UButton, {
        class: "lg:hidden",
        color: "neutral",
        variant: "outline",
        size: "sm",
        onClick: ($event) => emit("openMobileFilter")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-funnel",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Filter `);
            if (__props.activeFilterCount > 0) {
              _push2(ssrRenderComponent(_component_UBadge, {
                label: __props.activeFilterCount.toString(),
                color: "primary",
                size: "xs"
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-funnel",
                class: "w-4 h-4"
              }),
              createTextVNode(" Filter "),
              __props.activeFilterCount > 0 ? (openBlock(), createBlock(_component_UBadge, {
                key: 0,
                label: __props.activeFilterCount.toString(),
                color: "primary",
                size: "xs"
              }, null, 8, ["label"])) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div><!-- Sort & View Options --><div class="flex items-center gap-3"><!-- Sort Dropdown -->`);
      _push(ssrRenderComponent(_component_USelectMenu, {
        modelValue: filters.value.sortBy,
        "onUpdate:modelValue": ($event) => filters.value.sortBy = $event,
        items: __props.sortOptions,
        "value-key": "value",
        class: "w-44",
        ui: { content: "z-[100]" }
      }, {
        leading: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrows-up-down",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrows-up-down",
                class: "w-4 h-4"
              })
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- View Mode Toggle --><div class="hidden sm:flex items-center border border-gray-200 dark:border-gray-700 rounded-lg p-1"><button class="${ssrRenderClass([
        "p-2 rounded-md transition-colors",
        viewMode.value === "grid" ? "bg-primary-500 text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      ])}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-squares-2x2",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button><button class="${ssrRenderClass([
        "p-2 rounded-md transition-colors",
        viewMode.value === "list" ? "bg-primary-500 text-white" : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      ])}">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-list-bullet",
        class: "w-4 h-4"
      }, null, _parent));
      _push(`</button></div></div></div><!-- Active Filters Tags -->`);
      if (__props.hasActiveFilters) {
        _push(`<div class="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"><span class="text-sm text-gray-500 dark:text-gray-400">Filter aktif:</span>`);
        if (filters.value.category) {
          _push(ssrRenderComponent(_component_UBadge, {
            color: "primary",
            variant: "soft",
            class: "cursor-pointer",
            onClick: ($event) => emit("clearFilter", "category")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Kategori: ${ssrInterpolate(getCategoryName(filters.value.category))} `);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-3 h-3 ml-1"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(
                    " Kategori: " + toDisplayString(getCategoryName(filters.value.category)) + " ",
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-3 h-3 ml-1"
                  })
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (filters.value.brand) {
          _push(ssrRenderComponent(_component_UBadge, {
            color: "primary",
            variant: "soft",
            class: "cursor-pointer",
            onClick: ($event) => emit("clearFilter", "brand")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Brand: ${ssrInterpolate(filters.value.brand)} `);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-3 h-3 ml-1"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(
                    " Brand: " + toDisplayString(filters.value.brand) + " ",
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-3 h-3 ml-1"
                  })
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (filters.value.minPrice || filters.value.maxPrice) {
          _push(ssrRenderComponent(_component_UBadge, {
            color: "primary",
            variant: "soft",
            class: "cursor-pointer",
            onClick: () => {
              emit("clearFilter", "minPrice");
              emit("clearFilter", "maxPrice");
            }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Harga: ${ssrInterpolate(filters.value.minPrice || "0")} - ${ssrInterpolate(filters.value.maxPrice || "∞")} `);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-3 h-3 ml-1"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(
                    " Harga: " + toDisplayString(filters.value.minPrice || "0") + " - " + toDisplayString(filters.value.maxPrice || "∞") + " ",
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-3 h-3 ml-1"
                  })
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        if (filters.value.search) {
          _push(ssrRenderComponent(_component_UBadge, {
            color: "primary",
            variant: "soft",
            class: "cursor-pointer",
            onClick: ($event) => emit("clearFilter", "search")
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Pencarian: &quot;${ssrInterpolate(filters.value.search)}&quot; `);
                _push2(ssrRenderComponent(_component_UIcon, {
                  name: "i-heroicons-x-mark",
                  class: "w-3 h-3 ml-1"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createTextVNode(
                    ' Pencarian: "' + toDisplayString(filters.value.search) + '" ',
                    1
                    /* TEXT */
                  ),
                  createVNode(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-3 h-3 ml-1"
                  })
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/collections/CollectionToolbar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CollectionMobileFilter",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    categories: {},
    brands: {},
    hasActiveFilters: { type: Boolean }
  }, {
    "open": { type: Boolean, ...{ required: true } },
    "openModifiers": {},
    "filters": { required: true },
    "filtersModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["apply", "clear"], ["update:open", "update:filters"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "open");
    const filters = useModel(__props, "filters");
    const emit = __emit;
    const handleApply = () => {
      emit("apply");
      isOpen.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_USlideover = _sfc_main$7;
      const _component_UButton = _sfc_main$3;
      const _component_UIcon = _sfc_main$4;
      const _component_UInput = _sfc_main$8;
      _push(ssrRenderComponent(_component_USlideover, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="p-6 h-full overflow-y-auto"${_scopeId}><div class="flex items-center justify-between mb-6"${_scopeId}><h2 class="text-lg font-semibold text-gray-900 dark:text-white"${_scopeId}>Filter</h2>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              size: "sm",
              square: "",
              onClick: ($event) => isOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UIcon, {
                    name: "i-heroicons-x-mark",
                    class: "w-5 h-5"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UIcon, {
                      name: "i-heroicons-x-mark",
                      class: "w-5 h-5"
                    })
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-6"${_scopeId}><!-- Search --><div${_scopeId}><h3 class="font-medium text-gray-900 dark:text-white mb-3"${_scopeId}>Pencarian</h3>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: filters.value.search,
              "onUpdate:modelValue": ($event) => filters.value.search = $event,
              placeholder: "Cari produk...",
              icon: "i-heroicons-magnifying-glass"
            }, null, _parent2, _scopeId));
            _push2(`</div><!-- Categories --><div${_scopeId}><h3 class="font-medium text-gray-900 dark:text-white mb-3"${_scopeId}>Kategori</h3><div class="space-y-2 max-h-48 overflow-y-auto"${_scopeId}><label class="flex items-center gap-2 cursor-pointer"${_scopeId}><input type="radio" value=""${ssrIncludeBooleanAttr(ssrLooseEqual(filters.value.category, "")) ? " checked" : ""} class="w-4 h-4 text-primary-500"${_scopeId}><span class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}>Semua Kategori</span></label><!--[-->`);
            ssrRenderList(__props.categories, (category) => {
              _push2(`<label class="flex items-center gap-2 cursor-pointer"${_scopeId}><input type="radio"${ssrRenderAttr("value", category.slug)}${ssrIncludeBooleanAttr(ssrLooseEqual(filters.value.category, category.slug)) ? " checked" : ""} class="w-4 h-4 text-primary-500"${_scopeId}><span class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(category.name)}</span></label>`);
            });
            _push2(`<!--]--></div></div><!-- Brands --><div${_scopeId}><h3 class="font-medium text-gray-900 dark:text-white mb-3"${_scopeId}>Brand</h3><div class="space-y-2 max-h-48 overflow-y-auto"${_scopeId}><label class="flex items-center gap-2 cursor-pointer"${_scopeId}><input type="radio" value=""${ssrIncludeBooleanAttr(ssrLooseEqual(filters.value.brand, "")) ? " checked" : ""} class="w-4 h-4 text-primary-500"${_scopeId}><span class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}>Semua Brand</span></label><!--[-->`);
            ssrRenderList(__props.brands, (brand) => {
              _push2(`<label class="flex items-center gap-2 cursor-pointer"${_scopeId}><input type="radio"${ssrRenderAttr("value", brand)}${ssrIncludeBooleanAttr(ssrLooseEqual(filters.value.brand, brand)) ? " checked" : ""} class="w-4 h-4 text-primary-500"${_scopeId}><span class="text-sm text-gray-700 dark:text-gray-300"${_scopeId}>${ssrInterpolate(brand)}</span></label>`);
            });
            _push2(`<!--]--></div></div><!-- Price Range --><div${_scopeId}><h3 class="font-medium text-gray-900 dark:text-white mb-3"${_scopeId}>Rentang Harga</h3><div class="space-y-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: filters.value.minPrice,
              "onUpdate:modelValue": ($event) => filters.value.minPrice = $event,
              type: "number",
              placeholder: "Harga Minimum"
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UInput, {
              modelValue: filters.value.maxPrice,
              "onUpdate:modelValue": ($event) => filters.value.maxPrice = $event,
              type: "number",
              placeholder: "Harga Maksimum"
            }, null, _parent2, _scopeId));
            _push2(`</div></div></div><!-- Actions --><div class="sticky bottom-0 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UButton, {
              color: "primary",
              block: "",
              onClick: handleApply
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Terapkan Filter`);
                } else {
                  return [
                    createTextVNode("Terapkan Filter")
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            if (__props.hasActiveFilters) {
              _push2(ssrRenderComponent(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                block: "",
                onClick: ($event) => emit("clear")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Hapus Semua Filter `);
                  } else {
                    return [
                      createTextVNode(" Hapus Semua Filter ")
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "p-6 h-full overflow-y-auto" }, [
                createVNode("div", { class: "flex items-center justify-between mb-6" }, [
                  createVNode("h2", { class: "text-lg font-semibold text-gray-900 dark:text-white" }, "Filter"),
                  createVNode(_component_UButton, {
                    color: "neutral",
                    variant: "ghost",
                    size: "sm",
                    square: "",
                    onClick: ($event) => isOpen.value = false
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UIcon, {
                        name: "i-heroicons-x-mark",
                        class: "w-5 h-5"
                      })
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"])
                ]),
                createVNode("div", { class: "space-y-6" }, [
                  createCommentVNode(" Search "),
                  createVNode("div", null, [
                    createVNode("h3", { class: "font-medium text-gray-900 dark:text-white mb-3" }, "Pencarian"),
                    createVNode(_component_UInput, {
                      modelValue: filters.value.search,
                      "onUpdate:modelValue": ($event) => filters.value.search = $event,
                      placeholder: "Cari produk...",
                      icon: "i-heroicons-magnifying-glass"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  createCommentVNode(" Categories "),
                  createVNode("div", null, [
                    createVNode("h3", { class: "font-medium text-gray-900 dark:text-white mb-3" }, "Kategori"),
                    createVNode("div", { class: "space-y-2 max-h-48 overflow-y-auto" }, [
                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          value: "",
                          "onUpdate:modelValue": ($event) => filters.value.category = $event,
                          class: "w-4 h-4 text-primary-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, filters.value.category]
                        ]),
                        createVNode("span", { class: "text-sm text-gray-700 dark:text-gray-300" }, "Semua Kategori")
                      ]),
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(__props.categories, (category) => {
                          return openBlock(), createBlock("label", {
                            key: category.id,
                            class: "flex items-center gap-2 cursor-pointer"
                          }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              value: category.slug,
                              "onUpdate:modelValue": ($event) => filters.value.category = $event,
                              class: "w-4 h-4 text-primary-500"
                            }, null, 8, ["value", "onUpdate:modelValue"]), [
                              [vModelRadio, filters.value.category]
                            ]),
                            createVNode(
                              "span",
                              { class: "text-sm text-gray-700 dark:text-gray-300" },
                              toDisplayString(category.name),
                              1
                              /* TEXT */
                            )
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]),
                  createCommentVNode(" Brands "),
                  createVNode("div", null, [
                    createVNode("h3", { class: "font-medium text-gray-900 dark:text-white mb-3" }, "Brand"),
                    createVNode("div", { class: "space-y-2 max-h-48 overflow-y-auto" }, [
                      createVNode("label", { class: "flex items-center gap-2 cursor-pointer" }, [
                        withDirectives(createVNode("input", {
                          type: "radio",
                          value: "",
                          "onUpdate:modelValue": ($event) => filters.value.brand = $event,
                          class: "w-4 h-4 text-primary-500"
                        }, null, 8, ["onUpdate:modelValue"]), [
                          [vModelRadio, filters.value.brand]
                        ]),
                        createVNode("span", { class: "text-sm text-gray-700 dark:text-gray-300" }, "Semua Brand")
                      ]),
                      (openBlock(true), createBlock(
                        Fragment,
                        null,
                        renderList(__props.brands, (brand) => {
                          return openBlock(), createBlock("label", {
                            key: brand,
                            class: "flex items-center gap-2 cursor-pointer"
                          }, [
                            withDirectives(createVNode("input", {
                              type: "radio",
                              value: brand,
                              "onUpdate:modelValue": ($event) => filters.value.brand = $event,
                              class: "w-4 h-4 text-primary-500"
                            }, null, 8, ["value", "onUpdate:modelValue"]), [
                              [vModelRadio, filters.value.brand]
                            ]),
                            createVNode(
                              "span",
                              { class: "text-sm text-gray-700 dark:text-gray-300" },
                              toDisplayString(brand),
                              1
                              /* TEXT */
                            )
                          ]);
                        }),
                        128
                        /* KEYED_FRAGMENT */
                      ))
                    ])
                  ]),
                  createCommentVNode(" Price Range "),
                  createVNode("div", null, [
                    createVNode("h3", { class: "font-medium text-gray-900 dark:text-white mb-3" }, "Rentang Harga"),
                    createVNode("div", { class: "space-y-3" }, [
                      createVNode(_component_UInput, {
                        modelValue: filters.value.minPrice,
                        "onUpdate:modelValue": ($event) => filters.value.minPrice = $event,
                        type: "number",
                        placeholder: "Harga Minimum"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(_component_UInput, {
                        modelValue: filters.value.maxPrice,
                        "onUpdate:modelValue": ($event) => filters.value.maxPrice = $event,
                        type: "number",
                        placeholder: "Harga Maksimum"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ])
                ]),
                createCommentVNode(" Actions "),
                createVNode("div", { class: "sticky bottom-0 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 space-y-2" }, [
                  createVNode(_component_UButton, {
                    color: "primary",
                    block: "",
                    onClick: handleApply
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Terapkan Filter")
                    ]),
                    _: 1
                    /* STABLE */
                  }),
                  __props.hasActiveFilters ? (openBlock(), createBlock(_component_UButton, {
                    key: 0,
                    color: "neutral",
                    variant: "ghost",
                    block: "",
                    onClick: ($event) => emit("clear")
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Hapus Semua Filter ")
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["onClick"])) : createCommentVNode("v-if", true)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/collections/CollectionMobileFilter.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "CollectionEmptyState",
  __ssrInlineRender: true,
  emits: ["reset"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$4;
      const _component_UButton = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center" }, _attrs))}><div class="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-magnifying-glass",
        class: "w-12 h-12 text-gray-400"
      }, null, _parent));
      _push(`</div><h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2"> Produk Tidak Ditemukan </h3><p class="text-gray-500 dark:text-gray-400 mb-6"> Tidak ada produk yang sesuai dengan filter Anda. Coba ubah atau hapus beberapa filter. </p>`);
      _push(ssrRenderComponent(_component_UButton, {
        color: "primary",
        onClick: ($event) => emit("reset")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UIcon, {
              name: "i-heroicons-arrow-path",
              class: "w-4 h-4"
            }, null, _parent2, _scopeId));
            _push2(` Reset Filter `);
          } else {
            return [
              createVNode(_component_UIcon, {
                name: "i-heroicons-arrow-path",
                class: "w-4 h-4"
              }),
              createTextVNode(" Reset Filter ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/collections/CollectionEmptyState.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$2 as _, _sfc_main as a, _sfc_main$1 as b, useCollectionFilters as u };
