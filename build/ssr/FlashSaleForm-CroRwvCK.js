import { _ as _sfc_main$2, a as _sfc_main$a } from './Badge-DaOjA2YD.js';
import { _ as _sfc_main$9 } from './Switch-BkqmHkc6.js';
import { _ as _sfc_main$8 } from './Textarea-DTaAAeeU.js';
import { _ as _sfc_main$7 } from './FormField-BIqlRgyi.js';
import { _ as _sfc_main$6 } from './Card-Ci6a5H8H.js';
import { a as _sfc_main$3, _ as _sfc_main$4 } from './Button-BBveOjhJ.js';
import { defineComponent, ref, watch, computed, mergeProps, withCtx, createTextVNode, useSSRContext, unref, createVNode, createBlock, createCommentVNode, openBlock, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { Link } from '@inertiajs/vue3';
import { _ as _sfc_main$5 } from './CurrencyInput-Cdh5jdqQ.js';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FlashSaleProductSelector",
  __ssrInlineRender: true,
  props: {
    availableProducts: {},
    modelValue: {}
  },
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const searchQuery = ref("");
    const showProductList = ref(false);
    const selectedProducts = ref([...props.modelValue]);
    watch(
      () => props.modelValue,
      (newVal) => {
        selectedProducts.value = [...newVal];
      },
      { deep: true }
    );
    const filteredProducts = computed(() => {
      const selectedIds = selectedProducts.value.map((p) => p.product_id);
      let products = props.availableProducts.filter((p) => !selectedIds.includes(p.id));
      if (searchQuery.value) {
        products = products.filter(
          (p) => p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      return products;
    });
    const removeProduct = (index) => {
      selectedProducts.value.splice(index, 1);
      emit("update:modelValue", selectedProducts.value);
    };
    const updateProduct = (index, field, value) => {
      selectedProducts.value[index][field] = value;
      emit("update:modelValue", selectedProducts.value);
    };
    const getDiscountPercentage = (original, flash) => {
      if (original <= 0) return 0;
      return Math.round((original - flash) / original * 100);
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
      return url;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = _sfc_main$2;
      const _component_UButton = _sfc_main$3;
      const _component_UIcon = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}><!-- Add Product Button --><div class="relative"><div class="flex gap-2">`);
      _push(ssrRenderComponent(_component_UInput, {
        modelValue: searchQuery.value,
        "onUpdate:modelValue": ($event) => searchQuery.value = $event,
        placeholder: "Cari produk untuk ditambahkan...",
        icon: "i-heroicons-magnifying-glass",
        class: "flex-1",
        onFocus: ($event) => showProductList.value = true
      }, null, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        type: "button",
        color: "primary",
        variant: "soft",
        icon: "i-heroicons-plus",
        onClick: ($event) => showProductList.value = !showProductList.value
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
      _push(`</div><!-- Product Dropdown -->`);
      if (showProductList.value && filteredProducts.value.length > 0) {
        _push(`<div class="absolute z-50 mt-2 w-full max-h-64 overflow-y-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"><!--[-->`);
        ssrRenderList(filteredProducts.value, (product) => {
          _push(`<div class="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"><img${ssrRenderAttr("src", getImageUrl(product.image))}${ssrRenderAttr("alt", product.name)} class="w-10 h-10 rounded object-cover bg-gray-100 dark:bg-gray-800"><div class="flex-1 min-w-0"><p class="font-medium text-gray-900 dark:text-white truncate text-sm">${ssrInterpolate(product.name)}</p><p class="text-xs text-gray-500 dark:text-gray-400">${ssrInterpolate(formatPrice(product.price))} • Stok: ${ssrInterpolate(product.stock)}</p></div>`);
          _push(ssrRenderComponent(_component_UIcon, {
            name: "i-heroicons-plus-circle",
            class: "w-5 h-5 text-primary-500"
          }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!-- Backdrop to close dropdown -->`);
      if (showProductList.value) {
        _push(`<div class="fixed inset-0 z-40"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!-- Selected Products -->`);
      if (selectedProducts.value.length > 0) {
        _push(`<div class="space-y-3"><div class="flex items-center justify-between"><p class="font-medium text-gray-900 dark:text-white">${ssrInterpolate(selectedProducts.value.length)} Produk Flash Sale </p></div><div class="space-y-3"><!--[-->`);
        ssrRenderList(selectedProducts.value, (product, index) => {
          _push(`<div class="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><div class="flex items-start gap-4"><!-- Product Info --><img${ssrRenderAttr("src", getImageUrl(product.image))}${ssrRenderAttr("alt", product.name)} class="w-16 h-16 rounded-lg object-cover bg-gray-100 dark:bg-gray-700"><div class="flex-1 min-w-0"><div class="flex items-start justify-between gap-2"><div><h4 class="font-medium text-gray-900 dark:text-white truncate">${ssrInterpolate(product.name)}</h4><p class="text-sm text-gray-500 dark:text-gray-400"> Harga Normal: ${ssrInterpolate(formatPrice(product.original_price))}</p></div>`);
          _push(ssrRenderComponent(_component_UButton, {
            type: "button",
            color: "error",
            variant: "ghost",
            size: "xs",
            icon: "i-heroicons-trash",
            onClick: ($event) => removeProduct(index)
          }, null, _parent));
          _push(`</div><!-- Price & Stock Inputs --><div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3"><div><label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block"> Harga Flash Sale </label>`);
          _push(ssrRenderComponent(_sfc_main$5, {
            "model-value": product.flash_price,
            "onUpdate:modelValue": (val) => updateProduct(index, "flash_price", val || 0),
            placeholder: "0"
          }, null, _parent));
          _push(`</div><div><label class="text-xs text-gray-500 dark:text-gray-400 mb-1 block"> Batas Stok </label>`);
          _push(ssrRenderComponent(_component_UInput, {
            "model-value": product.stock_limit,
            "onUpdate:modelValue": (val) => updateProduct(index, "stock_limit", Number(val) || 0),
            type: "number",
            min: 1,
            placeholder: "100",
            class: "w-full"
          }, null, _parent));
          _push(`</div><div class="flex items-end"><div class="${ssrRenderClass([
            getDiscountPercentage(product.original_price, product.flash_price) >= 50 ? "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400" : "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
            "w-full px-3 py-2 rounded-lg text-center"
          ])}"><span class="text-lg font-bold">${ssrInterpolate(getDiscountPercentage(product.original_price, product.flash_price))}% </span><span class="text-xs block">Diskon</span></div></div></div><!-- Sold count (for edit mode) -->`);
          if (product.sold_count && product.sold_count > 0) {
            _push(`<p class="text-xs text-gray-500 dark:text-gray-400 mt-2"> Terjual: ${ssrInterpolate(product.sold_count)} dari ${ssrInterpolate(product.stock_limit)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></div></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!--[--><!-- Empty State --><div class="text-center py-8 text-gray-500 dark:text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">`);
        _push(ssrRenderComponent(_component_UIcon, {
          name: "i-heroicons-shopping-bag",
          class: "w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600"
        }, null, _parent));
        _push(`<p class="font-medium">Belum ada produk</p><p class="text-sm">Tambahkan produk untuk flash sale</p></div><!--]-->`);
      }
      _push(`</div>`);
    };
  }
});

const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/FlashSaleProductSelector.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "FlashSaleForm",
  __ssrInlineRender: true,
  props: {
    flashSale: {},
    products: {},
    mode: {}
  },
  setup(__props) {
    const props = __props;
    const defaultForm = {
      name: "",
      description: "",
      start_date: "",
      end_date: "",
      is_active: true,
      products: []
    };
    const form = ref(
      props.mode === "edit" && props.flashSale ? {
        name: props.flashSale.name,
        description: props.flashSale.description || "",
        start_date: props.flashSale.startDate,
        end_date: props.flashSale.endDate,
        is_active: props.flashSale.isActive,
        products: props.flashSale.products.map((p) => ({
          product_id: p.product_id,
          original_price: p.original_price,
          flash_price: p.flash_price,
          stock_limit: p.stock_limit
        }))
      } : { ...defaultForm }
    );
    const selectedProducts = ref(
      props.mode === "edit" && props.flashSale ? props.flashSale.products.map((p) => ({
        product_id: p.product_id,
        name: p.name,
        image: p.image,
        original_price: p.original_price,
        flash_price: p.flash_price,
        stock_limit: p.stock_limit,
        sold_count: p.sold_count
      })) : []
    );
    const isSubmitting = ref(false);
    const errors = ref({});
    const onProductsChange = (products) => {
      selectedProducts.value = products;
      form.value.products = products.map((p) => ({
        product_id: p.product_id,
        original_price: p.original_price,
        flash_price: p.flash_price,
        stock_limit: p.stock_limit
      }));
    };
    const pageTitle = computed(
      () => props.mode === "edit" ? "Edit Flash Sale" : "Buat Flash Sale Baru"
    );
    const pageSubtitle = computed(
      () => props.mode === "edit" ? props.flashSale?.name || "" : "Buat event flash sale dengan harga spesial"
    );
    const submitButtonText = computed(
      () => props.mode === "edit" ? "Simpan Perubahan" : "Simpan Flash Sale"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UButton = _sfc_main$3;
      const _component_UCard = _sfc_main$6;
      const _component_UFormField = _sfc_main$7;
      const _component_UInput = _sfc_main$2;
      const _component_UTextarea = _sfc_main$8;
      const _component_USwitch = _sfc_main$9;
      const _component_UBadge = _sfc_main$a;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-6 max-w-7xl mx-auto space-y-6" }, _attrs))}><!-- Header --><div class="flex items-center gap-4">`);
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
      _push(`<div><h1 class="text-2xl font-bold text-gray-900 dark:text-white">${ssrInterpolate(pageTitle.value)}</h1><p class="text-gray-500 dark:text-gray-400">${ssrInterpolate(pageSubtitle.value)}</p></div></div><!-- Form --><form class="space-y-6"><!-- Basic Info -->`);
      _push(ssrRenderComponent(_component_UCard, null, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Informasi Dasar</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Informasi Dasar")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Nama Flash Sale",
              error: errors.value.name,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.name,
                    "onUpdate:modelValue": ($event) => form.value.name = $event,
                    placeholder: "Contoh: Flash Sale Akhir Tahun",
                    color: errors.value.name ? "error" : void 0,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.name,
                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                      placeholder: "Contoh: Flash Sale Akhir Tahun",
                      color: errors.value.name ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, { label: "Deskripsi" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UTextarea, {
                    modelValue: form.value.description,
                    "onUpdate:modelValue": ($event) => form.value.description = $event,
                    placeholder: "Deskripsi singkat tentang flash sale ini",
                    rows: 3,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UTextarea, {
                      modelValue: form.value.description,
                      "onUpdate:modelValue": ($event) => form.value.description = $event,
                      placeholder: "Deskripsi singkat tentang flash sale ini",
                      rows: 3,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode(_component_UFormField, {
                  label: "Nama Flash Sale",
                  error: errors.value.name,
                  required: ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_UInput, {
                      modelValue: form.value.name,
                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                      placeholder: "Contoh: Flash Sale Akhir Tahun",
                      color: errors.value.name ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                  ]),
                  _: 1
                  /* STABLE */
                }, 8, ["error"]),
                createVNode(_component_UFormField, { label: "Deskripsi" }, {
                  default: withCtx(() => [
                    createVNode(_component_UTextarea, {
                      modelValue: form.value.description,
                      "onUpdate:modelValue": ($event) => form.value.description = $event,
                      placeholder: "Deskripsi singkat tentang flash sale ini",
                      rows: 3,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                  /* STABLE */
                })
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
            _push2(`<h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Periode Flash Sale</h3>`);
          } else {
            return [
              createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Periode Flash Sale")
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-4"${_scopeId}><div class="grid grid-cols-1 md:grid-cols-2 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Tanggal & Waktu Mulai",
              error: errors.value.start_date,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.start_date,
                    "onUpdate:modelValue": ($event) => form.value.start_date = $event,
                    type: "datetime-local",
                    color: errors.value.start_date ? "error" : void 0,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.start_date,
                      "onUpdate:modelValue": ($event) => form.value.start_date = $event,
                      type: "datetime-local",
                      color: errors.value.start_date ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UFormField, {
              label: "Tanggal & Waktu Selesai",
              error: errors.value.end_date,
              required: ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UInput, {
                    modelValue: form.value.end_date,
                    "onUpdate:modelValue": ($event) => form.value.end_date = $event,
                    type: "datetime-local",
                    color: errors.value.end_date ? "error" : void 0,
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UInput, {
                      modelValue: form.value.end_date,
                      "onUpdate:modelValue": ($event) => form.value.end_date = $event,
                      type: "datetime-local",
                      color: errors.value.end_date ? "error" : void 0,
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                  ];
                }
              }),
              _: 1
              /* STABLE */
            }, _parent2, _scopeId));
            _push2(`</div><div class="flex items-center gap-3"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_USwitch, {
              modelValue: form.value.is_active,
              "onUpdate:modelValue": ($event) => form.value.is_active = $event
            }, null, _parent2, _scopeId));
            _push2(`<div${_scopeId}><p class="font-medium text-gray-900 dark:text-white"${_scopeId}>Aktifkan Flash Sale</p><p class="text-sm text-gray-500 dark:text-gray-400"${_scopeId}> Flash sale akan aktif sesuai periode yang ditentukan </p></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-4" }, [
                createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4" }, [
                  createVNode(_component_UFormField, {
                    label: "Tanggal & Waktu Mulai",
                    error: errors.value.start_date,
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: form.value.start_date,
                        "onUpdate:modelValue": ($event) => form.value.start_date = $event,
                        type: "datetime-local",
                        color: errors.value.start_date ? "error" : void 0,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["error"]),
                  createVNode(_component_UFormField, {
                    label: "Tanggal & Waktu Selesai",
                    error: errors.value.end_date,
                    required: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_UInput, {
                        modelValue: form.value.end_date,
                        "onUpdate:modelValue": ($event) => form.value.end_date = $event,
                        type: "datetime-local",
                        color: errors.value.end_date ? "error" : void 0,
                        class: "w-full"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "color"])
                    ]),
                    _: 1
                    /* STABLE */
                  }, 8, ["error"])
                ]),
                createVNode("div", { class: "flex items-center gap-3" }, [
                  createVNode(_component_USwitch, {
                    modelValue: form.value.is_active,
                    "onUpdate:modelValue": ($event) => form.value.is_active = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode("div", null, [
                    createVNode("p", { class: "font-medium text-gray-900 dark:text-white" }, "Aktifkan Flash Sale"),
                    createVNode("p", { class: "text-sm text-gray-500 dark:text-gray-400" }, " Flash sale akan aktif sesuai periode yang ditentukan ")
                  ])
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
            _push2(`<div class="flex items-center justify-between"${_scopeId}><h3 class="font-semibold text-gray-900 dark:text-white"${_scopeId}>Produk Flash Sale</h3>`);
            if (selectedProducts.value.length > 0) {
              _push2(ssrRenderComponent(_component_UBadge, {
                color: "primary",
                variant: "soft"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(selectedProducts.value.length)} produk `);
                  } else {
                    return [
                      createTextVNode(
                        toDisplayString(selectedProducts.value.length) + " produk ",
                        1
                        /* TEXT */
                      )
                    ];
                  }
                }),
                _: 1
                /* STABLE */
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center justify-between" }, [
                createVNode("h3", { class: "font-semibold text-gray-900 dark:text-white" }, "Produk Flash Sale"),
                selectedProducts.value.length > 0 ? (openBlock(), createBlock(_component_UBadge, {
                  key: 0,
                  color: "primary",
                  variant: "soft"
                }, {
                  default: withCtx(() => [
                    createTextVNode(
                      toDisplayString(selectedProducts.value.length) + " produk ",
                      1
                      /* TEXT */
                    )
                  ]),
                  _: 1
                  /* STABLE */
                })) : createCommentVNode("v-if", true)
              ])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, {
              "available-products": __props.products,
              "model-value": selectedProducts.value,
              "onUpdate:modelValue": onProductsChange
            }, null, _parent2, _scopeId));
            if (errors.value.products) {
              _push2(`<p class="mt-2 text-sm text-red-500"${_scopeId}>${ssrInterpolate(errors.value.products)}</p>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_sfc_main$1, {
                "available-products": __props.products,
                "model-value": selectedProducts.value,
                "onUpdate:modelValue": onProductsChange
              }, null, 8, ["available-products", "model-value"]),
              errors.value.products ? (openBlock(), createBlock(
                "p",
                {
                  key: 0,
                  class: "mt-2 text-sm text-red-500"
                },
                toDisplayString(errors.value.products),
                1
                /* TEXT */
              )) : createCommentVNode("v-if", true)
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`<!-- Actions --><div class="flex items-center justify-end gap-4">`);
      _push(ssrRenderComponent(unref(Link), { href: "/admin/promotions/flash-sale" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UButton, {
              color: "neutral",
              variant: "ghost",
              disabled: isSubmitting.value
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
          } else {
            return [
              createVNode(_component_UButton, {
                color: "neutral",
                variant: "ghost",
                disabled: isSubmitting.value
              }, {
                default: withCtx(() => [
                  createTextVNode(" Batal ")
                ]),
                _: 1
                /* STABLE */
              }, 8, ["disabled"])
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        color: "primary",
        loading: isSubmitting.value
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(submitButtonText.value)}`);
          } else {
            return [
              createTextVNode(
                toDisplayString(submitButtonText.value),
                1
                /* TEXT */
              )
            ];
          }
        }),
        _: 1
        /* STABLE */
      }, _parent));
      _push(`</div></form></div>`);
    };
  }
});

const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("inertia/components/admin/promotions/FlashSaleForm.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
