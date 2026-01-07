import { a as _sfc_main$2, _ as _sfc_main$6 } from './Button-BBveOjhJ.js';
import { _ as _sfc_main$5 } from './Checkbox-9gbT5PLz.js';
import { a as _sfc_main$3, _ as _sfc_main$4 } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$1 } from './Switch-BkqmHkc6.js';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductSelector",
  __ssrInlineRender: true,
  props: {
    products: {},
    selectedIds: {},
    appliesToAll: { type: Boolean }
  },
  emits: ["update:selectedIds", "update:appliesToAll"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const searchQuery = ref("");
    const localSelectedIds = ref([...props.selectedIds]);
    const localAppliesToAll = ref(props.appliesToAll);
    watch(() => props.selectedIds, (newVal) => {
      localSelectedIds.value = [...newVal];
    });
    watch(() => props.appliesToAll, (newVal) => {
      localAppliesToAll.value = newVal;
    });
    const filteredProducts = computed(() => {
      if (!searchQuery.value) return props.products;
      return props.products.filter(
        (p) => p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });
    const selectedProducts = computed(() => {
      return props.products.filter((p) => localSelectedIds.value.includes(p.id));
    });
    const isSelected = (id) => localSelectedIds.value.includes(id);
    const removeProduct = (id) => {
      localSelectedIds.value = localSelectedIds.value.filter((i) => i !== id);
      emit("update:selectedIds", localSelectedIds.value);
    };
    const selectAll = () => {
      localSelectedIds.value = props.products.map((p) => p.id);
      emit("update:selectedIds", localSelectedIds.value);
    };
    const deselectAll = () => {
      localSelectedIds.value = [];
      emit("update:selectedIds", localSelectedIds.value);
    };
    const toggleAppliesToAll = (value) => {
      localAppliesToAll.value = value;
      emit("update:appliesToAll", value);
      if (value) {
        localSelectedIds.value = [];
        emit("update:selectedIds", []);
      }
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
      const _component_USwitch = _sfc_main$1;
      const _component_UButton = _sfc_main$2;
      const _component_UBadge = _sfc_main$3;
      const _component_UInput = _sfc_main$4;
      const _component_UCheckbox = _sfc_main$5;
      const _component_UIcon = _sfc_main$6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!-- Applies to all toggle --><div class="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"><div><p class="font-medium text-gray-900 dark:text-white">Berlaku untuk semua produk</p><p class="text-sm text-gray-500 dark:text-gray-400"> Promosi akan berlaku untuk semua produk di platform </p></div>`);
      _push(ssrRenderComponent(_component_USwitch, {
        "model-value": localAppliesToAll.value,
        "onUpdate:modelValue": toggleAppliesToAll
      }, null, _parent));
      _push(`</div><!-- Product selection (only shown when not applies to all) -->`);
      if (!localAppliesToAll.value) {
        _push(`<!--[--><!-- Selected products summary -->`);
        if (selectedProducts.value.length > 0) {
          _push(`<div class="space-y-2"><div class="flex items-center justify-between"><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(selectedProducts.value.length)} produk dipilih </p>`);
          _push(ssrRenderComponent(_component_UButton, {
            size: "xs",
            color: "neutral",
            variant: "ghost",
            onClick: deselectAll
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Hapus Semua `);
              } else {
                return [
                  createTextVNode(" Hapus Semua ")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
          _push(`</div><div class="flex flex-wrap gap-2"><!--[-->`);
          ssrRenderList(selectedProducts.value, (product) => {
            _push(ssrRenderComponent(_component_UBadge, {
              key: product.id,
              color: "primary",
              variant: "soft",
              class: "pr-1"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`<span class="mr-1"${_scopeId}>${ssrInterpolate(product.name)}</span>`);
                  _push2(ssrRenderComponent(_component_UButton, {
                    size: "2xs",
                    color: "primary",
                    variant: "ghost",
                    icon: "i-heroicons-x-mark",
                    padded: false,
                    onClick: ($event) => removeProduct(product.id)
                  }, null, _parent2, _scopeId));
                } else {
                  return [
                    createVNode(
                      "span",
                      { class: "mr-1" },
                      toDisplayString(product.name),
                      1
                      /* TEXT */
                    ),
                    createVNode(_component_UButton, {
                      size: "2xs",
                      color: "primary",
                      variant: "ghost",
                      icon: "i-heroicons-x-mark",
                      padded: false,
                      onClick: withModifiers(($event) => removeProduct(product.id), ["stop"])
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 2
              /* DYNAMIC */
            }, _parent));
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!-- Search and product list --><div class="space-y-3"><div class="flex items-center gap-2">`);
        _push(ssrRenderComponent(_component_UInput, {
          modelValue: searchQuery.value,
          "onUpdate:modelValue": ($event) => searchQuery.value = $event,
          placeholder: "Cari produk...",
          icon: "i-heroicons-magnifying-glass",
          class: "flex-1"
        }, null, _parent));
        if (selectedProducts.value.length < __props.products.length) {
          _push(ssrRenderComponent(_component_UButton, {
            size: "sm",
            color: "neutral",
            variant: "ghost",
            onClick: selectAll
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Pilih Semua `);
              } else {
                return [
                  createTextVNode(" Pilih Semua ")
                ];
              }
            }),
            _: 1
            /* STABLE */
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="max-h-64 overflow-y-auto space-y-2 border border-gray-200 dark:border-gray-700 rounded-lg p-3"><!--[-->`);
        ssrRenderList(filteredProducts.value, (product) => {
          _push(`<div class="${ssrRenderClass([{ "bg-primary-50 dark:bg-primary-900/20": isSelected(product.id) }, "flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"])}">`);
          _push(ssrRenderComponent(_component_UCheckbox, {
            "model-value": isSelected(product.id),
            onClick: () => {
            }
          }, null, _parent));
          _push(`<img${ssrRenderAttr("src", getImageUrl(product.image))}${ssrRenderAttr("alt", product.name)} class="w-10 h-10 rounded object-cover bg-gray-100 dark:bg-gray-800"><div class="flex-1 min-w-0"><p class="font-medium text-gray-900 dark:text-white truncate text-sm">${ssrInterpolate(product.name)}</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(formatPrice(product.price))}</p></div></div>`);
        });
        _push(`<!--]-->`);
        if (filteredProducts.value.length === 0) {
          _push(`<div class="text-center py-8 text-gray-500 dark:text-gray-400">`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-inbox",
            class: "w-8 h-8 mx-auto mb-2"
          }, null, _parent));
          _push(`<p>Tidak ada produk ditemukan</p></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/ProductSelector.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
